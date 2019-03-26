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
    <router-view/>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        msg: "Welcome to Your Vue.js App"
      };
    }
  };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
