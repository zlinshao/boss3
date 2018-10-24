<template>
  <el-dialog
    id="detailChartDialog"
    custom-class="detailDia"
    :show-close="false"
    :visible.sync="detaildialogVisible"
    :modal="false"
    width="65%">
    <div>
      {{params}}
      {{selectDate}}
      <div class="detailMsgHead">
        <i class="el-icon-arrow-left" @click="detaildialogVisible=false"></i>
        <span>{{detailData.name}}</span>
        <toprightControl></toprightControl>
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
                <el-button type="primary" size="small" @click="changChart">查询</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="content">
         <!-- <component :is="detailData.chart_set[0].type" :chartData="detailData"
            ></component> -->
          <basicColumn :chartData="detailData" :chartStyle="chartstyle" :params="params"></basicColumn>
        </div>
      </div>
    </div>
  </el-dialog>
</template>
<script>
  import basicColumn from "../wareHouseData/chart/basicColumn.vue"          //基础柱状图
  import bubblePoint from "../wareHouseData/chart/bubblePoint.vue"          //气泡图
  import donut from "../wareHouseData/chart/donut.vue"                      //基础环图
  import gauge from "../wareHouseData/chart/gauge.vue"                      //仪表图
  import groupedColumn from "../wareHouseData/chart/groupedColumn.vue"      //分组柱状图
  import pie from "../wareHouseData/chart/pie.vue"                          //饼图
  import seriesLine from "../wareHouseData/chart/seriesLine.vue"            //折线图
  import stackedColumn from "../wareHouseData/chart/stackedColumn.vue"      //堆叠柱状图
  import stackedPercentageColumn from "../wareHouseData/chart/stackedPercentageColumn.vue"       //百分比堆叠柱状图
  import textCard from "../wareHouseData/chart/textCard.vue"               //文本卡片
  import tableCard from "../wareHouseData/chart/tableCard.vue"            //表格卡片

  import toprightControl from "./toprightControl.vue"
    export default {
      components:{toprightControl,
      basicColumn,bubblePoint,donut,gauge,groupedColumn,pie,seriesLine,stackedColumn,stackedPercentageColumn,tableCard
      },
      props:['modules','detailData'],
      data(){
				return {
          detaildialogVisible : false,
          chartstyle:{
            height:500
          },
          params:{
            city: '',
            area: '',
            group:'',
            start_date:"",
            end_date:""
          },
          selectDate:[],
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
          value2: '',
		    }
      },
			methods:{
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
            this.$http.get("http://test.boss-support.lejias.cn/api/s1/organizations?parent_id=331&per_page_number=50").then((res) => {          
              // console.log(res)
              if(res.data.status_code == 200){
                this.cityOption = res.data.data
              }
            });
          }else if(val=="area"){
            this.$http.get("http://test.boss-support.lejias.cn/api/s1/organizations?parent_id="+id+"&per_page_number=50").then((res) => {          
              if(res.data.status_code == 200){
                this.areaOption = res.data.data
              }
            });
          }else if(val=="group"){
            this.$http.get("http://test.boss-support.lejias.cn/api/s1/organizations?parent_id="+id+"&per_page_number=50").then((res) => {          
              if(res.data.status_code == 200){
                this.groupOption = res.data.data
              }
            });
          }
        },
       
       changChart(){
         this.params.start_date = this.selectDate[0]
         this.params.end_date = this.selectDate[1]
         this.params.city = this.placeForm.city
         this.params.area = this.placeForm.area
         this.params.group = this.placeForm.group

        // this.Vue.$set(this.params, start_date, this.selectDate[0] )
        // this.Vue.$set(this.params, end_date, this.selectDate[1] )
        // this.Vue.$set(this.params, city, this.placeForm.city )
        // this.Vue.$set(this.params, area, this.placeForm.area )
        // this.Vue.$set(this.params, group, this.placeForm.group )

         console.log(this.params)

         
       }
      },
      watch:{
        modules(val){
          this.detaildialogVisible = val
          
        },
        detaildialogVisible(val){
          if(!val){
            this.placeForm ={
              city: '',
              area: '',
              group:''
            }
          this.selectDate = []
            this.$emit('close')
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