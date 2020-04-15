<template>
  <div class="sidebar" ref="container">

    <div class="user">
      <div class="user-info">
        <img src="https://i.imgur.com/RjLAWO9.png" class="user-image">
        <span class="user-name">{{fullName()}}</span>
      </div>
      <!-- <router-link :to="{ name: 'settings' }" tag="button">
        <img src="./../assets/settings.svg">
        <span>Settings</span>
      </router-link> -->
      <router-link :to="{ name: 'add-friend' }" tag="button">
        <img src="./../assets/add-friend.png">
        <span>Add friend</span>
      </router-link>
      <button @click="disconnect">
        <img src="./../assets/disconnect.png">
        <span>Disconnect</span>
      </button>
      <!-- <button class="menu-button" @click="showUserMenu">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </button> -->
    </div>

    <div v-if="convs && convs.length > 0" class="convs">
      <router-link class="conv" v-for="conv in convs" :key="conv.id" :to="`/${conv._id}`">
        <!-- <img :src="conv.imageUrl" class="user-image"> -->
        <div class="text">
          <div class="top">
            <span class="user-name">{{conv.name}}</span>
            <!-- <span class="last-message-hour">· 5h</span> -->
          </div>
          <!-- <span class="last-message">Lorem ipsum dolor sit amet consectetur</span> -->
        </div>
        <!-- <div class="unread-badge" v-if="user.unreadMessages">
          <span class="unread-number">1</span>
        </div> -->
      </router-link>
      <router-link :to="{ name: 'create-conv' }" tag="button">New conversation</router-link>
    </div>
    <div v-else class="no-convs">
      <img src="@/assets/sad.svg" alt="*sad face*">
      <span>You don't have conversation yet.</span>
      <span class="hint">No worries, you can create a new conversation with your friends by clicking on the button below.</span>
      <router-link :to="{ name: 'create-conv' }" tag="button">New conversation</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import axios from 'axios';
import router from '../router';
import { getConvs } from '../scripts/serverManager';

@Component({
  methods: {
    ...mapGetters({
      fullName: 'getFullName',
      token: 'getToken',
    }),
  },
})
export default class Sidebar extends Vue {
  convs: any[] = [];

  loading = true;

  userDropdown = false;

  mounted() {
    getConvs()
      .then((res) => {
        this.convs = res;
        this.loading = false;
      });
  }

  disconnect() {
    this.$store.commit('DISCONNECT');
    router.push({ name: 'login' });
  }
}
</script>

<style scoped lang="scss">
@import '@/scss/index.scss';

.sidebar {
  background: #33355F;
  height: 100%;
  width: 300px;

  >.user {
    padding: 25px 25px 25px 25px;
    width: calc(100% - 50px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;

    .user-info {
      display: flex;
      align-items: center;
      margin-bottom: 10px;

      .user-image {
        height: 40px;
        width: 40px;
        border-radius: 50px;
      }

      .user-name {
        margin-left: 20px;
        font-weight: 500;
        color: #B8BBD5;
      }
    }

    button {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin: 5px 0 5px 30px;

      img {
        height: 32px;
        margin-right: 10px;
      }
    }

    .menu-button {
      background: transparent;
      border: none;
      padding: 0;
      cursor: pointer;
      padding: 10px;
      outline: none;

      &:hover, &:focus {
        .dot {
          transition: background ease .25s;
          background: #B8BBD5;
        }
      }

      .dot {
        width: 4px;
        height: 4px;
        border-radius: 2px;
        margin-bottom: 3px;
        background: #5A5A7F;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }

  .convs {
    .conv {
      padding: 15px 15px;
      width: calc(100% - 30px);
      display: flex;
      flex-direction: row;
      cursor: pointer;
      text-decoration: none;

      &:visited {
        color: #B8BBD5;
      }

      &:hover, &.router-link-exact-active {
        background: #3E3E67;
        transition: background ease .25s;
      }

      &:hover {
        text-decoration: underline;
      }

      .user-image {
        height: 60px;
        width: 60px;
        border-radius: 50%;
        margin-right: 15px;
      }

      .text {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .top {
          .user-name {
            margin-right: 5px;
            color: #B8BBD5;
          }

          .last-message-hour {
            font-weight: 300;
          }
        }

        .last-message {
          margin-top: 5px;
          color: rgba($color: #B8BBD5, $alpha: 0.5);
          font-weight: 300;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          height: fit-content;
        }
      }

      .unread-badge {
        padding-left: 15px;
        display: flex;
        align-items: center;

        .unread-number {
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
          width: 25px;
          height: 25px;
          background: #F06B88;
          font-size: 14px;
          color: white;
        }
      }
    }
  }

  .no-convs {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 100px;

    img {
      width: 100px;
      margin-bottom: 30px;
    }

    span {
      font-weight: 600;
      font-size: 18px;

      &.hint {
        margin-top: 10px;
        font-size: 16px;
        font-weight: 400;
        text-align: center;
        padding: 0 10px;
      }
    }

    button {
      margin-top: 10px;
    }
  }
}
</style>
