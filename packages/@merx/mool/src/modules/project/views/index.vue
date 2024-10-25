<template>
  <div class="project-manager">
    <header class="top-nav">
      <h1><strong><em>MoolEngine</em></strong></h1>
      <el-tabs class="m-auto" @tab-change="toggle">
        <el-tab-pane label="我的应用" name="0">
        </el-tab-pane>
        <el-tab-pane label="应用中心" name="1"></el-tab-pane>
        <el-tab-pane label="设计器" name="2"></el-tab-pane>
        <el-tab-pane label="组件市场" name="3"></el-tab-pane>
        <el-tab-pane label="插件生态" name="4"></el-tab-pane>
        <el-tab-pane label="使用手册" name="5"></el-tab-pane>
      </el-tabs>
      <div style="width: 300px; text-align: right">
        <el-icon class="text-gray-500 text-2xl mx-2 align-top"> <i-ep-Avatar /></el-icon>登录
      </div>
    </header>
    <section class="w-full h-[250px] bg-blue-50 flex justify-evenly">
      <h2 class="flex justify-center items-center text-4xl ">
        {{list[type]}}
      </h2>
      <svg>
        <use xlink:href="#icon-banner" />
      </svg>
    </section>
    <ProjectList @select-project="selectProject" v-if="type == 0" />
  </div>
</template>

<script setup lang="tsx">
import * as vue from 'vue';
import { useMool } from "@/mool";

import ProjectList from '../components/ProjectList.vue';
import PageList from '../components/PageList.vue';
// import ComponentLibrary from '../components/ComponentLibrary.vue';
import { theme } from '../config';
const { refs, setRefs, router } = useMool();
const list:Record<number,string> = {
  0:'我的应用',
  1:'应用中心',
  3:'组件市场',
  4:'插件生态'
}
const type = vue.ref(0);
const toggle = (val: number) => {
  console.log(val);
  type.value = val;
  if(val==2){
    router.push('/designer');
  }

}

</script>

<style scoped>
.project-manager {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #fff;
  color: v-bind('theme.text');
}

.top-nav {
  background-color: white;
  color: v-bind('theme.text');
  padding: 0.2rem 1rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid v-bind('theme.border');
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


main {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
}

.placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 18px;
  color: v-bind('theme.lightText');
}

:deep(.el-tabs__nav-wrap::after) {
  height: 0;
  /* 移除底部的线 */
}
</style>
