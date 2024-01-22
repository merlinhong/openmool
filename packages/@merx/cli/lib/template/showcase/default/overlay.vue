<template>
    <div class="container">
        <van-header title="Overlay 遮罩层"></van-header>
        <div class="van-content">
            <h4 class="cell-title">基础用法</h4>
            <van-button type="primary" @click="show1 = true">显示遮罩层</van-button>
            <van-overlay :show="show1" @click="show1 = false" />

            <h4 class="cell-title">嵌入内容</h4>
            <van-button type="primary" @click="show2 = true">嵌入内容</van-button>
            <van-overlay :show="show2" @click="show2 = false">
                <div class="wrapper">
                    <div class="block" @click.stop />
                </div>
            </van-overlay>
        </div>
    </div>
</template>

<script>
import vanOverlay from '@components/overlay';
import vanHeader from '@components/header';
import vanButton from '@components/button';

export default {
    name: 'Overlay',
    components: {
        vanHeader,
        vanButton,
        vanOverlay
    },
    data() {
        return {
            show1: false,
            show2: false
        };
    }
};
</script>

<style scoped>
.van-button {
    margin-left: 10px;
}
.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.block {
    width: 120px;
    height: 120px;
    background-color: #fff;
}
</style>
