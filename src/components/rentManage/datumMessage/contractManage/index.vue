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
            <el-form-item>
              <el-button type="success" size="mini" @click="handleAllotDepart(currentAllot)">分配</el-button>
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
                    <div class="el_col_label">行政审核</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-select v-model="params.verify_status" clearable placeholder="请选择">
                        <el-option v-for="(key,index) in administrativeReviewList" :label="key.title" :value="key.value"
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
                        <el-option key="6" label="快到期（15天内）" value="6">快到期（15天内）</el-option>
                        <el-option v-if="this.is_rent ? false : true" key="7" label="90天内" value="7">90天内</el-option>
                        <el-option key="4" label="已结束" value="4">已结束</el-option>
                        <el-option key="5" label="已过期" value="5">已过期</el-option>
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
              <el-button type="primary" size="mini" @click="outNumber">导出</el-button>
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
                  ref="collectMultipleTable"
                  :empty-text='rentStatus'
                  v-loading="rentLoading"
                  element-loading-text="拼命加载中"
                  element-loading-spinner="el-icon-loading"
                  element-loading-background="rgba(255, 255, 255, 0)"
                  @row-dblclick="dblClickTable"
                  @cell-click="showComplainList"
                  @row-contextmenu='houseMenu'
                  @selection-change="handleSelection"
                  @cell-mouse-enter="cellMouseEnter"
                  @cell-mouse-leave="cellMouseLeave"
                  style="width: 100%">
                  <el-table-column
                    type="selection"
                    width="50">
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
                      <div>
                        <span v-if="scope.row.annotations" style="color: red;">!</span>
                        <el-tooltip placement="bottom" v-if="scope.row.annotations && scope.row.annotations.content">
                          <div slot="content">
                            {{ scope.row.annotations.content }}
                          </div>
                          <span>
                            <div class="notice" :class="{isShow: scope.row.contract_id === showNotice ? '' : 'yes'}" @click.stop="handlePullBlack(scope)">
                              <span style="color: white;">移出黑名单</span>
                            </div>
                            <span v-if="scope.row.customer_name"><a style="color: #409EFF;">{{ scope.row.customer_name }}</a></span>
                            <span v-if="!scope.row.customer_name">暂无</span>
                          </span>
                        </el-tooltip>
                        <span v-else-if="scope.row.customer_name">
                          <span style="color: #409EFF;">{{ scope.row.customer_name }}</span>
                          <div class="notice" :class="{isShow: scope.row.contract_id === showNotice ? '' : 'yes'}" @click.stop="handlePullBlack(scope)">
                            <span style="color: white;" v-if="scope.row.annotations && !scope.row.annotations.content">移出黑名单</span>
                            <span style="color: #F56C6C;" v-else>拉入黑名单</span>
                          </div>
                        </span>
                        <span v-else>暂无</span>
                      </div>
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
                    min-width="120px"
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
                    prop="work_order"
                    width="80px"
                    label="投诉">
                    <template slot-scope="scope">
                      <span v-if="scope.row.work_order" class="complain">{{scope.row.work_order}}</span>
                      <div v-if="scope.row.work_order" class="lookOver">查看</div>
                      <span v-if="!scope.row.work_order" class="complain">0</span>
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
                    label="最新提交人"
                  >
                    <template slot-scope="scope">
                      <span v-if="scope.row.submit_staff_info && scope.row.submit_staff_info.name">{{ scope.row.submit_staff_info.name }}</span>
                       <span v-else>/</span>
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
                  <!-- 新增部分=================================== -->
                  <el-table-column label="行政审核">
                    <template  slot-scope="scope">
                      <span @click="getImage(scope.row.address, scope.row.contract_id)" style="color: rgb(106, 141, 251); cursor: pointer;">{{scope.row.verify_status.name}}</span>
                    </template>
                  </el-table-column>
                  <!-- ========================================= -->
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
                <!-- 合同公司联录入弹窗框 -->
                <el-dialog title="合同公司联录入" :visible.sync="contractEntryDialog" width="70%" center class="contractPop" v-loading="contractEntryLoading"
                           element-loading-text="拼命加载中">
                  <!-- 合同照片 -->
                  <div class="contractPhoto">
                    <div style="color:#409EFF;">合同照片</div>
                    <div class="mask" v-if="differentShow !== 2"></div>
                    <!-- 放大图片 -->
                    <div class="image" @dragover='allowDrop($event)' id="certificate_photo">
                      <span v-if="imgList.length<1">暂无照片</span>
                      <img v-for="(value,key) in imgList" :key="key" :src="value"
                           data-magnify="" :data-src="value" @drag="currentPicId(key)">
                    </div>
                  </div>
                  <div style="overflow: hidden">
                    <div class="formInfo" style="width:70%; float: left;">
                      <div style="color: #409EFF;margin-bottom: 10px;">输入公司联合同信息</div>
                      <el-form size="mini" :model="contractForm" label-width="82px" ref="contractForm">
                        <!-- 收房行政审核 -->
                        <div >
                          <el-row>
                            <el-col :span="8">
                              <el-form-item  label="房屋住址" required>
                                <el-input class="input" v-model="contractForm.community_name" ></el-input>
                              </el-form-item>
                            </el-col>
                            <el-col :span="8">
                              <el-form-item  label="合同类型" required>
                                <el-input class="input" v-model="contractForm.type" ></el-input>
                              </el-form-item>
                            </el-col>
                            <el-col :span="8">
                              <el-form-item  label="合同编号" required>
                                <el-input class="input" v-model="contractForm.contract_number" ></el-input>
                              </el-form-item>
                            </el-col>
                          </el-row>
                          <el-row>
                            <el-col :span="12">
                              <el-form-item label="合同开始日期" required>
                                <el-date-picker v-model="contractForm.start_at"  type="date"  placeholder="选择日期" @focus="startAt" format="yyyy-MM-dd"></el-date-picker>
                              </el-form-item>
                            </el-col>
                            <el-col :span="12">
                              <el-form-item label="签约时长" required>
                                <el-input class="input" v-model="contractForm.contract_month" style="width:50%;float:left;">
                                  <template slot="append">
                                    <div>月</div>
                                  </template>
                                </el-input>
                                <el-input class="input" v-model="contractForm.contract_day" style="width:50%;float:left;">
                                  <template slot="append">
                                    <span>天</span>
                                  </template>
                                </el-input>
                              </el-form-item>
                            </el-col>
                          </el-row>
                          <el-row>
                            <el-col :span="12">
                              <el-form-item label="第一次打房租日期" required>
                                <el-date-picker v-model="contractForm.first_pay_at"  type="date"  placeholder="选择日期" @focus="startAt" format="yyyy-MM-dd"></el-date-picker>
                              </el-form-item>
                            </el-col>
                            <el-col :span="12">
                              <el-form-item label="第二次打房租日期" required>
                                <el-date-picker v-model="contractForm.second_pay_at"  type="date"  placeholder="选择日期" @focus="startAt" format="yyyy-MM-dd"></el-date-picker>
                              </el-form-item>
                            </el-col>
                          </el-row>
                          <el-row>
                            <el-col :span="8">
                              <el-form-item  label="押金" required>
                                <el-input class="input" v-model="contractForm.mortgage_price" ></el-input>
                              </el-form-item>
                            </el-col>
                            <el-col :span="8">
                              <el-form-item  label="违约金" required>
                                <el-input class="input" v-model="contractForm.penalty_price" ></el-input>
                              </el-form-item>
                            </el-col>
                            <el-col :span="8">
                              <el-form-item  label="空置期" required>
                                <el-input class="input" v-model="contractForm.ready_days" ></el-input>
                              </el-form-item>
                            </el-col>
                          </el-row>
                          <el-row>
                            <el-col :span="8">
                              <el-form-item label="房东姓名" required>
                                <el-input class="input" v-model="contractForm.customer_name" ></el-input>
                              </el-form-item>
                            </el-col>
                            <el-col :span="8">
                              <el-form-item label="联系方式" required>
                                <el-input class="input" v-model="contractForm.customer_phone" ></el-input>
                              </el-form-item>
                            </el-col>
                            <el-col :span="8">
                              <el-form-item label="卡号" required>
                                <el-input class="input" v-model="contractForm.customer_card" ></el-input>
                              </el-form-item>
                            </el-col>
                          </el-row>
                          <el-row v-for="index in newpriceLen" :key="index">
                            <el-col :span="14">
                              <el-form-item label="月单价" v-if="index==1" required>
                                <!-- <el-date-picker
                                  class="hiddenA"
                                  v-model="contractForm.unit_price[0][index-1]"
                                  type="daterange"
                                  align="right"
                                  unlink-panels
                                  format="yyyy-MM-dd"
                                  value-format="yyyy-MM-dd"
                                  range-separator="至"
                                  start-placeholder="开始日期"
                                  end-placeholder="结束日期"
                                  :picker-options="pickerOptions2"
                                  @change="priceChange(index-1)"
                                >
                                </el-date-picker> -->
                                <el-input v-model="contractForm.unit_price[0][index-1]" placeholder="请输入月份"></el-input>
                              </el-form-item>
                              <el-form-item v-if="index!=1" required>
                                <!-- <el-date-picker
                                  v-model="contractForm.unit_price[0][index-1]"
                                  type="daterange"
                                  align="right"
                                  unlink-panels
                                  format="yyyy-MM-dd"
                                  value-format="yyyy-MM-dd"
                                  range-separator="至"
                                  start-placeholder="开始日期"
                                  end-placeholder="结束日期"
                                  :picker-options="pickerOptions2"
                                  @change="priceChange(index-1)"
                                >
                                </el-date-picker> -->
                                <el-input v-model="contractForm.unit_price[0][index-1]" placeholder="请输入月份"></el-input>
                              </el-form-item>
                            </el-col>
                            <el-col :span="2" style="float: right;" v-if="index == 1">
                              <i @click="addPriceLen" class="el-icon-circle-plus-outline addicon"></i>
                            </el-col>
                            <el-col :span="2" style="float: right;" v-if="index != 1">
                              <i @click="romovePriceLen(index-1)" class="el-icon-remove-outline addicon"></i>
                            </el-col>
                            <el-col :span="6" style="float: right;">
                              <el-input size="mini" v-model="contractForm.unit_price[1][index-1]" placeholder="请输入价格"></el-input>
                            </el-col>
                          </el-row>
                          <el-row v-for="index in newpayForLen" :key="index+111">
                            <el-col :span="14">
                              <el-form-item label="付款方式" required v-if="index==1">
                                <!-- <el-date-picker
                                  v-model="contractForm.pay_type[0][index-1]"
                                  type="daterange"
                                  align="right"
                                  format="yyyy-MM-dd"
                                  value-format="yyyy-MM-dd"
                                  unlink-panels
                                  range-separator="至"
                                  start-placeholder="开始日期"
                                  end-placeholder="结束日期"
                                  :picker-options="pickerOptions2"
                                  @change="payTypeChange(index-1)">
                                </el-date-picker> -->
                                <el-input v-model="contractForm.pay_type[0][index-1]" placeholder="请输入月份"></el-input>
                              </el-form-item>
                              <el-form-item required v-if="index!=1">
                                <!-- <el-date-picker
                                  v-model="contractForm.pay_type[0][index-1]"
                                  type="daterange"
                                  align="right"
                                  format="yyyy-MM-dd"
                                  value-format="yyyy-MM-dd"
                                  unlink-panels
                                  range-separator="至"
                                  start-placeholder="开始日期"
                                  end-placeholder="结束日期"
                                  :picker-options="pickerOptions2"
                                  @change="payTypeChange(index-1)">
                                </el-date-picker> -->
                                <el-input v-model="contractForm.pay_type[0][index-1]" placeholder="请输入月份"></el-input>
                              </el-form-item>
                            </el-col>
                            <el-col :span="2" style="float: right;" v-if="index == 1">
                              <i @click="addPayLen" class="el-icon-circle-plus-outline addicon"></i>
                            </el-col>
                            <el-col :span="2" style="float: right;" v-if="index != 1">
                              <i @click="romovePayLen(index-1)" class="el-icon-remove-outline addicon"></i>
                            </el-col>
                            <el-col :span="6" style="float: right;" v-if=" activeName =='first'">
                              <el-select size="mini" v-model="contractForm.pay_type[1][index-1]" placeholder="收房付款方式" clearable>
                                <el-option v-for="item in newpayTypeInfo" :label="item.dictionary_name" :key="item.id"
                                           :value="item.id">{{item.dictionary_name}}
                                </el-option>
                              </el-select>
                            </el-col>
                            <!-- <el-col :span="6" style="float: right;" v-if=" activeName =='second'">
                              <span>押</span>
                              <el-select style="width:60px;" size="mini" v-model="contractForm.pay_type[1][index-1]" clearable>
                                <el-option v-for="item in 48" :label="item" :key="item"
                                          :value="item">
                                </el-option>
                              </el-select>
                              <span>付</span>
                              <el-input size="mini" style="width:46px;" v-model="contractForm.pay_type[2][index-1]"></el-input>
                            </el-col> -->
                          </el-row>
                          <el-row v-if=" activeName == 'second'">
                            <el-col :span="12">
                              <el-form-item label="已付金额" required>
                                <el-input v-model="contractForm.has_pay"></el-input>
                              </el-form-item>
                            </el-col>
                          </el-row>
                          <el-row v-for="index in newpayTypeLen" v-if="activeName == 'second'" :key="index+222">
                            <el-col :span="12">
                              <el-form-item label="支付方式" required>
                                <el-select v-model="contractForm.pay_method[0][index-1]" placeholder="请选择" clearable>
                                  <el-option v-for="item in payTypeCategory" :label="item.dictionary_name" :key="item.id"
                                             :value="item.id">{{item.dictionary_name}}
                                  </el-option>
                                </el-select>
                              </el-form-item>
                            </el-col>
                            <el-col :span="2" style="float: right;" v-if="index == 1">
                              <i @click="addPayTypeLen" class="el-icon-circle-plus-outline addicon"></i>
                            </el-col>
                            <el-col :span="2" style="float: right;" v-if="index != 1">
                              <i @click="romovePayTypeLen(index-1)" class="el-icon-remove-outline addicon"></i>
                            </el-col>
                            <el-col :span="10" style="float: right;">
                              <el-form-item label="金额">
                                <el-input size="mini" v-model="contractForm.pay_method[1][index-1]" placeholder="请输入价格"></el-input>
                              </el-form-item>
                            </el-col>
                          </el-row>
                          <el-row>
                            <el-form-item>
                              <div style="text-align: right;">
                                <!-- <el-button type="primary"  size="mini" @click="lookContractDetails" v-if="showMask.showBtn">查看合同详情</el-button> -->
                                <el-button type="primary"  size="mini" @click="lookContractDetails" v-if="differentShow == 2" :disabled="allBtn">查看合同详情</el-button>
                                <el-button type="primary"  size="mini" @click="newBouncing('1')" :disabled="allBtn">对比</el-button>
                              </div>
                            </el-form-item>
                          </el-row>
                        </div>
                      </el-form>

                    </div>
                    <div class="companyClient" style="width:25%; float: left;padding-left: 20px;">
                      <div style="color: #409EFF; margin-bottom: 10px;">对比公司联和客户联合同</div>
                      <div style="min-height: 240px;">
                        <el-input v-model="clientForm.content" type="textarea" :rows="10" ></el-input>
                      </div>
                      <el-row>
                        <el-col :span="8">
                          <span>选择通知人</span>
                        </el-col>
                        <el-col :span="16">
                          <el-input v-model="alertPepole" readonly="" @focus="getAlertOthers()" size="mini">
                            <el-button slot="append" type="primary" @click="emptyFollowPeople">清空</el-button>
                          </el-input>
                        </el-col>
                      </el-row>
                      <div style="text-align: center;margin-top: 20px;">
                        <el-button type="primary" size="mini" @click="sendPepole">发送</el-button>
                        <el-button type="primary" size="mini" @click="sendHistory">查看发送历史</el-button>
                      </div>
                    </div>
                  </div>
                  <Organization :organizationDialog="alertOthers" :type="alertType"  @close="alertCloseOrganization" @selectMember="alertSelectMember"></Organization>
                  <!-- 对比不同显示 -->
                  <div class="differentContrast" v-if="Inconsistent" style="width: 50%; overflow: hidden;">
                    <div>对比详情:</div>
                    <el-card class="box-card" style="width: 80%;float: left;margin-left: 16px;">
                      <p style="color: #f55d54">不一致如下：</p>
                      <ul>
                        <li v-for="(item, index) in differentContrast" :key="index" class="text item">{{item}}</li>
                      </ul>
                    </el-card>
                  </div>
                  <!-- 查看发送历史 -->
                  <el-dialog title="查看发送历史"  :visible.sync="sendHistoryDialog" width="30%">
                    <el-table :data="sendHistoryList" height="250" border style="width: 100%">
                      <el-table-column prop="content" label="发送内容" width="180">
                      </el-table-column>
                      <el-table-column prop="update_time"  label="发送时间" width="180">
                      </el-table-column>
                      <el-table-column prop="uname" label="发送人">
                      </el-table-column>
                    </el-table>
                    <span slot="footer" class="dialog-footer">
                        <!-- <el-button @click="sendHistoryDialog = false" size="mini">取 消</el-button> -->
                        <el-button type="primary" @click="sendHistoryDialog = false" size="mini">确 定</el-button>
                      </span>
                  </el-dialog>
                  <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="newBouncing('2')" size="mini" :disabled="allBtn">保存页面</el-button>
                    <el-button type="primary" @click="passAll" size="mini" :disabled="allBtn">全部通过</el-button>
                    <el-button type="primary" @click="passAllNo" size="mini" style="background: red; border-color: red;" :disabled="allBtn">全部不通过</el-button>
                  </span>
                </el-dialog>
                <!-- ======================================================================== -->
              </div>
            </el-tab-pane>
            <el-tab-pane label="租房合同" name="second">
              <div class="myTable">
                <el-table
                  :data="rentData"
                  ref="rentMultipleTable"
                  :empty-text='rentStatus'
                  v-loading="rentLoading"
                  element-loading-text="拼命加载中"
                  element-loading-spinner="el-icon-loading"
                  element-loading-background="rgba(255, 255, 255, 0)"
                  @row-dblclick="dblClickTable"
                  @cell-click="showComplainList"
                  @row-contextmenu='houseMenu'
                  @selection-change="handleSelection"
                  @cell-mouse-enter="cellMouseEnter"
                  @cell-mouse-leave="cellMouseLeave"
                  style="width: 100%">
                  <el-table-column
                    type="selection"
                    width="55">
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
                      <div>
                        <span v-if="scope.row.annotations" style="color: red;">!</span>
                        <el-tooltip placement="bottom" v-if="scope.row.annotations && scope.row.annotations.content">
                          <div slot="content">
                            {{ scope.row.annotations.content }}
                          </div>
                          <span>
                            <div class="notice" :class="{isShow: scope.row.contract_id === showNotice ? '' : 'yes'}" @click.stop="handlePullBlack(scope)">
                              <span style="color: white;">移出黑名单</span>
                            </div>
                            <span v-if="scope.row.customer_name"><a style="color: #409EFF;">{{ scope.row.customer_name }}</a></span>
                            <span v-if="!scope.row.customer_name">暂无</span>
                          </span>
                        </el-tooltip>
                        <span v-else-if="scope.row.customer_name">
                          <span style="color: #409EFF;">{{ scope.row.customer_name }}</span>
                          <div class="notice" :class="{isShow: scope.row.contract_id === showNotice ? '' : 'yes'}" @click.stop="handlePullBlack(scope)">
                            <span style="color: white;" v-if="scope.row.annotations && !scope.row.annotations.content">移出黑名单</span>
                            <span style="color: #F56C6C;" v-else>拉入黑名单</span>
                          </div>
                        </span>
                        <span v-else>暂无</span>
                      </div>
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
                    min-width="120px;"
                  >
                    <template slot-scope="scope">
                      <span v-if="house_name && scope.row.house_id && house_name[scope.row.house_id]">{{house_name[scope.row.house_id].corp_name}}</span>
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
                    prop="work_order"
                    width="80px"
                    label="投诉">
                    <template slot-scope="scope">
                      <span v-if="scope.row.work_order" class="complain">{{scope.row.work_order}}</span>
                      <div v-if="scope.row.work_order" class="lookOver">查看</div>
                      <span v-if="!scope.row.work_order" class="complain">0</span>
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
                    label="最新提交人"
                  >
                    <template slot-scope="scope">
                      <span v-if="scope.row.submit_staff_info && scope.row.submit_staff_info.name">{{ scope.row.submit_staff_info.name }}</span>
                      <span v-else>/</span>
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
                  <!-- 新增部分=================================== -->
                  <el-table-column label="行政审核">
                    <template  slot-scope="scope">
                      <span @click="getImage2(scope.row.address, scope.row.contract_id)" style="color: rgb(106, 141, 251); cursor: pointer;">{{scope.row.verify_status.name}}</span>
                    </template>
                  </el-table-column>
                  <!-- ========================================= -->
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
                <!-- 租房行政审核 -->
                <el-dialog title="合同公司联录入" :visible.sync="contractEntryDialog2" width="70%" center class="contractPop" v-loading="contractEntryLoading2"
                           element-loading-text="拼命加载中">
                  <!-- 合同照片 -->
                  <div class="contractPhoto">
                    <div style="color:#409EFF; position: relative;">合同照片</div>
                    <div class="mask" v-if="differentShow2 !== 2"></div>
                    <!-- 放大图片 -->
                    <div class="image" @dragover='allowDrop($event)' id="certificate_photo">
                      <span v-if="imgList.length<1">暂无照片</span>
                      <img v-for="(value,key) in imgList2" :key="key" :src="value"
                           data-magnify="" :data-src="value" @drag="currentPicId(key)">
                    </div>
                  </div>
                  <div style="overflow: hidden">
                    <div class="formInfo" style="width:70%; float: left;">
                      <div style="color: #409EFF;margin-bottom: 10px;">输入公司联合同信息</div>
                      <el-form size="mini" :model="contractForm2" label-width="82px" ref="contractForm2">
                        <!-- 输入公司联合同信息 -->
                        <div >
                          <el-row>
                            <el-col :span="8">
                              <el-form-item  label="房屋住址" required>
                                <el-input class="input" v-model="contractForm2.community_name" ></el-input>
                              </el-form-item>
                            </el-col>
                            <el-col :span="8">
                              <el-form-item  label="合同类型" required>
                                <el-input class="input" v-model="contractForm2.type" ></el-input>
                              </el-form-item>
                            </el-col>
                            <el-col :span="8">
                              <el-form-item  label="合同编号" required>
                                <el-input class="input" v-model="contractForm2.contract_number" ></el-input>
                              </el-form-item>
                            </el-col>
                          </el-row>
                          <el-row>
                            <el-col :span="8">
                              <el-form-item label="合同开始日期" required>
                                <el-date-picker v-model="contractForm2.start_at"  type="date"  placeholder="选择日期" @focus="startAt" format="yyyy-MM-dd"></el-date-picker>
                              </el-form-item>
                            </el-col>
                            <el-col :span="8">
                              <el-form-item label="签约时长" required>
                                <el-input class="input" v-model="contractForm2.contract_month" style="width:50%;float:left;">
                                  <template slot="append">
                                    <div>月</div>
                                  </template>
                                </el-input>
                                <el-input class="input" v-model="contractForm2.contract_day" style="width:50%;float:left;">
                                  <template slot="append">
                                    <span>天</span>
                                  </template>
                                </el-input>
                              </el-form-item>
                            </el-col>
                            <el-col :span="8">
                              <el-form-item  label="押金" required>
                                <el-input class="input" v-model="contractForm2.mortgage_price" ></el-input>
                              </el-form-item>
                            </el-col>
                          </el-row>
                          <el-row>
                            <el-col :span="8">
                              <el-form-item label="租客信息" required>
                                <el-input class="input" v-model="contractForm2.customer_name" ></el-input>
                              </el-form-item>
                            </el-col>
                            <el-col :span="8">
                              <el-form-item label="联系方式" required>
                                <el-input class="input" v-model="contractForm2.customer_phone" ></el-input>
                              </el-form-item>
                            </el-col>
                          </el-row>

                          <el-row v-for="index in newpriceLen" :key="index">
                            <el-col :span="14">
                              <el-form-item label="月单价" v-if="index==1" required>
                                <!-- <el-date-picker
                                  class="hiddenA"
                                  v-model="contractForm2.unit_price[0][index-1]"
                                  type="daterange"
                                  align="right"
                                  unlink-panels
                                  format="yyyy-MM-dd"
                                  value-format="yyyy-MM-dd"
                                  range-separator="至"
                                  start-placeholder="开始日期"
                                  end-placeholder="结束日期"
                                  :picker-options="pickerOptions2"
                                  @change="priceChange(index-1)"
                                >
                                </el-date-picker> -->
                                <el-input v-model="contractForm2.unit_price[0][index-1]" placeholder="请输入月份"></el-input>
                              </el-form-item>
                              <el-form-item v-if="index!=1" required>
                                <!-- <el-date-picker
                                  v-model="contractForm2.unit_price[0][index-1]"
                                  type="daterange"
                                  align="right"
                                  unlink-panels
                                  format="yyyy-MM-dd"
                                  value-format="yyyy-MM-dd"
                                  range-separator="至"
                                  start-placeholder="开始日期"
                                  end-placeholder="结束日期"
                                  :picker-options="pickerOptions2"
                                  @change="priceChange(index-1)"
                                >
                                </el-date-picker> -->
                                <el-input v-model="contractForm2.unit_price[0][index-1]" placeholder="请输入月份"></el-input>
                              </el-form-item>
                            </el-col>
                            <el-col :span="2" style="float: right;" v-if="index == 1">
                              <i @click="addPriceLen" class="el-icon-circle-plus-outline addicon"></i>
                            </el-col>
                            <el-col :span="2" style="float: right;" v-if="index != 1">
                              <i @click="romovePriceLen(index-1)" class="el-icon-remove-outline addicon"></i>
                            </el-col>
                            <el-col :span="6" style="float: right;">
                              <el-input size="mini" v-model="contractForm2.unit_price[1][index-1]" placeholder="请输入价格"></el-input>
                            </el-col>
                          </el-row>
                          <el-row v-for="index in newpayForLen" :key="index+111">
                            <el-col :span="14">
                              <el-form-item label="付款方式" required v-if="index==1">
                                <!-- <el-date-picker
                                  v-model="contractForm2.pay_type[0][index-1]"
                                  type="daterange"
                                  align="right"
                                  format="yyyy-MM-dd"
                                  value-format="yyyy-MM-dd"
                                  unlink-panels
                                  range-separator="至"
                                  start-placeholder="开始日期"
                                  end-placeholder="结束日期"
                                  :picker-options="pickerOptions2"
                                  @change="payTypeChange(index-1)">
                                </el-date-picker> -->
                                <el-input v-model="contractForm2.pay_type[0][index-1]" placeholder="请输入月份"></el-input>
                              </el-form-item>
                              <el-form-item required v-if="index!=1">
                                <!-- <el-date-picker
                                  v-model="contractForm2.pay_type[0][index-1]"
                                  type="daterange"
                                  align="right"
                                  format="yyyy-MM-dd"
                                  value-format="yyyy-MM-dd"
                                  unlink-panels
                                  range-separator="至"
                                  start-placeholder="开始日期"
                                  end-placeholder="结束日期"
                                  :picker-options="pickerOptions2"
                                  @change="payTypeChange(index-1)">
                                </el-date-picker> -->
                                <el-input v-model="contractForm2.pay_type[0][index-1]" placeholder="请输入月份"></el-input>
                              </el-form-item>
                            </el-col>
                            <el-col :span="2" style="float: right;" v-if="index == 1">
                              <i @click="addPayLen" class="el-icon-circle-plus-outline addicon"></i>
                            </el-col>
                            <el-col :span="2" style="float: right;" v-if="index != 1">
                              <i @click="romovePayLen(index-1)" class="el-icon-remove-outline addicon"></i>
                            </el-col>
                            <!--  <el-col :span="4" style="float: right;" v-if=" activeName2 =='first'">
                              <el-select size="mini" v-model="contractForm2.pay_type[1][index-1]" placeholder="收房付款方式" clearable>
                                <el-option v-for="item in newpayTypeInfo" :label="item.dictionary_name" :key="item.id"
                                          :value="item.id">{{item.dictionary_name}}
                                </el-option>
                              </el-select>
                            </el-col> -->
                            <el-col :span="8"  style="float: right; text-align: right;">
                              <span>押</span>
                              <el-select style="width:60px;" size="mini" v-model="contractForm2.pay_type[1][index-1]" clearable>
                                <el-option v-for="(item, index) in yaNum" :label="item.label" :key="index"
                                           :value="item.value">
                                </el-option>
                              </el-select>
                              <span>付</span>
                              <el-input size="mini" style="width:46px;" v-model="contractForm2.pay_type[2][index-1]"></el-input>
                            </el-col>
                          </el-row>

                        </div>
                      </el-form>
                      <div style="text-align: right;">
                        <el-button type="primary"  size="mini" @click="lookContractDetails2" v-if="differentShow2 == 2" :disabled="allBtn">查看合同详情</el-button>
                        <el-button type="primary"  size="mini" @click="newBouncing2('1')" :disabled="allBtn">对比</el-button>
                      </div>
                    </div>
                    <div class="companyClient" style="width:25%; float: left;padding-left: 20px;">
                      <div style="color: #409EFF; margin-bottom: 10px;">对比公司联和客户联合同</div>
                      <div style="min-height: 240px;">
                        <el-input v-model="clientForm2.content" type="textarea" :rows="10" ></el-input>
                      </div>
                      <el-row>
                        <el-col :span="8">
                          <span>选择通知人</span>
                        </el-col>
                        <el-col :span="16">
                          <el-input v-model="alertPepole2" readonly="" @focus="getAlertOthers2()" size="mini">
                            <el-button slot="append" type="primary" @click="emptyFollowPeople2">清空</el-button>
                          </el-input>
                        </el-col>
                      </el-row>
                      <div style="text-align: center;margin-top: 20px;">
                        <el-button type="primary" size="mini" @click="sendPepole2">发送</el-button>
                        <el-button type="primary" size="mini" @click="sendHistory2">查看发送历史</el-button>
                      </div>
                    </div>
                  </div>
                  <Organization :organizationDialog="alertOthers2" :type="alertType"  @close="alertCloseOrganization2" @selectMember="alertSelectMember2"></Organization>
                  <!-- 对比不同显示 -->
                  <div class="differentContrast" v-if="Inconsistent2" style="width: 50%; overflow: hidden;">
                    <div>对比详情:</div>
                    <el-card class="box-card" style="width: 80%;float: left;margin-left: 16px;">
                      <p style="color: #f55d54">不一致如下：</p>
                      <ul>
                        <li v-for="(item, index) in differentContrast2" :key="index" class="text item">{{item}}</li>
                      </ul>
                    </el-card>
                  </div>
                  <!-- 查看发送历史 -->
                  <el-dialog title="查看发送历史"  :visible.sync="sendHistoryDialog2" width="30%">
                    <el-table :data="sendHistoryList2" height="250" border style="width: 100%">
                      <el-table-column prop="content" label="发送内容" width="180">
                      </el-table-column>
                      <el-table-column prop="update_time"  label="发送时间" width="180">
                      </el-table-column>
                      <el-table-column prop="uname" label="发送人">
                      </el-table-column>
                    </el-table>
                    <!-- <div class="dialogPage block pages">
                      <el-pagination @size-change="dialogHandleSizeChange" @current-change="dialogHandleCurrentChange" :current-page="sendHistoryFrom2.page" :page-sizes="[12,24, 36,48]" :page-size="sendHistoryFrom2.limit" layout="total, sizes, prev, pager, next, jumper" :total="dialogTotal2">
                      </el-pagination>
                    </div> -->
                    <span slot="footer" class="dialog-footer">
                        <!-- <el-button @click="sendHistoryDialog = false" size="mini">取 消</el-button> -->
                        <el-button type="primary" @click="sendHistoryDialog2 = false" size="mini">确 定</el-button>
                      </span>
                  </el-dialog>
                  <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="newBouncing2('2')" size="mini" :disabled="allBtn">保存页面</el-button>
                    <el-button type="primary" @click="passAll2" size="mini" :disabled="allBtn">全部通过</el-button>
                    <el-button type="primary" @click="passAll2No" size="mini" style="background: red; border-color: red;" :disabled="allBtn">全部不通过</el-button>
                  </span>
                </el-dialog>
                <!-- =========================================================================== -->
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
    <!--投诉列表-->
    <ComplainList :complainListDialog="complainListDialog" :complainData="complainData" @close="closeModal">
    </ComplainList>
    <!--收房报销单-->
    <AddCollectReimbursement :addCollectReimbursementDialog="addCollectReimbursementDialog" :contract="addReturnInfo"
                             @close="closeModal"></AddCollectReimbursement>
    <!--租房报销单-->
    <AddRentReimbursement :addRentReimbursementDialog="addRentReimbursementDialog" :contract="addReturnInfo"
                          @close="closeModal"></AddRentReimbursement>

    <Organization :organizationDialog="allotVisible" :type="allotType" :length="allotLength"
                  @close="allotCloseOrganization" @selectMember="allotSelectMember"></Organization>
    <el-dialog
      :visible.sync="markInfoVisible"
      title="备注"
      width="20%"
    >
      <el-input type="textarea" :row="4" v-model="markInfo"></el-input>
      <div style="text-align: right;margin-top: 15px;">
        <el-button size="mini" @click="markInfoVisible = false">取消</el-button>
        <el-button type="primary" size="mini" @click="handleMarkInfo">确定</el-button>
      </div>
    </el-dialog>
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
  import ComplainList from '../../components/complainList'                             //投诉记录
  import AddCollectReimbursement from "../../components/addCollectReimbursement.vue";      //添加房屋报销单
  import AddRentReimbursement from "../../components/addRentReimbursement.vue";            //添加租客报销单

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
      AddFollowUp,
      ComplainList,
      AddCollectReimbursement,
      AddRentReimbursement
    },
    data() {
      return {
        showNotice: '',
        markInfoVisible: false,
        markInfo: '',
        currentScope: '',
        markShow: '',
        // 新增字段 ==========================
        // dialogTotal: "",
        // dialogTotal2: "",
        yaNum: [
          {value: "0", label: "0"},
          {value: "1", label: "1"},
          {value: "2", label: "2"},
          {value: "3", label: "3"},
          {value: "4", label: "4"},
          {value: "5", label: "5"},
          {value: "6", label: "6"},
          {value: "7", label: "7"},
          {value: "8", label: "8"},
          {value: "9", label: "9"},
          {value: "10", label: "10"},
        ],
        allBtn: true,
        contractEntryLoading2: false,
        contractEntryLoading: false,
        passAllForm: {
          contract_id: "",
          module: 1,
          operation: "",
        },
        passAllForm2: {
          contract_id: "",
          module: 2,
          operation: "",
        },
        sendHistoryDialog: false,
        sendHistoryList: [],
        sendHistoryDialog2: false,
        sendHistoryList2: [],
        clientForm: {
          uids: "",
          content: "",
          contract_id: "",
          module: 1,
        },
        clientForm2: {
          uids: "",
          content: "",
          contract_id: "",
          module: 2,
        },
        sendHistoryFrom: {
          page: "1",
          limit: "12",
          contract_id: "",
          module: 1
        },
        sendHistoryFrom2: {
          page: "1",
          limit: "12",
          contract_id: "",
          module: 2
        },
        alertPepole: "",
        alertPepoleList: [],
        alertPepole2: "",
        alertPepoleList2: [],
        alertType: "",
        alertOthers: false,
        alertOthers2: false,
        // alertLength: "",
        // alertOrg_id: "",
        differentContrast: [],
        differentContrast2: [],
        differentShow: "",
        differentShow2: "",
        Inconsistent: false,
        Inconsistent2: false,
        contractEntryDialog: false,
        contractEntryDialog2: false,
        // contrastContractDialog: false,
        // contrastContractDialog2: false,
        // confirmAgain: false,
        // contractEntry: false,
        // contrastContent: "",
        // contrastContentList: [],
        // administrativeContent: "",
        // administrativeContentList: [],
        contractForm: {
          // staff_id: "",
          contract_number: "",
          start_at: "",
          community_name: "",
          type: "",
          second_pay_at: "",
          first_pay_at: "",
          contract_month: "", //合同周期_月
          contract_day: "",   //合同周期_日
          // guarantee_month: "",//保修期_月
          // guarantee_day: "",  //保修期_日
          // originate: "",      //来源
          // agency: "",         //中介名称
          // agency_price: "",   //中介费用
          // agency_person: "",  //中介人
          // agency_tel: "",     //中介电话
          unit_price: [[],[],],      //月单价
          pay_type: [[], [],[],],       //付款方式
          pay_method: [[],[],],      //支付方式
          has_pay: "",        //已支付的费用
          contract_id: "",    //合同编号
          module: 1,
          customer_name: "",
          customer_phone: "",
          customer_card: "",
          mortgage_price: "",  // 押金
          penalty_price: "",   // 违约金
          ready_days: "",
        },
        contractForm2: {
          // staff_id: "",
          community_name: "",
          type: "",
          contract_number: "",
          start_at: "",
          contract_month: "",
          contract_day: "",
          mortgage_price: "",
          customer_name: "",
          customer_phone: "",
          contract_id: "",    //合同编号
          module: 2,
          unit_price: [[],[],],      //月单价
          pay_type: [[], [],[],],       //付款方式
          pay_method: [[],[],],      //支付方式
        },
        // responsiblePersonCategory: [],
        payTypeCategory: [],
        newpriceLen: 1,
        newpayForLen: 1,
        newpayTypeLen: 1,
        pickerOptions2: {
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
        // activeName: "first",
        // activeName2: "first",
        newpayTypeInfo: [],
        imgList: {},
        imgList2: {},
        // ==================================
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],
        /***********/
        // selectFlag: 1,
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
        // statisticDate: '',
        collectData: [],   //收房合同
        rentData: [],      //租房合同
        house_name: [],
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
          status: '',   // 房屋状态1:未签约， 2：已签约， 6：快到期（15天内）， 4：已结束， 5：已过期
          contract_index: '1',
          doc_status: '',
          visit_status: '',
          note: '', //有无备忘
          submit_time: [], //提交时间
          verify_status: '',
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
        administrativeReviewList: [
          {
            value: 'to_contract_review',
            title: '等待行政审核',
          },
          {
            value: 'published_verify',
            title: '行政审核已通过',
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
        // currentPage: 1,
        //模态框
        organizationDialog: false,
        activeName: 'first',
        isHigh: false,
        // input: '',
        // radio: '1',
        value: '',
        // value1: '',
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
        addFollowUpDialog: false,         //添加工单
        complainListDialog:false,         //投诉列表
        addCollectReimbursementDialog: false,  //添加房屋报销单
        addRentReimbursementDialog: false,  //添加租客报销单
        addReturnvisitDialog: false,
        leaseHistoryDialog: false,
        leaseHistoryTableData: [],

        collectFeedback: {},
        rentFeedback: {},
        houseData: {},
        cities: [], //城市
        complainData: {},
        contract_ids: [],
        allotVisible: false,
        allotType: '',
        allotLength: '',
        allotOrg_id: '',
        currentAllot: 'first'
      }
    },
    mounted() {
      this.collectDatafunc();
      // this.getContract();
      // this.startAt()
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
      },
      // 新赠方法 ====================================
      newpriceLen(val) {
        let data = this.contractForm.unit_price;
        let data2 = this.contractForm2.unit_price;
        if (data && data[0] && data[0][0] && data[0][0].length > 0) {
          let priceDate = data[0];
          for (var i = 0; i < val; i++) {
            if ((i + 1) < val) {
              // priceDate[i + 1] = [];
              // priceDate[i + 1][0] = priceDate[i + 1][1] = priceDate[i][1];
            }
          }
        }
        if (data2 && data2[0] && data2[0][0] && data2[0][0].length > 0) {
          let priceDate = data2[0];
          for (var i = 0; i < val; i++) {
            if ((i + 1) < val) {
              // priceDate[i + 1] = [];
              // priceDate[i + 1][0] = priceDate[i + 1][1] = priceDate[i][1];
            }
          }
        }
      },
      newpayForLen(val) {
        let data = this.contractForm.pay_type;
        let data2 = this.contractForm2.pay_type;
        if (data && data[0] && data[0][0] && data[0][0].length > 0) {
          let priceDate = data[0];
          for (var i = 0; i < val; i++) {
            if ((i + 1) < val) {
              // priceDate[i + 1] = [];
              // priceDate[i + 1][0] = priceDate[i + 1][1] = priceDate[i][1];
            }
          }
        }
        if (data2 && data2[0] && data2[0][0] && data2[0][0].length > 0) {
          let priceDate = data2[0];
          for (var i = 0; i < val; i++) {
            if ((i + 1) < val) {
              // priceDate[i + 1] = [];
              // priceDate[i + 1][0] = priceDate[i + 1][1] = priceDate[i][1];
            }
          }
        }
      },
      contractEntryDialog(val) {
        if(!val) {
          this.Inconsistent = false;
          this.differentShow = "";
          this.differentShow2 = "";
          this.newpriceLen = 1;
          this.newpayForLen = 1
          this.newpayTypeLen = 1,
            this.allBtn = true;
          this.contractFormClear()
        }
      },
      contractEntryDialog2(val) {
        if(!val) {
          this.Inconsistent2 = false;
          this.differentShow = "";
          this.differentShow2 = "";
          this.newpriceLen = 1;
          this.newpayForLen = 1
          this.newpayTypeLen = 1,
            this.allBtn = true;
          this.contractFormClear2()
        }
      }
      // =============================================
    },
    methods: {
      outNumber() {
        if (this.activeName === 'first') {
          this.$http.get(globalConfig.server + 'lease/collect/lord_count',{responseType: 'arraybuffer',params: {
              sign_time: this.params.sign_time,
              lord_start_time: this.params.lord_start_time,
              user_id: this.params.user_id
            }}).then(res => {
            this.$exportData(res.data);
          }).catch(err => {
            console.log(err);
          })
        }
        if(this.activeName === 'second') {
          this.$http.get(globalConfig.server + 'lease/collect/renter_count',{responseType: 'arraybuffer',params: {
              sign_time: this.params.sign_time,
              renter_start_time: this.params.renter_start_time,
              user_id: this.params.user_id
            }}).then(res => {
            this.$exportData(res.data);
          }).catch(err => {
            console.log(err);
          })
        }
      },
      //备注确定
      handleMarkInfo() {
        var obj = {};
        if (this.activeName === 'first') {
          obj = {
            remark_type: 3,
            remark_id: this.currentScope.row.contract_id,
            content: this.markInfo
          };
        } else {
          obj = {
            remark_type: 2,
            remark_id: this.currentScope.row.contract_id,
            content: this.markInfo
          };
        }
        this.$http.post(globalConfig.server + '/annotations',obj).then(res => {
          if (res.data.code === '20000') {
            this.markInfoVisible = false;
            this.$notify.success({
              title: '成功',
              message: res.data.msg
            });
            this.markInfo = '';
            if (this.activeName === 'first') {
              this.collectDatafunc();
            } else {
              this.rentDatafunc();
            }
          } else {
            this.markInfoVisible = false;
            this.markInfo = '';
            this.$notify.warning({
              title: '失败',
              message: res.data.msg
            });
          }
        }).catch(err =>{
          console.log(err);
        })
      },
      //拉入黑名单
      handlePullBlack(scope) {
        this.currentScope = scope;
        if (scope.row.annotations) {
          this.$http.delete(globalConfig.server + `/annotations/${scope.row.annotations.id}`,{
            data: {
              remark_type: this.activeName === 'first' ? 2 : 3
            }
          }).then(res => {
            if (res.data.code === '20000') {
              this.$notify.success({
                title: '成功',
                message: res.data.msg
              });
              if (this.activeName === 'first') {
                this.collectDatafunc();
              } else {
                this.rentDatafunc();
              }
            } else {
              this.$notify.warning({
                title: '失败',
                message: res.data.msg
              });
            }
          })
        }else {
          this.markInfoVisible = true;
        }
      },
      //鼠标移入
      cellMouseEnter(row,column) {
        if (column.property === "customer_name") {
          this.showNotice = row.contract_id;
          this.markShow = row.contract_id;
        }
      },
      cellMouseLeave(row,column) {
        if (column.property === 'customer_name') {
          this.showNotice = '';
          this.markShow = '';
        }
      },
      // 新增方法
      startAt(val) {
        if(val.value == "0000-00-00 00:00:00") {
          val.value = "";
        }
      },
      contractFormClear() {
        this.contractForm.mortgage_price = "";
        this.contractForm.second_pay_at = "";
        this.contractForm.start_at = "";
        this.contractForm.first_pay_at = "";
        this.contractForm.customer_card = "";
        this.contractForm.customer_phone = "";
        this.contractForm.penalty_price = "";
        this.contractForm.ready_days = "";
        this.contractForm.customer_name = "";
        this.contractForm.community_name = "";
        this.contractForm.contract_month = "";
        this.contractForm.contract_number = "";
        this.contractForm.type = "";
        this.contractForm.contract_day = "";
        // this.contractForm.guarantee_month = "";
        // this.contractForm.guarantee_day = "";
        // this.contractForm.originate = "";
        // this.contractForm.agency = "";
        // this.contractForm.agency_price = "";
        // this.contractForm.agency_person = "";
        // this.contractForm.agency_tel = "";
        this.contractForm.unit_price = [[],[],];
        this.contractForm.pay_type = [[], [],[],];
        this.contractForm.pay_method = [[],[],];
        this.contractForm.has_pay = "";
      },
      // priceChange(n) {
      //   let data = this.contractForm.unit_price;
      //   if (data && data[0] && data[0][0] && data[0][0].length > 0) {
      //     let priceDate = data[0];
      //     for (var i = n; i < this.newpriceLen; i++) {
      //       if ((i + 1) < this.newpriceLen) {
      //         priceDate[i + 1] = [];
      //         priceDate[i + 1][0] = priceDate[i + 1][1] = priceDate[i][1];
      //         this.$set(this.contractForm.unit_price[0], priceDate);
      //       }
      //     }
      //   }
      // },
      addPriceLen(index) {
        this.newpriceLen++;
      },
      romovePriceLen(index) {
        this.newpriceLen--;
        this.contractForm.unit_price[0].splice(index, 1);
        this.contractForm.unit_price[1].splice(index, 1);
      },
      // payTypeChange(n) {
      //   let data = this.contractForm.pay_type;
      //   if (data && data[0] && data[0][0] && data[0][0].length > 0) {
      //     let priceDate = data[0];
      //     for (var i = n; i < this.newpayForLen; i++) {
      //       if ((i + 1) < this.newpayForLen) {
      //         priceDate[i + 1] = [];
      //         priceDate[i + 1][0] = priceDate[i + 1][1] = priceDate[i][1];
      //         this.$set(this.contractForm.pay_type[0], priceDate);
      //       }
      //     }
      //   }
      // },
      addPayLen(index) {
        this.newpayForLen++;
      },
      romovePayLen(index) {
        this.newpayForLen--;
        if (this.activeName == 'first') {
          this.contractForm.pay_type[0].splice(index, 1);
          this.contractForm.pay_type[1].splice(index, 1);
        }
        else {
          this.contractForm.pay_type[0].splice(index, 1);
          this.contractForm.pay_type[1].splice(index, 1);
          this.contractForm.pay_type[2].splice(index, 1);
        }
        if (this.activeName == 'first') {
          this.contractForm2.pay_type[0].splice(index, 1);
          this.contractForm2.pay_type[1].splice(index, 1);
        }
        else {
          this.contractForm2.pay_type[0].splice(index, 1);
          this.contractForm2.pay_type[1].splice(index, 1);
          this.contractForm2.pay_type[2].splice(index, 1);
        }
      },
      addPayTypeLen(index) {
        this.newpayTypeLen++;
      },
      romovePayTypeLen(index) {
        this.newpayTypeLen--;
        this.contractForm.pay_method[0].splice(index, 1);
        this.contractForm.pay_method[1].splice(index, 1);
      },
      newBouncing(val) {
        this.contractForm.unit_price.splice(2,  this.contractForm.unit_price.length - 1)
        this.contractForm.pay_type.splice(2,  this.contractForm.pay_type.length - 1)
        if (this.contractForm.unit_price[0].length === this.contractForm.unit_price[1].length) {
          this.contractForm.unit_price[0].forEach((res, index) => {
            let obj = {};
            obj.period = res;
            obj.price = this.contractForm.unit_price[1][index];
            this.contractForm.unit_price.push(obj)
          })
        }else{
          console.log('数量不对');
        }
        if (this.contractForm.pay_type[0].length === this.contractForm.pay_type[1].length) {
          this.contractForm.pay_type[0].forEach((res, index) => {
            let obj = {};
            obj.period = res;
            obj.pay_way = this.contractForm.pay_type[1][index];
            obj.pay_way_str = this.contractForm.pay_type[1][index];
            this.contractForm.pay_type.push(obj)
          })
        }else{
          console.log('数量不对');
        }
        this.$http.post(globalConfig.server + "contract/contract_diff", this.contractForm).then(res => {
          if(res.data.code == '20010') {
            if(val == "2") {
              this.$notify.success({
                title: "成功",
                message: res.data.msg
              })
            }

            // this.confirmAgain = false;
            // this.contractEntry = false;
            // this.contractFormClear();
            // this.showMask = false;
            // this.$set(this.showMask, "show",false)
            // this.$set(this.showMask, "showBtn", true)
            if(val == "1") {
              this.Inconsistent = true;
              this.contrastContract();
            }
          } else {
            this.$notify.warning({
              title: "警告",
              message: res.data.msg
            })
          }
        })
      },
      // 获取合同公司联录入
      getContract() {
        // this.contractEntry = true

        this.$http.get(globalConfig.server + 'contract/contract_diff/detail?module=1&contract_id=' + this.contractForm.contract_id).then(res => {
          if(res.data.code == "20020") {
            this.differentShow =  res.data.data.is_frist;
            // if(res.data.data.is_frist == 2) {
            // console.log(res.data.data.pay_type, "666666")
            // console.log(res.data.data.unit_price, "77777")
            // if(res.data.data.unit_price.length > 1) {
            //   this.contractForm.unit_price = [[],[],]
            // }
            // if(res.data.data.pay_type[0].length > 1)  {
            //   this.contractForm.pay_type = [[], [],[],]
            // }
            this.contractForm.contract_month = res.data.data.contract_month;
            this.contractForm.start_at = res.data.data.start_at;
            this.contractForm.contract_day = res.data.data.contract_day;
            // this.contractForm.guarantee_month = res.data.data.guarantee_month;
            // this.contractForm.guarantee_day = res.data.data.guarantee_day;
            // this.contractForm.originate = res.data.data.originate;
            // this.contractForm.agency = res.data.data.agency;
            // this.contractForm.agency_price = res.data.data.agency_price;
            // this.contractForm.agency_person = res.data.data.agency_person;
            // this.contractForm.agency_tel = res.data.data.agency_tel;
            // this.contractForm.unit_price = res.data.data.unit_price;
            // this.contractForm.pay_type = res.data.data.pay_type;
            // this.contractForm.pay_method = res.data.data.pay_method;
            this.contractForm.mortgage_price = res.data.data.mortgage_price;
            this.contractForm.second_pay_at = res.data.data.second_pay_at;
            this.contractForm.first_pay_at = res.data.data.first_pay_at;

            this.contractForm.penalty_price = res.data.data.penalty_price;
            this.contractForm.customer_name = res.data.data.customer_name;
            this.contractForm.customer_phone = res.data.data.customer_phone;
            this.contractForm.customer_card = res.data.data.customer_card;
            this.contractForm.ready_days = res.data.data.ready_days;
            this.contractForm.has_pay = res.data.data.has_pay;
            this.contractEntryLoading = false;
            this.allBtn = false;
            //  }
          }
          else {
            // this.$notify.warning({
            //   title: "警告",
            //   message: res.data.msg
            // })
            this.contractEntryLoading = false;
            this.allBtn = false;
          }
        })
      },
      // 对比
      contrastContract() {
        this.$http.get(globalConfig.server + "contract/contract_diff/diff?module=1&contract_id=" + this.contractForm.contract_id).then(res => {
          if(res.data.code == "20010") {
            // this.contrastContractDialog = true;
            this.differentContrast = res.data.data.administrative.diff;
            this.getContract();
          } else {
            this.$notify.warning({
              title: "警告",
              success: res.data.msg
            })
          }
        })
      },
      //  全部通过
      passAll() {
        this.passAllForm.contract_id = this.contractForm.contract_id;
        this.passAllForm.operation = "to_contract_verify_approved";
        this.$http.put(globalConfig.server + "lease/status/verify", this.passAllForm).then(res => {
          if(res.data.code == "60610") {
            this.$notify.success({
              title: "成功",
              message: res.data.msg
            })
            this.contractEntryDialog = false;
            this.collectDatafunc();
            this.contractFormClear();
          } else {
            this.$notify.warning({
              title: "警告",
              message: res.data.msg
            })
          }
        })
      },
      passAllNo() {
        this.passAllForm.contract_id = this.contractForm.contract_id;
        this.passAllForm.operation = "to_contract_verify_rejected";
        this.$http.put(globalConfig.server + "lease/status/verify", this.passAllForm).then(res => {
          if(res.data.code == "60610") {
            this.$notify.success({
              title: "成功",
              message: res.data.msg
            })
            this.contractEntryDialog = false;
            this.collectDatafunc()
            this.contractFormClear();
          } else {
            this.$notify.warning({
              title: "警告",
              message: res.data.msg
            })
          }
        })
      },
      // 查看合同详情
      lookContractDetails() {
        const {href} = this.$router.resolve({path: '/collectDetail', query: {id: this.contractForm.contract_id}});
        //  this.$router.resolve({path: '/collectDetail', query: {id: row.contract_id}});
        window.open(href, '_blank', 'width=1920,height=1080');
      },
      // 收房获取图片
      getImage(address,val, id) {
        // console.log(address, "111111")
        this.contractEntryLoading = true;
        this.imgList = {};
        this.contractFormClear();
        this.contractEntryDialog = true;
        this.contractForm.contract_id = val;
        this.$http.get(globalConfig.server + 'lease/collect/' + val).then(res => {
          if(res.data.code == "61010") {
            this.imgList = res.data.data.photo;
            this.contractForm.community_name = address;
            this.contractForm.contract_number = res.data.data.contract_number;
            // this.contractForm.staff_id = res.data.data.staff_id;
            if(res.data.data.type == "1") {
              this.contractForm.type = "新收";
            } else if(res.data.data.type == "2") {
              this.contractForm.type = "续收";
            }
            this.getContract()
          }
        })
      },
      // 通知人
      getAlertOthers(val) {
        this.alertType = 'staff';
        // this.alertLength = 10;
        this.alertOthers = true;
      },
      alertSelectMember(val) {
        val.forEach((item, index) => {
          this.alertPepole += item.name + ",";
          this.clientForm.uids += item.id + ",";
        })
        this.clientForm.uids = this.clientForm.uids.substring(0, this.clientForm.uids.length - 1)
        this.alertPepole = this.alertPepole.substring(0, this.alertPepole.length - 1)
      },
      alertCloseOrganization() {
        this.alertOthers = false;
      },
      emptyFollowPeople() {
        this.alertPepole = "";
        this.clientForm.uids = ""
      },
      sendPepole() {
        this.clientForm.contract_id = this.contractForm.contract_id;
        this.$http.post(globalConfig.server + "lease/status/send-verify-res", this.clientForm).then(res => {
          if(res.data.code == "60618") {
            this.$notify.success({
              title: "成功",
              message: res.data.msg
            })
            this.alertPepole = "";
            this.clientForm.uids = "";
            this.clientForm.content = "";
          } else {
            this.$notify.warning({
              title: "警告",
              message: res.data.msg
            })
          }
        })
      },
      sendHistory() {
        this.sendHistoryFrom.contract_id = this.contractForm.contract_id;
        this.$http.get(globalConfig.server + "lease/status/send-diff-list", {params: this.sendHistoryFrom}).then(res => {
          if(res.data.code == "60600") {
            this.sendHistoryDialog = true;
            this.sendHistoryList = res.data.data.data;
            // this.dialogTotal = res.data.count;
          } else {
            this.$notify.warning({
              title: "警告",
              message: res.data.msg
            })
          }
        })
      },
      // 清除表单
      contractFormClear2() {
        this.contractForm2.community_name = "";
        this.contractForm2.type = "";
        this.contractForm2.start_at = "";
        this.contractForm2.contract_number = "";
        this.contractForm2.contract_month = "";
        this.contractForm2.contract_day = "";
        this.contractForm2.mortgage_price = "";
        this.contractForm2.customer_name = "";
        this.contractForm2.customer_phone = "";
        this.contractForm2.unit_price = [[],[],];
        this.contractForm2.pay_type = [[], [],[],];
      },
      // 租房获取图片
      getImage2(address, val, id) {
        this.contractEntryLoading2 = true;
        this.imgList2 = {};
        this.contractFormClear2();
        this.contractEntryDialog2 = true;
        this.contractForm2.contract_id = val;
        this.$http.get(globalConfig.server + 'lease/rent/' + val).then(res => {
          if(res.data.code == "61110") {
            this.imgList2 = res.data.data.photo;
            this.contractForm2.community_name = address;
            this.contractForm2.contract_number = res.data.data.contract_number;
            //  this.contractForm2.staff_id = res.data.data.staff_id;
            if(res.data.data.type == "1") {
              this.contractForm2.type = "新租";
            } else if(res.data.data.type == "2") {
              this.contractForm2.type = "转租";
            } else if (res.data.data.type == "3") {
              this.contractForm2.type = "续租";
            } else if(res.data.data.type == "4") {
              this.contractForm2.type = "未收先租";
            } else if(res.data.data.type == "5") {
              this.contractForm2.type = "调租";
            }
          }
        })
        this.getContract2()
      },
      newBouncing2(val) {
        // 字段处理
         this.contractForm2.unit_price.splice(2,  this.contractForm2.unit_price.length - 1)
        this.contractForm2.pay_type.splice(3,  this.contractForm2.pay_type.length - 1)
        console.log()
        if (this.contractForm2.unit_price[0].length === this.contractForm2.unit_price[1].length) {
          this.contractForm2.unit_price[0].forEach((res, index) => {
            let obj = {};
            obj.period = res;
            obj.price = this.contractForm2.unit_price[1][index];
            this.contractForm2.unit_price.push(obj)
          })
        }else{
          console.log('数量不对');
        }
        if (this.contractForm2.pay_type[0].length === this.contractForm2.pay_type[1].length) {
          this.contractForm2.pay_type[0].forEach((res, index) => {
            let obj = {};
            obj.period = res;
            obj.pay_way_bet = this.contractForm2.pay_type[1][index];
            obj.pay_way = this.contractForm2.pay_type[2][index];
            this.contractForm2.pay_type.push(obj)
          })
        }else{
          console.log('数量不对');
        }
        this.$http.post(globalConfig.server + "contract/contract_diff", this.contractForm2).then(res => {
          if(res.data.code == '20010') {
            if(val == "2") {
              this.$notify.success({
                title: "成功",
                message: res.data.msg
              })
            }
            // this.confirmAgain = false;
            // this.contractEntry = false;
            // this.contractFormClear();
            //  this.$set(this.showMask2, "show", false)
            //  this.$set(this.showMask2, "showBtn", true)
            if(val == "1") {
              this.Inconsistent2 = true;
              this.contrastContract2();

            }
          } else {
            this.$notify.warning({
              title: "警告",
              message: res.data.msg
            })
          }
        })
      },
      sendPepole2() {
        this.clientForm2.contract_id = this.contractForm2.contract_id;
        this.$http.post(globalConfig.server + "lease/status/send-verify-res", this.clientForm2).then(res => {
          if(res.data.code == "60618") {
            this.$notify.success({
              title: "成功",
              message: res.data.msg
            })
            this.clientForm2.uids = "";
            this.alertPepole2 = "";
            this.clientForm2.content = "";
          } else {
            this.$notify.warning({
              title: "警告",
              message: res.data.msg
            })
          }
        })
      },
      emptyFollowPeople2() {
        this.alertPepole2 = "";
        this.clientForm2.uids = ""
      },
      // 通知人
      getAlertOthers2(val) {
        this.alertType = 'staff';
        // this.alertLength = 10;
        this.alertOthers2 = true;
      },
      alertSelectMember2(val) {
        val.forEach((item, index) => {
          this.alertPepole2 += item.name + ",";
          this.clientForm2.uids += item.id + ",";
        })
        this.clientForm2.uids = this.clientForm2.uids.substring(0, this.clientForm2.uids.length - 1)
        this.alertPepole2 = this.alertPepole2.substring(0, this.alertPepole2.length - 1)
      },
      alertCloseOrganization2() {
        this.alertOthers2 = false;
      },
      lookContractDetails2() {
        const {href} = this.$router.resolve({path: '/rentingDetail', query: {id: this.contractForm2.contract_id}});
        //  this.$router.resolve({path: '/collectDetail', query: {id: row.contract_id}});
        window.open(href, '_blank', 'width=1920,height=1080');
      },
      sendHistory2() {
        this.sendHistoryFrom2.contract_id = this.contractForm2.contract_id;
        this.$http.get(globalConfig.server + "lease/status/send-diff-list", {params: this.sendHistoryFrom2}).then(res => {
          if(res.data.code == "60600") {
            this.sendHistoryDialog2 = true;
            this.sendHistoryList2 = res.data.data.data;
            // this.dialogTotal2 = res.data.count;
          } else {
            this.$notify.warning({
              title: "警告",
              message: res.data.msg
            })
          }
        })
      },
      // 获取合同公司联录入
      getContract2() {
        // this.contractEntry = true
        this.$http.get(globalConfig.server + 'contract/contract_diff/detail?module=2&contract_id=' + this.contractForm2.contract_id + "&").then(res => {
          if(res.data.code == "20020") {
            this.differentShow2 =  res.data.data.is_frist;
            // if(res.data.data.is_frist == 2) {
            this.contractForm2.contract_month = res.data.data.contract_month;
            this.contractForm2.start_at = res.data.data.start_at;
            this.contractForm2.contract_day = res.data.data.contract_day;
            // this.contractForm2.unit_price = res.data.data.unit_price;
            // this.contractForm2.pay_type = res.data.data.pay_type;
            // this.contractForm2.pay_method = res.data.data.pay_method;
            this.contractForm2.mortgage_price = res.data.data.mortgage_price;
            this.contractForm2.customer_name = res.data.data.customer_name;
            this.contractForm2.customer_phone = res.data.data.customer_phone;
            // this.contractForm2.type = res.data.data.type;
            // }
            this.contractEntryLoading2 = false;
            this.allBtn = false;
          }
          else {
            // this.$notify.warning({
            //   title: "警告",
            //   message: res.data.msg
            // })
            this.contractEntryLoading2 = false;
            this.allBtn = false;
          }
        })
      },
      //  全部通过
      passAll2() {
        this.passAllForm2.contract_id = this.contractForm2.contract_id;
        this.passAllForm2.operation = "to_contract_verify_approved";
        this.$http.put(globalConfig.server + "lease/status/verify", this.passAllForm2).then(res => {
          if(res.data.code == "60610") {
            this.$notify.success({
              title: "成功",
              message: res.data.msg
            })
            this.contractEntryDialog2 = false;
            this.rentDatafunc();
            this.contractFormClear2();
          } else {
            this.$notify.warning({
              title: "警告",
              success: res.data.msg
            })
          }
        })
      },
      passAll2No() {
        this.passAllForm2.contract_id = this.contractForm2.contract_id;
        this.passAllForm2.operation = "to_contract_verify_rejected";
        this.$http.put(globalConfig.server + "lease/status/verify", this.passAllForm2).then(res => {
          if(res.data.code == "60610") {
            this.$notify.success({
              title: "成功",
              message: res.data.msg
            })
            this.contractEntryDialog2 = false;
            // return false
            this.rentDatafunc();
            this.contractFormClear2();
          } else {
            this.$notify.warning({
              title: "警告",
              success: res.data.msg
            })
          }
        })
      },
      // 对比
      contrastContract2() {
        this.$http.get(globalConfig.server + "contract/contract_diff/diff?module=2&contract_id=" + this.contractForm2.contract_id).then(res => {
          if(res.data.code == "20010") {
            // this.contrastContractDialog2 = true;
            this.differentContrast2 = res.data.data.administrative.diff;
            this.getContract2()
          } else {
            this.$notify.warning({
              title: "警告",
              success: res.data.msg
            })
          }
        })
      },
      allowDrop(e) {
        e.preventDefault();
      },
      currentPicId(key) {
        this.dragPicId = key;
      },
      // 弹出框分页
      dialogHandleSizeChange(val) {
        this.sendHistoryFrom2.limit = val;
        this.sendHistory2(this.sendHistoryFrom2.limit)
        console.log(`每页 ${val} 条`);
      },
      dialogHandleCurrentChange(val) {
        this.sendHistoryFrom2.page = val;
        this.sendHistory2(this.sendHistoryFrom2.page);
        console.log(`当前页: ${val}`);
      },
      // ==========================================
      allotOpenOrganization(type){
        this.allotType = type;
        this.allotLength = 1;
        this.allotVisible = true;
      },
      allotSelectMember(item) {
        this.allotOrg_id = item[0].id;
        this.allotGo();
      },
      allotCloseOrganization() {
        this.allotVisible = false;
      },
      allotGo() {
        var params = {};
        params.contract_ids = this.contract_ids;
        params.org_id = this.allotOrg_id;
        var url = '';
        if(this.currentAllot === 'first'){
          url = 'coreproject/lord/allocate';
        }else if(this.currentAllot === 'second'){
          url = 'coreproject/renter/allocate';
        }
        this.$http.post(globalConfig.server + url,params).then(res =>{
          if(res.data.code === '20000'){
            this.$notify.success({
              title: '成功',
              message: '分配成功！'
            });
            this.allotOrg_id = '';
            this.contract_ids = [];
            this.$refs.collectMultipleTable.clearSelection();
            this.$refs.rentMultipleTable.clearSelection();
          }else {
            this.$notify.warning({
              title: '失败',
              message: '分配失败！'
            })
          }
        }).catch(err => {
          console.log(err);
        })
      },
      handleAllotDepart() {
        if(this.contract_ids.length<1){
          this.$notify.warning({
            title: "警告",
            message: "请选择需要分配的合同！"
          });
          return false;
        }else {
          this.allotOpenOrganization('depart');
        }
      },
      handleSelection(selection) {
        this.contract_ids = [];
        if(selection.length>0){
          selection.map(item => {
            this.contract_ids.push(item.contract_id);
          })
        }else {
          this.contract_ids = [];
        }
      },
      closeModal(val) {
        this.addReturnInfo = [];
        this.editRentInfoDialog = false;
        this.editAddressDialog = false;
        this.editHouseResourcesDialog = false;
        this.addReturnvisitDialog = false;
        this.addCollectRepairDialog = false;
        this.addRentRepairDialog = false;
        this.addFollowUpDialog = false;
        this.complainListDialog = false;
        this.addCollectReimbursementDialog = false;
        this.addRentReimbursementDialog = false;
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
            collectIdArray = collectIdArray.substring(0, collectIdArray.length - 1);
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
            var house_id = [];
            this.rentData.forEach(item =>{
              if(item.house_id){
                house_id.push(item.house_id);
              }
            });
            this.totalNumbers = res.data.meta.total;
            // return false
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
          this.getName(house_id);
        })
      },
      getName(houseIds = []) {
        this.$http.get(globalConfig.server + 'organization/other/house-corp', {
          params: {houseIds}
        }).then(res => {
          if (res.data.code === '700120') {
            this.house_name = res.data.data;
          } else {
            this.house_name = {};
          }
        }).catch(err => {
          console.log(err);
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
        // 新增字典====================================
        // this.dictionary(622).then((res) => {  //回访来源
        //   this.responsiblePersonCategory = res.data;
        // });
        this.dictionary(443).then((res) => {  //收房付款方式
          this.newpayTypeInfo = res.data;
        });
        this.dictionary(629).then((res) => {  //支付方式
          this.payTypeCategory = res.data;
        });
        // ============================================
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
        console.log(row)
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
            {clickIndex: 'addRentReimbursementDialog', headIcon: 'el-icons-fa-pencil-square-o', label: '添加报销单',},
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
            {clickIndex: 'addCollectReimbursementDialog', headIcon: 'el-icons-fa-pencil-square-o', label: '添加报销单',},
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
          case 'addCollectReimbursementDialog':
            this.addCollectReimbursementDialog = true;
            break;
          case 'addRentReimbursementDialog':
            this.addRentReimbursementDialog = true;
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
      // selectStatus(flag) {
      //   this.selectFlag = flag;
      // },
      // tabs标签页
      handleClick(tab, event) {
        this.currentAllot = tab.name;
        this.params.page = 1;
        this.resetting();
        // return false
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
        this.params.verify_status = '';
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
      },
      // 显示投诉列表
      showComplainList(row, column, cell, event){
        if(column.property === "work_order"){
          this.complainListDialog = true;
          console.log(row.work_order_ids);
          this.getComplain(row.work_order_ids);
        }
      },
      //发送请求获取投诉详情
      getComplain(param){
        this.$http.get(globalConfig.server + '/customer/work_order/complaint?ids=' + param).then(res => {
          if(res.data.code === "10000"){
            this.complainData = res.data;
          }else if(res.data.code === "10001"){
            this.complainData = {}
          }
        })
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" >


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
    .complain{
      cursor: pointer;
    }
    .lookOver{
      color: #409EFF;
      cursor: pointer;
    }
    .addicon {
      font-size: 20px;
      line-height: 28px;
      margin-left: 28px;
      cursor: pointer;
    }
    .contractPop {
      z-index: 2500!important;
    }
    .v-modal {
      display: none!important;
    }
    .contractPhoto {
      overflow: hidden;
      position: relative;
      li {
        float: left;
      }
    }
    .mask {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(255,255,255,.5);
    }
    .image {
      min-height: 90px;
      img {
        width: 120px;
        height: 80px;
        border-radius: 4px;
        margin-right: 10px;

      }
    }
    .notice{
      position: absolute;
      top: 30%;
      left: 0;
      width: 100%;
      height: 2em;
      border-radius: 2px;
      background-color: rgba(188,188,189,.9);
      text-align: center;
      line-height: 2;
    }
    .markInfo{
      /*border: 1px solid #525252;*/
      position: absolute;
      text-align: left;
      top: 3.5em;
      left: -5em;
      padding: 0 10px;
      border-radius: 5px;
      color: #4F4F4F;
      background-color: #C6E2FF;
      z-index: 99;
    }
    .markShow_style{
      display: none;
    }
    .isShow{
      display: none;
    }
  }
</style>
