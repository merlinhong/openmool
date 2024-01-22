<template>
    <div class="container">
        <van-header title="Actionsheet 上拉菜单"></van-header>
        <div class="van-content">
            <h4 class="cell-title">基础用法</h4>
            <van-cell-group>
                <van-cell is-link @click="showTop = true" title="基础用法" />
                <van-cell is-link @click="showBottom = true" title="展示取消按钮" />
                <van-cell is-link @click="showLeft = true" title="展示描述信息" />
            </van-cell-group>
            <van-actionsheet v-model="showTop" :actions="actionsTop" @select="onSelectTop" />
            <van-actionsheet
                v-model="showBottom"
                :actions="actionsTop"
                cancel-text="取消"
                close-on-click-action
                @cancel="onCancel"
            />
            <van-actionsheet
                v-model="showLeft"
                :actions="actionsLeft"
                cancel-text="取消"
                description="这是一段描述信息"
                close-on-click-action
            />

            <h4 class="cell-title">选项状态</h4>
            <van-cell is-link @click="showStatus = true" title="选项状态" />
            <van-actionsheet v-model="showStatus" :actions="actionsStatus" cancel-text="取消" close-on-click-action />

            <h4 class="cell-title">自定义面板</h4>
            <van-cell is-link @click="showZdy = true" title="自定义面板" />
            <van-actionsheet v-model="showZdy" title="标题">
                <div class="content">内容</div>
            </van-actionsheet>
        </div>
    </div>
</template>

<script>
import vanHeader from '@components/header';
import vanActionsheet from '@components/actionsheet';
import vanCell from '@components/cell';
import vanCellGroup from '@components/cellgroup';
import Toast from '@components/toast';

export default {
    name: 'Actionsheet',
    components: {
        vanHeader,
        vanActionsheet,
        vanCell,
        vanCellGroup
    },
    data() {
        return {
            showTop: false,
            showBottom: false,
            showLeft: false,
            showStatus: false,
            showZdy: false,
            actionsTop: [{ name: '选项一' }, { name: '选项二' }, { name: '选项三' }],
            actionsLeft: [{ name: '选项一' }, { name: '选项二' }, { name: '选项三', subname: '描述信息' }],
            actionsStatus: [
                { name: '着色选项', color: '#ee0a24' },
                { name: '禁用选项', disabled: true },
                { name: '加载选项', loading: true }
            ]
        };
    },
    methods: {
        onSelect(item) {
            const Console = console;

            Console.log(JSON.stringify(item));
        },
        onSelectTop(item) {
            // 默认情况下点击选项时不会自动收起
            // 可以通过 close-on-click-action 属性开启自动收起
            this.show = false;
            Toast(item.name);
        },
        onCancel() {
            Toast('取消');
        }
    }
};
</script>

<style scoped>
.van-content {
    height: calc(100vh - 46px);
    background-color: #f7f8fa;
}
.content {
    padding: 16px 16px 160px;
}
</style>
