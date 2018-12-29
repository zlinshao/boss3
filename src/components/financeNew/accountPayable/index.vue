<template>
  <div id="accountPayable" @click="rightMenuShow = false">
    <!--高级-->
    <div class="highRanking">
      <div style="text-align: right;margin-bottom: 10px">
        <el-input style="width: 15%" v-model="params.search" @keyup.enter.native="getPayableList" size="mini" placeholder="请输入需求搜索的内容" clearable>
          <el-button slot="append" icon="el-icon-search" @click="getPayableList"></el-button>
        </el-input>

        <el-button size="mini" type="primary" @click="isHigh = !isHigh">高级</el-button>
        <el-button size="mini" type="primary" icon="el-icon-refresh" @click="getPayableList"></el-button>
        <el-button size="mini" type="success" icon="el-icon-plus" @click="plusPayVisible = true">新增应付</el-button>
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
                    <el-select v-model="params.status">
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
                  <div class="el_col_label">最小日期</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-date-picker
                      v-model="params.date_min"
                      type="date"
                      value-format="yyyy-MM-dd"
                      placeholder="选择日期">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">最大日期</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-date-picker
                      v-model="params.date_max"
                      type="date"
                      value-format="yyyy-MM-dd"
                      placeholder="选择日期">
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
      >
        <el-table-column label="付款时间" prop="pay_date"></el-table-column>
        <el-table-column label="客户姓名" prop="info.customer"></el-table-column>
        <el-table-column label="地址" prop="addr"></el-table-column>
        <el-table-column label="支出科目" prop="subject"></el-table-column>
        <el-table-column label="应付金额" prop="balance"></el-table-column>
        <el-table-column label="实付金额" prop="amount_paid"></el-table-column>
        <el-table-column label="剩余款项" prop="amount_payable"></el-table-column>
        <el-table-column label="补齐时间" prop="complete_date"></el-table-column>
        <el-table-column label="状态" prop="status">
          <template slot-scope="scope">
            <el-button v-if="scope.row.status === 1" type="danger" size="mini">待入账</el-button>
            <el-button v-if="scope.row.status === 2" type="warning" size="mini">待结清</el-button>
            <el-button v-if="scope.row.status === 3" type="success" size="mini">已结清</el-button>
            <el-button v-if="scope.row.status === 4" type="primary" size="mini">已超额</el-button>
          </template>
        </el-table-column>
        <el-table-column label="手机号" prop="customer_account_num"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="LookPayableDetail(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :total="payableCount"
        layout="total,prev,pager,next"
        :current-page="params.page"
        :page-size="params.limit"
        @current-change="handlePageChange"
        style="text-align: right"
      ></el-pagination>
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

        assistParams: {
          subject_name:'',
          depart_name: '',
          staff_name: '',
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

      }
    },
    mounted() {
      this.getPayableList();
    },
    methods: {
      //修改弹出确认框
      handleConfirmDialog(id,title,placeholder,val,reg = null,regMsg,callback) {
        this.$prompt(title, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: reg,
          inputValue: val,
          inputErrorMessage: regMsg
        }).then(({ value }) => {
          callback(id,value);
        }).catch(() => { });
      },
      //右击菜单
      handleRowRightClick(row,event) {
        this.rightList = [
          {clickIndex: 'editPayMoney',icon: 'el-icon-edit',label: '修改应付金额',data: row}
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
        if (val.clickIndex === 'editPayMoney') {
          var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
          var money = parseFloat(val.data.balance);
          this.handleConfirmDialog(val.data.id,'修改应付金额','请输入', money , reg ,'请输入应付金额',this.handleChangePayMoney);
        }
      },
      //修改应付金额
      handleChangePayMoney(id,amount_payable) {
        this.$http.put(this.url + `account/payable/edit/${id}`,{amount_payable}).then(res => {
          this.handleCallback(res);
        }).catch(err => {
          console.log(err);
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
        this.assistParams.subject_name = val.name;
        this.params.subject_id = parseInt(val.id);
      },

      //高级
      resetting() {},
      highGrade() {
        this.isHigh = false;
      },

      //查看详情
      LookPayableDetail(row) {
        console.log(row)
      },

      //列表数据
      getPayableList() {
        this.payLoading = true;
        this.isHigh = false;
        this.$http.get(this.url + 'account/payable/index', {params: this.params}).then(res => {
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
  }
</style>
