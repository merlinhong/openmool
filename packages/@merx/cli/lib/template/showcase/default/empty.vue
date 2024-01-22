<template>
    <div class="container">
        <van-header title="Empty 空状态"></van-header>
        <div class="van-content">
            <h4 class="cell-title">基础用法</h4>
            <van-empty description="描述文字" />

            <h4 class="cell-title">图片类型</h4>
            <van-tabs v-model="active">
                <van-tab title="通用错误">
                    <van-empty image="error" description="描述文字" />
                </van-tab>
                <van-tab title="网络错误">
                    <van-empty image="network" description="描述文字" />
                </van-tab>
                <van-tab title="搜索提示">
                    <van-empty image="search" description="描述文字" />
                </van-tab>
            </van-tabs>

            <h4 class="cell-title">自定义图片</h4>
            <van-empty
                class="custom-image"
                image="https://img.yzcdn.cn/vant/custom-empty-image.png"
                description="描述文字"
            />

            <h4 class="cell-title">底部内容</h4>
            <van-empty description="描述文字">
                <van-button round type="danger" class="bottom-button">按钮</van-button>
            </van-empty>
        </div>
    </div>
</template>

<script>
import vanHeader from '@components/header';
import vanEmpty from '@components/empty';
import vanButton from '@components/button';
import vanTabs from '@components/tabs';
import vanTab from '@components/tab';

export default {
    name: 'GoodsAction',
    components: {
        vanHeader,
        vanEmpty,
        vanButton,
        vanTabs,
        vanTab
    },
    data() {
        return {
            active: 0
        };
    }
};
</script>

<style scoped>
.custom-image .van-empty__image {
    width: 90px;
    height: 90px;
}
.bottom-button {
    width: 160px;
    height: 40px;
}
</style>
