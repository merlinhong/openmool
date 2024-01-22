<template>
    <div class="container">
        <van-header title="Notify 消息提示"></van-header>
        <div class="van-content">
            <h4 class="cell-title">基础用法</h4>
            <van-button type="danger" @click="showNotify('通知内容')">基础用法</van-button>
            <h4 class="cell-title">通知类型</h4>
            <van-row style="margin-bottom: 10px">
                <van-col span="8" style="padding: 0 10px">
                    <van-button type="info" @click="showNotify({ type: 'primary', message: '通知内容' })">
                        主要通知
                    </van-button>
                </van-col>
                <van-col span="8">
                    <van-button type="primary" @click="showNotify({ type: 'success', message: '通知内容' })">
                        成功通知
                    </van-button>
                </van-col>
            </van-row>
            <van-row>
                <van-col span="8" style="padding: 0 10px">
                    <van-button type="danger" @click="showNotify({ type: 'danger', message: '通知内容' })">
                        危险通知
                    </van-button>
                </van-col>
                <van-col span="8">
                    <van-button type="warning" @click="showNotify({ type: 'warning', message: '通知内容' })">
                        警告通知
                    </van-button>
                </van-col>
            </van-row>

            <h4 class="cell-title">自定义配置</h4>
            <van-button
                type="primary"
                @click="
                    showNotify({
                        message: '自定义颜色',
                        color: '#ad0000',
                        background: '#ffe1e1'
                    })
                "
            >
                自定义颜色
            </van-button>
            <van-button
                type="primary"
                @click="
                    showNotify({
                        message: '自定义时长',
                        duration: 1000
                    })
                "
            >
                自定义时长
            </van-button>

            <h4 class="cell-title">组件调用</h4>
            <van-button type="primary" text="组件调用" @click="showNotify2" />
            <van-notify v-model="show" type="success">
                <van-icon name="bell" style="margin-right: 4px" />
                <span>通知内容</span>
            </van-notify>
        </div>
    </div>
</template>

<script>
import Notify from '@components/notify';
import vanHeader from '@components/header';
import vanButton from '@components/button';
import vanIcon from '@components/icon';
import vanRow from '@components/row';
import vanCol from '@components/col';

export default {
    name: 'Notify',
    components: {
        vanHeader,
        vanButton,
        vanIcon,
        [Notify.Component.name]: Notify.Component,
        vanRow,
        vanCol
    },
    data() {
        return {
            show: false
        };
    },
    methods: {
        showNotify(options) {
            Notify(options);
        },
        showNotify2() {
            this.show = true;
            setTimeout(() => {
                this.show = false;
            }, 2000);
        }
    }
};
</script>

<style scoped>
.van-button {
    margin-left: 10px;
}
</style>
