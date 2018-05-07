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
                label="创建时间">
                <template slot-scope="scope">
                  <span v-if="scope.row.create_time">{{scope.row.create_time}}</span>
                  <span v-if="!scope.row.create_time">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                label="回访人">
                <template slot-scope="scope">
                  <span v-if="scope.row.operator">{{scope.row.operator}}</span>
                  <span v-if="!scope.row.operator">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                label="合同编号">
                <template slot-scope="scope">
                  <span v-if="scope.row.contract_number">{{scope.row.contract_number}}</span>
                  <span v-if="!scope.row.contract_number">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                label="房屋地址">
                <template slot-scope="scope">
                  <span v-if="scope.row.address">{{scope.row.address}}</span>
                  <span v-if="!scope.row.address">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                label="合同类型">
                <template slot-scope="scope">
                  <span v-if="scope.row.contract_type">{{scope.row.contract_type}}</span>
                  <span v-if="!scope.row.contract_type">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                label="合同周期">
                <template slot-scope="scope">
                  <span v-if="scope.row.contract_cycle">{{scope.row.contract_cycle}}</span>
                  <span v-if="!scope.row.contract_cycle">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                label="信息来源">
                <template slot-scope="scope">
                  <span v-if="scope.row.originate">{{scope.row.originate}}</span>
                  <span v-if="!scope.row.originate">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                label="保修期">
                <template slot-scope="scope">
                  <span v-if="scope.row.guarantee">{{scope.row.guarantee}}</span>
                  <span v-if="!scope.row.guarantee">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                label="开单人">
                <template slot-scope="scope">
                  <span v-if="scope.row.drawer">{{scope.row.drawer}}</span>
                  <span v-if="!scope.row.drawer">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                label="部门">
                <template slot-scope="scope">
                  <span v-if="scope.row.department">{{scope.row.department}}</span>
                  <span v-if="!scope.row.department">暂无</span>
                </template>
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
      props:['collectContractId','activeName','tabStatusChange'],
      data () {
        return {
          tableData:[],
          params:{
            pages: 1,
            limit: 3,
            module: 1,
            contract_id : ''
          },
          isRequestData:false,
          totalNumber:0,

          emptyContent : '暂无数据',
          tableLoading : false,
        }
      },
      watch:{
        collectContractId(val){
          this.params.contract_id = val;
          this.isRequestData = false;
          if(this.activeName === 'CollectReturnVisitRecordTab'){
            this.getData();
            this.isRequestData = true;
          }
        },
        activeName(val){
          if(val=== 'CollectReturnVisitRecordTab' && this.collectContractId){
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
          this.$http.get(globalConfig.server+'contract/feedback',{params:this.params}).then((res) => {
            this.tableLoading = false;
            if(res.data.code === '1212200'){
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
