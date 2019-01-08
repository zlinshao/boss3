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
              <el-button slot="append" icon="el-icon-search" @click="getLandLordList"></el-button>
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
            <el-table-column label="月单价" prop="prices[0]"></el-table-column>
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

    <!--编辑-->
    <div>
      <el-dialog
        :visible.sync="canEditVisible"
        title="编辑信息"
        width="35%"
      >
        <div style="width: 95%;margin: 0 auto;">
          <el-form size="mini" :model="editParams" :rules="editInfoRules" ref="editForm" label-width="120px">
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
            <el-form-item label="付款方式" prop="pay_types">
              <el-select v-model="editParams.pay_types">
                <el-option label="月付" :value="1"></el-option>
                <el-option label="双月付" :value="2"></el-option>
                <el-option label="季付" :value="3"></el-option>
                <el-option label="半年付" :value="6"></el-option>
                <el-option label="年付" :value="12"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="月单价" prop="prices">
              <el-input v-model="editParams.prices"></el-input>
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
            <div class="edit_title"><h3>客户信息</h3></div>
            <el-form-item label="账户类型" prop="account_type">
              <el-select v-model="editParams.account_type" @change="handleChangeAccount_type">
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
              <el-select v-model="editParams.account_bank">
                <el-option v-for="(bank,key) in banks" :value="key" :key="key" :label="bank"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="支行" v-if="!showBank">
              <el-input v-model="editParams.account_subbank"></el-input>
            </el-form-item>
            <el-form-item label="账号" prop="account_num">
              <el-input v-model="editParams.account_num"></el-input>
            </el-form-item>
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
          startRange: '2018-01-01',
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

        activeName: 'first',

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
        showBank: false
      }
    },
    mounted() {
      this.getLandLordList();
      this.getBankList();
    },
    methods: {
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
      handleSubmitEditInfo(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.$http.post(this.url + `customer/landlord/update/${this.currentInfoId}`,this.editParams).then(res => {
              console.log(res);
              if (res.data.success) {
                this.handleCancelSubmit(formName);
                this.getLandLordList();
              }
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
              baseInfo['空置期'] = info.vacancy || '';
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
        if (this.currentCtl = 'editInfo') {
          this.editExtraParams.staff_name = val[0].name;
          this.editParams.staff_id = val[0].id;
          this.editParams.department_id = val[0].org && val[0].org[0].id;
          this.editExtraParams.department_name = val[0].org && val[0].org[0].name;
          return false;
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
      getLandLordList() {
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
              {clickIndex: 'editInfo', headIcon: 'el-icon-edit', label: '编辑' ,data: row},
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
              {clickIndex: 'editInfo', headIcon: 'el-icon-edit', label: '编辑' ,data: row},
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
      },
      //编辑房东赋值
      getCurrentInfo(data) {
        console.log(data);
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
        this.editParams.pay_types = data.pay_types[0];
        this.editParams.prices = data.prices && parseFloat(data.prices[0]).toFixed(2) || 0.00;
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
