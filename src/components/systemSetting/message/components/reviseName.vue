<template>
  <div>
    <el-dialog
      title="修改短信名称"
      :visible.sync="dialogVisible"
      width="30%">

      <el-form size="mini" :model="form" label-width="80px">

        <el-form-item label="原短信名称">
          <el-input v-model="form.oldName"></el-input>
        </el-form-item>
        <el-form-item label="新短信名称">
          <el-input v-model="form.newName"></el-input>
        </el-form-item>

        <el-row>
          <el-col :span="12">
            <el-form-item label="操作时间">
              <div class="block">
                <el-date-picker
                  v-model="form.operateDate"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd">
                </el-date-picker>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="操作人：">
              {{form.operateName}}
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogVisible = false">取 消</el-button>
          <el-button size="small" type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "revise-name",
    props: ['module'],
    data() {
      return {
        dialogVisible: false,
        formWidth: '80px',
        form: {
          oldName: '',
          newName: '',
          operateDate: '',
          operateName: '孟笑',
        },
      }
    },
    mounted() {
    },
    watch: {
      module(val) {
        this.dialogVisible = val
      },
      dialogVisible(val) {
        if (!val) {
          this.$emit('close')
        }
      },
    },
    methods: {},
  }
</script>

<style scoped>

</style>
