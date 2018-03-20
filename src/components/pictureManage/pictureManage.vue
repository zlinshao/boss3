<template>
  <div id="pictureManage" style="box-shadow: #acbae4 1px 3px 5px, #acbae4 1px 1px 5px;">
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
            <el-button icon="el-icon-picture-outline" type="primary" size="small" @click="openModalDialog('choosePicturesDialog')">上传照片</el-button>
            <el-button icon="el-icon-picture-outline" type="success" size="small" @click="openModalDialog('createAlbumDialog')">创建相册</el-button>
        </div>
          <div class="pictures">
            <el-row :gutter="30" >
              <div v-for="item in albumData">
                <el-col :span="4" style="margin-bottom:20px;">
                  <div class="pictureDetail" >
                   <el-dropdown style="float: right;position: relative;background: #fff;padding-right:3px;display: inline;margin-bottom: -15px;">
                      <span class="el-dropdown-link">
                        <i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="editAlbum(item.id)">编辑</el-dropdown-item>
                        <el-dropdown-item @click.native="deleteAlbum(item.id)">删除</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                    <img v-if="item.cover_path" :src="item.cover_path" height="150px" @click="goPictureDetail(item.id)">
                    <img v-else src="../../assets/images/university/caia412-34427.png" height="150px"  @click="goPictureDetail(item.id)">
                  <div class="clearfix">
                    <span class="text_over_norwap">{{item.name}}</span>
                    <span style="float: right;">{{item.photo_count}}张</span>
                  </div>
                </div>
                </el-col>
              </div>
            </el-row>
          </div>
        </el-col>
        <div class="left">
          <!--<el-pagination-->
            <!--@size-change="handleSizeChange"-->
            <!--@current-change="handleCurrentChange"-->
            <!--:current-page="currentPage"-->
            <!--:page-sizes="[10, 20, 30, 40]"-->
            <!--:page-size="10"-->
            <!--layout="total, sizes, prev, pager, next, jumper"-->
            <!--:total="0">-->
          <!--</el-pagination>-->
        </div>

      </el-row>
    </div>
    <create-album :createAlbumDialog="createAlbumDialog" @close="closeCreateAlbumDialog" :albumId="albumId"></create-album>
    <choose-pictures :choosePicturesDialog="choosePicturesDialog" @close="closeChoosePicturesDialog" ></choose-pictures>
  </div>
</template>

<script>
  import CreateAlbum from "./createAlbum";
  import choosePictures from './selectPictures.vue';
  export default {
    components: {
      CreateAlbum,
      choosePictures,
    },
    name: "picture-manage",
    data() {
      return {
        choosePicturesDialog: false,
        createAlbumDialog: false,
        albumData: [],
        albumId: '',
        coverImg: 'this.src="' + globalConfig.server + require('../../assets/images/university/caia412-34427.png') + '"' ,
      }
    },
    methods: {
      routerLink(val) {
        this.$router.push({path: val})
      },
      goPictureDetail(id) {
        this.$router.push({path: '/pictureDetail', query:{albumId: id}});
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
      closeCreateAlbumDialog() {
        this.getImgData();
        this.createAlbumDialog = false;
      },
      closeChoosePicturesDialog() {
        this.getImgData();
        this.choosePicturesDialog = false;
      },
      getImgData(){
        var self = this;
        this.$http.get(globalConfig.server + "album").then((res) =>{
          if (res.data.code == "20110") {
            self.albumData = res.data.data;
          }
        });
      },
      editAlbum(id) {
        this.createAlbumDialog = true;
        this.albumId = id;
      },
      deleteAlbum(id) {
        console.log(`deleteAlbum-albumId====${JSON.stringify(id)}`);
        this.$confirm('删除相册会将相册中的照片一起删除，您确定删除吗？','删除相册',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.put(globalConfig.server + 'album/delete/' + id).then((res) => {
            if(res.data.code == "20110") {
              this.getImgData();
            } else {
              this.$notify.warning({
                title:"警告",
                message:res.data.msg
              });
            }
          });
        })
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
      .myPicture {
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
          padding: 15px;
          -webkit-border-radius: 5px;
          -moz-border-radius: 5px;
          border-radius: 5px;
        }
        .clearfix{
          margin: 8px 0 3px;
          content:"";
          display: block;
          clear:both;
        }
        .text_over_norwap{
          width: 160px;
          overflow: hidden;
          white-space: nowrap;
          display: inline-block;
          text-overflow: ellipsis;
          height: 17px;
        }
        img{
          max-height: 150px;
        }
      }

      }

  }
</style>
