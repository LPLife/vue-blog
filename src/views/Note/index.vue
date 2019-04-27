<template>
  <div class="note">
         Means
         <h1 class="animated infinite bounce delay-2s">Example</h1>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted(){
      let data = {
				id:1,
				type:1,
				page:2,
				token:'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC93d3cud2lzaC5jb21cL2FwaVwvbG9naW4iLCJpYXQiOjE1NTQ2MTIwMTgsImV4cCI6MTU1NDYxNTYxOCwibmJmIjoxNTU0NjEyMDE4LCJqdGkiOiJVZWhwZGZoOGtmWUd4MlQyIiwic3ViIjoyLCJwcnYiOiIxYmI0NTcxN2IzMzA3NDk1ZjU5NWQ3OThlZTcwNGE1MGZkMjk0YjAzIn0.TQckL21OZfr-MhXoYZj60i7QHMgne36FdlFus3MlbdE'
				};
				axios({
			method: 'post',
			url: 'http://xiny.wh66.cn/api/register',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
			data: {
				mobile:'18742073873',
				password: '123456',
				password_confirmation:'123456',
				code:'456764'
			}
			}).then(res => {
			res = res.data;
			console.log(res);
			}).catch(err => {

			});
    axios({
    method: 'post',
    url: 'http://xiny.wh66.cn/api/comment/index',
     headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
   data: data
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
