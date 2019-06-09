<template>
  <div class="note">
    <div class="addMessage" @click="add()">添加留言</div>
    <div class="content" v-if="show">
      <textarea rows="3" cols="50" src="note-tip" v-model="message" @change="dealTip(message)"></textarea>
      <div class="btn-from">
        <div class="sure" @click="handleClick">确定</div>
      </div>
    </div>
    <div class="msg" v-if="msgList.length > 0">
      <div class="wrap" v-for="(item,index) in msgList" :key="index">
        <div class="msg-title">{{item.message}}（{{item.upload_date}}）</div>
        <div class="delete">
          <span @click="deleteNote(item)">删除</span>
          <span>回复</span>
        </div>
      </div>
    </div>
    <div class="msg" v-if="msgList.length == 0">暂时无数据</div>
  </div>
</template>

<script>
import axios from "axios";
import apiConfig from "../../assets/js/api";
import { time, updateLog } from "../../assets/js/utils";
import { Toast, Indicator } from "mint-ui";
export default {
  name: "HelloWorld",
  props: ["blogId"],
  data() {
    return {
      msgList: [],
      message: "",
      show: ""
    };
  },
  mounted() {
    this.show = false;
    Indicator.open({
      text: "Loading...",
      spinnerType: "fading-circle"
    });
    this.getNoteList();
  },

  methods: {
    add() {
      this.show = true;
    },
    deleteNote(item) {
      axios({
        method: "post",
        url: apiConfig.USER_NOTE_DELETE,
        data: {
          _id: item._id,
          message: item.message
        }
      })
        .then(res => {
          res = res.data;
          this.getNoteList();
          Toast("删除留言成功！");
          updateLog("删除留言");
        })
        .catch(err => {
          console.log("error");
        });
    },
    // 留言
    handleClick() {
      if (this.message.length == 0 || this.message === " ") {
        Toast("留言不能为空！");
        return;
      }
      let data = {
        message: this.message,
        upload_date: time()
      };
      if (this.blogId) {
        data.blog_id = this.blogId;
      } else {
        data.user_id = localStorage.getItem("user_id");
      }
      axios({
        method: "post",
        url: apiConfig.USER_NOTE_ADD,
        data: data
      })
        .then(res => {
          res = res.data;
          this.getNoteList();
          this.message = "";
          Toast("留言成功！");
          updateLog("留言");
          this.show = false;
        })
        .catch(err => {
          console.log("error");
        });
    },
    //留言列表
    getNoteList() {
      let data = {};
      if (this.blogId) {
        data.blog_id = this.blogId;
      } else {
        data.user_id = localStorage.getItem("user_id");
      }
      axios({
        method: "get",
        url: apiConfig.USER_NOTE,
        params: data
      })
        .then(res => {
          if (res.data.code === "1000") {
          } else {
            this.msgList = res.data;
            this.msgList.reverse();
          }
          Indicator.close();
        })
        .catch(err => {
          console.log("error");
        });
    },
    dealTip(message) {}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.activeClass {
  color: blue;
}
.errorClass {
  color: red;
}
.wrap {
  height: auto;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  color: #333;
  display: flex;
  font-size: 16px;
  padding: 16px 8px;
  margin: 32px 0;
}
.content {
  margin: 32px;
}
.delete {
  span {
    text-decoration-line: underline;
    margin-right: 10px;
  }
}
.addMessage {
  margin:  32px;
}
</style>>

