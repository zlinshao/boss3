<template>
  <div  @click="show=false" @contextmenu="closeMenu">
    <div class="tool">
      <div class="tool_left">
        <el-button size="mini" @click="selectStatus(1)" :class="selectFlag==1? 'selectButton':''">
          <i class="el-icons-fa-archive"></i>&nbsp;汇总
        </el-button>
        <el-button size="mini" @click="selectStatus(2)" :class="selectFlag==2? 'selectButton':''">
          <i class="el-icons-fa-mail-reply"></i>&nbsp;领取
        </el-button>
        <el-button size="mini" @click="selectStatus(3)" :class="selectFlag==3? 'selectButton':''">
          <i class="el-icons-fa-scissors"></i>&nbsp;作废
        </el-button>
        <el-button size="mini" @click="selectStatus(4)" :class="selectFlag==4? 'selectButton':''">
          <i class="el-icons-fa-mail-forward"></i>&nbsp;上缴
        </el-button>
      </div>
    </div>
    <div class="filter">
      <el-form :inline="true" :model="formInline" size="mini" class="demo-form-inline">
        <el-form-item label="选择部门">
          <el-input readonly="" @focus="openOrganizationModal('department')" placeholder="点击选择"></el-input>
        </el-form-item>
        <el-form-item label="合同分类">
          <el-select clearable v-model="formInline.region" placeholder="请选择合同分类">
            <el-option label="领取" value="shanghai"></el-option>
            <el-option label="作废" value="beijing"></el-option>
            <el-option label="上缴" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="formInline.name" placeholder="搜索">
            <el-button slot="append" type="primary" icon="el-icon-search"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">导出</el-button>
        </el-form-item>
        <el-form-item style="float: right">
          <el-button type="primary" @click="createNewTask">创建任务</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="main">
      <div v-show="selectFlag==1" class="blueTable">
        <el-table
          :data="tableData"
          @row-dblclick = 'showContractDetail'
          @row-contextmenu='openContextMenu'
          style="width: 100%">
          <el-table-column
            prop="date"
            label="部门">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="name"
            label="剩余合同书（收）">
          </el-table-column>
          <el-table-column
            prop="name"
            label="剩余合同书（租）">
          </el-table-column>
          <el-table-column
            prop="name"
            label="已领取合同数（收）">
          </el-table-column>
          <el-table-column
            prop="name"
            label="已领取合同数（租）">
          </el-table-column>
          <el-table-column
            prop="name"
            label="已作废合同数（收）">
          </el-table-column>
          <el-table-column
            prop="name"
            label="已作废合同数（租）">
          </el-table-column>
          <el-table-column
            prop="name"
            label="已上缴合同数（收）">
          </el-table-column>
          <el-table-column
            prop="name"
            label="已上缴合同数（租）">
          </el-table-column>
        </el-table>
      </div>
      <div v-show="selectFlag==2" class="blueTable">
        <el-table
          :data="tableData"
          @row-dblclick = 'showContractDetail'
          style="width: 100%">
          <el-table-column
            prop="date"
            label="领取时间">
          </el-table-column>
          <el-table-column
            prop="name"
            label="部门">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="name"
            label="领取合同数（收）">
          </el-table-column>
          <el-table-column
            prop="name"
            label="领取合同数（租）">
          </el-table-column>
          <el-table-column
            prop="name"
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

    <Organization :organizationDialog="organizationDialog" @close="closeOrganization"></Organization>
    <Contact :contractDialog="contractDialog" @close="closeContract"></Contact>
    <CreateTask :createTaskDialog="createTaskDialog" @close="closeCreateTask"></CreateTask>
    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperate="clickEvent"></RightMenu>
    <Dispatch :dispatchDialog="dispatchDialog" @close="closeDispatch"></Dispatch>

  </div>
</template>

<script>
  import Organization from '../../../common/organization.vue'
  import Contact from './components/contractDetail.vue'
  import CreateTask from './components/createTask.vue'
  import RightMenu from '../../../common/rightMenu.vue'    //右键
  import Dispatch from './components/dispatch.vue'


  export default {
    components:{Organization,Contact,CreateTask,RightMenu,Dispatch},
    data () {
      return {
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],
        /***********/

        selectFlag:1,
        formInline:{},
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
          {
            date: '2016-05-01',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          },
          {
            date: '2016-05-01',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          }
        ],
        currentPage: 1,
        organizationDialog:false,
        createTaskDialog : false,
        contractDialog: false,  //合同详情
        dispatchDialog:false,
      }
    },
    methods:{
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },

      openOrganizationModal(){
        this.organizationDialog = true
      },
      closeOrganization(){
        this.organizationDialog = false;
      },
      showContractDetail(){   //显示合同详情
          this.contractDialog = true
      },
      closeContract(){
          this.contractDialog = false;
      },
      selectStatus(flag){
          this.selectFlag = flag;
      },
      createNewTask(){
          this.createTaskDialog = true
      },
      closeCreateTask(){
          this.createTaskDialog = false
      },
      openContextMenu(row, event){
        this.lists = [
          {clickIndex: 'dispatchDialog', headIcon: 'el-icon-menu', label: '分配',},
          {clickIndex: '', headIcon: 'el-icon-edit-outline', label: '添加备注',},
          {clickIndex: 'delete', headIcon: 'el-icon-delete', label: '删除',},
        ];
        this.contextMenuParam(event);
      },
      //右键回调时间
      clickEvent (index) {
        this.openModalDialog(index);
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
      openModalDialog(index){
          switch (index){
            case 'dispatchDialog' :
                this.dispatchDialog = true;
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
          }
      },

      closeDispatch(){
        this.dispatchDialog = false;
      }
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .tableBottom {
    padding: 8px;
    display: flex;
    justify-content: flex-end;
  }
  .selectButton{
    color: #fff;
    background: #66b1ff;
  }
</style>
