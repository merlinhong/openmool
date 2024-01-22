<template>
    <div class="container">
        <van-header title="Steps 步骤条"></van-header>
        <div class="van-content">
            <h4 class="cell-title">基础用法</h4>
            <van-sticky>
                <van-button type="primary">基础用法</van-button>
            </van-sticky>

            <h4 class="cell-title">吸顶距离</h4>
            <van-sticky :offset-top="50">
                <van-button type="info" style="margin-left: 108px">吸顶距离</van-button>
            </van-sticky>

            <h4 class="cell-title">指定容器</h4>
            <div ref="container" style="height: 150px; background-color: #fff">
                <van-sticky :container="container">
                    <van-button type="warning" style="margin-left: 206px">指定容器</van-button>
                </van-sticky>
            </div>
        </div>
    </div>
</template>

<script>
import vanHeader from '@components/header';
import vanButton from '@components/button';
import vanSticky from '@components/sticky';

export default {
    name: 'Steps',
    components: {
        vanHeader,
        vanButton,
        vanSticky
    },
    data() {
        return {
            container: null
        };
    },
    mounted() {
        this.container = this.$refs.container;
    }
};
</script>

<style scoped>
.van-content {
    height: calc(100vh + 380px);
    background-color: #f7f8fa;
}
.van-button {
    margin: 0 10px;
}
</style>
