<template>
  <div class="card">
    <div class="card-title">
      <p class="card-header-title fc" style="font-size: 30px">卖出</p>
    </div>
    <div class="field card-content">
      币数：123123
      <p class="control">
        <input class="input bgColor" type="number" placeholder="请输入金额" />
      </p>
    </div>
    <footer class="card-footer">
       <div class="card-footer-item">全部出</div>
       <div class="card-footer-item">卖出</div>
    </footer>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
::-webkit-input-placeholder { color:#f4f9ff; }
// ::-moz-placeholder { color:#f4f9ff; } /* firefox 19+ */
// :-ms-input-placeholder { color:#f4f9ff; } /* ie */
</style>