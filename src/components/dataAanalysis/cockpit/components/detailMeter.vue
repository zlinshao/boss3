<template>
  <div v-if="showDetailMeter" id="detailMeter" >
    <el-container>
      <el-aside width="482px">
        <header>
          <i class="el-icon-arrow-left" @click="showDetailMeter=false"></i>
          <span>{{detailMeterMsg.name}}</span>
          <el-button type="primary" icon="el-icon-setting" size="mini" v-show="editStatus" @click="showDel">{{editText}}</el-button>
        </header>
        <div class="content">
          <div class="content_top">
            <span>{{detailMeterMsg.topic.name}}</span>
            <!-- <el-button type="primary" size="mini">设置默认显示维度</el-button> -->
          </div>
          <div style="margin-top: 20px" class="content_form">
            <div class="clearfix">
              <!-- <div class="radio_contrast" >
                <el-radio-group v-model="radioContrast" size="mini" class="radioreset">
                  <el-radio-button label="同比"></el-radio-button>
                  <el-radio-button label="环比"></el-radio-button>
                </el-radio-group>
              </div> -->
              <el-row >
                <el-col :span="12"></el-col>
                <el-col :span="12">
                  <div class="data_picker">
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
              </el-row>
              
            </div>
            <div class="radio_city">
              <el-radio-group v-model="placeForm.city" size="mini" class="radioreset" @change="choose('city',placeForm.city)">
                <el-radio-button label="">全部</el-radio-button>
                <el-radio-button :label="item.id" v-for="(item,index) in cityOption" :key="index">{{item.name|fmtCity}}</el-radio-button>
              </el-radio-group>
            </div>
            <div class="form_bottom">
              <el-select v-model="placeForm.area" clearable placeholder="区域" :disabled="placeForm.city?false:true"  size="mini" class="form_select" @change="choose('area',placeForm.area)">
                <el-option
                  v-for="item in areaOption"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
              <el-select v-model="placeForm.group" clearable placeholder="片区" :disabled="placeForm.area?false:true" size="mini" class="form_select">
                <el-option
                  v-for="item in groupOption"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
              <el-button type="primary" icon="el-icon-search" size="mini" class="form_searchbtn" @click="changChart">查询</el-button>
            </div>
          </div>
          <div class="chartCanva">
            <component 
              :is="detailMeterMsg.topic.chart_set[0].type" 
              :chartData="detailMeterMsg.topic" 
              :chartStyle="mainchartstyle" 
              v-if="detailMeterMsg.topic.chart_set"
              ref="mainchart"
            ></component>
          </div>
          <div class="instructions">
            <p>
              指标说明：<br>
              <!-- 1.x轴按组织架构城市/区域/片区/业务员分别展示，根据组织架构及时间维度变化而变化展示的数值，根据选择维度展示对应数据。<br>
              2.每个柱形表示某个组织维度的业绩金额<br>
              3.组织架构维度标签下有三个下拉菜单选择项：城市（有全国以及各个城市选项，所有显示所有城市的数据，各个城市显示选择城市下辖区域的数据）/区域（显示下辖片区的数据）/片区（显示片区组员的数据）<br>
              4.时间维度标签有下拉菜单选择项：日历组件，可选择的任意时间段（除去当天）。<br> -->
              {{detailMeterMsg.introduction}}
            </p>
          </div>
        </div>
      </el-aside>
      <el-main style="padding:0">
        <el-scrollbar class="content_scroll">
          <div style="width:98%">
            <el-row :gutter="20">
              <el-col :span="12" v-for="(item,index) in detailMeterMsg.cards" :key="index"  v-if="item.data_source">
                <chartCard id="card" :cardData="item" >
                  <template slot="right">
                    <toprightControl 
                      :cardData="item" 
                      :btnstatus="btnstatus" 
                      :meterData="detailMeterMsg">
                    </toprightControl>
                  </template>
                  <template slot="content">
                    <component 
                      :is="item.chart_set[0].type" 
                      :chartData="item" 
                      :chartStyle="chartstyle" 
                      :status="true"
                      ref="minor"
                    ></component>
                  </template>
                  
                </chartCard>
              </el-col>
            </el-row>
          </div>
        </el-scrollbar>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import toprightControl from "../../components/toprightControl.vue"
  import chartCard from "../../wareHouseData/chartCard.vue" //图表卡片
  import basicColumn from "../../wareHouseData/chart/basicColumn.vue"          //基础柱状图
  import bubblePoint from "../../wareHouseData/chart/bubblePoint.vue"          //气泡图
  import donut from "../../wareHouseData/chart/donut.vue"                      //基础环图
  import gauge from "../../wareHouseData/chart/gauge.vue"                      //仪表图
  import groupedColumn from "../../wareHouseData/chart/groupedColumn.vue"      //分组柱状图
  import pie from "../../wareHouseData/chart/pie.vue"                          //饼图
  import seriesLine from "../../wareHouseData/chart/seriesLine.vue"            //折线图
  import stackedColumn from "../../wareHouseData/chart/stackedColumn.vue"      //堆叠柱状图
  import stackedPercentageColumn from "../../wareHouseData/chart/stackedPercentageColumn.vue"       //百分比堆叠柱状图
  import textCard from "../../wareHouseData/chart/textCard.vue"               //文本卡片
  import tableCard from "../../wareHouseData/chart/tableCard.vue"            //表格卡片
  

  export default {
    props: ['detailMeterVisible', 'detailMeterMsg','editStatus'],
    components: {
      toprightControl,
      chartCard,
      basicColumn,
      bubblePoint,
      donut,
      gauge,
      groupedColumn,
      pie,
      seriesLine,
      stackedColumn,
      stackedPercentageColumn,
      textCard,
      tableCard,
    },
    data() {
      return {
        params:{},
        chartstyle:{
          height:300,
          width:530
        },
        mainchartstyle:{
          height:260,
          width:460
        },
        mainchartItem: {},//主指标
        chartItems: {},//侧边指标
        detailMsg:{
          name:'',
          title:'',
        },
        btnstatus:{
          large:true,//放大和添加按钮SH
          delete:false,//删除按钮
          hidemetter:true,//隐藏新建
          hideAdd:false//隐藏添加
        },
        cityOption:[],
        areaOption:[],
        groupOption:[],
        placeForm:{ //城市信息
          city: '',
          area: '',
          group:''
        },
        selectDate:[],
        showDetailMeter: false,//隐藏仪表编辑页
        radioContrast: "同比", //同比环比按钮
        radioCity: "全部",//选择城市按钮
        editText:"编辑模式",
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
    filters:{
      fmtCity(city){
        let str = city
        if(city.indexOf('分') !== -1){
           str = city.split('分')[0]
        }
        return str
      }
    },
    methods: {
      choose(val,id){ //城市区域选择
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
          this.$http.get(globalConfig.server_user+"organizations?parent_id=331&per_page_number=50").then((res) => {   
            if(res.data.status_code == 200){
              res.data.data.forEach(item=>{
                if(item.name!=="外出考察"){
                  this.cityOption.push(item)
                }
              })
            }
          });
        }else if(val=="area"){
          this.$http.get(globalConfig.server_user+"organizations?parent_id="+id+"&per_page_number=50").then((res) => {          
            if(res.data.status_code == 200){
              this.areaOption = res.data.data
            }
          });
        }else if(val=="group"){
          this.$http.get(globalConfig.server_user+"organizations?parent_id="+id+"&per_page_number=50").then((res) => {          
            if(res.data.status_code == 200){
              this.groupOption = res.data.data
            }
          });
        }
      },
      showDel(){
        if(this.btnstatus.delete){
          this.btnstatus.delete = false
          this.editText = "编辑模式"
        }else{
          this.btnstatus.delete = true
          this.editText = "退出编辑模式"
        }
      },
      changChart(){
            this.params.city = this.placeForm.city
            this.params.area = this.placeForm.area
            this.params.group = this.placeForm.group
            this.params.start_date = this.selectDate[0]
            this.params.end_date = this.selectDate[1]
            this.params.date = this.selectDate[1]
            for(var key in this.$refs){
              if(key=='mainchart'){
                this.$refs[key].getChart(this.params,"default")
              }
              if(key=="minor"){
                this.$refs[key].forEach(item=>{
                  item.getChart(this.params,"default")
                })
              }
            }
        },
      
    },
    watch: {
      detailMeterVisible(val) {
        this.showDetailMeter = val
      },
      showDetailMeter(val) {
        this.params = JSON.parse(JSON.stringify(chartParams))
        this.getChartDate(this.params)
        this.selectDate = [this.params.start_date,this.params.end_date]
        if (!val) {
          this.placeForm ={
            city: '',
            area: '',
            group:''
          }
          this.deleteBtn = false
          this.editText = "编辑模式"
          // this.changChart()
          this.$emit('close')
        }
      }
    },
    mounted() {
      this.getList('city')
    },
  }
</script>
<style scoped lang="scss">
  //element-ui Container布局样式
  .el-aside {
    box-sizing: border-box;
    border-right: 1px #DBDBDB solid;
    box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.2);
    margin-right: 20px;
    height: 810px;
  }

  .el-main {
    height: 810px;
  }

  //element-ui layout布局样式
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }

  .el-col {
    border-radius: 4px;
    margin-bottom: 10px;
  }

  //element-ui scroll布局样式
  .content_scroll {
    height: 100%;
    width: 98%;

  }

  // 侧边样式
  // 侧边头部
  header {
    padding: 10px;
    color: #1890FF;
    margin-right: 20px;
    border-bottom: 1px #DBDBDB solid;
    i {
      font-size: 20px;
      font-weight: 700;
    }
    span {
      font-size: 18px;
      font-weight: 700;
      padding: 0px 40px 0 20px
    }
    button {
      float: right;
    }
  }

  //侧边主题表单控件部分
  .content {
    padding: 10px;
    overflow: hidden;
    .content_top {
      padding: 10px;
      span {
        font-size: 18px;
        font-weight: 700;
        color: #1890FF;
      }
      button {
        margin-right: 10px;
        float: right;
      }
    }
    .content_form {
      .radio_contrast {
        float: left;
      }
      .data_picker {
        float: right;
        width: 220px;
        >>> .el-date-editor {
          width: 100% !important;
        }
      }
      .radio_city {
        margin-top: 15px;
      }
      .form_bottom {
        margin-top: 20px;
        .form_select {
          width: 150px !important;
        }
        .form_searchbtn {
          float: right;
          margin-right: 20px;
        }
      }
    }
    //侧边图表
    .chartCanva {
      box-sizing: border-box;
      margin-top: 20px;
      margin-right: 20px;
      // height: 300px;
    }
    //侧边底部说明
    .instructions {
      margin-top: 20px;
      margin-right: 20px;
      p {
        line-height: 23px;
      }
    }
  }

  // 主体仪表卡片
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .card-header {
    border: none
  }

  .box-card {
    width: 100%;
    border-radius: 4px;
    position: relative;
    overflow: hidden;
    box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.2);
    &:hover {
      border: 1px solid #409EFF
    }
  }

  //卡片右上角按钮
  .toprightBtn {
    float: right;
    overflow: hidden;
    border: 1px #409EFF solid;
    color: #409EFF;
    &.enlargebtn {
      margin-right: 10px;
    }
  }
</style>
<style lang="scss">
  //不显示x轴横向滚动条
  .content_scroll .el-scrollbar__wrap {
    overflow-x: hidden;
  }

  #detailMeter .el-card__header {
    height: 50px;
  }
</style>
