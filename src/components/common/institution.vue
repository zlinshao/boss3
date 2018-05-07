<template>
  <div>
    <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false"  width="0" style="margin-top:20vh" :visible.sync="badgeDialogVisible">
    <div class="badgeup" v-for="(item,index) in infoMore" :key="item.id" v-if="a ==index">
      <span class="span1">{{item.title}}</span>
      <div class="msg">
        <img :src="item.staffs.avatar" />
        <span style="float:left; line-height:40px;">{{item.staffs.name}}&nbsp;&nbsp;&nbsp;&nbsp;{{item.staffs.org[0].name}}</span>
        <span style="float:right;margin-right:20px;">{{item.create_time}}</span>
      </div>
      <div class="article scroll_bar" >
        <div v-html="item.content"></div>
      <img v-if="item.album.cover_pic!=[]" data-magnify
        v-for="(val,key) in item.album.cover_pic" :data-src="val.uri" :src="val.uri" alt="" :key="key">
      </div>
      <div class="button" >
            <el-button v-show="a <= len-1 && a>0 " class="elbuttom1" size="small" @click="preimg" type="primary">上一张</el-button>
            <el-button v-show="a == 0" class="elbuttom1" size="small" type="info">上一张</el-button>
            <el-button v-show="a < len - 1" class="elbuttom2" size="small" @click="nextimg(item.id)" type="primary">下一张</el-button>
            <el-button v-show="a == len -1" class="elbuttom2" size="small" @click="close(item.id)"  type="primary">我知道了</el-button>
      </div>
    </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "hello",
  props: ["institutionDialog","institutionMore"],
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
      infoMore:[],
      len:0,
      a:0,
      form:{
        id:""
      }
    };
  },
  watch: {
    institutionDialog(val) {
      this.badgeDialogVisible = val;
    },
    institutionMore(val){
      this.infoMore = this.institutionMore;
      this.len = this.institutionMore.length;
    },
    badgeDialogVisible(val) {
      if (!val) {
        this.$emit("close");
      } else{
      }
    }
  },
  mounted() {
    this.landholder = JSON.parse(localStorage.personal);
  },
  methods: {
    preimg() {
      this.a = this.a - 1;
    },
    nextimg(id) {
      this.a = this.a + 1;
      this.form.id=id;   
      this.$http
        .get(globalConfig.server + "oa/portal/know",{params: this.form})
        .then(res => {
        });
    },  
    close(id){
      this.form.id=id;   
      this.$http
        .get(globalConfig.server + "oa/portal/know",{params: this.form})
        .then(res => {
          this.badgeDialogVisible=false;
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
      .elbuttom1 {
        float: left;
        margin-left: 35%;
      }
      .elbuttom2 {
        float: left;
        margin-left:40px;
      }
</style>
