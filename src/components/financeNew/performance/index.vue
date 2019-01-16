<template>
    <div id="performance">
      <div class="highRanking">
        <div style="text-align: right">
          <el-input v-model="params.search" size="mini" style="width: 15%;vertical-align: middle" @keyup.enter.native="handleSearch">
            <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
          </el-input>
          <el-button type="primary" size="mini" @click="isHigh = !isHigh">高级</el-button>
        </div>
        <div class="filter high_grade" :class="isHigh? 'highHide':''">
          <el-form :inline="true" onsubmit="return false" :model="params" size="mini" label-width="100px">
            <div class="filterTitle">
              <i class="el-icons-fa-bars"></i>&nbsp;&nbsp;高级搜索
            </div>
            <el-row class="el_row_border">
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">开始时间</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-date-picker
                        v-model="params.startRange"
                        value-format="yyyy-MM-dd"
                        placeholder="开始时间"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">结束时间</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-date-picker
                        v-model="params.endRange"
                        value-format="yyyy-MM-dd"
                        placeholder="结束时间"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row class="el_row_border">
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">收租类型</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-select v-model="params.cate">
                        <el-option :value="1" label="收"></el-option>
                        <el-option :value="2" label="租"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <div class="btnOperate">
              <el-button size="mini" type="primary" @click="handleGoSearch">搜索</el-button>
              <el-button size="mini" type="primary" @click="resetting">重置</el-button>
              <el-button size="mini" type="primary" @click="isHigh = false">取消</el-button>
            </div>
          </el-form>
        </div>
      </div>
      <div style="margin-top: 10px;">
        <el-table
          :data="data"
          v-loading="Loading"
        >
          <el-table-column prop="target_month" label="时间"></el-table-column>
          <el-table-column prop="staff_name" label="姓名"></el-table-column>
          <el-table-column prop="commission_count" label="开单数"></el-table-column>
          <el-table-column prop="base" label="底薪"></el-table-column>
          <el-table-column prop="commission" label="业绩提成"></el-table-column>
          <el-table-column prop="bonus_collect" label="收房奖励"></el-table-column>
          <el-table-column prop="bonus_rent" label="租房奖励"></el-table-column>
          <el-table-column prop="amout_sum_result.amount_remain_sum" label="本月未发金额"></el-table-column>
          <el-table-column prop="punish" label="认责"></el-table-column>
          <el-table-column prop="medi_cost" label="中介费"></el-table-column>
          <el-table-column prop="amount_admin_deduction" label="行政扣款"></el-table-column>
          <el-table-column prop="amount_soc_secu_deduction" label="社保扣款"></el-table-column>
          <el-table-column prop="amount_finance_deduction" label="财务扣款"></el-table-column>
          <el-table-column prop="amount_accomm_deduction" label="住宿扣款"></el-table-column>
          <el-table-column prop="amount_car_deduction" label="购车扣款"></el-table-column>
          <el-table-column prop="amount_other_deduction" label="其他扣款"></el-table-column>
          <el-table-column prop="amount_due" label="应发工资"></el-table-column>
          <el-table-column prop="amount_actual" label="实发工资"></el-table-column>
          <el-table-column prop="status" label="工资状态">
            <template slot-scope="scope">
              <span v-if="scope.row.status">{{ scope.row.status === 1 ? '已发' : '未发'}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注"></el-table-column>
        </el-table>
        <el-pagination
          :total="count"
          layout="total,prev,pager,next"
          :current-page="params.page"
          style="text-align: right"
        ></el-pagination>
      </div>
    </div>
</template>

<script>
    export default {
        name: "index",
      data() {
          return {
            url: globalConfig.finance_server,
            params: {
              page: 1,
              limit: 10,
              startRange: '',
              endRange: '',
              cate: '',
              search: ''
            },
            data: [],
            count: 0,
            Loading: false,
            isHigh: false
          }
      },
      mounted() {
          this.getTableList();
      },
      methods: {
        handleGoSearch() {
          this.getTableList();
          this.isHigh = false;
        },
        resetting() {
          this.params = {
            page: 1,
            limit: 10,
            startRange: '',
            endRange: '',
            cate: '',
            search: ''
          }
        },
        handleSearch(){
          this.params.page = 1;
          this.getTableList();
        },
          getTableList() {
            this.Loading = true;
            this.$http.get(this.url + 'salary/index',{params: this.params}).then(res => {
              if (res.data.success) {
                this.data = res.data.data.data;
                this.count = res.data.data.count;
              }
              this.Loading = false;
            }).catch(err => {
              console.log(err);
            })
          }
      }
    }
</script>

<style scoped>
  #performance{

  }
</style>
