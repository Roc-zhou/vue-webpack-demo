<template>
  <div class='home'>
    <Header :showName="'home'"></Header>
    <h1>This is home</h1>
  </div>
</template>

<script>
export default {
  beforeRouteEnter(to, from, next) {
    return next(vm => {});
  },
  name: 'home',
  data() {
    return {};
  },
}
</script>
<style scoped>

</style>