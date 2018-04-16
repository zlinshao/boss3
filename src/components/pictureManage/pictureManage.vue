<template>
  <div id="pictureManage">
    <div class="topBack">
      <div class="topBackLeft">
        <div class="leftPic">
          <img :src="landholder.avatar" v-if="landholder.avatar !== '' && landholder.avatar !== null">
          <img src="../../assets/images/individual/touxiang.png" v-else>
        </div>
        <div class="rightPic">
          <div class="landName">
            <span>{{landholder.name}}</span>
            <span></span>
          </div>
          <div class="personalSign">
            <span v-if="!isEdit && landholder.data && landholder.data.signature" style="cursor: pointer"
                  @click.stop="showInput">{{landholder.data.signature.content}}</span>
            <span v-if="!isEdit && (!landholder.data || !landholder.data.signature)" style="cursor: pointer"
                  @click.stop="showInput">添加工作状态...</span>
            <el-input id="editInput" size="mini" @blur="editPersonalSign($event)"
                      @keyup.enter.native="editPersonalSign($event)"
                      v-if="isEdit" v-model="params.content"></el-input>
          </div>
        </div>
      </div>
    </div>
    <div class="main">
      <el-row>
        <el-col :span="24">
          <div class="myPicture">
            <el-button icon="el-icon-picture-outline" v-show="albumData.length>0" type="primary" size="small"
                       @click="openModalDialog('choosePicturesDialog')">上传照片
            </el-button>
            <el-button icon="el-icon-picture-outline" type="success" size="small"
                       @click="openModalDialog('createAlbumDialog')">创建相册
            </el-button>
          </div>
          <div class="pictures">
            <el-row :gutter="20">
              <el-col :span="3" v-for="(item,index) in albumData" :key="index" style="margin-bottom: 20px">
                <el-card :body-style="{ padding: '0px', height: '255px'}">
                  <img v-if="item.cover_path" :src="item.cover_path" class="imageItem"
                       @click="goPictureDetail(item.id)">
                  <img class="imageItem" src="../../assets/images/university/caia412-34427.png" v-else
                       @click="goPictureDetail(item.id)">
                  <div style="padding: 14px;">
                    <span
                      style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;width: 90%;display: inline-block;">{{item.name}}</span>
                    <div class="bottom clearfix">
                      <time class="time">{{item.photo_count}}张</time>
                      <el-tooltip content="删除" placement="bottom" effect="light">
                        <el-button type="text" class="button" @click="deleteAlbum(item.id)">
                          <i class="el-icon-delete"></i>
                        </el-button>
                      </el-tooltip>

                      <el-tooltip content="编辑" placement="bottom" effect="light">
                        <el-button type="text" class="button" @click="editAlbumData(item.id)">
                          <i class="el-icon-edit"></i>
                        </el-button>
                      </el-tooltip>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>
          <div style="text-align: center;margin-bottom: 20px;">
            <div v-if="totalNum==0">暂无数据</div>
            <el-pagination v-else
                           @size-change="handleSizeChange"
                           @current-change="handleCurrentChange"
                           :current-page="currentPage"
                           :page-sizes="[12, 24, 36, 48]"
                           :page-size="12"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="totalNum">
            </el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
    <!--<create-album :createAlbumDialog="createAlbumDialog" @close="closeCreateAlbumDialog" :albumId="albumId"></create-album>-->
    <!--<choose-pictures :choosePicturesDialog="choosePicturesDialog" @close="closeChoosePicturesDialog" ></choose-pictures>-->
    <el-dialog :close-on-click-modal="false" :title="dialogTitle" :visible.sync="createAlbumDialog" width="30%">
      <div class="">
        <el-form size="mini" onsubmit="return false;" :model="albumForm" label-width="100px">
          <el-row>
            <el-form-item label="相册名称:" required>
              <el-input v-model="albumForm.name" placeholder="请输入相册名称"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="相册说明:">
              <el-input v-model="albumForm.description" type="textarea" placeholder="请输入相册说明"></el-input>
            </el-form-item>
          </el-row>
          <!--<el-row>-->
          <!--<el-form-item label="主题:" required>-->
          <!--<el-radio-group v-model="form.theme">-->
          <!--<el-radio label="1" :key="1">个人</el-radio>-->
          <!--<el-radio label="2" :key="2">房屋</el-radio>-->
          <!--<el-radio label="3" :key="3">部门</el-radio>-->
          <!--</el-radio-group>-->
          <!--</el-form-item>-->
          <!--</el-row>-->
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="createAlbumDialog = false">取 消</el-button>

        <el-button size="small" type="primary" @click="editAlbum" v-if="albumId">确 定</el-button>
        <el-button size="small" type="primary" @click="createAlbum" v-else>确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :close-on-click-modal="false" title="选择相册" :visible.sync="choosePicturesDialog" width="50%">
      <div class="">
        <el-form size="mini" :model="chooseImgForm" label-width="100px">
          <el-row>
            <el-form-item label="选择相册">
              <el-col :span="8">
                <el-select v-model="chooseImgForm.album_id" placeholder="请选择相册">
                  <el-option v-for="album in albumData" :label="album.name" :value="album.id" :key="album.id">
                    {{album.name}}
                  </el-option>
                </el-select>
              </el-col>
            </el-form-item>
            <!--图片ids-->
            <el-form-item label="上传图片">
              <Upload :ID="'upload'" @getImg="getImage" :isClear="isClear"></Upload>
            </el-form-item>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="choosePicturesDialog = false">取 消</el-button>
        <el-button size="small" type="primary" @click="saveImages">保存</el-button>
      </span>
    </el-dialog>
    <el-dialog :close-on-click-modal="false" title="上传完成" :visible.sync="improveImgInfoDialog" width="40%">
      <div class="">
        <el-form size="small" :model="formInfo" label-width="100px">
          <el-row>
            <el-col align="center"><i class="iconfont icon-shenhetongguo"></i>
              <span style="margin-left: 10px;font-size: 15px;">您已成功上传<strong style="font-size: 15px;color: red;"> {{uploadImgLength}} </strong>张图片</span>
              <el-button type="text" style="margin-left: 15px;color: #2595B7;" @click="continueUploading">继续上传
              </el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col align="center">
              <span style="margin: 10px auto;display: inline-block;"><strong>统一添加信息</strong>
              </span>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="名称:">
              <el-input v-model="formInfo.name" placeholder="请输入名称"></el-input>
            </el-form-item>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="improveImgInfoDialog = false">取 消</el-button>
        <el-button size="small" type="primary" @click="saveAllPhoto()">保存</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import CreateAlbum from "./createAlbum";
  import choosePictures from './selectPictures.vue';
  import Upload from '../common/UPLOAD.vue';

  export default {
    components: {
      Upload,
      CreateAlbum,
      choosePictures,
    },
    name: "picture-manage",
    data() {
      return {
        choosePicturesDialog: false,
        createAlbumDialog: false,
        improveImgInfoDialog: false,
        albumData: [],
        albumId: '',
        totalNum: 0,
        currentPage: 1,
        landholder: {},
        isEdit: false,
        params: {
          content: '',
        },
        isChanged: false,
        albumForm: {
          name: '',
          description: '',
          // theme: '',
        },
        dialogTitle: this.albumId ? '编辑相册' : '创建相册',
        createAlbumId: '',
        chooseImgForm: {
          album_id: '',
          picture_ids: [],
        },
        uploadImgLength: 0,
        isClear: false,
        pictureIds: [],
        uploadStatus: false,
        formInfo: {
          name: '',
        },
      }
    },
    created() {
      this.landholder = JSON.parse(localStorage.personal);
      this.getImgData();
    },
    watch: {
      'params.content': {
        handler(val, oldVal) {
          if (val !== oldVal && oldVal) {
            this.isChanged = true;
          }
        }
      },
      albumId(val) {
        if (val) {
          this.dialogTitle = '编辑相册';
        }else{
          this.dialogTitle = '创建相册';
        }
        this.$http.get(globalConfig.server + "album/" + this.albumId).then((res) => {
          if (res.data.code == "20110") {
            this.albumForm = res.data.data;
            // this.form.theme =  res.data.data.theme.toString(); // 主题需要字符串才能选中显示
          }
        });
      },
      choosePicturesDialog(val){
        if(val){
          this.chooseImgForm.album_id = this.albumId ? Number(this.albumId) : '';
          this.isClear = true;
        }else{
          this.isClear = false;
        }

      }
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
        this.getImgData();
      },
      routerLink(val) {
        this.$router.push({path: val})
      },
      goPictureDetail(id) {
        this.$router.push({path: '/pictureDetail', query: {albumId: id, from: 'list'}});
      },
      openModalDialog(type) {
        switch (type) {
          case 'choosePicturesDialog':   //打开上传图片对话框
            this.choosePicturesDialog = true;
            this.albumId = '';
            break;
          case 'createAlbumDialog':   //打开创建相册对话框
            this.createAlbumDialog = true;
            this.albumId = '';
            this.albumForm = {
              name: '',
              description: '',
            };
            break;
        }
      },
      getImgData() {
        this.$http.get(globalConfig.server + "album?page=" + this.currentPage + "&limit=16").then((res) => {
          if (res.data.code === "20110") {
            this.albumData = res.data.data;
            this.totalNum = res.data.num;
          }
        });
      },
      editAlbumData(id) {
        this.createAlbumDialog = true;
        this.albumId = id;
      },
      deleteAlbum(id) {
        this.$confirm('删除相册会将相册中的照片一起删除，您确定删除吗？', '删除相册', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.put(globalConfig.server + 'album/delete/' + id).then((res) => {
            if (res.data.code === "20110") {
              this.getImgData();
              this.$notify.success({
                title: "成功",
                message: res.data.msg
              });
            } else {
              this.$notify.warning({
                title: "警告",
                message: res.data.msg
              });
            }
          });
        })
      },
      //修改个性签名
      showInput() {
        this.isEdit = true;
        this.params.content = this.landholder.data.signature.content;
        setTimeout(() => {
          this.isChanged = false;
          $('#editInput').focus();
        })
      },
      editPersonalSign(e) {
        this.isEdit = false;
        if (this.isChanged) {
          this.$http.post(globalConfig.server + 'manager/staff_record', this.params).then((res) => {
            let personal = JSON.parse(localStorage.personal);
            if (res.data.code === '30010') {
              personal.data.signature = res.data.data;
              localStorage.setItem('personal', JSON.stringify(personal));
              this.landholder = JSON.parse(localStorage.personal);
            } else {
              this.$notify.warning({
                title: '警告',
                message: res.data.msg
              })
            }
          })
        }
      },
      createAlbum() {
        this.$http.post(globalConfig.server + "album", this.albumForm).then((res) => {
          if (res.data.code == '20110') {
            this.createAlbumDialog = false;
            this.albumId = res.data.data.id;
            // this.chooseImgForm.album_id = res.data.data.id;
            this.albumForm = {};
            this.getImgData();
            this.$confirm('相册' + res.data.data.name + '保存成功，是否马上上传照片到这个相册?', '创建成功', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.choosePicturesDialog = true;
              this.createAlbumDialog = false;
            }).catch(() => {
              this.choosePicturesDialog = false;
            });
          } else {
            this.$notify.warning({
              title: "警告",
              message: res.data.msg
            });
          }
        });
      },
      editAlbum() {
        this.$http.put(globalConfig.server + 'album/' + this.albumId, this.albumForm).then((res) => {
          if (res.data.code == '20110') {
            this.createAlbumDialog = false;
            this.$notify.success({
              title: "成功",
              message: res.data.msg
            });
            this.getImgData();
          } else {
            this.$notify.warning({
              title: "警告",
              message: res.data.msg
            });
          }
        });
      },
      getImage(val) {
        this.chooseImgForm.picture_ids = val[1]; //选择的图片数组ids
        this.uploadImgLength = val[1].length;
        this.uploadStatus = val[2];
      },
      saveImages() {
        if (this.uploadStatus) {
          this.$notify.warning({
            title: '警告',
            message: '图片上传中，请稍后'
          });
          return;
        }
        this.$http.post(globalConfig.server + 'photo', this.chooseImgForm).then((res) => {
          if (res.data.code == '20210') {
            this.choosePicturesDialog = false;
            this.improveImgInfoDialog = true;  //显示完善照片信息界面
            // this.isClear = true;
            this.getImgData();
          } else {
            this.$notify.warning({
              title: "警告",
              message: res.data.msg
            });
          }
        });
      },
      continueUploading() {
        this.choosePicturesDialog = true;
      },
      saveAllPhoto() {
        this.$http.put(globalConfig.server + "/photo/edit", {
          album_id: this.chooseImgForm.album_id,
          photo_ids: this.chooseImgForm.picture_ids,
          name: this.formInfo.name
        }).then((res) => {
          if (res.data.code == "20210") {
            this.improveImgInfoDialog = false;
            this.$notify.success({
              title: "成功",
              message: res.data.msg
            });
            this.formInfo.name = '';
          } else {
            this.$notify.warning({
              title: "警告",
              message: res.data.msg
            });
          }
        });
      },
    },
    mounted() {
      this.getImgData();
    }
  }
