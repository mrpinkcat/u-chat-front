import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import requireAuth from '@/scripts/RequireAuth';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';

import Conv from '@/components/Conv.vue';
import NoConvSelected from '@/components/NoConvSelected.vue';
import AddFriend from '@/views/addFriend.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
  },
  {
    path: '/add-friend',
    component: AddFriend,
    name: 'add-friend',
    beforeEnter: requireAuth,
  },
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
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
