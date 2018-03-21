<template>
  <div id="pictureDetail">
    <div class="topBack">
      <div class="topBackLeft">
        <div class="leftPic">
          <img src="../../assets/images/individual/touxiang.png" alt="">
        </div>
        <div class="rightPic">
          <p>
            <span>姓名姓名</span>
            <span></span>
          </p>
          <p>
            个人签名个人签名个人签名个人签名
          </p>
        </div>
      </div>
      <div class="topBackRight">
        <div @click="routerLink('/pictureManage')">
          <span class="iconfont icon-shiyongshouce"></span>
          <span>照片</span>
        </div>
        <div>
          <span class="iconfont icon-shiyongshouce"></span>
          <span>收藏夹</span>
        </div>
      </div>
    </div>
    <div class="main">
      <el-row>
        <el-col :span="24">
          <div class="myPicture">
            <div>
              <el-button type="text" class="title" @click="routerLink('/pictureManage')">我的相册</el-button>
            </div>
            <div>
              <el-row :gutter="20">
                <el-col :span="4">
                  <img v-if="albumDetail.cover_path" :src="albumDetail.cover_path" style="height:195px;width: 200px;" />
                  <img v-else src="../../assets/images/university/caia412-34427.png" style="height:195px;width:200px;" />
                </el-col>
                <el-col :span="6">
                  <div style="font-size: 30px;color: #393939;padding-top: 30px;">{{albumDetail.name}}&nbsp;&nbsp;<span style="font-size: 18px;">{{albumDetail.photo_count}}张</span></div>
                  <el-button icon="el-icon-picture-outline" type="primary" class="upload_photo" size="medium" @click="openModalDialog('choosePicturesDialog')" >上传照片</el-button>
                  <el-button size="small" @click="editAlbum(albumDetail.id)">编辑相册信息</el-button>
                  <!--<el-button size="small">批量管理</el-button>-->
                  <!--<el-dropdown trigger="click" >-->
                    <!--<el-button size="small">更多</el-button>-->
                    <!--<el-dropdown-menu slot="dropdown">-->
                      <!--<el-dropdown-item>编辑相册信息</el-dropdown-item>-->
                      <!--<el-dropdown-item>设置相册封面</el-dropdown-item>-->
                      <!--<el-dropdown-item>删除相册</el-dropdown-item>-->
                    <!--</el-dropdown-menu>-->
                  <!--</el-dropdown>-->
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="pictures">
            <el-row :gutter="40" >
              <div v-for="item in photoData">
                <el-col :span="4" style="margin-bottom:20px;">
                  <div class="pictureDetail">
                    <el-dropdown style="float: right;position: relative;background: #fff;display: inline;margin-bottom: -15px;">
                      <span class="el-dropdown-link">
                        <i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="editPhoto(item)">编辑</el-dropdown-item>
                        <el-dropdown-item @click.native="setCoverImg(item)">设为封面</el-dropdown-item>
                        <!--<el-dropdown-item @click.native="movePhoto(item.id)">移动到相册</el-dropdown-item>-->
                        <el-dropdown-item @click.native="deletePhoto(item.id)">删除</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                    <img :src="item.picture_path" style="height: 200px;">
                    <div class="clearfix t_center">
                      <span class="text_over_ellipsis">{{item.name}}</span>
                    </div>
                  </div>
                </el-col>
              </div>
            </el-row>
          </div>
          <div style="text-align: center;">
            <el-pagination
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
    <el-dialog id="photoDetail" title="编辑照片信息" :visible.sync="photoDetailDialogVisible" width="30%">
      <div class="">
        <el-form size="mini" onsubmit="return false;" :model="photoForm" label-width="100px">
          <el-row >
            <el-form-item label="照片名称:">
              <el-input v-model="photoForm.name" placeholder="请输入照片名称" ></el-input>
            </el-form-item>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="photoDetailDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="savePhotoSuccess">确 定</el-button>
      </span>
    </el-dialog>

    <create-album :createAlbumDialog="createAlbumDialog" @close="closeCreateAlbumDialog" :albumId="albumDetail.id"></create-album>
    <choose-pictures :choosePicturesDialog="choosePicturesDialog" @close="closeChoosePicturesDialog" :albumId="albumId" fromDetail="fromPicture"></choose-pictures>
  </div>
</template>

