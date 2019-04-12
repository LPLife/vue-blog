<template>
  <div class="person">
    Person
    <!-- <div id="capture" style="padding: 10px; background: #f5da55">
      <h4 style="color: #000; ">Hello world!</h4>
      <img src="../../assets/logo.png">
    </div> -->
      {{count}}

  </div>
</template>

<script>
  import html2canvas from 'html2canvas'
  export default {
    name: 'HelloWorld',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        count:this.store.state.count
      }
    },
    computed:{
       count () {
      return store.state.count
    }
    },
    methods: {
      img() {
        html2canvas(document.querySelector("#capture")).then(canvas => {
          document.body.appendChild(canvas)
          var oCanvas = document.getElementsByTagName("canvas")[0];
          oCanvas.style.display = 'none';
        });
        setTimeout(() => {
          var type = 'png';
          var oCanvas = document.getElementsByTagName("canvas")[0];
          oCanvas.style.display = 'none';
          // 将图片转为base64位
          var imgData = oCanvas.toDataURL(type);
          imgData = imgData.replace(this._fixType(type), '../assets/');
          this.fileDownload(imgData);
        }, 1000)
      },
      fileDownload(downloadUrl) {
        let aLink = document.createElement('a');
        aLink.style.display = 'none';
        aLink.href = downloadUrl;
        aLink.download = "下载文件名xxx.png";
        // 触发点击-然后移除
        document.body.appendChild(aLink);
        aLink.click();
        document.body.removeChild(aLink);
      },
      _fixType(type) {
        type = type.toLowerCase().replace(/jpg/i, 'jpeg');
        let r = type.match(/png|jpeg|bmp|gif/)[0];
        return 'image/' + r;
      }
    },
    mounted() {
      this.img();
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
