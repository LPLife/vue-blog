<template>
  <div class="hello">
    <img src="../assets/logo.png">
    <div>
      <router-link to="/means">想法</router-link>
      <router-link to="/person">个人</router-link>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: "HelloWorld",
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
