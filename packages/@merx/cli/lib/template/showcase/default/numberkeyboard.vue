<template>
    <div class="container">
        <van-header title="NumberKeyboard 数字键盘"></van-header>
        <div class="van-content">
            <h4 class="cell-title">默认样式</h4>
            <van-cell-group>
                <van-cell is-link @click="showTop = true" title="弹出默认键盘" />
                <van-cell is-link @click="showBottom = true" title="弹出带右侧栏的键盘" />
                <van-cell is-link @click="showLeft = true" title="弹出身份证号键盘" />
                <van-cell is-link @click="showTitle = true" title="弹出带标题的键盘" />
                <van-cell is-link @click="showMore = true" title="弹出配置多个按键的键盘" />
                <van-field
                    label="双向绑定"
                    placeholder="点此输入"
                    readonly
                    clickable
                    :value="value"
                    @touchstart.native.stop="showModel = true"
                />
            </van-cell-group>
        </div>

        <van-number-keyboard
            :show="showTop"
            @blur="showTop = false"
            @input="onInput"
            @delete="onDelete"
        ></van-number-keyboard>

        <van-number-keyboard
            :show="showBottom"
            theme="custom"
            extra-key="."
            close-button-text="完成"
            @blur="showBottom = false"
            @input="onInput"
            @delete="onDelete"
        ></van-number-keyboard>

        <van-number-keyboard
            :show="showLeft"
            extra-key="X"
            close-button-text="完成"
            @blur="showLeft = false"
            @input="onInput"
            @delete="onDelete"
        ></van-number-keyboard>

        <van-number-keyboard
            :show="showTitle"
            title="键盘标题"
            extra-key="."
            close-button-text="完成"
            @blur="showTitle = false"
            @input="onInput"
            @delete="onDelete"
        ></van-number-keyboard>

        <van-number-keyboard
            :show="showMore"
            theme="custom"
            :extra-key="['00', '.']"
            close-button-text="完成"
            @blur="showMore = false"
            @input="onInput"
            @delete="onDelete"
        ></van-number-keyboard>

        <van-number-keyboard
            v-model="value"
            :show="showModel"
            :maxlength="6"
            @blur="showModel = false"
        ></van-number-keyboard>
    </div>
</template>

<script>
import vanHeader from '@components/header';
import vanNumberKeyboard from '@components/numberkeyboard';
import vanCellGroup from '@components/cellgroup';
import vanCell from '@components/cell';
import vanField from '@components/field';
import { Toast } from 'vant';

export default {
    name: 'NumberKeyboard',
    components: {
        vanHeader,
        vanNumberKeyboard,
        vanCellGroup,
        vanCell,
        vanField
    },
    data() {
        return {
            showTop: false,
            showBottom: false,
            showLeft: false,
            showTitle: false,
            showMore: false,
            showModel: false,
            value: ''
        };
    },
    methods: {
        onInput(keyValue) {
            Toast(`input ${keyValue}`);
        },
        onDelete() {
            Toast('Delete');
        }
    }
};
</script>

<style scoped>
.van-button {
    margin-left: 10px;
    margin-right: 10px;
}
</style>
