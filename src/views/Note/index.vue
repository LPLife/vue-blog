<template>
  <div class="note">
    <div class="content">
      <p v-bind:class="[message.length !==0 ? 'activeClass' : 'errorClass']">
        {{tip}}
      </p>
         <textarea rows="3" cols="50" src="note-tip" v-model="message" @change="dealTip(message)"> </textarea>
         <div class="btn-from">
             <div class="sure" @click="handleClick">
                 确定
             </div>
         </div>
    </div>
	<div class="msg">
		<div class="wrap" v-for="(item,index) in msgList" :key="index">
			<div class="msg-title">
					dfd : {{item.message}}（{{item.upload_date}}）
			</div>
			<div class="delete">
                  <!-- <a @click="deleteNote(item)">删除</a> -->
                  <a>回复</a>
			</div>
		  </div>
	</div>
  </div>
</template>

<script>
  import axios from 'axios'
  import apiConfig from '../../assets/js/api'
  import {time,updateLog} from '../../assets/js/utils'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msgList: [],
      message:'',
      tip:''
    }
  },
  mounted(){
	  this.getNoteList();
  },
  methods:{
   
     deleteNote(item){
		 console.log(item)
        axios({
          method: 'post',
          url: apiConfig.USER_NOTE_DELETE,
          data: {
			id:`ObjectId("${item._id}")`,
			message:item.message
          }
        }).then(res => {
          res = res.data;
		  this.msgList();
		  
          updateLog('删除留言');
        }).catch(err => {
         console.log('error')
        });
    },
    // 留言
    handleClick() {
        if(this.message.length == 0 || this.message ===" "){
		  this.tip = "留言不能为空！";
		setTimeout(() => {
        this.tip = "";			
		}, 1000);
          return;
		}else{
			this.tip = "留言成功！";
		}
		setTimeout(() => {
        this.tip = "";			
		}, 1000);
        axios({
          method: 'post',
          url: apiConfig.USER_NOTE_ADD,
          data: {
            message:this.message,
            user_id:localStorage.getItem('user_id'),
            upload_date:time()
          }
        }).then(res => {
		  res = res.data;
          this.getNoteList();
          this.message = "";
          updateLog('留言');
        }).catch(err => {
         console.log('error')
        });
      
    },
    //留言列表
     getNoteList(){
        axios({
          method: 'get',
          url: apiConfig.USER_NOTE,
          params: {
             user_id:localStorage.getItem('user_id'),
          }
        }).then(res => {
          if(res.data.code === '1000'){
              this.show = true;
          }else{
          this.msgList = res.data;
		  this.msgList.reverse();
		  console.log(this.msgList);
          }
        }).catch(err => {
         console.log('error')
        });
	 },
    dealTip (message){
    
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .note-tip {
    
  }
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
	  margin:32px 0;
  }
  .content {
	  margin: 32px;
  }
  .delete {
	  a {
	  text-decoration-line:underline;
		  margin-right: 10px;
	  }
  }
</style>>

