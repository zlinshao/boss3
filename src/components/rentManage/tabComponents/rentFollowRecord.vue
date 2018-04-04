<template>
  <div>
    <el-table
      :data="tableData"
      @row-dblclick="dblClickTable"
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
        prop="child_count"
        label="事件数">
      </el-table-column>
      <el-table-column
        prop="child.length"
        label="包含跟进项">
      </el-table-column>
      <el-table-column
        prop="expected_finish_time"
        label="预计完成时间">
      </el-table-column>
      <el-table-column
        prop="creator_id"
        label="创建人">
      </el-table-column>
      <el-table-column
        prop="follow_id"
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
  </div>
</template>

<script>
  import OrderDetail from '../datumMessage/workOrderManage/components/workOrderDetail.vue'
  export default {
    props:['rentContractId','activeName'],
    components: {OrderDetail},
    data () {
      return {
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

        isRequestData : false,
      }
    },
    watch:{
      rentContractId(val){
        this.params.contract_id = val;
        this.isRequestData = false;
        if(this.activeName === 'RentFollowRecordTab'){
          this.getData();
          this.isRequestData = true;
        }
      },
      activeName(val){
        if(!this.isRequestData && val=== 'RentFollowRecordTab' && this.rentContractId){
          this.getData();
          this.isRequestData = true;
        }
      }
    },
    methods:{
      getData(){
        this.$http.get(globalConfig.server+'customer/work_order',{params:this.params}).then((res) => {
          if(res.data.code === '10000'){
            this.tableData = res.data.data.data;
            this.totalNumber = res.data.data.count;
          }else {
            this.tableData = [];
            this.totalNumber = 0;
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
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
