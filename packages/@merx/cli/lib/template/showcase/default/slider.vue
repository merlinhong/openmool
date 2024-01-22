<template>
    <div class="container">
        <van-header title="Slider 滑块"></van-header>
        <div class="van-content">
            <h4 class="cell-title">基本用法</h4>
            <van-slider v-model="baseValue" @change="onChange" />

            <h4 class="cell-title">双滑块</h4>
            <van-slider v-model="twoValue" range @change="onChange" />

            <h4 class="cell-title">指定选择范围</h4>
            <van-slider v-model="value" :min="-50" :max="50" @change="onChange" />

            <h4 class="cell-title">禁用</h4>
            <van-slider v-model="value2" disabled />

            <h4 class="cell-title">指定步长</h4>
            <van-slider v-model="value3" :step="10" @change="onChange" />

            <h4 class="cell-title">自定义样式</h4>
            <van-slider v-model="value4" bar-height="4px" active-color="#ee0a24" @change="onChange" />

            <h4 class="cell-title">自定义按钮</h4>
            <van-slider v-model="value5" active-color="#ee0a24" @change="onChange">
                <template #button>
                    <div class="custom-button">
                        {{ value5 }}
                    </div>
                </template>
            </van-slider>

            <h4 class="cell-title">垂直方向</h4>
            <div :style="{ height: '100px', paddingLeft: '50px' }">
                <van-slider v-model="value6" vertical @change="onChange" />
            </div>
        </div>
    </div>
</template>

<script>
import vanHeader from '@components/header';
import vanSlider from '@components/slider';
import { Toast } from 'vant';

export default {
    name: 'Slider',
    components: {
        vanHeader,
        vanSlider
    },
    data() {
        return {
            value: 0,
            value2: 50,
            value3: 50,
            value4: 50,
            value5: 50,
            value6: 50,
            baseValue: 50,
            twoValue: [10, 50]
        };
    },
    methods: {
        onChange(value) {
            Toast(`当前值：${value}`);
        }
    }
};
</script>

<style scoped>
.van-content {
    padding: 0 10px;
}

.custom-button {
    width: 26px;
    color: #fff;
    font-size: 10px;
    line-height: 18px;
    text-align: center;
    border-radius: 100px;
    background-color: #f44;
}
</style>
