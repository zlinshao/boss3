<template>
  <div id="addRentRepair">
    <el-dialog :title="title" :visible.sync="addStaffDialogVisible" width="60%" :before-close="beforeCloseModal">
      <div>{{currentPost}}--{{params}}
        <el-form size="mini" :model="params" label-width="120px" style="padding: 0 20px;">
          <el-tabs v-model="activeName">
            <el-tab-pane label="基本信息" name="first">
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="真实姓名" required>
                    <el-input placeholder="请输入真实姓名" v-model="params.real_name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="性别" required>
                    <el-radio-group v-model="params.gender">
                      <el-radio v-for="item in sexCategory" :label="item.id" :key="item.id">{{item.dictionary_name}}
                      </el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="手机号码" required>
                    <el-input placeholder="请输入手机号码" v-model="params.phone"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="16">
                  <el-form-item label="家庭住址" required>
                    <el-input placeholder="请输入家庭住址" v-model="params.home_addr"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="生育状况">
                    <el-radio-group v-model="params.fertility_status">
                      <el-radio v-for="item in fertilityStatusCategory" :label="item.id" :key="item.id">
                        {{item.dictionary_name}}
                      </el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="身份证号" required>
                    <el-input placeholder="请输入身份证号" v-model="params.id_num" @blur="checkIDNumData"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="生日">
                    <el-input placeholder="请输入生日" v-model="params.birthday"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="推荐人">
                    <el-input placeholder="请填写推荐人" v-model="recommenderName" @focus="selectStaff">
                      <template slot="append">
                        <div style="cursor: pointer;" @click="emptyRecommender">清空</div>
                      </template>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="银行卡号" required>
                    <el-input placeholder="请输入银行卡号" v-model="params.bank_num" @blur="checkBankData"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="开户行" required>
                    <el-input placeholder="请输入开户行" v-model="params.account_bank"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="紧急电话" required>
                    <el-input placeholder="请输入紧急电话" v-model="params.emergency_call"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="支行">
                    <el-input placeholder="请输入支行" v-model="params.branch_bank"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="开户名">
                    <el-input placeholder="请输入开户名" v-model="params.account_name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="等级" required>
                    <el-select v-model="params.level">
                      <el-option v-for="item in branchBankCategory" :value="item.id" :key="item.id"
                                 :label="item.dictionary_name">{{item.dictionary_name}}
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="职位" required>
                    <el-select v-model="currentPosition" @blur="positionSelect">
                      <el-option v-for="item in positionArray" :value="item.id" :key="item.id"
                                 :label="item.name">{{item.name}}
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="岗位" required>
                    <el-select v-model="currentPost" :disabled="postSelectStatus" >
                      <el-option v-for="item in postArray" :value="item.id" :key="item.id"
                                 :label="item.name" >{{item.name}}
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="部门" required>
                    <el-input placeholder="请选择部门" v-model="department" @focus="selectDepart">
                      <template slot="append">
                        <div style="cursor: pointer;" @click="emptyDepart">清空</div>
                      </template>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="账号状态" required>
                    <el-select v-model="params.status">
                      <el-option v-for="item in accountStatusCategory" :value="item.id" :key="item.id"
                                 :label="item.dictionary_name">{{item.dictionary_name}}
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="入职时间" required>
                    <el-date-picker v-model="params.enroll" type="date" placeholder="请选择入职时间" value-format="yyyy-MM-dd">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="薪资">
                    <el-input placeholder="请输入薪资" v-model="params.salary"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-form-item label="入职材料">
                  <el-checkbox-group v-model="params.entry_materials">
                    <el-checkbox v-for="item in entryMaterialsCategory" :label="item.id" :key="item.id"
                                 :value="item.id">{{item.dictionary_name}}
                    </el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="辅助信息" name="second">
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="籍贯">
                    <el-input placeholder="请输入籍贯" v-model="params.origin_addr" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="婚姻状况">
                    <el-select v-model="params.marital_status" clearable>
                      <el-option v-for="item in maritalStatusCategory" :label="item.dictionary_name" :key="item.id"
                                 :value="item.id">{{item.dictionary_name}}
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="政治面貌">
                    <el-select v-model="params.political_status" clearable>
                      <el-option v-for="item in politicalStatusCategoey" :label="item.dictionary_name" :key="item.id"
                                 :value="item.id">{{item.dictionary_name}}
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="转正时间">
                    <el-date-picker v-model="params.forward_time" type="date" placeholder="请选择转正时间"
                                    value-format="yyyy-MM-dd" clearable>
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="企业邮箱">
                    <el-input placeholder="请输入企业邮箱" v-model="params.mail" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="学历">
                    <el-select v-model="params.education" clearable>
                      <el-option v-for="item in educationCategory" :label="item.dictionary_name" :key="item.id"
                                 :value="item.id">{{item.dictionary_name}}
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="毕业院校">
                    <el-input placeholder="请输入毕业院校" v-model="params.school" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="专业">
                    <el-input placeholder="请输入专业" v-model="params.major" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="毕业时间">
                    <el-date-picker v-model="params.graduation_time" type="date" placeholder="请选择毕业时间"
                                    value-format="yyyy-MM-dd" clearable></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="第一次签合同时间">
                    <el-date-picker v-model="params.agreement_first_time" type="date" placeholder="请选择时间"
                                    value-format="yyyy-MM-dd" clearable></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="第一次合同到期时间">
                    <el-date-picker v-model="params.agreement_first_end_time" type="date" placeholder="请选择时间"
                                    value-format="yyyy-MM-dd" clearable></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="第二次签合同时间">
                    <el-date-picker v-model="params.agreement_second_time" type="date" placeholder="请选择时间"
                                    value-format="yyyy-MM-dd" clearable></el-date-picker>
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

    <Organization :organizationDialog="organizationDialog" :type="type" :length="length" @close="closeOrganization"
                  @selectMember="selectMember"></Organization>
  </div>
