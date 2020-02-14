import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    logged: true,
  },
  getters: {
    getUserLoggedStatus: (store):boolean => store.logged,
  },
  mutations: {
    DISCONNECT: (state) => {
      state.logged = false;
    },

    CONNECT: (state) => {
      state.logged = true;
    },
  },
  actions: {
  },
  modules: {
  },
  plugins: [
    createPersistedState(),
  ],
});
