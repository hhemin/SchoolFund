<template>
  <div class="headtop">
    <!-- <div class="columns">
      我的资产
    </div> -->
    <div class="userinfo">
      <figure class="image is-128x128">
        <img
          class="is-rounded"
          src="https://bulma.zcopy.site/images/placeholders/128x128.png"
        />
      </figure>
      <div class="username">{{ userName }}</div>
    </div>
    <div class="columns info">
      <card
        class="column"
        :card="item"
        v-for="item in cards"
        :key="item.param"
      ></card>
    </div>
    <div class="holding">
      <router-link to="/buy" style="color: #363636"> 我的持仓 </router-link>
    </div>
  </div>
</template>

<script>
import card from "@/components/common/card";
import { PersonInfo } from "@/utils/api";
export default {
  layout: "LMenu",
  components: {
    card,
  },
  data() {
    return {
      cards: [
        {
          title: "币数",
          amount: 0,
          param: "currencyNumSize",
        },
        {
          title: "余额",
          amount: 0,
          param: "moneySize",
        },
        {
          title: "收益率",
          amount: 0,
          param: "profit",
        },
        {
          title: "利润",
          amount: 0,
          param: "profitMoney",
        },
      ],
      userName: "",
      setTime: null,
    };
  },
  mounted() {
    if(localStorage.getItem('token')) {
      this.getPersonInfo();
      this._personInfo();
    }
  },
  methods: {
    async _personInfo() {
      this.setTime = setInterval(async () => {
        this.getPersonInfo();
      }, 5000);
    },
    async getPersonInfo() {
      const res = await PersonInfo();
      for (let key in res.data) {
        if (key === "moneySize" || key === "profitMoney") {
          res.data[key] = (res.data[key] - 0).toFixed(2);
        }
      }
      this.userName = res.data.userName;
      let cards = this.cards;
      cards.forEach((item) => {
        item.amount = res.data[item.param];
      });
      this.cards = cards;
      console.log('hkjhkhjkhjkhkhjkhkjhjkhkjhhkhjkh')
      console.log(res)
    },
  },
  destroyed() {
    clearInterval(this.setTime);
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
  .username {
    color: #fff;
    margin-left: 2rem;
    font-size: 2rem;
  }
}
.info {
  margin: 0;
  /* max-width: 1200px !important; */
}
.card.column {
  margin: 1rem;
  padding: 0;
}
.holding {
  text-align: center;
  background-color: #fff;
  height: 4rem;
  margin: 1rem;
  line-height: 4rem;
}
</style>