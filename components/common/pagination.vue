<template>
  <el-pagination
    class="pagination"
    background
    small
    @current-change="handleCurrentChange"
    layout="prev, pager, next"
    :total="alldata">
  </el-pagination>
</template>

<script>
  export default {
    props: {
      alldata: {
        type:Number,
        default:1,
      },
    },
    data() {
      return {
        
      }
    },
    methods: {
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    }
    
  }
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: center;
}
</style>