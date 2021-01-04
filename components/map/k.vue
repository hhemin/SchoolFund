<template>
  <no-ssr placeholder="Loading...">
    <!-- ve-candle 组件只会在客户端被渲染 -->
    <ve-candle
      :data="chartData"
      :extend="barExtend"
      :settings="chartSettings"
      height="100%"
      :legend-visible="false"
      :not-set-unchange="['dataZoom']"
    />
  </no-ssr>
</template>

<script>
/**
 * @name K线图
 * */ 
import { Kdata } from "@/utils/api";
import { createSocket,oncloseFN } from "@/assets/js/websockt";
import { ip } from "@/utils/config";
import { TimeISO } from "@/assets/js/time";
// const createSockt = new Sockt();
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
     // 注册监听事件
    window.addEventListener('onmessageWS', this.getsocketData)
  },
  methods: {
    async getsocketData(e) {
      const data = e && e.detail.data
      if(!data.hasOwnProperty('side')) return false
      let _v = await this.getKObjFn(data);// 处理K data 中间处理
      this.Obj.time  = this.Obj.time.split(' ')[0]
      _v.time = _v.time.split(' ')[0]
      let timekey = this.chartData.rows[this.chartData.rows.length -1].time
      if(timekey === _v.time) {
        this.chartData.rows[this.chartData.rows.lenght -1] = this.Obj
      }else {
        this.chartData.rows.push(_v)
      }
    },
    async getKdata() {
      let { data } = await Kdata({
        granularity:86400,// 1:小时3600 一天：86400 
        currencyName:'BTC'
      });
      this.chartData.rows = data.reverse();
      // const That = this;
      if (data) {
        this.getFluter();
        // 获取webSockt数据
        // this.getFluter().then((res) => {
        //   console.log('///////')
        //   console.log(res)
        // })
        // let socketmessage = this.getFluter()
        // socketmessage.onmessage = async (evt) => {
        //   let { data } = evt;
        //   let _v = await That.getKObjFn(data);// 处理K data 中间处理
        //   That.Obj.time  = That.Obj.time.split(' ')[0]
        //   _v.time = _v.time.split(' ')[0]
        //   let timekey = That.chartData.rows[That.chartData.rows.length -1].time
        //   if(timekey === _v.time) {
        //     That.chartData.rows[That.chartData.rows.lenght -1] = this.Obj
        //   }else {
        //     That.chartData.rows.push(_v)
        //   }
        //   console.log(_v)
        // }
      }
    },
    // 处理K data 中间处理
    getKObjFn(datav) {
     let That = this
      return new Promise((resolve)=>{
        let _v = ''
        let dataArray = datav.split(",");
        for (let i = 0; i < dataArray.length; i++) {
          if (i === 0)
            That.formatdata({ status: i, value: dataArray[i], index: i });
          if (i > 0 && i < dataArray.length - 1) {
            That.formatdata({
              status: "ok",
              value: Number(dataArray[i].split('"')[1]),
              index: i,
            });
          } else {
            _v = That.formatdata({ value: dataArray[i], status: "default" })
            resolve(That.Obj)
          }
        }
      })
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
          // console.log(this.Obj)
        },
        default: () => {
          return false;
        },
      };
      let actionsFn = actions[status](value, index) || actions["default"];
      actionsFn.call(this);
    },
    getFluter() {
      // const That = this;
      // let _value = ''
      createSocket( `ws://${ip}/KWebSocket/BTC-86400-${localStorage.getItem("user") + 3}`)
      // createSockt.oncreated({
      //   // 3600 
      //   url: `ws://${ip}/KWebSocket/BTC-86400-${
      //     localStorage.getItem("user") + 3
      //   }`,
      // })();
      // createSockt.open();
      // let fn = createSocket.onmessage;
      // return fn
    },
  },
  beforeDestroy() {
    window.removeEventListener('onmessageWS', this.getsocketData)
    oncloseFN()
  },
};
</script>

<style lang="scss" scoped>
</style>