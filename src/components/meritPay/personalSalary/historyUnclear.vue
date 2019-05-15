<template>
  <div id="HistoryUnclear" @click="show=false" @contextmenu="closeMenu">
    <div class="highRanking" style=" position: absolute; top: 122px; right: 20px;">
      <div class="tabsSearch" style="position: relative;">
        <el-form :inline="true" onsubmit="return false" size="mini">
          <el-form-item>
            <el-input placeholder="请输入内容" v-model="form.search" class="input-with-select" clearable>
              <el-select v-model="form.category" slot="prepend" placeholder="请选择">
                <el-option label="收房" value="1"></el-option>
                <el-option label="租房" value="2"></el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search" @click="getTableData"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="exportData">导出</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="highRanking">
      <div class="filter high_grade" :class="isHigh? 'highHide': ''" >
        <el-form :inline="true" onsubmit="return false" :model="form" size="mini" label-width="100px">
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
                        v-model="form.month"
                        type="month"
                        placeholder="选择月"
                        value-format="yyyy-MM">
                      </el-date-picker>
                    </div>
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
    <div class="main">
      <div style="margin: 0 0 10px;height: 28px;"></div>
      <el-table
        :data="tableData"
        :empty-text='collectStatus'
        v-loading="collectLoading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255, 255, 255, 0)"
        tooltip-effect="dark"
        style="width: 100%"
        @row-contextmenu="detailMenu">
        <el-table-column
          v-if="batch"
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="收/租状态"
          prop="contract_category">
          <template slot-scope="scope">
            <div>
              <span v-if="scope.row.contract_category === 1">收</span>
              <span v-if="scope.row.contract_category === 2">租</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="房屋地址"
          prop="address">
        </el-table-column>
        <el-table-column
          label="政务不齐"
          prop="incomplete_info">
          <template slot-scope="scope">
            <div :class="{'bgColor':scope.row.incomplete_info.length < 5 }">
              <span v-for="val in scope.row.incomplete_info">{{val}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="开单人"
          prop="staff_name">
        </el-table-column>
        <el-table-column
          label="负责人"
          prop="leader">
        </el-table-column>
        <el-table-column
          label="所属部门"
          prop="module">
        </el-table-column>
      </el-table>
    </div>
    <div class="block pages">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="form.page"
        :page-size="12"
        layout="total, prev, pager, next, jumper"
        :total="totalNum">
      </el-pagination>
    </div>
    <!--右键-->
    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperateMore="clickEvent"></RightMenu>

    <!--备注-->
    <Remarks :module="remarkVisible" @close="closeRemark"></Remarks>

    <!--标记-->
    <Badge :module="badgeVisible" @close="closeBadge" :incompleteList="incompleteList" :salaryId="salaryId"></Badge>
  </div>
</template>

<script>
  import RightMenu from '../../common/rightMenu.vue';    //右键
  import Remarks from '../../common/remarks.vue';  //备注
  import Freeze from './components/freeze.vue';  //冻结
  import Badge from './components/badge.vue';  //标记
  export default {
    name: "payroll",
    components: {RightMenu, Remarks, Freeze, Badge},
    data() {
      return {
        isHigh: false,
        tableData: [],
        totalNum: 0,
        buttonVal: ['业务员', '管理层'],
        active: 0,
        form: {
          category: '',
          search: '',
          page: 1,
          month: '',
        },
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],
        batch: false,             //批量
        freezeVisible: false,
        badgeVisible: false,
        remarkVisible: false,
        incompleteList: [],  //政务不齐的id
        salaryId: '',
        collectStatus: ' ',
        collectLoading: false,
      }
    },
    mounted() {
      this.getTableData();
    },
    methods: {
      getTableData() {
        if (!this.form.month) {
          this.form.month = '';
        }
        this.collectLoading = true;
        this.collectStatus = ' ';
        this.$http.get(globalConfig.server + 'salary/achv/history?category=' + this.form.category + '&page=' + this.form.page +
          '&month=' + this.form.month + '&search=' + this.form.search).then((res) => {
          this.isHigh = false;
          this.collectLoading = false;
          if (res.data.code === '88800') {
            this.tableData = res.data.data.data;
            this.totalNum = Number(res.data.data.count);
          } else {
            this.collectStatus = '暂无数据';
            this.tableData = [];
            this.totalNum = 0;
          }
        });
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.form.page = val;
        this.getTableData();
      },
      // 重置
      resetting() {
        this.form.month = '';
      },
      // 高级筛选
      highGrade() {
        this.isHigh = !this.isHigh;
      },
      exportData() {
        this.$http.get(globalConfig.server + 'salary/achv/export', {responseType: 'arraybuffer'}).then((res) => { // 处理返回的文件流
          if (!res.data) {
            return;
          }
          let url = window.URL.createObjectURL(new Blob([res.data]));
          let link = document.createElement('a');
          link.style.display = 'a';
          link.href = url;
          link.setAttribute('download', 'excel.xlsx');
          document.body.appendChild(link);
          link.click();
        });
      },

      // 标记
      openBadge() {
        this.badgeVisible = true;
      },
      closeBadge() {
        this.badgeVisible = false;
        this.getTableData();
      },
      // 右键
      detailMenu(row, event) {
        this.lists = [
          {
            clickIndex: 'revise',
            headIcon: 'el-icon-edit-outline',
            label: '未发标记',
            incompleteList: row.incomplete_list,
            id: row.id
            // clickIndex: 'revise', tailIcon: 'el-icon-arrow-right', headIcon: 'el-icon-edit-outline', label: '未发标记',
            // children: [
            //   {clickIndex: 'one', label: '单条',},
            //   {clickIndex: 'more', label: '批量',}
            // ]
          },
          // {clickIndex: 'remark', headIcon: 'el-icon-edit', label: '备注',},
        ];
        this.contextParams();
      },
      // 右键回调
      clickEvent(val) {
        console.log(val)
        if (val.clickIndex === 'revise') {
          this.openBadge();
          this.incompleteList = val.incompleteList;
          this.salaryId = val.id;
        }
        // if (val === 'more') {
        //   this.batch = true;
        // }
        if (val.clickIndex === 'remark') {
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

    },
  }
</script>

<style scoped>
  .primary {
    background: #409EFF;
    border-color: #409EFF;
    color: #ffffff;
  }

  .roll_table table {
    width: 100%;
    /*border-collapse:collapse;*/
  }

  .roll_table table thead th {
    background: #ebeef5;

  }

  .roll_table table tbody td {
    background: #fafafa;
  }
</style>
