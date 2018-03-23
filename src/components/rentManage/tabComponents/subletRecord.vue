<template>
    <div>
      <el-table
        :data="rentingData"

        style="width: 100%">
        <el-table-column
          prop="contract_num"
          label="转租时间">
        </el-table-column>
        <el-table-column
          prop="address"
          label="转租类型">
        </el-table-column>
        <el-table-column
          prop="house_type"
          label="前租客姓名">
        </el-table-column>
        <el-table-column
          prop="deposit"
          label="前租客手机号">
        </el-table-column>
        <el-table-column
          prop="price"
          label="前租金">
        </el-table-column>
        <el-table-column
          prop="pay_type"
          label="手续费">
        </el-table-column>
        <el-table-column
          prop="vacancy"
          label="备注">
        </el-table-column>
        <el-table-column
          prop="contract_year"
          label="查看应收款项">
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
