<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="create_time"
        label="调整时间">
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="房屋评分">
      </el-table-column>
      <el-table-column
        prop="child_count"
        label="空置时长">
      </el-table-column>
      <el-table-column
        prop="child.length"
        label="装修前效果">
      </el-table-column>
      <el-table-column
        prop="child.length"
        label="装修状态">
      </el-table-column>
      <el-table-column
        prop="child.length"
        label="装修开始时间">
      </el-table-column>
      <el-table-column
        prop="child.length"
        label="装修结束时间">
      </el-table-column>
      <el-table-column
        prop="child.length"
        label="装修后效果">
      </el-table-column>
      <el-table-column
        prop="expected_finish_time"
        label="负责人">
      </el-table-column>
      <el-table-column
        prop="creator_id"
        label="所属部门">
      </el-table-column>

      <el-table-column
        prop="follow_id"
        label="截图">
      </el-table-column>
      <el-table-column
        prop="follow_statuss"
        label="备注">
      </el-table-column>
    </el-table>

    <div class="pagination">
      <el-pagination
        @current-change="currentChange"
        :current-page="params.page"
        :page-size="3"
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
          tableData:[],
          params:{
            page:1,
          },
          totalNumber:0
        }
    },
    methods:{
      currentChange(val){

      }
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
