<template>
  <div>
    <form-input :inputdata.sync="formdata"></form-input>
    <div class="field mt-5">
      <p class="control">
        <Button :btn.sync="btn" @btneven="pullLogin"></Button>
      </p>
    </div>
  </div>
</template>

<script>
import FormInput from './input'
import Button from '../common/button'
import {Login} from '../../utils/api'
import { Message,Loading } from 'element-ui'
import storageUtil from '../../assets/js/storage'; // 缓存
export default {
  name: "Form",
  data() {
    return {
      formdata:[
        {
          labelname:'用户名',
          placeholder:'输入用户名称',
          dangerBool: false,
          value:''
        },
        {
          labelname:'密码',
          placeholder:'输入密码',
          dangerBool: false,
          value:'',
          type:'password'
        }
      ],
      btn: {
        name: '登录',
        class: 'is-success is-fullwidth',
        isloading: false
      }
    };
  },
  methods: {
    async pullLogin() {
      this.btn.isloading = true
      let _v = []
      this.formdata.forEach((item)=> {
        _v.push(item.value)
      })
      let datavalue = {
        account:_v[0],
        password:_v[1]
      }
      try {
       let v = await Login(datavalue)
       this.btn.isloading = false
       if(v.code === 200) {
         Message({
            showClose: true,
            message: '登录成功',
            type: 'success'
         });
         storageUtil.put('token',v.data)
       }
      } catch (error) {
        console.log(error)
        this.btn.isloading = false
      }
      // setTimeout(()=> {
      //   this.btn.isloading = false
      //   console.log(this.btn)
      // },2000)
    }
  },
  components: {
    FormInput,
    Button
  }
};
</script>

<style lang="scss" scoped>
</style>