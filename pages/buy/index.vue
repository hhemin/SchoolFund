<template>
  <div class="container headtop"> 
    <component class="table-container" :is="JTable" buttonLabel="查看" :tablebody="tableData"></component>
    <Page :alldata="1000"></Page>
  </div>
</template>

<script>
import JTable from '@/components/common/table' 
import Page from '@/components/common/pagination'
  export default {
    layout:'LMenu',
    data() {
      return {
        JTable,
        tableData: [
        {
          id:1,
          label: "王者爱仕达",
          num: 39967.965828,
          quota: "100,000.00-258,193.00",
          price: 6.46,
          isBuy: true,
        },
        {
          id:2,
          label: "王者爱仕达",
          num: 39967.965828,
          quota: "100,000.00-258,193.00",
          price: 6.46,
          isBuy: true,
        },
      ],
      }
    },
    components: {
     Page
   }
  }
</script>

<style lang="scss" scoped>

</style>