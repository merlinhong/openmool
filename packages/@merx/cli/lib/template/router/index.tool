import Vue from 'vue';
import VueRouter from 'vue-router';
import { Lazyload } from 'vant';
import ScrollPosition from '@router/scroll-position';
let multiplRouters = [];
let configRouters = [];
// 下面的注释方便loader解析，请不要删除
// configRouters hook
// 上面的注释方便loader解析，请不要删除

Vue.use(VueRouter).use(Lazyload, {
    lazyComponent: true,
});
const router = new VueRouter({
    scrollBehavior(to, from, savedPosition) {
        if (to.meta && to.meta.keepScrollTop) {
            return {
                y: ScrollPosition.getTopValue(to.path),
            };
        }
        if (savedPosition) {
            return savedPosition;
        }

        return {
            y: 0,
        };
    },
    routes: [...configRouters, ...multiplRouters],
});

router.beforeEach((to, from, next) => {
    // 设置页面标题
    if (from.meta.keepScrollTop) {
        // 存储页面到顶部距离
        ScrollPosition.save(from.path);
    }
    next();
});
export default router;
