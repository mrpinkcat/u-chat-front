<template>
  <div class="home">
    <h1>LOGIN</h1>
    <label for="username">Username</label>
    <input type="text" id="username" v-model="username">
    <label for="password">Password</label>
    <input type="password" id="password" v-model="password">
    <button @click="connect()">Connect</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Sidebar from '@/components/Sidebar.vue';
import store from '../store';
import { login } from '../scripts/serverManager';

@Component
export default class Login extends Vue {
  username = '';

  password = '';

  connect() {
    login(this.username, this.password)
      .then((res) => {
        console.log(new Date(res.lastLogin).getDate());
        store.commit('CONNECT', res);
        this.$router.push('/');
      })
      .catch(() => {
        console.log('NO');
      });
  }
}
</script>

<style scoped lang="scss">
.home {
  display: flex;
  flex-direction: column;
}
</style>
