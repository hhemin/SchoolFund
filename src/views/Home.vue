<template>
  <!-- star -->
  <a-layout id="components-layout-demo-custom-trigger">
    <!-- 左侧导航栏sider -->
    <a-layout-sider class="sider" v-model="collapsed" :trigger="null" collapsible collapsedWidth="0">
      <div class="logo">{{logotitle}}</div>
      <!-- <a-menu
      theme="dark"
      mode="inline"
      :selectedKeys="[$route.path]"
      :openKeys="openKeys"
      @openChange="onOpenChange">
        <a-menu-item v-for="item in navList1" :key="item.path">
          <router-link :to="item.path">
            <a-icon type="user" />
            <span>{{item.title}}</span>
            <span>{{item.key}}</span>
          </router-link>
        </a-menu-item>
        <a-sub-menu v-for="item in navList2" :key="item.path">
          <span slot="title"><a-icon type="mail" /><span>{{item.title}}</span></span>
          <a-menu-item v-for="item2 in item.children" :key="item2.path">
            <router-link :to="item2.path">
              <a-icon type="user" />
              <span>{{item2.title}}</span>
            </router-link>
          </a-menu-item>
        </a-sub-menu>
      </a-menu> -->
      <a-menu
      theme="dark"
      mode="inline"
      :defaultSelectedKeys="defaultSelectedKeys"
      :selectedKeys="[$route.path]"
      :openKeys="openKeys"
      @openChange="onOpenChange">
      <!-- :selectedKeys="[$route.path]" -->
        <template v-for="item in navList">
          <a-menu-item v-if="item.children === false" :key="item.path">
            <router-link :to="item.path">
              <a-icon type="user" />
              <span>{{ item.title }}</span>
            </router-link>
          </a-menu-item>
          <a-sub-menu v-else :key="item.path">
            <span slot="title"><a-icon type="mail" /><span>{{item.title}}</span></span>
            <a-menu-item v-for="menuChildren in item.children" :key="menuChildren.path">
              <router-link :to="menuChildren.path">
                {{ menuChildren.title }}
              </router-link>
            </a-menu-item>
          </a-sub-menu>
        </template>
      </a-menu>
    </a-layout-sider>
    <!-- 左侧end -->
    <!-- 右侧内容 star -->
    <a-layout>
      <!-- 标题header star -->
      <a-layout-header class="lheader">
        <!-- 导航栏缩放图标 -->
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="clickcollapsed"
        />
      </a-layout-header>
      <!-- 标题header end -->
      <!-- 中心内容 star -->
      <a-layout-content class="content">
        <router-view name="backmain" />
      </a-layout-content>
      <!-- 中心内容 end -->
    </a-layout>
  </a-layout>
  <!-- end -->
</template>
<script>
export default {
  data () {
    return {
      collapsed: false,
      logotitle: '620集团',
      defaultSelectedKeys: [this.$route.path],
      openKeys: [''],
      navList: [
        {
          key: 1,
          title: '首页',
          path: '/back',
          children: false
        },
        {
          key: 2,
          title: '地图',
          path: '/ditu',
          children: false
        },
        {
          // title: '用户',
          // path: '/new2',
          // children: [
          // {
          //   key: 3,
          //   title: '用户管理',
          //   path: '/user'
          // },
          // {
          key: 3,
          title: '用户管理',
          path: '/userHold',
          children: false
          // }
          // ]
        },
        // {
        // title: '订单',
        // path: '/news',
        // children: [
        {
          key: 5,
          title: '订单管理',
          path: '/orderController',
          children: false
        },
        {
          key: 6,
          title: '货币管理',
          path: '/currencyController',
          children: false
        }
        // ]
        // }
      ]
      // navList2: [
      //   {
      //     title: '订单详情',
      //     children: [
      //       {
      //         key: 3,
      //         title: '订单创建',
      //         path: '/new'
      //       },
      //       {
      //         key: 4,
      //         title: '订单查询',
      //         path: '/inquire'
      //       }
      //     ]
      //   },
      //   {
      //     title: '订单详情2',
      //     children: [
      //       {
      //         key: 5,
      //         title: '订单创建2',
      //         path: '/new2'
      //       },
      //       {
      //         key: 6,
      //         title: '订单查询2',
      //         path: '/inquire2'
      //       },
      //       {
      //         key: 7,
      //         title: '订单查询3',
      //         path: '/inquire3'
      //       }
      //     ]
      //   }
      // ]
    }
  },
  created () {
    // console.log(document.body.clientWidth)
    this.createcollapsed()
  },
  methods: {
    // onOpenChange (openKeys) {
    //   const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1)
    //   if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
    //     this.openKeys = openKeys
    //   } else {
    //     this.openKeys = latestOpenKey ? [latestOpenKey] : []
    //   }
    // },
    onOpenChange (openKeys) {
      // 当菜单被展开时触发此处
      /*
      经测试传入的变量openKeys是数组 点击已经展开的菜单时传入的是空数组
      点击未展开的菜单时传入的是[当前展开菜单的key,点击的菜单key]
      下面的if判断用openKeys === [] 无效 所以我只能判断数组length是否等于0
      */
      // console.log(openKeys)
      // console.log(openKeys.length + '----0')
      if (openKeys.length !== 0) {
        this.openKeys = [openKeys[1]]
        // console.log(openKeys.length + '----1')
      } else {
        this.openKeys = ['']
      }
    },
    createcollapsed () {
      if (document.body.clientWidth <= 768) {
        // console.log(this.collapsed)
        this.collapsed = !this.collapsed
        // console.log(this.collapsed)
      }
    },
    clickcollapsed () {
      this.collapsed = !this.collapsed
    }
  }
}
</script>
<style>
.ant-layout-sider{
  min-height: 100vh;
}
.lheader{
  background: #fff;
  padding: 0;
}
.sider{
  /* height: 100vh; */
  /* height: calc(100vh - 64px); */
}
.content{
  /* margin: 24px 16px; */
  margin: 24px;
  /* padding: 24px; */
  background: rgb(240, 242, 245);
  /* minHeight: 280px; */
}
#components-layout-demo-custom-trigger{
  height: 100%;
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 48px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
  position: absolute;
}
#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}
#components-layout-demo-custom-trigger .logo {
  height: 32px;
  /* background: rgba(255, 255, 255, 0.2); */
  margin: 16px;
  color: #eee;
  font-size: 16px;
  line-height: 32px;
  text-align: center;
}
@media screen and (max-width: 768px) {
  .ant-layout-header{
    position: fixed;
    top: 0;
    height: 48px;
    z-index: 10000;
    width: 100%;
  }
  .ant-layout-sider {
    position: fixed;
    top: 48px;
    z-index: 10000;
    height: calc(100vh - 48px);
  }
  .ant-layout-content{
    margin-top: 72px;
  }
}
.ant-layout-header{
  height: 48px;
}
</style>
