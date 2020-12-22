<template>
  <div class="columns main box mainColor">
    <div class="column is-9 headtop left">
      <div class="kmap card bgColor">
        <no-ssr placeholder="Loading...">
          <component :is="mapchart"></component>
          <div class="change">
            <div class="change-tiem" @click="changefn">
              切换 {{ changename }} 图
            </div>
          </div>
        </no-ssr>
      </div>
      <div class="moneyinfo columns">
        <component
          :is="Buy"
          class="column card bgColor"
          style="margin: 10px 10px 0 0"
        ></component>
        <component
          :is="Sell"
          class="column card bgColor"
          style="margin: 10px 0 0"
        ></component>
        <!-- <div class="column card" style="margin: 10px 0 0">1</div> -->
      </div>
    </div>
    <div class="column rightbox headtop main bgColor">
      <component :is="Buysell" class="buysell"></component>
      <!-- <component class="earn" :is="Info"></component>
      <component class="deficit" :is="Info"></component> -->
    </div>
  </div>
</template>

<script>
import K from "@/components/map/k";
import TimeK from "@/components/map/time";
// import Info from "@/components/details/info";
import Buy from "@/components/details/buy";
import Sell from "@/components/details/sell";
import Buysell from "@/components/details/buysell";
// import {Sockt} from '@/assets/js/websockt'
// const createSockt = new Sockt();
// @name 股市
export default {
  layout: "LMenu",
  data() {
    return {
      K,
      TimeK,
      mapchart: TimeK,
      Buy,
      Sell,
      Buysell,
      // Info,
      changename: "k",
    };
  },
  created() {
    console.log(this.$router.params);
  },
  mounted() {
    // this.websocket();
    // this.getSockFn()
  },
  methods: {
    getBuySell() {
      createSockt.oncreated({url:`ws://192.168.43.253:8080/webSocket/buy-BTC-${localStorage.getItem('user')}`})() //买入出买入
      createSockt.open();
      let fn = createSockt.onmessage();
      fn.onmessage = (evt) => {
        console.log(evt)
      }
      this.$router.afterEach(function () {
        createSockt.onclose();
      });
    },
    getSockFn() {
      let s = new Sockt();
      s.oncreated({url:'www.baidu.com',id:'12312'})
    },
    changefn() {
      this.changename = this.changename === "k" ? "time" : "k";
      this.mapchart = this.mapchart === TimeK ? K : TimeK;
    },
  },
  components: {
    // Info,
    // Button,
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
    .buysell {
       width: 100%;
      height: 100%; 
      overflow: auto;
    }
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
.change {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  transform: translateY(-50px);
  .change-tiem {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
    border: 1px solid;
    // width: 100%;
    cursor: pointer;
    text-align: center;
  }
}
</style>