<template>
  <div id="periodicTable" @click="show=false" @contextmenu="closeMenu">
    <div class="highRanking">
      <div class="highSearch">
        <el-form :inline="true" size="mini">
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
            <el-form-item @click="leadingOut">
              <el-button type="primary">导出</el-button>
            </el-form-item>
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
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">部门</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-input v-model="form.organize" @focus="openOrganize" placeholder="请选择部门/员工"
                              readonly>
                      <template slot="append">
                        <div style="cursor: pointer;" @click="close_">清空</div>
                      </template>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row class="el_row_border">
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">标签选择</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-select
                      @remove-tag="remChange"
                      @change="checkChange"
                      v-model="form.checkValue"
                      multiple
                      filterable
                      allow-create
                      default-first-option
                      placeholder="请选择文章标签">
                      <el-option
                        v-for="item in options"
                        :key="item.label"
                        :label="item.label"
                        :value="item.label">
                      </el-option>
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
      @row-contextmenu='openContextMenu'
      @cell-dblclick='openDetail'
      width="100%">
      <el-table-column
        label="发喜报日期"
        prop="generate_date">
      </el-table-column>
      <el-table-column
        label="房屋地址"
        prop="address">
      </el-table-column>
      <el-table-column
        label="收房状态"
        prop="contract_category">
      </el-table-column>
      <el-table-column
        label="付款方式"
        prop="pay_type">
      </el-table-column>
      <el-table-column
        label="签约月数"
        prop="month">
      </el-table-column>
      <el-table-column
        label="单价"
        prop="price">
      </el-table-column>
      <el-table-column
        label="总金额"
        prop="total_price">
      </el-table-column>
      <el-table-column
        label="空置期"
        prop="vacancy">
      </el-table-column>
      <el-table-column
        label="中介费"
        prop="agency">
      </el-table-column>
      <el-table-column
        label="实际业绩"
        prop="achv_real">
      </el-table-column>
      <el-table-column
        label="溢出业绩"
        prop="achv_overflow">
      </el-table-column>
      <el-table-column
        label="姓名"
        prop="staff_name">
      </el-table-column>
      <el-table-column
        label="所属部门"
        prop="department">
      </el-table-column>
      <el-table-column
        label="已收金额"
        prop="module">
      </el-table-column>
      <el-table-column
        label="政务不齐"
        prop="module">
      </el-table-column>
    </el-table>

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
    <el-dialog  title="业绩详情" :visible.sync="dialogVisible" width="30%">
      <el-row style="margin: 0 20px;">
        <el-col :span="6">个人提成：</el-col>
        <el-col :span="18">{{dblRowData.achv}}</el-col>
      </el-row>
      <el-row style="margin: 0 20px;">
        <el-col :span="6">奖励：</el-col>
        <el-col :span="18">{{dblRowData.bonus}}</el-col>
      </el-row>
      <el-row style="margin: 0 20px;">
        <el-col :span="6">认责：</el-col>
        <el-col :span="18">{{dblRowData.penalty}}</el-col>
      </el-row>
      <el-row style="margin: 0 20px;">
        <el-col :span="6">业绩包：</el-col>
        <el-col :span="18">{{dblRowData.package.name}}</el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
          <!--<el-button @click="dialogVisible = false" size="mini">取 消</el-button>-->
          <el-button type="primary" @click="dialogVisible = false" size="mini">确 定</el-button>
        </span>
    </el-dialog>
    <!--组织架构-->
    <organization :organizationDialog="organizeVisible" @close="closeOrganize"></organization>
    <right-menu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
                @clickOperateMore="clickEvent"></right-menu>
  </div>
</template>

<script>
  import Organization from '../../common/organization.vue'
  import RightMenu from '../../common/rightMenu.vue'    //右键

  export default {
    name: 'index',
    components: {Organization,RightMenu},
    data() {
      return {
        show: false,
        isHigh: false,
        totalNum: 0,
        values: ['出租', '提前一个月出租', '提前二个月以上续租'],
        form: {
          status: '',
          organize: '',
          dates: '',
          subject: '',
          keywords: '',
          checkValue: [],
          page: 1,
        },
        options: [
          {label: '双方业绩为零'},
          {label: '已充公'},
          {label: '二次出租'},
          {label: '鸡腿包'}
        ],
        organizeVisible: false,
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
        state: '',
        rightMenuX: 0,
        rightMenuY: 0,
        lists: [],
        pitch: '',
        dialogVisible: false,
        dblRowData: [],
      }
    },
    activated() {
      this.getTableData();
    },
    mounted() {
      this.getTableData();
    },
    methods: {
      getTableData(){
        this.$http.get(globalConfig.server+ 'salary/achv').then((res) => {
          this.isHigh = false;
          if(res.data.code === '88800'){
            this.tableData = res.data.data.data;
            this.totalNum = Number(res.data.data.count);
          }else{
            this.tableData = [];
            this.totalNum = 0;
          }
        });
      },
      // 右键
      openContextMenu(row, event) {
        this.pitch = row.id;
        this.contextMenuParam(event);
      },
      openDetail(row){
        console.log(row);
        this.dblRowData = row;
        this.dialogVisible = true;
      },
      // 右键回调
      clickEvent(val) {

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
      //关闭右键菜单
      closeMenu() {
        this.show = false;
      },
      // 重置
      resetting() {
        this.form.organize = '';
        this.form.dates = '';
        this.form.keywords = '';
      },
      // 高级筛选
      highGrade() {
        this.isHigh = !this.isHigh;
      },
      checkChange(val) {
        console.log(val);
      },
      remChange(val) {
        console.log(val);
      },
      // 部门员工筛选
      openOrganize() {
        this.organizeVisible = true;
      },
      // 部门员工筛选
      closeOrganize() {
        this.organizeVisible = false;
      },
      // 清空部门
      close_() {
        console.log(1);
      },

      // 导出
      leadingOut(val) {
        console.log(val);
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.form.page = val;
        this.getTableData();
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #periodicTable{
    .filter {
      padding-top: 10px;
      .el-select .el-input {
        width: 240px;
      }
      .el-input-group__prepend {
        background-color: #fff !important;
      }
    }
  }
</style>
