<template>
  <div class="project-manager">
    <header class="top-nav max-md:!px-1 ">
      <div class="max-md:!block hidden" @click="showMenu = true">
        <svg class="w-6 h-6">
          <use xlink:href="#icon-menu" />
        </svg>
      </div>
      <h1 @click="toHome"
        class="cursor-pointer tracking-in-expand text-transparent text-3xl bg-clip-text bg-gradient-to-r from-blue-400 to-pink-600  font-extrabold">
        <i>MoolEngine</i>
      </h1>
      <el-tabs @tab-change="toggle" v-model="active" class="max-md:!hidden" >
        <el-tab-pane label="我的应用" name="0"> </el-tab-pane>
        <el-tab-pane label="模板中心" name="1"></el-tab-pane>
        <el-tab-pane label="设计器" name="2"></el-tab-pane>
        <el-tab-pane label="组件市场" name="3"></el-tab-pane>
        <el-tab-pane label="插件生态" name="4"></el-tab-pane>
        <el-tab-pane label="产品文档" name="5"></el-tab-pane>
      </el-tabs>
      <div style="width: 100px; text-align: right">
        <el-icon class="text-gray-500 text-2xl mx-2 align-middle"> <i-ep-Avatar /></el-icon>
        <el-button @click="$router.push('./login')">登录</el-button>
      </div>
    </header>
    <router-view></router-view>
    <!--小屏菜单侧边栏抽屉-->
    <el-drawer size="40%" direction="ltr" v-model="showMenu" title="菜单" :with-header="false" :before-close="() => {
      showMenu = false;
      return false;
    }">
      <el-menu :default-active="activeMenu" @select="select">
        <el-menu-item index="1">
          <span> 我的应用</span>
        </el-menu-item>
        <el-menu-item index="2">
          <span> 模板中心</span>
        </el-menu-item>
        <el-menu-item index="3">
          <span> 设计器</span>
        </el-menu-item>
        <el-menu-item index="4">
          <span> 组件市场</span>
        </el-menu-item>
        <el-menu-item index="5">
          <span> 插件生态</span>
        </el-menu-item>
        <el-menu-item index="6">
          <span> 产品生态</span>
        </el-menu-item>
      </el-menu>
    </el-drawer>
  </div>
</template>

<script setup lang="tsx">
import * as vue from "vue";
import { useMool } from "@/mool";
import { theme } from "../config";

const { refs, setRefs, router, route } = useMool();
const showMenu = vue.ref(false);
const list: Record<number, { title: string; path: string }> = {
  0: {
    title: "我的应用",
    path: "apply",
  },
  1: {
    title: "模板中心",
    path: "template",
  },
  2: {
    title: "设计器",
    path: "my-designer",
  },
  4: {
    title: "插件生态",
    path: "plugin",
  },
  // 3: {
  //   title:"我的应用",
  //   path:'apply'
  // },
  // 4: {
  //   title:"我的应用",
  //   path:'apply'
  // },
  // 2: "我的设计器",
  // 1: "应用中心",
  // 3: "组件市场",
  // 4: "插件生态",
};
const active = vue.ref("");
const activeMenu = vue.ref("");
const toggle = (val: any) => {
  router.push(list[val].path);
};

const select = (val: any) => {
  console.log(val);

  activeMenu.value = val;
  router.push(list[val - 1].path);
}
const toHome = () => {
  active.value = "";
  activeMenu.value = '';
  router.push("./home");
};
vue.onMounted(() => {
  for (const key in list) {
    if (Object.prototype.hasOwnProperty.call(list, key)) {
      const element = list[key];
      if (route.path.indexOf(element.path) > -1) {
        active.value = key;
      }
    }
  }
});
</script>

<style scoped>
.project-manager {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #fff;
  color: v-bind("theme.text");
}

.top-nav {
  background-color: white;
  color: v-bind("theme.text");
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* border-bottom: 1px solid v-bind("theme.border"); */
  padding: 0.5rem 3rem;
}

:deep(.el-tabs__item) {
  /* color:#fff */
}

.top-nav nav {
  display: flex;
  justify-content: center;
  width: 90%;
}

:deep(.el-tabs__nav-wrap::after) {
  height: 0;
  /* 移除底部的线 */
}

.tracking-in-expand {
  animation: tracking-in-expand 0.7s cubic-bezier(0.215, 0.61, 0.355, 1) both;
}

@keyframes tracking-in-expand {
  0% {
    letter-spacing: -0.5em;
    opacity: 0;
  }

  40% {
    opacity: 0.6;
  }

  100% {
    opacity: 1;
  }
}
:deep(.el-tabs__header){
  margin: 0 !important;
}
</style>
