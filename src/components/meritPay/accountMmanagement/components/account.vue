<template>
    <div id="account">
        <!-- 新增分配 -->
        <div class="addAllocation">
            <el-button type="primary" size="mini" @click="allocationDialog = true"><i class="el-icon-plus"></i>&nbsp;新增分配</el-button>
        </div>
        <!-- 新增分配弹出框 -->
        <el-dialog title="账户分配" :visible.sync="allocationDialog" width="30%">
            <el-form :label-position="labelPosition" label-width="80px" :model="formAllocation" size="mini" ref="form">
                <el-form-item label="部门">
                    <el-input type="textarea" v-model="org_name" :disabled="true" style="resize:none" ></el-input>
                </el-form-item>
                <el-form-item label="账户类型">
                    <!-- <el-select v-model="formAllocation.display_name" clearable placeholder="请选择账户类型"> -->
                    <el-select v-model="displayName" clearable placeholder="请选择账户类型">
                        <el-option v-for="item in accountTypeOption" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!-- <el-form-item label="开户人">
                    <el-input v-model="formAllocation.account_owner " placeholder="请填写开户人"></el-input>
                </el-form-item> -->
                <el-form-item label="账号">
                    <el-select multiple v-model="formAllocation.account_id " clearable placeholder="请选择">
                        <el-option v-for="item in accountNumOptions" :key="item.value" :label="item.label" :value="item.value" ></el-option>
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
                <div class="grid-content bg-purple">
                    <el-table :data="table" style="width: 100%" class="urban-division areaGroup">
                        <el-table-column prop="province" label="组织架构">
                            <template slot-scope="scope">
                                <div v-for="(item, index) in organizationTable" :key="index" @click="getArea(item.id,index)" :class="{blue: ind1 === index}">{{item.name}}</div>
                            </template>
                        </el-table-column>
                         <el-table-column prop="province" label="区组">
                            <template slot-scope="scope">
                                <div v-for="(item, index) in areaTable" :key="index" @click="getGroup(item.id, index)" class="organization" :class="{blue: ind2 === index}">{{item.name}}</div>
                            </template>
                        </el-table-column>
                         <el-table-column prop="province" label="区域小组">
                            <template slot-scope="scope">
                                <div v-for="(item, index) in groupTable" :key="index" class="organization" @click="getAccountTable(item.id, index,item.name)"  :class="{blue: ind3 === index}">{{item.name}}</div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-col>
            <el-col :span="16">
                <div class="grid-content bg-purple">
                    <el-table :data="accountTable" style="width: 100%" class="urban-division">
                        <el-table-column prop="display_name" label="账户类型">
                        </el-table-column>
                        <el-table-column prop="account.name" label="账户名称">
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
            <!-- <el-pagination @size-change="handleSizeChange" :current-page="currentPage" :page-size="12" layout="total, prev, pager, next, jumper" :total="total" :page-sizes="[12, 24, 36, 48]"> </el-pagination> -->
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[12, 24, 36, 48]" :page-size="12" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import organization from "../../../common/organization"; //组织架构
export default {
  components: { organization },
  data() {
    return {
      table: [{city: [],country: []}],
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
        account_id: "",
        display_name: "",
        account_owner: ""
      },
      displayName: "",
      accountNumOptions: [],  //选择账号
      accountNumOptions1: [],   //银行账号
      accountNumOptions2: [],   //支付宝账号
      accountNumOptions3: [],   //微信账号
      accountTypeOption: [       //账号类型
          {value: "1", label: "银行卡"},
          {value: "2", label: "支付宝"},
          {value: "3", label: "微信"},
      ], 
      currentPage: 1,
      total: 0
    };
  },
  watch: {
      allocationDialog(val) {
          if(!val) {
              this.$refs.form.resetFields()
          }
      },
      displayName(val) {
          if(val == 1) {
              this.accountNumOptions = this.accountNumOptions1;
          } else if(val == 2) {
              this.accountNumOptions = this.accountNumOptions2;
          } else if(val == 3) {
              this.accountNumOptions = this.accountNumOptions3;
          }
      },
      deep: true
  },
  methods: {
    //   获取账户
    getAccount() {
        this.$http.get(globalConfig.server + "financial/account?all=1").then(res => {
            if(res.data.code = "20000") {
                let obj = null;
                res.data.data.data.forEach((item, index) => {
                    obj = {};
                    if(item.name.includes("银行")) {
                        obj["value"]  = item.id;
                        obj["label"] = item.name + " " + item.account_num;
                        this.accountNumOptions1.push(obj);
                    } else if(item.name.includes("支付宝")) {
                        obj["value"] = item.id;
                        obj["label"] = item.name + " " + item.account_num;
                        this.accountNumOptions2.push(obj);
                    } else if (item.name.includes("微信")) {
                        obj["value"] = item.id;
                        obj["label"] = item.name + " " + item.account_num;
                        this.accountNumOptions3.push(obj);
                    }
                })
            }
        })
    },
    // 获取列表数据
    getAccountList(id) {
      this.$http
        .get(globalConfig.server + "financial/account_alloc?org_id=" + id)
        .then(res => {
          if (res.data.code == "20000") {
            this.accountTable = res.data.data.data;
            this.total = res.data.data.count;
            // this.accountTable.forEach((item, index) => {
            //   if (item.name.includes("银行")) {
            //     item["accountType"] = "银行卡";
            //   } else if (item.name.includes("支付宝")) {
            //     item["accountType"] = "支付宝";
            //   } else if (item.name.includes("微信")) {
            //     item["accountType"] = "微信";
            //   } else if (item.name.includes("现金")) {
            //     item["accountType"] = "现金";
            //   }
            // });
          }
        });
    },
    // 获取组织架构
    getOrganization() {
      this.$http.get(globalConfig.server+ "organization/other/org-tree?id=331").then(res => {
            if(res.data.code == "70050") {
                this.organizationTable = res.data.data.children;
            }
        });
    },
    // 获取区域区组
    getArea(id, index) {
         this.ind1 =  index;
         this.areaTable = []; 
         this.groupTable = [];
        this.$http.get(globalConfig.server+ "organization/other/org-tree?id=" + id).then(res => {
            if(res.data.code == "70050") {
                this.areaTable = res.data.data.children;
            }
        })
    },
    // 获取区域小组
    getGroup(id, index) {
        this.ind2 = index;
        this.$http.get(globalConfig.server + "organization/other/org-tree?id=" + id).then(res => {
            if(res.data.code == "70050") {
                this.groupTable = res.data.data.children;
                this.groupTable.forEach((item, index) => {
                    this.org_name += item.name +  ","
                    this.formAllocation.org_id.push(item.id)
                })
                this.org_name = this.org_name.substring(0, this.org_name.length - 1)
            }
        })
    },
    // 获取数据
    getAccountTable(id, index,name) {
        this.ind3 = index;
        // this.formAllocation.org_name = name;   // 暂时后面删除
        this.getAccountList(id);
    },
    // 新增分配
    addAllocation() {
      this.allocationDialog = false;
      this.formAllocation.display_name = this.displayName;
      console.log(this.formAllocation, "66666");
      this.$http.post(globalConfig.server + "financial/account_alloc", this.formAllocation).then(res => {
          console.log(res, "444");
          
      })
    },
    handleSizeChange() {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange() {
      console.log(`当前页: ${val}`);
    }
  },
  created() {
      this.getAccount();
    // this.getAccountList();
    this.getOrganization();
  }
};
</script>

<style lang="scss">
#account {
    .blue {
        color:  #409eff;
    }
  .addAllocation {
    position: absolute;
    top: 120px;
    right: 36px;
    z-index: 99;
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
}
</style>
