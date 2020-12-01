<template>
  <div class="table-container headtop">

    <component class="headtop table-container" :is="JTable" :tablehead="tablehead" :tablebody="tablebody"></component>
    <button @click="fn">默认按钮</button>
  </div>
</template>

<script>
import JTable from '@/components/common/table' 
import button from '~/components/common/button.vue';
// @name 股市
export default {
  components: { button },
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
       tablebody:[
         {
           order: "B特币",
           nowmoney: "123123",
           heightprice:"9000000",
           lowestprice:"1",
           Increase:"99%",
           Turnover:"10000000000000",
           amount:"2389012830912"
         }
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
   methods: {
     fn() {
       this.$axios.get('http://localhost:3001/api/users').then((res)=> {
         console.log(res)
       })
       console.log(8888)
     }
   }
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
}
</style>