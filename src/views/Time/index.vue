<template>
<div class="time">
       <div class="centent" v-if="items.length > 0"> 
               <div class="info" v-for="(v,index) in items" :key="index">
                    <div class="time">
                        {{v.date}}
                    </div>
                    <div class="sign">
                      <div class="circle">
                      </div>
                      <div class="line">
                      </div>
                    </div>
                    <div class="tip">
                       {{v.tip}}
                    </div>
               </div>
       </div>
       <div class="p-tip" v-if="show">
          暂无数据,登录后才能看到您的操作日志
       </div>
</div>
</template>
<script>
  import axios from 'axios'
  import apiConfig from '../../assets/js/api'
export default {
  data () {
    return {
      items: [],
      show:false
    }
  },
  mounted(){
     this.getLog();
  },
  methods: {
    getLog() {
        axios({
          method: 'get',
          url: apiConfig.USER_LOG,
          params: {
             user_id:localStorage.getItem('user_id'),
          }
        }).then(res => {
          if(res.data.code === '1000'){
              this.show = true;
          }else{
          this.items = res.data;
          this.items.reverse();
          console.log(this.items);
          }
        }).catch(err => {
         console.log('error')
        });
      }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.info{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
.p-tip {
    color: red;
    position: absolute;
    margin: 0 auto;
    left: 50%;
    transform: translate(-50%);
    top: 50%;
}
.sign {
    width: 100px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
.circle,.time{
   margin: 32px -8px; 
}
.tip{
   margin: 32px 20px;
   width: 150px; 

}
.circle {
    width: 16px;
    height: 16px;
    border-radius: 10px;
    background-color: #fff;
    z-index: 1;
    border:2px solid greenyellow; 
}
.line {
    width: 1px;
    height: 80px;
    background-color: aqua;
}
</style>
