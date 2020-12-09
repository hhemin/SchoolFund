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
    <div class="trade-item" v-for="(item, index) in tablebody" :key="index" @click="tradeItemClick(item.id)">
      <p class="label-name">{{ item.label }}</p>
      <p class="nowmoney">
        <span class="m-span">最新价：</span>{{ item.nowmoney }}
      </p>
      <p class="increase" :class="item.Increase[0] === '-' ? 'fall' : 'rise'">
        <span class="m-span">涨幅：</span>{{ item.Increase }}
      </p>
      <p class="heightprice">
        <span class="m-span">最高价：</span>{{ item.heightprice }}
      </p>
      <p class="lowestprice">
        <span class="m-span">最低价：</span>{{ item.lowestprice }}
      </p>
      <p class="amount">
        <span class="m-span">24H量：</span>{{ item.amount }}万
      </p>
      <p class="turnover">
        <span class="m-span">24H成交额：</span>￥{{ item.Turnover }}亿
      </p>
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
    tradeItemClick(id) {
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
      .label-name,
      .nowmoney,
      .increase,
      .heightprice,
      .amount,
      .turnover,
      .lowestprice {
        text-align: center;
        flex: 1;
        width: 0;
        word-wrap: break-word;
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