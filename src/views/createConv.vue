<template>
  <div class="add-conv">
    <h1>New Conversation</h1>
    <p>You can add your friends on the conversation with the list below, if you have any...</p>
    <div class="name-row">
      <label for="conv-name">Conversation name:</label>
      <input type="text" id="conv-name" v-model="convName">
    </div>
    <div class="name-row">
      <label for="conv-name">Conversation topic:</label>
      <input type="text" id="conv-name" v-model="convTopic">
    </div>
    <label id="friend-list-label">Add a user to conversation:</label>
    <div class="list" v-if="friends.length > 0">
      <div class="user" v-for="friend in friends" :key="friend.username">
        <span>{{friend.firstName}} {{friend.lastName}}</span>
        <button v-if="selectedFriends.find((selectedFriend) => selectedFriend.username === friend.username)" @click="removeFriendToConv(friend)"><img src="@/assets/minus.svg" alt="-"></button>
        <button v-else @click="addFriendToConv(friend)"><img src="@/assets/add.svg" alt="+"></button>
      </div>
    </div>
    <div class="no-friends" v-if="friends.length === 0">
      <img src="@/assets/not-found.svg" alt="*waiting*">
      <span>I didn't found any user with this name. Try to type his entire name.</span>
    </div>

    <button class="create-conv" @click="createConversationClick()">Create conversation</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import store from '../store';
import { createConversation } from '../scripts/serverManager';
import router from '../router';

@Component({
  methods: {
    // ...mapGetters({
    //   friends: 'getFriends',
    // }),
  },
})
export default class createConv extends Vue {
  convName: string = '';

  convTopic: string = '';

  friends: {username: String, firstName: String, lastName: String}[] = [];

  selectedFriends: {username: String, firstName: String, lastName: String}[] = [];

  mounted() {
    this.friends = store.getters.getFriends;
  }

  addFriendToConv(friend: {username: String, firstName: String, lastName: String}) {
    this.selectedFriends.push(friend);
  }

  removeFriendToConv(friend: {username: String, firstName: String, lastName: String}) {
    const index = this.selectedFriends.indexOf(friend);
    this.selectedFriends.splice(index, 1);
  }

  createConversationClick() {
    createConversation(this.convName, this.convTopic, this.selectedFriends)
      .then((res) => {
        router.push(`/${res._id}`);
      });
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/index.scss';

.add-conv {
  width: 100%;
  padding: 0 300px;
  display: flex;
  flex-direction: column;

  .name-row {
    margin-top: 40px;
    width: 400px;
    display: flex;
    align-items: center;

    #conv-name {
      margin-left: 20px;
      flex-grow: 1;
    }
  }

  label {
    font-weight: bold;

  }

  #friend-list-label {
    margin-top: 40px;
    margin-bottom: 10px;
  }

  .no-friends {
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 100px;
      margin-bottom: 30px;
    }
  }

  .list {
    width: 400px;
    display: flex;
    flex-direction: column;

    .user {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 5px 0;
      border-bottom: 1px solid #B8BBD5;

      &:last-child {
        border-bottom: none;
      }

      span {
        flex-grow: 1;
      }

      button {
        margin-left: 20px;
        display: flex;
        align-items: center;

        img {
          width: 22px;
        }
      }
    }
  }

  .create-conv {
    margin-top: 40px;
    width: 400px;
  }
}
</style>
