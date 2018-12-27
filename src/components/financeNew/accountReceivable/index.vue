<template>
  <div @click="show=false" @contextmenu="closeMenu" id="receivable">
    <div class="highRanking">
      <div class="highSearch">
        <el-form :model="form" :inline="true" size="mini">
          <el-form-item>
            <el-input placeholder="请输入内容" v-model="form.search" size="mini" clearable
                      @keyup.enter.native.prevent="getTableData">
              <el-button slot="append" icon="el-icon-search" @click="getTableData"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getTableData"><i class="el-icon-refresh"></i></el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addPayVisible = true"><i class="el-icon-plus"></i>&nbsp;新增</el-button>
          </el-form-item>
          <el-form-item>
            <el-dropdown trigger="click" @command="leadingOut">
              <el-button type="primary" size="mini">
                导出<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="collect">导出</el-dropdown-item>
                <el-dropdown-item command="rent">催缴导出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="sendMsgVisible = true" icon="el-icon-message" :disabled="currentSelectIds.length > 0 ? false : true">发送短信</el-button>
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
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
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
                  <div class="el_col_label">部门/员工</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-input v-model="staff_name" @focus="chooseStaff" placeholder="请选择员工"
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
        @cell-click="showDetail"
        @row-contextmenu="collectMenu"
        @header-click="selectPrice"
        @selection-change="handleSelectionChange"
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
        <el-table-column label="操作">
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
        </span>&nbsp;&nbsp;&nbsp;&nbsp;
          <span>
          今日到期：1
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

    <el-dialog title="收货地址" :visible.sync="addrDetail">
      <el-table :data="addrDetails">
        <el-table-column property="addr" label="客户姓名" width="150"></el-table-column>
        <el-table-column property="customer.contract" label="手机号" width="200"></el-table-column>
        <el-table-column property="addr" label="租房月数"></el-table-column>
        <el-table-column property="addr" label="付款方式"></el-table-column>
        <el-table-column property="addr" label="月单价"></el-table-column>
        <el-table-column property="addr" label="合同时间周期"></el-table-column>
        <el-table-column property="addr" label="开单人"></el-table-column>
        <el-table-column property="addr" label="部门"></el-table-column>
      </el-table>
    </el-dialog>
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
        <el-row :gutter="20" style="margin-bottom: 25px;">
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
          <el-col :span="6">
            <span style="color: #409EFF;" class="receive_title">汇款方式：</span>
            <span class="receive_detail" v-if="DetailCurrentRow.account_type ">{{ DetailCurrentRow.account_type }}</span>
            <span class="receive_detail" v-else>/</span>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-bottom: 25px;">
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
          <el-col :span="6">
            <span style="color: #409EFF;" class="receive_title">开户行：</span>
            <span class="receive_detail" v-if="DetailCurrentRow.account_bank ">{{ DetailCurrentRow.account_bank }}</span>
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
            <span style="color: #409EFF;" class="receive_title">支行：</span>
            <span class="receive_detail" v-if="DetailCurrentRow.customer && DetailCurrentRow.customer.account_subbank ">{{ DetailCurrentRow.customer.account_subbank }}</span>
            <span class="receive_detail" v-else>/</span>
          </el-col>
          <el-col :span="6">
            <span style="color: #409EFF;" class="receive_title">收入科目：</span>
            <span class="receive_detail" v-if="DetailCurrentRow.subject ">{{ DetailCurrentRow.subject }}</span>
            <span class="receive_detail" v-else>/</span>
          </el-col>
          <el-col :span="6">
            <span style="color: #409EFF;" class="receive_title">账号：</span>
            <span class="receive_detail" v-if="DetailCurrentRow.customer && DetailCurrentRow.customer.account_num ">{{ DetailCurrentRow.customer.account_num }}</span>
            <span class="receive_detail" v-else>/</span>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-bottom: 25px;">
          <el-col :span="6">
            <span style="color: #409EFF;" class="receive_title">备注：</span>
            <span class="receive_detail" v-if="DetailCurrentRow.remark ">{{ DetailCurrentRow.remark }}</span>
            <span class="receive_detail" v-else>/</span>
          </el-col>
          <el-col :span="6">
            <span style="color: #409EFF;" class="receive_title">详情：</span>
            <span class="receive_detail" v-if="DetailCurrentRow.description && DetailCurrentRow.description.description ">{{ DetailCurrentRow.description.description }}</span>
            <span class="receive_detail" v-else>/</span>
          </el-col>
          <el-col :span="6">
            <span style="color: #409EFF;" class="receive_title">历史收款记录：</span>
            <span class="receive_detail" v-if="DetailCurrentRow.customer && DetailCurrentRow.customer.account_history ">{{ DetailCurrentRow.customer.account_history }}</span>
            <span class="receive_detail" v-else>/</span>
          </el-col>
          <el-col :span="6">
            <span style="color: #409EFF;" class="receive_title">地址：</span>
            <span class="receive_detail" v-if="DetailCurrentRow.address ">{{ DetailCurrentRow.address }}</span>
            <span class="receive_detail" v-else>/</span>
          </el-col>
        </el-row>
      </div>
    </el-dialog>

    <!--添加备注-->
    <el-dialog
      :visible.sync="remarkVisible"
      title="添加备注"
      width="40%"
    >
      <el-input type="textarea" :row="12" v-model="add_remark" placeholder="请输入备注信息"></el-input>
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
      发送类型：
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
      title="新增应付"
      width="30%"
    >
      <div style="width: 85%;text-align: center;">
        <el-form :model="addForm" :rules="addFormRules" ref="addPayForm" label-width="100px" size="small">
          <el-form-item label="客户名称" prop="customer_name">
            <el-select v-model="addForm.customer_name">
              <el-option value="111" label="小王"></el-option>
            </el-select>
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
          <el-form-item label="付款日期" prop="pay_date">
            <el-date-picker
              v-model="addForm.pay_date"
              type="date"
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
            <el-button size="mini" @click="addPayVisible = false">取消</el-button>
            <el-button size="mini" type="primary" @click="handleAddPay">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import organization from '../../common/organization.vue'
  import RightMenu from '../../common/rightMenu.vue'    //右键
  import subjectTree from '../components/subjectTree.vue'
  import PolishTime from '../components/polishTime.vue'

  export default {
    name: "index",
    components: {organization, RightMenu, subjectTree, PolishTime},
    data() {
      return {
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
        tag_status: ['违约', '延期', '贴条', '换锁', '维修', '资金', '炸弹', '调房', '特殊情况'],
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
          limit: 12
        },
        sum: {
          balance_sum: '',//剩余款项
          receivable_sum: '',//应收金额
          received_sum: ''//实收金额
        },
        addrDetail: false,
        addrDetails: [],
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
          customer_name: '',
          identity: '',
          pay_date: '',
          description: '',
          amount_receivable: '',
          subject_id: '',
          remark: ''
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
          customer_name: [
            { required: true, message: '请选择客户', trigger: 'blur' },
          ],
          identity: [
            { required: true, message: '请选择客户身份', trigger: 'blur' },
          ],
          amount_receivable: [
            { required: true, message: '请输入应收金额', trigger: 'blur' },
          ]
        }
      }
    },
    mounted() {
      this.getTableData();
    },
    methods: {
      handleAddPay(){
        console.log(this.addForm);
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
          var date1 = new Date(this.fastOutDate[0]).toLocaleDateString().split('/').join('-');
          var date2 = new Date(this.fastOutDate[1]).toLocaleDateString().split('/').join('-');
          console.log(date1,date2);
          this.$http.get(this.url + 'account/receivable/export',{params: {date: `${date1},${date2}`}}).then(res =>{
            console.log(res);
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
        this.$http.put(this.url + `account/receivable/addTag/${this.rightMenuRow.id}`,{content: this.add_remark}).then(res => {
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

      getTableData() {
        this.isHigh = false;
        this.collectLoading = true;
        this.collectStatus = ' ';
        let params = this.form;
        this.$http.get(this.url + 'account/receivable/index', {params: params}).then((res) => {
          if (res.data.success) {
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
        } else {
          this.form.subject_id = val.id;
          this.subject_name = val.name;
        }
      },
      closeOrganize() {
        this.organizeVisible = false;
      },
      // 员工筛选
      chooseStaff() {
        this.organizeVisible = true;
        this.organizeType = 'staff';
      },
      // 清空员工
      closeStaff() {
        this.form.staff_ids = [];
        this.staff_name = '';
      },
      selectMember(val) {
        if (this.organizeType === 'depart') {
          for (var i = 0; i < val.length; i++) {
            this.department_name = this.department_name === "" ? val[i].name : this.department_name + "," + val[i].name;
            this.form.depart_ids.push(val[i].id);
          }
        } else if (this.organizeType === 'staff') {
          for (var i = 0; i < val.length; i++) {
            this.staff_name = this.staff_name === "" ? val[i].name : this.staff_name + "," + val[i].name;
            this.form.staff_ids.push(val[i].id);
          }
        }
      },
      selectPrice(column, event) {
        if (column.property === "balance") {
          alert(1);
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
        this.subject_name = '';
      },
      // 高级筛选
      highGrade() {
        this.isHigh = !this.isHigh;
      },
      // 导出
      leadingOut(val) {
        console.log(val);
        if (val === 'rent') {
          this.fastOutVisible = true;
        }
      },
      handleSelect(item) {
        console.log(item);
      },
      close_() {
        console.log(1);
      },
      //
      showDetail(row, column) {
        if (column.property === "addr") {//显示详情
          console.log(row);
          this.addrDetails.push(row);
          this.addrDetail = true;
        }
      },
      // 右键 收
      collectMenu(row, event) {
        this.rightMenuRow = row;
        this.lists = [
          {clickIndex: 'collectWay', headIcon: 'el-icon-edit-outline', label: '应收入账'},
          {clickIndex: 'collectRemark', headIcon: 'el-icon-edit', label: '备注'},
          {
            clickIndex: '', headIcon: 'el-icon-date', tailIcon: 'el-icon-arrow-right', label: '收款时间',
            children: [
              {clickIndex: 'reviseCollect', label: '编辑',},
              {clickIndex: 'lookCollect', label: '查看',}
            ]
          },
          {clickIndex: 'collectPolish', headIcon: 'el-icon-date', label: '修改补齐时间',},
          {clickIndex: 'delete', headIcon: 'el-icon-circle-close-outline', label: '删除',},
        ];
        this.contextMenuParam(event);
      },

      // 右键回调
      clickEvent(val) {
        if (val === 'delete') {
          this.openDelete();
        }
        if (val === 'reviseCollect') {
          this.payTimes = ['1990-01-01', '1990-02-01', '1990-03-01', '1990-04-01', '1990-06-01', '1990-06-01'];
        }
        if (val === 'lookPay' || val === 'lookCollect') {
          this.payTimes = ['1992-01-01', '1992-02-01', '1992-03-01', '1992-04-01', '1992-06-01', '1992-06-01'];
        }
        if (val === 'collectPolish' || val === 'payPolish') {
          this.polishTimeVisible = true;
          this.polishTime = this.rightMenuRow.complete_date;
        }
        if (val === 'collectRemark' || val === 'payRemark') {
          this.remarkVisible = true;
        }
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
  }
</style>
