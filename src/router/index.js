import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const router = new Router({
  mode: 'history',
  routes: [
    /* {
      path: '/',
      redirect: '/home'
    }, */
    {
      path: '/',
      name: 'Home',
      component: () => import('@/Home'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/About'),
    },
    {
      path: '/help',
      name: 'help',
      component: () => import('@/Help'),
    }
  ],
})

export default router
