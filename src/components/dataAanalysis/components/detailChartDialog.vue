<template>
  <el-dialog
    id="detailChartDialog"
    custom-class="detailDia"
    :show-close="false"
    :visible="detaildialogVisible"
    :modal="false"
    width="65%">
    <div>
      <!-- {{detailData}} -->
      <div class="detailMsgHead">
        <div>
        <i class="el-icon-arrow-left" @click="detaildialogVisible=false"></i>
        <span>{{detailData.name}}</span>
        </div>
        <toprightcontrol 
          :cardData="detailData" 
          :btnstatus="btnstatus">
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
            <el-col :span="8" v-if="detailData.name=='空置期抵消差额'?false:true">
              <div class="detailSelect" >
                <el-date-picker
                  size="small"
                  v-model="selectDate"
                  :picker-options="pickerOptions"
                  type="daterange"
                  value-format="yyyy-MM-dd"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </div>
            </el-col>
            <el-col :span="4" v-if="detailData.name=='空置期抵消差额'?true:false">
              <div class="detailSelect" >
                <el-date-picker
                  size="small"
                  value-format="yyyy-MM-dd"
                  v-model="params.date"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                  :picker-options="pickerOptions1">
                </el-date-picker>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="detailSelect">
                <el-button type="primary" size="small" @click="changChart">查询</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="content">
         <component 
          :is="detailData.chart_set[0].type" 
          :chartData="detailData" 
          :chartStyle="chartstyle" 
          :params="params" 
          ref="chartComp"
          :status="true"
          v-if="detailData.chart_set"
            ></component>
        </div>
      </div>
    </div>
  </el-dialog>
</template>
<script>
  import toprightcontrol from "../cockpit/components/toprightControl.vue"
  import basicColumn from "../wareHouseData/chart/basicColumn.vue"          //基础柱状图
  import bubblePoint from "../wareHouseData/chart/bubblePoint.vue"          //气泡图
  import donut from "../wareHouseData/chart/donut.vue"                      //基础环图
  import gauge from "../wareHouseData/chart/gauge.vue"                      //仪表图
  import groupedColumn from "../wareHouseData/chart/groupedColumn.vue"      //分组柱状图
  import pie from "../wareHouseData/chart/pie.vue"                          //饼图
  import seriesLine from "../wareHouseData/chart/seriesLine.vue"            //折线图
  import stackedColumn from "../wareHouseData/chart/stackedColumn.vue"      //堆叠柱状图
  import stackedPercentageColumn from "../wareHouseData/chart/stackedPercentageColumn.vue"       //百分比堆叠柱状图
  // import textCard from "../wareHouseData/chart/textCard.vue"               //文本卡片
  import tableCard from "../wareHouseData/chart/tableCard.vue"            //表格卡片
  
    export default {
      name:"detailChartDialog",
      components:{
        toprightcontrol,
        basicColumn,
        bubblePoint,
        donut,
        gauge,
        groupedColumn,
        pie,
        seriesLine,
        stackedColumn,
        stackedPercentageColumn,
        tableCard
      },
      props:['modules','detailData'],
      data(){
				return {
          detaildialogVisible : false,
          chartstyle:{
            height:500,
            width:1000
          },
          btnstatus:{
            large:false,//放大和添加按钮SH
            delete:false,//删除按钮
            hidemetter:false,//隐藏新建
            hideAdd:true//隐藏添加
          },
          params:{},
          selectDate:'',
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
          pickerOptions1: {
            disabledDate(time) {
              return time.getTime() > Date.now();
            },
            shortcuts: [{
              text: '昨天',
              onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24);
                picker.$emit('pick', date);
              }
            }, {
              text: '一周前',
              onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', date);
              }
            },{
              text: '一月前',
              onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', date);
              }
            }]
          },
		    }
      },
			methods:{
        choose(val,id){
          if(val=='city'){
            this.placeForm.area = ''
            this.placeForm.group = ''
            this.getList("area",id)
          }else if(val=='area'){
            this.placeForm.group = ''
            this.getList("group",id)
          }
        },
        getList(val,id){
          if(val=='city'){
            this.$http.get(globalConfig.server+"organization/other/org-tree?id=331").then((res) => {
              if(res.data.code == "20000"){
                this.cityOption = res.data.data
              }
            });
          }else if(val=="area"){
            this.$http.get(globalConfig.server+"organizationsorganization/other/org-tree?id="+id).then((res) => {
              if(res.data.code == "20000"){
                this.areaOption = res.data.data
              }
            });
          }else if(val=="group"){
            this.$http.get(globalConfig.server+"organization/other/org-tree?parent_id="+id).then((res) => {
              if(res.data.code == "20000"){
                this.groupOption = res.data.data
              }
            });
          }
        },
        changChart(){
          // if(!this.selectDate){
          //   return this.prompt('warning','请选择时间')
          // }
            this.params.city = this.placeForm.city
            this.params.area = this.placeForm.area
            this.params.group = this.placeForm.group
            this.params.start_date = this.selectDate[0]
            this.params.end_date = this.selectDate[1]
           
            this.$refs.chartComp.getChart(this.params,"default")
            // console.log(this.$refs.topright)
            // this.$nextTick
            
            
        },
        // getNewDate(){
        //   var date =  new Date()
        //   var lastdate = new Date(date.getTime() - 3600 * 1000 * 24)
        //   var year = lastdate.getFullYear();
        //   var month = lastdate.getMonth()+1;   
        //   var day = lastdate.getDate(); 
        //   this.params.start_date = year + '-' +month + '-' + day
        //   this.params.end_date = year + '-' +month + '-' + day
        //   this.params.date = year + '-' +month + '-' + day
        // }
      },
      watch:{
        modules(val){
          this.detaildialogVisible = val
          
        },
        detaildialogVisible(val){
          this.params = JSON.parse(JSON.stringify(chartParams))
          this.getChartDate(this.params)
          this.selectDate = [this.params.start_date,this.params.end_date]
          if(!val){
            this.placeForm ={
              city: '',
              area: '',
              group:''
            }
            // this.params={
            //   city: '',
            //   area: '',
            //   group:'',
            //   start_date:"",
            //   end_date:"",
            //   date:""
            // },
            // this.getNewDate()
            this.$emit('close')
          }else{
            setTimeout(()=>{this.changChart()},500)
          }
        }
      },
			mounted(){
        this.getList('city')
      }
      
    }
</script>
<style scoped lang="scss">
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
<style lang="scss">
  .meterpop.el-popover.el-popper{
    border: none;
    box-shadow:none;
    background:none;
    padding:0px 12px;
  }
  #detailChartDialog .detailDia .el-dialog__header{
    padding:0px;
    border-bottom:none;
  }
</style>
