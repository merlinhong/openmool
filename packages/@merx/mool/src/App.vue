<script setup lang="ts">
import { onMounted } from "vue";
// import { RouterView } from "vue-router";

onMounted(() => {
  // fetch();
});
</script>

<template>
  <el-container direction="vertical">
    <RouterView></RouterView>
  </el-container>
</template>

<style scoped>
html {
  background-color: #f1f1f1;
  body {
    margin: 0;
  }
}
.el-container{
  width: 100%;height: 100%;
}
.el-main {
  padding: 20px;
}
.active :deep(.el-breadcrumb__inner) {
  color: #000 !important;
  font-weight: bold !important;
}
</style>
