<template>
  <div class="trade-list">
    <div class="trade-header">
      <div
        class="trade-header-item"
        v-for="(item, index) in tablehead"
        :key="index"
      >
        {{ item.label }}
      </div>
    </div>
    <div class="trade-item" v-for="(item, index) in tablebody" :key="index" @click="tradeItemClick(item.id,item)">
      <div class="main" v-for="(headitem, index) in tablehead" :key="index">
        <img :src="item[headitem.param]" alt="币图" v-if="headitem.showimg"/>
        <p v-if="headitem.param" class="label-name" :class="headitem.param === 'Increase'? item.Increase[0] === '-' ? 'fall' : 'rise':''">
          <span class="m-span" v-if="headitem.hidelabel?false:true">{{headitem.label}}</span>
          <span v-if="headitem.hidemoneytip?false:true">$</span> <span v-if="!headitem.showimg">{{ item[headitem.param] }}</span> 
        </p>
        <p v-else style="display:flex;">
          <span v-for="(pvalue,index) in headitem.children" :key="index">
             <img :src="item[pvalue.param]" alt="币图" v-if="pvalue.showimg"/>
            <span v-else>
              {{item[pvalue.param]}}
            </span>
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @name 表格
 *
 * */
export default {
  props: {
    tablehead: {
      type: Array,
      default: () => {
        return [];
      },
    },
    tablebody: {
      type: Array,
      default: () => {
        return [];
      },
    },
    buttonLabel: {
      type: String,
      default: "",
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    tradeItemClick(id,item) {
      window.localStorage.setItem('buyname',item.currencyName || item.currency)
      this.$router.push({ path: "details", query: { id } });
    },
  },
};
</script>

<style lang="scss" scoped>
.trade-list {
  width: 100%;
  background-color: #fff;
  .trade-header {
    display: none;
    font-size: 12px;
    padding: 0 10px;
  }
  .trade-item {
    color: #1c242c;
    margin: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #e6ecf2;
    font-size: 14px;
    .main {
      // display: flex;
      width:100%;
      // align-items: center;
      // justify-content: center;
      img {
        width:25px;
        height: 25px;
      }
    }
    .m-span {
      display: inline-block;
      width: 30%;
      color: #9aa5b5;
    }
    .rise {
      color: green;
    }
    .fall {
      color: red;
    }
  }
  @media screen and (min-width: 1000px) {
    .trade-header {
      display: flex;
      margin-top: 20px;
      color: #9aa5b5;
      .trade-header-item {
        flex: 1;
        text-align: center;
      }
    }
    .trade-item:hover{
      box-shadow:0px 1px 2px #e6ece6;
      cursor: pointer;
    }
    .trade-item {
      display: flex;
      border-bottom: 1px solid #e6ecf2;
      .label-name
      // .nowmoney,
      // .increase,
      // .heightprice,
      // .amount,
      // .turnover,
      // .lowestprice 
      {
        text-align: center;
        // flex: 1;
        // width: 0;
        // word-wrap: break-word;
        .m-span {
          display: none;
        }
      }
      .rise {
        color: green;
      }
      .fall {
        color: red;
      }
    }
  }
}
</style>