<template>
    <div class="container">
        <van-header title="Dialog 弹出框"></van-header>
        <div class="van-content">
            <h4 class="cell-title">提示弹窗</h4>
            <van-button type="primary" plain @click="openDialog({ title: '标题', message: '弹窗内容' })">
                提示弹窗
            </van-button>
            <van-button type="primary" plain @click="openDialog({ message: '弹窗内容' })">无标题提示</van-button>

            <h4 class="cell-title">圆角按钮样式</h4>
            <van-button
                type="primary"
                plain
                @click="
                    openDialog({
                        title: '标题',
                        message: '弹窗内容',
                        theme: 'round-button'
                    })
                "
            >
                提示弹窗
            </van-button>
            <van-button
                type="primary"
                plain
                @click="
                    openDialog({
                        message: '弹窗内容',
                        theme: 'round-button'
                    })
                "
            >
                提示弹窗
            </van-button>

            <h4 class="cell-title">确认弹窗</h4>
            <van-button
                type="primary"
                plain
                @click="
                    openConfirmDialog({
                        title: '标题',
                        message: '弹窗内容'
                    })
                "
            >
                确认弹窗
            </van-button>

            <h4 class="cell-title">异步关闭</h4>
            <van-button
                type="primary"
                plain
                @click="
                    openConfirmDialog({
                        title: '标题',
                        message: '弹窗内容',
                        beforeClose
                    })
                "
            >
                异步关闭
            </van-button>

            <h4 class="cell-title">组件调用</h4>
            <van-button type="primary" plain @click="show = true">组件调用</van-button>
            <van-dialog v-model="show" title="标题" show-cancel-button>
                <img src="https://img.yzcdn.cn/vant/apple-3.jpg" width="320px" height="257px" />
            </van-dialog>
        </div>
    </div>
</template>

<script>
import Dialog from '@components/dialog';
import vanHeader from '@components/header';
import vanButton from '@components/button';

export default {
    name: 'Dialog',
    components: {
        vanHeader,
        vanButton,
        [Dialog.Component.name]: Dialog.Component
    },
    data() {
        return {
            show: false
        };
    },
    methods: {
        openDialog(options) {
            Dialog.alert(options).then(() => {
                // close
                console.log(options);
            });
        },
        openConfirmDialog(options) {
            Dialog.confirm(options)
                .then(() => {
                    // confirm
                })
                .catch(() => {
                    // close
                });
        },
        beforeClose(action, done) {
            if (action === 'confirm') {
                setTimeout(done, 1000);
            } else {
                done();
            }
        }
    }
};
</script>

<style scoped>
.van-button {
    margin-left: 10px;
}
</style>
