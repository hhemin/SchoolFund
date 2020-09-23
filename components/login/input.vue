<template>
  <div>
    <div class="field" v-for="(item,index) in inputdata" :key="index">
      <label class="label">{{item.labelname}}</label>
      <div class="control">
        <input class="input" :class="item.dangerBool?'is-danger':''" :type="item.type || 'text'" :placeholder="item.placeholder" v-model="item.value"/>
      </div>
      <p class="help is-danger" v-show="item.dangerBool">{{item.danger||'格式不符合'}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name:'FormInput',
    props: {
      inputdata:{
        type: Array,
        required: true
      }
    },
    methods: {
      isOk() {
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>