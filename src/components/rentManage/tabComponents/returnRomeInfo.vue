<template>
    <div>
      <el-table
        :data="rentingData"

        style="width: 100%">
        <el-table-column
          prop="contract_num"
          label="退房时间">
        </el-table-column>
        <el-table-column
          prop="address"
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
