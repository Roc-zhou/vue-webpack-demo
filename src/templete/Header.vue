<template>
  <div class="header justify-center items-center">
    <router-link to="/" :class="showName === 'home' ? 'active' : ''">首页</router-link>
    <router-link to="/about" :class="showName === 'about' ? 'active' : ''">关于</router-link>
    <router-link to="/help" :class="showName === 'help' ? 'active' : ''">帮助</router-link>
  </div>
</template>

<script>
export default {
  beforeRouteEnter(to, from, next) {
    return next(vm => {});
  },
  name: "header-menu",
  props: {
    showName: {
      type: String,
      default: "home"
    }
  },
  data() {
    return {};
  }
};
</script>
<style scoped>
.header {
  height: 80px;
}
.header a {
  margin: 0 20px;
  color: #515a6e;
}
.header a:hover {
  color: #2d8cf0;
}
.active {
  color: #2d8cf0 !important;
}
</style>