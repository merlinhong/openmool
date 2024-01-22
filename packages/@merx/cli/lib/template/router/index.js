import Vue from 'vue';
import VueRouter from 'vue-router';
import { Lazyload } from 'vant';
import ScrollPosition from '@router/scroll-position';
import configRouters from './router-tool';

Vue.use(VueRouter).use(Lazyload, {
  lazyComponent: true,
});
const router = new VueRouter({
  scrollBehavior(to, from, savedPosition) {
    if (to.meta && to.meta.keepScrollTop) {
      return {
        y: ScrollPosition.getTopValue(to.path),
      };
    } else {
      if (savedPosition) {
        return savedPosition;
      } else {
        return {
          y: 0,
        };
      }
    }
  },
  routes: configRouters,
});

router.beforeEach((to, from, next) => {
  // 设置页面标题
  if (to.meta.title) {
    document.title = to.meta.title;
    if (ejs.os.ejs) {
      ejs.navigator.setTitle(to.meta.title);
    }
  }
  if (from.meta.keepScrollTop) {
    // 存储页面到顶部距离
    ScrollPosition.save(from.path);
  }
  next();
});
export default router;
