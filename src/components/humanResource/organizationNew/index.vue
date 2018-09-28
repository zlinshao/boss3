<template>
  <div id="staffManage" @click="show=false" @contextmenu="closeMenu">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="border left">
          <div class="top">
            <div>
              组织架构
            </div>
          </div>
          <div id="dragTree">
            <el-tree ref="expandMenuList" class="expand-tree"
                     :data="setTree"
                     :empty-text='collectStatus'
                     v-loading="collectLoading"
                     element-loading-text="拼命加载中"
                     element-loading-spinner="el-icon-loading"
                     element-loading-background="rgba(255, 255, 255, 0)"
                     node-key="id"
                     highlight-current
                     accordion
                     check-strictly
                     @node-click="nodeClick"
                     @node-expand="nodeExpand"
                     @node-collapse="nodeCollapse"
                     :default-expanded-keys="defaultExpandKeys"
                     :props="defaultProps"
                     :expand-on-click-node="false"
                     :render-content="renderContent">
            </el-tree>
          </div>
        </div>
      </el-col>
      <el-col :span="18">
        <div class="border right">
          <div class="top">
            <div>
              <span>{{department_name}}</span>
              <span v-if="departManageName" style="color: #cc6262;font-size: 12px;">
                ( <i class="iconfont icon-fuzeren"></i> {{departManageName}} )
              </span>
            </div>
          </div>
          <div style="padding: 10px;">
            <div class="highRanking">
              <div class="tabsSearch">
                <el-form style="float: right;" onsubmit="return false;" :inline="true" size="mini"
                         class="demo-form-inline">
                  <el-form-item v-if="activeName==='first'">
                    <el-input v-model="params.keywords" placeholder="请输入搜索内容"
                              @keyup.enter.prevent.native="search" clearable>
                      <el-button slot="append" type="primary" icon="el-icon-search" @click="search"></el-button>
                    </el-input>
                  </el-form-item>

                  <el-form-item v-if="activeName==='first'">
                    <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
                  </el-form-item>

                  <el-form-item>
                    <el-button type="primary" @click="addStaff" v-if="activeName==='first'">新建员工</el-button>
                    <el-button type="primary" @click="addPosition('position')" v-if="activeName==='second'">新建职位
                    </el-button>
                  </el-form-item>

                  <el-form-item v-if="activeName==='first'">
                    <!--<el-button type="primary" size="mini" @click="goPersonnel(1)">人事报表</el-button>-->
                    <el-dropdown trigger="click" @command="goPersonnel">
                      <el-button type="primary">
                        更多<i class="el-icon-arrow-down el-icon--right"></i>
                      </el-button>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="a">人事报表</el-dropdown-item>
                        <el-dropdown-item command="b">离职短信</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </el-form-item>

                  <!--<el-form-item>-->
                  <!--<el-button type="primary" size="mini" @click="leadingOut">导出</el-button>-->
                  <!--</el-form-item>-->

                </el-form>
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
                          <div class="el_col_label">入职时间</div>
                        </el-col>
                        <el-col :span="16" class="el_col_option">
                          <el-form-item>
                            <el-date-picker
                              v-model="params.entry_time"
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
                          <div class="el_col_label">离职时间</div>
                        </el-col>
                        <el-col :span="16" class="el_col_option">
                          <el-form-item>
                            <el-date-picker
                              v-model="params.leave_time"
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
                  </el-row>
                  <el-row class="el_row_border">
                    <el-col :span="12">
                      <el-row>
                        <el-col :span="8">
                          <div class="el_col_label">在职状态</div>
                        </el-col>
                        <el-col :span="16" class="el_col_option">
                          <el-select v-model="params.is_dimission" size="mini" clearable>
                            <el-option key="0" label="在职" value="0">在职</el-option>
                            <el-option key="1" label="离职" value="1">离职</el-option>
                          </el-select>
                        </el-col>
                      </el-row>
                    </el-col>
                    <el-col :span="12">
                      <el-row>
                        <el-col :span="8">
                          <div class="el_col_label">是否转正</div>
                        </el-col>
                        <el-col :span="16" class="el_col_option">
                          <el-select v-model="params.forward" size="mini" clearable>
                            <el-option key="0" label="已转正" value="1">已转正</el-option>
                            <el-option key="1" label="未转正" value="2">未转正</el-option>
                          </el-select>
                        </el-col>
                      </el-row>
                    </el-col>
                  </el-row>
                  <div class="btnOperate">
                    <el-button size="mini" type="primary" @click="search">搜索</el-button>
                    <el-button size="mini" type="primary" @click="resetting">重置</el-button>
                    <el-button size="mini" type="primary" @click="highGrade">取消</el-button>
                  </div>
                </el-form>
              </div>
            </div>
            <el-tabs v-model="activeName">
              <el-tab-pane label="用户管理" name="first">
                <el-table
                  :data="staffTableData"
                  :empty-text='userCollectStatus'
                  v-loading="userCollectLoading"
                  element-loading-text="拼命加载中"
                  element-loading-spinner="el-icon-loading"
                  element-loading-background="rgba(255, 255, 255, 0)"
                  @row-contextmenu="openContextMenu"
                  @cell-dblclick="openDetail"
                  style="width: 100%">
                  <el-table-column width="60px">
                    <template slot-scope="scope">
                      <img data-card="" v-if="scope.row.avatar" :data-src="JSON.stringify(scope.row)"
                           :src="scope.row.avatar" style="width: 30px;height: 30px;border-radius: 50%;">
                      <img v-else="" src="../../../assets/images/defaultHead.png" data-card=""
                           :data-src="JSON.stringify(scope.row)"
                           style="width: 30px;height: 30px;border-radius: 50%;filter: grayscale(100%);">
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="员工姓名">
                  </el-table-column>
                  <el-table-column
                    label="部门">
                    <template slot-scope="scope">
                      <span v-for="item in scope.row.org">{{item.name}}</span>
                      <span v-if="scope.row.org.length<1">暂无</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="岗位">
                    <template slot-scope="scope">
                      <span v-for="item in scope.row.role">{{item.display_name}}</span>
                      <span v-if="scope.row.role.length<1">暂无</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="phone"
                    label="手机号">
                  </el-table-column>
                  <el-table-column
                    prop="detail.enroll"
                    label="入职时间">
                  </el-table-column>
                  <el-table-column
                    prop="created_at"
                    label="账号状态">
                    <template slot-scope="scope">
                      <div>
                        <span v-if="scope.row.is_enable"><el-tag type="danger">禁用</el-tag></span>
                        <span v-if="!scope.row.is_enable"><el-tag type="success">启用</el-tag></span>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="created_at"
                    label="在职状态">
                    <template slot-scope="scope">
                      <div>
                        <span v-if="scope.row.is_on_job"><el-tag type="warning">离职</el-tag></span>
                        <span v-if="!scope.row.is_on_job"><el-tag type="success">在职</el-tag></span>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="tableBottom">
                  <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="params.page"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="10"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalStaffNum">
                  </el-pagination>
                </div>
              </el-tab-pane>
              <el-tab-pane label="职位管理" name="second">
                <!--职位-->
                <div class="tableBox">
                  <div class="blueTable">
                    <el-table
                      :data="positionList"
                      :empty-text='positionCollectStatus'
                      v-loading="positionCollectLoading"
                      element-loading-text="拼命加载中"
                      element-loading-spinner="el-icon-loading"
                      element-loading-background="rgba(255, 255, 255, 0)"
                      :row-class-name="tableRowClassName"
                      @row-contextmenu="openOnlyPositionMenu"
                      @row-click="clickOnlyPositionMenu"
                      style="width: 100%">
                      <el-table-column
                        prop="name"
                        label="职位">
                      </el-table-column>
                      <el-table-column
                        prop="org.name"
                        label="部门">
                      </el-table-column>
                    </el-table>
                  </div>
                  <div class="tableBottom">
                    <el-pagination
                      @size-change="handlePositionSizeChange"
                      @current-change="handlePositionCurrentChange"
                      :current-page="positionParams.page"
                      :page-sizes="[5, 10, 15, 20]"
                      :page-size="5"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="totalOnlyPositionNum">
                    </el-pagination>
                  </div>
                </div>
                <!--岗位-->
                <div class="tableBox">
                  <div class="greenTable">
                    <el-table
                      :data="positionTableData"
                      :empty-text='postCollectStatus'
                      v-loading="postCollectLoading"
                      element-loading-text="拼命加载中"
                      element-loading-spinner="el-icon-loading"
                      element-loading-background="rgba(255, 255, 255, 0)"
                      @row-contextmenu="openPositionMenu"
                      :row-class-name="tableRowPostClassName"
                      @row-click="clickPostMenu"
                      style="width: 100%">
                      <el-table-column
                        prop="name"
                        label="岗位">
                      </el-table-column>
                      <el-table-column
                        label="下级岗位">
                        <template slot-scope="scope">
                          <span v-if="scope.row.parent_name">{{scope.row.parent_name}}</span>
                          <span v-else=""> &nbsp;暂无&nbsp; </span>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="position_type.name"
                        label="职位">
                      </el-table-column>
                      <el-table-column
                        prop="role.name"
                        label="岗位标识">
                      </el-table-column>
                      <el-table-column
                        prop="orgName"
                        label="部门">
                      </el-table-column>
                    </el-table>
                  </div>
                  <div class="tableBottom">
                    <el-pagination
                      @size-change="handlePostSizeChange"
                      @current-change="handlePostCurrentChange"
                      :current-page="postParams.page"
                      :page-sizes="[5, 10, 15, 20]"
                      :page-size="5"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="totalPostNum">
                    </el-pagination>
                  </div>
                </div>
                <!--岗位下的员工-->
                <div class="tableBox">
                  <div class="greenTable">
                    <el-table
                      :data="postStaffData"
                      :empty-text='postStaffStatus'
                      v-loading="postStaffLoading"
                      element-loading-text="拼命加载中"
                      element-loading-spinner="el-icon-loading"
                      element-loading-background="rgba(255, 255, 255, 0)"
                      @row-contextmenu="openContextMenu"
                      @cell-dblclick="openDetail"
                      style="width: 100%">
                      <el-table-column width="60px">
                        <template slot-scope="scope">
                          <img data-card="" v-if="scope.row.avatar" :data-src="JSON.stringify(scope.row)"
                               :src="scope.row.avatar" style="width: 30px;height: 30px;border-radius: 50%;">
                          <img v-else="" src="../../../assets/images/defaultHead.png" data-card=""
                               :data-src="JSON.stringify(scope.row)"
                               style="width: 30px;height: 30px;border-radius: 50%;filter: grayscale(100%);">
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="name"
                        label="员工姓名">
                      </el-table-column>
                      <el-table-column
                        label="部门">
                        <template slot-scope="scope">
                          <span v-for="item in scope.row.org">{{item.name}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="岗位">
                        <template slot-scope="scope">
                          <span v-for="item in scope.row.role">{{item.display_name}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="phone"
                        label="手机号">
                      </el-table-column>
                      <el-table-column
                        prop="created_at"
                        label="入职时间">
                      </el-table-column>
                      <el-table-column
                        prop="created_at"
                        label="账号状态">
                        <template slot-scope="scope">
                          <div>
                            <span v-if="scope.row.is_enable"><el-tag type="danger">禁用</el-tag></span>
                            <span v-if="!scope.row.is_enable"><el-tag type="success">启用</el-tag></span>
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="created_at"
                        label="在职状态">
                        <template slot-scope="scope">
                          <div>
                            <span v-if="scope.row.is_on_job"><el-tag type="warning">离职</el-tag></span>
                            <span v-if="!scope.row.is_on_job"><el-tag type="success">在职</el-tag></span>
                          </div>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                  <div class="tableBottom">
                    <el-pagination
                      @size-change="handlePostStaffSizeChange"
                      @current-change="handlePostStaffCurrentChange"
                      :current-page="postStaffParams.page"
                      :page-sizes="[5, 10, 15, 20]"
                      :page-size="5"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="totalPostStaffNum">
                    </el-pagination>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </el-col>
    </el-row>
    <!--发送例子短信和复职等级 模态框-->
    <el-dialog :close-on-click-modal="false" title="员工详情" :visible.sync="staffDetail" width="60%">
      <div class="scroll_bar">
        <el-form size="small" label-width="120px">
          <el-tabs v-model="detailActiveName">
            <el-tab-pane label="基础信息" name="first">
              <div class="form_border">
                <el-row :gutter="20">
                  <el-col :span="8">
                    <el-form-item label="真实姓名">
                      <div class="content">
                    <span v-if="staffDetailData&& staffDetailData.detail && staffDetailData.detail.real_name">
                     {{staffDetailData && staffDetailData.detail && staffDetailData.detail.real_name}}</span>
                        <span v-else>暂无</span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="性别">
                      <div class="content">
                    <span v-if="staffDetailData && staffDetailData.detail && staffDetailData.detail.genders">
                      {{staffDetailData && staffDetailData.detail && staffDetailData.detail.genders}}</span>
                        <span v-else>暂无</span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="手机号码">
                      <div class="content">
                    <span v-if="staffDetailData && staffDetailData.phone">
                      {{staffDetailData && staffDetailData.phone}}</span>
                        <span v-else>暂无</span>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="8">
                    <el-form-item label="身份证号">
                      <div class="content">
                    <span v-if="staffDetailData && staffDetailData.detail && staffDetailData.detail.id_num">
                     {{staffDetailData && staffDetailData.detail && staffDetailData.detail.id_num}}</span>
                        <span v-else>暂无</span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="生日">
                      <div class="content">
                    <span v-if="staffDetailData && staffDetailData.detail && staffDetailData.detail.birthday">
                      {{staffDetailData && staffDetailData.detail && staffDetailData.detail.birthday}}</span>
                        <span v-else>暂无</span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="生育状况">
                      <div class="content">
                    <span v-if="staffDetailData && staffDetailData.detail && staffDetailData.detail.fertility_statuss">
                      {{staffDetailData && staffDetailData.detail && staffDetailData.detail.fertility_statuss}}</span>
                        <span v-else>暂无</span>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="16">
                    <el-form-item label="家庭住址">
                      <div class="content">
                    <span v-if="staffDetailData && staffDetailData.detail && staffDetailData.detail.home_addr">
                     {{staffDetailData && staffDetailData.detail && staffDetailData.detail.home_addr}}</span>
                        <span v-else>暂无</span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="紧急电话">
                      <div class="content">
                    <span v-if="staffDetailData && staffDetailData.detail && staffDetailData.detail.emergency_call">
                     {{staffDetailData && staffDetailData.detail && staffDetailData.detail.emergency_call}}</span>
                        <span v-else>暂无</span>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="8">
                    <el-form-item label="银行卡号">
                      <div class="content">
                    <span v-if="staffDetailData && staffDetailData.detail && staffDetailData.detail.bank_num">
                      {{staffDetailData && staffDetailData.detail && staffDetailData.detail.bank_num}}</span>
                        <span v-else>暂无</span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="开户行">
                      <div class="content">
                    <span v-if="staffDetailData && staffDetailData.detail && staffDetailData.detail.account_bank">
                      {{staffDetailData && staffDetailData.detail && staffDetailData.detail.account_bank}}</span>
                        <span v-else>暂无</span>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="8">
                    <el-form-item label="支行">
                      <div class="content">
                    <span v-if="staffDetailData && staffDetailData.detail && staffDetailData.detail.branch_bank">
                      {{staffDetailData && staffDetailData.detail && staffDetailData.detail.branch_bank}}</span>
                        <span v-else>暂无</span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="开户名">
                      <div class="content">
                    <span v-if="staffDetailData && staffDetailData.detail && staffDetailData.detail.account_name">
                      {{staffDetailData && staffDetailData.detail && staffDetailData.detail.account_name}}</span>
                        <span v-else>暂无</span>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="8">
                    <el-form-item label="部门">
                      <div class="content">
                        <span v-if="department">{{department}}</span>
                        <span v-else>暂无</span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="职位">
                      <div class="content">
                        <span v-if="currentPosition">{{currentPosition}}</span>
                        <span v-else>暂无</span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="岗位">
                      <div class="content">
                        <span v-if="currentPost">{{currentPost}}</span>
                        <span v-else>暂无</span>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="8">
                    <el-form-item label="账号状态">
                      <div class="content">
                        <span v-if="staffDetailData && staffDetailData.is_enable">禁用</span>
                        <span v-if="staffDetailData && !staffDetailData.is_enable">启用</span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="在职状态">
                      <div class="content">
                        <span v-if="staffDetailData && staffDetailData.is_on_job">离职</span>
                        <span v-if="staffDetailData && !staffDetailData.is_on_job">在职</span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="等级">
                      <div class="content">
                    <span v-if="staffDetailData && staffDetailData.detail && staffDetailData.detail.levels">
                      {{staffDetailData && staffDetailData.detail && staffDetailData.detail.levels}}</span>
                        <span v-else>暂无</span>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="8">
                    <el-form-item label="入职时间">
                      <div class="content">
                    <span v-if="staffDetailData && staffDetailData.detail && staffDetailData.detail.enroll">
                      {{staffDetailData && staffDetailData.detail && staffDetailData.detail.enroll}}</span>
                        <span v-else>暂无</span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="离职时间">
                      <div class="content">
                    <span v-if="staffDetailData && staffDetailData.detail && staffDetailData.detail.dismiss_time">
                      {{staffDetailData && staffDetailData.detail && staffDetailData.detail.dismiss_time}}</span>
                        <span v-else>暂无</span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="薪资">
                      <div class="content">
                    <span v-if="staffDetailData && staffDetailData.detail && staffDetailData.detail.salary">
                      {{staffDetailData && staffDetailData.detail && staffDetailData.detail.salary}}</span>
                        <span v-else>暂无</span>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="8">
                    <el-form-item label="入职途径">
                      <div class="content">
                        <span
                          v-if="staffDetailData && staffDetailData.detail && staffDetailData.detail.entry_way && staffDetailData.detail.entry_way.entry_type && staffDetailData.detail.entry_way.entry_type.length > 0">
                          <span
                            v-for="item in staffDetailData.detail.entry_way.entry_type">{{EWCategory[item]}}&nbsp;</span>
                        </span>
                        <span v-else>暂无</span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="推荐人">
                      <div class="content">
                    <span v-if="staffDetailData && staffDetailData.detail && staffDetailData.detail.recommender_name">
                      {{staffDetailData && staffDetailData.detail && staffDetailData.detail.recommender_name}}</span>
                        <span v-else>暂无</span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="备注">
                      <div class="content">
                    <span v-if="staffDetailData && staffDetailData.detail && staffDetailData.detail.entry_way">
                      {{staffDetailData.detail.entry_way.entry_mess}}</span>
                        <span v-else>暂无</span>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="8">
                    <el-form-item label="离职原因">
                      <div class="content">
                    <span v-if="staffDetailData && staffDetailData.detail && staffDetailData.detail.dismiss_reason">
                      {{staffDetailData.detail.dismiss_reason.dismiss_type && DRCategory[staffDetailData.detail.dismiss_reason.dismiss_type]}}</span>
                        <span v-else>暂无</span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="具体描述">
                      <div class="content">
                    <span v-if="staffDetailData && staffDetailData.detail && staffDetailData.detail.dismiss_reason">
                      {{staffDetailData.detail.dismiss_reason.dismiss_mess}}</span>
                        <span v-else>暂无</span>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="24">
                    <el-form-item label="入职材料">
                      <div class="content">
                    <span>
                      <el-checkbox-group v-model="entry_materials" style="display: inline;">
                        <el-checkbox v-for="item in entryMaterialsCategory" :label="item.id" :key="item.id"
                                     :value="item.id"
                                     disabled>{{item.dictionary_name}}</el-checkbox>
                      </el-checkbox-group>
                    </span>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </el-tab-pane>
            <el-tab-pane label="辅助信息" name="second">
              <div class="form_border">
                <el-row :gutter="20">
                  <el-col :span="8">
                    <el-form-item label="籍贯">
                      <div class="content">
                   <span v-if="staffDetailData && staffDetailData.detail && staffDetailData.detail.origin_addr">
                     {{staffDetailData && staffDetailData.detail && staffDetailData.detail.origin_addr}}</span>
                        <span v-else>暂无</span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="婚姻状况">
                      <div class="content">
                   <span v-if="staffDetailData && staffDetailData.detail && staffDetailData.detail.marital_statuss">
                     {{staffDetailData && staffDetailData.detail && staffDetailData.detail.marital_statuss}}</span>
                        <span v-else>暂无</span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="政治面貌">
                      <div class="content">
                    <span v-if="staffDetailData && staffDetailData.detail && staffDetailData.detail.political_statuss">
                     {{staffDetailData && staffDetailData.detail && staffDetailData.detail.political_statuss}}</span>
                        <span v-else>暂无</span>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="8">
                    <el-form-item label="转正时间">
                      <div class="content">
                   <span v-if="staffDetailData && staffDetailData.detail && staffDetailData.detail.forward_time">
                    {{staffDetailData && staffDetailData.detail && staffDetailData.detail.forward_time}}</span>
                        <span v-else>暂无</span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="企业邮箱">
                      <div class="content">
                     <span v-if="staffDetailData && staffDetailData.detail && staffDetailData.detail.mail">
                       {{staffDetailData && staffDetailData.detail && staffDetailData.detail.mail}}</span>
                        <span v-else>暂无</span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="学历">
                      <div class="content">
                    <span v-if="staffDetailData && staffDetailData.detail && staffDetailData.detail.educations">
                      {{staffDetailData && staffDetailData.detail && staffDetailData.detail.educations}}</span>
                        <span v-else>暂无</span>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="8">
                    <el-form-item label="毕业院校">
                      <div class="content">
                    <span v-if="staffDetailData && staffDetailData.detail && staffDetailData.detail.school">
                      {{staffDetailData && staffDetailData.detail && staffDetailData.detail.school}}</span>
                        <span v-else>暂无</span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="专业">
                      <div class="content">
                    <span v-if="staffDetailData && staffDetailData.detail && staffDetailData.detail.major">
                      {{staffDetailData && staffDetailData.detail && staffDetailData.detail.major}}</span>
                        <span v-else>暂无</span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="毕业时间">
                      <div class="content">
                    <span v-if="staffDetailData && staffDetailData.detail && staffDetailData.detail.graduation_time">
                      {{staffDetailData && staffDetailData.detail && staffDetailData.detail.graduation_time}}</span>
                        <span v-else>暂无</span>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="8">
                    <el-form-item label="第一次签合同时间">
                      <div class="content">
                    <span
                      v-if="staffDetailData && staffDetailData.detail && staffDetailData.detail.agreement_first_time">
                      {{staffDetailData && staffDetailData.detail && staffDetailData.detail.agreement_first_time}}</span>
                        <span v-else>暂无</span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="第一次合同到期时间">
                      <div class="content">
                    <span
                      v-if="staffDetailData && staffDetailData.detail && staffDetailData.detail.agreement_first_end_time">
                      {{staffDetailData && staffDetailData.detail && staffDetailData.detail.agreement_first_end_time}}</span>
                        <span v-else>暂无</span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="第二次签合同时间">
                      <div class="content">
                    <span
                      v-if="staffDetailData && staffDetailData.detail && staffDetailData.detail.agreement_second_time">
                      {{staffDetailData && staffDetailData.detail && staffDetailData.detail.agreement_second_time}}</span>
                        <span v-else>暂无</span>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="24">
                    <el-form-item label="备注">
                      <div class="content">
                    <span v-if="staffDetailData && staffDetailData.detail && staffDetailData.detail.remark">
                      {{staffDetailData && staffDetailData.detail && staffDetailData.detail.remark}}</span>
                        <span v-else>暂无</span>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </el-tab-pane>
            <el-tab-pane label="成长轨迹" name="third">
              <div class="form_border">
                <div v-if="growthData.length>0">
                  <el-form size="small" v-if="growthData">
                    <el-row :gutter="20" v-for="item in growthData" :key="item.id" style="margin-bottom: 15px;">
                      <el-col :span="4">
                        <div class="content">
                          <span v-if="item.create_time">{{item.create_time}}</span>
                          <span v-if="!item.create_time">暂无</span>
                        </div>
                      </el-col>
                      <el-col :span="20">
                        <div class="content">
                          <span v-if="item.content">{{item.content}}</span>
                          <span v-if="!item.content">暂无</span>
                        </div>
                      </el-col>
                    </el-row>
                  </el-form>
                </div>
                <div class="content" v-else="" style="text-align: center;line-height: 30px;margin-bottom: 15px;">
                  暂无数据
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="staffDetail = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :close-on-click-modal="false" title="离职日期" :visible.sync="selectLeaveDateDialog" width="30%">
      <div>
        <el-form size="mini" onsubmit="return false;" :model="form" label-width="100px" style="padding: 0 20px;">
          <el-form-item label="离职日期" required>
            <el-date-picker v-model="form.dismiss_time" type="date" placeholder="请选择离职日期"
                            value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="离职原因">
            <el-select v-model="form.dismiss_reason.dismiss_type" clearable>
              <el-option v-for="item in dismissReasonCategory" :value="item.id" :key="item.id"
                         :label="item.name">{{item.name}}
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="具体描述">
            <el-input type="textarea" placeholder="请填写描述"
                      v-model="form.dismiss_reason.dismiss_mess"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="selectLeaveDateDialog=false">取 消</el-button>
        <el-button size="small" type="primary" @click="leaveDateConfirm">只离职</el-button>
        <el-button size="small" type="primary" @click="leaveAndSendMsgConfirm">离职并发送短信</el-button>
      </span>
    </el-dialog>
    <el-dialog :close-on-click-modal="false" title="发送离职短信" :visible.sync="sendLeaveMsgDialog" width="30%">
      <div>
        <el-form size="mini" onsubmit="return false;" :model="sendLeaveMsgForm" label-width="100px"
                 style="padding: 0 20px;">
          <el-form-item label="离职日期" required>
            <el-date-picker v-model="sendLeaveMsgForm.date" type="date" placeholder="请选择离职日期"
                            value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="sendLeaveMsgDialog=false">取 消</el-button>
        <el-button size="small" type="primary" @click="sendLeaveMsgConfirm">发 送</el-button>
      </span>
    </el-dialog>
    <el-dialog :close-on-click-modal="false" title="复职等级" :visible.sync="selectLevelDialog" width="30%">
      <div>
        <el-form size="mini" onsubmit="return false;" :model="levelForm" label-width="100px" style="padding: 0 20px;">
          <el-form-item label="等级" required>
            <el-select v-model="levelForm.level" clearable>
              <el-option v-for="item in branchBankCategory" :value="item.id" :key="item.id"
                         :label="item.dictionary_name">{{item.dictionary_name}}
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="selectLevelDialog=false">取 消</el-button>
        <el-button size="small" type="primary" @click="levelConfirm">确 定</el-button>
      </span>
    </el-dialog>

    <Organization :organizationDialog="organizationDialog" @close="closeOrganization" :type="type"
                  @selectMember="selectMember"></Organization>
    <EditDepart :editDepartDialog="editDepartDialog" :departId="departId" @close="closeEditDepart"></EditDepart>
    <AddStaff :addStaffDialog="addStaffDialog" :isEdit="isEdit" :editId="editId" @close="closeAddStaff"></AddStaff>
    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperateMore="clickEvent"></RightMenu>
    <AddDepart :addDepartDialog="addDepartDialog" :parentId="parentId" :parentName="parentName"
               @close="closeAddDepart"></AddDepart>

    <AddPosition :addPositionDialog="addPositionDialog" :addPositionParams="addPositionParams"
                 @close="closeAddPosition"></AddPosition>
    <EditPosition :editPositionDialog="editPositionDialog" :positionId="positionId" :positionName="positionName"
                  @close="closeEditPosition"></EditPosition>
    <EditOnlyPosition :editOnlyPositionDialog="editOnlyPositionDialog" :onlyPositionId="onlyPositionId"
                      :onlyPositionName="onlyPositionName" @close="closeEditOnlyPosition"></EditOnlyPosition>
    <AddPower :module="powerModule" @close="closePower" :powerData="powerData"></AddPower>

    <ViewRange :viewRangeDialog="viewRangeDialog" :editId="editId" @close="closeViewRange"></ViewRange>
  </div>
</template>

<script>
  import TreeRender from './components/treeRender.vue'
  import Organization from '../../common/organization.vue'
  import AddStaff from './components/addStaff.vue'
  import RightMenu from '../../common/rightMenu.vue'    //右键
  import EditDepart from './components/editdepar.vue'
  import AddDepart from './components/addDepart.vue'
  import AddPosition from './components/addPostion.vue'
  import EditPosition from './components/editPostion.vue'
  import EditOnlyPosition from './components/editOnlyPostion.vue'
  import AddPower from './components/addPower.vue'   //权限
  import ViewRange from './components/addViewRange'

  export default {
    name: 'tree',
    components: {
      Organization,
      AddStaff,
      RightMenu,
      EditDepart,
      AddDepart,
      AddPosition,
      EditPosition,
      EditOnlyPosition,
      AddPower,
      ViewRange
    },
    data() {
      return {
        detailActiveName: 'first',
        dismissReasonCategory: [
          {id: "1", name: '主动离职'},
          {id: "2", name: '旷工离职'},
          {id: "3", name: '劝退'},
          {id: "4", name: '开除'},
        ],
        DRCategory: {"1": "主动离职", "2": "旷工离职", "3": "劝退", "4": "开除",},
        EWCategory: {
          "1": "智联招聘", "2": "前程无忧", "3": "58同城", "4": "BOSS直聘",
          "5": "猎聘网", "6": "首席信才", "7": "德盛人才", "8": "校园招聘会",
          "9": "社会招聘会", "10": "推荐", "11": "其他",
        },
        sendLeaveMsgDialog: false, //发送离职短信模态框
        selectLeaveDateDialog: false,  //选择离职日期弹框
        selectLevelDialog: false,  //选择等级弹框
        viewRangeDialog: false,  //选择可见范围
        form: {
          dismiss_time: '',
          dismiss_reason: {
            dismiss_type: '',
            dismiss_mess: '',
          },
        }, //离职日期
        levelForm: {level: ''},  //等级
        sendLeaveMsgForm: {date: ''},  //发送离职短信 离职日期
        branchBankCategory: [],
        isHigh: false,
        powerData: [],
        collectStatus: ' ',
        collectLoading: false,
        userCollectStatus: ' ',
        userCollectLoading: false,
        //职位
        positionCollectStatus: ' ',
        positionCollectLoading: false,
        //岗位
        postCollectStatus: ' ',
        postCollectLoading: false,
        //岗位下的员工
        postStaffStatus: ' ',
        postStaffLoading: false,

        staffDetail: false,
        staffDetailData: {},
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],
        /***********/
        arrList: [],
        setTree: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        defaultExpandKeys: [],//默认展开节点列表
        params: {
          keywords: '',
          limit: 10,
          page: 1,
          org_id: '',
          is_dimission: '',
          forward: '',
          is_recursion: 1,
          entry_time: [],
          leave_time: [],
        },
        //由于存在分页bug,所以暂时把职位和岗位的参数分开
        //职位
        positionParams: {
          limit: 5,
          page: 1,
        },
        //岗位
        postParams: {
          limit: 5,
          page: 1,
        },
        postStaffParams: {
          limit: 5,
          page: 1,
        },

        staffTableData: [],    //员工列表
        positionTableData: [], //岗位列表
        positionList: [],      //职位列表
        postStaffData: [],  //岗位下的员工列表
        organizationDialog: false,
        //......................
        addStaffDialog: false, //新增用户模态框
        editDepartDialog: false, //编辑部门模态框
        addDepartDialog: false, //新建部门模态框
        addPositionDialog: false, //新建岗位
        editPositionDialog: false,    //修改岗位
        editOnlyPositionDialog: false, //修改职位
        powerModule: false,        //权限
        isEdit: false,
        editId: null,
        totalStaffNum: 0,
        totalOnlyPositionNum: 0, //职位总条数
        totalPostNum: 0,  //岗位总条数
        totalPostStaffNum: 0,
        departId: null,
        parentId: null,
        parentName: null,

        loading: true,
        activeName: '',      //当前tab名
        positionId: '',      //岗位id
        positionName: '',
        onlyPositionId: '',  //职位id
        onlyPositionName: '',
        menuType: '',    //右键类别

        department_id: '',  //y用于监听部门变化
        department_name: "",

        isGetStaff: false,
        isGetOnlyPosition: false,
        isGetPosition: false,
        post_position: '', //  职位或岗位
        addPositionParams: [],
        entryMaterialsCategory: [],
        entry_materials: [],
        department: '',  //部门
        currentPost: '',  //岗位
        currentPosition: '', //职位
        type: '',
        setManageDepartId: '',
        departManageName: '',
        selectPostName: '',
        growthData: '',
      }
    },
    mounted() {
      this.initExpand();
      document.getElementById('staffManage').style.minHeight = window.innerHeight - 160 + 'px';
      this.getDepart();
      this.activeName = 'first';
      this.getDefaultData();
      this.getEntryMaterials();
      this.getBranchBank();
    },
    watch: {
      department_id(val) {
        this.isGetStaff = false;
        this.isGetOnlyPosition = false;
        this.isGetPosition = false;
        this.onlyPositionId = '';
        this.onlyPositionName = '';
        if (this.activeName === 'first') {
          this.params.page = 1;
          this.getStaffData();
          this.isGetStaff = true;
        } else if (this.activeName === 'second') {
          this.positionParams.page = 1;
          this.postParams.page = 1;
          this.getOnlyPosition();
          this.isGetOnlyPosition = true;
        }
      },
      activeName(val) {
        if (val === 'first') {
          this.params.limit = 10;
        } else if (val === 'second') {
          this.params.limit = 5;
        }
        if (val === 'first' && !this.isGetStaff) {
          this.params.page = 1;
          this.getStaffData();
          this.isGetStaff = true;
        } else if (val === 'second' && !this.isGetOnlyPosition) {
          this.positionParams.page = 1;
          this.getOnlyPosition();
          this.isGetOnlyPosition = true;
        }
      },
      'params.is_dimission': {
        deep: true,
        handler(val, oldVal) {

        }
      },
      //发送离职短信
      sendLeaveMsgDialog(val) {
        if (!val) {
          this.form.dismiss_time = '';
          this.sendLeaveMsgForm.date = '';
          this.editId = '';
        }
      },
      //离职
      selectLeaveDateDialog(val) {
        if (!val) {
          this.sendLeaveMsgForm.date = '';
          this.editId = '';
        }
      },
    },
    methods: {
      // 导出
      leadingOut() {
        this.isHigh = false;
        let data = Object.assign({}, this.params);
        data.index = 1;
        this.$http.get(globalConfig.server + 'manager/staff', {params: data}).then((res) => {
          if (!res.data) {
            return;
          }
          let url = window.URL.createObjectURL(new Blob([res.data]));
          let link = document.createElement('a');
          link.style.display = 'a';
          link.href = url;
          link.setAttribute('download', 'excel.xlsx');
          document.body.appendChild(link);
          link.click();
        })
      },
      goPersonnel(val) {
        if (val === 'a') {
          this.$router.push({path: '/personnelStatement'});
        } else {
          this.$router.push({path: '/leaveOffice'});
        }
      },
      highGrade() {
        this.isHigh = !this.isHigh;
      },
      resetting() {
        this.params.is_dimission = '';
        this.params.forward = '';
        this.params.entry_time = [];
        this.params.leave_time = [];
      },
      //入职材料
      getEntryMaterials() {
        this.$http.get(globalConfig.server + 'setting/dictionary/515').then((res) => {
          if (res.data.code === '30010') {
            this.entryMaterialsCategory = res.data.data;
          } else {
            this.entryMaterialsCategory = [];
          }
        });
      },
      //等级
      getBranchBank() {
        this.$http.get(globalConfig.server + 'setting/dictionary/234').then((res) => {
          if (res.data.code === '30010') {
            this.branchBankCategory = res.data.data;
          } else {
            this.branchBankCategory = [];
          }
        });
      },
      openDetail(row) {
        this.staffDetail = true;
        //员工详情
        this.$http.get(globalConfig.server + 'manager/staff/' + row.id).then((res) => {
          this.staffDetailData = {};
          this.currentPost = this.currentPosition = '';
          if (res.data.code === '10020') {
            let detail = res.data.data.detail;
            this.staffDetailData = res.data.data;
            this.entry_materials = [];
            //入职材料
            if (detail && detail.entry_materials && detail.entry_materials.length > 0) {
              for (var i = 0; i < detail.entry_materials.length; i++) {
                this.entry_materials.push(Number(detail.entry_materials[i]));
              }
            }
            //部门
            let departNameArray = [];
            if (res.data.data && res.data.data && res.data.data.org.length > 0) {
              res.data.data.org.forEach((item) => {
                departNameArray.push(item.name);
              });
            }
            this.department = departNameArray.join(',');
            //职位，岗位
            let roleArray = res.data.data.role;
            let roleNames = [];
            let positionNames = [];
            if (roleArray && roleArray.length > 0) {
              roleArray.forEach((item) => {
                roleNames.push(item.display_name);
                if (item.positions) {
                  positionNames.push(item.positions.name);
                }
              });
            }
            this.currentPost = roleNames.join(',');
            this.currentPosition = positionNames.join(',');

          }
        });
        //成长轨迹
        this.$http.get(globalConfig.server + 'manager/staff/growth/' + row.id).then((res) => {
          this.growthData = res.data.data;
        });
      },
      getDefaultData() {
        this.$http.get(globalConfig.server + 'manager/department/1').then((res) => {
          if (res.data.code === '20020') {
            let data = res.data.data;
            this.params.org_id = data.id;
            this.department_id = data.id;
            this.department_name = data.name;
            this.departManageName = data.leader && data.leader.name;
          }
        });
      },
      //**************部门操作函数********************
      //获取部门数据
      getDepart() {
        this.collectLoading = true;
        this.collectStatus = ' ';
        this.$http.get(globalConfig.server + 'manager/department?search&page&limit=500&list_type=tree').then((res) => {
          this.collectLoading = false;
          if (res.data.code === '20000') {
            this.setTree = res.data.data;
            this.setTree.forEach((item) => {
              if (item.parent_id < 1 && this.defaultExpandKeys.indexOf(item.id) < 0) {
                this.defaultExpandKeys.push(item.id);
              }
            });
            this.getStaffData();
          } else {
            this.collectStatus = '暂无数据';
            this.setTree = [];
          }
        });
      },
      //点击节点
      nodeClick(data, node, store) {
        this.params.org_id = data.id;
        this.department_id = data.id;
        this.department_name = data.name;
        this.departManageName = data.leader && data.leader.name;
      },
      nodeExpand(data, node, store) {
        //展开
        if (this.defaultExpandKeys.indexOf(data.id) < 0) {
          this.defaultExpandKeys.push(data.id);
        }
      },
      nodeCollapse(data, node, store) {
        //收起
        this.defaultExpandKeys.splice(this.defaultExpandKeys.indexOf(data.id), 1);
        data.children.forEach((item) => {
          this.defaultExpandKeys.splice(this.defaultExpandKeys.indexOf(item.id), 1);
          if (item.children) {
            item.children.forEach((value) => {
              this.defaultExpandKeys.splice(this.defaultExpandKeys.indexOf(value.id), 1);
            })
          }
        })
      },
      handleSet(s, d, n) { //设置负责人
        this.organizationDialog = true;
        this.type = 'staff';
        this.setManageDepartId = d.id;
      },
      selectMember(val) {
        if (val) {
          this.$http.put(globalConfig.server_user + 'organizations/' + this.setManageDepartId, {leader_id: val[0].id}).then((res) => {
            if (res.data.status === 'success') {
              this.$notify.success({
                title: '成功',
                message: '设置负责人成功'
              });
              this.getDepart();
              this.getDefaultData();
            } else {
              this.$notify.warning({
                title: '警告',
                message: res.data.message
              })
            }
          });
        }
      },
      handleAdd(s, d, n) {//增加节点
        this.addDepart(d);
      },
      handleEdit(s, d, n) {//编辑节点
        this.editDepart(d.id);
      },
      handleDelete(s, d, n) {//删除节点
        this.$confirm('您确定删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteDpr(d.id);
        }).catch(() => {
          this.$notify.info({
            title: '消息',
            message: '已取消删除'
          });
        });
      },
      //新建部门
      addDepart(data) {
        this.parentId = data.id;
        this.parentName = data.name;
        this.addDepartDialog = true;
      },
      closeAddDepart(val) {
        this.addDepartDialog = false;
        this.parentId = null;
        this.parentName = null;
        if (val === 'success') {
          this.getDepart();
        }
      },
      //删除部门
      deleteDpr(id) {
        this.$http.get(globalConfig.server + 'manager/department/delete/' + id).then((res) => {
          if (res.data.code === '20050') {
            this.$notify.success({
              title: '成功',
              message: res.data.msg,
            });
            this.getDepart();
          } else {
            this.$notify.warning({
              title: '警告',
              message: res.data.msg,
            });
          }
        })
      },
      //编辑部门
      editDepart(id) {
        this.departId = id;
        this.editDepartDialog = true;
      },
      //编辑部门回调
      closeEditDepart(val) {
        this.editDepartDialog = false;
        this.departId = null;
        if (val === 'success') {
          this.getDepart();
        }
      },

      //================权限====================
      closePower() {
        this.powerModule = false;
        this.powerData = [];
      },

      //********************员工操作函数****************
      //获取员工数据列表
      getStaffData() {
        this.userCollectLoading = true;
        this.userCollectStatus = ' ';
        if (!this.params.entry_time) {
          this.params.entry_time = [];
        }
        if (!this.params.leave_time) {
          this.params.leave_time = [];
        }
        this.$http.get(globalConfig.server + 'manager/staff', {params: this.params}).then((res) => {
          this.userCollectLoading = false;
          this.isHigh = false;

          if (res.data.code === '10000') {
            this.staffTableData = res.data.data.data;
            this.totalStaffNum = res.data.data.count;
            if (this.staffTableData.length < 1) {
              this.userCollectStatus = '暂无数据';
            }
          } else {
            this.userCollectStatus = '暂无数据';
            this.staffTableData = [];
            this.totalStaffNum = 0;
          }
        })
      },
      //右键菜单
      openContextMenu(row, event) {
        this.editId = row.id;
        this.menuType = 'staff';
        //is_enable 有值禁用 is_on_job 离职
        if (row.is_enable && row.is_on_job) {
          this.lists = [
            {clickIndex: 'power', headIcon: 'iconfont icon-quanxian', label: '权限', data: row},
            {clickIndex: 'edit', headIcon: 'el-icon-edit', label: '修改',},
            {clickIndex: 'enable', headIcon: 'el-icons-fa-check-circle-o', label: '启用'},
            {clickIndex: 'not_on_job', headIcon: 'iconfont icon-kehuguanli', label: '复职'},
            {clickIndex: 'send_leave_msg', headIcon: 'iconfont icon-duanxin', label: '发送离职短信'},
            {clickIndex: 'view_range', headIcon: 'el-icons-fa-eye', label: '可见范围'},
          ];
        } else if (!row.is_enable && row.is_on_job) {
          this.lists = [
            {clickIndex: 'power', headIcon: 'iconfont icon-quanxian', label: '权限', data: row},
            {clickIndex: 'edit', headIcon: 'el-icon-edit', label: '修改',},
            {clickIndex: 'enable', headIcon: 'iconfont icon-jinyong--', label: '禁用'},
            {clickIndex: 'not_on_job', headIcon: 'iconfont icon-kehuguanli', label: '复职'},
            {clickIndex: 'send_leave_msg', headIcon: 'iconfont icon-duanxin', label: '发送离职短信'},
            {clickIndex: 'view_range', headIcon: 'el-icons-fa-eye', label: '可见范围'},
          ];
        } else if (row.is_enable && !row.is_on_job) {
          this.lists = [
            {clickIndex: 'power', headIcon: 'iconfont icon-quanxian', label: '权限', data: row},
            {clickIndex: 'edit', headIcon: 'el-icon-edit', label: '修改',},
            {clickIndex: 'enable', headIcon: 'el-icons-fa-check-circle-o', label: '启用'},
            {clickIndex: 'on_job', headIcon: 'iconfont icon-lizhi', label: '离职'},
            {clickIndex: 'send_leave_msg', headIcon: 'iconfont icon-duanxin', label: '发送离职短信'},
            {clickIndex: 'view_range', headIcon: 'el-icons-fa-eye', label: '可见范围'},
          ];
        } else if (!row.is_enable && !row.is_on_job) {
          this.lists = [
            {clickIndex: 'power', headIcon: 'iconfont icon-quanxian', label: '权限', data: row},
            {clickIndex: 'edit', headIcon: 'el-icon-edit', label: '修改',},
            {clickIndex: 'enable', headIcon: 'iconfont icon-jinyong--', label: '禁用'},
            {clickIndex: 'on_job', headIcon: 'iconfont icon-lizhi', label: '离职'},
            {clickIndex: 'send_leave_msg', headIcon: 'iconfont icon-duanxin', label: '发送离职短信'},
            {clickIndex: 'view_range', headIcon: 'el-icons-fa-eye', label: '可见范围'},
          ];
        }
        this.contextParams(event);
      },
      //发送离职短信
      sendLeaveMsgConfirm() {
        this.$confirm('此操作将给该员工负责的客户发送短信，是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let id = [];
          id.push(this.editId);
          if (this.selectLeaveDateDialog && !this.sendLeaveMsgDialog) {
            this.sendLeaveMsgForm.date = this.form.dismiss_time;
          }
          this.$http.post(globalConfig.server + 'core/customer/sms', {
            id: id,
            date: this.sendLeaveMsgForm.date
          }).then((res) => {
            if (res.data.code === '10050') {
              this.$notify.success({
                title: '成功',
                message: res.data.msg
              });
              this.sendLeaveMsgDialog = false;
              this.selectLeaveDateDialog = false;
            } else {
              this.$notify.warning({
                title: '警告',
                message: res.data.msg
              })
            }
          });
        }).catch(() => {

        });
      },
      //离职日期
      leaveDateConfirm() {
        this.$confirm('员工在职状态将会改变, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.put(globalConfig.server + 'manager/staff/dismiss/' + this.editId, {
            type: 'is_on_job',
            dismiss_time: this.form.dismiss_time,
            dismiss_reason: this.form.dismiss_reason,
          }).then((res) => {
            if (res.data.code === '10040') {
              this.$notify.success({
                title: '成功',
                message: res.data.msg
              });
              this.getStaffData();
              this.selectLeaveDateDialog = false;
            } else {
              this.$notify.warning({
                title: '警告',
                message: res.data.msg
              })
            }
          });
        }).catch(() => {

        });
      },
      //理智并发送短信
      leaveAndSendMsgConfirm() {
        this.$confirm('员工在职状态将会改变并且向该员工所负责的客户发送短信, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.put(globalConfig.server + 'manager/staff/dismiss/' + this.editId, {
            type: 'is_on_job',
            dismiss_time: this.form.dismiss_time,
            dismiss_reason: this.form.dismiss_reason,
          }).then((res) => {
            if (res.data.code === '10040') {
              this.$notify.success({
                title: '成功',
                message: res.data.msg
              });
              this.getStaffData();
              let id = [];
              id.push(this.editId);
              if (this.selectLeaveDateDialog && !this.sendLeaveMsgDialog) {
                this.sendLeaveMsgForm.date = this.form.dismiss_time;
              }
              this.$http.post(globalConfig.server + 'core/customer/sms', {
                id: id,
                date: this.sendLeaveMsgForm.date
              }).then((res) => {
                if (res.data.code === '10050') {
                  this.$notify.success({
                    title: '成功',
                    message: res.data.msg
                  });
                  // this.sendLeaveMsgDialog = false;
                  this.selectLeaveDateDialog = false;
                } else {
                  this.$notify.warning({
                    title: '警告',
                    message: res.data.msg
                  })
                }
              });
            } else {
              this.$notify.warning({
                title: '警告',
                message: res.data.msg
              })
            }
          });
        }).catch(() => {

        });
      },
      //选择复职等级
      levelConfirm() {
        this.$confirm('员工在职状态将会改变, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.put(globalConfig.server + 'manager/staff/dismiss/' + this.editId, {
            type: 'is_on_job',
            level: this.levelForm.level
          }).then((res) => {
            if (res.data.code === '10040') {
              this.$notify.success({
                title: '成功',
                message: res.data.msg
              });
              this.getStaffData();
              this.selectLevelDialog = false;
              this.editId = '';
            } else {
              this.$notify.warning({
                title: '警告',
                message: res.data.msg
              })
            }
          });
        }).catch(() => {

        });
      },
      //员工右键回调
      openModalDialog(val) {
        if (val.clickIndex === 'edit') {
          this.addStaffDialog = true;
          this.isEdit = true;
        } else if (val.clickIndex === 'delete') {
          this.deleteStaff();
        } else if (val.clickIndex === 'enable') {
          this.enableStaff();
        } else if (val.clickIndex === 'not_on_job') {
          this.selectLevelDialog = true;
          this.levelForm.level = '';
        } else if (val.clickIndex === 'on_job') {
          this.selectLeaveDateDialog = true;
          this.form.dismiss_time = '';
          this.form.dismiss_reason = {
            dismiss_type: '',
            dismiss_mess: '',
          };
        } else if (val.clickIndex === 'power') {
          this.powerModule = true;
          this.powerData = val.data;
        } else if (val.clickIndex === 'send_leave_msg') {
          this.sendLeaveMsgDialog = true;
        } else if (val.clickIndex === 'view_range') {
          this.viewRangeDialog = true;
        }

      },
      //禁用，启用
      enableStaff() {
        this.$confirm('员工禁用状态将会改变, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.put(globalConfig.server + 'manager/staff/dismiss/' + this.editId, {type: 'is_enable'}).then((res) => {
            if (res.data.code === '10040') {
              this.$notify.success({
                title: '成功',
                message: res.data.msg
              });
              this.getStaffData();
            } else {
              this.$notify.warning({
                title: '警告',
                message: res.data.msg
              })
            }
          });
        }).catch(() => {

        });
      },
      //删除员工
      deleteStaff() {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          this.$http.get(globalConfig.server + 'manager/staff/delete/' + this.editId).then((res) => {
            if (res.data.code === '10060') {
              this.getStaffData();
              this.$notify.success({
                title: '成功',
                message: '删除成功',
              });
            } else {
              this.$notify.info({
                title: '消息',
                message: res.data.msg
              });
            }
          });
        }).catch(() => {
          this.$notify.info({
            title: '消息',
            message: '已取消删除',
          });
        });

      },
      //新建员工
      addStaff() {
        this.addStaffDialog = true;
        this.isEdit = false;
      },
      closeAddStaff(val) {
        this.addStaffDialog = false;
        this.isEdit = false;
        this.editId = '';
        if (val === 'success') {
          this.getStaffData();
          this.getDepart();
        }
      },

      //********************职位操作函数****************
      //获取单独职位列表
      getOnlyPosition() {
        this.positionTableData = [];
        this.totalPositionNum = 0;
        this.postStaffData = [];
        this.totalPositionNum = 0;
        if (this.params.org_id) {
          this.positionCollectLoading = true;
          this.positionCollectStatus = ' ';
          this.$http.get(globalConfig.server + 'manager/position?department_id=' + this.params.org_id + '&page=' + this.positionParams.page
            + '&limit=' + this.positionParams.limit).then((res) => {
            this.positionCollectLoading = false;
            if (res.data.code === '20000') {
              this.positionList = res.data.data.data;
              this.totalOnlyPositionNum = res.data.data.count;
              if (res.data.data.data.length > 0) {
                this.onlyPositionId = res.data.data.data[0].id;
                this.getPosition();
              } else {
                this.positionCollectStatus = '暂无数据';
                this.postCollectStatus = '暂无数据';
                this.postStaffStatus = '暂无数据';
              }
            } else {
              this.$notify.info({
                title: '消息',
                message: res.data.msg,
              });
              this.positionCollectStatus = '暂无数据';
              this.postCollectStatus = '暂无数据';
              this.postStaffStatus = '暂无数据';
              this.positionList = [];
              this.totalOnlyPositionNum = 0;
            }
          })
        }
      },
      //职位右键菜单
      openOnlyPositionMenu(row, event) {
        this.onlyPositionId = row.id;
        this.onlyPositionName = row.name;
        this.department_id = row.org_id;
        this.department_name = row.org.name;

        this.menuType = 'onlyPosition';
        this.lists = [
          {clickIndex: 'addPost', headIcon: 'el-icon-plus', label: '增加岗位',},
          {clickIndex: 'edit', headIcon: 'el-icon-edit', label: '修改',},
          {clickIndex: 'delete', headIcon: 'el-icon-delete', label: '删除',},
        ];
        this.contextParams(event);
      },
      //职位单击
      clickOnlyPositionMenu(row, event) {
        this.onlyPositionId = row.id;
        this.onlyPositionName = row.name;
        this.department_id = row.org.id;
        this.department_name = row.org.name;

        this.postParams.page = 1;
        this.getPosition();
      },
      clickPostMenu(row, event) {
        this.selectPostName = row.role.name;
        this.getPostStaffData();
      },
      //右键职位回调
      openOnlyPositionDialog(val) {
        if (val.clickIndex === 'edit') {
          this.editOnlyPositionDialog = true;
        } else if (val.clickIndex === 'delete') {
          this.$confirm('此操作将永久删除, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.deleteOnlyPosition();
          }).catch(() => {
            this.$notify.info({
              title: '消息',
              message: '已取消删除'
            });
          });
        } else if (val.clickIndex === 'addPost') {
          this.addPosition('post');
        }
      },

      //修改职位完成回调
      closeEditOnlyPosition(val) {
        this.editOnlyPositionDialog = false;
        if (val === 'success') {
          this.getOnlyPosition();
        }
      },

      //关闭可见范围模态框
      closeViewRange() {
        this.viewRangeDialog = false;
      },

      //删除职位
      deleteOnlyPosition() {
        this.$http.get(globalConfig.server + 'manager/position/delete/' + this.onlyPositionId).then((res) => {
          if (res.data.code === '20050') {
            this.$notify.success({
              title: '消息',
              message: '删除成功',
            });
            this.getOnlyPosition();
          } else {
            this.$notify.warning({
              title: '警告',
              message: res.data.msg,
            });
          }
        })
      },

      //********************岗位操作函数****************
      //根据职位获取岗位
      getPosition() {
        this.postStaffData = [];
        this.postCollectLoading = true;
        this.postCollectStatus = ' ';
        this.$http.get(globalConfig.server + 'manager/positions?type=' + this.onlyPositionId + '&page=' +
          this.postParams.page + '&limit=' + this.postParams.limit).then((res) => {
          this.postCollectLoading = false;
          if (res.data.code === '20000') {
            let arr = res.data.data.data;
            for (let i = 0; i < arr.length; i++) {
              arr.forEach((item) => {
                if (item.parent_id === arr[i].id) {
                  item.parent_name = arr[i].name;
                }
              });
            }
            arr.forEach((item) => {
              item.orgName = this.department_name;
            });
            // this.postParams.page = 2;
            this.positionTableData = res.data.data.data;
            this.totalPostNum = res.data.data.count;
            if (res.data.data.data.length > 0) {
              this.selectPostName = res.data.data.data[0].role && res.data.data.data[0].role.name;
              this.getPostStaffData();
            } else {
              this.postCollectStatus = '暂无数据';
              this.postStaffStatus = '暂无数据';
            }
          } else {
            this.totalPostNum = 0;
            this.positionTableData = [];
            this.postCollectStatus = '暂无数据';
            this.postStaffStatus = '暂无数据';
          }
        })
      },
      //岗位右键菜单
      openPositionMenu(row, event) {
        this.positionId = row.id;
        this.positionName = row.name;
        this.menuType = 'position';
        this.lists = [
          {clickIndex: 'edit', headIcon: 'el-icon-edit', label: '修改',},
          {clickIndex: 'delete', headIcon: 'el-icon-delete', label: '删除',},
        ];
        this.contextParams(event);
      },
      openPositionDialog(val) {     //g岗位右键回调函数
        if (val.clickIndex === 'edit') {
          this.editPositionDialog = true;
        } else if (val.clickIndex === 'delete') {
          this.$confirm('此操作将永久删除, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.deletePosition();
          }).catch(() => {
            this.$notify.info({
              title: '消息',
              message: '已取消删除',
            });
          });
        }
      },
      //修改岗位完成回调
      closeEditPosition(val) {
        this.editPositionDialog = false;
        if (val === 'success') {
          this.getPosition();
        }
      },
      //删除岗位
      deletePosition() {
        this.$http.get(globalConfig.server + 'manager/positions/delete/' + this.positionId).then((res) => {
          if (res.data.code === '20050') {
            this.$notify.success({
              title: '成功',
              message: '删除成功',
            });
            this.getPosition();
          } else {
            this.$notify.warning({
              title: '警告',
              message: res.data.msg,
            });
          }
        })
      },
      //新建岗位  position职位  post岗位
      addPosition(val) {
        this.addPositionDialog = true;
        if (val === 'position') {
          this.addPositionParams = Object.assign({}, this.addPositionParams,
            {depart_id: this.params.org_id, depart_name: this.department_name, post_position: 'position'})
        } else {
          this.addPositionParams = Object.assign({}, this.addPositionParams,
            {
              depart_id: this.params.org_id, depart_name: this.department_name, post_position: 'post',
              position_id: this.onlyPositionId, position_name: this.onlyPositionName
            })
        }
      },
      closeAddPosition(val) {
        this.addPositionDialog = false;
        if (val === 'success') {
          if (this.addPositionParams.post_position === 'position') {
            this.getOnlyPosition();
          } else if (this.addPositionParams.post_position === 'post') {
            this.getPosition();
          }
        }
      },
      //********************右键配置操作函数****************
      contextParams(event) {
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
      //右键回调时间
      clickEvent(index) {
        if (this.menuType === 'staff') {
          this.openModalDialog(index);
        } else if (this.menuType === 'position') {
          this.openPositionDialog(index);
        } else if (this.menuType === 'onlyPosition') {
          this.openOnlyPositionDialog(index);
        }
      },
      //关闭右键菜单
      closeMenu() {
        this.show = false;
      },
      getPostStaffData() {
        if (!this.selectPostName) {
          return false;
        } else {
          this.postStaffLoading = true;
          this.postStaffStatus = ' ';
        }
        this.$http.get(globalConfig.server_user + 'users?role=' + this.selectPostName + '&page=' + this.postStaffParams.page
          + '&per_page_number=' + this.postStaffParams.limit).then((res) => {
          this.postStaffLoading = false;
          if (res.data.status === 'success') {
            this.postStaffData = res.data.data;
            this.totalPostStaffNum = res.data.meta.total;
            if (res.data.data.length < 1) {
              this.postStaffStatus = '暂无数据';
              this.postStaffData = [];
              this.totalPostStaffNum = 0;
            }
          } else {
            this.postStaffStatus = '暂无数据';
            this.postStaffData = [];
            this.totalPostStaffNum = 0;
          }
        });
      },
      //********************树配置操作函数****************
      renderContent(h, {node, data, store}) {//加载节点
        let that = this;
        return h(TreeRender, {
          props: {
            DATA: data,
            NODE: node,
            STORE: store,
          },
          on: {
            nodeSet: ((s, d, n) => that.handleSet(s, d, n)),
            nodeAdd: ((s, d, n) => that.handleAdd(s, d, n)),
            nodeEdit: ((s, d, n) => that.handleEdit(s, d, n)),
            nodeDel: ((s, d, n) => that.handleDelete(s, d, n))
          }
        });
      },
      //*************选人框**********************
      //关闭回调
      closeOrganization() {
        this.organizationDialog = false;
      },
      //确定排序
      confirmSave() {
        this.$confirm('您确定保存吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$notify.success({
            title: '成功',
            message: '保存成功',
          });
        }).catch(() => {
          this.$notify.info({
            title: '消息',
            message: '已取消',
          });
        });
      },
      //****************搜索*************
      search() {
        if (this.activeName === 'first') {
          this.params.page = 1;
          this.getStaffData();
        } else if (this.activeName === 'second') {
          this.positionParams.page = 1;
          this.getOnlyPosition();
        }
      },
      //**********分页************************
      handleSizeChange(val) {
        this.params.limit = val;
        if (this.activeName === 'first') {
          this.getStaffData();
        } else if (this.activeName === 'second') {
          this.getOnlyPosition();
        }
      },
      handleCurrentChange(val) {
        this.params.page = val;
        if (this.activeName === 'first') {
          this.getStaffData();
        } else if (this.activeName === 'second') {
          this.getOnlyPosition();
        }
      },

      //职位
      handlePositionSizeChange(val) {
        this.positionParams.limit = val;
        this.getOnlyPosition();
      },
      handlePositionCurrentChange(val) {
        this.positionParams.page = val;
        this.getOnlyPosition();
      },
      //岗位
      handlePostSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.postParams.limit = val;
        this.getPosition();
      },
      handlePostCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.postParams.page = val;
        this.getPosition();
      },
      //岗位下的员工
      handlePostStaffSizeChange(val) {
        this.postStaffParams.limit = val;
        this.getPostStaffData();
      },
      handlePostStaffCurrentChange(val) {
        this.postStaffParams.page = val;
        this.getPostStaffData();
      },

      initExpand() {
        this.setTree.map((a) => {
//          this.defaultExpandKeys.push(a.id)
        });
        this.isLoadingTree = true;
      },

      //************列表变色************
      tableRowClassName({row, rowIndex}) {
        if (row.id === this.onlyPositionId) {
          return 'success-row';
        }
        return '';
      },
      tableRowPostClassName({row, rowIndex}) {
        if (row.role.name === this.selectPostName) {
          return 'success-row';
        }
        return '';
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped="" lang="scss">
  .content {
    padding: 0 10px;
    min-height: 32px;
    background: #eef3fc;
    border-radius: 4px;
    font-size: 12px;
    color: #727479;
    line-height: 30px;
  }

  #staffManage {
    min-height: 790px;
    .border {
      border: 1px solid #f0f7ff;
      border-radius: 4px;
      min-height: 790px;
      .top {
        padding: 0 10px;
        height: 40px;
        background: #dfe6fb;
        color: #787a7e;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      #sortTable {
        user-select: none;
        padding: 10px;
        .ul_header {
          background: #ecf5ff;
          cursor: default;
          padding: 8px;
          border-bottom: 1px solid #ebeef5;
          text-align: center;
          &:hover {
            background: #ecf5ff;
          }
        }
        li {
          padding: 8px;
          background: #ffffff;
          border-bottom: 1px solid #ebeef5;
          cursor: move;
          &:hover {
            background: #f5f7fa;
          }
        }
      }
    }

    .left {

    }
    .right {
      .top {
        display: flex;
        justify-content: space-between;
      }
      .filter {
        padding: 10px 10px 0 10px;
      }
      .staffTable {
        padding: 0 10px;
      }
      .tableBox {
        border: 1px solid #dfe6fb;
        margin-bottom: 20px;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
        .tableBottom {
          padding: 8px;
          display: flex;
          justify-content: flex-end;
        }
      }
      .tableBottom {
        padding: 8px;
        display: flex;
        justify-content: flex-end;
      }
    }
  }
</style>
