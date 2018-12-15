<template>
  <div>
    <el-dialog :close-on-click-modal="false" title="充值归零记录" :visible.sync="dialogVisible" width="40%">
      <el-form :model="form" size="mini" lebel-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="上次充值日期：">
              2017-08-22 16:12:40
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="上上次充值日期：">
              2017-08-22 16:12:40
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="border-bottom: 1px solid #dddddd">
          <el-col :span="12">
            <el-form-item label="上次充值操作人：">
              吕繁
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="上上次充值操作人：">
              吕繁
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="margin-top: 12px;">
          <el-col :span="12">
            <el-form-item label="上次归零日期：">
              2017-08-22 16:12:40
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="上上次归零日期：">
              2017-08-22 16:12:40
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="上次归零操作人：">
              吕繁
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="上上次归零操作人：">
              吕繁
            </el-form-item>
          </el-col>
        </el-row>
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
    name: "recharge-history",
    props: ['FormVisible'],
    data() {
      return {
        dialogVisible: false,
        form: {}
      }
    },
    mounted() {
    },
    watch: {
      FormVisible(val) {
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

<style scoped>

</style>
