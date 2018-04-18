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
          prop="check_time"
          label="退房时间">
        </el-table-column>
        <el-table-column
          prop="check_types"
          label="退房状态">
        </el-table-column>


        <el-table-column
          prop="pay_type"
          label="结算详情">
        </el-table-column>
        <el-table-column
          prop="total_fees"
          label="总费用">
        </el-table-column>
        <el-table-column
          prop="should_be_returned_fees"
          label="应退费用">
        </el-table-column>
        <el-table-column
          prop="deduct_energy_fees"
          label="能源费用">
        </el-table-column>
        <el-table-column
          prop="others_fees"
          label="其他费用">
        </el-table-column>

        <el-table-column
          label="结算人">
          <template slot-scope="scope">
            <span v-if="scope.row.creators&&scope.row.creators.name">{{scope.row.creators.name}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作人">
          <template slot-scope="scope">
            <span v-if="scope.row.settlers&&scope.row.settlers.name">{{scope.row.settlers.name}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="结算状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 2">已结算</span>
            <el-button size="mini" type="primary" v-else="" @click="check_out(scope.row.id)">未结算</el-button>
          </template>
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
      props:['rentContractId','activeName'],
      data () {
          return {
            /***********/
            editRentChangeDialog:false,
            tableData:[],
            params:{
              limit:3,
              page:1,
              contract_id :'',
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
        rentContractId(val){
          this.params.contract_id = val;
          this.isRequestData = false;
          if(this.activeName === 'rentReturnRomeInfoTab'){
            if(val){
              this.getData();
              this.isRequestData = true;
            }else {
              this.tableData = [];
            }
          }
        },
        activeName(val){
          if(val=== 'rentReturnRomeInfoTab' && this.rentContractId){
            if(this.rentContractId){
              this.getData();
              this.isRequestData = true;
            }else {
              this.tableData = [];
            }
          }
        }
      },
      methods:{
        getData(){
          this.tableLoading = true;
          this.emptyContent = ' ';
          this.collectData = [];
          this.$http.get(globalConfig.server+'customer/check_out',{params:this.params}).then((res) => {
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
        currentChange(val){
          this.params.page = val;
          this.getData();
        },

        check_out(id){
          this.$confirm('结算后将不可撤回, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http.put(globalConfig.server+'customer/check_out/status/'+id).then((res) => {
              if(res.data.code === '20060'){
                this.$notify.success({
                  title:'成功',
                  message:res.data.msg,
                });
                this.getData();
              }
            })
          }).catch(() => {
            this.$notify.success({
              title:'消息',
              message:'已取消结算',
            })
          });

        },
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
