<template>
    <div class="container">
        <van-header title="Picker 选择器"></van-header>
        <div class="van-content">
            <h4 class="cell-title">用法示例</h4>
            <van-cell-group>
                <van-cell is-link @click="showTop = true" title="基础用法" />
                <van-cell is-link @click="showBottom = true" title="默认选中项" />
                <van-cell is-link @click="showLeft = true" title="多列选择" />
                <van-cell is-link @click="showClose = true" title="级联选择" />
                <van-cell is-link @click="showZdy = true" title="禁用选项" />
                <van-cell is-link @click="showRight = true" title="动态设置选项" />
                <van-cell is-link @click="showIconP = true" title="加载状态" />
            </van-cell-group>
            <van-picker
                v-model="showTop"
                title="标题"
                show-toolbar
                :columns="columns"
                @confirm="onConfirm"
                @cancel="onCancel"
                @change="onChange"
            />
            <van-picker
                v-model="showBottom"
                show-toolbar
                title="标题"
                :columns="columns"
                :default-index="2"
                @confirm="onConfirm"
                @cancel="onCancel"
                @change="onChange"
            />
            <van-picker
                v-model="showLeft"
                show-toolbar
                title="标题"
                :columns="columns2"
                @confirm="onConfirm"
                @cancel="onCancel"
            />
            <van-picker
                v-model="showClose"
                show-toolbar
                title="标题"
                :columns="columns3"
                @confirm="onConfirm"
                @cancel="onCancel"
            />
            <van-picker v-model="showZdy" show-toolbar :columns="columns4" @confirm="onConfirm" @cancel="onCancel" />
            <van-picker v-model="showRight" show-toolbar :columns="columns5" @confirm="onConfirm" @change="onChange2" />
            <van-picker v-model="showIconP" show-toolbar :columns="columns6" :loading="loading" @confirm="onConfirm" />
        </div>
    </div>
</template>

<script>
import vanHeader from '@components/header';
import vanCellGroup from '@components/cellgroup';
import vanCell from '@components/cell';
import vanPicker from '@components/picker';
import Toast from '@components/toast';

const cities = {
    浙江: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
    福建: ['福州', '厦门', '莆田', '三明', '泉州']
};

export default {
    name: 'picker',
    components: {
        vanPicker,
        vanHeader,
        vanCellGroup,
        vanCell
    },
    data() {
        return {
            showTop: false,
            showBottom: false,
            showLeft: false,
            showRight: false,
            showClose: false,
            showZdy: false,
            showIconP: false,
            columns: ['杭州', '宁波', '温州', '绍兴', '湖州', '嘉兴', '金华', '衢州'],
            columns2: [
                // 第一列
                {
                    values: ['周一', '周二', '周三', '周四', '周五'],
                    defaultIndex: 2
                },
                // 第二列
                {
                    values: ['上午', '下午', '晚上'],
                    defaultIndex: 1
                }
            ],
            columns3: [
                {
                    text: '浙江',
                    children: [
                        {
                            text: '杭州',
                            children: [{ text: '西湖区' }, { text: '余杭区' }]
                        },
                        {
                            text: '温州',
                            children: [{ text: '鹿城区' }, { text: '瓯海区' }]
                        }
                    ]
                },
                {
                    text: '福建',
                    children: [
                        {
                            text: '福州',
                            children: [{ text: '鼓楼区' }, { text: '台江区' }]
                        },
                        {
                            text: '厦门',
                            children: [{ text: '思明区' }, { text: '海沧区' }]
                        }
                    ]
                }
            ],
            columns4: [{ text: '杭州', disabled: true }, { text: '宁波' }, { text: '温州' }],
            columns5: [{ values: Object.keys(cities) }, { values: cities['浙江'] }],
            columns6: [],
            loading: true
        };
    },
    methods: {
        onConfirm(value, index) {
            Toast(`当前值：${JSON.stringify(value)}, 当前索引：${index}`);
        },
        onChange(picker, value, index) {
            Toast(`当前值：${value}, 当前索引：${index}`);
        },
        onCancel() {
            Toast('取消');
        },
        onChange2(picker, values) {
            picker.setColumnValues(1, cities[values[0]]);
        }
    }
};
</script>

<style scoped>
.van-content {
    padding-left: 10px;
    padding-right: 10px;
}
</style>
