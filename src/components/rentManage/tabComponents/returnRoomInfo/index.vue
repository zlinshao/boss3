<template>
    <div  @click="show=false" @contextmenu="closeMenu">
      <el-table
        :data="rentingData"
        @row-contextmenu='showContextMenu'
        style="width: 100%">
        <el-table-column
          prop="check_time"
          label="退/换房时间">
        </el-table-column>
        <el-table-column
          prop="check_types"
          label="退/换房状态">
        </el-table-column>
        <el-table-column
          prop="house_type"
          label="退/换房方">
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="合同开始时间">
        </el-table-column>
        <el-table-column
          prop="price"
          label="合同结束时间">
        </el-table-column>
        <el-table-column
          prop="pay_type"
          label="结算详情">
        </el-table-column>
        <el-table-column
          prop="vacancy"
          label="应退费用">
        </el-table-column>
        <el-table-column
          prop="contract_year"
          label="扣款金额">
        </el-table-column>
        <el-table-column
          prop="start_time"
          label="实际退款">
        </el-table-column>
        <el-table-column
          prop="start_time"
          label="退租状态">
        </el-table-column>
        <el-table-column
          prop="start_time"
          label="结算人">
        </el-table-column>
        <el-table-column
          prop="start_time"
          label="操作人">
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
      <!--<RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"-->
                 <!--@clickOperate="clickEvent"></RightMenu>-->
      <EditRentChange :editRentChangeDialog="editRentChangeDialog" @close="closeModal"></EditRentChange>
    </div>
</template>

<script>
  import RightMenu from '../../../common/rightMenu.vue'    //右键
  import EditRentChange from './components/editRentChange.vue'
    export default {
      components:{RightMenu,EditRentChange},
      props:['collectContractId','activeName'],
      data () {
          return {
            rightMenuX: 0,
            rightMenuY: 0,
            show: false,
            lists: [],
            /***********/
            editRentChangeDialog:false,
            rentingData:[],
            params:{
              limit:3,
              page:1,
              contract_id : '',
            },
            totalNumber:0,
            editId:'',      //编辑id
            isRequestData : false,
          }
      },
      mounted(){

      },
      watch:{
        collectContractId(val){
          this.params.contract_id = val;
          this.isRequestData = false;
          if(this.activeName === 'CollectReturnRomeInfoTab'){
            this.getData();
            this.isRequestData = true;
          }
        },
        activeName(val){
          if(!this.isRequestData && val=== 'CollectReturnRomeInfoTab' && this.collectContractId){
            this.getData();
            this.isRequestData = true;
          }
        }
      },
      methods:{
        getData(){
          this.$http.get(globalConfig.server+'customer/check_out',{params:this.params}).then((res) => {
              if(res.data.code === '20000'){
                this.rentingData = res.data.data.data;
                this.totalNumber = res.data.data.count;
              }else {
                this.rentingData = [];
                this.totalNumber = 0;
              }
          })
        },
        currentChange(val){
          this.params.page = val;
          this.getData();
        },
        openModalDialog(index){
          if(index === 'edit'){
              this.editRentChangeDialog = true;
          }
        },
        closeModal(){
          this.editRentChangeDialog = false;
        },

        /***********************右键************************/
        //合同表头右键
        showContextMenu(row, event){
          this.editId = row.id;
          this.lists = [
            {clickIndex: 'edit', headIcon: 'el-icon-edit', label: '修改',},
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
//        console.log(this.rightMenuX,this.rightMenuY)
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