<script>
  import CreateAlbum from "./createAlbum";
  import choosePictures from './selectPictures.vue';
  import RightMenu from '../common/rightMenu.vue'    //右键
  export default {
    components: {
      CreateAlbum,
      choosePictures,
      RightMenu,
    },
    name: "picture-detail",
    data() {
      return {
        choosePicturesDialog: false,
        createAlbumDialog: false,
        photoData: [],
        albumDetail: {},
        albumId: this.$route.query.albumId,
        photoDetailDialogVisible: false,
        photoForm: {
          name: '',
        },
        show: false,
        lists: [],
        rightMenuX: 0,
        rightMenuY: 0,
        totalNum: 0,
        currentPage: 1,
        saveItemId: '',
      }
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
        this.getAllPhotos();
      },
      routerLink(val) {
        this.$router.push({path: val});
      },
      openModalDialog(type) {
        switch(type) {
          case 'choosePicturesDialog':   //打开上传图片对话框
            this.choosePicturesDialog = true;
            break;
          case 'createAlbumDialog':   //打开创建相册对话框
            this.createAlbumDialog = true;
            break;
        }
      },
      closeCreateAlbumDialog(){
        this.getAllPhotos();
        this.getAlbumDetail();
        this.createAlbumDialog = false;
      },
      closeChoosePicturesDialog() {
        this.getAllPhotos();
        this.getAlbumDetail();
        this.choosePicturesDialog = false;
      },
      getAllPhotos(){
        this.$http.get(globalConfig.server + "photo?album_id="+ this.albumId +"&page="+ this.currentPage+"&limit=12").then((res) => { //
          if (res.data.code == "20210") {
            this.photoData = res.data.data;
            this.totalNum = res.data.num;
          } else {
            this.$notify.warning({
              title:"警告",
              message:res.data.msg
            });
          }
        });
      },
      editPhoto(item) {
        this.photoDetailDialogVisible = true;
        this.$http.get(globalConfig.server + "photo/" + item.id).then((res) =>{
          if(res.data.code == "20210") {
            this.photoForm = res.data.data;
            this.saveItemId = item.id;
          }else{
            this.$notify.warning({
              title:"警告",
              message:res.data.msg
            });
          }
        });
      },
      savePhotoSuccess(){
        this.$http.put(globalConfig.server + "photo/" + this.saveItemId,this.photoForm).then((res) =>{
          if(res.data.code == "20210") {
            this.photoForm = res.data.data;
            this.photoDetailDialogVisible = false;
            this.getAllPhotos();
          }else{
            this.$notify.warning({
              title:"警告",
              message:res.data.msg
            });
          }
        });
      },
      setCoverImg(item) {
        this.$http.put(globalConfig.server + 'album/cover/' +  this.albumId + '?cover=' + item.id).then((res) => {
          if(res.data.code == "20110") {
            this.$notify.success({
              title:"成功",
              message:res.data.msg
            });
            this.getAlbumDetail();
          } else {
            this.$notify.warning({
              title:"警告",
              message:res.data.msg
            });
          }
        });
      },
      movePhoto(id) {

      },
      deletePhoto(id) {
        this.$confirm('确定删除照片吗？','删除照片',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.put(globalConfig.server + 'photo/delete/'+ id ).then((res) =>{
            if (res.data.code == "20210") {
              this.getAllPhotos();  // 重新请求数据，相当于刷新
              this.getAlbumDetail();
            } else {
              this.$notify.warning({
                title:"警告",
                message:res.data.msg
              });
            }
          });
        });

      },
      editPhotoSuccess() {
        this.$http.put(globalConfig.server + 'photo/',this.photoForm).then((res) =>{
          if(res.data.code == "20210") {
            this.photoDetailDialogVisible = true;
          } else {
            this.$notify.warning({
              title:"警告",
              message:res.data.msg
            });
          }
        });
      },
      editAlbum(id) {
        this.createAlbumDialog = true;
      },
      getAlbumDetail(){
        this.$http.get(globalConfig.server + 'album/'+ this.albumId).then((res) => {
            if(res.data.code == '20110'){
              this.albumDetail = res.data.data;
            }else{
              this.$notify.warning({
                title:"警告",
                message:res.data.msg
              });
            }
        });
      },
    },
    mounted() {
      this.getAllPhotos();
      this.getAlbumDetail();
    }
  }
</script>

<style lang="scss" scoped>
  .t_center{
    text-align: center;
  }
  .upload_photo {
    margin-top: 40px;
  }
  #pictureDetail {
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

    .topBack, .topBackLeft, .topBackRight {
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
        }
        .rightPic {
          p {
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
          p:last-of-type {
            font-size: 18px;
          }
        }
      }
      .topBackRight {
        margin-right: 220px;
        div + div {
          margin-left: 20px;
        }
        div {
          font-size: 18px;
          color: $colorBor;
          @include flex;
          align-items: center;
          span:first-of-type {
            font-size: 24px;
            padding-top: 6px;
          }
        }
        div:nth-of-type(1) {
          span:first-of-type {
            color: #6abdfd;
          }
        }
        div:nth-of-type(2) {
          span:first-of-type {
            color: #fb4699;
          }
        }
        div:nth-of-type(3) {
          span:first-of-type {
            color: #f0c044;
          }
        }
      }
    }
    .main{
      min-height: 650px;
    }
    .main {
      .myPicture{
        margin-left: 17px;
        color: #6a8dfb;
        padding-top: 10px;
        padding-bottom: 20px;
        border-bottom: 1px solid #e5e5e5;
      }
      .title {
        font-size: 14px;
        margin: 12px 0;
      }
      .pictures{
        margin: 17px;
      }
      .pictures {
        .pictureDetail {
          background: #eee;
          padding: 0 0 15px;
          -webkit-border-radius: 5px;
          -moz-border-radius: 5px;
          border-radius: 5px;
        }
        .clearfix{
          margin: 8px 0 3px;
          content:"";
          display: block;
          clear:both;
          height: 17px;
        }
        .text_over_ellipsis{
          width: 150px;
          overflow: hidden;
          white-space: nowrap;
          display: inline-block;
          text-overflow: ellipsis;
        }
      }

    }

  }
</style>
