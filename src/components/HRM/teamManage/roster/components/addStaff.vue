<template>
  <div id="rosterAddStaff">
    <el-dialog :close-on-click-modal="false" :title="assist !== 'new' ? '修改信息' : '新增员工'"
               :visible.sync="dialogVisible" width="55%">
      <div
        style="width: 90%;"
        v-loading="fullLoading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255, 255, 255, 0)">
      </div>
      <el-form :inline="true" size="mini" label-width="100px" v-if="!fullLoading">
        <el-tabs v-model="activeName">
          <el-tab-pane v-if="(assist === 'new' || assist === 'first') && this.assist !== 'record'" class="scroll_bar"
                       label="基本信息" name="first">
            <div class="addForm">
              <div class='formList'>
                <el-form-item label="姓名" required>
                  <el-input placeholder="请输入姓名" v-model="form.name" clearable></el-input>
                </el-form-item>
              </div>
              <div class='formList'>
                <el-form-item label="性别" required>
                  <el-radio v-for="key in gender" v-model="form.gender" :label="key.id" :key="key.id">
                    {{key.dictionary_name}}
                  </el-radio>
                </el-form-item>
              </div>
              <div class='formList'>
                <el-form-item label="手机号" required>
                  <el-input placeholder="请输入手机号" v-model="form.phone" clearable></el-input>
                </el-form-item>
              </div>
              <div class='formList'>
                <el-form-item label="档案编号" required>
                  <el-input placeholder="请输入档案编号" v-model="form.archive_number" clearable></el-input>
                </el-form-item>
              </div>
              <div class='formList'>
                <el-form-item label="出生日期">
                  <el-date-picker
                    v-model="form.birthday"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="请选择日期"
                    clearable>
                  </el-date-picker>
                </el-form-item>
              </div>
              <div class='formList'>
                <el-form-item label="生育状况">
                  <el-select v-model="form.fertility_status" size="mini" placeholde="请选择" clearable>
                    <el-option v-for="key in fertility_status" :label="key.dictionary_name" :value="key.id"
                               :key="key.id"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class='formList'>
                <el-form-item label="工号">
                  <el-input placeholder="员工工号" disabled v-model="form.job_number"></el-input>
                </el-form-item>
              </div>
              <div class='formList'>
                <el-form-item label="婚姻状况">
                  <el-select v-model="form.marital_status" size="mini" placeholde="请选择" clearable>
                    <el-option v-for="key in marital_status" :label="key.dictionary_name" :value="key.id"
                               :key="key.id"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class='formList'>
                <el-form-item label="身份证" required>
                  <el-input placeholder="请输入身份证" v-model="form.id_num" clearable></el-input>
                </el-form-item>
              </div>
              <div class='formList list2'>
                <el-form-item label="家庭住址" required>
                  <el-input placeholder="请输入家庭住址" v-model="form.home_addr" clearable></el-input>
                </el-form-item>
              </div>
              <div class='formList'>
                <el-form-item label="政治面貌">
                  <el-select v-model="form.political_status" size="mini" placeholde="请选择" clearable>
                    <el-option v-for="key in political_status" :label="key.dictionary_name" :value="key.id"
                               :key="key.id"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class='formList'>
                <el-form-item label="部门" required>
                  <el-input placeholder="请选择" @focus="openOrgan('org_id', 'depart')" v-model="orgData.org_id"
                            size="mini">
                    <el-button slot="append" @click="emptyDepart('org_id')">清空</el-button>
                  </el-input>
                </el-form-item>
              </div>
              <div class='formList'>
                <el-form-item label="职位" required>
                  <el-select v-model="form.duty_id" @change="positionSelect" clearable multiple>
                    <el-option v-for="item in duty" :value="item.id" :key="item.id"
                               :label="item.name">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class='formList'>
                <el-form-item label="岗位" required>
                  <el-select v-model="form.position_id" clearable multiple>
                    <el-option v-for="item in position" :value="item.id" :key="item.id"
                               :label="item.name">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class='formList'>
                <el-form-item label="推荐人">
                  <el-input placeholder="请选择" @focus="openOrgan('recommender','staff')" v-model="orgData.recommender"
                            size="mini">
                    <el-button slot="append" @click="emptyDepart('recommender')">清空</el-button>
                  </el-input>
                </el-form-item>
              </div>
              <div class='formList'>
                <el-form-item label="入职日期" required>
                  <el-date-picker
                    v-model="form.enroll"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="请选择日期"
                    clearable>
                  </el-date-picker>
                </el-form-item>
              </div>
              <div class='formList'>
                <el-form-item label="试用期(月)" required>
                  <el-input placeholder="请输入月数" v-model="form.try_out_time" clearable></el-input>
                </el-form-item>
              </div>
              <div class='formList'>
                <el-form-item label="预计转正日期">
                  <el-date-picker
                    v-model="form.expected_formal"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="请选择日期"
                    clearable>
                  </el-date-picker>
                </el-form-item>
              </div>
              <div class='formList' v-if="assist !== 'new'">
                <el-form-item label="实际转正日期">
                  <el-date-picker
                    v-model="form.formal"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="请选择日期"
                    clearable>
                  </el-date-picker>
                </el-form-item>
              </div>
              <div class='formList' v-if="assist !== 'new'">
                <el-form-item label="转正类型">
                  <el-select v-model="form.formal_status" clearable>
                    <el-option v-for="item in formal_status" :value="item.id" :key="item.id" :label="item.name">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class='formList'>
                <el-form-item label="当前在职状态" required>
                  <el-select v-model="form.position_status" clearable :disabled="assist === 'new'">
                    <el-option v-for="item in position_status" :value="item.id" :key="item.id" :label="item.name">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class='formList'>
                <el-form-item label="员工类型" required>
                  <el-select v-model="form.job_type" clearable>
                    <el-option v-for="item in job_type" :value="item.id" :key="item.id" :label="item.name">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class='formList'>
                <el-form-item label="员工状态" required>
                  <el-select v-model="form.job_status" clearable>
                    <el-option v-for="item in job_status" :value="item.id" :key="item.id" :label="item.name">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class='formList'>
                <el-form-item label="银行卡号" required>
                  <el-input placeholder="请输入银行卡号" v-model="form.bank_num" clearable></el-input>
                </el-form-item>
              </div>
              <div class='formList'>
                <el-form-item label="开户行" required>
                  <el-input placeholder="请输入银行卡号" v-model="form.account_bank" clearable></el-input>
                </el-form-item>
              </div>
              <div class='formList'>
                <el-form-item label="支行行号" required>
                  <el-input placeholder="请输入联行行号/支行行号" v-model="form.branch_bank_code" clearable></el-input>
                </el-form-item>
              </div>
              <div class='formList'>
                <el-form-item label="开户名" required>
                  <el-input placeholder="请输入开户名" v-model="form.account_name" clearable></el-input>
                </el-form-item>
              </div>
              <div class='formList'>
                <el-form-item label="支行">
                  <el-input placeholder="请输入支行" v-model="form.branch_bank" clearable></el-input>
                </el-form-item>
              </div>
              <div class='formList'>
                <el-form-item label="城市">
                  <el-select v-model="form.city" size="mini" placeholde="请选择" clearable>
                    <el-option v-for="key in city" :label="key.dictionary_name" :value="key.id"
                               :key="key.id"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class='formList'>
                <el-form-item label="区域">
                  <el-input placeholder="请选择" @focus="openOrgan('area','depart')" v-model="form.area"
                            size="mini">
                    <el-button slot="append" @click="emptyDepart('area')">清空</el-button>
                  </el-input>
                </el-form-item>
              </div>
              <div class='formList'>
                <el-form-item label="学历">
                  <el-select v-model="form.education" size="mini" placeholde="请选择" clearable>
                    <el-option v-for="key in education" :label="key.dictionary_name" :value="key.id"
                               :key="key.id"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class='formList'>
                <el-form-item label="个人邮箱">
                  <el-input placeholder="请输入个人邮箱" v-model="form.email" clearable></el-input>
                </el-form-item>
              </div>
              <div class='formList'>
                <el-form-item label="薪资" required>
                  <el-input placeholder="请输入薪资" v-model="form.salary" clearable></el-input>
                </el-form-item>
              </div>
              <div class='formList'>
                <el-form-item label="级别" required>
                  <el-select v-model="form.level" size="mini" placeholde="请选择" clearable>
                    <el-option v-for="key in level" :label="key.dictionary_name" :value="key.id"
                               :key="key.id"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class='formList'>
                <el-form-item label="入职途径">
                  <el-select v-model="entry_way.entry_type" clearable>
                    <el-option v-for="item in entry_ways" :value="item.id" :key="item.id" :label="item.name">
                      {{item.name}}
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class='formList list3' v-if="entry_way.entry_type === 11">
                <el-form-item label="入职途径备注">
                  <el-input placeholder="请输入备注" v-model="entry_way.entry_mess" clearable></el-input>
                </el-form-item>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane v-if="assist === 'second' && this.assist !== 'record'" class="scroll_bar" label="辅助信息"
                       name="second">
            <div class="supplementary">
              <div class="formList">
                <el-form-item label="籍贯">
                  <el-input placeholder="请输入籍贯" v-model="form2.origin_addr" clearable></el-input>
                </el-form-item>
              </div>
              <div class="formList">
                <el-form-item label="紧急联系电话" required>
                  <el-input placeholder="请输入手机号" v-model="emergency_call.phone" clearable></el-input>
                </el-form-item>
              </div>
              <div class="formList">
                <el-form-item label="与该员工关系" required>
                  <el-input placeholder="请输入姓名" v-model="emergency_call.name" clearable></el-input>
                </el-form-item>
              </div>
              <div class="formList">
                <el-form-item label="毕业学校">
                  <el-input placeholder="请输入毕业学校" v-model="form2.school" clearable></el-input>
                </el-form-item>
              </div>
              <div class="formList">
                <el-form-item label="所学专业">
                  <el-input placeholder="请输入专业" v-model="form2.major" clearable></el-input>
                </el-form-item>
              </div>
              <div class="formList">
                <el-form-item label="毕业时间">
                  <el-date-picker
                    v-model="form2.graduation_time"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="请选择日期"
                    clearable>
                  </el-date-picker>
                </el-form-item>
              </div>
              <div class="formList">
                <el-form-item label="第一次签合同时间">
                  <el-date-picker
                    v-model="form2.agreement_first_time"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="请选择日期"
                    clearable>
                  </el-date-picker>
                </el-form-item>
              </div>
              <div class="formList">
                <el-form-item label="第一次合同到期时间">
                  <el-date-picker
                    v-model="form2.agreement_first_end_time"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="请选择日期"
                    clearable>
                  </el-date-picker>
                </el-form-item>
              </div>
              <div class="formList">
                <el-form-item label="第二次签合同时间">
                  <el-date-picker
                    v-model="form2.agreement_second_time"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="请选择日期"
                    clearable>
                  </el-date-picker>
                </el-form-item>
              </div>
              <div class="formList list3">
                <el-form-item :label="item.formTitle" v-for="(item, index) in ImgInfo" :key="index">
                  <UpLoad :ID="item.formKey" :isClear="isClear" @getImg="getImg"
                          :editImage="image_info[item.formKey]"></UpLoad>
                </el-form-item>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="奖惩记录" v-if="assist !== 'new'" name="third">
            <div class="addRecord scroll_bar">
              <!--class="moreRecord"-->
              <div v-for="(item,index) in form3">
                <!--<div v-if="form3.length > 1" @click="remRecord(index)" class="closeIcon">-->
                <!--<i class="el-icon-close"></i>-->
                <!--</div>-->
                <!--<div v-else>&nbsp;</div>-->
                <div class="staffRecord">
                  <div class="addMoreRecord">
                    <el-form-item label="部门" required class="width66">
                      <!--<el-input placeholder="请选择" @focus="openUid('uid', 'staff', index)" v-model="form3[index].name"-->
                      <!--size="mini">-->
                      <!--<el-button slot="append" @click="emptyUid('uid', index)">清空</el-button>-->
                      <!--</el-input>-->
                      <el-input v-model="recordName" disabled size="mini">
                      </el-input>
                    </el-form-item>
                    <!--<el-button class="addBtnRecord" size="mini" type="success" @click="addBtnRecord(index)">增加类型-->
                    <!--</el-button>-->
                  </div>
                  <!--class="moreRecord multiterm"-->
                  <div v-for="(res,idx) in item.remarks">
                    <!--<div v-if="item.remarks.length > 1" @click="remBtnRecord(index, idx)" class="closeIcon">-->
                    <!--<i class="el-icon-close"></i>-->
                    <!--</div>-->
                    <!--<div v-else>&nbsp;</div>-->
                    <el-form-item label="奖惩类型" required class="width66">
                      <el-select v-model="res.type" size="mini" placeholde="请选择" clearable>
                        <el-option v-for="key in typeCategory" :label="key.name" :value="key.id"
                                   :key="key.id"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="增加描述" required class="width66">
                      <el-input placeholder="请填写增加描述" type="textarea" v-model="res.remark" clearable>
                      </el-input>
                    </el-form-item>
                    <el-form-item label="添加照片">
                      <!--`${index}_${idx}_images`-->
                      <UpLoad :ID="'images'" :isClear="isClear" @getImg="getImg"></UpLoad>
                    </el-form-item>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取&nbsp;消</el-button>

        <el-button size="small" type="primary" @click="setStaff(assist)"
                   v-if="assist === 'new' && activeName !== 'third'">新&nbsp;增
        </el-button>

        <el-button size="small" type="primary" @click="reviseStaff" v-if="assist === 'first' && activeName !== 'third'">
          更&nbsp;新
        </el-button>

        <el-button size="small" type="primary" @click="setStaff(assist)"
                   v-if="assist === 'second' && activeName !== 'third'">更&nbsp;新
        </el-button>

        <el-button size="small" type="primary" @click="setStaff('third')"
                   v-if="activeName === 'third' || assist === 'record'">新&nbsp;增
        </el-button>
      </div>
    </el-dialog>

    <Organization :organizationDialog="organModule" :type="organizeType" :length="lengths"
                  @close="closeOrgan" @selectMember="selectMember"></Organization>
  </div>
