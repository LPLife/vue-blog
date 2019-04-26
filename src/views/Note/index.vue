<template>
  <div class="note">
         Means
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted(){
    axios({
    method: 'post',
    url: 'http://xiny.wh66.cn/api/help/index',
    data: {
        token: ''
    }
}).then(res => {
    res = res.data;
    console.log(res);
}).catch(err => {

});
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
