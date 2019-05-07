<template>
<div class="time">
       <div class="centent">
               <div class="info" v-for="(v,index) in items" :key="index">
                    <div class="time">
                        {{v.date}}
                    </div>
                    <div class="circle">
                    </div>
                    <div class="line">
                    </div>
                    <div class="tip">
                       {{v.tip}}
                    </div>
               </div>
       </div>
</div>
</template>
<script>
  import axios from 'axios'
  import apiConfig from '../../assets/js/api'
export default {
  data () {
    return {
      items: []
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
          this.items = res.data;
          console.log(res);
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
.circle,.time{
   margin: 32px 10px; 
}
.tip{
   margin: 32px 20px; 

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
    margin-left: -18px;
}
</style>
