<template>
  <div>
    <el-dialog :close-on-click-modal="false" title="修改记录" :visible.sync="dialogVisible" width="55%">

      <el-form :inline="true" size="mini" label-width="100px">
        <div class="addForm">
          <div class='formList'>
            <el-form-item label="姓名" required>
              <el-input placeholder="请输入姓名" v-model="form.name" clearable></el-input>
            </el-form-item>
          </div>
        </div>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取&nbsp;消</el-button>
        <el-button size="small" type="primary" @click="reviseRecord">修&nbsp;改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "revise-record",
    props: ['module', 'data'],
    data() {
      return {
        dialogVisible: false,
        form: {},
      }
    },
    mounted() {
    },
    activated() {
    },
    watch: {
      data(val) {
        console.log(val);
      },
      module(val) {
        this.dialogVisible = val;
      },
      dialogVisible(val) {
        if (!val) {
          this.$emit('close');
        }
      }
    },
    computed: {},
    methods: {
      reviseRecord() {

      },
    },
  }
</script>

<style lang="scss" scoped>

</style>
