<script setup lang="tsx">
import { onMounted, ref, nextTick, watch, onUnmounted } from 'vue';
import { Page, Col } from '@/mool/types';
import TopBar from './mool/components/TopBar.vue';
import SideBar from './mool/components/SideBar.vue';
import CanvasFrame from './mool/components/CanvasFrame.vue'; // 导入 CanvasFrame 组件
import ConfigPlane from './mool/components/settings.vue';
import useLoading from '@/mool/hooks/loading';
import { useMool } from '@/mool';
import { useMagicKeys, useEventListener } from '@vueuse/core';
const { route } = useMool();
const { loading, setLoading } = useLoading(true);
const canvasFrameRef = ref<InstanceType<typeof CanvasFrame> | null>(null);

const projectName = ref('');
const pageName = ref('');

const pageConfig = ref<Page>({
    ref: {},
    lifeCycles: {},
    state: {},
    methods: {},
    componentName: 'Page',
    props: {
        style: {
            marginBottom: '18px',
            backgroundColor: '#fff',
            overflow: 'auto',
        },
    },
    popup: [],
    children: [],

    id: '55ty4epk',

    css: '',
});
const clonePageConfig = { ...pageConfig.value };
const currentConf = ref<Col | null>(null);
const activeCurrent = (val: Col) => {
    currentConf.value = val ?? null;
};
const containerStyle = ref<{ width?: string; margin?: string }>({});
const hasActive = ref(false);

const openBar = (arr: [boolean, string]) => {
    hasActive.value = arr[0];
    containerStyle.value.margin = arr[1];
};
const changeSize = (option: { size: string; isPC: boolean }) => {
    containerStyle.value.width = option.size;
};
watch(
    () => route.query,
    (n, o) => {
        querySchema(n.id as string);
        pageName.value = n.pageName as string;
    },
);
// const openPage = (args: string[]) => {
//     router.push({
//         path: '/editor',
//         query: {
//             id: args[0],
//             projectName: route.query.projectName,
//             pageName: args[1],
//         },
//     });
//     querySchema(args[0]);
// };
const querySchema = (id: string = 'cmef4ey5') => {
    setLoading(true);
    Object.assign(pageConfig.value, clonePageConfig);
    fetch(`/api/query-schema/${id}`, {
        method: 'get',
    })
        .then((res) => res.json())
        .then((res) => {
            nextTick(() => {
                setTimeout(() => {
                    pageConfig.value = res.data.pageInfo.schema;
                    const styleEle = document.createElement('style');
                    styleEle.dataset.id = pageConfig.value.id;
                    styleEle.innerHTML = pageConfig.value.css;
                    document.head.appendChild(styleEle);
                    setLoading(false);
                }, 200);
            });
        });
};

// 添加这些新的 ref
const history = ref<Page[]>([]);
const historyIndex = ref(-1);

// 添加一个新的函数来保存历史记录
const saveToHistory = (config: Page) => {
    if (historyIndex.value < history.value.length - 1) {
        history.value = history.value.slice(0, historyIndex.value + 1);
    }
    history.value.push(JSON.parse(JSON.stringify(config)));
    historyIndex.value = history.value.length - 1;
};

// 添加一个撤销函数
const undo = () => {
    if (historyIndex.value > 0) {
        historyIndex.value--;
        pageConfig.value = JSON.parse(
            JSON.stringify(history.value[historyIndex.value]),
        );
    }
};

// 监听 pageConfig 的变化
watch(
    () => pageConfig.value,
    (newValue) => {
        saveToHistory(newValue);
    },
    { deep: true },
);
const handleKeyDown = (e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        console.log('Undo triggered');
        undo();
    } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        console.log('Save triggered');
        // 在这里添加保存逻辑
    }
};
// 修改组件挂载逻辑
onMounted(() => {
    projectName.value = route.query?.projectName as string;
    pageName.value = route.query?.pageName as string;
    querySchema(route.query?.id as string);
});

const openPanel = ref<Record<'js' | 'ref', boolean>>({
    js: false,
    ref: false,
});
const back = () => {
    // router.push({
    //     path: 'apply',
    //     query: {
    //         name: route.query?.projectName as string,
    //     },
    // });
};
</script>

<template>
    <div class="common-layout">
        <el-container>
            <el-header
                style="display: flex; align-items: center; background: #fff"
            >
                <el-page-header
                    style="flex: 1"
                    content="网页设计"
                    @back="back()"
                >
                    <template #title>
                        <div>
                            {{ projectName }}
                        </div>
                    </template>
                    <template #content>
                        <div
                            style="
                                display: flex;
                                align-items: center;
                                justify-content: end;
                                width: 45vw;
                            "
                        >
                            <span class="text-large font-600 mr-3">
                                {{ pageName }}
                            </span>
                        </div>
                    </template>
                </el-page-header>
            </el-header>

            <!-- 顶部栏组件，用于显示和编辑页面配置 -->
            <!-- v-model:pageConfig 用于双向绑定页面配置 -->
            <TopBar v-model:pageConfig="pageConfig" @changeSize="changeSize" />
            <el-container
                :style="{ height: 'calc(100vh - 116px)' }"
                class="justify-between"
            >
                <!-- 侧边栏组件，用于显示和编辑页面配置 -->
                <!-- v-model:pageConfig 用于双向绑定页面配置 -->
                <!-- @change 事件用于监听侧边栏的打开或关闭 -->
                <SideBar
                    v-model:pageConfig="pageConfig"
                    @change="openBar"
                    :current-conf="currentConf"
                    @editPage="openPage"
                    v-model:openPanel="openPanel"
                />
                <!-- 画布组件，用于显示和编辑页面内容 -->
                <!-- v-model:pageConfig 用于双向绑定页面配置 -->
                <!-- :hasActive 用于控制画布的激活状态 -->
                <!-- @active 事件用于监听画布的激活状态 -->
                <CanvasFrame
                    ref="canvasFrameRef"
                    v-model:pageConfig="pageConfig"
                    v-model:current="currentConf"
                    :hasActive="hasActive"
                    :customStyle="containerStyle"
                    :loading="loading"
                    @active="activeCurrent"
                    @keydown="handleKeyDown"
                    tabindex="-1"
                />

                <!-- 侧边栏组件，用于显示和编辑页面配置 -->
                <!-- v-model:current 用于双向绑定当前配置项 -->
                <!-- v-model:pageConfig 用于双向绑定页面配置 -->
                <el-aside
                    class="page-design-config"
                    style="background-color: #fff; width: 260px"
                >
                    <config-plane
                        :is-show-config="true"
                        v-model:current="currentConf"
                        v-model:pageConfig="pageConfig"
                        @openJs="openPanel.js = true"
                        @openRef="openPanel.ref = true"
                    />
                </el-aside>
            </el-container>
        </el-container>
    </div>
</template>

<style lang="less" scoped>
:deep(.hover-effect) {
    &:hover {
        background-color: #f1f1f1 !important;
    }
}

.common-layout {
    position: relative;
    outline: none;
    /* 添加这行以去除 focus 时的轮廓 */
}

.enter_page {
    border: 1px dashed #32adf7;
}

:deep(.dragging) {
    background-color: #fff;

    border: 1px dashed @success-color;

    position: relative;

    &:after {
        content: '';

        width: 100%;

        height: 100%;

        background-color: #fff;

        position: absolute;

        top: 0;

        left: 0;

        right: 0;

        bottom: 0;

        z-index: 999;
    }
}
</style>
