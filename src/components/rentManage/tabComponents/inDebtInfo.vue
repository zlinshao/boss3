<template>
    <div>
      <el-table
        :data="rentingData"
        style="width: 100%">
        <el-table-column
          prop="contract_num"
          label="欠款时间">
        </el-table-column>
        <el-table-column
          prop="address"
          label="欠款类型">
        </el-table-column>
        <el-table-column
          prop="house_type"
          label="身份">
        </el-table-column>
        <el-table-column
          prop="deposit"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="price"
          label="金额">
        </el-table-column>
        <el-table-column
          prop="pay_type"
          label="还款期限">
        </el-table-column>
        <el-table-column
          prop="vacancy"
          label="欠款说明">
        </el-table-column>
        <el-table-column
          prop="contract_year"
          label="录入人">
        </el-table-column>
        <el-table-column
          label="欠款状态">
          <template slot-scope="scope">
            <el-button @click="openModalDialog('repaymentDialog')" size="mini" type="text">{{scope.row.vacancy}}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="start_time"
          label="操作时间">
        </el-table-column>
        <el-table-column
          prop="start_time"
          label="备注">
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
    export default {
        name: 'hello',
        data () {
            return {
              rentingData:[],
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
