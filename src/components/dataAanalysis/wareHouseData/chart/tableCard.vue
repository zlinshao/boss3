<template>
<!-- 表格卡片 -->
  <div ref="chartId" id="chartTable">
    <el-table
      v-for="(item,index) in tableTh"
      :key="index"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(255, 255, 255, 0.8)"
      v-if="chartData.name==item.name"
      @click.native ="showDetailChartDialog"
      class="comTable"
      :data="tableData"
      :height="chartStyle.height-40"
      size='mini'
      border
      :highlight-current-row='true'
      :cellStyle='colstyle'
      :header-cell-style='headerrowstyle'
      style="width: 100%">

      <el-table-column
        v-for="(val,index) in item.thData"
        :key="index"
        :prop="val.prop"
        :label="val.label">
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      small
      style="text-align:center"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20]"
      :page-size="currentlimit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalPage">
    </el-pagination>
    <!-- 弹出框 -->
    <el-dialog
      id="detailChartDialog"
      custom-class="detailDia"
      :show-close="false"
      :visible.sync="detaildialogVisible"
      width="65%"
      >
      <div>
        <!-- {{chartData}} -->
        <div class="detailMsgHead">
          <div>
            <i class="el-icon-arrow-left" @click="detaildialogVisible=false"></i>
            <span>{{chartData.name}}</span>
          </div>
          <toprightcontrol
            :cardData="chartData"
            :btnstatus="btnstatus" >
          </toprightcontrol>
        </div>
        <div class="detailcontent">
          <div class="contentTop">

            <el-row :gutter="20">
              <el-col :span="4">
                <div class="detailSelect">
                  <!-- 城市 -->
                  <el-select v-model="placeForm.city" clearable placeholder="城市" size="small" @change="choose('city',placeForm.city)">
                    <el-option
                      v-for="item in cityOption"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </div>
              </el-col>
              <el-col :span="4">
                <!-- 区域 -->
                <div class="detailSelect">
                  <el-select v-model="placeForm.area" clearable :disabled="placeForm.city?false:true" placeholder="区域" size="small" @change="choose('area',placeForm.area)">
                    <el-option
                      v-for="item in areaOption"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </div>
              </el-col>
              <el-col :span="4">
                <!-- 片区 -->
                <div class="detailSelect">
                  <el-select v-model="placeForm.group" clearable :disabled="placeForm.area?false:true" placeholder="片区" size="small" >
                    <el-option
                      v-for="item in groupOption"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </div>
              </el-col>
                <!-- 开始日期 -->
              <el-col :span="8">
                <div class="detailSelect" >
                  <el-date-picker
                    size="small"
                    v-model="selectDate"
                    :picker-options="pickerOptions"
                    unlink-panels
                    type="daterange"
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="detailSelect">
                  <el-button type="primary" size="small" @click="changChart('dialog')">查询</el-button>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="content">
            <el-table
              v-for="(item,index) in tableTh"
              :key="index"
              v-if="chartData.name==item.name"
              class="comTable"
              :data="tableDataDia"
              height="450"
              size='mini'
              border
              :highlight-current-row='true'
              :cellStyle='colstyle'
              :header-cell-style='headerrowstyle'
              style="width: 100%"
              v-loading="loadingDia"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(255, 255, 255, 0.8)"
              >
              <el-table-column
                v-for="(val,index) in item.thData"
                :key="index"
                :prop="val.prop"
                :label="val.label">
              </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination
              small
              style="text-align:center"
              @size-change="handleSizeChangeDia"
              @current-change="handleCurrentChangeDia"
              :current-page="currentPageDia"
              :page-sizes="[10, 15 ,20]"
              :page-size="currentlimitDia"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalPageDia">
            </el-pagination>
          </div>
        </div>
      </div>
    </el-dialog>

  </div>
