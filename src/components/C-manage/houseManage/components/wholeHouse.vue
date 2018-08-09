<template>
  <div>
    <el-table
        :data="tableData"
        :empty-text='tableStatus'
        v-loading="tableLoading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255, 255, 255, 0)"
        style="width: 100%">
      <el-table-column
          prop="village_name"
          label="小区名称">
      </el-table-column>
      <el-table-column
          prop="city"
          label="所在城市">
      </el-table-column>
      <el-table-column
          prop="address"
          label="小区地址">
      </el-table-column>
      <el-table-column
          prop="houseType"
          label="户型">
      </el-table-column>
      <el-table-column
          prop="area"
          label="面积">
      </el-table-column>
      <el-table-column
          prop="decorate"
          label="装修">
      </el-table-column>
      <el-table-column
          prop="visit_status"
          label="状态">
      </el-table-column>
      <el-table-column
          prop="price"
          label="月单价">
      </el-table-column>

    </el-table>
    <div class="block pages">
      <div>
        <el-pagination
            @current-change="handleCurrentChange"
            :current-page="params.page"
            :page-size="10"
            layout="total, prev, pager, next, jumper"
            :total="totalNum">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'hello',
    props: {
      params: {
        type: Object,
        required: true,
      },
      search: {
        type: Boolean,
        required: true,
      }
    },
    data() {
      return {
        tableStatus: ' ',
        tableLoading: false,
        tableData: [],
        totalNum: 0,
      }
    },
    mounted() {
      this.getTableData();
    },

    watch: {
      search(val) {
        this.getTableData();
      }
    },
    methods: {
      getTableData() {
        this.tableStatus = ' ';
        this.tableLoading = true;
        $.ajax({
          url: 'http://192.168.20.106:80/api/v1/tranfer',
          type: 'post',
          data: this.params,
          success: res => {
            this.tableLoading = false;
            if(res.code === 201){
              this.tableData = res.data.houses;
              this.totalNum = res.data.total;
              if(res.data.houses.length<1){
                this.tableStatus = '暂无数据';
              }
            }else {
              this.tableStatus = '暂无数据';
              this.tableData = [];
              this.totalNum = 0;
            }
          }
        });
      },
      handleCurrentChange(val) {
        this.params.page = val;
        this.getTableData();
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
