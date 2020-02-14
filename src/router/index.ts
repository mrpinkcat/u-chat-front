import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import requireAuth from '@/scripts/RequireAuth';
import LoginView from '@/views/LoginView.vue';

import Conv from '@/components/Conv.vue';
import NoConvSelected from '@/components/NoConvSelected.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: HomeView,
    /*
      Check function for redirect the user if they are not logged
    */
    beforeEnter: requireAuth,

    children: [
      {
        path: ':id',
        component: Conv,
        name: 'chat.conv',
      },
      {
        path: '',
        component: NoConvSelected,
        name: 'chat.no-conv',
      },
    ],
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
