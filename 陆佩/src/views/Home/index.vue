<template>
  <div class="app-container">
    <div class="lunbo animated bounceInDown bounce delay-1s">
      <el-carousel :interval="6000" type="card" height="300px">
        <el-carousel-item v-for="item in picList" :key="item">
          <img :src='item'/>
        </el-carousel-item>
      </el-carousel>
    </div>
	<div class="content-wrap">
		<div class="recommmend">
		<div  class="content" v-for="(item, index) in blogList" :key="index" @click="detail(item)" v-if="index < 20" >
			<img src="../../assets/blog02.jpg" alt="">
			<div class="tip">{{item.title}}</div>
		</div>
		</div>
		<div class="intrduction-wrap">
			<div class="introduction">
				<div class="title">
						博主简介
				</div>
				<img src="../../assets/blog01.jpg" alt="">
				<div class="introduction-tip"><span>尼克·王尔德/Nick Wilde（赤狐）</span>
				要知道，最开始筹划这部电影时，制作方原本想让狐狸尼克作为动画的主角。如果用尼克这个人物做主线，恐怕电影一开始城市就已经崩塌了。他不喜欢这座‘动物托邦’。
				一只在动物城里以坑蒙拐骗为生的赤狐，儿时受到偏见的伤害，放弃了自己的理想。被朱迪设下圈套，被迫与她合作查案，而卷入意想不到的阴谋
				</div>
			</div>
			<div class="introduction">
				<div class="title">
					最新图片推荐
				</div>
				<div class="introduction-img">
			        <img  :src="item.url" alt="" v-for="(item, index) in imageList" :key="index" v-if="index < 6">
				</div>
			</div>
		</div>
	</div>
  </div>
</template>

<script>
	import axios from 'axios';
	import apiConfig from "../../assets/js/api";
	import { MessageBox, Indicator } from "mint-ui";
	import { time, updateLog } from "../../assets/js/utils";
  let part01 = require('../../assets/part_01.jpg'),
      part02 = require('../../assets/part_02.jpg'),
      part03 = require('../../assets/part_03.jpg'),
      part05 = require('../../assets/part_05.jpg');

  let part1 = require('../../assets/blog01.jpg'),
      part2 = require('../../assets/blog02.jpg'),
      part3 = require('../../assets/blog03.jpg');
  export default {
    data() {
      return {
				blogList: "",
       imageList: [],
        picList:[
          part01,
          part02,
          part03,
          part05,
	 ],
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
   recommendList:[
	   {
	   img:part1,
	   title: '我是怎么评价自己的'
	   },
	     {
	   img:part2,
	   title: '前端必备技能'
	   },
	     {
	   img:part3,
	   title: '我是怎么评价自己的'
	   },
	  {
	   img:part3,
	   title: '我是怎么评价自己的'
	   },
	   	     {
	   img:part2,
	   title: '前端必备技能'
	   },
	     {
	   img:part3,
	   title: '我是怎么评价自己的'
	   },
	  {
	   img:part3,
	   title: '我是怎么评价自己的'
	   },
	   	{
	   img:part3,
	   title: '我是怎么评价自己的'
	   }
   ],
   newImgList:[
	   {
		   url:part3
	   },
	   	{
		   url:part3
	   },
	   {
		   url:part2
	   },	
	   {
		   url:part1
	   },	 
	    {
		   url:part3
	   },	   
	   {
		   url:part3
	   }
   ]
        }
    },
    mounted() {
			this.getBlogList();
			this.imgeList();
    },
    methods: {
		//博客列表
    getBlogList() {
      axios({
        method: "get",
        url: apiConfig.USER_BLOG_LISTS,
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
		},
		    //获取图片列表
    imgeList() {
      axios({
        method: "get",
        url: apiConfig.USER_IMG_LIST,
        params: {
          user_id: localStorage.getItem("user_id")
        }
      })
        .then(res => {
          res = res.data;
          this.imageList = res;
          this.imageList.reverse();
          this.imageListLength = this.imageList.length;
          Indicator.close();
        })
        .catch(err => {
          Indicator.close();
        });
    }
    }
  }

</script>
<style lang="less">
 .lunbo {
  margin: 16px 0;
  overflow: hidden;
 }
 img{
  height: 100%;
  width: 100%;
 }
 .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  .content-wrap {
	  display: flex;
		flex-direction: row;
		justify-content: center;
  }
  .intrduction-wrap {
	  flex: 1;
	  display: flex;
    flex-direction: column;
  }
  .introduction {
	  background: #fff;
	  overflow: hidden;
	  border: 1px solid #ddd;
		margin-bottom: 16px;
		margin-right: 16px;
	  .title {
		color: black;
		font-weight: bold;
		font-size: 14px;
		line-height: 30px;
		background: #f8f8f8;
		border-bottom: 1px solid #ddd;
		text-align: left;
	  }
	  img {
		  width: 100px;
		  height: 100px;
		  border-radius: 5px;
		  float: left;
		  padding-left: 4px;
	  }
	  .introduction-tip {
		 padding: 4px 8px;
		  span {
			  font-weight: bold;
		  }
	  }
	  .introduction-img {
		  padding: 6px;
		  display: flex;
		  flex-direction: row;
		  justify-content: space-around;
		  flex-wrap: wrap;
		  align-items: center;
		  img {
		  width: 100px;
		  height: 100px;
		  margin: 4px;
		  }

	  }
  }
  .recommmend {
	  display: flex;
    flex-direction: row;
	  justify-content:space-around;
	  align-items: center;
	  flex-wrap: wrap;
	  width: 70%;
	  .content {
		  display: flex;
		  flex-direction: row;
		  justify-content: center;
		  align-items: center;
		  margin-bottom: 8px;
		  background: #fff;
		  margin-left: 2px;
		  padding: 8px;
		  border: 1px solid #ddd;
		  .tip {
			  width: 200px;
			  padding: 0 2px;
			  color: #333;
			  font-size: 14px;
			  background: #fff;
		  }
		  img {
			  display: block;
			  width: 180px;
			  height: 162px;
		  }
	  }
  }
</style>


