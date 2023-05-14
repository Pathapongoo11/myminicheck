// router/index.js
import Vue from 'vue'
import VueRouter from 'vue-router'
import OrderPage from '@/components/OrderTable.vue'
import SummaryPage from '@/components/Summary.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Order',
    component: OrderPage
  },
  {
    path: '/summary',
    name: 'Summary',
    component: SummaryPage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
