import Vue from 'vue';
import Vuex from 'vuex';
import storeModules from './module-tool';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    info: '',
  },
  getters: {},
  mutations: {
    setInfo(state, data) {
      state.info = data;
    },
  },
  actions: {},
  modules: storeModules,
});
