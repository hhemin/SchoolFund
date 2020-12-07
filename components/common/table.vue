<template>
  <div class="trade-list">
    <div class="trade-header">
      <div
        class="trade-header-item"
        v-for="(item, index) in tableHead"
        :key="index"
      >
        {{ item.label }}
      </div>
    </div>
    <div class="trade-item" v-for="(item, index) in tablebody" :key="index">
      <p :class="[item.isBuy ? 'label-buy' : 'label']">{{ item.label }}</p>
      <p class="num"><span class="m-span">数量：</span>{{ item.num }}</p>
      <p class="quota"><span class="m-span">限额：</span>{{ item.quota }}</p>
      <p class="price"><span class="m-span">单价：</span>{{ item.price }} CNY</p>
      <div class="control">
        <button class="button" @click="gotoDetail(item.id)">{{buttonLabel}}</button>
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
    buttonLabel:{
      type:String,
      default:'',
      required: true
    }
  },
  data() {
    return {
      tableData: [
        {
          label: "王者爱仕达",
          num: 39967.965828,
          quota: "100,000.00-258,193.00",
          price: 6.46,
          isBuy: false,
        },
        {
          label: "王者爱仕达",
          num: 39967.965828,
          quota: "100,000.00-258,193.00",
          price: 6.46,
          isBuy: true,
        },
      ],
      tableHead: [
        {
          label: "广告方",
        },
        {
          label: "数量",
        },
        {
          label: "限额",
        },
        {
          label: "单价",
        },
        {
          label: "交易",
        },
      ],
    };
  },
  methods:{
    gotoDetail(id){
      console.log(id)
      this.$router.push({path:'details',query:{id}})
    }
  }
};
</script>

<style lang="scss" scoped>
.trade-list {
  width: 100%;
  background-color: #fff;
  .trade-header {
    display: none;
  }
  .trade-item {
    margin: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #e6ecf2;
    .m-span{
      margin-right: 16px;
      color: #9aa5b5;
    }
    .num,.quota{
      color: #1c242c;
    }
    .price{
      color: #0da88b;
    }
    .label {
      color: green;
    }
    .label-buy {
      color: red;
    }
    .button {
      background-color: #357ce1;
      color: #fff;
    }
  }
  @media screen and (min-width: 700px) {
    .trade-header {
      display: flex;
      margin-top:20px;
      .trade-header-item {
        flex: 1;
        text-align: center;
        border-bottom: 1px solid #e6ecf2;
      }
    }

    .trade-item {
      display: flex;
      border-bottom: 1px solid #e6ecf2;
      .m-span {
        display: none;
      }
      .button {
        background-color: #357ce1;
        color: #fff;
      }
    }
    .label,
    .label-buy,
    .num,
    .quota,
    .price,
    .control {
      text-align: center;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>