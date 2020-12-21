<template>
  <div class="warp">
    <ve-line :data="chartData" :theme="theme"></ve-line>
  </div>
</template>

<script>
export default {
  data() {
    return {
      theme: {
        line: {
          smooth: false,
        },
      },
      chartData: {
        columns: ["time", "value"],
        rows: [
          { time: "0:00", value: 1393 },
          { time: "11:30", value: 3530 },
          { time: "12:30", value: 2923 },
          { time: "12:30", value: 1723 },
          { time: "18:00", value: 3792 },
          { time: "24:00", value: 4593 },
        ],
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.warp {
  height: 100%;
}
</style>