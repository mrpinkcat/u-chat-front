<template>
  <div class="add-conv">
    <h1>New Conversation</h1>
    <p>You can add your friends with the list below, if you have any...</p>
    <div class="search-container">
      <input type="text" v-model="searchText">
      <button @click="searchButton">Search</button>
    </div>
    <div class="list" v-if="searched">
      <div class="user" v-for="user in usersFound" :key="user._id">{{user.firstName}} + {{user.lastName}}</div>
    </div>
    <div class="no-search" v-else>
      <img src="@/assets/tumbleweed.svg" alt="*waiting*">
      <span>Ho *sad noises* You don't have any friend. You can try to add friends by the button bellow.</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class AddFriend extends Vue {
  searchText = '';

  usersFound = [];

  searched = false;

  searchButton() {

  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/index.scss';

.add-conv {
  width: 100%;
  padding: 0 300px;

  .search-container {
    input {

    }
  }

  .no-search {
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
