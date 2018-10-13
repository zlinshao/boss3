<template>
  <div id="addStaff">
    <el-dialog :close-on-click-modal="false" title="新增员工" :visible.sync="dialogVisible" width="55%">
      <div
        style="width: 90%;"
        v-loading="fullLoading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255, 255, 255, 0)">
      </div>
      <el-form :inline="true" size="mini" label-width="100px">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane class="scroll_bar" label="基本信息" name="first">
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
                <el-form-item label="工号" required>
                  <el-input placeholder="请输入工号" v-model="form.job_number" clearable></el-input>
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
                               :label="item.name">{{item.name}}
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class='formList'>
                <el-form-item label="岗位" required>
                  <el-select v-model="form.position_id" clearable multiple>
                    <el-option v-for="item in position" :value="item.id" :key="item.id"
                               :label="item.name">{{item.name}}
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
              <div class='formList'>
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
              <div class='formList'>
                <el-form-item label="转正类型">
                  <el-select v-model="form.formal_status" clearable>
                    <el-option v-for="item in formal_status" :value="item.id" :key="item.id" :label="item.name">
                      {{item.name}}
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class='formList'>
                <el-form-item label="当前在职状态" required>
                  <el-select v-model="form.position_status" clearable>
                    <el-option v-for="item in position_status" :value="item.id" :key="item.id" :label="item.name">
                      {{item.name}}
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class='formList'>
                <el-form-item label="员工类型" required>
                  <el-select v-model="form.job_type" clearable>
                    <el-option v-for="item in job_type" :value="item.id" :key="item.id" :label="item.name">
                      {{item.name}}
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class='formList'>
                <el-form-item label="员工状态" required>
                  <el-select v-model="form.job_status" clearable>
                    <el-option v-for="item in job_status" :value="item.id" :key="item.id" :label="item.name">
                      {{item.name}}
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
                  <el-input placeholder="请选择" @focus="openOrgan('area','depart')" v-model="orgData.area"
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
                <el-form-item label="级别">
                  <el-select v-model="form.level" size="mini" placeholde="请选择" clearable>
                    <el-option v-for="key in level" :label="key.dictionary_name" :value="key.id"
                               :key="key.id"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class='formList'>
                <el-form-item label="入职途径">
                  <el-select v-model="form.entry_way" clearable>
                    <el-option v-for="item in entry_way" :value="item.id" :key="item.id" :label="item.name">
                      {{item.name}}
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class='formList list3' v-if="form.entry_way === 11">
                <el-form-item label="入职途径备注">
                  <el-input placeholder="请输入备注" v-model="form.entry_mess" clearable></el-input>
                </el-form-item>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane v-if="assist === 'second'" class="scroll_bar" label="辅助信息" name="second">
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
                    v-model="form2.agreement_first_end_time"
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
          <el-tab-pane label="奖惩记录" name="third">
            <div class="addRecord scroll_bar">
              <div class="moreRecord" v-for="(item,index) in form3">
                <div v-if="form3.length > 1" @click="remRecord(index)" class="closeIcon">
                  <i class="el-icon-close"></i>
                </div>
                <div v-else>&nbsp;</div>
                <div class="staffRecord">
                  <el-form-item label="部门" required>
                    <el-input placeholder="请选择" @focus="openOrgan('uid', 'staff')" v-model="orgData.uid"
                              size="mini">
                      <el-button slot="append" @click="emptyDepart('uid')">清空</el-button>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="奖惩类型" required>
                    <el-select v-model="form3.type" size="mini" placeholde="请选择" clearable>
                      <el-option v-for="key in typeCategory" :label="key.name" :value="key.id"
                                 :key="key.id"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="增加描述" required>
                    <el-input placeholder="请填写增加描述" type="textarea" v-model="form3.remark" clearable>
                    </el-input>
                  </el-form-item>
                </div>
                <el-form-item label="添加照片">
                  <UpLoad :ID="'images'" :isClear="isClear" @getImg="getImg" editImage="images"></UpLoad>
                </el-form-item>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="addRecord">新增记录</el-button>
        <el-button size="small" @click="dialogVisible = false">取&nbsp;消</el-button>
        <el-button size="small" type="primary" @click="setStaff">新&nbsp;增</el-button>
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
    props: ['module', 'assist'],
    components: {Organization, UpLoad},
    data() {
      return {
        url: globalConfig.server,
        dialogVisible: true,
        fullLoading: false,
        activeName: 'third',
        organModule: false,
        organizeType: '',
        lengths: 0,
        organDivision: '',
        // 奖惩记录
        form3: [{
          uid: '',
          type: '',
          remark: '',
        }],
        moreRecord: {
          uid: '',
          type: '',
          remark: '',
        },
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
        orgData: {},            //组织架构显示
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
        entry_way: [],          //入职途径
        typeCategory: [],       //奖惩记录
      }
    },
    created() {
      this.dict();
      this.initForm();
      this.position_status = position_status;
      this.formal_status = formal_status;
      this.job_type = job_type;
      this.job_status = job_status;
      this.entry_way = entry_way;
      this.typeCategory = typeCategory;
    },
    mounted() {
    },
    activated() {
    },
    watch: {
      'form.formal'(val) {//实际转正日期
        this.form.forward_time = val;
      },
      emergency_call: {// 紧急联系人
        handler(val, oldVal) {
          let phone = val.phone ? val.phone : '';
          let name = val.name ? val.name : '';
          if (!phone && !name) {
            this.form2.emergency_call = '';
            return;
          }
          this.form2.emergency_call = phone + '+' + name;
        },
        deep: true
      },
      // 模态框
      module(val) {
        this.dialogVisible = val;
      },
      dialogVisible(val) {
        if (!val) {
          this.activeName = 'first';
          this.isClear = true;
          this.form = {};
          this.orgData = {};      //部门显示
          this.resetOrg();        //职位 岗位
          this.form2 = {};        //辅助信息
          this.initForm();        //图片信息
          this.$emit('close', 'close');
          this.form3 = [];
          this.addRecord();
        } else {
          this.isClear = false;
        }
      },
    },
    computed: {},
    methods: {
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
      // tabs切换
      handleClick(tab, event) {

      },
      // 确认新增
      setStaff() {
        let url, forms, ask;
        switch (this.activeName) {
          case 'first':
            url = this.url + 'hrm/User/addDetail';
            forms = this.form;
            ask = this.$http.post;
            break;
          case 'second':
            url = this.url + 'hrm/User/addExtend';
            forms = this.form2;
            ask = this.$http.put;
            break;
          case 'third':
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
      // 增加多条奖惩记录
      addRecord() {
        this.form3.unshift(this.moreRecord);
      },
      // 删除奖惩记录
      remRecord(index) {
        this.form3.splice(index, 1);
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
        if (val[0] === 'images') {
          this.form3[val[0]] = val[1];
        } else {
          this.form2.image_info[val[0]] = val[1];
        }
        this.isUpload = val[2];
      },
      // 职务
      duties(id) {
        this.$http.get(this.url + 'manager/position?department_id=' + id).then(res => {
          if (res.data.code === '20000') {
            this.duty = res.data.data.data;
          } else {
            this.duty = [];
            this.prompt('warning', res.data.msg);
          }
        })
      },
      // 多职务
      positionSelect(val) {
        this.position = [];
        if (val.length > 0) {
          for (let item of val) {
            this.quarters(item);
          }
        }
      },
      // 岗位
      quarters(id) {
        this.$http.get(this.url + 'manager/positions?type=' + id).then(res => {
          if (res.data.code === '20000') {
            res.data.data.data.forEach(item => {
              this.position.push(item);
            })
          } else {
            this.prompt('warning', res.data.msg);
          }
        })
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
      // 清空
      emptyDepart(val) {
        this.form[val] = '';
        this.orgData[val] = '';
        this.orgData = Object.assign({}, this.orgData);
        if (val === 'org_id') {
          this.resetOrg();
        }
      },
      // 重置职位 岗位
      resetOrg() {
        this.duty = [];
        this.form.duty_id = [];
        this.position = [];
        this.form.position_id = [];
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
          for (let item of val) {
            this.duties(item.id);
            this.form[organ].push(item.id);
            this.orgData[organ] = item.name + ',' + item.name;
          }
        } else {
          this.form[organ] = val[0].id;
          this.orgData[organ] = val[0].name;
        }
      },
    },
  }
</script>

<style lang="scss">
  #addStaff {
    .addForm, .addRecord {
      max-height: 480px;
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
    .moreRecord + .moreRecord {
      margin-top: 18px;
    }
    .moreRecord {
      border: 1px solid #dfe6fb;
      padding: 0 20px 10px;
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
      .staffRecord {
        width: 66%;
      }
    }
  }
</style>
