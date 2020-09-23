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
    pullLogin() {
      this.btn.isloading = true
      console.log(this.btn)
      setTimeout(()=> {
        this.btn.isloading = false
        console.log(this.btn)
      },2000)
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