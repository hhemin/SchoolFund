<template>
  <div class="big">
    <a-row>
      <a-col class="col" :xs="24" :sm="24" :md="16" :lg="12" :xl="8">
        <div class="TableTop">
          <a-input-search
          class="inputsearch"
          :placeholder="placeholder"
          enter-button="订单搜索"
          size="large"
          @search="onSearch"
          >
            <a-tooltip slot="suffix" title="请输入订单号">
              <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
            </a-tooltip>
          </a-input-search>
        </div>
      </a-col>
      <a-col class="col" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="TableMain">
          <div class="newbtn">
            <a-button type="primary">
              + 新建
            </a-button>
          </div>
          <div class="table">
            <a-table :columns="columns" :data-source="data" :scroll="{ x: 1300 }" size="small">
              <a slot="action" href="javascript:;">action</a>
            </a-table>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
// , fixed: 'left'
const columns = [
  { title: 'Full Name', width: 100, dataIndex: 'name', key: 'name' },
  { title: 'Age', width: 100, dataIndex: 'age', key: 'age' },
  { title: 'Column 1', dataIndex: 'address', key: '1' },
  { title: 'Column 2', dataIndex: 'address', key: '2' },
  { title: 'Column 3', dataIndex: 'address', key: '3' },
  { title: 'Column 4', dataIndex: 'address', key: '4' },
  { title: 'Column 5', dataIndex: 'address', key: '5' },
  { title: 'Column 6', dataIndex: 'address', key: '6' },
  { title: 'Column 7', dataIndex: 'address', key: '7' },
  { title: 'Column 8', dataIndex: 'address', key: '8' },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
    scopedSlots: { customRender: 'action' }
  }
]

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York Park'
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 40,
    address: 'London Park'
  }
]
export default {
  data () {
    return {
      placeholder: '订单号查询',
      data,
      columns
    }
  },
  methods: {
    onSearch (value) {
      console.log(value)
    }
  }
}
</script>

<style scoped>
.big{
  padding: 16px 24px;
}
.TableTop{
  margin: 16px 0px;
}
.table{
  margin-top: 10px;
}
</style>
