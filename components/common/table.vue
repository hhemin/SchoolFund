<template>
<div>
  币种:<p>1</p>
  单价格:<p>123</p>
</div>
  <!-- <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
    <thead>
      <tr>
          <th v-for="(item,index) in tablehead" :key="index">{{item.label}}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item,id) in tablebody" :key="id">
        <td v-for="(itemhead,index) in tablehead" :key="index">
          {{item[itemhead.param]}}
        </td>
      </tr>
    </tbody>
  </table> -->
</template>

<script>
/**
 * @name 表格
 * */ 
  export default {
    props:{
      tablehead:{
        type: Array,
        default: () => {
          return []
        }
      },
      tablebody: {
        type: Array,
        default: () => {
          return []
        }
      }
    }
    
  }
</script>

<style lang="scss" scoped>

</style>