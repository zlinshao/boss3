<template>
  <div @click="show=false" @contextmenu="closeMenu">
    <div id="clientContainer">
      <div class="highRanking">
        <div class="tabsSearch">
          <el-form :inline="true" size="mini" onsubmit="return false">
            <el-form-item v-if="activeName === 'first'">
              <el-input placeholder="请选择房屋地址" v-model="addressCollect" size="mini" readOnly @focus="openAddressDialog">
                <template slot="append">
                  <div style="cursor: pointer;" @click="emptySearch">清空</div>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item v-else>
              <el-input placeholder="请选择房屋地址" v-model="addressRent" size="mini" readOnly @focus="openAddressDialog">
                <template slot="append">
                  <div style="cursor: pointer;" @click="emptySearch">清空</div>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="syncStatusDialog = true">同步</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="search">
                <i class="el-icon-refresh"></i>刷新
              </el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="filter high_grade" :class="isHigh? 'highHide':''">
          <el-form :inline="true" size="mini" label-width="100px">
            <div class="filterTitle">
              <i class="el-icons-fa-bars"></i>&nbsp;&nbsp;高级搜索
            </div>
            <div v-if="activeName === 'first'">
              <el-row class="el_row_border">
                <el-col :span="12">
                  <el-row>
                    <el-col :span="8">
                      <div class="el_col_label">创建时间</div>
                    </el-col>
                    <el-col :span="16" class="el_col_option">
                      <el-form-item>
                        <el-date-picker
                          v-model="paramsCollect.time"
                          type="daterange"
                          value-format="yyyy-MM-dd"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期">
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="12">
                  <el-row>
                    <el-col :span="8">
                      <div class="el_col_label">创建人</div>
                    </el-col>
                    <el-col :span="16" class="el_col_option">
                      <el-form-item>
                        <el-input v-model="staff_name_collect" @focus="chooseStaff" placeholder="请选择创建人"
                                  readonly>
                          <template slot="append">
                            <div style="cursor: pointer;" @click="closeStaff">清空</div>
                          </template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-row class="el_row_border">
                <el-col :span="12">
                  <el-row>
                    <el-col :span="8">
                      <div class="el_col_label">报销类型</div>
                    </el-col>
                    <el-col :span="16" class="el_col_option">
                      <el-form-item>
                        <el-select clearable v-model="paramsCollect.type" placeholder="请选择类型" value="">
                          <el-option v-for="item in reimbursementTypeCategory" :label="item.dictionary_name"
                                     :value="item.id"
                                     :key="item.id"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="12">
                  <el-row>
                    <el-col :span="8">
                      <div class="el_col_label">部门</div>
                    </el-col>
                    <el-col :span="16" class="el_col_option">
                      <el-form-item>
                        <el-input v-model="depart_name_collect" @focus="chooseDepart" placeholder="请选择部门"
                                  readonly>
                          <template slot="append">
                            <div style="cursor: pointer;" @click="closeDepart">清空</div>
                          </template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-row class="el_row_border">
                <el-col :span="12">
                  <el-row>
                    <el-col :span="8">
                      <div class="el_col_label">完成状态</div>
                    </el-col>
                    <el-col :span="16" class="el_col_option">
                      <el-form-item>
                        <el-select clearable v-model="paramsCollect.status" placeholder="请选择状态" value="">
                          <el-option v-for="item in finishedStatusCategory" :label="item.dictionary_name"
                                     :value="item.id"
                                     :key="item.id"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="12">
                  <el-row>
                    <el-col :span="8">
                      <div class="el_col_label">来源</div>
                    </el-col>
                    <el-col :span="16" class="el_col_option">
                      <el-form-item>
                        <el-select clearable v-model="paramsCollect.source" placeholder="请选择来源" value="">
                          <el-option v-for="item in reimbursementSourceCategory" :label="item.dictionary_name"
                                     :value="item.id"
                                     :key="item.id"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </div>
            <div v-else>
              <el-row class="el_row_border">
                <el-col :span="12">
                  <el-row>
                    <el-col :span="8">
                      <div class="el_col_label">创建时间</div>
                    </el-col>
                    <el-col :span="16" class="el_col_option">
                      <el-form-item>
                        <el-date-picker
                          v-model="paramsRent.time"
                          type="daterange"
                          value-format="yyyy-MM-dd"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期">
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="12">
                  <el-row>
                    <el-col :span="8">
                      <div class="el_col_label">创建人</div>
                    </el-col>
                    <el-col :span="16" class="el_col_option">
                      <el-form-item>
                        <el-input v-model="staff_name_rent" @focus="chooseStaff" placeholder="请选择创建人"
                                  readonly>
                          <template slot="append">
                            <div style="cursor: pointer;" @click="closeStaff">清空</div>
                          </template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-row class="el_row_border">
                <el-col :span="12">
                  <el-row>
                    <el-col :span="8">
                      <div class="el_col_label">报销类型</div>
                    </el-col>
                    <el-col :span="16" class="el_col_option">
                      <el-form-item>
                        <el-select clearable v-model="paramsRent.type" placeholder="请选择类型" value="">
                          <el-option v-for="item in reimbursementTypeCategory" :label="item.dictionary_name"
                                     :value="item.id"
                                     :key="item.id"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="12">
                  <el-row>
                    <el-col :span="8">
                      <div class="el_col_label">部门</div>
                    </el-col>
                    <el-col :span="16" class="el_col_option">
                      <el-form-item>
                        <el-input v-model="depart_name_rent" @focus="chooseDepart" placeholder="请选择部门"
                                  readonly>
                          <template slot="append">
                            <div style="cursor: pointer;" @click="closeDepart">清空</div>
                          </template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-row class="el_row_border">
                <el-col :span="12">
                  <el-row>
                    <el-col :span="8">
                      <div class="el_col_label">完成状态</div>
                    </el-col>
                    <el-col :span="16" class="el_col_option">
                      <el-form-item>
                        <el-select clearable v-model="paramsRent.status" placeholder="请选择状态" value="">
                          <el-option v-for="item in finishedStatusCategory" :label="item.dictionary_name"
                                     :value="item.id"
                                     :key="item.id"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="12">
                  <el-row>
                    <el-col :span="8">
                      <div class="el_col_label">来源</div>
                    </el-col>
                    <el-col :span="16" class="el_col_option">
                      <el-form-item>
                        <el-select clearable v-model="paramsRent.source" placeholder="请选择来源" value="">
                          <el-option v-for="item in reimbursementSourceCategory" :label="item.dictionary_name"
                                     :value="item.id"
                                     :key="item.id"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </div>
            <div class="btnOperate">
              <el-button size="mini" type="primary" @click="search">搜索</el-button>
              <el-button size="mini" type="primary" @click="resetting">重置</el-button>
              <el-button size="mini" type="primary" @click="highGrade">取消</el-button>
            </div>
          </el-form>
        </div>
      </div>
      <div class="main">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="收房报销记录" name="first">
            <el-table
              :data="collectTableData"
              :empty-text='collectStatus'
              v-loading="collectLoading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(255, 255, 255, 0)"
              @row-dblclick="dblClickTable"
              @row-contextmenu='houseMenu'
              style="width: 100%">
              <el-table-column
                prop="create_time"
                label="创建时间">
                <template slot-scope="scope">
                  <span v-if="scope.row.create_time">{{scope.row.create_time}}</span>
                  <span v-if="!scope.row.create_time">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="reimbursement_number"
                label="报销单编号">
                <template slot-scope="scope">
                  <span v-if="scope.row.reimbursement_number">{{scope.row.reimbursement_number}}</span>
                  <span v-if="!scope.row.reimbursement_number">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="contracts.house.name"
                label="房屋地址">
                <template slot-scope="scope">
                  <span v-if="scope.row.contracts && scope.row.contracts.house && scope.row.contracts.house.name">{{scope.row.contracts.house.name}}</span>
                  <span
                    v-if="!(scope.row.contracts && scope.row.contracts.house && scope.row.contracts.house.name)">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                label="归属公司"
              >
                <template slot-scope="scope">
                  <span style="color: #525252;" v-if="house_name && scope.row.contracts && scope.row.contracts.house_id && house_name[scope.row.contracts.house_id]">{{ house_name[scope.row.contracts.house_id].corp_name }}</span>
                  <span style="color: #525252;" v-else>暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="source.dictionary_name"
                label="来源">
                <template slot-scope="scope">
              <span
                v-if="scope.row.source && scope.row.source.dictionary_name">{{scope.row.source.dictionary_name}}</span>
                  <span v-if="!(scope.row.source && scope.row.source.dictionary_name)">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="type.dictionary_name"
                label="报销类型">
                <template slot-scope="scope">
                  <span v-if="scope.row.type && arrSplitToArray(scope.row.type)">{{arrSplitToArray(scope.row.type).join(',')}}</span>
                  <span v-else>暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="amount"
                label="报销金额">
                <template slot-scope="scope">
                  <span v-if="scope.row.amount">{{scope.row.amount}}</span>
                  <span v-if="!scope.row.amount">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="account_bank"
                label="开户行">
                <template slot-scope="scope">
                  <span v-if="scope.row.account_bank">{{scope.row.account_bank}}</span>
                  <span v-if="!scope.row.account_bank">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="branch_bank"
                label="支行">
                <template slot-scope="scope">
                  <span v-if="scope.row.branch_bank">{{scope.row.branch_bank}}</span>
                  <span v-if="!scope.row.branch_bank">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="bank_num"
                label="银行卡号">
                <template slot-scope="scope">
                  <span v-if="scope.row.bank_num">{{scope.row.bank_num}}</span>
                  <span v-if="!scope.row.bank_num">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="account_name"
                label="开户人">
                <template slot-scope="scope">
                  <span v-if="scope.row.account_name">{{scope.row.account_name}}</span>
                  <span v-if="!scope.row.account_name">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="staffs.real_name"
                label="创建人">
                <template slot-scope="scope">
                  <span v-if="scope.row.staffs && scope.row.staffs.real_name">{{scope.row.staffs.real_name}}</span>
                  <span v-if="!(scope.row.staffs && scope.row.staffs.real_name)">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="staffs.org"
                label="部门">
                <template slot-scope="scope">
                  <span v-if="scope.row.staffs && scope.row.staffs.org && scope.row.staffs.org.length">{{scope.row.staffs.org[0].name}}</span>
                  <span v-if="!(scope.row.staffs && scope.row.staffs.org && scope.row.staffs.org.length)">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                label="结算人">
                <template slot-scope="scope">
                  <span v-if="scope.row.results">{{scope.row.results.staffs.real_name}}</span>
                  <span v-if="!scope.row.results">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="status.dictionary_name"
                label="报销状态">
                <template slot-scope="scope">
                  <!--<el-button class="btnStatus" v-if="scope.row.status.id && scope.row.status.id == 654" type="primary" size="mini">-->
                  <!--{{scope.row.status.dictionary_name}}-->
                  <!--</el-button>-->
                  <span v-if="scope.row.status && scope.row.status.dictionary_name">
                    <span v-if="scope.row.status.dictionary_name === '待处理'" class="info_label">
                      {{scope.row.status.dictionary_name}}
                    </span>
                    <span v-else-if="scope.row.status.dictionary_name === '处理中'" class="yellow_label">
                      {{scope.row.status.dictionary_name}}
                    </span>
                    <span v-else-if="scope.row.status.dictionary_name === '待审核'" class="orange_label">
                      {{scope.row.status.dictionary_name}}
                    </span>
                    <span v-else-if="scope.row.status.dictionary_name === '已拒绝'" class="red_label">
                      {{scope.row.status.dictionary_name}}
                    </span>
                    <span v-else-if="scope.row.status.dictionary_name === '已驳回'" class="red_label">
                      {{scope.row.status.dictionary_name}}
                    </span>
                    <span v-else-if="scope.row.status.dictionary_name === '待结算'" class="red_label"
                          style="background: #3bcec6">
                      {{scope.row.status.dictionary_name}}
                    </span>
                    <span v-else="" class="success_label">
                      {{scope.row.status.dictionary_name}}
                    </span>
                  </span>
                  <span v-else>暂无</span>
                </template>
              </el-table-column>
            </el-table>
            <div class="block pages">
              <div class="left">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="paramsCollect.page"
                  :page-size="12"
                  layout="total, prev, pager, next, jumper"
                  :total="totalNumCollect">
                </el-pagination>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="租房报销记录" name="second">
            <el-table
              :data="rentTableData"
              :empty-text='rentStatus'
              v-loading="rentLoading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(255, 255, 255, 0)"
              @row-dblclick="dblClickTable"
              @row-contextmenu='houseMenu'
              style="width: 100%">
              <el-table-column
                prop="create_time"
                label="创建时间">
                <template slot-scope="scope">
                  <span v-if="scope.row.create_time">{{scope.row.create_time}}</span>
                  <span v-if="!scope.row.create_time">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="reimbursement_number"
                label="报销单编号">
                <template slot-scope="scope">
                  <span v-if="scope.row.reimbursement_number">{{scope.row.reimbursement_number}}</span>
                  <span v-if="!scope.row.reimbursement_number">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="contracts.house.name"
                label="房屋地址">
                <template slot-scope="scope">
                  <span v-if="scope.row.contracts && scope.row.contracts.house && scope.row.contracts.house.name">{{scope.row.contracts.house.name}}</span>
                  <span
                    v-if="!(scope.row.contracts && scope.row.contracts.house && scope.row.contracts.house.name)">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                label="归属公司"
              >
                <template slot-scope="scope">
                  <span style="color: #525252;" v-if="house_name2 && scope.row.contracts && scope.row.contracts.house_id && house_name2[scope.row.contracts.house_id]">{{ house_name2[scope.row.contracts.house_id].corp_name }}</span>
                  <span style="color: #525252;" v-else>暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="source.dictionary_name"
                label="来源">
                <template slot-scope="scope">
              <span
                v-if="scope.row.source && scope.row.source.dictionary_name">{{scope.row.source.dictionary_name}}</span>
                  <span v-if="!(scope.row.source && scope.row.source.dictionary_name)">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="type.dictionary_name"
                label="报销类型">
                <template slot-scope="scope">
                  <span v-if="scope.row.type && arrSplitToArray(scope.row.type)">{{arrSplitToArray(scope.row.type).join(',')}}</span>
                  <span v-else>暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="amount"
                label="报销金额">
                <template slot-scope="scope">
                  <span v-if="scope.row.amount">{{scope.row.amount}}</span>
                  <span v-if="!scope.row.amount">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="account_bank"
                label="开户行">
                <template slot-scope="scope">
                  <span v-if="scope.row.account_bank">{{scope.row.account_bank}}</span>
                  <span v-if="!scope.row.account_bank">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="branch_bank"
                label="支行">
                <template slot-scope="scope">
                  <span v-if="scope.row.branch_bank">{{scope.row.branch_bank}}</span>
                  <span v-if="!scope.row.branch_bank">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="bank_num"
                label="银行卡号">
                <template slot-scope="scope">
                  <span v-if="scope.row.bank_num">{{scope.row.bank_num}}</span>
                  <span v-if="!scope.row.bank_num">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="account_name"
                label="开户人">
                <template slot-scope="scope">
                  <span v-if="scope.row.account_name">{{scope.row.account_name}}</span>
                  <span v-if="!scope.row.account_name">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="staffs.real_name"
                label="创建人">
                <template slot-scope="scope">
                  <span v-if="scope.row.staffs && scope.row.staffs.real_name">{{scope.row.staffs.real_name}}</span>
                  <span v-if="!(scope.row.staffs && scope.row.staffs.real_name)">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="staffs.org"
                label="部门">
                <template slot-scope="scope">
                  <span v-if="scope.row.staffs && scope.row.staffs.org && scope.row.staffs.org.length">{{scope.row.staffs.org[0].name}}</span>
                  <span v-if="!(scope.row.staffs && scope.row.staffs.org && scope.row.staffs.org.length)">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                label="结算人">
                <template slot-scope="scope">
                  <span v-if="scope.row.results">{{scope.row.results.staffs.real_name}}</span>
                  <span v-if="!scope.row.results">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="status.dictionary_name"
                label="报销状态">
                <template slot-scope="scope">
                  <!--<el-button class="btnStatus" v-if="scope.row.status.id && scope.row.status.id == 654" type="primary" size="mini">-->
                  <!--{{scope.row.status.dictionary_name}}-->
                  <!--</el-button>-->
                  <span v-if="scope.row.status && scope.row.status.dictionary_name">
                    <span v-if="scope.row.status.dictionary_name === '待处理'" class="info_label">
                      {{scope.row.status.dictionary_name}}
                    </span>
                    <span v-else-if="scope.row.status.dictionary_name === '处理中'" class="yellow_label">
                      {{scope.row.status.dictionary_name}}
                    </span>
                    <span v-else-if="scope.row.status.dictionary_name === '待审核'" class="orange_label">
                      {{scope.row.status.dictionary_name}}
                    </span>
                    <span v-else-if="scope.row.status.dictionary_name === '已拒绝'" class="red_label">
                      {{scope.row.status.dictionary_name}}
                    </span>
                    <span v-else-if="scope.row.status.dictionary_name === '已驳回'" class="red_label">
                      {{scope.row.status.dictionary_name}}
                    </span>
                    <span v-else-if="scope.row.status.dictionary_name === '待结算'" class="red_label"
                          style="background: #3bcec6">
                      {{scope.row.status.dictionary_name}}
                    </span>
                    <span v-else="" class="success_label">
                      {{scope.row.status.dictionary_name}}
                    </span>
                  </span>
                  <span v-else>暂无</span>
                </template>
              </el-table-column>
            </el-table>
            <div class="block pages">
              <div class="left">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="paramsRent.page"
                  :page-size="12"
                  layout="total, prev, pager, next, jumper"
                  :total="totalNumRent">
                </el-pagination>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <!--模态框-->
    <div>
      <el-dialog :close-on-click-modal="false" title="审核报销" :visible.sync="examineStatusDialog" width="30%">
        <el-form size="small" label-width="100px">
          <el-row>
            <el-col :span="20">
              <el-form-item label="报销状态" required>
                <el-select clearable v-model="examineStatus" placeholder="选择类型" value="">
                  <el-option v-for="item in examineStatusCategory" :label="item.dictionary_name" :value="item.id"
                             :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="examineStatusDialog = false">取 消</el-button>
        <el-button size="small" type="primary" @click="examineConfirm">确 定</el-button>
      </span>
      </el-dialog>
    </div>
    <div>
      <el-dialog :close-on-click-modal="false" title="同步数据" :visible.sync="syncStatusDialog" width="30%">
        <el-form size="small" label-width="100px">
          <el-row>
            <el-col :span="20">
              <el-form-item label="同步误差" required>
                <el-input size="mini" placeholder="请输入" v-model="devn"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="syncStatusDialog = false">取 消</el-button>
        <el-button size="small" type="primary" @click="syncConfirm">确 定</el-button>
      </span>
      </el-dialog>
    </div>
    <div>
      <el-dialog :close-on-click-modal="false" title="上传付款凭证" :visible.sync="uploadPayDialog" width="30%">
        <el-form size="small" label-width="100px">
          <el-row>
            <el-col :span="20">
              <el-form-item label="上传付款凭证" required>
                <Upload :ID="'upload_pay'" @getImg="getImage" :isClear="isClear"></Upload>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="uploadPayDialog = false">取 消</el-button>
        <el-button size="small" type="primary" @click="uploadPayConfirm">确 定</el-button>
      </span>
      </el-dialog>
    </div>

    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperateMore="clickEvent"></RightMenu>
    <organization :organizationDialog="organizeVisible" :type="organizeType" @close="closeOrganize"
                  @selectMember="selectMember"></organization>

    <EditReimbursement :editReimbursementDialog="editReimbursementDialog" :reimbursementId="reimbursementId"
                       :module="module" @close="closeModal"></EditReimbursement>
    <ReimbursementDetail :reimbursementDetailDialog="reimbursementDetailDialog" :reimbursementId="reimbursementId"
                         @close="closeModal"></ReimbursementDetail>
    <ReimResult :reimResultDialog="reimResultDialog" :reimbursementId="reimbursementId" :type="resultType"
                @close="closeModal"></ReimResult>
    <AddressSearch :addressDialog="addressDialog" @close="closeAddressDialog" :isRent="isRent"></AddressSearch>
  </div>
