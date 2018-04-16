<template>
  <div>
    <el-table
      :data="tableData"
      :empty-text = 'emptyContent'
      v-loading="tableLoading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0)"
      style="width: 100%">
      <el-table-column
        prop="content"
        label="回访内容">
      </el-table-column>
      <el-table-column
        prop="simple_staff.real_name"
        label="回访人">
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="回访时间">
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        @current-change="currentChange"
        :current-page="params.page"
        :page-size="3"
        layout="total, prev, pager, next, jumper"
        :total="totalNumber">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'hello',
    props:['rentContractId','activeName','tabStatusChange'],
    data () {
      return {
        tableData:[],
        params:{
          pages: 1,
          limit: 3,
          category:2,
          contract_id : ''
        },
        isRequestData:false,
        totalNumber:0,
        emptyContent : '暂无数据',
        tableLoading : false,
      }
    },
    watch:{
      rentContractId(val){
        this.params.contract_id = val;
        this.isRequestData = false;
        if(this.activeName === 'RentReturnVisitRecordTab'){
          this.getData();
          this.isRequestData = true;
        }
      },
      activeName(val){
        if(val=== 'RentReturnVisitRecordTab' && this.rentContractId){
          this.getData();
          this.isRequestData = true;
        }
      },
      tabStatusChange(val){
        if(val=== 'visitRecord'){
          this.getData();
        }
      }
    },
    methods:{
      getData(){
        this.tableLoading = true;
        this.emptyContent = ' ';
        this.tableData = [];
        this.totalNumber = 0;
        this.$http.get(globalConfig.server+'contract/feedback',{params:this.params}).then((res) => {
          this.tableLoading = false;
          if(res.data.code === '20000'){
            this.tableData = res.data.data.data;
              this.totalNumber = res.data.data.count;
          }else {
            this.tableData = [];
            this.totalNumber = 0;
            this.emptyContent = '暂无数据';
          }
        })
      },
      currentChange(val) {
        this.params.page = val;
        this.getData();
      } ,
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
