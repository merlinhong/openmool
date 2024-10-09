<template>
    <el-header class="bg-white text-gray-800 shadow-md">
        <div class="container mx-auto flex justify-between items-center h-full px-4">
            <div class="text-2xl font-bold text-blue-600">LowCode Platform</div>
            <el-menu class="hidden md:flex flex-grow" mode="horizontal" :ellipsis="false">
                <el-menu-item index="1">首页</el-menu-item>
                <el-menu-item index="2">功能</el-menu-item>
                <el-menu-item index="3">价格</el-menu-item>
                <el-menu-item index="4">文档</el-menu-item>
            </el-menu>
            <el-button type="primary" @click="openLoginModal">登录</el-button>
        </div>
    </el-header>
</template>
<script setup lang="ts">
const emit = defineEmits(['openLoginModal']);

const openLoginModal = () => {
  console.log('Header: Login button clicked');
  emit('openLoginModal');
};
</script>

<style scoped>
.el-header {
  padding: 0;
}
</style>
