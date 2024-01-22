<template>
    <div class="container">
        <van-header title="Tabbar 标签栏"></van-header>

        <div class="van-content">
            <h4 class="cell-title">基础用法</h4>
            <van-tabbar v-model="active" style="position: static">
                <van-tabbar-item icon="home-o">标签</van-tabbar-item>
                <van-tabbar-item icon="search">标签</van-tabbar-item>
                <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
                <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
            </van-tabbar>

            <h4 class="cell-title">通过名称匹配</h4>
            <van-tabbar v-model="active1" style="position: static">
                <van-tabbar-item name="home" icon="home-o">标签</van-tabbar-item>
                <van-tabbar-item name="search" icon="search">标签</van-tabbar-item>
                <van-tabbar-item name="friends" icon="friends-o">标签</van-tabbar-item>
                <van-tabbar-item name="setting" icon="setting-o">标签</van-tabbar-item>
            </van-tabbar>

            <h4 class="cell-title">徽标提示</h4>
            <van-tabbar v-model="active2" style="position: static">
                <van-tabbar-item icon="home-o">标签</van-tabbar-item>
                <van-tabbar-item icon="search" dot>标签</van-tabbar-item>
                <van-tabbar-item icon="friends-o" badge="5">标签</van-tabbar-item>
                <van-tabbar-item icon="setting-o" badge="20">标签</van-tabbar-item>
            </van-tabbar>

            <h4 class="cell-title">自定义图标</h4>
            <van-tabbar v-model="active3" style="position: static">
                <van-tabbar-item badge="3">
                    <span>自定义</span>
                    <template #icon="props">
                        <img :src="props.active ? icon.active : icon.inactive" />
                    </template>
                </van-tabbar-item>
                <van-tabbar-item icon="search">标签</van-tabbar-item>
                <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
            </van-tabbar>

            <h4 class="cell-title">自定义颜色</h4>
            <van-tabbar v-model="active4" active-color="#07c160" inactive-color="#000" style="position: static">
                <van-tabbar-item icon="home-o">标签</van-tabbar-item>
                <van-tabbar-item icon="search">标签</van-tabbar-item>
                <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
                <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
            </van-tabbar>

            <h4 class="cell-title">监听切换事件</h4>
            <van-tabbar v-model="active5" @change="onChange" style="position: static" :before-change="beforeChange">
                <van-tabbar-item icon="home-o">标签1</van-tabbar-item>
                <van-tabbar-item icon="search">标签2</van-tabbar-item>
                <van-tabbar-item icon="friends-o">标签3</van-tabbar-item>
                <van-tabbar-item icon="setting-o">标签4</van-tabbar-item>
            </van-tabbar>
        </div>
    </div>
</template>

<script>
import vanHeader from '@components/header';
import vanTabbar from '@components/tabbar';
import vanTabbarItem from '@components/tabbaritem';
import Notify from '@components/notify';

export default {
    name: 'Tabbar',
    components: {
        vanTabbar,
        vanTabbarItem,
        vanHeader
    },
    data() {
        return {
            active: 0,
            active1: 'home',
            active2: 0,
            active3: 0,
            active4: 0,
            active5: 0,
            icon: {
                active: 'https://img.yzcdn.cn/public_files/2017/10/13/793c77793db8641c4c325b7f25bf130d.png',
                inactive: 'https://img.yzcdn.cn/public_files/2017/10/13/c547715be149dd3faa817e4a948b40c4.png'
            },
            beforeChange: () => {
                console.log('??');

                return true;
            }
        };
    },
    methods: {
        onChange(index) {
            Notify({ type: 'primary', message: index });
        }
    }
};
</script>
<style scoped>
.van-content {
    height: 100vh;
    background-color: #f7f8fa;
}
</style>
