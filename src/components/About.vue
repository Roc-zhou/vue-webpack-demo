<template>
  <div class="about">
    <Header :showName="'about'"></Header>
    <h1>This is about</h1>
  </div>
</template>

<script>
export default {
  beforeRouteEnter(to, from, next) {
    return next(vm => {});
  },
  name: "about",
  data() {
    return {};
  }
};
</script>
<style scoped>
</style>