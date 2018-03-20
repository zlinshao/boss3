<template>
  <div>
    <el-dialog :title="newAdd" :visible.sync="integralVisible" width="40%">
      <div>
        <el-form size="mini" :model="form" label-width="100px">
          <el-row>
            <!--<el-col :span="24">-->
            <!--<el-form-item label="报修时间">-->
            <!--<el-date-picker type="date" v-model="form.date" placeholder="选择日期"></el-date-picker>-->
            <!--</el-form-item>-->
            <!--</el-col>-->
            <el-col :span="24">
              <el-form-item label="姓名">
                <el-input placeholder="请输入内容" v-model="form.sname"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="部门">
                <el-input placeholder="请输入内容" v-model="form.dname"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="积分项">
                <el-select v-model="form.minus" @change="integral" clearable="" placeholder="请选择积分项">
                  <el-option label="得分项目" value="0"></el-option>
                  <el-option label="失分项目" value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-form-item label-width="20px">
                <el-select v-model="form.name" @change="integralAmount" clearable placeholder="请选择积分项">
                  <el-option v-for="(key,index) in integralList" :label="key.name" :value="key.id"
                             :key="index"></el-option>
                  <el-option label="其他" value="other" v-if="integralList.length !== 0"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24" v-if="otherType">
              <el-form-item label="积分项">
                <el-input placeholder="请输入内容" v-model="form.integralPro"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="对应积分">
                <el-input placeholder="请输入内容" :disabled="!otherType" v-model="form.amount"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="现有积分">
                <el-input disabled v-model="form.existing"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="备注">
                <el-input type="textarea" placeholder="请输入内容" v-model="form.remark"></el-input>
              </el-form-item>
            </el-col>

          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="integralVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="submitIntegral">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'integral-module',
    props: [],
    data() {
      return {
        integralVisible: false,
        formList: {
          page: 1,
          limit: 120,
        },
        form: {
          sname: '',
          dname: '',
          integralPro: '',
          amount: '',
          minus: '',
          name: '',
          existing: '',
          remark: '',
        },
        add: {
          id: '',
          staff_id: '',
          credit_item_id: '',
          remark: '',
        },
        otherType: false,
        integralList: [],
      };
    },
    watch: {
      formDetail(val) {
        this.form.name = val.sname;
        this.form.minus = String(val.minus);
        this.integral(val.minus);
        this.existing = val.amount;
      },
      newAdd(val) {
        if (val === '新增') {

        } else {

        }
      },
      newAddDialog(val) {
        this.integralVisible = val;
      },
      integralVisible(val) {
        if (!val) {
          this.$emit('close');
          this.close_();
        }
      }
    },
    mounted() {
      this.$http.get(globalConfig.server + 'credit/manage/staff/1').then((res) => {
        this.form.existing = res.data.data;
      })
    },
    methods: {
      // 积分项
      integral(val) {
        let type;
        if (val === '0') {
          type = 'credit/manage/item/gain'
        } else {
          type = 'credit/manage/item/lose'
        }
        this.integralList = [];
        this.form.name = '';
        this.form.amount = '';
        this.otherType = false;
        this.$http.get(globalConfig.server + type, {
          params: this.formList,
        }).then((res) => {
          if (res.data.code === '30210') {
            this.integralList = res.data.data;
          }
        })
      },
      integralAmount(val) {
        this.form.integralPro = '';
        this.form.amount = '';
        if (val === 'other') {
          this.otherType = true;
        } else {
          this.otherType = false;
        }
        for (let i = 0; i < this.integralList.length; i++) {
          if (this.integralList[i].id === val) {
            this.form.amount = this.integralList[i].amount_str;
          }
        }
      },

      submitIntegral() {
        if (this.form.name === 'other') {
          this.$http.post(globalConfig.server + 'credit/manage/other', {
            staff_id: this.form.sname,
            gain_or_lose: Number(this.form.minus),
            amount: this.form.amount,
            name: this.form.integralPro,
            credit_item_id: this.form.name,
            remark: this.form.remark,
          }).then((res) => {
            if (res.data.code === '30310') {
              this.$emit('close');
            }
          })
        } else {
          this.$http.post(globalConfig.server + 'credit/manage', {
            staff_id: this.form.sname,
            credit_item_id: this.form.name,
            remark: this.form.remark,
          }).then((res) => {
            this.$emit('close');
          })
        }
      },
      close_() {
        this.form.sname = '';
        this.form.dname = '';
        this.form.integralPro = '';
        this.form.amount = '';
        this.form.minus = '';
        this.form.name = '';
        this.form.existing = '';
        this.form.remark = '';
        this.otherType = false;
      }
    }
  };
</script>
<style lang="scss" scoped="">
  #addRentRepair {
  }

</style>
