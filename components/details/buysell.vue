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
import {createSocket,oncloseFN} from '@/assets/js/websockt'
import {ip} from "@/utils/config"
// const createSockt = new Sockt();
export default {
  data() {
    return {
      Info,
      buydata:[],
      selldata:[]
    };
  },
  mounted() {
    this.getBuySell();
     // 注册监听事件
    window.addEventListener('onmessageWS', this.getsocketData)
  },
  methods: {
    getsocketData(e) {
      const data = e && e.detail.data
      if(!data.hasOwnProperty('side')) return false
      this.formatData(JSON.parse(data))
    },
    getBuySell() {
      createSocket(`ws://${ip}/webSocket/buy-BTC-${localStorage.getItem("user")+2}`)
      // createSockt.oncreated({
      //   url: `ws://${ip}/webSocket/buy-BTC-${localStorage.getItem(
      //     "user"
      //   )+2}`,
      // })(); //买入出买入
      // createSockt.open();
      // let fn = createSockt.onmessage();
      // const That = this;
      // createSocket.onmessage = (evt) => {
      //   let {data} = evt;
      //   // console.log(data);
      //   That.formatData(JSON.parse(data))
      // };
      // this.$router.afterEach(function () {
      //   createSockt.onclose();
      // });
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
  beforeDestroy() {
    window.removeEventListener('onmessageWS', this.getsocketData)
    oncloseFN()
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