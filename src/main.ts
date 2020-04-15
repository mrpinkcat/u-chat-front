import Vue from 'vue';
import VueSocketIOExt from 'vue-socket.io-extended';
import io from 'socket.io-client';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

const socket = io('http://192.168.0.120:3000');

Vue.use(VueSocketIOExt, socket);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
