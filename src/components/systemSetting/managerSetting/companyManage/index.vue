<template>
  <div>
    <div class="highRanking" style=" position: absolute; top: 122px; right: 45px;">
      <div class="highHide">
        <el-button size="mini" type="primary" @click="openReviseCompany"><i class="el-icon-plus"></i>&nbsp;新增关联</el-button>
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
        prop="organization[0].name"
        label="片区名称">
      </el-table-column>
      <el-table-column
        prop="company[0].name"
        label="所属公司">
      </el-table-column>
      <el-table-column
        prop="start_date"
        label="开始时间">
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

    <ReviseCompany :reviseCompanyDialog="reviseCompanyDialog" @close="closeModal"></ReviseCompany>
  </div>
</template>

<script>
  import ReviseCompany from './components/reviseCompany.vue'

  export default {
    components: {ReviseCompany},
    name: 'company-manage',
    data() {
      return {
        reviseCompanyDialog: false,
        tableData: [],
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
    mounted() {
      this.getTableData();
    },
    methods: {
      getTableData() {
        this.tableStatus = ' ';
        this.tableLoading = true;
        this.$http.get(globalConfig.server + 'organization/companyorg',{
          params: this.params,
        }).then((res) => {
          this.tableLoading = false;
          if (res.data.code === "71000") {
            this.tableData = res.data.data.data;
            this.totalNum = res.data.data.count;
            if (res.data.data.data < 1) {
              this.tableData = [];
              this.totalNum = 0;
              this.tableStatus = '暂无数据';
            }
          } else {
            this.tableData = [];
            this.totalNum = 0;
            this.tableStatus = '暂无数据';
          }
        })
      },
      // 新增
      openReviseCompany() {
        this.reviseCompanyDialog = true;
      },
      //modal 关闭回调
      closeModal(val) {
        this.reviseCompanyDialog = false;
        if (val === 'success') {
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
