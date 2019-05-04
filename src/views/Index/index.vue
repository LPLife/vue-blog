<template>
  <div class="Index">

    <div class="header">
      <ul>
        <li class="home"><img src="../../assets/icon01.png" class="i-img">
          <router-link to="/Home">首页</router-link>
        </li>
        <li>
        <li class="home"><img src="../../assets/icon02.png" class="i-img">
          <router-link to="/Blog">博客日记</router-link>
        </li>
        <li>
        <li class="home"><img src="../../assets/icon03.png" class="i-img">
          <router-link to="/Photo">相册管理</router-link>
        </li>
        <li>
        <li class="home"><img src="../../assets/icon04.png" class="i-img">
          <router-link to="/Note">留言板</router-link>
        </li>
        <li>
        <li class="home"><img src="../../assets/icon05.png" class="i-img">
          <router-link to="/Time">时间轴</router-link>
        </li>
        <li>
        <li class="home"><img src="../../assets/icon06.png" class="i-img">
          <router-link to="/Person">关于我</router-link>
        </li>
        <li>
        <li class="home" @click="close()" v-if="!isLogin"><img src="../../assets/icon07.png" class="i-img">
          登录
        </li>
        <li class="home" @click="withdraw()" v-if="isLogin"><img src="../../assets/icon07.png" class="i-img">
          注销
        </li>
      </ul>
    </div>
    <Dialog v-if="showDialog">
      <div slot="login" class="login-from" v-if="showLoginDialog">
        <div class="title">
          欢迎登陆
        </div>
        <div slot="tip" v-if="showtipDialog" class="tip">
          {{tip}}
        </div>
        <div class="from">
          <input type="text" v-model="username" placeholder="用户名">
        </div>
        <div class="from">
          <input type="text" v-model="password" placeholder="密码">
        </div>
        <div class="from" v-if="registerflat">
          <div class="botton-r" @click="login()">
            登录
          </div>
        </div>
        <div class="from" v-if="!registerflat">
          <div class="botton-l" @click="register()">
            注册
          </div>
        </div>
        <div class="from">
          <a @click="handleClick(1)" class="register" v-if="registerflat">
            还没注册 ？
          </a>
          <a @click="handleClick(2)" class="register" v-if="!registerflat">
            去登录 ？
          </a>
        </div>
      </div>
    </Dialog>
    <router-view />
  </div>
</template>
<script>
  import axios from 'axios'
  import slider from 'vue-concise-slider'
  import Dialog from '../Dialog/index'
  import apiConfig from '../../assets/js/api'
  export default {
    data() {
      return {
        msg: "Welcome to Your Vue.js App",
        showDialog: false,
        showtipDialog: false,
        username: '',
        password: '',
        flat: false,
        registerflat: true,
        tip: '',
        isLogin:'',
        pages: [{
            title: '',
            style: {
              background: 'url(../../assets/lb01.png)'
            }
          },
          {
            title: '',
            style: {
              background: 'url(../../assets/lb01.png)'
            }
          },
          {
            title: 'slide3',
            style: {
              background: '#4bbfc3',
            },
          }
        ]
      }
    },
    components: {
      Dialog
    },
    mounted(){
         this.isLogin = localStorage.getItem('user_id')?true:false;
    },
    methods: {
      withdraw() {
              localStorage.removeItem('user_id');
              this.isLogin = localStorage.getItem('user_id')?true:false;
      },
      close() {
        if (!this.showDialog) {
          this.showLoginDialog = true;
          this.showDialog = true;
        } else {
          this.showDialog = false;
        }

      },

      filterAll() {
        if (this.password.length < 5 || this.password.length > 12) {
          this.showtipDialog = true;
          this.tip = "密码长度要大于1且小于或等于11";
          return;
        } else {
          this.tip = " ";
          this.flat = true;
        }
        return this.flat;
      },
      login() {
        if (this.filterAll()) {
          console.log('用户信息录入成功！');
          axios({
              method: 'post',
              url: apiConfig.LOGIN,
              data: {
                username: this.username,
                password: this.password
              }
            }

          ).then(res => {
              if (res.data.code === "1000") {
                this.showtipDialog = true;
                this.tip = "用户名或者密码错误，请检查您的用户名或者密码！";
                return;
              } else {
                this.showtipDialog = false;
                this.showDialog = false;
                this.tip = "";
              let user = {
                        id:res.data[0]._id
                      }
              this.$store.commit('SET_USER_ID',user);
              localStorage.setItem("user_id",res.data[0]._id);
              this.isLogin = localStorage.getItem('user_id')?true:false;
              }
            }

          ).catch(err => {

            }

          );

        } else {
          this.showtipDialog = true;
          console.log('登录失败');
          return;
        }

      },
      handleClick(index) {
        if(index ==1 ){
        this.registerflat = false;
        }else{
        this.registerflat = true;
        }
      },
      register() {
        if (this.filterAll()) {
          console.log('用户注册成功！');
          axios({
              method: 'get',
              url: apiConfig.REGISTER,
              params: {
                username: this.username,
                password: this.password
              }
            }

          ).then(res => {

              if (res.data.code === "1000") {
                this.showtipDialog = true;
                this.tip = "用户名或者密码错误，请检查您的用户名或者密码！";
                return;
              } else if(res.data.code === "1001"){
                this.showtipDialog = true;
                this.tip = "用户名重复!";
                return;
              } else {
                this.showtipDialog = false;
                this.tip = "注册成功";
                this.registerflat = true;

              }
            }

          ).catch(err => {

            }

          );

        } else {
          this.showtipDialog = true;
          console.log('登录失败');
          return;
        }
      }
    },
    created() {}
  }

</script>
< !-- Add "scoped" attribute to limit CSS to this component only -->
  <style lang="less" scope>
    .Index {
      display: flex;
      flex-direction: column;
    }

    .header {
      padding: 0px 32px;
      background: linear-gradient(to bottom, azure, #8da1ff);
    }

    ul {
      display: flex;
      justify-content: space-between;
      flex-direction: row;
      align-items: center;
      height: 66px;


      li {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;
        background: hsla(227, 100%, 50%, 0.02);
        width: 14%;
        height: 100%;

        .i-img {
          width: 30px;
          height: 30px;
          background-size: 100% 100%;
          padding-bottom: 6px;
        }

        a {
          font-size: 18px;
          text-decoration: none;
          color: #fff;
        }
      }

    }

    .login-from {
      display: flex;
      flex-direction: column;
      justify-content: center;
      background: linear-gradient(to bottom, aliceblue, blue);
      width: 400px;
      height: 400px;
    }

    .title {
      color: #fff;
      margin-bottom: 8px;
    }

    .from {
      display: flex;
      justify-content: center;
      align-items: center;

      &:nth-of-type(4) {}

      margin-bottom: 16px;

      .botton-r,
      .botton-l {
        width: 220px;
        height: 30px;
        margin-left: 10px;
        line-height: 32px;
        border-radius: 16px;
        color: #fff;
      }
      .botton-l {
        background: linear-gradient(to bottom, #FFFFFF, blue);
      }
      .botton-r {
        background: linear-gradient(to bottom, #FFFFFF, #8A2BE2);
      }
      .register {
        color: #fff;
        text-decoration: underline;
      }

      input {
        width: 220px;
        height: 30px;
        border: none;
        border-radius: 2px;
        padding-left: 10px;
      }
    }

    .tip {
      color: red;
      margin: 4px 0;
    }

  </style>
