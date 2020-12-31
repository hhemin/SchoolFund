<template>
  <div class="card">
    <div class="card-title">
      <p class="card-header-title fc" style="font-size: 30px">买入</p>
    </div>
    <div class="field card-content is-centered">
      币数：{{currencyNum}}
      <p class="control">
        <input
          class="input bgColor"
          type="number"
          placeholder="输入金额"
          v-model="money"
        />
      </p>
      <!-- <p class="control">
        <a class="button is-primary"> Transfer </a>
      </p> -->
    </div>
    <footer class="card-footer">
      <div
        :class="[notClick ? 'notclick' : '', 'card-footer-item']"
        @click="buyCurrency"
      >
        买入
      </div>
    </footer>
  </div>
</template>

<script>
import { Buy } from "@/utils/api";
import { Message } from 'element-ui';
export default {
  data() {
    return {
      money:0,
      notClick: false,
    };
  },
  methods: {
    async buyCurrency() {
      let money = this.money - 0
      this.notClick = true;
      if (!money) {
        Message.error('请输入金额')
        this.notClick = false;
        return false;
      }
      try {
        const res = await Buy({
          currencyName: "BTC",
          money:money,
        });
        Message.success(res.message)
        this.notClick = false;
      } catch (e) {
        console.log(e)
        this.notClick = false
      }
    },
  },
  components:{
    Message
  },
  inject:['newMoney'],
  computed:{
    currencyNum(){
      let newMoney = this.newMoney()
      return this.money / newMoney
    }
  }
};
</script>

<style lang="scss" scoped>
::-webkit-input-placeholder {
  color: #f4f9ff;
}
::-moz-placeholder {
  color: #f4f9ff;
} /* firefox 19+ */
:-ms-input-placeholder {
  color: #f4f9ff;
} /* ie */
input:-moz-placeholder {
  color: #f4f9ff;
}
.notclick {
  pointer-events: none;
}
</style>