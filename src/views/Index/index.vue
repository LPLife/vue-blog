<template>
  <div class="Index">
    <ul>
      <li class="home"><img src="../../assets/home.png" class="i-img">
        <router-link to="/Home">首页</router-link>
      </li>
      <li>
      <li class="home"><img src="../../assets/home.png" class="i-img">
        <router-link to="/Blog">博客日记</router-link>
      </li>
      <li>
      <li class="home"><img src="../../assets/home.png" class="i-img">
        <router-link to="/Photo">相册管理</router-link>
      </li>
      <li>
      <li class="home"><img src="../../assets/home.png" class="i-img">
        <router-link to="/Note">留言板</router-link>
      </li>
      <li>
      <li class="home"><img src="../../assets/home.png" class="i-img">
        <router-link to="/Time">时间轴</router-link>
      </li>
      <li>
      <li class="home"><img src="../../assets/home.png" class="i-img">
        <router-link to="/Person">关于我</router-link>
      </li>
      <li>
      <li class="home"><img src="../../assets/home.png" class="i-img">
        <router-link to="/Person">登录</router-link>
      </li>
    </ul>
    <router-view />
  </div>
</template>
<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        msg: "Welcome to Your Vue.js App"
      }

      ;
    }

    ,
    created() {
      console.log(1);
      //get请求

      axios({

          method: 'GET',
          url: 'http://localhost:8888/api/user',
          params: {
            age: 1
          }

          ,
          dataType: 'json'
        }

      ).then(res => {
          console.log(res);
        }

      ).catch(err => {}

      ) //post请求

      axios({

          method: 'post',
          url: 'http://localhost:8888/api/delete',
          data: {
            name: 'lihua',
            age: '45'
          }
        }

      ).then(res => {
          console.log(res);

        }

      ).catch(err => {}

      );
    }
  }

  ;

</script>
< !-- Add "scoped" attribute to limit CSS to this component only -->
  <style lang="less" scope>
    .Index {
      padding: 0 32px;
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

  </style>
