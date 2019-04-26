<template>
  <div class="photo">
        Foos
        <textarea rows="6" id="myAddress" type="text" placeholder="请输入你要对他说的话,
例如：我爱你"></textarea>
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

textarea{
width: 400px;
}

</style>
