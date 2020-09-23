<template>
  <button class="button" :class="btnclass" @click="btneven">{{btn.name}}</button>
</template>

<script>
/**
 * @name 按钮封装
 * @btneven 按钮事件
 * @name 按钮名称
 * @class 按钮class
 * */
export default {
  props: {
    btn: {
      type: Object,
      required: true,
    },
  },
  methods: {
    btneven() {
      this.$emit("btneven");
    },
  },
  computed: {
    btnclass() {
      return this.btn.isloading
        ? `${this.btn.class} is-loading`
        : this.btn.class;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>