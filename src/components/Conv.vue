<template>
  <div class="conv">
    <h1 v-if="pageLoading" class="not-loaded">Loading ...</h1>
    <div v-else class="full-loaded">
      <h1 class="conv-name">{{convInfo.name}}</h1>
      <h3 class="conv-topic">{{convInfo.topic}}</h3>
      <span class="members-label">Participants :</span>
      <div class="members">
        <span class="member" v-for="member in convInfo.members" :key="member.username">{{member.firstName}}</span>
      </div>
    </div>
    <div class="chat">
      <div v-for="message in messages" :key="message.content" class="message">
        <span class="username">{{message.sender}}:</span>
        <span class="content">{{message.content}}</span>
      </div>
    </div>
    <div class="input-group">
      <input type="text" v-model="messageInput" @keyup.enter="chat">
      <button @click="chat">Send</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';
import { Socket } from 'vue-socket.io-extended';
import { getConvInfo } from '../scripts/serverManager';

@Component
export default class Chat extends Vue {
  pageLoading = true;

  convId?: string;

  convInfo?: { name: String, topic: String, members: { username: String, firstName: String, lastName: String }[], messages: { content: String, sender: { username: String }, conv: String }[] };

  messages: { sender: String, content: String }[] = [];

  messageInput = '';

  mounted() {
    getConvInfo(this.$route.params.id)
      .then((res) => {
        this.convId = this.$route.params.id;
        this.convInfo = res;
        res.messages.forEach((message) => {
          this.messages.push({ sender: message.sender.username, content: message.content });
        });
        this.pageLoading = false;
        this.$socket.client.emit('conversationConnection', { convId: this.convId, username: this.$store.getters.getUsername });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  destroyed() {
    this.$socket.client.emit('conversationDisconnection', { convId: this.convId, username: this.$store.getters.getUsername });
  }

  chat() {
    this.$socket.client.emit('chatMessage', { convId: this.convId, senderUsername: this.$store.getters.getUsername, content: this.messageInput });
    this.messageInput = '';
  }

  @Socket('messageRecived')
  onMessageRecived(messageInfo: { senderUsername: String, content: String }) {
    console.log(messageInfo);
    this.messages.unshift({ sender: messageInfo.senderUsername, content: messageInfo.content });
  }
}

</script>

<style lang="scss" scoped>
@import '@/scss/index.scss';

.conv {
  background: #2D2D56;
  margin: 20px;

  .not-loaded {
  }

  .full-loaded {
    .conv-name {
      margin: 0px;
    }

    .conv-topic {
      margin-top: 3px;
      font-weight: 300;
    }

    .members-label {
      font-weight: bold;
    }

    .members {
      display: flex;
      margin-bottom: 20px;

      .member {
        margin-right: 20px;
        font-weight: normal;
      }
    }

  }

  .chat {
    display: flex;
    flex-direction: column-reverse;
    border: 1px solid #B8BBD5;
    flex-grow: 1;
    overflow-y: auto;
    height: calc(100% - 120px - 20px - 38px);

    .message {
      display: flex;
      flex-direction: column;
      padding: 10px;
      border-top: 1px solid #B8BBD5;

      &:last-child {
        border-top: none;
      }

      .username {
        font-weight: 300;
        margin-bottom: 5px;
        color: #8D93C7
      }
    }
  }

  .input-group {
    display: flex;
    input {
      flex-grow: 1;
    }
  }
}
</style>
