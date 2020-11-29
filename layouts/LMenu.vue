<template>
  <div>
    <JMenu></JMenu>
    <!--为了正常展示主题内容要导入这个  -->
    <nuxt />
  </div>
</template>

<script>
/***
 * @name 头部导航😎
 * */
import JMenu from '../components/common/menu'
export default {
  name: "LMenu",
  components: {
    JMenu
  }
};
</script>

<style lang="scss" scoped>
</style>