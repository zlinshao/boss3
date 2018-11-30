<template>
    <div>
      <el-table
        :data="tableList"
        :empty-text="emptyText"
        v-loading="Loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255, 255, 255, 0)"
      >
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleRenew(scope)">恢复</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: right;margin-top: 15px;">
        <el-pagination
          @current-change="handleCurrentChange"
          :page-size="params.limit"
          :current-page.sync="params.page"
          layout="total, prev, pager, next"
          :total="count">
        </el-pagination>
      </div>
    </div>
</template>

<script>
    export default {
        name: "index",
      data() {
          return {
            tableList: [],
            count: 0,
            emptyText: "",
            Loading: false,
            params: {
              page: 1,
              limit: 5,
              keywords: '',
              is_hidden: 'hidden'
            }
          }
      },
      mounted() {
        this.getTableData();
      },
      methods: {
        handleCurrentChange(page) {
          this.params.page = page;
          this.getTableData();
        },
        getTableData() {
            this.Loading = true;
            this.emptyText = " ";
            this.$http.get(globalConfig.server + "organization/org",{
              params: this.params
            }).then(res => {
              if(res.data.code === '20000'){
                this.Loading = false;
                this.tableList = res.data.data.data;
                this.count = res.data.data.count;
              }else{
                this.Loading = false;
                this.tableList = [];
                this.emptyText = "暂无数据";
              }
            }).catch(err => {
              console.log(err);
            })
          },
        GoRenew(row){
          this.$http.put(globalConfig.server + `organization/other/hidden-org/${row.id}`,{
              hidden: 1,
          }).then(res => {
            if(res.data.code === "700710"){
              this.$notify.success({
                title: '成功',
                message: res.data.msg
              });
              this.getTableData();
            }else {
              this.$notify.warning({
                title: '失败',
                message: res.data.msg
              });
            }
          }).catch(err =>{
            console.log(err);
          });
        },
        handleRenew(scope) {
          this.$confirm('此操作将恢复部门，是否继续？','提示',{
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.GoRenew(scope.row);
          })
        },
      }
    }
</script>

<style scoped>

</style>
