<template>
  <div class="Index">
    <div class="header">
      <ul>
        <li class="home">
          <img
            :src="length == 1 ? require('../../assets/icon001.png'):require('../../assets/icon01.png')"
            class="i-img"
          >
          <span
            @click="handleRouterClick(1)"
            v-bind:class="[length == 1 ? 'activeClass' : 'unactiveClass']"
          >
            <router-link to="/Home">首页</router-link>
          </span>
        </li>
        <li></li>
        <li class="home">
          <img
            :src="length == 2 ? require('../../assets/icon002.png'):require('../../assets/icon02.png')"
            class="i-img"
          >
          <span
            @click="handleRouterClick(2)"
            v-bind:class="[length == 2 ? 'activeClass' : 'unactiveClass']"
          >
            <router-link to="/Blog" @click="handleRouterClick(2)">博客日记</router-link>
          </span>
        </li>
        <li></li>
        <li class="home">
          <img
            :src="length == 3 ? require('../../assets/icon003.png'):require('../../assets/icon03.png')"
            class="i-img"
          >
          <span
            @click="handleRouterClick(3)"
            v-bind:class="[length == 3 ? 'activeClass' : 'unactiveClass']"
          >
            <router-link to="/Photo">相册管理</router-link>
          </span>
        </li>
        <li></li>
        <li class="home">
          <img
            :src="length == 4 ? require('../../assets/icon004.png'):require('../../assets/icon04.png')"
            class="i-img"
          >
          <span
            @click="handleRouterClick(4)"
            v-bind:class="[length == 4 ? 'activeClass' : 'unactiveClass']"
          >
            <router-link to="/Note">留言板</router-link>
          </span>
        </li>
        <li></li>
        <li class="home">
          <img
            :src="length == 5 ? require('../../assets/icon005.png'):require('../../assets/icon05.png')"
            class="i-img"
          >
          <span
            @click="handleRouterClick(5)"
            v-bind:class="[length == 5 ? 'activeClass' : 'unactiveClass']"
          >
            <router-link to="/Time">个人日志</router-link>
          </span>
        </li>
        <li></li>
        <li class="home">
          <img
            :src="length == 6 ? require('../../assets/icon006.png'):require('../../assets/icon06.png')"
            class="i-img"
          >
          <span
            @click="handleRouterClick(6)"
            v-bind:class="[length == 6 ? 'activeClass' : 'unactiveClass']"
          >
            <router-link to="/Edit">写博客</router-link>
          </span>
        </li>
        <li></li>
        <li class="home" @click="close()" v-if="!isLogin">
          <img src="../../assets/icon07.png" class="i-img">
          <span
            @click="handleRouterClick(7)"
            v-bind:class="[length == 7 ? 'activeClass' : 'unactiveClass']"
          >登录</span>
        </li>
        <li class="home" @click="withdraw()" v-if="isLogin">
          <img src="../../assets/icon007.png" class="i-img">
          <span
            @click="handleRouterClick(8)"
            v-bind:class="[length == 8 ? 'activeClass' : 'unactiveClass']"
          >注销</span>
        </li>
      </ul>
    </div>
    <Dialog v-if="showDialog">
      <div slot="login" class="login-from" v-if="showLoginDialog">
        <div class="title">欢迎登陆</div>
        <div class="from">
          <input type="text" v-model="username" placeholder="用户名">
        </div>
        <div class="from">
          <input type="text" v-model="password" placeholder="密码">
        </div>
        <div class="from" v-if="registerflat">
          <div class="botton-r" @click="login()">登录</div>
        </div>
        <div class="from" v-if="!registerflat">
          <div class="botton-l" @click="register()">注册</div>
        </div>
        <div class="from">
          <a @click="handleClick(1)" class="register" v-if="registerflat">还没注册 ？</a>
          <a @click="handleClick(2)" class="register" v-if="!registerflat">去登录 ？</a>
        </div>
      </div>
    </Dialog>
    <router-view/>
  </div>
