<template>
    <div class="container">
        <van-header title="DropdownMenu 下拉菜单"></van-header>
        <div class="van-content">
            <h4 class="cell-title">基础用法</h4>
            <van-dropdown-menu>
                <van-dropdown-item v-model="value1" :options="option1" />
                <van-dropdown-item v-model="value2" :options="option2" />
            </van-dropdown-menu>

            <h4 class="cell-title">自定义菜单内容</h4>
            <van-dropdown-menu>
                <van-dropdown-item v-model="value" :options="option" />
                <van-dropdown-item title="筛选" ref="item">
                    <van-cell center title="包邮">
                        <template #right-icon>
                            <van-switch v-model="switch1" size="24" active-color="#ee0a24" />
                        </template>
                    </van-cell>
                    <van-cell center title="团购">
                        <template #right-icon>
                            <van-switch v-model="switch2" size="24" active-color="#ee0a24" />
                        </template>
                    </van-cell>
                    <div style="padding: 5px 16px">
                        <van-button type="danger" block round @click="onConfirm">确认</van-button>
                    </div>
                </van-dropdown-item>
            </van-dropdown-menu>

            <h4 class="cell-title">自定义选中态颜色</h4>
            <van-dropdown-menu active-color="#1989fa">
                <van-dropdown-item v-model="value1" :options="option1" />
                <van-dropdown-item v-model="value2" :options="option2" />
            </van-dropdown-menu>

            <h4 class="cell-title">向上展开</h4>
            <van-dropdown-menu direction="up">
                <van-dropdown-item v-model="value1" :options="option1" />
                <van-dropdown-item v-model="value2" :options="option2" />
            </van-dropdown-menu>

            <h4 class="cell-title">禁用菜单</h4>
            <van-dropdown-menu>
                <van-dropdown-item v-model="value1" disabled :options="option1" />
                <van-dropdown-item v-model="value2" disabled :options="option2" />
            </van-dropdown-menu>
        </div>
    </div>
</template>

<script>
import vanDropdownMenu from '@components/dropdownMenu';
import vanDropdownItem from '@components/dropdownItem';
import vanCell from '@components/cell';
import vanButton from '@components/button';
import vanSwitch from '@components/switch';
import vanHeader from '@components/header';

export default {
    name: 'DropdownMenu',
    components: {
        vanHeader,
        vanDropdownMenu,
        vanDropdownItem,
        vanCell,
        vanButton,
        vanSwitch
    },
    data() {
        return {
            value1: 0,
            value2: 'a',
            option1: [
                { text: '全部商品', value: 0 },
                { text: '新款商品', value: 1 },
                { text: '活动商品', value: 2 }
            ],
            option2: [
                { text: '默认排序', value: 'a' },
                { text: '好评排序', value: 'b' },
                { text: '销量排序', value: 'c' }
            ],
            value: 0,
            switch1: false,
            switch2: false,
            option: [
                { text: '全部商品', value: 0 },
                { text: '新款商品', value: 1 },
                { text: '活动商品', value: 2 }
            ]
        };
    },
    methods: {
        onConfirm() {
            this.$refs.item.toggle();
        }
    }
};
</script>

<style scoped>
.van-content {
    background-color: #f7f8fa;
    height: 100vh;
}
</style>
