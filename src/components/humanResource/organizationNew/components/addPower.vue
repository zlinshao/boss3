<template>
  <div id="addPower">
    <el-dialog title="权限" :visible.sync="powerVisible" width="60%">
      <el-form :inline="true" size="mini" style="border-bottom: 2px solid #e4e7ed;">
        <el-form-item label="职位名称">
          <el-select v-model="currentRoleId" clearable placeholder="请选择">
            <el-option v-for="item in roleArray" :key="item.id" :label="item.name" :value="item.id">{{item.name}}
            </el-option>
          </el-select>
        </el-form-item>
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
              <div style="margin: 10px 0;"></div>
              <el-checkbox-group v-model="checkedPower" @change="powerChange">
                <el-checkbox v-for="key in permissionData" :label="key.id" :key="key.id">{{key.display_name}}
                </el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer" style="text-align: center;">
        <el-button size="small" type="primary" @click="empower('position')">授权给职位</el-button>
        <el-button size="small" type="primary" @click="empower('person')">授权给个人</el-button>
        <el-button size="small" @click="powerVisible = false">取&nbsp;消</el-button>
      </div>

    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "add-power",
    props: ['module', 'powerData'],
    data() {
      return {
        powerVisible: false,
        urls: globalConfig.server_user,
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
        roleArray: [],
        userId: '',
      }
    },
    mounted() {
      this.roleArray = this.powerData.role;
      this.userId = this.powerData.id;
    },
    activated() {
      this.roleArray = this.powerData.role;
      this.userId = this.powerData.id;

    },
    watch: {
      module(val) {
        this.powerVisible = val;
        this.systemList();
      },
      powerVisible(val) {
        if (!val) {
          this.$emit('close');
        }
      },
      powerData(val) {
        this.roleArray = val.role;
        this.userId = val.id;
        setTimeout(()=>{
          this.getDefaultData();
        },0);
      }
    },
    methods: {
      getDefaultData(){
        this.checkedPower = [];
        this.$http.get(globalConfig.server_user+ 'powers/'+this.userId).then( (res)=>{
          if (res.data.status === 'success') {
            let powers = res.data.data;
            powers.forEach((item)=>{
              this.checkedPower.push(item.id);
            })
          }
        });
      },
      allChange(val) {
        if (val) {
          for (var i = 0; i < this.checkAllPower.length; i++) {
            if ($.inArray(this.checkAllPower[i], this.checkedPower) === -1) {
              this.checkedPower.push(this.checkAllPower[i]);
            }
          }
        } else {
          for (var i = 0; i < this.checkAllPower.length; i++) {
            var index = this.checkedPower.indexOf(this.checkAllPower[i]);
            this.checkedPower.splice(index, 1);
          }
        }
        this.isIndeterminate = false;
      },
      powerChange(value) {
        console.log(value);
        for (var i = 0; i < this.checkAllPower.length; i++) {
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
        this.$http.get(this.urls + 'systems?per_page_number=100&page=1').then((res) => {
          if (res.data.status === 'success') {
            let data = res.data.data;
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
        this.$http.get(this.urls + 'modules?per_page_number=100&page=1&sys_id=' + val).then((res) => {
          if (res.data.status === 'success') {
            let data = res.data.data;
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
        this.$http.get(this.urls + 'permissions?per_page_number=100&page=1&mod_id=' + val).then((res) => {
          this.checkAllPower = [];
          if (res.data.status === 'success') {
            let data = res.data.data;
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
        let powerIds = this.checkedPower.toString();
        if (val === 'position') {
          this.$http.put(globalConfig.server_user + 'powers/' + this.currentRoleId + '?on=role&permissions=' + powerIds).then((res) => {
            if (res.data.status === 'success') {
              this.powerVisible = false;
              this.$notify.success({
                title: '成功',
                message: '授权成功'
              });
            } else {
              this.$notify.warning({
                title: '警告',
                message: res.data.message
              });
            }
          });
        } else {
          this.$http.put(globalConfig.server_user + 'powers/' + this.userId + '?on=user&permissions=' + powerIds).then((res) => {
            if (res.data.status === 'success') {
              this.powerVisible = false;
              this.$notify.success({
                title: '成功',
                message: '授权成功'
              });
            } else {
              this.$notify.warning({
                title: '警告',
                message: res.data.message
              });
            }
          });
        }
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
  }
</style>
