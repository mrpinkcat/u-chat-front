<template>
  <div class="home">
    <sidebar />
    <router-view class="page"></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Sidebar from '@/components/Sidebar.vue';
import store from '../store';

@Component({
  components: {
    sidebar: Sidebar,
  },
})
export default class Chat extends Vue {
  disconnectMutationName = 'DISCONNECT';

  disconnect() {
    store.commit(this.disconnectMutationName);
  }
}

</script>

<style scoped lang="scss">
.home {
  width: 100%;
  height: 100%;
  display: flex;

  .page {
    flex-grow: 1;
  }
}
</style>
