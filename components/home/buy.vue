<template>
  <div class="card">
    <div class="card-title">
      <p class="card-header-title fc" style="font-size: 30px">买入</p>
    </div>
    <div class="field card-content is-centered">
      <p class="control">
        <input class="input bgColor" type="number" placeholder="输入金额" />
      </p>
      <!-- <p class="control">
        <a class="button is-primary"> Transfer </a>
      </p> -->
    </div>
     <footer class="card-footer">
       <div class="card-footer-item">买入</div>
    </footer>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
::-webkit-input-placeholder { color:#f4f9ff; }
::-moz-placeholder { color:#f4f9ff; } /* firefox 19+ */
:-ms-input-placeholder { color:#f4f9ff; } /* ie */
input:-moz-placeholder { color:#f4f9ff; }
</style>