import Vue from 'vue'
import App from './App.vue'
import router from './router'

import 'rz-ui'
import RZ from './templete'
Vue.use(RZ)

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount("#app")