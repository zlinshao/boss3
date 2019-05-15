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
          <!--刷新-->
          <el-form-item>
            <el-button type="primary"><i class="el-icon-refresh"></i></el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="leadingOut">导出</el-button>
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
                  <div class="el_col_label">收租状态</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-select v-model="form.status" clearable size="mini">
                      <el-option label="请选择" value=""></el-option>
                      <el-option v-for="(key,index) in specialValue" :label="key" :value="index + 1" :key="index"></el-option>
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
          <el-row class="el_row_border">
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">部门/员工</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-input v-model="form.organize" @focus="openOrganize" placeholder="请选择部门/员工"
                              readonly>
                      <template slot="append">
                        <div style="cursor: pointer;" @click="close_subject">清空</div>
                      </template>
                    </el-input>
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

    <div>
      <el-table
        :data="tableData"
        width="100%"
        @cell-dblclick="dblSpecial"
        @row-contextmenu="specialMenu">
        <el-table-column
          label="喜报时间"
          prop="date"
          width="90px">
        </el-table-column>
        <el-table-column
          label="收/租状态"
          prop="subject">
        </el-table-column>
        <el-table-column
          label="地址"
          prop="name">
        </el-table-column>
        <el-table-column
          label="房型"
          prop="remark">
        </el-table-column>
        <el-table-column
          label="收/租月数"
          prop="remark">
        </el-table-column>
        <el-table-column
          label="付款方式"
          prop="remark">
        </el-table-column>
        <el-table-column
          label="定金"
          prop="remark">
        </el-table-column>
        <el-table-column
          label="月单价"
          prop="remark">
        </el-table-column>
        <el-table-column
          label="报备事项"
          prop="details"
          min-width="210px">
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
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[20, 100, 200, 300, 400]"
          :page-size="20"
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

    <Remarks :module="remarkVisible" @close="closeRemark"></Remarks>

  </div>
</template>

<script>
  import organization from '../../common/organization.vue'
  import RightMenu from '../../common/rightMenu.vue'    //右键
  import Remarks from '../../common/remarks'

  export default {
    name: "index",
    components: {organization, RightMenu, Remarks},
    data() {
      return {
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],

        isHigh: false,
        currentPage: 1,
        organizeVisible: false,
        remarkVisible: false,
        specialValue: ['收房', '租房'],
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
        tableData: [
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
            remark: '放大开始JFK',
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
      // 重置
      resetting() {
        this.form.keywords = '';
      },
      // 高级筛选
      highGrade() {
        this.isHigh = !this.isHigh;
      },
      // 导出
      leadingOut(val) {
        console.log(val);
      },

      closeFilter() {
        this.filterModule = false;
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
      // 清空部门
      close_subject() {
        console.log(1);
      },
      // 双击
      dblSpecial(row, column, cell, event) {
        // console.log(row);
        // console.log(column);
        // console.log(cell);
        // console.log(event);
      },

      // 右键
      specialMenu(row, event) {
        this.lists = [
          {clickIndex: 'remark', headIcon: 'el-icon-edit', label: '备注',},
        ];
        this.contextParams();
      },
      // 右键回调
      clickEvent(val) {
        if (val === 'remark') {
          this.remarkVisible = true;
        }
      },

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

</style>
