<template>
  <div class="time">
    <div class="title">{{items.title}}</div>
    <div class="markdown-body" v-html="items.data"></div>
    <Note :blogId="items._id"></Note>
  </div>
</template>
<script>
import axios from "axios";
import apiConfig from "../../assets/js/api";
import { MessageBox, Toast, Indicator } from "mint-ui";
import Note from "../Note/index";
export default {
  data() {
    return {
      items: []
    };
  },
  components: {
    Note
  },
  created() {
    let items = this.$router.history.current.query.item
      ? this.$router.history.current.query.item
      : "";
    if (items) {
      this.items = JSON.parse(items);
      this.handbook = this.items.original;
      console.log(this.handbook);
      this.title = this.items.title;
      console.log(this.items.message);
    }
  },
  mounted() {
    // Indicator.open({
    //   text: "Loading...",
    //   spinnerType: "fading-circle"
    // });
    // Indicator.close();
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.markdown-body {
  text-align: left;
  margin: 10px;
  line-height: 30px;
  .p {
    text-align: left !important;
  }
}
.time {
  .title {
    margin: 16px;
  }
}


</style>
