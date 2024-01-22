<template>
    <div class="container">
        <van-header title="TreeSelect 分类选择"></van-header>
        <div class="van-content">
            <h4 class="cell-title">单选模式</h4>
            <van-tree-select
                :items="items"
                :active-id.sync="activeId"
                :main-active-index.sync="activeIndex"
                @click-nav="onNavClick"
                @click-item="onItemClick"
            />

            <h4 class="cell-title">多选模式</h4>
            <van-tree-select
                :items="items"
                :active-id.sync="activeIds"
                :main-active-index.sync="activeIndex2"
                @click-nav="onNavClick2"
                @click-item="onItemClick2"
            />

            <h4 class="cell-title">自定义内容</h4>
            <van-tree-select
                height="55vw"
                :items="items2"
                :main-active-index.sync="activeIndex3"
                @click-nav="onNavClick3"
            >
                <template #content>
                    <van-image v-if="activeIndex3 === 0" src="https://img.yzcdn.cn/vant/apple-1.jpg" />
                    <van-image v-if="activeIndex3 === 1" src="https://img.yzcdn.cn/vant/apple-2.jpg" />
                </template>
            </van-tree-select>

            <h4 class="cell-title">徽标提示</h4>
            <van-tree-select
                height="55vw"
                :items="items3"
                :main-active-index.sync="activeIndex4"
                :active-id.sync="activeId2"
                @click-nav="onNavClick4"
                @click-item="onItemClick3"
            />
        </div>
    </div>
</template>

<script>
import vanHeader from '@components/header';
import vanTreeSelect from '@components/treeselect';
import vanImage from '@components/image';

const Console = console;

export default {
    name: 'TreeSelect',
    components: {
        vanHeader,
        vanTreeSelect,
        vanImage
    },
    data() {
        return {
            items: [
                {
                    // 导航名称
                    text: '所有城市',
                    // 该导航下所有的可选项
                    children: [
                        {
                            // 名称
                            text: '温州',
                            // id，作为匹配选中状态的标识
                            id: 1
                        },
                        {
                            text: '杭州',
                            id: 2
                        },
                        {
                            text: '宁波',
                            id: 3,
                            // 禁用选项
                            disabled: true
                        },
                        {
                            text: '义乌',
                            id: 4
                        },
                        {
                            text: '南京',
                            id: 5
                        },
                        {
                            text: '无锡',
                            id: 6
                        },
                        {
                            text: '徐州',
                            id: 7
                        },
                        {
                            text: '苏州',
                            id: 8
                        }
                    ]
                },
                {
                    // 导航名称
                    text: '江苏',
                    // 该导航下所有的可选项
                    children: [
                        {
                            // 名称
                            text: '南京',
                            // id，作为匹配选中状态的标识
                            id: 5
                        },
                        {
                            text: '无锡',
                            id: 6
                        },
                        {
                            text: '苏州',
                            id: 8
                        },
                        {
                            text: '徐州',
                            id: 7
                        }
                    ]
                },
                {
                    text: '浙江',
                    children: [
                        {
                            text: '杭州',
                            id: 2
                        },
                        {
                            text: '温州',
                            id: 1
                        },
                        {
                            text: '宁波',
                            id: 3,
                            disabled: true
                        },
                        {
                            text: '义乌',
                            id: 4
                        }
                    ]
                },
                {
                    text: '福建',
                    disabled: true
                }
            ],
            items2: [{ text: '分组 1' }, { text: '分组 2' }],
            items3: [
                {
                    // 导航名称
                    text: '江苏',
                    badge: 5,
                    // 该导航下所有的可选项
                    children: [
                        {
                            // 名称
                            text: '南京',
                            // id，作为匹配选中状态的标识
                            id: 5
                        },
                        {
                            text: '无锡',
                            id: 6
                        },
                        {
                            text: '苏州',
                            id: 8
                        },
                        {
                            text: '徐州',
                            id: 7
                        }
                    ]
                },
                {
                    text: '浙江',
                    dot: true,
                    children: [
                        {
                            text: '杭州',
                            id: 2
                        },
                        {
                            text: '温州',
                            id: 1
                        },
                        {
                            text: '宁波',
                            id: 3,
                            disabled: true
                        },
                        {
                            text: '义乌',
                            id: 4
                        }
                    ]
                }
            ],
            activeId: 1,
            activeIndex: 0,
            activeIds: [1],
            activeIndex2: 0,
            activeIndex3: 0,
            activeIndex4: 0,
            activeId2: 5
        };
    },
    methods: {
        // 左侧导航点击时，触发的事件
        onNavClick(index) {
            Console.log(`左侧点击index: ${index}`);
            this.activeIndex = index;
        },
        // 右侧选择项被点击时，会触发的事件
        onItemClick(data) {
            Console.log(`右侧点击数据: ${JSON.stringify(data)}`);
            this.activeId = data.id;
        },
        onNavClick2(index) {
            Console.log(`左侧点击index: ${index}`);
            this.activeIndex2 = index;
        },
        // 右侧选择项被点击时，会触发的事件
        onItemClick2(data) {
            Console.log(`右侧点击数据: ${JSON.stringify(data)}`);
            if (this.activeIds.indexOf(data.id) > -1) {
                this.activeIds.splice(this.activeIds.indexOf(data.id), 1);
            } else {
                this.activeIds.push(data.id);
            }
        },
        onNavClick3(index) {
            this.activeIndex3 = index;
        },
        onNavClick4(index) {
            this.activeIndex4 = index;
        },
        onItemClick3(data) {
            this.activeId2 = data.id;
        }
    }
};
</script>
