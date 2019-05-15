<template>
  <div @click="show=false" @contextmenu="closeMenu">
    <div class="highRanking">
      <div class="highSearch">
        <el-form :model="form" :inline="true" size="mini">
          <el-form-item>
            <el-input placeholder="请输入内容" v-model="form.keyWords" size="mini" clearable>
              <el-button slot="append" icon="el-icon-search"></el-button>
              <!--<el-button slot="append" icon="el-icons-fa-bars"></el-button>-->
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="openAddAccount">
              <i class="el-icon-plus"></i>&nbsp;新增账户
            </el-button>
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
                  <div class="el_col_label">支付方式</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-select v-model="form.payWay" clearable>
                    <el-option label="请选择" value=""></el-option>
                    <el-option label="银行卡" value="1"></el-option>
                    <el-option label="支付宝" value="2"></el-option>
                    <el-option label="微信" value="3"></el-option>
                    <el-option label="现金" value="4"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <div class="btnOperate">
            <el-button size="mini" type="primary">搜索</el-button>
            <el-button size="mini" type="primary" @click="resetting">重置</el-button>
            <el-button size="mini" type="primary" @click="highGrade">取消</el-button>
          </div>
        </el-form>
      </div>
    </div>

    <el-table
      :data="tableData"
      width="100%"
      @row-contextmenu="houseMenu">
      <el-table-column
        label="账户名称"
        prop="name">
      </el-table-column>
      <el-table-column
        label="账户类型"
        prop="accountType">
      </el-table-column>
      <el-table-column
        label="账号"
        prop="account">
      </el-table-column>
      <el-table-column
        label="开户银行"
        prop="openAccount">
      </el-table-column>
      <el-table-column
        label="支行"
        prop="subbranch">
      </el-table-column>
      <el-table-column
        label="初始金额"
        prop="initialMoney">
      </el-table-column>
      <el-table-column
        label="当前金额"
        prop="nowMoney">
      </el-table-column>
      <el-table-column
        label="备注"
        prop="remark">
      </el-table-column>
    </el-table>

    <div class="block pages">
      <el-pagination
        @siz-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[20, 100, 200, 300, 400]"
        :page-size="20"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </div>

    <!--充值-->
    <el-dialog :close-on-click-modal="false" title="充值金额" :visible.sync="rechargeVisible" width="30%">
      <el-form :model="rechargeForm" size="mini" label-width="80px">
        <el-form-item label="充值金额">
          <el-input v-model="rechargeForm.money" placeholder="请输入金额"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="rechargeVisible = false">取&nbsp;消</el-button>
        <el-button size="small" type="primary" @click="closeRecharge">确&nbsp;定</el-button>
      </div>
    </el-dialog>

    <!--右键-->
    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperate="clickEvent"></RightMenu>

    <AccountModule :FormVisible="addModule" @close="closeAddAccount"></AccountModule>

    <RechargeHistory :FormVisible="historyModule" @close="closeHistory"></RechargeHistory>
  </div>
</template>

<script>
  import RightMenu from '../../../common/rightMenu.vue'    //右键
  import AccountModule from './accountModule'
  import RechargeHistory from './rechargeHistory'

  export default {
    name: "account",
    components: {RightMenu, AccountModule, RechargeHistory},
    data() {
      return {
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],

        isHigh: false,
        rechargeVisible: false,     //充值
        rechargeForm: {
          money: '',
        },
        historyModule: false,
        addModule: false,
        currentPage: 1,
        form: {
          payWay: '',
          keyWords: '',
        },
        tableData: [
          {
            name: '招商银行-（姜千）',
            accountType: '银行卡',
            account: '6214832505670948',
            openAccount: '招商银行',
            subbranch: '仙林支行',
            initialMoney: '100000.00',
            nowMoney: '100000.00',
            remark: '发货的是开发哈萨克饭卡'
          },
        ],
      }
    },
    mounted() {
    },
    watch: {},
    methods: {
      // 重置
      resetting() {
        this.form.keywords = '';
      },
      // 高级筛选
      highGrade() {
        this.isHigh = !this.isHigh;
      },
      // 新增修改账户
      openAddAccount() {
        this.addModule = true;
      },
      closeAddAccount() {
        this.addModule = false;
      },
      // 分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      // 充值归零记录
      openHistory() {
        this.historyModule = true;
      },
      closeHistory() {
        this.historyModule = false;
      },
      // 充值
      openRecharge() {
        this.rechargeVisible = true;
      },
      closeRecharge() {
        this.rechargeVisible = false;
      },
      // 右键
      houseMenu(row, event) {
        this.lists = [
          {clickIndex: 'revise', headIcon: 'el-icon-edit-outline', label: '编辑',},
          {clickIndex: 'delete', headIcon: 'el-icon-circle-close-outline', label: '删除',},
          {clickIndex: 'refresh', headIcon: 'el-icon-refresh', label: '归零',},
          {clickIndex: 'recharge', headIcon: 'el-icons-fa-credit-card', label: '充值',},
          {clickIndex: 'history', headIcon: 'el-icon-document', label: '充值归零记录',},
        ];
        this.contextParams();
      },
      // 右键回调
      clickEvent(val) {
        if (val === 'delete') {
          this.openDelete();
        }
        if (val === 'revise') {
          this.openAddAccount();
        }
        if (val === 'refresh') {
          this.makeZero();
        }
        if (val === 'recharge') {
          this.openRecharge();
        }
        if (val === 'history') {
          this.openHistory();
        }
      },
      //关闭右键菜单
      closeMenu() {
        this.show = false;
      },
      //右键参数
      contextParams() {
        let e = event || window.event;let event = window.event;
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
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      // 归零
      makeZero() {
        this.$confirm('此操作将数额归零, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '归零成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消归零'
          });
        });
      },
    },
  }
</script>

<style scoped lang="scss">
  .block.pages {
    display: flex;
    display: -webkit-flex;
    justify-content: flex-end;
    margin: 20px 0 10px;
  }
</style>