</template>
<script>
  import toprightcontrol from "../../cockpit//components/toprightControl.vue"
  export default {
    name:"tableCard",
    components:{toprightcontrol},
    props:['chartData','status','chartStyle'],
    data(){
      return {
        currentPage:1, //当前页
        currentlimit:5,//选择条数
        totalPage:1, //总页数
        currentPageDia:1, //当前页
        currentlimitDia:10,//选择条数
        totalPageDia:1, //总页数
        detaildialogVisible:false, //模态窗状态
        loading:true,
        loadingDia:true,
        tableData: [],//表格数据
        tableDataDia: [],//表格数据
        toprightStatus:false,
        btnstatus:{
          large:false,//放大和添加按钮SH
          delete:false,//删除按钮
          hidemetter:false,//隐藏新建
          hideAdd:true//隐藏添加
        },
        dataParams:{   //传参
          city:"",
          area:"",
          group:"",
          start_date:"",
          end_date:"",
          page: 1,
          limit:5
        },
        diaParams:{
          city:"",
          area:"",
          group:"",
          start_date:"",
          end_date:"",
          page: 1,
          limit:10
        },
        tableTh:[],//表头数据
        selectDate:['2018-11-11'],
        cityOption:[],
        areaOption:[],
        groupOption:[],
        placeForm:{
          city: '',
          area: '',
          group:''
        },
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [ {
            text: '一周前',
            onClick(picker) {
              const start = new Date();
              const end = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          },{
            text: '一个月前',
            onClick(picker) {
              const start = new Date();
              const end = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          },
          ]
        },
      }
    },
    methods:{
      colstyle({row, column, rowIndex, columnIndex}){
        if(columnIndex%2==0){
          return 'background:#6EAAD7;color:#fff;'
        }else {
          return 'background:#fff;color:#6EAAD7;'
        }
      },
      headerrowstyle({row, column, rowIndex, columnIndex}){
        if(columnIndex%2==0){
          return 'background:#6EAAD7!important;color:#fff;'
        }else {
          return 'background:#fff!important;color:#6EAAD7;'
        }
      },
      handleSizeChange(val) {
        this.dataParams.limit = val
        this.getChart(this.dataParams,'default')
      },
      handleCurrentChange(val) {
        this.dataParams.page = val
        this.getChart(this.dataParams,'default')
      },
      handleSizeChangeDia(val) {
        this.diaParams.limit = val
        this.getChart(this.diaParams,'dialog')
      },
      handleCurrentChangeDia(val) {
        this.diaParams.page = val
        this.getChart(this.diaParams,'dialog')
      },
      choose(val,id){
        if(val=='city'){
          this.placeForm.area = ''
          this.placeForm.group = ''
          this.getList("area",id)
          // console.log(this.placeForm)
        }else if(val=='area'){
          this.placeForm.group = ''
          this.getList("group",id)
        }
      },
      getList(val,id){
        if(val=='city'){
          this.$http.get(globalConfig.server+"organization/other/org-tree?id=331").then((res) => {
            if(res.data.code == "70050"){
              this.cityOption = res.data.data
            }
          });
        }else if(val=="area"){
          this.$http.get(globalConfig.server+"organization/other/org-tree?id="+id).then((res) => {
            if(res.data.code == "70050"){
              this.areaOption = res.data.data
            }
          });
        }else if(val=="group"){
          this.$http.get(globalConfig.server+"organization/other/org-tree?id="+id).then((res) => {
            if(res.data.code == "70050"){
              this.groupOption = res.data.data
            }
          });
        }
      },
      changChart(val){
        if(!this.selectDate){
          return this.prompt('warning','请选择时间')
        }
          this.diaParams.city = this.placeForm.city
          this.diaParams.area = this.placeForm.area
          this.diaParams.group = this.placeForm.group
          this.diaParams.start_date = this.selectDate[0]
          this.diaParams.end_date = this.selectDate[1]
          this.diaParams.page = 1
          this.currentPageDia = 1
          this.getChart(this.diaParams,val)
          // console.log(this.$refs.control)
      },

      // getNewDate(){
      //   var date =  new Date()
      //   var lastdate = new Date(date.getTime() - 3600 * 1000 * 24)
      //   var year = lastdate.getFullYear();
      //   var month = lastdate.getMonth()+1;
      //   var day = lastdate.getDate();
      //   this.dataParams.start_date = year + '-' +month + '-' + day
      //   this.dataParams.end_date = year + '-' +month + '-' + day
      // },
      getChart(params,val){ //获取数据

        if(val=="default"){
          this.dataParams.city = params.city
          this.dataParams.area=params.area,
          this.dataParams.group=params.group,
          this.dataParams.start_date=params.start_date,
          this.dataParams.end_date=params.end_date
          this.loading = true
          this.$http.get(this.chartData.data_source,{headers:{"Accept":"application/vnd.boss18+json"},params: this.dataParams}).then((res) => {
            this.loading = false
            if(res.data.code == "20000"){
              this.tableData = res.data.data.data
              this.totalPage = res.data.data.total
            }else{
              this.tableData = []
              this.prompt('error',res.data.msg)
            }
          });

        }
        if(val=="dialog"){
          this.diaParams.city = params.city
          this.diaParams.area=params.area,
          this.diaParams.group=params.group,
          this.diaParams.start_date=params.start_date,
          this.diaParams.end_date=params.end_date
          this.loadingDia = true
          this.$http.get(this.chartData.data_source,{
              headers:{"Accept":"application/vnd.boss18+json"},
              params: this.diaParams
            }).then((res) => {
            this.loadingDia = false
            if(res.data.code == "20000"){
              this.tableDataDia = res.data.data.data
              this.totalPageDia = res.data.data.total
            }else{
              this.tableDataDia = []
              this.prompt('error',res.data.msg)
            }
          });
        }

      },
      showDetailChartDialog(){
        // console.log(this.status)
        if(!this.status){

          this.detaildialogVisible = true
        }
        // this.sendDetailData = item
      }
    },
    mounted () {
      this.tableTh = tableChartData
      this.getChartDate(this.dataParams)
      this.selectDate = [this.dataParams.start_date,this.dataParams.end_date]
      // this.getList('city');
      this.getChart(this.dataParams,'default')
    },
    watch:{
      detaildialogVisible(val){
        this.getChartDate(this.dataParams)
        this.selectDate = [this.dataParams.start_date,this.dataParams.end_date]
        this.changChart("dialog")
        // setTimeout(()=>{
        //   this.toprightStatus = true
        // },1000)
          if(!val){
            this.placeForm ={
              city: '',
              area: '',
              group:''
            }
          }
        }
    }

  }
</script>
<style scoped lang="scss">
#chartTable{
  .comTable{
    margin:0 auto;
    >>>th{
      .cell{
        font-size: 16px;
      }
    }
  }
  .paging{
    text-align: center;
    margin-top:10px;
  }
}

//图表详细弹出框
.detailDia {
  .detailMsgHead{
     font-size: 25px;
    i {
     color:#2496FF;
     padding-right:25px;
    }
  }
  .contentTop{
    margin: 20px 20px 0px 20px;
    .detailSelect{
      display:block;
    }
  }
  .content {
    height: 500px;
    margin: 0 auto;
    margin-top:30px;
    padding: 0 50px;
  }

}
</style>
<style>

</style>
