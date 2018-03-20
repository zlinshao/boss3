<template>
  <div @click="show=false" @contextmenu="closeMenu">
    <div id="clientContainer">

      <div class="highRanking">
        <!--<div>-->
        <!--<el-button size="mini">-->
        <!--<router-link to="/contractChange">TEST_1</router-link>-->
        <!--</el-button>-->
        <!--<el-button size="mini">-->
        <!--<router-link to="/deliver">TEST_2</router-link>-->
        <!--</el-button>-->
        <!--<el-button size="mini">-->
        <!--<router-link to="/throwALease">TEST_3</router-link>-->
        <!--</el-button>-->
        <!--</div>-->
        <div class="highSearch">
          <el-form :inline="true" size="mini">
            <el-form-item>
              <el-input placeholder="请输入内容" v-model="form.item_name" @keyup.enter.native="search" size="mini">
                <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="newAddDialog = true">新增积分项</el-button>
            </el-form-item>
          </el-form>
        </div>

        <div class="filter high_grade" :class="isHigh? 'highHide':''">
          <el-form :inline="true" size="mini" label-width="100px">
            <div class="filterTitle">
              <i class="el-icons-fa-bars"></i>&nbsp;&nbsp;高级搜索
            </div>
            <el-row class="el_row_border">
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">员工</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-input v-model="staff_name" @focus="selectDep('staff')" placeholder="请选择部门/员工" readonly>
                      </el-input>
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
                      <el-input v-model="department_name" @focus="selectDep('depart')" placeholder="请选择部门/员工" readonly>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <div class="btnOperate">
              <el-button size="mini" type="primary" @click="search">搜索</el-button>
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
              @row-contextmenu = 'rightMenu'
              style="width: 100%">
              <el-table-column
                prop="date"
                label="时间">
              </el-table-column>
              <el-table-column
                prop="sname"
                label="姓名">
              </el-table-column>
              <el-table-column
                prop="dname"
                label="部门">
              </el-table-column>
              <el-table-column
                prop="name"
                label="项目名称">
              </el-table-column>
            </el-table>
          </div>
          <div class="tableBottom">

            <div class="left">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="form.page"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="form.limit"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalNumber">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperate="clickEvent"></RightMenu>
    <Organization :organizationDialog="organizationDialog" :length="length" :type="type" @close="closeOrganization" @selectMember="selectMember"></Organization>
    <NewAdd :newAddDialog="newAddDialog" @close="closeAdd"></NewAdd>
  </div>
</template>

<script>
  import RightMenu from '../../common/rightMenu.vue'
  import Organization from '../../common/organization.vue'
  import NewAdd from './components/newAdd.vue'

  export default {
    name: 'hello',
    components: {RightMenu,Organization,NewAdd},
    data () {
      return {
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],
        /***********/
        selectFlag:1,
        statisticDate: '',

        form: {
          page: 1,
          limit: 10,
          item_name:'',
          staff_id:'',
          credit_from:'',
          credit_to:'',
          department_id:'',
        },
        staff_name:'',
        department_name:'',
        length:'',
        type:'',

        activeId:'',

        totalNumber:0,
        tableData: [],

        //模态框
        organizationDialog: false,
        tabs: ['系统公告', '审批提醒', 'boss小秘书', '个人发信箱', '部门发信箱', '短信提醒'],
        isActive: 0,
        isCheckbox:false,
        isHigh:false,
        newAddDialog : false,
      }
    },
    mounted(){
        this.getTableData();
    },
    methods: {

      getTableData(){
          this.$http.get(globalConfig.server+'/credit/manage',{params:this.form}).then((res) => {
            if(res.data.code === '30310'){
                this.totalNumber = res.data.num;
                this.tableData = res.data.data;
            }else {
                this.$notify.warning({
                  title:'警告',
                  message:res.data.msg
                })
            }
          })
      },
      search(){
          this.isHigh = false;
          this.form.page = 1;
          this.getTableData();
      },
      onSubmit(val) {
        this.isActive = val;
      },
      handleSizeChange(val) {
        this.form.limit = val;
        this.getTableData();
      },
      handleCurrentChange(val) {
        this.form.page = val;
        this.getTableData();
      },
      clickTable(row, event, column){
        console.log(row, event, column)
      },
      //右键
      rightMenu(row, event){
        this.activeId = row.id;
        this.lists = [
//          {clickIndex: 'read', headIcon: 'el-icons-fa-envelope-o', label: '标记为已读',},
//          {clickIndex: 'all', headIcon: 'el-icons-fa-envelope', label: '批量标记',},
//          {clickIndex: 'cancel', headIcon: 'el-icons-fa-envelope', label: '取消批量标记',},
          {clickIndex: 'edit', headIcon: 'el-icon-edit', label: '修改',},
          {clickIndex: 'delete', headIcon: 'el-icon-delete', label: '删除',},
        ];
        this.contextMenuParam(event);
      },

      //右键回调时间
      clickEvent (index) {
        if(index === 'delete'){
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.deleteIntegral();
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }else if(index === 'edit'){

        }
      },

      //deleteIntegral
      deleteIntegral(){
        this.$http.put(globalConfig.server+'/credit/manage/delete/'+this.activeId).then((res) => {
          if(res.data.code === '30310'){
            this.$notify.success({
              title:'警告',
              message:res.data.msg
            })
            this.search();
          }else {
            this.$notify.warning({
              title:'警告',
              message:res.data.msg
            })
          }
        })
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
      selectDep(val){
        this.organizationDialog = true;
        this.length = 1;
        this.type = val;
      },
      closeOrganization(){

        this.organizationDialog = false;
      },
      selectMember(val){
        if(val[0].hasOwnProperty('avatar')){
          this.staff_name = val[0].name;
          this.staff_id = val[0].id;
        }else{
          this.department_name = val[0].name;
          this.department_id = val[0].id;
        }
      },
      highGrade(){
        this.isHigh = !this.isHigh;
      },
      resetting(){
          this.staff_id = '';
          this.staff_name = '';
          this.department_id = '';
          this.department_name = '';
      },
      closeAdd(){
          this.newAddDialog = false
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
