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
          <video ref="video" controls controlsList='nodownload' :src="item.file"></video>
          <input type="checkbox" :value="item.id" v-model="checkData">
          <span class="name">视屏名称：{{item.video_name}}</span>
          <span class="num">播放次数：{{item.play_count}}</span>
        </div>
        <div class="noNum" v-if="videoData.length==0">暂无数据</div>
        <!-- 分页 -->
        <div class="block pages">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="form.page" :page-sizes="[12,24, 36,48]" :page-size="form.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
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
            <el-form>
              <el-row>
                <el-col>
                  <el-form-item label="视屏名称" required>
                    <el-input v-model="videoName"></el-input>
                  </el-form-item>
                </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item label="上传视屏" required>
                  <UpLoad :ID="'comment_pic'" :isClear="isClear" @getImg="getImg"></UpLoad>
                </el-form-item>
              </el-col>
            </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="release" size="mini">发布</el-button>
              <el-button @click="uploadVideo = false" size="mini">取 消</el-button>
            </span>
          </el-dialog>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import UpLoad from "../../common/UPLOAD.vue";
export default {
  components: { UpLoad },
  data() {
    return {
      deletedDialog: false,
      uploadVideo: false,
      isClear: false, //上传组件
      total: 0, //数据总条数
      videoData: [], // 视屏数据
      checkData: [], // 双向数据绑定的数组
      dialogImageUrl: "", //
      videoName: "",
      form: {
        page: 1,
        limit: 12,
        file_id: "",
        classify_id: "",
        video_name: ""
      },
      videoAlbumId: "" //视屏分类id
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
      this.$http
        .get(
          globalConfig.server +
            "video/classify-video?classify_id=" +
            this.videoAlbumId
        )
        .then(res => {
          if (res.data.code == "10000") {
            this.videoData = res.data.data;
            this.total = res.data.num;
          } else {
            this.$notify.warning({
              title: "警告",
              message: res.data.msg
            });
          }
        });
    },
    // 上传
    getImg(val) {
      let arr = [];
      val[1].forEach((item, index) => {
        arr.push(item);
      });
      this.form.file_id = arr[0].toString();
      this.picStatus = !val[2];
    },
    // 发布
    release() {
      this.form.classify_id = this.videoAlbumId;
      this.form.video_name = this.videoName;
      this.$http
        .post(globalConfig.server + "video/upload-video", this.form)
        .then(res => {
          if (res.data.code == "10000") {
            this.$notify.success({
              title: "成功",
              message: res.data.msg
            });
            this.rendering();
            this.uploadVideo = false;
            this.isClear = true;
          } else {
            this.$notify.warning({
              title: "警告",
              message: res.data.msg
            });
          }
        });
    },
    // 删除
    deletedVideo() {
      this.form.classify_id = this.videoAlbumId;
      this.form.file_id = this.checkData;
      this.$http
        .post(globalConfig.server + "video/delete-video", this.form)
        .then(res => {
          if (res.data.code == "10000") {
            this.$notify.success({
              title: "成功",
              message: res.data.msg
            });
            this.rendering();
            this.deletedDialog = false;
          } else {
            this.$notify.warning({
              title: "警告",
              message: res.data.msg
            });
          }
        });
    },
    // 分页
    handleSizeChange(val) {
      this.form.limit = val;
      this.rendering(this.form.limit);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.form.page = val;
      this.rendering(this.form.page);
      console.log(`当前页: ${val}`);
    }
  },
  created() {
    this.videoAlbumId = this.$route.query.classify_id;
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
    .name {
       position: absolute;
      bottom: 20px;
      left: 20px;
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
  .noNum {
    text-align: center;
    font-size: 16px;
  }
}
</style>