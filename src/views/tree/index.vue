<template>
  <div class="app-container">
  </div>
</template>

<script>
export default {
  data() {
    return {
      }
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },
  methods: {

  }
}
</script>

