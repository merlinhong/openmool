<template>
    <el-footer class="bg-gray-800 text-white py-8 h-fit">
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
                    <el-menu class="space-y-2 !bg-transparent w-fit !border-r-0" mode="vertical"  text-color="white">
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
                            <el-icon :size="28"><ChatDotRound /></el-icon>
                        </el-button>
                        <el-button type="text" class="text-white p-0 hover:text-blue-300">
                            <el-icon :size="28"><ChatRound /></el-icon>
                        </el-button>
                        <el-button type="text" class="text-white p-0 hover:text-blue-300">
                            <el-icon :size="28"><Platform /></el-icon>
                        </el-button>
                    </div>
                </div>
            </div>
            <div class="mt-8 text-center">
                <p>&copy; 2023 LowCode Platform. 保留所有权利.</p>
            </div>
        </div>
    </el-footer>
</template>

<script setup lang="ts">
import { ChatDotRound, ChatRound, Platform } from '@element-plus/icons-vue'
</script>

<style scoped>
.el-footer {
  background-color: #2d3748;
  color: white;
}

.el-button {
  border: none;
}

.el-icon {
  color: white;
}
</style>