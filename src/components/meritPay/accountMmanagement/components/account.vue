<template>
  <div id="account">
    <!-- 新增分配 -->
    <div class="addAllocation">
      <el-button type="primary" size="mini" @click="deleteAccount">删除</el-button>
      <el-button type="primary" size="mini" @click="allocationDialog = true"><i class="el-icon-plus"></i>&nbsp;新增分配</el-button>
    </div>
    <!-- 新增分配弹出框 -->
    <el-dialog title="账户分配" :visible.sync="allocationDialog" width="30%">
      <el-form :label-position="labelPosition" label-width="80px" :model="formAllocation" size="mini" ref="form">
        <el-form-item label="部门">
          <el-input type="textarea" v-model="org_name" :disabled="true" style="resize:none"></el-input>
        </el-form-item>
        <el-form-item label="账户类型">
          <el-select v-model="displayName" clearable placeholder="请选择账户类型" @change="getAccount">
            <el-option v-for="item in accountTypeOption" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="账号">
          <el-select multiple v-model="formAllocation.account_id " clearable placeholder="请选择" @change="getBankAccount">
            <el-option v-for="item in accountNumOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="allocationDialog = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="addAllocation()" size="mini">确 定</el-button>
      </span>
    </el-dialog>
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
          <el-table :data="accountTable" style="width: 100%" class="urban-division"  @selection-change="handleSelectionChange" >
            <el-table-column type="selection">
            </el-table-column>
            <el-table-column prop="account.cate" label="账户类型">
            </el-table-column>
            <el-table-column prop="account.display_name" label="开户行">
            </el-table-column>
            <el-table-column prop="account.account_owner" label="开户人">
            </el-table-column>
            <el-table-column prop="account.account_num" label="账号">
            </el-table-column>
            <!-- <el-table-column prop="account_owner" label="操作人">
                        </el-table-column> -->
          </el-table>
        </div>
      </el-col>
    </el-row>
    <!-- 分页 -->
    <div class="block pages">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import organization from "../../../common/organization"; //组织架构
