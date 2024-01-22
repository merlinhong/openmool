<template>
    <div class="container">
        <van-header title="Area 省市区选择器"></van-header>
        <div class="van-content">
            <h4 class="cell-title">用法示例</h4>
            <van-cell-group>
                <van-cell is-link @click="showTop = true" title="基础用法" />
                <van-cell is-link @click="showBottom = true" title="选中省市区" />
                <van-cell is-link @click="showLeft = true" title="配置显示列" />
                <van-cell is-link @click="showClose = true" title="配置列占位提示文字" />
            </van-cell-group>
            <van-area
                v-model="showTop"
                title="标题"
                :area-list="areaList"
                @confirm="onConfirm"
                @cancel="onCancel"
                @change="onChange"
            />
            <van-area
                v-model="showBottom"
                title="标题"
                :area-list="areaList"
                value="110101"
                @confirm="onConfirm"
                @cancel="onCancel"
                @change="onChange"
            />
            <van-area
                v-model="showLeft"
                title="标题"
                :area-list="areaList"
                :columns-num="2"
                @confirm="onConfirm"
                @cancel="onCancel"
            />
            <van-area
                v-model="showClose"
                show-toolbar
                title="标题"
                :area-list="areaList"
                :columns-placeholder="['请选择', '请选择', '请选择']"
                @confirm="onConfirm"
                @cancel="onCancel"
            />
        </div>
    </div>
</template>

<script>
import vanHeader from '@components/header';
import vanCellGroup from '@components/cellgroup';
import vanCell from '@components/cell';
import vanArea from '@components/area';
import Toast from '@components/toast';

export default {
    name: 'area',
    components: {
        vanArea,
        vanHeader,
        vanCellGroup,
        vanCell
    },
    data() {
        return {
            showTop: false,
            showBottom: false,
            showLeft: false,
            showClose: false,
            areaList: {
                // eslint-disable-next-line camelcase
                province_list: {
                    110000: '北京市',
                    120000: '天津市'
                },
                // eslint-disable-next-line camelcase
                city_list: {
                    110100: '北京市',
                    110200: '县',
                    120100: '天津市',
                    120200: '县'
                },
                // eslint-disable-next-line camelcase
                county_list: {
                    110101: '东城区',
                    110102: '西城区',
                    110105: '朝阳区',
                    110106: '丰台区',
                    120101: '和平区',
                    120102: '河东区',
                    120103: '河西区',
                    120104: '南开区',
                    120105: '河北区'
                }
            }
        };
    },
    methods: {
        onConfirm(value, index) {
            Toast(`当前值：${JSON.stringify(value)}, 当前索引：${index}`);
        },
        onChange(area, value, index) {
            Toast(`当前值：${value}, 当前索引：${index}`);
        },
        onCancel() {
            Toast('取消');
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
