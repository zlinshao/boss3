<template>
  <div id="personal" @click="show=false" @contextmenu="closeMenu">

    <div class="highRanking">
      <div class="tabsSearch">
        <el-form :inline="true" size="mini">
          <el-form-item>
            <el-input placeholder="请输入内容" v-model="form.selects" class="input-with-select">
              <el-select v-model="form.keyWords" slot="prepend" placeholder="请选择" clearable>
                <el-option label="收房" value="1"></el-option>
                <el-option label="租房" value="2"></el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
          </el-form-item>
          <el-form-item>
            <el-dropdown trigger="click" @command="leadingOut">
              <el-button type="primary" size="mini">
                导出<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="one">工资条</el-dropdown-item>
                <el-dropdown-item command="tow">详情</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="openFreeze">冻结工资</el-button>
          </el-form-item>
          <el-form-item v-if="multipleSelection.length > 0">
            <el-button type="primary" size="mini" @click="openBadge">标记</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="filter high_grade" :class="isHigh? 'highHide':''">
        <el-form :inline="true" :model="form" size="mini" label-width="100px">
          <div class="filterTitle">
            <i class="el-icons-fa-bars"></i>&nbsp;&nbsp;高级搜索
          </div>
          <el-row class="el_row_border">
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">日期</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <div class="block">
                      <el-date-picker
                        v-model="form.dates"
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
          <div class="btnOperate">
            <el-button size="mini" type="primary">搜索</el-button>
            <el-button size="mini" type="primary" @click="resetting">重置</el-button>
            <el-button size="mini" type="primary" @click="highGrade">取消</el-button>
          </div>
        </el-form>
      </div>
    </div>

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="个人工资" name="first">
       <pay-roll></pay-roll>
      </el-tab-pane>
      <el-tab-pane label="历史未结" name="second">

        <el-table
          :data="tableData"
          ref="multipleTable"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          @row-contextmenu="detailMenu"
          @row-dblclick="salaryDetail">
          <el-table-column
            v-if="batch"
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            label="收/租状态"
            prop="id">
          </el-table-column>
          <el-table-column
            label="房屋地址"
            prop="id">
          </el-table-column>
          <el-table-column
            label="合同"
            prop="describe">
            <template slot-scope="scope">
              <div :class="{'bgColor':scope.row.describe == '3213gg2'}">
                {{scope.row.describe}}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="资料"
            prop="module">
          </el-table-column>
          <el-table-column
            label="交接"
            prop="module">
          </el-table-column>
          <el-table-column
            label="客诉"
            prop="module">
          </el-table-column>
          <el-table-column
            label="尾款"
            prop="module">
          </el-table-column>
          <el-table-column
            label="开单人"
            prop="module">
          </el-table-column>
          <el-table-column
            label="负责人"
            prop="module">
          </el-table-column>
          <el-table-column
            label="所属部门"
            prop="module">
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="本月工资明细" name="third">
        <el-table
          :data="tableData"
          ref="multipleTable"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          @row-contextmenu="detailMenu"
          @row-dblclick="salaryDetail">
          <el-table-column
            v-if="batch"
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            label="收/租状态"
            prop="id">
          </el-table-column>
          <el-table-column
            label="月份"
            prop="id">
          </el-table-column>
          <el-table-column
            label="房屋地址"
            prop="id">
          </el-table-column>
          <el-table-column
            label="空置期奖励"
            prop="id">
          </el-table-column>
          <el-table-column
            label="价格差奖励"
            prop="id">
          </el-table-column>
          <el-table-column
            label="收房付款方式奖励"
            prop="id">
          </el-table-column>
          <el-table-column
            label="收房年限奖励"
            prop="id">
          </el-table-column>
          <el-table-column
            label="保修期奖励"
            prop="id">
          </el-table-column>
          <el-table-column
            label="业绩提成"
            prop="id">
          </el-table-column>
          <el-table-column
            label="合同"
            prop="describe">
          </el-table-column>
          <el-table-column
            label="资料"
            prop="module">
          </el-table-column>
          <el-table-column
            label="交接"
            prop="module">
          </el-table-column>
          <el-table-column
            label="客诉"
            prop="module">
          </el-table-column>
          <el-table-column
            label="尾款"
            prop="module">
          </el-table-column>
          <el-table-column
            label="未发比例"
            prop="module">
          </el-table-column>
          <el-table-column
            label="年限(涨价)扣款"
            prop="module">
          </el-table-column>
          <el-table-column
            label="空置期奖励"
            prop="module">
          </el-table-column>
          <el-table-column
            label="中介费"
            prop="module">
          </el-table-column>
          <el-table-column
            label="共计"
            prop="module">
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <!--右键-->
    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperate="clickEvent"></RightMenu>

    <!--备注-->
    <Remarks :module="remarkVisible" @close="closeRemark"></Remarks>

    <!--冻结-->
    <Freeze :module="freezeVisible" @close="closeFreeze"></Freeze>

    <!--标记-->
    <Badge :module="badgeVisible" @close="closeBadge"></Badge>
  </div>