import TreeRender from "../../../humanResource/organizationNew/components/treeRender"
export default {
  components: { organization },
  data() {
    return {
      table: [{ city: [], country: [] }],
      ind1: 0,
      ind2: 0,
      ind3: 0,
      org_name: "",
      labelPosition: "right", // form表单右对齐
      organizationTable: [], //组织架构
      areaTable: [],
      groupTable: [],
      accountTable: [], //账户
      allocationDialog: false,
      formAllocation: {
        //新增form
        org_id: [],
        account_id: [],
      },
      displayName: "1",
      accountNumOptions: [], //选择账号
      accountTypeOption: [
        //账号类型
        { value: "1", label: "银行卡" },
        { value: "2", label: "支付宝" },
        { value: "3", label: "微信" }
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
        keywords: '',
        limit: 10,
        page: 1,
        org_id: 1,
        is_dimission: '',
        infinite: 20,         //需要权限
        forward: '',
        is_recursion: 1,
        entry_time: [],
        leave_time: [],
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
    //   获取银行账户
    getAccount(val) {
      this.accountNumOptions = [];
      let id = "";
      id = val || 1;
      this.$http
        .get(globalConfig.server + "financial/account?all=1&cate=" + id)
        .then(res => {
          let obj = null;
          if ((res.data.code = "20000")) {
            res.data.data.data.forEach((item, index) => {
              obj = {};
              obj["value"] = item.id;
              obj["label"] = item.name + " " + item.account_num;
              obj["account_owner"] = item.account_owner;
              obj["display_name"] = item.display_name;
              this.accountNumOptions.push(obj);
            });
          }
        });
    },
    // 获取列表数据
    getAccountList(id) {
      this.$http
        .get(globalConfig.server + "financial/account_alloc", {
          params: this.params
        })
        .then(res => {
          if (res.data.code == "20000") {
            let isArray = res.data.data.data instanceof Array;
            let _this = this;
            if(!isArray) {
              _this.accountTable = [];
              for(let i in res.data.data.data) {
                _this.accountTable.push( res.data.data.data[i])
              }
            } else {
              _this.accountTable = res.data.data.data;
            }
            this.accountTable.forEach((item, index) => {
              if (item.account.cate == 1) {
                item.account.cate = "银行卡";
              } else if (item.account.cate == 2) {
                item.account.cate = "支付宝";
              } else if (item.account.cate == 3) {
                item.account.cate = "微信";
              }
            });
            this.total = res.data.data.count;
          } else if(res.data.code == "20001") {
            this.accountTable = [];
            this.tableEmpty = res.data.msg;
          }
        });
    },
    // 获取城市
    getOrganization() {
      this.accountTable = [];
      this.$http
        .get(globalConfig.server + "organization/other/org-tree?id=331")
        .then(res => {
          if (res.data.code == "70050") {
            res.data.data.children.pop();
            this.organizationTable = res.data.data.children;
          }
        });
    },
   
    // 删除账号
    handleSelectionChange(val) {
      val.forEach((item, index) => {
        if(!this.multipleSelection.includes(item.id)) {
          this.multipleSelection.push(item.id);
        }
      })
    },
    deleteAccount() {
      this.$http.post(globalConfig.server + "financial/account_alloc/delete", {account_id: this.multipleSelection}).then(res => {
        if(res.data.code == "20040") {
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
      this.$http
        .post(
          globalConfig.server + "financial/account_alloc",
          this.formAllocation
        )
        .then(res => {
          if (res.data.code == "20000") {
            this.$notify.success({
              title: "成功",
              message: res.data.msg
            });
            this.getAccountList(this.selectId);
            // this.org_name = "";
            this.formAllocation.account_id = [];
            this.allocationDialog = false;
          } else {
            this.$notify.warning({
              title: "警告",
              message: res.data.msg
            });
          }
        });
    },
    getBankAccount(val) {
      this.accountNumOptions.forEach((item, index) => {
        if (item.value == val) {
          if (!item.account_owner || !item.display_name) {
            this.$notify.warning({
              title: "警告",
              message: "开户人或者开户行为空"
            });
            this.formAllocation.account_id = [];
          }
        }
      });
    },
    handleSizeChange(val) {
      this.params.limit = val;
      this.getAccountList();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.params.page = val;
      this.getAccountList();
      console.log(`当前页: ${val}`);
    },
    // 新的获取城市数据
    //点击节点
    nodeClick(data, node, store) {
        this.org_name = data.name;
        this.formAllocation.org_id = data.id;
        this.params.org_id = data.id;
        this.getAccountList()
    },
    nodeExpand(data, node, store) {
        //展开
        if (this.defaultExpandKeys.indexOf(data.id) < 0) {
          this.defaultExpandKeys.push(data.id);
        }
    },
    nodeCollapse(data, node, store) {
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
    // renderContent(h, {node, data, store}) { //加载节点
    //     let that = this;
    //     return h(TreeRender, {
    //       props: {
    //         DATA: data,
    //         NODE: node,
    //         STORE: store,
    //       },
    //       on: {
    //         nodeSet: ((s, d, n) => that.handleSet(s, d, n)),
    //         nodeAdd: ((s, d, n) => that.handleAdd(s, d, n)),
    //         nodeEdit: ((s, d, n) => that.handleEdit(s, d, n)),
    //         nodeDel: ((s, d, n) => that.handleDelete(s, d, n))
    //       }
    //     });
    //   },
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
            this.getStaffData();
          } else {
            this.collectStatus = '暂无数据';
            this.setTree = [];
          }
        });
      },
      //获取员工数据列表
      getStaffData() {
        this.userCollectLoading = true;
        this.userCollectStatus = ' ';
        if (!this.params.entry_time) {
          this.params.entry_time = [];
        }
        if (!this.params.leave_time) {
          this.params.leave_time = [];
        }
        // this.$http.get(globalConfig.server + "financial/account_alloc", {params: this.params}).then((res) => {
        //   this.userCollectLoading = false;
        //   this.isHigh = false;
        //   if (res.data.code === '20000') {
        //     this.accountTable = res.data.data.data;
        //     this.accountTable.forEach((item, index) => {
        //       if(item.account.cate == 1) {
        //         item.account.cate = "银行卡"
        //       } else if(item.account.cate == 2) {
        //         item.account.cate = "支付宝"
        //       } else if(item.account.cate == 3) {
        //         item.account.cate = "微信"
        //       }
        //     })
        //     if (this.accountTable.length < 1) {
        //       this.userCollectStatus = '暂无数据';
        //     }
        //   } else {
        //     this.userCollectStatus = '暂无数据';
            
        //   }
        // })
        // this.getAccountList()
      },
      initExpand() {
        this.setTree.map((a) => {
//          this.defaultExpandKeys.push(a.id)
        });
        this.isLoadingTree = true;
      },
  },
  mounted() {
    this.initExpand();
    this.getDepart();
  },
  created() {
    this.getAccount();
    this.getOrganization();
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
