<template>
  <el-carousel :interval="5000" arrow="always" class="relative h-64 md:h-96">
    <el-carousel-item v-for="(image, index) in images" :key="index">
      <img :src="image" :alt="`Slide ${index + 1}`" class="w-full h-full object-cover" />
    </el-carousel-item>
  </el-carousel>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const images = [
  '/path/to/image1.jpg',
  '/path/to/image2.jpg',
  '/path/to/image3.jpg',
];
</script>

<style scoped>
/* 可以添加一些样式来美化走马灯 */
</style>