<template>
    <div class="container">
        <van-header title="CountDown 倒计时"></van-header>
        <div class="van-content">
            <h4 class="cell-title">基础用法</h4>
            <van-count-down :time="time" />

            <h4 class="cell-title">自定义格式</h4>
            <van-count-down :time="time" format="DD 天 HH 时 mm 分 ss 秒" />

            <h4 class="cell-title">毫秒级渲染</h4>
            <van-count-down millisecond :time="time" format="HH:mm:ss:SS" />

            <h4 class="cell-title">自定义样式</h4>
            <van-count-down :time="time">
                <template v-slot="{ timeData }">
                    <span class="block">{{ timeData.hours }}</span>
                    <span class="colon">:</span>
                    <span class="block">{{ timeData.minutes }}</span>
                    <span class="colon">:</span>
                    <span class="block">{{ timeData.seconds }}</span>
                </template>
            </van-count-down>

            <h4 class="cell-title">手动控制</h4>
            <van-count-down
                ref="countDown"
                millisecond
                :time="3000"
                :auto-start="false"
                format="ss:SSS"
                @finish="finish"
            />
            <van-grid clickable>
                <van-grid-item text="开始" icon="play-circle-o" @click="start" />
                <van-grid-item text="暂停" icon="pause-circle-o" @click="pause" />
                <van-grid-item text="重置" icon="replay" @click="reset" />
            </van-grid>
        </div>
    </div>
</template>

<script>
import vanHeader from '@components/header';
import vanCountDown from '@components/countdown';
import vanGrid from '@components/grid';
import vanGridItem from '@components/griditem';
import Toast from '@components/toast';

export default {
    name: 'component_circle',
    components: {
        vanHeader,
        vanCountDown,
        vanGrid,
        vanGridItem
    },
    data() {
        return {
            time: 30 * 60 * 60 * 1000
        };
    },
    methods: {
        start() {
            this.$refs.countDown.start();
        },
        pause() {
            this.$refs.countDown.pause();
        },
        reset() {
            this.$refs.countDown.reset();
        },
        finish() {
            Toast('倒计时结束');
        }
    }
};
</script>
<style>
.van-count-down {
    margin-left: 10px;
}
.colon {
    display: inline-block;
    margin: 0 4px;
    color: #ee0a24;
}
.block {
    display: inline-block;
    width: 22px;
    color: #fff;
    font-size: 12px;
    text-align: center;
    background-color: #ee0a24;
}
</style>
