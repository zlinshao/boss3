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
        <el-input type="text" placeholder="账户名称/开户银行" clearable size="mini" style="width: 15%" v-model="params.search" @keyup.enter.native="getAccountList">
          <template slot="append">
            <i class="el-icon-search" @click="getAccountList" style="cursor: pointer;"></i>
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
        >
          <el-table-column label="账户名称" prop="name"></el-table-column>
          <el-table-column label="账户类型" prop="cate"></el-table-column>
          <el-table-column label="开户人" prop="account_owner"></el-table-column>
          <el-table-column label="账号" prop="account_num"></el-table-column>
          <el-table-column label="开户银行" prop="display_name"></el-table-column>
          <el-table-column label="支行" prop="sub_bank"></el-table-column>
          <el-table-column label="初始金额" prop="amount_base"></el-table-column>
          <el-table-column label="当前余额" prop="amount_remain"></el-table-column>
          <el-table-column label="创建时间" prop="create_time"></el-table-column>
          <el-table-column label="更新时间" prop="update_time"></el-table-column>
          <el-table-column label="备注" prop="remark"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="openEdit">修改</el-button>
            </template>
          </el-table-column>
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
              <el-form-item label="账户类型" prop="cate">
                <el-select size="small" v-model="addForm.cate" style="width: 70%">
                  <el-option v-for="(type,key) in cateList" :value="key" :label="type" :key="key"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="账号" prop="account_num">
                <el-input size="small" v-model="addForm.account_num" style="width: 70%" placeholder="请输入账号"></el-input>
              </el-form-item>
              <el-form-item label="开户银行" prop="bank">
                <el-select size="small" v-model="addForm.bank" style="width: 70%">
                  <el-option v-for="(bank,key) in banks" :value="key" :key="key" :label="bank"></el-option>
                </el-select >
              </el-form-item>
              <el-form-item label="支行" prop="sub_bank">
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
            remark: ''
          },
          addRules: {
            name: [
              { required: true, message: '请输入账户名称', trigger: 'blur' },
              { min: 3, max: 22, message: '长度在 3 到 22 个字符', trigger: 'blur' }
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
          addCtrl: true
        }
      },
      mounted() {
        this.getAccountList();
        this.getBankList();
      },
      computed: {

      },
      methods: {
        //关闭右菜单
        closeMenu() {
          this.show = false;
        },
        //右击
        openRightMenu(row,event) {
          this.lists = [
            {clickIndex: 'EditInfo', headIcon: 'iconfont icon-quanxian', label: '修改', data: row},
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
          console.log(index);
          if (index.clickIndex === 'EditInfo') {
            this.addCtrl = false;
            this.addAccountVisible = true;
            this.addForm.name = index.data.name;
            this.addForm.cate = index.data.cate;
            this.addForm.account_num = index.data.account_num;
            this.addForm.bank = this.banks && this.banks[index.data.bank];
            this.addForm.sub_bank = index.data.sub_bank;
            this.addForm.amount_base = index.data.amount_base;
            this.addForm.remark = index.data.remark;
          }
          this.currentRow = index.data;
        },
        openEdit() {},
        handleCancelAdd() {
          this.addAccountVisible = false;
          this.$refs['addForm'].resetFields();
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
        handleEditAccount(params) {
          console.log(params);
          return false;
          this.$http.put(this.url + `account/manage/update/${params.bank}`,params).then(res => {
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
            this.addAccountVisible = false;
            this.$refs['addForm'].resetFields();
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
              params.remark = this.addForm.remark;
              params.sub_bank = this.addForm.sub_bank;
              params.cate = this.addForm.cate;
              params.bank = this.addForm.bank;
              params.account_num = parseInt(this.addForm.account_num);
              params.amount_base = parseFloat(this.addForm.amount_base);
              if (this.addCtrl) {
                this.handleAddAccount(params);
              } else {
                this.handleEditAccount(params);
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
  }
</style>
