<template>
  <div>
    <a-row :gutter="16">
      <LL />
      <LL />
      <LL />
      <LL />
    </a-row>
    <a-row>
      <Tabs />
    </a-row>
  </div>
</template>

<script>
import LL from './LL'
import Tabs from './Tabs'
export default {
  data () {
    return {
    }
  },
  components: {
    LL,
    Tabs
  }
}
</script>

<style scoped>
.ant-col:nth-child(1){
  background-color: red;
}
.ant-col:nth-child(2){
  background-color: pink;
}
.ant-col:nth-child(3){
  background-color: yellow;
}
.ant-col:nth-child(4){
  background-color: pink;
}
</style>
