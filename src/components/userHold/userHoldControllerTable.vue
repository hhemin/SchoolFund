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
            :confirm-loading="newConfirmLoading">
              <a-form-model ref="newRuleForm" :model="newForm" :rules="rules" :label-col="{ span: 8 }" :wrapper-col="{ span: 14 }">
                <a-form-model-item prop="account" label="账号">
                  <a-input
                    v-model="newForm.account"
                  />
                </a-form-model-item>
                <a-form-model-item prop="userType" label="账号类型">
                  <a-input
                    v-model="newForm.userType"
                  />
                </a-form-model-item>
                <a-form-model-item prop="password" label="密码">
                  <a-input
                    v-model="newForm.password"
                  />
                </a-form-model-item>
                <a-form-model-item prop="registerTime" label="注册时间">
                  <a-input
                    v-model="newForm.registerTime"
                  />
                </a-form-model-item>
                <a-form-model-item prop="userName" label="用户名称">
                  <a-input
                    v-model="newForm.userName"
                  />
                </a-form-model-item>
                <a-form-model-item prop="money" label="账户余额">
                  <a-input
                    v-model="newForm.money"
                  />
                </a-form-model-item>
                <a-form-model-item prop="userStatus" label="账户状态">
                  <a-input
                    v-model="newForm.userStatus"
                  />
                </a-form-model-item>
              </a-form-model>
            </a-modal>
            <!-- newbtn 弹框 end -->
          </div>
          <!-- newbtn end -->
          <!-- table -->
          <div class="table">
            <a-table @expand="open" :rowKey="data => data.userId" :pagination="pagination" :columns="columns" :data-source="data" size="small" >
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
                      <a-form-model-item prop="account" label="账号">
                        <a-input
                          v-model="editForm.account"
                        />
                      </a-form-model-item>
                      <a-form-model-item prop="userType" label="账号类型">
                        <a-input
                          v-model="editForm.userType"
                        />
                      </a-form-model-item>
                      <a-form-model-item prop="password" label="密码">
                        <a-input
                          v-model="editForm.password"
                        />
                      </a-form-model-item>
                      <a-form-model-item prop="registerTime" label="注册时间">
                        <a-input
                          v-model="editForm.registerTime"
                        />
                      </a-form-model-item>
                      <a-form-model-item prop="userName" label="用户名称">
                        <a-input
                          v-model="editForm.userName"
                        />
                      </a-form-model-item>
                      <a-form-model-item prop="money" label="账户余额">
                        <a-input
                          v-model="editForm.money"
                        />
                      </a-form-model-item>
                      <a-form-model-item prop="userStatus" label="账户状态">
                        <a-input
                          v-model="editForm.userStatus"
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
              <!-- 二表 -->
              <a-table
                slot="expandedRowRender"
                :columns="innerColumns"
                :data-source="innerData"
                :pagination="false"
                :rowKey="data => data.holdCurrencyId"
              >
                <a slot="actions" href="javascript:;"  slot-scope="text, record">
                  <a-button type="primary" @click="editShowModal2(record)" size="small">
                  修改
                  <a-modal
                  v-model="editVisible2"
                  title="Edit"
                  @ok="editHandleSubmit2"
                  @cancel="editCancel2"
                  ok-text="确认"
                  cancel-text="取消"
                  :confirm-loading="editConfirmLoading2">
                    <a-form-model ref="editRuleForm2" :model="editForm2" :rules="rules2" :label-col="{ span: 8 }" :wrapper-col="{ span: 14 }">
                      <a-form-model-item prop="currency" label="货币">
                        <a-input
                          v-model="editForm2.currency"
                        />
                      </a-form-model-item>
                      <a-form-model-item prop="holdCurrencyMoney" label="价值">
                        <a-input
                          v-model="editForm2.holdCurrencyMoney"
                        />
                      </a-form-model-item>
                      <a-form-model-item prop="holdCurrencyNum" label="数量">
                        <a-input
                          v-model="editForm2.holdCurrencyNum"
                        />
                      </a-form-model-item>
                    </a-form-model>
                  </a-modal>
                </a-button>
                </a>
              </a-table>
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
// import { Login } from '../../utils/api'
// , fixed: 'left'
const columns = [
  { title: '账号', dataIndex: 'account', key: 'account' },
  { title: '账号类型', width: 100, dataIndex: 'userType', key: 'userType' },
  { title: '密码', dataIndex: 'password', key: 'password' },
  { title: '注册时间', dataIndex: 'registerTime', key: 'registerTime' },
  { title: '用户名称', dataIndex: 'userName', key: 'userName' },
  { title: '账户余额', dataIndex: 'money', key: 'money' },
  { title: '账户状态', dataIndex: 'userStatus', key: 'userStatus' },
  {
    title: '操作',
    key: 'operation',
    // fixed: 'right',
    width: 120,
    scopedSlots: { customRender: 'action' }
  }
]

