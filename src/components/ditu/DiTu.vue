<template>
  <div>
    <div class="big">
      <div class="con">
        <div class="con-l"></div>
      </div>
      <div class="asd"><img src="https://www.followerstime.com/themes/elissa/img/gecis/x1.png" alt=""></div>
    </div>
    <!-- <img src="https://www.followerstime.com/themes/elissa/img/tel.png" alt=""> -->
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
.big {
  width: 100%;
  min-height: 650px;
  /* background-color: purple !important; */
  background: url(https://www.followerstime.com/themes/elissa/img/des5.png), linear-gradient(to top right, #7649a6,#492674);
  background-size: cover;
  overflow: hidden;
  position: relative;
}
.con {
  height: 650px;
  padding: 60px 0;
}
.asd{
  position: absolute;
  bottom: -10px;
  right: 0;
  left: 0;
}
.asd > img{
  height: 80px;
  width: 100%;
}
.con-l {
  width: 1140px;
  height: 474px;
  background-color: pink;
  margin: 0 auto;
}
</style>
