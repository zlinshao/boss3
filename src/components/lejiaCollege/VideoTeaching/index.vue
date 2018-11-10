<template>
  <div id="videoTeaching">
    <el-container>
      <el-header>
        <div class="videoTop">
          <input id="quan" type="checkbox" @click="checkAll($event)"> 全选
          <!-- <el-button id="quan" type="primary" size="mini" @click="checkAll($event)" >全选</el-button> -->
          <el-button type="primary" size="mini" @click="deletedDialog = true">删除</el-button>
          <el-button type="primary" size="mini" @click="uploadVideo = true">上传</el-button>
        </div>
      </el-header>
      <el-main>
        <!-- 内容 -->
        <div class="videoList" v-for="(item, index) in videoData" :key="index">
          <video ref="video" controls :src="item.src"></video>
          <input type="checkbox" :value="item.id" v-model="checkData">
          <!-- <span>播放时长：{{item.duration}}</span> -->
          <span class="num">播放次数：{{item.num}}</span>
        </div>
        <!-- 删除 -->
        <div class="deletedInfo">
          <el-dialog :visible.sync="deletedDialog" width="30%" center>
            <span>确定删除该视频吗？</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="deletedDialog = false" size="mini">取 消</el-button>
              <el-button type="primary" @click="deletedVideo" size="mini">确 定</el-button>
            </span>
          </el-dialog>
        </div>
        <!-- 上传 -->
        <div class="uploadVideo">
          <el-dialog title="上传视屏" :visible.sync="uploadVideo" width="30%">
            <el-upload  ref="upload" action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" multiple :auto-upload="false" >
              <i class="el-icon-plus"></i>
            </el-upload>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="uploadVideo" size="mini">发布</el-button>
              <el-button @click="uploadVideo = false" size="mini">取 消</el-button>
            </span>
          </el-dialog>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      deletedDialog: false,
      uploadVideo: false,
      videoData: [
        {
          id: 1,
          src: "http://www.runoob.com/try/demo_source/movie.mp4",
          value: "视屏1",
          duration: "00:08",
          num: 1
        },
        {
          id: 2,
          src: "http://www.runoob.com/try/demo_source/movie.mp4",
          value: "视屏2",
          duration: "00:08",
          num: 2
        },
        {
          id: 3,
          src: "http://www.runoob.com/try/demo_source/movie.mp4",
          value: "视屏3",
          duration: "00:08",
          num: 3
        },
        {
          id: 4,
          src: "http://www.runoob.com/try/demo_source/movie.mp4",
          value: "视屏4",
          duration: "00:08",
          num: 4
        },
        {
          id: 5,
          src: "http://www.runoob.com/try/demo_source/movie.mp4",
          value: "视屏5",
          duration: "00:08",
          num: 5
        }
      ], // 视屏数据
      checkData: [], // 双向数据绑定的数组
      dialogImageUrl: "",  //
      form: {

      }
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
    // 全选
    checkAll(e) {
      if (e.target.checked) {
        this.videoData.forEach((el, i) => {
          if (this.checkData.indexOf(el.id) == "-1") {
            this.checkData.push(el.id);
          }
        });
      } else {
        this.checkData = [];
      }
    },
    // 删除
    deletedVideo() {
      this.checkData.forEach((item, index) => {
        if (this.videoData[index].id == item) {
          this.videoData[this.videoData.indexOf(item)] = null;
        }
      });
      this.videoData.splice(this.videoData.indexOf(null), 1);
      this.deletedDialog = true;
    },
    // 上传
    handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        console.log(file, "33333");
        
        this.form.dialogImageUrl = file.url;
        this.dialogVisible = true;
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
    position: relative;
    video {
      width: 100%;
      border: 1px solid gray;
    }
    .num {
      position: absolute;
      bottom: 20px;
      right: 20px;
    }
  }
  .deletedInfo {
    span {
      text-align: center;
    }
  }
}
</style>