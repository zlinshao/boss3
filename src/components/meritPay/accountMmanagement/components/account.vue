<template>
  <div id="account" @click="show = false">
    <!-- 新增分配 -->
    <div class="addAllocation">
      <el-button type="primary" size="mini" @click="deleteAccount" :disabled="multipleSelection.length == 0">删除
      </el-button>
      <el-button type="success" size="mini" @click="handleNewAllot"><i class="el-icon-plus"></i>&nbsp;新增分配
      </el-button>
    </div>
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="border left">
          <div class="top">
            <div>
              组织架构
            </div>
          </div>
          <div id="dragTree">
            <el-tree ref="expandMenuList" class="expand-tree"
                     :data="setTree"
                     :empty-text='collectStatus'
                     v-loading="collectLoading"
                     element-loading-text="拼命加载中"
                     element-loading-spinner="el-icon-loading"
                     element-loading-background="rgba(255, 255, 255, 0)"
                     node-key="id"
                     highlight-current
                     accordion
                     check-strictly
                     @node-click="nodeClick"
                     @node-expand="nodeExpand"
                     @node-collapse="nodeCollapse"
                     :default-expanded-keys="defaultExpandKeys"
                     :props="defaultProps"
                     :expand-on-click-node="false"
            >
            </el-tree>
          </div>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="grid-content bg-purple">
          <el-table :data="accountTable" style="width: 100%" class="urban-division"
                    @selection-change="handleSelectionChange" ref="multipleTable" element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(255, 255, 255, 0)"
                    v-loading="accountLoading"
                    :empty-text="emptyAccount"
                    @row-contextmenu="openRightMenu"
          >
            <el-table-column type="selection"></el-table-column>
            <el-table-column prop="org_id.name" label="部门"></el-table-column>
            <el-table-column prop="account.account_num" label="账号"></el-table-column>
            <el-table-column prop="account.cate" label="账户类型"></el-table-column>
            <el-table-column prop="account.display_name" label="开户行"></el-table-column>
            <el-table-column prop="account.sub_bank" label="支行"></el-table-column>
            <el-table-column prop="account.account_owner" label="开户人"></el-table-column>
          </el-table>
          <!-- 分页 -->
          <div class="block pages">
            <el-pagination @current-change="handleCurrentChange"
                           :current-page="currentPage" :page-size="15"
                           layout="total, prev, pager, next" :total="total">
            </el-pagination>
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- 新增账户 -->
    <el-dialog title="补全账户信息" :visible.sync="addAccount" width="30%">
      <el-form :label-position="labelPosition" label-width="80px" :model="addAccountFrom" size="mini" ref="form">
        <el-form-item label="账户名称">
          <el-input v-model="addAccountFrom.account_name" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="账户账号">
          <el-input v-model="addAccountFrom.account_num" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="开户行">
          <el-input v-model="addAccountFrom.display_name" :disabled="add_account_display"></el-input>
        </el-form-item>
        <el-form-item label="开户人">
          <el-input v-model="addAccountFrom.account_owner"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addAccount = false" size="mini">取 消</el-button>
        <el-button type="primary" size="mini" @click="addAccountNameOwner">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 新增分配弹出框 -->
    <el-dialog title="账户分配" :visible.sync="allocationDialog" width="30%">
      <el-form :label-position="labelPosition" label-width="80px" :model="formAllocation" size="mini" ref="form">
        <el-form-item label="部门">
          <el-input v-model="org_name" :disabled="true" style="resize:none"></el-input>
        </el-form-item>
        <el-form-item label="账户类型">
          <el-select v-model="displayName" clearable placeholder="请选择账户类型" @change="getAccount">
            <el-option v-for="item in accountTypeOption" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="账号">
          <el-select multiple filterable v-model="formAllocation.account_id " clearable placeholder="请选择">
            <el-option v-for="item in accountNumOptions" :key="item.id" :label="item.name"
                       :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="allocationDialog = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="addAllocation" size="mini">确 定</el-button>
      </span>
    </el-dialog>

    <!--右击-->
    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperateMore="clickEvent"></RightMenu>

    <!--修改-->
    <el-dialog
      :visible.sync="editAccountVisible"
      title="修改账户"
      width="25%"
    >
      <div style="text-align: center">
        <p>
          账户类型：<el-select v-model="editCate" @change="changeEditCate" size="mini" style="width: 70%">
          <el-option v-for="item in accountTypeOption" :value="item.value" :label="item.label" :key="item.value"></el-option>
        </el-select>
        </p>
        <p>
          账户名称：<el-select v-model="editValue" size="mini" style="width: 70%">
          <el-option v-for="(item,key) in accountList" :key="key" :value="item.id" :label="item.name"></el-option>
        </el-select>
        </p>
      </div>
      <div style="text-align: right">
        <el-button size="mini" @click="cancelEdit">取消</el-button>
        <el-button size="mini" type="primary" @click="handleEditOk">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import organization from "../../../common/organization"; //组织架构
  import RightMenu from '../../../common/rightMenu';
  export default {
    components: {organization,RightMenu},
    data() {
      return {
        lists: [],
        show: false,
        rightMenuX: 0,
        rightMenuY: 0,
        editAccountVisible: false,
        editCate: '',
        editValue: '',
        accountList: [],
        accountId: "",
        addAccountFrom: {
          account_id: "",
          display_name: "",
          account_owner: ""
        },
        accountLoading: false,
        emptyAccount: '',
        add_account_display: false,
        add_account_num: "",
        add_display_name: "",
        add_account_owner: "",
        addAccount: false,
        org_name: "",
        labelPosition: "right", // form表单右对齐
        accountTable: [], //账户
        allocationDialog: false,
        formAllocation: {
          //新增form
          org_id: [],
          account_id: [],
        },
        displayName: "",
        accountNumOptions: [], //选择账号
        accountTypeOption: [
          //账号类型
          {value: "1", label: "银行卡"},
          {value: "2", label: "支付宝"},
          {value: "3", label: "微信"}
        ],
        currentPage: 1,
        total: 0,
        selectId: "",
        multipleSelection: [],  //选中ID
        // 新的数据
        setTree: [],
        collectStatus: "",
        tableEmpty: "",
        collectLoading: false,
        params: {
          limit: 10,
          page: 1,
          org_id: 1,
        },
        defaultExpandKeys: [], //默认展开节点列表
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        paramsOrg: {
          infinite: 20,
        },
        userCollectLoading: false,
      };
    },
    watch: {},
    methods: {
      cancelEdit() {
        this.editAccountVisible = false;
        this.editCate = '';
        this.editValue = '';
      },
      handleEditOk() {
        console.log(this.editCate,this.editValue);
        if (!this.editValue) {
          this.$notify.warning({
            title: '警告',
            message: '请选择账户'
          });
          return false;
        } else {

        }
      },
      clickEvent(index) {
       console.log(index);
       if (index.clickIndex === 'EditInfo') {
         this.editAccountVisible = true;
       }
      },
      changeEditCate() {
        this.handleEditChange();
      },
      handleEditChange() {
        this.$http.get(globalConfig.finance_server + 'account/manage/index',{
          params: {
            cate: this.editCate,
            all: 1
          }
        }).then(res => {
          this.accountList = res.data.data.data;
        })
      },
      //右击
      openRightMenu(row,event) {
        this.lists = [
          {clickIndex: 'EditInfo', headIcon: 'el-icon-edit', label: '修改', data: row},
        ];
        this.contextParams(event);
      },
      //********************右键配置操作函数****************
      contextParams(event) {
        let e = event || window.event;	//support firefox contextmenu
        this.show = false;
        this.rightMenuX = e.clientX + document.documentElement.scrollLeft - document.documentElement.clientLeft;
        this.rightMenuY = e.clientY + document.documentElement.scrollTop - document.documentElement.clientTop;
        event.preventDefault();
        event.stopPropagation();
        this.$nextTick(() => {
          this.show = true
        })
      },
      handleNewAllot() {
        if (!this.org_name) {
          this.$notify.warning({
            title: '警告',
            message: '请选择部门'
          });
          return false;
        } else {
          this.allocationDialog = true;
        }
      },
      //   获取银行账户
      getAccount(val) {
        this.$http.get(globalConfig.finance_server + 'account/manage/index',{
          params: {
            cate: parseInt(val),
            all: 1
          }
        }).then(res => {
          this.accountNumOptions = res.data.data.data;
        })
      },
      // 获取列表数据
      getAccountList() {
        this.accountLoading = true;
        this.$http
          .get(globalConfig.finance_server + "account/allocation/index", {
            params: this.params
          })
          .then(res => {
            if (res.data.success) {
              this.accountLoading = false;
              this.emptyAccount = ' ';
              this.accountTable = res.data.data.data;
              this.total = res.data.data.count;
            }else {
              this.accountLoading = false;
              this.emptyAccount = "暂无数据";
            }
          });
      },
      // 删除账号
      handleSelectionChange(val) {
        this.multipleSelection = [];
        val.map(item => {
          this.multipleSelection.push(item.id);
        });
      },

      deleteAccount() {
        this.$http.post(globalConfig.finance_server + "account/allocation/delete", {id: this.multipleSelection}).then(res => {
          if (res.data.success) {
            this.$notify.success({
              title: "成功",
              message: res.data.msg
            });
            this.getAccountList(this.formAllocation.org_id)
          } else {
            this.$notify.warning({
              title: "警告",
              message: res.data.msg
            });
          }
        })
      },
      // 新增分配
      addAllocation() {
        if (this.formAllocation.account_id.length < 1) {
          this.$notify.warning({
            title: '警告',
            message: '请选择账户'
          });
          return false;
        }
        this.$http.post(globalConfig.finance_server + 'account/allocation/add',this.formAllocation).then(res => {
          if (res.data.success) {
            this.$notify.success({
              title: '成功',
              message: res.data.message
            });
            this.getAccountList();
          }else {
            this.$notify.warning({
              title: '失败',
              message: res.data.message
            });
          }
          this.allocationDialog = false;
        }).catch(err => {
          console.log(err);
        })
      },

      // 新增账户人或账户
      addAccountNameOwner() {
        this.$http.post(globalConfig.server + "financial/account_alloc/complement", this.addAccountFrom).then(res => {
          if (res.data.code == "20000") {
            this.$notify.success({
              title: "成功",
              message: res.data.msg
            })
            this.addAccount = false;
            this.getAccount(this.accountId);
            this.addAccountFrom.account_owner = "";
          } else {
            this.$notify.warning({
              title: "警告",
              message: res.data.msg
            })
          }
        })
      },

      handleCurrentChange(val) {
        this.params.page = val;
        this.getAccountList();
      },
      // 新的获取城市数据

      //点击节点
      nodeClick(data) {
        this.org_name = data.name;
        this.formAllocation.org_id = data.id;
        this.params.org_id = data.id;
        this.params.page = '1';
        this.getAccountList()
      },

      nodeExpand(data) {
        //展开
        if (this.defaultExpandKeys.indexOf(data.id) < 0) {
          this.defaultExpandKeys.push(data.id);
        }
      },

      nodeCollapse(data) {
        //收起
        this.defaultExpandKeys.splice(this.defaultExpandKeys.indexOf(data.id), 1);
        data.children.forEach((item) => {
          this.defaultExpandKeys.splice(this.defaultExpandKeys.indexOf(item.id), 1);
          if (item.children) {
            item.children.forEach((value) => {
              this.defaultExpandKeys.splice(this.defaultExpandKeys.indexOf(value.id), 1);
            })
          }
        })
      },
      //获取部门数据
      getDepart() {
        this.collectLoading = true;
        this.collectStatus = ' ';
        this.$http.get(globalConfig.server + 'organization/org/1', {
          params: this.paramsOrg
        }).then((res) => {
          this.collectLoading = false;
          if (res.data.code === '20020') {
            this.setTree = [];
            this.setTree.push(res.data.data);
            this.setTree.forEach((item) => {
              if (item.parent_id < 1 && this.defaultExpandKeys.indexOf(item.id) < 0) {
                this.defaultExpandKeys.push(item.id);
              }
            });
            this.getAccountList();
          } else {
            this.collectStatus = '暂无数据';
            this.setTree = [];
          }
        });
      },
    },
    mounted() {
      this.getDepart();
    }
  };
</script>

<style lang="scss">
  #account {
    .blue {
      color: #409eff;
    }
    .addAllocation {
      position: absolute;
      top: 120px;
      right: 36px;
      z-index: 50;
    }
    .areaGroup {
      overflow: hidden;
      .el-table__body-wrapper {
        table {
          height: 500px;
        }
        .cell {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 110px;
          cursor: pointer;
        }
      }
    }
    .border {
      border: 1px solid #f0f7ff;
      border-radius: 4px;
      min-height: 790px;
      .top {
        padding: 0 10px;
        height: 40px;
        background: #dfe6fb;
        color: #787a7e;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
</style>
