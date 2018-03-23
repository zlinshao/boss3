<template>
    <div>
      <el-table
        :data="rentingData"
        style="width: 100%">
        <el-table-column
          prop="contract_num"
          label="保修时间">
        </el-table-column>
        <el-table-column
          prop="address"
          label="保修人">
        </el-table-column>
        <el-table-column
          prop="house_type"
          label="登记人">
        </el-table-column>
        <el-table-column
          prop="deposit"
          label="负责人">
        </el-table-column>
        <el-table-column
          prop="deposit"
          label="保修内容">
        </el-table-column>
        <el-table-column
          prop="price"
          label="维修金额">
        </el-table-column>
        <el-table-column
          prop="pay_type"
          label="约定时间">
        </el-table-column>
        <el-table-column
          prop="deposit"
          label="开单人">
        </el-table-column>
        <el-table-column
          prop="price"
          label="部门">
        </el-table-column>
        <el-table-column
          label="维修结果">
          <template slot-scope="scope">
            <a href="javacript:;" style="color: #409EFF" @click="openModalDialog('returnVisitDialog')">查看</a>
          </template>
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
      },
      methods:{
        openModalDialog(){

        },
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
