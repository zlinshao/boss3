<template>
  <div id="">
    <el-dialog title="信息提示" :visible.sync="starffSureDialogVisible" width="30%">
      <div class="">
        <span>报名成功</span>
        <el-form size="mini"  label-width="100px">
          <el-row>

          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="sure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["starffSureFlag"],
  components: {},
  data() {
    return {
      starffSureDialogVisible: false
    };
  },
  computed: {},
  mounted() {},
  created() {},
  watch: {
    starffSureFlag(val) {
      this.starffSureDialogVisible = val;
    },
    starffSureDialogVisible(val) {
      if (!val) {
        this.$emit("close");
      }
    }
  },
  methods: {
    sure() {
      this.starffSureDialogVisible = false;
    }
  }
};
</script>

<style scoped>

</style>
