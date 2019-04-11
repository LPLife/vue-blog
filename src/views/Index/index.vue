<template>
  <div class="Index">
    <ul>
      <li>
        <router-link to="/Home">首页</router-link>
      </li>
      <li>
        <router-link to="/Blog">博客日记</router-link>
      </li>
      <li>
        <router-link to="/Photo">相册管理</router-link>
      </li>
      <li>
        <router-link to="/Note">留言板</router-link>
      </li>
      <li>
        <router-link to="/Time">时间轴</router-link>
      </li>
      <li>
        <router-link to="/Person">关于我</router-link>
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
      };
    },
    created() {
        console.log(1);
        //get请求

        axios({
          method: 'GET',
          url: 'http://localhost:8888/api/user',
          params:{age:1},
          dataType: 'json'
        }).then(res => {
          console.log(res);
        }).catch(err => {

        })
        //post请求
        axios({
          method: 'post',
          url: 'http://localhost:8888/api/delete',
          data: {
            name: 'lihua',
            age: '45'
          }
        }).then(res => {
          console.log(res);
   
        }).catch(err => {

        });
    }
  };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
