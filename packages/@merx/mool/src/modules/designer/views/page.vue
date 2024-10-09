<script setup lang="tsx">
import { onMounted, ref, nextTick } from "vue";
import { Page, Col } from "@/mool/types";
import { uuid } from "@/mool/utils";
import TopBar from "../components/TopBar.vue";
import SideBar from "../components/SideBar.vue";
import BasicCanvas from "../components/BasicCanvas.vue";
import ConfigPlane from "../components/settings.vue";

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
const activeCurrent = (val: Col) => {
  console.log(val);

  currentConf.value = val;
};
const containerStyle = ref({ backgroundColor: " #e0dfdf" });
const hasActive = ref(false);
const openBar = (arr: [boolean, Record<string, string>]) => {
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
            <div style="width: 300px; text-align: right;" >登录</div>
          </template>
        </el-page-header>
      </el-header>
      <!-- 顶部栏组件，用于显示和编辑页面配置 -->
      <!-- v-model:pageConfig 用于双向绑定页面配置 -->
      <TopBar v-model:pageConfig="pageConfig" />
      <el-container :style="{ height: 'calc(100vh - 120px)', ...containerStyle }">
        <!-- 侧边栏组件，用于显示和编辑页面配置 -->
        <!-- v-model:pageConfig 用于双向绑定页面配置 -->
        <!-- @change 事件用于监听侧边栏的打开或关闭 -->
        <SideBar v-model:pageConfig="pageConfig" @change="openBar" />
        <!-- 画布组件，用于显示和编辑页面内容 -->
        <!-- v-model:pageConfig 用于双向绑定页面配置 -->
        <!-- :hasActive 用于控制画布的激活状态 -->
        <!-- @active 事件用于监听画布的激活状态 -->
        <BasicCanvas ref="canvasRef" v-model:pageConfig="pageConfig" :hasActive="hasActive" @active="activeCurrent" />
        <!-- 侧边栏组件，用于显示和编辑页面配置 -->
        <!-- v-model:current 用于双向绑定当前配置项 -->
        <!-- v-model:pageConfig 用于双向绑定页面配置 -->
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

</style>
