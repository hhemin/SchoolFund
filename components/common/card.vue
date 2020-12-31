<template>
  <div class="card">
    <div class="card-content">
      <h1 class="title">{{ card.title }}</h1>
      <p :class="['amount',card.amount > 0 ? '':'loss']">{{card.param === "profit" ? `${card.amount}%`:card.amount}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    card: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  padding: 1rem;
  height: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;
  .card-content {
    .title {
      font-size: 2rem;
      text-align: center;
      margin-bottom: 0;
    }
    .amount {
      text-align: center;
      font-size: 1.5rem;
    }
    .loss{
      color:green;
    }
  }
}
</style>