</script>

<style lang="scss" scoped>
  #pictureManage {
    min-width: 1500px;
    .el-row {
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    $colorBor: rgba(255, 255, 255, .8);

    @mixin flex {
      display: -webkit-flex;
      display: flex;
    }

    @mixin border_radius($n) {
      -webkit-border-radius: $n;
      -moz-border-radius: $n;
      border-radius: $n;
    }

    @mixin back($n) {
      background: url($n) no-repeat;
      background-size: 100% 100%;
    }
    @mixin backLiner($a,$b) {
      background: -webkit-linear-gradient(left, $a, $b);
      background: -o-linear-gradient(left, $a, $b);
      background: -moz-linear-gradientleft, ($a, $b);
      background: linear-gradient(left, $a, $b);
    }
    img {
      width: 100%;
      height: 100%;
    }

    @font-face {
      font-family: Impact;                        //字体名称
      src: url(../../assets/font/impact-2.ttf);   //字体路径
    }

    .topBack, .topBackLeft {
      @include flex;
    }

    .topBack {
      width: 100%;
      height: 200px;
      @include back("../../assets/images/individual/beijing.png");
      justify-content: space-between;
      align-items: center;
      .topBackLeft {
        .leftPic {
          margin-left: 100px;
          margin-right: 20px;
          width: 120px;
          height: 120px;
          @include border_radius(50%);
          img {
            @include border_radius(50%);
          }
        }
        .rightPic {
          @include flex;
          align-content: center;
          flex-wrap: wrap;
          .landName {
            width: 100%;
            margin: 5px 0;
            @include flex;
            align-items: center;
            font-size: 21px;
            color: $colorBor;
            span:last-of-type {
              width: 24px;
              height: 24px;
              margin-left: 10px;
              @include back("../../assets/images/individual/1.png");
            }
          }
          .personalSign {
            font-size: 16px;
            color: $colorBor;
            i {
              color: white;
              margin-left: 5px;
              &:hover {
                color: #0db6ff;
              }
            }
          }
        }
      }
    }
    .main {
      min-height: 650px;
    }
    .main {
      .myPicture {
        margin-left: 17px;
        margin-top: 15px;
        color: #6a8dfb;
        padding-top: 10px;
        padding-bottom: 20px;
        border-bottom: 1px solid #e5e5e5;
      }
      .title {
        color: #409EFF;
        opacity: .7;
        margin: 12px 0;
        &:before {
          border-radius: 2px;
          margin-right: 5px;
          background: #409EFF;
          border-left: 1px solid #409EFF;
          content: '|';
        }
      }
      .pictures {
        margin: 17px;
      }
      /*.pictures {*/
      /*.pictureDetail {*/
      /*background: #eee;*/
      /*padding: 15px;*/
      /*-webkit-border-radius: 5px;*/
      /*-moz-border-radius: 5px;*/
      /*border-radius: 5px;*/
      /*}*/
      /*.clearfix{*/
      /*margin: 8px 0 3px;*/
      /*content:"";*/
      /*display: block;*/
      /*clear:both;*/
      /*}*/
      /*.text_over_norwap{*/
      /*width: 150px;*/
      /*overflow: hidden;*/
      /*white-space: nowrap;*/
      /*display: inline-block;*/
      /*text-overflow: ellipsis;*/
      /*height: 17px;*/
      /*}*/
      /*}*/
    }
    //card
    .time {
      font-size: 13px;
      color: #999;
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
    .el-button + .el-button {
      margin-left: 0 !important;
    }
    .imageItem {
      width: 100%;
      height: 180px;
      display: block;
      cursor: pointer;
    }

    .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }

    .clearfix:after {
      clear: both
    }
  }
</style>
