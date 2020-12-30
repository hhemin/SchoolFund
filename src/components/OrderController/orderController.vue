<template>
  <div class="big">
    <a-row>
      <a-col class="col" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="header">
          <a-breadcrumb class="nav">
            <a-breadcrumb-item>
              <router-link to="/back">首页</router-link>
            </a-breadcrumb-item>
            <a-breadcrumb-item>订单</a-breadcrumb-item>
            <a-breadcrumb-item>订单管理</a-breadcrumb-item>
          </a-breadcrumb>
          <a-page-header
          title="订单管理"
          sub-title="Order Controller"
          />
        </div>
      </a-col>
      <OrderControllerTable />
    </a-row>
  </div>
</template>

<script>
import OrderControllerTable from './orderControllerTable'
export default {
  data () {
    return {
    }
  },
  components: {
    OrderControllerTable
  }
}
</script>

<style scoped>
.big{
  background-color: #fff;
}
.nav{
  padding: 12px 24px 0 24px;
}
.col{
  border-bottom: 1px solid #eee;
}
</style>
