<template>
  <div @click="show=false" @contextmenu="closeMenu">
    <el-table
      :data="tableData"
      :empty-text='tableStatus'
      v-loading="tableLoading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(255, 255, 255, 0)"
      @row-contextmenu='handlerContextmenu'
      style="width: 100%">
      <el-table-column label="提交时间">
        <template slot-scope="scope">
          {{scope.row.add_time}}
        </template>
      </el-table-column>
      <el-table-column
          prop="name"
          label="联系人">
      </el-table-column>
      <el-table-column
          prop="phone"
          label="联系电话">
      </el-table-column>

      <el-table-column
          prop="city"
          label="找房城市">
      </el-table-column>
      <el-table-column
          prop="addr"
          label="找房地址">
      </el-table-column>
      <el-table-column
          prop="condition"
          label="找房条件">
      </el-table-column>
      <el-table-column
          prop="state"
          label="申请状态">
      </el-table-column>
      <el-table-column
          prop="boss_user_name"
          label="负责人">
      </el-table-column>
      <el-table-column
          prop="visit_status"
          label="回访状态">
      </el-table-column>
      <el-table-column
          prop="remark"
          label="备注">
      </el-table-column>
    </el-table>
    <div class="block pages">
      <div>
        <el-pagination
            @current-change="handleCurrentChange"
            :current-page="params.page"
            :page-size="10"
            layout="total, prev, pager, next, jumper"
            :total="totalNum">
        </el-pagination>
      </div>
    </div>
    <!--模态-->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <div>
        <el-form size="small" :model="params" label-width="100px">
          <el-form-item label="审核状态">
            <el-select v-model="editParams.state" clearable placeholder="请选择">
              <el-option value="1" label="审核中">审核中</el-option>
              <el-option value="2" label="已受理">已受理</el-option>
              <el-option value="3" label="已失效">已失效</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="回访状态">
            <el-select v-model="editParams.visitStatus" clearable placeholder="请选择">
              <el-option value="0" label="未回访">未回访</el-option>
              <el-option value="1" label="已回访">已回访</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="负责人">
            <el-input v-model="editParams.bossUserName" @focus="openModal" readonly></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" v-model="editParams.remark"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmEdit">确 定</el-button>
      </span>
    </el-dialog>

    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists"
               :show="show" @clickOperate="clickEvent"></RightMenu>
    <Organization :organizationDialog="organizationDialog" :type="type" :length="length"
                  @close="closeModal" @selectMember="selectMember"></Organization>
  </div>
</template>

<script>
  import RightMenu from '../../../common/rightMenu.vue'                                //右键
  import Organization from '../../../common/organization.vue';
  export default {
    name: 'hello',
    props: {
      params: {
        type: Object,
        required: true,
      },
      search : {
        type:Boolean,
        required:true,
      }
    },
    components: {RightMenu,Organization},
    data() {
      return {
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],
        /***********/
        organizationDialog : false,
        type : '',
        length : '',
        tableStatus: ' ',
        tableLoading: false,
        tableData: [],
        totalNum: 0,
        dialogVisible:false,
        editParams : {
          state : '',
          orderId : '',
          visitStatus : '',
          remark : '',
          bossUserId : '',
          bossUserName : '',
        },
        state : {
          '审核中' : '1',
          '已受理' : '2',
          '已失效' : '3',
        },
        visitStatus : {
          '未回访':'0',
          '已回访':'1'
        },
      }
    },
    mounted() {
      this.getTableData();
    },
    watch:{
      search(val){
        this.getTableData();
      }
    },
    methods: {
      getTableData() {
        this.tableStatus = ' ';
        this.tableLoading = true;
        this.$http.get(globalConfig.server+'api/client/search-house-orders',{params:this.params}).then((res)=>{
          this.tableLoading = false;
          if (res.data.code === '1100200') {
            this.tableData = res.data.data.list;
            this.totalNum = res.data.data.count;
            if (res.data.data.list.length < 1) {
              this.tableStatus = '暂无数据';
            }
          } else {
            this.tableStatus = '暂无数据';
            this.tableData = [];
            this.totalNum = 0;
          }
        })
      },

      handleCurrentChange(val) {
        this.params.page = val;
        this.getTableData();
      },
      openModal(){
        [this.type,this.length] = ['staff',1];
        this.organizationDialog = true;
      },
      closeModal(){
        this.organizationDialog = false;
      },
      selectMember(val){
        this.editParams.bossUserId = val[0].id;
        this.editParams.bossUserName = val[0].name;
      },
      confirmEdit(){
        this.$http.post(globalConfig.server+'api/client/search-house-order-edit',this.editParams).then((res)=>{
          if(res.data.code === '1100200'){
            this.$notify.success({
              title:'成功',
              message:res.data.msg
            });
            this.dialogVisible = false;
            this.getTableData();
          }else {
            this.$notify.warning({
              title:'警告',
              message:res.data.msg
            })
          }
        })
      },
      /*******************************************************************/
      handlerContextmenu(row, event) {
        this.editParams.state = this.state[row.state];
        this.editParams.orderId = row.id;
        this.editParams.visitStatus = this.visitStatus[row.visit_status];
        this.editParams.remark = row.remark;
        this.editParams.bossUserId = row.boss_user_id;
        this.editParams.bossUserName = row.boss_user_name;
        this.lists = [
          {clickIndex: 'editRentInfoDialog', headIcon: 'el-icon-edit', label: '修改'},
        ];
        this.contextMenuParam(event);
      },
      //右键回调时间
      clickEvent(index) {
        // this.openModalDialog(index);
        this.dialogVisible = true;
      },
      //关闭右键菜单
      closeMenu() {
        this.show = false;
      },
      //右键参数
      contextMenuParam(event) {
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
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
