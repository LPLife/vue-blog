<template>
  <div class="Index">

    <div class="header">
      <ul>
        <li class="home"><img src="../../assets/icon08.png" class="i-img"></li>
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
      <div slot="login" class="login-from">
        <div class="title">
          欢迎登陆
        </div>
        <div class="from">
          <label>姓名：</label>
          <input type="text" name="username" id="">
        </div>
        <div class="from">
          <label>密码：</label>
          <input type="text" name="password" id="">
        </div>
        <div class="from">
          <div class="botton">
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
          this.showDialog = true;
        } else {
          this.showDialog = false;
        }

      }
    },
    created() {
      console.log(1);
      //get请求
      // axios({

      //     method: 'GET',
      //     url: 'http://localhost:8888/api/user',
      //     params: {
      //       age: 1
      //     }

      //     ,
      //     dataType: 'json'
      //   }

      // ).then(res => {
      //     console.log(res);
      //   }

      // ).catch(err => {}

      // ) 
      //post请求

      // axios({

      //     method: 'post',
      //     url: 'http://localhost:8888/api/delete',
      //     data: {
      //       name: 'lihua',
      //       age: '45'
      //     }
      //   }

      // ).then(res => {
      //     console.log(res);

      //   }

      // ).catch(err => {

      // }

      // );
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
      background-color: azure;
    }

    ul {
      display: flex;
      justify-content: space-between;
      flex-direction: row;
      align-items: center;
      height: 40px;


      li {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        &:nth-of-type(1) {
          img {
            width: 50px;
            height: 40px;
          }
        }

        .i-img {
          width: 20px;
          height: 20px;
          background-size: 100% 100%;
          margin-bottom: 2px;
        }

        a {
          font-size: 14px;
          text-decoration: none;
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
      margin-bottom: 16px;
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

  </style>
