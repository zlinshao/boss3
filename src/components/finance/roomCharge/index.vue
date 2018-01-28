<template>
  <div @click="show=false" @contextmenu="closeMenu" id="roomCharge">
    <div class="filter">
      <el-form :inline="true" :model="form" size="mini" label-width="80px">
        <el-form-item>
          <el-select v-model="form.status" clearable size="mini">
            <el-option label="款项状态" value=""></el-option>
            <el-option v-for="(key,index) in values" :label="key" :value="index + 1" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="补齐时间">
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
          <el-input v-model="form.organize" @focus="openOrganize" placeholder="请选择部门/员工"
                    readonly>
            <template slot="append">
              <div style="cursor: pointer;" @click="close_">清空</div>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-autocomplete
            class="inline-input"
            v-model="state" clearable
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            :trigger-on-focus="false"
            @select="handleSelect">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-autocomplete>
        </el-form-item>

        <el-form-item>
          <el-button type="text" @click="filterModule = true">
            <i class="el-icon-plus"></i>&nbsp;高级筛选
          </el-button>
        </el-form-item>

        <!--刷新-->
        <el-form-item>
          <el-button type="primary"><i class="el-icon-refresh"></i></el-button>
        </el-form-item>

        <el-dropdown @command="leadingOut">
          <el-button type="primary" size="mini">
            导出<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="collect">应收</el-dropdown-item>
            <el-dropdown-item command="rent">应付</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <el-dropdown trigger="click" @command="newAdd">
          <el-button type="primary" size="mini">
            新增<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="collect">应收</el-dropdown-item>
            <el-dropdown-item command="rent">应付</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <el-dropdown trigger="click" @command="lookStatus">
          <el-button type="primary" size="mini">
            汇总<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="all">汇总</el-dropdown-item>
            <el-dropdown-item command="collect">应收</el-dropdown-item>
            <el-dropdown-item command="rent">应付</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-form>
    </div>
    <!--应收-->
    <div class="border_table" v-show="lookType === 'all' || lookType === 'collect'">
      <el-table
        :data="collectData"
        width="100%"
        @cell-dblclick="dblCollect"
        @row-contextmenu="collectMenu">
        <el-table-column
          label="收款时间"
          prop="date"
          width="90px">
        </el-table-column>
        <el-table-column
          label="客户姓名"
          prop="name">
        </el-table-column>
        <el-table-column
          label="手机号"
          prop="mobile"
          width="100px">
        </el-table-column>
        <el-table-column
          label="收入科目"
          prop="subject">
        </el-table-column>
        <el-table-column
          label="应收金额"
          prop="collectMoney">
        </el-table-column>
        <el-table-column
          label="实收金额"
          prop="receivedMoney">
        </el-table-column>
        <el-table-column
          label="剩余款项"
          prop="remainder">
        </el-table-column>
        <el-table-column
          label="补齐时间"
          prop="polishing"
          width="90px">
        </el-table-column>
        <el-table-column
          label="租房月数"
          prop="months">
        </el-table-column>
        <el-table-column
          label="付款方式"
          prop="payWay">
        </el-table-column>
        <el-table-column
          label="月单价"
          prop="unitPrice">
        </el-table-column>
        <el-table-column
          label="合同时间周期"
          prop="contractPeriod"
          width="100px">
        </el-table-column>
        <el-table-column
          label="状态"
          prop="status">
          <template slot-scope="scope">
            <el-button v-if="scope.row.status == 1" class="btn btn1" size="mini">待入账</el-button>
            <el-button v-if="scope.row.status == 2" class="btn btn2" size="mini">待结清</el-button>
            <el-button v-if="scope.row.status == 3" class="btn btn3" size="mini">已结清</el-button>
            <el-button v-if="scope.row.status == 4" class="btn btn4" size="mini">已超额</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="备注"
          prop="remark">
        </el-table-column>
        <el-table-column
          label="开单人"
          prop="staff_name">
        </el-table-column>
        <el-table-column
          label="部门"
          prop="department_name">
        </el-table-column>
      </el-table>

      <div class="block pages">
        <div>
        <span>
          应收金额(元)：<span style="color: #78cd51;">4630988.50</span>
        </span>&nbsp;&nbsp;&nbsp;&nbsp;
          <span>
          实收金额(元)：<span style="color: #f66;">129773.64</span>
        </span>&nbsp;&nbsp;&nbsp;&nbsp;
          <span>
          剩余款项(元)：<span style="color: #ff9a02;">4501414.86</span>
        </span>&nbsp;&nbsp;&nbsp;&nbsp;
          <span>
          今日到期：1
        </span>
        </div>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[pageNumber]"
          :page-size="pageNumber"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
        </el-pagination>
      </div>
    </div>

    <!--应付-->
    <div class="border_table greenTable" v-show="lookType === 'all' || lookType === 'rent'">
      <el-table
        :data="payData"
        width="100%"
        @row-contextmenu="payMenu">
        <el-table-column
          label="付款时间"
          prop="date"
          width="90px">
        </el-table-column>
        <el-table-column
          label="客户姓名"
          prop="name">
        </el-table-column>
        <el-table-column
          label="手机号"
          prop="mobile"
          width="100px">
        </el-table-column>
        <el-table-column
          label="支出科目"
          prop="subject">
        </el-table-column>
        <el-table-column
          label="应付金额"
          prop="payMoney">
        </el-table-column>
        <el-table-column
          label="实付金额"
          prop="payableMoney">
        </el-table-column>
        <el-table-column
          label="剩余款项"
          prop="remainder">
        </el-table-column>
        <el-table-column
          label="补齐时间"
          prop="polishing"
          width="90px">
        </el-table-column>
        <el-table-column
          label="收房月数"
          prop="months">
        </el-table-column>
        <el-table-column
          label="付款方式"
          prop="payWay">
        </el-table-column>
        <el-table-column
          label="月单价"
          prop="unitPrice">
        </el-table-column>
        <el-table-column
          label="第一次付款时间"
          prop="firstDate">
        </el-table-column>
        <el-table-column
          label="第二次付款时间"
          prop="secondDate">
        </el-table-column>
        <el-table-column
          label="合同时间周期"
          prop="contractPeriod"
          width="90px">
        </el-table-column>
        <el-table-column
          label="状态"
          prop="status">
          <template slot-scope="scope">
            <el-button v-if="scope.row.status == 1" class="btn btn1" size="mini">待入账</el-button>
            <el-button v-if="scope.row.status == 2" class="btn btn2" size="mini">待结清</el-button>
            <el-button v-if="scope.row.status == 3" class="btn btn3" size="mini">已结清</el-button>
            <el-button v-if="scope.row.status == 4" class="btn btn4" size="mini">已超额</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="备注"
          prop="remark">
        </el-table-column>
        <el-table-column
          label="开单人"
          prop="staff_name">
        </el-table-column>
        <el-table-column
          label="部门"
          prop="department_name">
        </el-table-column>
      </el-table>

      <div class="block pages">
        <div>
        <span>
          应付金额(元)：<span style="color: #78cd51;">16038533.20</span>
        </span>&nbsp;&nbsp;&nbsp;&nbsp;
          <span>
          实付金额(元)：<span style="color: #f66;">14615.62</span>
        </span>&nbsp;&nbsp;&nbsp;&nbsp;
          <span>
          剩余款项(元)：<span style="color: #ff9a02;">16034710.58</span>
        </span>&nbsp;&nbsp;&nbsp;&nbsp;
          <span>
          今日到期：1
        </span>
        </div>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[pageNumber]"
          :page-size="pageNumber"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
        </el-pagination>
      </div>
    </div>

    <!--右键-->
    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperate="clickEvent"></RightMenu>

    <!--组织架构-->
    <organization :organizationDialog="organizeVisible" @close="closeOrganize"></organization>

    <!--高级筛选-->
    <FilterModule :module="filterModule" @close="closeFilter"></FilterModule>

    <!--新增-->
    <ChargeModule :module="chargeVisible" @close="closeCharge" :title="titles"></ChargeModule>

    <!--编辑付款/收款时间-->
    <ReviseTime :module="payTimeVisible" :date="payTimes" @close="closePayTime" :title="titles"></ReviseTime>

    <!--编辑补齐时间-->
    <PolishTime :module="polishTimeVisible" :date="polishTime" @close="closePolishTime"></PolishTime>
  </div>
