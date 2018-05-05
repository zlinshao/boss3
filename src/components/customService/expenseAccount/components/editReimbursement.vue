<template>
  <div id="addCollectReimbursement">
    <el-dialog :close-on-click-modal="false" title="添加报销单" :visible.sync="editReimbursementDialogVisible"
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
                <el-select clearable v-model="form.type" placeholder="选择类型" value="">
                  <el-option v-for="item in reimbursementTypeCategory" :label="item.dictionary_name" :value="item.id"
                             :key="item.id"></el-option>
                </el-select>
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
                <Upload :ID="'upload'" @getImg="getImage" :editImage="picImg" :isClear="isClear"></Upload>
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
        <el-button size="small" @click="editReimbursementDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmAdd">确 定</el-button>
      </span>
    </el-dialog>
    <Organization :organizationDialog="organizationDialog" :type="organizeType" @close="closeOrganization"
                  @selectMember="selectMember"></Organization>
  </div>
</template>

<script>
  import Organization from '../../../common/organization';
  import Upload from '../../../common/UPLOAD.vue';

  export default {
    props: ['editReimbursementDialog', 'reimbursementId', 'module'],
    components: {Organization, Upload},
    data() {
      return {
        editReimbursementDialogVisible: false,
        organizationDialog: false,
        organizeType: '',
        address: '', //房屋地址
        isClear: false,
        uploadStatus: false,
        form: {
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
        },
        reimbursementTypeCategory: [],  //报销类型
        reimbursementSourceCategory: [],  //报销来源
        finishedStatusCategory: [],  //完成情况
        picImg: {},
      };
    },
    watch: {
      editReimbursementDialog(val) {
        this.editReimbursementDialogVisible = val;
      },
      editReimbursementDialogVisible(val) {
        if (!val) {
          this.$emit('close');
          this.initial();
        } else {
          this.getReimbursementDetail();
        }
      },

    },
    mounted() {
      this.getDictionary();
    },
    methods: {
      getDictionary() {
        this.dictionary(640).then((res) => {  //报销类型
          this.reimbursementTypeCategory = res.data;
        });
        this.dictionary(641).then((res) => {  //报销来源
          this.reimbursementSourceCategory = res.data;
        });
        this.dictionary(642).then((res) => {  //完成情况
          this.finishedStatusCategory = res.data;
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
      //获取报销单详情
      getReimbursementDetail() {
        this.$http.get(globalConfig.server + 'customer/reimbursement/' + this.reimbursementId).then((res) => {
          if (res.data.code === '30020') {
            let detail = res.data.data;
            if (detail) {
              this.form.reimbursement_number = detail.reimbursement_number;
              this.form.type = detail.type;
              this.form.module = detail.module;
              this.form.contract_id = detail.contract_id.id;
              this.form.source = detail.source;
              this.form.amount = detail.amount;
              this.form.account_name = detail.account_name;
              this.form.account_bank = detail.account_bank;
              this.form.branch_bank = detail.branch_bank;
              this.form.bank_num = detail.bank_num;
              this.address = detail.contract_id.house.name;
              this.form.remark = detail.remark;
              let pic = detail.album.image_pic;
              this.form.image_pic = [];
              let picObject = {};
              pic.forEach((item)=>{
                this.form.image_pic.push(item.id);
                picObject[item.id] = item.uri;
              });
             this.picImg = picObject;
            }

          }
        });
      },
      confirmAdd() {
        this.form.module = this.module;
        this.$http.put(globalConfig.server + 'customer/reimbursement/'+ this.reimbursementId, this.form).then((res) => {
          if (res.data.code === '30030') {
            this.$notify.success({
              title: '成功',
              message: res.data.msg
            });
            this.editReimbursementDialogVisible = false;
          } else {
            this.$notify.warning({
              title: '警告',
              message: res.data.msg
            });
          }
        })
      },
      initial() {
        this.form.reimbursement_number = '';
        this.form.type = '';
        this.form.source = '';
        this.form.module = '';
        this.form.amount = '';
        this.form.account_name = '';
        this.form.contract_id = '';
        this.form.account_bank = '';
        this.form.branch_bank = '';
        this.form.bank_num = '';
        this.form.image_pic = '';
        this.form.remark = '';
        this.isClear = true;
        this.picImg = {};
      },
      closeOrganization() {
        this.organizeType = '';
        this.organizationDialog = false;
      },
      selectMember(val) {
        this.follow_name = val[0].name;
        this.form.follow_id = val[0].id;
      },
      chooseStaff() {
        this.organizationDialog = true;
        this.organizeType = 'staff';
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
