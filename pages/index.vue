<template>
  <div>
    <div class="columns main">
      <div class="column is-6 left">1</div>
      <div class="column center">2</div>
      <div class="column is-3 right">3</div>
    </div>
  </div>
</template>

<script>
// @name 股市
  export default {
    layout:'LMenu'
  }
</script>

<style lang="scss" scoped>
.main {
  background-color: yellowgreen !important;
  width: 100%;
  // height: 100vh;
  min-height: 100vh;
  margin: 0 !important;
  padding: 0 !important;
  .left {
    height: 100vh;
    background-color: blue;
  }
  .center {
    height: 100vh;
  }
  .right {
    height: 100vh;
    background-color: yellow;
  }
}
</style>