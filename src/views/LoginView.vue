<template>
  <div class="home">
    <h1>LOGIN</h1>
    <button @click="connect()">Connect</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Sidebar from '@/components/Sidebar.vue';
import store from '../store';

@Component
export default class Login extends Vue {
  connectMutationName = 'CONNECT';

  connect() {
    store.commit(this.connectMutationName);
    this.$router.push({ name: 'chat' });
  }
}
</script>

<style scoped lang="scss">
</style>