</template>

<script>
  import organization from '../../common/organization.vue'
  import RightMenu from '../../common/contextMenu/rightMenu.vue'    //右键
  import FilterModule from './components/advancedFilter'
  import ChargeModule from './components/chargeModule'
  import ReviseTime from './components/reviseTime'
  import PolishTime from './components/polishTime'

  export default {
    name: "index",
    components: {organization, RightMenu, FilterModule, ChargeModule, ReviseTime, PolishTime},
    data() {
      return {
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],

        lookType: 'all',
        pageNumber: 5,

        payTimes: [],
        polishTime: '',
        titles: '',
        currentPage: 1,
        payTimeVisible: false,
        polishTimeVisible: false,
        chargeVisible: false,
        filterModule: false,
        organizeVisible: false,
        values: ['待入账', '待结清', '已结清', '已超额',],
        form: {
          status: '',
          organize: '',
          dates: '',
          subject: '',
          keywords: '',
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
        collectData: [
          {
            date: '1990-01-01',
            name: '废话肯定是1-1-1-11-1',
            mobile: '15251830468',
            subject: '押金',
            collectMoney: '11111',
            receivedMoney: '22222',
            remainder: '44555',
            polishing: '2018-01-01',
            months: '12',
            payWay: '第1期押1付12 1200',
            unitPrice: '22222',
            contractPeriod: '2017-03-15~2022-03-15',
            staff_name: '范德萨发',
            department_name: '乐伽商业管理有限公司',
            status: 1,
            details: '刘梦/2017-03-15~2022-03-15/第1年月付3100,第2年月付3100,第3年月付3300,第4年月付3400,第5年月付3500/顾庆伟',
            remark: '放大开始JFK撒粉卡',
          },
        ],
        payData: [
          {
            date: '1990-01-01',
            name: '废话肯定是1-1-1-11-1',
            mobile: '15251830468',
            subject: '押金',
            payMoney: '11111',
            payableMoney: '22222',
            remainder: '44555',
            polishing: '2018-01-01',
            months: '12',
            payWay: '月付',
            unitPrice: '22222',
            firstDate: '1990-01-01',
            secondDate: '1990-01-01',
            contractPeriod: '2017-03-15~2022-03-15',
            staff_name: '范德萨发',
            department_name: '乐伽商业管理有限公司',
            status: 2,
            details: '刘梦/2017-03-15~2022-03-15/第1年月付3100,第2年月付3100,第3年月付3300,第4年月付3400,第5年月付3500/顾庆伟',
            remark: '放大开始JFK撒粉卡',
          },
        ],

        restaurants: [],
        state: ''
      }
    },
    mounted() {
      this.restaurants = this.loadAll();
    },
    watch: {},
    methods: {
      // 导出
      leadingOut(val) {
        console.log(val);
      },
      // 新增
      newAdd(val) {
        console.log(val);
        if (val === 'collect') {
          this.chargeVisible = true;
          this.titles = val;
        } else {
          this.chargeVisible = true;
          this.titles = val;
        }
      },
      // 查看应收/应付
      lookStatus(val) {
        this.lookType = val;
        if (val === 'all') {
          this.pageNumber = 5;
        } else {
          this.pageNumber = 12;
        }
      },
      closeFilter() {
        this.filterModule = false;
      },
      closeCharge() {
        this.chargeVisible = false;
      },
      querySearch(queryString, cb) {
        let restaurants = this.restaurants;
        let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        console.log(item);
      },
      loadAll() {
        return [
          {"value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号"},
          {"value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号"},
          {"value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113"},
          {"value": "泷千家(天山西路店)", "address": "天山西路438号"},
          {"value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟"},
          {"value": "贡茶", "address": "上海市长宁区金钟路633号"},
          {"value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号"},
          {"value": "茶芝兰（奶茶，手抓饼）", "address": "上海市普陀区同普路1435号"},
          {"value": "十二泷町", "address": "上海市北翟路1444弄81号B幢-107"},
          {"value": "星移浓缩咖啡", "address": "上海市嘉定区新郁路817号"},
          {"value": "阿姨奶茶/豪大大", "address": "嘉定区曹安路1611号"},
        ]
      },

      // 部门员工筛选
      openOrganize() {
        this.organizeVisible = true;
      },
      // 部门员工筛选
      closeOrganize() {
        this.organizeVisible = false;
      },
      close_() {
        console.log(1);
      },
      // 双击 收
      dblCollect(row, column, cell, event) {
        // console.log(row);
        // console.log(column);
        // console.log(cell);
        // console.log(event);
      },
      // 右键 收
      collectMenu(row, event) {
        this.lists = [
          {clickIndex: 'collectWay', headIcon: 'el-icon-edit-outline', label: '应收入账',},
          {clickIndex: 'collectRemark', headIcon: 'el-icon-edit', label: '备注',},
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
      // 右键 租
      payMenu(row, event) {
        this.lists = [
          {clickIndex: 'rentWay', headIcon: 'el-icon-edit-outline', label: '应付入账',},
          {clickIndex: 'payRemark', headIcon: 'el-icon-edit', label: '备注',},
          {
            clickIndex: '', headIcon: 'el-icon-date', tailIcon: 'el-icon-arrow-right', label: '付款时间',
            children: [
              {clickIndex: 'revisePay', label: '编辑',},
              {clickIndex: 'lookPay', label: '查看',}
            ]
          },
          {clickIndex: 'payPolish', headIcon: 'el-icon-date', label: '修改补齐时间',},
          {clickIndex: 'delete', headIcon: 'el-icon-circle-close-outline', label: '删除',},
        ];
        this.contextMenuParam(event);
      },
      // 右键回调
      clickEvent(val) {
        this.titles = val;
        if (val === 'delete') {
          console.log(val);
          this.openDelete();
        }
        if (val === 'collectWay') {
          this.chargeVisible = true;
        }
        if (val === 'rentWay') {
          this.chargeVisible = true;
        }
        if (val === 'revisePay' || val === 'reviseCollect') {
          this.payTimeVisible = true;
          this.payTimes = ['1990-01-01', '1990-02-01', '1990-03-01', '1990-04-01', '1990-06-01', '1990-06-01'];
        }
        if (val === 'lookPay' || val === 'reviseCollect') {
          this.payTimeVisible = true;
          this.payTimes = ['1992-01-01', '1992-02-01', '1992-03-01', '1992-04-01', '1992-06-01', '1992-06-01'];
        }
        if (val === 'collectPolish' || val === 'payPolish') {
          this.polishTimeVisible = true;
          this.polishTime = '1992-01-01';
        }
      },
      // 关闭付款/收款时间
      closePayTime() {
        this.payTimeVisible = false;
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
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
    },
  }
</script>

<style lang="scss">
  #roomCharge {
    .btn {
      float: left;
      border: 0;
      color: #FFFFFF;
      cursor: default;
    }

    .btn1 {
      background-color: #fc0;
    }

    .btn2 {
      background-color: #f99;
    }

    .btn3 {
      background-color: #78cd51;
    }

    .btn4 {
      background-color: #F04D3D;
    }

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
    .el-table th {
      background: blue;
    }
  }
</style>
