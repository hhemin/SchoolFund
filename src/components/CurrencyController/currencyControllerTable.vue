<template>
  <div class="big">
    <!-- view start -->
    <a-row>
      <!-- search start -->
      <a-col class="col" :xs="24" :sm="24" :md="16" :lg="12" :xl="8">
        <div class="TableTop">
          <a-input-search
          class="inputsearch"
          :placeholder="placeholder"
          enter-button="货币搜索"
          size="large"
          @search="onSearch"
          >
            <a-tooltip slot="suffix" title="请输入货币名">
              <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
            </a-tooltip>
          </a-input-search>
        </div>
        <!-- search end -->
      </a-col>
      <!-- main start -->
      <a-col class="col" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="TableMain">
          <!-- newbtn start -->
          <div class="newbtn">
            <!-- newbtn -->
            <a-button type="primary"  @click="newShowModal">
              + 新增货币
            </a-button>
            <!-- newbtn 弹框 start -->
            <a-modal
            v-model="newVisible"
            title="order"
            @ok="newHandleSubmit"
            @cancel="newCancel"
            ok-text="确认"
            cancel-text="取消"
            :confirm-loading="newConfirmLoading">
              <a-form-model ref="newRuleForm" :model="newForm" :rules="rules" :label-col="{ span: 8 }" :wrapper-col="{ span: 14 }">
                <a-form-model-item prop="currencyName" label="货币">
                  <a-input
                    v-model="newForm.currencyName"
                  />
                </a-form-model-item>
                <a-form-model-item prop="currencyStatus" label="状态">
                  <a-input
                    v-model="newForm.currencyStatus"
                  />
                </a-form-model-item>
              </a-form-model>
            </a-modal>
            <!-- newbtn 弹框 end -->
          </div>
          <!-- newbtn end -->
          <!-- table -->
          <div class="table">
            <a-table :rowKey="data => data.currencyId" :pagination="pagination" :columns="columns" :data-source="data" :scroll="{ x: 400 }" size="small" >
              <!-- <template slot="action" slot-scope="text, record"> -->
              <a slot="action" href="javascript:;" slot-scope="text, record">
                <a-button type="primary" @click="editShowModal(record)" size="small">
                  修改
                  <a-modal
                  v-model="editVisible"
                  title="Edit"
                  @ok="editHandleSubmit"
                  @cancel="editCancel"
                  ok-text="确认"
                  cancel-text="取消"
                  :confirm-loading="editConfirmLoading">
                    <a-form-model ref="editRuleForm" :model="editForm" :rules="rules" :label-col="{ span: 8 }" :wrapper-col="{ span: 14 }">
                      <a-form-model-item prop="currencyName" label="货币">
                        <a-input
                          v-model="editForm.currencyName"
                        />
                      </a-form-model-item>
                      <a-form-model-item prop="currencyStatus" label="状态">
                        <a-input
                          v-model="editForm.currencyStatus"
                        />
                      </a-form-model-item>
                    </a-form-model>
                  </a-modal>
                </a-button>
                <a-button type="danger"  @click="showDeleteConfirm" size="small">
                  删除
                </a-button>
              </a>
              <!-- </template> -->
            </a-table>
          </div>
          <!-- table end -->
        </div>
      <!-- main end -->
      </a-col>
    <!-- view end -->
    </a-row>
  </div>
</template>

<script>
// , fixed: 'left'
const columns = [
  // { title: 'currencyId', width: 2, dataIndex: 'currencyId', key: 'currencyId', fixed: 'left' },
  { title: '货币', width: 2, dataIndex: 'currencyName', key: 'currencyName' },
  { title: '状态', width: 2, dataIndex: 'currencyStatus', key: 'currencyStatus' },
  {
    title: '操作',
    key: 'operation',
    // fixed: 'right',
    width: 3,
    scopedSlots: { customRender: 'action' }
  }
]

