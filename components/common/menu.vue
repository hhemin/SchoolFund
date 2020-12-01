<template>
  <nav class="navbar headerColor" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href>
        <img
          src="https://cdn.jsdelivr.net/gh/vmlite/s/bulma/images/bulma-logo.png"
          width="112"
          height="28"
        />
      </a>
      <a
        role="button"
        class="navbar-burger burger"
        :class="active ? 'is-active' : ''"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
        @click="openmune"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div
      id="navbarBasicExample"
      class="navbar-menu"
      :class="active ? 'is-active' : ''"
    >
      <div class="navbar-start" @click="openmune">
        <nuxt-link
          class="navbar-item"
          :to="item.router"
          v-for="(item, index) in menu"
          :key="index"
          >{{ item.name }}</nuxt-link
        >
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-primary">
              <strong>Sign up</strong>
            </a>
            <a class="button is-light">Log in</a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
/**
 * @name 头部导航栏
 * */
export default {
  name: "Jmenu",
  data() {
    return {
      active: false,
      menu: [
        {
          name: "home",
          router: "/",
        },
        {
          name: "me",
          router: "/me",
        },
      ],
    };
  },
  methods: {
    openmune() {
      console.log(this.$router);
      this.active = !this.active;
    },
  },
};
</script>
<style lang="scss" scoped>
.navbar {
  position: fixed;
  transition: all .2s;
  top: 0;
  left: 0;
  width: 100%;
  box-shadow: 2px 0 9px 1px rgba(0, 21, 41,1);
}
// a.navbar-item:hover {
//   background-color:#1b2a46;
//   color: #2196f3 !important;
// }
.navbar-menu {
  // height: 100vh;
}
#navbarBasicExample.is-active {
  animation: fedui-show .3s ease-out;
}
a.navbar-item:focus, a.navbar-item:focus-within, a.navbar-item:hover, a.navbar-item.is-active, .navbar-link:focus, .navbar-link:focus-within, .navbar-link:hover, .navbar-link.is-active {
  background-color: #1b2a46;
    color: #2196f3 !important;
}
@keyframes fedui-show {
  0% {
    transform: translateY(-10px);
    opacity: 0;
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
  
}
</style>