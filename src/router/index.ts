import Vue from 'vue';
import VueRouter from 'vue-router';
import ChatView from '../views/ChatView.vue';
import requireAuth from '@/scripts/RequireAuth';
import LoginView from '@/views/LoginView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'chat',
    component: ChatView,
    /*
      Check function for redirect the user if they are not logged
    */
    beforeEnter: requireAuth,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
