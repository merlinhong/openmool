<template>
    <div class="container">
        <van-header title="Button 按钮"></van-header>

        <div class="van-content">
            <h4 class="cell-title">按钮类型</h4>
            <div class="btn-area">
                <van-button type="primary">主要按钮</van-button>
                <van-button type="info">信息按钮</van-button>
                <van-button type="default">默认按钮</van-button>
                <van-button type="warning">警告按钮</van-button>
                <van-button type="danger">危险按钮</van-button>
            </div>

            <h4 class="cell-title">基座按钮</h4>
            <div class="btn-area">
                <van-button type="basic">基座按钮</van-button>
                <van-button type="basic" disabled>基座禁用按钮</van-button>
            </div>

            <h4 class="cell-title">朴素按钮</h4>
            <div class="btn-area">
                <van-button plain type="primary">朴素按钮</van-button>
                <van-button plain type="info">朴素按钮</van-button>
            </div>

            <h4 class="cell-title">细边框</h4>
            <div class="btn-area">
                <van-button plain hairline type="primary">细边框按钮</van-button>
                <van-button plain hairline type="info">细边框按钮</van-button>
            </div>

            <h4 class="cell-title">禁用状态</h4>
            <div class="btn-area">
                <van-button disabled type="primary">禁用状态</van-button>
                <van-button disabled type="info">禁用状态</van-button>
            </div>

            <h4 class="cell-title">加载状态</h4>
            <div class="btn-area">
                <van-button loading type="primary" />
                <van-button loading type="primary" loading-type="spinner" />
                <van-button loading type="info" loading-text="加载中..." />
            </div>

            <h4 class="cell-title">按钮形状</h4>
            <div class="btn-area">
                <van-button square type="primary">方形按钮</van-button>
                <van-button round type="info">圆形按钮</van-button>
            </div>
            <h4 class="cell-title">图标按钮</h4>
            <div class="btn-area">
                <van-button icon="plus" type="primary" />
                <van-button icon="plus" type="primary">按钮</van-button>
                <van-button icon="https://img.yzcdn.cn/vant/user-active.png" type="info">按钮</van-button>
            </div>
            <h4 class="cell-title">按钮尺寸</h4>
            <div class="btn-area">
                <van-button type="primary" size="large">大号按钮</van-button>
                <van-button type="primary" size="normal">普通按钮</van-button>
                <van-button type="primary" size="small">小型按钮</van-button>
                <van-button type="primary" size="mini">迷你按钮</van-button>
            </div>
            <h4 class="cell-title">块级元素</h4>
            <div class="btn-area">
                <van-button type="primary" block>块级元素</van-button>
            </div>
            <h4 class="cell-title">页面导航</h4>
            <div class="btn-area">
                <van-button type="primary" url="../default.html">URL 跳转</van-button>
                <van-button type="primary" to="index">路由跳转</van-button>
            </div>
            <h4 class="cell-title">自定义颜色</h4>
            <div class="btn-area">
                <van-button color="#7232dd">单色按钮</van-button>
                <van-button color="#7232dd" plain>单色按钮</van-button>
                <van-button color="linear-gradient(to right, #ff6034, #ee0a24)">渐变色按钮</van-button>
            </div>
        </div>
    </div>
</template>

<script>
import vanHeader from '@components/header';
import vanButton from '@components/button';

export default {
    name: 'Button',
    components: {
        vanHeader,
        vanButton
    }
};
</script>

<style lang="scss" scoped>
.van-content {
    padding-left: 10px;
    padding-right: 10px;

    .cell-title {
        padding-left: 0;
    }

    .van-button {
        margin-right: 10px;
        margin-bottom: 10px;
    }
}
</style>
