<template>
    <div class="container">
        <van-header title="Lazyload 图片懒加载"></van-header>
        <div class="van-content">
            <h4 class="cell-title">基础用法</h4>
            <img v-for="img in imageList" v-lazy="img" :key="img" />

            <h4 class="cell-title">背景图懒加载</h4>
            <div
                v-for="img in imageList"
                v-lazy:background-image="img"
                :key="img"
                style="height: 250px; width: 100%; margin-bottom: 20px; background-size: 100%"
            />

            <h4 class="cell-title">组件懒加载</h4>
            <!-- 需要注册 lazyComponent  -->
            <lazy-component>
                <img v-for="img in imageList" v-lazy="img" :key="img" />
            </lazy-component>
        </div>
    </div>
</template>

<script>
// 需要在 main.js 中引入 Lazyload 模块方可使用 v-lazy
import vanHeader from '@components/header';

export default {
    name: 'Lazyload',
    components: {
        vanHeader
    },
    data() {
        return {
            imageList: [
                'https://img.yzcdn.cn/vant/apple-1.jpg',
                'https://img.yzcdn.cn/vant/apple-2.jpg',
                'https://img.yzcdn.cn/vant/apple-3.jpg',
                'https://img.yzcdn.cn/vant/apple-4.jpg'
            ]
        };
    }
};
</script>

<style lang="scss" scoped>
.van-content {
    background-color: #f7f8fa;
    padding-left: 10px;
    padding-right: 10px;

    img,
    .bg-img {
        padding: 15px;
        width: 100%;
        height: 250px;
        margin: 10px 0 0;
        background-color: white;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
        background-size: 315px 250px;
        background-position: 15px;
        background-repeat: no-repeat;
        box-sizing: border-box;
    }
}
</style>
