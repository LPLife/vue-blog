<template v-slot-footer>
<div v-bind:class="classObject">fgf</div>
</template>

<script>

export default {
  name: 'Page404',
  data() {
    return {
     isActive: true,
     error: null
    }
  },
  computed: {
    message() {
      return '网管说这个页面你不能进......'
    },
     classObject: function () {
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal'
    }
  }
  },
  mounted() {
    console.log(classObject);
  },
}
</script>

<style >
[v-cloak] {
  display: none;
}
</style>
