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
        @row-dblclick="dblClickTable"
        style="width: 100%">
      <el-table-column
          prop="village_name"
          label="小区名称">
      </el-table-column>
      <el-table-column
          prop="city"
          label="所在城市">
      </el-table-column>
      <el-table-column
          prop="address"
          label="小区地址">
      </el-table-column>
      <el-table-column
          prop="houseType"
          label="户型">
      </el-table-column>
      <el-table-column
          prop="area"
          label="面积">
      </el-table-column>
      <el-table-column
          prop="decorate"
          label="装修">
      </el-table-column>
      <el-table-column
          label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 1" class="info_label">未添加</span>
          <span v-else-if="scope.row.status == 2"  class="success_label">已上线</span>
          <span v-else class="orange_label">已下架</span>
        </template>
      </el-table-column>
      <el-table-column
          prop="price"
          label="月单价">
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
    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists"
               :show="show" @clickOperate="clickEvent"></RightMenu>
    <houseUpdate :addWebInfoDialog="addWebInfoDialog" :houseId="undercarriageParams.house_id"
                 @close="closeModal"></houseUpdate>

    <HouseDetail :houseDetailDialog="houseDetailDialog" :all_dic="all_dic" :isOnlyPic="isOnlyPic"
                 :houseDetail="houseDetail" :houseId="house_id" @close="closeModal"></HouseDetail>
  </div>
</template>

<script>
  import RightMenu from '../../../common/rightMenu.vue'  //右键
  import houseUpdate from './houseUpdate'
  import HouseDetail from '../../../../components/rentManage/housesManage/components/houseDetail'
  export default {
    name: 'hello',
    props: {
      params: {
        type: Object,
        required: true,
      },
      search: {
        type: Boolean,
        required: true,
      }
    },
    components: {RightMenu,houseUpdate,HouseDetail},
    data() {
      return {
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],

        tableStatus: ' ',
        tableLoading: false,
        addWebInfoDialog: false,
        houseDetailDialog: false,
        tableData: [],
        totalNum: 0,
        undercarriageParams:{
          house_id : '',
          status : 3,
        },
        all_dic : [],
        isOnlyPic : false,
        houseDetail: {},
        house_id : '',
      }
    },
    mounted() {
      this.getTableData();
      this.getDictionary();
    },

    watch: {
      search(val) {
        this.getTableData();
      }
    },
    methods: {
      getDictionary() {
        this.$http.get(globalConfig.server + 'setting/dictionary/all').then((res) => {
          this.all_dic = res.data.data;
        })
      },
      getTableData() {
        this.tableStatus = ' ';
        this.tableLoading = true;
        this.$http.post(globalConfig.server+'api/v1/transfer',this.params).then((res)=>{
          this.tableLoading = false;
          if(res.data.code === '90012'){
            this.tableData = res.data.data.houses;
            this.totalNum = res.data.data.total;
            if(res.data.data.houses.length<1){
              this.tableStatus = '暂无数据';
            }
          }else {
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
      closeModal(val){
        this.addWebInfoDialog = false;
        this.houseDetailDialog = false;
        if(val){
          this.getTableData();
        }
      },
      dblClickTable(row, event){
        this.house_id = row.id;
        this.houseDetail = row;
        this.houseDetailDialog = true;
      },
      /*******************************************************************/
      handlerContextmenu(row, event) {
        this.undercarriageParams.house_id = row.id;
        this.lists = [
          // {clickIndex: 'upload', headIcon: 'el-icon-upload2', label: '上线'},
          {clickIndex: 'download', headIcon: 'el-icon-download', label: '下架'},
        ];
        this.contextMenuParam(event);
      },
      //右键回调时间
      clickEvent(index) {
        this.openModalDialog(index);
      },
      openModalDialog(index){
        switch (index){
          case 'download':
            this.$confirm('您确定下架吗, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.undercarriage();
            }).catch(() => {
              this.$notify({
                title:'提示',
                type: 'info',
                message: '已取消下架'
              });
            });
            break;
          case 'upload':
            this.addWebInfoDialog = true;
            break;
        }
      },
      undercarriage(){
        this.$http.post(globalConfig.server+'api/v1/transfer',this.undercarriageParams).then((res)=>{
          if(res.data.code === '90012'){
            this.$notify.success({
              title:'成功',
              message:res.data.msg,
            });
            this.getTableData()
          }else {
            this.$notify.warning({
              title:'警告',
              message:res.data.msg,
            })
          }
        })

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
  .info_label,.yellow_label,.orange_label,.red_label,.success_label{
    min-width: 70px;
    height: 28px;
    line-height: 28px;
  }
</style>
