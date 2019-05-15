<template>
  <div class="app-container">
      <div class="whitebg lanmu">
         <img src="../../assets/lm01.jpg">
         <h1>个人博客日记</h1>
         <p>向往诗和远方！</p>
      </div>
   <section>
       <div class="article" v-for="(item, index) in blogList" :key="index">
            <div class="article-title">{{item.title}}</div>
            <div class="des" v-html="item.data"></div>
            <div class="date">{{item.upload_date}}</div>  
        </div>
    </section> 
  </div>
</template>

<script>
  import axios from 'axios'
  import apiConfig from '../../assets/js/api'

  export default {
    data() {
      return {
          blogList:'',
          show:false
      }
    },
    mounted() {
      this.getBlogList();
    },
    methods: {
     //博客列表
     getBlogList(){
        axios({
          method: 'get',
          url: apiConfig.USER_BLOG_LIST,
          params: {
             user_id:localStorage.getItem('user_id'),
          }
        }).then(res => {
          if(res.data.code === '1000'){
              this.show = true;
          }else{
          this.blogList = res.data;
		  this.blogList.reverse();
		  console.log(this.msgList);
          }
        }).catch(err => {
         console.log('error')
        });
	 }, 
    }
  }

</script>
<style lang="less" scoped>
.whitebg {
    background: #fff;
    border-radius: 3px;
    padding: 20px;
    margin-bottom: 20px;
    overflow: hidden;
}
.lanmu img {
    height: 100px;
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
</style>
