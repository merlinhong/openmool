<template>
    <div class="container">
        <van-header title="Circle 环形进度条" ></van-header>
        <div class="van-content">
            <h4 class="cell-title">基础用法</h4>
            <van-circle v-model="currentRate" :rate="rate" :speed="speed" :text="text" />

            <h4 class="cell-title">样式定制</h4>
            <van-circle v-model="currentRate1" :rate="rate" :speed="speed" :stroke-width="60" text="宽度定制" />
            <van-circle
                v-model="currentRate2"
                :rate="rate"
                :speed="speed"
                layer-color="#ebedf0"
                color="#ee0a24"
                text="颜色定制"
            />
            <van-circle v-model="currentRate3" :rate="rate" :speed="speed" :color="gradientColor" text="渐变色" />
            <van-circle v-model="currentRate4" :rate="rate" :speed="speed" :clockwise="false" text="逆时针方向" />
            <van-circle
                v-model="currentRate5"
                :rate="rate"
                :speed="speed"
                size="120px"
                :clockwise="false"
                text="大小定制"
            />

            <div class="btn-area">
                <van-button type="primary" size="small" @click="add">增加</van-button>
                <van-button type="danger" size="small" @click="less">减少</van-button>
            </div>
        </div>
    </div>
</template>

<script>
import vanHeader from '@components/header';
import vanCircle from '@components/circle';
import vanButton from '@components/button';

export default {
    name: 'component_circle',
    components: {
        vanHeader,
        vanCircle,
        vanButton
    },
    data() {
        return {
            currentRate: 0,
            currentRate1: 0,
            currentRate2: 0,
            currentRate3: 0,
            currentRate4: 0,
            currentRate5: 0,
            rate: 70,
            speed: 100,
            gradientColor: {
                '0%': '#3fecff',
                '100%': '#6149f6'
            }
        };
    },
    methods: {
        add() {
            if (this.rate >= 100) {
                this.rate = 100;
            } else {
                this.rate += 20;
            }
        },
        less() {
            if (this.rate <= 0) {
                this.rate = 0;
            } else {
                this.rate -= 20;
            }
        }
    },
    computed: {
        text() {
            return `${this.currentRate.toFixed(0)}%`;
        }
    }
};
</script>

<style scoped>
.van-content {
    height: calc(100vh - 46px);
    background-color: #f7f8fa;
}
.van-circle {
    margin-left: 10px;
}

.btn-area {
    margin-top: 10px;
    padding-left: 10px;
}

.van-button {
    margin-right: 10px;
}
</style>
