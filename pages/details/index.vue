<template>
  <div class="columns main box mainColor">
    <div class="column is-9 headtop left">
      <div class="kmap card bgColor">
        <no-ssr placeholder="Loading...">
          <component :is="K"></component>
        </no-ssr>
      </div>
      <div class="moneyinfo columns">
        <component :is="Buy" class="column card bgColor" style="margin: 10px 10px 0 0"></component>
        <component :is="Sell" class="column card bgColor" style="margin: 10px 0 0"></component>
        <!-- <div class="column card" style="margin: 10px 0 0">1</div> -->
      </div>
    </div>
    <div class="column rightbox headtop main bgColor">
      <component class="earn" :is="Info"></component>
      <component class="deficit" :is="Info"></component>
    </div>
  </div>
</template>

<script>
import K from "@/components/map/k";
import Info from "@/components/home/info";
import Buy from "@/components/home/buy";
import Sell from "@/components/home/sell"
// @name 股市
export default {
  layout:'LMenu',
  data() {
    return {
      K,
      Buy,
      Sell,
      Info
    };
  },
  components: {
    Info,
  },
};
</script>

<style lang="scss" scoped>
.columns {
  margin: 0 !important;
  padding: 0 !important;
}
.main {
  height: 100vh;
  width: 100%;
  .left {
    min-height: 100vh;
    // background-color: blue;
    .kmap {
      height: calc(100vh - 320px);
      // background-color: blue;
    }
    .moneyinfo {
      // background-color: yellow;
    }
  }
  .rightbox {
    // height: calc(100%-20px);
    .earn {
      width: 100%;
      height: 50%;
      overflow: auto;
    }
    .deficit {
      width: 100%;
      height: 50%;
      overflow: auto;
    }
  }
}
</style>