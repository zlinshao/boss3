<template>
  <div>
    <el-table
      :data="tableData"
      :empty-text='emptyContent'
      v-loading="tableLoading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0)"
      @row-dblclick="dblClickTable"
      style="width: 100%">

      <el-table-column
        label="房屋地址">
        <template slot-scope="scope">
          <span v-if="scope.row.content.address">{{scope.row.content.address}}</span>
          <span v-else-if="scope.row.content.house && scope.row.content.house.name">{{scope.row.content.house.name}}</span>
          <span v-else="">/</span>
        </template>
      </el-table-column>
      <el-table-column
        label="报备类型">
        <template slot-scope="scope">
          <div v-if="scope.row.content">{{scope.row.content.bulletin_name}}</div>
          <div v-else="">/</div>
        </template>
      </el-table-column>
      <el-table-column
        label="审批状态">
        <template slot-scope="scope">
          <span v-if="scope.row.places">{{scope.row.places.display_name}}</span>
          <span v-else="">/</span>
        </template>
      </el-table-column>
      <el-table-column
        label="所属部门">
        <template slot-scope="scope">
          <span v-if="scope.row.content">{{scope.row.content.department_name}}</span>
          <span v-else="">/</span>
        </template>
      </el-table-column>
      <el-table-column
        label="报备人">
        <template slot-scope="scope">
          <span v-if="scope.row.user">{{scope.row.user.name}}</span>
          <span v-else="">/</span>
        </template>
      </el-table-column>
      <el-table-column
        label="报备时间">
        <template slot-scope="scope">
          <span v-if="scope.row.created_at">{{scope.row.created_at}}</span>
          <span v-else="">/</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        @current-change="currentChange"
        :current-page="reprotParams.page"
        :page-size="3"
        layout="total, prev, pager, next, jumper"
        :total="totalNumber">
      </el-pagination>
    </div>


    <el-dialog title="文件查看" :visible.sync="dialogFileVisible" :close-on-click-modal="false">
      <div class="scroll_bar">
        <img v-for="(val,key) in fileObject" :src="val[0].uri" data-magnify="" :data-src="val[0].uri">

      </div>
    </el-dialog>
    <ReportDetail :module="reportDetailDialog" :reportId="reportId" @close="closeModal"></ReportDetail>
  </div>
</template>

<script>
  import ReportDetail from '../../../reportManage/components/editReportDetail'
  export default {
    props:['houseId','activeName','all_dic',],
    components:{ReportDetail},
    data () {
      return {
        tableData:[],
        reprotParams:{
          limit:3,
          page:1,
        },
        totalNumber:0,
        emptyContent: '暂无数据',
        tableLoading: false,

        followId : '',
        fileObject :{},
        dialogFileVisible : false,
        reportDetailDialog:false,
        reportId : '',
      }
    },
    watch:{
      activeName(val){
        if(val === 'sixth'){
          if(this.houseId){
            this.reGetData();
          }else {
            this.emptyContent = '暂无数据';
            this.totalNumber = 0;
            this.tableData = [];
          }
        }
      },
      houseId(val){
        if(val){
          if(this.activeName  === 'sixth'){
            this.reGetData();

          }
        }else {
          this.emptyContent = '暂无数据';
          this.totalNumber = 0;
          this.tableData = [];
        }
      },
    },
    methods:{
      currentChange(val){
        this.reprotParams.page = val;
        this.getData();
      },
      matchDictionary(id) {
        let dictionary_name = null;
        this.all_dic.map((item) => {
          if (item.id == id) {
            dictionary_name = item.dictionary_name;
          }
        });
        return dictionary_name;
      },

      //房屋变化，重新从第一页开始请求数据
      reGetData(){
        this.reprotParams.page = 1;
        this.getData();
      },
      getData(){
        this.emptyContent = ' ';
        this.tableLoading = true;
        this.tableData = [];
        this.$http.get(globalConfig.server + 'workflow/process?house='+this.houseId,{params:this.reprotParams}).then((res) => {
          this.tableLoading = false;
          if(res.data.code === '20000'){
            this.tableData = res.data.data.data;
            this.totalNumber = res.data.data.count;
            if(res.data.data.data.length<1){
              this.emptyContent = '暂无数据';
              this.totalNumber = 0;
            }
          }else {
            this.emptyContent = '暂无数据';
            this.totalNumber = 0;
          }
        })
      },

      openModal(val){
        this.fileObject = val;
        this.dialogFileVisible = true;
      },

      dblClickTable(row, event){
        this.reportDetailDialog = true;
        this.reportId = row.id;
      },
      closeModal(){
        this.reportDetailDialog = false;
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .label {
    display: inline-block;
    width: 70px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 4px;
    color: #ffffff;
  }
  .success {
    background: #409EFF;
  }
  .yellow {
    background: #FFCC00
  }
  .orange {
    background: #FF9900
  }
  .red {
    background: #FF3900
  }
  img{
    width: 120px;
    height: 120px;
    border-radius: 8px;
    margin: 10px;
  }
</style>
