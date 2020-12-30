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
          enter-button="用户搜索"
          size="large"
          @search="onSearch"
          >
            <a-tooltip slot="suffix" title="请输入用户名">
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
              + 新建用户
            </a-button>
            <!-- newbtn 弹框 start -->
            <a-modal
            v-model="newVisible"
            title="order"
            @ok="newHandleSubmit"
            @cancel="newCancel"
            ok-text="确认"
            cancel-text="取消"
            :confirm-loading="confirmLoading">
              <a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="{ span: 8 }" :wrapper-col="{ span: 14 }">
                <a-form-model-item prop="UserId" label="UserId">
                  <a-input
                    v-model="form.UserId"
                  />
                </a-form-model-item>
                <a-form-model-item prop="UserAccount" label="UserAccount">
                  <a-input
                    v-model="form.UserAccount"
                  />
                </a-form-model-item>
                <a-form-model-item prop="UserPassword" label="UserPassword">
                  <a-input
                    v-model="form.UserPassword"
                  />
                </a-form-model-item>
                <a-form-model-item prop="UserRegisterTime" label="UserRegisterTime">
                  <a-input
                    v-model="form.UserRegisterTime"
                  />
                </a-form-model-item>
                <a-form-model-item prop="UserName" label="UserName">
                  <a-input
                    v-model="form.UserName"
                  />
                </a-form-model-item>
                <a-form-model-item prop="UserMoney" label="UserMoney">
                  <a-input
                    v-model="form.UserMoney"
                  />
                </a-form-model-item>
                <a-form-model-item prop="UserStautsId" label="UserStautsId">
                  <a-input
                    v-model="form.UserStautsId"
                  />
                </a-form-model-item>
              </a-form-model>
            </a-modal>
            <!-- newbtn 弹框 end -->
          </div>
          <!-- newbtn end -->
          <!-- table -->
          <div class="table">
            <a-table :pagination="pagination" :columns="columns" :data-source="data" :scroll="{ x: 950 }" size="small" >
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
                  :confirm-loading="confirmLoading">
                    <a-form-model :rules="rules" :label-col="{ span: 8 }" :wrapper-col="{ span: 14 }">
                      <a-form-model-item prop="UserId" label="UserId">
                        <a-input
                          v-model="records.UserId"
                        />
                      </a-form-model-item>
                      <a-form-model-item prop="UserAccount" label="UserAccount">
                        <a-input
                          v-model="records.UserAccount"
                        />
                      </a-form-model-item>
                      <a-form-model-item prop="UserPassword" label="UserPassword">
                        <a-input
                          v-model="records.UserPassword"
                        />
                      </a-form-model-item>
                      <a-form-model-item prop="UserRegisterTime" label="UserRegisterTime">
                        <a-input
                          v-model="records.UserRegisterTime"
                        />
                      </a-form-model-item>
                      <a-form-model-item prop="UserName" label="UserName">
                        <a-input
                          v-model="records.UserName"
                        />
                      </a-form-model-item>
                      <a-form-model-item prop="UserMoney" label="UserMoney">
                        <a-input
                          v-model="records.UserMoney"
                        />
                      </a-form-model-item>
                      <a-form-model-item prop="UserStautsId" label="UserStautsId">
                        <a-input
                          v-model="records.UserStautsId"
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
  { title: 'UserId', width: 100, dataIndex: 'UserId', key: 'UserId', fixed: 'left' },
  { title: 'UserAccount', dataIndex: 'UserAccount', key: 'UserAccount' },
  { title: 'UserPassword', dataIndex: 'UserPassword', key: 'UserPassword' },
  { title: 'UserRegisterTime', dataIndex: 'UserRegisterTime', key: 'UserRegisterTime' },
  { title: 'UserName', dataIndex: 'UserName', key: 'UserName' },
  { title: 'UserMoney', dataIndex: 'UserMoney', key: 'UserMoney' },
  { title: 'UserStautsId', dataIndex: 'UserStautsId', key: 'UserStautsId' },
  {
    title: '操作',
    key: 'operation',
    // fixed: 'right',
    width: 120,
    scopedSlots: { customRender: 'action' }
  }
]

