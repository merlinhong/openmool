<template>
    <div class="container">
        <van-header title="Pagination 分页"></van-header>
        <div class="van-content">
            <h4 class="cell-title">基础用法</h4>
            <van-pagination v-model="currentPage" :total-items="50" @change="onChangePage"></van-pagination>

            <h4 class="cell-title">简单模式</h4>
            <van-pagination v-model="currentPage" mode="simple" :page-count="12" />

            <h4 class="cell-title">显示省略号</h4>
            <van-pagination v-model="currentPage" :total-items="125" :show-page-size="3" force-ellipses />
        </div>
    </div>
</template>

<script>
import vanHeader from '@components/header';
import vanPagination from '@components/pagination';
import { Toast } from 'vant';

export default {
    name: 'Pagination',
    components: {
        vanHeader,
        vanPagination
    },
    data() {
        return {
            currentPage: 1
        };
    },
    methods: {
        onChangePage() {
            Toast(`当前第 ${this.currentPage} 页`);
        }
    }
};
</script>
<style scoped>
.van-content {
    height: calc(100vh - 50px);
    background-color: #f7f8fa;
}
</style>
