<template>
    <div class="container">
        <van-header title="IndexBar 索引栏"></van-header>
        <div class="van-content">
            <van-tabs v-model="active">
                <van-tab title="基础用法">
                    <van-index-bar>
                        <div v-for="item in list" :key="item">
                            <van-index-anchor :index="item.anchor" />
                            <van-cell v-for="title in item.title" :key="title" :title="title" />
                        </div>
                    </van-index-bar>
                </van-tab>
                <van-tab title="自定义索引列表">
                    <van-index-bar :index-list="indexList">
                        <div v-for="item in list2" :key="item">
                            <van-index-anchor :index="item.anchor">{{ item.text }}</van-index-anchor>
                            <van-cell v-for="title in item.title" :key="title" :title="title" />
                        </div>
                    </van-index-bar>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script>
import vanHeader from '@components/header';
import vanIndexBar from '@components/indexbar';
import vanIndexAnchor from '@components/indexanchor';
import vanTabs from '@components/tabs';
import vanTab from '@components/tab';
import vanCell from '@components/cell';

export default {
    name: 'GoodsAction',
    components: {
        vanHeader,
        vanIndexBar,
        vanIndexAnchor,
        vanTabs,
        vanTab,
        vanCell
    },
    data() {
        return {
            indexList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            list: [
                {
                    anchor: 'A',
                    title: ['文本', '文本', '文本']
                },
                {
                    anchor: 'B',
                    title: ['文本', '文本', '文本']
                },
                {
                    anchor: 'C',
                    title: ['文本', '文本', '文本']
                },
                {
                    anchor: 'D',
                    title: ['文本', '文本', '文本']
                },
                {
                    anchor: 'E',
                    title: ['文本', '文本', '文本']
                },
                {
                    anchor: 'F',
                    title: ['文本', '文本', '文本']
                },
                {
                    anchor: 'G',
                    title: ['文本', '文本', '文本']
                },
                {
                    anchor: 'H',
                    title: ['文本', '文本', '文本']
                },
                {
                    anchor: 'I',
                    title: ['文本', '文本', '文本']
                },
                {
                    anchor: 'J',
                    title: ['文本', '文本', '文本']
                },
                {
                    anchor: 'K',
                    title: ['文本', '文本', '文本']
                },
                {
                    anchor: 'L',
                    title: ['文本', '文本', '文本']
                },
                {
                    anchor: 'M',
                    title: ['文本', '文本', '文本']
                },
                {
                    anchor: 'N',
                    title: ['文本', '文本', '文本']
                },
                {
                    anchor: 'O',
                    title: ['文本', '文本', '文本']
                },
                {
                    anchor: 'P',
                    title: ['文本', '文本', '文本']
                },
                {
                    anchor: 'Q',
                    title: ['文本', '文本', '文本']
                },
                {
                    anchor: 'R',
                    title: ['文本', '文本', '文本']
                },
                {
                    anchor: 'S',
                    title: ['文本', '文本', '文本']
                },
                {
                    anchor: 'T',
                    title: ['文本', '文本', '文本']
                },
                {
                    anchor: 'U',
                    title: ['文本', '文本', '文本']
                },
                {
                    anchor: 'V',
                    title: ['文本', '文本', '文本']
                },
                {
                    anchor: 'W',
                    title: ['文本', '文本', '文本']
                },
                {
                    anchor: 'X',
                    title: ['文本', '文本', '文本']
                },
                {
                    anchor: 'Y',
                    title: ['文本', '文本', '文本']
                },
                {
                    anchor: 'Z',
                    title: ['文本', '文本', '文本']
                }
            ],
            list2: [
                {
                    anchor: 1,
                    text: '标题1',
                    title: ['文本', '文本', '文本']
                },
                {
                    anchor: 2,
                    text: '标题2',
                    title: ['文本', '文本', '文本']
                },
                {
                    anchor: 3,
                    text: '标题3',
                    title: ['文本', '文本', '文本']
                },
                {
                    anchor: 4,
                    text: '标题4',
                    title: ['文本', '文本', '文本']
                },
                {
                    anchor: 5,
                    text: '标题5',
                    title: ['文本', '文本', '文本']
                },
                {
                    anchor: 6,
                    text: '标题6',
                    title: ['文本', '文本', '文本']
                },
                {
                    anchor: 7,
                    text: '标题7',
                    title: ['文本', '文本', '文本']
                },
                {
                    anchor: 8,
                    text: '标题8',
                    title: ['文本', '文本', '文本']
                },
                {
                    anchor: 9,
                    text: '标题9',
                    title: ['文本', '文本', '文本']
                },
                {
                    anchor: 10,
                    text: '标题10',
                    title: ['文本', '文本', '文本']
                }
            ]
        };
    }
};
</script>

<style scoped>
.van-content {
    background-color: #f7f8fa;
    /* height: 100vh; */
}
</style>
