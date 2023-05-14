<!-- App.vue -->

<template>
  <div id="app">
    <notification></notification>
    <router-view></router-view>
  </div>
</template>

<script>
import Notification from './components/Notification'

export default {
  components: {
    Notification
  }
}
</script>
<style scoped>
.app {
  font-size: 20px; /* Adjust as needed */
}
</style>