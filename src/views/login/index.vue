
<template>
  <div>
登录
  </div>
</template>

<script>
  import apipath from '../../assets/js/api'
  import axios from 'axios'
  import {
    isNotEmpty,
    isChinese
  } from '../../common/commonValidate.js'
  export default {
    name: 'Login',
    data() {
      const validateUsername = (rule, value, callback) => {
        if (!isvalidUsername(value)) {
          callback(new Error('请输入正确的用户名'))
        } else {
          callback()
        }
      }
      const validatePass = (rule, value, callback) => {
        if (value.length < 5) {
          callback(new Error('密码不能小于5位'))
        } else {
          callback()
        }
      }
      return {
        loginForm: {
          username: 'admin',
          password: 'admin',

        },
        loginRules: {
          username: [{
            required: true,
            trigger: 'blur',
            validator: validateUsername
          }],
          password: [{
            required: true,
            trigger: 'blur',
            validator: validatePass
          }]
        },
        loading: false,
        pwdType: 'password',
        redirect: undefined,
        tip: '',
      }
    },
    watch: {
      $route: {
        handler: function (route) {
          this.redirect = route.query && route.query.redirect
        },
        immediate: true
      }
    },
    methods: {
      showPwd() {
        if (this.pwdType === 'password') {
          this.pwdType = ''
        } else {
          this.pwdType = 'password'
        }
      },
      validateAll() {
        let flat = false;
        if (!isNotEmpty(this.loginForm.username)) {
          flat = false;
          this.tip = "用户名不能为空";
          return;
        } else {
          this.tip = " ";
          flat = true;
        }

        if (!isNotEmpty(this.loginForm.password)) {
          flat = false;
          this.tip = "密码不能为空";
          return;
        } else {
          flat = true;
          this.tip = " ";
        }
        if (this.loginForm.password.length < 5 || this.loginForm.password.length > 12) {
          flat = false;
          this.tip = "密码长度不能小于5大于11";
          return;
        } else {
          this.tip = " ";
          flat = true;
        }
        return flat
      },
      login() {
        if (!this.validateAll()) {
          console.log('验证失败');
          return;
        }
        localStorage.setItem("username", this.loginForm.username);
        localStorage.setItem("password", this.loginForm.password);
        this.loading = true
        axios({
          method: 'POST',
          url: apipath.LOGIN,
          data: {
            username: this.loginForm.username,
            password: this.loginForm.password
          },
        }).then(res => {
          this.loading = false
            this.$store.dispatch('Login', this.loginForm).then(() => {
              this.loading = false
              this.$router.push({
                path: this.redirect || '/'
              })
            }).catch(() => {
              this.loading = false
            })
        }).catch(err => {
          console.log('接口请求失败');
          return false
        });
      },
    }
  }

</script>

<style>

</style>



