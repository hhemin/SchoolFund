<template>
  <div class="card">
    <div class="card-title">
      <p class="card-header-title fc" style="font-size: 30px">卖出</p>
    </div>
    <div class="field card-content">
      金额：{{moenySum}}
      <p class="control">
        <input class="input bgColor" type="number" placeholder="请输入币数" v-model="currencyNum"/>
      </p>
    </div>
    <footer class="card-footer">
       <div class="card-footer-item">全部出</div>
       <div :class="['card-footer-item',notClick ? 'notclick' : '']" @click="sellCurrency">卖出</div>
    </footer>
  </div>
</template>

<script>
import { Sell } from '@/utils/api';
import { Message } from 'element-ui';
export default {
  data() {
    return {
      currencyNum:null,
      notClick: false,
    }
  },
  methods:{
    async sellCurrency(){
      console.log(typeof this.currencyNum)
      console.log(this.currencyNum)
      this.notClick = true;
      if (!this.currencyNum) {
        Message.error('请输入币数')
        this.notClick = false;
        return false;
      }
      try {
        const res = await Sell({
          currencyName: "BTC",
          currencyNum:this.currencyNum,
        });
        //Message.success(res.message)
        this.notClick = false;
      } catch (e) {
        console.log(e)
        this.notClick = false
      }
      
    }
  },
  components:{
    Message
  },
  inject:['newMoney'],
  computed:{
    moenySum(){
      return this.currencyNum * this.newMoney()
    }
  }
};
</script>

<style lang="scss" scoped>
::-webkit-input-placeholder { color:#f4f9ff; }
// ::-moz-placeholder { color:#f4f9ff; } /* firefox 19+ */
// :-ms-input-placeholder { color:#f4f9ff; } /* ie */
.notclick {
  pointer-events: none;
}
</style>