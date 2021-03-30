<template>
  <div class="container headtop">
    <!-- <component class="table-container" :is="JTable" buttonLabel="查看" :tablebody="tableData"></component> -->
    <component
      class="table-container"
      :is="JTable"
      :tablehead="tablehead"
      :tablebody="tableData"
      buttonLabel=""
    ></component>
  </div>
</template>

<script>
import JTable from "@/components/common/table";
import Page from "@/components/common/pagination";
import {HoldCurrency} from '@/utils/api'
import { Message } from 'element-ui';
export default {
  layout: "LMenu",
  data() {
    return {
      JTable,
      tablehead: [
        // {
        //   label: "",
        //   param: "currencyImgIcon",
        //   hidemoneytip:true,// 显示图片
        //   showimg:true,
        // },
        {
          label: "货币名",
          param: "currency",
          hidemoneytip:true
        },
        {
          label: "当前价格",
          param: "holdCurrencyMoney",
          hidemoneytip:true
        },
        {
          label: "货币数量",
          param: "holdCurrencyNum",
          hidemoneytip:true
        }
        // {
        //   label: "24H成交额",
        //   param: "Turnover",
        // },
      ],
      tableData:[],
      setTime:null
    };
  },
  components: {
    Page,
    Message
  },
  mounted(){
    if(localStorage.getItem('token')) {
    this._holdCurrency()
    this.getHold()
    }
  },
  methods:{
    async _holdCurrency(){
     this.setTime = setInterval(async () => {
       this.getHold()
     },5000)
    },
    async getHold() {
       try {
        const res = await HoldCurrency()
        if(!res.data){
          Message('没有持仓')
          return false
        }
        this.tableData = res.data
      } catch (e) {
        console.log(e)
      }
    }
  },
  destroyed(){
    clearInterval(this.setTime)
  }
};
</script>

<style lang="scss" scoped>
</style>