<template>
  <div>
    <!--冻结工资-->
    <el-dialog :close-on-click-modal="false" title="提示" :visible.sync="dialogVisible" width="26%">
      <div class="filter">
        <el-form :inline="true" onsubmit="return false" :model="form" size="mini" label-width="80px">
          <el-form-item label="冻结月份">
            <el-date-picker
              v-model="form.months"
              type="month"
              format="yyyy 年 MM"
              value-format="yyyy-MM"
              placeholder="选择月">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="close_">取 消</el-button>
        <el-button type="primary" size="small" @click="close_">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "freeze",
    props: ['module'],
    data() {
      return {
        dialogVisible: false,
        form: {
          months: '',
        }
      }
    },
    mounted() {
    },
    watch: {
      module(val) {
        this.dialogVisible = val;
      },
      // dialogVisible(val) {
      //   if (!val) {
      //     this.$emit('close');
      //   }
      // }
    },
    methods: {
      close_() {
        this.$emit('close');
      }
    },
  }
</script>

<style scoped>

</style>
