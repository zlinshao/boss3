<template>
  <div>
    <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false"  width="0" style="margin-top:20vh" :visible.sync="noticeTitleVisible">
    <div class="badgeup" >
      <span class="span1">制度标题制度标题制度标题制度标题</span>

      <div class="msg">
        <img src="../../assets/images/head.jpg" />
        <span style="float:left; line-height:40px;">李巧俊&nbsp;&nbsp;&nbsp;&nbsp;研发部-产品经理</span>
        <span style="float:right;margin-right:20px;">2017-11-26&nbsp;21:41:20</span>
      </div>
      <div class="article scroll_bar">
        我的世界不能不工我爱迪生基夺 工我的世界不能不工我爱迪生基夺 工我的世界不能不工我爱迪生基夺 工我的世界不能不工我爱迪生基夺 工我的世界不能不工我爱迪生基夺 工我的世界不能不工我爱迪生基夺 工我的世界不能不工我爱迪生基夺 工我的世界不能不工我爱迪生基夺 工我的世界不能不工我爱迪生基夺 工我的世界不能不工我爱迪生基夺 工我的世界不能不工我爱迪生基夺 工我的世界不能不工我爱迪生基夺 工我的世界不能不工我爱迪生基夺 工我的世界不能不工我爱迪生基夺 工我的世界不能不工我爱迪生基夺 工我的世界不能不工我爱迪生基夺 工我的世界不能不工我爱迪生基夺 工我的世界不能不工我爱迪生基夺 工我的世界不能不工我爱迪生基夺 工我的世界不能不工我爱迪生基夺 工
        我的世界不能不工我爱迪生基夺 工我的世界不能不工我爱迪生基夺 工我的世界不能不工我爱迪生基夺 工我的世界不能不工我爱迪生基夺 工我的世界不能不工我爱迪生基夺 工我的世界不能不工我爱迪生基夺 工我的世界不能不工我爱迪生基夺 工我的世界不能不工我爱迪生基夺 工我的世界不能不工我爱迪生基夺 工我的世界不能不工我爱迪生基夺 工我的世界不能不工我爱迪生基夺 工我的世界不能不工我爱迪生基夺 工我的世界不能不工我爱迪生基夺 工我的世界不能不工我爱迪生基夺 工我的世界不能不工我爱迪生基夺 工
        我的世界不能不工我爱迪生基夺 工我的世界不能不工我爱迪生基夺 工我的世界不能不工我爱迪生基夺 工我的世界不能不工我爱迪生基夺 工我的世界不能不工我爱迪生基夺 工我的世界不能不工我爱迪生基夺 工我的世界不能不工我爱迪生基夺 工我的世界不能不工我爱迪生基夺 工我的世界不能不工我爱迪生基夺 工我的世界不能不工我爱迪生基夺 工我的世界不能不工我爱迪生基夺 工我的世界不能不工我爱迪生基夺 工我的世界不能不工我爱迪生基夺 工我的世界不能不工我爱迪生基夺 工我的世界不能不工我爱迪生基夺 工
        我的世界不能不工我爱迪生基夺 工我的世界不能不工我爱迪生基夺 工我的世界不能不工我爱迪生基夺 工我的世界不能不工我爱迪生基夺 工我的世界不能不工我爱迪生基夺 工
      </div>
      <div class="button">
        <el-button size="small" @click="close" type="primary">我知道了</el-button>
      </div>
    </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "hello",
  props: ["noticeTitleDialog"],
  data() {
    return {
      landholder: {},
      panelShow: false,
      loginDay: 0, //连续登陆天数
      noticeTitleVisible: false,
      type: 3,
      xljt: "",
    };
  },
  watch: {
    noticeTitleDialog(val) {
      this.noticeTitleVisible = val;
    },
    noticeTitleVisible(val) {
      if (!val) {
        this.$emit("close");
      }
    }
  },
  mounted() {
    this.landholder = JSON.parse(localStorage.personal);
  },
  methods: {
    close(){
      this.noticeTitleVisible=false;
    },
    closeBadge() {
      // this.$http
      //   .post(globalConfig.server + "manager/staff_record", { type: this.type })
      //   .then(res => {
      //     if (res.data.code === "30010") {
      //       this.badgeDialogVisible = false;
      //       this.$http
      //         .get(globalConfig.server + "special/special/loginInfo")
      //         .then(res => {
      //           localStorage.setItem("personal", JSON.stringify(res.data.data));
      //           globalConfig.personal = res.data.data.data;
      //         });
      //     }
      //   });
    },

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.badgeup {
  position: fixed;
  background: #fff;
  top: 50%;
  left: 50%;
  margin-left:-350px;
  margin-top:-230px;
  display: block;
  width: 700px;
  height: 460px;
  border-top:2px #6a8dfb solid;
  z-index: 3333;
}
.span1{
  font-size: 20px;
  color: #606266;
  position: absolute;
  left:20px;
  top:14px;
  width: 680px;
  height: 32px;
  line-height: 32px;
  overflow: hidden;
}
.msg{
  position: absolute;
  width: 680px;
  height: 40px;
  left:20px;
  top:54px;
  line-height: 40px;
  color: #464748
}
  img{
    width: 40px;
    height: 40px;
    float: left;
    margin-right:10px;
  }
.article{
  width: 660px;
  height: 270px;
  position: absolute;
  left: 10px;
  top:100px;
  border-bottom:1px #eee solid;
  color:#606266;
}
.button{
  position: absolute;
  width: 680px;
  height: 32px;
  left:10px;
  bottom:15px;
  text-align: center;
}
.el-button {
  width: 130px;
  height: 32px;


}
</style>