const data = [
  {
    key: '1',
    UserId: '000001',
    UserAccount: 1,
    UserPassword: '1',
    UserRegisterTime: '2',
    UserName: '3',
    UserMoney: '4',
    UserStautsId: '5'
  },
  {
    key: '2',
    UserId: '000002',
    UserAccount: 2,
    UserPassword: '1',
    UserRegisterTime: '2',
    UserName: '3',
    UserMoney: '4',
    UserStautsId: '5'
  }
]
export default {
  data () {
    return {
      rules: {
        UserId: [
          { required: true, message: 'Please input Activity name', trigger: 'blur' },
          { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
        ],
        UserAccount: [
          { required: true, message: 'Please input Activity name', trigger: 'blur' },
          { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
        ],
        UserPassword: [
          { required: true, message: 'Please input Activity name', trigger: 'blur' },
          { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
        ],
        UserRegisterTime: [
          { required: true, message: 'Please input Activity name', trigger: 'blur' },
          { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
        ],
        UserName: [
          { required: true, message: 'Please input Activity name', trigger: 'blur' },
          { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
        ],
        UserMoney: [
          { required: true, message: 'Please input Activity name', trigger: 'blur' },
          { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
        ],
        UserStautsId: [
          { required: true, message: 'Please input Activity name', trigger: 'blur' },
          { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
        ]
      },
      form: {
        UserId: '',
        UserAccount: '',
        UserPassword: '',
        UserRegisterTime: '',
        UserName: '',
        UserMoney: '',
        UserStautsId: ''
      },
      records: {
        UserId: '',
        UserAccount: '',
        UserPassword: '',
        UserRegisterTime: '',
        UserName: '',
        UserMoney: '',
        UserStautsId: ''
      },
      // v-decorator="['templateOrderCurrencyNum', vaildatorRules.templateOrderCurrencyNum]"
      // vaildatorRules: {
      //   templateOrderId: {
      //     rules: [
      //       { required: true, message: 'Please input your note!' },
      //       { max: 10, message: '超过了10个!' }
      //     ]
      //   },
      //   templateOrderNumber: {
      //     rules: [
      //       { required: true, message: 'Please input your note!' },
      //       { max: 10, message: 'P1231231!' }
      //     ]
      //   },
      //   templateOrderBuyTime: {
      //     rules: [
      //       { required: true, message: 'Please input your note!' },
      //       { max: 10, message: 'P1231231!' }
      //     ]
      //   },
      //   templateOrderSellTime: {
      //     rules: [
      //       { required: true, message: 'Please input your note!' },
      //       { max: 10, message: 'P1231231!' }
      //     ]
      //   },
      //   templateOrderPrice: {
      //     rules: [
      //       { required: true, message: 'Please input your note!' },
      //       { max: 10, message: 'P1231231!' }
      //     ]
      //   },
      //   templateOrderTypeId: {
      //     rules: [
      //       { required: true, message: 'Please input your note!' },
      //       { max: 10, message: 'P1231231!' }
      //     ]
      //   },
      //   templateOrderStatusId: {
      //     rules: [
      //       { required: true, message: 'Please input your note!' },
      //       { max: 10, message: 'P1231231!' }
      //     ]
      //   },
      //   templateOrderUserId: {
      //     rules: [
      //       { required: true, message: 'Please input your note!' },
      //       { max: 10, message: 'P1231231!' }
      //     ]
      //   },
      //   templateOrderCurrencyId: {
      //     rules: [
      //       { required: true, message: 'Please input your note!' },
      //       { max: 10, message: 'P1231231!' }
      //     ]
      //   },
      //   templateOrderCurrencyNum: {
      //     rules: [
      //       { required: true, message: 'Please input your note!' },
      //       { max: 10, message: 'P1231231!' }
      //     ]
      //   }
      // },
      placeholder: '用户名查询',
      data,
      columns,
      newVisible: false,
      editVisible: false,
      // form: this.$form.createForm(this),
      confirmLoading: false,
      pagination: {
        showQuickJumper: true,
        defaultPageSize: 10,
        showTotal: total => `共 ${total} 条数据`,
        onShowSizeChange: true,
        showSizeChange: (current, pageSize) => { this.pageSize = pageSize }
      }
    }
  },
  methods: {
    // resetForm () {
    //   this.$refs.ruleForm.resetFields()
    // },
    // 订单搜索
    onSearch (value) {
      console.log(value)
    },
    // 新建订单
    newShowModal () {
      // this.form.resetFields()
      // this.$refs.ruleForm.resetFields()
      this.newVisible = true
      console.log('newShowModal新建订单')
    },
    // 新建确定
    newHandleSubmit () {
      // this.form.resetFields()
      // this.visible = false
      this.ModalText = 'The modal will be closed after two seconds'
      this.confirmLoading = true
      setTimeout(() => {
        this.newVisible = false
        this.confirmLoading = false
        this.$success({
          title: 'This is a success message',
          // JSX support
          content: (
            <div>
              <p>some messages...some messages...</p>
              <p>some messages...some messages...</p>
            </div>
          )
        })
        this.$refs.ruleForm.resetFields()
      }, 1000)
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
      // this.$refs.ruleForm.resetFields()
      console.log('newCancel')
    },
    // 修改订单
    editShowModal (record) {
      // this.form.resetFields()
      // console.log(record)
      const b = JSON.parse(JSON.stringify(record))
      console.log(b)
      this.records.UserId = b.UserId
      this.records.UserAccount = b.UserAccount
      this.records.UserPassword = b.UserPassword
      this.records.UserRegisterTime = b.UserRegisterTime
      this.records.UserName = b.UserName
      this.records.UserMoney = b.UserMoney
      this.records.UserStautsId = b.UserStautsId
      this.editVisible = true
      console.log('修改')
    },
    // 修改确定
    editHandleSubmit () {
      // this.form.resetFields()
      // this.visible = false
      this.ModalText = 'The modal will be closed after two seconds'
      this.confirmLoading = true
      setTimeout(() => {
        this.editVisible = false
        this.confirmLoading = false
        this.$success({
          title: 'This is a success message',
          // JSX support
          content: (
            <div>
              <p>some messages...some messages...</p>
              <p>some messages...some messages...</p>
            </div>
          )
        })
      }, 1000)
      console.log('修改ok')
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
        content: 'User List',
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
