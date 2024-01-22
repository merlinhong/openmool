<template>
    <div class="container">
        <van-header title="Toast 轻提示"></van-header>
        <div class="van-content">
            <h4 class="cell-title">基础用法</h4>
            <van-cell-group>
                <van-cell @click="showToast('提示内容')" is-link>文字提示</van-cell>
                <van-cell @click="loadingToast('加载中...')" is-link>加载提示</van-cell>
                <van-cell @click="successToast" is-link>成功提示</van-cell>
                <van-cell @click="errorToast" is-link>失败提示</van-cell>
            </van-cell-group>

            <h4 class="cell-title">自定义图标</h4>
            <van-cell-group>
                <van-cell @click="zdyToast" is-link>自定义图标</van-cell>
                <van-cell @click="zdyImgToast" is-link>自定义图片</van-cell>
                <van-cell @click="zdyLoadingToast" is-link>自定义加载图标</van-cell>
            </van-cell-group>

            <h4 class="cell-title">动态更新提示</h4>
            <van-cell @click="advToast" is-link>动态更新提示</van-cell>
        </div>
    </div>
</template>

<script>
import Toast from '@components/toast';
import vanHeader from '@components/header';
import vanCellGroup from '@components/cellgroup';
import vanCell from '@components/cell';

export default {
    name: 'Toast',
    components: {
        vanHeader,
        vanCellGroup,
        vanCell
    },
    methods: {
        showToast(options) {
            Toast(options);
        },
        loadingToast(msg) {
            Toast.loading({
                // 加载信息
                message: msg,
                forbidClick: true
            });
        },
        successToast() {
            Toast.success('成功文案');
        },
        errorToast() {
            Toast.fail('失败文案');
        },
        zdyToast() {
            Toast({
                message: '自定义图标',
                icon: 'like-o'
            });
        },
        zdyImgToast() {
            Toast({
                message: '自定义图片',
                icon: 'https://img.yzcdn.cn/vant/logo.png'
            });
        },
        zdyLoadingToast() {
            Toast.loading({
                message: '加载中...',
                forbidClick: true,
                loadingType: 'spinner'
            });
        },
        advToast() {
            const toast = Toast.loading({
                // 持续展示 toast
                duration: 0,
                // 禁用背景点击
                forbidClick: true,
                // loadingType: 'spinner',
                message: '倒计时 3 秒'
            });

            let second = 3;
            const timmer = setInterval(() => {
                second--;
                if (second) {
                    toast.message = `倒计时 ${second} 秒`;
                } else {
                    clearInterval(timmer);
                    // 关闭 toast
                    Toast.clear();
                }
            }, 1000);
        }
    }
};
</script>

<style scoped>
.van-button {
    margin-left: 10px;
}
</style>
