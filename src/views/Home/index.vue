<template>
  <div class="app-container">
    <div class="lunbo">
      <el-carousel :interval="4000" type="card" height="300px">
        <el-carousel-item v-for="item in picList" :key="item">
          <!-- <h3 class="medium">{{ item }}</h3> -->
          <img :src='item'/>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  let part01 = require('../../assets/part_01.jpg'),
      part02 = require('../../assets/part_02.jpg'),
      part03 = require('../../assets/part_03.jpg'),
      part05 = require('../../assets/part_05.jpg');


  export default {
    data() {
      return {
        picList:[
          part01,
          part02,
          part03,
          part05,       

   ]    
        }      
    },
    mounted() {

    },
    methods: {
    }
  }

</script>
<style lang="less">
 .lunbo {
  margin: 16px 0 ;
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
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
</style>

