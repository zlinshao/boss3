<template>
  <div id="videoTeaching">
    <el-container>
      <el-header>
        <div class="videoTop">
          <input id="quan" type="checkbox" @click="checkAll($event)"> 全选
          <!-- <el-button id="quan" type="primary" size="mini" @click="checkAll($event)" >全选</el-button> -->
          <el-button type="primary" size="mini" @click="deletedDialog = true">删除</el-button>
          <el-button type="primary" size="mini" @click="showEditDialog">编辑</el-button>
          <el-button type="primary" size="mini" @click="showUploadDialog">上传</el-button>
        </div>
      </el-header>
      <el-main>
        <!-- 内容 -->
        <div class="videoList" v-for="(item, index) in videoData" :key="index">
          <video ref="video" controls controlsList='nodownload' :src="item.file"></video>
          <input type="checkbox" :value="item.id" v-model="checkData">
          <span class="name">视频名称：{{item.video_name}}</span>
          <span class="num">播放次数：{{item.play_count}}</span>
        </div>
        <div class="noNum" v-if="videoData.length==0">暂无数据</div>
        <!-- 分页 -->
        <div class="block pages">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="form.page" :page-sizes="[12,24, 36,48]" :page-size="form.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
        </div>
        <!-- 编辑 -->
        <div class="uploadVideo">
          <el-dialog title="编辑视频" :visible.sync="editDialog" width="30%" center>
            <el-form>
              <el-row>
                <el-col>
                  <el-form-item label="视频名称" required>
                    <el-input v-model="params.video_name"></el-input>
                  </el-form-item>
                </el-col>
            </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="editDialog = false" size="mini">取 消</el-button>
              <el-button type="primary" @click="editName" size="mini">确 定</el-button>
            </span>
          </el-dialog>
        </div>
        <!-- 删除 -->
        <div class="deletedInfo">
          <el-dialog title="删除视频" :visible.sync="deletedDialog" width="30%" center>
            <span>确定删除该视频吗？</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="deletedDialog = false" size="mini">取 消</el-button>
              <el-button type="primary" @click="deletedVideo" size="mini">确 定</el-button>
            </span>
          </el-dialog>
        </div>
        <!-- 上传 -->
        <div class="uploadVideo">
          <el-dialog title="上传视频" :visible.sync="uploadVideo" width="30%">
            <el-form>
              <el-row>
                <el-col>
                  <el-form-item label="视频名称" required>
                    <el-input v-model="form.video_name"></el-input>
                  </el-form-item>
                </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item label="上传视频" required>
                  <UpLoad :ID="'comment_pic'" :isClear="isClear" @getImg="getImg"></UpLoad>
                  <span style="color: red;font-size: 12px;">仅支持上传一个视屏</span>
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
      editDialog: false,
      uploadVideo: false,
      isClear: false, //上传组件
      total: 0, //数据总条数
      videoData: [], // 视频数据
      checkData: [], // 双向数据绑定的数组
      dialogImageUrl: "", //
      videoName: "",
      editVideoName: "",
      form: {
        page: 1,
        limit: 12,
        file_id: "",
        classify_id: "",
        video_name: ""
      },
      params: {
        video_name: "",
        video_id: ""
      },
      videoAlbumId: "" //视频分类id
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
      this.form.file_id = arr[0];
      this.picStatus = !val[2];
    },
    // 发布
    release() {
      this.form.classify_id = this.videoAlbumId;
      // this.form.video_name = this.videoName;
      this.$http
        .post(globalConfig.server + "video/upload-video", this.form)
        .then(res => {
          if (res.data.code == "10000") {
            this.$notify.success({
              title: "成功",
              message: res.data.msg
            });
            this.rendering();
            this.isClear = true;
            this.uploadVideo = false;
            location.reload()
          } else {
            this.$notify.warning({
              title: "警告",
              message: res.data.msg
            });
          }
        });
    },
    showUploadDialog() {
      this.isClear = true;
      this.form.video_name = "";
      this.videoName = "";
      this.uploadVideo = true;
    },
    // 获取视频名
    showEditDialog() {
      if(this.checkData.length !==1)  {
        this.$notify.warning({
          title: "警告",
          message: "只支持修改一个视频"
        })
       this.editDialog = false;
      } else {
        this.editDialog = true;
      }
      let checkId = this.checkData[0];
      this.videoData.forEach((item, index) => {
        if(item.id == checkId) {
          this.params.video_name = item.video_name
        }
      })
    },
    // 编辑
    editName() {
      this.params.video_id = this.checkData[0];
      // this.params.video_name = this.editVideoName
      this.$http.post(globalConfig.server + "video/edit-video",this.params).then(res => {
        if(res.data.code == "10000") {
          this.$notify.success({
            title: "成功",
            message: res.data.msg
          })
          this.rendering();
          this.params.video_name = "";
          this.editDialog = false;
        }
      })
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
            this.checkData = [];
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
      max-height: 195px;
      object-fit: fill;
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
  .uploadVideo {
    .el-input {
      width: 80%;
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