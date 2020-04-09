import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    logged: false,
    token: '',
    username: '',
    firstName: '',
    lastName: '',
    lastLogin: '',
    createdAt: '',
    friends: [],
    // lastLogin: undefined,
  },
  getters: {
    getUserLoggedStatus: (store):boolean => store.logged,
    getFullName: (store):string => `${store.firstName} ${store.lastName}`,
    getFirstName: (store):string => store.firstName,
    getLastName: (store):string => store.lastName,
    getToken: (store):string => store.token,
    getUsername: (store):string => store.username,
    getFriends: (store):{ username: String, firstName: String, lastName: String }[] => store.friends,
  },
  mutations: {
    DISCONNECT: (state) => {
      state.logged = false;
      state.token = '';
      state.username = '';
      state.firstName = '';
      state.lastName = '';
      state.lastLogin = '';
      state.createdAt = '';
      state.friends = [];
    },

    CONNECT: (state, info) => {
      state.logged = true;
      state.token = info.token;
      state.username = info.username;
      state.firstName = info.firstName;
      state.lastName = info.lastName;
      state.lastLogin = info.lastLogin;
      state.createdAt = info.createdAt;
      state.friends = info.friends;
    },

    ADD_FRIEND: (state, friendInfo: {username: String, firstName: String, lastName: String}) => {
      // @ts-ignore
      state.friends.push(friendInfo);
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
