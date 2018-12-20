<template>
<!-- 导入考勤 -->
    <div id="importAttendance">
      <el-dialog title="导出考勤" :visible.sync="importAttendanceDialog" width="50%">
        <div class="containt">
          <el-form ref="form" :model="params" label-width="80px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="月份">
                  <el-select v-model="params.arrange_month" placeholder="请选择" size="mini">
                    <el-option v-for="item in monthOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item>
                  <el-checkbox v-model="is_dimissionNum" @change="retired">包括离职员工</el-checkbox>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="部门">
                  <el-input v-model="follow_name" readonly="" @focus="openOrganizeModal()" size="mini">
                    <el-button slot="append" type="primary" @click="emptyFollowPeople">清空</el-button>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="importAttendanceDialog = false" size="mini">取 消</el-button>
          <el-button type="primary" @click="importAtt" size="mini">下载与导出</el-button>
        </span>
      </el-dialog>
      <!-- 导出弹出框 -->
    <el-dialog title="导出列表框" :visible.sync="lookListDialog" width="50%">
      <el-table :data="exportListData" border style="width: 100%">
        <el-table-column prop="user.name" label="用户名">
        </el-table-column>
        <el-table-column prop="create_time" label="导出时间">
        </el-table-column>
        <el-table-column prop="update_time" label="导出完成时间" >
          <template slot-scope="scope">
            <div v-if="scope.row.ifStatus =='1'">{{scope.row.update_time}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="导出结果">
        </el-table-column>
        <el-table-column prop="sort_user_count" label="人数">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="download(scope.row)" size="mini" :disabled="scope.row.file_id ? false : true">下载</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
     <div class="dialogPage block pages">
      <!--  :current-page="" :page-size="params.limit" -->
      <el-pagination @size-change="dialogHandleSizeChange" @current-change="dialogHandleCurrentChange" :current-page="params.page" :page-sizes="[12,24, 36,48]" :page-size="params.limit" layout="total, sizes, prev, pager, next, jumper" :total="dialogTotal">
      </el-pagination>
      </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="lookListDialog = false" size="mini">取 消</el-button>
          <el-button type="primary" @click="exportList" size="mini">导 出</el-button>
        </span>
    </el-dialog>
      <!-- 组织架构 -->
      <Organization :organizationDialog="organizationDialog" :length="length" :type="type" @close='closeModal' @selectMember="selectMember"></Organization>
    </div>
</template>

<script>
import Organization from '../../common/organization'  // 组织架构
export default {
  props:["lookImportAttendance"],
  components: {Organization},
  data() {
    return {
      monthOptions: [], // 月份
      length: 0,
      type: "",
      organizationDialog: false,
      follow_name: "", //跟进人
      follow_id: "", // 部门ID
      is_dimissionNum: false,
      params: {
        limit: 12,
        page: 1,
        arrange_month: "",
        is_dimission: "0",
        org_id: "",
      },
      importAttendanceDialog: false,
      lookListDialog: false,
      exportListData: [],
      dialogTotal: 0,
    }
  },
  watch: {
    lookImportAttendance(val) {
      this.importAttendanceDialog = val;
    },
    importAttendanceDialog(val) {
      if(!val) {
        this.$emit("close");
      }
    }
  },
  created() {
    window.InitSetInterval = setInterval(this.lookList(),2000)
  },
  mounted() {
    this.monthOptions = this.getCurrentDate();
  },
  methods: {
    retired(val) {
      if(this.is_dimissionNum) {
        this.params.is_dimission = "1";
      } else {
        this.params.is_dimission = '0';
      }
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
      this.params.org_id = "";
      this.follow_name = "";
    },
    getCurrentDate() {
      let currentDate = new Date();
      let Y = currentDate.getFullYear();
      let M = currentDate.getMonth() + 1;
      this.params.arrange_month = Y + "-" + M;
      let oldY = Y - 1;
      let oldM = M - 6;
      let a = 12;
      let month = [];
      for (let i = 0; i < 18; i++) {
        if (oldM == 12) {
          oldY = Y;
          oldM = 0;
        }
        oldM++;
        month.push({ value: oldY + "-" + oldM, label: oldY + "-" + oldM });
      }
      return month;
    },
    // 弹出框分页
    dialogHandleSizeChange(val) {
       this.params.limit = val;
       this.lookList(this.params.limit)
       console.log(`每页 ${val} 条`);
    },
    dialogHandleCurrentChange(val) {
      this.params.page = val;
      this.lookList(this.params.page);
      console.log(`当前页: ${val}`);
    },
    // 导出考勤
    importAtt() {
      this.lookListDialog = true;
      this.lookList()
    },
    lookList() {
      console.log(this.params, "22222")
      this.$http.get(globalConfig.server + "attendance/summary/excel-list",{params: this.params}).then(res => {
        if(res.data.code == "20000") {
          this.exportListData = res.data.data;
          this.dialogTotal = res.data.num;
          this.exportListData.forEach((item, index) => {
            if(item.status == "1") {
              this.exportListData[index]["ifStatus"] = item.status;
              item.status = "导出完成";
              this.uploadBtn = false;
            } else {
              this.exportListData[index]["ifStatus"] = item.status;
              this.uploadBtn = true;
              item.status = "正在导出";
              // clearInterval(window.InitSetInterval)
            }
          })
        }
      })
    },
    // 导出Excel表
    exportList() {
      this.$http.post(globalConfig.server + "attendance/summary/excel",this.params).then(res => {
        if(res.data.code == "20000") {
          this.$notify.success({
            title: "成功",
            message: res.data.msg
          })
          this.lookList();
        } else {
          this.$notify.warning({
            title: "失败",
            message: res.data.msg
          })
        }
      })
    },
     // 下载
    download(val) {
      window.open(val.file_id);
    },
  },
  destroyed() {
    clearInterval(window.InitSetInterval )
  },
}
</script>

<style lang="scss">
#importAttendance {
  .dialogPage {
    .el-pagination__sizes {
      width: 100px;
    }
    .el-pagination__jump {
      margin-left: 0px;
    }
    .is-in-pagination {
      width: 40px;
    }
  }
}
</style>
