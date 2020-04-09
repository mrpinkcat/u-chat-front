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
      <!-- <div class="user-dropdown" v-if="userDropdown">
        <router-link :to="{ name: 'settings' }" tag="button">
          <img src="./../assets/settings.svg">
          <span>Settings</span>
        </router-link>
        <router-link :to="{ name: 'add-friend' }" tag="button">
          <img src="./../assets/add-friend.png">
          <span>Add friend</span>
        </router-link>
        <button @click="disconnect">
          <img src="./../assets/disconnect.png">
          <span>Disconnect</span>
        </button>
      </div> -->
    </div>

    <div v-if="convs && convs.length > 0" class="convs">
      <div class="user" v-for="conv in convs" :key="conv.id">
        <img :src="user.imageUrl" class="user-image">
        <div class="text">
          <div class="top">
            <span class="user-name">{{user.name}}</span>
            <!-- <span class="last-message-hour">· 5h</span> -->
          </div>
          <!-- <span class="last-message">Lorem ipsum dolor sit amet consectetur</span> -->
        </div>
        <div class="unread-badge" v-if="user.unreadMessages">
          <span class="unread-number">1</span>
        </div>
      </div>
    </div>
    <div v-else class="no-convs">
      <img src="@/assets/sad.svg" alt="*sad face*">
      <span>You don't have conversation yet.</span>
      <span class="hint">No worries, you can create a new conversation with your friends by clicking on the button below.</span>
      <button @click="newConv">New conversation</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import axios from 'axios';
import ContextualMenu from '@/components/ContextualMenu.vue';
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
  convs?: any;

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

  newConv() {
    console.log(this.$store.getters.getToken);
    axios.post('http://localhost:3000/conversation/', {
      name: 'test',
      members: ['id1', 'id2'],
    }, {
      headers: {
        Authorization: `Bearer ${this.$store.getters.getToken}`,
      },
    });
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

    .user-dropdown {
      background: mix(#33355F, #2D2D56, 50%);
      border: solid 1px rgb(94, 97, 131);
      width: fit-content;
      display: flex;
      flex-direction: column;
      position: absolute;
      left: 260px;
      top: 60px;

      button {
        display: flex;
        align-items: center;
        background: mix(#33355F, #2D2D56, 50%);
        border: none;
        color: #B9BBD5;
        font-size: 16px;
        width: 100%;
        padding: 10px;
        text-align: start;
        cursor: pointer;

        img {
          width: 20px;
          margin-right: 10px;
        }

        &:hover {
          background: scale-color($color: mix(#33355F, #2D2D56, 50%), $lightness: 8%);
        }
      }
    }
  }

  .convs {
    .user {
      padding: 15px 15px;
      width: calc(100% - 30px);
      display: flex;
      flex-direction: row;
      cursor: pointer;

      &:hover {
        background: #3E3E67;
        transition: background ease .25s;
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
