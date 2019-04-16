<template>
  <div class="login">
    login
    <Dialog v-if="showDialog">
      <div slot="login" class="login-from" @click="close()">
        <div>
          欢迎登陆
        </div>
        <div class="from">
          <label>姓名</label>
          <input type="text" name="username" id="">
        </div>
        <div class="from">
          <label>密码</label>
          <input type="text" name="password" id="">
        </div>
        <div class="from">
          <div class="botton">
            登录
          </div>
        </div>
      </div>
    </Dialog>

  </div>
</template>

<script>
  import Dialog from '../Dialog/index'
  export default {
    name: 'HelloWorld',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        showDialog: true
      }
    },
    components: {
      Dialog: Dialog
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
    mounted: {

    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">


  .login {
    display: flex;
    flex-direction: column;
    justify-content: center;

  }
  .from {
    .botton {
      width: 286px;
      height: 88px;
      background: linear-gradient(to right, red , blue); 
    }
  }

</style>
