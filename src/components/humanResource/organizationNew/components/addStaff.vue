<template>
  <div id="addRentRepair">
    <el-dialog :title="title" :visible.sync="addStaffDialogVisible" width="60%" :before-close="beforeCloseModal">
      <div>
        <el-form size="mini" :model="params" label-width="120px" style="padding: 0 20px;">
          <el-tabs v-model="activeName">
            <el-tab-pane  label="基本信息" name="first">
              <el-row :gutter="20">
                <el-col :span="8">

                  <el-form-item  label="真实姓名" required>
                    <el-input placeholder="请输入真实姓名" v-model="params.real_name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="性别" required>
                    <el-radio-group  v-model="params.gender">
                      <el-radio v-for="item in sexCategory" :label="item.id" :key="item.id">{{item.dictionary_name}}</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="手机号码"  required>
                    <el-input placeholder="请输入手机号码" v-model="params.phone"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="16">
                  <el-form-item  label="家庭住址" required>
                    <el-input placeholder="请输入家庭住址" v-model="params.home_addr"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="生育状况">
                    <el-radio-group  v-model="params.fertility_status">
                      <el-radio v-for="item in fertilityStatusCategory" :label="item.id" :key="item.id">{{item.dictionary_name}}</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item  label="身份证号" required>
                    <el-input placeholder="请输入身份证号" v-model="params.id_num" @blur="checkData"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item  label="生日">
                    <el-input placeholder="请输入生日" v-model="params.birthday"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item  label="推荐人">
                    <el-input placeholder="请填写推荐人" v-model="params.recommender"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item  label="银行卡号" required>
                    <el-input placeholder="请输入银行卡号" v-model="params.bank_num" @blur="checkData"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item  label="开户行" required>
                    <el-input placeholder="请输入开户行" v-model="params.account_bank"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item  label="紧急电话" required>
                    <el-input placeholder="请输入紧急电话" v-model="params.emergency_call"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item  label="支行">
                    <el-input placeholder="请输入支行" v-model="params.branch_bank"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item  label="开户名">
                    <el-input placeholder="请输入开户名" v-model="params.account_name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8"></el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item  label="职位" required>
                    <el-input placeholder="请选择职位" v-model="params.position_id[0]" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item  label="等级" required>
                    <el-select v-model="params.level">
                      <el-option v-for="item in branchBankCategory" :value="item.id" :key="item.id" :label="item.dictionary_name">{{item.dictionary_name}}</el-option>
                    </el-select>

                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item  label="部门" required>
                    <el-input placeholder="请选择部门" v-model="department_name" @focus="selectDepart" ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item  label="账号状态" required>
                    <el-select v-model="params.status">
                      <el-option v-for="item in accountStatusCategory" :value="item.id" :key="item.id" :label="item.dictionary_name">{{item.dictionary_name}}</el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item  label="入职时间" required>
                    <el-date-picker v-model="params.enroll" type="date" placeholder="请选择入职时间" value-format="yyyy-MM-dd">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item  label="薪资">
                    <el-input placeholder="请输入薪资" v-model="params.salary"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-form-item label="入职材料">
                  <el-checkbox-group v-model="params.entry_materials">
                    <el-checkbox  v-for="item in entryMaterialsCategory" :label="item.id" :key="item.id" :value="item.id">{{item.dictionary_name}}</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-row>
            </el-tab-pane>
            <el-tab-pane  label="辅助信息" name="second">
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item  label="籍贯">
                    <el-input placeholder="请输入籍贯" v-model="params.origin_addr"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item  label="婚姻状况">
                    <el-select v-model="params.marital_status">
                      <el-option v-for="item in maritalStatusCategory" :label="item.dictionary_name" :key="item.id" :value="item.id">{{item.dictionary_name}}</el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="政治面貌">
                    <el-select v-model="params.political_status">
                      <el-option  v-for="item in politicalStatusCategoey" :label="item.dictionary_name" :key="item.id" :value="item.id">{{item.dictionary_name}}</el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item  label="转正时间">
                    <el-date-picker v-model="params.forward_time" type="date" placeholder="请选择转正时间" value-format="yyyy-MM-dd">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item  label="企业邮箱">
                    <el-input placeholder="请输入企业邮箱" v-model="params.mail"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="学历">
                    <el-select v-model="params.education">
                      <el-option v-for="item in educationCategory" :label="item.dictionary_name" :key="item.id" :value="item.id" >{{item.dictionary_name}}</el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item  label="毕业院校">
                    <el-input placeholder="请输入毕业院校" v-model="params.school"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item  label="专业">
                    <el-input placeholder="请输入专业" v-model="params.major"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="毕业时间">
                    <el-date-picker v-model="params.graduation_time" type="date" placeholder="请选择毕业时间" value-format="yyyy-MM-dd"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item  label="第一次签合同时间">
                    <el-date-picker v-model="params.agreement_first_time" type="date" placeholder="请选择时间" value-format="yyyy-MM-dd"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item  label="第一次合同到期时间">
                    <el-date-picker v-model="params.agreement_first_end_time" type="date" placeholder="请选择时间" value-format="yyyy-MM-dd"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="第二次签合同时间">
                    <el-date-picker v-model="params.agreement_second_time" type="date" placeholder="请选择时间" value-format="yyyy-MM-dd"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="24">
                  <el-form-item label="备注">
                    <el-input type="textarea" v-model="params.remark" placeholder="请填写备注"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="beforeCloseModal">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmAdd">确 定</el-button>
      </span>
    </el-dialog>

    <Organization :organizationDialog="organizationDialog" :type="type" :length="length" @close="closeOrganization" @selectMember="selectMember"></Organization>
  </div>
