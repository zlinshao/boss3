<template>
  <div>
    <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false"  width="0" style="margin-top:20vh" :visible.sync="badgeDialogVisible">
    <div class="badgeup" >
      <span class="span1">版本更新</span>
      <div class="msg">
        <img src="../../assets/images/head.jpg" />
        <span v-if="versionInfo.staffs && versionInfo.staffs.real_name" style="float:left; line-height:40px;">{{versionInfo.staffs.real_name}}</span>
        <span style="float:right;margin-right:20px;">{{versionInfo.create_time}}</span>
      </div>
      <div class="article scroll_bar" >
        <div v-html="versionInfo.content"></div>
              <img v-if="images.image_pic!=[]" data-magnify
        v-for="(val,key) in images.image_pic" :data-src="val.uri" :src="val.uri" alt="" :key="key">
      </div>
      <div class="button">
        <el-button style="background:#fb4799;border-color:#fb4799" @click="close"  size="small" type="success">我知道了</el-button>
      </div>
    </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "hello",
  props: ["yanSecondDialog"],
  data() {
    return {
      landholder: {},
      panelShow: false,
      loginDay: 0, //连续登陆天数
      badgeDialogVisible: false,
      type: 3,
      xljt: "",
      versionInfo: {},
      images:[],
    };
  },
  watch: {
    yanSecondDialog(val) {
      this.badgeDialogVisible = val;
    },
    badgeDialogVisible(val) {
      if (!val) {
        this.$emit("close");
      }else{
        this.getinfo();
      }
    }
  },
  mounted() {
    this.landholder = JSON.parse(localStorage.personal);
    
  },
  methods: {
    getinfo() {
      this.$http
        .get(globalConfig.server + "setting/update/read?a=1")
        .then(res => {
          if (res.data.code === "50040") {
            this.versionInfo = res.data.data;
            this.images = res.data.data.album;
          }

        });
    },
    close() {
      this.badgeDialogVisible = false;
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
  margin-left: -350px;
  margin-top: -230px;
  z-index: 3333;
  display: block;
  width: 700px;
  height: 460px;
  background: url("../../assets/images/yanfa2.png") no-repeat center;
}
.span1 {
  font-size: 20px;
  color: #fff;
  position: absolute;
  left: 20px;
  top: 160px;
  width: 680px;
  height: 32px;
  line-height: 32px;
  overflow: hidden;
}
.msg {
  position: absolute;
  width: 680px;
  height: 40px;
  left: 20px;
  top: 200px;
  line-height: 40px;
  color: #fff;
}
img {
  width: 40px;
  height: 40px;
  float: left;
  margin-right: 10px;
}
.article {
  width: 660px;
  height: 130px;
  position: absolute;
  left: 10px;
  top: 238px;
  border-bottom: 1px #fff solid;
  color: #fff;
}
.button {
  position: absolute;
  width: 132px;
  height: 32px;
  left: 276px;
  bottom: 20px;
}
.el-button {
  width: 130px;
  height: 32px;
}
</style>
