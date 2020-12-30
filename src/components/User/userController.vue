<template>
  <div class="big">
    <a-row>
      <a-col class="col" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="header">
          <a-breadcrumb class="nav">
            <a-breadcrumb-item>
              <router-link to="/back">首页</router-link>
            </a-breadcrumb-item>
            <a-breadcrumb-item>用户</a-breadcrumb-item>
            <a-breadcrumb-item>用户管理</a-breadcrumb-item>
          </a-breadcrumb>
          <a-page-header
          title="用户管理"
          sub-title="User Controller"
          />
        </div>
      </a-col>
      <userControllerTable />
    </a-row>
  </div>
</template>

<script>
import userControllerTable from './userControllerTable'
export default {
  data () {
    return {
    }
  },
  components: {
    userControllerTable
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
