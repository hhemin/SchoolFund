<template>
  <nav class="navbar headerColor" role="navigation" aria-label="main navigation" v-show="user">
    <div class="navbar-brand">
      <a class="navbar-item" href="/">
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
          <div class="buttons" v-if="!user">              
            <!-- <a class="button is-primary">
              <strong>注册</strong>
            </a> -->
            <nuxt-link class="button is-primary" :to="{name: 'login-id', params:{id: 'register'}}">
              <strong>注册</strong>
            </nuxt-link>
            <nuxt-link class="button is-light" to="/login">
              <strong>登录</strong>
            </nuxt-link>
          </div>
          <div class="user-info" v-else>
            <img class="is-rounded" src="https://bulma.zcopy.site/images/placeholders/32x32.png">
            <span>{{user}}</span>
            <button class="button is-small is-link" style="margin-left:10px" @click="loginout">退出登录</button>
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
          name: "首页",
          router: "/",
        },
        {
          name: "个人中心",
          router: "/me",
        },
      ],
      user:true
    };
  },
  watch: {
    '$route' (newder,older) {
     if(newder.name === 'index') {
      location.reload()
     }
		console.log('路由变化')
		console.log(newder)
    console.log(older)
	}

  },
  created(){
    
  },
  mounted(){
    let user = window.localStorage.getItem('user')
    console.log(user)
    if(user){
      this.user = user
    }else {
       this.user = false
    }
  },
  methods: {
    openmune() {
      this.active = !this.active;
    },
    loginout() {
      let _key = confirm('你要退出嘛？哟哟哟哟哟～')
      if(_key) {
        this.$router.push('/login')
        localStorage.removeItem('token')
        this.user = false
      }
    }
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
.user-info{
  display:flex;
  .is-rounded{
    border-radius: 50%;
    margin-right: 10px;
  }
}
</style>