<template>
  <div class="register">
    <div class="left">
      <h1>Register</h1>
      <label for="username">Username</label>
      <input type="text" id="username" v-model="username" autocomplete="username">
      <label for="firstname">First Name</label>
      <input type="text" id="firstname" v-model="firstName" autocomplete="given-name">
      <label for="lastname">Last Name</label>
      <input type="text" id="lastname" v-model="lastName" autocomplete="family-name">
      <label for="password">Password</label>
      <input type="password" id="password" v-model="password" autocomplete="new-password">
      <button @click="registerProcess()">Register</button>
    </div>
    <div class="right">

    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Sidebar from '@/components/Sidebar.vue';
import store from '../store';
import { register, login } from '../scripts/serverManager';
import router from '../router';

@Component
export default class Register extends Vue {
  username = '';

  firstName = '';

  lastName = '';

  password = '';

  registerProcess() {
    register(this.username, this.firstName, this.lastName, this.password)
      .then(() => {
        login(this.username, this.password)
          .then((userInfo) => {
            store.commit('CONNECT', userInfo);
            router.push('/');
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
</script>

<style scoped lang="scss">
.register {
  .left {
    display: flex;
    flex-direction: column;
  }
}
</style>
