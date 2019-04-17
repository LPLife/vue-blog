<template>
  <div class="dialog" v-if="showDialog">
    <img class="close-img" src="../../assets/close.png" @click="close">
    <slot name="login"></slot>
    <slot name="tip"></slot>

  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        showDialog: true
      }
    },
    methods: {
      close() {
        this.showDialog = false;
      }
    },
    mounted() {

    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .dialog {
    box-sizing: border-box;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    width: 100%;
    bottom: 0;
    top: 0;
    z-index: 6666;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }

  .close-img {
    height: 20px;
    width: 20px;
    position: relative;
    top: 20px;
    left: 190px;
  }

</style>
