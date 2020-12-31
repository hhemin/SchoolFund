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
          label: "持有货币金额",
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
    };
  },
  components: {
    Page,
  },
  mounted(){
    this._holdCurrency()
  },
  methods:{
    async _holdCurrency(){
      try {
        const res = await HoldCurrency()
        console.log(res)
        this.tableData = res.data
      } catch (e) {
        console.log(e)
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>