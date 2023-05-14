// store/index.js

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    orders: [],
  },
  mutations: {
    addOrder(state, order) {
    
 
      const expiryDate = new Date()
      expiryDate.setDate(expiryDate.getDate() + 1)
      expiryDate.setHours(0, 0, 0, 0)
      const newOrders = order.map(order => ({
        ...order,
        expiryDate: expiryDate.toISOString(),
      }));

      newOrders.forEach(newOrder => {
        const index = state.orders.findIndex(order => order.name === newOrder.name && order.expiryDate === newOrder.expiryDate);
        if (index !== -1) {
          // อัปเดต order ที่มีอยู่
          state.orders[index] = newOrder;
        } else {
          // เพิ่ม order ใหม่
          state.orders.push(newOrder);
        }
      });
  
      console.log(newOrders);
  
      // state.orders.push(...newOrders);
      // state.orders.push(newOrder);
      localStorage.setItem('orders', JSON.stringify(state.orders));
  

    if ('serviceWorker' in navigator && 'PushManager' in window) {
      navigator.serviceWorker.ready.then(function(registration) {
        registration.showNotification('New order', {
          body: `Order for ${order.name} received`,
          icon: 'img/icons/android-chrome-192x192.png'
        })
      })
    }

    // this.$router.push({ name: 'Summary' })
    },
    updateOrder(state, updatedOrder) {
      const orderIndex = state.orders.findIndex(order => order.name === updatedOrder.name)
      if (orderIndex > -1) {
        Vue.set(state.orders, orderIndex, updatedOrder)
        localStorage.setItem('orders', JSON.stringify(state.orders))
      }
    },
    removeExpiredOrders(state) {
      // implement logic to remove expired orders here
      const now = new Date()
    state.orders = state.orders.filter(order => new Date(order.expiryDate) > now)
    localStorage.setItem('orders', JSON.stringify(state.orders))
    }
  }
})
