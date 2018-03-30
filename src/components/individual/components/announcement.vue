<template>
  <el-dialog title="公告" :visible.sync="announcementDialogVisible">
    <div class="scroll_bar">
      <div class="navTop" v-bind:class="{ no1: no1flag, no2: no2flag, no3: no3flag }">
        <div class="top0">
          <div class="top1" v-bind:class="{ no1tit: no1flag, no2tit: no2flag, no3tit: no3flag }">{{lookinfo.title}}
          </div>
          <div class="top2">
            <span>{{lookinfo.create_time}}</span>
            <span>南京乐伽商业管理有限公司</span>
          </div>
        </div>
        <div class="top3">
          <b>
            <i class="iconfont icon-yanjing"></i>
            <span>{{lookinfo.read_count}}人</span>
          </b>
          <b>
            <i class="iconfont icon-yanjingclose"></i>
            <span>{{lookinfo.read_uncount}}人</span>
          </b>
        </div>
      </div>
      <div class="main">
        <div class="mainTop">公司各部门：</div>
        <div class="mainTitle" v-html="lookinfo.content">

        </div>
        <div class="mainFooter">
          <div>
            <p>南京乐伽商业管理有限公司</p>
            <p>{{lookinfo.create_time}}</p>
          </div>
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
    props: ["announcementDialog", "announcementData"],
    name: "index",
    data() {
      return {
        announcementDialogVisible: false,
        lookinfo: {},
        no1flag: false,
        no2flag: false,
        no3flag: false
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
        }
      },
      announcementData(val) {
        this.lookinfo = val;
        if (val.type === "表彰") {
          this.no1flag = true;
          this.no2flag = false;
          this.no3flag = false;
        } else if (val.type === "通知") {
          this.no1flag = false;
          this.no2flag = true;
          this.no3flag = false;
        } else {
          this.no1flag = false;
          this.no2flag = false;
          this.no3flag = true;
        }
      }
    },
    methods: {}
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
  .navTop {
    background-size: 100% 100%;
    width: 100%;
    height: 170px;
    padding: 0 10px;
    @include flex;
    flex-wrap: wrap;
    align-content: space-between;
    .top0 {
      width: 100%;
      .top1 {
        font-weight: bold;
        font-size: 20px;
        margin-bottom: 15px;
      }
      .top2 {
        width: 100%;
        font-size: 14px;
        @include flex;
        justify-content: space-between;
      }
    }
    .top3 {
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

  .main {
    padding-top: 10px;
    .mainTop,
    .mainTitle,
    .mainFooter {
      width: 100%;
      font-size: 13px;
    }

    .mainFooter {
      @include flex;
      justify-content: flex-end;
      div {
        p {
          margin: 0;
          text-align: center;
        }
      }
    }
  }
</style>
