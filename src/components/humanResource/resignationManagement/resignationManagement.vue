<template>
    <div id="resignationManagement">
      <div class="top">
        <el-form ref="params" :model="params" label-width="80px">
          <el-row>
            <el-col :span="8">
              <!-- 无意义仅占位 -->
              <div style="visibility: hidden;">无意义仅占位</div>  
            </el-col>
            <el-col :span="5">
              <el-form-item label="部门">
                <el-input v-model="follow_name" readonly="" @focus="openOrganizeModal()" size="mini">
                  <el-button slot="append" type="primary" @click="emptyFollowPeople">清空</el-button>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="离职时间">
                <el-date-picker v-model="params.entry_time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="mini"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-col :span="20">
                <el-form-item>
                  <el-input v-model="params.keywords" placeholder="请输入关键字" size="mini" ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                  <el-button type="primary" size="mini" @click="getResignationEmploye">搜 索</el-button>
              </el-col>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="table">
        <el-table :data="resignationData" border style="width: 100%">
          <el-table-column prop="name" label="姓名" ></el-table-column>
          <el-table-column prop="orgStr" label="部门" ></el-table-column>
          <el-table-column prop="roleStr" label="职位" ></el-table-column>
          <el-table-column prop="enroll" label="入职时间" ></el-table-column>
          <el-table-column prop="dismiss_time" label="离职时间" ></el-table-column>
          <el-table-column prop="phone" label="手机号码" ></el-table-column>
          <el-table-column prop="dismiss_mess" label="离职类型" ></el-table-column>
          <el-table-column prop="dismiss_type" label="离职备注" ></el-table-column>
          <el-table-column label="离职交接单" >
            <template slot-scope="scope">
              <el-button type="text" @click="addUploadFiles('1', scope.row)" v-if="true">添 加</el-button>
              <el-button type="text" v-else>查 看</el-button>
            </template>
          </el-table-column>
          <el-table-column label="合同" >
            <template slot-scope="scope">
              <!-- <el-button type="text" @click="addUploadFiles('2', scope.row.id)" v-if="true">添 加</el-button> -->
              <el-button type="text">查 看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 组织架构 -->
      <Organization :organizationDialog="organizationDialog" :length="length" :type="type" @close='closeModal' @selectMember="selectMember"></Organization>
      <!-- 上传文件 -->
      <el-dialog :title="titleName" :visible.sync="upLoadDialogVisible" width="30%">
        <el-form ref="params" :model="params" label-width="80px">
          <el-form-item label="离职类型">
            <el-input v-model="dismiss_type" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="离职原因">
            <el-input v-model="dismiss_mess" :disabled="true"></el-input>
          </el-form-item>
        </el-form>
          <UpLoad :ID="'files'" :isClear="isClear"  @getImg="upLoadFiles"></UpLoad>
        <span slot="footer" class="dialog-footer">
          <el-button @click="upLoadDialogVisible = false" size="mini">取 消</el-button>
          <el-button type="primary" @click="addResigntionTable" size="mini">确 定</el-button>
        </span>
      </el-dialog>
      
      <!-- 分页 -->
    <div class="block pages">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="params.page" :page-sizes="[12,24, 36,48]" :page-size="params.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    </div>
</template>

