<template>
  <div @click="show=false" @contextmenu="closeMenu">
    <div id="clientContainer">

      <div class="highRanking">
        <div>
          <el-button size="mini">
            <router-link to="/contractChange">TEST_1</router-link>
          </el-button>
          <el-button size="mini">
            <router-link to="">TEST_2</router-link>
          </el-button>
          <el-button size="mini">
            <router-link to="">TEST_3</router-link>
          </el-button>
        </div>
        <div class="highSearch">
          <el-form :inline="true" size="mini">
            <el-form-item>
              <el-input placeholder="请输入内容" v-model="form.keyWords" size="mini" clearable>
                <el-button slot="append" icon="el-icon-search"></el-button>
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
                    <div class="el_col_label">状态</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-select v-model="form.h" clearable placeholder="请选择">
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
                    <div class="el_col_label">优先级</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-select v-model="form.house" clearable placeholder="请选择">
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
                      <el-input v-model="form.organize" @focus="selectDep" placeholder="请选择部门/员工"
                                readonly>
                        <!--<template slot="append">-->
                          <!--<div style="cursor: pointer;" @click="close_">清空</div>-->
                        <!--</template>-->
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
      <div class="main">
        <div class="myHouse">
          <div class="myTable">
            <el-table
              :data="tableData"
              @row-click="clickTable"
              @row-dblclick="dblClickTable"
              style="width: 100%">
              <el-table-column
                prop="date"
                v-if="isCheckbox"
                type="selection">
              </el-table-column>
              <el-table-column
                prop="date"
                label="标题">
              </el-table-column>
              <el-table-column
                prop="name"
                label="分配人">
              </el-table-column>
              <el-table-column
                prop="province"
                label="开始时间">
              </el-table-column>
              <el-table-column
                prop="address"
                label="截止时间">
              </el-table-column>
              <el-table-column
                prop="zip"
                label="状态">
              </el-table-column>
              <el-table-column
                prop="zip"
                label="优先级">
              </el-table-column>
              <el-table-column
                prop="zip"
                label="备注">
              </el-table-column>
            </el-table>
          </div>
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

        form: {
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
        tabs: ['系统公告', '审批提醒', 'boss小秘书', '个人发信箱', '部门发信箱', '短信提醒'],
        isActive: 0,
        isCheckbox:false,
        isHigh:false,
      }
    },

    methods: {
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
      selectDep(){
        console.log(1)
        this.organizationDialog = true
      },
      closeOrganization(){
        this.organizationDialog = false
      },
      dblClickTable(){
        this.$router.push('/sthToDoDetail_2')
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
      .myHouse {
        margin-bottom: 20px;
        .myTable {
          .el-table {
            th {
              background-color: #dfe6fb;
            }
          }
        }
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