</template>
<script>
import axios from "axios";
import slider from "vue-concise-slider";
import Dialog from "../Dialog/index";
import apiConfig from "../../assets/js/api";
import { updateLog } from "../../assets/js/utils";
import { Toast } from "mint-ui";
import md5 from "js-md5";
export default {
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      showDialog: false,
      username: "",
      password: "",
      flat: false,
      registerflat: true,
      isLogin: "",
      length: 9,
      pages: [
        {
          title: "",
          style: {
            background: "url(../../assets/lb01.png)"
          }
        },
        {
          title: "",
          style: {
            background: "url(../../assets/lb01.png)"
          }
        },
        {
          title: "slide3",
          style: {
            background: "#4bbfc3"
          }
        }
      ]
    };
  },
  components: {
    Dialog
  },
  mounted() {
    this.isLogin = localStorage.getItem("user_id") ? true : false;
  },
  methods: {
    handleRouterClick(index) {
      this.length = index;
      if(index == 8){
      this.$router.push({
        path: "/Home"
      });
      }
    },
    withdraw() {
      updateLog("退出网站");
      localStorage.removeItem("user_id");
      this.isLogin = localStorage.getItem("user_id") ? true : false;
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
      if (this.username.length == 0 || this.username === "") {
        Toast({
          message: "昵称不能为空",
          className: "tip"
        });
        return;
      }
      if (this.password.length == 0 || this.password === "") {
        Toast({
          message: "密码不能为空",
          className: "tip"
        });
        return;
      }
      if (this.password.length < 5 || this.password.length > 12) {
        Toast({
          message: "密码长度要大于1且小于或等于11",
          className: "tip"
        });
        return;
      } else {
        this.flat = true;
      }
      return this.flat;
    },
    login() {
      if (this.filterAll()) {
        axios({
          method: "post",
          url: apiConfig.LOGIN,
          data: {
            username: this.username,
            password: this.password
          }
        })
          .then(res => {
            if (res.data.code === "1000") {
              Toast({
                message: "用户名或者密码错误，请检查您的用户名或者密码",
                className: "tip"
              });
              return;
            } else {
              this.showDialog = false;
              let user = {
                id: res.data[0]._id
              };
              this.$store.commit("SET_USER_ID", user);
              localStorage.setItem("user_id", res.data[0]._id);
              this.isLogin = localStorage.getItem("user_id") ? true : false;
              updateLog("登录网站");
              this.$router.push({
                path: "/Home"
              });
            }
          })
          .catch(err => {});
      } else {
        return;
      }
    },
    handleClick(index) {
      if (index == 1) {
        this.registerflat = false;
      } else {
        this.registerflat = true;
      }
    },
    register() {
      if (this.filterAll()) {
        axios({
          method: "get",
          url: apiConfig.REGISTER,
          params: {
            username: this.username,
            password: this.password
          }
        })
          .then(res => {
            if (res.data.code === "1000") {
              Toast({
                message: "用户名或者密码错误，请检查您的用户名或者密码！",
                className: "tip"
              });
              return;
            } else if (res.data.code === "1001") {
              Toast({
                message: "用户名重复！",
                className: "tip"
              });
              return;
            } else {
              Toast({
                message: "注册成功",
                className: "succTip"
              });
              this.registerflat = true;
            }
          })
          .catch(err => {});
      } else {
        return;
      }
    }
  },
  created() {}
};
</script>
< !-- Add "scoped" attribute to limit CSS to this component only -->
  <style lang="less">
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

  &:nth-of-type(4) {
  }

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
    background: linear-gradient(to bottom, #ffffff, blue);
  }
  .botton-r {
    background: linear-gradient(to bottom, #ffffff, #8a2be2);
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
  font-weight: bold;
  margin: 4px 0;
  background: #8da1ff;
}
.succTip {
  color: blue;
  font-weight: bold;
  margin: 4px 0;
}

.activeClass {
  color: blue !important;
  a {
    color: blue !important;
  }
}
.unactiveClass {
  a {
    color: #fff !important;
  }
  color: #fff !important;
}
</style>
