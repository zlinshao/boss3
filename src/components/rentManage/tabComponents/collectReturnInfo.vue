<template>
  <div @click="show=false" @contextmenu="closeMenu">
    <el-table
      :data="tableData"
      :empty-text='emptyContent'
      v-loading="tableLoading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0)"
      @row-contextmenu='houseMenu'
      @row-dblclick = 'dblClickTable'
      style="width: 100%">

      <el-table-column
        label="合同编号">
        <template slot-scope="scope">
                    <span v-if="scope.row.contract_id && scope.row.contract_id.constructor === Object">
                      {{scope.row.contract_id.contract_number}}
                    </span>
          <span v-else="">/</span>
        </template>
      </el-table-column>
      <el-table-column
        label="房屋地址">
        <template slot-scope="scope">
                    <span v-if="scope.row.contract_id && scope.row.contract_id.constructor === Object
                          &&scope.row.contract_id.house">
                      {{scope.row.contract_id.house.name}}
                    </span>
          <span v-else="">/</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="check_time"
        label="退房时间">
      </el-table-column>
      <el-table-column
        prop="check_types"
        label="退房性质">
      </el-table-column>
      <el-table-column
        label="总费用">
        <template slot-scope="scope">
                    <span v-if="scope.row.details && scope.row.details.total_fees">
                      {{scope.row.details.total_fees}}
                    </span>
          <span v-else="">/</span>
        </template>
      </el-table-column>
      <el-table-column
        label="应退费用">
        <template slot-scope="scope">
                    <span v-if="scope.row.details&&scope.row.details.should_be_returned_fees">
                      {{scope.row.details.should_be_returned_fees}}
                    </span>
          <span v-else="">/</span>
        </template>
      </el-table-column>
      <el-table-column
        label="能源费用">
        <template slot-scope="scope">
                    <span v-if="scope.row.details&&scope.row.details.deduct_energy_fees">
                      {{scope.row.details.deduct_energy_fees}}
                    </span>
          <span v-else="">/</span>
        </template>
      </el-table-column>
      <el-table-column
        label="其他费用">
        <template slot-scope="scope">
                    <span v-if="scope.row.details&&scope.row.details.others_fees">
                      {{scope.row.details.others_fees}}
                    </span>
          <span v-else="">/</span>
        </template>
      </el-table-column>

      <el-table-column
        label="结算人">
        <template slot-scope="scope">
          <span v-if="scope.row.creators&&scope.row.creators.name">{{scope.row.creators.name}}</span>
          <span v-else="">/</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作人">
        <template slot-scope="scope">
          <span v-if="scope.row.settlers&&scope.row.settlers.name">{{scope.row.settlers.name}}</span>
          <span v-else="">/</span>
        </template>
      </el-table-column>
      <el-table-column
        label="退租状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 2">已退租</span>
          <el-button size="mini" type="primary" v-else="" @click="check_out(scope.row.id)">退租中</el-button>
        </template>
      </el-table-column>

    </el-table>

    <div class="pagination">
      <el-pagination
        @current-change="currentChange"
        :current-page="params.pages"
        :page-size="3"
        layout="total, prev, pager, next, jumper"
        :total="totalNumber">
      </el-pagination>
    </div>
    <EditCollectVacation :editCollectVacation="editCollectVacation" :vacationId="vacationId" @close="closeModal"></EditCollectVacation>
    <VacationDetail :vacationDetail="vacationDetail" :vacationId="vacationId" @close="closeModal"></VacationDetail>
    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperate="clickEvent"></RightMenu>
  </div>
</template>

<script>
  import EditCollectVacation from './components/editVacation.vue'
  import RightMenu from '../../common/rightMenu.vue'
  import VacationDetail from './components/vacationDetail.vue'
  export default {
    props: ['collectContractId', 'activeName'],
    components: {EditCollectVacation, VacationDetail,RightMenu},
    data () {
      return {
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],
        /***********/
        tableData: [],
        params: {
          limit: 3,
          page: 1,
          module:1,
          contract_id: '',
        },
        totalNumber: 0,
        editId: '',      //编辑id
        isRequestData: false,
        emptyContent: '暂无数据',
        tableLoading: false,
        editCollectVacation: false,
        vacationDetail: false,
        vacationId : '',
      }
    },
    mounted(){

    },
    watch: {
      collectContractId(val){
        this.params.contract_id = val;
        this.isRequestData = false;
        if (this.activeName === 'CollectReturnRomeInfoTab') {
          this.getData();
          this.isRequestData = true;
        }
      },
      activeName(val){
        if (val === 'CollectReturnRomeInfoTab' && this.collectContractId) {
          this.getData();
          this.isRequestData = true;
        }
      }
    },
    methods: {
      getData(){
        this.tableLoading = true;
        this.emptyContent = ' ';
        this.tableData = [];
        this.$http.get(globalConfig.server + 'customer/check_out', {params: this.params}).then((res) => {
          this.tableLoading = false;
          if (res.data.code === '20000') {
            this.tableData = res.data.data.data;
            this.totalNumber = res.data.data.count;
          } else {
            this.tableData = [];
            this.totalNumber = 0;
            this.emptyContent = '暂无数据';
          }
        })
      },
      currentChange(val){
        this.params.page = val;
        this.getData();
      },
      check_out(id){
        this.$confirm('结算后将不可撤回, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.put(globalConfig.server + 'customer/check_out/status/' + id).then((res) => {
            if (res.data.code === '20060') {
              this.$notify.success({
                title: '成功',
                message: res.data.msg,
              });
              this.getData();
            }
          })
        }).catch(() => {
          this.$notify.success({
            title: '消息',
            message: '已取消结算',
          })
        });

      },

      closeModal(val){
        this.editCollectVacation = false;
        this.vacationDetail = false;
        if(val === 'success'){
            this.getData();
        }
      },


      //房屋右键
      houseMenu(row, event){
        this.vacationId = row.id;
        this.lists = [
          {clickIndex: 'edit', headIcon: 'el-icon-edit', label: '修改',},
        ];
        this.contextMenuParam(event);
      },
      dblClickTable(row){
        this.vacationId = row.id;
        this.vacationDetail = true;
      },
      //右键回调事件
      clickEvent (index) {
        switch (index) {
          case 'edit' :
            this.editCollectVacation = true;
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
