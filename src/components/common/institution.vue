<template>
  <div>
    <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false"  width="0" style="margin-top:20vh" :visible.sync="badgeDialogVisible">
    <div class="badgeup" >
      <span class="span1">{{institInfo.title}}</span>
      <div class="msg">
        <img :src="peopore.avatar" />
        <span style="float:left; line-height:40px;">{{peopore.name}}&nbsp;&nbsp;&nbsp;&nbsp;{{deport}}-{{center}}</span>
        <span style="float:right;margin-right:20px;">{{institInfo.create_time}}</span>
      </div>
      <div class="article scroll_bar" >
        <div v-html="institInfo.content"></div>
      <img v-if="images.cover_pic!=[]" data-magnify
        v-for="(val,key) in images.cover_pic" :data-src="val.uri" :src="val.uri" alt="" :key="key">
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
  props: ["institutionDialog"],
  data() {
    return {
      landholder: {},
      panelShow: false,
      loginDay: 0, //连续登陆天数
      badgeDialogVisible: false,
      type: 3,
      xljt: "",
      institInfo:{},
      images:[],
      peopore:"",
      deport:"",
      center:"",
    };
  },
  watch: {
    institutionDialog(val) {
      this.badgeDialogVisible = val;
    },
    badgeDialogVisible(val) {
      if (!val) {
        this.$emit("close");
      } else{
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
        .get(globalConfig.server + "oa/portal/last")
        .then(res => {
          if (res.data.code === "800110") {
            this.institInfo = res.data.data;
            this.images = res.data.data.album;
            if(res.data.data.staffs !=[]){
              this.peopore = res.data.data.staffs;
              this.deport = res.data.data.staffs.org[0].name;
              this.center = res.data.data.staffs.role[0].description;
            }
          }
        });
    },    
    close(){
      this.badgeDialogVisible=false;
      this.$http
        .get(globalConfig.server + "special/special/loginInfo")
        .then(res => {
          localStorage.setItem("personal", JSON.stringify(res.data.data));
          globalConfig.personal = res.data.data.data;
        });
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
  border-top:2px #fb4699 solid;
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
  height: 220px;
  position: absolute;
  left: 10px;
  top:100px;
  border-bottom:1px #eee solid;
  color:#606266;
}
.button{
  position: absolute;
  width: 680px;
  text-align: center;
  height: 32px;
  left:10px;
  bottom:15px;
}
.el-button {
  width: 130px; 
  height: 32px;


}
</style>
