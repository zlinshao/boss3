<template>
  <div @click="show=false" @contextmenu="closeMenu">
    <el-table
      :empty-text = 'emptyContent'
      v-loading="tableLoading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0)"
      :data="tableData"
      @row-dblclick="dblClickTable"
      @row-contextmenu='houseMenu'
      style="width: 100%">
      <el-table-column
        prop="create_time"
        label="创建时间">
      </el-table-column>
      <el-table-column
        label="房屋地址">
        <template slot-scope="scope">
            <span v-if="scope.row.construct">
              <span v-if="scope.row.construct.house">
                {{scope.row.construct.house.name}}
              </span>
            </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="events"
        label="事件数">
      </el-table-column>
      <el-table-column
        prop="matters"
        label="跟进事项">
      </el-table-column>
      <el-table-column
        prop="expected_finish_time"
        label="预计完成时间">
      </el-table-column>
      <el-table-column
        prop="creator"
        label="创建人">
      </el-table-column>
      <el-table-column
        prop="follow"
        label="跟进人">
      </el-table-column>
      <el-table-column
        prop="follow_statuss"
        label="跟进状态">
      </el-table-column>
    </el-table>

    <div class="pagination">
      <el-pagination
        @current-change="currentChange"
        :current-page="params.page"
        :page-size="3"
        layout="total, prev, pager, next, jumper"
        :total="totalNumber">
      </el-pagination>
    </div>
    <OrderDetail :orderDetailDialog="orderDetailDialog" :activeId="activeId" :startDetail="startDetail" @close="closeModal"></OrderDetail>

    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperate="clickEvent"></RightMenu>
    <AddChildTask :addChildTaskDialog="addChildTaskDialog" :activeId="activeId" :startAddResult="startEdit" @close="closeModal"></AddChildTask>
  </div>
</template>

<script>
  import OrderDetail from '../datumMessage/workOrderManage/components/workOrderDetail.vue'
  import RightMenu from '../../common/rightMenu.vue'
  import AddChildTask from '../datumMessage/workOrderManage/components/addChildTask.vue'
  export default {
    props:['rentContractId','activeName','tabStatusChange'],
    components: {OrderDetail,RightMenu,AddChildTask},
    data () {
      return {
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],
        /***********/
        tableData:[],
        params: {
          pages: 1,
          limit: 3,
          module:2,
          contract_id : ''
        },
        totalNumber:0,
        activeId : '',
        startDetail : false,
        orderDetailDialog : false,
        addChildTaskDialog :false,
        startEdit :false,

        isRequestData : false,
        emptyContent : '暂无数据',
        tableLoading : false,
      }
    },
    watch:{
      rentContractId(val){
        this.params.contract_id = val;
        this.isRequestData = false;
        if(this.activeName === 'RentFollowRecordTab'){
          if(val){
            this.getData();
            this.isRequestData = true;
          }else {
            this.tableData = [];
          }
        }
      },
      activeName(val){
        if(!this.isRequestData && val=== 'RentFollowRecordTab' && this.rentContractId){
          if(this.rentContractId){
            this.getData();
            this.isRequestData = true;
          }else {
            this.tableData = [];
          }
        }
      },
      tabStatusChange(val){
        if(val=== 'workOrder'){
          this.getData();
        }
      }
    },
    methods:{
      getData(){
        this.tableLoading = true;
        this.emptyContent = ' ';
        this.$http.get(globalConfig.server+'customer/work_order',{params:this.params}).then((res) => {
          this.tableLoading = false;
          if(res.data.code === '100200'){
            this.tableData = res.data.data.data;
            this.totalNumber = res.data.data.count;
          }else {
            this.tableData = [];
            this.totalNumber = 0;
            this.emptyContent = '暂无数据';
          }
        })
      },
      currentChange(val) {
        this.params.page = val;
        this.getData();
      } ,
      dblClickTable(row, event){
        this.activeId = row.id;
        this.startDetail = true;
        this.orderDetailDialog = true;
      },
      closeModal(){
        this.orderDetailDialog = false;
        this.startDetail = false;
        this.addChildTaskDialog = false;
      },

      //房屋右键
      houseMenu(row, event){
        this.activeId = row.id;
        this.lists = [
//          {clickIndex: 'edit', headIcon: 'el-icon-edit', label: '修改',},
          {clickIndex: 'addChildren', headIcon: 'el-icon-plus', label: '添加子任务',},
        ];
        this.contextMenuParam(event);
      },
      //右键回调事件
      clickEvent (index) {
        switch (index){
          case 'addChildren' :
            this.addChildTaskDialog = true;
            this.startEdit = true;
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
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
