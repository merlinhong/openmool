<template>
  <section class="py-16 bg-gray-100">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-8">平台特色</h2>
      <el-row :gutter="20">
        <el-col v-for="feature in features" :key="feature.title" :span="8">
          <el-card class="bg-white rounded-lg shadow-md h-full">
            <el-icon :size="40" class="mb-4 text-blue-600">
              <component :is="feature.icon"></component>
            </el-icon>
            <h3 class="text-xl font-semibold mb-2">{{ feature.title }}</h3>
            <p class="text-gray-600">{{ feature.description }}</p>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </section>
</template>
<script setup lang="ts">
import { Cpu, Brush, Stopwatch } from '@element-plus/icons-vue'

const features = [
  {
    title: '拖拽式界面构建',
    description: '通过简单的拖拽操作，快速创建美观的用户界面。',
    icon: Brush,
  },
  {
    title: '强大的逻辑引擎',
    description: '使用可视化流程设计器，轻松实现复杂的业务逻辑。',
    icon: Cpu,
  },
  {
    title: '快速部署',
    description: '一键部署应用，节省开发时间，加快上线速度。',
    icon: Stopwatch,
  },
];
</script>