</template>

<script>
  import Organization from '../../../common/organization.vue';

  export default {
    props: ['addStaffDialog', 'isEdit', 'editId', 'departmentId'],
    components: {Organization},
    data() {
      return {
        addStaffDialogVisible: false,
        activeName: 'first',
        recommenderName: '',
        currentPosition: '',
        currentPost: '',
        postSelectStatus: true,
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
        title: '新建用户',
        organizationDialog: false,
        department: '',
        type: null,
        length: null,
        positionArray: [],  //职位
        postArray: [],  //岗位
        roleArray: [],  //编辑时获取的职位
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
    watch: {
      addStaffDialog(val) {
        this.addStaffDialogVisible = val;
      },
      addStaffDialogVisible(val) {
        if (!val) {
          this.$emit('close')
        }
      },
      isEdit(val) {
        if (!val) {
          this.title = '新建用户';
        } else {
          this.title = '修改用户';
          this.getStaffInfo();
        }
      },
      departmentId(val) {
        this.getPosition(val);
      }
    },
    mounted() {
      this.getSex();
      this.getFertilityStatus();
      this.getAccountStatus();
      this.getEntryMaterials();
      this.getMaritalStatus();
      this.getPoliticalStatus();
      this.getEducation();
      this.getBranchBank();
      this.getPosition(this.departmentId);
    },
    created() {
      this.getSex();
      this.getFertilityStatus();
      this.getAccountStatus();
      this.getEntryMaterials();
      this.getMaritalStatus();
      this.getPoliticalStatus();
      this.getEducation();
      this.getBranchBank();
      this.getPosition(this.departmentId);
    },
    methods: {
      positionSelect(){
        if(this.currentPosition){
          this.postSelectStatus = false;
          this.getPositions(this.currentPosition);
        }
      },
      //编辑时获取员工信息
      getStaffInfo() {
        this.$http.get(globalConfig.server + 'manager/staff/' + this.editId).then((res) => {
          if (res.data.code === '10020') {
            let detail = res.data.data.detail;
            if(!detail){
              return;
            }
            this.params.real_name = detail.real_name;
            this.params.gender = detail.gender;
            this.params.phone = res.data.data.phone;
            this.params.home_addr = detail.home_addr;
            this.params.fertility_status = detail.fertility_status;
            this.params.id_num = detail.id_num;
            this.params.birthday = detail.birthday;
            this.params.recommender = detail.recommender;
            this.recommenderName = detail.recommender_name;
            this.params.bank_num = detail.bank_num;
            this.params.account_bank = detail.account_bank;
            this.params.branch_bank = detail.branch_bank;
            this.params.emergency_call = detail.emergency_call;
            this.params.level = detail.level;
            this.params.account_name = detail.account_name;
            this.params.status = detail.status;
            this.params.enroll = detail.enroll;
            this.params.salary = detail.salary;
            this.params.entry_materials = detail.entry_materials;
            this.params.entry_materials = [];
            if (detail && detail.entry_materials && detail.entry_materials.length > 0) {
              for (var i = 0; i < detail.entry_materials.length; i++) {
                this.params.entry_materials.push(Number(detail.entry_materials[i]));
              }
            }
            this.params.salary = detail.salary;
            this.params.origin_addr = detail.origin_addr;
            this.params.marital_status = detail.marital_status;
            this.params.political_status = detail.political_status;
            this.params.forward_time = detail.forward_time;
            this.params.mail = detail.mail;
            this.params.education = detail.education;
            this.params.school = detail.school;
            this.params.major = detail.major;
            this.params.graduation_time = detail.graduation_time;
            this.params.agreement_first_time = detail.agreement_first_time;
            this.params.agreement_first_end_time = detail.agreement_first_end_time;
            this.params.agreement_second_time = detail.agreement_second_time;
            this.params.remark = detail.remark;

            let departNameArray = [];
            this.params.department_id = [];
            this.params.position_id = [];
            if (res.data.data && res.data.data && res.data.data.org.length > 0) {
              res.data.data.org.forEach((item) => {
                this.params.department_id.push(item.id);
                departNameArray.push(item.name);
              });
            }
            this.department = departNameArray.join(',');

            this.roleArray = res.data.data.role;
            let roleNames = [];
            if (this.roleArray && this.roleArray.length > 0) {
              this.roleArray.forEach((item) => {
                this.params.position_id.push(item.id);
                roleNames.push(item.display_name);
              });
            }
            this.currentPost = roleNames.join(',');
            this.getPosition(this.params.department_id);
          } else {
            this.$notify.warning({
              title: '警告',
              message: res.data.msg,
            });
          }
        });
      },
      handleChange(val) {
        console.log(val);
      },
      //获取职位
      getPosition(id) {
        this.$http.get(globalConfig.server + 'manager/position?department_id=' + id).then((res) => {
          if (res.data.code === '20000') {
            this.positionArray = [];
            res.data.data.data.forEach((item) => {
              let position = {};
              position.id = item.id;
              position.name = item.name;
              this.positionArray.push(position);
            });
          } else {
            this.positionArray = [];
          }
        });
      },
      //获取岗位
      getPositions(id) {
        this.$http.get(globalConfig.server + 'manager/positions?type=' + id).then((res) => {
          if (res.data.code === '20000') {
            this.postArray = [];
            res.data.data.data.forEach((item) => {
              let data = {};
              data.id = item.id;
              data.name = item.name;
              this.postArray.push(data);
            });
          }
        });
      },
      confirmAdd() {
        this.params.position_id = [];
        this.params.position_id.push(this.currentPost);
        if (this.isEdit) {
          //修改
          this.$http.put(globalConfig.server + 'manager/staff/' + this.editId, this.params).then((res) => {
            if (res.data.code === '10030') {
              this.$emit('close', 'success');
              this.closeModal();
            } else {
              this.$notify.warning({
                title: '警告',
                message: res.data.msg,
              });
            }
          });
        } else {
          //新增
          this.$http.post(globalConfig.server + 'manager/staff', this.params).then((res) => {
            if (res.data.code === '10010') {
              this.$emit('close', 'success');
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
      selectStaff() {
        this.organizationDialog = true;
        this.type = 'staff';
      },
      emptyRecommender() {
        this.recommenderName = '';
        this.params.recommender = '';
      },
      emptyDepart() {
        this.department = '';
        this.params.department_id = [];
      },
      //关闭选人框回调
      closeOrganization() {
        this.organizationDialog = false;
        this.type = null;
        this.length = null;
      },
      selectMember(val) {
        if (this.type === 'depart') {
          this.params.department_id = [];
          let departNameArray = [];
          if (val.length > 0) {
            val.forEach((item) => {
              this.params.department_id.push(item.id);
              departNameArray.push(item.name);
            });
          }
          this.department = departNameArray.join(',');
          this.type = null;
          this.length = null;
        } else if (this.type === 'staff') {
          this.params.recommender = val[0].id;
          this.recommenderName = val[0].name;
        }
        this.organizationDialog = false;
      },
      beforeCloseModal() {
        if (this.isEdit) {
          this.params = {
            position_id: [],
            department_id: '',
            name: '',
            phone: ''
          };
          this.department = '';
          this.positionArray = [];
          this.roleArray = [];
        }
        this.addStaffDialogVisible = false;
      },
      closeModal() {
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
        this.positionArray = [];
        this.roleArray = [];
      },
      //性别
      getSex() {
        this.$http.get(globalConfig.server + 'setting/dictionary/228').then((res) => {
          if (res.data.code === '30010') {
            this.sexCategory = res.data.data;
          } else {
            this.sexCategory = [];
          }
        });
      },
      //生育状况
      getFertilityStatus() {
        this.$http.get(globalConfig.server + 'setting/dictionary/231').then((res) => {
          if (res.data.code === '30010') {
            this.fertilityStatusCategory = res.data.data;
          } else {
            this.fertilityStatusCategory = [];
          }
        });
      },
      //账号状态
      getAccountStatus() {
        this.$http.get(globalConfig.server + 'setting/dictionary/40').then((res) => {
          if (res.data.code === '30010') {
            this.accountStatusCategory = res.data.data;
          } else {
            this.accountStatusCategory = [];
          }
        });
      },
      //入职材料
      getEntryMaterials() {
        this.$http.get(globalConfig.server + 'setting/dictionary/515').then((res) => {
          if (res.data.code === '30010') {
            this.entryMaterialsCategory = res.data.data;
          } else {
            this.entryMaterialsCategory = [];
          }
        });
      },
      //婚姻状况
      getMaritalStatus() {
        this.$http.get(globalConfig.server + 'setting/dictionary/33').then((res) => {
          if (res.data.code === '30010') {
            this.maritalStatusCategory = res.data.data;
          } else {
            this.maritalStatusCategory = [];
          }
        });
      },
      //政治面貌
      getPoliticalStatus() {
        this.$http.get(globalConfig.server + 'setting/dictionary/38').then((res) => {
          if (res.data.code === '30010') {
            this.politicalStatusCategoey = res.data.data;
          } else {
            this.politicalStatusCategoey = [];
          }
        });
      },
      //学历
      getEducation() {
        this.$http.get(globalConfig.server + 'setting/dictionary/39').then((res) => {
          if (res.data.code === '30010') {
            this.educationCategory = res.data.data;
          } else {
            this.educationCategory = [];
          }
        });
      },

      //等级
      getBranchBank() {
        this.$http.get(globalConfig.server + 'setting/dictionary/234').then((res) => {
          if (res.data.code === '30010') {
            this.branchBankCategory = res.data.data;
          } else {
            this.branchBankCategory = [];
          }
        });
      },
      //校验身份证号
      checkIDNumData() {
        this.$http.get(globalConfig.server + 'manager/staff/info?bank_num=' + this.params.bank_num + '&id_num=' + this.params.id_num).then((res) => {
          if (res.data.code === '10050') {
            this.checkStatus = true;
            let data = res.data.data;
            if (data.birthday) {
              this.params.birthday = data.birthday;
            }
          } else {
            this.$notify.warning({
              title: '警告',
              message: res.data.msg,
            });
          }
        });
      },
      //校验银行卡号
      checkBankData() {
        this.$http.get(globalConfig.server + 'manager/staff/info?bank_num=' + this.params.bank_num + '&id_num=' + this.params.id_num).then((res) => {
          if (res.data.code === '10050') {
            this.checkStatus = true;
            let data = res.data.data;
            if (typeof data === 'string') {
              this.params.account_bank = data;
            }
          } else {
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
  #addRentRepair {

  }

</style>