// const data = [
//   {
//     key: '1',
//     UserId: '000001',
//     UserAccount: 1,
//     UserPassword: '1',
//     UserRegisterTime: '2',
//     UserName: '3',
//     UserMoney: '4',
//     UserStautsId: '5'
//   },
//   {
//     key: '2',
//     UserId: '000002',
//     UserAccount: 2,
//     UserPassword: '1',
//     UserRegisterTime: '2',
//     UserName: '3',
//     UserMoney: '4',
//     UserStautsId: '5'
//   }
// ]
const innerColumns = [
  // { title: 'HoldCurrencyId', dataIndex: 'holdCurrencyId', key: 'holdCurrencyId' },
  { title: '货币', dataIndex: 'currency', key: 'currency' },
  { title: '价值', dataIndex: 'holdCurrencyMoney', key: 'holdCurrencyMoney' },
  { title: '数量', dataIndex: 'holdCurrencyNum', key: 'holdCurrencyNum' },
  // { title: 'Status', key: 'state', scopedSlots: { customRender: 'status' } },
  {
    title: '操作',
    key: 'operation2',
    // fixed: 'right',
    width: 120,
    scopedSlots: { customRender: 'actions' }
  }
]
// const innerData = [
//   {
//     key: 1,
//     HoldCurrencyId: '1',
//     HoldCurrency_CurrencyId: '2',
//     HoldCurrencyNum: '3',
//     HoldCurrency_UserId: '4',
//     HoldCurrencyMoney: '5'
//   }
// ]
export default {
  data () {
    return {
      rules: {
        account: [
          { required: true, message: '请输入订单编号', trigger: 'blur' },
          { min: 1, max: 100, message: '订单编号不能为空', trigger: 'blur' }
        ],
        userType: [
          { required: true, message: '请输入账号类型', trigger: 'blur' },
          { min: 1, max: 100, message: '账号类型不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 1, max: 100, message: '密码不能为空', trigger: 'blur' }
        ],
        registerTime: [
          { required: true, message: '请输入注册时间', trigger: 'blur' },
          { min: 1, max: 100, message: '注册时间不能为空', trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 1, max: 100, message: '用户名称不能为空', trigger: 'blur' }
        ],
        money: [
          { required: true, message: '请输入账户余额', trigger: 'blur' },
          { min: 1, max: 100, message: '账户余额不能为空', trigger: 'blur' }
        ],
        userStatus: [
          { required: true, message: '请输入账户状态', trigger: 'blur' },
          { min: 1, max: 100, message: '账户状态不能为空', trigger: 'blur' }
        ]
      },
      rules2: {
        currency: [
          { required: true, message: '请输入货币名', trigger: 'blur' },
          { min: 1, max: 100, message: '货币名不能为空', trigger: 'blur' }
        ],
        holdCurrencyMoney: [
          { required: true, message: '请输入货币价值', trigger: 'blur' },
          { min: 1, max: 100, message: '货币价值不能为空', trigger: 'blur' }
        ],
        holdCurrencyNum: [
          { required: true, message: '请输入货币数量', trigger: 'blur' },
          { min: 1, max: 100, message: '货币数量不能为空', trigger: 'blur' }
        ]
      },
      newForm: {
        userId: '',
        account: '',
        userType: '',
        password: '',
        registerTime: '',
        userName: '',
        money: '',
        userStatus: ''
      },
      editForm: {
        userId: '',
        account: '',
        userType: '',
        password: '',
        registerTime: '',
        userName: '',
        money: '',
        userStatus: ''
      },
      editForm2: {
        holdCurrencyId: '',
        currency: '',
        holdCurrencyMoney: '',
        holdCurrencyNum: ''
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
      data: [],
      columns,
      innerColumns,
      innerData: [],
      newVisible: false,
      editVisible: false,
      editVisible2: false,
      // form: this.$form.createForm(this),
      newConfirmLoading: false,
      editConfirmLoading: false,
      editConfirmLoading2: false,
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
      // this.$refs.ruleForm.resetFields()
      console.log('newCancel')
    },
    // 修改订单
    editShowModal (record) {
      // this.form.resetFields()
      // console.log(record)
      const b = JSON.parse(JSON.stringify(record))
      console.log(b)
      this.editForm.account = b.account
      this.editForm.userType = b.userType
      this.editForm.password = b.password
      this.editForm.registerTime = b.registerTime
      this.editForm.userName = b.userName
      this.editForm.money = b.money
      this.editForm.userStatus = b.userStatus
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
      console.log('修改ok')
    },
    // 修改取消
    editCancel () {
      // this.form.resetFields()
      console.log('修改Cancel')
    },
    // 修改订单2
    editShowModal2 (record) {
      // this.form.resetFields()
      // console.log(record)
      const b = JSON.parse(JSON.stringify(record))
      console.log(b)
      this.editForm2.currency = b.currency
      this.editForm2.holdCurrencyMoney = b.holdCurrencyMoney
      this.editForm2.holdCurrencyNum = b.holdCurrencyNum
      this.editVisible2 = true
      console.log('修改')
    },
    // 修改确定2
    editHandleSubmit2 () {
      // this.form.resetFields()
      // this.visible = false
      this.$refs.editRuleForm2.validate(valid => {
        if (valid) {
          // alert('submit!')
          this.editConfirmLoading2 = true
          setTimeout(() => {
            this.editVisible2 = false
            this.editConfirmLoading2 = false
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
            this.$refs.editRuleForm2.resetFields()
          }, 1000)
        } else {
          console.log('error submit!!')
          this.$message.warning('请输入正确信息')
          return false
        }
      })
      console.log('修改ok')
    },
    // 修改取消2
    editCancel2 () {
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
    },
    // getList (limit, page, userId) {
    //   Login({
    //     limit, page, userId
    //   })
    //   // const instance = this.$axios.create({
    //   //   timeout: 1000,
    //   //   headers: {
    //   //     token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxIn0.1CN_8jXLcWwWBf_V-N_7qPrlhbnIOOiFA4Y2pe9-xL4'
    //   //   }
    //   // })
    //   // instance.post('http://192.168.43.253:8080/api/admin/order/query',)
    //     .then(res => {
    //       console.log(res)
    //       console.log(res.data.list[0])
    //       console.log(this.data)
    //       this.data = res.data.list
    //       console.log(this.data[0])
    //     })
    //     .catch(err => {
    //       console.log(err)
    //     })
    // }
    // limit条   page页
    getList (limit, page) {
      const instance = this.$axios.create({
        // baseUrl: 'http://192.168.43.253:8080/api/',
        // method: 'post'
        // url: 'http://192.168.43.253:8080/api/admin/order/query'
      })
      instance.defaults.headers.common.Authorization = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxIn0.1CN_8jXLcWwWBf_V-N_7qPrlhbnIOOiFA4Y2pe9-xL4'
      instance.post('http://10.101.88.29:8080/api/admin/user/query', {
        limit,
        page
      })
        .then(res => {
          console.log(res.data.data)
          console.log(res.data.data.jsonArray)
          // console.log(res.data.list[0])
          this.data = res.data.data.jsonArray
          // console.log(res.data.data.jsonArray[0])
          // console.log(res.data.data.jsonArray[0].account)
        })
        .catch(err => {
          console.log(err)
        })
    },
    // getList2 () {
    //   const instance = this.$axios.create({
    //     // baseUrl: 'http://192.168.43.253:8080/api/',
    //     // method: 'post'
    //     // url: 'http://192.168.43.253:8080/api/admin/order/query'
    //   })
    //   instance.defaults.headers.common.Authorization = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxIn0.1CN_8jXLcWwWBf_V-N_7qPrlhbnIOOiFA4Y2pe9-xL4'
    //   instance.post('http://10.101.88.29:8080/api/admin/holdCurrency/query/1')
    //     .then(res => {
    //       console.log(res)
    //       // console.log(res.data.list[0])
    //     })
    //     .catch(err => {
    //       console.log(err)
    //     })
    //   instance.
    //   this.$axios.post('http://192.168.43.253:8080/api/admin/order/query', {
    //     limit,
    //     page,
    //     userId
    //     // headers: {
    //     //   Authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxIn0.1CN_8jXLcWwWBf_V-N_7qPrlhbnIOOiFA4Y2pe9-xL4'
    //     // }
    //   })
    //     .then(res => {
    //       // this.$axios.defaults.headers.common.Authorization = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxIn0.1CN_8jXLcWwWBf_V-N_7qPrlhbnIOOiFA4Y2pe9-xL4'
    //       console.log(res)
    //     })
    //     .catch(err => {
    //       console.log(err)
    //     })
    // },
    open (expanded, record) {
      console.log(expanded)
      console.log(record)
      console.log(record.userId)
      if (expanded) {
        const params = record.userId
        const instance = this.$axios.create({
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        })
        instance.defaults.headers.common.Authorization = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxIn0.1CN_8jXLcWwWBf_V-N_7qPrlhbnIOOiFA4Y2pe9-xL4'
        // instance.defaults.headers.get.ContentType = 'application/json;charset=utf-8'
        instance.post('http://10.101.88.29:8080/api/admin/holdCurrency/query', {
          userId: params
        })
          .then(res => {
            console.log(res)
            // console.log(res.data.list[0])
            // this.data = res
            console.log(res.data.data)
            this.innerData = res.data.data
          })
          .catch(err => {
            console.log(err)
          })
      }
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
