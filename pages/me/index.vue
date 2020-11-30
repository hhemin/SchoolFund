<template>
  <div class="headtop">
    <!-- <div class="columns">
      我的资产
    </div> -->
    <div class="userinfo">
      <figure class="image is-128x128">
        <img class="is-rounded" src="https://bulma.zcopy.site/images/placeholders/128x128.png"/>
      </figure>
      <div class="username">{{this.username}}</div>
    </div>
    <div class="columns info">
      <card
        class="column"
        :card="item"
        v-for="item in cards"
        :key="item.title"
      ></card>
    </div>
  </div>
</template>

<script>
import card from "@/components/common/card";
export default {
  layout: "LMenu",
  components: {
    card,
  },
  data() {
    return {
      cards: [
        {
          title: "总资产",
          amount: 1000000,
        },
        {
          title: "浮动盈亏",
          amount: '+2200',
        },
        {
          title: "总市值",
          amount: 2200,
        },
        {
          title: "当日参考盈亏",
          amount: '-100',
        },
      ],
      username:'巴韭特'
    };
  },
};
</script>

<style lang="scss" scoped>
.userinfo {
  height: 300px;
  background-color: rebeccapurple;
  display: flex;
  align-items: center;
  padding: 3rem;
  .username{
    color: #fff;
    margin-left: 2rem;
    font-size:2rem;
  }
}
.info {
  margin: 0;
  /* max-width: 1200px !important; */
}
.card.column {
  margin:1rem;
  padding: 0;
}
</style>