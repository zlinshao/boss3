<template>
  <div @click="show=false" @contextmenu="closeMenu" id="customerManage">
    <div class="highRanking">
      <div class="highSearch">
        <el-form :model="params" :inline="true" size="mini">
          <el-form-item>
            <span class="repeat_phone"></span><span class="repeat_text">手机</span>
            <span class="repeat_name"></span><span class="repeat_text">姓名</span>
            <span class="repeat_address"></span><span class="repeat_text">地址</span>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="请输入内容" v-model="params.search" size="mini" @keyup.enter.native="getLandLordList" clearable>
              <el-button slot="append" icon="el-icon-search" @click="getLandLordList('search')"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" @click="handleCancelMark">取消重复标记</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="highRanking">
      <div class="filter high_grade" :class="isHigh? 'highHide':''" style=" margin-top: -40px;">
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
                      placeholder="请选择开始时间"
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
                      placeholder="请选择结束时间"
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
                  <div class="el_col_label">部门</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-input v-model="extraParams.depart_name" @focus="departVisible = true" placeholder="点击选择">
                      <el-button @click="handleCancelDepart" slot="append">清空</el-button>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <div class="btnOperate">
            <el-button size="mini" type="primary" @click="goSearch">搜索</el-button>
            <el-button size="mini" type="primary" @click="resetting">重置</el-button>
            <el-button size="mini" type="primary" @click="highGrade">取消</el-button>
          </div>
        </el-form>
      </div>
    </div>

    <el-tabs v-model="activeName" @tab-click="handleTabClick">
      <el-tab-pane label="房东管理" name="first">
        <div id="landlordManage">
          <el-table
            :data="landLordList"
            @selection-change="handleSelectionChange"
            @row-contextmenu="customerMenu"
            v-loading="Loading"
            :empty-text="emptyText"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(255, 255, 255, 0)">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column label="重复">
              <template slot-scope="scope">
                <div v-if="scope.row.suppress_dup === 1">
                  <span><i class="el-icon-view"></i>忽略重复</span>
                </div>
                <div v-else>
                  <span class="repeat_phone" v-if="scope.row.dup_field && scope.row.dup_field.contact"></span>
                  <span class="repeat_name" v-if="scope.row.dup_field && scope.row.dup_field.customer_name"></span>
                  <span class="repeat_address" v-if="scope.row.dup_field && scope.row.dup_field.address"></span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="生成时间" prop="create_time" min-width="120px"></el-table-column>
            <el-table-column label="房屋地址" prop="address"></el-table-column>
            <el-table-column label="客户姓名" prop="customer_name"></el-table-column>
            <el-table-column label="手机号" prop="contact"></el-table-column>
            <el-table-column label="收房月数	" prop="months"></el-table-column>
            <el-table-column label="付款方式	" prop="payType"></el-table-column>
            <el-table-column label="月单价" prop="prices[0]">
              <template slot-scope="scope">
                <span v-for="item in scope.row.prices">{{ item }} &nbsp;&nbsp;</span>
              </template>
            </el-table-column>
            <el-table-column label="待签约日期" prop="deal_date"></el-table-column>
            <el-table-column label="第一次打房租日期" prop="first_pay_date"></el-table-column>
            <el-table-column label="客户付款方式" prop="account_type"></el-table-column>
            <el-table-column label="账号" prop="account_num" min-width="120px"></el-table-column>
            <el-table-column label="签约人" prop="staff.name"></el-table-column>
            <el-table-column label="状态" prop="customer_status"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="text" @click="handleOpenDetail(scope.row)">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            :total="landLordCount"
            layout="total,prev,pager,next"
            :page-size="params.limit"
            :current-page="params.page"
            style="text-align: right"
            @current-change="handlePageChange"
          ></el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="租客管理" name="second">
        <div id="renter">
          <el-table
            :data="renterTableList"
            @selection-change="handleSelectionChange"
            @row-contextmenu="customerMenu"
            v-loading="Loading"
            :empty-text="emptyText"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(255, 255, 255, 0)"
          >
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column label="重复">
              <template slot-scope="scope">
                <div v-if="scope.row.suppress_dup === 1">
                  <span><i class="el-icon-view"></i>忽略重复</span>
                </div>
                <div v-else>
                  <span class="repeat_phone" v-if="scope.row.dup_field && scope.row.dup_field.contact"></span>
                  <span class="repeat_name" v-if="scope.row.dup_field && scope.row.dup_field.customer_name"></span>
                  <span class="repeat_address" v-if="scope.row.dup_field && scope.row.dup_field.address"></span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="生成时间" prop="create_time" min-width="120px"></el-table-column>
            <el-table-column label="房屋地址" prop="address"></el-table-column>
            <el-table-column label="客户姓名" prop="customer_name"></el-table-column>
            <el-table-column label="手机号" prop="contact"></el-table-column>
            <el-table-column label="租房月数	" prop="months"></el-table-column>
            <el-table-column label="付款方式	" prop="payType"></el-table-column>
            <el-table-column label="月单价" prop="prices[0]"></el-table-column>
            <el-table-column label="租房类型" prop="rent_types"></el-table-column>
            <el-table-column label="租房状态" prop="rent_status"></el-table-column>
            <el-table-column label="待签约日期" prop="deal_date"></el-table-column>
            <el-table-column label="签约人" prop="staff.name"></el-table-column>
            <el-table-column label="状态" prop="customer_status"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="text" @click="handleOpenDetail(scope.row)">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            :total="renterTableCount"
            layout="total,prev,pager,next"
            :page-size="params.limit"
            :current-page="params.page"
            style="text-align: right"
            @current-change="handlePageChange"
          ></el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!--右键-->
    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperateMore="clickEvent"></RightMenu>
    <!--部门-->
    <Organization
      :organizationDialog="departVisible"
      :length="length"
      :type="type"
      @selectMember="handleSelectDepart"
      @close="handleCloseDepart"
    ></Organization>

    <!--详情-->
    <div>
      <el-dialog
        :visible="detailInfoVisible"
        title="详情"
        @close="detailInfoVisible = false"
        width="70%"
      >
        <div style="width: 90%;margin: 0 auto">
          <el-row :gutter="20">
            <el-col :span="16">
              <h3>基本信息</h3>
              <div style="display: flex;justify-content: space-between;flex-wrap: wrap;">
                <div style="width: 45%;margin-bottom: 20px;" v-for="(value,key) in baseInfo">
                  <span style="color: #409EFF;margin-right: 15px">{{ key }}:</span>{{ value }}
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <h3>客户账户信息</h3>
              <div style="width: 45%;margin-bottom: 20px;" v-for="(value,key) in accountInfo">
                <span style="color: #409EFF;margin-right: 15px">{{ key }}:</span>{{ value }}
              </div>
            </el-col>
          </el-row>
        </div>
        <div style="width: 90%;border-top: 1px dashed #808080;margin: 0 auto;" v-if="historyInfo.length > 0">
          <h3>历史账户信息</h3>
          <div style="display: flex;justify-content: space-between;flex-wrap: wrap">
            <div style="width: 45%" v-for="item in historyInfo">
              <p><span style="color: #409EFF;margin-right: 15px;">汇款方式:</span>{{ item.account_type || '/' }}</p>
              <p><span style="color: #409EFF;margin-right: 15px;">收款人姓名:</span>{{ item.account_owner || '/' }}</p>
              <p><span style="color: #409EFF;margin-right: 15px;">开户行:</span>{{ item.account_bank || '/' }}</p>
              <p><span style="color: #409EFF;margin-right: 15px;">账号:</span>{{ item.account_num || '/' }}</p>
              <p><span style="color: #409EFF;margin-right: 15px;">账户到期时间:</span>{{ item.date || '/' }}</p>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>

    <!--编辑房东-->
    <div>
      <el-dialog
        :visible.sync="canEditVisible"
        title="编辑房东信息"
        width="70%"
      >
        <div style="width: 95%;margin: 0 auto;">
          <el-form size="mini" :model="editParams" :rules="editInfoRules" ref="editForm" label-width="120px">
            <el-row :gutter="20">
              <el-col :span="8">
                <div class="edit_title"><h3>基本信息</h3></div>
                <el-form-item label="签约人" prop="staff_id">
                  <el-input v-model="editExtraParams.staff_name" @focus="handleOpenDepart"></el-input>
                </el-form-item>
                <el-form-item label="所属部门" prop="department_id">
                  <el-input disabled v-model="editExtraParams.department_name"></el-input>
                </el-form-item>
                <el-form-item label="负责人">
                  <el-input disabled v-model="editParams.leader_name"></el-input>
                </el-form-item>
                <el-form-item label="客户姓名" prop="customer_name">
                  <el-input v-model="editParams.customer_name"></el-input>
                </el-form-item>
                <el-form-item label="客户手机号" prop="contact">
                  <el-input v-model="editParams.contact"></el-input>
                </el-form-item>
                <el-form-item label="房屋地址" prop="house_id">
                  <el-input disabled v-model="editExtraParams.address"></el-input>
                </el-form-item>
                <el-form-item label="收房月数" prop="months">
                  <el-input v-model="editParams.months" type="number"></el-input>
                </el-form-item>
                <el-form-item label="付款方式" v-if="!editExtraParams.pay_others">
                  <el-select v-model="editExtraParams.first_pay_type">
                    <el-option label="月付" :value="1"></el-option>
                    <el-option label="双月付" :value="2"></el-option>
                    <el-option label="季付" :value="3"></el-option>
                    <el-option label="半年付" :value="6"></el-option>
                    <el-option label="年付" :value="12"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item :label="editExtraParams.pay_others_label[key]" v-if="editExtraParams.pay_others" v-for="(item,key) in editExtraParams.pay_others_types" :key="key">
                  <el-select v-model="editExtraParams.pay_others_value['type' + (key + 1)]">
                    <el-option label="月付" :value="1"></el-option>
                    <el-option label="双月付" :value="2"></el-option>
                    <el-option label="季付" :value="3"></el-option>
                    <el-option label="半年付" :value="6"></el-option>
                    <el-option label="年付" :value="12"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-checkbox v-model="editExtraParams.pay_others" @change="handleCheckboxPay">付款方式不唯一</el-checkbox>
                </el-form-item>
                <el-form-item label="月单价" v-if="!editExtraParams.pay_price">
                  <el-input v-model="editExtraParams.first_pay_price"></el-input>
                </el-form-item>
                <el-form-item :label="editExtraParams.pay_others_price_label[key]" v-if="editExtraParams.pay_price" v-for="(item,key) in editExtraParams.pay_others_price" :key="key">
                  <el-input type="number" v-model="editExtraParams.pay_others_price_value['price' + (key + 1)]"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-checkbox v-model="editExtraParams.pay_price" @change="handleCheckPrice">月单价不唯一</el-checkbox>
                </el-form-item>
                <el-form-item label="押金" prop="deposit">
                  <el-input v-model="editParams.deposit"></el-input>
                </el-form-item>
                <el-form-item label="保修期" prop="warrenty">
                  <el-input v-model="editParams.warrenty"></el-input>
                </el-form-item>
                <el-form-item label="中介费" prop="medi_cost">
                  <el-input v-model="editParams.medi_cost"></el-input>
                </el-form-item>
                <el-form-item label="待签约日期" prop="deal_date">
                  <el-date-picker
                    v-model="editParams.deal_date"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="第一次房租日期" prop="first_pay_date">
                  <el-date-picker
                    v-model="editParams.first_pay_date"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="第二次房租日期" prop="second_pay_date">
                  <el-date-picker
                    v-model="editParams.second_pay_date"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <div class="edit_title"><h3>客户信息</h3></div>
                <el-form-item label="账户类型" prop="account_type">
                  <el-select v-model="editParams.account_type">
                    <el-option :value="1" label="银行卡"></el-option>
                    <el-option :value="2" label="支付宝"></el-option>
                    <el-option :value="3" label="微信"></el-option>
                    <el-option :value="4" label="存折"></el-option>
                    <el-option :value="5" label="现金"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="收款人" prop="account_owner">
                  <el-input v-model="editParams.account_owner"></el-input>
                </el-form-item>
                <el-form-item label="开户银行" v-if="!showBank">
                  <el-select v-model="editParams.account_bank" @change="handleChangeAccount_type">
                    <el-option v-for="(bank,key) in banks" :value="key" :key="key" :label="bank"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="支行" v-if="!showBank">
                  <el-input v-model="editParams.account_subbank"></el-input>
                </el-form-item>
                <el-form-item label="账号" prop="account_num">
                  <el-input v-model="editParams.account_num"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <div class="edit_title"><h3>科目</h3></div>
                <el-form-item label="房租科目">
                  <el-input v-model="editExtraParams.rental_name" @focus="handleOpenSubject('rental')"></el-input>
                </el-form-item>
                <el-form-item label="押金科目">
                  <el-input v-model="editExtraParams.deposit_name" @focus="handleOpenSubject('deposit')"></el-input>
                </el-form-item>
                <el-form-item>
                  <div style="text-align: right">
                    <el-button @click="handleCancelSubmit('editForm')">取消</el-button>
                    <el-button @click="handleSubmitEditInfo('editForm')" type="primary">确定</el-button>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-dialog>
    </div>

    <!--编辑租客-->
    <div>
      <el-dialog
        :visible.sync="extraRentInfo.editRentInfoVisible"
        title="编辑租客信息"
        width="70%"
        @close="handleCancelEditRentInfo"
      >
        <div style="width: 90%;margin: 0 auto;">
          <el-form :model="rentInfo" :rules="rentInfoRules" ref="rentInfo" size="mini" label-width="100px">
            <el-row :gutter="20">
              <el-col :span="8">
                <div class="edit_title"><h3>基本信息</h3></div>
                <el-form-item label="签约人" prop="staff_id">
                  <el-input v-model="extraRentInfo.staff_name" @focus="handleOpenDepartByRent"></el-input>
                </el-form-item>
                <el-form-item label="部门" prop="department_id">
                  <el-input disabled v-model="extraRentInfo.department_name"></el-input>
                </el-form-item>
                <el-form-item label="负责人">
                  <el-input disabled v-model="extraRentInfo.leader_name"></el-input>
                </el-form-item>
                <el-form-item label="房屋地址" prop="house_id">
                  <el-input disabled v-model="extraRentInfo.house_name"></el-input>
                </el-form-item>
                <el-form-item label="客户姓名" prop="customer_name">
                  <el-input v-model="rentInfo.customer_name"></el-input>
                </el-form-item>
                <el-form-item label="客户联系方式" prop="customer_name">
                  <el-input v-model="rentInfo.contact"></el-input>
                </el-form-item>
                <el-form-item label="租房类型" prop="is_shared">
                  <el-select v-model="rentInfo.is_shared">
                    <el-option :value="1" label="合租"></el-option>
                    <el-option :value="2" label="整租"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="房间类型" prop="shared_part">
                  <el-select v-model="rentInfo.shared_part">
                    <el-option :value="1" label="阳台间"></el-option>
                    <el-option :value="2" label="飘窗间"></el-option>
                    <el-option :value="3" label="客厅间"></el-option>
                    <el-option :value="4" label="朝北间"></el-option>
                    <el-option :value="5" label="厨房间"></el-option>
                    <el-option :value="6" label="朝南间"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="租房状态" prop="rent_type">
                  <el-select v-model="rentInfo.rent_type">
                    <el-option :value="1" label="出租"></el-option>
                    <el-option :value="2" label="提前一个月续租"></el-option>
                    <el-option :value="3" label="提前两个月以上续租"></el-option>
                    <el-option :value="4" label="公司转租"></el-option>
                    <el-option :value="5" label="个人转租"></el-option>
                    <el-option :value="6" label="调组"></el-option>
                    <el-option :value="7" label="续租"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="租房月数" prop="months">
                  <el-input type="number" v-model="rentInfo.months"></el-input>
                </el-form-item>
                <el-form-item label="付款方式" v-if="!extraRentInfo.is_more_pay">
                  押 <el-select v-model="rentInfo.bet" style="width: 30%">
                      <el-option :value="0" label="0"></el-option>
                      <el-option :value="1" label="1"></el-option>
                      <el-option :value="2" label="2"></el-option>
                    </el-select>
                  付 <el-input v-model="extraRentInfo.first_pay_price" style="width: 30%"></el-input>
                </el-form-item>
                <el-form-item :label="extraRentInfo.pay_label[key]" v-if="extraRentInfo.is_more_pay" :key="key" v-for="(item,key) in extraRentInfo.pay_list">
                  押 <el-select v-model="rentInfo.bet" style="width: 30%">
                  <el-option :value="0" label="0"></el-option>
                  <el-option :value="1" label="1"></el-option>
                  <el-option :value="2" label="2"></el-option>
                </el-select>
                  付 <el-input type="number" v-model="extraRentInfo.pay_model['pay' + (key + 1)]" style="width: 30%"></el-input>
                  <!--剩 <span>{{ }}</span>-->
                </el-form-item>
                <el-form-item>
                  <el-checkbox v-model="extraRentInfo.is_more_pay" @change="handleChangePay">付款方式不唯一</el-checkbox>
                </el-form-item>
                <el-form-item label="月单价" v-if="!extraRentInfo.is_one_price">
                  <el-input v-model="extraRentInfo.first_price"></el-input>
                </el-form-item>
                <el-form-item :key="key" :label="extraRentInfo.price_label[key]" v-for="(item,key) in extraRentInfo.price_list" v-if="extraRentInfo.is_one_price">
                  <el-input v-model="extraRentInfo.price_model['price' + (key + 1)]"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-checkbox v-model="extraRentInfo.is_one_price" @change="handleChangeRentPrice">月单价不唯一</el-checkbox>
                </el-form-item>
                <el-form-item label="已收" prop="received_amount">
                  <el-input v-model="rentInfo.received_amount"></el-input>
                </el-form-item>
                <el-form-item label="中介费" prop="medi_cost">
                  <el-input v-model="rentInfo.medi_cost"></el-input>
                </el-form-item>
                <el-form-item label="签约时间" prop="deal_date">
                  <el-date-picker
                    v-model="rentInfo.deal_date"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="尾款补齐时间" prop="complete_date">
                  <el-date-picker
                    v-model="rentInfo.complete_date"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label=""></el-form-item>
                <el-form-item label="备注">
                  <el-input type="textarea" :row="8" v-model="rentInfo.remark"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <div class="edit_title"><h3>费用</h3></div>
                <el-form-item label="水费">
                  <el-input v-model="rentInfo.water_fee"></el-input>
                </el-form-item>
                <el-form-item label="电费">
                  <el-input v-model="rentInfo.elec_fee"></el-input>
                </el-form-item>
                <el-form-item label="燃气费">
                  <el-input v-model="rentInfo.gas_fee"></el-input>
                </el-form-item>
                <el-form-item label="物业费">
                  <el-input v-model="rentInfo.property_fee"></el-input>
                </el-form-item>
                <el-form-item label="管理费">
                  <el-input v-model="rentInfo.manage_fee"></el-input>
                </el-form-item>
                <el-form-item label="网络费">
                  <el-input v-model="rentInfo.net_fee"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <div class="edit_title"><h3>客户信息</h3></div>
                <el-form-item label="客户汇款方式" prop="account_type">
                  <el-select v-model="rentInfo.account_type" @change="handleChangeRentBank">
                    <el-option :value="1" label="银行卡"></el-option>
                    <el-option :value="2" label="支付宝"></el-option>
                    <el-option :value="3" label="微信"></el-option>
                    <el-option :value="4" label="存折"></el-option>
                    <el-option :value="5" label="现金"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="收款人信息" prop="account_owner">
                  <el-input v-model="rentInfo.account_owner"></el-input>
                </el-form-item>
                <el-form-item label="开户行" v-if="extraRentInfo.canBank">
                  <el-select v-model="rentInfo.account_bank"></el-select>
                </el-form-item>
                <el-form-item label="支行" v-if="extraRentInfo.canBank">
                  <el-input v-model="rentInfo.account_subbank"></el-input>
                </el-form-item>
                <el-form-item label="账号" prop="account_num">
                  <el-input v-model="rentInfo.account_num"></el-input>
                </el-form-item>
                <el-form-item label="科目">
                  <el-input v-model="extraRentInfo.subject_name" @focus="handleOpenRentSubject"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item>
              <div style="text-align: right">
                <el-button @click="handleCancelEditRentInfo">取消</el-button>
                <el-button type="primary" @click="handleSubmitRentInfo('rentInfo')">确定</el-button>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
    </div>

    <!--科目-->
    <SubjectTree :subjectDialog="subjectVisible" :types="subjectType" @close="closeSubjectTree"
                 @selectSubject="selectSubject"></SubjectTree>
  </div>
