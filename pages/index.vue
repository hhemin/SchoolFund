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
import Tab from "@/components/common/tab";
import { GetMonName } from "@/utils/api";
import {Sockt} from '@/assets/js/websockt'
// import Button from '~/components/common/button.vue';
// @name 股市
const createSockt = new Sockt();

export default {
  layout: "LMenu",
  data() {
    return {
      JTable,
      testdata: [
        {
          value:12,
          name:'BTN'
        }
      ],
      tablehead: [
        // {
        //   label: "",
        //   param: "currencyImgIcon",
        //   hidemoneytip:true,// 显示图片
        //   showimg:true,
        // },
        {
          label: "交易对",
          // param: "currencyName",
          hidelabel:true,
          hidemoneytip:true,
          children:[
            {
              param: "currencyImgIcon",
              hidemoneytip:true,// 显示图片
              showimg:true,
            },
            {
              param: "currencyName",
              hidelabel:true,
              hidemoneytip:true,
            }
          ]
        },
        {
          label: "最新价",
          param: "last",
        },
        {
          label: "涨幅",
          param: "Increase",
          hidemoneytip:true,
        },
        {
          label: "24H最高价",
          param: "high_24h",
        },
        {
          label: "24H最低价",
          param: "low_24h",
        },
        {
          label: "24H开盘价",
          param: "open_24h",
        },
        // {
        //   label: "24H成交额",
        //   param: "Turnover",
        // },
      ],
      tabData: [
        { id: 1, name: "涨幅榜" },
        { id: 2, name: "新币榜" },
        { id: 3, name: "成交额榜" },
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
      tableOption: [
        {
          label: "详情",
          options: [{}],
        },
      ],
      tableData:[],
      valueArray:[],
      websodata:{}
    };
  },
  mounted() {
    this.getDatalist();
  },
  methods: {
    async getDatalist() {
      try {
        let {data:{list}} = await GetMonName({
          limit: 1000,
          page: 1,
        });
        let _v = [];
        let tableArray = []
        // console.log(list)
        list.forEach(item => {
          let tableitem = {
            currencyImgIcon: 'http://192.168.43.253:8080'+item.currencyImgIcon,
            currencyName:item.currencyName,
            last:item.last || '',
            Increase:0,
            high_24h:item.high_24h|| '',
            low_24h:item.low_24h|| '',
            open_24h:item.open_24h|| '',
          }
          _v.push(item.currencyName)
          tableArray.push(tableitem)
        });
        this.tableData = tableArray;
        // console.log(tableArray)
        this.createSockfn(_v)
      } catch (err) {
        console.log(err);
      }
    },
    changevalue(data,value) {
            

    },
    createSockfn(value) {
      createSockt.oncreated({url:`ws://192.168.43.253:8080/webSocket/cuy-${value}-${localStorage.getItem('user')}`})()
      // createSockt.oncreated({url:'ws://192.168.43.253:8080/webSocket/cuybuyBTCadmin'})() //买入出买入
      createSockt.open();
      let fn = createSockt.onmessage();
      fn.onmessage = (evt) => {
        let {data:value} = evt
        this.websodata = JSON.parse(value)
        if(this.websodata.instrument_id) {
         let name = this.websodata.instrument_id.split('-')[0]
           for(let i = 0;i<this.tableData.length;i++) {
            if(name == this.tableData[i].currencyName) {
              this.$set(this.tableData[i],'last',this.websodata.last)
              this.$set(this.tableData[i],'high_24h',this.websodata.high_24h)
              this.$set(this.tableData[i],'low_24h',this.websodata.low_24h)
              this.$set(this.tableData[i],'open_24h',this.websodata.open_24h)
              this.$set(this.tableData[i],'Increase',((1- this.websodata.last/this.websodata.open_24h)*100).toFixed(2))
              break;
            }
          }
        }
        console.log(this.tableData)
      }
      // this.websodata = createSockt.onmessage()
    },
    tabClick(id) {
      console.log(id);
    },
  },
  components: {
    Page,
    Tab,
    // Button
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
  .right-wrap {
    display: none;
  }
}
</style>