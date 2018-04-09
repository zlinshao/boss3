<template>
  <div id="pictureManage">
    <div class="topBack">
      <div class="topBackLeft">
        <div class="leftPic">
          <img :src="landholder.avatar" v-if="landholder.avatar !== ''">
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
            <span v-if="!isEdit && (!landholder.data || !landholder.data.signature)" style="cursor: pointer" @click.stop="showInput">添加工作状态...</span>
            <el-input id="editInput" size="mini" @blur="editPersonalSign($event)" @keyup.enter.native="editPersonalSign($event)"
                      v-if="isEdit" v-model="params.content"></el-input>
          </div>
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
            <el-row :gutter="20">
              <el-col :span="3" v-for="(item,index) in albumData" :key="index"  style="margin-bottom: 20px">
                <el-card :body-style="{ padding: '0px'}">
                  <img v-if="item.cover_path" :src="item.cover_path" class="imageItem" @click="goPictureDetail(item.id)">
                  <img  class="imageItem" src="../../assets/images/university/caia412-34427.png" v-else @click="goPictureDetail(item.id)">
                  <div style="padding: 14px;">
                    <span style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{item.name}}</span>
                    <div class="bottom clearfix">
                      <time class="time">{{item.photo_count}}张</time>
                      <el-tooltip content="删除" placement="bottom" effect="light">
                        <el-button type="text" class="button" @click="deleteAlbum(item.id)">
                          <i class="el-icon-delete"></i>
                        </el-button>
                      </el-tooltip>

                      <el-tooltip content="编辑" placement="bottom" effect="light">
                        <el-button type="text" class="button" @click="editAlbum(item.id)">
                          <i  class="el-icon-edit"></i>
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
        totalNum: 0,
        currentPage: 1,
        landholder:{},
        isEdit:false,
        params:{
          content:''
        },
        isChanged:false,
      }
    },
    created(){
      this.landholder = JSON.parse(localStorage.personal);
      this.getImgData();
    },
    watch:{
      'params.content':{
        handler(val,oldVal){
          if(val!==oldVal&&oldVal){
            this.isChanged = true;
          }
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
        this.$http.get(globalConfig.server + "album?page="+ this.currentPage+"&limit=16").then((res) =>{
          if (res.data.code === "20110") {
            this.albumData = res.data.data;
            this.totalNum = res.data.num;
          }
        });
      },
      editAlbum(id) {
        this.createAlbumDialog = true;
        this.albumId = id;
      },
      deleteAlbum(id) {
        this.$confirm('删除相册会将相册中的照片一起删除，您确定删除吗？','删除相册',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.put(globalConfig.server + 'album/delete/' + id).then((res) => {
            if(res.data.code ==="20110") {
              this.getImgData();
              this.$notify.success({
                title:"成功",
                message:res.data.msg
              });
            } else {
              this.$notify.warning({
                title:"警告",
                message:res.data.msg
              });
            }
          });
        })
      },
      //修改个性签名
      showInput(){
        this.isEdit = true;
        this.params.content = this.landholder.data.signature.content;
        setTimeout(()=>{
          this.isChanged = false;
          $('#editInput').focus();
        })
      },
      editPersonalSign(e){
        this.isEdit = false;
        if(this.isChanged){
          this.$http.post(globalConfig.server+'manager/staff_record',this.params).then((res) =>{
            let personal =  JSON.parse(localStorage.personal);
            if(res.data.code === '30010'){
              personal.data.signature = res.data.data;
              localStorage.setItem('personal', JSON.stringify(personal));
              this.landholder = JSON.parse(localStorage.personal);
            }else {
              this.$notify.warning({
                title:'警告',
                message:res.data.msg
              })
            }
          })
        }
      }
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
          img{
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
          .personalSign{
            font-size: 16px;
            color: $colorBor;
            i{
              color: white;
              margin-left: 5px;
              &:hover{
                color: #0db6ff;
              }
            }
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
    .el-button+.el-button {
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
