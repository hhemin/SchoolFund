<template>
  <div class="columns is-gapless fullheight">
    <div class="column fullheight logo is-6 is-hidden-touch">Auto</div>
    <div class="column fullheight formwarp">
      <div class="form">
        <div class="tile is-vertical is-parent">
          <div class="tile is-child box">
             <Form v-if="routername"></Form>
             <Register v-else></Register>
             <button class="mt-2 button is-fullwidth"  @click="register">{{routername?'注册':'已有账号'}}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Form from '@/components/login/form'
import Register from '@/components/login/register'
  export default {
    data() {
      return {
        routername: true
      }
    },
    components: {
      Form,
      Register
    },
    methods: {
      register() {
        this.routername = !this.routername
      },
    }
  }
</script>

<style lang="scss" scoped>

.fullheight {
  height: 100vh;
}
.columns {
  width: 100%;
}
.logo {
  background: #060520;
}
.formwarp {
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  .form {
    animation: 1s appear;
    width: 80%;
  }
}
@keyframes appear {
  0% {
    opacity: 0;
  }
}
</style>