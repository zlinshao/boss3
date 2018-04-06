<template>
    <div>
      <el-table
        :data="rentingData"
        style="width: 100%">
        <el-table-column
          prop="contract_num"
          label="录入/更新时间">
        </el-table-column>
        <el-table-column
          prop="address"
          label="填写人">
        </el-table-column>
        <el-table-column
          prop="house_type"
          label="内容">
        </el-table-column>
        <el-table-column
          prop="deposit"
          label="开单人">
        </el-table-column>
        <el-table-column
          prop="deposit"
          label="负责人">
        </el-table-column>
        <el-table-column
          prop="price"
          label="部门">
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
