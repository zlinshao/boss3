<template>
  <div id="addRentReimbursement">
    <el-dialog :close-on-click-modal="false" title="添加报销单" :visible.sync="addRentReimbursementDialogVisible"
               width="50%">
      <div>
        <el-form size="mini" :model="form" label-width="100px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="维修单编号" required>
                <el-input v-model="form.reimbursement_number" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="房屋地址" required>
                <el-input v-model="address" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="报销类型" required>
                <el-select clearable v-model="typeArray" multiple placeholder="选择类型" value="">
                  <el-option v-for="item in reimbursementTypeCategory" :label="item.dictionary_name" :value="item.id"
                             :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="报销人" required>
                <el-select v-model="form.reimbursement.reimburtype_id" placeholder="请选择认责归属" clearable>
                  <el-option v-for="item in responsiblePersonCategory" :label="item.dictionary_name"
                             :key="item.id" :value="item.id">{{item.dictionary_name}}
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8" v-if="form.reimbursement.reimburtype_id === 658">
              <el-form-item label="报销人姓名" required>
                <el-input v-model="form.reimbursement.reimburperson_id_name" @focus="chooseStaff"
                          readonly placeholder="请选择">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" v-else-if="form.reimbursement.reimburtype_id === 657 ||
                            form.reimbursement.reimburtype_id === 656 || form.reimbursement.reimburtype_id === 659">
              <el-form-item label="报销人姓名" required>
                <el-input v-model="form.reimbursement.reimburperson_id_name" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="来源" required>
                <el-select clearable v-model="form.source" placeholder="选择来源" value="">
                  <el-option v-for="item in reimbursementSourceCategory" :label="item.dictionary_name" :value="item.id"
                             :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="报销金额" required>
                <el-input v-model="form.amount"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="开户行" required>
                <el-input v-model="form.account_bank"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="支行">
                <el-input v-model="form.branch_bank"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="开户人" required>
                <el-input v-model="form.account_name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="银行卡号" required>
                <el-input v-model="form.bank_num"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="截图">
                <Upload :ID="'rentRemi'" @getImg="getImage" :isClear="isClear"></Upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <el-form-item label="备注">
                <el-input type="textarea" v-model="form.remark"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="addRentReimbursementDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmAdd">确 定</el-button>
      </span>
    </el-dialog>
    <Organization :organizationDialog="organizationDialog" :type="organizeType" @close="closeOrganization"
                  :length="length" @selectMember="selectMember"></Organization>
  </div>
</template>

<script>
  import Organization from '../../common/organization';
  import Upload from '../../common/UPLOAD.vue';

  export default {
    props: ['addRentReimbursementDialog', 'contract'],
    components: {Organization, Upload},
    data() {
      return {
        addRentReimbursementDialogVisible: false,
        organizationDialog: false,
        organizeType: '',
        length:'',
        address: '', //房屋地址
        isClear: false,
        uploadStatus: false,
        form: {
          module: 2, //租房
          contract_id: '', //合同Id
          reimbursement_number: '', //维修单编号
          type: '', //报销类型
          source: '', //来源
          amount: '',  //报销金额
          account_bank: '',  //开户行
          branch_bank: '',  //支行
          account_name: '',  //开户名
          bank_num: '',  //银行卡号
          image_pic: '',  //截图
          remark: '',  //备注
          reimbursement:{
            reimburtype_id:'',
            reimburtype:'',
            reimburperson_id:'',
            reimburperson_id_name:''
          }
        },
        typeArray : [],             //报销类型
        reimbursementTypeCategory: [],  //报销类型
        reimbursementSourceCategory: [],  //报销来源
        finishedStatusCategory: [],  //完成情况
        responsiblePersonCategory: [],  //完成情况
      };
    },
    watch: {
      addRentReimbursementDialog(val) {
        this.addRentReimbursementDialogVisible = val;
      },
      addRentReimbursementDialogVisible(val) {
        if (!val) {
          this.$emit('close');
          this.initial();
        } else {
          this.isClear = false;
          this.getNumber();
          if (!this.isDictionary) {
            this.getDictionary();
          }
        }
      },
      contract(val) {
        this.form.contract_id = val.contract_id;
        this.address = val.address;
      },
    },

    methods: {
      getDictionary() {
        this.dictionary(640).then((res) => {  //报销类型
          this.reimbursementTypeCategory = res.data;
          this.isDictionary = true
        });
        this.dictionary(641).then((res) => {  //报销来源
          this.reimbursementSourceCategory = res.data;
          this.isDictionary = true
        });
        this.dictionary(642).then((res) => {  //完成情况
          this.finishedStatusCategory = res.data;
          this.isDictionary = true
        });
        this.dictionary(643, 1).then((res) => {  //认责人
          this.responsiblePersonCategory = res.data;
          this.isDictionary = true
        });
      },
      getImage(val) {
        this.form.image_pic = val[1]; //选择的图片数组ids
        this.uploadStatus = val[2];
      },
      //获取报销单编号
      getNumber() {
        this.$http.get(globalConfig.server + 'customer/reimbursement/last').then((res) => {
          if (res.data.code === '30050') {
            this.form.reimbursement_number = res.data.data;
          }
        });
      },
      confirmAdd() {
        this.form.type = this.typeArray.join(',');
        this.getDicName(this.form.reimbursement.reimburtype_id,this.responsiblePersonCategory);
        this.$http.post(globalConfig.server + 'customer/reimbursement', this.form).then((res) => {
          if (res.data.code === '30010') {
            this.$notify.success({
              title: '成功',
              message: res.data.msg
            });
            this.$emit('close','reimbursement');
            this.addRentReimbursementDialogVisible = false;
          } else {
            this.$notify.warning({
              title: '警告',
              message: res.data.msg
            });
          }
        })
      },
      getDicName(id,dic){
        dic.forEach(item=>{
          if(item.id === id){
            this.form.reimbursement.reimburtype = item.dictionary_name;
          }
        })
      },
      initial() {
        this.form = {
          module: 2, //租房
          contract_id: '', //合同Id
          reimbursement_number: '', //维修单编号
          type: '', //报销类型
          source: '', //来源
          amount: '',  //报销金额
          account_bank: '',  //开户行
          branch_bank: '',  //支行
          account_name: '',  //开户名
          bank_num: '',  //银行卡号
          image_pic: '',  //截图
          remark: '',  //备注
          reimbursement:{
            reimburtype_id:'',
            reimburtype:'',
            reimburperson_id:'',
            reimburperson_id_name:''
          }
        };
        this.typeArray = [];
        this.isClear = true;
      },
      closeOrganization() {
        this.organizeType = '';
        this.organizationDialog = false;
      },
      selectMember(val) {
        this.form.reimbursement.reimburperson_id_name = val[0].name;
        this.form.reimbursement.reimburperson_id = val[0].id;
      },
      chooseStaff() {
        this.organizationDialog = true;
        this.organizeType = 'staff';
        this.length = 1;
      },
      emptyStaff() {
        this.follow_name = '';
        this.form.follow_id = '';
      }
    },
  };
</script>
<style lang="scss" scoped="">


</style>
