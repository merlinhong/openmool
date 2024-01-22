<template>
    <div class="container">
        <van-header title="Rate 评分"></van-header>
        <div class="van-content">
            <h4 class="cell-title">基础用法</h4>
            <van-rate v-model="value" />

            <h4 class="cell-title">自定义图标</h4>
            <van-rate v-model="value2" icon="like" void-icon="like-o" />

            <h4 class="cell-title">自定义样式</h4>
            <van-rate v-model="value3" :size="25" color="#ffd21e" void-icon="star" void-color="#eee" />

            <h4 class="cell-title">半星</h4>
            <van-rate v-model="value4" allow-half void-icon="star" void-color="#eee" />

            <h4 class="cell-title">自定义数量</h4>
            <van-rate v-model="value5" :count="6" />

            <h4 class="cell-title">禁用状态</h4>
            <van-rate v-model="value6" disabled />

            <h4 class="cell-title">只读状态</h4>
            <van-rate v-model="value7" readonly />

            <h4 class="cell-title">监听 change 事件</h4>
            <van-rate v-model="value8" @change="onChange" />
        </div>
    </div>
</template>

<script>
import vanHeader from '@components/header';
import vanRate from '@components/rate';
import { Toast } from 'vant';

export default {
    name: 'Rate',
    components: {
        vanHeader,
        vanRate
    },
    data() {
        return {
            value: 3,
            value2: 3,
            value3: 3,
            value4: 2.5,
            value5: 4,
            value6: 3,
            value7: 3,
            value8: 2
        };
    },
    methods: {
        onChange(value) {
            Toast(`当前评分: ${value}`);
        }
    }
};
</script>

<style scoped>
.van-content {
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 100px;
}
</style>
