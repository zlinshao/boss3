<template>
    <div>
      <el-table
        :data="rentingData"
        style="width: 100%">
        <el-table-column
          prop="contract_num"
          label="现租客的所有应付款项">
        </el-table-column>
        <el-table-column
          prop="address"
          label="付款时间">
        </el-table-column>
        <el-table-column
          prop="house_type"
          label="合同有效期">
        </el-table-column>
        <el-table-column
          prop="deposit"
          label="应付金额">
        </el-table-column>
        <el-table-column
          prop="deposit"
          label="已付金额">
        </el-table-column>
        <el-table-column
          prop="price"
          label="款项状态">
        </el-table-column>
        <el-table-column
          prop="pay_type"
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
