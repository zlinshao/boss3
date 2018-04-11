<template>
  <div>
    <el-dialog :close-on-click-modal="false" title="补齐时间修改" :visible.sync="dialogVisible" width="24%">
      <el-form size="mini" label-width="70px">
        <el-form-item label="补齐时间">
          <div class="block">
            <el-date-picker
              v-model="date"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取&nbsp;消</el-button>
        <el-button size="small" type="primary" @click="dialogVisible = false">确&nbsp;定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "polish-time",
    props: ['module', 'date'],
    data() {
      return {
        dialogVisible: false,
      }
    },
    mounted() {
    },
    watch: {
      module(val) {
        this.dialogVisible = val;
      },
      dialogVisible(val) {
        if (!val) {
          this.$emit('close');
        }
      }
    },
    methods: {},
  }
</script>

<style scoped lang="scss">

</style>
