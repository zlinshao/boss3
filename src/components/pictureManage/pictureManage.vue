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
            <div class="title">我的相册</div>
              <el-button icon="el-icon-picture-outline" type="primary" size="small" @click="openModalDialog('uploadImageDialog')">上传照片</el-button>
              <el-button icon="el-icon-picture-outline" type="success" size="small" @click="openModalDialog('createAlbumDialog')">创建相册</el-button>
          </div>
          <div class="pictures">
            <el-row :gutter="35">
              <el-col :span="4">
                <div class="pictureDetail">
                <img src="../../assets/images/university/caia412-34427.png">
                <div class="clearfix">
                  <span class="text_over_ellipsis">相册名称相册名称相册名称相册名称</span>
                  <span style="float: right;">25张</span>
                </div>
              </div>
              </el-col>
              <el-col :span="4">
                <div class="pictureDetail">
                  <img src="../../assets/images/university/caia412-34427.png">
                  <div class="clearfix">
                    <span class="text_over_ellipsis">相册名称相册名称相册名称相册名称</span>
                    <span style="float: right;">25张</span>
                  </div>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="pictureDetail">
                  <img src="../../assets/images/university/caia412-34427.png">
                  <div class="clearfix">
                    <span class="text_over_ellipsis">相册名称相册名称相册名称相册名称</span>
                    <span style="float: right;">25张</span>
                  </div>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="pictureDetail">
                  <img src="../../assets/images/university/caia412-34427.png">
                  <div class="clearfix">
                    <span class="text_over_ellipsis">相册名称相册名称相册名称相册名称</span>
                    <span style="float: right;">25张</span>
                  </div>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="pictureDetail">
                  <img src="../../assets/images/university/caia412-34427.png">
                  <div class="clearfix">
                    <span class="text_over_ellipsis">相册名称相册名称相册名称相册名称</span>
                    <span style="float: right;">25张</span>
                  </div>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="pictureDetail">
                  <img src="../../assets/images/university/caia412-34427.png">
                  <div class="clearfix">
                    <span class="text_over_ellipsis">相册名称相册名称相册名称相册名称</span>
                    <span style="float: right;">25张</span>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="35">
              <el-col :span="4">
                <div class="pictureDetail">
                  <img src="../../assets/images/university/caia412-34427.png">
                  <div class="clearfix">
                    <span class="text_over_ellipsis">相册名称相册名称相册名称相册名称</span>
                    <span style="float: right;">25张</span>
                  </div>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="pictureDetail">
                  <img src="../../assets/images/university/caia412-34427.png">
                  <div class="clearfix">
                    <span class="text_over_ellipsis">相册名称相册名称相册名称相册名称</span>
                    <span style="float: right;">25张</span>
                  </div>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="pictureDetail">
                  <img src="../../assets/images/university/caia412-34427.png">
                  <div class="clearfix">
                    <span class="text_over_ellipsis">相册名称相册名称相册名称相册名称</span>
                    <span style="float: right;">25张</span>
                  </div>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="pictureDetail">
                  <img src="../../assets/images/university/caia412-34427.png">
                  <div class="clearfix">
                    <span class="text_over_ellipsis">相册名称相册名称相册名称相册名称</span>
                    <span style="float: right;">25张</span>
                  </div>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="pictureDetail">
                  <img src="../../assets/images/university/caia412-34427.png">
                  <div class="clearfix">
                    <span class="text_over_ellipsis">相册名称相册名称相册名称相册名称</span>
                    <span style="float: right;">25张</span>
                  </div>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="pictureDetail">
                  <img src="../../assets/images/university/caia412-34427.png">
                  <div class="clearfix">
                    <span class="text_over_ellipsis">相册名称相册名称</span>
                    <span style="float: right;">25张</span>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>

      </el-row>
    </div>
    <create-album :createAlbumDialog="createAlbumDialog" @close="closeCreateAlbumDialog"></create-album>
  </div>
</template>

<script>
  import CreateAlbum from "./createAlbum";

  export default {
    components: {CreateAlbum},
    name: "picture-manage",
    data() {
      return {
        uploadImageDialog: false,
        createAlbumDialog: false,
      }
    },
    methods: {
      routerLink(val) {
        this.$router.push({path: val})
      },
      openModalDialog(type) {
        switch(type) {
          case 'uploadImageDialog':   //打开上传图片对话框
            this.uploadImageDialog = true;
            break;
          case 'createAlbumDialog':   //打开创建相册对话框
            this.createAlbumDialog = true;
            break;
        }
      },
      closeCreateAlbumDialog(){
        this.createAlbumDialog = false;
      }
    }
  }
</script>

<style lang="scss" scoped>
  #pictureManage {
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
        .text_over_ellipsis{
          width: 160px;
          overflow: hidden;
          white-space: nowrap;
          display: inline-block;
          text-overflow: ellipsis;
        }
        img{
          max-height: 150px;
        }
      }

      }

  }
</style>
