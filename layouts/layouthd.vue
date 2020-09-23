<template>
  <div>
    <nav class="navbar" role="navigation" aria-label="main navigation">
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
          :class="active?'is-active':''"
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

      <div id="navbarBasicExample" class="navbar-menu" :class="active?'is-active':''">
        <div class="navbar-start">
          <nuxt-link class="navbar-item" to="/">Home</nuxt-link>
          <nuxt-link class="navbar-item" to="/me">me</nuxt-link>
          <a class="navbar-item">Documentation</a>

          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">More</a>

            <div class="navbar-dropdown">
              <a class="navbar-item">About</a>
              <a class="navbar-item">Jobs</a>
              <a class="navbar-item">Contact</a>
              <hr class="navbar-divider" />
              <a class="navbar-item">Report an issue</a>
            </div>
          </div>
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
    <!--为了正常展示主题内容要导入这个  -->
    <nuxt />
  </div>
</template>

<script>
/***
 * @name 头部导航
 * */
export default {
  name: "layouthd",
  data() {
    return {
      active: false,
    };
  },
  methods: {
    openmune() {
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
  box-shadow: 2px 0 6px rgba(0,21,41,.35);
}
</style>