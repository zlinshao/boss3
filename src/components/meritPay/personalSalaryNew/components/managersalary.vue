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
      <div class="highRanking">
        <div class="filter high_grade" :class="isHigh? 'highHide':''"  style=" margin-top: -80px;">
          <el-form :inline="true" onsubmit="return false" :model="params" size="mini" label-width="100px">
            <div class="filterTitle">
              <i class="el-icons-fa-bars"></i>&nbsp;&nbsp;高级搜索
            </div>
            <el-row class="el_row_border">
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">部门</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-input v-model="params.depart_name" @focus="chooseDepart" placeholder="请选择部门"
                                readonly>
                        <template slot="append">
                          <div style="cursor: pointer;" @click="closeDepart">清空</div>
                        </template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">日期</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <div class="block">
                        <el-date-picker
                          v-model="params.month"
                          type="month"
                          placeholder="选择月"
                          value-format="yyyyMM">
                        </el-date-picker>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <div class="btnOperate">
              <el-button size="mini" type="primary" @click="goSearch">搜索</el-button>
              <el-button size="mini" type="primary" @click="goReset">重置</el-button>
              <el-button size="mini" type="primary" @click="highGrade">取消</el-button>
            </div>
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
                <el-table-column label=""></el-table-column>
              </el-table>
              <div style="text-align: right;">
                <el-pagination
                  layout="total,prev,pager,next"
                  :total="1000"
                ></el-pagination>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="租房相关" name="second">
            <div>
              <el-table>
                <el-table-column label=""></el-table-column>
              </el-table>
              <div style="text-align: right;">
                <el-pagination
                  layout="total,prev,pager,next"
                  :total="1000"
                ></el-pagination>
              </div>
            </div>
          </el-tab-pane>
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
                search: '',
                depart_name: '',
                month: ''
              },
              isHigh: false
            }
        },
        methods:{
          //打开部门
          chooseDepart() {},
          //清空部门
          closeDepart() {
            this.params.depart_name = "";
          },
          //搜索
          goSearch() {},
          //重置
          goReset() {},
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
