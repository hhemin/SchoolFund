<template>
  <div class="infowarp">
    <div class="header bgColor">
      <ul class="flex">
        <li>时间</li>
        <li>数量</li>
        <li>累计</li>
      </ul>
    </div>
    <div class="main" ref="main">
      <div v-for="(item, index) in info" :key="index" class="flex">
          <div class="item flex">
            <span>{{ item.time }} </span>
            <span> {{ item.money }}</span>
            <span> {{ item.number }}</span>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: [
        {
          time: "21:00:00",
          money: 1000,
          number: 10,
          state: 0,
        },
        {
          time: "21:00:00",
          money: 1000,
          number: 10,
          state: 0,
        },
        {
          time: "21:00:00",
          money: 1000,
          number: 10,
          state: 0,
        },
        {
          time: "21:00:00",
          money: 1000,
          number: 10,
          state: 0,
        },
        {
          time: "21:00:00",
          money: 1000,
          number: 10,
          state: 0,
        },
      ],
      timer:null
    };
  },
  mounted() {
    this.mainScoll();
    this.timer = setInterval(() => {
      this.mainScoll();
    }, 1000);
  },
  methods: {
    mainScoll() {
      let dom = this.$refs.main;
      this.$set(this.info, this.info.length, {
        time: new Date().getSeconds(),
        money: 1000,
        number: 10,
        state: 0,
      });
      // this.$refs.main.scrollTop = 100
      // console.log(dom.offsetHeight)
      // console.log(dom.offsetTop)
      // console.log(dom.scrollTop)
      this.$refs.main.scrollTo(0, this.$refs.main.scrollHeight);
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);        
    this.timer = null;
  }
};
</script>

<style lang="scss" scoped>
ul {
  border-bottom: 1px solid;
}
ul > li,
.item {
  width: 100%;
  padding: 5px 10px;
  font-size: 10px;
  text-align: center;
  span {
    display: inline-block;
    flex: 1;
  }
}
.infowarp {
  .header {
    position: sticky;
    top: 0;
    right: 0;
  }
}
.main {
  height: 85%;
  overflow: auto;
  // background-color: yellow;
}
</style>