<template>
  <div class="conv">
    <h1>{{this.$route.params.id}} conv</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Chat extends Vue {}

</script>

<style lang="scss" scoped>
.conv {
  background: #2D2D56;
}
</style>
