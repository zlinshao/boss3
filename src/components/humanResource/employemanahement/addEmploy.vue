<template>
  <div id="addStaff">
    <el-dialog :close-on-click-modal="false" :title="title" :visible.sync="addStaffDialogVisible" width="60%">
      <div>
        <el-form size="mini" onsubmit="return false;" :model="params" label-width="120px" style="padding: 0 20px;">
          <el-tabs v-model="activeName">
            <el-tab-pane label="个人信息" name="first" class="scroll_bar">
              <div class="addForm">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="真实姓名" required>
                      <el-input placeholder="请输入真实姓名" v-model="params.real_name" clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="性别" required>
                      <el-radio-group v-model="params.gender">
                        <el-radio v-for="item in sexCategory" :label="item.id" :key="item.id" name="gender">
                          {{item.dictionary_name}}
                        </el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="手机号码" required>
                      <el-input placeholder="请输入手机号码" v-model="params.phone" clearable></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="身份证号" required>
                      <el-input placeholder="请输入身份证号" v-model="params.id_num" @blur="checkIDNumData"
                                clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="生日">
                      <el-input placeholder="请输入生日" v-model="params.birthday" clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="生育状况">
                      <el-radio-group v-model="params.fertility_status">
                        <el-radio v-for="item in fertilityStatusCategory" :label="item.id" name="gender" :key="item.id">
                          {{item.dictionary_name}}
                        </el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="16">
                    <el-form-item label="家庭住址" required>
                      <el-input placeholder="请输入家庭住址" v-model="params.home_addr" clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="紧急电话" required>
                      <el-input placeholder="请输入紧急电话" v-model="params.emergency_call" clearable></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="银行卡号" required>
                      <el-input placeholder="请输入银行卡号" v-model="params.bank_num" @blur="checkBankData"
                                clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="开户行" required>
                      <el-input placeholder="请输入开户行" v-model="params.account_bank" clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="支行">
                      <el-input placeholder="请输入支行" v-model="params.branch_bank" clearable></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="银联行号">
                      <el-input placeholder="请输入开户名" v-model="params.account_name" clearable></el-input>
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
                  <el-col :span="8">
                    <el-form-item label="籍贯">
                      <el-input placeholder="请输入籍贯" v-model="params.origin_addr" clearable></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
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
                    <el-form-item label="学历">
                      <el-select v-model="params.education" clearable>
                        <el-option v-for="item in educationCategory" :label="item.dictionary_name" :key="item.id"
                                  :value="item.id">{{item.dictionary_name}}
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="毕业时间">
                      <el-date-picker v-model="params.graduation_time" type="date" placeholder="请选择毕业时间"
                                      value-format="yyyy-MM-dd" clearable></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </el-tab-pane>
            <el-tab-pane label="工作信息" name="second">
              <el-row>
                  <!-- <el-col :span="8">
                    <el-form-item label="公司" required>
                      <el-input placeholder="请输入公司" size="mini" v-model="params.company"></el-input>
                    </el-form-item>
                  </el-col> -->
                  <el-col :span="8">
                    <el-form-item label="部门" required>
                      <el-input placeholder="请选择" @focus="openOrgan('department_id', 'depart')"
                                v-model="orgData.department_id"
                                size="mini">
                        <el-button slot="append" @click="emptyDepart('department_id')">清空</el-button>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="职位" required>
                      <el-select v-model="params.duty_id" @change="positionSelect" clearable multiple
                                 :disabled="duty.length < 1">
                        <el-option v-for="(item,index) in duty" :value="item.id" :key="index" :label="item.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              <el-row>
                  <el-col :span="8">
                    <el-form-item label="岗位" required>
                      <el-select v-model="params.position_id" clearable multiple :disabled="position.length < 1">
                        <el-option v-for="(item,index) in position" :value="item.id" :key="index" :label="item.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="入职时间" required>
                      <el-date-picker v-model="params.enroll" type="date" placeholder="请选择入职时间"
                                      value-format="yyyy-MM-dd">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="入职途径">
                      <el-select v-model="params.entry_way.entry_type" clearable>
                        <!--multiple-->
                        <el-option v-for="item in entryWayCategory" :value="item.id" :key="item.id"
                                   :label="item.name">{{item.name}}
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="等级" required>
                      <el-select v-model="params.level" clearable>
                        <el-option v-for="item in branchBankCategory" :value="item.id" :key="item.id"
                                   :label="item.dictionary_name">{{item.dictionary_name}}
                        </el-option>
                      </el-select>
                      <div style="color: #409EFF;font-size: 12px;text-align: right;"
                           v-if="params.level != 235 && params.level != 236 && params.level != 247 && params.level != 248 && params.level != 249 && params.level != ''">
                        <span v-if="detailData && detailData.send_info==2">已发过转正祝贺</span>
                        <span v-if="detailData && detailData.send_info==1">未发过转正祝贺 </span>
                        <span style="cursor: pointer;margin-left: 10px;" @click="sendPositive">点击发送</span>
                      </div>
                    </el-form-item>
                  </el-col> 
                  <el-col :span="8">
                    <el-form-item label="转正时间">
                      <el-date-picker v-model="params.forward_time" type="date" placeholder="请选择转正时间"
                                      value-format="yyyy-MM-dd">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="薪资">
                      <el-input placeholder="请输入薪资" v-model="params.salary" clearable></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="推荐人">
                      <el-input placeholder="请填写推荐人" @focus="openOrgan('recommender', 'staff')"
                                v-model="orgData.recommender" size="mini">
                        <el-button slot="append" @click="emptyDepart('recommender')">清空</el-button>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="第一次签合同时间">
                      <el-date-picker v-model="params.agreement_first_time" type="date" placeholder="请选择时间"
                                      value-format="yyyy-MM-dd"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="第一次合同到期时间">
                      <el-date-picker v-model="params.agreement_first_end_time" type="date" placeholder="请选择时间"
                                      value-format="yyyy-MM-dd"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <!-- <el-col :span="24" v-if="params.entry_way.entry_type == 11">
                    
                  </el-col> -->
                </el-row>
                <!-- <el-row v-if="editId">
                  
                  <el-col :span="12">
                    <el-form-item label="具体描述">
                      <el-input type="textarea" placeholder="请填写描述"
                                v-model="params.dismiss_reason.dismiss_mess"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row> -->
                <!-- <el-row>
                  <el-form-item label="入职材料">
                    <el-checkbox-group v-model="params.entry_materials">
                      <el-checkbox v-for="item in entryMaterialsCategory" :label="item.id" :key="item.id"
                                   :value="item.id">{{item.dictionary_name}}
                      </el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                </el-row> -->
              <el-row>
                <!-- <el-col :span="8">
                  <el-form-item label="婚姻状况">
                    <el-select v-model="params.marital_status" clearable>
                      <el-option v-for="item in maritalStatusCategory" :label="item.dictionary_name" :key="item.id"
                                 :value="item.id">{{item.dictionary_name}}
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col> -->
              </el-row>
              <el-row>
                <el-col :span="8">
                    <el-form-item label="第二次签合同时间">
                      <el-date-picker v-model="params.agreement_second_time" type="date" placeholder="请选择时间"
                                      value-format="yyyy-MM-dd"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="在职状态">
                      <el-select v-model="params.statusValue" placeholder="请选择" clearable @change="whetherToLeave">
                        <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                <!-- <el-col :span="8">
                  <el-form-item label="企业邮箱">
                    <el-input placeholder="请输入企业邮箱" v-model="params.mail" clearable></el-input>
                  </el-form-item>
                </el-col> -->
              </el-row>
              <!-- <el-row v-if="isEdit">
                <el-col :span="8">
                  <el-form-item label="离职原因">
                    <el-select v-model="params.dismiss_reason.dismiss_type" clearable placeholder="请选择" size="mini">
                      <el-option v-for="item in dismissReasonCategory" :value="item.id" :key="item.id"
                                  :label="item.name">{{item.name}}
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="选择时间">
                    <el-date-picker v-model="params.agreement_first_time" type="date" placeholder="请选择时间" value-format="yyyy-MM-dd" size="mini"></el-date-picker>
                  </el-form-item>
                </el-col>
                 <el-col :span="16">
                  <el-form-item label="备注">
                      <el-input type="textarea" placeholder="请填写离职备注" v-model="params.entry_way.entry_mess" size="mini"></el-input>
                    </el-form-item>
                </el-col>
              </el-row> -->
              <el-row>
                <el-col :span="24">
                  <el-form-item label="身份证复印件">
                    <UpLoad :ID="'copyIDCard'" :isClear="isClear" :editImage="editIDCopy" @getImg="IDcard"></UpLoad>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="银行卡复印件">
                    <UpLoad :ID="'copyBankCard'" :isClear="isClear" :editImage="editBank" @getImg="BankCard"></UpLoad>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="劳动合同">
                    <UpLoad :ID="'copyContract'" :isClear="isClear" :editImage="editContract" @getImg="ContractCard"></UpLoad>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="学历复印件">
                    <UpLoad :ID="'copyEducation'" :isClear="isClear" :editImage="editEducation" @getImg="EducationCard"></UpLoad>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="应聘表">
                    <UpLoad :ID="'copyApply'" :isClear="isClear" :editImage="editResume" @getImg="ApplyCard"></UpLoad>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="上家离职单位证明">
                    <UpLoad :ID="'copyDismiss'" :isClear="isClear" :editImage="editResignation" @getImg="DismissCard"></UpLoad>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- <el-row>
                 <el-col :span="24">
                  <el-form-item label="备注">
                    <el-input type="textarea" v-model="params.remark" placeholder="请填写备注"></el-input>
                  </el-form-item>
                </el-col> 
              </el-row> -->
            </el-tab-pane>
          </el-tabs>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="addStaffDialogVisible = false" :disabled="disabledBtn">取 消</el-button>
        <el-button size="mini" type="primary" @click="confirmAdd" :disabled="disabledBtn">确 定</el-button>
      </span>
    </el-dialog>
    
    <Organization :organizationDialog="organizationDialog" :type="organizeType" :length="lengths"
                  @close="closeOrgan" @selectMember="selectMember"></Organization>
    <!-- 离职弹窗 -->
    <el-dialog :close-on-click-modal="false" title="提示" :visible.sync="selectLeaveDateDialog" width="30%">
      <el-form ref="form" :model="form" onsubmit="return false;" label-width="100px" style="padding: 0 20px;">
        <el-form-item label="离职时间">
          <el-date-picker v-model="form.dismiss_time" type="date" placeholder="请选择离职日期" value-format="yyyy-MM-dd" size="mini"></el-date-picker>
        </el-form-item>
        <el-form-item label="离职原因">
          <el-select v-model="form.dismiss_reason.dismiss_type" clearable>
            <el-option v-for="item in dismissReasonCategory" :value="item.id" :key="item.id" :label="item.name" size="mini">{{item.name}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="离职备注">
          <el-input type="textarea" placeholder="请填写描述" v-model="form.dismiss_reason.dismiss_mess" size="mini"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="selectLeaveDateDialog = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="leaveDateConfirm" size="mini">只离职</el-button>
        <el-button size="small" type="primary" @click="leaveSendMsg">离职并发群消息</el-button>
        <el-button size="small" type="primary" @click="leaveAndSendMsgConfirm">离职并发送短信</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import Organization from '../../common/organization';
  import UpLoad from "../../common/UPLOAD.vue"

  export default {
    props: ["ids", "addStaffDialog", 'isEdit', 'editId'],
    components: {Organization, UpLoad},
    data() {
      return {
        isClear: false,
        url: globalConfig.server,
        disabledBtn: false,
        addStaffDialogVisible: false,
        addEmployDialog: false,    // new
        activeName: 'first',
        currentPosition: [],
        positionDisabled: true,
        postDisabled: true,
        detailData: {},
        // 新增字段 ========
        selectLeaveDateDialog: false,
        form: {
          dismiss_time: '',
          dismiss_reason: {
            dismiss_type: '',
            dismiss_mess: '',
          },
        }, //离职日期
        statusOptions:[
          {value: "1", label: "在职"},
          {value: "2", label: "离职"},
          {value: "3", label: "停职留薪"},
        ],
        dismissReasonCategory: [
          {id: "1", name: '主动离职'},
          {id: "2", name: '旷工离职'},
          {id: "3", name: '劝退'},
          {id: "4", name: '开除'},
        ],
        editIDCopy: {},
        editBank: {},
        editContract: {},
        editEducation: {},
        editResume: {},
        editResignation: {},
        params: {
          image_info: {
            doc_photo: [],   // 身份证
            bank: [],       // 银行卡
            resume: [],      // 申请表
            resignation: [],   //  上家单位离职证明
            labor_contract: [],  // 劳动合同
            education: [],  // 学历复印件
          },
          statusValue: "1",
          // ================
          duty_id: [],
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
          //入职途径
          entry_way: {
            entry_type: '',
            entry_mess: '',
          },
          //离职原因
          dismiss_reason: {
            dismiss_type: '',
            dismiss_mess: '',
          },
        },
        title: '新建用户',

        organizationDialog: false,
        organizeType: '',
        lengths: 0,
        organDivision: '',  //组织架构字段
        orgData: {},

        duty: [],               //职务
        position: [],           //岗位
        postArrayIds: [],
        sexCategory: [],
        fertilityStatusCategory: [],
        accountStatusCategory: [],
        entryMaterialsCategory: [],
        maritalStatusCategory: [],
        politicalStatusCategoey: [],
        educationCategory: [],
        branchBankCategory: [],
        jobStatusCategory: [],
        editPositionIds: [],
        entryWayCategory: [
          {id: "1", name: '智联招聘'},
          {id: "2", name: '前程无忧'},
          {id: "3", name: '58同城'},
          {id: "4", name: 'BOSS直聘'},
          {id: "5", name: '猎聘网'},
          {id: "6", name: '首席信才'},
          {id: "7", name: '德盛人才'},
          {id: "8", name: '校园招聘会'},
          {id: "9", name: '社会招聘会'},
          {id: "10", name: '推荐'},
          {id: "11", name: '其他'},
        ],
        dismissReasonCategory: [
          {id: "1", name: '主动离职'},
          {id: "2", name: '旷工离职'},
          {id: "3", name: '劝退'},
          {id: "4", name: '开除'},
        ],
      };
    },
    watch: {
      isClear: function (val) {
        this.isClear = val;
      },
      // addEmployLog(val,id) {
      //   console.log(val, "22222")
      //   this.addStaffDialogVisible = val;
      // },
      // addEmployDialog(val) {
      //   if(!val) {
      //     this.$emit("close")
      //   }
      // },
      addStaffDialog(val) {
        this.addStaffDialogVisible = val;
        this.params.image_info = {
          doc_photo: [],
          bank: [],
          contract: [],
          education: [],
          apply: [],
          dismiss: []
        }
        // this.isClear = true;
      },
      addStaffDialogVisible(val) {
        if (!val) {
          this.initial(); //关闭弹框时清除
          this.$emit('close');
          this.$http.get(this.url + "special/special/loginInfo").then((res) => {
            localStorage.setItem('personal', JSON.stringify(res.data.data));
          });
          this.isClear = true;
          this.disabledBtn = false;
          this.emptyDepart("department_id");
          this.emptyDepart("recommender");
        } else {
          this.editPositionIds = [];
          // this.getDictionaries(); //新增或者修改打开弹框时候才请求字典
        }
      },
      isEdit(val) {
        if (!val) {
          this.title = '新建用户';
        } else {
          this.title = '修改用户';
          this.params.statusValue = "";
          this.getStaffInfo();
        }
      },
      editPositionIds(val) {
        for (let i = 0; i < this.editPositionIds.length; i++) {
          this.getPositions(this.editPositionIds[i]);
        }
      },
      "params.entry_way.entry_type": {
        deep: true,
        handler(val, oldVal) {
          if (val != 11) {
            this.params.entry_way.entry_mess = '';
          }
        }
      }
    },
    mounted() {
      this.getDictionaries();
    },
    methods: {
      // 图片上传 ================
      IDcard(val) {
        this.params.image_info.doc_photo = val[1];
        // console.log(this.params.image_info.doc_photo, "身份证")
      },
      BankCard(val) {
        this.params.image_info.bank = val[1];
        // console.log(this.params.image_info.bank, "银行卡")
      },
      ContractCard(val) {
         this.params.image_info.labor_contract = val[1];
        //  console.log(this.params.image_info.labor_contract, "合同")
      },
      EducationCard(val) {
         this.params.image_info.education = val[1];
        //  console.log(this.params.image_info.education, "学历")
      },
      ApplyCard(val) {
         this.params.image_info.resume = val[1];
        //  console.log(this.params.image_info.resume, "申请表")
      },
      DismissCard(val) {
         this.params.image_info.resignation = val[1];
        //  console.log(this.params.image_info.resignation, "离职证明")
      },
      // ========================
      getDictionaries() {
        this.getSex();
        this.getFertilityStatus();
        this.getAccountStatus();
        this.getEntryMaterials();
        this.getMaritalStatus();
        this.getPoliticalStatus();
        this.getEducation();
        this.getBranchBank();
        this.getOnJobStatus();
      },
      initial() {
        this.params.image_info = {
          doc_photo: [],
          bank: [],
          contract: [],
          education: [],
          apply: [],
          dismiss: []
        }
        this.params.entry_way = {
          entry_type: '',
          entry_mess: '',
        };
        this.params.dismiss_reason = {
          dismiss_type: '',
          dismiss_mess: '',
        };
        this.organData = {};
        this.params.statusValue = "1";
        this.params.real_name = '';
        this.params.gender = '';
        this.params.phone = '';
        this.params.home_addr = '';
        this.params.fertility_status = '';
        this.params.id_num = '';
        this.params.birthday = '';
        this.params.recommender = '';
        this.params.bank_num = '';
        this.params.account_bank = '';
        this.params.branch_bank = '';
        this.params.emergency_call = '';
        this.params.level = '';
        this.params.account_name = '';
        this.params.enroll = '';
        this.params.salary = '';
        this.params.entry_materials = [];
        this.params.salary = '';
        this.params.origin_addr = '';
        this.params.marital_status = '';
        this.params.political_status = '';
        this.params.forward_time = '';
        this.params.mail = '';
        this.params.education = '';
        this.params.school = '';
        this.params.major = '';
        this.params.graduation_time = '';
        this.params.agreement_first_time = '';
        this.params.agreement_first_end_time = '';
        this.params.agreement_second_time = '';
        this.params.remark = '';
        this.params.department_id = [];
        this.params.position_id = [];
        this.currentPosition = [];
        this.positionArray = [];
        this.postArray = [];
        this.positionDisabled = true;
        this.postDisabled = true;
      },
      // positionSelect() {
      //   this.postArray = [];
      //   if (this.currentPosition.length > 0) {
      //     this.postDisabled = false; //岗位可选
      //     for (let i = 0; i < this.currentPosition.length; i++) {
      //       this.getPositions(this.currentPosition[i]);
      //     }
      //   }
      // },
      // selectDepartment() {
      //   if (this.department) {
      //     this.positionArray = [];
      //     this.postArray = [];
      //     this.currentPosition = [];
      //     this.params.position_id = [];
      //     this.positionDisabled = false;  //职位可选
      //     for (let i = 0; i < this.params.department_id.length; i++) {
      //       this.getPosition(this.params.department_id[i]);
      //     }
      //   } else {
      //     this.positionArray = [];
      //     this.currentPosition = [];
      //     this.params.position_id = [];
      //     this.postArray = [];
      //     this.positionDisabled = true;
      //     this.postDisabled = true;
      //   }
      // },
      // 选择离职 
      whetherToLeave(val) {
        console.log(val)
        if(val == "2") {
          this.$confirm("确定将该员工的在职状态改为离职吗？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            this.selectLeaveDateDialog = true;
          })
        }
      },
      // 只离职
      leaveDateConfirm() {
        this.$confirm('员工在职状态将会改变, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post(globalConfig.server + 'organization/staff/dismisse/' + this.editId, {
            dismiss_time: this.form.dismiss_time,
            dismiss_reason: this.form.dismiss_reason,
          }).then((res) => {
            if (res.data.code === '710418') {
              // this.getPostStaffData();
              // this.getStaffData();
              this.getStaffInfo();
              this.prompt('success', res.data.msg);
              this.selectLeaveDateDialog = false;
            } else {
              this.prompt('warning', res.data.msg);
            }
          });
        }).catch(() => {

        });
      },
      //离职群发
      leaveSendMsg() {
        this.$confirm('员工在职状态将会改变并且向群里发送消息，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post(globalConfig.server + 'organization/staff/dismisse/' + this.editId, {
            dismiss_time: this.form.dismiss_time,
            dismiss_reason: this.form.dismiss_reason,
          }).then((res) => {
            if (res.data.code === '710418') {
              this.prompt('success', res.data.msg);
              // this.getPostStaffData();
              // this.getStaffData();
              this.getStaffInfo();
              if (this.selectLeaveDateDialog && !this.sendLeaveMsgDialog) {
                this.sendLeaveMsgForm.date = this.form.dismiss_time;
              }
              this.$http.get(globalConfig.server + `organization/staff/leave-group/${this.editId}?dismiss_time=${this.form.dismiss_time}`).then(res => {
                if (res.data.code === "710910") {
                  this.$notify.success({
                    title: '成功',
                    message: res.data.msg
                  });
                  // this.getPostStaffData();
                  // this.getStaffData();
                  this.getStaffInfo();
                  this.selectLeaveDateDialog = false;
                } else {
                  this.$notify.warning({
                    title: '失败',
                    message: res.data.msg
                  });
                  this.selectLeaveDateDialog = false;
                }
              }).catch(err => {
                console.log(err);
              })
            } else {
              this.prompt('warning', res.data.msg);
            }
          });
        })
      },
      // 离职并发送短信
      leaveAndSendMsgConfirm() {
        this.$confirm('员工在职状态将会改变并且向该员工所负责的客户发送短信, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post(globalConfig.server + 'organization/staff/dismisse/' + this.editId, {
            dismiss_time: this.form.dismiss_time,
            dismiss_reason: this.form.dismiss_reason,
          }).then((res) => {
            if (res.data.code === '710418') {
              this.prompt('success', res.data.msg);
              // this.getPostStaffData();
              // this.getStaffData();
              this.getStaffInfo();
              if (this.selectLeaveDateDialog && !this.sendLeaveMsgDialog) {
                this.sendLeaveMsgForm.date = this.form.dismiss_time;
              }
              this.$http.get(globalConfig.server + 'organization/staff/leave-sms', {
                params: {
                  id: this.editId,
                  date: this.sendLeaveMsgForm.date
                }
              }).then((res) => {
                if (res.data.code === '710400') {
                  this.prompt('success', res.data.msg);
                  this.selectLeaveDateDialog = false;
                } else {
                  this.prompt('warning', res.data.msg);
                }
              });
            } else {
              this.prompt('warning', res.data.msg);
            }
          });
        }).catch(() => {
        });
      },
      // 获取图片
      getImgList() {
        this.editEducation = {};
        this.editBank = {};
        this.editContract = {};
        this.editResignation = {};
        this.editResume = {};
        this.editIDCopy = {};
        this.params.image_info = {
          doc_photo: [],   // 身份证
          bank: [],       // 银行卡
          resume: [],      // 申请表
          resignation: [],   //  上家单位离职证明
          labor_contract: [],  // 劳动合同
          education: [],  // 学历复印件
        }
        // this.isClear = true;
         this.$http.get(globalConfig.server + 'hrm/User/userInfo', {params: {user_id: this.editId}}).then(res => {
           if (res.data.code == 90010) {
             let obj1 = {};
             let obj2 = {};
             let obj3 = {};
             let obj4 = {};
             let obj5 = {};
             let obj6 = {};
             if(res.data.data.image_info) {
                for( let key in res.data.data.image_info) {
                  if(key == "education") {
                    res.data.data.image_info[key].forEach((item, index) => {
                      this.params.image_info.education.push(item.id);
                      obj1[item.id] = item.uri;
                    })
                    this.editEducation = obj1;
                  }
                  if(key == "bank") {
                    res.data.data.image_info[key].forEach((item, index) => {
                      this.params.image_info.bank.push(item.id);
                      obj2[item.id] = item.uri;
                    })
                    this.editBank = obj2;
                  }
                  if(key == "labor_contract") {
                    res.data.data.image_info[key].forEach((item, index) => {
                      this.params.image_info.labor_contract.push(item.id);
                      obj3[item.id] = item.uri;
                    })
                    this.editContract = obj3;
                  }
                  if(key == "resignation") {
                    res.data.data.image_info[key].forEach((item, index) => {
                      this.params.image_info.resignation.push(item.id);
                      obj4[item.id] = item.uri;
                    })
                    this.editResignation = obj4;
                  }
                  if(key == "resume") {
                    res.data.data.image_info[key].forEach((item, index) => {
                      this.params.image_info.resume.push(item.id);
                      obj5[item.id] = item.uri;
                    })
                    this.editResume = obj5;
                  }
                  if(key == "doc_photo") {
                    res.data.data.image_info[key].forEach((item, index) => {
                      this.params.image_info.doc_photo.push(item.id);
                      obj6[item.id] = item.uri;
                    })
                    this.editIDCopy = obj6;
                  }
                }
              }
           }
         })
      },
      //编辑时获取员工信息
      getStaffInfo() {
        this.$http.get(this.url + 'organization/staff/' + this.editId).then((res) => {
          if (res.data.code === '710910') {
            this.getImgList();
            this.detailData = res.data.data.detail;
            this.params.phone = res.data.data.phone;
            this.params.real_name = res.data.data.name;
            let val = res.data.data;
            this.params.duty_id = [];
            this.params.position_id = [];
            this.duty = [];
            this.position = [];
            if (val.duties) {// 职务
              for (let item of val.duties) {
                this.params.duty_id.push(item.id);
              }
              this.positionSelect(this.params.duty_id);
            }
            if (val.positions) {// 岗位
              for (let item of val.positions) {
                this.params.position_id.push(item.id);
              }
            }
            let detail = res.data.data.detail;
            if (detail) {
              if (detail.entry_way && detail.entry_way !== 'null') {
                this.params.entry_way = detail.entry_way;
              } else {
                this.params.entry_way = {entry_type: '', entry_mess: '',};
              }
              if (detail.dismiss_reason && detail.dismiss_reason !== 'null') {
                this.params.dismiss_reason = detail.dismiss_reason;
              } else {
                this.params.dismiss_reason = {dismiss_type: '', dismiss_mess: ''};
              }
              this.params.gender = Number(detail.gender);
              this.params.home_addr = detail.home_addr;
              this.params.fertility_status = Number(detail.fertility_status);
              this.params.id_num = detail.id_num;
              this.params.birthday = detail.birthday;
              this.params.recommender = detail.recommender;
              if (detail.recommender) {
                this.$http.get(globalConfig.server + 'organization/user/' + detail.recommender).then(res => {
                  if (res.data.code == '20020') {
                    this.orgData.recommender = res.data.data.name;
                  } else {
                    this.orgData.recommender = "";
                  }
                });
              }
              this.params.bank_num = detail.bank_num;
              this.params.account_bank = detail.account_bank;
              this.params.branch_bank = detail.branch_bank;
              this.params.emergency_call = detail.emergency_call;
              this.params.level = detail.level;
              this.params.account_name = detail.account_name;
              this.params.enroll = detail.enroll;
              this.params.salary = detail.salary;
              this.params.entry_materials = [];
              let mate = detail.entry_materials;
              if (mate && mate !== 'null' && mate.length > 0) {
                for (let i = 0; i < mate.length; i++) {
                  this.params.entry_materials.push(Number(mate[i]));
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
            }
            let departNameArray = [];
            this.params.department_id = [];
            if (res.data.data && res.data.data && res.data.data.org && res.data.data.org.length > 0) {
              res.data.data.org.forEach((item) => {
                this.params.department_id.push(item.id);
                departNameArray.push(item.name);
                this.duties(item.id);
              });
            }
            this.orgData.department_id = departNameArray.join(',');
            let postArr = res && res.data && res.data.data && res.data.data.role;
            this.postArray = [];
            this.positionArray = [];
            this.currentPosition = [];
            // this.params.position_id = [];
            // if (postArr && postArr.length > 0) {
            //   postArr.forEach((item) => {
            //     //职位
            //     let arr = {};
            //     arr.id = item.positions.id;
            //     arr.name = item.positions.name;
            //     if (this.currentPosition.indexOf(item.positions.id) < 0) {
            //       this.positionArray.push(arr);
            //       this.currentPosition.push(item.positions.id);
            //     }
            //     //岗位
            //     let data = {};
            //     data.id = item.position_id;
            //     data.name = item.display_name;
            //     if (this.params.position_id.indexOf(item.position_id) < 0) {
            //       this.postArray.push(data);
            //       this.params.position_id.push(item.position_id);
            //     }
            //   });
            //   this.postDisabled = false;
            //   this.positionDisabled = false;
            // }
            //列出该部门下的所有职位
            if (this.params.department_id.length > 0) {
              this.editPositionIds = [];
              // this.positionArray = [];
              // this.postArray = [];
              for (let i = 0; i < this.params.department_id.length; i++) {
                this.getPosition(this.params.department_id[i]);
              }
            }
          } else {
            this.prompt('warning', res.data.msg);
          }
        });
      },
      //获取职位
      getPosition(id) {
        this.$http.get(this.url + 'organization/duty?org_id=' + id).then((res) => {
          if (res.data.code === '20000') {
            res.data.data.data.forEach((item) => {
              let position = {};
              position.id = item.id;
              position.name = item.name;
              if (this.editPositionIds.indexOf(item.id) < 0 && this.currentPosition.indexOf(item.id) < 0) {
                this.positionArray.push(position);
                this.editPositionIds.push(item.id);
              }
            });
          }
        });
      },
      //获取岗位
      getPositions(id) {
        this.postArrayIds = [];
        this.$http.get(this.url + 'organization/position?duty_id=' + id).then((res) => {
          if (res.data.code === '20000') {
            res.data.data.data.forEach((item) => {
              let data = {};
              data.id = item.id;
              data.name = item.name;
              if (this.postArrayIds.indexOf(item.id) < 0 && this.params.position_id.indexOf(item.id) < 0) {
                this.postArray.push(data);
                this.postArrayIds.push(item.id); //用来判断数组里有没有重复的数据
              }
            });
          }
        });
      },
      sendPositive() {
        let content;
        if (this.detailData && this.detailData.send_info == 1) {
          content = '您想要发送转正祝贺吗?';
        } else if (this.detailData && this.detailData.send_info == 2) {
          content = '该员工已发过转正祝贺，您想要重新发送转正祝贺吗?';
        }
        this.$confirm(content, '确认信息', {
          confirmButtonText: '确认发送',
          cancelButtonText: '不发送',
          closeOnClickModal: false,
          type: 'warning',
        }).then(() => {
          this.$http.get(this.url + 'organization/staff/live-sms/' + this.editId + '&to_user=1').then((res) => {
            if (res.data.code === '710800') {
              this.prompt('success', res.data.msg);
              this.detailData.send_info = 2;
            } else {
              this.prompt('warning', res.data.msg);
            }
          });
        }).catch(() => {
        });
      },
      confirmAdd() {
        this.disabledBtn = true;
        if (this.isEdit) {
          //修改
          // console.log(this.params, "修改")
          // return false
          this.$http.put(this.url + 'organization/staff/' + this.editId, this.params).then((res) => {
            if (res.data.code === '71002') {
              // this.$emit('close', 'success');
              this.addStaffDialogVisible = false;
              // this.isClear = true;
              // this.initial();
              this.prompt('success', res.data.msg);
            } else {
              this.disabledBtn = false;
              this.prompt('warning', res.data.msg);
            }
          }).catch(err => {
            this.disabledBtn = false;
          });
        } else {
          //新增
          // console.log(this.params, "新增");
          // return false
          this.$http.post(this.url + 'organization/staff', this.params).then((res) => {
            if (res.data.code === '71002') {
              this.$emit('close', 'success');
              this.addStaffDialogVisible = false;
              this.prompt('success', res.data.msg);
              // this.isClear = true;
              // this.initial();

            } else {
              this.disabledBtn = false;
              this.prompt('warning', res.data.msg);
            }
          }).catch(err => {
            this.disabledBtn = false;
          });
        }
      },
      selectDepart() {
        this.organizationDialog = true;
        this.type = 'depart';
      },
      // 组织架构
      openOrgan(val, type) {
        this.organDivision = val;
        this.organizationDialog = true;
        this.organizeType = type;
        if (val === 'department_id') {
          this.params[val] = [];
          this.lengths = '';
        } else {
          this.lengths = 1;
        }
      },
      // 清空 部门
      emptyDepart(val) {
        this.params[val] = '';
        this.orgData[val] = '';
        this.orgData = Object.assign({}, this.orgData);
        if (val === 'department_id') {
          this.resetOrg();
        }
      },
      // 关闭组织架构
      closeOrgan() {
        this.organDivision = '';
        this.organizationDialog = false;
        this.organizeType = '';
        this.lengths = 0;
      },
      // 确认选择
      selectMember(val) {
        console.log(val, "11111")
        let organ = this.organDivision;
        if (organ === 'department_id') {
          this.resetOrg();
          let arr = [];
          this.params[organ] = [];
          this.duty = [];
          for (let item of val) {
            arr.push(item.name);
            this.duties(item.id);
            this.params[organ].push(item.id);
          }
          this.departName(arr, organ);
        } else {
          this.params[organ] = val[0].id;
          this.orgData[organ] = val[0].name;
        }
      },
      // 数组名称去重 拼接
      departName(arr, organ) {
        this.orgData[organ] = this.montage(arr);
      },
      // 职务
      duties(id) {
        this.$http.get(this.url + 'organization/duty?org_id=' + id).then(res => {
          if (res.data.code === '20000') {
            res.data.data.data.forEach(item => {
              this.duty.push(item);
            });
          } else {
            this.duty = [];
            this.prompt('warning', res.data.msg);
          }
        })
      },
      // 多职务
      positionSelect(val) {
        this.resetOrg('position');
        if (val.length > 0) {
          for (let item of val) {
            this.quarters(item);
          }
        }
      },
      // 岗位
      quarters(id) {
        this.$http.get(this.url + 'organization/position?duty_id=' + id).then(res => {
          if (res.data.code === '20000') {
            for (let item of res.data.data.data) {
              this.position.push(item);
            }
          } else {
            this.prompt('warning', res.data.msg);
          }
        })
      },
      // 重置职位 岗位
      resetOrg(val) {
        this.position = [];
        this.params.position_id = [];
        if (val === 'position') return;
        this.duty = [];
        this.params.duty_id = [];
      },
      //性别
      getSex() {
        this.dictionary(228).then((res) => {
          if (res.code === '30010') {
            this.sexCategory = res.data;
          }
        });
      },
      //生育状况
      getFertilityStatus() {
        this.$http.get(this.url + 'setting/dictionary/231').then((res) => {
          if (res.data.code === '30010') {
            this.fertilityStatusCategory = res.data.data;
          } else {
            this.fertilityStatusCategory = [];
          }
        });
      },
      //在职状态
      getOnJobStatus() {
        this.$http.get(this.url + 'setting/dictionary/559').then((res) => {
          if (res.data.code === '30010') {
            this.jobStatusCategory = res.data.data;
          } else {
            this.jobStatusCategory = [];
          }
        });
      },
      //账号状态
      getAccountStatus() {
        this.$http.get(this.url + 'setting/dictionary/40').then((res) => {
          if (res.data.code === '30010') {
            this.accountStatusCategory = res.data.data;
          } else {
            this.accountStatusCategory = [];
          }
        });
      },
      //入职材料
      getEntryMaterials() {
        this.$http.get(this.url + 'setting/dictionary/515').then((res) => {
          if (res.data.code === '30010') {
            this.entryMaterialsCategory = res.data.data;
          } else {
            this.entryMaterialsCategory = [];
          }
        });
      },
      //婚姻状况
      getMaritalStatus() {
        this.$http.get(this.url + 'setting/dictionary/33').then((res) => {
          if (res.data.code === '30010') {
            this.maritalStatusCategory = res.data.data;
          } else {
            this.maritalStatusCategory = [];
          }
        });
      },
      //政治面貌
      getPoliticalStatus() {
        this.$http.get(this.url + 'setting/dictionary/38').then((res) => {
          if (res.data.code === '30010') {
            this.politicalStatusCategoey = res.data.data;
          } else {
            this.politicalStatusCategoey = [];
          }
        });
      },
      //学历
      getEducation() {
        this.$http.get(this.url + 'setting/dictionary/39').then((res) => {
          if (res.data.code === '30010') {
            this.educationCategory = res.data.data;
          } else {
            this.educationCategory = [];
          }
        });
      },
      //等级
      getBranchBank() {
        this.$http.get(this.url + 'setting/dictionary/234').then((res) => {
          if (res.data.code === '30010') {
            this.branchBankCategory = res.data.data;
          } else {
            this.branchBankCategory = [];
          }
        });
      },
      //校验身份证号
      checkIDNumData() {
        this.$http.get(this.url + 'manager/staff/info?id_num=' + this.params.id_num).then((res) => {
          if (res.data.code === '10050') {
            let data = res && res.data && res.data.data;
            if (data.birthday && !this.params.birthday) {
              this.params.birthday = data.birthday;
            }
            if (data.origin_addr && !this.params.home_addr) {
              this.params.home_addr = data.origin_addr.result;
            }
          } else {
            this.prompt('warning', res.data.msg);
          }
        });
      },
      //校验银行卡号
      checkBankData() {
        this.$http.get(this.url + 'manager/staff/info?bank_num=' + this.params.bank_num).then((res) => {
          if (res.data.code === '10050') {
            let data = res && res.data && res.data.data;
            if (data.bankname && !this.params.account_bank) {
              this.params.account_bank = res.data.data && res.data.data.bankname;
            }
          } else {
            this.prompt('warning', res.data.msg);
          }
        });
      },

    }
  };
</script>
<style lang="scss">
  #addStaff {
    .addForm {
      max-height: 480px;
    }
    .el-message-box__wrapper .el-message-box .el-message-box__btns button.el-button.el-button--default.el-button--small:first-child {
      margin-right: 30px;
    }
  }

</style>
