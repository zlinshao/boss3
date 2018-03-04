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
                  <div class="el_col_label">报销类别</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-select v-model="form.selects">
                      <el-option label="ffffff" value="1"></el-option>
                      <el-option label="dddddd" value="2"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
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

    <el-table
      :data="tableData"
      width="100%"
      @row-contextmenu="collectMenu">
      <el-table-column
        label="合同编号"
        prop="contract_id">
      </el-table-column>
      <el-table-column
        label="房屋地址"
        prop="address">
      </el-table-column>
      <el-table-column
        label="姓名"
        prop="name">
      </el-table-column>
      <el-table-column
        label="联系电话"
        prop="mobile">
      </el-table-column>
      <el-table-column
        label="客户身份"
        prop="identity">
      </el-table-column>
      <el-table-column
        label="报销类别"
        prop="reim_category">
      </el-table-column>
      <el-table-column
        label="报销金额"
        prop="amount">
      </el-table-column>
      <el-table-column
        label="银行卡号"
        prop="account">
      </el-table-column>
      <el-table-column
        label="开户行"
        prop="bank">
      </el-table-column>
      <el-table-column
        label="账户名"
        prop="account_name">
      </el-table-column>

      <el-table-column
        label="备注"
        prop="remark">
      </el-table-column>

    </el-table>

    <div class="block pages">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="12"
        layout="total, prev, pager, next, jumper"
        :total="totalNumber">
      </el-pagination>
    </div>

    <!--右键-->
    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperate="clickEvent"></RightMenu>

    <Remarks :module="remarkVisible" @close="closeRemark"></Remarks>
  </div>
</template>

<script>
  import Remarks from '../../common/remarks'
  import RightMenu from '../../common/rightMenu.vue'    //右键

  export default {
    name: "index",
    components: {RightMenu, Remarks},
    data() {
      return {
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],

        currentPage: 1,
        remarkVisible: false,
        isHigh: false,
        form: {
          keyWords: '',
          selects: '',
          dates: '',
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
        tableData: [],
        params:{
          limit:12,
          page:1
        },
        pages: 1,
        totalNumber : 0,
        isLoading : true,
      }
    },
    mounted() {
      this.getTableData();
    },
    watch: {},
    methods: {

      getTableData(){
        this.$http.get('/wechat/reimbursement',{params:this.params}).then((res) => {
          if(res.data.code === '10010'){
            this.tableData = res.data.data;
            this.pages = res.data.pages;
            this.totalNumber = res.data.number;
            this.isLoading = false;
          }
        })
      },

      // 重置
      resetting() {
        this.form.keywords = '';
      },
      // 高级筛选
      highGrade() {
        this.isHigh = !this.isHigh;
      },
      // 右键
      collectMenu(row, event) {
        this.lists = [
          {clickIndex: 'remark', headIcon: 'el-icon-edit', label: '备注',},
        ];
        this.contextMenuParam(event);
      },
      // 右键回调
      clickEvent(val) {
        if (val === 'remark') {
          this.remarkVisible = true;
        }
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
      // 备注
      closeRemark() {
        this.remarkVisible = false;
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.params.page = val;
        this.getTableData();
      },
    },
  }
</script>

<style lang="scss">

</style>
