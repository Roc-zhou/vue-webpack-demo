<template>
  <div class='helloworld'>
    你好 VUE
  </div>
</template>

<script>
export default {
  beforeRouteEnter(to, from, next) {
    return next(vm => {});
  },
  name: 'helloworld',
  data() {
    return {};
  },
}
</script>
<style scoped>

</style>