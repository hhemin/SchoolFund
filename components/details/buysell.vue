<template>
  <div class="main">
  <!-- data:{{buydata}} -->
    <component class="earn" :is="Info" :info="buydata" classcolor="buy"></component>
    <div class="buyselltitle tc">
      最新价:{{newMoney()}}
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
import {ip} from "@/utils/config"
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
        url: `ws://${ip}/webSocket/buy-BTC-${localStorage.getItem(
          "user"
        )+2}`,
      })(); //买入出买入
      createSockt.open();
      let fn = createSockt.onmessage();
      const That = this;
      fn.onmessage = (evt) => {
        let {data} = evt;
        // console.log(data);
        That.formatData(JSON.parse(data))
      };
      this.$router.afterEach(function () {
        createSockt.onclose();
      });
    },
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
  inject:['newMoney']
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