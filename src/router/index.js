import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/back',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: '/back',
        name: 'Back',
        components: {
          backmain: () => import('../components/back/Back.vue')
        }
      },
      {
        path: '/ditu',
        name: 'DiTu',
        components: {
          backmain: () => import('../components/ditu/DiTu.vue')
        }
      },
      // 订单管理
      {
        path: '/orderController',
        name: 'OrderController',
        components: {
          backmain: () => import('../components/OrderController/orderController.vue')
        }
      },
      // 货币管理
      {
        path: '/currencyController',
        name: 'CurrencyController',
        components: {
          backmain: () => import('../components/CurrencyController/currencyController.vue')
        }
      },
      // 用户管理
      // {
      //   path: '/user',
      //   name: 'User',
      //   components: {
      //     backmain: () => import('../components/User/userController.vue')
      //   }
      // },
      // 持有货币
      {
        path: '/userHold',
        name: 'UserHold',
        components: {
          backmain: () => import('../components/userHold/userHoldController.vue')
        }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
