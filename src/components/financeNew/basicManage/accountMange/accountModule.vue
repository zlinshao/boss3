<template>
  <div>
    <el-dialog :close-on-click-modal="false" title="账户" :visible.sync="dialogVisible" width="40%">
      <el-form :model="form" size="mini" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="账户名称">
              <el-input v-model="form.accountName" placeholder="请输入帐户名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="账户类型">
              <el-select v-model="form.accountType" size="mini" clearable>
                <el-option label="请选择账户类型" value=""></el-option>
                <el-option v-for="(key,index) in banks" :label="key" :value="index + 1" :key="index"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="账号">
              <el-input v-model="form.account" placeholder="请输入账号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开户银行">
              <el-input v-model="form.openBank" placeholder="请输入开户行"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="支行">
              <el-input v-model="form.subbranch" placeholder="请输入支行"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="初始金额">
              <el-input v-model="form.initialMoney" placeholder="请输入金额"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="当前金额">
          <el-input v-model="form.nowMoney" placeholder="当前金额" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" :autosize="{minRows: 2,maxRows: 4}" placeholder="请输入备注"></el-input>
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
    name: "account-module",
    props: ['FormVisible'],
    data() {
      return {
        dialogVisible: false,
        form: {
          accountName: '',
          accountType: '',
          account: '',
          openBank: '',
          subbranch: '',
          initialMoney: '',
          nowMoney: '',
          remark: '',
        },
        banks: ['中国银行', '中国银行', '中国银行', '中国银行', '中国银行',],
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
