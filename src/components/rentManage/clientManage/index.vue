<template>
  <div @click="show=false" @contextmenu="closeMenu">
    <div id="clientContainer">
      <div class="filter">
        <el-form :inline="true" :model="formInline" size="mini" class="demo-form-inline">
          <el-form-item label="客户状态">
            <el-select v-model="formInline.house" clearable placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="客户意向">
            <el-select v-model="formInline.house" clearable placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="客户身份">
            <el-select v-model="formInline.house" clearable placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="客户来源">
            <el-select v-model="formInline.house" clearable placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="个人/中介">
            <el-select v-model="formInline.house" clearable placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-input v-model="formInline.name" placeholder="搜索">
              <el-select v-model="formInline.select" clearable  slot="prepend" placeholder="请选择">
                <el-option label="客户" value="1"></el-option>
                <el-option label="负责人" value="2"></el-option>
                <el-option label="用户电话" value="3"></el-option>
                <el-option label="证件号" value="4"></el-option>
              </el-select>
              <el-button slot="append" type="primary" icon="el-icon-search"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item style="float: right">
            <el-button type="success">导出客源</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="main">
        <div class="tableBox">
          <div class="myTable" @contextmenu="houseHeadMenu($event)">
            <el-table
              :data="tableData"
              @row-click="clickTable"
              @row-contextmenu='openContextMenu'
              style="width: 100%">
              <el-table-column
                prop="date"
                label="录入时间">
              </el-table-column>
              <el-table-column
                prop="name"
                label="客户名称">
              </el-table-column>
              <el-table-column
                prop="province"
                label="尊称">
              </el-table-column>
              <el-table-column
                prop="city"
                label="手机号">
              </el-table-column>
              <el-table-column
                prop="city"
                label="地址客户意向">
              </el-table-column>
              <el-table-column
                prop="zip"
                label="跟进进度">
              </el-table-column>
              <el-table-column
                prop="date"
                label="来源">
              </el-table-column>
              <el-table-column
                prop="date"
                label="客户身份">
              </el-table-column>
              <el-table-column
                prop="date"
                label="证件号">
              </el-table-column>
              <el-table-column
                prop="date"
                label="个人/中介">
              </el-table-column>
              <el-table-column
                prop="date"
                label="负责人">
              </el-table-column>
              <el-table-column
                prop="date"
                label="所属部门">
              </el-table-column>
              <el-table-column
                prop="date"
                label="置顶">
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
        <div class="myDetail" @contextmenu="detailMenu($event)">
          <el-tabs type="border-card">
            <el-tab-pane label="客户资料">
              <div class="content">
                <table class="clientDetail">
                    <tr>
                      <td>客户姓名</td>
                      <td></td>
                      <td>登记时间</td>
                      <td></td>
                      <td>登记人</td>
                      <td></td>
                      <td>跟进时间：</td>
                    </tr>
                  <tr>
                    <td>客户姓名</td>
                    <td></td>
                    <td>登记时间</td>
                    <td></td>
                    <td>登记人</td>
                    <td></td>
                    <td>跟进人：</td>
                  </tr>
                  <tr>
                    <td>客户姓名</td>
                    <td></td>
                    <td>登记时间</td>
                    <td></td>
                    <td>登记人</td>
                    <td></td>
                    <td>跟进内容：</td>
                  </tr>
                </table>
              </div>
            </el-tab-pane>
            <el-tab-pane label="跟进记录">

            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperate="clickEvent"></RightMenu>
    <Remind :remindDialog="remindDialog" @close="closeRemind"></Remind>
  </div>
</template>

<script>
  import RightMenu from '../../common/rightMenu.vue'
  import Remind from './components/remind.vue'
  export default {
    name: 'hello',
    components: {RightMenu,Remind},
    data () {
      return {
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],
        /***********/
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
        instructionDialog: false,
        remindDialog:false,
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
      openContextMenu(row, event){
        this.lists = [
          {clickIndex: 'remindDialog', headIcon: 'el-icon-bell', label: '提醒',},
          {clickIndex: '', headIcon: 'el-icon-edit-outline', label: '增加沟通日志',},
          {clickIndex: 'stick', headIcon: 'el-icons-fa-arrow-up', label: '置顶',},
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

      //详情表头右键
      detailMenu(e){
        console.log(e.target.className)
        if (e.target.className.indexOf('el-tabs') > -1) {
          this.lists = [
            {clickIndex: 1, headIcon: 'el-icons-fa-home', label: '选择列选项',},
          ];
          this.contextMenuParam(event);
        }
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
          case 'remindDialog':
              this.remindDialog = true;
              break;
        }
      },
      closeRemind(){
          this.remindDialog = false;
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
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="">
  #clientContainer {
    .main {
      font-size: 12px;
      .tableBox {
        border: 1px solid #dfe6fb;
        margin-bottom: 20px;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
        .tableBottom {
          padding: 8px;
          display: flex;
          justify-content: flex-end;
        }
      }

      .myDetail {
        margin-bottom: 15px;
        .el-tabs {
          border: 1px solid #d4f0de;
          .el-tabs__header {
            background-color: #d4f0de;
          }
          .el-tabs__content {
            .el-tab-pane {
              .content {
                min-height: 100px;
                .clientDetail{
                  width: 100%;
                  border-collapse: collapse;
                  tr{
                    td{
                      border: 1px solid #ebeef5;
                      padding: 8px 0;
                      color: #606266;
                      text-align: center;
                      &:nth-child(1) {
                        width: 8%;
                      }
                      &:nth-child(2) {
                        width: 12%;
                      }
                      &:nth-child(3) {
                        width: 8%;
                      }
                      &:nth-child(4) {
                        width: 12%;
                      }
                      &:nth-child(5) {
                        width: 8%;
                      }
                      &:nth-child(6) {
                        width: 12%;
                      }
                      &:nth-child(7) {
                        width: 40%;
                        text-align: left;
                        padding-left: 8px
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>
