<template>
  <div id="removePower">
    <el-dialog :close-on-click-modal="false" title="权限" :visible.sync="powerVisible" width="60%">
      <el-form size="mini" onsubmit="return false;" style="border-bottom: 2px solid #e4e7ed;"
               v-if="this.powerData.types !== 'position'">
        <el-row>
          <el-col :span="8">
            <el-row>
              <el-col :span="6">
                <div class="el_col_label" style="line-height: 30px;">权限类型</div>
              </el-col>
              <el-col :span="16">
                <el-form-item>
                  <el-select v-model="permissionType" placeholder="请选择">
                    <el-option v-for="item in permissionArr" :key="item.value" :label="item.label" :value="item.value">
                      {{item.label}}
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="16" v-if="permissionType=='position'">
            <el-row>
              <el-col :span="3">
                <div class="el_col_label" style="line-height: 30px;">职位名称</div>
              </el-col>
              <el-col :span="18">
                <el-form-item>
                  <el-select v-model="currentPositionId" placeholder="请选择" @change="getDefaultData">
                    <el-option v-for="item in positionArr" :key="item.id" :label="item.name" :value="item.id">
                      {{item.name}}
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="16" v-if="permissionType=='role'">
            <el-row>
              <el-col :span="3">
                <div class="el_col_label" style="line-height: 30px;">角色名称</div>
              </el-col>
              <el-col :span="18" class="el_col_option">
                <el-form-item>
                  <el-select v-model="currentRoleId" placeholder="请选择" @change="getDefaultData">
                    <el-option v-for="item in roleArr" :key="item.id" :label="item.display_name"
                               :value="item.id">{{item.display_name}}
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="16" v-if="permissionType=='duty'">
            <el-row>
              <el-col :span="3">
                <div class="el_col_label" style="line-height: 30px;">职务名称</div>
              </el-col>
              <el-col :span="18" class="el_col_option">
                <el-form-item>
                  <el-select v-model="currentDutyId" placeholder="请选择" @change="getDefaultData">
                    <el-option v-for="item in dutyArr" :key="item.id" :label="item.name"
                               :value="item.id">{{item.name}}
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
        </el-row>

      </el-form>
      <el-radio-group v-model="tabPosition" style="width: 100%;">
        <el-tabs v-model="systemName" @tab-click="handleClick(systemName, 'sys')">
          <el-tab-pane v-for="(key,index) in systemData" :label="key.display_name" :name="key.name" :key="index">

          </el-tab-pane>
        </el-tabs>
      </el-radio-group>
      <el-tabs :tab-position="tabPosition" style="height: 500px;" v-model="moduleName"
               @tab-click="handleClick(moduleName, 'module')">
        <el-tab-pane v-for="(item,index) in moduleData" :label="item.display_name" :name="item.name" :key="index">
          <div class="scroll_bar" style="max-height: 480px;overflow: auto">
            <div style="margin-bottom: 15px" v-if="permissionData.length > 0">
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="allChange">全选</el-checkbox>
              <el-checkbox-group v-model="checkedPower" @change="powerChange">'
                <el-row>
                  <el-col :span="6" v-for="key in permissionData" :key="key.id">
                    <el-checkbox :label="key.id">{{key.display_name}}</el-checkbox>
                  </el-col>
                </el-row>

              </el-checkbox-group>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer" style="text-align: center;">
        <!--<el-button size="small" type="primary" @click="setPart('attach')">关联角色</el-button>-->
        <!--<el-button size="small" type="primary" @click="setPart('detach')">解除角色关联</el-button>-->
        <el-button v-if="permissionType=='duty'" size="small" type="primary" @click="empower('duty')">授权给职务</el-button>
        <el-button v-if="permissionType=='role'" size="small" type="primary" @click="empower('role')">授权给角色</el-button>
        <el-button v-if="permissionType=='user'" size="small" type="primary" @click="empower('user')">授权给个人</el-button>
        <el-button v-if="permissionType=='position'" size="small" type="primary" @click="empower('position')">授权给职位
        </el-button>
        <el-button v-if="permissionType=='ban'" size="small" type="primary" @click="empower('ban')">同步权限黑名单</el-button>
        <el-button size="small" @click="powerVisible = false">取&nbsp;消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: "remove-power",
    props: ['module', 'powerData'],
    data() {
      return {
        powerVisible: false,
        urls: globalConfig.server,
        params: {
          limit: 120,
          page: 1,
        },
        permissionArr: [{
          value: 'user',
          label: '个人权限'
        }, {
          value: 'position',
          label: '职位权限'
        }, {
          value: 'duty',
          label: '职务权限'
        }, {
          value: 'role',
          label: '角色权限'
        }, {
          value: 'ban',
          label: '权限黑名单'
        }, {
          value: 'all',
          label: '所有权限'
        }],
        permissionType: '',
        systemName: '',
        systemData: [],
        moduleName: '',
        moduleData: [],
        permissionData: [],
        tabPosition: 'left',
        checkedPower: [],
        checkAllPower: [],
        checkAll: false,
        isIndeterminate: true,
        currentRoleId: '',
        currentPositionId: '',
        currentDutyId: '',
        roleArray: [],
        userId: '',
        partArrCategory: [],
        positionArr: [],
        roleArr: [],
        dutyArr: [],
        partNames: [],
      }
    },
    mounted() {
      // this.permissionType = 'user';
//      this.currentPositionId = this.powerData.positions && this.powerData.positions[0] && this.powerData.positions[0].id;
    },
    activated() {
      this.roleArray = this.powerData.positions;
    },
    watch: {
      module(val) {
        this.powerVisible = val;
        this.systemList();
      },
      powerVisible(val) {
        if (!val) {
          this.$emit('close');
        } else {
          this.getAllRoleData();
          this.getAllDutyData();
          this.getAllPositoinData();
        }
      },
      permissionType() {
        if (this.userId) {
          this.getDefaultData();
        }
      },
      powerData(val) {
        if (!this.powerVisible) return;
        this.roleArray = val.positions;
        if (val.types) {
          this.permissionType = val.types;
        } else {
          this.permissionType = 'user';
          this.userId = val.id;
        }
        this.currentPositionId = val.positions && val.positions[0] && val.positions[0].id;
        this.currentRoleId = val.roles && val.roles[0] && val.roles[0].id;
        this.currentDutyId = val.duties && val.duties[0] && val.duties[0].id;
        setTimeout(() => {
          this.getDefaultData();
          // this.getStaffPart();
        }, 0);
      }
    },
    methods: {
      getAllRoleData() {
        this.$http.get(this.urls + 'organization/role', {
          params: {
            limit: 500,
            page: 1,
          }
        }).then((res) => {
          if (res.data.code === '20000') {
            this.roleArr = res.data.data.data;
          }
        });
      },
      getAllDutyData() {
        this.$http.get(this.urls + 'organization/duty', {
          params: {
            limit: 500,
            page: 1,
          }
        }).then((res) => {
          if (res.data.code === '20000') {
            this.dutyArr = res.data.data.data;
          }
        });
      },
      getAllPositoinData() {
        this.$http.get(this.urls + 'organization/position', {
          params: {
            limit: 500,
            page: 1,
          }
        }).then((res) => {
          if (res.data.code === '20000') {
            this.positionArr = res.data.data.data;
          }
        });
      },
      getDefaultData() {
        let pType = this.permissionType, address;
        if (pType === 'user') {
          address = 'organization/user/getPermission/' + this.userId;
        } else if (pType === 'position') {
          address = 'organization/position/getPermission/' + this.currentPositionId;
        } else if (pType === 'role') {
          address = 'organization/role/getPermission/' + this.currentRoleId;
        } else if (pType === 'duty') {
          address = 'organization/duty/getPermission/' + this.currentDutyId;
        } else if (pType === 'ban') {
          address = 'organization/user/getPermissionBan/' + this.userId;
        } else if (pType === 'all') {
          address = 'organization/user/getallPermission/' + this.userId;
        }
        this.checkedPower = [];
        this.$http.get(globalConfig.server + address).then((res) => {
          if (res.data.code === '20060') {
            let powers = res.data.data;
            powers.forEach((item) => {
              this.checkedPower.push(item.id);
            })
          }
        });
      },
      allChange(val) {
        if (val) {
          for (let i = 0; i < this.checkAllPower.length; i++) {
            if ($.inArray(this.checkAllPower[i], this.checkedPower) === -1) {
              this.checkedPower.push(this.checkAllPower[i]);
            }
          }
        } else {
          for (let i = 0; i < this.checkAllPower.length; i++) {
            let index = this.checkedPower.indexOf(this.checkAllPower[i]);
            this.checkedPower.splice(index, 1);
          }
        }
        this.isIndeterminate = false;
      },
      powerChange(value) {
        for (let i = 0; i < this.checkAllPower.length; i++) {
          if ($.inArray(this.checkAllPower[i], value) === -1) {
            this.checkAll = false;
            this.isIndeterminate = true;
            return;
          }
        }
        this.checkAll = true;
        this.isIndeterminate = false;
      },

      // 去重
      noRepeat(array) {
        return Array.from(new Set(array));
      },

      FilterData(a, b) {
        //循环判断数组a里的元素在b里面有没有，有的话就放入新建立的数组中
        let result = [];
        let c = b.toString();
        for (let i = 0; i < a.length; i++) {
          if (c.indexOf(a[i].toString()) > -1) {
            for (let j = 0; j < b.length; j++) {
              if (a[i] === b[j]) {
                result.push(a[i]);
                break;
              }
            }
          }
        }
        return result;
      },

      handleClick(val, str) {
        switch (str) {
          case 'sys':
            for (let i = 0; i < this.systemData.length; i++) {
              if (this.systemData[i].name === val) {
                this.moduleList(this.systemData[i].id);
              }
            }
            break;
          case 'module':
            for (let i = 0; i < this.moduleData.length; i++) {
              if (this.moduleData[i].name === val) {
                this.permissionList(this.moduleData[i].id);
              }
            }
            break;
        }
        this.checkAll = false;
        this.isIndeterminate = true;
      },
      // 系统
      systemList() {
        this.$http.get(this.urls + 'organization/system', {
          params: this.params
        }).then((res) => {
          if (res.data.code === '20000') {
            let data = res.data.data.data;
            this.systemData = data;
            this.systemName = data[0].name;
            this.moduleList(data[0].id);
          } else {
            this.systemData = [];
          }
        })
      },
      // 模块
      moduleList(val) {
        this.$http.get(this.urls + 'organization/module?system_id=' + val, {
          params: this.params
        }).then((res) => {
          if (res.data.code === '20000') {
            let data = res.data.data.data;
            this.moduleData = data;
            this.moduleName = data && data[0] && data[0].name;
            this.permissionList(data[0] && data[0].id);
          }
          else {
            this.moduleData = [];
          }
        })
      },
      // 权限
      permissionList(val) {
        this.$http.get(this.urls + 'organization/permission?mod_id=' + val, {
          params: this.params
        }).then((res) => {
          this.checkAllPower = [];
          if (res.data.code === '20000') {
            let data = res.data.data.data;
            this.permissionData = data;
            for (let i = 0; i < data.length; i++) {
              this.checkAllPower.push(data[i].id);
            }
          } else {
            this.permissionData = [];
          }
        })
      },
      empower(val) {
        let powerIds = this.checkedPower.toString(), str, ids, address;
        if (val === 'user') {
          str = 'user';
          address = 'organization/permission/setpermissions/' + this.userId;
        } else if (val === 'position') {
          str = 'position';
          address = 'organization/permission/setpermissions/' + this.currentPositionId;
        } else if (val === 'role') {
          str = 'role';
          address = 'organization/permission/setpermissions/' + this.currentRoleId;
        } else if (val === 'duty') {
          str = 'duty';
          address = 'organization/permission/setpermissions/' + this.currentDutyId;
        } else if (val === 'ban') {
          str = '';
          address = 'organization/permission/ban/' + this.userId;
        }

        this.$http.put(globalConfig.server + address, {
          on: str,
          permissions: powerIds,
        }).then((res) => {
          if (res.data.code === '20000') {
            this.powerVisible = false;
            this.prompt('success', '设置成功');
          } else {
            this.prompt('warning', res.data.msg);
          }
        });
      }
    },
  }
</script>

<style lang="scss">
  #addPower {
    .el-checkbox-group {
      label.el-checkbox {
        margin-left: 0;
        margin-right: 30px;
      }
    }
    .el-tabs--left .el-tabs__header.is-left {
      width: 120px;
    }
  }
</style>
