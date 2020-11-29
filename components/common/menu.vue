<template>
  <nav class="navbar deepColor" role="navigation" aria-label="main navigation">
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
  transition: all 0.2s;
  top: 0;
  left: 0;
  width: 100%;
  box-shadow: 2px 0 9px 1px rgba(0, 21, 41,1);

}
</style>