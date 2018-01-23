<template>
  <div>
    <el-dialog
      title="修改短信名称"
      :visible.sync="dialogVisible"
      width="30%">

      <el-form :model="form" label-width="80px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="原短信名称">
              <el-input v-model="form.oldName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="新短信名称">
              <el-input v-model="form.newName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="操作时间">
              <div class="block">
                <el-date-picker
                  v-model="form.operateDate"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy-MM-dd 日"
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
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "revise-name",
    props: ['FormVisible'],
    data() {
      return {
        dialogVisible: false,
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
      FormVisible(val) {
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
