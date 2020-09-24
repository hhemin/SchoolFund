<template>
  <div class="big">
    <a-row>
      <a-col class="col" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="header">
          <a-breadcrumb class="nav">
            <a-breadcrumb-item>
              <router-link to="/back">首页</router-link>
            </a-breadcrumb-item>
            <a-breadcrumb-item>订单详情</a-breadcrumb-item>
            <a-breadcrumb-item>订单信息</a-breadcrumb-item>
          </a-breadcrumb>
          <a-page-header
          title="订单信息"
          sub-title="Order information"
          />
        </div>
      </a-col>
      <NewsCardTable />
    </a-row>
  </div>
</template>

<script>
import NewsCardTable from './NewsCardTable'
export default {
  data () {
    return {
    }
  },
  components: {
    NewsCardTable
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