</template>

<script>
  import RightMenu from '../../common/rightMenu.vue';
  import Organization from '../../common/organization.vue';
  import ReimbursementDetail from './components/reimbursementDetail';
  import EditReimbursement from './components/editReimbursement';
  import ReimResult from './components/reimResult';
  import AddressSearch from '../../common/addressSearch';
  import Upload from '../../common/UPLOAD.vue';

  export default {
    name: 'reim-manage',
    components: {RightMenu, Organization, ReimbursementDetail, EditReimbursement, ReimResult, AddressSearch, Upload},
    data() {
      return {
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],
        paramsCollect: {
          module: 1,
          page: 1,
          limit: 12,
          time: [],  //时间搜索
          status: '',  //完成状态
          source: '',  //来源
          type: '',  //报销类型
          staff_id: '',  //创建人
          contract_id: '',
          depart_id: '', //部门
        },
        paramsRent: {
          module: 2,
          page: 1,
          limit: 12,
          time: [],  //时间搜索
          status: '',  //完成状态
          source: '',  //来源
          type: '',  //报销类型
          staff_id: '',  //创建人
          contract_id: '',
          depart_id: '', //部门
        },
        addressCollect: '',
        addressRent: '',
        collectTableData: [],
        rentTableData: [],
        totalNumCollect: 0,
        totalNumRent: 0,
        isHigh: false,
        collectStatus: ' ',
        collectLoading: false,
        rentStatus: ' ',
        rentLoading: false,
        activeName: 'first',
        organizeVisible: false,
        organizeType: '',
        staff_name_collect: '',
        depart_name_collect: '',
        staff_name_rent: '',
        depart_name_rent: '',
        reimbursementDetailDialog: false,
        reimbursementTypeCategory: [],  //报销类型
        reimbursementSourceCategory: [],  //报销来源
        finishedStatusCategory: [], //完成状态
        reimbursementId: '',  //报销单id
        editReimbursementDialog: false,  //编辑报销单
        reimResultDialog: false,  //报销结果
        resultType: '',   //报销结果类型 add/edit
        module: 1,
        addressDialog: false,
        isRent: 0,
        examineStatusDialog: false,
        examineStatus: '',
        examineStatusCategory: [],
        devn: '', // 同步误差值
        syncStatusDialog: false,
        uploadPayDialog: false,  //付款凭证
        isClear: false,
        payment_pic: [],
        uploadStatus: false,
        house_name: {},
        house_name2: {}
      }
    },
    mounted() {
      this.getCollectTableData();
      this.getRentTableData();
      this.getDictionary();
    },
    // activated() {
    //   this.search();
    // },
    watch: {
      addressCollect(val) {
        if (!val) {
          this.paramsCollect.contract_id = '';
        }
        this.search();
      },
      addressRent(val) {
        if (!val) {
          this.paramsRent.contract_id = '';
        }
        this.search();
      },
      examineStatusDialog(val) {
        if (!val) {
          this.examineStatus = '';
          this.reimbursementId = '';
        }
      },
      syncStatusDialog(val) {
        if (!val) {
          this.devn = '';
        }
      },
      uploadPayDialog(val) {
        this.isClear = !val;
      },
    },
    methods: {
      uploadPayConfirm() {
        if (this.uploadStatus) {
          this.$notify.warning({
            title: '警告',
            message: '图片正在上传中，请稍后'
          });
          return;
        }
        this.$http.put(globalConfig.server + 'customer/reimbursement/paypic/' + this.reimbursementId, {payment_pic: this.payment_pic}).then((res) => {
          if (res.data.code === '30070') {
            this.$notify.success({
              title: '成功',
              message: res.data.msg
            });
            this.uploadPayDialog = false;
            this.activeName === "first" ? this.getCollectTableData() : this.getRentTableData();
          } else {
            this.$notify.warning({
              title: '警告',
              message: res.data.msg
            });
          }
        })
      },
      getImage(val) {
        this.payment_pic = []; //选择的图片数组ids
        val[1].forEach((item) => {
          this.payment_pic.push(item);
        });
        this.uploadStatus = val[2];
      },
      syncConfirm() {
        this.$http.get(globalConfig.server + 'customer/reimbursement/sync', {params: {devn: this.devn}}).then((res) => {
          if (res.data.code === '30060') {
            this.syncStatusDialog = false;
            this.$notify.success({
              title: '成功',
              message: res.data.msg
            });
            this.search();
          } else {
            this.$notify.warning({
              title: '警告',
              message: res.data.msg
            });
          }
        });
      },
      examineConfirm() {
        this.$http.put(globalConfig.server + 'customer/reimbursement_result/status/' + this.reimbursementId, {status: this.examineStatus}).then((res) => {
          if (res.data.code === '40050') {
            this.examineStatusDialog = false;
            this.$notify.success({
              title: '成功',
              message: res.data.msg
            });
            this.search();
          } else {
            this.$notify.warning({
              title: '警告',
              message: res.data.msg
            });
          }
        });
      },
      emptySearch() {
        if (this.activeName === 'first') {
          this.paramsCollect.contract_id = '';
          this.addressCollect = '';
        } else {
          this.paramsRent.contract_id = '';
          this.addressRent = '';
        }

      },
      openAddressDialog() {
        this.addressDialog = true;
      },
      closeAddressDialog(val) {
        this.addressDialog = false;
        if (val) {
          if (this.activeName === 'first') {
            this.addressCollect = val.address;
            this.paramsCollect.contract_id = val.contract_id;
          } else {
            this.addressRent = val.address;
            this.paramsRent.contract_id = val.contract_id;
          }

        }
      },
      getDictionary() {
        this.$http.get(globalConfig.server + 'setting/dictionary/640').then((res) => {
          if (res.data.code === "30010") {
            this.reimbursementTypeCategory = res.data.data;  //报销类型
          }
        });
        this.$http.get(globalConfig.server + 'setting/dictionary/641').then((res) => {
          if (res.data.code === "30010") {
            this.reimbursementSourceCategory = res.data.data;  //报销来源
          }
        });
        this.$http.get(globalConfig.server + 'setting/dictionary/642').then((res) => {
          if (res.data.code === "30010") {
            this.finishedStatusCategory = res.data.data;   //完成状态
            let finish_status = res.data.data;
            finish_status.forEach((item) => {
              if (item.id === 663 || item.id === 664) {
                this.examineStatusCategory.push(item);
              }
            });
          }
        });
      },
      getName(houseIds = [],status) {
        this.$http.get(globalConfig.server + '/organization/other/house-corp',{
          params:{
            houseIds
          }
        }).then(res=>{
          if(res.data.code == '700120'){
            if(status){
              this.house_name = res.data.data;
            }else{
              this.house_name2 = res.data.data;
            }
          }else {
            this.house_name = {};
          }
        }).catch(err=>{
          console.log(err);
        })
      },
      getCollectTableData() {
        this.collectStatus = ' ';
        this.collectLoading = true;
        if (!this.paramsCollect.time) {
          this.paramsCollect.time = [];
        }
        this.$http.get(globalConfig.server + 'customer/reimbursement', {params: this.paramsCollect}).then((res) => {
          this.isHigh = false;
          this.collectLoading = false;
          if (res.data.code === '30000') {
            this.collectTableData = res.data.data.data;
            let house_id = [];
            res.data.data.data.map((item)=>{
              if(item.contracts){
               house_id.push(item.contracts.house_id);
              }else{
                house_id = [];
              }
            });
            this.getName(house_id,true);
            this.totalNumCollect = res.data.data.count;
            if (res.data.data.data.length < 1) {
              this.collectStatus = "暂无数据";
              this.collectTableData = [];
              this.totalNumCollect = 0;
            }
          } else {
            this.collectTableData = [];
            this.totalNumCollect = 0;
            this.collectStatus = '暂无数据';
          }
        });
      },
      getRentTableData() {
        this.rentStatus = ' ';
        this.rentLoading = true;
        if (!this.paramsRent.time) {
          this.paramsRent.time = [];
        }
        this.$http.get(globalConfig.server + 'customer/reimbursement', {params: this.paramsRent}).then((res) => {
          this.isHigh = false;
          this.rentLoading = false;
          if (res.data.code === '30000') {
            this.rentTableData = res.data.data.data;
            let house_id = [];
            res.data.data.data.map((item)=>{
              if(item.contracts){
                house_id.push(item.contracts.house_id);
              }else{
                house_id = [];
              }
            });
            this.getName(house_id,false);
            this.totalNumRent = res.data.data.count;
            if (res.data.data.data.length < 1) {
              this.rentStatus = "暂无数据";
              this.rentTableData = [];
              this.totalNumRent = 0;
            }
          } else {
            this.rentTableData = [];
            this.totalNumRent = 0;
            this.rentStatus = '暂无数据';
          }
        });
      },
      // 员工筛选
      chooseStaff() {
        this.organizeVisible = true;
        this.organizeType = 'staff';
      },
      //选择部门
      chooseDepart(){
        this.organizeVisible = true;
        this.organizeType = ''
      },
      // 清空员工
      closeStaff() {
        if (this.activeName === 'first') {
          this.paramsCollect.staff_id = '';
          this.staff_name_collect = '';
        } else {
          this.paramsRent.staff_id = '';
          this.staff_name_rent = '';
        }
      },
      //清空部门
      closeDepart(){
        if(this.activeName === 'first'){
          this.paramsCollect.depart_id = '';
          this.depart_name_collect = '';
        }else{
          this.paramsRent.depart_id = '';
          this.depart_name_rent = '';
        }
      },
      selectMember(val) {
        if (this.activeName === 'first') {
          if(this.organizeType){
            this.paramsCollect.staff_id = val[0].id;
            this.staff_name_collect = val[0].name;
          }else{
            this.paramsCollect.depart_id = val[0].id;
            this.depart_name_collect = val[0].name
          }
        }else{
          if(this.organizeType){
            this.paramsRent.staff_id = val[0].id;
            this.staff_name_rent = val[0].name;
          }else{
            this.paramsRent.depart_id = val[0].id;
            this.depart_name_rent = val[0].name
          }
        }
      },
      closeModal(val) {
        if (val === 'onlyRenovate') {
          this.activeName === "first" ? this.getCollectTableData() : this.getRentTableData();
        } else {
          this.editReimbursementDialog = false;
          this.reimbursementDetailDialog = false;
          this.reimResultDialog = false;
          if (val === 'success') {
            this.activeName === "first" ? this.getCollectTableData() : this.getRentTableData();
          }
        }
      },
      closeOrganize() {
        this.organizeVisible = false;
      },
      // tabs标签页
      handleClick(tab, event) {
        if (this.activeName === "first") {
          this.module = 1;
          this.isRent = 0;
          // this.getCollectTableData();
        } else {
          this.module = 2;
          this.isRent = 1;
          // this.getRentTableData();
        }
      },
      search() {
        if (this.activeName === 'first') {
          this.paramsCollect.page = 1;
          this.getCollectTableData();
        } else {
          this.paramsRent.page = 1;
          this.getRentTableData();
        }
      },
      // 高级
      highGrade() {
        this.isHigh = !this.isHigh;
      },
      // 重置
      resetting() {
        if (this.activeName === 'first') {
          this.paramsCollect.time = [];
          this.paramsCollect.status = '';
          this.paramsCollect.source = '';
          this.paramsCollect.type = '';
          this.paramsCollect.staff_id = '';
          this.paramsCollect.depart_id = '';
          this.staff_name_collect = '';
          this.depart_name_collect = '';
        } else {
          this.paramsRent.time = [];
          this.paramsRent.status = '';
          this.paramsRent.source = '';
          this.paramsRent.type = '';
          this.paramsRent.staff_id = '';
          this.paramsRent.depart_id = '';
          this.staff_name_rent = '';
          this.depart_name_rent = '';
        }

      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        if (this.activeName === 'first') {
          this.paramsCollect.page = val;
          this.getCollectTableData();
        } else {
          this.paramsRent.page = val;
          this.getRentTableData();
        }
      },
      dblClickTable(row, event) {
        this.reimbursementId = row.id;
        this.reimbursementDetailDialog = true;
      },
      //右键
      houseMenu(row, event) {
        this.reimbursementId = row.id;
        let status = row.status.dictionary_name;
        if (row.results && row.results.id) {
          this.lists = [
            {
              clickIndex: 'edit_reimbursement', headIcon: 'el-icon-edit', label: '编辑报销单'
              , disabled: status !== '待处理' && status !== '处理中' && status !== '已驳回' && status !== '已拒绝'
            },
            {
              clickIndex: 'edit_reimbursement_result', headIcon: 'iconfont icon-bianjibaoxiaojieguo',
              label: '编辑报销结果', disabled: status !== '待处理' && status !== '处理中' && status !== '已驳回'
            },
            // {clickIndex: 'examine_reimbursement', headIcon: 'iconfont icon-shenhebaoxiao', label: '审核报销',disabled:status !=='待审核'},
            {clickIndex: 'upload_pay', headIcon: 'el-icon-plus', label: '上传付款凭证',},
            // {clickIndex: 'delete_reimbursement', headIcon: 'el-icon-delete', label: '删除报销单',},
          ];
        } else {
          this.lists = [
            {
              clickIndex: 'edit_reimbursement', headIcon: 'el-icon-edit', label: '编辑报销单'
              , disabled: status !== '待处理' && status !== '处理中' && status !== '已驳回' && status !== '已拒绝'
            },
            {
              clickIndex: 'add_reimbursement_result', headIcon: 'iconfont icon-zengjia1',
              label: '编辑报销结果', disabled: status !== '待处理' && status !== '处理中' && status !== '已驳回'
            },
            // {clickIndex: 'examine_reimbursement', headIcon: 'iconfont icon-shenhebaoxiao', label: '审核报销',disabled:status !=='待审核'},
            {clickIndex: 'upload_pay', headIcon: 'el-icon-plus', label: '上传付款凭证',},
            // {clickIndex: 'delete_reimbursement', headIcon: 'el-icon-delete', label: '删除报销单',},
          ];
        }
        this.contextMenuParam(event);
      },
      //右键回调
      clickEvent(val) {
        switch (val.clickIndex) {
          case 'edit_reimbursement':
            this.editReimbursementDialog = true;
            break;
          case 'delete_reimbursement':
            this.deleteRepair();
            break;
          case 'edit_reimbursement_result':
            this.reimResultDialog = true;
            this.resultType = 'edit';
            break;
          case 'add_reimbursement_result':
            this.reimResultDialog = true;
            this.resultType = 'add';
            break;
          case 'examine_reimbursement':
            this.examineStatusDialog = true;
            break;
          case 'upload_pay':
            this.uploadPayDialog = true;
            break;
        }
      },
      arrSplitToArray(json) {
        let arr = [];
        json.forEach(item => {
          arr.push(item.dictionary_name);
        });
        return arr;
      },
      deleteRepair() {
      },
      //关闭右键菜单
      closeMenu() {
        this.show = false;
      },
      //右键参数
      contextMenuParam(event) {
        //param: user right param
        let e = event || window.event;	//support firefox contextmenu
        this.show = false;
        this.rightMenuX = e.clientX + document.documentElement.scrollLeft - document.documentElement.clientLeft;
        this.rightMenuY = e.clientY + document.documentElement.scrollTop - document.documentElement.clientTop;
        event.preventDefault();
        event.stopPropagation();
        this.$nextTick(() => {
          this.show = true
        })
      },
      exportData() {
        let exportForm = {};
        if (this.activeName === 'first') {
          exportForm = {
            module: 1,
            time: this.paramsCollect.time,
            status: this.paramsCollect.status,
            source: this.paramsCollect.source,
            type: this.paramsCollect.type,
            staff_id: this.paramsCollect.staff_id
          };
        } else {
          exportForm = {
            module: 1,
            time: this.paramsRent.time,
            status: this.paramsRent.status,
            source: this.paramsRent.source,
            type: this.paramsRent.type,
            staff_id: this.paramsRent.staff_id
          };
        }
        this.$http.get(globalConfig.server + 'repaire/download', {params: exportForm}).then((res) => {
          if (res.data.code === '600201') {
            this.$notify.warning({
              title: '警告',
              message: res.data.msg
            });
          } else {
            this.$http.get(globalConfig.server + 'repaire/export', {
              responseType: 'arraybuffer',
              params: exportForm
            }).then((res) => { // 处理返回的文件流
              if (!res.data) {
                return;
              }
              let url = window.URL.createObjectURL(new Blob([res.data]));
              let link = document.createElement('a');
              link.style.display = 'a';
              link.href = url;
              link.setAttribute('download', 'excel.xls');
              document.body.appendChild(link);
              link.click();
            });
          }
        });

      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .info_label, .yellow_label, .orange_label, .red_label, .success_label {
    min-width: 70px;
    height: 28px;
    line-height: 28px;
  }
</style>
