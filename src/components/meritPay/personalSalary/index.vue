<template>
  <div id="personal" @click="show=false" @contextmenu="closeMenu">
    <div class="topTabs">
      <el-form :inline="true" size="mini" style="margin: 10px 0">
        <el-button v-for="(key,index) in tabs" :class="{'btn': isActive === index}"
                   @click="onSubmit(index)" size="mini" :key="index">{{key}}
        </el-button>
      </el-form>
    </div>

    <div class="filter">
      <el-form :inline="true" :model="form" size="mini">
        <el-form-item v-if="isActive != 0">
          <el-select v-model="form.selects">
            <el-option v-for="(key,index) in values" :label="key" :value="index + 1" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="isActive == 0">
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
        <el-form-item>
          <el-input placeholder="请输入内容" v-model="form.selects" class="input-with-select">
            <el-select v-if="isActive == 0" v-model="form.keyWords" slot="prepend" placeholder="请选择" clearable>
              <el-option label="收房" value="1"></el-option>
              <el-option label="租房" value="2"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item v-if="isActive == 0">
          <el-dropdown @command="leadingOut">
            <el-button type="primary" size="mini">
              导出<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="one">工资条</el-dropdown-item>
              <el-dropdown-item command="tow">详情</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-form-item>
        <el-form-item v-if="isActive == 0">
          <el-button type="primary" size="mini" @click="openFreeze">冻结工资</el-button>
        </el-form-item>
        <el-form-item v-if="isActive != 0 && multipleSelection.length > 0">
          <el-button type="primary" size="mini" @click="openBadge">标记</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table
      v-show="isActive == 0"
      :data="tableData"
      width="100%"
      @row-contextmenu="personalMenu"
      @row-dblclick="salaryDetail">
      <el-table-column
        label="开单人"
        prop="id">
      </el-table-column>
      <el-table-column
        label="时间"
        prop="id">
      </el-table-column>
      <el-table-column
        label="底薪"
        prop="describe">
      </el-table-column>
      <el-table-column
        label="业绩提成"
        prop="module">
      </el-table-column>
      <el-table-column
        label="收房奖励"
        prop="module">
      </el-table-column>
      <el-table-column
        label="租房奖励"
        prop="module">
      </el-table-column>
      <el-table-column
        label="本月未发金额"
        prop="module">
      </el-table-column>
      <el-table-column
        label="认责"
        prop="module">
      </el-table-column>
      <el-table-column
        label="中介费"
        prop="module">
      </el-table-column>
      <el-table-column
        label="行政扣款"
        prop="module">
      </el-table-column>
      <el-table-column
        label="社保扣款"
        prop="module">
      </el-table-column>
      <el-table-column
        label="财务扣款"
        prop="module">
      </el-table-column>
      <el-table-column
        label="住宿扣款"
        prop="module">
      </el-table-column>
      <el-table-column
        label="购车扣款"
        prop="module">
      </el-table-column>
      <el-table-column
        label="其他扣款"
        prop="module">
      </el-table-column>
      <el-table-column
        label="套餐类型"
        prop="module">
      </el-table-column>
      <el-table-column
        label="应发工资"
        prop="module">
      </el-table-column>
      <el-table-column
        label="实发工资"
        prop="module">
      </el-table-column>
      <el-table-column
        label="工资状态"
        prop="module">
      </el-table-column>
    </el-table>

    <el-table
      v-show="isActive == 1"
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

    <el-table
      v-show="isActive == 2"
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
  import RightMenu from '../../common/contextMenu/rightMenu.vue'    //右键
  import Remarks from '../../common/remarks.vue'
  import Freeze from './components/freeze.vue'
  import Badge from './components/badge.vue'

  export default {
    name: "index",
    components: {RightMenu, Remarks, Freeze, Badge},
    data() {
      return {
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],

        multipleSelection: [],    //全选
        batch: false,             //批量
        freezeVisible: false,
        badgeVisible: false,
        remarkVisible: false,
        isActive: 0,
        tabs: ['个人工资', '历史未结', '本月工资明细'],
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
      //checkbox
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
          this.$message({
            type: 'success',
            message: '冻结成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消冻结'
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
