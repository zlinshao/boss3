<template>
  <div>
    <div class="highRanking" style=" position: absolute; top: 122px; right: 45px;">
      <div class="highHide">
        <el-button size="mini" type="primary" @click="openReviseRole"><i class="el-icon-plus"></i>&nbsp;新增角色</el-button>
      </div>
    </div>
    <el-table
      :data="tableData"
      :empty-text='tableStatus'
      v-loading="tableLoading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(255, 255, 255, 0)"
      style="width: 100%">
      <el-table-column
        prop="display_name"
        label="角色名称">
      </el-table-column>
      <el-table-column
        prop="name"
        label="角色标识">
      </el-table-column>
      <el-table-column
        prop="description"
        label="角色描述">
      </el-table-column>
    </el-table>
    <div class="block pages">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="params.page"
        :page-size="params.limit"
        layout="total, prev, pager, next, jumper"
        :total="totalNum">
      </el-pagination>
    </div>

    <ReviseRole :reviseRoleDialog="reviseRoleDialog" @close="closeModal"></ReviseRole>
  </div>
</template>

<script>
  import ReviseRole from './components/reviseRole.vue'

  export default {
    components: {ReviseRole},
    name: 'role-manage',
    data() {
      return {
        reviseRoleDialog: false,
        tableData:[],
        roleModule: false,
        params: {
          page: 1,
          limit: 12,
        },
        tableStatus: ' ',
        tableLoading: false,
        totalNum: 0,
      }
    },
    mounted(){
      this.getTableData();
    },
    methods: {
      getTableData(){
        this.tableStatus= ' ';
        this.tableLoading = true;
        this.$http.get(globalConfig.server_user+ 'roles?per_page_number=12&page='+this.params.page).then((res)=>{
          this.tableLoading = false;
          if(res.data.status === 'success') {
            this.tableData = res.data.data;
            this.totalNum = res.data.meta.total;
            if(res.data.data<1){
              this.tableData = [];
              this.totalNum = 0;
              this.tableStatus = '暂无数据';
            }
          }else{
            this.tableData = [];
            this.totalNum = 0;
            this.tableStatus = '暂无数据';
          }
        })
      },
      // 新增
      openReviseRole() {
        this.reviseRoleDialog = true;
      },
      //modal 关闭回调
      closeModal(val) {
        this.reviseRoleDialog = false;
        if(val === 'success'){
          this.params.page = 1;
          this.getTableData();
        }
      },
      handleSizeChange(val) {

      },
      handleCurrentChange(val) {
        this.params.page = val;
        this.getTableData();
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>
