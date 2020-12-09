<template>
  <div class="container headtop">
    <div class="left-wrap">
      <component
        class="table-container"
        :is="JTable"
        :tablehead="tablehead"
        :tablebody="tableData"
        buttonLabel="购买USDT"
      ></component>
      <Page :alldata="1000"></Page>
    </div>
    <div class="right-wrap">
      <Tab :tabData="tabData" @tabClick="tabClick"></Tab>
    </div>
  </div>
</template>

<script>
import JTable from "@/components/common/table";
import Page from "@/components/common/pagination";
import Tab from "@/components/common/tab"
import { GetMonName } from "@/utils/api";
// @name 股市
export default {
  layout: "LMenu",
  data() {
    return {
      JTable,
      tablehead: [
        {
          label: "交易对",
          param: "businessName",
        },
        {
          label: "最新价",
          param: "nowmoney",
        },
        {
          label: "涨幅",
          param: "Increase",
        },
        {
          label: "最高价",
          param: "heightprice",
        },
        {
          label: "最低价",
          param: "lowestprice",
        },
        
        {
          label: "24H量",
          param: "amount",
        },
        {
          label: "24H成交额",
          param: "Turnover",
        }
      ],
      tabData:[
        {id:1,name:"涨幅榜"},
        {id:2,name:"新币榜"},
        {id:3,name:"成交额榜"}
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
          id: 1,
          label: "BTC",
          nowmoney:18277.75,
          Increase:"-2.94%",
          heightprice: 18941.43,
          lowestprice: 18152.52,
          amount:3.35,
          Turnover:40.40,
        },
        {
          id: 1,
          label: "BTC",
          nowmoney:557.75,
          Increase:"+2.94%",
          heightprice: 18941.43,
          lowestprice: 18152.52,
          amount:3.35,
          Turnover:40.40,
        },
        {
          id: 1,
          label: "BTC",
          nowmoney:557.75,
          Increase:"+2.94%",
          heightprice: 18941.43,
          lowestprice: 18152.52,
          amount:3.35,
          Turnover:40.40,
        },
        {
          id: 1,
          label: "BTC",
          nowmoney:557.75,
          Increase:"+2.94%",
          heightprice: 18941.43,
          lowestprice: 18152.52,
          amount:3.35,
          Turnover:40.40,
        },
      ],
      tableOption: [
        {
          label: "详情",
          options: [{}],
        },
      ],
    };
  },
  created() {
    //  this.getDatalist();
  },
  methods: {
    async getDatalist() {
      try {
        let b = await GetMonName({
          limit: 10,
          page: 1,
        });
        console.log(b);
      } catch (err) {}
    },
    tabClick(id){
      console.log(id)
    }
  },
  components: {
    Page,
    Tab
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  display: flex;
  .left-wrap {
    flex: 3;
  }
  .right-wrap {
    flex: 1;
    background-color: #fff;
    font-size: 14px;
    margin-left: 16px;
    border: 1px solid #ccd2da;
  }
}
@media screen and (max-width: 1000px) {
  .right-wrap{
    display: none;
  }
}
</style>