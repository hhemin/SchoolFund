<template>
  <div>
    <a-row style="margin: 0;height: 500px;" :gutter="16">
      <a-col class="col1" :xs="24" :sm="24" :md="24" :lg="24" :xl="16">
        <div>
          123
        </div>
      </a-col>
      <a-col class="col2" :xs="24" :sm="24" :md="24" :lg="24" :xl="8">
        <div>
          123
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
.col{
  margin-bottom: 24px;
}
.col1 {
  background-color: pink;
  height: 100%;
}
.col2{
  background-color: skyblue;
  height: 100%;
}
</style>
