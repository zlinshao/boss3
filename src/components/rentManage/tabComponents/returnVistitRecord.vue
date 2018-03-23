<template>
    <div>
      <el-table
        :data="rentingData"
        style="width: 100%">
        <el-table-column
          prop="contract_num"
          label="服务态度">
        </el-table-column>
        <el-table-column
          prop="address"
          label="回访人">
        </el-table-column>
        <el-table-column
          prop="house_type"
          label="回访时间">
        </el-table-column>
        <el-table-column
          prop="deposit"
          label="回访状态">
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
