<template>
  <div>
    <div class="upload">
      <el-upload class="upload-demo" drag action="http://localhost:8080/api/file/upload/base64" :http-request="uploadImg"
        accept="image/jpeg, image/gif, image/png" :before-upload="onBeforeUpload" :show-file-list=true
        :on-error="uploadImgError"    multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png/jpeg/gif文件，且不超过500kb</div>
      </el-upload>
    </div>
    <div class="wrapper" ref="wrapper">
        <ul class="content">
            <li v-for="(item, index) in imageList" :key="index">
                <div class="delete" v-if="indexImag == index" >
                    <img src="../../assets/delete.png" @click="deleteImg(item)">
                </div>
                <img :src="item.url" alt="" v-on:mouseenter="handEnter(index)">
          </li>
        </ul>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import apiConfig from '../../assets/js/api'
  import {uploadImgToBase64} from '../../assets/js/utils'
  import BScroll from 'better-scroll'
  export default {
    data() {
      return {
        tip: '',
        imageUrl:'',
        indexImag:-1,
        imageList:[]
      };
    },
    methods: {
     //删除图片
     deleteImg(item){
         console.log(item);
        axios({
          method: 'post',
          url: apiConfig.USER_DELETE_IMG,
          data: {
            url:item.url
          }
        }).then(res => {
          res = res.data;
          this.imgeList();
          console.log(res);
        }).catch(err => {
         console.log('error')
        });
     },
     handEnter(index) {
        this.indexImag = index;
      },
      uploadImgError() {
        console.log('34');
      },
      // 文件上传之前的钩子，参数为上传的文件，若返回false或者返回Promise且reject，则停止上传
      onBeforeUpload(file) {
        let flat = true;
        let reg = /image\/(gif|jpg|jpeg|png|GIF|JPG|PNG)$/;
        const isIMAGE = file.type === "image/jpeg" || "image/gif" || "image/png";
        const isLt1M = file.size / 1024 / 1024 < 1;
        if (!reg.test(file.type)) {
            console.log('请上传格式为image/png, image/gif, image/jpg, image/jpeg的图片');
            flat = false;
        }
        if (!isLt1M) {
          console.log("上传文件大小不能超过 1MB!");
          flat = false;
        }
        return flat;
      },
      // 上传图片
      uploadImg(options) {
        let file = options.file
        let filename = file.name;
        let nowDate = new Date();
        let year = nowDate.getFullYear(),
            month = nowDate.getMonth() < 9 ? `0${nowDate.getMonth()+1}`:`${nowDate.getMonth()+1}`,
            day = nowDate.getDate() < 10 ? `0${nowDate.getDate()}`:`${nowDate.getDate()+1}`;
        let date = year+'-'+month+'-'+day;
       uploadImgToBase64(options.file).then(res =>{
        axios({
          method: 'post',
          url: apiConfig.UPLOADTMG,
          data: {
            url:res.result,
            user_id:localStorage.getItem('user_id'),
            upload_date:date
          }
        }).then(res => {
          res = res.data;
          this.imgeList();
          console.log(res);
        }).catch(err => {
         console.log('error')
        });
       });
       
      },
      //压缩图片
      yasuo(){

      },
      //获取图片列表
      imgeList(){
        axios({
          method: 'get',
          url: apiConfig.USER_IMG_LIST,
          params: {
            user_id:localStorage.getItem('user_id')
          }
        }).then(res => {
          res = res.data;
          this.imageList = res;
             this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.wrapper, {})
              this.scroll.on('touchend', (pos) => {
                // 下拉动作
                if (pos.y > 50) {
                  this.loadData()
                }
              })
            } else {
              this.scroll.refresh()
            }
        })
          console.log(res);
        }).catch(err => {

        });
      },
      updateLog(){
        
      }


    },
    mounted(){
        this.imgeList();
    }
  };

</script>
<style lang="less" scoped>
  .upload {
    margin: 16px 0;
  }
  .wrapper {
      ul {
          flex-wrap: wrap;
          height: auto;
          li {
              position: relative;
              width: 20%;
              margin: 32px;
          }
      }
      img {
      width: 200px;
      height: 200px;
      }
  }
  .delete {
      position: absolute;
      top: 0;
      right: 0;
      img {
          width: 30px;
          height: 30px;
      }
  }
</style>
