<template>
    <div id="approval">
      <el-dialog title="审批" :visible.sync="approvalDialog" width="60%">
        <div class="top">
          <el-form ref="form" :model="form" label-width="80px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="姓名">
                  <el-input v-model="form.name" :disabled="true" size="mini"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="部门">
                  <el-input v-model="form.department" :disabled="true" size="mini"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="职位">
                  <el-input v-model="form.position" :disabled="true" size="mini"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="content">
          <el-table :data="approvalList" border style="width: 100%"
                        v-loading="isLoading" 
                        :empty-text="emptyText"  
                        element-loading-text="拼命加载中"
                        element-loading-spinner="el-icon-loading"
                        element-loading-background="rgba(255, 255, 255, 0)">
            <el-table-column label="审批类型" >
               <template slot-scope="scope">
                {{ types ? types[scope.row.type] : '暂无'}}
              </template>
            </el-table-column>
            <el-table-column prop="date" label="审批名称" >
              <template slot-scope="scope">
                <span v-if="scope.row.content.run_name">
                  {{ scope.row.content.run_name }}
                </span>
                <span v-else>暂无</span>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="审批状态" >
              <template slot-scope="scope">
                <span v-if="scope.row.content.process_name">{{scope.row.content.process_name}}</span>
                <span v-else>暂无</span>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="审批开始时间" >
              <template slot-scope="scope">
                <span v-if="scope.row.flow_time">{{scope.row.flow_time}}</span>
                <span v-else>暂无</span>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="审批结束时间" >
              <template slot-scope="scope">
                <span v-if="scope.row.create_time">{{scope.row.create_time}}</span>
                <span v-else>暂无</span>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="操作" >
              <template slot-scope="scope">
                <el-button type="text" @click="lookApprovalDate(scope.row.id)">查看详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="approvalDialog = false" size="mini">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 查看详情 -->
      <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
        <ApprovalPeople :approvalVisible="approvalVisible" :detail="detailData" @approvalClose="handleCloseApproval"></ApprovalPeople>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false" size="mini">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
import ApprovalPeople from '../../../approval/components/approvalDetail';
export default {
  props: ["ids", "lookApprovalLog", "names", "orgs", "roles"],
  data() {
    return {
      approvalVisible: false,   // 审批详情
      detailData: "",  // 审批详情内容
      isLoading: false,
      emptyText: " ",
      types: "",
      dialogVisible: false,
      approvalDialog: false,
      approvalList: [],  
      approvalDateList: [],
      form: {
        name: "",
        department: "",
        position: ""
      },
      params: {
        page: 1,
        limit: 12,
        type: "",
        search: "",
        user_id: ""
      }
    }
  },
  watch: {
    lookApprovalLog(val) {
      this.approvalDialog = val;
    },
    names(val) {
      this.form.name = val;
    },
    orgs(val) {
      this.form.department = val;
    },
    roles(val) {
      this.form.position = val;
    },
    ids(val) {
      this.params.user_id = val;
      this.getApprovalData(val);
    },
    approvalDialog(val) {
      if(!val) {
        this.$emit("close")
        this.init();
      }
    }
  },
  methods: {
    // 清除数据
    init() {
      this.params = {
        page: 1,
        limit: 12,
        type: "",
        search: "",
        user_id: ""
      }
    },
    // http://test.v3.api.boss.lejias.cn/attendance/flow_records?page=1&limit=12&type=&search=
    getApprovalData(val) {
       this.isLoading = true;
      //  this.form = {
      //     name: "",
      //     department: "",
      //     position: ""
      //  }
        this.types = "";
       this.approvalList = [];
      // this.$http.get(globalConfig.server + 'attendance/flow_records',{params: this.params}).then(res => {
      this.$http.get(globalConfig.server + 'attendance/flow_records?user_id=' + val).then(res => {
        if(res.data.code == "10000") {
          this.emptyText = " ";
          this.approvalList = res.data.data.data;
          this.count = res.data.data.count;
          this.types = res.data.data.type;
          this.isLoading = false;
        } else {
          this.emptyText = "暂无数据";
          this.isLoading = false;
        }
      })
    },
    lookApprovalDate(id) {
      this.$http.get(globalConfig.server + `attendance/flow_records/${id}`).then(res => {
        if(res.data.code == "10000") {
          this.detailData = res.data.data.content;
          this.approvalVisible = true;
        } else {
          this.$notify.warning({
            title: "警告",
            message: res.data.msg
          })
        }
      })
    },
    handleCloseApproval() {
      this.approvalVisible = false;
      this.detailData = [];
    },
  }
}
</script>

<style lang="scss">

</style>
