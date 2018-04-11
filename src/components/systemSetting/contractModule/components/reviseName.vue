<template>
  <div>
    <el-dialog :close-on-click-modal="false" title="修改合同名称" :visible.sync="dialogVisible" width="30%">
      <el-form :model="form" size="mini" label-width="80px">
        <el-form-item label="原合同名称">
          <el-input v-model="form.oldName" placeholder="请输入原合同名称"></el-input>
        </el-form-item>

        <el-form-item label="新合同名称">
          <el-input v-model="form.newName" placeholder="请输入新合同名称"></el-input>
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
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取&nbsp;消</el-button>
        <el-button size="small" type="primary" @click="dialogVisible = false">确&nbsp;定</el-button>
      </div>
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
        form: {
          oldName: '',
          newName: '',
          date: '',
          personal: '',
          operateDate: '',
          operateName: '孟笑',
        },
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

<style scoped>

</style>
