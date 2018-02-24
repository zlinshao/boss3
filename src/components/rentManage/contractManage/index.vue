<template>
  <div @click="show=false" @contextmenu="closeMenu">
    <div id="clientContainer">
      <!--<div class="tool">-->
        <!--<div class="tool_left">-->
          <!--<el-button size="mini" @click="selectStatus(1)" :class="selectFlag==1? 'selectButton':''">-->
            <!--<i class="el-icon-document"></i>&nbsp;收房合同-->
          <!--</el-button>-->
          <!--<el-button size="mini" @click="selectStatus(2)" :class="selectFlag==2? 'selectButton':''">-->
            <!--<i class="el-icon-document"></i>&nbsp;租房合同-->
          <!--</el-button>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="filter">-->
        <!--<el-form :inline="true" :model="formInline" size="mini" class="demo-form-inline">-->
          <!--<el-form-item label="合同状态">-->
            <!--<el-select v-model="formInline.house" clearable placeholder="请选择">-->
              <!--<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">-->
              <!--</el-option>-->
            <!--</el-select>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="回访状态">-->
            <!--<el-select v-model="formInline.house" clearable placeholder="请选择">-->
              <!--<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">-->
              <!--</el-option>-->
            <!--</el-select>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="合同日期">-->
            <!--<el-date-picker-->
              <!--v-model="statisticDate"-->
              <!--type="daterange"-->
              <!--align="right"-->
              <!--unlink-panels-->
              <!--range-separator="至"-->
              <!--start-placeholder="开始日期"-->
              <!--end-placeholder="结束日期"-->
              <!--:picker-options="pickerOptions">-->
            <!--</el-date-picker>-->
          <!--</el-form-item>-->
          <!--<el-form-item>-->
            <!--<el-input v-model="formInline.name" @focus="selectDep" readonly placeholder="选择部门">-->
              <!--<el-button slot="append" type="primary">清空</el-button>-->
            <!--</el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item>-->
            <!--<el-input v-model="formInline.name" placeholder="搜索">-->
              <!--<el-button slot="append" type="primary" icon="el-icon-search"></el-button>-->
            <!--</el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item style="float: right">-->
            <!--<el-button type="success">导出合同</el-button>-->
          <!--</el-form-item>-->
        <!--</el-form>-->
      <!--</div>-->

      <div class="highRanking">
        <div class="tabsSearch">
          <el-form :inline="true" size="mini">
            <el-form-item>
              <el-input v-model="formInline.name" placeholder="搜索">
                <el-button slot="append" type="primary" icon="el-icon-search"></el-button>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
            </el-form-item>
            <el-form-item style="float: right">
              <el-button type="success">导出合同</el-button>
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
                    <div class="el_col_label">合同状态</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-select v-model="formInline.house" clearable placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">回访状态</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-select v-model="formInline.a" clearable placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row class="el_row_border">
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">合同状态</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-input v-model="formInline.name" @focus="selectDep" readonly placeholder="选择部门">
                        <el-button slot="append" type="primary">清空</el-button>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">回访状态</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-date-picker
                        v-model="statisticDate"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions">
                      </el-date-picker>
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
      <div class="main">
        <div>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="收房合同" name="first">
              <div class="myTable" @contextmenu="houseHeadMenu($event)">
                <el-table
                  :data="tableData"
                  @row-click="clickTable"
                  @row-contextmenu='houseMenu'
                  style="width: 100%">
                  <el-table-column
                    prop="date"
                    label="合同编号">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="上传时间">
                  </el-table-column>
                  <el-table-column
                    prop="province"
                    label="业主姓名">
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    label="地址">
                  </el-table-column>
                  <el-table-column
                    prop="zip"
                    label="手机号码">
                  </el-table-column>
                  <el-table-column
                    prop="date"
                    label="合同到期时间">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="资料补齐时间">
                  </el-table-column>
                  <el-table-column
                    prop="province"
                    label="过期情况">
                  </el-table-column>
                  <el-table-column
                    prop="city"
                    label="回访情况">
                  </el-table-column>
                  <el-table-column
                    prop="date"
                    label="开单人">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="负责人">
                  </el-table-column>
                  <el-table-column
                    prop="province"
                    label="部门">
                  </el-table-column>
                  <el-table-column
                    prop="city"
                    label="审核状态">
                  </el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
            <el-tab-pane label="租房合同" name="second">
              <div class="myTable" @contextmenu="houseHeadMenu($event)">
                <el-table
                  :data="tableData"
                  @row-click="clickTable"
                  @row-contextmenu='houseMenu'
                  style="width: 100%">
                  <el-table-column
                    prop="date"
                    label="合同编号">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="上传时间">
                  </el-table-column>
                  <el-table-column
                    prop="province"
                    label="业主姓名">
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    label="地址">
                  </el-table-column>
                  <el-table-column
                    prop="zip"
                    label="手机号码">
                  </el-table-column>
                  <el-table-column
                    prop="date"
                    label="合同到期时间">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="资料补齐时间">
                  </el-table-column>
                  <el-table-column
                    prop="province"
                    label="过期情况">
                  </el-table-column>
                  <el-table-column
                    prop="city"
                    label="回访情况">
                  </el-table-column>
                  <el-table-column
                    prop="date"
                    label="开单人">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="负责人">
                  </el-table-column>
                  <el-table-column
                    prop="province"
                    label="部门">
                  </el-table-column>
                  <el-table-column
                    prop="city"
                    label="审核状态">
                  </el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
          </el-tabs>
          <div class="tableBottom">
            <div class="left">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperate="clickEvent"></RightMenu>

    <Organization :organizationDialog="organizationDialog" @close="closeOrganization"></Organization>
  </div>
