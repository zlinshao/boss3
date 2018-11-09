<template>
  <div id="videoTeaching">
    <el-container>
      <el-header>
        <div class="videoTop">
          <el-button type="primary" size="mini" @click="selectAllCheck" v-model="videoCheckedAll">全选</el-button>
          <el-button type="primary" size="mini">删除</el-button>
          <el-button type="primary" size="mini">上传</el-button>
        </div>
      </el-header>
      <el-main>
        <div class="videoList" v-for="(item, index) in videoData" :key="index">
          <video ref="video" controls :src="item.src"></video>
          <input type="checkbox" v-model="a" :value="item.name">
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      videoData: [
        {src: "http://www.runoob.com/try/demo_source/movie.mp4", name: "视屏1", duration: "00:08"},
        {src: "http://www.runoob.com/try/demo_source/movie.mp4", name: "视屏1", duration: "00:08"},
        {src: "http://www.runoob.com/try/demo_source/movie.mp4", name: "视屏1", duration: "00:08"},
        {src: "http://www.runoob.com/try/demo_source/movie.mp4", name: "视屏1", duration: "00:08"},
        {src: "http://www.runoob.com/try/demo_source/movie.mp4", name: "视屏1", duration: "00:08"},
      ],  // 视屏数据
      videoCheckedAll: false , // 全选
      a: [], //不全选
    }
  },
  watch: {
    // 全选
    a: {
      handler() {
        if(this.a.length == this.videoData.length) {
          this.videoCheckedAll = true;
        } else {
          this.videoCheckedAll = false;
        }
      }, 
      deep: true
    }
  },
  methods: {
    // 取消全选
    selectAllCheck() {
      this.a = [];
      if(this.videoCheckedAll == true) {
        this.videoData.forEach((item, index) => {
          console.log(item, "1111");
          
          this.a.push(item.name)
        })
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#videoTeaching {
  .videoTop {
    text-align: right;
  }
  .videoList {
    display: inline-block;
    width: 22%;
    padding: 20px;
    text-align: center;
    video {
      width: 100%;
      border: 1px solid gray;
    }
  }
}
</style>
