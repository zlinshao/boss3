<template>
  <div id="editReimbursement">
    <el-dialog :close-on-click-modal="false" title="编辑报销单" :visible.sync="editReimbursementDialogVisible"
               width="50%">
      <div>
        <el-form size="mini" :model="form" label-width="100px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="报销单编号" required>
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
    <Organization :organizationDialog="organizationDialog" :type="organizeType" :length="length"
                  @close="closeOrganization" @selectMember="selectMember"></Organization>
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
        length: '',
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
          this.isClear = false;
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
        this.dictionary(643, 1).then((res) => {  //认责人
          this.responsiblePersonCategory = res.data;
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

              this.form.type = this.arrSplitToArray(detail.type).join(',');
              this.typeArray= this.arrSplitToArray(detail.type);

              this.form.module = detail.module;
              this.form.contract_id = detail.contract_id && detail.contract_id.id;
              this.form.source = detail.source;
              this.form.amount = detail.amount;
              this.form.account_name = detail.account_name;
              this.form.account_bank = detail.account_bank;
              this.form.branch_bank = detail.branch_bank;
              this.form.bank_num = detail.bank_num;
              this.address = detail.contract_id && detail.contract_id.house && detail.contract_id.house.name;
              this.form.remark = detail.remark;

              this.form.reimbursement.reimburtype_id = detail.reimbursement && detail.reimbursement.reimburtype_id;
              this.form.reimbursement.reimburtype = detail.reimbursement && detail.reimbursement.reimburtype;
              this.form.reimbursement.reimburperson_id = detail.reimbursement && detail.reimbursement.reimburperson_id;
              this.form.reimbursement.reimburperson_id_name = detail.reimbursement && detail.reimbursement.reimburperson_id_name;

              let pic = detail.album.image_pic;
              console.log(detail.album.image_pic, "4444");
              
              this.form.image_pic = [];
              let picObject = {};
              pic.forEach((item)=>{
                this.form.image_pic.push(item.id);
                picObject[item.id] = item.uri;
              });
             this.picImg = picObject;
             console.log(this.picImg, "5555");
             
            }

          }
        });
      },
      arrSplitToArray(json){
        let arr = [];
        json.forEach(item=>{
          arr.push(Number(item.id));
        });
        return arr;
      },

      confirmAdd() {
        this.form.type = this.typeArray.join(',');
        this.getDicName(this.form.reimbursement.reimburtype_id,this.responsiblePersonCategory);
        this.form.module = this.module;
        this.$http.put(globalConfig.server + 'customer/reimbursement/'+ this.reimbursementId, this.form).then((res) => {
          if (res.data.code === '30030') {
            this.$notify.success({
              title: '成功',
              message: res.data.msg
            });
            this.$emit('close','success')
            this.editReimbursementDialogVisible = false;
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
          module: 1, //收房
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
        this.picImg = {};
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
      },

      stringToArr(str){
        return str.split(',')
      }
    },
  };
</script>
<style lang="scss" scoped="">


</style>
