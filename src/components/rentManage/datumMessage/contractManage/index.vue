<template>
  <div @click="show=false" @contextmenu="closeMenu">
    <div id="clientContainer">
      <div class="highRanking">
        <div class="tabsSearch">
          <el-form :inline="true" onsubmit="return false" size="mini">
            <el-form-item>
              <el-input v-model="params.search" placeholder="合同编号/地址/客户姓名/手机号" @keyup.enter.native="search()"
                        class="search_input" clearable>
                <el-button @click="search()" slot="append" type="primary" icon="el-icon-search"></el-button>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="highGrade">高级</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="viewIncompleteRecord">查看补齐记录</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="viewExamineRecord">查看审批报表</el-button>
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
                    <div class="el_col_label">部门</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-input v-model="department" @focus="selectDepart('depart')" readonly placeholder="选择部门">
                        <el-button slot="append" type="primary" @click="emptyDepart">清空</el-button>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">开单人</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-input v-model="staff" @focus="selectDepart('staff')" readonly placeholder="选择开单人">
                        <el-button slot="append" type="primary" @click="emptyStaff">清空</el-button>
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
                    <div class="el_col_label">上传时间</div>
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
                        value-format="yyyy-MM-dd"
                        :picker-options="pickerOptions">
                      </el-date-picker>
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
                        value-format="yyyy-MM-dd"
                        :picker-options="pickerOptions">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row class="el_row_border">
              <el-col :span="12" v-if="activeName == 'first' ">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">合同开始时间</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-date-picker
                        v-model="params.lord_start_time"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="yyyy-MM-dd"
                        :picker-options="pickerOptions">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12" v-if="activeName == 'first'">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">合同结束时间</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-date-picker
                        v-model="params.lord_end_time"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="yyyy-MM-dd"
                        :picker-options="pickerOptions">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12" v-if="activeName == 'second' ">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">合同开始时间</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-date-picker
                        v-model="params.renter_start_time"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="yyyy-MM-dd"
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
                        v-model="params.renter_end_time"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="yyyy-MM-dd"
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
                    <div class="el_col_label">是否上传合同</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-select v-model="params.un_upload" clearable>
                        <el-option key="0" label="否" value="0">否</el-option>
                        <el-option key="1" label="是" value="1">是</el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">审核状态</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-select v-model="params.doc_status" clearable placeholder="请选择">
                        <el-option v-for="(key,index) in doc_sta" :label="key.title" :value="key.value"
                                   :key="index"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row class="el_row_border">
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">回访状态</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-select v-model="params.visit_status" clearable placeholder="请选择">
                        <el-option v-for="(key,index) in visit_sta" :label="key.title" :value="key.value"
                                   :key="index"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">合同状态</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-select v-model="params.status" clearable>
                        <el-option key="1" label="未签约" value="1">未签约</el-option>
                        <el-option key="2" label="已签约" value="2">已签约</el-option>
                        <el-option key="3" label="快到期（60天内）" value="3">快到期（60天内）</el-option>
                        <el-option key="4" label="已结束" value="4">已结束</el-option>
                        <el-option key="5" label="已过期" value="5">已过期</el-option>
                        <el-option key="6" label="快到期（15天内）" value="6">快到期（15天内）</el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row class="el_row_border">
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">提交时间</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-date-picker
                        v-model="params.submit_time"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="yyyy-MM-dd"
                        :picker-options="pickerOptions">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">是否有备忘</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-select v-model="params.note" clearable placeholder="请选择">
                        <el-option key="1" label="无" value="1">无</el-option>
                        <el-option key="2" label="有" value="2">有</el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <div class="btnOperate">
              <el-button type="primary" size="mini" @click="highSearch">搜索</el-button>
              <el-button type="primary" size="mini" @click="resetAll">重置</el-button>
              <el-button type="primary" size="mini" @click="highGrade">取消</el-button>
            </div>
          </el-form>
        </div>
      </div>
      <div class="main">
        <div>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="收房合同" name="first">
              <div class="myTable">
                <el-table
                  :data="collectData"
                  :empty-text='rentStatus'
                  v-loading="rentLoading"
                  element-loading-text="拼命加载中"
                  element-loading-spinner="el-icon-loading"
                  element-loading-background="rgba(255, 255, 255, 0)"
                  @row-dblclick="dblClickTable"
                  @row-contextmenu='houseMenu'
                  style="width: 100%">
                  <el-table-column width="40" align="center">
                    <template slot-scope="scope">
                      <span
                        v-if="false">
                        <b style="color: red;">新</b>
                      </span>
                    </template>
                  </el-table-column>
                  <el-table-column width="40">
                    <template slot-scope="scope">
                  <span v-if="scope.row.contract_number&&checkContractData[scope.row.contract_number.toUpperCase()]">
                    <i class="el-icon-success" style="color: #6a8dfb"></i>
                  </span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    width="136px"
                    label="合同上传时间">
                    <template slot-scope="scope">
                      <span v-if="scope.row.contract_create_time">{{scope.row.contract_create_time}}</span>
                      <span v-if="!scope.row.contract_create_time">暂无</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="contract_number"
                    label="合同编号">
                    <template slot-scope="scope">
                      <span v-if="scope.row.contract_number">{{scope.row.contract_number}}</span>
                      <span v-if="!scope.row.contract_number">暂无</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="合同状态">
                    <template slot-scope="scope">
                      <span v-if="scope.row.status">{{scope.row.status}}</span>
                      <span v-if="!scope.row.status">暂无</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="合同性质">
                    <template slot-scope="scope">
                      <span v-if="scope.row.type">{{scope.row.type}}</span>
                      <span v-if="!scope.row.type">暂无</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="customer_name"
                    label="业主姓名">
                    <template slot-scope="scope">
                      <span v-if="scope.row.customer_name">{{scope.row.customer_name}}</span>
                      <span v-if="!scope.row.customer_name">暂无</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    label="地址">
                    <template slot-scope="scope">
                      <span v-if="scope.row.address">{{scope.row.address}}</span>
                      <span v-if="!scope.row.address">暂无</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="归属公司"
                    prop="corp_name"
                  >
                    <template slot-scope="scope">
                      <span v-if="scope.row.corp_name">{{scope.row.corp_name}}</span>
                      <span v-else>暂无</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="phone"
                    label="手机号码">
                    <template slot-scope="scope">
                      <span v-if="scope.row.phone">{{scope.row.phone}}</span>
                      <span v-if="!scope.row.phone">暂无</span>
                    </template>
                  </el-table-column>

                  <el-table-column
                    prop="end_date"
                    width="136px"
                    label="合同到期时间">
                    <template slot-scope="scope">
                      <span v-if="scope.row.end_date">{{scope.row.end_date}}</span>
                      <span v-if="!scope.row.end_date">暂无</span>
                    </template>
                  </el-table-column>

                  <el-table-column
                    width="80px;"
                    label="是否备忘">
                    <template slot-scope="scope">
                      <span v-if="scope.row.note">有</span>
                      <span v-if="!scope.row.note">/</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="staff_name"
                    width="80px;"
                    label="开单人">
                    <template slot-scope="scope">
                      <span v-if="scope.row.staff_name">{{scope.row.staff_name}}</span>
                      <span v-if="!scope.row.staff_name">暂无</span>
                    </template>
                  </el-table-column>

                  <el-table-column
                    label="负责人">
                    <template slot-scope="scope">
                      <span v-if="scope.row.leader_name">{{scope.row.leader_name}}</span>
                      <span v-else="">/</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="部门">
                    <template slot-scope="scope">
                      <span
                        v-if="scope.row.department_name">{{scope.row.department_name}}</span>
                      <span v-else>暂无</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="回访状态"
                    width="150">
                    <template slot-scope="scope">
                  <span v-if="scope.row.visit_status&&scope.row.visit_status.name">
                    {{scope.row.visit_status.name}}
                    <span
                      v-if="collectFeedback[scope.row.contract_id]">({{collectFeedback[scope.row.contract_id]}}条)</span>
                  </span>
                      <span v-else="">/</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="审核状态"
                    width="150">
                    <template slot-scope="scope">
                      <span v-if="scope.row.doc_status&&scope.row.doc_status.name">
                        <span v-if="scope.row.doc_status.id==1">
                          <span class="info_label">{{scope.row.doc_status.name}}</span>
                        </span>
                        <span v-if="scope.row.doc_status.id==2">
                          <span class="yellow_label">{{scope.row.doc_status.name}}</span>
                        </span>
                        <span v-if="scope.row.doc_status.id==3">
                          <span class="orange_label">{{scope.row.doc_status.name}}</span>
                        </span>
                        <span v-if="scope.row.doc_status.id==4">
                          <span class="success_label">{{scope.row.doc_status.name}}</span>
                        </span>
                      </span>
                      <span v-else="">/</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
            <el-tab-pane label="租房合同" name="second">
              <div class="myTable">
                <el-table
                  :data="rentData"
                  :empty-text='rentStatus'
                  v-loading="rentLoading"
                  element-loading-text="拼命加载中"
                  element-loading-spinner="el-icon-loading"
                  element-loading-background="rgba(255, 255, 255, 0)"
                  @row-dblclick="dblClickTable"
                  @row-contextmenu='houseMenu'
                  style="width: 100%">
                  <el-table-column width="40" align="center">
                    <template slot-scope="scope">
                      <span
                        v-if="false">
                        <b style="color: red;">新</b>
                      </span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    width="136px"
                    label="合同上传时间">
                    <template slot-scope="scope">
                      <span v-if="scope.row.contract_create_time">{{scope.row.contract_create_time}}</span>
                      <span v-if="!scope.row.contract_create_time">暂无</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="contract_number"
                    label="合同编号">
                    <template slot-scope="scope">
                      <span v-if="scope.row.contract_number">{{scope.row.contract_number}}</span>
                      <span v-if="!scope.row.contract_number">暂无</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="合同状态">
                    <template slot-scope="scope">
                      <span v-if="scope.row.status">{{scope.row.status}}</span>
                      <span v-if="!scope.row.status">暂无</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="合同性质">
                    <template slot-scope="scope">
                      <span v-if="scope.row.type">{{scope.row.type}}</span>
                      <span v-if="!scope.row.type">暂无</span>
                    </template>
                  </el-table-column>

                  <el-table-column
                    prop="customer_name"
                    label="租客姓名">
                    <template slot-scope="scope">
                      <span v-if="scope.row.customer_name">{{scope.row.customer_name}}</span>
                      <span v-if="!scope.row.customer_name">暂无</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    label="地址">

                    <template slot-scope="scope">
                      <span v-if="scope.row.address">{{scope.row.address}}</span>
                      <span v-if="!scope.row.address">暂无</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="归属公司"
                    prop="corp_name"
                  >
                    <template slot-scope="scope">
                      <span v-if="scope.row.corp_name">{{scope.row.corp_name}}</span>
                      <span v-else>暂无</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="phone"
                    label="手机号码">
                    <template slot-scope="scope">
                      <span v-if="scope.row.phone">{{scope.row.phone}}</span>
                      <span v-if="!scope.row.phone">暂无</span>
                    </template>
                  </el-table-column>

                  <el-table-column
                    prop="end_date"
                    width="136px"
                    label="合同到期时间">
                    <template slot-scope="scope">
                      <span v-if="scope.row.end_date">{{scope.row.end_date}}</span>
                      <span v-if="!scope.row.end_date">暂无</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    width="80px;"
                    label="是否备忘">
                    <template slot-scope="scope">
                      <span v-if="scope.row.note">有</span>
                      <span v-if="!scope.row.note">/</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="staff_name"
                    width="80px"
                    label="开单人">
                    <template slot-scope="scope">
                      <span v-if="scope.row.staff_name">{{scope.row.staff_name}}</span>
                      <span v-if="!scope.row.staff_name">暂无</span>
                    </template>
                  </el-table-column>

                  <el-table-column
                    prop="department_name"
                    label="部门">
                    <template slot-scope="scope">
                      <span
                        v-if="scope.row.department_name">{{scope.row.department_name}}</span>
                      <span v-else>暂无</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="负责人">
                    <template slot-scope="scope">
                      <span v-if="scope.row.leader_name">{{scope.row.leader_name}}</span>
                      <span v-else="">/</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="回访状态"
                    width="150">
                    <template slot-scope="scope">
                  <span v-if="scope.row.visit_status&&scope.row.visit_status.name">
                    {{scope.row.visit_status.name}}
                   <span v-if="rentFeedback[scope.row.contract_id]">({{rentFeedback[scope.row.contract_id]}}条)</span>
                  </span>
                      <span v-else="">/</span>
                    </template>
                  </el-table-column>

                  <el-table-column
                    label="审核状态"
                    width="150">
                    <template slot-scope="scope">
                      <span v-if="scope.row.doc_status&&scope.row.doc_status.name">
                        <span v-if="scope.row.doc_status.id==1">
                          <span class="info_label">{{scope.row.doc_status.name}}</span>
                        </span>
                        <span v-if="scope.row.doc_status.id==2">
                          <span class="yellow_label">{{scope.row.doc_status.name}}</span>
                        </span>
                        <span v-if="scope.row.doc_status.id==3">
                          <span class="orange_label">{{scope.row.doc_status.name}}</span>
                        </span>
                        <span v-if="scope.row.doc_status.id==4">
                          <span class="success_label">{{scope.row.doc_status.name}}</span>
                        </span>
                      </span>
                      <span v-else="">/</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
          </el-tabs>
          <div class="block pages">
            <div class="left">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="params.page"
                :page-size="12"
                layout="total, prev, pager, next, jumper"
                :total="totalNumbers">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>

      <!--模态框-->
      <div>
        <el-dialog :close-on-click-modal="false" title="合同备忘" :visible.sync="memoDialog" width="50%">
          <div>
            <el-table
              :data="memoTableData"
              :empty-text='incompleteStatus'
              v-loading="incompleteLoading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(255, 255, 255, 0)"
              style="width: 100%">
              <el-table-column
                prop="create_time"
                label="创建时间">
              </el-table-column>
              <el-table-column
                prop="contract_number"
                label="合同编号">
              </el-table-column>
              <el-table-column
                prop="house_name"
                label="房屋地址">
              </el-table-column>
              <el-table-column
                prop="update_time"
                label="资料补齐时间">
              </el-table-column>
              <el-table-column
                prop="content"
                label="备忘内容">
              </el-table-column>
              <el-table-column
                prop="receivers"
                label="接收人">
              </el-table-column>
              <el-table-column
                prop="sender"
                label="发送人">
              </el-table-column>
              <el-table-column
                prop="is_send"
                label="操作类型">
                <template slot-scope="scope">
                  <span v-if="scope.row.is_send===0">保存</span>
                  <span v-if="scope.row.is_send===1">发送</span>
                  <span v-if="scope.row.is_send===null">暂无</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button size="small" type="primary" @click="memoDialog = false">确&nbsp;定</el-button>
          </div>
        </el-dialog>
      </div>

      <div>
        <el-dialog :close-on-click-modal="false" title="修改记录" :visible.sync="leaseHistoryDialog" width="50%">
          <div>
            <el-table
              :data="leaseHistoryTableData"
              :empty-text='incompleteStatus'
              v-loading="incompleteLoading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(255, 255, 255, 0)"
              @row-dblclick="dblClickHistoryTable"
              style="width: 100%">
              <el-table-column
                prop="create_time"
                label="修改时间">
              </el-table-column>
              <el-table-column
                prop="sname"
                label="修改人">
              </el-table-column>
              <el-table-column
                prop="other.cate"
                label="合同类型">
                <template slot-scope="scope">
                  <span v-if="scope.row.other && scope.row.other.cate==='rent' ">租</span>
                  <span v-if="scope.row.other && scope.row.other.cate==='collect' ">收</span>
                  <span v-if="!(scope.row.other && scope.row.other.cate)">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="other.from"
                label="操作端">
                <template slot-scope="scope">
                  <span v-if="scope.row.other && scope.row.other.from==='PC' ">电脑</span>
                  <span v-if="scope.row.other && scope.row.other.from==='mobile' ">手机</span>
                  <span v-if="!(scope.row.other && scope.row.other.from)">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="other.operation"
                label="操作类型">
                <template slot-scope="scope">
                  <span v-if="scope.row.other && scope.row.other.operation==='add' ">新增</span>
                  <span v-if="scope.row.other && scope.row.other.operation==='update' ">修改</span>
                  <span v-if="!(scope.row.other && scope.row.other.operation)">暂无</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button size="small" type="primary" @click="leaseHistoryDialog = false">确&nbsp;定</el-button>
          </div>
        </el-dialog>
      </div>

    </div>
    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperateMore="clickEvent"></RightMenu>
    <Organization :organizationDialog="organizationDialog" :type="type" :length="length"
                  @close="closeOrganization" @selectMember="selectMember"></Organization>
    <!--编辑租客-->
    <EditRentInfo :editRentInfoDialog="editRentInfoDialog" :collectHouseId="collectHouseId"
                  :rentContractId="contractOperateId" @close="closeModal"></EditRentInfo>

    <EditHouseResources :editHouseResourcesDialog="editHouseResourcesDialog"
                        :collectContractId="contractOperateId" @close="closeModal"></EditHouseResources>
    <!-- 回访 -->
    <AddReturnvisit :addReturnvisitDialog="addReturnvisitDialog" :ToActiveName="ToActiveName"
                    :addReturnInfo="addReturnInfo"
                    @close="closeModal"></AddReturnvisit>
    <!--增加 收房维修单-->
    <AddCollectRepair :module="addCollectRepairDialog" :contract="addReturnInfo"
                      @close="closeModal"></AddCollectRepair>
    <!--增加 租房维修单-->
    <AddRentRepair :module="addRentRepairDialog" :contract="addReturnInfo"
                   @close="closeModal"></AddRentRepair>
    <!--增加工单-->
    <AddFollowUp :addFollowUpDialog="addFollowUpDialog" :contractModule="contractModule"
                 :houseData="houseData" @close="closeModal"></AddFollowUp>
    <EditAddress :editAddressDialog="editAddressDialog" :rentContractId="contractOperateId"
                 :collectHouseId="collectHouseId"
                 :houseAddress="houseAddress" @close="closeModal"></EditAddress>

  </div>
