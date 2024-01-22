<template>
    <div class="container">
        <van-header title="Collapse 折叠面板"></van-header>
        <div class="van-content">
            <h4 class="cell-title">基础用法</h4>
            <van-collapse v-model="activeNames">
                <van-collapse-item title="标题1" name="1" is-link>内容</van-collapse-item>
                <van-collapse-item title="标题2" name="2" is-link>内容</van-collapse-item>
                <van-collapse-item title="标题3" name="3" disabled is-link>内容</van-collapse-item>
            </van-collapse>

            <h4 class="cell-title">手风琴</h4>
            <van-collapse v-model="activeName" accordion>
                <van-collapse-item title="标题1" name="1" is-link>内容</van-collapse-item>
                <van-collapse-item title="标题2" name="2" is-link>内容</van-collapse-item>
                <van-collapse-item title="标题3" name="3" is-link>内容</van-collapse-item>
            </van-collapse>

            <h4 class="cell-title">自定义标题内容</h4>
            <van-collapse v-model="activeNames2">
                <van-collapse-item name="1" is-link>
                    <template #title>
                        <div>
                            标题1
                            <van-icon name="question-o" />
                        </div>
                    </template>
                    内容
                </van-collapse-item>
                <van-collapse-item title="标题2" name="2" icon="shop-o" is-link value="内容">内容</van-collapse-item>
            </van-collapse>
        </div>
    </div>
</template>

<script>
import vanHeader from '@components/header';
import vanCollapse from '@components/collapse';
import vanCollapseItem from '@components/collapseitem';
import vanIcon from '@components/icon';

export default {
    name: 'Collapse',
    components: {
        vanHeader,
        vanIcon,
        vanCollapse,
        vanCollapseItem
    },
    data() {
        return {
            activeNames: ['1'],
            activeName: '1',
            activeNames2: ['1']
        };
    }
};
</script>
<style scoped>
.van-content {
    background-color: #f7f8fa;
    height: 100vh;
}
</style>
