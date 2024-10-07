<script setup lang="tsx">
import { onMounted, ref, nextTick } from "vue";
import { Page, Col } from "@/mool/types";
import { uuid } from "@/mool/utils";
import TopBar from "../components/TopBar.vue";
import SideBar from "../components/SideBar .vue";
import BasicCanvas from "../components/BasicCanvas.vue";
import ConfigPlane from "../components/Settings.vue";

const canvasRef = ref<InstanceType<typeof BasicCanvas>>();
const pageConfig = ref<Page>({
  ref: {},
  lifeCycles: {},
  state: {},
  methods: {},
  componentName: "Page",
  props: {
    style: {
      marginBottom: "18px",
      backgroundColor: "#fff",
    },
  },
  children: [],

  id: uuid(),

  css: "",
});
const currentConf = ref<Col | null>(null);
const activeCurrent = (val) => {
  console.log(val);

  currentConf.value = val;
};
const containerStyle = ref({ backgroundColor: " #e0dfdf" });
const hasActive = ref(false);
const openBar = (arr) => {
  if (arr[1]) {
    hasActive.value = true;
    Object.assign(containerStyle.value, arr[1]);
  } else {
    hasActive.value = false;
    containerStyle.value = { backgroundColor: " #e0dfdf" };
  }
};
onMounted(() => {
  fetch("/api/query-schema", {
    method: "get", // 或 'GET', 'PUT', 'DELETE', 等
  })
    .then((res) => res.json())
    .then((res) => {
      pageConfig.value = JSON.parse(res.data).pageInfo.schema;
      nextTick(() => {
        // 创建 <style> 元素并插入样式

        const styleEle = document.createElement("style");

        styleEle.dataset.id = pageConfig.value.id;

        styleEle.innerHTML = pageConfig.value.css;

        document.head.appendChild(styleEle);
        canvasRef.value?.init(pageConfig.value);
      });
    });
});
</script>

<template>
  <div class="common-layout">
    <el-container>
      <div class="px-[20px] bg-red-500 hover:bg-blue-500 object-cover">
        Hello world!
      </div>
      <el-header style="display: flex; align-items: center; background: #fff">
        <el-page-header style="flex:1" content="网页设计">
          <template #title>
            <div>
              {{ "未命名表单" }}
            </div>
          </template>
          <template #content>
            <div style="display: flex; align-items: center;justify-content: end;width:45vw">
              <span class="text-large font-600 mr-3"> 网页设计 </span>
            </div>
          </template>
          <template #extra>
            <div style="width: 300px; text-align: right">登录</div>
          </template>
        </el-page-header>
      </el-header>
      <TopBar v-model:pageConfig="pageConfig" />
      <el-container :style="{ height: 'calc(100vh - 120px)', ...containerStyle }">
        <SideBar v-model:pageConfig="pageConfig" @change="openBar" />
        <BasicCanvas ref="canvasRef" v-model:pageConfig="pageConfig" :hasActive="hasActive" @active="activeCurrent" />
        <el-aside class="page-design-config" style="background-color: #fff">
          <config-plane :is-show-config="true" v-model:current="currentConf" v-model:pageConfig="pageConfig" />
        </el-aside>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="less" scoped>
:deep(.hover-effect) {
  &:hover {
    background-color: #f1f1f1 !important;
  }
}

.common-layout {
  position: relative;
}

.enter_page {
  border: 1px dashed #32adf7;
}

.hover_child {
  position: relative;

  box-sizing: border-box;

  &:hover {
    border: 1px dashed #32adf7;

    &::before {
      display: block;

      content: attr(data-tag);

      position: absolute;

      top: -20px;

      left: 0;

      width: fit-content;

      color: #32adf7;
    }
  }
}

#active {
  position: relative;

  border: 2px solid #32adf7 !important;

  // &::before {

  // display: block;

  // content: attr(data-tag);

  // position: absolute;

  // left: -2px;

  // bottom: -20px;

  // width: fit-content;

  // padding: 0 5px;

  // height: 20px;

  // background-color: #1cd88a;

  // color: #fff;

  // line-height: 20px;

  // text-align: center;

  // }
}

:deep(.dragging) {
  background-color: #fff;

  border: 1px dashed @success-color;

  position: relative;

  &:after {
    content: "";

    width: 100%;

    height: 100%;

    background-color: #fff;

    position: absolute;

    top: 0;

    left: 0;

    right: 0;

    bottom: 0;

    z-index: 999;
  }
}

.hover {
  &:hover {
    border: 1px dashed #32adf7;
  }
}
</style>
