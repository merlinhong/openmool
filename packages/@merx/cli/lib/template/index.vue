<template>
    <div>
        <!-- 页面切换路由节点 -->
        <keep-alive>
            <!--这里是会被缓存的组件-->
            <router-view
                v-if="this.$route && this.$route.meta && this.$route.meta.keepAlive"
                v-wechat-title="$route.meta.title"
            ></router-view>
        </keep-alive>

        <!--这里是不会被缓存的组件-->
        <router-view
            v-if="!(this.$route && this.$route.meta && this.$route.meta.keepAlive)"
            v-wechat-title="$route.meta.title"
        ></router-view>
    </div>
</template>

<script>
export default {};
</script>
