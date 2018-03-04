<template>
  <div v-loading = isLoading>
    <el-table
      :data="tableData"
      width="100%">
      <el-table-column
        label="回馈内容"
        prop="advice">
      </el-table-column>
      <el-table-column
        label="回访方式"
        prop="reply_method">
      </el-table-column>
      <el-table-column
        label="联系方式"
        prop="others">
      </el-table-column>
    </el-table>

    <div class="block pages">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="params.page"
        :page-size="12"
        layout="total, prev, pager, next, jumper"
        :total="totalNumber">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        isHigh: false,
        params:{
          limit:12,
          page:1
        },
        tableData: [],
        pages: 1,
        totalNumber : 0,
        isLoading : true,
      }
    },
    mounted() {
      this.getTableData();
    },
    watch: {

    },
    methods: {
      getTableData(){
        this.$http.get('/wechat/advice',{params:this.params}).then((res) => {
            if(res.data.code === '10010'){
                this.tableData = res.data.data;
                this.pages = res.data.pages;
                this.totalNumber = res.data.number;
                this.isLoading = false;
            }
        })
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.params.page = val;
        this.getTableData();
      },
    },
  }
</script>

<style lang="scss">

</style>
