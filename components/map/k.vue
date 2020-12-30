<template>
  <no-ssr placeholder="Loading...">
    <!-- ve-candle 组件只会在客户端被渲染 -->
    <ve-candle
      :data="chartData"
      :extend="barExtend"
      :settings="chartSettings"
      height="100%"
    />
  </no-ssr>
</template>

<script>
import { Kdata } from "@/utils/api";
import { Sockt } from "@/assets/js/websockt";
import { ip } from "@/utils/config";
import { TimeISO } from "@/assets/js/time";
const createSockt = new Sockt();
export default {
  name: "k",
  data() {
    this.chartSettings = {
      showVol: true,
      showDataZoom: true,
    };
    return {
      barExtend: {
        xAxis: {
          axisLine: { lineStyle: { color: "#8392A5" } },
        },
        yAxis: {
          axisLine: { lineStyle: { color: "#8392A5" } },
        },
      },
      Obj: {
        open: "",
        close: "",
        low: "",
        high: "",
        volume: "",
      },
      chartData: {
        textStyle: {
          color: "#fff",
        },
        columns: ["time", "open", "close", "low", "high", "volume"],
        rows: [],
      },
    };
  },
  mounted() {
    this.getKdata();
    // let datav = `{"candle":"2020-12-22T08:00:00.000Z","22666","22756.1","22528.7","22528.7","167150","738.8137","instrument_id":"BTC-USD-SWAP"}`;
    // let dataArray = datav.split(",");
    // console.log(dataArray);
    // for (let i = 0; i < dataArray.length; i++) {
    //   if (i === 0)
    //     this.formatdata({ status: i, value: dataArray[i], index: i });
    //   if (i > 0 && i < dataArray.length - 1) {
    //     this.formatdata({
    //       status: "ok",
    //       value: Number(dataArray[i].split('"')[1]),
    //       index: i,
    //     });
    //   } else this.formatdata({ value: dataArray[i], status: "default" });
    //   console.log(this.Obj);
    // }
  },
  methods: {
    async getKdata() {
      let { data } = await Kdata();
      this.chartData.rows = data.reverse();
      if (data) {
        // 获取webSockt数据
        this.getFluter()
      //  await this.getFluter().then((res) => {
        //  console.log(this.chartData.rows.lenght)
          // res.time  = res.time.split(' ')[0]
          // // this.Obj.time  = this.Obj.time.split(' ')[0]
          // let timekey = this.chartData.rows[this.chartData.rows.length -1].time
          // if(timekey === this.Obj.time) {
          //   this.chartData.rows[this.chartData.rows.lenght -1] = this.Obj
          // }else {
          //   this.chartData.rows.push(this.Obj)
          // }
          // console.log(res)
        // })
        // let datav = `{"candle":"2020-12-22T08:00:00.000Z","'22666'","'22756.1'","'22528.7'","'22528.7'","'167150'","'738.8137'","instrument_id":"BTC-USD-SWAP"}`
        // let dataArray = datav.split(',')
        // console.log(dataArray)
      }
    },
    // 处理K data 中间处理
   getKObjFn(datav) {
      let dataArray = datav.split(",");
      for (let i = 0; i < dataArray.length; i++) {
        if (i === 0)
          this.formatdata({ status: i, value: dataArray[i], index: i });
        if (i > 0 && i < dataArray.length - 1) {
          this.formatdata({
            status: "ok",
            value: Number(dataArray[i].split('"')[1]),
            index: i,
          });
        } else this.formatdata({ value: dataArray[i], status: "default" });
      }
      // return this.Obj
    },
    // 格式化K data
    formatdata({ status = "default", index = "", value = "" } = {}) {
      const actions = {
        0: (value) => {
          let time = TimeISO(JSON.parse(value + "}").candle);
          this.Obj[this.chartData.columns[index]] = time;
        },
        ok: (value, index) => {
          this.Obj[this.chartData.columns[index]] = value;
          console.log(this.Obj)
        },
        default: () => {
          return false;
        },
      };
      let actionsFn = actions[status](value, index) || actions["default"];
      actionsFn.call(this);
    },
    getFluter() {
      let _value = ''
      createSockt.oncreated({
        // 3600 
        url: `ws://${ip}/KWebSocket/BTC-86400-${
          localStorage.getItem("user") + 3
        }`,
      })();
      createSockt.open();
      let fn = createSockt.onmessage();
      const That = this;
      fn.onmessage = async (evt) => {
        let { data } = evt;
        console.log(data)
        That.getKObjFn(data);// 处理K data 中间处理
      };
      this.$router.afterEach(function () {
        createSockt.onclose();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>