<template>
    <div id="approval">
      <div style="text-align: right;margin-bottom: 20px;">
        <el-input @keyup.enter.native="getApprovalList" v-model="params.search" placeholder="请输入发起人" size="mini" clearable style="width: 200px;margin-right: 15px;">
          <el-button slot="append" icon="el-icon-search" @click="getApprovalList"></el-button>
        </el-input>
        审批类型：
        <el-select clearable size="mini" v-model="params.type" @change="handleChangeType">
          <el-option v-for="(item,key) in types" :key="key" :label="item" :value="key"></el-option>
        </el-select>
      </div>
      <el-table
        :data="approvalList"
        @row-click="LookDetail"
        v-loading="isLoading"
        :empty-text="emptyText"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255, 255, 255, 0)"
      >
        <el-table-column label="审批名称">
          <template slot-scope="scope">
            <span v-if="scope.row.content.run_name">
              {{ scope.row.content.run_name }}
            </span>
            <span v-else>暂无</span>
          </template>
        </el-table-column>
        <el-table-column label="发起人">
          <template slot-scope="scope">
            <span v-if="scope.row.users && scope.row.users.name">
              {{ scope.row.users.name }}
            </span>
            <span v-else>暂无</span>
          </template>
        </el-table-column>
        <el-table-column label="部门">
          <template slot-scope="scope">
            <span v-if="scope.row.users && scope.row.users.org">
              <a v-for="item in scope.row.users.org">
                {{ item.name }}
              </a>
            </span>
            <span v-else>暂无</span>
          </template>
        </el-table-column>
        <el-table-column label="职位">
          <template slot-scope="scope">
            <span v-if="scope.row.users && scope.row.users.role">
              <a v-for="item in scope.row.users.role">
                {{ item.display_name }}
              </a>
            </span>
            <span v-else>暂无</span>
          </template>
        </el-table-column>
        <el-table-column label="审批类型">
          <template slot-scope="scope">
            {{ types ? types[scope.row.type] : '暂无'}}
          </template>
        </el-table-column>
        <el-table-column prop="flow_time" label="发起时间"></el-table-column>
        <el-table-column label="审批人">
          <template slot-scope="scope">
            <span v-if="scope.row.content.userInfo && scope.row.content.userInfo.user_name">
                {{ scope.row.content.userInfo.user_name }}
            </span>
            <span v-else>暂无</span>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="通过时间"></el-table-column>
      </el-table>
      <div style="text-align: right;margin-top: 20px;">
        <el-pagination
          :total="count"
          :page-size="params.limit"
          layout="total,prev,pager,next"
          :current-page="params.page"
          @current-change="handleChangePage"
        ></el-pagination>
      </div>
      <ApprovalPeople :approvalVisible="approvalVisible" :detail="detailData" @approvalClose="handleCloseApproval"></ApprovalPeople>
    </div>
</template>

<script>
  import ApprovalPeople from './components/approvalDetail';
    export default {
      name: "index",
      components: { ApprovalPeople },
      data() {
        return {
          url: globalConfig.server,
          approvalVisible: false,
          params: {
            page: 1,
            limit: 12,
            type: "",
            search: ""
          },
          approvalList: [],
          count: 0,
          types: '',
          emptyText: '',
          isLoading: false,
          detailData: ""
        }
      },
      mounted() {
        this.getApprovalList();
      },
      methods: {
        LookDetail(row) {
          this.$http.get(this.url + `attendance/flow_records/${row.id}`).then(res => {
            console.log(res);
            if(res.data.code === "10000"){
              this.detailData = res.data.data.content;
              this.approvalVisible = true;
            }else {
              this.$notify.warning({
                title: "警告",
                message: res.data.msg
              })
            }
          }).catch(err =>{
            console.log(err);
          })
        },
        handleCloseApproval() {
          this.approvalVisible = false;
        },
        getApprovalList() {
          this.isLoading = true;
          this.$http.get(this.url + 'attendance/flow_records',{
            params: this.params
          }).then(res =>{
            if(res.data.code === "10000"){
              this.isLoading = false;
              this.emptyText = " ";
              this.approvalList = res.data.data.data;
              this.count = res.data.data.count;
              this.types = res.data.data.type;
            }else {
              this.isLoading = false;
              this.emptyText = "暂无数据";
              this.approvalList = [];
              this.count = 0;
              this.types = '';
            }
          }).catch(err => {
            console.log(err);
          })
        },
        handleChangeType() {
          this.getApprovalList();
        },
        handleChangePage(page) {
          this.params.page = page;
          this.getApprovalList();
        },
      }
    }
</script>

<style scoped lang="scss">

</style>
