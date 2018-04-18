<template>
  <div @click="show=false" @contextmenu="closeMenu">
    <div id="clientContainer">
      <div class="tool">
        <div class="tool_left">
          <el-button type="primary" size="mini">
            <i class="el-icon-document"></i>&nbsp;登记维修记录
          </el-button>
          <el-button type="success" size="mini">
            <i class="el-icon-tickets"></i>&nbsp;功能说明
          </el-button>
        </div>

        <div class="tool_right">
          <!--<div><i class="el-icon-date"></i>&nbsp;使用说明</div>-->
          <div><i class="el-icon-setting"></i>&nbsp;设置</div>
        </div>
      </div>
      <div class="filter">
        <el-form :inline="true" onsubmit="return false" :model="formInline" size="mini" class="demo-form-inline">
          <el-form-item label="性质">
            <el-select v-model="formInline.house" clearable placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="店面">
            <el-select v-model="formInline.house" clearable placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="统计日期">
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
          <el-form-item>
            <el-input v-model="formInline.name" placeholder="搜索">
              <el-button slot="append" type="primary" icon="el-icon-search"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="text">高级</el-button>
          </el-form-item>
          <el-form-item style="float: right">
            <el-button type="success">导出报表</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="main">
        <div class="myHouse">
          <div class="myTable" @contextmenu="houseHeadMenu($event)">
            <el-table
              :data="tableData"
              @row-click="clickTable"
              @row-contextmenu='houseMenu'
              style="width: 100%">
              <el-table-column
                prop="date"
                label="日期">
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名">
              </el-table-column>
              <el-table-column
                prop="province"
                label="省份">
              </el-table-column>
              <el-table-column
                prop="city"
                label="市区">
              </el-table-column>
              <el-table-column
                prop="address"
                label="地址">
              </el-table-column>
              <el-table-column
                prop="zip"
                label="邮编">
              </el-table-column>
            </el-table>
          </div>
          <div class="tableBottom">
            <div class="right">
              <div>未租房源 <span>5&nbsp;套</span></div>
              <div>已定 <span>0&nbsp;套</span></div>
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
    <!--<Instruction :instructionDialog="instructionDialog" @close="closeInstruction"></Instruction>-->
  </div>
</template>

<script>
  import RightMenu from '../../common/rightMenu.vue'
  //  import Instruction from './comments/instruction.vue'
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
        tableData: [],
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
        instructionDialog: false,
      }
    },
    mounted(){
      this.getTableData();
    },
    methods: {
      getTableData(){
        this.$http.get(globalConfig.server+ 'repaire/list').then(() =>{

        });
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
          {clickIndex: 1, headIcon: 'el-icons-fa-home', label: '房源修改',},
          {clickIndex: 1, headIcon: 'el-icon-circle-plus', label: '添加跟进',},
          {clickIndex: 1, headIcon: 'el-icon-edit-outline', label: '修改看房',},
          {clickIndex: 1, headIcon: 'el-icon-edit', label: '修改回访',},
          {clickIndex: 4, headIcon: 'el-icons-fa-envelope-o', label: '发送短信',},
          {clickIndex: 1, headIcon: 'el-icon-error', label: '删除房源',},
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
        console.log('click ' + index)
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

      //说明书
//          openInstruction(){
//              this.instructionDialog = true
//          },
//          closeInstruction(){
//            this.instructionDialog = false
//          }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #clientContainer {
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
      .myHouse {
        border: 1px solid #dfe6fb;
        margin-bottom: 20px;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
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
