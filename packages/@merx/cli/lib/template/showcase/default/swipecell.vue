<template>
    <div class="container">
        <van-header title="SwipeCell 滑动单元格"></van-header>
        <div class="van-content">
            <h4 class="cell-title">基础用法</h4>
            <van-swipe-cell>
                <template #left>
                    <van-button square type="primary" text="选择" />
                </template>
                <van-cell :border="false" title="单元格" value="内容" />
                <template #right>
                    <van-button square type="danger" text="删除" />
                    <van-button square type="primary" text="收藏" />
                </template>
            </van-swipe-cell>

            <h4 class="cell-title">自定义内容</h4>
            <van-swipe-cell>
                <van-card
                    num="2"
                    price="2.00"
                    desc="描述信息"
                    title="商品标题"
                    class="goods-card"
                    thumb="https://img.yzcdn.cn/vant/cat.jpeg"
                />
                <template #right>
                    <van-button square text="删除" type="danger" class="delete-button" />
                </template>
            </van-swipe-cell>

            <h4 class="cell-title">异步关闭</h4>
            <van-swipe-cell :before-close="beforeClose">
                <template #left>
                    <van-button square type="primary" text="选择" />
                </template>
                <van-cell :border="false" title="单元格" value="内容" />
                <template #right>
                    <van-button square type="danger" text="删除" />
                </template>
            </van-swipe-cell>
        </div>
    </div>
</template>

<script>
import vanHeader from '@components/header';
import vanSwipeCell from '@components/swipecell';
import vanCell from '@components/cell';
import vanButton from '@components/button';
import vanCard from '@components/card';
import Dialog from '@components/dialog';

export default {
    name: 'SwipeCell',
    components: {
        vanHeader,
        vanSwipeCell,
        vanCell,
        vanButton,
        vanCard
    },
    methods: {
        beforeClose({ position, instance }) {
            switch (position) {
                case 'left':
                case 'cell':
                case 'outside':
                    instance.close();
                    break;
                case 'right':
                    Dialog.confirm({
                        message: '确定删除吗？'
                    }).then(() => {
                        instance.close();
                    });
                    break;
                default:
                    break;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.van-content {
    background-color: #f7f8fa;
    height: calc(100vh - 46px);
}
.goods-card {
    margin: 0;
    background-color: #fff;
}

.delete-button {
    height: 100%;
}
.swipe {
    display: flex;
    height: 44px;
    line-height: 44px;

    .swipe-btn {
        padding: 0 15px;
        height: 100%;
        color: #fff;
    }
}
</style>
