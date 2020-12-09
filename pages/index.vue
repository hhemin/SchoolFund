<template>
  <div class="container headtop">
    <component class="table-container" :is="JTable" :tablehead="tablehead" :tablebody="tableData" buttonLabel="购买USDT" ></component>
    <Page :alldata="1000"></Page>
  </div>
</template>

<script>
import JTable from '@/components/common/table' 
import Page from '@/components/common/pagination'
import {GetMonName} from '@/utils/api'
// @name 股市 1
export default {
   layout:'LMenu',
   data() {
     return {
       JTable,
       tablehead:[
         {
           label:"币种",
           param: "order",
         },
         {
           label:"最新价格",
           param:"nowmoney",
         },
         {
           label:"最高价格",
           param:"heightprice",
         },
         {
           label:"最低价格",
           param:"lowestprice",
         },
         {
           label:"涨幅",
           param:"Increase",
         },
         {
           label:"24小时成交额度",
           param:"Turnover",
         },
         {
           label:"24小时成交量",
           param:"amount",
         },
       ],
      //  tablebody:[
      //    {
      //      order: "B特币",
      //      nowmoney: "123123",
      //      heightprice:"9000000",
      //      lowestprice:"1",
      //      Increase:"99%",
      //      Turnover:"10000000000000",
      //      amount:"2389012830912"
      //    }
      //  ],
      tableData: [
        {
          id:1,
          label: "王者爱仕达",
          num: 39967.965828,
          quota: "100,000.00-258,193.00",
          price: 6.46,
          isBuy: false,
        },
        {
          id:2,
          label: "王者爱仕达",
          num: 39967.965828,
          quota: "100,000.00-258,193.00",
          price: 6.46,
          isBuy: true,
        },
      ],
       tableOption:[
        {
          label:"详情",
          options:[
            {
              
            }
          ]
        }
       ]
     }
   },
   mounted() {
     this.getDatalist();
   },
   methods: {
     async getDatalist() {
      try {
        let b = await GetMonName({
          limit: 10,
          page: 1
        })
      }catch(err) {
        console.log(err)
      }
     },
   },
   components: {
     Page
   }
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
}
</style>