</template>

<script>
  import RightMenu from '../../common/rightMenu.vue'
  import Organization from '../../common/organization.vue'
  export default {
    name: 'hello',
    components: {RightMenu,Organization},
    data () {
      return {
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],
        /***********/
        selectFlag:1,
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
        statisticDate: '',

        formInline: {
          name: '',
          house: ''
        },
        tableData: [
          {
            date: '2016-05-03',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          },
          {
            date: '2016-05-02',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          },
          {
            date: '2016-05-04',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          },
        ],
        currentPage: 1,
        options: [
          {
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }, {
            value: '选项4',
            label: '龙须面'
          }, {
            value: '选项5',
            label: '北京烤鸭'
          }],

        //模态框
        organizationDialog: false,
        activeName: 'first',
        isHigh:false,
      }
    },

    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      clickTable(row, event, column){
        console.log(row, event, column)
      },
      //房屋右键
      houseMenu(row, event){
        this.lists = [
          {clickIndex: 'stick', headIcon: 'el-icons-fa-arrow-up', label: '置顶',},
          {clickIndex: 'cancel', headIcon: 'el-icons-fa-scissors', label: '作废',},
          {clickIndex: '', headIcon: 'el-icons-fa-eye', label: '查看回访记录',},
          {clickIndex: '', headIcon: 'el-icons-fa-briefcase', label: '创建维修单',},
        ];
        this.contextMenuParam(event);
      },
      //合同表头右键
      houseHeadMenu(e){
        this.lists = [
          {clickIndex: 1, headIcon: 'el-icons-fa-home', label: '选择列选项',},
        ];
        this.contextMenuParam(event);
      },

      //右键回调时间
      clickEvent (index) {
        switch (index){
          case 'stick' :
            this.$confirm('您确定将其置顶吗', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$message({
                type: 'success',
                message: '置顶成功!'
              });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消置顶'
              });
            });
            break;
          case 'cancel':
            this.$confirm('您确定将其作废吗', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$message({
                type: 'success',
                message: '作废成功!'
              });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消作废'
              });
            });
            break;
        }
      },
      //关闭右键菜单
      closeMenu(){
        this.show = false;
      },

      //右键参数
      contextMenuParam(event){
        //param: user right param
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

      selectDep(){
          console.log(1)
          this.organizationDialog = true
      },
      closeOrganization(){
        this.organizationDialog = false
      },
      selectStatus(flag){
        this.selectFlag = flag;
      },
      // tabs标签页
      handleClick(tab, event) {
        console.log(tab, event);
      },
      highGrade(){
          this.isHigh = !this.isHigh;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="">
  #clientContainer {
    .selectButton{
      color: #fff;
      background: #66b1ff;
    }
    .tool {
      border-bottom: 1px solid #eee;
      display: flex;
      padding-bottom: 10px;
      justify-content: space-between;
      .tool_right {
        display: flex;
        align-items: center;
        div {
          width: 100px;
          text-align: center;
          cursor: pointer;
          &:first-child {
            /*border-right: 1px solid #ccc;*/
          }
          i {
            color: #409EFF;
          }
        }
      }
    }
    .filter {
      padding-top: 10px;
    }
    .main {
      font-size: 12px;
      >div {
        .tableBottom {
          padding: 8px;
          display: flex;
          justify-content: flex-end;
          .right {
            display: flex;
            align-items: center;
            div {
              width: 100px;
              text-align: center;
              span {
                color: #fb529f;
              }
              &:first-child {
                border-right: 1px solid #ccc;
              }
            }
          }
        }
      }
    }
  }
</style>
