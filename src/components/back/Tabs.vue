<template>
  <div>
    <a-col class="col" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
      <a-tabs class="tabs" default-active-key="1" @change="callback">
        <a-tab-pane class="tab_pane" key="1" tab="Tab 1">
          <Tabs1 />
        </a-tab-pane>
        <a-tab-pane key="2" tab="Tab 2" force-render>
          <Tabs1 />
        </a-tab-pane>
        <a-tab-pane key="3" tab="Tab 3">
          <Tabs1 />
        </a-tab-pane>
      </a-tabs>
    </a-col>
  </div>
</template>

<script>
import Tabs1 from './Tabs1'
export default {
  data () {
    return {
    }
  },
  methods: {
    callback (key) {
      console.log(key)
    }
  },
  components: {
    Tabs1
  }
}
</script>

<style scoped>
/* .tab_pane{
  height: 500px;
} */
.col{
  background: rgb(240, 242, 245);
}
.tabs{
  background: #fff;
  padding: 24px;
}
</style>
