<template>
    <div class="container">
        <van-header title="Loading 加载"></van-header>
        <div class="van-content">
            <h4 class="cell-title">加载类型</h4>
            <van-row>
                <van-col span="5" style="padding: 0 10px"><van-loading /></van-col>
                <van-col span="5"><van-loading type="spinner" /></van-col>
            </van-row>

            <h4 class="cell-title">自定义颜色</h4>
            <van-row>
                <van-col span="5" style="padding: 0 10px"><van-loading color="#1989fa" /></van-col>
                <van-col span="5"><van-loading type="spinner" color="#1989fa" /></van-col>
            </van-row>

            <h4 class="cell-title">自定义大小</h4>
            <van-row>
                <van-col span="5" style="padding: 0 10px"><van-loading size="24" /></van-col>
                <van-col span="5"><van-loading type="spinner" size="24px" /></van-col>
            </van-row>

            <h4 class="cell-title">加载文案</h4>
            <van-row>
                <van-col span="8" style="padding: 0 10px"><van-loading size="24px">加载中...</van-loading></van-col>
            </van-row>

            <h4 class="cell-title">垂直排列</h4>
            <van-loading size="24px" vertical>加载中...</van-loading>
        </div>
    </div>
</template>

<script>
import vanHeader from '@components/header';
import vanLoading from '@components/loading';
import vanRow from '@components/row';
import vanCol from '@components/col';

export default {
    name: 'Loading',
    components: {
        vanHeader,
        vanLoading,
        vanRow,
        vanCol
    }
};
</script>

<style scoped>
/* .van-loading {
    display: inline-block;
    margin-left: 10px;
    margin-right: 10px;
} */

/* .van-loading-bg {
    background: rgba(0, 0, 0, 0.5);
    padding: 10px;
    border-radius: 5px;
} */
</style>
