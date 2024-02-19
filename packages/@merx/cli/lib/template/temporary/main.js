// 引入vue与vur-router核心库
import Vue from 'vue';
// 引入定义当前模块使用的路由文件
import router from '@router/index.js';
import store from '@store/index.js';
// 引入默认组件
import Index from './index.vue';
import '@shared/config.js';
import '@assets/css/common.css';
import loaderLibrary from '@tool/loadlibrary';
import 'vant/lib/icon/local.css';
loaderLibrary({
   inject: 'head',
    src: './lib/vconsole.min.js',
    type: 'js'
})
// configMain hook
Vue.config.devtools = true;
Vue.config.productionTip = false;

global.vm = new Vue({
  // 定义使用的路由组件
  router,
  // 定义使用的状态管理
  store,
  // 定义默认渲染进#app内的模板文件
  render: (h) => h(Index),
}).$mount('#app');
