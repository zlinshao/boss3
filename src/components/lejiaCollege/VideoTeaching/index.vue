<template>
  <div id="videoTeaching">
    <el-container>
      <el-header>
        <div class="videoTop">
          <el-button type="primary" size="mini" @click="selectAllCheck">全选</el-button>
          <el-button type="primary" size="mini">删除</el-button>
          <el-button type="primary" size="mini">上传</el-button>
        </div>
      </el-header>
      <el-main>
        <div class="videoList" v-for="(item, index) in videoData" :key="index">
          <!-- <video ref="video" controls> -->
            <!-- <source src="http://www.runoob.com/try/demo_source/movie.mp4"  type="video/mp4"> -->
          <!-- </video> -->
          <!-- <el-checkbox  v-model="videoChecked" :value="1"></el-checkbox> -->
          <!-- <input type="checkbox" v-model="videoChecked" :> -->
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
      videoChecked: false , // 视屏选中
      videoCheckedAll: [], //全选
    }
  },
  watch: {
    // 全选
    videoCheckedAll: {
      handler() {
        if(this.videoCheckedAll.length == 4) {
          this.videoChecked = true;
        } else {
          this.videoChecked = false;
        }
      }, 
      deep: true
    }
  },
  methods: {
    // 取消全选
    selectAllCheck() {
      // this.videoChecked = true;
      this.videoCheckedAll = [];
      if(this.videoChecked) {
        for(let i = 0; i <= 4; i++) {
          this.videoCheckedAll.push(i)
        }
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
