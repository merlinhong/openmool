<template>
    <div class="container">
        <van-header title="Cell 单元格"></van-header>

        <div class="van-content">
            <h4 class="cell-title">基础用法</h4>
            <van-cell-group>
                <van-cell title="单元格" value="内容" :is-link="false"></van-cell>
                <van-cell title="单元格" value="内容" label="描述信息" :is-link="false"></van-cell>
            </van-cell-group>

            <h4 class="cell-title mt30">单元格大小</h4>
            <van-cell-group>
                <van-cell title="单元格" value="内容" size="large" :is-link="false"></van-cell>
                <van-cell title="单元格" value="内容" size="large" :is-link="false" label="描述信息"></van-cell>
            </van-cell-group>

            <h4 class="cell-title mt30">展示图标</h4>
            <van-cell-group>
                <van-cell title="单元格" icon="location-o" :is-link="false"></van-cell>
            </van-cell-group>

            <h4 class="cell-title mt30">只设置 value</h4>
            <van-cell-group>
                <van-cell value="内容" :is-link="false"></van-cell>
            </van-cell-group>

            <h4 class="cell-title mt30">展示箭头</h4>
            <van-cell-group>
                <van-cell title="单元格" is-link />
                <van-cell title="单元格" is-link value="内容" />
                <van-cell title="单元格" is-link arrow-direction="down" value="内容" />
            </van-cell-group>
            <h4 class="cell-title mt30">页面导航</h4>
            <van-cell-group>
                <van-cell title="URL 跳转" is-link url="../default.html" />
                <van-cell title="路由跳转" is-link to="index" />
            </van-cell-group>
            <h4 class="cell-title mt30">分组标题</h4>
            <van-cell-group title="分组1">
                <van-cell title="单元格" value="内容" />
            </van-cell-group>
            <van-cell-group title="分组2">
                <van-cell title="单元格" value="内容" />
            </van-cell-group>
            <h4 class="cell-title mt30">使用插槽</h4>
            <van-cell-group>
                <van-cell value="内容" is-link>
                    <!-- 使用 title 插槽来自定义标题 -->
                    <template #title>
                        <span class="custom-title">单元格</span>
                        <van-tag type="danger">标签</van-tag>
                    </template>
                </van-cell>

                <van-cell title="单元格" icon="shop-o">
                    <!-- 使用 right-icon 插槽来自定义右侧图标 -->
                    <template #right-icon>
                        <van-icon name="search" class="search=icon" />
                    </template>
                </van-cell>
            </van-cell-group>
            <h4 class="cell-title mt30">垂直居中</h4>
            <van-cell-group>
                <van-cell center title="单元格" value="内容" label="描述信息" />
            </van-cell-group>
        </div>
    </div>
</template>

<script>
import vanHeader from '@components/header';
import vanCellGroup from '@components/cellgroup';
import vanCell from '@components/cell';
import vanTag from '@components/tag';
import vanIcon from '@components/icon';

export default {
    name: 'Cell',
    components: {
        vanCell,
        vanHeader,
        vanCellGroup,
        vanTag,
        vanIcon
    }
};
</script>

<style scoped>
.mt30 {
    margin-top: 30px;
}
.custom-title {
    margin-right: 4px;
    vertical-align: middle;
}

.search-icon {
    font-size: 16px;
    line-height: inherit;
}
</style>
