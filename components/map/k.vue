<template>
    <no-ssr placeholder="Loading...">
      <!-- ve-candle 组件只会在客户端被渲染 -->
      <ve-candle :data="chartData" :extend="barExtend" :settings="chartSettings" height="100%" />
    </no-ssr>
</template>

<script>
import {Kdata} from '@/utils/api'
import {Sockt} from '@/assets/js/websockt'
import {ip} from '@/utils/config'
const createSockt = new Sockt();
export default {
  name: "k",
  data() {
    this.chartSettings = {
      showVol: true,
      showDataZoom: true
    }
    return {
      barExtend: {
        xAxis:{
          axisLine: { lineStyle: { color: '#8392A5' } }
        },
        yAxis:{
         axisLine: { lineStyle: { color: '#8392A5' } }
        }
      },
      chartData: {
        textStyle: {
          color: "#fff"
        },
        columns: ["time", "open", "close", "low", "high", "volume"],
        rows: [],
      },
    };
  },
  mounted() {
    this.getKdata()
  },
  methods: {
    async getKdata() {
      let {data} = await Kdata()
      this.chartData.rows = data.reverse()
      if(data) {
        this.getFluter()
      }
    },
    getFluter() {
      createSockt.oncreated({
        url: `ws://${ip}/KWebSocket/BTC-3600-${localStorage.getItem(
          "user"
        )+3}`,
      })();
      createSockt.open();
      let fn = createSockt.onmessage();
      const That = this;
      fn.onmessage = (evt) => {
        let {data} = evt;
        let mm = data.splice(',')
        console.log(mm);
        // data.
        // let dataa = // {"candle":"2020-12-22T08:00:00.000Z","22666","22756.1","22528.7","22528.7","167150","738.8137","instrument_id":"BTC-USD-SWAP"}
        // That.formatData(JSON.parse(data))
      };
      this.$router.afterEach(function () {
        createSockt.onclose();
      });

    }
   }
};
</script>

<style lang="scss" scoped>
</style>