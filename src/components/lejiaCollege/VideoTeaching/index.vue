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
        <!-- 分页 -->
        <div class="block pages">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="form.page" :page-sizes="[12,24, 36,48]" :page-size="form.limit" layout="total, sizes, prev, pager, next, jumper" :total="total" ></el-pagination>
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
            <UpLoad :ID="'comment_pic'" :isClear="isClear" @getImg="getImg"></UpLoad>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="release" size="mini" >发布</el-button>
              <el-button @click="uploadVideo = false" size="mini">取 消</el-button>
            </span>
          </el-dialog>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import UpLoad from '../../common/UPLOAD.vue' 
export default {
  components: {UpLoad},
  data() {
    return {
      deletedDialog: false,
      uploadVideo: false,
      isClear: false,   //上传组件
      total: 0, //数据总条数
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
      ], // 视屏数据
      checkData: [], // 双向数据绑定的数组
      dialogImageUrl: "",  //
      form: {
        page: 1,
        limit: 12,
        id: ""
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
    // 渲染
    rendering() {
      this.$http.get(globalConfig.server + '/video/list').then(res => {
        console.log(res, "2222");
        if(res.data.code == "10001") {
          this.videoData = res.data.data;
        } else {
          this.$notify.warning({
              title: "警告",
              message: res.data.msg
            });
        }
      })
    },
    // 上传
      getImg(val) {
        console.log(val, "11111")
        this.form.id = val[1];
        this.picStatus = !val[2];
      },
      // 发布
      release() {
        this.$http.post(globalConfig.server + "video/VideoUpload/uploadVideo", this.form).then(res => {
          console.log(res, "3333");
          
        })
      },
       // 删除
    deletedVideo(id) {
      // this.checkData.forEach((item, index) => {
      //   if (this.videoData[index].id == item) {
      //     this.videoData[this.videoData.indexOf(item)] = null;
      //   }
      // });
      // this.videoData.splice(this.videoData.indexOf(null), 1);
      // this.deletedDialog = true
      this.$http.put(globalConfig.server + 'album/delete/' + id).then(res => {

      })
    },
      // 分页
      handleSizeChange(val) {
      this.form.limit = val;
      this.refresh(this.params.limit);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.form.page = val;
      this.refresh(this.params.page);
      console.log(`当前页: ${val}`);
    },
    },
    created() {
      this.rendering();
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