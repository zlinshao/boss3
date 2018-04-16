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
        <el-button size="mini" @click="selectStatus(5)" :class="selectFlag==5? 'selectButton':''">
          <i class="el-icons-fa-mail-forward"></i>&nbsp;丢失
        </el-button>
      </div>
    </div>
    <div class="filter" style="position: absolute; top: 112px; right: 20px;">
      <el-form :inline="true" onsubmit="return false" size="mini" class="demo-form-inline" style="display: flex;justify-content:flex-end ">
        <el-form-item>
          <el-input v-model="params.search" placeholder="编号" @keydown.enter.native="search">
            <el-button slot="append" type="primary" @click="search" icon="el-icon-search"></el-button>
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button v-show="selectFlag>1" type="primary" @click="createNewTask">创建任务</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="main">
      <!--//汇总-->
      <div v-show="selectFlag==1">
        <el-table
          :data="contractTotalData"
          @row-dblclick = 'showContractDetail'
          @row-contextmenu='openTotalMenu'
          style="width: 100%">
          <el-table-column
            prop="simple_staff.real_name"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="available_sum"
            label="剩余收据书">
          </el-table-column>
          <el-table-column
            prop="apply_sum"
            label="已领取收据数">
          </el-table-column>
          <el-table-column
            prop="invalidate_sum"
            label="已作废收据数">
          </el-table-column>
          <el-table-column
            prop="handin_sum"
            label="已上缴收据数">
          </el-table-column>
          <el-table-column
            prop="loss_sum"
            label="已丢失收据数">
          </el-table-column>
        </el-table>
      </div>
      <!--收据申领-->
      <div v-show="selectFlag==2">
        <el-table
          :data="contractApplyData"
          @row-dblclick = 'showContractDetail'
          @row-contextmenu='openApplyMenu'
          style="width: 100%">
          <el-table-column
            prop="report_time"
            label="领取时间">
          </el-table-column>
          <el-table-column
            prop="department_name"
            label="部门">
          </el-table-column>
          <el-table-column
            prop="staff_name"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="receipts_count"
            label="领取收据数">
          </el-table-column>
        </el-table>
      </div>

      <!--收据作废-->
      <div v-show="selectFlag==3">
        <el-table
          :data="contractCancelData"
          @row-dblclick = 'showContractDetail'
          @row-contextmenu='openCancelMenu'
          style="width: 100%">
          <el-table-column
            prop="report_time"
            label="作废时间">
          </el-table-column>
          <el-table-column
            prop="department_name"
            label="部门">
          </el-table-column>
          <el-table-column
            prop="staff_name"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="receipts_count"
            label="作废收据数">
          </el-table-column>
        </el-table>
      </div>

      <!--收据上缴-->
      <div v-show="selectFlag==4">
        <el-table
          :data="contractHandInData"
          @row-dblclick = 'showContractDetail'
          @row-contextmenu='openHandInMenu'
          style="width: 100%">
          <el-table-column
            prop="report_time"
            label="上缴时间">
          </el-table-column>
          <el-table-column
            prop="department_name"
            label="部门">
          </el-table-column>
          <el-table-column
            prop="staff_name"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="receipts_count"
            label="上缴收据数">
          </el-table-column>
        </el-table>
      </div>

      <!--收据丢失-->
      <div v-show="selectFlag==5">
        <el-table
          :data="contractLossData"
          @row-dblclick = 'showContractDetail'
          @row-contextmenu='openLossMenu'
          style="width: 100%">
          <el-table-column
            prop="report_time"
            label="丢失时间">
          </el-table-column>
          <el-table-column
            prop="department_name"
            label="部门">
          </el-table-column>
          <el-table-column
            prop="staff_name"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="receipts_count"
            label="丢失收据数">
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <div class="tableBottom">
        <div class="left">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="params.page"
            :page-size="12"
            layout="total, prev, pager, next, jumper"
            :total="totalNumbers">
          </el-pagination>
        </div>
      </div>
    </div>
    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperate="clickEvent"></RightMenu>

    <Organization :organizationDialog="organizationDialog" @close="closeModalCallback"></Organization>

    <Contact :contractDialog="contractDialog" :applyEditId_detail="applyEditId_detail" @close="closeModalCallback"></Contact>
    <ContactCancel :contractCancelDialog="contractCancelDialog" :cancelEditId_detail="cancelEditId_detail" @close="closeModalCallback"></ContactCancel>
    <ContactHandIn :contractHandInDialog="contractHandInDialog" :handInEditId_detail="handInEditId_detail" @close="closeModalCallback"></ContactHandIn>
    <ContactLoss :contractLossDialog="contractLossDialog" :lossEditId_detail="lossEditId_detail" @close="closeModalCallback"></ContactLoss>
    <ContactTotal :totalDialog="totalDialog" :totalId_detail="totalId_detail" @close="closeModalCallback"></ContactTotal>

    <CreateTask :selectFlag="selectFlag" :createTaskDialog="createTaskDialog" @close="closeModalCallback" @RefreshTask="RefreshTask"></CreateTask>

    <Dispatch :dispatchDialog="dispatchDialog" :dispatchObject="dispatchObject"
              :startOperate="startOperate" @close="closeModalCallback" @DispatchOK="DispatchOK"></Dispatch>

    <EditApply :editApplyDialog="editApplyDialog" :applyEditId="applyEditId"
               :startOperate="startApplyOperate" @close="closeModalCallback" @Refreshxx="refreshxx"></EditApply>

    <EditCancel :editCancelDialog="editCancelDialog" :cancelEditId="cancelEditId"
               :startOperate="startCancelOperate" @close="closeModalCallback" @Refreshxx="refreshxx"></EditCancel>

    <EditHandIn :editHandInDialog="editHandInDialog" :handInEditId="handInEditId"
               :startOperate="startHandInOperate" @close="closeModalCallback" @Refreshxx="refreshxx"></EditHandIn>

    <EditLoss :editlossDialog="editlossDialog" :lostEditId="lostEditId"
               :startOperate="startLossOperate" @close="closeModalCallback" @Refreshxx="refreshxx"></EditLoss>

  </div>