</template>

<script>
  import RightMenu from '../../common/rightMenu.vue'               //右键
  import Organization from '../../common/organization.vue';
  import SubjectTree from '../components/subjectTree';

  export default {
    name: "index",
    components: { RightMenu ,Organization,SubjectTree},
    data() {
      return {
        url: globalConfig.finance_server,
        Loading: false,
        emptyText: '',

        //右击菜单
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],

        //房东
        extraParams: {
          depart_name: '',
        },
        params: {
          search: '',
          startRange: '',
          endRange: '',
          page: 1,
          limit: 12,
          department_ids: [],
          export: '',
        },
        //高级
        isHigh: false,
        departVisible: false,
        length: 1,
        type: 'depart',
        currentCtl: 'editInfo',

        activeName: 'second',

        landLordList: [],
        landLordCount: 0,

        //取消重复标记array
        markArr: [],
        markStr: '',

        //详情
        CurrentDetailInfo: '',
        detailInfoVisible: false,
        baseInfo: '',
        accountInfo: '',
        historyInfo: '',

        //租客信息
        renterTableList: [],
        renterTableCount: 0,

        //编辑当前数据
        canEditVisible: false,
        editExtraParams: {
          department_name: '',
          leader_name: '',
          staff_name: '',
          rental_name: '',
          deposit_name: '',
          address: '',

          //付款方式
          pay_others: false,
          first_pay_type: '',
          pay_others_types: [],
          pay_others_label: [],
          pay_others_value: {

          },

          //月单价
          pay_price: false,
          first_pay_price: '',
          pay_others_price: '',
          pay_others_price_label: [],
          pay_others_price_value: {

          }
        },
        editParams: {
          account_owner: '',
          customer_name: '',
          account_type: '',
          account_num: '',
          contact: '', //客户手机号
          deal_date: '',
          department_id: '',
          deposit: '',
          first_pay_date: '',
          second_pay_date: '',
          house_id: '',
          leader_id: '',
          medi_cost: '',
          months: '',
          pay_types: '',
          prices: '',
          staff_id: '',
          warrenty: '',
          subject_id: {
            rental: '',
            deposit: ''
          },
          account_bank: '',
          account_subbank: '',
        },
        currentInfoId: '',
        editInfoRules: {
          first_pay_price: [
            {required: true,message: '格式不正确！',trigger: 'blur'}
          ],
          first_pay_type: [
            {required: true,message: '格式不正确！',trigger: 'blur'}
          ],
          account_owner: [
            {required: true,message: '格式不正确！',trigger: 'blur'}
          ],
          staff_id: [
            {required: true,message: '格式不正确！',trigger: 'blur'}
          ],
          customer_name: [
            {required: true,message: '格式不正确！',trigger: 'blur'}
          ],
          account_type: [
            {required: true,message: '格式不正确！',trigger: 'blur'}
          ],
          account_num: [
            {required: true,message: '格式不正确！',trigger: 'blur'}
          ],
          contact: [
            {required: true,message: '格式不正确！',trigger: 'blur'}
          ],
          deal_date: [
            {required: true,message: '格式不正确！',trigger: 'blur'}
          ],
          deposit: [
            {required: true,message: '格式不正确！',trigger: 'blur'}
          ],
          first_pay_date: [
            {required: true,message: '格式不正确！',trigger: 'blur'}
          ],
          second_pay_date: [
            {required: true,message: '格式不正确！',trigger: 'blur'}
          ],
          department_id: [
            {required: true,message: '格式不正确！',trigger: 'blur'}
          ],
          medi_cost: [
            {required: true,message: '格式不正确！',trigger: 'blur'}
          ],
          months: [
            {required: true,message: '格式不正确！',trigger: 'blur'}
          ],
          pay_types: [
            {required: true,message: '格式不正确！',trigger: 'blur'}
          ],
          warrenty: [
            {required: true,message: '格式不正确！',trigger: 'blur'}
          ],
          subject_id: [
            {required: true,message: '格式不正确！',trigger: 'blur'}
          ],
          house_id: [
            {required: true,message: '格式不正确！',trigger: 'blur'}
          ],
        },
        banks: [],
        bank_code: '',
        subjectVisible: false,
        subjectType: 'top',
        currentSubType: '',
        showBank: false,
        rentInfoRules: {
          staff_id: [
            {required: true,message: '格式不正确',trigger: 'blur'}
          ],
          department_id: [
            {required: true,message: '格式不正确',trigger: 'blur'}
          ],
          contact: [
            {required: true,message: '格式不正确',trigger: 'blur'}
          ],
          house_id: [
            {required: true,message: '格式不正确',trigger: 'blur'}
          ],
          customer_name: [
            {required: true,message: '格式不正确',trigger: 'blur'}
          ],
          is_shared: [
            {required: true,message: '格式不正确',trigger: 'blur'}
          ],
          shared_part: [
            {required: true,message: '格式不正确',trigger: 'blur'}
          ],
          rent_type: [
            {required: true,message: '格式不正确',trigger: 'blur'}
          ],
          months: [
            {required: true,message: '格式不正确',trigger: 'blur'}
          ],
          deal_date: [
            {required: true,message: '格式不正确',trigger: 'blur'}
          ],
          complete_date: [
            {required: true,message: '格式不正确',trigger: 'blur'}
          ],
          account_type: [
            {required: true,message: '格式不正确',trigger: 'blur'}
          ],
          account_owner: [
            {required: true,message: '格式不正确',trigger: 'blur'}
          ],
          account_num: [
            {required: true,message: '格式不正确',trigger: 'blur'}
          ],
        },
        //编辑租客
        rentInfo: {
          staff_id: '',
          contact: '', //客户手机
          department_id: '',
          leader_id: '',
          house_id: '',
          customer_name: '',
          is_shared: '',
          shared_part: '',
          rent_type: '',
          months: '',
          prices: [],
          pay: [],
          received_amount: '', //已收
          medi_cost: '', //中介费
          deal_date: '', //签约时间
          complete_date: '',//尾款补齐时间
          remark: '', //备注
          water_fee: '',
          elec_fee: '',
          gas_fee: '',
          property_fee: '',
          manage_fee: '',
          net_fee: '',

          //客户信息
          account_type: '',
          account_owner: '',
          account_subbank: '',
          account_bank: '',
          account_num: '',
          subject_id: {
            rental: ''
          },

          //付款方式
          bet: '',
        },
        extraRentInfo: {
          editRentInfoVisible: false,
          staff_name: '',
          department_name: '',
          leader_name: '',
          house_name: '',
          canBank: true,
          subject_name: '',
          isRentSub: false,
          isRentDepart: false,

          //月单价
          is_one_price: false,
          first_price: '',
          price_list: [], //获取所有月单价
          price_label: [], // label
          price_model: {

          },

          //付款方式
          first_pay_price: '',
          is_more_pay: false,
          pay_list: [],
          pay_label: [],
          pay_model: {

          }
        },
      }
    },
    mounted() {
      this.getLandLordList();
      this.getBankList();
    },
    methods: {
      handleChangePay(val) {
        this.extraRentInfo.is_more_pay = val;
        if (val) {
          this.extraRentInfo.pay_list = [];
          this.extraRentInfo.pay_label = [];
          this.extraRentInfo.pay_model = {};
          const times = Math.ceil(parseInt(this.rentInfo.months) / 12);
          for (var z=0;z<times;z ++ ){
            this.extraRentInfo.pay_list.push(0);
            this.extraRentInfo.pay_model = Object.assign({},this.extraRentInfo.pay_model,{
              ['pay' + (z + 1)]: 0
            });
            this.extraRentInfo.pay_label.push('第' + (z + 1) + '期');
          }
          console.log(this.extraRentInfo.pay_list,this.extraRentInfo.pay_model,this.extraRentInfo.pay_label);
        }else {
          this.extraRentInfo.pay_list = [];
          this.extraRentInfo.pay_label = [];
          this.extraRentInfo.pay_model = {};
        }
      },
      //点击确定修改
      handleSubmitRentInfo(formName) {
        this.rentInfo.prices = [];
        this.rentInfo.pay = [];
        if (this.extraRentInfo.is_one_price) {
          var keys = Object.keys(this.extraRentInfo.price_model);
          var len = keys.length;
          for (var j =0;j<len;j++) {
            this.rentInfo.prices.push(this.extraRentInfo.price_model[keys[j]]);
          }
        } else {
          this.rentInfo.prices.push(this.extraRentInfo.first_price);
        }
        if (this.extraRentInfo.is_more_pay) {
          var keys1 = Object.keys(this.extraRentInfo.pay_model);
          var len1 = keys.length;
          for (var g =0;g<len1;g++) {
            this.rentInfo.pay.push(this.extraRentInfo.pay_model[keys1[g]]);
          }
        } else {
          this.rentInfo.pay.push(this.extraRentInfo.first_pay_price);
        }
        if (!this.rentInfo.pay[0] || !this.rentInfo.prices[0]) {
          this.$notify.warning({
            title: '警告',
            message: '付款方式或月单价参数不正确！'
          });
          return false;
        }
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.$http.put(this.url + `customer/renter/update/${this.currentInfoId}`,this.rentInfo).then(res => {
              this.SuccessCallBack(res);
              this.$refs[formName].resetFields();
              this.handleCancelEditRentInfo();
            })
          } else {
            this.$message.warning("error params");
          }
        })
      },
      handleChangeRentPrice(val) {
        if (val) {
          this.extraRentInfo.is_one_price = val;
          this.extraRentInfo.price_label = [];
          this.extraRentInfo.price_list = [];
          this.extraRentInfo.price_model = {};
          const times = Math.ceil(parseInt(this.rentInfo.months) / 12);
          for (var i = 0;i<times;i++) {
            this.extraRentInfo.price_list.push(0.00);
            this.extraRentInfo.price_model = Object.assign({},this.extraRentInfo.price_model,{
              ['price' + (i + 1)]: 0.00
            });
            this.extraRentInfo.price_label.push('第' + (i + 1) + '年');
          }
        } else {
          this.extraRentInfo.is_one_price = val;
          this.extraRentInfo.price_label = [];
          this.extraRentInfo.price_list = [];
          this.extraRentInfo.price_model = {};
        }
      },
      handleOpenDepartByRent() {
        this.extraRentInfo.isRentDepart = true;
        this.departVisible = true;
        this.length = 1;
        this.type = 'staff';
      },
      handleCancelEditRentInfo() {
        this.extraRentInfo.isRentDepart = false;
        this.extraRentInfo.isRentSub = false;
        this.extraRentInfo.editRentInfoVisible = false;
      },
      handleOpenRentSubject() {
        this.extraRentInfo.isRentSub = true;
        this.subjectVisible = true;
      },
      handleChangeRentBank(type) {
        if (type === 2 || type === 3) {
          this.extraRentInfo.canBank = false;
        } else {
          this.extraRentInfo.canBank = true;
        }
      },
      //月单价不唯一
      handleCheckPrice(val) {
        if (val) {
          this.editExtraParams.pay_others_price_label = [];
          if (this.editExtraParams.pay_others_price.length > 1) {
            var len = this.editExtraParams.pay_others_price.length;
            for (var w = 0;w<len;w ++) {
              this.editExtraParams.pay_others_price_value = Object.assign({},this.editExtraParams.pay_others_price_value,{
                ['price' + (w + 1)]: this.editExtraParams.pay_others_price[w]
              });
              this.editExtraParams.pay_others_price_label.push('第' + (w + 1) + '年');
            }
          } else {
            this.editExtraParams.pay_others_price = [];
            const num = Math.ceil(this.editParams.months / 12);
            for (var i=0;i<num;i++) {
              this.editExtraParams.pay_others_price.push(0.00);
              this.editExtraParams.pay_others_price_value = Object.assign({},this.editExtraParams.pay_others_price_value,{
                ['price' + (i + 1)]: 0.00
              });
              this.editExtraParams.pay_others_price_label.push('第' + (i + 1) + '年');
            }
          }
        }
      },
      //点击付款方式不唯一
      handleCheckboxPay(val) {
        this.editExtraParams.pay_others = val;
        if (val) {
          this.editExtraParams.pay_others_label = [];
          if (this.editExtraParams.pay_others_types.length > 1) {
            var len = this.editExtraParams.pay_others_types.length;
            for (var j=0;j<len;j++) {
              this.editExtraParams.pay_others_value = Object.assign({},this.editExtraParams.pay_others_value,{
                ['type' + (j + 1)]: this.editExtraParams.pay_others_types[j]
              });
              this.editExtraParams.pay_others_label.push('第' + (j + 1) + '年');
            }
          } else {
            this.editExtraParams.pay_others_types = [];
            const num = Math.ceil(this.editParams.months / 12);
            for (var i=0;i<num;i++) {
              this.editExtraParams.pay_others_types.push(1);
              this.editExtraParams.pay_others_value = Object.assign({},this.editExtraParams.pay_others_value,{
                ['type' + (i + 1)]: 1
              });
              this.editExtraParams.pay_others_label.push('第' + (i + 1) + '年');
            }
          }
        }
      },
      handleChangeAccount_type(type){
        if (type === 2 || type === 3) {
          this.showBank = true;
        } else {
          this.showBank = false;
        }
      },
      handleOpenSubject(type) {
        this.currentSubType = type;
        this.subjectType = 'top';
        this.subjectVisible = true;
      },
      closeSubjectTree() {
        this.subjectVisible = false;
        // this.extraRentInfo.isRentSub = false;
      },
      selectSubject(val) {
        this.getSubjects(val.id,this.currentSubType);
      },
      getBankList() {
        this.$http.get(this.url + 'account/manage/bank',{
          params: {
            bank_code: this.bank_code
          }
        }).then(res => {
          if (res.data.success) {
            this.banks = res.data.data;
          }else {
            this.banks = {};
          }
        }).catch(err => {
          console.log(err);
        })
      },
      handleCancelSubmit(formName) {
        this.$refs[formName].resetFields();
        this.canEditVisible = false;
      },
      handleClear(){
        this.editExtraParams.pay_others = this.editExtraParams.pay_price = false;
        this.editExtraParams.pay_others_value = this.editExtraParams.pay_others_price_value = {};
        this.editExtraParams.pay_others_types = this.editExtraParams.pay_others_price = [];
        this.editExtraParams.pay_others_label = this.editExtraParams.pay_others_price_label = [];
      },
      handleSubmitEditInfo(formName) {
        this.editParams.pay_types = [];
        this.editParams.prices = [];
        if (this.editExtraParams.pay_price) {
          var obj1 = this.editExtraParams.pay_others_price_value;
          var keys1 = Object.keys(obj1);
          for (var p =0;p<keys1.length; p ++) {
            this.editParams.prices.push(obj1[keys1[p]]);
          }
        } else {
          this.editParams.prices.push(this.editExtraParams.first_pay_price);
        }
        if (this.editExtraParams.pay_others) {
          var obj = this.editExtraParams.pay_others_value;
          var keys = Object.keys(obj);
          for (var z = 0;z<keys.length;z ++ ){
            this.editParams.pay_types.push(obj[keys[z]])
          }
        } else {
          this.editParams.pay_types.push(this.editExtraParams.first_pay_type);
        }
        if (!this.editParams.prices[0] || !this.editParams.pay_types[0]) {
          this.$notify.warning({
            title: '警告',
            message: '请完善付款方式或月单价信息！'
          });
          return false;
        }
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.$http.post(this.url + `customer/landlord/update/${this.currentInfoId}`,this.editParams).then(res => {
              this.SuccessCallBack(res);
              this.handleCancelSubmit(formName);
              this.handleClear();
            }).catch(err => {
              console.log(err);
            })
          } else {
            this.$message.warning("params error!");
          }
        })
      },
      getSubjects(id = 0,type) {
        this.$http.get(this.url + '/account/subject/detail/' + id).then(res => {
          if (res.data.success) {
            const data = res.data.data;
            if (this.extraRentInfo.isRentSub) {
              if (data.superior_title) {
                this.extraRentInfo.subject_name = `${data.superior_title} >> ${data.title}`;
              } else {
                this.extraRentInfo.subject_name = data.title;
              }
              this.rentInfo.subject_id.rental = data.id;
              return false;
            }
            if (type === 'rental') {
              this.editParams.subject_id.rental = data.id;
              if (data.superior_title) {
                this.editExtraParams.rental_name = `${data.superior_title} >> ${data.title}`;
              } else {
                this.editExtraParams.rental_name = data.title;
              }
            }else if (type === 'deposit') {
              this.editParams.subject_id.deposit = data.id;
              if (data.superior_title) {
                this.editExtraParams.deposit_name = `${data.superior_title} >> ${data.title}`;
              } else {
                this.editExtraParams.deposit_name = data.title;
              }
            }
          };
        }).catch(err => {
          console.log(err);
        })
      },
      handleOpenDepart() {
        this.departVisible = true;
        this.length = 1;
        this.type = 'staff';
      },
      handlePageChange(page) {
        this.params.page = page;
        this.getLandLordList();
      },
      handleOpenDetail(row) {
        if (this.activeName === 'first') {
          this.$http.get(this.url + `customer/landlord/read/${row.id}`).then(res => {
            if (res.data.success) {
              this.CurrentDetailInfo = res.data.data;
              console.log(this.CurrentDetailInfo);
              var info = res.data.data;
              var baseInfo = {};
              var accountInfo = {};
              accountInfo['汇款方式'] = info.account_type || '/';
              accountInfo['收款人姓名'] = info.account_owner || '';
              accountInfo['开户行'] = info.account_bank || '/';
              accountInfo['支行'] = info.account_subbank || '/';
              accountInfo['账号'] = info.account_num || '/';
              baseInfo['客户姓名'] = info.customer_name || '/';
              baseInfo['客户联系方式'] = info.contact || '/';
              baseInfo['房屋地址'] = info.address || '/';
              baseInfo['租房月数'] = info.months || '/';
              baseInfo['付款方式'] = info.payType || '/';
              baseInfo['月单价'] = info.prices[0] || '';
              baseInfo['待签约日期'] = info.deal_date || '/';
              baseInfo['空置期'] = info.vacancy || 0;
              baseInfo['第一次打房租日期'] = info.first_pay_date || '/';
              baseInfo['第二次打房租日期'] = info.second_pay_date || '/';
              baseInfo['负责人'] = info.staff.name || '/';
              baseInfo['所属部门'] = info.department && info.department.name || '/';
              baseInfo['操作人'] = info.operator.name || '/';
              baseInfo['签约人'] = info.operator.name || '/';
              baseInfo['科目'] = info.deposit_subject || '/';
              baseInfo['备注'] = info.remark || '/';
              this.historyInfo = info.account_history || [];
              this.baseInfo = baseInfo;
              this.accountInfo = accountInfo;
            }
          }).catch(err => {
            console.log(err);
          })
        } else{
          this.$http.get(this.url + `customer/renter/read/${row.id}`).then(res =>{
            if (res.data.success) {
              var info = res.data.data;
              var baseInfo = {};
              var accountInfo = {};
              accountInfo['汇款方式'] = info.account_type || '/';
              accountInfo['收款人姓名'] = info.account_owner || '';
              accountInfo['开户行'] = info.account_bank || '/';
              accountInfo['支行'] = info.account_subbank || '/';
              accountInfo['账号'] = info.account_num || '/';
              baseInfo['客户姓名'] = info.customer_name || '/';
              baseInfo['客户联系方式'] = info.contact || '/';
              baseInfo['房屋地址'] = info.address || '/';
              baseInfo['租房月数'] = info.months || '/';
              baseInfo['付款方式'] = info.payType || '/';
              baseInfo['月单价'] = info.prices && info.prices[0] || '/';
              baseInfo['已收'] = info.received_amount || '/';
              baseInfo['租房类型'] = info.rent_types || '/';
              baseInfo['房型'] = info.rooms && `${info.rooms.rooms}室 ${info.rooms.hall}厅 ${info.rooms.toilet}卫`|| '/';
              baseInfo['租房状态'] = info.rent_status || '/';
              baseInfo['待签约日期'] = info.deal_date || '/';
              baseInfo['补齐尾款时间'] = info.complete_date || '/';
              baseInfo['水费'] = info.water_fee || '/';
              baseInfo['电费'] = info.elec_fee || '/';
              baseInfo['燃气费'] = info.gas_fee || '/';
              baseInfo['物业费'] = info.property_fee || '/';
              baseInfo['管理费'] = info.manage_fee || '/';
              baseInfo['网络费'] = info.net_fee || '/';
              baseInfo['负责人'] = info.leader && info.leader.name || '/';
              baseInfo['所属部门'] = info.department && info.department.name || '/';
              baseInfo['操作人'] = info.operator && info.operator.name || '/';
              baseInfo['签约人'] = info.staff && info.staff.name || '/';
              baseInfo['科目'] = info.subjectsubject || '/';
              baseInfo['备注'] = info.remark || '/';
              this.baseInfo = baseInfo;
              this.accountInfo = accountInfo;
            }
          })
        }
        this.detailInfoVisible = true;
      },
      handleCancelDepart() {
        this.params.department_ids = "";
        this.extraParams.depart_name = "";
      },
      handleSelectDepart(val) {
        if (this.extraRentInfo.isRentDepart) {
          this.rentInfo.staff_id = val[0].id;
          this.extraRentInfo.staff_name = val[0].name;
          return false;
        }
        if (this.currentCtl = 'editInfo') {
          this.editExtraParams.staff_name = val[0].name;
          this.editParams.staff_id = val[0].id;
          this.editParams.department_id = val[0].org && val[0].org[0].id;
          this.editExtraParams.department_name = val[0].org && val[0].org[0].name;
        }
        this.extraParams.depart_name = "";
        this.params.department_ids = [];
        val.map(item => {
          this.extraParams.depart_name += item.name + ',';
          this.params.department_ids.push(item.id);
        });
        this.extraParams.depart_name = this.extraParams.depart_name.substring(0,this.extraParams.depart_name.length - 1);
      },
      handleCloseDepart() {
        this.departVisible = false;
      },
      SuccessCallBack(res) {
        if (res.data.success) {
          this.$notify.success({
            title: '成功',
            message: res.data.message
          });
        } else {
          this.$notify.warning({
            title: '失败',
            message: res.data.message
          });
        }
        this.getLandLordList();
      },
      handleRenewMark(id) {
        var root = "";
        if (this.activeName === 'first') {
          root = `customer/landlord/duplication/${id}`;
        }else {
          root = `customer/renter/duplication/${id}`;
        }
        this.$http.put(this.url + root).then(res => {
          this.SuccessCallBack(res);
        }).catch(err => {
          console.log(err);
        })
      },
      handleCancelMark() {
        if (this.activeName === 'first') {
          if (this.markArr.length < 1) {
            this.$notify.warning({
              title: '警告',
              message: '请选择需要取消的数据'
            });
            return false;
          } else {
            this.$http.post(this.url + 'customer/landlord/suppress',{ids: this.markArr}).then(res => {
              this.SuccessCallBack(res);
            }).catch(err => {
              console.log(err);
            })
          }
        } else {
          if (!this.markStr) {
            this.$notify.warning({
              title: '警告',
              message: '请选择需要取消的数据'
            });
            return false;
          } else {
            this.$http.post(this.url + 'customer/renter/suppress',{ids: this.markStr}).then(res =>{
              console.log(res);
              this.SuccessCallBack(res);
            })
          }
        }
      },
      handleSelectionChange(val) {
        if (this.activeName === 'first') {
          this.markArr = [];
          val.map(item => {
            this.markArr.push(item.id);
          })
        } else {
          this.markStr = "";
          val.map(item => {
            this.markStr += item.id + ',';
          })
        }
      },
      //房东管理列表
      getLandLordList(search) {
        if (search) {
          this.params.page = 1;
        }
        const session = JSON.parse(localStorage.getItem('personal')).session_id;
        this.Loading = true;
        this.emptyText = " ";
        if (this.activeName === 'first') {
          this.$http.get(this.url + 'customer/landlord/index',{params: this.params,headers: {Session: session}}).then(res => {
            if (res.data.success) {
              this.landLordList = res.data.data.data;
              this.landLordCount = res.data.data.count;
            } else {
              this.landLordList = [];
              this.landLordCount = 0;
              this.emptyText = "暂无数据";
            }
            this.Loading = false;
          })
        } else {
          this.$http.get(this.url + 'customer/renter/index',{params: this.params,headers: {Session: session}}).then(res => {
            if (res.data.success) {
              this.renterTableList = res.data.data.data;
              this.renterTableCount  = res.data.data.count;
            } else {
              this.renterTableList = [];
              this.renterTableCount = 0;
              this.emptyText = "暂无数据";
            }
            this.Loading = false;
          });
        }
      },
      handleTabClick(val) {
        this.activeName = val.name;
        this.getLandLordList();
      },
      goSearch() {
        if (this.activeName === 'first') {
          this.getLandLordList();
        }
        this.highGrade();
      },
      highGrade() {
        this.isHigh = !this.isHigh;
      },
      resetting() {
        this.params = {
          search: '',
          startRange: '',
          endRange: '',
          page: 1,
          limit: 12,
          department_ids: [],
        };
        this.extraParams.depart_name = "";
      },
      // 右键
      customerMenu(row, event) {
        if (row.freeze === 1) {
          if (this.activeName === 'first') {
            this.lists = [
              {clickIndex: 'editInfo', headIcon: 'el-icon-edit', label: '编辑' ,data: row},
              {clickIndex: 'renewMark', headIcon: 'iconfont icon-fangdongtuifang', label: '恢复重复标记',data: row},
              {clickIndex: 'backWait', headIcon: 'el-icon-refresh', label: '从待处理项恢复',data: row},
              {clickIndex: 'delete', headIcon: 'el-icon-circle-close-outline', label: '删除',data: row},
            ];
          } else {
            this.lists = [
              {clickIndex: 'editRentInfo',headIcon: 'el-icon-edit',label: '编辑',data: row},
              {clickIndex: 'renewMark', headIcon: 'iconfont icon-fangdongtuifang', label: '恢复重复标记',data: row},
              {clickIndex: 'backWait', headIcon: 'el-icon-refresh', label: '从待处理项恢复',data: row},
            ];
          }
        }else {
          if (this.activeName === 'first') {
            this.lists = [
              {clickIndex: 'editInfo', headIcon: 'el-icon-edit', label: '编辑' ,data: row},
              {clickIndex: 'renewMark', headIcon: 'iconfont icon-fangdongtuifang', label: '恢复重复标记',data: row},
              {clickIndex: 'goWait',headIcon: 'el-icon-refresh', label: '生成待处理项',data: row},
              {clickIndex: 'backWait', headIcon: 'el-icon-refresh', label: '从待处理项恢复',data: row},
              {clickIndex: 'delete', headIcon: 'el-icon-circle-close-outline', label: '删除',data: row},
            ];
          } else {
            this.lists = [
              {clickIndex: 'editRentInfo',headIcon: 'el-icon-edit',label: '编辑',data: row},
              {clickIndex: 'renewMark', headIcon: 'iconfont icon-fangdongtuifang', label: '恢复重复标记',data: row},
              {clickIndex: 'goWait',headIcon: 'el-icon-refresh', label: '生成待处理项',data: row},
              {clickIndex: 'backWait', headIcon: 'el-icon-refresh', label: '从待处理项恢复',data: row},
            ];
          }
        }
        this.contextMenuParam(event);
      },
      // 右键回调
      clickEvent(val) {
        if (val.clickIndex === 'delete') {
          this.openDelete(val.data.id);
        }
        if (val.clickIndex === 'renewMark') {
          this.handleRenewMark(val.data.id);
        }
        if (val.clickIndex === 'goWait') {
          this.handleGoWait(val.data.id);
        }
        if (val.clickIndex === 'backWait') {
          this.handleBackWait(val.data.id);
        }
        if (val.clickIndex === 'editInfo') {
          this.getCurrentInfo(val.data);
          this.canEditVisible = true;
        }
        if (val.clickIndex === 'editRentInfo') {
          this.getRentEditInfo(val.data);
          this.extraRentInfo.editRentInfoVisible = true;
        }
      },
      //编辑租客信息
      getRentEditInfo(data) {
        this.currentInfoId = data.id;
        this.rentInfo.staff_id = data.staff_id || '';
        this.extraRentInfo.staff_name = data.staff && data.staff.name || '';
        this.rentInfo.department_id = data.department_id || '';
        this.rentInfo.contact = data.contact || '';
        this.extraRentInfo.department_name = data.department && data.department.name || '';
        this.rentInfo.leader_id = data.leader_id || '';
        this.extraRentInfo.leader_name = data.leader && data.leader.name || '';
        this.rentInfo.house_id = data.house_id || '';
        this.extraRentInfo.house_name = data.address || '';
        this.rentInfo.customer_name = data.customer_name || '';
        this.rentInfo.is_shared = parseInt(data.is_shared) || '';
        this.rentInfo.rent_type = parseInt(data.rent_type) || '';
        this.rentInfo.shared_part = parseInt(data.shared_part) || '';
        this.rentInfo.months = parseInt(data.months) || '';
        this.rentInfo.received_amount = data.received_amount || '';
        this.rentInfo.medi_cost = data.medi_cost || '';
        this.rentInfo.remark = data.remark || '';
        this.rentInfo.deal_date = data.deal_date || '';
        this.rentInfo.complete_date = data.complete_date || '';
        this.rentInfo.net_fee = parseFloat(data.net_fee).toFixed(2) || '';
        this.rentInfo.water_fee = parseFloat(data.water_fee).toFixed(2) || '';
        this.rentInfo.elec_fee = parseFloat(data.elec_fee).toFixed(2) || '';
        this.rentInfo.gas_fee = parseFloat(data.gas_fee).toFixed(2) || '';
        this.rentInfo.property_fee = parseFloat(data.property_fee).toFixed(2) || '';
        this.rentInfo.manage_fee = parseFloat(data.manage_fee).toFixed(2) || '';
        this.rentInfo.account_type = data.account_type || '';
        this.rentInfo.account_owner = data.account_owner || '';
        this.rentInfo.account_subbank = data.account_subbank || '';
        this.rentInfo.account_bank = data.account_bank || '';
        this.rentInfo.account_num = data.account_num || '';
        this.rentInfo.subject_id.rental = data.subject_id && data.subject_id.rental || '';
        this.extraRentInfo.subject_name = data.subject || '';
        this.rentInfo.bet = data.bet || '';

        //月单价
        const prices = data.prices || [];
        if (prices.length > 1) {
          this.extraRentInfo.is_one_price = true;
          var length = prices.length;
          for (var k = 0;k <length; k++) {
            this.extraRentInfo.price_list.push(prices[k]);
            this.extraRentInfo.price_model = Object.assign({},this.extraRentInfo.price_model,{
              ['price' + (k + 1)]: prices[k]
            });
            this.extraRentInfo.price_label.push('第' + (k + 1) + '年');
          }
        } else {
          this.extraRentInfo.is_one_price = false;
          this.extraRentInfo.first_price = parseFloat(prices[0]).toFixed(2);
        }

        //付款方式
        const pay_type = data.pay || [];
        var pay_length = pay_type.length;
        if (pay_length > 1) {

        } else {
          this.extraRentInfo.is_more_pay = false;
          this.extraRentInfo.first_pay_price = pay_type[0];
        }
      },
      //编辑房东赋值
      getCurrentInfo(data) {
        this.getSubjects(data.subject_id.deposit,'deposit');
        this.getSubjects(data.subject_id.rental,'rental');
        this.currentInfoId = data.id;
        this.editExtraParams.staff_name = data.staff && data.staff.name || '/';
        this.editParams.staff_id = data.staff && data.staff.id || '';
        this.editExtraParams.department_name = data.department && data.department.name || '/';
        this.editParams.department_id = data.department_id || '';
        this.editParams.leader_id = data.leader_id && data.leader_id;
        this.editExtraParams.leader_name = data.leader && data.leader.name || '';
        this.editParams.customer_name = data.customer_name || '';
        this.editParams.contact = data.contact || '';
        this.editExtraParams.address = data.address || '';
        this.editParams.house_id = data.house_id || '';
        this.editParams.months = data.months || 0;
        if (data.pay_types) {
          if (data.pay_types.length > 1) {
            var len = data.pay_types.length;
            this.editExtraParams.pay_others_types = data.pay_types;
            for (var k =0;k<len;k++) {
              this.editExtraParams.pay_others_label.push('第' + (k + 1) + '年');
              this.editExtraParams.pay_others_value = Object.assign({},this.editExtraParams.pay_others_value,{
                ['type' + (k + 1)]: data.pay_types[k]
              })
            }
            this.editExtraParams.pay_others = true;
          } else {
            this.editExtraParams.first_pay_type = parseInt(data.pay_types[0]);
          }
        }
        if (data.prices) {
          var length = data.prices.length;
          if (length > 1) {
            this.editExtraParams.pay_others_price = data.prices;
            for (var g = 0;g <length;g ++) {
              this.editExtraParams.pay_others_price_label.push('第' + (g + 1) + '年');
              this.editExtraParams.pay_others_price_value = Object.assign({},this.editExtraParams.pay_others_price_value,{
                ['price' + (g + 1)]: data.prices[g]
              });
            }
            this.editExtraParams.pay_price = true
          } else {
            this.editExtraParams.first_pay_price = parseFloat(data.prices[0]).toFixed(2);
          }
        }
        // this.editParams.prices = data.prices && parseFloat(data.prices[0]).toFixed(2) || 0.00;
        this.editParams.deposit = data.prices &&  parseFloat(data.deposit).toFixed(2) || 0.00;
        this.editParams.warrenty = data.warrenty || 0;
        this.editParams.medi_cost = data.medi_cost || 0;
        this.editParams.deal_date = data.deal_date || '';
        this.editParams.first_pay_date = data.first_pay_date || '';
        this.editParams.second_pay_date = data.second_pay_date || '';
        this.editParams.account_type = data.account_type_id && data.account_type_id || '';
        if (this.editParams.account_type === 2 || this.editParams.account_type === 3) {
          this.showBank = true;
        } else {
          this.showBank = false;
        }
        this.editParams.account_owner = data.account_owner || '';
        this.editParams.account_bank = data.account_bank_id && data.account_bank_id.toString() || '';
        this.editParams.account_subbank = data.account_subbank || '';
        this.editParams.account_num = data.account_num || '';
        this.editParams.subject_id.deposit = data.subject_id && data.subject_id.deposit || '';
        this.editParams.subject_id.rental = data.subject_id && data.subject_id.rental || '';
      },
      handleGoWait(id) {
        var root = `account/pending/lord/${id}`;
        if (this.activeName !== 'first') {
          root = `account/pending/renter/${id}`;
        }
        this.$http.put(this.url + root).then(res => {
          this.SuccessCallBack(res);
        })
      },
      handleBackWait(id) {
        var obj = {identity: 1};
        if (this.activeName !== 'first'){
          obj.identity = 2;
        }
        this.$http.put(this.url + `account/pending/recover/${id}`,obj).then(res => {
          this.SuccessCallBack(res);
        })
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
      openDelete(id) {
        this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.get(this.url + `customer/landlord/delete/${id}`).then(res => {
            this.SuccessCallBack(res);
          }).catch(err => {
            console.log(err);
          })
        }).catch(() => {

        });
      }
    }
  }
</script>

<style lang="scss">
  #customerManage{
    .repeat_phone,.repeat_name,.repeat_address{
      display: inline-block;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      vertical-align: middle;
      margin-right: 10px;
    }
    .repeat_phone{
      background-color: #14e731;
    }
    .repeat_name{
      background-color: #E6A23C;
    }
    .repeat_address{
      background-color: #F56C6C;
    }
    .repeat_text{
      margin-right: 15px;
      vertical-align: middle;
    }
    .edit_title{
      height: 20px;
      padding-left: 10px;
      line-height: 1.5;
      margin-bottom: 15px;
      border-left: 5px solid #E6A23C;
    }
  }
</style>
