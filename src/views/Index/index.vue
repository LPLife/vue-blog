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
        <li class="home" @click="close()"><img src="../../assets/icon07.png" class="i-img">
          登录
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
          <label>姓名：</label>
          <input type="text" v-model="username">
        </div>
        <div class="from">
          <label>密码：</label>
          <input type="text" v-model="password">
        </div>
        <div class="from">
          <div class="botton" @click="login()">
            登录
          </div>
          <div class="botton">
            注册
          </div>
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

  export default {
    data() {
      return {
        msg: "Welcome to Your Vue.js App",
        showDialog: false,
        showtipDialog: false,
        username: '',
        password: '',
        flat: false,
        tip: '',
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
    methods: {
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
              url: 'http://localhost:8080/api/user/login',
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
    created() {
    }
  }

</script>
< !-- Add "scoped" attribute to limit CSS to this component only -->
  <style lang="less" scope>
    .Index {
      display: flex;
      flex-direction: column;
    }

    .header {
      padding: 8px 32px;
      background: linear-gradient(to bottom, azure, #6883ff);
    }

    ul {
      display: flex;
      justify-content: space-between;
      flex-direction: row;
      align-items: center;
      height: 50px;


      li {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;

        &:nth-of-type(1) {
          img {
            width: 50px;
            height: 40px;
          }
        }

        .i-img {
          width: 30px;
          height: 30px;
          background-size: 100% 100%;
          margin: 8px 0;
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
      margin-bottom: 8px;
    }

    .from {
      display: flex;
      justify-content: center;
      align-items: center;

      &:nth-of-type(4) {}

      margin-bottom: 16px;

      .botton {
        width: 100px;
        height: 32px;
        margin-left: 10px;
        line-height: 32px;
        background: aliceblue;
        border-radius: 16px;
      }

      input {
        width: 160px;
        height: 20px;
        outline: orange;
      }
    }

    .tip {
      color: red;
      margin: 4px 0;
    }

  </style>
