<template>
  <div class="note">
    <div class="content">
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
				 {{item.message}}（{{item.upload_date}}）
			</div>
			<div class="delete">
            <span @click="deleteNote(item)">删除</span>
             <span>回复</span>
			</div>
		  </div>
	</div>
  </div>
</template>

<script>
  import axios from 'axios'
  import apiConfig from '../../assets/js/api'
  import {time,updateLog} from '../../assets/js/utils'
  import { Toast } from 'mint-ui';
export default {
  name: 'HelloWorld',
  data () {
    return {
      msgList: [],
      message:'',
    }
  },
  mounted(){
	  this.getNoteList();
  },
  methods:{
     
     deleteNote(item){
        axios({
          method: 'post',
          url: apiConfig.USER_NOTE_DELETE,
          data: {
		    	_id:item._id,
		    	message:item.message
          }
        }).then(res => {
          res = res.data;
          this.getNoteList();
          Toast('删除留言成功！');
          updateLog('删除留言');
        }).catch(err => {
         console.log('error')
        });
    },
    // 留言
    handleClick() {
      if(this.message.length == 0 || this.message ===" "){
      Toast('留言不能为空！');
          return;
		}
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
          Toast('留言成功！');
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
	  span {
	  text-decoration-line:underline;
		  margin-right: 10px;
	  }
  }
</style>>

