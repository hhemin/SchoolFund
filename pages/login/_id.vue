<template>
  <div class="columns is-gapless fullheight">
    <div class="column fullheight formwarp">
      <kinesis-container class="kinesiscontainer">
        <div class="form">
          <div class="tile is-vertical is-parent">
            <div class="tile is-child box">
              <Form v-if="routername"></Form>
              <Register v-else></Register>
              <button class="mt-2 button is-fullwidth" @click="register">
                {{ routername ? "注册" : "已有账号" }}
              </button>
            </div>
          </div>
        </div>
        <kinesis-element :strength="10" class="fullheight" style="z-index:100">
          <div class="circle circle-purple"></div>
          <div class="circle circle-blue"></div>
          <div class="circle circle-yellow"></div>
          <div class="circle circle-green"></div>
          <div class="circle circle-orange"></div>
          <div class="circle circle-red"></div>
        </kinesis-element>
        <kinesis-element :strength="20"> content! </kinesis-element>
      </kinesis-container>
    </div>
    <!-- <div class="column fullheight formwarp">
      <div class="form">
        <div class="tile is-vertical is-parent">
          <div class="tile is-child box">
            <Form v-if="routername"></Form>
            <Register v-else></Register>
            <button class="mt-2 button is-fullwidth" @click="register">
              {{ routername ? "注册" : "已有账号" }}
            </button>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import Form from "@/components/login/form";
import Register from "@/components/login/register";
import { KinesisContainer, KinesisElement } from "vue-kinesis";
export default {
  data() {
    return {
      routername: true,
    };
  },
  components: {
    Form,
    Register,
    KinesisContainer,
    KinesisElement,
  },
  created() {
    if (this.$route.params.id === "register") {
      this.routername = false;
    }
    // console.log( this.$route.params.id)
  },
  methods: {
    register() {
      this.routername = !this.routername;
    },
  },
};
</script>

<style lang="scss" scoped>
.fullheight {
  height: 100vh;
}
.columns {
  width: 100%;
}
// .logo {
//   background: #060520;
// }
.formwarp {
  background: #ffffff;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  overflow: hidden;
  width: 100%;
  .kinesiscontainer {
    width: 100%;
    height: 100%;
  }
  .form {
    animation: 1s appear;
    position: absolute;
    margin: auto;
    top:0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    div {
      z-index: 1000;
      max-width: 500px;
    }
  }
}
.circle {
  border-radius: 100%;
  position: absolute;
  z-index: -1;
  &.circle-purple {
    border: 25px solid #f2eafa;
    width: 16vw;
    height: 16vw;
    left: 50%;
  }
  &.circle-blue {
    background-color: #eaf1fa;
    width: 22vw;
    height: 22vw;
    top: 5%;
    right: -11vw;
  }
  &.circle-yellow {
   background-color: #faf9ea;
    width: 8vw;
    height: 8vw;
    left: 30%;
    top: 25%;
  }
  &.circle-green {
    background-color: #eafaf2;
    width: 10vw;
    height: 10vw;
    right: 20%;
    top: 90%;
  }
  &.circle-orange {
    border: 25px solid #faf3ea;
    width: 8vw;
    height: 8vw;
    left: 20%;
    top: 60%;
  }
  &.circle-red {
    background-color: #faeaea;
    width: 12vw;
    height: 12vw;
    left: -4.8vw;
    top: 25%;
   }
}

@keyframes appear {
  0% {
    opacity: 0;
  }
}
</style>