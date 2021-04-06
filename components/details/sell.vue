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
       <div class="card-footer-item" @click="sellall">全部卖出</div>
       <div :class="['card-footer-item',notClick ? 'notclick' : '']" @click="sellCurrency">卖出</div>
    </footer>
  </div>
</template>

<script>
import { HoldCurrency } from '@/utils/api';
import { Message } from 'element-ui';
import {TS} from '@/utils/api'
export default {
  data() {
    return {
      currencyNum:null,
      notClick: false,
    }
  },
  methods:{
    async sellCurrency(){
      this.notClick = true;
      if (!this.currencyNum) {
        Message.error('请输入币数')
        this.notClick = false;
        return false;
      }
      try {
        const res = await HoldCurrency({
          currencyName: localStorage.getItem('buyname'),
          currencyNum:this.currencyNum,
        });
        Message.success(res.message||'卖出成功啦～')
        this.notClick = false;
      } catch (e) {
        console.log(e)
        this.notClick = false
      }
    },
    async sellall() {
      await HoldCurrency().then((res) => {
        let {data:datavalue} = res;
        let num = null;
        for(let i = 0;datavalue.length>i;i++) {
          if(datavalue[i].currency == localStorage.getItem('buyname')) {
            num = datavalue[i].holdCurrencyNum
          }
        }
        if(!num) {
          Message.error('你还没持有哦～');
        }else {
          this.currencyNum = num;
        }
      })
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
.card-footer-item:active {
  background-color: #2d374c;
}
</style>