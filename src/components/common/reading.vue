<template>
  <div>
    <el-dialog :close-on-click-modal="false" width="0" z-index="3000" style="margin-top:20vh" :visible.sync="ReadingDialogVisible">
    <div class="badgeup" >
      <div class="backdiv backdivo"></div>
    </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "hello",
  props: ["ReadingDialog"],
  components: {},
  data() {
    return {
      ReadingDialogVisible: false,
    };
  },
  mounted() {},
  watch: {
    ReadingDialog(val) {
      this.ReadingDialogVisible = val;
    },
    ReadingDialogVisible(val) {
      if (!val) {
        this.$emit("close");
      }
    }
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="">
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

.backdivo {
  background: url("../../assets/images/badgeo.png");
}


</style>
