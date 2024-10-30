<template>
    <div class="overflow-auto flex flex-col bg-white min-h-screen">
        <main class="flex-grow flex flex-col">
            <section class="bg-blue-600 text-white py-20">
                <div class="container mx-auto px-4 text-center">
                    <h1 class="text-4xl md:text-6xl font-bold mb-4">构建应用从未如此简单</h1>
                    <p class="text-xl mb-8">使用我们的低代码平台，快速创建、部署和管理应用程序</p>
                    <el-button type="primary" size="large">开始免费试用</el-button>
                </div>
            </section>
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
        </main>
        <el-footer class="bg-gray-800 text-white py-8 h-fit mt-auto">
            <div class="container mx-auto px-4">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 class="text-xl font-semibold mb-4">联系我们</h3>
                        <p>地址: 某某市某某区某某街123号</p>
                        <p>电话: 123-456-7890</p>
                        <p>邮箱: support@lowcodeplatform.com</p>
                    </div>
                    <div>
                        <h3 class="text-xl font-semibold mb-4">快速链接</h3>
                        <el-menu class="space-y-2 !bg-transparent w-fit !border-r-0" mode="vertical" text-color="white">
                            <el-menu-item>关于我们</el-menu-item>
                            <el-menu-item>产品功能</el-menu-item>
                            <el-menu-item>定价方案</el-menu-item>
                            <el-menu-item>帮助文档</el-menu-item>
                        </el-menu>
                    </div>
                    <div>
                        <h3 class="text-xl font-semibold mb-4">关注我们</h3>
                        <div class="flex space-x-6">
                            <el-button type="text" class="text-white p-0 hover:text-blue-300">
                                <el-icon :size="28">
                                    <ChatDotRound />
                                </el-icon>
                            </el-button>
                            <el-button type="text" class="text-white p-0 hover:text-blue-300">
                                <el-icon :size="28">
                                    <ChatRound />
                                </el-icon>
                            </el-button>
                            <el-button type="text" class="text-white p-0 hover:text-blue-300">
                                <el-icon :size="28">
                                    <Platform />
                                </el-icon>
                            </el-button>
                        </div>
                    </div>
                </div>
                <div class="mt-8 text-center">
                    <p>&copy; 2023 LowCode Platform. 保留所有权利.</p>
                </div>
            </div>
        </el-footer>
    </div>
</template>
  
<script setup lang="ts">
import { ref, watch } from 'vue';
import { Cpu, Brush, Stopwatch } from '@element-plus/icons-vue'

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
  
<style scoped>
/* 这里可以添加页面级的样式 */
</style>