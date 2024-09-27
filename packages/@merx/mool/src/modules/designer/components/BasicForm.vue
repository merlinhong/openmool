<script setup lang="tsx">
import type { FormRules, FormInstance } from "element-plus";

import { onMounted, unref, ref, watch, type PropType, VNode, CSSProperties, Ref } from "vue";

import { request, type DEFAULTSETTING, AxiosResponseError } from "@/mool/utils";

import { omit } from "@/mool/utils";

import type { BasicFormConfig, Col, FormData, Render, ComponentType } from "@/mool/types/BasicForm";

defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  // 表单配置对象

  config: {
    type: Object as PropType<BasicFormConfig>,

    default: () => [],
  },

  // 绑定表单配置中的属性data(双向绑定，v-model:data)

  data: {
    type: Object as PropType<Record<string, any>>,

    default: () => {},

    required: true,
  },

  // 是否只展示固定表单描述

  desc: {
    type: Boolean,

    default: false,
  },

  // 表单提交额外的参数

  extra: {
    type: Object as PropType<Record<string, unknown>>,

    default: () => {},

    required: false,
  },

  lowCode: {
    type: Object as PropType<{ disabled: boolean; editBtn: boolean }>,

    default: () => {
      return {
        disabled: false,

        editBtn: false,
      };
    },

    required: false,
  },
});

const emit = defineEmits(["update:data", "setConfigPlane", "setCurrentColIndex"]);

const form = ref<BasicFormConfig>(props.config);

const Model = defineModel<{ [key: string]: any }>("data", { required: true });

const formData = ref<FormData>({});

const ruleFormRef = ref<FormInstance>();

const rules = ref<FormRules<typeof props.data>>({});

onMounted(() => {
  // (form.value.row?.col as Col[])?.map((item1, index1) => {
  // formData.value[item1.key] = item1.value !== undefined ? item1.value : "";
  // if (item1.append && Array.isArray(item1.append)) {
  // item1.append.map((btncol) => {
  // formData.value[btncol.key!] = btncol.value !== undefined ? btncol?.value : "";
  // });
  // }
  // item1.rules && (rules.value[item1.pkey ? item1.pkey + "." + item1.key : item1.key!] = item1.rules);
  // return item1;
  // });
  // Model.value = Object.assign({}, formData.value, Model.value);
});

const onSubmit = (
  data: DEFAULTSETTING,

  success?: ((arg: CommonResponse) => void) | null,

  fail?: ((arg: AxiosResponseError) => void) | null,

  complete?: () => void,
) => {
  data.data = Object.assign({}, props.extra, data.data);

  return request(data)
    .then((res) => {
      !success ? ElMessage.success(res.message) : success(res);
    })

    .catch((err: AxiosResponseError) => {
      !fail ? null : fail(err);
    })

    .finally(() => {
      complete && complete();
    });
};

defineExpose({
  onSubmit,

  formData: formData,

  ruleFormRef: ruleFormRef,
});
</script>

<template>
  <div>
    <slot name="title"></slot>

    <el-form
      :label-position="form?.row?.position || 'left'"
      :label-width="form?.row?.labelWidth || 'auto'"
      :model="Model"
      :class="['page_search', $attrs.class]"
      :style="[{ backgroundColor: '#fff' }, $attrs.style]"
      :rules="rules"
      ref="ruleFormRef"
    >
      <template v-if="form.row?.col && Array.isArray(form.row?.col)">
        <el-row :gutter="form?.row?.gutter">
          <el-col v-for="(child, _index) in form?.row.col" v-bind="omit(child, ['render', 'style', 'highlight'])">
            <el-form-item
              :label="child.label"
              :label-width="child.labelWidth"
              :style="child.props?.style"
              :required="child.props?.required"
              v-if="
                (child.display !== undefined &&
                  child.display.relate &&
                  (Array.isArray(child.display.relate)
                    ? child.display.relate.some((item) => {
                        return Model[item?.key] == item?.value;
                      })
                    : Model[child.display.relate?.key] == child.display.relate?.value)) ||
                child.display === undefined ||
                child.display.rule
              "
              :class="child.label?.length > 5 ? 'linebreak' : ''"
              :prop="child.pkey ? child.pkey + '.' + child.key : child.key"
            >
              <template #label v-if="child.tooltip">
                <div style="display: flex; width: 100%">
                  <div>{{ child.label }}</div>

                  <component :is="child.tooltip(child)" />
                </div>
              </template>

              <template v-if="typeof child.render == 'string' || !child.render || desc">
                <div v-html="Model[child.key]"></div>
              </template>

              <template v-else>
                <component
                  v-if="child.pkey"
                  :is="child.render(Model[child.pkey][child.key])"
                  v-model="Model[child.pkey][child.key]"
                ></component>

                <component
                  v-else
                  :is="
                    child.render(
                      Model[child.key],

                      child,

                      undefined,

                      undefined,
                    )
                  "
                  v-model="Model[child.key]"
                  :placeholder="child.props?.placeholder"
                >
                </component>
              </template>
            </el-form-item>
          </el-col>
        </el-row>
      </template>
    </el-form>
  </div>
</template>

<style scoped lang="less">
:deep(.hover-effect) {
  &:hover {
    background-color: #f1f1f1 !important;
  }
}

:deep(.el-col) {
  position: relative;
}

.editBtn {
  //绝对定位布局

  position: absolute;

  right: 10px;

  bottom: 3px;

  font-size: 20px;

  color: #ccc;

  cursor: pointer;

  color: #838383;

  border-radius: 20px;

  border: 1px solid #ccc;

  background-color: #fff;

  padding: 4px 0;

  width: 55px;

  font-size: 12px;

  height: 13px;

  display: flex;

  justify-content: space-evenly;
}

.page_search {
  background-color: #fff;

  height: auto;

  border-radius: 5px;

  :deep(.linebreak) {
    .el-form-item__label {
      width: 80px;

      height: auto !important;

      line-height: 20px;

      text-align: right;
    }
  }

  .form6-inline {
    padding: 10px 0 0 30px;
  }
}

:deep(.el-form-item__label-wrap) {
  margin-left: 0px !important;
}

:deep(.el-radio:last-child) {
  margin-right: 32px;
}

:deep(.el-radio-group) {
  align-items: start;
}
</style>
