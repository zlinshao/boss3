<template>
  <div>
    <el-dialog :title="titles" :visible.sync="dialogVisible" width="30%">
      <el-form label-width="80px" size="mini" :model="form">
        <el-row>
          <el-col :span="12">
            <el-form-item :label="dateLabel">
              <div class="block">
                <el-date-picker
                  v-model="form.dates"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                  :picker-options="pickerOptions">
                </el-date-picker>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户姓名">
              <el-input v-model="form.name" placeholder="请选择客户姓名" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="详情">
          <el-input type="textarea" v-model="form.details" :autosize="{minRows: 2, maxRows: 4}"
                    placeholder="请填写详情"></el-input>
        </el-form-item>

        <el-row v-if="title === 'collect'">
          <el-col :span="12">
            <el-form-item label="收入科目">
              <el-input v-model="form.subject" placeholder="请选择科目" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="应收金额">
              <el-input v-model="form.collectMoney" placeholder="请输入金额"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div v-if="title === 'rent'">
          <el-row>
            <el-col :span="12">
              <el-form-item label="支出科目">
                <el-input v-model="form.subject" placeholder="请选择科目" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="应付金额">
                <el-input v-model="form.payMoney" placeholder="请输入金额"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="账户类型">
                <el-select v-model="form.accountType">
                  <el-option label="请选择账户类型" value=""></el-option>
                  <el-option v-for="(key,index) in values" :label="key" :value="index + 1" :key="index"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="账户账号">
                <el-input v-model="form.account" placeholder="请输入账户账号"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <el-form-item :label="payNameLabel">
          <el-input v-model="form.payName" placeholder="" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="form.remark" :autosize="{minRows: 2, maxRows: 4}"
                    placeholder="请填写备注"></el-input>
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
    name: "charge-module",
    props: ['module', 'title'],
    data() {
      return {
        dialogVisible: false,
        titles: '',
        dateLabel: '',
        payNameLabel: '',
        form: {
          dates: '',
          name: '',
          details: '',
          subject: '',
          collectMoney: '',
          payMoney: '',
          accountType: '',
          account: '',
          payName: '',
          remark: '',
        },
        values: ['银行卡', '银行卡', '银行卡', '银行卡', '银行卡'],
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
      }
    },
    mounted() {
    },
    watch: {
      title(val) {
        console.log(val);
        this.close_();
        if (val === 'collect') {
          this.titles = '新增应收入账';
          this.dateLabel = '收款时间';
          this.payNameLabel = '收款人员';
        } else {
          this.titles = '新增应付入账';
          this.dateLabel = '付款时间';
          this.payNameLabel = '付款人员';
        }
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
    methods: {
      close_() {
        this.form.dates = '';
        this.form.name = '';
        this.form.details = '';
        this.form.subject = '';
        this.form.collectMoney = '';
        this.form.payMoney = '';
        this.form.accountType = '';
        this.form.account = '';
        this.form.payName = '';
        this.form.remark = '';
      },
    },
  }
</script>

<style scoped>

</style>
