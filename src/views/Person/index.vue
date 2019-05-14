<template>
  <div class="mavonEditor">
    <div class="title">
	 <div class="title-name">标题</div>
	  <el-input placeholder="博客标题" v-model="title" @change="changTitle"></el-input>
    </div>
    <div>
      <mavon-editor :toolbars="markdownOption" v-model="handbook" ref=md @imgAdd="$imgAdd" @imgDel="$imgDel"  @save="saveMavon" />
    </div>
	<el-dialog
	title="提示"
	:visible.sync="dialogVisible"
	width="30%"
	>
	<span>{{tip}}</span>
	</el-dialog>

  </div>
</template>



<script>
import axios from 'axios';
import apiConfig from '../../assets/js/api'
import {time,updateLog} from '../../assets/js/utils'
export default {
  data() {
    return {
	  title:'',
	  tip:'',
	  dialogVisible: false,
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
      preview: true, // 预览
      },
      handbook: "#### how to use mavonEditor in nuxt.js"
    };
  },
  methods: {
		changTitle(title){
          console.log(title);
		},
	     $imgAdd(pos, $file){
            // 将图片上传到服务器.
           var formdata = new FormData();
           formdata.append('image', $file);
        //    axios({
        //        url: apiConfig.USER_BLOG_ARTICLE,
        //        method: 'post',
        //        data: formdata,
        //        headers: { 'Content-Type': 'multipart/form-data' },
        //    }).then((flag) => {
        //    })
		},
		  $imgDel(){

		  } ,
		  saveMavon(value,render){ 
          console.log("this is render"+render);
		  console.log("this is value"+value);
		  if(this.title === " " || this.title.length==0){
				this.tip = "博客标题不能为空！";
				this.dialogVisible =true;
				return 0;
		  }
		    axios({
			   method: 'post',
               url: apiConfig.USER_BLOG_ARTICLE,
               data: {
				   article:render,
				   date:time(),
				   user_id:localStorage.getItem('user_id'),
				   title:this.title
			   },
            //    headers: { 'Content-Type': 'multipart/form-data' },
           }).then(res => {
				res = res.data;
				console.log('dsf')
				// updateLog('上传博客');
        }).catch(err => {
            console.log('error')
        });
        },
  }
};
</script>

<style scoped lang="less">
.mavonEditor {
  width: 100%;
  height: 100%;
}
.title{
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