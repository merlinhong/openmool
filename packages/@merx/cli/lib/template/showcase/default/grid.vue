<template>
    <div class="container">
        <van-header title="Grid 宫格"></van-header>
        <div class="van-content">
            <h4 class="cell-title">基础用法</h4>
            <van-grid>
                <van-grid-item icon="photo-o" text="文字" />
                <van-grid-item icon="photo-o" text="文字" />
                <van-grid-item icon="photo-o" text="文字" />
                <van-grid-item icon="photo-o" text="文字" />
            </van-grid>

            <h4 class="cell-title">自定义列数</h4>
            <van-grid :column-num="3">
                <van-grid-item v-for="value in 6" :key="value" icon="photo-o" text="文字" />
            </van-grid>

            <h4 class="cell-title">自定义内容</h4>
            <van-grid :border="false" :column-num="3">
                <van-grid-item>
                    <van-image src="https://img.yzcdn.cn/vant/apple-1.jpg" />
                </van-grid-item>
                <van-grid-item>
                    <van-image src="https://img.yzcdn.cn/vant/apple-2.jpg" />
                </van-grid-item>
                <van-grid-item>
                    <van-image src="https://img.yzcdn.cn/vant/apple-3.jpg" />
                </van-grid-item>
            </van-grid>

            <h4 class="cell-title">正方形格子</h4>
            <van-grid square>
                <van-grid-item v-for="value in 8" :key="value" icon="photo-o" text="文字" />
            </van-grid>

            <h4 class="cell-title">格子间距</h4>
            <van-grid :gutter="10">
                <van-grid-item v-for="value in 8" :key="value" icon="photo-o" text="文字" />
            </van-grid>

            <h4 class="cell-title">内容横排</h4>
            <van-grid direction="horizontal" :column-num="3">
                <van-grid-item icon="photo-o" text="文字" />
                <van-grid-item icon="photo-o" text="文字" />
                <van-grid-item icon="photo-o" text="文字" />
            </van-grid>

            <h4 class="cell-title">页面导航</h4>
            <van-grid clickable :column-num="2">
                <van-grid-item icon="home-o" text="路由跳转" to="/" />
                <van-grid-item icon="search" text="URL 跳转" url="/default.html" />
            </van-grid>

            <h4 class="cell-title">徽标提示</h4>
            <van-grid :column-num="2">
                <van-grid-item icon="home-o" text="文字" dot @click="onClick" />
                <van-grid-item icon="search" text="文字" badge="99+" />
            </van-grid>
        </div>
    </div>
</template>

<script>
import vanHeader from '@components/header';
import vanGrid from '@components/grid';
import vanGridItem from '@components/griditem';
import vanImage from '@components/image';

export default {
    name: 'GoodsAction',
    components: {
        vanHeader,
        vanGrid,
        vanGridItem,
        vanImage
    },
    methods: {
        onClick(e) {
            console.log(e);
        }
    }
};
</script>

<style scoped>
.van-content {
    background-color: #f7f8fa;
    /* height: 100vh; */
}
</style>
