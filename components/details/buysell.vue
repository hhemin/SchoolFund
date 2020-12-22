<template>
  <div class="main">
  <!-- data:{{buydata}} -->
    <component class="earn" :is="Info" :info="buydata" classcolor="buy"></component>
    <div class="buyselltitle tc">
      最新价:1231231
    </div>
    <component class="deficit" :is="Info" :info="selldata"></component>
  </div>
</template>

<script>
/**
 * @name 卖出买入 逻辑组件
 * */
import Info from "@/components/details/info";
import {Sockt} from '@/assets/js/websockt'
const createSockt = new Sockt();
export default {
  data() {
    return {
      Info,
      buydata:[],
      selldata:[]
    };
  },
  mounted() {
    // this.getBuySell();
  },
  methods: {
    getBuySell() {
      createSockt.oncreated({
        url: `ws://192.168.43.253:8080/webSocket/buy-BTC-${localStorage.getItem(
          "user"
        )+2}`,
      })(); //买入出买入
      createSockt.open();
      let fn = createSockt.onmessage();
      const That = this;
      fn.onmessage = (evt) => {
        let {data} = evt;
        console.log(data);
        let dataa = {"side":"buy","trade_id":"70353496","size":"1","price":"21905","instrument_id":"BTC-USD-SWAP","timestamp":"2020-12-21T12:12:23.991Z"}
        That.formatData(JSON.parse(data))
      };
      this.$router.afterEach(function () {
        createSockt.onclose();
      });
    },
    // {"side":"buy","trade_id":"70353496","size":"1","price":"21905","instrument_id":"BTC-USD-SWAP","timestamp":"2020-12-21T12:12:23.991Z"}
    // {"side":"sell","trade_id":"70353497","size":"10","price":"21904.7","instrument_id":"BTC-USD-SWAP","timestamp":"2020-12-21T12:12:24.016Z"}
    formatData(value) {
      const actions = {
        'buy':()=> {
          this.buydata.push(value)
        },
        'sell':()=> {
           this.selldata.push(value)
        },
        'default':()=> {
          return false
        }
      }
      let actionFn = actions[value.side]||actions['default'];
      return actionFn.call(this);
    }
  },
};
</script>

<style lang="scss" scoped>
.main {
  height: 100%;
  overflow: hidden;

  .earn {
    width: 100%;
    height: 48%;
    overflow: auto;
  }
  .buyselltitle {
    height: 4%;
  }
  .deficit {
    width: 100%;
    height: 48%;
    overflow: auto;
  }
}
</style>