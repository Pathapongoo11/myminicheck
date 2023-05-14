<!-- components/Notification.vue -->

<template>
  <div class="notification">
    Notifications: {{ notificationCount }}
  </div>
</template>

<script>
export default {
 data() {
    return {
      notifications: [],
      notificationCount:0
    }
  },
  created() {
    let notifications = localStorage.getItem('notifications');
    if (notifications) {
      this.notifications = JSON.parse(notifications);
    }
  },
  computed: {
    notificationCount() {
      return this.notifications.length;
    }
  },
  created() {
    this.notifications = localStorage.getItem('notifications')
  },
  computed: {
    orders() {
      return this.$store.state.orders
    },
  },
watch: {
    orders: {
      immediate: true,
      handler() {
        this.notifications = this.orders.length
      }
    }
  }
}
</script>

<style scoped>
.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 15px;
  background-color: #007BFF;
  color: white;
  border-radius: 5px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 1px;
  line-height: 1.6;
  transition: background-color 0.3s ease;
}
.notification:hover {
  background-color: #0056b3;
}
</style>
