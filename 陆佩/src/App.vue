<template>
  <div id="app" :style="{ minHeight: windowHeight +'px'}">
    <Index></Index>
  </div>
</template>

<script>
  import Index from './views/Index/index'
  export default {
    name: 'App',
    data() {
      return {
        windowHeight:''
      }
    },
    methods: {},
    components: {
      Index
    },
    mounted() {
       this.windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    },
  }

</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    min-width: 1200px;
  }
  .mint-toast{
      z-index: 10000000000;
  }
</style>
