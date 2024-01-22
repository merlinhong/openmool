// 引入vue与vur-router核心库
import { Vue, VueRouter, config } from '@boot';
import routes from './router';
import Lazyload from '@components/lazyload';
import Showcase from './showcase';
import '@vant/touch-emulator';

// 使用vue-router
Vue.use(VueRouter).use(Lazyload, {
  lazyComponent: true,
});

config().then(() => {
  const router = new VueRouter({
    routes,
  });

  new Vue({
    router,
    render: (h) => h(Showcase),
  }).$mount('#app');
});
