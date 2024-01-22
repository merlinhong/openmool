<template>
    <div class="container">
        <van-header title="Stepper 步进器"></van-header>
        <div class="van-content">
            <van-cell-group>
                <van-cell title="基础用法">
                    <van-stepper :value="value" />
                </van-cell>

                <van-cell title="步长设置">
                    <van-stepper :value="value2" step="2" />
                </van-cell>

                <van-cell title="限制输入范围">
                    <van-stepper :value="value3" min="5" max="8" />
                </van-cell>

                <van-cell title="限制输入整数">
                    <van-stepper :value="value4" integer />
                </van-cell>

                <van-cell title="禁用状态">
                    <van-stepper :value="value5" disabled />
                </van-cell>

                <van-cell title="禁用输入框">
                    <van-stepper :value="value6" disable-input />
                </van-cell>

                <van-cell title="固定小数位数">
                    <van-stepper :value="value7" step="0.2" :decimal-length="1" />
                </van-cell>

                <van-cell title="自定义大小">
                    <van-stepper :value="value8" input-width="40px" button-size="32px" />
                </van-cell>

                <van-cell title="异步变更">
                    <van-stepper :value="value9" async-change @change="onChange" />
                </van-cell>

                <van-cell title="圆角风格">
                    <van-stepper :value="value10" theme="round" button-size="22" disable-input />
                </van-cell>
            </van-cell-group>
        </div>
    </div>
</template>

<script>
import vanHeader from '@components/header';
import vanStepper from '@components/stepper';
import vanCell from '@components/cell';
import vanCellGroup from '@components/cellgroup';
import Toast from '@components/toast';

export default {
    name: 'Stepper',
    components: {
        vanHeader,
        vanStepper,
        vanCell,
        vanCellGroup
    },
    data() {
        return {
            value: 1,
            value2: 1,
            value3: 1,
            value4: 1,
            value5: 1,
            value6: 1,
            value7: 1,
            value8: 1,
            value9: 1,
            value10: 1
        };
    },
    methods: {
        onChange(value) {
            Toast.loading({ forbidClick: true });

            setTimeout(() => {
                Toast.clear();

                // 注意此时修改 value 后会再次触发 change 事件
                this.value9 = value;
            }, 500);
        }
    }
};
</script>

<style scoped>
.van-content {
    padding: 0 10px;
}
</style>
