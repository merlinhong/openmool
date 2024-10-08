<template>
    <el-header class="bg-black text-white shadow-md">
        <div class="container mx-auto flex justify-between items-center h-full px-4">
            <div class="text-2xl font-bold">酒店名称</div>
            <el-menu class="hidden md:flex flex-grow !bg-black " mode="horizontal" :ellipsis="false" textColor='#fff'
                backgroundColor='#333'>
                <el-menu-item index="1" >首页</el-menu-item>
                <el-menu-item index="2" >客房</el-menu-item>
                <el-menu-item index="3" >设施</el-menu-item>
                <el-menu-item index="4" >联系我们</el-menu-item>
            </el-menu>
            <el-button type="primary" @click="openLoginModal">登录</el-button>
        </div>
    </el-header>
</template>

<script setup lang="ts">
const emit = defineEmits(['openLoginModal']);

const openLoginModal = () => {
  emit('openLoginModal');
};
</script>

<style scoped>
/* 可以添加一些样式来美化头部 */
.el-header {
  padding: 0; /* 移除默认的内边距 */
}
</style>