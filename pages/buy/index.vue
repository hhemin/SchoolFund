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
        tableData: [],
      }
    },
    components: {
     Page
   }
  }
</script>

<style lang="scss" scoped>

</style>