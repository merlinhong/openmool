<template>
    <div class="container">
        <van-header title="Popup 弹出层"></van-header>
        <div class="van-content">
            <h4 class="cell-title">基础用法</h4>
            <van-cell is-link @click="show = true">展示弹出层</van-cell>
            <van-popup
                v-model="show"
                :style="{ width: '100px', height: '100px', textAlign: 'center', lineHeight: '100px' }"
            >
                内容
            </van-popup>

            <h4 class="cell-title">弹出位置</h4>
            <van-cell-group>
                <van-cell is-link @click="showTop = true">顶部弹出</van-cell>
                <van-cell is-link @click="showBottom = true">底部弹出</van-cell>
                <van-cell is-link @click="showLeft = true">左侧弹出</van-cell>
                <van-cell is-link @click="showRight = true">右侧弹出</van-cell>
            </van-cell-group>
            <van-popup v-model="showTop" position="top" :style="{ height: '30%' }"></van-popup>
            <van-popup v-model="showBottom" position="bottom" :style="{ height: '30%' }"></van-popup>
            <van-popup v-model="showLeft" position="left" :style="{ width: '30%', height: '100%' }"></van-popup>
            <van-popup v-model="showRight" position="right" :style="{ width: '30%', height: '100%' }"></van-popup>

            <h4 class="cell-title">关闭图标</h4>
            <van-cell-group>
                <van-cell is-link @click="showClose = true">关闭图标</van-cell>
                <van-cell is-link @click="showZdy = true">自定义图标</van-cell>
                <van-cell is-link @click="showIconP = true">图标位置</van-cell>
            </van-cell-group>
            <van-popup v-model="showClose" closeable position="bottom" :style="{ height: '30%' }"></van-popup>
            <van-popup
                v-model="showZdy"
                closeable
                close-icon="close"
                position="bottom"
                :style="{ height: '30%' }"
            ></van-popup>
            <van-popup
                v-model="showIconP"
                closeable
                close-icon-position="top-left"
                position="bottom"
                :style="{ height: '30%' }"
            ></van-popup>
            <h4 class="cell-title">圆角弹窗</h4>
            <van-cell is-link @click="showRound = true">圆角弹窗</van-cell>
            <van-popup v-model="showRound" round position="bottom" :style="{ height: '30%' }" />
            <h4 class="cell-title">指定挂载节点</h4>
            <van-cell is-link @click="showBody = true">指定挂载节点</van-cell>
            <van-popup v-model="showBody" get-container="body" :style="{ width: '100px', height: '100px' }" />
        </div>
    </div>
</template>

<script>
import vanHeader from '@components/header';
import vanCellGroup from '@components/cellgroup';
import vanCell from '@components/cell';
import vanPopup from '@components/popup';

export default {
    name: 'Popup',
    components: {
        vanPopup,
        vanHeader,
        vanCellGroup,
        vanCell
    },
    data() {
        return {
            show: false,
            showTop: false,
            showBottom: false,
            showLeft: false,
            showRight: false,
            showClose: false,
            showZdy: false,
            showIconP: false,
            showRound: false,
            showBody: false
        };
    }
};
</script>

<style scoped>
.van-content {
    padding-left: 10px;
    padding-right: 10px;
}
</style>
