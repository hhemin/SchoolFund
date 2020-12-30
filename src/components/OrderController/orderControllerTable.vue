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
          enter-button="订单搜索"
          size="large"
          @search="onSearch"
          >
            <a-tooltip slot="suffix" title="请输入订单号">
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
              + 新建订单
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
                <!-- <a-form-model-item prop="OrderId" label="OrderId">
                  <a-input
                    v-model="form.OrderId"
                  />
                </a-form-model-item> -->
                <a-form-model-item prop="orderCurrencyId" label="订单编号">
                  <a-input
                    v-model="newForm.orderCurrencyId"
                  />
                </a-form-model-item>
                <a-form-model-item prop="account" label="账号">
                  <a-input
                    v-model="newForm.account"
                  />
                </a-form-model-item>
                <a-form-model-item prop="orderPrice" label="订单价值">
                  <a-input
                    v-model="newForm.orderPrice"
                  />
                </a-form-model-item>
                <a-form-model-item prop="orderType" label="订单类型">
                  <a-input
                    v-model="newForm.orderType"
                  />
                </a-form-model-item>
                <a-form-model-item prop="orderStatus" label="订单状态">
                  <a-input
                    v-model="newForm.orderStatus"
                  />
                </a-form-model-item>
                <a-form-model-item prop="orderCurrency" label="货币">
                  <a-input
                    v-model="newForm.orderCurrency"
                  />
                </a-form-model-item>
                <a-form-model-item prop="orderCurrencyNum" label="货币数量">
                  <a-input
                    v-model="newForm.orderCurrencyNum"
                  />
                </a-form-model-item>
                <!-- <a-form-model-item prop="orderBuyTime" label="购买时间">
                  <a-input
                    v-model="form.orderBuyTime"
                  />
                </a-form-model-item>
                <a-form-model-item prop="orderSellTime" label="卖出时间">
                  <a-input
                    v-model="form.orderSellTime"
                  />
                </a-form-model-item> -->
              </a-form-model>
            </a-modal>
            <!-- newbtn 弹框 end -->
          </div>
          <!-- newbtn end -->
          <!-- table -->
          <div class="table">
            <a-table :rowKey="data => data.orderId" :pagination="pagination" :columns="columns" :data-source="data" :scroll="{ x: 950 }" size="small" >
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
                      <!-- <a-form-model-item prop="OrderId" label="OrderId">
                        <a-input
                          v-model="records.OrderId"
                        />
                      </a-form-model-item> -->
                      <a-form-model-item prop="orderNumber" label="订单编号">
                        <a-input
                          v-model="editForm.orderNumber"
                        />
                      </a-form-model-item>
                      <a-form-model-item prop="account" label="账号">
                        <a-input
                          v-model="editForm.account"
                        />
                      </a-form-model-item>
                      <a-form-model-item prop="orderPrice" label="订单价值">
                        <a-input
                          v-model="editForm.orderPrice"
                        />
                      </a-form-model-item>
                      <a-form-model-item prop="orderType" label="订单类型">
                        <a-select @change="handleChange1" v-model="editForm.orderType" placeholder="please select your zone">
                          <a-select-option v-for="(item, index) in orderTypeC" :key="index" :value="item.orderTypeId">
                            {{item.orderTypeName}}
                          </a-select-option>
                          <!-- <a-select-option :value="orderStatusId1">
                            已付款
                          </a-select-option>
                          <a-select-option :value="orderStatusId2">
                            异常
                          </a-select-option> -->
                        </a-select>
                        <!-- <a-input
                          v-model="editForm.orderType"
                        /> -->
                      </a-form-model-item>
                      <a-form-model-item prop="orderStatus" label="订单状态">
                        <a-select @change="handleChange2" v-model="editForm.orderStatus" placeholder="please select your zone">
                          <a-select-option v-for="(item, index) in orderStatusC" :key="index" :value="item.orderStatusId">
                            {{item.orderStatusName}}
                          </a-select-option>
                          <!-- <a-select-option :value="orderStatusId1">
                            已付款
                          </a-select-option>
                          <a-select-option :value="orderStatusId2">
                            异常
                          </a-select-option> -->
                        </a-select>
                        <!-- <a-input
                          v-model="editForm.orderStatus"
                        /> -->
                      </a-form-model-item>
                      <a-form-model-item prop="orderCurrency" label="货币">
                         <!-- v-model="editForm.orderCurrency" -->
                        <a-select @change="handleChange3" v-model="editForm.orderCurrency" placeholder="please select your zone">
                          <a-select-option v-for="(item, index) in currencyC" :key="index" :value="item.currencyId">
                            {{item.currencyName}}
                          </a-select-option>
                          <!-- <a-select-option :value="orderStatusId1">
                            已付款
                          </a-select-option>
                          <a-select-option :value="orderStatusId2">
                            异常
                          </a-select-option> -->
                        </a-select>
                        <!-- <a-input
                          v-model="editForm.orderCurrency"
                        /> -->
                      </a-form-model-item>
                      <a-form-model-item prop="orderCurrencyNum" label="货币数量">
                        <a-input
                          v-model="editForm.orderCurrencyNum"
                        />
                      </a-form-model-item>
                      <a-form-model-item prop="orderBuyTime" label="购买时间">
                        <a-input
                          v-model="editForm.orderBuyTime"
                        />
                      </a-form-model-item>
                      <a-form-model-item prop="orderSellTime" label="卖出时间">
                        <a-input
                          v-model="editForm.orderSellTime"
                        />
                      </a-form-model-item>
                    </a-form-model>
                  </a-modal>
                </a-button>
                <a-button type="danger"  @click="showDeleteConfirm(record)" size="small">
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
// import { Login } from '../../utils/api'
// , fixed: 'left'
const columns = [
  // { title: 'OrderId', width: 100, dataIndex: 'orderId', key: 'orderId', fixed: 'left' },
  { title: '订单编号', dataIndex: 'orderNumber', key: 'orderNumber', fixed: 'left' },
  { title: '账号', dataIndex: 'account', key: 'account' },
  { title: '订单价值', dataIndex: 'orderPrice', key: 'orderPrice' },
  { title: '订单类型', dataIndex: 'orderType', key: 'orderType' },
  { title: '订单状态', dataIndex: 'orderStatus', key: 'orderStatus' },
  { title: '货币', dataIndex: 'orderCurrency', key: 'orderCurrency' },
  { title: '货币数量', dataIndex: 'orderCurrencyNum', key: 'orderCurrencyNum' },
  { title: '购买时间', dataIndex: 'orderBuyTime', key: 'orderBuyTime' },
  { title: '卖出时间', dataIndex: 'orderSellTime', key: 'orderSellTime' },
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
//     orderid: '000001',
//     OrderNumber: 1,
//     OrderBuyTime: '1',
//     OrderSellTime: '2',
//     OrderPrice: '3',
//     OrderTypeId: '4',
//     OrderStatusId: '5',
//     OrderUserId: '6',
//     OrderCurrencyId: '7',
//     OrderCurrencyNum: '8'
//   }
// ]
export default {
  data () {
    return {
      // 订单状态
      orderStatusC: [],
      // 订单类型
      orderTypeC: [],
      // 货币
      currencyC: [],
      page: 1,
      rules: {
        // OrderId: [
        //   { required: true, message: 'Please input Activity name', trigger: 'blur' },
        //   { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
        // ],
        orderNumber: [
          { required: true, message: '请输入订单编号', trigger: 'blur' },
          { min: 1, max: 100, message: '订单编号不能为空', trigger: 'blur' }
        ],
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 2, message: '账号不能为空', trigger: 'blur' }
        ],
        orderPrice: [
          { required: true, message: '请输入订单价值', trigger: 'blur' },
          { min: 1, max: 100, message: '订单价值不能为空', trigger: 'blur' }
        ],
        orderType: [
          { required: true, message: '请输入订单类型', trigger: 'blur' }
          // { min: 1, max: 10, message: '订单类型不能为空', trigger: 'blur' }
        ],
        orderStatus: [
          { required: true, message: '请输入订单状态', trigger: 'blur' }
          // { min: 1, max: 10, message: '订单状态不能为空', trigger: 'blur' }
        ],
        orderCurrency: [
          { required: true, message: '请输入货币', trigger: 'blur' }
          // { min: 1, max: 100, message: '货币不能为空', trigger: 'blur' }
        ],
        orderCurrencyNum: [
          { required: true, message: '请输入货币数量', trigger: 'blur' },
          { min: 1, message: '货币数量不能为空', trigger: 'blur' }
        ]
      },
      newForm: {
        orderId: '',
        orderNumber: '',
        account: '',
        orderPrice: '',
        orderType: '',
        orderStatus: '',
        orderCurrency: '',
        orderCurrencyNum: '',
        orderBuyTime: '',
        orderSellTime: ''
      },
      editForm: {
        orderId: '',
        orderNumber: '',
        account: '',
        orderPrice: '',
        orderType: '',
        orderStatus: '',
        orderCurrency: '',
        orderCurrencyNum: '',
        orderBuyTime: '',
        orderSellTime: ''
      },
      // records: {
      //   // OrderId: '',
      //   orderNumber: '',
      //   account: '',
      //   orderPrice: '',
      //   orderType: '',
      //   orderStatus: '',
      //   orderCurrency: '',
      //   orderCurrencyNum: '',
      //   orderBuyTime: '',
      //   orderSellTime: ''
      // },
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
      placeholder: '订单号查询',
      data: [],
      columns,
      newVisible: false,
      editVisible: false,
      // form: this.$form.createForm(this),
      newConfirmLoading: false,
      editConfirmLoading: false,
      // pageSizeTotal: '',
      searchTitle: '',
      pagination: {
        showQuickJumper: true,
        defaultPageSize: 10,
        total: 0,
        showTotal: total => `共 ${total} 条数据`,
        onShowSizeChange: true,
        // showSizeChange: (current, pageSize) => {
        //   this.page = pageSize
        //   // this.onSearch
        // }
        // onShowSizeChange: (current, pageSize) => this.onSizeChange(current, pageSize),
        onChange: (page, pageSize) => this.onPageChange(page, pageSize)
      }
    }
  },
  created () {
    // this.getList(1, 1, 14)
    this.getorderStatus()
    this.getorderType()
    this.getCurrency()
  },
  methods: {
    handleChange1 (value) {
      console.log(value) // { key: "lucy", label: "Lucy (101)" }
      this.editForm.orderType = value
    },
    handleChange2 (value) {
      console.log(value) // { key: "lucy", label: "Lucy (101)" }
      this.editForm.orderStatus = value
    },
    handleChange3 (value) {
      console.log(value) // { key: "lucy", label: "Lucy (101)" }
      this.editForm.orderCurrency = value
    },
    getCurrency () {
      const instance = this.$axios.create()
      instance.defaults.headers.common.Authorization = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxIn0.1CN_8jXLcWwWBf_V-N_7qPrlhbnIOOiFA4Y2pe9-xL4'
      instance.post('http://10.101.88.29:8080/api/admin/currency/query', {
        limit: 20,
        page: 1
      })
        .then(res => {
          console.log(res.data.data.list)
          this.currencyC = res.data.data.list
        })
        .catch(err => {
          console.log(err)
        })
    },
    getorderType () {
      const instance = this.$axios.create()
      instance.defaults.headers.common.Authorization = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxIn0.1CN_8jXLcWwWBf_V-N_7qPrlhbnIOOiFA4Y2pe9-xL4'
      instance.post('http://10.101.88.29:8080/api/public/orderType/query', {})
        .then(res => {
          console.log(res)
          this.orderTypeC = res.data.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    getorderStatus () {
      const instance = this.$axios.create()
      instance.defaults.headers.common.Authorization = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxIn0.1CN_8jXLcWwWBf_V-N_7qPrlhbnIOOiFA4Y2pe9-xL4'
      instance.post('http://10.101.88.29:8080/api/public/orderStatus/query', {})
        .then(res => {
          // console.log(res)
          console.log(res.data.data)
          console.log(res.data.data[0].orderStatusId)
          this.orderStatusC = res.data.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    onPageChange (page, pageSize) {
      this.page = page
      this.onSearch(this.searchTitle)
    },
    // resetForm () {
    //   this.$refs.ruleForm.resetFields()
    // },
    // 订单搜索
    onSearch (value) {
      console.log(value)
      const instance = this.$axios.create()
      instance.defaults.headers.common.Authorization = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxIn0.1CN_8jXLcWwWBf_V-N_7qPrlhbnIOOiFA4Y2pe9-xL4'
      instance.post('http://10.101.88.29:8080/api/admin/order/search', {
        limit: 10,
        page: this.page,
        title: value
      })
        .then(res => {
          // console.log(res)
          console.log(value)
          console.log(res)
          // console.log(res.data.data.dataSize)
          this.data = res.data.data.list
          this.searchTitle = value
          // this.pageSize = res.data.data
          this.pagination.total = res.data.data.dataSize
        })
        .catch(err => {
          console.log(err)
        })
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
          // const instance = this.$axios.create()
          // instance.defaults.headers.common.Authorization = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxIn0.1CN_8jXLcWwWBf_V-N_7qPrlhbnIOOiFA4Y2pe9-xL4'
          // instance.post('http://10.101.88.29:8080/api/admin/order/update', {
          //   orderCurrencyId: this.newForm.orderCurrencyId,
          //   orderCurrencyNum: this.newForm.orderCurrencyNum,
          //   orderId: this.newForm.orderId,
          //   orderNum: this.newForm.orderNum,
          //   orderPrice: this.newForm.orderPrice,
          //   orderStatusId: this.newForm.orderStatusId,
          //   orderTypeId: this.newForm.orderTypeId,
          //   orderUserId: this.newForm.orderUserId
          // })
          //   .then(res => {
          //     console.log(res)
          //   })
          //   .catch(err => {
          //     console.log(err)
          //   })
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
      // this.ModalText = 'The modal will be closed after two seconds'
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
      this.editForm.orderId = b.orderId
      this.editForm.orderNumber = b.orderNumber
      this.editForm.account = b.account
      this.editForm.orderPrice = b.orderPrice
      this.editForm.orderType = b.orderType
      this.editForm.orderStatus = b.orderStatus
      this.editForm.orderCurrency = b.orderCurrency
      this.editForm.orderCurrencyNum = b.orderCurrencyNum
      this.editForm.orderBuyTime = b.orderBuyTime
      this.editForm.orderSellTime = b.orderSellTime
      this.editVisible = true
      console.log('修改')
    },
    getKey (value, arr, key, id) {
      let getkey = false
      console.log(arr)
      if (typeof value === 'number') return value
      for (let i = 0; i < arr.length; i++) {
        const _value = arr[i]
        if (_value[key] === value) {
          getkey = _value[id]
        }
      }
      console.log(getkey)
      return getkey
    },
    // 修改确定
    editHandleSubmit () {
      // this.form.resetFields()
      // this.visible = false
      this.$refs.editRuleForm.validate(valid => {
        if (valid) {
          // const _V = {
          //   account: this.editForm.account,
          //   orderCurrencyId: this.getKey(this.editForm.orderCurrency, this.currencyC, 'currencyName', 'currencyId') ? this.getKey(this.editForm.orderCurrency, this.currencyC, 'currencyName', 'currencyId') : this.editForm.orderCurrency,
          //   orderCurrencyNum: this.editForm.orderCurrencyNum,
          //   orderId: this.editForm.orderId,
          //   orderNum: this.editForm.orderNumber,
          //   orderPrice: this.editForm.orderPrice,
          //   orderStatusId: this.getKey(this.editForm.orderStatus, this.orderStatusC, 'orderStatusName', 'orderStatusId') ? this.getKey(this.editForm.orderStatus, this.orderStatusC, 'orderStatusName', 'orderStatusId') : this.editForm.orderStatus,
          //   orderTypeId: this.getKey(this.editForm.orderType, this.orderTypeC, 'orderTypeName', 'orderTypeId') ? this.getKey(this.editForm.orderType, this.orderTypeC, 'orderTypeName', 'orderTypeId') : this.editForm.orderType
          //   // orderUserId: this.editForm.orderUserId
          // }
          // console.log(this.currencyC)
          // console.log(_V)
          const instance = this.$axios.create()
          instance.defaults.headers.common.Authorization = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxIn0.1CN_8jXLcWwWBf_V-N_7qPrlhbnIOOiFA4Y2pe9-xL4'
          instance.post('http://10.101.88.29:8080/api/admin/order/update', {
            account: this.editForm.account,
            orderCurrencyId: this.getKey(this.editForm.orderCurrency, this.currencyC, 'currencyName', 'currencyId') ? this.getKey(this.editForm.orderCurrency, this.currencyC, 'currencyName', 'currencyId') : this.editForm.orderCurrency,
            orderCurrencyNum: this.editForm.orderCurrencyNum,
            orderId: this.editForm.orderId,
            orderNum: this.editForm.orderNumber,
            orderPrice: this.editForm.orderPrice,
            orderStatusId: this.getKey(this.editForm.orderStatus, this.orderStatusC, 'orderStatusName', 'orderStatusId') ? this.getKey(this.editForm.orderStatus, this.orderStatusC, 'orderStatusName', 'orderStatusId') : this.editForm.orderStatus,
            orderTypeId: this.getKey(this.editForm.orderType, this.orderTypeC, 'orderTypeName', 'orderTypeId') ? this.getKey(this.editForm.orderType, this.orderTypeC, 'orderTypeName', 'orderTypeId') : this.editForm.orderType
            // orderUserId: this.editForm.orderUserId
          })
            .then(res => {
              // console.log(this.editForm.account)
              // console.log(this.editForm.orderCurrency)
              // console.log(this.editForm.orderCurrencyNum)
              // console.log(this.editForm.orderId)
              // console.log(this.editForm.orderNumber)
              // console.log(this.editForm.orderPrice)
              // console.log(this.editForm.orderStatus)
              // console.log(this.editForm.orderType)
              console.log(res)
            })
            .catch(err => {
              console.log(err)
            })
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
    showDeleteConfirm (record) {
      const b = JSON.parse(JSON.stringify(record))
      const that = this
      // console.log(b.orderId)
      this.$confirm({
        title: '确定删除数据?',
        content: 'Order List',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk () {
          // console.log(record)
          console.log(b.orderId)
          // console.log(that)
          const instance = that.$axios.create()
          instance.defaults.headers.common.Authorization = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxIn0.1CN_8jXLcWwWBf_V-N_7qPrlhbnIOOiFA4Y2pe9-xL4'
          instance.post('http://10.101.88.29:8080/api/admin/order/delete', {
            orderId: b.orderId
          })
            .then(res => {
              console.log(res)
            })
            .catch(err => {
              console.log(err)
            })
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
    getList (limit, page, userId) {
      // Login({Login
      //   limit, page, userId
      // })
      // const instance = this.$axios.create({
      //   timeout: 1000,
      //   headers: {
      //     token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxIn0.1CN_8jXLcWwWBf_V-N_7qPrlhbnIOOiFA4Y2pe9-xL4'
      //   }
      // })
      const instance = this.$axios.create()
      instance.defaults.headers.common.Authorization = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxIn0.1CN_8jXLcWwWBf_V-N_7qPrlhbnIOOiFA4Y2pe9-xL4'
      instance.post('http://10.101.88.29:8080/api/admin/order/query', {
        limit,
        page,
        userId
      })
      // instance.post('http://10.101.88.29:8080/api/admin/order/query', {
      //   limit,
      //   page,
      //   userId
      // })
        .then(res => {
          console.log(res)
          console.log(res.data.data.list)
          // console.log(res.data.list[0])
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
