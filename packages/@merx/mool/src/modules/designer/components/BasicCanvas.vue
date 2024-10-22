<template>
  <div :class="['page-design-content', 'h-full']" ref="canvasRef" :style="customStyle">
    <!-- 表单为空时的占位：从左侧拖拽来添加表单 -->
    <div
      :class="[
        'page-design-placeholder',
        {
          hover: !currAEl.clickId,
          enter_page: currAEl.overId == PageSchema?.id,
        },
      ]"
      :id="currAEl.clickId == PageSchema?.id ? 'active' : ''"
      v-if="!PageSchema?.children?.length"
      style="
        height: 100%;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        box-sizing: border-box;
      "
    >
      <span style="font-size: 14px; color: #999">从左侧拖拽来添加组件</span>
    </div>
    <div
      v-else
      :style="{
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
        background: '#f1f1f1 !important',
      }"
      :class="[
        'page',
        {
          hover_child: currAEl.hoverId == PageSchema?.id,
          enter_page: currAEl.hoverId == PageSchema?.id,
          active: currAEl.clickId == PageSchema?.id,
        },
      ]"
      :data-tag="PageSchema?.componentName"
      :data-id="PageSchema?.id"
      :id="currAEl.clickId == PageSchema?.id ? 'active' : ''"
      @mouseleave="currAEl.hoverId = null"
      @mouseover="currAEl.hoverId = PageSchema?.id"
      @click="getCurrent()"
    >
      <BasicPage
        :popup="PageSchema?.popup"
        v-for="(box, ind) in PageSchema?.children"
        :key="ind"
        :schema="box"
        v-model:currAEl="currAEl"
        @delete="del"
        @copy="copy"
        @current="getCurrent"
        @start="start"
        @enter="enter"
        @leave="leave"
        @over="over"
        @end="end"
      />
    </div>
  </div>
</template>

<script setup lang="tsx">
import { ref, PropType, toRaw, watch, onMounted, nextTick, Ref, onUnmounted, defineComponent } from "vue";
import { BasicFormConfig, Col, Page } from "@/mool";
import { DragUtil, type RemoveDrag } from "@/mool/utils";
import BasicPage from "$/designer/components/canvasContainer.vue";

defineComponent({
  components: {
    ResizeObserver,
  },
});

const props = defineProps({
  pageConfig: {
    type: Object as PropType<Page>,
    required: true,
  },

  hasActive: {
    type: Boolean,
    default: () => true,
  },
  customStyle: {
    type: Object,
    default: () => ({ width: "100%" }),
  },
  doc: {
    type: Object as PropType<Document | null>,
    default: () => window.document,
  },
});

type CurrAEl = {
  /**
   * 当前点击的元素id
   */
  clickId: string | null;
  /**
   * 当前鼠标经过的元素id
   */
  overId: string | null;
  /**
   * 鼠标hover当前组件的id
   */
  hoverId: string | null;
  /**
   * 鼠标覆盖当前元素的顶部
   */
  insertTopId: string | null;
  /**
   * 鼠标覆盖当前元素的底部
   */
  insertBottomId: string | null;
};

const canvasRef = ref<HTMLElement>();
const PageSchema = defineModel<Page>("pageConfig", { required: true });
console.log(PageSchema.value);

const currAEl = ref<CurrAEl>({
  clickId: null,
  overId: null,
  hoverId: null,
  insertTopId: null,
  insertBottomId: null,
});

let removeDrag: RemoveDrag = null;
const { dragCompToCanvas, start, enter, over, leave, end, deleteItem, copyItem, initializeComponentMap } = new DragUtil(
  {
    drag: {
      startEle: [".base-component li"],
      endEle: ".page-design-content",
    },
    canvasDrag: {
      startEle: [".page .canvascomp"],
      endEle: ".overlay",
    },
  },
  (AEl) => Object.assign(currAEl.value, AEl),
);

const emit = defineEmits(["active"]);
const del = (id: string) => {
  deleteItem(id);
  emit("active", null);
};

const copy = (id: string) => {
  copyItem(id);
};

const activeCurrent = (e: Event) => {
  const target = e.target as HTMLElement;
  currAEl.value.clickId = target.dataset.id as string;
};

const getCurrent = (conf?: Col) => {
  emit("active", conf);
  currAEl.value.clickId = !conf ? PageSchema.value.id : (conf?.id as string);
};
watch(
  () => props.hasActive,
  (n, o) => {
    if (n) {
      const [remove] = dragCompToCanvas(
        PageSchema,
        (conf) => {
          getCurrent(conf);
        },
        props.doc as Document,
      );
      removeDrag = remove;
    } else {
      removeDrag?.();
    }
  },
);
onMounted(() => {
  if (props.hasActive) {
    const [remove] = dragCompToCanvas(PageSchema, (conf) => {
      getCurrent(conf);
    });
    removeDrag = remove;
  }
});
onUnmounted(() => {
  removeDrag?.();
});
defineExpose({
  init: initializeComponentMap,
  del,
});
</script>

<style lang="less" scoped>
.hover_child {
  &::before {
    display: block;
    content: attr(data-tag);
    position: absolute;
    top: -20px;
    left: 0;
    width: fit-content;
    color: #32adf7;
    z-index: 999;
  }
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 1px dashed #32adf7;
    pointer-events: none;
  }
}
.active {
  position: relative;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 2px solid #32adf7;
    pointer-events: none;
  }
}
</style>
