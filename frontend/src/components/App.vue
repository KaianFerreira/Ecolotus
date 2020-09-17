<template>
  <v-app id="app">
    <transition name="slide" mode="out-in">
      <router-view class="router-veiw"></router-view>
    </transition>
  </v-app>
</template>

<script>
</script>

<style lang="scss" scoped>
  .router-view {
    width: 100%;
  }
</style>