<template>
    <div class="container">
        <van-header title="Radio 单选框"></van-header>
        <div class="van-content">
            <h4 class="cell-title">基础用法</h4>
            <van-radio-group v-model="radio">
                <van-radio name="1">单选框 1</van-radio>
                <van-radio name="2">单选框 2</van-radio>
            </van-radio-group>

            <h4 class="cell-title">水平排列</h4>
            <van-radio-group v-model="radio2" direction="horizontal">
                <van-radio name="1">单选框 1</van-radio>
                <van-radio name="2">单选框 2</van-radio>
            </van-radio-group>

            <h4 class="cell-title">禁用状态</h4>
            <van-radio-group v-model="radio3">
                <van-radio name="1" disabled>单选框 1</van-radio>
                <van-radio name="2" disabled>单选框 2</van-radio>
            </van-radio-group>

            <h4 class="cell-title">自定义形状</h4>
            <van-radio-group v-model="radio4">
                <van-radio name="1" shape="square">单选框 1</van-radio>
                <van-radio name="2" shape="square">单选框 2</van-radio>
            </van-radio-group>

            <h4 class="cell-title">自定义颜色</h4>
            <van-radio-group v-model="radio5">
                <van-radio name="1" checked-color="#07c160">单选框 1</van-radio>
                <van-radio name="2" checked-color="#07c160">单选框 2</van-radio>
            </van-radio-group>

            <h4 class="cell-title">自定义大小</h4>
            <van-radio-group v-model="radio6">
                <van-radio name="1" icon-size="32px">单选框 1</van-radio>
                <van-radio name="2" icon-size="32px">单选框 2</van-radio>
            </van-radio-group>

            <h4 class="cell-title">自定义图标</h4>
            <van-radio-group v-model="radio7">
                <van-radio name="1">
                    单选框 1
                    <template #icon="props">
                        <img class="img-icon" :src="props.checked ? activeIcon : inactiveIcon" />
                    </template>
                </van-radio>
                <van-radio name="2">
                    单选框 2
                    <template #icon="props">
                        <img class="img-icon" :src="props.checked ? activeIcon : inactiveIcon" />
                    </template>
                </van-radio>
            </van-radio-group>

            <h4 class="cell-title">禁用文本点击</h4>
            <van-radio-group v-model="radio8">
                <van-radio name="1" label-disabled>单选框 1</van-radio>
                <van-radio name="2" label-disabled>单选框 2</van-radio>
            </van-radio-group>

            <h4 class="cell-title">与 Cell 组件一起使用</h4>
            <van-radio-group v-model="cellRadio">
                <van-cell-group>
                    <van-cell title="单选框 1" clickable @click="cellRadio = '1'">
                        <template #right-icon>
                            <van-radio name="1" />
                        </template>
                    </van-cell>
                    <van-cell title="单选框 2" clickable @click="cellRadio = '2'">
                        <template #right-icon>
                            <van-radio name="2" />
                        </template>
                    </van-cell>
                </van-cell-group>
            </van-radio-group>
        </div>
    </div>
</template>

<script>
import vanHeader from '@components/header';
import vanRadio from '@components/radio';
import vanRadioGroup from '@components/radiogroup';
import vanCellGroup from '@components/cellgroup';
import vanCell from '@components/cell';

export default {
    name: 'Radio',
    components: {
        vanHeader,
        vanRadio,
        vanRadioGroup,
        vanCellGroup,
        vanCell
    },
    data() {
        return {
            radio: '1',
            radio2: '1',
            radio3: '2',
            radio4: '1',
            radio5: '1',
            radio6: '1',
            radio7: '1',
            radio8: '1',
            activeIcon: 'https://img.yzcdn.cn/vant/user-active.png',
            inactiveIcon: 'https://img.yzcdn.cn/vant/user-inactive.png',
            cellRadio: '1'
        };
    }
};
</script>

<style scoped>
.van-radio {
    margin: 0 10px 10px 10px;
}

.img-icon {
    height: 20px;
}

.van-cell__value > .van-radio {
    margin: 0;
}
</style>
