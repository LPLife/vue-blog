<template>
  <div>
    <div class="upload">
      <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" :http-request="uploadImg"
        accept="image/jpeg, image/gif, image/png" :before-upload="onBeforeUpload" multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {};
    },
    methods: {
      onBeforeUpload(file) {
        let flat = true;
        let reg = /\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/;
        const isIMAGE = file.type === "image/jpeg" || "image/gif" || "image/png";
        const isLt1M = file.size / 1024 / 1024 < 1;
          console.log("上传文件只能s是图片格式!");
          console.log(reg.test(file.type));

        if (!isIMAGE) {
          console.log("上传文件只能是图片格式!");
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
        console.log(options);
      }
    }
  };

</script>
<style lang="less" scoped>
  .upload {
    margin: 16px 0;
  }

</style>
