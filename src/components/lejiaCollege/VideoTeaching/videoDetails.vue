<template>
  <div id="videoList">
    <div class="videoBtn">
      <!-- <el-button icon="el-icon-picture-outline" type="primary" size="mini" >上传视频</el-button>  createAlbum = true-->
      <el-button icon="el-icon-picture-outline" type="primary" size="mini" @click="createEditaAlumlist('创建')">视频分类</el-button>
    </div>
    <div class="videoClassification">
      <!-- 相册列表 -->
      <el-row>
        <el-col :span="3" v-for="(item, index) in videoAlbumlist" :key="index" :offset="index" style="margin-bottom: 20px">
          <el-card :body-style="{ padding: '0px', height: '255px'}">
            <img :src="item.cover" v-if="item.cover" class="image" @click="toVideoAlbumDetail(item.id)">
            <img src="../../../assets/images/default1.png" class="image" @click="toVideoAlbumDetail(item.id)" v-else>
            <div style="padding: 14px;">
              <span>{{item.name}}</span>
              <div class="bottom clearfix">
                <!-- <time class="time">{{ item.num }}</time> -->
                <el-tooltip content="删除" placement="bottom" effect="light">
                  <el-button type="text" class="button" @click="deleteAlumlist(item.id)">
                    <i class="el-icon-delete"></i>
                  </el-button>
                </el-tooltip>
                <el-tooltip content="编辑" placement="bottom" effect="light">
                  <el-button type="text" class="button" @click="createEditaAlumlist('编辑', item.id)">
                    <i class="el-icon-edit"></i>
                  </el-button>
                </el-tooltip>
              </div>
            </div>
          </el-card>
        </el-col>
        <!-- 创建视频相册 -->
        <el-dialog :title="title" :visible.sync="createAlbum" width="30%" class="createdVideo">
          <el-form>
            <el-row>
              <el-form-item label="视频分类名称:" required>
                <el-input v-model="videoForm.name" placeholder="请输入视频分类名称"></el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="视频分类说明:">
                <el-input v-model="videoForm.description" type="textarea" placeholder="请输入视频分类说明"></el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="上传新的封面图片:">
                <!-- {{picImg}} -->
                <UpLoad :ID="'comment_pic'" @getImg="getImg" :editImage="picImg" :isClear="isClear"></UpLoad>
              </el-form-item>
            </el-row>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="createAlbum = false" size="mini">取 消</el-button>
            <el-button type="primary" @click="createVideo(title)" size="mini">确 定</el-button>
          </span>
        </el-dialog>
      </el-row>
      <div class="noNum" v-if="videoAlbumlist.length==0">暂无数据</div>
    </div>
  </div>
</template>

<script>
import UpLoad from "../../common/UPLOAD.vue";
export default {
  components: { UpLoad },
  data() {
    return {
      createAlbum: false, //创建视频册
      videoAlbumlist: [], //视频册列表
      title: "", //编辑与创建标题
      isClear: false,  //清空上传组件
      videoForm: {
        name: "",
        description: "",
        classify_id: "",
        cover: "",
      },
      picImg: {}
    };
  },
  methods: {
    // 上传
    getImg(val) {
      let arr = [];
      val[1].forEach((item, index) => {
        arr.push(item);
      });
      this.videoForm.cover = arr;
      this.picStatus = !val[2];
    },
    // 创建与编辑
    createEditaAlumlist(val, id) {
      if (val == "编辑") {
        this.title = "编辑视频分类";
        this.videoForm.classify_id = id;
        this.$http
          .get(globalConfig.server + "video/read?classify_id=" + id)
          .then(res => {
            this.videoForm.name = res.data.data.name;
            this.videoForm.description = res.data.data.description;
            let o = {};
            o = res.data.data.cover;
            // this.picImg[Number(res.data.data.id)]  = o;
            this.picImg[res.data.data.id]  = o;
          });
      } else if (val == "创建") {
        this.title = "创建视频分类";
        this.videoForm.name = "";
        this.videoForm.description = "";
      }
      this.createAlbum = true;
    },
    // 删除视频册
    deleteAlumlist(id) {
      this.videoForm.classify_id = id;
      this.$http
        .post(globalConfig.server + "video/delete", this.videoForm)
        .then(res => {
          if (res.data.code == "10000") {
            this.$notify.success({
              title: "成功",
              message: res.data.msg
            });
            this.createAlbum = false;
            this.getVideoAlbum();
          } else {
            this.$notify.warning({
              title: "警告",
              message: res.data.msg
            });
          }
        });
    },
    // 创建视频相册
    createVideo(val) {
      if (val == "创建视频分类") {
        console.log(this.videoForm.cover)
        if(this.videoForm.cover) {
          this.videoForm.cover = this.videoForm.cover[0]
        }
        this.$http
          .post(globalConfig.server + "video/create", this.videoForm)
          .then(res => {
            if (res.data.code == "10000") {
              this.$notify.success({
                title: "成功",
                message: res.data.msg
              });
              this.isClear = true;
              this.getVideoAlbum();
              // this.videoForm = {};
              this.createAlbum = false;
            } else {
              this.$notify.warning({
                title: "警告",
                message: res.data.msg
              });
            }
          });
      } else if (val == "编辑视频分类") {
        if(this.videoForm.cover) {
          this.videoForm.cover = this.videoForm.cover[0];
        }
        this.$http
          .post(globalConfig.server + "video/edit", this.videoForm)
          .then(res => {
            if (res.data.code == "10000") {
              this.$notify.success({
                title: "成功",
                message: res.data.msg
              });
              this.isClear = true;
              this.getVideoAlbum();
              this.createAlbum = false;
            } else {
              this.$notify.warning({
                title: "警告",
                message: res.data.msg
              });
            }
          });
      }
    },
    // 视频相册分类
    getVideoAlbum() {
      this.$http.get(globalConfig.server + "video/list").then(res => {
        if (res.data.code == "10000") {
          this.videoAlbumlist = res.data.data;
        }
      });
    },
    // 跳转视频详情页
    toVideoAlbumDetail(id) {
      this.$router.push({ path: "/VideoTeaching", query: { classify_id: id } });
    }
  },
  created() {
    this.getVideoAlbum();
  }
};
</script>

<style lang="scss" scoped>
#videoList {
  .videoBtn {
    margin-left: 17px;
    margin-top: 15px;
    color: #6a8dfb;
    padding-top: 10px;
    padding-bottom: 20px;
    border-bottom: 1px solid #e5e5e5;
  }
  .videoClassification {
    margin: 17px;
    .image {
      width: 100%;
      height: 180px;
      display: block;
      cursor: pointer;
    }
    .bottom {
      margin-top: 13px;
      line-height: 12px;
    }
    .button {
      padding: 0;
      margin-left: 5px;
      float: right;
    }
    .el-col {
      margin-left: 0;
      margin-right: 20px;
    }
  }
  .createdVideo {
    .el-input,
    .el-textarea {
      width: 80%;
    }
    .el-textarea {
      margin-left: 10px;
    }
  }
  .noNum {
    text-align: center;
    font-size: 16px;
  }
}
</style>
