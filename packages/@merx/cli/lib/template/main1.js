import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import Index from './index.vue';

Vue.config.devtools = true;
Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use(VueRouter);

const router = new VueRouter({
  route: [],
});
const store = new Vuex.Store({
  state: {
    info: '',
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {},
});
new Vue({
  // 定义使用的路由组件
  router,
  // 定义使用的状态管理
  store,
  // 定义默认渲染进#app内的模板文件
  render: (h) => h(Index),
}).$mount('#app');
