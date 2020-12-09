<template>
  <div class="tab">
    <div :class="currentId === item.id? 'tab-pane-s':'tab-pane'" v-for="item in tabData" :key="item.id" @click="tabClick(item.id)">
      {{item.name}}
    </div>
  </div>
</template>

<script>
export default {
  props:{
    tabData:{
      type:Array,
      required: true
    }
  },
  data() {
    return {
      currentId:1
    }
  },
  methods:{
    tabClick(id){
      this.currentId = id
      this.$emit('tabClick',id)
    }
  }
};
</script>

<style lang="scss" scoped>
.tab{
  display: flex;
  justify-content: space-around;
  height: 49px;
  line-height: 49px;
  border-bottom: 1px solid #ccd2da;
  .tab-pane {
    color: #495666;
  }
  .tab-pane-s {
    color: #2483ff;
    border-bottom: 2px solid #2483ff;
  }
}
</style>