<template>
  <div class="project-manager">
    <header class="top-nav">
      <h1 class="cursor-pointer" @click="toHome">
        <strong><em>MoolEngine</em></strong>
      </h1>
      <el-tabs class="m-auto" @tab-change="toggle" v-model="active">
        <el-tab-pane label="我的应用" name="0"> </el-tab-pane>
        <el-tab-pane label="应用中心" name="1"></el-tab-pane>
        <el-tab-pane label="设计器" name="2"></el-tab-pane>
        <el-tab-pane label="组件市场" name="3"></el-tab-pane>
        <el-tab-pane label="插件生态" name="4"></el-tab-pane>
        <el-tab-pane label="使用手册" name="5"></el-tab-pane>
      </el-tabs>
      <div style="width: 300px; text-align: right">
        <el-icon class="text-gray-500 text-2xl mx-2 align-middle"> <i-ep-Avatar /></el-icon>
        <el-button @click="$router.push('./login')">登录</el-button>
      </div>
    </header>
    <router-view></router-view>



  </div>
</template>

<script setup lang="tsx">
import * as vue from "vue";
import { useMool } from "@/mool";
import { theme } from "../config";


const { refs, setRefs, router, route } = useMool();
const list: Record<number, { title: string; path: string }> = {
  0: {
    title: "我的应用",
    path: 'apply'
  },
  // 1: {
  //   title:"我的应用",
  //   path:'./apply'
  // },
  2: {
    title: "设计器",
    path: 'my-designer'
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
const type = vue.ref(0);
const toggle = (val: any) => {
  type.value = val;
  router.push(list[val].path)

};
const toHome = () => {
  active.value = '';
  router.push("./home");
};
vue.onMounted(() => {
  for (const key in list) {
    if (Object.prototype.hasOwnProperty.call(list, key)) {
      const element = list[key];
      if (route.path.indexOf(element.path) > -1) {
        active.value = key
      }
    }
  }
})
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
  padding: 0.2rem 1rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid v-bind("theme.border");
}

.top-nav h1 {
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
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
</style>
