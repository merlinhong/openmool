import Vue from 'vue';
import Vuex from 'vuex';

let storeModules = {};
// 下面的注释方便loader解析，请不要删除
// storeModules hook
// 上面的注释方便loader解析，请不要删除

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
