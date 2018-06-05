<template>
  <div>
    <div id="onlineExam">
      <div class="filter">
        <el-form :inline="true" onsubmit="return false" size="mini">
          <el-form-item>
            <el-button type="primary" size="mini" @click="exportDialog = true">导出</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="main">
        <div>
          <el-table
            :data="tableData"
            :empty-text='rentStatus'
            v-loading="rentLoading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(255, 255, 255, 0)"
            style="width: 100%">
            <el-table-column
              prop="start_time"
              label="导入时间">
            </el-table-column>
            <el-table-column
              prop="name"
              label="导入数量">
            </el-table-column>
            <el-table-column
              prop="question_count"
              label="导入金额">
            </el-table-column>
            <el-table-column
              prop="score"
              label="导入账户">
            </el-table-column>
            <el-table-column
              prop="duration"
              label="操作人">
            </el-table-column>
          </el-table>
        </div>
        <div class="block pages">
          <!--<el-pagination-->
          <!--@size-change="handleSizeChange"-->
          <!--@current-change="handleCurrentChange"-->
          <!--:current-page="form.page"-->
          <!--:page-size="form.limit"-->
          <!--layout="total, prev, pager, next, jumper"-->
          <!--:total="tableNum">-->
          <!--</el-pagination>-->
        </div>
      </div>
    </div>
    <ExportData :exportDialog="exportDialog" @close="closeModal"></ExportData>
  </div>
</template>

<script>
  import ExportData from './components/exportData'
  export default {
    name: "index",
    components:{ExportData},
    data() {
      return {
        tableData: [],
        tableNum: 0,

        rentStatus: " ",
        rentLoading: false,
        exportDialog : false,
      };
    },
    activated() {
      this.myData();
    },
    mounted() {
    },
    watch: {

    },
    methods: {
      myData() {
        this.rentStatus = " ";
        this.rentLoading = true;
        this.$http.get(globalConfig.server + "exam?status=3",{params: this.form}).then((res) => {
          this.rentLoading = false;
        });
      },
      closeModal(){
        this.exportDialog = false;
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.myData();
      }
    }
  };
</script>

<style lang="scss" scoped>
  .filter{
    float: right;
  }
</style>
