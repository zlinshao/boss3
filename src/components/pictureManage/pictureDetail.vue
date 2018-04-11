<template>
  <div id="pictureDetail">
    <div class="main">
      <el-row>
        <el-col :span="24">
          <div class="myPicture">
            <div class="title">
              <el-button type="text" size="mini" @click="routerLink('/pictureManage')">我的相册</el-button>
            </div>
            <div>
              <el-row :gutter="20">
                <el-col :span="3">
                  <img v-if="albumDetail.cover_path" :src="albumDetail.cover_path" style="height:180px;width: 180px;border-radius: 5px" />
                  <img  src="../../assets/images/university/caia412-34427.png" v-else style="height:180px;width:180px;border-radius: 5px" />
                </el-col>
                <el-col :span="10">
                  <div style="font-size: 30px;color: #393939;padding-top: 30px;">
                    {{albumDetail.name}}&nbsp;&nbsp;&nbsp;&nbsp;<span style="font-size: 18px;">{{albumDetail.photo_count}}张</span>
                  </div>
                  <el-button icon="el-icon-picture-outline" type="primary" class="upload_photo"
                             size="small" @click="openModalDialog('choosePicturesDialog')" >上传照片</el-button>
                  <el-button size="small" @click="editAlbum(albumDetail.id)">编辑相册信息</el-button>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="pictures">
            <el-row :gutter="20">
              <el-col :span="3" v-for="(item,index) in photoData" :key="index"  style="margin-bottom: 20px">
                <el-card :body-style="{ padding: '0px'}" shadow="hover">
                  <img :src="item.picture_path" data-magnify="" :data-src="item.picture_path" class="imageItem">
                  <div style="padding: 14px;">
                    <span style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{item.name}}</span>
                    <div class="bottom clearfix">
                      <time class="time">{{item.created_at.split(' ')[0]}}</time>
                      <el-tooltip content="删除" placement="bottom" effect="light">
                        <el-button type="text" class="button" @click="deletePhoto(item.id)">
                          <i class="el-icon-delete"></i>
                        </el-button>
                      </el-tooltip>

                      <el-tooltip content="封面" placement="bottom" effect="light">
                        <el-button type="text" class="button">
                          <i class="el-icon-picture" @click="setCoverImg(item)"></i>
                        </el-button>
                      </el-tooltip>

                      <el-tooltip content="编辑" placement="bottom" effect="light">
                        <el-button type="text" class="button" @click="editPhoto(item)">
                          <i  class="el-icon-edit"></i>
                        </el-button>
                      </el-tooltip>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>
          <div style="text-align: center;margin-bottom: 20px">
            <div v-if="totalNum==0">暂无数据</div>
            <el-pagination v-else
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[16, 32, 48, 64]"
              :page-size="16"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalNum">
            </el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-dialog :close-on-click-modal="false" id="photoDetail" title="编辑照片信息" :visible.sync="photoDetailDialogVisible" width="30%">
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

    <create-album :createAlbumDialog="createAlbumDialog" @close="closeCreateAlbumDialog" :albumId="albumDetail.id" fromDetail="fromPicture"></create-album>
    <choose-pictures :choosePicturesDialog="choosePicturesDialog" @close="closeChoosePicturesDialog" :albumId="albumId"></choose-pictures>
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
        albumId: '',
      }
    },
    // computed:{
    //   albumId(){
    //     return  this.$route.query.albumId ? this.$route.query.albumId : this.$store.state.picture.albumId;
    //   }
    // },
    mounted() {
      this.getAlbumId();
      this.getAllPhotos();
      this.getAlbumDetail();
    },
    activated(){
      this.getAlbumId();
      this.getAllPhotos();
      this.getAlbumDetail();
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
        this.choosePicturesDialog = false;
        this.getAllPhotos();
        this.getAlbumDetail();
      },
      getAllPhotos(){
        this.$http.get(globalConfig.server + "photo?album_id="+ this.albumId +"&page="+ this.currentPage+"&limit=16").then((res) => { //
          if (res.data.code == "20210") {
            this.photoData = res.data.data;
            this.totalNum = res.data.num;
          } else if(res.data.code == "20212"){
            this.photoData = [];
            this.totalNum = 0;
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
      deletePhoto(id) {
        this.$confirm('确定删除照片吗？','删除照片',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.put(globalConfig.server + 'photo/delete/'+ id +"?album_id="+ this.albumId).then((res) =>{
            if (res.data.code == "20210") {
              this.getAllPhotos();  // 重新请求数据，相当于刷新
              this.getAlbumDetail();
              this.$notify.success({
                title:"成功",
                message:res.data.msg
              });
            }
          });
        });

      },
      savePhotoSuccess() {
        this.$http.put(globalConfig.server + 'photo/'+this.saveItemId+"?album_id="+this.albumId+"&name="+ this.photoForm.name).then((res) =>{
          if(res.data.code == "20210") {
            this.photoDetailDialogVisible = false;
            this. getAllPhotos();
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
      getAlbumId() {
        //刷新保存
        if(!this.$route.query.albumId) {
          this.$router.push({path:"/pictureDetail",query:{albumId:this.$store.state.picture.albumId}});
        }
        let query = this.$route.query;
        this.albumId = query.albumId;
        this.$store.dispatch('saveAlbumId',query.albumId);
      },
    },

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
    margin: -10px;
    background: #ffffff;
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
      /*width: 100%;*/
      /*height: 100%;*/
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
        margin: 0 17px;
        color: #6a8dfb;
        padding-top: 10px;
        padding-bottom: 20px;
        border-bottom: 1px solid #e5e5e5;
      }
      .title {
        font-size: 14px;
        margin: 12px 0;
        border-bottom: 1px solid #e4e4e4;
      }
      .pictures{
        margin: 17px;
      }
      /*.pictures {*/
        /*.pictureDetail {*/
          /*background: #eee;*/
          /*padding: 10px;*/
          /*-webkit-border-radius: 5px;*/
          /*-moz-border-radius: 5px;*/
          /*border-radius: 5px;*/
        /*}*/
        /*.clearfix{*/
          /*margin: 8px 0 3px;*/
          /*content:"";*/
          /*display: block;*/
          /*clear:both;*/
          /*height: 19px;*/
        /*}*/
        /*.text_over_ellipsis{*/
          /*width: 150px;*/
          /*overflow: hidden;*/
          /*white-space: nowrap;*/
          /*display: inline-block;*/
          /*text-overflow: ellipsis;*/
        /*}*/
      /*}*/

    }
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
  .el-button+.el-button {
     margin-left: 0 !important;
  }
  .imageItem {
    width: 100%;
    height: 180px;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>
