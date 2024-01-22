<template>
    <div class="container">
        <van-header title="Header 导航栏"></van-header>

        <div class="van-content">
            <h4 class="cell-title">基础用法</h4>
            <van-header
                title="标题"
                :left-arrow="true"
                left-text="返回"
                right-text="按钮"
                @click-left="onClickLeft"
                @click-right="onClickRight"
                style="top: 77px"
            ></van-header>

            <h4 class="cell-title" style="margin-top: 70px">使用插槽</h4>
            <van-header title="标题" :left-arrow="true" left-text="返回" @click-left="onClickLeft" style="top: 164px">
                <van-icon name="search" slot="right"></van-icon>
            </van-header>
        </div>
    </div>
</template>

<script>
import vanHeader from '@components/header';
import vanIcon from '@components/icon';
import Toast from '@components/toast';

export default {
    name: 'Header',
    components: {
        vanHeader,
        vanIcon
    },
    methods: {
        onClickLeft() {
            Toast('返回');
        },
        onClickRight() {
            Toast('按钮');
        }
    }
};
</script>
<style scoped>
.van-content {
    height: calc(100vh - 50px);
    background-color: #f7f8fa;
}
</style>
