<template>
    <div class="container">
        <van-header title="PasswordInput 密码输入框"></van-header>
        <div class="van-content cont">
            <h4 class="cell-title">基础用法</h4>
            <van-password-input
                :value="value"
                info="密码为 6 位数字"
                :focused="showKeyboard && index === ''"
                @focus="
                    showKeyboard = true;
                    index = '';
                "
            />

            <h4 class="cell-title">自定义长度</h4>
            <van-password-input
                :value="value2"
                :length="4"
                :gutter="15"
                :focused="showKeyboard && index === '2'"
                @focus="
                    showKeyboard = true;
                    index = '2';
                "
            />

            <h4 class="cell-title">明文展示</h4>
            <van-password-input
                :value="value3"
                :mask="false"
                :focused="showKeyboard && index === '3'"
                @focus="
                    showKeyboard = true;
                    index = '3';
                "
            />

            <h4 class="cell-title">错误提示</h4>
            <van-password-input
                :value="value4"
                :error-info="errorInfo"
                :focused="showKeyboard && index === '4'"
                @focus="
                    showKeyboard = true;
                    index = '4';
                "
            />
        </div>

        <van-number-keyboard
            :show="showKeyboard"
            @blur="showKeyboard = false"
            @input="onInput"
            @delete="onDelete"
        ></van-number-keyboard>
    </div>
</template>

<script>
import vanHeader from '@components/header';
import vanPasswordInput from '@components/passwordinput';
import vanNumberKeyboard from '@components/numberkeyboard';

export default {
    name: 'PasswordInput',
    components: {
        vanHeader,
        vanPasswordInput,
        vanNumberKeyboard
    },
    data() {
        return {
            value: '123',
            value2: '123',
            value3: '123',
            value4: '123',
            errorInfo: '',
            showKeyboard: false,
            index: ''
        };
    },
    methods: {
        onInput(keyValue) {
            if (this.index === '2') {
                this['value' + this.index] = (this['value' + this.index] + keyValue).slice(0, 4);
            } else {
                this['value' + this.index] = (this['value' + this.index] + keyValue).slice(0, 6);
            }
            if (this.index === '4') {
                if (this.value4.length === 6) {
                    this.errorInfo = '密码错误';
                } else {
                    this.errorInfo = '';
                }
            }
        },
        onDelete() {
            this['value' + this.index] = this['value' + this.index].slice(0, this['value' + this.index].length - 1);
        }
    }
};
</script>
<style>
.cont {
    background-color: #f7f8fa;
    padding-bottom: 300px;
}
</style>
