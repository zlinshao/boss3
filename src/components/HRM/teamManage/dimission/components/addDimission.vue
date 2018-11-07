<template>
  <div id="addDimission">
    <el-dialog :close-on-click-modal="false" title="离职"
               :visible.sync="dialogVisible" width="55%">
      <div
        style="width: 90%;"
        v-loading="fullLoading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255, 255, 255, 0)">
      </div>
      <el-form :inline="true" size="mini" label-width="100px" v-if="!fullLoading" class="scroll_bar">
        <div class="addForm">
          <div class='formList'>
            <el-form-item label="姓名">
              <div class="showTitles">{{orgData.name}}</div>
            </el-form-item>
          </div>
          <div class='formList'>
            <el-form-item label="部门">
              <div class="showTitles">{{orgData.org_id}}</div>
            </el-form-item>
          </div>
          <div class='formList'>
            <el-form-item label="职位">
              <div class="showTitles">{{orgData.duty_id}}</div>
            </el-form-item>
          </div>
          <div class='formList'>
            <el-form-item label="当前岗位">
              <div class="showTitles">{{orgData.position_id}}</div>
            </el-form-item>
          </div>
          <div class='formList'>
            <el-form-item label="档案编号">
              <div class="showTitles">{{orgData.archive_number}}</div>
            </el-form-item>
          </div>
          <div class='formList'>
            <el-form-item label="身份证">
              <div class="showTitles">{{orgData.id_num}}</div>
            </el-form-item>
          </div>
          <div class='formList'>
            <el-form-item label="手机号">
              <div class="showTitles">{{orgData.phone}}</div>
            </el-form-item>
          </div>
          <div class='formList'>
            <el-form-item label="入职日期">
              <div class="showTitles">{{orgData.enroll}}</div>
            </el-form-item>
          </div>
          <div class='formList'>
            <el-form-item label="转正日期">
              <div class="showTitles">{{orgData.forward_time}}</div>
            </el-form-item>
          </div>
          <div class='formList'>
            <el-form-item label="离职日期" required>
              <el-date-picker
                v-model="form.dismiss_date"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="请选择日期"
                clearable>
              </el-date-picker>
            </el-form-item>
          </div>
          <div class='formList'>
            <el-form-item label="离职类型" required>
              <el-select v-model="form.resignation_type" size="mini" placeholde="请选择" clearable>
                <el-option v-for="key in resignation_type" :label="key.name" :value="key.id"
                           :key="key.id"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class='formList list3'>
            <el-form-item label="离职原因">
              <el-input placeholder="请输入离职原因" v-model="dismiss_reason.dismiss_mess" clearable></el-input>
            </el-form-item>
          </div>
        </div>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取&nbsp;消</el-button>
        <el-button size="small" type="primary" @click="addDismssion">新&nbsp;增</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "add-transfer",
    props: ['module', 'detail'],
    components: {},
    data() {
      return {
        url: globalConfig.server,
        dialogVisible: false,
        fullLoading: true,
        dismiss_reason: {
          dismiss_mess: '',
          dismiss_type: '',
        },
        getStaffDetail: {},
        form: {},
        orgData: {},            //组织架构 文本显示
        resignation_type: [],   //离职类型
        duty: [],
        new_duty: [],
        position: [],
        new_position: [],
      }
    },
    created() {
      this.resignation_type = resignation_type;
    },
    mounted() {
    },
    activated() {
    },
    watch: {
      detail(val) {
        this.fullLoading = true;
        this.getStaffDetail = val;
        this.personalInfo(val);
      },
      // 模态框
      module(val) {
        this.fullLoading = true;
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
        let data = {
          user_id: '',
          name: '',
          org_id: '',
          duty_id: '',
          position_id: '',
          archive_number: '',
          id_num: '',
          phone: '',
          enroll: '',
          forward_time: '',
          dismiss_date: '',
        };
        let keys = Object.keys(data);
        for (let key of keys) {
          switch (key) {
            case 'org_id':            //部门
              let organ = JSON.parse(val.organizationInfo);
              let org_id = [];
              organ.forEach(res => {
                org_id.push(res.name);
              });
              this.departName(org_id, key);
              break;
            case 'duty_id':           //职务
              if (val.dutyInfo) {
                let dutyInfo = [];
                for (let item of val.dutyInfo) {
                  dutyInfo.push(item.duty_name);
                }
                this.departName(dutyInfo, key);
              }
              break;
            case 'position_id':       //岗位
              if (val.duty_id) {
                let pos = [];
                for (let item of val.positionInfo) {
                  pos.push(item.position_name);
                }
                this.departName(pos, key);
              }
              break;
            case 'user_id':
              this.form[key] = val[key];
              break;
            default:
              if (val[key] && val[key] !== 'null') {
                this.orgData[key] = val[key];
              } else {
                this.orgData[key] = '';
              }
              break;
          }
        }
        this.fullLoading = false;
      },
      // 确认提交
      addDismssion() {
        this.handleData();
        this.$http.post(this.url + 'hrm/User/dismissEdit', this.form).then(res => {
          if (res.data.success) {
            this.$emit('close', 'success');
            this.prompt('success', res.data.msg);
            this.changeEnable(this.getStaffDetail.user_id);
          } else {
            this.prompt('warning', res.data.msg);
          }
        })
      },
      // 禁用
      changeEnable(id) {
        this.$http.get(this.url + 'hrm/User/changeAccountStatus?user_id=' + id).then(res => {
          if (res.data.code !== '90010') {
            this.prompt('warning', res.data.msg);
          }
        })
      },
      // 处理数据
      handleData() {
        for (let item of this.resignation_type) {
          if (item.id === this.form.resignation_type) {
            this.dismiss_reason.dismiss_type = item.name;
          }
        }
        this.form.dismiss_reason = JSON.stringify(this.dismiss_reason);
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
      // 数组名称去重 拼接
      departName(arr, organ) {
        this.orgData[organ] = this.montage(arr);
      },
    },
  }
</script>

<style lang="scss">
  #addDimission {
    .addForm {
      max-height: 480px;
      .width66 {
        width: 66%;
      }
    }
    .addForm {
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
      label {
        min-width: 120px;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        justify-content: flex-end;
      }
      .showTitles {
        width: 100%;
        background-color: #F5F7FA;
        padding: 3px 12px;
        border-radius: 6px;
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
