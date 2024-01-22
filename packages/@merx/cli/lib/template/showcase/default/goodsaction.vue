<template>
    <div class="container">
        <van-header title="GoodsAction 商品导航"></van-header>
        <div class="van-content">
            <h4 class="cell-title">基础用法</h4>
            <van-goods-action>
                <van-goods-action-icon icon="chat-o" text="客服" @click="onClickMiniBtn" />
                <van-goods-action-icon icon="cart-o" text="购物车" @click="onClickMiniBtn" />
                <van-goods-action-button text="加入购物车" @click="onClickBigBtn" />
                <van-goods-action-button type="primary" text="立即购买" @click="onClickBigBtn" />
            </van-goods-action>

            <h4 class="cell-title" style="margin-top: 90px">图标提示</h4>
            <van-goods-action>
                <van-goods-action-icon icon="chat-o" text="客服" />
                <van-goods-action-icon info="5" icon="cart-o" text="购物车" />
                <van-goods-action-icon icon="shop-o" text="店铺" />
                <van-goods-action-button text="加入购物车" />
                <van-goods-action-button type="primary" text="立即购买" />
            </van-goods-action>
        </div>
    </div>
</template>

<script>
import vanHeader from '@components/header';
import { GoodsAction, GoodsActionButton, GoodsActionIcon, Toast } from 'vant';

export default {
    name: 'GoodsAction',
    components: {
        vanHeader,
        [GoodsAction.name]: GoodsAction,
        [GoodsActionButton.name]: GoodsActionButton,
        [GoodsActionIcon.name]: GoodsActionIcon
    },
    methods: {
        onClickMiniBtn() {
            Toast('点击图标');
        },
        onClickBigBtn() {
            Toast('点击按钮');
        }
    }
};
</script>

<style scoped>
.van-goods-action {
    bottom: auto;
}
</style>
