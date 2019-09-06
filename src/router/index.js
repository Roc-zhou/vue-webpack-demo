import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/Home.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/about.vue'),
    },
    {
      path: '/help',
      name: 'help',
      component: () => import('@/help.vue'),
    }
  ],
})

export default router
