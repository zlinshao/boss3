<template>
  <div>
    <div class="main">
      <div class="highRanking">
        <div class="tabsSearch">
          <el-form :inline="true" onsubmit="return false" size="mini">
            <el-form-item>
              <el-input v-model="params.q" placeholder="搜索">
                <el-button @click="search()" slot="append" type="primary" icon="el-icon-search"></el-button>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
            </el-form-item>
            <el-form-item style="float: right">
              <el-button type="success" @click="viewIncompleteRecord">查看不齐记录</el-button>
            </el-form-item>
          </el-form>
        </div>

        <div class="filter high_grade" :class="isHigh? 'highHide':''">
          <el-form :inline="true" onsubmit="return false" :model="formInline" size="mini" label-width="100px">
            <div class="filterTitle">
              <i class="el-icons-fa-bars"></i>&nbsp;&nbsp;高级搜索
            </div>
            <el-row class="el_row_border">
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">发布时间</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-date-picker
                        v-model="params.publish_time"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12" v-if="activeName == 'first' ">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">合同开始时间</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-date-picker
                        v-model="params.lord_time"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12" v-if="activeName == 'second' ">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">合同结束时间</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-date-picker
                        v-model="params.renter_time"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row class="el_row_border">
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">合同状态</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-input v-model="formInline.name" @focus="selectDep" readonly placeholder="选择部门">
                        <el-button slot="append" type="primary">清空</el-button>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">签约日期</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-date-picker
                        v-model="params.sign_time"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>

            <el-row class="el_row_border">
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">未上传合同</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-input v-model="formInline.name" @focus="selectDep" readonly placeholder="选择部门">
                        <el-button slot="append" type="primary">清空</el-button>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">部门合同</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-date-picker
                        v-model="params.sign_time"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>

            <div class="btnOperate">
              <el-button size="mini" type="primary" @click="highSearch()">搜索</el-button>
              <el-button size="mini" type="primary" @click="resetting">重置</el-button>
              <el-button size="mini" type="primary" @click="highGrade">取消</el-button>
            </div>
          </el-form>
        </div>
      </div>
      <div class="main">
        <div>
          <el-table
            :data="collectData"
            :empty-text = 'rentStatus'
            v-loading="rentLoading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(255, 255, 255, 0)"
            @row-click="clickTable"
            @row-contextmenu='houseMenu'
            style="width: 100%">
            <el-table-column
              prop="contract_number"
              label="合同编号">
            </el-table-column>
            <el-table-column
              prop="bulletin_time"
              label="上传时间">
            </el-table-column>
            <el-table-column
              prop="customer_name"
              label="业主姓名">
            </el-table-column>
            <el-table-column
              label="地址">
              <template slot-scope="scope">
                <div v-popover:popover1 style="display:block;word-break:keep-all;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
                  {{scope.row.address}}
                  <el-popover
                    ref="popover1"
                    placement="top-start"
                    width="200"
                    trigger="hover">
                    {{scope.row.address}}
                  </el-popover>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="phone"
              label="手机号码">
            </el-table-column>
            <el-table-column
              prop="end_date"
              width="136px"
              label="合同到期时间">
            </el-table-column>
            <el-table-column
              prop="complete_date"
              label="资料补齐时间">
            </el-table-column>
            <el-table-column
              prop="return_visit"
              label="回访情况">
            </el-table-column>
            <el-table-column
              prop="staff_name"
              width="80px;"
              label="开单人">
            </el-table-column>
            <el-table-column
              prop="leader_name"
              label="负责人">
            </el-table-column>
            <el-table-column
              prop="department_name"
              label="部门">
            </el-table-column>
            <el-table-column
              prop="approval_status"
              label="审核状态">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "incomplete-record"
    }
</script>

<style scoped>

</style>
