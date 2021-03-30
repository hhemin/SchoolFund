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
import {createSocket,sendWSPush,onmessageFn,oncloseFN} from '@/assets/js/websockt'
import {ip} from '@/utils/config'
// import Button from '~/components/common/button.vue';
// @name 股市

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
      websodata:{},
    };
  },
  mounted() {
   //绑定事件
   if(localStorage.getItem('token')) {
    this.getDatalist();
     // 注册监听事件
     window.addEventListener('onmessageWS', this.getsocketData)
   }else {
    window.$nuxt.$router.push({path:'login'})
   }
  },
  methods: {
    getsocketData(e) {
      // `{"last":"28365.82","high_24h":"29305.97","low_24h":"27352.58","instrument_id":"BTC-USD","open_24h":"27645.3","timestamp":"2020-12-31T01:09:58.279Z"}`
        const data = e && e.detail.data
        if(!data.hasOwnProperty('side')) return false
        const That = this;
        That.websodata = JSON.parse(data)
        console.log(That.websodata)
        if(That.websodata.instrument_id) {
         let name = That.websodata.instrument_id.split('-')[0]
           for(let i = 0;i<That.tableData.length;i++) {
            if(name == That.tableData[i].currencyName) {
              That.$set(That.tableData[i],'last',That.websodata.last)
              That.$set(That.tableData[i],'high_24h',That.websodata.high_24h)
              That.$set(That.tableData[i],'low_24h',That.websodata.low_24h)
              That.$set(That.tableData[i],'open_24h',That.websodata.open_24h)
              That.$set(That.tableData[i],'Increase',((1- That.websodata.last/That.websodata.open_24h)*100).toFixed(2))
              break;
            }
          }
        }
        console.log(123123213123131232)
    },
    async getDatalist() {
      try {
        let {data:{list}} = await GetMonName({
          limit: 1000,
          page: 1,
        });
        let _v = [];
        let tableArray = []
        list.forEach(item => {
          let tableitem = {
            currencyImgIcon: `http://${ip}`+item.currencyImgIcon,
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
        // this.createSockfn(_v)
        // 开启websockey
        createSocket(`ws://${ip}/webSocket/cuy-${_v}-${localStorage.getItem('user')}`)
      } catch (err) {
        console.log(err);
      }
    },
    // 开启websockey
    // createSockfn(value) {
    //   console.log()
    // },
    //关闭websocket
    // closeWebsocket(e){
    //   if(createSockt){
    //    createSockt.onclose();
    //   }
    // },
    createSockfn(value) {
      let url = 'ws://'+ip+'/webSocket/cuy-'+value+'-'+localStorage.getItem('user');
      createSocket(url)
      // createSockt.oncreated({url:`ws://${ip}/webSocket/cuy-${value}-${localStorage.getItem('user')}`})()
      // createSocket.open(url);
      let fn = createSocket.onmessage();
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
    },
    tabClick(id) {
      console.log(id);
    },
  },
  beforeDestroy() {
    window.removeEventListener('onmessageWS', this.getsocketData)
    oncloseFN()
  },
  components: {
    Page,
    Tab,
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