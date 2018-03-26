<template>
    <div>
      <el-table
        :data="rentingData"

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
          prop="house_type"
          label="退房方">
        </el-table-column>
        <el-table-column
          prop="deposit"
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
          label="退组状态">
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
          :page-size="4"
          layout="total, prev, pager, next, jumper"
          :total="totalNumber">
        </el-pagination>
      </div>
    </div>
</template>

<script>
    export default {
      name: 'hello',
      data () {
          return {
            rentingData:[],
            params:{
              limit:4,
              pages:1,
            },
            totalNumber:0,
          }
      },
      mounted(){
        this.getData();
      },
      methods:{
        getData(){
          this.$http.get(globalConfig.server+'customer/check_out',{params:this.params}).then((res) => {
              if(res.data.code === '20000'){
                this.rentingData = res.data.data.data;
                this.totalNumber = res.data.data.count;
              }else {
                this.rentingData = [];
                this.totalNumber = 0;
              }
          })
        },
        currentChange(val){

        }
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
