<template>
  <div style="height:100%;">
   <div class="item">
     <div class="titlew">买币策略推荐:</div>
    {{buydata}}
   </div>
   <div class="item">
    <div class="titlew">买币策略推荐:</div>
    {{selldata}}
   </div>
  </div>
</template>

<script>
import {strategyBuy,strategySell} from '@/utils/api'
export default {
   data() {
     return {
       buydata:'',
       selldata:''
     }
   },
   mounted() {
    this.getBuydata();
    this.getselldata();
   },
   methods: {
     async getBuydata() {
      await strategyBuy().then((res) => {
        this.buydata = res.data
        console.log(res)
      })
     },
     async getselldata() {
       await strategySell().then((res) => {
        this.selldata = res.data
       })
     }
   }
}
</script>

<style>
.item {
  margin: 5px;
  padding: 5px;
  box-sizing: border-box;
  height: 47%;
  text-align: center;
  border:1px solid;
  border-radius: 5px;
}
.titlew {
  text-align: left;
  box-shadow: 0px -1px 3px 0px #00000026;
  font-size: 16px;
  padding: 5px;
  box-sizing: border-box;
  color: #ffffff;
  background-color: rgb(27 43 70);
}
</style>