</template>

<script>
  import RightMenu from '../../common/rightMenu.vue';    //右键
  import Remarks from '../../common/remarks.vue';
  import Freeze from './components/freeze.vue';
  import Badge from './components/badge.vue';
  import PayRoll from './payroll';   //工资条

  export default {
    name: "index",
    components: {RightMenu, Remarks, Freeze, Badge,PayRoll},
    data() {
      return {
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],

        activeName: 'first',
        isHigh: false,
        multipleSelection: [],    //全选
        batch: false,             //批量
        freezeVisible: false,
        badgeVisible: false,
        remarkVisible: false,
        values: [],
        form: {
          dates: '',
          selects: '',
          keywords: '',
          months: '',
        },
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
        tableData: [
          {
            id: 11111,
            describe: '3213gg2',
            module: '犯得上发生',
          }, {
            id: 21111,
            describe: '32132',
            module: '1Manger',
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
      // tabs标签页
      handleClick(tab, event) {
        console.log(tab, event);
      },      //checkbox
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // tabs切换
      onSubmit(val) {
        this.batch = false;
        this.multipleSelection = [];
        this.isActive = val;
        if (val === 0) {

        }
        if (val === 1) {
          this.values = ['收房', '租房'];
        }
        if (val === 2) {
          this.values = ['出租', '提前一个月续租'];
        }
      },
      // 导出
      leadingOut(val) {
        console.log(val);
      },
      // 冻结工资
      openFreeze() {
        this.freezeVisible = true;
      },
      closeFreeze() {
        this.openDelete();
      },
      // 标记
      openBadge() {
        this.badgeVisible = true;
      },
      closeBadge() {
        this.badgeVisible = false;
      },
      // 双击
      salaryDetail(row) {
        console.log(row)
      },
      // 右键 个人工资
      personalMenu(row, event) {
        this.lists = [
          {clickIndex: 'remark', headIcon: 'el-icon-edit', label: '备注',},
        ];
        this.contextMenuParam(event);
      },
      // 右键 历史未结/本月工资明细
      detailMenu(row, event) {
        this.lists = [
          {
            clickIndex: 'revise', tailIcon: 'el-icon-arrow-right', headIcon: 'el-icon-edit-outline', label: '未发标记',
            children: [
              {clickIndex: 'one', label: '单条',},
              {clickIndex: 'more', label: '批量',}
            ]
          },
          {clickIndex: 'remark', headIcon: 'el-icon-edit', label: '备注',},
        ];
        this.contextMenuParam(event);
      },
      // 右键回调
      clickEvent(val) {
        if (val === 'one') {
          this.openBadge();
        }
        if (val === 'more') {
          this.batch = true;
        }
        if (val === 'remark') {
          this.remarkVisible = true;
        }
      },
      // 关闭备注
      closeRemark() {
        this.remarkVisible = false;
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
        this.$confirm('您确定要冻结' + this.form.months + '的工资吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.freezeVisible = false;
          this.$message({
            type: 'success',
            message: '冻结成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消冻结',
          });
        });
      }
    },
  }
</script>

<style lang="scss">
  #personal {
    .bgColor {
      background: #DDDDDD;
    }
    .el-select .el-input {
      width: 88px;
    }
  }
</style>