</template>

<script>
  import Organization from '../../../../common/organization.vue';     //组织架构
  import UpLoad from '../../../../common/UPLOAD.vue'                  //图片上传

  export default {
    name: "add-staff",
    props: ['module', 'assist', 'detail'],
    components: {Organization, UpLoad},
    data() {
      return {
        url: globalConfig.server,
        dialogVisible: false,
        fullLoading: false,
        activeName: 'first',
        organModule: false,
        organizeType: '',
        getStaffDetail: '', //员工详情
        lengths: 0,
        organDivision: '',  //组织架构字段
        organIndex: '',     //组织架构 下标
        // 奖惩记录
        form3: [{
          uid: '',
          name: '',
          remarks: [{
            type: '',
            remark: '',
            images: '',
          }]
        }],
        recordName:'',
        //辅助信息
        form2: {},
        emergency_call: {},     //紧急联系
        ImgInfo: [],            //图片组件
        image_info: {
          resume: {},           //面试表
          education: {},        //学历复印件
          resignation: {},      //上家公司离职证明
          doc_photo: {},        //证件照
          con_agree: {},        //保密协议
          labor_contract: {},   //劳动合同
          commitment: {},       //承诺书
        },
        isClear: false,
        isUpload: false,
        // 基本信息
        form: {},
        orgData: {},            //组织架构 文本显示
        entry_way: {
          entry_type: '',       //入职途径
          entry_mess: '',
        },
        gender: [],             //性别
        marital_status: [],     //婚姻状况
        fertility_status: [],   //生育状况
        political_status: [],   //政治面貌
        duty: [],               //职务
        position: [],           //岗位
        city: [],               //城市
        education: [],          //学历
        level: [],              //级别

        position_status: [],    //当前在职状态
        formal_status: [],      //转正类型
        job_type: [],           //员工类型
        job_status: [],         //员工状态
        entry_ways: [],          //入职途径
        typeCategory: [],       //奖惩记录
      }
    },
    created() {
      this.dict();
      this.initForm();
      this.position_status = position_status;
      this.form.position_status = 3;
      this.formal_status = formal_status;
      this.job_type = job_type;
      this.job_status = job_status;
      this.entry_ways = entry_ways;
      this.typeCategory = typeCategory;
    },
    mounted() {
    },
    activated() {
    },
    watch: {
      detail(val) {
        this.getStaffDetail = val;
        switch (this.assist) {
          case 'first':
            this.personalInfo(val);
            break;
          case 'second':
            this.personalAssist(val);
            break;
          case 'record':
            this.personalRecord(val);
            break;
        }
      },
      'form.formal'(val) {  //实际转正日期
        this.form.forward_time = val;
      },
      // 模态框
      module(val) {
        if (this.assist !== 'new') {
          this.activeName = this.assist;
          if (this.assist === 'record') {
            this.activeName = 'third';
            this.fullLoading = false;
          } else {
            this.fullLoading = true;
          }
        } else {
          this.activeName = 'first';
          this.fullLoading = false;
        }
        this.dialogVisible = val;
      },
      dialogVisible(val) {
        if (!val) {
          this.closeModule();
        } else {
          this.isClear = false;
        }
      },
    },
    computed: {},
    methods: {
      // 模态框关闭触发
      closeModule() {
        this.isClear = true;
        this.form = {};
        this.form.position_status = 3;
        this.orgData = {};      //部门显示
        this.entry_way = {      //入职途径
          entry_type: '',
          entry_mess: '',
        };
        this.resetOrg();        //职位 岗位
        this.form2 = {};        //辅助信息
        this.initForm();        //图片信息
        this.$emit('close', 'close');
        this.form3 = [];
        this.addRecord();
        this.recordName = '';
      },
      // 字典
      dict() {
        this.dictionary(228, 1).then(res => {// 性别
          this.gender = res.data;
        });
        this.dictionary(231, 1).then(res => {// 生育状况
          this.fertility_status = res.data;
        });
        this.dictionary(33, 1).then(res => {// 婚姻状况
          this.marital_status = res.data;
        });
        this.dictionary(38, 1).then(res => {// 政治面貌
          this.political_status = res.data;
        });
        this.dictionary(306, 1).then(res => {// 城市
          this.city = res.data;
        });
        this.dictionary(39, 1).then(res => {// 城市
          this.education = res.data;
        });
        this.dictionary(234, 1).then(res => {// 级别
          this.level = res.data;
        });
      },
      // 获取个人信息
      personalInfo(val) {
        this.form = JSON.parse(JSON.stringify(rosterAddStaff));
        let keys = Object.keys(this.form);
        for (let key of keys) {
          switch (key) {
            case 'entry_way':         //入职方式
              if (val.entry_way && val.entry_way !== 'null') {
                this.entry_way = JSON.parse(val.entry_way);
              } else {
                this.entry_way = {};
              }
              break;
            case 'city':              //城市
              this.form.city = Number(val.city);
              break;
            case 'duty_id':           //职务
              val.org_id.forEach(res => {
                this.duties(res, 'duty_id');
              });
              break;
            case 'position_id':       //岗位
              if (val.duty_id) {
                this.positionSelect(val.duty_id, 'position_id');
              } else {
                this.resetOrg('position');
              }
              break;
            case 'org_id':            //部门
              let organ = JSON.parse(val.organizationInfo);
              let arr = [];
              organ.forEach(res => {
                arr.push(res.name);
              });
              this.departName(arr, key);
              break;
            case 'recommender':        //推荐人
              if (val.recommender && val.recommender !== 'null') {
                this.$http.get(this.url + 'hrm/User/getName?id=' + val.recommender).then(res => {
                  this.orgData[key] = res.data.name;
                });
              }
              break;
            case 'user_id':
              this.form.id = val.user_id;
              this.form3.id = val.user_id;
              break;
            default:
              if (val[key] && val[key] !== 'null') {
                this.form[key] = val[key];
              } else {
                this.form[key] = '';
              }
          }
        }
        this.fullLoading = false;
      },
      // 获取辅助信息
      personalAssist(val) {
        this.form2 = JSON.parse(JSON.stringify(rosterAddAssist));
        this.initForm();
        let keys = Object.keys(this.form2);
        for (let key of keys) {
          switch (key) {
            case 'emergency_call':
              if (val.emergency_call) {
                let c = val.emergency_call.split('+');
                this.emergency_call.phone = c[0];
                this.emergency_call.name = c[1];
              }
              break;
            case 'image_info':
              if (val.image_info) {
                let items = Object.keys(this.image_info);
                for (let item of items) {
                  for (let res of val.image_info[item]) {
                    this.image_info[item][res.id] = res.uri;
                    this.form2.image_info[item].push(res.id);
                  }
                }
              }
              break;
            default:
              this.form2[key] = val[key];
              break;
          }
        }
        this.form2.id = val.user_id;
        this.form3.id = val.user_id;
        this.fullLoading = false;
      },
      // 获取奖惩记录部门
      personalRecord(val) {
        let organ = JSON.parse(val.organizationInfo);
        this.form3[0].uid = val.user_id;
        this.form3[0].name = val.name;
        this.recordName = organ[0].name;
      },
      // 确认新增
      setStaff(val) {
        let url, forms, ask;
        switch (val) {
          case 'new':
            url = this.url + 'hrm/User/addDetail';
            this.form.entry_way = JSON.stringify(this.entry_way);
            forms = this.form;
            ask = this.$http.post;
            break;
          case 'second':
            this.handleData();
            url = this.url + 'hrm/User/addExtend';
            forms = this.form2;
            ask = this.$http.put;
            break;
          case 'third':
            url = this.url + 'hrm/staffRecords/addemployee';
            forms = this.form3;
            ask = this.$http.post;
            break;
        }
        ask(url, forms).then(res => {
          if (res.data.success) {
            this.$emit('close', 'success');
            this.prompt('success', res.data.msg);
          } else {
            this.prompt('warning', res.data.msg);
          }
        })
      },
      // 处理数据
      handleData() {
        let items = Object.keys(this.image_info);
        for (let item of items) {
          this.form2.image_info[item] = JSON.stringify(this.form2.image_info[item]);
        }
        let phone = this.emergency_call.phone ? this.emergency_call.phone : '';
        let name = this.emergency_call.name ? this.emergency_call.name : '';
        if (!phone && !name) {
          this.form2.emergency_call = '';
          return;
        }
        this.form2.emergency_call = phone + '+' + name;
      },
      // 修改个人信息
      reviseStaff() {
        this.$http.put(this.url + 'hrm/User/editDetail', this.form).then(res => {
          if (res.data.success) {
            this.$emit('close', 'success');
            this.prompt('success', res.data.msg);
          } else {
            this.prompt('warning', res.data.msg);
          }
        })
      },
      // 初始化form
      initForm() {
        this.emergency_call = {};
        this.form2.emergency_call = '';
        this.form2.image_info = {};
        this.ImgInfo = rosterImgInfo;
        for (let item of this.ImgInfo) {
          this.form2.image_info[item.formKey] = [];
          this.image_info[item.formKey] = {};
        }
      },
      // 上传图片
      getImg(val) {
        let img = [];
        for (let key of val[1]) {
          img.push(Number(key));
        }
        if (val[0].indexOf('images') > -1) {
          // let ID = val[0] && val[0].split('_');
          // let key = ID[0];
          // let index = ID[1];
          // this.form3[key].remarks[index].images = val[1];
          this.form3[0].remarks[0][val[0]] = img;
        } else {
          this.form2.image_info[val[0]] = img;
        }
        this.isUpload = val[2];
      },
      // 职务
      duties(id, type) {
        this.$http.get(this.url + 'manager/position?department_id=' + id).then(res => {
          if (res.data.code === '20000') {
            res.data.data.data.forEach(item => {
              this.duty.push(item);
            });
            if (type === 'duty_id') {
              if (this.getStaffDetail[type] && this.getStaffDetail[type] !== 'null') {
                this.form[type] = this.getStaffDetail[type];
              } else {
                this.form[type] = [];
              }
            } else {
              this.resetOrg('position');
            }
          } else {
            this.duty = [];
            this.prompt('warning', res.data.msg);
          }
        })
      },
      // 多职务
      positionSelect(val, type) {
        this.resetOrg('position');
        if (val.length > 0) {
          for (let item of val) {
            this.quarters(item, type);
          }
        } else {

        }
      },
      // 岗位
      quarters(id, type) {
        this.$http.get(this.url + 'manager/positions?type=' + id).then(res => {
          if (res.data.code === '20000') {
            res.data.data.data.forEach(item => {
              this.position.push(item);
            });
            if (type === 'position_id') {
              this.form[type] = this.getStaffDetail[type];
            }
          } else {
            this.prompt('warning', res.data.msg);
          }
        })
      },
      // 多条记录 选择员工
      openUid(val, type, index) {
        this.organIndex = index;
        this.openOrgan(val, type)
      },
      // 多条记录 清空员工
      emptyUid(val, index) {
        this.form3[index].uid = '';
        this.form3[index].name = '';
      },
      // 组织架构
      openOrgan(val, type) {
        this.organDivision = val;
        this.organModule = true;
        this.organizeType = type;
        if (val === 'org_id') {
          this.form[val] = [];
          this.lengths = '';
        } else {
          this.lengths = 1;
        }
      },
      // 清空 部门
      emptyDepart(val) {
        this.form[val] = '';
        this.orgData[val] = '';
        this.orgData = Object.assign({}, this.orgData);
        if (val === 'org_id') {
          this.resetOrg();
        }
      },
      // 重置职位 岗位
      resetOrg(val) {
        this.position = [];
        this.form.position_id = [];
        if (val === 'position') return;
        this.duty = [];
        this.form.duty_id = [];
      },
      // 关闭组织架构
      closeOrgan() {
        this.organDivision = '';
        this.organModule = false;
        this.organizeType = '';
        this.lengths = 0;
      },
      // 确认选择
      selectMember(val) {
        let organ = this.organDivision;
        if (organ === 'org_id') {
          let arr = [];
          this.form[organ] = [];
          for (let item of val) {
            arr.push(item.name);
            this.duties(item.id);
            this.form[organ].push(item.id);
          }
          this.departName(arr, organ);
        } else if (organ === 'uid') {
          let idx = this.organIndex;
          this.form3[idx].uid = val[0].id;
          this.form3[idx].name = val[0].name;
        } else if (organ === 'area') {
          this.form[organ] = val[0].name;
        } else {
          this.form[organ] = val[0].id;
          this.orgData[organ] = val[0].name;
        }
      },
      // 部门名称去重
      departName(arr, organ) {
        let str = '';
        arr = Array.from(new Set(arr));
        for (let key of arr) {
          str = key + ',' + str;
        }
        this.orgData[organ] = (str.substring(str.length - 1) === ',') ? str.substring(0, str.length - 1) : str;
      },
      // 增加多条奖惩记录
      addRecord() {
        let data = {
          uid: '',
          name: '',
          remarks: [{
            type: '',
            remark: '',
            images: '',
          }],
        };
        this.form3.push(data);
      },
      // 删除奖惩记录
      remRecord(index) {
        this.form3.splice(index, 1);
      },
      // 增加奖惩类型
      addBtnRecord(index) {
        let data = {
          type: '',
          remark: '',
          images: '',
        };
        this.form3[index].remarks.push(data);
      },
      // 删除奖惩类型
      remBtnRecord(index, idx) {
        this.form3[index].remarks.splice(idx, 1);
      },
    },
  }
