<template>
    <div class="container">
        <van-header title="Search 搜索"></van-header>
        <div class="van-content">
            <h4 class="cell-title">基础用法</h4>
            <van-search placeholder="请输入搜索关键词" v-model="value"></van-search>

            <h4 class="cell-title">事件监听</h4>
            <form action="/">
                <van-search
                    v-model="value2"
                    show-action
                    placeholder="请输入搜索关键词"
                    @search="onSearch"
                    @cancel="onCancel"
                />
            </form>

            <h4 class="cell-title">搜索框内容对齐</h4>
            <van-search v-model="value3" placeholder="请输入搜索关键词" input-align="center" />

            <h4 class="cell-title">禁用搜索框</h4>
            <van-search v-model="value4" disabled placeholder="请输入搜索关键词" />

            <h4 class="cell-title">自定义背景色</h4>
            <van-search v-model="value5" shape="round" background="#4fc08d" placeholder="请输入搜索关键词" />

            <h4 class="cell-title">自定义按钮</h4>
            <van-search v-model="value6" show-action label="地址" placeholder="请输入搜索关键词" @search="onSearch2">
                <template #action>
                    <div @click="onSearch2">搜索</div>
                </template>
            </van-search>
        </div>
    </div>
</template>

<script>
import vanHeader from '@components/header';
import vanSearch from '@components/search';
import { Toast } from 'vant';

export default {
    name: 'Search',
    components: {
        vanHeader,
        vanSearch
    },
    data() {
        return {
            value: '',
            value2: '',
            value3: '',
            value4: '',
            value5: '',
            value6: ''
        };
    },
    methods: {
        onSearch() {
            Toast(`搜索值为：${this.value2}`);
        },
        onSearch2() {
            Toast(`搜索值为：${this.value6}`);
        },
        onCancel() {
            Toast('取消');
        }
    }
};
</script>

<style scoped>
.van-content {
    background-color: #f7f8fa;
    padding-bottom: 50px;
}
.search-label {
    font-size: 14px;
    color: #323233;
    line-height: 34px;
    padding: 0 5px;
}
</style>