</template>

<script>
  import Organization from '../../../common/organization.vue'

  import Contact from './components/contractDetail.vue'
  import ContactCancel from './components/cancelDeatail.vue'
  import ContactHandIn from './components/handinDetail.vue'
  import ContactLoss from './components/lossDeatail.vue'
  import ContactTotal from './components/totalDetail.vue'

  import CreateTask from './components/createTask.vue'
  import RightMenu from '../../../common/rightMenu.vue'    //右键
  import Dispatch from './components/dispatch.vue'

  import EditApply from './components/editApply.vue'
  import EditCancel from './components/editCancel.vue'
  import EditHandIn from './components/editHandin.vue'
  import EditLoss from './components/editLoss.vue'


  export default {
    components:{Organization,Contact,CreateTask,RightMenu,Dispatch,
                EditApply,EditCancel,EditHandIn,ContactCancel,ContactHandIn,ContactTotal,ContactLoss,EditLoss},
    data () {
      return {
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],
        /***********/
        selectFlag:1,
        totalNumbers:0,
        params:{
          page:1,
          search:'',
          proof:'',
        },

        //***********************//
        organizationDialog:false,
        createTaskDialog : false,
        contractDialog: false,  //收据详情
        contractCancelDialog: false,  //收据详情
        contractHandInDialog: false,  //收据详情
        contractLossDialog:false,   //收据详情
        totalDialog: false,  //收据详情
        dispatchDialog:false,

        editApplyDialog:false,    //修改收据申领
        editCancelDialog:false,    //修改收据作废
        editHandInDialog:false,    //修改收据上缴
        editlossDialog: false,     //修改收据丢失
        contractTotalData:[],    //汇总列表列表数据
        contractApplyData:[],    //领取列表数据
        contractCancelData:[],    //作废列表数据
        contractHandInData:[],    //上缴列表数据
        contractLossData:[],    //丢失列表数据
        applyEditId:'',     //领取收据id
        cancelEditId:'',     //作废收据id
        handInEditId:'',     //上缴收据id
        lostEditId:'',      //丢失收据id
        startOperate:false,   //开始操作
        startHandInOperate:false,   //开始操作
        startCancelOperate:false,   //开始操作
        startApplyOperate:false,   //开始操作
        startLossOperate:false,   //开始操作
        showDetail:false,         //查看详情
        dispatchObject:{},
        //详情
        applyEditId_detail : '',
        cancelEditId_detail : '',
        handInEditId_detail : '',
        lossEditId_detail : '',
        totalId_detail : '',
      }
    },
    watch:{
      selectFlag(val){
        this.params.page = 1;
        if(val ===2){
          this.getApplyList();
        }else if(val === 3){
          this.getCancelList();
        }else if(val === 4){
          this.getHandInList();
        }else if(val === 1){
          this.getTotalList();
        }else if(val === 5){
          this.getLossList();
        }
      },
    },
    mounted(){
      this.getTotalList();
    },
    methods:{
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },

      handleCurrentChange(val) {
        this.params.page = val;
        if(this.selectFlag ===2){
          this.getApplyList();
        }else if(this.selectFlag === 3){
          this.getCancelList();
        }else if(this.selectFlag === 4){
          this.getHandInList();
        }else if(this.selectFlag === 1){
          this.getTotalList();
        }
        else if(this.selectFlag === 5){
          this.getLossList();
        }
      },

      search(){
        this.params.page = 1;
        if(this.selectFlag ===2){
          this.getApplyList();
        }else if(this.selectFlag === 3){
          this.getCancelList();
        }else if(this.selectFlag === 4){
          this.getHandInList();
        }else if(this.selectFlag === 1){
          this.getTotalList();
        }else if(this.selectFlag === 5){
          this.getLossList();
        }
      },
      selectStatus(flag){
        this.selectFlag = flag;
      },

      //************************右键操作项*****************************
      openTotalMenu(row, event){
        this.dispatchObject = row;
        this.lists = [
          {clickIndex: 'dispatchApply', headIcon: 'el-icon-menu', label: '分配',},
//          {clickIndex: 'editApply', headIcon: 'el-icon-edit', label: '修改',},
//          {clickIndex: 'addRemarkApply', headIcon: 'el-icon-edit-outline', label: '添加备注',},
//          {clickIndex: 'deleteApply', headIcon: 'el-icon-delete', label: '删除',},
        ];
        this.contextMenuParam(event);
      },

      openApplyMenu(row, event){
        this.applyEditId = row.id;
//        this.dispatchObject = row;
        this.lists = [
//          {clickIndex: 'dispatchApply', headIcon: 'el-icon-menu', label: '分配',},
          {clickIndex: 'editApply', headIcon: 'el-icon-edit', label: '修改',},
//          {clickIndex: 'addRemarkApply', headIcon: 'el-icon-edit-outline', label: '添加备注',},
          // {clickIndex: 'deleteApply', headIcon: 'el-icon-delete', label: '删除',},
        ];
        this.contextMenuParam(event);
      },

      openCancelMenu(row, event){
        this.cancelEditId = row.id;
        this.lists = [
          {clickIndex: 'editCancel', headIcon: 'el-icon-edit', label: '修改',},
//          {clickIndex: 'deleteCancel', headIcon: 'el-icon-delete', label: '删除',},
        ];
        this.contextMenuParam(event);
      },

      openHandInMenu(row,event){
        this.handInEditId = row.id;
        this.lists = [
          {clickIndex: 'editHandIn', headIcon: 'el-icon-edit', label: '修改',},
//          {clickIndex: 'deleteHandIn', headIcon: 'el-icon-delete', label: '删除',},
        ];
        this.contextMenuParam(event);
      },

      openLossMenu(row,event){
        this.lostEditId = row.id;
         this.lists = [
          {clickIndex: 'editLoss', headIcon: 'el-icon-edit', label: '修改',},
//          {clickIndex: 'deleteHandIn', headIcon: 'el-icon-delete', label: '删除',},
        ];
        this.contextMenuParam(event);
      },

      //右键回调时间
      clickEvent (index) {
        this.applyMenuCallback(index);
      },

      applyMenuCallback(index){
          switch (index){
            case 'editApply' :
              this.startApplyOperate = true;
              this.editApplyDialog = true;
              break;
            case 'dispatchApply' :
                this.startOperate = true;
                this.dispatchDialog = true;
                break;
            case 'deleteApply':
              this.$confirm('您确定将其删除吗', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.deleteApplyContract();
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消删除'
                });
              });
              break;
            case 'editCancel' :
              this.startCancelOperate = true;
              this.editCancelDialog = true;
              break;
            case 'editHandIn' :
              this.startHandInOperate = true;
              this.editHandInDialog = true;
              break;
            case 'editLoss' :
            this.startLossOperate =true;
            this.editlossDialog = true;
          }
      },



      openOrganizationModal(){
        this.organizationDialog = true
      },
      //显示收据详情
      showContractDetail(row,event){
        if(this.selectFlag ===2){
          this.contractDialog = true;
          this.applyEditId_detail = row.id;
        }else if(this.selectFlag === 3){
           this.cancelEditId_detail = row.id;
           this.contractCancelDialog = true;
        }else if(this.selectFlag === 4){
          this.handInEditId_detail = row.id;
          this.contractHandInDialog = true;
        }else if(this.selectFlag === 1){
          this.totalId_detail = row.staff_id;
          this.totalDialog = true;
        }else if(this.selectFlag === 5){
          this.lossEditId_detail = row.id;
          this.contractLossDialog = true;
        }
      },

      createNewTask(){
        this.createTaskDialog = true;
      },


      //****************************汇总***************************//


      getTotalList(){
        this.$http.get(globalConfig.server+'receipt/mission',{params:this.params}).then((res) => {
          if(res.data.code === '21000'){
            this.contractTotalData = res.data.data.data;
            this.totalNumbers =res.data.data.count;
          }else {
            this.contractTotalData =[];
            this.totalNumbers =0;
          }
        })
      },


      //****************************收据申领***********************//


      //修改收据相关回调
      closeModalCallback(val){
        this.startOperate = false;
        this.startApplyOperate = false;
        this.startHandInOperate = false;
        this.startCancelOperate = false;
        this.startLossOperate = false;

        this.editApplyDialog = false;
        this.editCancelDialog = false;
        this.editHandInDialog = false;
        this.editlossDialog = false;
        this.organizationDialog = false;
        this.contractDialog = false;
        this.contractCancelDialog = false;
        this.contractHandInDialog = false;
        this.contractLossDialog = false;
        this.totalDialog = false;
        this.createTaskDialog = false;
        this.dispatchDialog = false;

        if(val === 'success'){
          this.search();
        }
      },
      refreshxx(val){
          if(val === 1){
            this.getApplyList();
          }else if(val === 2){
            this.getCancelList();
          }else if(val === 3){
           this.getHandInList();
          }else if(val === 4){
            this.getLossList();
          }else {
             this.getTotalList();
          }
      },
      RefreshTask(val){

          if(val === 1){
            this.getApplyList();
          }else if(val === 2){
            this.getCancelList();
          }else if(val === 3){
           this.getHandInList();
          }else if(val === 4){
            this.getLossList();
          }else {
             this.getTotalList();
          }

      },
      //分配成功后页面刷新
      DispatchOK(val){
        this.getTotalList();
      },
      getApplyList(){
        this.$http.get(globalConfig.server+'receipt/apply',{params:this.params}).then((res) => {
          if(res.data.code === '21000'){
            this.contractApplyData = res.data.data.data;
            this.totalNumbers =res.data.data.count;
          }else {
            this.contractApplyData =[];
            this.totalNumbers =0;
          }
        })
      },

      deleteApplyContract(){
        this.$http.post(globalConfig.server+'contract/apply/delete/'+this.applyEditId).then((res) => {
          if(res.data.code === '20010'){
            this.search();
          }else {
            this.$notify.warning({
              title: '警告',
              message: res.data.msg,
            });
          }
        })
      },
      //****************************收据作废***********************//
      getCancelList(){
        this.$http.get(globalConfig.server+'receipt/invalidate',{params:this.params}).then((res) => {
          if(res.data.code === '21000'){
            this.contractCancelData = res.data.data.data;
            this.totalNumbers =res.data.data.count;
          }else {
            this.contractCancelData =[];
            this.totalNumbers =0;
          }
        })
      },

      //***************************收据上缴**************************//

      getHandInList(){
        this.$http.get(globalConfig.server+'receipt/handin',{params:this.params}).then((res) => {
          if(res.data.code === '21000'){
            this.contractHandInData = res.data.data.data;
            this.totalNumbers =res.data.data.count;
          }else {
            this.contractHandInData =[];
            this.totalNumbers =0;
          }
        })
      },

      //***************************收据丢失**************************//

      getLossList(){
        this.$http.get(globalConfig.server+'receipt/loss',{params:this.params}).then((res) => {
          if(res.data.code === '21000'){
            this.contractLossData = res.data.data.data;
            this.totalNumbers =res.data.data.count;
          }else {
            this.contractLossData =[];
            this.totalNumbers =0;
          }
        })
      },

      ///***********************************************************//
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
