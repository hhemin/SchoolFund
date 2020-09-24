import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/back',
    component: () => import('../components/Home.vue'),
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
      {
        path: '/new',
        name: 'New',
        components: {
          backmain: () => import('../components/New/New.vue')
        }
      },
      {
        path: '/news',
        name: 'News',
        components: {
          backmain: () => import('../components/News/News.vue')
        }
      },
      {
        path: '/new2',
        name: 'New2',
        components: {
          backmain: () => import('../components/New/New2.vue')
        }
      },
      {
        path: '/news2',
        name: 'News2',
        components: {
          backmain: () => import('../components/News/News2.vue')
        }
      },
      {
        path: '/inquire3',
        name: 'Inquire3',
        components: {
          backmain: () => import('../components/Inquire/Inquire3.vue')
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
