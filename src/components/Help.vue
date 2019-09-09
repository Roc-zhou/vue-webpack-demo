<template>
  <div class='help'>
    <Header :showName="'help'"></Header>
    <h1>This is help</h1>
  </div>
</template>

<script>
export default {
  beforeRouteEnter(to, from, next) {
    return next(vm => {});
  },
  name: 'help',
  data() {
    return {};
  },
}
</script>
<style scoped>

</style>