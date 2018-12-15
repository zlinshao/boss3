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
                  <el-button type="primary" size="mini" @click="searchResignation">搜 索</el-button>
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
          <el-table-column prop="dismiss_reason" label="离职类型" ></el-table-column>
          <el-table-column prop="remark" label="离职备注" ></el-table-column>
          <el-table-column label="离职交接单" >
            <template slot-scope="scope">
              <el-button type="text" size="mini" v-if="true">添 加</el-button>
              <el-button type="text" size="mini" v-else>查 看</el-button>
            </template>
          </el-table-column>
          <el-table-column label="合同" >
            <template slot-scope="scope">
              <el-button type="text" size="mini" v-if="true">添 加</el-button>
              <el-button type="text" size="mini" v-else>查 看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 组织架构 -->
      <Organization :organizationDialog="organizationDialog" :length="length" :type="type" @close='closeModal' @selectMember="selectMember"></Organization>
      <!-- 分页 -->
    <div class="block pages">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="params.page" :page-sizes="[12,24, 36,48]" :page-size="params.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    </div>
</template>

<script>
import Organization from '../../common/organization'
export default {
  components: {Organization},
  data() {
    return {
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
  methods: {
    // 搜索
    searchResignation() {

    },
    // 获取数据
    getResignationEmploye() {
      this.$http.get(globalConfig.server + 'organization/other/staff-list', {params: this.params}).then(res => {
        if(res.data.code == "70010") {
          this.resignationData = res.data.data.data;
          this.total = res.data.data.count
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
            console.log(typeof item.dismiss_reason, "111111")
            
          })
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
