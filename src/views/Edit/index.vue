<template>
  <div class="mavonEditor">
    <div class="title">
      <div class="title-name">标题</div>
      <el-input placeholder="博客标题" v-model="title" @change="changTitle"></el-input>
    </div>
    <div>
      <mavon-editor
        :ishljs="true"
        :toolbars="markdownOption"
        v-model="handbook"
        ref="md"
        @imgAdd="$imgAdd"
        @imgDel="$imgDel"
        @save="saveMavon"
      />
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>{{tip}}</span>
    </el-dialog>
  </div>
</template>



<script>
import axios from "axios";
import apiConfig from "../../assets/js/api";
import { time, updateLog, getQueryFromUrl } from "../../assets/js/utils";
import { MessageBox, Toast } from "mint-ui";
export default {
  data() {
    return {
      title: "",
      tip: "",
      dialogVisible: false,
      item: "",
      user_id: "",
      markdownOption: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true // 预览
      },
      handbook: ""
    };
  },
  created() {
    let item = this.$router.history.current.query.item
      ? this.$router.history.current.query.item
      : "";
    if (item) {
      this.item = JSON.parse(item);
      this.handbook = this.item.original;
      this.title = this.item.title;
    }
  },
  mounted() {
     this.user_id = localStorage.getItem("user_id");
  },
  methods: {
    changTitle(title) {},
    $imgAdd(pos, $file) {
      // 将图片上传到服务器.
      var formdata = new FormData();
      formdata.append("image", $file);
    },
    $imgDel() {},
    saveMavon(value, render) {
      console.log(this.user_id);
      if(this.user_id=== null){
        this.tip = "上传失败，请先登录！";
        this.dialogVisible = true;
        return 0;
      }
      if (this.title === " " || this.title.length == 0) {
        this.tip = "博客标题不能为空！";
        this.dialogVisible = true;
        return 0;
      }
      MessageBox.confirm("确定要上传这篇博文吗?").then(action => {
        let formdata = {
          article: render,
          date: time(),
          title: this.title,
          original: value
        };
        if(this.user_id){
          formdata.user_id = this.user_id;
        }else {
              Toast("上传失败，请先登录！");
              return 0;
        }
        let url = apiConfig.USER_BLOG_ARTICLE;
        if (this.item) {
          formdata._id = this.item._id;
          url = apiConfig.USER_BLOG_UPDATE;
        }
        axios({
          method: "post",
          url: url,
          data: formdata
        })
          .then(res => {
            res = res.data;
            updateLog("上传博客");
            this.handbook = "";
            this.title = "";
            if (this.item) {
              Toast("修改成功");
            } else {
              Toast("上传成功");
            }
          })
          .catch(err => {
            console.log("error");
          });
      });
    }
  }
};
</script>

<style scoped lang="less">
.mavonEditor {
  width: 100%;
  height: 100%;
}
.title {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 8px;
  .title-name {
    width: 100px;
  }
}
</style>