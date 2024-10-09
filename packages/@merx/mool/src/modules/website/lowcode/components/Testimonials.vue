<template>
  <section class="py-16 bg-white">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-8">客户评价</h2>
      <el-carousel :interval="5000" type="card" height="300px">
        <el-carousel-item v-for="testimonial in testimonials" :key="testimonial.name">
          <el-card class="h-full flex flex-col justify-center p-6">
            <p class="text-lg mb-4">"{{ testimonial.content }}"</p>
            <div class="font-semibold">{{ testimonial.name }}</div>
            <div class="text-gray-600">{{ testimonial.position }}</div>
          </el-card>
        </el-carousel-item>
      </el-carousel>
    </div>
  </section>
</template>

<script setup lang="ts">
const testimonials = [
  {
    content: "这个低代码平台极大地提高了我们的开发效率，让我们能够快速响应市场需求。",
    name: "张三",
    position: "技术总监, ABC公司"
  },
  {
    content: "界面直观，功能强大，即使是非技术人员也能轻松上手。",
    name: "李四",
    position: "产品经理, XYZ科技"
  },
  {
    content: "客户支持团队反应迅速，帮助我们快速解决了遇到的问题。",
    name: "王五",
    position: "CTO, 创新创业公司"
  }
];
</script>