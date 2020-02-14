<template>
  <div class="sidebar">

    <div class="user">
      <div class="user-info">
        <img src="https://i2-prod.mirror.co.uk/incoming/article13411437.ece/ALTERNATES/s615b/1_PAY-PNLIONFACE02.jpg" class="user-image">
        <span class="user-name">Jhon Doe</span>
      </div>
      <button class="menu">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </button>
    </div>

    <div class="convs">
      <div class="user" v-for="user in convsUsers" :key="user.id">
        <!-- <img :src="user.imageUrl"> -->
        <div class="text">
          <div class="top">
            <span class="userName">{{user.name}}</span>
            <span class="last-message-hour">· 5h</span>
          </div>
          <span class="last-message">Last message</span>
        </div>
        <div class="unread-badge">
          <span class="unread-number">1</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Sidebar extends Vue {
  convsUsers = [
    {
      name: 'Jhon Doe',
      imageUrl: 'https://i2-prod.mirror.co.uk/incoming/article13411437.ece/ALTERNATES/s615b/1_PAY-PNLIONFACE02.jpg',
      id: 1,
    },
  ];
}
</script>

<style scoped lang="scss">
.sidebar {
  background: #33355F;
  height: 100%;
  width: 300px;

  >.user {
    width: calc(100% - 40px);
    padding: 25px 15px 25px 25px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .user-info {
      display: flex;
      align-items: center;

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

    .menu {
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
}
</style>
