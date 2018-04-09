<template>
  <el-dialog title="公告" :visible.sync="announcementDialogVisible">
    <div class="scroll_bar">
      <div class="headContainer" :class="{ no1: no1flag, no2: no2flag, no3: no3flag }">
        <div class="headTitle">
          <div class="title" :class="{ no1tit: no1flag, no2tit: no2flag, no3tit: no3flag }">
            {{detailData.title}}
          </div>
          <div class="time_depart">
            <span>{{detailData.create_time}}</span>
            <span>南京乐伽商业管理有限公司</span>
          </div>
        </div>
        <div class="readers">
          <b>
            <i class="iconfont icon-yanjing"></i>
            <span>{{detailData.read_count}}人</span>
          </b>
          <b>
            <i class="iconfont icon-yanjingclose"></i>
            <span>{{detailData.unread_count}}人</span>
          </b>
        </div>
      </div>
      <div class="mainContainer">
        <div class="mainTop">公司各部门：</div>
        <div class="mainTitle" id="htmlForEditor"></div>
        <div class="mainFooter">
          <div>
            <p>南京乐伽商业管理有限公司</p>
            <p>{{detailData.create_time}}</p>
          </div>
        </div>
      </div>
      <div class="file" v-if="detailData.attachment && detailData.attachment.length>0">
        <div v-for="item in detailData.attachment" style="margin-top: 10px">
          <img src="../../../assets/images/xls.png" v-if="item.name.indexOf('xls')>-1" alt="">
          <img src="../../../assets/images/doc.png" v-if="item.name.indexOf('doc')>-1" alt="">
          <img src="../../../assets/images/txt.png" v-if="item.name.indexOf('txt')>-1" alt="">
          <img src="../../../assets/images/pdf.png" v-if="item.name.indexOf('pdf')>-1" alt="">
          <img src="../../../assets/images/file.png" alt="" v-if="item.name.indexOf('xls')<0&&item.name.indexOf('doc')<0
               &&item.name.indexOf('txt')<0 && item.name.indexOf('pdf')<0">
          {{item.raw_name}}
          <a class="downLoad" :href="item.uri" target="_blank" :download="item.raw_name">下载</a>
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
        <!--<el-button size="small" type="primary" @click="announcementDialogVisible = false">关闭</el-button>-->
    </span>
  </el-dialog>
</template>

<script>
  export default {
    props: ["announcementDialog", "announcementId"],
    name: "index",
    data() {
      return {
        announcementDialogVisible: false,
        no1flag: false,
        no2flag: false,
        no3flag: false,
        detailData: {},
      };
    },
    mounted() {
    },
    watch: {
      announcementDialog(val) {
        this.announcementDialogVisible = val;
      },
      announcementDialogVisible(val) {
        if (!val) {
          this.$emit("close");
        } else {

        }
      },
      announcementId(val){
        if (val) {
          this.getDetail();
        }
      }
//      announcementId(val) {
//        if (val.type === "表彰") {
//          this.no1flag = true;
//          this.no2flag = false;
//          this.no3flag = false;
//        } else if (val.type === "通知") {
//          this.no1flag = false;
//          this.no2flag = true;
//          this.no3flag = false;
//        } else {
//          this.no1flag = false;
//          this.no2flag = false;
//          this.no3flag = true;
//        }
//      }
    },
    methods: {
      getDetail(){
        this.$http.get(globalConfig.server + 'announcement/' + this.announcementId).then((res) => {
          if (res.data.code === '80010') {
            this.detailData = res.data.data;
            $('#htmlForEditor').html(this.detailData.content)
            this.no1flag = this.detailData.type === 1;  //
            this.no3flag = this.detailData.type === 2;
            this.no2flag = this.detailData.type === 3;
          }
        })
      },

    }
  };
</script>

<style scoped lang="scss">
  @mixin flex {
    display: flex;
    display: -webkit-flex;
  }

  .no1 {
    background: url("../../../assets/images/shenp1.jpg") no-repeat;
  }

  .no2 {
    background: url("../../../assets/images/shenp2.jpg") no-repeat;
  }

  .no3 {
    background: url("../../../assets/images/shenp3.jpg") no-repeat;
  }

  .no1tit {
    color: #f36853;
  }

  .no2tit {
    color: #39b1ff;
  }

  .no3tit {
    color: #ff943e;
  }

  .headContainer {
    background-size: 100% 100%;
    height: 170px;
    padding: 10px;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    @include flex;
    flex-wrap: wrap;
    align-content: space-between;
    .headTitle {
      width: 100%;
      .title {
        font-weight: bold;
        font-size: 20px;
        margin-bottom: 15px;
      }
      .time_depart {
        width: 100%;
        font-size: 14px;
        @include flex;
        justify-content: space-between;
      }
    }
    .readers {
      width: 100%;
      margin-bottom: 10px;
      @include flex;
      font-size: 16px;
      justify-content: flex-end;
      b {
        @include flex;
        margin-left: 24px;
        i {
          color: #e0e0e0;
          padding-right: 6px;
          font-size: 16px;
        }
      }
    }
  }

  .mainContainer {
    padding-top: 10px;
    .mainTop,
    .mainTitle,
    .mainFooter {
      width: 100%;
      font-size: 13px;
    }
    .mainFooter {
      margin-top: 15px;
      @include flex;
      border-bottom: 1px solid #ddd;
      justify-content: flex-end;
      p {
        margin: 0;
        text-align: center;
      }
    }
  }

  .file {
    .downLoad {
      color: #409EFF;
      &:hover {
        color: #6a8dfb;
      }
    }
    img {
      width: 40px;
      height: 40px;
      vertical-align: middle;
      margin-right: 10px;
    }
  }

</style>
