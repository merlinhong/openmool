<template>
    <div class="container">
        <van-header title="Tab 标签页"></van-header>

        <div class="van-content">
            <h4 class="cell-title">基础用法</h4>
            <van-tabs v-model="active1">
                <van-tab title="标签 1">
                    <div class="tab-content">内容 1</div>
                </van-tab>
                <van-tab title="标签 2">
                    <div class="tab-content">内容 2</div>
                </van-tab>
                <van-tab title="标签 3">
                    <div class="tab-content">内容 3</div>
                </van-tab>
                <van-tab title="标签 4">
                    <div class="tab-content">内容 4</div>
                </van-tab>
            </van-tabs>

            <h4 class="cell-title">通过名称匹配</h4>
            <van-tabs v-model="activeName">
                <van-tab title="标签 1" name="a"><div class="tab-content">内容 1</div></van-tab>
                <van-tab title="标签 2" name="b"><div class="tab-content">内容 2</div></van-tab>
                <van-tab title="标签 3" name="c"><div class="tab-content">内容 3</div></van-tab>
            </van-tabs>

            <h4 class="cell-title">标签栏滚动</h4>
            <van-tabs>
                <van-tab v-for="index in 8" :title="'标签 ' + index" :key="index">
                    <div class="tab-content">内容 {{ index }}</div>
                </van-tab>
            </van-tabs>

            <h4 class="cell-title">禁用标签</h4>
            <van-tabs @disabled="onClickDisabled">
                <van-tab title="标签 1">
                    <div class="tab-content">内容 1</div>
                </van-tab>
                <van-tab title="标签 2" disabled>
                    <div class="tab-content">内容 2</div>
                </van-tab>
                <van-tab title="标签 3">
                    <div class="tab-content">内容 3</div>
                </van-tab>
            </van-tabs>

            <h4 class="cell-title">样式风格</h4>
            <van-tabs type="card">
                <van-tab title="标签 1">
                    <div class="tab-content">内容 1</div>
                </van-tab>
                <van-tab title="标签 2">
                    <div class="tab-content">内容 2</div>
                </van-tab>
                <van-tab title="标签 3">
                    <div class="tab-content">内容 3</div>
                </van-tab>
            </van-tabs>

            <h4 class="cell-title">点击事件</h4>
            <van-tabs @click="onClick">
                <van-tab title="标签 1">
                    <div class="tab-content">内容 1</div>
                </van-tab>
                <van-tab title="标签 2">
                    <div class="tab-content">内容 2</div>
                </van-tab>
            </van-tabs>

            <h4 class="cell-title">粘性布局</h4>
            <van-tabs sticky>
                <van-tab v-for="index in 4" :title="'选项 ' + index" :key="index">
                    <div class="tab-content">内容 {{ index }}</div>
                </van-tab>
            </van-tabs>

            <h4 class="cell-title">自定义标签</h4>
            <van-tabs>
                <van-tab v-for="index in 2" :key="index">
                    <div slot="title">
                        <van-icon name="more-o" />
                        选项 {{ index }}
                    </div>
                    <div class="tab-content">内容 {{ index }}</div>
                </van-tab>
            </van-tabs>

            <h4 class="cell-title">切换动画</h4>
            <van-tabs animated>
                <van-tab v-for="index in 4" :key="index" :title="'选项 ' + index">
                    <div class="tab-content">内容 {{ index }}</div>
                </van-tab>
            </van-tabs>

            <h4 class="cell-title">滑动切换</h4>
            <van-tabs swipeable>
                <van-tab v-for="index in 4" :key="index" :title="'选项 ' + index">
                    <div class="tab-content">内容 {{ index }}</div>
                </van-tab>
            </van-tabs>

            <h4 class="cell-title">滚动导航</h4>
            <van-tabs scrollspy sticky>
                <van-tab v-for="index in 8" :key="index" :title="'选项 ' + index">
                    <div class="tab-content">内容 {{ index }}</div>
                </van-tab>
            </van-tabs>

            <h4 class="cell-title">异步切换</h4>
            <van-tabs :before-change="beforeChange">
                <van-tab v-for="index in 4" :key="index" :title="'选项 ' + index">
                    <div class="tab-content">内容 {{ index }}</div>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script>
import vanHeader from '@components/header';
import vanIcon from '@components/icon';
import vanTabs from '@components/tabs';
import vanTab from '@components/tab';
import Toast from '@components/toast';

export default {
    name: 'Tab',
    components: {
        vanHeader,
        'van-tab': vanTab,
        'van-tabs': vanTabs,
        vanIcon
    },
    data() {
        return {
            active1: 2,
            active2: 0,
            activeName: 'a'
        };
    },
    methods: {
        onClickDisabled(name, title) {
            Toast(title + '已被禁用');
        },
        onClick(index, title) {
            Toast(title);
        },
        beforeChange(index) {
            // 返回 false 表示阻止此次切换
            if (index === 1) {
                return false;
            }

            // 返回 Promise 来执行异步逻辑
            return new Promise((resolve) => {
                // 在 resolve 函数中返回 true 或 false
                resolve(index !== 3);
            });
        }
    }
};
</script>

<style scoped>
.van-content {
    background-color: #f7f8fa;
    padding-bottom: 500px;
}
.tab-content {
    height: 50px;
    line-height: 50px;
    padding: 10px;
    background-color: #fff;
}
.van-tabs {
    margin-bottom: 20px;
}
.van-icon {
    margin-right: 5px;
    vertical-align: -2px;
}
</style>
