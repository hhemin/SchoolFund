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
export default {
  name: "register",
  data() {
    return {
      formdata: [
        {
          labelname: "用户名",
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
    register() {
      console.log(this.form);
      this.btn.isloading = true
      setTimeout(()=> {
        this.btn.isloading = false
        console.log(this.btn)
      },2000)
    },
  },
  components: {
    FormInput,
    Button
  }
};
</script>

<style lang="scss" scoped>
</style>