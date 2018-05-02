<template>
  <div>
    <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false"  width="0" z-index="2000" style="margin-top:20vh" :visible.sync="yanDialogVisible">
    <div class="badgeup" >
      <span class="span1">版本更新 - {{versionInfo.version}}</span>
      <div class="msg">
        <img src="../../assets/images/head.jpg" />
        <span v-if="versionInfo.staffs && versionInfo.staffs.real_name" style="float:left; line-height:40px;">{{versionInfo.staffs.real_name}}</span>
        <span style="float:right;margin-right:20px;">{{versionInfo.create_time}}</span>
      </div>
      <div class="article scroll_bar" v-html="versionInfo.content">
      </div>
      <div class="button">
        <el-button  size="small"  @click="close" type="success">我知道了</el-button>
      </div>
    </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "hello",
  props: ["yanFirstDialog","yanFirstInfo"],
  data() {
    return {
      landholder: {},
      panelShow: false,
      loginDay: 0, //连续登陆天数
      yanDialogVisible: false,
      type: 3,
      xljt: "",
      versionInfo: {},
      images:[],
    };
  },
  watch: {
    yanFirstDialog(val) {
      this.yanDialogVisible = val;
    },
    yanFirstInfo(val){
      this.versionInfo = val;
    },
    yanDialogVisible(val) {
      if (!val) {
        this.$emit("close");
      } 
    }
  },
  mounted() {
    this.landholder = JSON.parse(localStorage.personal);

  },
  methods: {
 
    close() {
      this.yanDialogVisible = false;
      this.$http
        .get(globalConfig.server + "special/special/loginInfo")
        .then(res => {
          localStorage.setItem("personal", JSON.stringify(res.data.data));
          globalConfig.personal = res.data.data.data;
        });
    }

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.badgeup {
  position: fixed;
  top: 50%;
  left: 50%;
  margin-left:-350px;
  margin-top:-230px;
  z-index: 3333;
  display: block;
  width: 700px;
  height: 460px;
  background: url("../../assets/images/yanfa1.png") no-repeat center;
}
.span1{
  font-size: 20px;
  color: #fff;
  position: absolute;
  left:311px;
  top:74px;
  width: 380px;
  height: 32px;
  line-height: 32px;
  overflow: hidden;
}
.msg{
  position: absolute;
  width: 380px;
  height: 40px;
  left:311px;
  top:136px;
  line-height: 40px;
  color: #fff
}
  img{
    width: 40px;
    height: 40px;
    float: left;
    margin-right:10px;
  }
.article{
  width: 360px;
  height: 130px;
  position: absolute;
  left: 301px;
  top:200px;
  color:#fff;
}
.button{
  position: absolute;
  width: 132px;
  height: 32px;
  left:311px;
  bottom:50px;
}
.el-button {
  width: 130px; 
  height: 32px;


}
</style>
