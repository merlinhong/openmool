<template>
    <div class="container">
        <van-header title="Sidebar 侧边导航"></van-header>
        <div class="van-content">
            <van-row>
                <van-col span="12" class="col">
                    <h4 class="cell-title">基本用法</h4>
                    <van-sidebar v-model="activeKey">
                        <van-sidebar-item title="标签名称" />
                        <van-sidebar-item title="标签名称" />
                        <van-sidebar-item title="标签名称" />
                    </van-sidebar>
                </van-col>
                <van-col span="12" class="col">
                    <h4 class="cell-title">徽标提示</h4>
                    <van-sidebar v-model="activeKey2">
                        <van-sidebar-item title="标签名称" dot />
                        <van-sidebar-item title="标签名称" badge="5" />
                        <van-sidebar-item title="标签名称" badge="99+" />
                    </van-sidebar>
                </van-col>
            </van-row>

            <van-row>
                <van-col span="12" class="col">
                    <h4 class="cell-title">禁用选项</h4>
                    <van-sidebar v-model="activeKey3">
                        <van-sidebar-item title="标签名称" />
                        <van-sidebar-item title="标签名称" disabled />
                        <van-sidebar-item title="标签名称" />
                    </van-sidebar>
                </van-col>
                <van-col span="12" class="col">
                    <h4 class="cell-title">监听切换事件</h4>
                    <van-sidebar v-model="activeKey4" @change="onChange">
                        <van-sidebar-item title="标签名1" />
                        <van-sidebar-item title="标签名2" />
                        <van-sidebar-item title="标签名3" />
                    </van-sidebar>
                </van-col>
            </van-row>
        </div>
    </div>
</template>

<script>
import vanHeader from '@components/header';
import vanSidebar from '@components/sidebar';
import vanSidebarItem from '@components/sidebaritem';
import Notify from '@components/notify';
import vanRow from '@components/row';
import vanCol from '@components/col';

export default {
    name: 'Slider',
    components: {
        vanHeader,
        vanSidebar,
        vanSidebarItem,
        vanRow,
        vanCol
    },
    data() {
        return {
            activeKey: 0,
            activeKey2: 0,
            activeKey3: 0,
            activeKey4: 0
        };
    },
    methods: {
        onChange(index) {
            Notify({ type: 'primary', message: index });
        }
    }
};
</script>

<style scoped>
.van-content {
    padding: 0 10px;
}
.cell-title {
    font-size: 16px;
}
.col {
    padding-left: 40px;
    margin-bottom: 20px;
}
</style>
