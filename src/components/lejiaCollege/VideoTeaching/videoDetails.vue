<template>
  <div id="videoList">
    <div class="videoBtn">
      <!-- <el-button icon="el-icon-picture-outline" type="primary" size="mini" >上传视屏</el-button>  -->
      <el-button icon="el-icon-picture-outline" type="primary" size="mini" @click="createAlbum = true">视屏分类</el-button>
    </div>
    <div class="videoClassification">
      <!-- 相册列表 -->
      <el-row>
        <el-col :span="3" v-for="(item, index) in videoAlbumlist" :key="index" :offset="index" style="margin-bottom: 20px">
          <el-card :body-style="{ padding: '0px', height: '255px'}">
            <img :src="item.cover" v-if="item.cover" class="image" @click="toVideoAlbumDetail(item.id)">
            <img src="../../../assets/images/university/caia412-34427.png" class="image" @click="toVideoAlbumDetail(item.id)" v-else>
            <div style="padding: 14px;">
              <span>{{item.name}}</span>
              <div class="bottom clearfix">
                <!-- <time class="time">{{ item.num }}</time> -->
                <el-tooltip content="删除" placement="bottom" effect="light">
                  <el-button type="text" class="button">
                    <i class="el-icon-delete"></i>
                  </el-button>
                </el-tooltip>
                <el-tooltip content="编辑" placement="bottom" effect="light">
                  <el-button type="text" class="button">
                    <i class="el-icon-edit"></i>
                  </el-button>
                </el-tooltip>
              </div>
            </div>
          </el-card>
        </el-col>
        <!-- 创建视屏相册 -->
        <el-dialog title="提示" :visible.sync="createAlbum" width="30%" class="createdVideo">
          <el-form>
            <el-row>
              <el-form-item label="视屏册名称:" required>
                <el-input v-model="videoForm.name" placeholder="请输入视屏册名称"></el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="视屏册说明:">
                <el-input v-model="videoForm.description" type="textarea" placeholder="请输入视屏册说明"></el-input>
              </el-form-item>
            </el-row>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="createAlbum = false" size="mini">取 消</el-button>
            <el-button type="primary" @click="createVideo" size="mini">确 定</el-button>
          </span>
        </el-dialog>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      createAlbum: false, //创建视屏册
      videoAlbumlist:[],  //视屏册列表
      videoForm: {
        name: "",
        description: ""
      }
    };
  },
  methods: {
    // 创建视屏相册
    createVideo() {
      this.$http
        .post(globalConfig.server + "video/create", this.videoForm)
        .then(res => {
          console.log(res, "1111");
          if (res.data.code == "10000") {
            this.$notify.success({
              title: "成功",
              message: res.data.msg
            });
            this.createAlbum = false;
            this.getVideoAlbum();
            this.videoForm = {};
          } else {
            this.$notify.warning({
              title: "警告",
              message: res.data.msg
            });
          }
        });
    },
    // 视屏相册分类
    getVideoAlbum() {
      this.$http.get(globalConfig.server + "video/list").then(res => {
        if(res.data.code == "10000") {
          this.videoAlbumlist = res.data.data;
        }
      })
    },
    // 跳转视屏详情页
    toVideoAlbumDetail(id) {
      this.$router.push({path: '/VideoTeaching',query:{classify_id: id}})
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
}
</style>
