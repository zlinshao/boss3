<template>
  <div id="videoTeaching">
    <el-container>
      <el-header>
        <div class="videoTop">
          <input id="quan" type="checkbox" @click="checkAll($event)"> 全选
          <!-- <el-button type="primary" size="mini" @click="checkAll($event)" >全选</el-button> -->
          <el-button type="primary" size="mini">删除</el-button>
          <el-button type="primary" size="mini">上传</el-button>
        </div>
      </el-header>
      <el-main>
        <div class="videoList" v-for="(item, index) in videoData" :key="index">
          <video ref="video" controls :src="item.src"></video>
          <input type="checkbox" :value="item.value" v-model="checkData">
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
        {
          src: "http://www.runoob.com/try/demo_source/movie.mp4",
          value: "视屏1",
          duration: "00:08"
        },
        {
          src: "http://www.runoob.com/try/demo_source/movie.mp4",
          value: "视屏2",
          duration: "00:08"
        },
        {
          src: "http://www.runoob.com/try/demo_source/movie.mp4",
          value: "视屏3",
          duration: "00:08"
        },
        {
          src: "http://www.runoob.com/try/demo_source/movie.mp4",
          value: "视屏4",
          duration: "00:08"
        },
        {
          src: "http://www.runoob.com/try/demo_source/movie.mp4",
          value: "视屏5",
          duration: "00:08"
        }
      ], // 视屏数据
      checkData: [] // 双向数据绑定的数组
    };
  },
  watch: {
    checkData: {
      handler() {
        if (this.checkData.length == this.videoData.length) {
          document.querySelector("#quan").checked = true;
        } else {
          document.querySelector("#quan").checked = false;
        }
      },
      deep: true
    }
  },
  methods: {
    checkAll(e) {
      if (e.target.checked) {
        this.videoData.forEach((el, i) => {
          if (this.checkData.indexOf(el.value) == "-1") {
            this.checkData.push(el.value);
          }
        });
      } else {
        this.checkData = [];
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