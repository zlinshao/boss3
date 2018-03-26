<template>
<el-dialog title="公告预览" :visible.sync="increaseGoodsDialogVisible" width="650px">
  <div >
    <div class="navTop" v-bind:class="{ no1: no1flag, no2: no2flag, no3: no3flag }">
      <div class="top0">
        <div class="top1" v-bind:class="{ no1tit: no1flag, no2tit: no2flag, no3tit: no3flag }">{{lookinfo.title}}</div>
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
    <div class="main scroll_bar" >
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
        <el-button size="small" type="primary" @click="increaseGoodsDialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
</template>

<script>
export default {
  props: ["warningDialog", "lookat"],
  name: "index",
  data() {
    return {
      increaseGoodsDialogVisible: false,
      lookinfo: {},
      no1flag: false,
      no2flag: false,
      no3flag: false
    };
  },
  mounted() {},
  watch: {
    warningDialog(val) {
      this.increaseGoodsDialogVisible = val;
    },
    increaseGoodsDialogVisible(val) {
      if (!val) {
        this.$emit("close");
      }
    },
    lookat(val) {
      this.lookinfo = val;
      if (val.type == "表彰") {
        this.no1flag = true;
        this.no2flag = false;
        this.no3flag = false;
      } else if (val.type == "通知") {
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
  background: url("../../../../../assets/images/shenp1.jpg") no-repeat;
}
.no2 {
  background: url("../../../../../assets/images/shenp2.jpg") no-repeat;
}
.no3 {
  background: url("../../../../../assets/images/shenp3.jpg") no-repeat;
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
  background-size: 620px 170px;
  width: 620px;
  height: 170px;
  @include flex;
  flex-wrap: wrap;
  align-content: space-between;
  .top0 {
    width: 100%;
    .top1 {
      font-weight: bold;
      font-size: 24px;
      margin-bottom: 15px;
    }
    .top2 {
      width: 94%;
      margin-left: 20px;
      font-size: 16px;
      @include flex;
      justify-content: space-between;
    }
  }
  .top3 {
    width: 98%;
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
  height: 300px;
  overflow: auto;
  flex-wrap: wrap;

  .mainTop,
  .mainTitle,
  .mainFooter {
    width: 100%;
    font-size: 16px;
  }
  .mainFooter {
    @include flex;
    justify-content: flex-end;
    div {
      p {
        margin: 10px 0;
        line-height: 32px;
        text-align: center;
      }
    }
  }
}
</style>
