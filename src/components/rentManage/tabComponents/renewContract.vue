<template>
    <div>
      <el-table
        :data="rentingData"

        style="width: 100%">
        <el-table-column
          prop="contract_num"
          label="录入时间">
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作类型">
        </el-table-column>
        <el-table-column
          prop="house_type"
          label="对象">
        </el-table-column>
        <el-table-column
          prop="deposit"
          label="续约前合同周期">
        </el-table-column>
        <el-table-column
          prop="price"
          label="续约后合同周期">
        </el-table-column>
        <el-table-column
          prop="pay_type"
          label="签约时长">
        </el-table-column>
        <el-table-column
          prop="vacancy"
          label="月单价">
        </el-table-column>
        <el-table-column
          prop="contract_year"
          label="付款方式">
        </el-table-column>
        <el-table-column
          prop="start_time"
          label="开单人">
        </el-table-column>
        <el-table-column
          prop="start_time"
          label="负责人">
        </el-table-column>
        <el-table-column
          prop="start_time"
          label="部门">
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
