<template>
    <div id="managerSalary">
      <!--高级-->
      <div class="highRanking" style=" position: absolute; top: 122px; right: 55px;">
        <div class="tabsSearch" style="position: relative;">
          <el-form :inline="true" onsubmit="return false" size="mini">
            <el-form-item>
              <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="exportData">导出</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <!--表格1-->
      <div>
        <el-table>
          <el-table-column label="员工姓名" prop="name"></el-table-column>
          <el-table-column label="工资月份" prop="month"></el-table-column>
          <el-table-column label="总溢出工资" prop="moreSalary"></el-table-column>
          <el-table-column label="总溢出金额" prop="moreMoney"></el-table-column>
          <el-table-column label="总溢出业绩" prop="moreWork"></el-table-column>
          <el-table-column label="到手金额" prop="getMoney"></el-table-column>
          <el-table-column label="总奖励" prop="allAward"></el-table-column>
        </el-table>
        <div style="text-align: right;">
          <el-pagination
            layout="total,prev,pager,next"
            :total="1000"
          ></el-pagination>
        </div>
      </div>

      <!--表格2-->
      <div class="detail">
        <el-tabs v-model="activeName" @tab-click="handleTabClick">
          <el-tab-pane label="收房相关" name="first">
            <div>
              <el-table>
                <!--<el-table-column label=""></el-table-column>-->
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="租房相关" name="second"></el-tab-pane>
        </el-tabs>
      </div>
    </div>
</template>
<script>
    export default{
        name:'managersalary',
        data(){
            return{
              activeName: 'first',
              params: {
                search: ''
              },
            }
        },
        methods:{
          //切换click
          handleTabClick() {},
          //高级
          highGrade() {
            this.$message('功能尚未开启！');
          },
          //导出
          exportData() {
            this.$message('功能尚未开启！');
          },
        }
    }
</script>
<style scoped lang="scss">
  #managerSalary{
    width: 100%;
    .detail{
      margin: 15px auto;
    }
  }
</style>
