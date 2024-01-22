<template>
    <div class="container">
        <van-header title="Slider 滑块"></van-header>
        <div class="van-content">
            <h4 class="cell-title">基本用法</h4>
            <van-skeleton title :row="3" />

            <h4 class="cell-title">显示头像</h4>
            <van-skeleton title avatar :row="3" />

            <h4 class="cell-title">显示子组件</h4>
            <van-switch v-model="checked" />
            <van-skeleton title avatar :row="3" :loading="loading">
                <div>内容加载完成后显示我</div>
            </van-skeleton>
        </div>
    </div>
</template>

<script>
import vanHeader from '@components/header';
import vanSkeleton from '@components/skeleton';
import vanSwitch from '@components/switch';

export default {
    name: 'Slider',
    components: {
        vanHeader,
        vanSkeleton,
        vanSwitch
    },
    watch: {
        checked(val) {
            if (val) {
                setTimeout(() => {
                    this.loading = false;
                }, 1000);
            } else {
                this.loading = true;
            }
        }
    },
    data() {
        return {
            loading: true,
            checked: false
        };
    }
};
</script>

<style scoped>
.van-content {
    padding: 0 10px;
}
</style>
