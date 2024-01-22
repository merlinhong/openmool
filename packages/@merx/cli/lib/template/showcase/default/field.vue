<template>
    <div class="container">
        <van-header title="Field 输入框"></van-header>
        <div class="van-content">
            <h4 class="cell-title">基础用法</h4>
            <van-field label="文本" placeholder="请输入用户名" v-model="value" @input="onInput"></van-field>

            <h4 class="cell-title">自定义类型</h4>
            <van-cell-group>
                <!-- 输入任意文本 -->
                <van-field v-model="text" label="文本" placeholder="请输入文本" />
                <!-- 输入手机号，调起手机号键盘 -->
                <van-field v-model="tel" type="tel" label="手机号" placeholder="请输入手机号" />
                <!-- 允许输入正整数，调起纯数字键盘 -->
                <van-field v-model="digit" type="digit" label="整数" placeholder="请输入整数" />
                <!-- 允许输入数字，调起带符号的纯数字键盘 -->
                <van-field v-model="number" type="number" label="数字" placeholder="请输入数字" />
                <!-- 输入密码 -->
                <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" />
            </van-cell-group>

            <h4 class="cell-title">禁用输入框</h4>
            <van-cell-group>
                <van-field label="文本" value="输入框只读" readonly />
                <van-field label="文本" value="输入框已禁用" disabled />
            </van-cell-group>

            <h4 class="cell-title">显示图标</h4>
            <van-cell-group>
                <van-field
                    v-model="value1"
                    label="文本"
                    left-icon="smile-o"
                    right-icon="warning-o"
                    placeholder="显示图标"
                />
                <van-field v-model="value2" clearable label="文本" left-icon="music-o" placeholder="显示清除图标" />
            </van-cell-group>

            <h4 class="cell-title">错误提示</h4>
            <van-cell-group>
                <van-field v-model="username" required label="用户名" placeholder="请输入用户名" error />
                <van-field
                    v-model="phone"
                    required
                    label="手机号"
                    placeholder="请输入手机号"
                    error-message="手机号格式错误"
                />
            </van-cell-group>

            <h4 class="cell-title">插入按钮</h4>
            <van-field v-model="sms" center clearable label="短信验证码" placeholder="请输入短信验证码">
                <template #button>
                    <van-button size="small" type="primary">发送验证码</van-button>
                </template>
            </van-field>

            <h4 class="cell-title">格式化输入内容</h4>
            <van-cell-group>
                <van-field v-model="value3" label="文本" :formatter="formatter" placeholder="在输入时执行格式化" />
                <van-field
                    v-model="value4"
                    label="文本"
                    :formatter="formatter"
                    format-trigger="onBlur"
                    placeholder="在失焦时执行格式化"
                />
            </van-cell-group>

            <h4 class="cell-title">高度自适应</h4>
            <van-field v-model="message" rows="1" autosize label="留言" type="textarea" placeholder="请输入留言" />

            <h4 class="cell-title">显示字数统计</h4>
            <van-field
                v-model="message"
                rows="2"
                autosize
                label="留言"
                type="textarea"
                maxlength="50"
                placeholder="请输入留言"
                show-word-limit
            />

            <h4 class="cell-title">输入框内容对齐</h4>
            <van-field v-model="value" label="文本" placeholder="输入框内容右对齐" input-align="right" />
        </div>
    </div>
</template>

<script>
import vanHeader from '@components/header';
import vanField from '@components/field';
import vanCellGroup from '@components/cellgroup';
import vanButton from '@components/button';
import { Toast } from 'vant';

export default {
    name: 'Field',
    components: {
        vanHeader,
        vanField,
        vanCellGroup,
        vanButton
    },
    data() {
        return {
            value: '',
            username: '',
            password: '',
            disabledValue: '输入框已禁用',
            phone: '1234567',
            message: '',
            sms: '',
            text: '',
            tel: '',
            digit: '',
            number: '',
            value1: '',
            value2: '123',
            value3: '',
            value4: ''
        };
    },
    methods: {
        onInput() {
            const Console = console;

            Console.log(this.value);
        },
        onClickRightIcon(text) {
            Toast(text);
        },
        formatter(value) {
            // 过滤输入的数字
            return value.replace(/\d/g, '');
        }
    }
};
</script>

<style scoped lang="scss">
.van-content {
    background-color: #f7f8fa;
}
/deep/ .van-icon {
    color: #1989fa;
}
</style>
