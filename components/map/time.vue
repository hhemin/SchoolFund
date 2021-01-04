<template>
  <div class="warp">
    <ve-line :data="chartData" :theme="theme" :legend-visible="false"></ve-line>
  </div>
</template>

<script>
/**
 * @name 日K线
 * */ 
import { Kdata } from "@/utils/api";
import { TimeISO } from "@/assets/js/time";
export default {
  data() {
    return {
      theme: {
        line: {
          smooth: false,
        },
      },
      chartData: {
        columns: ["dateTime", "open"],
        rows: [
          // { time: "0:00", value: 1393 },
          // { time: "11:30", value: 3530 },
          // { time: "12:30", value: 2923 },
          // { time: "12:30", value: 1723 },
          // { time: "18:00", value: 3792 },
          // { time: "24:00", value: 4593 },
        ],
      },
    };
  },
  mounted() {
    // console.log(123)
    this.getData()
  },
  methods: {
    async getData() {
      let { data } = await Kdata({
        granularity:300,// 1:小时3600 一天：86400 
        currencyName:'BTC'
      });
      let arr = []
      data.forEach(element => {
        let tableitem = {
          ...element,
          dateTime:TimeISO(element.dateTime).split(' ')[1],
        }
        arr.push(tableitem)
      });
      console.log(arr)
      this.chartData.rows = arr
      // console.log(data)
    }
  }
};
</script>

<style lang="scss" scoped>
.warp {
  height: 100%;
}
</style>