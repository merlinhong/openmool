<template>
    <el-footer class="bg-black text-white py-8 h-fit">
        <div class="container mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h3 class="text-xl font-semibold mb-4">联系我们</h3>
                    <p>地址: 某某市某某区某某街123号</p>
                    <p>电话: 123-456-7890</p>
                    <p>邮箱: info@hotelname.com</p>
                </div>
                <div>
                    <h3 class="text-xl font-semibold mb-4">快速链接</h3>
                    <el-menu class="space-y-2 !bg-black w-fit" mode="vertical" :ellipsis="false" textColor='#fff'
                        backgroundColor='#333'>
                        <el-menu-item>关于我们</el-menu-item>
                        <el-menu-item>客房预订</el-menu-item>
                        <el-menu-item>设施服务</el-menu-item>
                        <el-menu-item>常见问题</el-menu-item>
                    </el-menu>
                </div>
                <div>
                    <h3 class="text-xl font-semibold mb-4">关注我们</h3>
                    <div class="flex space-x-4">
                        <el-button type="text" icon="el-icon-chat-dot-round" class="text-white"
                            @click="openFeishu"></el-button>
                        <el-button type="text" icon="el-icon-wechat" class="text-white" @click="openWeChat"></el-button>
                        <el-button type="text" icon="el-icon-sina-weibo" class="text-white"
                            @click="openWeibo"></el-button>
                    </div>
                </div>
            </div>
            <div class="mt-8 text-center">
                <p>&copy; 2023 酒店名称. 保留所有权利.</p>
            </div>
        </div>
    </el-footer>
</template>

<script setup lang="ts">
// 这里可以添加脚本逻辑
</script>

<style scoped>
/* 确保背景颜色和文本颜色 */
.el-footer {
  background-color: black; /* 确保背景颜色为黑色 */
  color: white; /* 确保文本颜色为白色 */
}
</style>