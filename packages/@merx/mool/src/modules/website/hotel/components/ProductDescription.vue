<template>
  <section class="py-16 bg-gray-100 flex-grow">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-8">我们的特色</h2>
      <el-row :gutter="20">
        <el-col v-for="feature in features" :key="feature.title" :span="8">
          <el-card class="bg-white rounded-lg shadow-md">
            <img :src="feature.image" :alt="feature.title" class="w-full h-48 object-cover rounded-lg mb-4">
            <h3 class="text-xl font-semibold mb-2">{{ feature.title }}</h3>
            <p class="text-gray-600">{{ feature.description }}</p>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </section>
</template>

<script setup lang="ts">
const features = [
  {
    title: '豪华客房',
    description: '体验我们精心设计的豪华客房,为您提供舒适的住宿体验。',
    image: '/path/to/room-image.jpg',
  },
  {
    title: '顶级餐厅',
    description: '品尝我们米其林星级厨师精心烹饪的美味佳肴。',
    image: '/path/to/restaurant-image.jpg',
  },
  {
    title: '水疗中心',
    description: '在我们的水疗中心放松身心,享受专业的护理服务。',
    image: '/path/to/spa-image.jpg',
  },
];
</script>

<style scoped>
/* 移除之前的调试样式 */
</style>