</template>

<script>
  import RightMenu from '../../../common/rightMenu.vue';
  import Organization from '../../../common/organization.vue';
  import EditRentInfo from '../../components/editRentInfo'
  import EditHouseResources from '../../components/editHouseResources'
  import AddReturnvisit from "../../customerService/ReturnVisitManage/addReturnvisit.vue";   //添加回访
  import EditAddress from '../../components/editAddress'
  import AddCollectRepair from '../../components/addCollectRepair.vue'                 //添加房东维修
  import AddRentRepair from '../../components/addRentRepair.vue'                       //添加租客维修
  import AddFollowUp from '../../components/addFollowUp.vue'                           //增加跟进记录

  export default {
    name: 'hello',
    components: {
      RightMenu,
      Organization,
      EditRentInfo,
      EditHouseResources,
      AddReturnvisit,
      EditAddress,
      AddCollectRepair,
      AddRentRepair,
      AddFollowUp
    },
    data() {
      return {
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],
        /***********/
        selectFlag: 1,
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        statisticDate: '',
        collectData: [],   //收房合同
        rentData: [],      //租房合同
        formInline: {
          name: '',
          house: '',
        },
        totalNumbers: 0,   //总数
        addReturnInfo: [],
        ToActiveName: "",
        params: {
          page: 1,
          limit: '12',
          search: '',      //模糊搜索
          publish_time: [],     //发布时间
          lord_start_time: [],  //收房合同开始时间
          lord_end_time: [],   //收房合同结束时间
          renter_start_time: [], // 租房合同开始时间
          renter_end_time: [], //租房合同结束时间
          sign_time: [],   // 签约日期
          un_upload: '',   // 是否上传合同
          org_id: '',  // 部门
          user_id: '',   //员工
          status: '',   // 房屋状态1:未签约， 2：已签约， 3：快到期（60天内）， 4：已结束， 5：已过期
          contract_index: '1',
          doc_status: '',
          visit_status: '',
          note: '', //有无备忘
          submit_time: [], //提交时间
        },
        doc_sta: [
          {
            value: 'draft',
            title: '等待提交',
          },
          {
            value: 'wait_contract_review',
            title: '合同审核员审核中',
          },
          {
            value: 'wait_house_review',
            title: '房屋审核员审核中',
          },
          {
            value: 'published',
            title: '已通过',
          },
        ],
        visit_sta: [
          {
            value: 'draft',
            title: '等待提交',
          },
          {
            value: 'wait_customer_service_review',
            title: '等待回访',
          },
          {
            value: 'published',
            title: '已回访',
          },
        ],
        department: '',
        staff: '',
        type: '',
        length: '',
        currentPage: 1,
        //模态框
        organizationDialog: false,
        activeName: 'first',
        isHigh: false,
        input: '',
        radio: '1',
        value: '',
        value1: '',
        rentStatus: ' ',
        rentLoading: false,
        memoDialog: false, //备忘模态框
        memoTableData: [],
        incompleteStatus: ' ',
        incompleteLoading: false,
        is_rent: 0,
        selectContractId: '',
        contractModule: '',
        contractOperateId: '',
        houseAddress: '',

        editHouseResourcesDialog: false,
        editRentInfoDialog: false,
        editAddressDialog: false,
        collectHouseId: '',

        collectNumberArray: [],
        checkContractData: [],
        addCollectRepairDialog: false,    //房东添加维修
        addRentRepairDialog: false,       //租客添加维修
        addFollowUpDialog: false,     //添加工单
        addReturnvisitDialog: false,
        leaseHistoryDialog: false,
        leaseHistoryTableData: [],

        collectFeedback: {},
        rentFeedback: {},
        houseData: {},
        cities: [], //城市
      }
    },
    mounted() {
      this.collectDatafunc();
    },
    created() {
      this.getDictionary()
    },
    watch: {
      memoDialog(val) {
        if (val) {
          this.incompleteStatus = " ";
          this.incompleteLoading = true;
          this.$http.get(globalConfig.server + 'lease/note/index?limit=500&is_rent=' + this.is_rent + '&contract_id=' + this.selectContractId).then((res) => {
            this.incompleteLoading = false;
            if (res.data.code === '60510') {
              this.memoTableData = res.data.data;
              if (res.data.data.length < 1) {
                this.incompleteStatus = "暂无数据";
                this.tableData = [];
                this.totalNum = 0;
              }
            } else {
              this.incompleteStatus = "暂无数据";
              this.memoTableData = [];
            }
          });
        }
      },
      activeName(val) {
        if (val === 'first') {
          this.is_rent = 0;
        } else {
          this.is_rent = 1;
        }
      },
      leaseHistoryDialog(val) {
        if (val) {
          this.incompleteStatus = " ";
          this.incompleteLoading = true;
          if (this.activeName === 'first') {
            this.$http.get(globalConfig.server + 'lease/collect/history?limit=100&page=1&contract_id=' + this.selectContractId).then((res) => {
              this.incompleteLoading = false;
              if (res.data.code === '61010') {
                this.leaseHistoryTableData = res.data.data;
                if (res.data.data.length < 1) {
                  this.incompleteStatus = "暂无数据";
                  this.leaseHistoryTableData = [];
                  this.totalNum = 0;
                }
              } else {
                this.incompleteStatus = "暂无数据";
                this.leaseHistoryTableData = [];
              }
            });
          } else {
            this.$http.get(globalConfig.server + 'lease/rent/history?limit=100&page=1&contract_id=' + this.selectContractId).then((res) => {
              this.incompleteLoading = false;
              if (res.data.code === '61110') {
                this.leaseHistoryTableData = res.data.data;
                if (res.data.data.length < 1) {
                  this.incompleteStatus = "暂无数据";
                  this.leaseHistoryTableData = [];
                  this.totalNum = 0;
                }
              } else {
                this.incompleteStatus = "暂无数据";
                this.leaseHistoryTableData = [];
              }
            });
          }

        }
      }
    },
    methods: {
      closeModal(val) {
        this.editRentInfoDialog = false;
        this.editAddressDialog = false;
        this.editHouseResourcesDialog = false;
        this.addReturnvisitDialog = false;
        this.addCollectRepairDialog = false;
        this.addRentRepairDialog = false;
        this.addFollowUpDialog = false;
        if (val === 'updateCollect') {
          this.collectDatafunc();
        } else if (val === 'updateRent') {
          this.rentDatafunc();
        }
      },
      selectMember(val) {
        if (this.type === 'depart') {
//          this.params.org_id = [];
//          let departNameArray = [];
//          if (val.length > 0) {
//            val.forEach((item) => {
//              this.params.org_id.push(item.id);
//              departNameArray.push(item.name);
//            });
//          }
//          this.department = departNameArray.join(',');
//          this.type = null;

          this.params.org_id = val[0].id;
          this.department = val[0].name;
        } else {
          this.params.user_id = val[0].id;
          this.staff = val[0].name;
        }
        this.organizationDialog = false;
      },
      openAddressDialog() {
        this.addressDialog = true;
      },
      closeAddressDialog(val) {
        this.addressDialog = false;
        if (val) {
          this.params.search = val.address;
        }
      },
      //查看补齐记录，跳转页面
      viewIncompleteRecord() {
        this.$router.push({path: '/incompleteRecord', query: {active: this.activeName}});
      },
      //查看审批报表，跳转页面
      viewExamineRecord() {
        this.$router.push({path: '/examineRecord', query: {active: this.activeName}});
      },
      search() {
        if (this.activeName === "first") {
          this.params.page = 1;
          this.collectDatafunc();
        } else if (this.activeName === "second") {
          this.params.page = 1;
          this.rentDatafunc();
        }
      },
      highSearch() {
        this.isHigh = !this.isHigh;
        this.search();
      },
      collectDatafunc() {
        this.rentStatus = " ";
        this.rentLoading = true;
        this.$http.get(globalConfig.server + 'lease/collect', {params: this.params}).then((res) => {
          this.rentLoading = false;
          if (res.data.code === '61010') {
            this.collectData = res.data.data;
            this.totalNumbers = res.data.meta.total;

            this.collectNumberArray = [];
            this.collectData.forEach((item) => {
              this.collectNumberArray.push(item.contract_number);
            });
            let collectIdArray = '';
            this.collectData.forEach((item) => {
              collectIdArray += item.contract_id + ',';
            });
            this.checkHandIn();
            this.getReturnNumber(collectIdArray, 1);

            if (!res.data.data.length) {
              this.collectData = [];
              this.rentStatus = '暂无数据';
              this.totalNumbers = 0;
            }
          } else {
            this.collectData = [];
            this.rentStatus = '暂无数据';
            this.totalNumbers = 0;
          }
        })
      },

      //判斷合同是否上繳
      checkHandIn() {
        this.$http.post(globalConfig.server + 'contract/number/check', {
          contracts: this.collectNumberArray,
        }).then((res) => {
          if (res.data.code === '20000') {
            this.checkContractData = res.data.data;
          } else {
            this.checkContractData = {};
          }
        })
      },
      getReturnNumber(collectIdArray, type) {
        this.$http.get(globalConfig.server + 'contract/feedback/num', {
          params: {
            contract_ids: collectIdArray,
            module: type,
          }
        }).then((res) => {
          if (res.data.code === '1212200') {
            if (type == 1) {
              this.collectFeedback = res.data.data;
            } else if (type == 2) {
              this.rentFeedback = res.data.data;
            }
          }
        });
      },
      rentDatafunc() {
        this.rentStatus = " ";
        this.rentLoading = true;
        this.$http.get(globalConfig.server + 'lease/rent', {params: this.params}).then((res) => {
          this.rentLoading = false;
          if (res.data.code === '61010') {
            this.rentData = res.data.data;
            this.totalNumbers = res.data.meta.total;

            let collectIdArray = '';
            this.rentData.forEach((item) => {
              collectIdArray += item.contract_id + ',';
            });
            this.getReturnNumber(collectIdArray, 2);
            if (res.data.data.length < 1) {
              this.collectData = [];
              this.rentStatus = '暂无数据';
              this.totalNumbers = 0;
            }
          } else {
            this.rentData = [];
            this.rentStatus = '暂无数据';
            this.totalNumbers = 0;
          }
        })
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.params.page = val;
        if (this.activeName === "first") {
          this.collectDatafunc();
        }
        else if (this.activeName === "second") {
          this.rentDatafunc();
        }
      },
      dblClickHistoryTable(row, event) {
        if (this.activeName === 'first') {
          const {href} = this.$router.resolve({path: '/historyCollectDetail', query: {id: row.id}});
          window.open(href, '_blank', 'width=1920,height=1080');
        } else if (this.activeName === 'second') {
          const {href} = this.$router.resolve({path: '/historyRentingDetail', query: {id: row.id}});
          window.open(href, '_blank', 'width=1920,height=1080');
        }
      },
      dblClickTable(row, event) {  //双击详情
        if (this.activeName === 'first') {
          const {href} = this.$router.resolve({path: '/collectDetail', query: {id: row.contract_id}});
          window.open(href, '_blank', 'width=1920,height=1080');
        } else if (this.activeName === 'second') {
          const {href} = this.$router.resolve({path: '/rentingDetail', query: {id: row.contract_id}});
          window.open(href, '_blank', 'width=1920,height=1080');
        }

      },
      matchDictionary(id) {
        let dictionary_name = null;
        this.pay_way_dic.map((item) => {
          if (item.id == id) {
            dictionary_name = item.dictionary_name;
          }
        });
        return dictionary_name;
      },
      getDictionary() {
        this.dictionary(443, 1).then((res) => {
          this.pay_way_dic = res.data;
        });
        //城市
        this.dictionary(306, 1).then((res) => {
          this.cities = res.data;
        });
      },
      // 城市遍历
      forCity(cities, city) {
        let c = {};
        cities.forEach(res => {
          if (city.startsWith('500')) {
            if (res.variable.city_id.startsWith('500')) {
              c.id = res.id;
              c.name = res.dictionary_name;
            }
            return;
          }
          if (res.variable.city_id === city) {
            c.id = res.id;
            c.name = res.dictionary_name;
          }
        });
        console.log(c);
        return c;
      },
      // 工单/维修单 参数
      returnInfo(row) {
        let city = {};
        if (row.city) {
          city = this.forCity(this.cities, row.city);
        } else {
          city.id = '';
          city.name = '';
        }
        this.addReturnInfo = row;
        this.addReturnInfo.city_id = city.id;
        this.addReturnInfo.city_name = city.name;
        this.addReturnInfo.cities = this.cities;
        this.collectHouseId = row.house_id;
        this.collectContractId = row.contract_id;   //收房id
        this.contractOperateId = row.contract_id;   //通用合同ID
        this.houseAddress = row.address;
        this.houseData = {
          cities: this.cities,
          contract_id: row.contract_id,
          house_name: row.address,
          city_id: city.id,
          city_name: city.name,
        };
      },
      //房屋右键
      houseMenu(row, event) {
        this.contractModule = !this.is_rent ? 1 : 2;
        this.collectContractId = row.contract_id;   //收房id
        this.houseAddress = row.address;
        this.collectHouseId = row.house_id;   //收房id
        this.contractOperateId = row.contract_id;   //通用合同ID
        this.addReturnInfo = row;
        if (this.is_rent) {
          this.returnInfo(row);
          this.ToActiveName = "second";
          this.lists = [
            {
              clickIndex: 'editRentInfoDialog',
              headIcon: 'el-icon-edit',
              label: '修改租客信息',
              disabled: row.doc_status.id > 3
            },
            {clickIndex: 'editAddressDialog', headIcon: 'el-icon-edit', label: '修改租房地址'},
            {clickIndex: 'lookMemorandum', headIcon: 'el-icons-fa-eye', label: '查看合同备忘', contract_id: row.contract_id},
            {clickIndex: 'addReturnvisitDialog', headIcon: 'el-icons-fa-pencil-square-o', label: '增加回访记录'},
            {
              clickIndex: 'lookLeaseHistory',
              headIcon: 'el-icons-fa-eye',
              label: '查看合同修改记录',
              contract_id: row.contract_id
            },
            {clickIndex: 'addRentRepairDialog', headIcon: 'el-icons-fa-gear', label: '添加维修单',},
            {clickIndex: 'addFollowUpDialog', headIcon: 'el-icons-fa-plus', label: '添加工单',},
            {clickIndex: 'deleteRent', headIcon: 'el-icon-delete', label: '删除',},
          ];
        } else {
          this.returnInfo(row);
          this.ToActiveName = "first";
          this.lists = [
            {
              clickIndex: 'editHouseResourcesDialog',
              headIcon: 'el-icons-fa-home',
              label: '修改房源',
              disabled: row.doc_status.id > 3,
            },
            {clickIndex: 'lookMemorandum', headIcon: 'el-icons-fa-eye', label: '查看合同备忘', contract_id: row.contract_id},
            {clickIndex: 'addReturnvisitDialog', headIcon: 'el-icons-fa-pencil-square-o', label: '增加回访记录'},
            {
              clickIndex: 'lookLeaseHistory',
              headIcon: 'el-icons-fa-eye',
              label: '查看合同修改记录',
              contract_id: row.contract_id,
            },
            {clickIndex: 'addCollectRepairDialog', headIcon: 'el-icons-fa-gear', label: '添加维修单',},
            {clickIndex: 'addFollowUpDialog', headIcon: 'el-icons-fa-plus', label: '添加工单',},
            {clickIndex: 'deleteCollect', headIcon: 'el-icon-delete', label: '删除',},
          ];
        }
        this.contextMenuParam(event);
      },
      //右键回调事件
      clickEvent(val) {
        switch (val.clickIndex) {
          case 'lookMemorandum':
            this.memoDialog = true;
            this.selectContractId = val.contract_id;
            break;
          case 'editRentInfoDialog':         //修改租客信息
            this.editRentInfoDialog = true;
            break;
          case 'editAddressDialog':         //修改租客信息
            this.editAddressDialog = true;
            break;
          case 'editHouseResourcesDialog':   //修改房源信息
            this.editHouseResourcesDialog = true;
            break;
          case 'addReturnvisitDialog':   //回访记录
            this.addReturnvisitDialog = true;
            break;
          case 'addCollectRepairDialog':     //房东报修
            this.addCollectRepairDialog = true;
            break;
          case 'addRentRepairDialog':     //租客保修
            this.addRentRepairDialog = true;
            break;
          case 'addFollowUpDialog':     //增加跟进
            this.addFollowUpDialog = true;
            break;
          case 'lookLeaseHistory':
            this.leaseHistoryDialog = true;
            this.selectContractId = val.contract_id;
            break;
          case 'deleteRent':
            this.$confirm('此操作将永久删除该条目, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.deleteColumn('rent');
            }).catch(() => {
              this.prompt('warning', res.data.msg);
            });
            break;
          case 'deleteCollect':
            this.$confirm('此操作将永久删除该条目, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.deleteColumn('collect');
            }).catch(() => {
            });
            break;
        }
      },

      //删除合同
      deleteColumn(type) {
        if (type === 'collect') {
          this.$http.put(globalConfig.server + 'lease/collect/delete/' + this.contractOperateId).then((res) => {
            if (res.data.code === '61010') {
              this.prompt('success', res.data.msg);
              this.collectDatafunc();
            } else {
              this.prompt('warning', res.data.msg);
            }
          })
        } else {
          this.$http.put(globalConfig.server + 'lease/rent/delete/' + this.contractOperateId).then((res) => {
            if (res.data.code === '61110') {
              this.prompt('success', res.data.msg);
              this.rentDatafunc();
            } else {
              this.prompt('warning', res.data.msg);
            }
          })
        }

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
      selectDepart(val) {
        this.type = val;
        this.length = 1;
        this.organizationDialog = true;
      },
      emptyDepart() {
        this.department = '';
        this.params.org_id = '';
      },
      emptyStaff() {
        this.staff = '';
        this.params.user_id = '';
      },
      closeOrganization() {
        this.organizationDialog = false
      },
      selectStatus(flag) {
        this.selectFlag = flag;
      },
      // tabs标签页
      handleClick(tab, event) {
        this.params.page = 1;
        this.resetting();
        if (this.activeName == "first") {
          this.collectDatafunc();
        } else if (this.activeName == "second") {
          this.rentDatafunc();
        }
      },
      highGrade() {
        this.isHigh = !this.isHigh;
      },
      resetAll() {
        this.params.search = '';      //模糊搜索
        this.resetting();
      },
      resetting() {
        this.department = '';
        this.staff = '';
        this.params.publish_time = [];
        this.params.lord_start_time = [];
        this.params.lord_end_time = [];
        this.params.renter_start_time = [];
        this.params.renter_end_time = [];
        this.params.sign_time = [];
        this.params.un_upload = '';
        this.params.org_id = '';
        this.params.user_id = '';
        this.params.status = '';
        this.params.contract_index = '1';
        this.params.doc_status = '';
        this.params.visit_status = '';
        this.params.note = '';
        this.params.submit_time = [];
        this.isHigh = false;
        this.search();
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="">


  #clientContainer {
    min-height: 400px;

    .filter {
      padding-top: 10px;
    }
    .main {
      font-size: 12px;
      > div {
        .tableBottom {
          padding: 8px;
          display: flex;
          justify-content: flex-end;
          .right {
            display: flex;
            align-items: center;
            div {
              width: 100px;
              text-align: center;
              span {
                color: #fb529f;
              }
              &:first-child {
                border-right: 1px solid #ccc;
              }
            }
          }
        }
      }
    }
  }
</style>
