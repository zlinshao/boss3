<template>
  <div @click="show=false" @contextmenu="closeMenu" id="receivable">
    <div class="highRanking">
      <div class="highSearch">
        <el-form :model="form" :inline="true" size="mini">
          <el-form-item>
            <el-input placeholder="请输入内容" v-model="form.search" size="mini" clearable
                      @keyup.enter.native.prevent="getTableData('search')">
              <el-button slot="append" icon="el-icon-search" @click="getTableData('search')"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="handleOpenContrastRunning">对比流水</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getTableData"><i class="el-icon-refresh"></i></el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addPayVisible = true" :disabled="isRecycle"><i class="el-icon-plus"></i>&nbsp;新增</el-button>
          </el-form-item>
          <el-form-item>
            <el-dropdown trigger="click" @command="leadingOut">
              <el-button type="primary" size="mini" :disabled="isRecycle">
                导出<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="collect">导出</el-dropdown-item>
                <el-dropdown-item command="rent">催缴导出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-form-item>
          <el-form-item v-if="!isRecycle">
            <el-button type="success" @click="sendMsgVisible = true" icon="el-icon-message" :disabled="currentSelectIds.length > 0 ? false : true">发送短信</el-button>
          </el-form-item>
          <el-form-item v-if="!isRecycle">
            <el-button type="danger" @click="createVisible = true" icon="el-icon-printer" :disabled="createShow > 0 ? false : true">生成违约金</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" icon="el-icon-delete" @click="handleClear">回收站</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="filter high_grade" :class="isHigh? 'highHide':''">
        <el-form :inline="true" onsubmit="return false" :model="form" size="mini" label-width="100px">
          <div class="filterTitle">
            <i class="el-icons-fa-bars"></i>&nbsp;&nbsp;高级搜索
          </div>
          <el-row class="el_row_border">
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">入账状态</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-select v-model="form.status" clearable size="mini">
                      <el-option v-for="(key,index) in values" :label="key" :value="index + 1" :key="index"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">应收日期</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <div class="block">
                      <el-date-picker
                        v-model="rangeDate"
                        type="daterange"
                        align="right"
                        unlink-panels
                        value-format="yyyy-MM-dd"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        @change="handleSelRangDate"
                        :picker-options="pickerOptions">
                      </el-date-picker>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row class="el_row_border">
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">催缴状态</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-select v-model="form.tag_status" clearable size="mini">
                      <el-option v-for="(key,index) in tag_status" :label="key" :value="index + 1"
                                 :key="index"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">催缴日期</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <div class="block">
                      <el-date-picker
                        v-model="tagDate"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="yyyy-MM-dd"
                        @change="handleSelTagDate"
                        :picker-options="pickerOptions">
                      </el-date-picker>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row class="el_row_border">
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">科目</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-input v-model="subject_name" @focus="openSubjectTree" placeholder="请选择"
                              readonly>
                      <template slot="append">
                        <div style="cursor: pointer;" @click="clearSubjectTree">清空</div>
                      </template>
                    </el-input>
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
                    <el-input v-model="department_name" @focus="chooseStaff('depart')" placeholder="请选择员工"
                              readonly>
                      <template slot="append">
                        <div style="cursor: pointer;" @click="closeStaff('depart')">清空</div>
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
                  <div class="el_col_label">员工</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-input v-model="staff_name" @focus="chooseStaff('staff')" placeholder="请选择员工"
                              readonly>
                      <template slot="append">
                        <div style="cursor: pointer;" @click="closeStaff('staff')">清空</div>
                      </template>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">剩余款项范围</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-input v-model="form.minPrice" style="width: 120px" clearable placeholder="最小值"></el-input>
                    -
                    <el-input style="width: 120px" v-model="form.maxPrice" clearable placeholder="最大值"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <div class="btnOperate">
            <el-button size="mini" type="primary" @click="getTableData">搜索</el-button>
            <el-button size="mini" type="primary" @click="resetting">重置</el-button>
            <el-button size="mini" type="primary" @click="highGrade">取消</el-button>
          </div>
        </el-form>
      </div>
    </div>

    <!--应收-->
    <div>
      <el-table
        :empty-text='collectStatus'
        v-loading="collectLoading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255, 255, 255, 0)"
        :data="collectData"
        @row-contextmenu="collectMenu"
        @selection-change="handleSelectionChange"
        highlight-current-row
        @current-change="handleListCurrentChange"
        :row-class-name="tableRowClassName"
        :header-row-style="handleHeaderStyle"
      >
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="收款时间"
          prop="pay_date">
        </el-table-column>
        <el-table-column
          label="客户姓名"
          prop="customer.customer_name"
        ></el-table-column>
        <el-table-column
          label="地址"
          prop="addr">
          <template slot-scope="scope">
            <span v-if="scope.row.addr">{{ scope.row.addr }}</span>
            <span v-else-if="scope.row.addra">{{ scope.row.addra }}</span>
            <span v-else-if="scope.row.addru">{{ scope.row.addru }}</span>
            <span v-else>/</span>
          </template>
        </el-table-column>
        <el-table-column
          label="收入科目"
          prop="subject">
        </el-table-column>
        <el-table-column
          label="应收金额"
          prop="amount_receivable">
        </el-table-column>
        <el-table-column
          label="实收金额"
          prop="amount_received">
        </el-table-column>
        <el-table-column
          label="剩余款项"
          prop="balance">
        </el-table-column>
        <el-table-column
          label="补齐时间"
          prop="complete_date"
        >
        </el-table-column>
        <el-table-column
          label="状态"
          prop="status">
          <template slot-scope="scope">
            <el-button v-if="scope.row.status === '待入账'" type="danger" size="mini">待入账</el-button>
            <el-button v-if="scope.row.status === '待结清'" type="warning" size="mini">待结清</el-button>
            <el-button v-if="scope.row.status === '已结清'" type="success" size="mini">已结清</el-button>
            <el-button v-if="scope.row.status === '已超额'" type="primary" size="mini">已超额</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="手机号"
          prop="customer.contact">
        </el-table-column>
        <el-table-column
          label="明细详情"
          min-width="300px"
        >
          <template slot-scope="scope">
              <span v-if="scope.row.info">
                <span v-for="item in scope.row.info">{{ item }}/</span>
              </span>
              <span v-else>/</span>
          </template>
        </el-table-column>
        <el-table-column label="备注" min-width="120px">
          <template slot-scope="scope">
            <span v-if="scope.row.tags">
              <span v-for="item in scope.row.tags" style="text-overflow: ellipsis;white-space: nowrap;overflow: hidden">{{ item.content }};</span>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="负责人">
          <template slot-scope="scope">
            <span v-if="scope.row.customer && scope.row.customer.leader && scope.row.customer.leader.name">
              {{ scope.row.customer.leader.name }}
            </span>
            <span v-else>/</span>
          </template>
        </el-table-column>
        <el-table-column label="开单人">
          <template slot-scope="scope">
            <span v-if="scope.row.customer && scope.row.customer.staff && scope.row.customer.staff.name">
              {{ scope.row.customer.staff.name }}
            </span>
            <span v-else>/</span>
          </template>
        </el-table-column>
        <el-table-column label="部门">
          <template slot-scope="scope">
            <span v-if="scope.row.department && scope.row.department.name">
              {{ scope.row.department.name }}
            </span>
            <span v-else>/</span>
          </template>
        </el-table-column>
        <el-table-column label="催缴备注">
          <template slot-scope="scope">
            <span v-if="scope.row.remarks" style="text-overflow: ellipsis;white-space: nowrap;overflow: hidden">
              <span v-for="item in scope.row.remarks" :key="item.id">{{ item.content }}&nbsp;&nbsp;</span>
            </span>
            <div v-else>/</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" v-if="!isRecycle">
          <template slot-scope="scope">
            <el-button type="text" @click="handleCtrlDetail(scope)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block pages">
        <div>
        <span>
          应收金额(元)：<span style="color: #78cd51;">{{sum.receivable_sum}}</span>
        </span>&nbsp;&nbsp;&nbsp;&nbsp;
          <span>
          实收金额(元)：<span style="color: #f66;">{{sum.received_sum}}</span>
        </span>&nbsp;&nbsp;&nbsp;&nbsp;
          <span>
          剩余款项(元)：<span style="color: #ff9a02;">{{sum.balance_sum}}</span>
        </span>
        </div>
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[12,20,40]"
          :page-size="12"
          layout="total, prev, pager, next"
          :total="totalNum">
        </el-pagination>
      </div>
    </div>
    <!--右键-->
    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperate="clickEvent"></RightMenu>

    <!--组织架构-->
    <organization :organizationDialog="organizeVisible" @close="closeOrganize" :type="organizeType"
                  @selectMember="selectMember"></organization>

    <!--编辑补齐时间-->
    <PolishTime :module="polishTimeVisible" :date="polishTime" @close="closePolishTime" @ok="handleOkTime"></PolishTime>

    <!-- 科目搜索 -->
    <subjectTree :subjectDialog="subjectVisible" :types="subjectType" @close="closeSubjectTree"
                 @selectSubject="selectSubject"></subjectTree>
    <!--应收详情-->
    <el-dialog
      :visible.sync="detailVisible"
      title="详情"
      width="80%"
    >
      <div>
        <div v-if="DetailCurrentRow.pendable === 1" style="margin-bottom: 20px;width: 95%">
          <el-button size="mini" type="success" @click="handleDealWith(DetailCurrentRow.id)">生成待处理项</el-button>
        </div>
        <el-row :gutter="20" style="margin-bottom: 25px;">
          <el-col :span="6">
            <span style="color: #409EFF;" class="receive_title">房屋地址：</span>
            <span class="receive_detail" v-if="DetailCurrentRow.address">{{ DetailCurrentRow.address }}</span>
            <span class="receive_detail" v-else>/</span>
          </el-col>
          <el-col :span="6">
            <span style="color: #409EFF;" class="receive_title">客户姓名：</span>
            <span class="receive_detail" v-if="DetailCurrentRow.customer && DetailCurrentRow.customer.customer_name ">{{ DetailCurrentRow.customer.customer_name }}</span>
            <span class="receive_detail" v-else>/</span>
          </el-col>
          <el-col :span="6">
            <span style="color: #409EFF;" class="receive_title">应收金额：</span>
            <span class="receive_detail" v-if="DetailCurrentRow.amount_receivable">{{ DetailCurrentRow.amount_receivable }}</span>
            <span class="receive_detail" v-else>/</span>
          </el-col>
          <el-col :span="6">
            <span style="color: #409EFF;" class="receive_title">实收金额：</span>
            <span class="receive_detail" v-if="DetailCurrentRow.amount_received">{{ DetailCurrentRow.amount_received }}</span>
            <span class="receive_detail" v-else>/</span>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-bottom: 25px;">
          <el-col :span="6">
            <span style="color: #409EFF;" class="receive_title">汇款方式：</span>
            <span class="receive_detail" v-if="DetailCurrentRow.account_type ">{{ DetailCurrentRow.account_type }}</span>
            <span class="receive_detail" v-else>/</span>
          </el-col>
          <el-col :span="6">
            <span style="color: #409EFF;" class="receive_title">剩余款项：</span>
            <span class="receive_detail" v-if="DetailCurrentRow.balance ">{{ DetailCurrentRow.balance }}</span>
            <span class="receive_detail" v-else>/</span>
          </el-col>
          <el-col :span="6">
            <span style="color: #409EFF;" class="receive_title">收款人姓名：</span>
            <span class="receive_detail" v-if="DetailCurrentRow.customer && DetailCurrentRow.customer.account_owner ">{{ DetailCurrentRow.customer.account_owner }}</span>
            <span class="receive_detail" v-else>/</span>
          </el-col>
          <el-col :span="6">
            <span style="color: #409EFF;" class="receive_title">收款时间：</span>
            <span class="receive_detail" v-if="DetailCurrentRow.customer && DetailCurrentRow.customer.deal_date ">{{ DetailCurrentRow.customer.deal_date }}</span>
            <span class="receive_detail" v-else>/</span>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-bottom: 25px;">
          <el-col :span="6">
            <span style="color: #409EFF;" class="receive_title">开户行：</span>
            <span class="receive_detail" v-if="DetailCurrentRow.account_bank ">{{ DetailCurrentRow.account_bank }}</span>
            <span class="receive_detail" v-else>/</span>
          </el-col>
          <el-col :span="6">
            <span style="color: #409EFF;" class="receive_title">补齐时间：</span>
            <span class="receive_detail" v-if="DetailCurrentRow.complete_date ">{{ DetailCurrentRow.complete_date }}</span>
            <span class="receive_detail" v-else>/</span>
          </el-col>
          <el-col :span="6">
            <span style="color: #409EFF;" class="receive_title">支行：</span>
            <span class="receive_detail" v-if="DetailCurrentRow.customer && DetailCurrentRow.customer.account_subbank ">{{ DetailCurrentRow.customer.account_subbank }}</span>
            <span class="receive_detail" v-else>/</span>
          </el-col>
          <el-col :span="6">
            <span style="color: #409EFF;" class="receive_title">收入科目：</span>
            <span class="receive_detail" v-if="DetailCurrentRow.subject ">{{ DetailCurrentRow.subject }}</span>
            <span class="receive_detail" v-else>/</span>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-bottom: 25px;">
          <el-col :span="6">
            <span style="color: #409EFF;" class="receive_title">账号：</span>
            <span class="receive_detail" v-if="DetailCurrentRow.customer && DetailCurrentRow.customer.account_num ">{{ DetailCurrentRow.customer.account_num }}</span>
            <span class="receive_detail" v-else>/</span>
          </el-col>
          <el-col :span="6">
            <span style="color: #409EFF;" class="receive_title">历史收款记录：</span>
            <span class="receive_detail" v-if="DetailCurrentRow.customer && DetailCurrentRow.account_history ">
              <span v-for="item in DetailCurrentRow.account_history">{{item.date}};</span>
            </span>
            <span class="receive_detail" v-else>/</span>
          </el-col>
          <el-col :span="6">
            <span style="color: #409EFF;" class="receive_title">地址：</span>
            <span class="receive_detail" v-if="DetailCurrentRow.address ">{{ DetailCurrentRow.address }}</span>
            <span class="receive_detail" v-else>/</span>
          </el-col>
          <el-col :span="6">
            <span style="color: #409EFF;" class="receive_title">详情：</span>
            <span class="receive_detail" v-if="DetailCurrentRow.description && DetailCurrentRow.description.description ">{{ DetailCurrentRow.description.description }}</span>
            <span class="receive_detail" v-else>/</span>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-bottom: 25px;">
          <el-col :span="6">
            <span style="color: #409EFF;" class="receive_title">备注：</span>
            <span class="receive_detail" v-if="DetailCurrentRow.tags && DetailCurrentRow.tags.length > 0" style="text-align: left">
              <span v-for="(item,key) in DetailCurrentRow.tags">{{key + 1}}：{{ item.content }}<br></span>
            </span>
            <span class="receive_detail" v-else>/</span>
          </el-col>
          <el-col :span="6">
            <span style="color: #409EFF;" class="receive_title">催缴备注：</span>
            <span class="receive_detail" v-if="DetailCurrentRow.remarks && DetailCurrentRow.remarks.length > 0" style="text-align: left">
              <span v-for="(item,key) in DetailCurrentRow.remarks">[{{ item.category }}]-[{{ item.content }}]-[{{ item.create_time }}]<br></span>
            </span>
            <span class="receive_detail" v-else>/</span>
          </el-col>
          <el-col :span="6">
            <span style="color: #409EFF;" class="receive_title">手机号：</span>
            <span class="receive_detail" v-if="DetailCurrentRow.customer && DetailCurrentRow.customer.contact">{{ DetailCurrentRow.customer.contact }}</span>
            <span class="receive_detail" v-else>/</span>
          </el-col>
          <el-col :span="6">
            <span style="color: #409EFF;" class="receive_title">租房月数：</span>
            <span class="receive_detail" v-if="DetailCurrentRow.customer && DetailCurrentRow.customer.months">{{ DetailCurrentRow.customer.months }}</span>
            <span class="receive_detail" v-else>/</span>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-bottom: 25px;">
          <el-col :span="6">
            <span style="color: #409EFF;" class="receive_title">月单价：</span>
            <span class="receive_detail" v-if="DetailCurrentRow.customer && DetailCurrentRow.customer.prices">
              <span v-for="item in DetailCurrentRow.customer['prices']">{{ item }} &nbsp;&nbsp;</span>
            </span>
            <span class="receive_detail" v-else>/</span>
          </el-col>
          <el-col :span="6">
            <span style="color: #409EFF;" class="receive_title">合同时间周期：</span>
            <span class="receive_detail" v-if="DetailCurrentRow.description && DetailCurrentRow.description.months">{{ DetailCurrentRow.description.months }}</span>
            <span class="receive_detail" v-else>/</span>
          </el-col>
          <el-col :span="6">
            <span style="color: #409EFF;" class="receive_title">开单人：</span>
            <span class="receive_detail" v-if="DetailCurrentRow.description && DetailCurrentRow.description.staff">{{ DetailCurrentRow.description.staff }}</span>
            <span class="receive_detail" v-else>/</span>
          </el-col>
          <el-col :span="6">
            <span style="color: #409EFF;" class="receive_title">部门：</span>
            <span class="receive_detail" v-if="DetailCurrentRow.department && DetailCurrentRow.department.name">{{ DetailCurrentRow.department.name }}</span>
            <span class="receive_detail" v-else>/</span>
          </el-col>
        </el-row>
      </div>
    </el-dialog>

    <!--添加备注-->
    <el-dialog
      :visible.sync="remarkVisible"
      title="备注"
      width="40%"
      @close="cancelRemark"
    >
      <div v-if="isFastMark">
        <span>催缴类型：</span>
        <el-select v-model="remarkType" clearable size="mini" style="margin-bottom: 20px;width: 80%">
          <el-option v-for="(key,index) in tag_status" :label="key" :value="index + 1"
                     :key="index"></el-option>
        </el-select>
      </div>
      <span>备注信息：</span>
      <el-input type="textarea" :row="12" v-model="add_remark" placeholder="请输入备注信息" style="width: 80%;vertical-align: top"></el-input>
      <div style="margin-top: 20px;text-align: right">
        <el-button size="mini" @click="cancelRemark">取消</el-button>
        <el-button type="primary" size="mini" @click="handleAddRemark">确定</el-button>
      </div>
    </el-dialog>

    <!--催缴导出-->
    <el-dialog
      :visible.sync="fastOutVisible"
      title="催缴导出"
      width="30%"
    >
      <el-date-picker
        v-model="fastOutDate"
        type="daterange"
        align="right"
        size="small"
        unlink-panels
        value-format="yyyy-MM-dd"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions">
      </el-date-picker>
      <div style="margin-top: 30px;text-align: right;">
        <el-button @click="fastOutVisible = false" size="mini">取消</el-button>
        <el-button @click="goFastOut" size="mini" type="primary">确定</el-button>
      </div>
    </el-dialog>

    <!--发送短信-->
    <el-dialog
      :visible.sync="sendMsgVisible"
      title="发送短信"
      width="30%"
    >
      发送类型：rrrrr
      <el-select v-model="selectMsgType" size="mini" style="width: 80%">
        <el-option :value="1" label="催缴"></el-option>
        <el-option :value="2" label="到期"></el-option>
        <el-option :value="3" label="逾期"></el-option>
      </el-select>
      <div style="margin-top: 30px;text-align: right">
        <el-button size="mini" @click="sendMsgVisible = false">取消</el-button>
        <el-button size="mini" @click="OkSendMsg" type="primary">确定</el-button>
      </div>
    </el-dialog>

    <!--新增应收-->
    <el-dialog
      :visible.sync="addPayVisible"
      title="新增应收"
      width="30%"
    >
      <div style="width: 85%;text-align: center;">
        <el-form :model="addForm" :rules="addFormRules" ref="addPayForm" status-icon label-width="100px" size="small">
          <el-form-item label="客户名称" prop="customer_name">
            <el-input @focus="customer_list_visible = true" size="mini" v-model="customer_name" placeholder="点击选择"></el-input>
          </el-form-item>
          <el-form-item label="房屋地址">
            <el-input disabled v-model="address" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="客户身份" prop="identity">
            <el-select v-model="addForm.identity">
              <el-option :value="1" label="房东"></el-option>
              <el-option :value="2" label="租客"></el-option>
              <el-option :value="3" label="未知租客"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="应收金额" prop="amount_receivable">
            <el-input type="number" v-model="addForm.amount_receivable"></el-input>
          </el-form-item>
          <el-form-item label="收款日期" prop="pay_date">
            <el-date-picker
              v-model="addForm.pay_date"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="科目">
            <el-input @focus="openSubjectTree" clearable v-model="addSubjectName"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input v-model="addForm.description" type="textarea" :row="8" placeholder="请输入描述"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input v-model="addForm.remark" type="textarea" :row="8" placeholder="请输入备注"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="mini" @click="handleAddPayCancel">取消</el-button>
            <el-button size="mini" type="primary" @click="handleAddPay('addPayForm')">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>

    <!--获取客户列表-->
    <el-dialog
      :visible="customer_list_visible"
      title="用户列表"
      @close="customer_list_visible = false"
    >
      <div>
        <el-row :gutter="20">
          <el-col :span="12">
            类型：<el-select size="mini" style="width: 60%" v-model="customer_params.type">
            <el-option :value="1" label="房东"></el-option>
            <el-option :value="2" label="租客"></el-option>
            <el-option :value="3" label="未知租客"></el-option>
          </el-select>
          </el-col>
          <el-col :span="12">
            <el-input size="mini" style="width: 60%" v-model="customer_params.search" clearable c placeholder="请输入需求搜索的内容"></el-input>
            <el-button type="primary" size="mini" @click="search_customer_list">搜索</el-button>
            <el-button size="mini" type="success" @click="OkSelectCustomer">确定选择</el-button>
          </el-col>
        </el-row>
      </div>
      <div style="margin: 15px 0">
        <el-table
          :data="customer_list"
          highlight-current-row
          @current-change="customer_list_select"
        >
          <el-table-column label="客户名称" prop="customer_name"></el-table-column>
          <el-table-column label="身份" prop="ident"></el-table-column>
          <el-table-column label="房屋地址" prop="address" min-width="150px"></el-table-column>
          <el-table-column label="账户" prop="account_owner"></el-table-column>
          <el-table-column label="账号" prop="account_num"></el-table-column>
          <el-table-column label="开单人" prop="staff.name"></el-table-column>
        </el-table>
      </div>
      <el-pagination style="text-align: right" :current-page="customer_params.page" :total="customer_list_count"
        layout="total,prev,pager,next" @current-change="customer_page_change"
      ></el-pagination>
    </el-dialog>

    <!--应收入账-->
    <el-dialog
      :visible="collectMoneyShow"
      title="应收入账"
      width="35%"
      @close="cancelCreateCollect"
    >
      <div style="width: 90%;margin: 0 auto">
        <el-form :model="collectMoneyForm" ref="collectForm" :rules="collectRules" size="mini">
          <el-form-item label="收款时间" prop="pay_date">
            <el-date-picker
              v-model="collectMoneyForm.pay_date"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="账户类型">
            <el-select v-model="collectMoneyForm.accountType" @change="getCollectAccount">
              <el-option v-for="item in accountTypeOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="账户" prop="account_id">
            <el-select v-model="collectMoneyForm.account_id" :disabled="!canSel">
              <el-option v-for="(item,key) in accountList" :key="key" :value="item.id" :label="item.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="实收金额" prop="amount_received">
            <el-input type="number" v-model="collectMoneyForm.amount_received"></el-input>
          </el-form-item>
          <el-form-item label="补齐时间" prop="complete_date">
            <el-date-picker
              v-model="collectMoneyForm.complete_date"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input type="textarea" v-model="collectMoneyForm.remark" placeholder="请输入备注"></el-input>
          </el-form-item>
          <el-form-item align="right">
            <el-button @click="cancelCreateCollect">取消</el-button>
            <el-button type="primary" @click="OkCreateCollect('collectForm')">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>

    <!--生成违约金-->
    <el-dialog
      :visible="createVisible"
      title="生成日期"
      width="30%"
    >
      <div style="text-align: center;margin: 0 auto">
        日期：
        <el-date-picker
          v-model="exit_date"
          size="mini"
          style="width: 80%"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
        <div style="text-align: right;margin-top: 20px">
          <el-button size="mini" @click="createVisible = false">取消</el-button>
          <el-button size="mini" type="primary" @click="createDedit">确定</el-button>
        </div>
      </div>
    </el-dialog>

    <!--回滚-->
    <div>
      <el-dialog
        :visible="callbackVisible"
        title="回滚"
        @close="callbackVisible = false"
      >
        <div style="text-align: right;margin-bottom: 10px">
          <el-button type="primary" size="mini" @click="goCallBack">确定</el-button>
        </div>
        <el-table
          :data="callbackList"
          @selection-change="handleSelectionChangeCall"
        >
          <el-table-column type="selection" width="50px"></el-table-column>
          <el-table-column label="ID" prop="id"></el-table-column>
          <el-table-column label="Desc" prop="value"></el-table-column>
        </el-table>
      </el-dialog>
    </div>

    <!--备注详情-->
    <el-dialog
      :visible="tagVisible"
      @close="tagVisible = false"
      title="备注详情"
    >
      <el-table
        :data="rightMenuRow.tags"
      >
        <el-table-column label="备注时间" prop="create_time"></el-table-column>
        <el-table-column label="内容" prop="content"></el-table-column>
        <el-table-column label="时间" prop="operator_name"></el-table-column>
      </el-table>
    </el-dialog>

    <!--登记收款-->
    <el-dialog
      :visible="registerReceive"
      title="登记收款"
      width="30%"
      @close="handleCancelRegisterReceive"
    >
      <el-form :model="registration" size="mini" label-width="100px" style="width: 80%;margin: 0 auto">
        <el-form-item label="房屋地址">
          <el-input v-model="registration.address"></el-input>
        </el-form-item>
        <el-form-item label="上传图片">
          <Upload :ID="'register'" :editImage="registerInfoImg" @getImg="handleGetRegister" :isClear="registerIsClear"></Upload>
        </el-form-item>
        <el-form-item label="账户类型">
          <el-select v-model="registration.cate" @change="getCollectAccount">
            <el-option v-for="item in accountTypeOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择账户">
          <el-select v-model="registration.account_id" :disabled="!canSel">
            <el-option v-for="(item,key) in accountList" :key="key" :value="item.id" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收款金额">
          <el-input v-model="registration.amount" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="收款时间">
          <el-date-picker
            v-model="registration.collection_time"
            placeholder="请选择"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="收款备注">
          <el-input type="textarea" v-model="registration.remark" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item>
          <div style="text-align: right">
            <el-button type="primary" size="small" @click="handleOkRegister">确定</el-button>
            <el-button size="small" @click="handleCancelRegisterReceive">取消</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!--对比流水-->
    <el-dialog
      :visible="contrastRunningVisible"
      title="收款对比"
      width="80%"
      @close="handleCancelRun"
    >
      <div class="contrastRunning">
        <div>
          <h3>收款记录</h3>
          <div style="text-align: right;margin-bottom: 15px">
            <el-button size="mini" @click="handleChangeStatus(3)">已匹配</el-button>
            <el-button size="mini" @click="handleChangeStatus(5)">未匹配</el-button>
            <el-button size="mini" @click="handleChangeStatus(7)">未找到</el-button>
          </div>
          <el-table
            :data="receive_data"
            height="400px"
          >
            <el-table-column label="收款名称" prop="address"></el-table-column>
            <el-table-column label="收款金额" prop="amount"></el-table-column>
            <el-table-column label="收款时间" prop="collection_time"></el-table-column>
            <el-table-column label="账户" prop="account.account_num"></el-table-column>
            <el-table-column label="截图">
              <template slot-scope="scope">
                <i style="font-size: 16px;cursor: pointer" class="el-icon-picture" @click="look_image_list = scope.row.collect_img;look_image_visible = true"></i>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="openContrastDialog(scope.row)">对比银行流水</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            :total="receive_count"
            layout="total,prev,pager,next"
            :current-page="contrastParams.page"
            :page-size="contrastParams.limit"
            @current-change="handleChangeContrastPage"
            style="text-align: center"
          ></el-pagination>
        </div>
        <div>
          <div style="width: 100%;height: 90px;">
            <el-form size="small" :model="contrast_params_form" label-width="120px" style="width: 80%;margin: 0 auto">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="误差数">
                    <el-input type="number" v-model="contrast_params_form.date_deviation" style="width: 150px"></el-input>
                  </el-form-item>
                  <el-form-item label="误差类型">
                    <el-radio v-model="contrast_params_form.select" :value="5" label="天"></el-radio>
                    <el-radio v-model="contrast_params_form.select" :value="3" label="分钟"></el-radio>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="金额误差数">
                    <el-input v-model="contrast_params_form.amount_deviation" style="width: 150px"></el-input>
                  </el-form-item>
                  <el-form-item label="合并">
                    <el-radio v-model="contrast_params_form.is_and" :value="7" label="时间"></el-radio>
                    <el-radio v-model="contrast_params_form.is_and" :value="9" label="金额"></el-radio>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <el-table
            :data="running_data"
            height="400px"
          >
            <el-table-column label="打款时间" prop="deal_date"></el-table-column>
            <el-table-column label="金额" prop="income_amount"></el-table-column>
            <el-table-column label="备注" prop="remark">
              <template slot-scope="scope">
                <span v-if="scope.row.remark">{{ scope.row.remark }}</span>
                <span v-else>暂无</span>
              </template>
            </el-table-column>
            <el-table-column label="所属银行" prop="bank"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="handleRuAccount(scope.row)">入账</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-dialog>

    <!--查看图片-->
    <el-dialog
      :visible="look_image_visible"
      title="查看图片"
      @close="look_image_visible = false;look_image_list = []"
    >
      <div v-for="item in look_image_list" style="display: inline-block;margin-right: 15px">
        <img style="width: 150px;height: 120px;" :src="item" alt="" data-magnify="" :data-src="item">
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import organization from '../../common/organization.vue'
  import RightMenu from '../../common/rightMenu.vue'    //右键
  import subjectTree from '../components/subjectTree.vue'
  import PolishTime from '../components/polishTime.vue'
  import Upload from '../../common/UPLOAD.vue'

  export default {
    name: "index",
    components: {organization, RightMenu, subjectTree, PolishTime,Upload},
    data() {
      return {
        running_data: [],
        running_count: 0,

        contrastRow: '',
        contrast_params_form: {
          select: '',
          date_deviation: '',
          amount_deviation: '',
          is_and: ''
        },

        look_image_list: [],
        look_image_visible: false,

        receive_data: [],
        receive_count: 0,
        contrastRunningVisible: false,
        contrastParams: {
          page: 1,
          limit: 10,
          status: 0,
        },

        registerReceive: false,
        registration: {
          fund_id: '',
          collect_img: '',
          account_id: '',
          amount: '',
          collection_time: '',
          remark: '',
          cate: '',
          address: '',
        },
        registerIsClear: false,
        registerInfoImg: {},

        tagVisible: false,
        collectMoneyShow: false,
        isChangeSubject: false,
        customer_list_visible: false,
        customer_list: [],
        customer_list_count: 0,
        fastOutVisible: false, //催缴导出显示
        fastOutDate: '',
        detailVisible: false, //详情显示
        add_remark: '', //添加备注信息
        DetailCurrentRow: '', //点击详情当前行
        subjectType: '',
        subjectVisible: false,
        url: globalConfig.finance_server,
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],

        isHigh: false,
        pageNumber: 5,

        payTimes: [],
        polishTime: '',
        titles: '',
        currentPage: 1,
        remarkVisible: false,
        polishTimeVisible: false,
        filterModule: false,
        organizeVisible: false,
        values: ['待入账', '待结清', '已结清', '已超额',],
        tag_status: ['违约', '延期', '贴条', '换锁', '维修', '资金', '炸单', '调房', '特殊情况'],
        form: {
          staff_ids: [],
          department_ids: [],
          status: '',
          startRange: '',//应收开始时间
          endRange: '',//应收结束时间
          tag_status: '',//催缴状态
          startTag: '',//催缴开始时间
          endTag: '',//催缴结束时间
          subject_id: '',//科目id
          search: '',//搜索框
          minPrice: '',//剩余款项最小区间
          maxPrice: '',//剩余款项最大区间
          page: 1,
          limit: 12,
          export: '',
        },
        sum: {
          balance_sum: '',//剩余款项
          receivable_sum: '',//应收金额
          received_sum: ''//实收金额
        },
        addrDetail: false,
        totalNum: 0,
        rangeDate: '',
        tagDate: '',
        subject_name: '',
        department_name: '',
        collectLoading: false,
        collectStatus: '',
        organizeType: '',
        staff_name: '',
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
          },{
            text: '最近一年',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        collectData: [],
        restaurants: [],
        state: '',
        rightMenuRow: '', //右击当前行
        currentSelectIds: [],
        sendMsgVisible: false,
        selectMsgType: '',
        //新增应收
        addPayVisible: false,
        addForm: {
          customer_id: '',
          identity: '',
          pay_date: '',
          description: '',
          amount_receivable: '',
          subject_id: '',
          remark: ''
        },
        customer_name: '',
        address: '',
        customer_params: {
          type: 1,
          search: '',
          page: 1,
          limit: 10
        },
        addSubjectName: '',
        addFormRules: {
          remark: [
            { required: true, message: '请输入备注', trigger: 'blur' },
          ],
          description: [
            { required: true, message: '请输入描述', trigger: 'blur' },
          ],
          pay_date: [
            { required: true, message: '请选择付款时间', trigger: 'blur' },
          ],
          identity: [
            { required: true, message: '请选择客户身份', trigger: 'blur' },
          ],
          amount_receivable: [
            { required: true, message: '请输入应收金额', trigger: 'blur' },
          ]
        },
        currentSelectCustomer: '',
        isFastMark: false, //是否为催缴备注
        remarkType: 1,

        //应收入账参数
        collectMoneyForm: {
          accountType: '',
          pay_date: '', //收款时间
          account_id: '', //账户
          amount_received: '', //实收金额
          complete_date: '', //补齐时间
          remark: '', //备注
        },
        collectRules: {
          pay_date: [
            { required: true, message: '请选择收款时间', trigger: 'blur' },
          ],
          account_id: [
            { required: true, message: '请选择账户', trigger: 'blur' },
          ],
          amount_received: [
            { required: true, message: '请输入实收金额', trigger: 'blur' },
          ],
          complete_date: [
            { required: true, message: '请选择补齐时间', trigger: 'blur' },
          ],
          remark: [
            { required: true, message: '请输入备注', trigger: 'blur' },
          ],
        },
        createShow: false,
        createCurrentRow: '',
        createVisible: false,
        exit_date: '',
        accountTypeOption: [
          //账号类型
          {value: 1, label: "银行卡"},
          {value: 2, label: "支付宝"},
          {value: 3, label: "微信"}
        ],
        accountList: [],
        canSel: false,

        callbackList: [],
        callbackVisible: false,
        callbackParams: '',

        //回收站
        isRecycle: false
      }
    },
    mounted() {
      this.getTableData();
    },
    methods: {
      handleCancelRun() {
        this.contrastRow = '';
        this.running_data = '';
        this.receive_data = [];
        this.receive_count = 0;
        this.contrastRunningVisible = false;
      },
      handleRuAccount(row) {
        this.$prompt('请输入备注','提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({value}) => {
          this.$http.put(globalConfig.temporary_server + 'registration/flow_entry',{
            register_id: this.contrastRow.id,
            flow_id: row.id,
            remark: value
          }).then(res => {
            console.log(res);
            if (res.data.code === 200 ){
              this.$notify.success({
                title: '成功',
                message: res.data.msg
              })
            } else {
              this.$notify.warning({
                title: '失败',
                message: res.data.msg
              })
            }
          }).catch(err => {
            console.log(err);
          })
        }).catch(() => { })
      },
      openContrastDialog(row) {
        this.contrastRow = row;
        if (!this.contrast_params_form.date_deviation) {
          this.contrast_params_form.date_deviation = parseInt(this.contrast_params_form.date_deviation);
        }
        this.$http.put(globalConfig.temporary_server + `registration/match/${this.contrastRow.id}`,this.contrast_params_form).then(res => {
          if (res.data.code === 200 ){
            this.running_data = res.data.data.data;
            this.running_count = res.data.data.cont;
          } else {
            this.$notify.warning({
              title: '警告',
              message: res.data.msg
            });
            this.running_data = [];
            this.running_count = 0;
            return false
          }
        }).catch(err => {
          console.log(err);
        })
      },
      handleChangeContrastPage(page) {
        this.contrastParams.page = page;
        this.getContrastList();
      },
      handleChangeStatus(status) {
        this.contrastParams.status = status;
        this.getContrastList();
      },
      getContrastList() {
        this.$http.get(globalConfig.temporary_server + 'registration',{
          params: this.contrastParams
        }).then(res => {
          console.log(res);
          if (res.data.code === 200) {
            this.receive_data = res.data.data.data;
            this.receive_count = res.data.data.count;
          }
        }).catch(err => {
          console.log(err);
        })
      },
      handleOpenContrastRunning() {
        this.contrastRunningVisible = true;
        this.getContrastList();
      },
      handleOkRegister() {
        this.$http.post(globalConfig.temporary_server + 'registration',this.registration).then(res => {
          console.log(res);
          if (res.data.code === 200) {
            this.$notify.success({
              title: '成功',
              message: res.data.msg
            })
          } else {
            this.$notify.warning({
              title: '失败',
              message: res.data.msg
            })
          }
          this.handleCancelRegisterReceive();
          this.getTableData();
        }).catch(err => {
          console.log(err);
        })
      },
      handleGetRegister(val) {
        this.registration.collect_img = val[1];
      },
      handleCancelRegisterReceive() {
        this.accountList = [];
        this.canSel = false;
        this.registerIsClear = true;
        this.registration = {
          fund_id: '',
          collect_img: '',
          account_id: '',
          amount: '',
          collection_time: '',
          remark: '',
          cate: '',
          address: '',
        };
        this.registerReceive = false;
      },
      handleHeaderStyle() {
        if (this.isRecycle) {
          return "color: red";
        } else {
          return "";
        }
      },
      handleClear() {
        this.isRecycle = !this.isRecycle;
        this.getTableData();
      },
      tableRowClassName({row}) {
        if ((row.status === '已超额' || row.status === '已结清' || row.status === '待结清') && row.pendable !== 1) {
          return 'warning-color';
        }
        return "";
      },
      handleDealWith(id) {
        this.$http.put(this.url + `account/pending/receivable/${id}`).then(res => {
          this.handleSuccess(res);
        }).catch(err => {
          console.log(err);
        })
      },
      goCallBack() {
        if (!this.callbackParams) {
          return false;
        }
        this.$http.put(this.url + `account/receivable/revert/${this.rightMenuRow.id}`,{ra_id: this.callbackParams}).then(res => {
          this.handleSuccess(res);
          this.callbackVisible = false;
        }).catch(err => {
          console.log(err);
        })
      },
      handleSelectionChangeCall(val) {
        this.callbackParams = '';
        val.map(item => {
          return this.callbackParams += item.id;
        }).join(",");
      },
      handleSelRangDate(val) {
          if (val) {
            this.form.startRange = val[0];
            this.form.endRange = val[1]
          } else {
            this.form.startRange = '';
            this.form.endRange = '';
          }
      },
      handleSelTagDate(val) {
         if (val) {
           this.form.startTag = val[0];
           this.form.endTag = val[1];
         } else {
           this.form.startTag = '';
           this.form.endTag = '';
         }
      },
      cancelCreateCollect() {
        var keys = Object.keys(this.collectMoneyForm);
        for (var i =0;i<keys.length;i++) {
          this.collectMoneyForm[keys[i]] = "";
        }
        this.collectMoneyShow = false;
        this.$refs['collectForm'].resetFields();
      },
      OkCreateCollect(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post(this.url + `account/receivable/receive/${this.rightMenuRow.id}`,this.collectMoneyForm).then(res => {
              this.handleSuccess(res);
              this.cancelCreateCollect();
            }).catch(err => {
              console.log(err);
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      getCollectAccount(val) {
        this.accountList = [];
        this.collectMoneyForm.account_id = '';
        this.canSel = false;
        this.$http.get(globalConfig.finance_server + 'account/manage/index',{
          params: {
            cate: val,
            all: 1
          }
        }).then(res => {
          this.accountList = res.data.data.data;
          this.canSel = true;
        })
      },
      handleListCurrentChange(val) {
        if (val) {
          this.createShow = true;
          this.createCurrentRow = val;
        } else {
          this.createShow = false;
        }
      },
      createDedit() {
        if (!this.exit_date) {
          this.$notify.warning({
            title: '警告',
            message: '请选择日期'
          });
          return false;
        }
        this.$http.put(this.url + `account/receivable/dedit/${this.createCurrentRow.id}`,{
          exit_date: this.exit_date
        }).then(res => {
          this.handleSuccess(res);
          this.createVisible = false;
          this.createShow = false;
        }).catch(err => {
          console.log(err);
        })
      },
      OkSelectCustomer() {
        if (!this.currentSelectCustomer) {
          this.$notify.warning({
            title: '警告',
            message: '请选择客户'
          });
          return false;
        } else {
          this.customer_list_visible = false;
          this.address = this.currentSelectCustomer.address;
          this.customer_name = this.currentSelectCustomer.customer_name;
          this.addForm.customer_id = this.currentSelectCustomer.id;
        }
      },
      customer_list_select(val) {
        this.currentSelectCustomer = val;
      },
      customer_page_change(val) {
        this.customer_params.page = val;
        this.search_customer_list();
      },
      search_customer_list() {
        this.$http.get(this.url + 'customer/base/customer',{params: this.customer_params}).then(res => {
          if (res.data.success) {
            this.customer_list = res.data.data.data;
            this.customer_list_count = res.data.data.count;
          }
        })
      },
      handleAddPayCancel() {
        var keys = Object.keys(this.addForm);
        for (var i = 0;i<keys.length;i++) {
          this.addForm[keys[i]] = "";
        }
        this.customer_name = "";
        this.address = "";
        this.subject_name = "";
        this.addPayVisible = false;
      },
      handleAddPay(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addForm.amount_receivable = parseFloat(this.addForm.amount_receivable);
            this.$http.post(this.url + 'account/receivable/add',this.addForm).then(res => {
              this.handleSuccess(res);
              this.handleAddPayCancel();
            }).catch(err => {
              console.log(err);
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //发送短信
      OkSendMsg() {
        if (!this.selectMsgType) {
          this.$notify.warning({
            title: '警告',
            message: '请选择发送类型'
          });
          return false;
        }
        this.$http.post(this.url + 'account/receivable/notify',{
          ids: this.currentSelectIds,
          type: this.selectMsgType
        }).then(res => {
          this.handleSuccess(res);
          this.sendMsgVisible = false;
        }).catch(err => {
          console.log(err);
        });
      },
      //列表多选
      handleSelectionChange(val){
        this.currentSelectIds = [];
        val.map(item => {
          this.currentSelectIds.push(item.id);
        });
      },
      goFastOut() {
        if (!this.fastOutDate || this.fastOutDate.length < 2) {
          this.$notify.warning({
            title: '警告',
            message: '请选择日期'
          });
          return false;
        } else {
          this.$http.get(this.url + 'account/receivable/export',{responseType: 'arraybuffer',params: {date: `${this.fastOutDate[0]},${this.fastOutDate[1]}`}}).then(res =>{
            this.$exportData(res.data);
            this.fastOutVisible = false;
          }).catch(err => {
            console.log(err);
          })
        }
      },
      handleSuccess(res) {
        if (res.data.success) {
          this.$notify.success({
            title: '成功',
            message: res.data.message
          });
          this.getTableData();
        } else {
          this.$notify.warning({
            title: '失败',
            message: res.data.message
          });
        }
      },
      handleOkTime(date) {
        this.$http.put(this.url + `account/receivable/editCompleteDate/${this.rightMenuRow.id}`,{complete_date: date}).then(res => {
          this.handleSuccess(res);
          this.closePolishTime();
        }).catch(err => {
          console.log(err);
        })
      },
      //取消备注
      cancelRemark() {
        this.remarkVisible = false;
        this.isFastMark = false;
        this.add_remark = '';
      },
      //添加备注
      handleAddRemark() {
        if (!this.add_remark) {
          this.$notify.warning({
            title: '警告',
            message: '备注不能为空！'
          });
          return false;
        }
        var obj = {
          content: this.add_remark
        };
        var root = 'account/receivable/addTag/';
        if (this.isFastMark) {
          root = "account/receivable/addUrgeTag/";
          obj.category = this.remarkType;
        }
        this.$http.put(this.url + `${root}${this.rightMenuRow.id}`,obj).then(res => {
          this.handleSuccess(res);
          this.cancelRemark();
        }).catch(err => {
          console.log(err);
        })
      },

      //请求详情
      handleCtrlDetail(scope){
        this.$http.get(this.url + `account/receivable/read/${scope.row.id}`).then(res => {
          if (res.data.success) {
            this.DetailCurrentRow = res.data.data;
            this.detailVisible = true;
          } else {
            this.$notify.warning({
              title: '警告',
              message: '获取详情失败，请重试！'
            });
            return false;
          }
        }).catch(err => {
          console.log(err);
        });
      },

      getTableData(search) {
        if (search) {
          this.form.page = 1;
        }
        this.isHigh = false;
        this.collectLoading = true;
        this.collectStatus = ' ';
        let params = this.form;
        var root = 'account/receivable/index';
        if (this.isRecycle) {
          root = "account/receivable/trashed";
        }
        this.$http.get(this.url + root, {params: params}).then((res) => {
          if (res.data.success) {
            if (res.data.data.data.length < 1){
              this.collectStatus = '暂无数据';
              this.collectData = [];
              this.totalNum = 0;
            }
            this.collectData = res.data.data.data;
            this.totalNum = res.data.data.count;
            this.sum = res.data.data.sum;
          } else {
            this.collectStatus = '暂无数据';
            this.collectData = [];
            this.totalNum = 0;
          }
          this.collectLoading = false;
        });
      },

      closeSubjectTree() {
        this.isChangeSubject = false;
        this.subjectVisible = false;
      },
      clearSubjectTree() {
        this.form.subject_id = '';
        this.subject_name = '';
      },
      openSubjectTree() {
        this.subjectType = 'next';
        this.subjectVisible = true;
      },
      selectSubject(val) {
        if (this.addPayVisible) {
          this.addForm.subject_id  = val.id;
          this.addSubjectName = val.name;
        } else if (this.isChangeSubject) {
          this.$http.put(this.url + `account/receivable/subject/${this.rightMenuRow.id}`,{subject_id: val.id}).then(res =>{
            this.handleSuccess(res);
          }).catch(err => {
            console.log(err);
          })
        }
        else {
          this.form.subject_id = val.id;
          this.subject_name = val.name;
        }
      },
      closeOrganize() {
        this.organizeVisible = false;
      },
      // 员工筛选
      chooseStaff(type) {
        this.organizeVisible = true;
        this.organizeType = type;
      },
      // 清空员工
      closeStaff(type) {
        if (type === 'depart') {
          this.form.department_ids = [];
          this.department_name = "";
        } else {
          this.form.staff_ids = [];
          this.staff_name = '';
        }
      },
      selectMember(val) {
        if (this.organizeType === 'depart') {
          for (var i = 0; i < val.length; i++) {
            this.department_name = this.department_name === "" ? val[i].name : this.department_name + "," + val[i].name;
            this.form.department_ids.push(val[i].id);
          }
        } else if (this.organizeType === 'staff') {
          for (var i = 0; i < val.length; i++) {
            this.staff_name = this.staff_name === "" ? val[i].name : this.staff_name + "," + val[i].name;
            this.form.staff_ids.push(val[i].id);
          }
        }
      },
      // 重置
      resetting() {
        this.form = {
          staff_ids: [],
          department_ids: [],
          status: '',
          startRange: '',//应收开始时间
          endRange: '',//应收结束时间
          tag_status: '',//催缴状态
          startTag: '',//催缴开始时间
          endTag: '',//催缴结束时间
          subject_id: '',//科目id
          search: '',//搜索框
          minPrice: '',//剩余款项最小区间
          maxPrice: '',//剩余款项最大区间
          page: 1,
          limit: 12
        };
        this.department_name = "";
        this.staff_name = "";
        this.subject_name = '';
        this.tagDate = '';
        this.rangeDate = '';
      },
      // 高级筛选
      highGrade() {
        this.isHigh = !this.isHigh;
      },
      // 导出
      leadingOut(val) {
        if (val === 'rent') {
          this.fastOutVisible = true;
        } else {
          this.form.export = 1;
          this.$http.get(this.url + 'account/receivable/index',{responseType: 'arraybuffer',params: this.form}).then(res => {
            this.$exportData(res.data);
            this.form.export = '';
          });
        }
      },
      // 右键 收
      collectMenu(row, event) {
        if (this.isRecycle) {
          this.lists = [];
          return false;
        }
        this.rightMenuRow = row;
        this.lists = [
          {clickIndex: 'collectWay', headIcon: 'el-icon-edit-outline', label: '应收入账'},
          {clickIndex: 'collectRemark', headIcon: 'el-icon-edit', label: '备注'},
          {clickIndex: 'fastRemark', headIcon: 'el-icon-edit', label: '催缴备注'},
          {clickIndex: 'changeMoney', headIcon: 'el-icon-refresh', label: '修改应收金额'},
          {clickIndex: 'changeSubject', headIcon: 'el-icon-refresh', label: '修改款项科目'},
          {clickIndex: 'collectPolish', headIcon: 'el-icon-date', label: '修改补齐时间',},
          {clickIndex: 'callback', headIcon: 'el-icon-refresh', label: '回滚',},
          {clickIndex: 'delete', headIcon: 'el-icon-circle-close-outline', label: '删除',},
          {clickIndex: 'tagDetail', headIcon: 'el-icon-edit', label: '备注详情',},
          {clickIndex: 'register',headIcon: 'el-icon-edit',label: '登记收款'}
        ];
        this.contextMenuParam(event);
      },

      // 右键回调
      clickEvent(val) {
        if (val === 'delete') {
          this.openDelete();
        }
        if (val === 'collectPolish' || val === 'payPolish') {
          this.polishTimeVisible = true;
          this.polishTime = this.rightMenuRow.complete_date;
        }
        if (val === 'collectRemark') {
          this.remarkVisible = true;
        }
        if (val === 'fastRemark') {
          this.isFastMark = true;
          this.remarkVisible = true
        }
        if (val === 'changeMoney') {
          this.handleEditMoney();
        }
        if (val === 'changeSubject') {
          this.isChangeSubject = true;
          this.openSubjectTree();
        }
        if (val === 'collectWay') {
          this.collectMoneyShow = true
        }
        if (val === 'callback') {
          this.callbackList = [];
          for (var key in this.rightMenuRow.running_account_record) {
            this.callbackList.push({id: key,value: this.rightMenuRow.running_account_record[key]});
          }
          this.callbackVisible = true;
        }
        if (val === 'tagDetail') {
          this.tagVisible = true;
        }
        if (val === 'register') {
          this.registerIsClear = false;
          this.registration.address = this.rightMenuRow.addr || this.rightMenuRow.addra || this.rightMenuRow.addru;
          this.registration.fund_id = this.rightMenuRow.id;
          this.registerReceive = true;
        }
      },
      handleEditMoney() {
        this.$prompt('请输入应收金额','提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue: this.rightMenuRow.amount_receivable,
          inputPattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
          inputErrorMessage: '格式不正确'
        }).then(({value}) => {
          this.$http.put(this.url + `account/receivable/amount/${this.rightMenuRow.id}`,{amount: value}).then(res => {
            if (res.data.success) {
              this.$notify.success({
                title: '成功',
                message: res.data.message
              });
              this.getTableData();
            } else {
              this.$notify.warning({
                title: '失败',
                message: res.data.message
              })
            }
          })
        }).catch(() => { })
      },
      // 关闭补齐时间
      closePolishTime() {
        this.polishTimeVisible = false;
      },
      //关闭右键菜单
      closeMenu() {
        this.show = false;
      },
      //右键参数
      contextMenuParam(event) {
        let e = event || window.event;
        this.show = false;
        this.rightMenuX = e.clientX + document.documentElement.scrollLeft - document.documentElement.clientLeft;
        this.rightMenuY = e.clientY + document.documentElement.scrollTop - document.documentElement.clientTop;
        event.preventDefault();
        event.stopPropagation();
        this.$nextTick(() => {
          this.show = true
        })
      },
      // 删除
      openDelete() {
        this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(this.rightMenuRow);
          this.$http.get(this.url + `account/receivable/delete/${this.rightMenuRow.id}`).then(res => {
            console.log(res);
            if (res.data.success) {
              this.$notify.success({
                title: '成功',
                message: res.data.message
              });
              this.getTableData();
            } else {
              this.$notify.warning({
                title: '失败',
                message: res.data.message
              });
            }
          }).catch(err => {
            console.log(err);
          });
        }).catch(() => { });
      },

      handleCurrentChange(val) {
        this.form.page = val;
        this.getTableData();
      },
    },
  }
</script>

<style lang="scss">
  #receivable {
    .contrastRunning {
      display: flex;
      justify-content: space-between;
      > div {
        width: 50%;
        max-height: 500px;
        padding: 30px;
      }
    }
    .block.pages {
      display: -webkit-flex;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .border_table {
      box-shadow: 0 0 10px 0 #bbb;
      padding: 8px;
      border-radius: 3px;
      margin-bottom: 24px;
    }
    .receive_title{
      display: inline-block;
      vertical-align: top;
      width: 25%;
      text-align: right;
    }
    .receive_detail{
      display: inline-block;
      width: 60%;
      text-align: center;
      padding: 8px 10px;
      border-radius: 4px;
      color: white;
      background-color: #aec1fc;
    }
    .warning-color{
      background-color: #bcbcbd;
    }
  }
</style>