<script>
import Organization from '../../common/organization'  // 组织架构
import UpLoad from "../../common/UPLOAD"   // 上传文件
export default {
  components: {Organization, UpLoad},
  data() {
    return {
      dismiss_mess: "",
      dismiss_type: "",
      form: {
        user_id: "",
      },
      titleName: "",
      upLoadDialogVisible: false,
      isClear: false,
      follow_name: "", //跟进人
      follow_id: "", // 部门ID
      organizationDialog: false,
      type: "",
      length: 0,
      params: {
        entry_time: [],
        keywords: "",
        org_id: 1,
        is_dimission: 1,
        limit: 12,
        page: 1,
      },
      resignationData: [],
      total: 0,
    }
  },
  mounted() {
    this.getResignationEmploye();
  },
  watch: {
    upLoadDialogVisible(val) {
      if(!val) {
        this.isClear = true;
        this.dismiss_mess = "";
        this.dismiss_type = "";
      }
    }
  },
  methods: {
    addUploadFiles(val, row) {
      this.form.user_id = row.id;
      let dismiss_reason = row.staffs.dismiss_reason;
      for (let key in dismiss_reason) {
        if(key == "dismiss_mess") {
          this.dismiss_mess = row.dismiss_mess;
        } else if(key == "dismiss_type") {
          if(dismiss_reason[key] == "1") {
            this.dismiss_type = "主动离职";
          } else if(dismiss_reason[key] == "2") {
            this.dismiss_type = "旷工离职";
          } else if(dismiss_reason[key] == "3") {
            this.dismiss_type = "劝退";
          } else if(dismiss_reason[key] == "4") {
            this.dismiss_type = "开除";
          }
        }
      }
      if(val == "1") {
        this.titleName = "上传离职交接单";
      } else if(val == "2") {
        this.titleName = "上传合同";
      }
      this.upLoadDialogVisible = true;
    },
    // 添加离职表格
    addResigntionTable() {
      this.upLoadDialogVisible = false;
    },
    // 上传文件
    upLoadFiles(val) {
      // this.form
      console.log(val[1])
    },
    // 获取数据
    getResignationEmploye() {
      this.$http.get(globalConfig.server + 'organization/other/staff-list', {params: this.params}).then(res => {
        if(res.data.code == "70010") {
          this.resignationData = res.data.data.data;
          this.total = res.data.data.count
          let strArr = [];
          res.data.data.data.forEach((item, index) => {
            let orgStr = "";
            let roleStr = "";
            item.org.forEach((val, key) => {
             orgStr += val.name + " ";
             this.resignationData[index].orgStr = orgStr;
            })
            item.roles.forEach((val, key) => {
              roleStr += val.display_name + " ";
              this.resignationData[index].roleStr = roleStr;
            })
            let dismiss_reason = item.staffs.dismiss_reason;
            for(let key in dismiss_reason) {
              if(key == "dismiss_mess") {
                this.resignationData[index].dismiss_mess = dismiss_reason[key];
              }
              if(key == "dismiss_type" && dismiss_reason[key]) {
                if(dismiss_reason[key] == "1") {
                  this.resignationData[index].dismiss_type = "主动离职";
                } else if(dismiss_reason[key] == "2") {
                  this.resignationData[index].dismiss_type = "旷工离职";
                } else if(dismiss_reason[key] == "3") {
                  this.resignationData[index].dismiss_type = "劝退";
                } else if(dismiss_reason[key] == "4") {
                  this.resignationData[index].dismiss_type = "开除";
                }
              }
            }
          })
            console.log(this.resignationData)
        }
      })
    },
    //选人组件
    openOrganizeModal(id) {
      this.params.org_id = id;
      // this.follow_name = '';
      this.organizationDialog = true;
      this.type = "depart";
      this.length = 1;
    },
    selectMember(val) {
      this.type = "";
      this.length = "";
      this.follow_id = "";
      this.follow_name = "";
      val.forEach(item => {
        this.follow_id += item.id + ",";
        this.follow_name = item.name + ",";
      });
      this.params.org_id = this.follow_id.substring(
        0,
        this.follow_id.length - 1
      );
      // this.params.org_id = this.follow_id;
      this.follow_name = this.follow_name.substring(
        0,
        this.follow_name.length - 1
      );
    },
    // 关闭模态框
    closeModal() {
      this.organizationDialog = false;
      // this.params.org_id = this.follow_id
    },
    emptyFollowPeople() {
      this.follow_id = "";
      // this.params.org_id = "";
      this.follow_name = "";
    },
    // 分页
    handleSizeChange(val) {
      this.params.limit = val;
      this.getResignationEmploye(this.params.limit);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.params.page = val;
      this.getResignationEmploye(this.params.page);
      console.log(`当前页: ${val}`);
    },
  }
}
</script>

<style lang="scss">
  #resignationManagement {
    .top {
      .el-button--mini {
        margin-top: 7px;
        margin-left: 10px;
      }
    }
  }
</style>
