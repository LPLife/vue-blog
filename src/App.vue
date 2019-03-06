<template>
  <div id="app">
    <img src="./assets/logo.png">
    <p>
      <router-link to="/Foo">Go</router-link>
      <router-link to="/Bar">bar</router-link>
    </p>
    <router-view/>
    <div @click="handle()">fdgdfg</div>
  </div>
</template>

<script>
  export default {
    name: 'App',
    methods: {
      handle() {
           router.go()('./Foo')
      }
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
    margin-top: 60px;
  }
</style>
