<template>
    <div class="container">
        <van-header title="CountDown 倒计时"></van-header>
        <div class="van-content">
            <h4 class="cell-title">基础用法</h4>
            <van-divider />

            <h4 class="cell-title">展示文字</h4>
            <van-divider>文字</van-divider>

            <h4 class="cell-title">内容位置</h4>
            <van-divider content-position="left">文字</van-divider>
            <van-divider content-position="right">文字</van-divider>

            <h4 class="cell-title">虚线</h4>
            <van-divider dashed>文字</van-divider>

            <h4 class="cell-title">自定义样式</h4>
            <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">文字</van-divider>
        </div>
    </div>
</template>

<script>
import vanHeader from '@components/header';
import vanDivider from '@components/divider';

export default {
    name: 'component_circle',
    components: {
        vanHeader,
        vanDivider
    }
};
</script>
