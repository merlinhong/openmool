<template>
    <div class="container">
        <van-header title="Badge 徽章"></van-header>
        <div class="van-content">
            <h4 class="cell-title">基础用法</h4>
            <div class="van-doc-demo-block">
                <van-sidebar :active-key="activeKey" @change="onChange" class="wh85 block-center">
                    <van-sidebar-item title="标签名称" />
                    <van-sidebar-item title="标签名称" info="8" />
                    <van-sidebar-item title="标签名称" info="99" />
                    <van-sidebar-item title="标签名称" info="99+" />
                </van-sidebar>
            </div>
        </div>
    </div>
</template>

<script>
import vanHeader from '@components/header';
import { SidebarItem, Sidebar } from 'vant';

export default {
    name: 'SidebarItem ',
    components: {
        [SidebarItem.name]: SidebarItem,
        [Sidebar.name]: Sidebar,
        vanHeader
    },
    data() {
        return {
            activeKey: 0
        };
    },
    methods: {
        onChange(key) {
            this.activeKey = key;
        }
    }
};
</script>

<style scoped>
.wh85 {
    width: 85px;
}

.van-doc-demo-block {
    padding: 20px;
    background-color: #fff;
}

.block-center {
    margin: 0 auto;
}
</style>
