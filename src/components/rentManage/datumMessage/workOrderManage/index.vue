<template>
  <div @click="show=false" @contextmenu="closeMenu">
    <div id="clientContainer">

      <div class="highRanking">
        <div class="highSearch">
          <el-form :inline="true" size="mini">
            <el-form-item>
              <el-input v-model="formInline.name" placeholder="搜索">
                <el-button slot="append" type="primary" icon="el-icon-search"></el-button>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="success">导出房源</el-button>
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
                    <div class="el_col_label">客户状态</div>
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
                    <div class="el_col_label">客户意向</div>
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
                    <div class="el_col_label">客户身份</div>
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
                    <div class="el_col_label">客户来源</div>
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
                    <div class="el_col_label">个人/中介</div>
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
        <div class="myTable" @contextmenu="houseHeadMenu($event)">
          <el-table
            :data="tableData"
            @row-click="clickTable"
            @row-contextmenu='houseMenu'
            style="width: 100%">
            <el-table-column
              prop="create_time"
              label="创建时间">
            </el-table-column>
            <el-table-column
              prop="name"
              label="房屋地址">
            </el-table-column>
            <el-table-column
              prop="province"
              label="事件数">
            </el-table-column>
            <el-table-column
              prop="address"
              label="包含跟进项">
            </el-table-column>
            <el-table-column
              prop="zip"
              label="预计完成时间">
            </el-table-column>
            <el-table-column
              prop="date"
              label="创建人">
            </el-table-column>
            <el-table-column
              prop="name"
              label="跟进人">
            </el-table-column>
            <el-table-column
              prop="province"
              label="完成情况">
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
    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperate="clickEvent"></RightMenu>

    <Organization :organizationDialog="organizationDialog" @close="closeOrganization"></Organization>
  </div>
</template>

<script>
  import RightMenu from '../../../common/rightMenu.vue'
  import Organization from '../../../common/organization.vue'
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

        statisticDate: '',

        formInline: {
          name: '',
          house: ''
        },
        tableData: [],
        currentPage: 1,
        options: [],

        //模态框
        organizationDialog: false,
        activeName: 'first',
        isHigh:false,
        maintenanceDialog: false,     //维修模态框

      }
    },

    mounted(){
        this.getTableData();
    },
    methods: {
      //获取列表数据
      getTableData(){
        this.$http.get(globalConfig.server+'customer/work_order').then((res) => {
          if(res.data.code === '10000'){
            this.tableData = res.data.data;
          }else {
            this.tableData = [];
          }
        })
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
          {clickIndex: 'stick', headIcon: 'el-icons-fa-arrow-up', label: '置顶',},
          {clickIndex: 'cancel', headIcon: 'el-icons-fa-scissors', label: '作废',},
          {clickIndex: '', headIcon: 'el-icons-fa-eye', label: '查看回访记录',},
          {clickIndex: 'maintenanceDialog', headIcon: 'el-icons-fa-briefcase', label: '创建维修单',},
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

      //右键回调事件
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
          case 'maintenanceDialog':
            this.maintenanceDialog = true;
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
      // tabs标签页
      handleClick(tab, event) {
        console.log(tab, event);
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
    min-height: 800px;
    .selectButton{
      color: #fff;
      background: #66b1ff;
    }
    .main {
      font-size: 12px;
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
</style>
