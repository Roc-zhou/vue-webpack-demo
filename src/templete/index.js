import Header from './Header.vue'

const RZ = {
  Header
},
  install = Vue => {
    for (let [key, value] of Object.entries(RZ)) Vue.component(key, value)
  }

!!window && window.Vue && install(window.Vue) // auto install

export default { ...RZ, install } 