</script>

<style lang="scss">
  #rosterAddStaff {
    .addForm, .addRecord {
      max-height: 480px;
      .width66 {
        width: 66%;
      }
    }
    .addForm, .supplementary {
      display: flex;
      display: -webkit-flex;
      flex-wrap: wrap;
      align-items: center;
      .formList {
        width: 33%;
      }
      .list2 {
        width: 66%;
      }
      .list3 {
        width: 99%;
      }
    }
    .el-form-item__content {
      label {
        display: flex;
        display: -webkit-flex;
        align-items: center;
      }
    }
    .addForm {
      label {
        min-width: 100px;
      }
    }
    .supplementary {
      label {
        min-width: 140px;
      }
    }
    .el-form-item, .el-form-item__content {
      width: 100%;
      display: flex;
      display: -webkit-flex;
      .el-radio {
        min-width: 40px;
      }
    }
    .addMoreRecord {
      display: flex;
      display: -webkit-flex;
      .addBtnRecord {
        height: 28px;
      }
    }
    .moreRecord + .moreRecord {
      margin-top: 18px;
    }
    .moreRecord {
      border: 1px solid #c5cce1;
      padding: 0 20px 20px;
      -webkit-border-radius: 6px;
      -moz-border-radius: 6px;
      border-radius: 6px;
      .closeIcon {
        text-align: right;
        padding: 10px 0;
        i {
          cursor: pointer;
          font-size: 18px;
        }
      }
    }
    .multiterm {
      border-color: #dfe6fb;
    }
  }
</style>
