<template>
  <div class="home">
    <navbar />
    <h1>CHAT</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Navbar from '@/components/Navbar.vue';

@Component({
  components: {
    navbar: Navbar,
  },
})
export default class Chat extends Vue {
}
</script>

<style scoped lang="scss">
</style>
