<template>
  <div class="add-friend">
    <h1>Add friend</h1>
    <p>You can search a friend by their name or username</p>
    <div class="search-container">
      <input type="text" v-model="searchText">
      <button @click="searchButton">Search</button>
    </div>
    <div class="list" v-if="usersFound.length > 0 && searched">
      <div class="user" v-for="user in usersFound" :key="user.username">
        <span>{{user.firstName}} {{user.lastName}}</span>
        <button v-if="user.username === username()" class="no">You can't be your own friend :/</button>
        <button v-else-if="friends().find((friends) => friends.username === user.username)" class="no">This user is allready your friend.</button>
        <button v-else @click="addFriendClick(user.username)">Add friend</button>
      </div>
    </div>
    <div class="no-search" v-if="!searched">
      <img src="@/assets/waiting.svg" alt="*waiting*">
      <span>I'm waiting for your request to show you potential new friends.</span>
    </div>
    <div class="no-result" v-if="usersFound.length === 0 && searched">
      <img src="@/assets/not-found.svg" alt="*waiting*">
      <span>I didn't found any user with this name. Try to type his entire name.</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapGetters, mapMutations } from 'vuex';
import { searchUsers, addFriend } from '../scripts/serverManager';
import store from '../store';

@Component({
  methods: {
    ...mapGetters({
      username: 'getUsername',
      friends: 'getFriends',
    }),
    ...mapMutations({
      storeAddFriend: 'ADD_FRIEND',
    }),
  },
})
export default class AddFriend extends Vue {
  searchText = '';

  usersFound: any = [];

  searched = false;

  searchButton() {
    if (this.searchText.length >= 3) {
      searchUsers(this.searchText)
        .then((res) => {
          this.usersFound = res;
          this.searched = true;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  addFriendClick(friendUsername: string) {
    addFriend(friendUsername)
      .then((res) => {
        console.log(res);
        store.commit('ADD_FRIEND', res.find(friends => friends.username === friendUsername));
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/index.scss';

.add-friend {
  width: 100%;
  padding: 0 300px;

  .list {
    margin-top: 40px;

    .user {
      border-bottom: 1px solid #B8BBD5;

      &:last-child {
        border-bottom: none;
      }

      button {
        margin-left: 20px;
      }
    }
  }

  .no-search, .no-result {
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 100px;
      margin-bottom: 30px;
    }
  }
}
</style>
