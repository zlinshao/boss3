<template>
    <div id="accountManage" @click="show = false" @contextmenu="closeMenu">
      <!--高级搜索内容-->
      <div class="highRanking">
        <div class="filter high_grade" :class="isHigh? 'highHide':''">
          <el-form :inline="true" onsubmit="return false" :model="params" size="mini" label-width="100px">
            <div class="filterTitle">
              <i class="el-icons-fa-bars"></i>&nbsp;&nbsp;高级搜索
            </div>
            <el-row class="el_row_border">
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">账户类型</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-select v-model="params.cate" size="mini" style="width: 35%">
                      <el-option v-for="(cate,key) in cateList" :label="cate" :value="key" :key="key"></el-option>
                    </el-select>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">账户账号</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-input size="mini" placeholder="请输入账户账号" v-model="params.account_num" style="width: 35%"></el-input>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">开户人</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-input size="mini" placeholder="请输入开户人" v-model="params.account_owner" style="width: 35%"></el-input>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <div class="btnOperate">
              <el-button size="mini" type="primary" @click="getAccountList">搜索</el-button>
              <el-button size="mini" type="primary" @click="resetting">重置</el-button>
              <el-button size="mini" type="primary" @click="isHigh = false">取消</el-button>
            </div>
          </el-form>
        </div>
      </div>
      <div style="text-align: right;">
        <el-input type="text" placeholder="账户名称/开户银行" clearable size="mini" style="width: 15%" v-model="params.search" @keyup.enter.native="handleGoSearch">
          <template slot="append">
            <i class="el-icon-search" @click="handleGoSearch" style="cursor: pointer;"></i>
          </template>
        </el-input>
        <el-button type="primary" size="mini" @click="isHigh = !isHigh">高级</el-button>
        <el-button type="success" size="mini" @click="addAccountVisible = true" icon="el-icon-plus">新增账户</el-button>
      </div>
      <div style="margin-top: 10px;">
        <el-table
          :data="accountList"
          :empty-text="accountEmpty"
          v-loading="accountLoading"
          element-loading-text="拼命加载中..."
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(255, 255, 255, 0)"
          @row-contextmenu="openRightMenu"
          @row-dblclick="openDetail"
        >
          <el-table-column label="账户名称" prop="name"></el-table-column>
          <el-table-column label="账户类型" prop="cate">
            <template slot-scope="scope">
              <span>{{ cateList && scope.row.cate && cateList[scope.row.cate] || '/'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="开户人" prop="account_owner"></el-table-column>
          <el-table-column label="账号" prop="account_num"></el-table-column>
          <el-table-column label="开户银行" prop="display_name"></el-table-column>
          <el-table-column label="支行" prop="sub_bank"></el-table-column>
          <el-table-column label="初始金额" prop="amount_base"></el-table-column>
          <el-table-column label="当前余额" prop="amount_remain"></el-table-column>
          <el-table-column label="创建时间" prop="create_time"></el-table-column>
          <el-table-column label="更新时间" prop="update_time"></el-table-column>
          <el-table-column label="备注" prop="remark"></el-table-column>
        </el-table>
        <el-pagination
          :total="accountTotal"
          :page-size="params.limit"
          :current-page="params.page"
          @current-change="handlePageChange"
          layout="total,prev,pager,next"
          style="text-align: right;"
        ></el-pagination>
      </div>

      <!--新增/修改账户-->
      <div>
        <el-dialog
          :visible.sync="addAccountVisible"
          :title="addCtrl ? '新增账户' : '修改信息'"
          width="30%"
        >
          <div style="text-align: center;">
            <el-form :model="addForm" :rules="addRules" ref="addForm" label-width="15%" label-position="right" status-icon>
              <el-form-item label="账户名称" prop="name">
                <el-input size="small" v-model="addForm.name" style="width: 70%" placeholder="请输入账户名称"></el-input>
              </el-form-item>
              <el-form-item label="开户人" prop="account_owner">
                <el-input size="small" v-model="addForm.account_owner" style="width: 70%" placeholder="请输入开户人"></el-input>
              </el-form-item>
              <el-form-item label="账户类型" prop="cate">
                <el-select size="small" v-model="addForm.cate" style="width: 70%">
                  <el-option v-for="(type,key) in cateList" :value="key" :label="type" :key="key"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="账号" prop="account_num">
                <el-input size="small" v-model="addForm.account_num" style="width: 70%" placeholder="请输入账号"></el-input>
              </el-form-item>
              <el-form-item label="开户银行" prop="bank" v-if="cateList && !(cateList[addForm.cate] === '微信' || cateList[addForm.cate] === '支付宝')">
                <el-select size="small" v-model="addForm.bank" style="width: 70%">
                  <el-option v-for="(bank,key) in banks" :value="key" :key="key" :label="bank"></el-option>
                </el-select >
              </el-form-item>
              <el-form-item label="支行" prop="sub_bank" v-if="cateList && !(cateList[addForm.cate] === '微信' || cateList[addForm.cate] === '支付宝')">
                <el-input size="small" v-model="addForm.sub_bank" style="width: 70%" placeholder="请输入支行"></el-input>
              </el-form-item>
              <el-form-item label="初始金额" prop="amount_base">
                <el-input :disabled="!addCtrl" size="small" v-model="addForm.amount_base" style="width: 70%" placeholder="请输入初始金额"></el-input>
              </el-form-item>
              <el-form-item label="备注信息" prop="remark">
                <el-input size="small" type="textarea" :row="4" v-model="addForm.remark" style="width: 70%" placeholder="请输入备注信息"></el-input>
              </el-form-item>
              <div style="text-align: right;">
                <el-button size="mini" @click="handleCancelAdd">取消</el-button>
                <el-button size="mini" type="primary" @click="handleFormAdd('addForm')">确定</el-button>
              </div>
            </el-form>
          </div>
        </el-dialog>
      </div>
      <!--右击-->
      <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
                 @clickOperateMore="clickEvent"></RightMenu>
      <!--详情-->
      <el-dialog
        :visible.sync="infoDetailVisible"
        title="账户详情"
      >
        <div>
          <el-row :gutter="20" style="margin-bottom: 30px;">
            <el-col :span="8">
              <span class="detail_title">账户名称</span>
              <span class="detail_option">{{ detailRow.name || '/' }}</span>
            </el-col>
            <el-col :span="8">
              <span class="detail_title">账户类型</span>
              <span class="detail_option">{{ cateList && cateList[detailRow.cate] || '/' }}</span>
            </el-col>
            <el-col :span="8">
              <span class="detail_title">开户人</span>
              <span class="detail_option">{{ detailRow.account_owner || '/' }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin-bottom: 30px;">
            <el-col :span="8">
              <span class="detail_title">账户账号</span>
              <span class="detail_option">{{ detailRow.account_num || '/' }}</span>
            </el-col>
            <el-col :span="8">
              <span class="detail_title">开户银行</span>
              <span class="detail_option">{{ detailRow.display_name || '/' }}</span>
            </el-col>
            <el-col :span="8">
              <span class="detail_title">支行</span>
              <span class="detail_option">{{ detailRow.sub_bank || '/' }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin-bottom: 30px;">
            <el-col :span="8">
              <span class="detail_title">初始金额</span>
              <span class="detail_option">{{ detailRow.amount_base || '/' }}</span>
            </el-col>
            <el-col :span="8">
              <span class="detail_title">当前余额</span>
              <span class="detail_option">{{ detailRow.amount_remain || '/' }}</span>
            </el-col>
            <el-col :span="8">
              <span class="detail_title">创建时间</span>
              <span class="detail_option">{{ detailRow.create_time || '/' }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin-bottom: 30px;">
            <el-col :span="8">
              <span class="detail_title">更新时间</span>
              <span class="detail_option">{{ detailRow.update_time || '/' }}</span>
            </el-col>
            <el-col :span="8">
              <span class="detail_title">最后充值时间</span>
              <span class="detail_option">{{ detailRow.last_recharge_date || '/' }}</span>
            </el-col>
            <el-col :span="8">
              <span class="detail_title">备注</span>
              <span class="detail_option">{{ detailRow.remark || '/' }}</span>
            </el-col>
          </el-row>
        </div>
      </el-dialog>

      <!--流水详情-->
      <el-dialog
        :visible.sync="useDetailVisible"
        title="账户收支流水详情"
        width="80%"
      >
        <div>
          <el-table
            :data="useDetailData"
          >
            <el-table-column label="账户名" prop="name" min-width="120px"></el-table-column>
            <el-table-column label="开户人" prop="account_owner"></el-table-column>
            <el-table-column label="账户类型" prop="cate"></el-table-column>
            <el-table-column label="应付款项" prop="amount_payable"></el-table-column>
            <el-table-column label="应付入账" prop="amount_paid"></el-table-column>
            <el-table-column label="应收款项" prop="amount_receivable"></el-table-column>
            <el-table-column label="应收入账" prop="amount_received"></el-table-column>
            <el-table-column label="账户余额" prop="balance"></el-table-column>
            <el-table-column label="操作人姓名" prop="operator_id.name"></el-table-column>
            <el-table-column label="创建时间" prop="create_time" min-width="120px"></el-table-column>
            <el-table-column label="更新时间" prop="update_time" min-width="120px"></el-table-column>
            <el-table-column label="操作时间" prop="operate_time" min-width="120px"></el-table-column>
          </el-table>
          <el-pagination
            :total="userDetailCount"
            :current-page="useDetailPage"
            :page-size="useDetailLimit"
            layout="total,prev,pager,next"
            @current-change="useDetailPageChange"
            style="text-align: right"
          ></el-pagination>
        </div>
      </el-dialog>

      <!--变更记录-->
      <el-dialog
        :visible.sync="accountChangeVisible"
        title="账户变更记录"
      >
        <div>
          <div v-if="accountChangeList.length > 0">
            <el-row :gutter="20" v-for="(change,key) in accountChangeList" :key="key" style="margin-bottom: 20px;">
            <el-col :span="5">
              <span class="desc_content">{{ change.create_time || '/'}}</span>
            </el-col>
            <el-col :span="19">
              <span class="desc_content" style="text-align: left;padding-left: 5px">
                <span v-if="change.operator_id && change.operator_id.name">
                  【{{ change.operator_id.name }}】
                </span>
                <span v-if="change.desc && change.desc.desc">
                  {{ change.desc.desc }}
                </span>
                <span v-if="change.desc && change.desc.desc && change.desc.param && change.desc.param.account_num">
                  【账户：{{ change.desc.param.account_num}}】
                </span>
                <span v-if="change.desc && change.desc.desc && change.desc.param && change.desc.param.amount_base">
                  【初始金额：{{ change.desc.param.amount_base }}】
                </span>
                <span v-if="change.desc && change.desc.desc && change.desc.param && change.desc.param.name">
                  【开户人：{{ change.desc.param.name }}】
                </span>
                <span v-if="change.desc && change.desc.desc && change.desc.param && change.desc.param.cate && cateList">
                  【账户类型：{{ cateList[change.desc.param.cate]}}】
                </span>
                <span v-if="change.desc && change.desc.desc && change.desc.param && change.desc.param.bank && banks">
                  【开户银行：{{ banks[change.desc.param.bank]}}】
                </span>
                <span v-if="change.desc && change.desc.desc && change.desc.param && change.desc.param.remark">
                  【备注：{{ change.desc.param.remark }}】
                </span>
              </span>
            </el-col>
          </el-row>
          </div>
          <div v-else style="text-align: center">
            暂无记录
          </div>
          <el-pagination
            :total="accountChangeCount"
            :page-size="accountChangeLimit"
            :current-page="accountChangePage"
            layout="total,prev,pager,next"
            @current-change="handleAccountChange"
            style="text-align: right;"
          ></el-pagination>
        </div>
      </el-dialog>
    </div>
</template>

<script>
  import RightMenu from '../../common/rightMenu';
    export default {
      name: "index",
      components: { RightMenu },
      data() {
        return {
          url: globalConfig.finance_server,
          accountList: [],
          cateList: {},
          accountTotal: 0,
          accountEmpty: '',
          accountLoading: false,
          params: {
            page: 1,
            limit: 10,
            search: '',
            cate: '',
            account_owner: '',
            account_num: '',
          },
          isHigh: false,
          addAccountVisible: false,
          addForm: {
            name: '',
            cate: '',
            account_num: '',
            bank: '',
            sub_bank: '',
            amount_base: '',
            remark: '',
            account_owner: ''
          },
          addRules: {
            name: [
              { required: true, message: '请输入账户名称', trigger: 'blur' },
              { min: 2, max: 22, message: '长度在 2 到 22 个字符', trigger: 'blur' }
            ],
            account_owner: [
              { required: true, message: '请输入开户人', trigger: 'blur' },
              { min: 2, max: 22, message: '长度在 2 到 22 个字符', trigger: 'blur' }
            ],
            cate: [
              { required: true, message: '请选择账户类型', trigger: 'blur' },
            ],
            account_num: [
              { required: true, message: '请输入账号', trigger: 'blur' },
            ],
            bank: [
              { required: true, message: '请选择开户银行', trigger: 'blur' },
            ],
            sub_bank: [
              { required: false, message: '请输入支行名称', trigger: 'blur' },
              { min: 3, max: 22, message: '长度在 3 到 22 个字符', trigger: 'blur' }
            ],
            amount_base: [
              { required: true, message: '请输入初始金额', trigger: 'blur' },
            ]
          },
          bank_code: '',
          banks: {},
          rightMenuX: 0,
          rightMenuY: 0,
          lists: [],
          show: false,
          currentRow: '',
          addCtrl: true,
          infoDetailVisible: false,
          detailRow: {},
          useDetailVisible: false,
          useDetailData: [],
          useDetailPage: 1,
          useDetailLimit: 12,
          userDetailCount: 0,
          accountChangeList: [],
          accountChangeCount: 0,
          accountChangeVisible: false,
          accountChangePage: 1,
          accountChangeLimit: 10
        }
      },
      mounted() {
        this.getAccountList();
        this.getBankList();
      },
      computed: {

      },
      methods: {
        handleGoSearch() {
          this.params.page = 1;
          this.getAccountList();
        },
        handleAccountChange(page) {
          this.accountChangePage = page;
          this.getAccountChange();
        },
        useDetailPageChange(page) {
          this.useDetailPage = page;
          this.getAccountUseDetail();
        },
        //查看详情
        openDetail(row) {
          this.detailRow = row;
          this.infoDetailVisible = true;
        },
        //关闭右菜单
        closeMenu() {
          this.show = false;
        },
        //右击
        openRightMenu(row,event) {
          this.lists = [
            {clickIndex: 'EditInfo', headIcon: 'el-icon-edit', label: '修改', data: row},
            {clickIndex: 'DelAccount', headIcon: 'el-icon-close', label: '删除', data: row},
            {clickIndex: 'RecAccount', headIcon: 'el-icon-edit-outline', label: '充值', data: row},
            {clickIndex: 'ZeroAccount', headIcon: 'el-icon-refresh', label: '归零', data: row},
            {clickIndex: 'UseDetailAccount', headIcon: 'el-icon-view', label: '账户收支流水详情', data: row},
            {clickIndex: 'AccountChange', headIcon: 'el-icon-search', label: '账户变更记录', data: row},
          ];
          this.contextParams(event);
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
        clickEvent(index) {
          this.currentRow = index.data;
          if (index.clickIndex === 'EditInfo') {
            this.addCtrl = false;
            this.addAccountVisible = true;
            this.addForm.name = index.data.name;
            this.addForm.account_owner = index.data.account_owner;
            this.addForm.cate = index.data.cate.toString();
            this.addForm.account_num = index.data.account_num;
            this.addForm.bank = index.data.bank === 0 ? '' : index.data.bank.toString();
            this.addForm.sub_bank = index.data.sub_bank;
            this.addForm.amount_base = index.data.amount_base;
            this.addForm.remark = index.data.remark;
          } else if (index.clickIndex === 'DelAccount') {
            this.handleDelAccount();
          } else if (index.clickIndex === 'RecAccount') {
            this.handleRechargeAccount();
          } else if (index.clickIndex === 'ZeroAccount') {
            this.handleZeroAccount();
          } else if (index.clickIndex === 'UseDetailAccount') {
            this.getAccountUseDetail();
          } else if (index.clickIndex === 'AccountChange') {
            this.getAccountChange();
          }
        },
        getAccountChange() {
          this.$http.get(this.url + `account/manage/changeLog/${this.currentRow.id}`,{
            params: {
              page: this.accountChangePage,
              limit: this.accountChangeLimit
            }
          }).then(res => {
            if (res.data.success) {
              console.log(res.data.data);
              this.accountChangeList = res.data.data.data;
              this.accountChangeCount = res.data.data.count;
              this.accountChangeVisible = true;
            } else {
              this.$notify.warning({
                title: '警告',
                message: res.data.message
              });
            }
          }).catch(err => {
            console.log(err);
          })
        },
        getAccountUseDetail() {
          this.$http.get(this.url + `account/manage/runningAccount/${this.currentRow.id}`,{
            params: {
              page: this.useDetailPage,
              limit: this.useDetailLimit
            }
          }).then(res => {
            if (res.data.success) {
              this.useDetailData = res.data.data.data;
              this.userDetailCount = res.data.data.count;
              this.useDetailVisible = true;
            }
          }).catch(err => {
            console.log(err);
          })
        },
        handleZeroAccount() {
          this.$confirm('您确定归零该账户吗？','提示',{
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http.post(this.url + `account/manage/zero/${this.currentRow.id}`).then(res => {
              if (res.data.success) {
                this.$notify.success({
                  title: '成功',
                  message: res.data.message
                });
                this.getAccountList();
              }  else {
                this.$notify.warning({
                  title: '失败',
                  message: res.data.message
                })
              }
            }).catch(err => {
              console.log(err);
            })
          }).catch(() =>{ })
        },
        handleRechargeAccount() {
          this.$prompt('请输入充值金额','提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputPattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
            inputErrorMessage: '格式不正确'
          }).then(({value}) => {
            this.$http.post(this.url + `account/manage/recharge/${this.currentRow.id}`,{amount: value}).then(res => {
              if (res.data.success) {
                this.$notify.success({
                  title: '成功',
                  message: res.data.message
                });
                this.getAccountList();
              } else {
                this.$notify.warning({
                  title: '失败',
                  message: res.data.message
                })
              }
            })
          }).catch(() => { })
        },
        handleDelAccount() {
          this.$confirm('您确定删除该账户吗？','提示',{
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http.get(this.url + `account/manage/delete/${this.currentRow.id}`).then(res => {
              if (res.data.success) {
                this.$notify.success({
                  title: '成功',
                  message: res.data.message
                });
                this.getAccountList();
              }  else {
                this.$notify.warning({
                  title: '失败',
                  message: res.data.message
                })
              }
            }).catch(err => {
              console.log(err);
            })
          }).catch(() =>{ })
        },
        handleCancelAdd() {
          this.addAccountVisible = false;
          this.addCtrl = true;
          this.clearForm();
        },
        clearForm() {
          const keys = Object.keys(this.addForm);
          for (var i=0;i<keys.length;i++) {
            this.addForm[keys[i]] = "";
          }
        },
        handleAddAccount(params) {
          this.$http.post(this.url + 'account/manage/add',params).then(res => {
            if (res.data.success) {
              this.$notify.success({
                title: '成功',
                message: res.data.message
              });
              this.addAccountVisible = false;
              this.$refs['addForm'].resetFields();
              this.getAccountList();
            }else {
              this.$notify.warning({
                title: '警告',
                message: res.data.message
              });
              this.$refs['addForm'].resetFields();
              this.addAccountVisible = false;
            }
          }).catch(err => {
            console.log(err);
          });
        },
        handleEditAccount(params,formName) {
          this.$http.put(this.url + `account/manage/update/${this.currentRow.id}`,params).then(res => {
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
            this.$refs[formName].resetFields();
            this.addAccountVisible = false;
            this.addCtrl = true;
            this.clearForm();
            this.getAccountList();
          }).catch(err => {
            console.log(err);
          })
        },
        handleFormAdd(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              var params = {};
              params.name = this.addForm.name;
              params.account_owner = this.addForm.account_owner;
              params.remark = this.addForm.remark;
              params.sub_bank = this.addForm.sub_bank;
              params.cate = parseInt(this.addForm.cate);
              params.bank = parseInt(this.addForm.bank);
              params.account_num = this.addForm.account_num;
              params.amount_base = parseFloat(this.addForm.amount_base);
              if (this.addCtrl) {
                this.handleAddAccount(params);
              } else {
                this.handleEditAccount(params,formName);
              }
            }else {
              this.$message('error submit !!');
            }
          })
        },
        resetting() {
          this.params = {
              page: 1,
              limit: 10,
              search: '',
              cate: '',
              account_owner: '',
              account_num: '',
          }
        },
        handlePageChange(page) {
          this.params.page = page;
          this.getAccountList();
        },
        getAccountList() {
          this.accountLoading = true;
          this.accountEmpty = ' ';
          const session = JSON.parse(localStorage.getItem('personal')).session_id;
          this.$http.get(this.url + 'account/manage/index',{headers: {Session: session},params:this.params}).then(res => {
            if(res.data.success) {
              this.accountLoading = false;
              this.isHigh = false;
              this.accountEmpty = '';
              this.accountList = res.data.data.data;
              this.cateList = res.data.data.cateList;
              this.accountTotal = res.data.data.count;
            }else {
              this.isHigh = false;
              this.accountLoading = false;
              this.accountEmpty = '暂无数据';
              this.accountList = [];
              this.accountTotal = 0;
            }
          }).catch(err => {
            console.log(err);
          })
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
      }
    }
</script>

<style lang="scss">
  body{
    padding-right: 0 !important;
  }
  #accountManage{
    /*position: relative;*/
    .detail_title{
      display: inline-block;
      width: 30%;
      text-align: center;
    }
    .detail_option{
      display: inline-block;
      width: 60%;
      line-height: 30px;
      text-align: center;
      margin-left: 15px;
      border-radius: 4px;
      color: white;
      background-color: #aec1fc;
    }
    .desc_content{
      display: inline-block;
      width: 95%;
      color: white;
      /*height: 30px;*/
      line-height: 30px;
      border-radius: 4px;
      background-color: #a6b5ec;
      text-align: center;
    }
  }
</style>