</template>

<script>
  import Organization from '../../../common/organization.vue'
  export default {
    props:['addStaffDialog','isEdit','editId'],
    components:{ Organization },
    data() {
      return {
        addStaffDialogVisible:false,
        activeName: 'first',
        department_name: '',
        params: {
          position_id: [],
          department_id: [],
          phone: '',
          real_name: '',
          gender: '',
          home_addr: '',
          fertility_status: '',
          id_num: '',
          birthday: '',
          recommender: '',
          bank_num: '',
          account_bank: '',
          emergency_call: '',
          level: '',
          account_name: '',
          status: '',
          enroll: '',
          salary_level: '1',
          salary: '',
          entry_materials: [],
          origin_addr: '',
          marital_status: '',
          political_status: '',
          forward_time: '',
          mail: '',
          education: '',
          school: '',
          major: '',
          graduation_time: '',
          agreement_first_time: '',
          agreement_first_end_time: '',
          agreement_second_time: '',
          remark: '',
        },
        title : '新建用户',
        organizationDialog:false,
        department: '',
        type:null,
        length:null,
        positionArray:[],
        roleArray:[],
        sexCategory: [],
        fertilityStatusCategory: [],
        accountStatusCategory: [],
        entryMaterialsCategory: [],
        maritalStatusCategory: [],
        politicalStatusCategoey: [],
        educationCategory: [],
        branchBankCategory: [],
        checkStatus: false,
      };
    },
    watch:{
      addStaffDialog(val){
        this.addStaffDialogVisible = val;
      },
      addStaffDialogVisible(val){
        if(!val){
          this.$emit('close')
        }
      },
      isEdit(val){
        if(!val){
          this.title = '新建用户'
        }else {
          this.title = '修改用户'
          this.getStaffInfo();
        }
      },
      'params.department_id':{
        deep:true,
        handler(val,oldVal){
          this.getPosition(this.params.department_id);
        }
      }
    },
    mounted(){
      this.getSex();
      this.getFertilityStatus();
      this.getAccountStatus();
      this.getEntryMaterials();
      this.getMaritalStatus();
      this.getPoliticalStatus();
      this.getEducation();
      this.getBranchBank();
    },
    created(){
      this.getSex();
      this.getFertilityStatus();
      this.getAccountStatus();
      this.getEntryMaterials();
      this.getMaritalStatus();
      this.getPoliticalStatus();
      this.getEducation();
      this.getBranchBank();
    },
    methods:{
      //编辑时获取员工信息
      getStaffInfo() {
        this.$http.get(globalConfig.server+'manager/staff/'+this.editId).then((res) => {
          if(res.data.code === '10020'){
            this.params.position_id = res.data.data.position_id;
            this.params.department_id = res.data.data.department_id;
            this.params.real_name = res.data.data.real_name;
            this.params.gender = res.data.data.gender;
            this.params.phone = res.data.data.phone;
            this.params.home_addr = res.data.data.home_addr;
            this.params.fertility_status = res.data.data.fertility_status;
            this.params.id_num = res.data.data.id_num;
            this.params.birthday = res.data.data.birthday;
            this.params.bank_num = res.data.data.bank_num;
            this.params.account_bank = res.data.data.account_bank;
            this.params.emergency_call = res.data.data.emergency_call;
            this.params.level = res.data.data.level;
            this.params.account_name = res.data.data.account_name;
            this.params.status = res.data.data.status;
            this.params.enroll = res.data.data.enroll;
            this.params.salary = res.data.data.salary;
            this.params.entry_materials = res.data.data.entry_materials;
            this.params.salary = res.data.data.salary;
            this.params.origin_addr = res.data.data.origin_addr;
            this.params.marital_status = res.data.data.marital_status;
            this.params.political_status = res.data.data.political_status;
            this.params.forward_time = res.data.data.forward_time;
            this.params.mail = res.data.data.mail;
            this.params.education = res.data.data.education;
            this.params.school = res.data.data.school;
            this.params.major = res.data.data.major;
            this.params.graduation_time = res.data.data.graduation_time;
            this.params.agreement_first_time = res.data.data.agreement_first_time;
            this.params.agreement_first_end_time = res.data.data.agreement_first_end_time;
            this.params.agreement_second_time = res.data.data.agreement_second_time;
            this.params.remark = res.data.data.remark;

            let departNameArray = [];
            this.params.department_id = [];
            this.params.position_id = [];

            if(res.data.data && res.data.data.org && res.data.data.org.length>0) {
              res.data.data.org.forEach((item) => {
                this.params.department_id.push(item.id);
                departNameArray.push(item.name);
              })
            }
            this.department = departNameArray.join(',');
            this.roleArray = res.data.data.role;
            if(this.roleArray && this.roleArray.length>0){
              this.roleArray.forEach((item) => {
                this.params.position_id.push(item.position_id)
              })
            }
            this.getPosition(this.params.department_id);
          }else {
            this.$notify({
              title: '警告',
              message: res.data.message,
              type:'warning'
            });
          }
        });
      },
      //获取岗位
      getPosition(id){
        this.$http.get(globalConfig.server_user+'positions?org_id=' + id+ '&per_page_number=50').then((res) => {
          if(res.data.status === 'success'){
            this.positionArray = res.data.data;
          }else {
            this.positionArray =[];
          }
        })
      },
      confirmAdd(){
        if(this.isEdit) {
            //修改
            this.$http.put(globalConfig.server+ 'manager/staff', this.params).then((res) => {
              if(res.data.code === '10010') {
                this.$emit('close','success');
                this.closeModal();

              } else {
                this.$notify.warning({
                  title: '警告',
                  message: res.data.msg,
                });
              }
            });
          }else{
            //新增
            this.$http.post(globalConfig.server+ 'manager/staff', this.params).then((res) => {
              if(res.data.code === '10010') {
                this.$emit('close','success');
                this.closeModal();
              } else {
                this.$notify.warning({
                  title: '警告',
                  message: res.data.msg,
                });
              }
            });
          }

      },
      selectDepart() {
        this.organizationDialog = true;
        this.type = 'depart';
      },
      //关闭选人框回调
      closeOrganization(){
        this.organizationDialog = false;
        this.type = null;
        this.length = null;
      },
      selectMember(val) {
        this.params.department_id = [];
        this.department_name = val[0].name;
        let departNameArray = [];
        if(val.length>0){
          val.forEach((item) => {
            this.params.department_id.push(item.id);
            departNameArray.push(item.name);
          });
        }
        this.department = departNameArray.join(',');
        this.type = null;
        this.length = null;
        this.organizationDialog = false;
      },
      beforeCloseModal(){
        if(this.isEdit){
          this.params = {
            position_id:[],
            department_id:'',
            name:'',
            phone:''
          };
          this.department = '';
          this.positionArray =[];
          this.roleArray =[];
        }
        this.addStaffDialogVisible = false;
      },
      closeModal(){
        this.addStaffDialogVisible = false;
        this.params = {
          position_id: [],
          department_id: [],
          phone: '',
          real_name: '',
          gender: '',
          home_addr: '',
          fertility_status: '',
          id_num: '',
          birthday: '',
          recommender: '',
          bank_num: '',
          account_bank: '',
          emergency_call: '',
          level: '',
          account_name: '',
          status: '',
          enroll: '',
          // salary_level: '1',
          salary: '',
          entry_materials: [],
          origin_addr: '',
          marital_status: '',
          political_status: '',
          forward_time: '',
          mail: '',
          education: '',
          school: '',
          major: '',
          graduation_time: '',
          agreement_first_time: '',
          agreement_first_end_time: '',
          agreement_second_time: '',
          remark: '',
        };
        this.department = '';
        this.positionArray =[];
        this.roleArray =[];
      },
      //性别
      getSex(){
        this.$http.get(globalConfig.server+ 'setting/dictionary/228').then((res) => {
          if(res.data.code === '30010'){
            this.sexCategory = res.data.data;
          }else{
            this.sexCategory = [];
          }
        });
      },
      //生育状况
      getFertilityStatus() {
        this.$http.get(globalConfig.server+ 'setting/dictionary/231').then((res) => {
          if(res.data.code === '30010') {
            this.fertilityStatusCategory = res.data.data;
          }else{
            this.fertilityStatusCategory = [];
          }
        });
      },
      //账号状态
      getAccountStatus() {
        this.$http.get(globalConfig.server+ 'setting/dictionary/40').then((res) => {
          if(res.data.code === '30010') {
            this.accountStatusCategory = res.data.data;
          }else{
            this.accountStatusCategory = [];
          }
        });
      },
      //入职材料
      getEntryMaterials() {
        this.$http.get(globalConfig.server+ 'setting/dictionary/515').then((res) => {
          if(res.data.code === '30010') {
            this.entryMaterialsCategory = res.data.data;
          }else{
            this.entryMaterialsCategory = [];
          }
        });
      },
      //婚姻状况
      getMaritalStatus() {
        this.$http.get(globalConfig.server+ 'setting/dictionary/33').then((res) => {
          if(res.data.code === '30010') {
            this.maritalStatusCategory = res.data.data;
          }else{
            this.maritalStatusCategory = [];
          }
        });
      },
      //政治面貌
      getPoliticalStatus() {
        this.$http.get(globalConfig.server+ 'setting/dictionary/38').then((res) => {
          if(res.data.code === '30010') {
            this.politicalStatusCategoey = res.data.data;
          }else{
            this.politicalStatusCategoey = [];
          }
        });
      },
      //学历
      getEducation() {
        this.$http.get(globalConfig.server+ 'setting/dictionary/39').then((res) => {
          if(res.data.code === '30010') {
            this.educationCategory = res.data.data;
          }else{
            this.educationCategory = [];
          }
        });
      },

      //等级
      getBranchBank() {
        this.$http.get(globalConfig.server+ 'setting/dictionary/234').then((res) => {
          if (res.data.code === '30010') {
            this.branchBankCategory = res.data.data;
          }else{
            this.branchBankCategory = [];
          }
        });
      },
      //校验银行卡号和身份证号
      checkData(){
        this.$http.get(globalConfig.server+ 'manager/staff/info?bank_num='+this.params.bank_num+'&id_num='+this.params.id_num).then((res) => {
          if(res.data.code === '10050') {
              this.checkStatus = true;
          }else{
            this.$notify.warning({
              title: '警告',
              message: res.data.msg,
            });
          }
        });
      },

    }
  };
</script>
<style lang="scss" scoped="">
  #addRentRepair{

  }

</style>
