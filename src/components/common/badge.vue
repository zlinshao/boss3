<template>
  <div>
    <el-dialog :close-on-click-modal="false" width="0" style="margin-top:20vh" :visible.sync="badgeDialogVisible">
    <div class="badgeup" >
      <span class="close el-icon-close"  @click="closeBadge"></span>
      <div v-if="loginDay == 3" class="backdiv backdiv3"></div>
      <div v-else-if="loginDay == 5" class="backdiv backdiv5"></div>
      <div v-else-if="loginDay == 15" class="backdiv backdiv15"></div>
      <div v-else-if="loginDay == 30" class="backdiv backdiv30"></div>
      <div v-else class="backdiv backdivo"></div>
      <p class="Rtitle">{{xljt}}</p>
      <span v-if="loginDay == 3" class="day day3">{{loginDay}}</span>
      <span v-else-if="loginDay == 5" class="day day5">{{loginDay}}</span>
      <span v-else-if="loginDay == 15" class="day day15">{{loginDay}}</span>
      <span v-else-if="loginDay == 30" class="day day30">{{loginDay}}</span>
      <span v-else class="day dayo">{{loginDay}}</span>
      <span class="span1">每日登录</span>
      <span class="span2">"你已连续登录{{loginDay}}天"</span>
    </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "hello",
  props: ["badgeDialog"],
  data() {
    return {
      landholder: {},
      panelShow: false,
      loginDay: 0, //连续登陆天数
      badgeDialogVisible: false,
      type: 3,
      xljt: "",
      xljxArray: [
        // "幸福是持续地拥有满足感和知足感^_^",
        // "喝一杯咖啡，放松一下自己^_^",
        // "像蜜蜂一样勤劳工作才能享受蜜甜生活^_^",
        // "在忙，也别忘了照顾自己^_^",
        // "丢下一些包袱后，你会惊讶的发现，原来自己可以飞的那么高^_^",
        "做一个微笑挂在嘴边，快乐放在心上的人^_^",
        // "将来的你，一定会感谢现在拼命努力的你^_^",
        // "理想是一面旗帜，信念是一枚火炬^_^",
        // "休息，休息一会",
        // "喝杯茶吧, 让精神抖擞一下^_^"
      ]
    };
  },
  watch: {
    badgeDialog(val) {
      this.badgeDialogVisible = val;
    },
    badgeDialogVisible(val) {
      if (!val) {
        this.$emit("close");
      } else {
        setTimeout(() => {
          this.closeBadge();
        }, 3000);
      }
    }
  },
  mounted() {
    this.landholder = JSON.parse(localStorage.personal);
    this.loginDay = this.landholder.data.loginday;
    this.getFlag();
  },
  methods: {
    closeBadge() {
      this.$http
        .post(globalConfig.server + "manager/staff_record", { type: this.type })
        .then(res => {
          if (res.data.code === "30010") {
            this.badgeDialogVisible = false;
            this.$http
              .get(globalConfig.server + "special/special/loginInfo")
              .then(res => {
                localStorage.setItem("personal", JSON.stringify(res.data.data));
                globalConfig.personal = res.data.data.data;
              });
          }
        });
    },
    getFlag() {
      let length = this.xljxArray.length;
      let num = Math.floor(Math.random() * length);
      this.xljt = this.xljxArray[num]
        ? this.xljxArray[num]
        : "乐伽不止眼前的合同，还有诗和远方的田野！";
    },

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.badgeup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  display: block;
  width: 445px;
  height: 446px;
  margin-left: -30px;
}
.backdiv {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 445px;
  height: 446px;
}
.backdiv3 {
  background: url("../../assets/images/badge3.png");
}
.backdiv5 {
  background: url("../../assets/images/badge5.png");
}
.backdiv15 {
  background: url("../../assets/images/badge15.png");
}
.backdiv30 {
  background: url("../../assets/images/badge30.png");
}
.backdivo {
  background: url("../../assets/images/badgeo.png");
}
.Rtitle {
  position: absolute;
  top: 43px;
  left: 140px;
  width: 225px;
  height: 37px;
  line-height: 18px;
  text-align: center;
  color: #fff;
  font-size: 16px;
}
.day {
  width: 140px;
  height: 142px;
  position: absolute;
  line-height: 142px;
  text-align: center;
  left: 181px;
  top: 148px;
  font-size: 70px;
}
.day3 {
  color: #e0a42b;
}
.day5 {
  color: #f9d38d;
}
.day15 {
  color: #ffd200;
}
.day30 {
  color: #fce0cc;
}
.dayo {
  color: #e3fb74;
}
.span1 {
  position: absolute;
  font-size: 16px;
  left: 224px;
  bottom: 106px;
  color: #fb4699;
}
.span2 {
  position: absolute;
  font-size: 16px;
  left: 190px;
  bottom: 78px;
  color: #fdeb5b;
}
.close{
  width: 30px;
  height: 30px;
  line-height: 30px;
  font-size: 20px;
  text-align: center;
  position: absolute;
  right: 31px;
  top:18px;
  z-index: 999;
  color: rgb(33, 0, 74);
  cursor: pointer;
}
</style>
