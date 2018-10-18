<template>
  <div id="addTransfer">
    <el-dialog :close-on-click-modal="false" :title="assist !== 'new' ? '修改信息' : '新增员工'"
               :visible.sync="dialogVisible" width="40%">
      <div
        style="width: 90%;"
        v-loading="fullLoading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255, 255, 255, 0)">
      </div>
      <el-form :inline="true" size="mini" label-width="100px" v-if="!fullLoading">
        <div class="addForm">
          <div class='formList'>
            <el-form-item label="姓名">
              <el-input placeholder="姓名" v-model="orgData.name" disabled></el-input>
            </el-form-item>
          </div>
          <div class='formList'>
            <el-form-item label="入职时间">
              <el-date-picker
                v-model="orgData.entry_time"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="请选择日期"
                disabled>
              </el-date-picker>
            </el-form-item>
          </div>
          <div class='formList'>
            <el-form-item label="调岗类型" required>
              <el-select v-model="form.transfer_type" size="mini" placeholde="请选择" clearable>
                <el-option v-for="key in transfer_type" :label="key.name" :value="key.id"
                           :key="key.id"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class='formList'>
            <el-form-item label="调岗生效日期">
              <el-date-picker
                v-model="form.transfer_time"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="请选择日期"
                clearable>
              </el-date-picker>
            </el-form-item>
          </div>
          <div class='formList'>
            <el-form-item label="当前部门">
              <el-input placeholder="当前部门" v-model="orgData.org_id" disabled></el-input>
            </el-form-item>
          </div>
          <div class='formList'>
            <el-form-item label="调岗后部门" required>
              <el-input placeholder="请选择" @focus="openOrgan('new_org_id', 'depart')" v-model="orgData.new_org_id"
                        size="mini">
                <el-button slot="append" @click="emptyDepart('new_org_id')">清空</el-button>
              </el-input>
            </el-form-item>
          </div>
          <div class='formList'>
            <el-form-item label="当前职位">
              <el-input placeholder="当前职位" v-model="orgData.position_id" disabled></el-input>
            </el-form-item>
          </div>
          <div class='formList'>
            <el-form-item label="调岗后职位" required>
              <el-select v-model="form.transfer_type" size="mini" placeholde="请选择" clearable>
                <el-option v-for="key in transfer_type" :label="key.name" :value="key.id"
                           :key="key.id"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class='formList'>
            <el-form-item label="当前部门负责人">
              <el-input placeholder="当前部门负责人" v-model="orgData.old_leader_id" disabled></el-input>
            </el-form-item>
          </div>
          <div class='formList'>
            <el-form-item label="调岗后部门负责人">
              <el-input placeholder="调岗后部门负责人" v-model="orgData.leader_id" disabled></el-input>
            </el-form-item>
          </div>
          <div class='formList list3'>
            <el-form-item label="调岗描述">
              <el-input placeholder="请输入调岗描述" v-model="form.remark_transfer" clearable></el-input>
            </el-form-item>
          </div>
        </div>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取&nbsp;消</el-button>
        <el-button size="small" type="primary">新&nbsp;增</el-button>
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
    name: "add-transfer",
    props: ['module', 'detail', 'assist'],
    components: {Organization, UpLoad},
    data() {
      return {
        url: globalConfig.server,
        dialogVisible: false,
        fullLoading: false,

        organModule: false,
        organizeType: '',
        getStaffDetail: '',   //员工详情
        lengths: 0,
        organDivision: '',    //组织架构字段
        organIndex: '',       //组织架构 下标

        form: {},
        orgData: {},          //组织架构 文本显示
        transfer_type: [],
      }
    },
    created() {
      this.transfer_type = transfer_type;
    },
    mounted() {
    },
    activated() {
    },
    watch: {
      detail(val) {
        this.getStaffDetail = val;
        console.log(val);
        this.personalInfo(val);
      },
      // 模态框
      module(val) {
        this.fullLoading = false;
        this.dialogVisible = val;
      },
      dialogVisible(val) {
        if (!val) {
          this.closeModule();
        }
      },
    },
    computed: {},
    methods: {
      // 模态框关闭触发
      closeModule() {
        this.form = {};
        this.orgData = {};
        this.$emit('close', 'close');
      },
      // 获取
      personalInfo(val) {
        console.log(val);
        this.fullLoading = false;
      },
      // 确认提交
      transferInfo(val) {

      },
      // 处理数据
      handleData() {

      },
      // 修改
      reviseInfo() {
        this.$http.put(this.url + 'hrm/User/editDetail', this.form).then(res => {
          if (res.data.success) {
            this.$emit('close', 'success');
            this.prompt('success', res.data.msg);
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
        this.lengths = 1;
      },
      // 清空 部门
      emptyDepart(val) {
        this.form[val] = '';
        this.orgData[val] = '';
        this.orgData = Object.assign({}, this.orgData);
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
        this.form[organ] = val[0].id;
        this.orgData[organ] = val[0].name;
      },
    },
  }
</script>

<style lang="scss">
  #addTransfer {
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
        width: 48%;
      }
      .list3 {
        width: 96%;
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
        min-width: 120px;
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
  }
</style>
