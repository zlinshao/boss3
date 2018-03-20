<template>
  <div @click="show=false" @contextmenu="closeMenu">
    <div id="clientContainer">
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
            <el-form-item v-if="isCheckbox">
              <el-button type="primary">全部标记为已读</el-button>
            </el-form-item>
          </el-form>
        </div>

        <div class="filter high_grade" :class="isHigh? 'highHide':''">
          <el-form :inline="true" :model="formInline" size="mini" label-width="100px">
            <div class="filterTitle">
              <i class="el-icons-fa-bars"></i>&nbsp;&nbsp;高级搜索
            </div>
            <el-row class="el_row_border">
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">标记</div>
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
                    <div class="el_col_label">时间范围</div>
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
            <el-tab-pane label="系统公告" name="first">
              <div class="myTable">
                <el-table
                  :data="tableData"
                  @row-click="clickTable"
                  @row-contextmenu='houseMenu'
                  style="width: 100%">
                  <el-table-column
                    prop="date"
                    v-if=""
                    type="selection">
                  </el-table-column>

                  <el-table-column
                    prop=""
                    v-if=""
                    label="">
                    <template slot-scope="scope">
                      <i class="el-icon-message" style="color: #fb4699"></i>
                      <!--<span style="margin-left: 10px"></span>-->
                    </template>
                  </el-table-column>

                  <el-table-column
                    prop="date"
                    label="发布时间">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="发布人">
                  </el-table-column>
                  <el-table-column
                    prop="province"
                    label="标题">
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    label="主要内容">
                  </el-table-column>
                  <el-table-column
                    prop="zip"
                    label="阅读时间">
                  </el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
            <el-tab-pane label="审批提醒" name="second">
              <div class="myTable">
                <el-table
                  :data="tableData"
                  @row-click="clickTable"
                  @row-contextmenu='houseMenu'
                  style="width: 100%">
                  <el-table-column
                    prop="date"
                    v-if=""
                    type="selection">
                  </el-table-column>

                  <el-table-column
                    prop=""
                    v-if=""
                    label="">
                    <template slot-scope="scope">
                      <i class="el-icon-message" style="color: #fb4699"></i>
                      <!--<span style="margin-left: 10px"></span>-->
                    </template>
                  </el-table-column>

                  <el-table-column
                    prop="date"
                    label="发布时间">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="发布人">
                  </el-table-column>
                  <el-table-column
                    prop="province"
                    label="标题">
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    label="主要内容">
                  </el-table-column>
                  <el-table-column
                    prop="zip"
                    label="阅读时间">
                  </el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
            <el-tab-pane label="boss小秘书" name="third">
              <div class="myTable">
                <el-table
                  :data="tableData"
                  @row-click="clickTable"
                  @row-contextmenu='houseMenu'
                  style="width: 100%">
                  <el-table-column
                    prop="date"
                    v-if=""
                    type="selection">
                  </el-table-column>

                  <el-table-column
                    prop=""
                    v-if=""
                    label="">
                    <template slot-scope="scope">
                      <i class="el-icon-message" style="color: #fb4699"></i>
                      <!--<span style="margin-left: 10px"></span>-->
                    </template>
                  </el-table-column>

                  <el-table-column
                    prop="date"
                    label="发布时间">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="发布人">
                  </el-table-column>
                  <el-table-column
                    prop="province"
                    label="标题">
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    label="主要内容">
                  </el-table-column>
                  <el-table-column
                    prop="zip"
                    label="阅读时间">
                  </el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
          </el-tabs>

          <div class="tableBottom">
            <div class="right">
              <div>未读 <span>5&nbsp;条</span></div>
              <div>已读 <span>0&nbsp;条</span></div>
              <a href="javascript:;" style="color: #6a8dfb">更多</a>
            </div>

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
  </div>
</template>

<script>
  import RightMenu from '../common/rightMenu.vue'
  export default {
    name: 'hello',
    components: {RightMenu},
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
            value: '1',
            label: '已读'
          }, {
            value: '2',
            label: '未读'
          }],

        //模态框
        organizationDialog: false,
        isActive: 0,
        isCheckbox:false,
        activeName: 'first',
        isHigh:false,
      }
    },

    methods: {
      handleClick(val) {

      },
      onSubmit(val) {
        this.isActive = val;
      },
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
          {clickIndex: 'read', headIcon: 'el-icons-fa-envelope-o', label: '标记为已读',},
          {clickIndex: 'all', headIcon: 'el-icons-fa-envelope', label: '批量标记',},
          {clickIndex: 'cancel', headIcon: 'el-icons-fa-envelope', label: '取消批量标记',},
          {clickIndex: 'delete', headIcon: 'el-icon-delete', label: '删除',},
        ];
        this.contextMenuParam(event);
      },

      //右键回调时间
      clickEvent (index) {
        switch (index){
          case 'read' :
            this.$confirm('您确定标记为已读吗', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$message({
                type: 'success',
                message: '已读成功!'
              });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消已读'
              });
            });
            break;
          case 'delete':
            this.$confirm('您确定将其删除吗', '提示', {
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
            break;
          case 'all':
            this.isCheckbox = true;
            break;
          case 'cancel':
            this.isCheckbox = false;
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
      highGrade(){
        this.isHigh = !this.isHigh;
      },
      resetting(){

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
          justify-content: space-between;
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
