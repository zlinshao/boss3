<template>
    <div>
      <el-table
        :data="rentingData"
        style="width: 100%">
        <el-table-column
          prop="contract_num"
          label="跟进时间">
        </el-table-column>
        <el-table-column
          prop="address"
          label="录入时间">
        </el-table-column>
        <el-table-column
          prop="house_type"
          label="跟进方式">
        </el-table-column>
        <el-table-column
          prop="deposit"
          label="身份">
        </el-table-column>
        <el-table-column
          prop="contract_num"
          label="事件类型">
        </el-table-column>
        <el-table-column
          prop="address"
          label="时间等级">
        </el-table-column>
        <el-table-column
          prop="house_type"
          label="具体时间">
        </el-table-column>
        <el-table-column
          prop="deposit"
          label="预计完成时间">
        </el-table-column>
        <el-table-column
          prop="contract_num"
          label="跟进结果">
        </el-table-column>
        <el-table-column
          prop="address"
          label="认责人">
        </el-table-column>
        <el-table-column
          prop="house_type"
          label="时间转交">
        </el-table-column>
        <el-table-column
          prop="deposit"
          label="上传图片">
        </el-table-column>
        <el-table-column
          prop="house_type"
          label="上传录音">
        </el-table-column>
        <el-table-column
          prop="deposit"
          label="录入人">
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
