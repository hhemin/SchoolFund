<template>
  <div>
    <div class="columns main box">
      <div class="column is-6  headtop left">
        <div class="kmap">
          <no-ssr placeholder="Loading...">
          <component :is="K"></component>
          </no-ssr>
        </div>
        <div>
          <button class="button">买入</button>
        </div>
      </div>
      <div class="column center">2</div>
      <div class="column is-3 right">3</div>
    </div>
  </div>
</template>

<script>
import K from '@/components/map/k'
// @name 股市
  export default {
    layout:'LMenu',
    data() {
      return {
        K,
      }
    }
    // components: {
    //   K
    // }
  }
</script>

<style lang="scss" scoped>
.main {
  background-color: yellowgreen !important;
  width: 100%;
  // height: 100vh;
  // min-height: 100vh;
  margin: 0 !important;
  padding: 0 !important;
  .left {
    height: 100vh;
    background-color: blue;
    .kmap {
      height: 50vh;
      background: yellow;
    }
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