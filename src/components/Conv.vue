<template>
  <div class="conv">
    <h1 v-if="pageLoading" class="not-loaded">Loading ...</h1>
    <div v-else class="full-loaded">
      <h1 class="conv-name">{{convInfo.name}}</h1>
      <h3>{{convInfo.topic}}</h3>
      <div class="members">
        <span class="member" v-for="member in convInfo.members" :key="member.username">{{member.firstName}} {{member.lastName}}</span>
      </div>
      <button @click="chat()">dsqdqsd</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';
import { getConvInfo } from '../scripts/serverManager';

@Component({
  // @ts-ignore
  // sockets: {
  //   recived socket: () => {
  //     console.log('message');
  //   },
  // },
})
export default class Chat extends Vue {
  pageLoading = true;

  convInfo?: { name: String, topic: String, members: { username: String, firstName: String, lastName: String }[], messages: { content: String, sender: String, conv: String }[] };

  mounted() {
    getConvInfo(this.$route.params.id)
      .then((res) => {
        this.convInfo = res;
        this.pageLoading = false;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  chat() {
    // @ts-ignore
    this.$socket.emit('chatMessage', 'test');
  }
}

</script>

<style lang="scss" scoped>
.conv {
  background: #2D2D56;
  margin: 20px;

  .not-loaded {
  }

  .full-loaded {
    .conv-name {
      margin-top: 0px;
    }

    .members {
      display: flex;

      .member {
        margin-right: 20px;
        font-weight: normal;
      }
    }
  }
}
</style>