// const data = [
//   {
//     key: '1',
//     CurrencyId: '000001',
//     CurrencyName: '比特币',
//     CurrencyStatusId: '1'
//   },
//   {
//     key: '2',
//     CurrencyId: '000002',
//     CurrencyName: 'qq币',
//     CurrencyStatusId: '1'
//   }
// ]
export default {
  data () {
    return {
      newForm: {
        currencyId: '',
        currencyName: '',
        currencyStatus: ''
      },
      editForm: {
        currencyId: '',
        currencyName: '',
        currencyStatus: ''
      },
      rules: {
        currencyName: [
          { required: true, message: '请输入货币名称', trigger: 'blur' },
          { min: 2, max: 10, message: '请输入2-10个字符', trigger: 'blur' }
        ],
        currencyStatus: [
          { required: true, message: '请输入货币状态', trigger: 'blur' },
          { min: 2, max: 10, message: '请输入2-10个字符', trigger: 'blur' }
        ]
      },
      // vaildatorRules: {
      //   templateCurrencyId: {
      //     rules: [
      //       { required: true, message: 'Please input your note!' },
      //       { max: 10, message: '超过了10个!' }
      //     ]
      //   },
      //   templateCurrencyName: {
      //     rules: [
      //       { required: true, message: 'Please input your note!' },
      //       { max: 10, message: 'P1231231!' }
      //     ]
      //   },
      //   templateCurrencyStatusId: {
      //     rules: [
      //       { required: true, message: 'Please input your note!' },
      //       { max: 10, message: 'P1231231!' }
      //     ]
      //   }
      // },
      placeholder: '货币名查询',
      data: [],
      columns,
      newVisible: false,
      editVisible: false,
      // form: this.$form.createForm(this),
      newConfirmLoading: false,
      editConfirmLoading: false,
      pagination: {
        showQuickJumper: true,
        defaultPageSize: 10,
        showTotal: total => `共 ${total} 条数据`,
        onShowSizeChange: true,
        showSizeChange: (current, pageSize) => { this.pageSize = pageSize }
      }
    }
  },
  created () {
    this.getList(10, 1)
  },
  methods: {
    // 订单搜索
    onSearch (value) {
      console.log(value)
    },
    // 新建订单
    newShowModal () {
      // this.form.resetFields()
      this.newVisible = true
      console.log('newShowModal新建订单')
    },
    // 新建确定
    newHandleSubmit () {
      // this.form.resetFields()
      // this.visible = false
      this.$refs.newRuleForm.validate(valid => {
        if (valid) {
          // alert('submit!')
          this.newConfirmLoading = true
          setTimeout(() => {
            this.newVisible = false
            this.newConfirmLoading = false
            this.$success({
              title: '新建成功'
              // JSX support
              // content: (
              //   <div>
              //     <p>some messages...some messages...</p>
              //     <p>some messages...some messages...</p>
              //   </div>
              // )
            })
            this.$refs.newRuleForm.resetFields()
          }, 1000)
        } else {
          console.log('error submit!!')
          this.$message.warning('请输入正确信息')
          return false
        }
      })
      // this.$success({
      //   title: 'This is a success message',
      //   // JSX support
      //   content: (
      //     <div>
      //       <p>some messages...some messages...</p>
      //       <p>some messages...some messages...</p>
      //     </div>
      //   )
      // })
      console.log('ok')
    },
    // 新建取消
    newCancel () {
      // this.form.resetFields()
      console.log('newCancel')
    },
    // 修改订单
    editShowModal (record) {
      // this.form.resetFields()
      // console.log(record)
      const b = JSON.parse(JSON.stringify(record))
      console.log(b)
      this.editForm.currencyName = b.currencyName
      this.editForm.currencyStatus = b.currencyStatus
      this.editVisible = true
      console.log('修改')
    },
    // 修改确定
    editHandleSubmit () {
      // this.form.resetFields()
      // this.visible = false
      this.$refs.editRuleForm.validate(valid => {
        if (valid) {
          // alert('submit!')
          this.editConfirmLoading = true
          setTimeout(() => {
            this.editVisible = false
            this.editConfirmLoading = false
            this.$success({
              title: '修改成功'
              // JSX support
              // content: (
              //   <div>
              //     <p>some messages...some messages...</p>
              //     <p>some messages...some messages...</p>
              //   </div>
              // )
            })
            this.$refs.editRuleForm.resetFields()
          }, 1000)
        } else {
          console.log('error submit!!')
          this.$message.warning('请输入正确信息')
          return false
        }
      })
    },
    // 修改取消
    editCancel () {
      // this.form.resetFields()
      console.log('修改Cancel')
    },
    // 删除
    showDeleteConfirm () {
      this.$confirm({
        title: '确定删除数据?',
        content: 'Currency List',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk () {
          console.log('OK')
        },
        onCancel () {
          console.log('Cancel')
        }
      })
    },
    // 分页
    onShowSizeChange (current, pageSize) {
      console.log(current, pageSize)
    },
    getList (limit, page) {
      const instance = this.$axios.create()
      instance.defaults.headers.common.Authorization = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxIn0.1CN_8jXLcWwWBf_V-N_7qPrlhbnIOOiFA4Y2pe9-xL4'
      instance.post('http://10.101.88.29:8080/api/admin/currency/query', {
        limit,
        page
      })
        .then(res => {
          console.log(res)
          console.log(res.data.data.list)
          this.data = res.data.data.list
        })
        .catch(err => {
          console.log(err)
        })
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
.ant-form-item{
  margin-bottom: 10px;
}
.ant-btn-primary{
  margin-right: 6px;
}
</style>
