<template>
  <div class="app-container">
    <div class="whitebg lanmu">
      <img src="../../assets/lm01.jpg">
      <h1>个人博客日记</h1>
      <p>向往诗和远方！</p>
    </div>
    <section>
      <div class="new-blog">最新博文</div>
      <div class="article" v-for="(item, index) in blogList" :key="index">
        <div class="article-title">{{item.title}}</div>
        <div class="article_content">
          <img class="article_p" src="../../assets/part_06.jpg">
          <div class="description">
            <div class="des" v-html="item.data"></div>
            <!-- <div class="date">{{item.upload_date}}</div> -->
          </div>
        </div>
        <div class="operation">
          <span class="more" @click="detail(item)">查看更多</span>
          <span class="date">{{item.upload_date}}</span>
          <span v-if="user_id !==''" @click="editBlog(item)">编辑</span>
          <span v-if="user_id !==''" @click="deleteBlog(item)">删除</span>
        </div>
      </div>
    </section>
    <!-- <div></div> -->
  </div>
</template>

<script>
import axios from "axios";
import apiConfig from "../../assets/js/api";
import { MessageBox, Indicator } from "mint-ui";
import { time, updateLog } from "../../assets/js/utils";
export default {
  data() {
    return {
      blogList: "",
      show: false,
      user_id: ""
    };
  },
  mounted() {
    Indicator.open({
      text: "Loading...",
      spinnerType: "fading-circle"
    });
    if (localStorage.getItem("user_id")) {
      this.user_id = localStorage.getItem("user_id");
    }
    this.getBlogList();
  },
  methods: {
    // 查看详情
    detail(item) {
      this.$router.push({
        path: "/detail",
        query: {
          item: JSON.stringify(item)
        }
      });
      return;
    },
    //编辑博文
    editBlog(item) {
      this.$router.push({
        path: "/Edit",
        query: {
          item: JSON.stringify(item)
        }
      });
      return;
    },
    //删除博客
    deleteBlog(item) {
      MessageBox.confirm("确定要删除这篇博文吗?").then(action => {
        axios({
          method: "post",
          url: apiConfig.USER_BLOG_DELETE,
          data: {
            _id: item._id,
            message: item.message
          }
        })
          .then(res => {
            res = res.data;
            this.getBlogList();
            Toast("删除成功！");
            updateLog("删除博客");
          })
          .catch(err => {
            console.log("error");
          });
      });
    },
    //博客列表
    getBlogList() {
      axios({
        method: "get",
        url: this.user_id
          ? apiConfig.USER_BLOG_LIST
          : apiConfig.USER_BLOG_LISTS,
        params: {
          user_id: this.user_id
        }
      })
        .then(res => {
          if (res.data.code === "1000") {
            this.show = true;
          } else {
            this.blogList = res.data;
            this.blogList.reverse();
          }
          Indicator.close();
        })
        .catch(err => {
          console.log("error");
        });
    }
  }
};
</script>
<style lang="less" scoped>
section {
  background-color: lemonchiffon;
  padding: 32px 20px;
  .new-blog {
    font-size: 16px;
    border-bottom: 1px solid #eee;
    color: #484848;
    text-align: left;
    padding: 16px 8px 0;
    &:after {
      content: "";
      position: absolute;
      width: 60px;
      height: 2px;
      background: #000;
      display: block;
    }
  }
  .article {
    padding: 32px 20px;
    border-bottom: 2px dashed #eee;
    .article-title {
      text-align: left;
      margin: 16px 0;
      font-size: 30px;
      font-weight: bold;
    }
    .article_p {
    }
  }
  .article_content {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    .article_p {
      width: 236px;
      height: 188px;
    }
    .description {
      flex: 1;
    }
  }
}
.whitebg {
  background: #fff;
  border-radius: 3px;
  padding: 20px;
  margin-bottom: 20px;
  overflow: hidden;
}
.lanmu img {
  width: 236px;
  height: 180px;
  float: left;
  margin-right: 20px;
}
.lanmu h1 {
  font-size: 22px;
  margin-bottom: 15px;
}
.lanmu p {
  color: #666;
}
.description {
  .des {
    height: 210px;
    text-overflow: ellipsis;
    overflow: hidden;
    line-height: 30px;
    padding: 4px;
  }
  .date {
  }
}
.detail {
  .more {
    padding-left: 10px;
    text-decoration: underline;
  }
}
.operation {
  margin: 10px 0;
  float: right;
  .date {
    text-decoration: none;
  }
  span {
    text-decoration: underline;
  }
}
</style>
