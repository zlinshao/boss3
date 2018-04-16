<template>
    <div>
      <el-table
        :data="rentingData"
        :empty-text = 'emptyContent'
        v-loading="tableLoading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0)"
        style="width: 100%">
        <el-table-column
          prop="check_time"
          label="退/换房时间">
        </el-table-column>
        <el-table-column
          prop="check_types"
          label="退/换房状态">
        </el-table-column>
        <el-table-column
          prop="house_type"
          label="退/换房方">
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="合同开始时间">
        </el-table-column>
        <el-table-column
          prop="price"
          label="合同结束时间">
        </el-table-column>
        <el-table-column
          prop="pay_type"
          label="结算详情">
        </el-table-column>
        <el-table-column
          prop="vacancy"
          label="应退费用">
        </el-table-column>
        <el-table-column
          prop="contract_year"
          label="扣款金额">
        </el-table-column>
        <el-table-column
          prop="start_time"
          label="实际退款">
        </el-table-column>
        <el-table-column
          prop="start_time"
          label="退租状态">
        </el-table-column>
        <el-table-column
          prop="start_time"
          label="结算人">
        </el-table-column>
        <el-table-column
          prop="start_time"
          label="操作人">
        </el-table-column>
      </el-table>

      <div class="pagination">
        <el-pagination
          @current-change="currentChange"
          :current-page="params.pages"
          :page-size="3"
          layout="total, prev, pager, next, jumper"
          :total="totalNumber">
        </el-pagination>
      </div>

    </div>
</template>

<script>
    export default {
      props:['collectContractId','activeName'],
      data () {
          return {

            rentingData:[],
            params:{
              limit:3,
              page:1,
              contract_id : '',
            },
            totalNumber:0,
            editId:'',      //编辑id
            isRequestData : false,
            emptyContent : '暂无数据',
            tableLoading : false,
          }
      },
      mounted(){

      },
      watch:{
        collectContractId(val){
          this.params.contract_id = val;
          this.isRequestData = false;
          if(this.activeName === 'CollectReturnRomeInfoTab'){
            this.getData();
            this.isRequestData = true;
          }
        },
        activeName(val){
          if(val=== 'CollectReturnRomeInfoTab' && this.collectContractId){
            this.getData();
            this.isRequestData = true;
          }
        }
      },
      methods:{
        getData(){
          this.tableLoading = true;
          this.emptyContent = ' ';
          this.$http.get(globalConfig.server+'customer/check_out',{params:this.params}).then((res) => {
            this.tableLoading = false;
            if(res.data.code === '20000'){
              this.rentingData = res.data.data.data;
              this.totalNumber = res.data.data.count;
            }else {
              this.rentingData = [];
              this.totalNumber = 0;
              this.emptyContent = '暂无数据';
            }
          })
        },
        currentChange(val){
          this.params.page = val;
          this.getData();
        },
        openModalDialog(index){
          if(collectReturnInfo === 'edit'){
              this.editRentChangeDialog = true;
          }
        },
        closeModal(){
          this.editRentChangeDialog = false;
        },
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
