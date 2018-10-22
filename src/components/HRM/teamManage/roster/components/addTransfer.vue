<template>
  <div id="addTransfer">
    <el-dialog :close-on-click-modal="false" title="新增调岗" :visible.sync="dialogVisible" width="40%">
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
            <el-form-item label="入职时间">
              <div class="showTitles">{{orgData.enroll}}</div>
            </el-form-item>
          </div>
          <div class='formList'>
            <el-form-item label="调岗类型" required>
              <el-select v-model="form.transfer_type" size="mini" placeholde="请选择" clearable>
                <el-option v-for="key in transfer_type" :label="key.name" :value="key.id" :key="key.id"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class='formList'>
            <el-form-item label="调岗生效日期" required>
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
              <div class="showTitles">{{orgData.org_id}}</div>
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
            <el-form-item label="当前职务">
              <div class="showTitles">{{orgData.duty_id}}</div>
            </el-form-item>
          </div>
          <div class='formList'>
            <el-form-item label="调岗后职务" required>
              <el-select v-model="form.new_duty_id" @change="positionSelect" clearable multiple
                         :disabled="new_duty.length < 1">
                <el-option v-for="(item,index) in new_duty" :value="item.id" :key="index" :label="item.name">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class='formList'>
            <el-form-item label="当前职位">
              <div class="showTitles">{{orgData.position_id}}</div>
            </el-form-item>
          </div>
          <div class='formList'>
            <el-form-item label="调岗后职位" required>
              <el-select v-model="form.new_position_id" clearable multiple :disabled="new_position.length < 1">
                <el-option v-for="(item,index) in new_position" :value="item.id" :key="index" :label="item.name">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class='formList'>
            <el-form-item label="当前部门负责人">
              <div class="showTitles">{{orgData.old_leader_id}}</div>
            </el-form-item>
          </div>
          <div class='formList'>
            <el-form-item label="调岗后部门负责人">
              <div class="showTitles">{{orgData.leader_id}}</div>
            </el-form-item>
          </div>
          <div class='formList list3'>8
            <el-form-item label="调岗描述">
              <el-input placeholder="请输入调岗描述" v-model="form.remark_transfer" clearable></el-input>
            </el-form-item>
          </div>
        </div>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取&nbsp;消</el-button>
        <el-button size="small" type="primary" @click="addTransfer">新&nbsp;增</el-button>
      </div>
    </el-dialog>

    <Organization :organizationDialog="organModule" :type="organizeType" :length="lengths"
                  @close="closeOrgan" @selectMember="selectMember"></Organization>
  </div>
</template>

<script>
  import Organization from '../../../../common/organization.vue';     //组织架构

  export default {
    name: "add-transfer",
    props: ['module', 'detail'],
    components: {Organization},
    data() {
      return {
        url: globalConfig.server,
        dialogVisible: false,
        fullLoading: true,

        organModule: false,
        organizeType: '',
        getStaffDetail: '',   //员工详情
        lengths: 0,
        organDivision: '',    //组织架构字段
        organIndex: '',       //组织架构 下标

        form: {},
        orgData: {},          //组织架构 文本显示
        transfer_type: [],
        duty: [],
        new_duty: [],
        position: [],
        new_position: [],
      }
    },
    created() {
      this.transfer_type = transfer_type;
      this.form = JSON.parse(JSON.stringify(rosterTransfer));
    },
    mounted() {
    },
    activated() {
    },
    watch: {
      detail(val) {
        this.fullLoading = true;
        this.getStaffDetail = val;
        if (this.module) {
          this.personalInfo(val);
        }
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
      addTransfer() {
        this.$http.post(this.url + 'hrm/User/transferAdd', this.form).then(res => {
          if (res.data.success) {
            this.$emit('close', 'success');
            this.prompt('success', res.data.msg);
          } else {
            this.prompt('warning', res.data.msg);
          }
        });
      },
      // 模态框关闭触发
      closeModule() {
        this.form = JSON.parse(JSON.stringify(rosterTransfer));
        this.orgData = {};
        this.$emit('close', 'close');
      },
      // 获取
      personalInfo(val) {
        let data = {
          id: '',
          name: '',
          enroll: '',
          org_id: '',
          position_id: '',
          duty_id: '',
        };
        let keys = Object.keys(data);
        for (let key of keys) {
          switch (key) {
            case 'name':
            case 'enroll':
              this.orgData[key] = val[key];
              break;
            case 'org_id':            //部门
              let organ = JSON.parse(val.organizationInfo);
              let org_name = [];
              this.form[key] = [];
              organ.forEach(res => {
                org_name.push(res.name);
                this.form[key].push(res.id);
              });
              this.departName(org_name, key);
              this.getLeader(this.form[key], 'old_leader_id');
              break;
            case 'duty_id':           //职务
              if (val.dutyInfo) {
                let dutyInfo = [];
                for (let item of val.dutyInfo) {
                  dutyInfo.push(item.duty_name);
                  this.form[key].push(item.duty_id);
                }
                this.departName(dutyInfo, key);
              }
              break;
            case 'position_id':       //岗位
              if (val.duty_id) {
                let pos = [];
                for (let item of val.positionInfo) {
                  pos.push(item.position_name);
                  this.form[key].push(item.position_id);
                }
                this.departName(pos, key);
              }
              break;
            case 'id':
              this.form.id = val.user_id;
              break;
            default:
              if (val[key] && val[key] !== 'null') {
                this.form[key] = val[key];
              } else {
                this.form[key] = [];
              }
          }
        }
        this.fullLoading = false;
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
      // 职务
      duties(id) {
        this.$http.get(this.url + 'manager/position?department_id=' + id).then(res => {
          if (res.data.code === '20000') {
            res.data.data.data.forEach(item => {
              this.new_duty.push(item);
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
        this.$http.get(this.url + 'manager/positions?type=' + id).then(res => {
          if (res.data.code === '20000') {
            res.data.data.data.forEach(item => {
              this.new_position.push(item);
            });
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
        this.lengths = '';
      },
      // 清空 部门
      emptyDepart(val) {
        this.form[val] = '';
        this.orgData[val] = '';
        this.orgData = Object.assign({}, this.orgData);
        this.resetOrg();
      },
      // 重置职位 岗位
      resetOrg(val) {
        this.new_position = [];
        this.form.new_position_id = [];
        if (val === 'position') return;
        this.new_duty = [];
        this.form.new_duty_id = [];
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
        this.resetOrg();
        let arr = [];
        this.form[organ] = [];
        for (let item of val) {
          arr.push(item.name);
          this.duties(item.id);
          this.form[organ].push(item.id);
        }
        this.getLeader(this.form[organ], 'leader_id');
        this.departName(arr, organ);
      },
      // 获取负责人
      getLeader(ids, key) {
        this.$http.get(this.url + 'hrm/User/orgLeaders', {
          params: {id: ids},
        }).then(res => {
          let leaders = [];
          res.data.forEach(lead => {
            if (lead.leader) {
              leaders.push(lead.leader.name);
            } else {
              return false;
            }
          });
          this.departName(leaders, key);
        });
      },
      // 数组名称去重 拼接
      departName(arr, organ) {
        this.orgData[organ] = this.montage(arr);
        this.orgData = Object.assign({}, this.orgData);
      },
    },
  }
</script>

<style lang="scss">
  #addTransfer {
    .addForm {
      max-height: 480px;
      display: flex;
      display: -webkit-flex;
      flex-wrap: wrap;
      align-items: center;
      .formList {
        width: 48%;
      }
      .width66 {
        width: 66%;
      }
      .list3 {
        width: 96%;
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
