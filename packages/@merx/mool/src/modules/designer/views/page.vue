<script setup lang="tsx">
import { onMounted, ref, nextTick } from "vue";
import { Page, Col } from "@/mool/types";
import TopBar from "../components/TopBar.vue";
import SideBar from "../components/SideBar.vue";
import BasicCanvas from "../components/BasicCanvas.vue";
import ConfigPlane from "../components/settings.vue";
import { Avatar } from "@element-plus/icons-vue";
import useLoading from "@/mool/hooks/loading";
import { useStore } from "@/mool/store";
const { loading, setLoading } = useLoading(true);
const { canvas } = useStore();
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

  id: "main",

  css: "",
});
const clonePageConfig = { ...pageConfig.value };
const currentConf = ref<Col | null>(null);
const activeCurrent = (val: Col) => {
  console.log(val);

  currentConf.value = val;
};
const containerStyle = ref<{ width?: string, margin?: string }>({});
const hasActive = ref(false);

const openBar = (arr: [boolean, string]) => {

  if (arr[1]) {
    hasActive.value = true;
    containerStyle.value.margin = arr[1];
  } else {
    hasActive.value = false;
    containerStyle.value = {};
  }
};
const changeSize = (option: { size: string; isPC: boolean }) => {
  canvas.setCanvasType(option.isPC ? 'pc' : 'mobile');
  containerStyle.value.width = option.size;

  // 根据画布类型设置组件样式
  if (option.isPC) {
    // PC 端样式
    pageConfig.value.props.style = {
      ...pageConfig.value.props.style,
      padding: '20px',
      maxWidth: '1200px',
      margin: '0 auto',
    };
  } else {
    // 移动端样式
    pageConfig.value.props.style = {
      ...pageConfig.value.props.style,
      padding: '10px',
      maxWidth: '100%',
      margin: '0',
    };
  }

  // 更新子组件样式
  updateChildrenStyles(pageConfig.value.children, option.isPC);
};

// 递归更新子组件样式
const updateChildrenStyles = (children: any[], isPC: boolean) => {
  children.forEach(child => {
    if (isPC) {
      child.props.style = {
        ...child.props.style,
        width: '100%',
        marginBottom: '20px',
      };
    } else {
      child.props.style = {
        ...child.props.style,
        width: '100%',
        marginBottom: '10px',
      };
    }

    if (child.children && child.children.length > 0) {
      updateChildrenStyles(child.children, isPC);
    }
  });
};

const querySchema = (id: string = "main") => {
  Object.assign(pageConfig.value, clonePageConfig);
  setLoading(true);
  fetch(`/api/query-schema/${id}`, {
    method: "get", // 或 'GET', 'PUT', 'DELETE', 等
  })
    .then((res) => res.json())
    .then((res) => {
      nextTick(() => {
        setTimeout(() => {
          // 创建 <style> 元素并插入样式
          pageConfig.value = res.data.pageInfo.schema;
          const styleEle = document.createElement("style");

          styleEle.dataset.id = pageConfig.value.id;

          styleEle.innerHTML = pageConfig.value.css;

          document.head.appendChild(styleEle);

          canvasRef.value?.init(pageConfig.value);

          setLoading(false);
        }, 200);
      });
    });
};
onMounted(querySchema);
</script>

<template>
  <div class="common-layout ">
    <el-container>
      <el-header style="display: flex; align-items: center; background: #fff">
        <el-page-header style="flex: 1" content="网页设计">
          <template #title>
            <div>
              {{ "未命名表单" }}
            </div>
          </template>
          <template #content>
            <div style="display: flex; align-items: center; justify-content: end; width: 45vw">
              <span class="text-large font-600 mr-3"> 网页设计 </span>
            </div>
          </template>
          <template #extra>
            <div style="width: 300px; text-align: right">
              <el-icon class="text-gray-500 text-2xl mx-2 align-top">
                <Avatar />
              </el-icon>登录
            </div>
          </template>
        </el-page-header>
      </el-header>
      <!-- 顶部栏组件，用于显示和编辑页面配置 -->
      <!-- v-model:pageConfig 用于双向绑定页面配置 -->
      <TopBar v-model:pageConfig="pageConfig" @changeSize="changeSize" />
      <el-container :style="{ height: 'calc(100vh - 120px)' }" class="justify-between">
        <!-- 侧边栏组件，用于显示和编辑页面配置 -->
        <!-- v-model:pageConfig 用于双向绑定页面配置 -->
        <!-- @change 事件用于监听侧边栏的打开或关闭 -->
        <SideBar v-model:pageConfig="pageConfig" @change="openBar" :current-conf="currentConf"
          @editPage="querySchema" />
        <!-- 画布组件，用于显示和编辑页面内容 -->
        <!-- v-model:pageConfig 用于双向绑定页面配置 -->
        <!-- :hasActive 用于控制画布的激活状态 -->
        <!-- @active 事件用于监听画布的激活状态 -->
        <BasicCanvas ref="canvasRef" v-model:pageConfig="pageConfig" :hasActive="hasActive" @active="activeCurrent"
          :customStyle="containerStyle" v-loading="loading" />
        <!-- 侧边栏组件，用于显示和编辑页面配置 -->
        <!-- v-model:current 用于双向绑定当前配置项 -->
        <!-- v-model:pageConfig 用于双向绑定页面配置 -->
        <el-aside class="page-design-config" style="background-color: #fff;width: 260px;">
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
