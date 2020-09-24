<template>
  <div class="card">
    <h1>{{card.title}}</h1>
    <p>{{card.amount}}</p>
  </div>
</template>

<script>
export default {
  props:{
    card:{
      type:Object,
      required:true
    }
  },
  
};
</script>

<style lang="scss" scoped>
.card {
  padding: 1rem;
  height: 10rem;
}
</style>