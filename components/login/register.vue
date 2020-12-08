<template>
  <div>
    <form-input :inputdata.sync="formdata"></form-input>
    <div class="field mt-5">
      <p class="control">
        <Button :btn.sync="btn" @btneven="register"></Button>
      </p>
    </div>
  </div>
</template>

<script>
import FormInput from "./input";
import Button from "../common/button";
import { Message } from 'element-ui';
import { Register } from '../../utils/api'
export default {
  name: "register",
  data() {
    return {
      formdata: [
        {
          labelname: "账号",
          placeholder: "输入账号",
          dangerBool: false,
          value: "",
        },
        {
          labelname:"用户名",
          placeholder: "输入用户名称",
          dangerBool: false,
          value: "",
        },
        {
          labelname: "密码",
          placeholder: "输入密码",
          dangerBool: false,
          value: "",
          type: "password",
        },
        {
          labelname: "确认密码",
          placeholder: "再次输入密码",
          dangerBool: false,
          value: "",
          type: "password",
        },
      ],
      btn: {
        name: '注册',
        class: 'is-success is-fullwidth',
        isloading: false
      }
    };
  },
  methods: {
    async register() {
      this.btn.isloading = true
      if(this.formdata[0].value.length === 0){
        Message.error('请输入账号');
        this.btn.isloading = false
        return
      }
      if(this.formdata[1].value.length === 0){
        Message.error('请输入用户名');
        this.btn.isloading = false
        return
      }
      if(this.formdata[2].value.length === 0 || this.formdata[3].value.length === 0){
        Message.error('请输入密码');
        this.btn.isloading = false
        return
      }
      if(this.formdata[2].value !== this.formdata[3].value){
        Message.error('密码不相同');
        this.btn.isloading = false
        return
      }
      let data = {
        account:this.formdata[0].value,
        password:this.formdata[2].value,
        userName:this.formdata[1].value
      }
      try {
        const res = await Register(data)
        if(res.code === 200){
          Message.success('注册成功')
        }else{
          Message.error(res.message)
        }
        this.btn.isloading = false
      } catch (error) {
        console.log(error)
        this.btn.isloading = false
      }
      
    },
  },
  components: {
    FormInput,
    Button,
    Message
  }
};
</script>

<style lang="scss" scoped>
</style>