<template>
    <div id="plusPay">
      <el-dialog
        :visible.sync="dialogVisible"
        :title="title"
        @close="handleClose"
        width="30%"
      >
        <div class="container">
          <el-form :model="params" ref="plusPay" :rules="rules" size="mini" label-width="100px">
            <el-form-item label="客户名称" prop="customer_id">
              <el-input @focus="customerVisible = true" v-model="extraParams.customer_name" placeholder="点击选择客户"></el-input>
            </el-form-item>
            <el-form-item label="房屋地址">
              <el-input v-model="address" disabled></el-input>
            </el-form-item>
            <el-form-item label="客户身份" prop="identity">
              <el-select v-model="params.identity" :disabled="true">
                <el-option :value="1" label="房东"></el-option>
                <el-option :value="2" label="租客"></el-option>
                <el-option :value="3" label="未知客户"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="客户账户类型" prop="customer_account_type">
              <el-select v-model="params.customer_account_type">
                <el-option :value="1" label="银行卡"></el-option>
                <el-option :value="2" label="支付宝"></el-option>
                <el-option :value="3" label="微信"></el-option>
                <el-option :value="4" label="存折"></el-option>
                <el-option :value="5" label="现金"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="客户账号" prop="customer_account_num">
              <el-input v-model="params.customer_account_num" placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item label="应付金额" prop="amount_payable">
              <el-input type="number" v-model="params.amount_payable" placeholder="请输入应付金额"></el-input>
            </el-form-item>
            <el-form-item label="科目" prop="subject_id">
              <el-input v-model="extraParams.subject_name" placeholder="点击选择客户" @focus="highSubjectVisible = true"></el-input>
            </el-form-item>
            <el-form-item label="付款时间" prop="pay_date">
              <el-date-picker
                v-model="params.pay_date"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="详情" prop="description">
              <el-input type="textarea" :row="8" v-model="params.description" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
              <el-input type="textarea" :row="8" v-model="params.remark" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="handleClose">取消</el-button>
              <el-button type="primary" @click="handleSubmit('plusPay')">确定</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>

      <CustomerSel :customerVisible="customerVisible" @close="customerVisible = false" @customerSel="handleCustomerSel"></CustomerSel>
      <SubjectTree
        :subjectDialog="highSubjectVisible"
        :types="highSubjectType"
        @close="closeSubjectTree"
        @selectSubject="selectSubject"
      ></SubjectTree>
    </div>
</template>

<script>
  import CustomerSel from './customerSel.vue';
  import SubjectTree from '../../components/subjectTree.vue';
    export default {
      name: "plusPay",
      components: { CustomerSel,SubjectTree },
      props: ['PayVisible','title'],
      data() {
        return {
          address: '',
          customerVisible: false,
          highSubjectVisible: false,
          highSubjectType: '',
          extraParams: {
            customer_name: '',
            subject_name: ''
          },
          params: {
            customer_id: '',
            customer_account_type: '',
            customer_account_num: '',
            amount_payable: '',
            description: '',
            remark: '',
            identity: '',
            pay_date: '',
            subject_id: ''
          },
          rules: {
            amount_payable: [
              {required: true,message: '请输入应付金额',trigger: 'blur'}
            ],
            customer_id: [
              {required: true,message: '请选择客户',trigger: 'focus'}
            ],
            customer_account_type: [
              {required: true,message: '请选择账号类型',trigger: 'blur'}
            ],
            customer_account_num: [
              {required: true,message: '请输入账号',trigger: 'blur'}
            ],
            description: [
              {required: true,message: '请输入详情',trigger: 'blur'}
            ],
            remark: [
              {required: true,message: '请输入备注',trigger: 'blur'}
            ],
            pay_date: [
              {required: true,message: '请选择付款时间',trigger: 'focus'}
            ],
            subject_id: [
              {required: true,message: '请选择科目',trigger: 'focus'}
            ]
          },
          dialogVisible: false
        }
      },
      watch: {
        PayVisible(val) {
          this.dialogVisible = val;
        }
      },
      methods: {
        closeSubjectTree() {
          this.highSubjectVisible = false;
        },
        selectSubject(val) {
          this.extraParams.subject_name = val.name;
          this.params.subject_id = parseInt(val.id);
        },
        handleSubmit(formName) {
          this.$refs[formName].validate(valid => {
            if (valid) {
              this.$emit('plusAddPay',this.params);
            } else {
              this.$message.warning('params error!');
            }
          })
        },
        handleCustomerSel(val) {
          this.address = val.address;
          this.extraParams.customer_name = val.customer_name;
          this.params.customer_id = val.customer_id;
          this.params.identity = val.customer_type;
        },
        handleClose() {
          for (var key in this.params) {
            this.params.key = "";
          }
          this.address = "";
          this.extraParams.customer_name = "";
          this.$refs['plusPay'].resetFields();
          this.$emit('close');
        }
      }
    }
</script>

<style scoped lang="scss">
  #plusPay{
    .container{
      width: 90%;
      margin: 0 auto;
      text-align: right;
    }
  }
</style>
