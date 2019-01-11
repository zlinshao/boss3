<template>
  <div id="accountPayable" @click="rightMenuShow = false">
    <!--高级-->
    <div class="highRanking">
      <div style="text-align: right;margin-bottom: 10px">
        <el-input style="width: 15%" v-model="params.search" @keyup.enter.native="handleGoSearch" size="mini" placeholder="请输入需求搜索的内容" clearable>
          <el-button slot="append" icon="el-icon-search" @click="handleGoSearch"></el-button>
        </el-input>

        <el-button size="mini" type="primary" @click="isHigh = !isHigh">高级</el-button>
        <el-button size="mini" type="primary" icon="el-icon-refresh" @click="getPayableList"></el-button>
        <el-button size="mini" type="success" icon="el-icon-plus" @click="plusPayVisible = true" :disabled="isDeleteBin">新增应付</el-button>
        <el-button size="mini" type="primary" icon="el-icon-download" @click="handleOutData" :disabled="isDeleteBin">导出</el-button>
        <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDeleteBin">回收站</el-button>
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
                  <div class="el_col_label">款项状态</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-select v-model="params.status" clearable>
                      <el-option :value="1" label="待入账"></el-option>
                      <el-option :value="2" label="待结清"></el-option>
                      <el-option :value="3" label="已结清"></el-option>
                      <el-option :value="4" label="已超额"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">科目</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-input @focus="highSubjectVisible = true" v-model="assistParams.subject_name" clearable placeholder="请选择"></el-input>
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
                    <el-input @focus="handleOpenDepart('depart')" v-model="assistParams.depart_name" clearable placeholder="请选择"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">员工</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-input @focus="handleOpenDepart('staff')" v-model="assistParams.staff_name" clearable placeholder="请选择"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row class="el_row_border">
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">时间周期</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-date-picker
                      v-model="assistParams.time"
                      type="daterange"
                      align="right"
                      unlink-panels
                      value-format="yyyy-MM-dd"
                      range-separator="至"
                      start-placeholder="开始日期"
                      @change="handleSelRangDate"
                      end-placeholder="结束日期"
                      :picker-options="pickerOptions">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <div class="btnOperate">
            <el-button size="mini" type="primary" @click="getPayableList">搜索</el-button>
            <el-button size="mini" type="primary" @click="resetting">重置</el-button>
            <el-button size="mini" type="primary" @click="highGrade">取消</el-button>
          </div>
        </el-form>
      </div>
    </div>
    <!--应付-->
    <div>
      <el-table
        :empty-text='payEmpty'
        v-loading="payLoading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255, 255, 255, 0)"
        :data="payableList"
        @row-contextmenu="handleRowRightClick"
        :header-row-style="handleHeaderStyle"
      >
        <el-table-column label="付款时间" prop="pay_date"></el-table-column>
        <el-table-column label="客户姓名" prop="customerDetail.customer_name"></el-table-column>
        <el-table-column label="地址" prop="addr"></el-table-column>
        <el-table-column label="支出科目" prop="subject"></el-table-column>
        <el-table-column label="应付金额" prop="amount_payable"></el-table-column>
        <el-table-column label="实付金额" prop="amount_paid"></el-table-column>
        <el-table-column label="剩余款项" prop="balance"></el-table-column>
        <el-table-column label="补齐时间" prop="complete_date"></el-table-column>
        <el-table-column label="状态" prop="status">
          <template slot-scope="scope">
            <el-button v-if="scope.row.status === 1" type="danger" size="mini">待入账</el-button>
            <el-button v-if="scope.row.status === 2" type="warning" size="mini">待结清</el-button>
            <el-button v-if="scope.row.status === 3" type="success" size="mini">已结清</el-button>
            <el-button v-if="scope.row.status === 4" type="primary" size="mini">已超额</el-button>
          </template>
        </el-table-column>
        <el-table-column label="手机号" prop="customerDetail.contact"></el-table-column>
        <el-table-column label="操作" v-if="!isDeleteBin">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="LookPayableDetail(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row :gutter="20" style="margin-top: 20px;">
        <el-col :span="12">
          <span>应付金额(元)：<span style="color: #F56C6C">{{ balanceSum }}</span>
            实付金额(元)：<span style="color: #14e731">{{ paidSum }}</span>     剩余款项(元)：<span style="color: #E6A23C">{{ payableSum }}</span></span>
        </el-col>
        <el-col :span="12">
          <el-pagination
            :total="payableCount"
            layout="total,prev,pager,next"
            :current-page="params.page"
            :page-size="params.limit"
            @current-change="handlePageChange"
            style="text-align: right"
          ></el-pagination>
        </el-col>
      </el-row>
    </div>

    <!--科目-->
    <SubjectTree
      :subjectDialog="highSubjectVisible"
      :types="highSubjectType"
      @close="closeSubjectTree"
      @selectSubject="selectSubject"
    ></SubjectTree>

    <!--部门-->
    <Organization
      :organizationDialog="highOrganizationVisible"
      :length="highOrganizationLength"
      :type="highOrganizationType"
      @selectMember="handleSelectDepart"
      @close="handleCloseDepart"
    ></Organization>

    <!--新增应付-->
    <PlusPay :PayVisible="plusPayVisible" :title="'新增应付'" @close="plusPayVisible = false" @plusAddPay="handleAddPlusPay"></PlusPay>

    <!--右击菜单-->
    <RightMenu :startX="rightMenuX + 'px'" :startY="rightMenuY + 'px'" :show="rightMenuShow" :list="rightList" @clickOperateMore="rightClickBack"></RightMenu>

    <!--修改补齐时间-->
    <div>
      <el-dialog
        :visible.sync="editPayDateVisible"
        title="修改补齐时间"
        width="25%"
      >
        <div style="text-align: center">
          <span>补齐时间</span>
          <el-date-picker
            v-model="complete_date"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择补齐时间"
            size="mini"
            style="width: 70%"
          ></el-date-picker>
          <div style="text-align:right;margin-top: 20px">
            <el-button size="mini" @click="editPayDateVisible = false">取消</el-button>
            <el-button size="mini" type="primary" @click="handleChangeCompleteDate">确定</el-button>
          </div>
        </div>
      </el-dialog>
    </div>

    <!--应付入账-->
    <div>
      <el-dialog
        :visible.sync="payMoneyVisible"
        title="应付入账"
        width="30%"
      >
        <div style="text-align: center">
          <el-form :model="payMoneyParams" ref="payMoneyForm" :rules="payMoneyRules" label-width="100px" size="mini">
            <el-form-item label="付款方式">
              <el-select v-model="payMoneyExtraParams.account_type" @change="handleGetAccountList">
                <el-option label="银行卡" :value="1"></el-option>
                <el-option label="支付宝" :value="2"></el-option>
                <el-option label="微信" :value="3"></el-option>
                <el-option label="存折" :value="4"></el-option>
                <el-option label="现金" :value="5"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="付款账号" prop="account_id">
              <el-select v-model="payMoneyParams.account_id" :disabled="!canSel">
                <el-option v-for="item in AccountList" :key="item.id" :value="item.id" :label="item.name"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="账户类型">
              <el-select v-model="payMoneyParams.customer_account_type" disabled>
                <el-option label="银行卡" :value="1"></el-option>
                <el-option label="支付宝" :value="2"></el-option>
                <el-option label="微信" :value="3"></el-option>
                <el-option label="存折" :value="4"></el-option>
                <el-option label="现金" :value="5"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="客户账户">
              <el-input v-model="payMoneyParams.customer_account_num" disabled></el-input>
            </el-form-item>
            <el-form-item label="实付" prop="amount_paid">
              <el-input v-model="payMoneyParams.amount_paid" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="付款时间" prop="pay_date">
              <el-date-picker
                v-model="payMoneyParams.pay_date"
                type="date"
                placeholder="请选择付款时间"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="补齐时间" prop="complete_date">
              <el-date-picker
                v-model="payMoneyParams.complete_date"
                type="date"
                placeholder="请选择补齐时间"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
              <el-input type="textarea" :row="8" v-model="payMoneyParams.remark" placeholder="请输入备注"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="handleCancelPayMoney">取消</el-button>
              <el-button type="primary" @click="handleSubmitPayMoney('payMoneyForm')">确定</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
    </div>

    <!--因付详情-->
    <div>
      <el-dialog
        :visible.sync="payableDetailVisible"
        title="详情"
        width="80%"
      >
        <div>
          <div v-if="DetailCurrentRow.pendable === 1" style="margin-bottom: 20px;width: 95%">
            <el-button size="mini" type="success" @click="handleDealWith(DetailCurrentRow.id)">生成待处理项</el-button>
          </div>
          <el-row :gutter="20" style="margin-bottom: 25px;">
            <el-col :span="6">
              <span style="color: #409EFF;" class="receive_title">客户姓名：</span>
              <span class="receive_detail" v-if="DetailCurrentRow.info && DetailCurrentRow.info.customer ">{{ DetailCurrentRow.info.customer }}</span>
              <span class="receive_detail" v-else>/</span>
            </el-col>
            <el-col :span="6">
              <span style="color: #409EFF;" class="receive_title">科目名称：</span>
              <span class="receive_detail" v-if="DetailCurrentRow.subject">{{ DetailCurrentRow.subject }}</span>
              <span class="receive_detail" v-else>/</span>
            </el-col>
            <el-col :span="6">
              <span style="color: #409EFF;" class="receive_title">应付金额：</span>
              <span class="receive_detail" v-if="DetailCurrentRow.balance">{{ DetailCurrentRow.balance }}</span>
              <span class="receive_detail" v-else>/</span>
            </el-col>
            <el-col :span="6">
              <span style="color: #409EFF;" class="receive_title">付款时间：</span>
              <span class="receive_detail" v-if="DetailCurrentRow.pay_date ">{{ DetailCurrentRow.pay_date[0].pay_date }}&nbsp;&nbsp;
                <span @click="handleLookMore(DetailCurrentRow.pay_date)" style="color: red;cursor: pointer;">查看更多</span></span>
              <span class="receive_detail" v-else>/</span>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin-bottom: 25px;">
            <el-col :span="6">
              <span style="color: #409EFF;" class="receive_title">实付金额：</span>
              <span class="receive_detail" v-if="DetailCurrentRow.amount_paid ">{{ DetailCurrentRow.amount_paid }}</span>
              <span class="receive_detail" v-else>/</span>
            </el-col>
            <el-col :span="6">
              <span style="color: #409EFF;" class="receive_title">账户类型：</span>
              <span class="receive_detail" v-if="DetailCurrentRow.customer_account_type">{{ pay_account_type[DetailCurrentRow.customer_account_type] }}</span>
              <span class="receive_detail" v-else>/</span>
            </el-col>
            <el-col :span="6">
              <span style="color: #409EFF;" class="receive_title">剩余款项：</span>
              <span class="receive_detail" v-if="DetailCurrentRow.amount_payable">{{ DetailCurrentRow.amount_payable }}</span>
              <span class="receive_detail" v-else>/</span>
            </el-col>
            <el-col :span="6">
              <span style="color: #409EFF;" class="receive_title">账户账号：</span>
              <span class="receive_detail" v-if="DetailCurrentRow.customer_account_num ">{{ DetailCurrentRow.customer_account_num }}</span>
              <span class="receive_detail" v-else>/</span>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin-bottom: 25px;">
            <el-col :span="6">
              <span style="color: #409EFF;" class="receive_title">补齐时间：</span>
              <span class="receive_detail" v-if="DetailCurrentRow.complete_date ">{{ DetailCurrentRow.complete_date }}</span>
              <span class="receive_detail" v-else>/</span>
            </el-col>
            <el-col :span="6">
              <span style="color: #409EFF;" class="receive_title">收款人姓名：</span>
              <span class="receive_detail" v-if="DetailCurrentRow.customer && DetailCurrentRow.customer.account_owner">{{ DetailCurrentRow.customer.account_owner }}</span>
              <span class="receive_detail" v-else>/</span>
            </el-col>
            <el-col :span="6">
              <span style="color: #409EFF;" class="receive_title">备注：</span>
              <span class="receive_detail" v-if="DetailCurrentRow.remark">{{ DetailCurrentRow.remark }}</span>
              <span class="receive_detail" v-else>/</span>
            </el-col>
            <el-col :span="6">
              <span style="color: #409EFF;" class="receive_title">开户行：</span>
              <span class="receive_detail" v-if="DetailCurrentRow.customer && DetailCurrentRow.customer.account_bank ">{{ DetailCurrentRow.customer.account_bank }}</span>
              <span class="receive_detail" v-else>/</span>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin-bottom: 25px;">
            <el-col :span="6">
              <span style="color: #409EFF;" class="receive_title">支行：</span>
              <span class="receive_detail" v-if="DetailCurrentRow.complete_date && DetailCurrentRow.customer.account_subbank">{{ DetailCurrentRow.customer.account_subbank }}</span>
              <span class="receive_detail" v-else>/</span>
            </el-col>
          </el-row>
        </div>
      </el-dialog>
    </div>

    <!--更多付款时间-->
    <div>
      <el-dialog
        :visible="morePayDateVisible"
        title="更多付款时间"
        width="30%"
        @close="morePayDateVisible = false"
      >
        <div class="more_date">
          <p v-for="(item,key) in currentPay_date">第 {{key + 1}} 次付款时间：{{ item.pay_date }}</p>
        </div>
      </el-dialog>
    </div>

    <div>
      <el-dialog
        :visible.syc="backVisible"
        title="回滚"
        @close="handleCloseBack"
      >
        <div style="text-align: right;margin-bottom: 10px"><el-button type="primary" @click="handleBackGo" size="mini">确定</el-button></div>
        <el-table
          :data="backList"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column label="ID" prop="id"></el-table-column>
          <el-table-column label="Desc" prop="value"></el-table-column>
        </el-table>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import SubjectTree from '../components/subjectTree.vue';
  import Organization from '../../common/organization.vue';
  import PlusPay from './components/plusPay.vue';
  import RightMenu from '../../common/rightMenu.vue';

  export default {
    name: 'accountPayable',
    components: {SubjectTree,Organization,PlusPay,RightMenu},
    data() {
      return {
        url: globalConfig.finance_server,
        backVisible: false,
        backList: [],
        backParams: [],
        backCurrentId: '',
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
        assistParams: {
          subject_name:'',
          depart_name: '',
          staff_name: '',
          time: '',
        },
        params: {
          status: '', //款项状态
          subject_id: '', //科目
          department_id: [],  //部门id数组
          staff_id: [], //员工id数组
          date_min: '',//最小日期
          date_max: '', //最大日期
          search: '', //搜索条件
          page: 1,
          limit: 15,
        },
        isHigh: false, //高级
        highSubjectVisible: false,
        highSubjectType: '',
        highOrganizationVisible: false,
        highOrganizationLength: 0,
        highOrganizationType: '',

        payEmpty: '',
        payLoading: false,
        payableList: [], //列表数据
        payableCount: 0,
        balanceSum: 0, //应付
        payableSum: 0, //剩余
        paidSum: 0, //实付

        //新增应付
        plusPayVisible: false,

        //右击菜单
        rightMenuX: 0,
        rightMenuY: 0,
        rightMenuShow:false,
        rightList: [],
        rightCurrentRow: '',

        //修改补齐时间
        editPayDateVisible: false,
        complete_date: '',

        //修改科目
        isChangeSubject: false,

        //应付入账
        payMoneyVisible: false,
        payMoneyExtraParams: {
          account_type: '',
        },
        payMoneyParams: {
          customer_account_num: '',
          customer_account_type: '',
          account_id: '',
          amount_paid: '',
          remark: '',
          pay_date: '',
          complete_date: ''
        },
        payMoneyRules: {
          account_id: [
            {required: true,message: '请选择账户',trigger: 'blur'}
          ],
          amount_paid: [
            {required: true,message: '请输入实付金额',trigger: 'blur'}
          ],
          remark: [
            {required: false,message: '请输入备注',trigger: 'blur'}
          ],
          pay_date: [
            {required: true,message: '请选择付款时间',trigger: 'blur'}
          ],
          complete_date: [
            {required: true,message: '请选择补齐时间',trigger: 'blur'}
          ],

        },
        canSel: false,
        AccountList: [],

        //详情
        DetailCurrentRow: '',
        payableDetailVisible: false,
        pay_account_type: {
          "1": "银行卡",
          "2": "支付宝",
          "3": "微信",
          "4": "存折",
          "5": "现金",
        },
        morePayDateVisible: false,
        currentPay_date: [],

        //回收站
        isDeleteBin: false,
      }
    },
    mounted() {
      this.getPayableList();
    },
    methods: {
      handleSelRangDate(val){
        if (val) {
          this.params.date_min = val[0];
          this.params.date_max = val[1];
        } else {
          this.params.date_min = "";
          this.params.date_max = "";
        }
      },
      handleGoSearch() {
        this.params.page = 1;
        this.getPayableList();
      },
      handleSelectionChange(val) {
        this.backParams = [];
        val.map(item => {
          this.backParams.push(item.id);
        })
      },
      handleBackGo() {
        if (this.backList.length < 1){
          this.$notify.warning({
            title: '警告',
            message: '请选择需要回滚的记录'
          });
          return false;
        } else {
          this.$http.post(this.url + `account/payable/revert/${this.backCurrentId}`,{running_account_ids: this.backParams}).then(res => {
            this.handleCallback(res);
            this.backList = [];
            this.backVisible = false;
            this.backCurrentId = '';
          }).catch(err => {
            console.log(err);
          })
        }
      },
      handleCloseBack() {
        this.backList = [];
        this.backVisible = false;
      },
      //回滚
      handleCallBackDelete(row) {
        if (row.running_account_record) {
          for (var key in row.running_account_record) {
            this.backList.push({id: key,value: row.running_account_record[key]})
          }
        }else {
          this.backList = [];
        }
        this.backCurrentId = row.id;
        this.backVisible = true;
      },
      //表头样式
      handleHeaderStyle() {
        if (this.isDeleteBin) {
          return "color: red";
        } else {
          return "";
        }
      },
      //回收站
      handleDeleteBin() {
        this.isDeleteBin = !this.isDeleteBin;
        this.getPayableList();
      },
      //生成待处理项
      handleDealWith(id) {
        this.$http.put(this.url + `account/pending/payable/${id}`).then(res => {
          this.handleCallback(res);
        }).catch(err => {
          console.log(err);
        })
      },
      //查看更多时间
      handleLookMore(pay_date) {
        this.currentPay_date = pay_date;
        this.morePayDateVisible = true;
      },
      //获取账户列表
      handleGetAccountList(cate) {
        this.canSel = false;
        this.AccountList = [];
        this.payMoneyParams.account_id = "";
        this.$http.get(globalConfig.finance_server + 'account/manage/index',{
          params: {
            cate,
            all: 1
          }
        }).then(res => {
          if (res.data.success) {
            this.canSel = true;
            this.AccountList = res.data.data.data;
          } else {
            this.canSel = true;
            this.AccountList = [];
          }
        })
      },
      //应付入账
      handleCancelPayMoney() {
        this.$refs['payMoneyForm'].resetFields();
        this.payMoneyExtraParams.account_type = "";
        this.payMoneyParams.account_id = "";
        this.canSel = false;
        this.payMoneyVisible = false;
      },
      handleSubmitPayMoney(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.$http.post(this.url + `account/payable/transfer/${this.rightCurrentRow.id}`,this.payMoneyParams).then(res => {
              if (res.data.success) {
                this.$notify.success({
                  title: '成功',
                  message: `应付成功,${res.data.message}`
                });
              } else {
                this.$notify.warning({
                  title: '失败',
                  message: '应付失败'
                });
              }
              this.handleCancelPayMoney();
              this.getPayableList();
            }).catch(err => {
              console.log(err);
            })
          } else {
            this.$message.warning('params error');
          }
        })
      },
      //导出数据
      handleOutData() {
        this.$http.get(this.url + 'account/payable/export',{responseType: 'arraybuffer',params: this.params}).then(res => {
          this.$exportData(res.data);
        }).catch(err => {
          console.log(err);
        })
      },
      //修改弹出确认框
      handleConfirmDialog(id,title,placeholder,val,type = 'text',reg = null,regMsg,callback) {
        this.$prompt(title, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: reg,
          inputValue: val,
          inputType: type,
          inputErrorMessage: regMsg
        }).then(({ value }) => {
          callback(id,value);
        }).catch(() => { });
      },
      //右击菜单
      handleRowRightClick(row,event) {
        if (this.isDeleteBin) {
          this.rightList = [];
          return false;
        }
          this.rightList = [
            {clickIndex: 'payMoney',headIcon: 'el-icon-edit',label: '应付入账',data: row},
            {clickIndex: 'editPayMoney',headIcon: 'el-icon-edit',label: '修改应付金额',data: row},
            {clickIndex: 'addMark',headIcon: 'el-icon-edit',label: '添加备注',data: row},
            {clickIndex: 'changeDate',headIcon: 'el-icon-edit',label: '修改补齐时间',data: row},
            {clickIndex: 'changeSubject',headIcon: 'el-icon-edit',label: '修改科目',data: row},
            {clickIndex: 'delete',headIcon: 'el-icon-delete',label: '删除',data: row},
            {clickIndex: 'callDelete',headIcon: 'el-icon-refresh',label: '回滚',data: row},
          ];
        this.rightClickParams(event);
      },
      rightClickParams(event) {
        let e = event || window.event;
        this.rightMenuShow = false;
        this.rightMenuX = e.clientX + document.documentElement.scrollLeft - document.documentElement.clientLeft;
        this.rightMenuY = e.clientY + document.documentElement.scrollTop - document.documentElement.clientTop;
        event.preventDefault();
        event.stopPropagation();
        this.$nextTick(() => {
          this.rightMenuShow = true
        })
      },
      rightClickBack(val) {
        this.rightCurrentRow = val.data;
        if (val.clickIndex === 'editPayMoney') {
          var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
          var money = parseFloat(val.data.balance);
          this.handleConfirmDialog(val.data.id,'修改应付金额','请输入', money , 'text', reg ,'请输入应付金额',this.handleChangePayMoney);
        }
        if (val.clickIndex === 'delete') {
          this.handleDelete(val.data.id);
        }
        if (val.clickIndex === 'addMark') {
          var reg1 = null;
          var defaultValue = '';
          this.handleConfirmDialog(val.data.id,'添加备注','请输入',defaultValue, 'textarea' ,reg1,null,this.handleAddMark);
        }
        if (val.clickIndex === 'changeDate') {
          this.complete_date = val.data.complete_date;
          this.editPayDateVisible = true;
        }
        if (val.clickIndex === 'changeSubject') {
          this.isChangeSubject = true;
          this.highSubjectVisible = true;
        }
        if (val.clickIndex === 'payMoney') {
          this.payMoneyParams.amount_paid = parseFloat(val.data.amount_paid).toFixed(2);
          this.payMoneyParams.pay_date = val.data.pay_date;
          this.payMoneyParams.complete_date = val.data.complete_date;
          this.payMoneyParams.customer_account_num = val.data.customer_account_num;
          this.payMoneyParams.customer_account_type = val.data.customer_account_type;
          this.payMoneyVisible = true;
        }
        if (val.clickIndex === 'callDelete') {
          this.handleCallBackDelete(val.data);
        }
      },
      //修改科目
      handleChangeSubject(subject_id) {
        this.$http.post(this.url + `account/payable/editSubject/${this.rightCurrentRow.id}`,{subject_id}).then(res => {
          this.handleCallback(res);
          this.isChangeSubject = false;
        })
      },
      //修改应付金额
      handleChangePayMoney(id,amount_payable) {
        this.$http.put(this.url + `account/payable/edit/${id}`,{amount_payable}).then(res => {
          this.handleCallback(res);
        }).catch(err => {
          console.log(err);
        })
      },
      //删除
      handleDelete(id) {
        this.$confirm('你确定删除吗？','提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.get(this.url + `account/payable/delete/${id}`).then(res => {
            console.log(res);
            this.handleCallback(res);
          })
        }).catch(() => { })
      },
      //添加备注
      handleAddMark(id,content) {
        this.$http.post(this.url + `account/payable/tag/${id}`,{content}).then(res => {
          console.log(res);
          this.handleCallback(res);
        })
      },
      //修改补齐时间
      handleChangeCompleteDate() {
        this.$http.post(this.url + `account/payable/editCompleteDate/${this.rightCurrentRow.id}`,{complete_date: this.complete_date}).then(res => {
          this.handleCallback(res);
          this.editPayDateVisible = false;
        })
      },
      //http callback
      handleCallback(res) {
        if (res.data.success) {
          this.$notify.success({
            title: '成功',
            message: res.data.message
          });
          this.getPayableList();
        } else {
          this.$notify.warning({
            title: '失败',
            message: res.data.message
          });
        }
      },
      //新增应付
      handleAddPlusPay(params) {
        this.$http.post(this.url + 'account/payable/add',params).then(res => {
          this.handleCallback(res);
          this.plusPayVisible = false;
        }).catch(err => {
          console.log(err);
        })
      },

      //部门
      handleOpenDepart(type) {
        this.highOrganizationVisible = true;
        this.highOrganizationLength = 10;
        this.highOrganizationType = type;
      },
      handleSelectDepart(val) {
        if (this.highOrganizationType === 'depart') {
          this.params.department_id = [];
          val.map(item => {
            this.params.department_id.push(item.id);
            this.assistParams.depart_name += item.name + '、';
          });
          this.assistParams.depart_name = this.assistParams.depart_name.substring(0,this.assistParams.depart_name.length - 1);
        } else {
          this.params.staff_id = [];
          val.map(item => {
            this.params.staff_id.push(item.id);
            this.assistParams.staff_name += item.name + '、';
          });
          this.assistParams.staff_name = this.assistParams.staff_name.substring(0,this.assistParams.staff_name.length - 1);
        }
        this.handleCloseDepart();
      },
      handleCloseDepart() {
        this.highOrganizationVisible = false;
      },

      //科目
      closeSubjectTree() {
        this.highSubjectVisible = false;
      },
      selectSubject(val) {
        if (this.isChangeSubject) {
          this.handleChangeSubject(parseInt(val.id));
        }else {
          this.assistParams.subject_name = val.name;
          this.params.subject_id = parseInt(val.id);
        }
      },

      //高级
      resetting() {
        this.params = {
          status: '', //款项状态
          subject_id: '', //科目
          department_id: [],  //部门id数组
          staff_id: [], //员工id数组
          date_min: '',//最小日期
          date_max: '', //最大日期
          search: '', //搜索条件
          page: 1,
          limit: 15,
        };
        this.assistParams = {
          subject_name:'',
          depart_name: '',
          staff_name: '',
        };
      },
      highGrade() {
        this.isHigh = false;
      },

      //查看详情
      LookPayableDetail(row) {
        this.$http.get(this.url + `account/payable/detail/${row.id}`).then(res => {
          if (res.data.success) {
            this.DetailCurrentRow = res.data.data;
            this.payableDetailVisible = true;
          }
        })
      },

      //列表数据
      getPayableList() {
        this.payLoading = true;
        this.isHigh = false;
        var root = "account/payable/index";
        if (this.isDeleteBin) {
          root = "account/payable/trashed";
        }
        this.$http.get(this.url + root, {params: this.params}).then(res => {
          if (res.data.success) {
            this.payableList = res.data.data.data;
            this.payableCount = res.data.data.count;
            this.balanceSum = res.data.data.balanceSum;
            this.payableSum = res.data.data.payableSum;
            this.paidSum = res.data.data.paidSum;
          } else {
            this.payEmpty = '暂无数据';
          }
          this.payLoading = false;
        }).catch(err => {
          console.log(err);
        })
      },
      handlePageChange(page) {
        this.params.page = page;
        this.getPayableList();
      }
    }
  }

</script>
<style lang="scss">
  #accountPayable{
    /*position: relative;*/
    .DetailTitle{
      display: inline-block;
      width: 20%;
      text-align: right;
      margin-right: 50px;
      color: #409EFF;
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
    .more_date{
      width: 100%;
      height: 400px;
      overflow-y: scroll;
      margin: 0 auto;
      text-align: center;
    }
  }
</style>
