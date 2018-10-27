<template>
  <div v-if="showDetailMeter" id="detailMeter">
    {{mainchartItem}}
    {{chartItems}}
    <el-container>
      <el-aside width="482px">
        <header>
          <i class="el-icon-arrow-left" @click="showDetailMeter=false"></i>
          <span>{{detailMsg.name}}</span>
          <el-button type="primary" icon="el-icon-setting" size="mini" style="display:none">编辑模式</el-button>
        </header>
        <div class="content">
          <div class="content_top">
            <span>{{mainchartItem.name}}</span>
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
              <div class="data_picker">
                <el-date-picker
                  size="mini"
                  class="dataPicker"
                  v-model="value7"
                  type="daterange"
                  align="right"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="pickerOptions2">
                </el-date-picker>
              </div>
            </div>
            <div class="radio_city">
              <el-radio-group v-model="radioCity" size="mini" class="radioreset">
                <el-radio-button label="全部"></el-radio-button>
                <el-radio-button label="南京"></el-radio-button>
                <el-radio-button label="苏州"></el-radio-button>
                <el-radio-button label="杭州"></el-radio-button>
                <el-radio-button label="合肥"></el-radio-button>
                <el-radio-button label="西安"></el-radio-button>
                <el-radio-button label="成都"></el-radio-button>
                <el-radio-button label="重庆"></el-radio-button>
              </el-radio-group>
            </div>
            <div class="form_bottom">
              <el-select v-model="value4" clearable placeholder="区域" disabled size="mini" class="form_select">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-select v-model="value4" clearable placeholder="片区" disabled size="mini" class="form_select">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-button type="primary" icon="el-icon-search" size="mini" class="form_searchbtn">查询</el-button>
            </div>
          </div>
          <div class="chartCanva">
            <component :is="mainchartItem.chart_set[0].type" :chartData="mainchartItem" :chartStyle="chartstyle" v-if="mainchartItem.chart_set"></component>
          </div>
          <div class="instructions">
            <p>
              指标说明：<br>
              1.x轴按组织架构城市/区域/片区/业务员分别展示，根据组织架构及时间维度变化而变化展示的数值，根据选择维度展示对应数据。<br>
              2.每个柱形表示某个组织维度的业绩金额<br>
              3.组织架构维度标签下有三个下拉菜单选择项：城市（有全国以及各个城市选项，所有显示所有城市的数据，各个城市显示选择城市下辖区域的数据）/区域（显示下辖片区的数据）/片区（显示片区组员的数据）<br>
              4.时间维度标签有下拉菜单选择项：日历组件，可选择的任意时间段（除去当天）。<br>
            </p>
          </div>
        </div>
      </el-aside>
      <el-main style="padding:0">
        <el-scrollbar class="content_scroll">
          <div style="width:98%">
            <el-row :gutter="20">
              <el-col :span="12" v-for="(item,index) in chartItems" :key="index" v-if="chartItems">
                <chartCard id="card" :cardData="item" >
                  <component :is="item.chart_set[0].type" :chartData="item" :chartStyle="chartstyle" v-if="item.chart_set"
                  ></component>
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
    props: ['detailMeterVisible', 'detailMeterid'],
    components: {
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
      tableCard
    },
    data() {
      return {
        params:{},
        chartstyle:{
          height:300
        },
        mainchartItem: {},//主指标
        chartItems: {},//侧边指标
        detailMsg:{
          name:'',
          title:'',
        },
        params:{ //待传参数
          city: '',
          area: '',
          group:'',
          start_date:"",
          end_date:"",
          date:""
        },
        placeForm:{ //城市信息
          city: '',
          area: '',
          group:''
        },
        showDetailMeter: false,//隐藏仪表编辑页
        radioContrast: "同比", //同比环比按钮
        radioCity: "全部",//选择城市按钮
        pickerOptions2: { //时间选择器
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value7: '', //时间选择器
        options: [{ //区域
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value4: '' //区域
      }
    },
    methods: {
      choose(val,id){ //城市区域选择
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
          this.$http.get(globalConfig.server_user+"organizations?parent_id=331&per_page_number=50").then((res) => {          
            // console.log(res)
            if(res.data.status_code == 200){
              this.cityOption = res.data.data
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
      getChartMsg(data) {
        for (let i = 0; i < this.chartItems.length; i++) {
          if (this.chartItems[i].component == data.component) {
            this.chartItems.splice(i, 1, {...data, ...this.chartItems[i]})
          }
        }
      }
    },
    watch: {
      detailMeterVisible(val) {
        this.showDetailMeter = val
      },
      showDetailMeter(val) {
        if (!val) {
          this.$emit('close')
        }
      },
      detailMeterid(val) {
        val = 8
        this.$http.get(globalConfig.server + "bisys/dashboard/" + val, {
          headers: {"Accept": "application/vnd.boss18+json"}
        }).then((res) => {
          // console.log(res)
            if (res.data.code == "20020") {
              this.detailMsg.name= res.data.data.name
              this.mainchartItem = res.data.data.topic
              this.chartItems = res.data.data.cards
            } else {
             this.prompt('error',res.data.msg)
            }
          });
        // if (val == 0) {
        //   this.mainchartItem = {component: 'achievementTotal', title: "业绩总额", type: "业绩分析"}
        //   this.chartItems = [
        //     {component: 'averageMonthRentPrice'},
        //     {component: "achievementSameCompare"},
        //     {component: "achievementRingCompare"},
        //     {component: "achievementTargetRate"},
        //     {component: "rentOrderNumber"},
        //     {component: 'abnormalOrder'}
        //   ]
        // } else if (val == 1) {
        //   this.mainchartItem = {component: 'profitLossTotal', title: "盈亏总额", type: "盈亏分析"}
        //   this.chartItems = [
        //     {component: 'profitLossRingCompare'},
        //     {component: "profitLossSameCompare"},
        //     {component: "averageMonthPrice"},
        //     {component: "averageCollectHousePrice"},
        //     {component: 'actualReceivablesRate'},
        //     {component: 'actualCashFlow'},
        //     {component: 'averageRentCollectionPriceTrend'},
        //     {component: 'collectionRentHouseCompare'}
        //   ]
        // } else if (val == 2) {
        //   this.mainchartItem = {component: 'breakPromiseProportion', title: "违约金、滞纳金、炸单已收定金收入", type: "违约收入分析"}
        //   this.chartItems = [
        //     {component: 'defaultRate'},
        //     {component: "scrapOrder"},
        //   ]
        // } else if (val == 3) {
        //   this.mainchartItem = {component: 'houseTurnoverRate', title: "房屋周转率", type: "房屋运营分析"}
        //   this.chartItems = [
        //     {component: 'vacancyOffsetBalance'},
        //     {component: "collectHouseInterestIndex"},
        //   ]
        // } else if (val == 4) {
        //   this.mainchartItem = {component: 'intermediaryFeeRingCompare', title: "中介费环比", type: "中介分析"}
        //   this.chartItems = [
        //     {component: "agencyFeeAverageDiscount"},
        //     {component: "agencyOrderNumberRate"},
        //     {component: "agencyCompanyCostCompare"},
        //     {component: "excellentEmployee"},
        //   ]
        // }
      }
    }
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
        > > > .dataPicker {
          width: 200px !important;
        }
      }
      .radio_city {
        margin-top: 15px;
      }
      .form_bottom {
        margin-top: 20px;
        .form_select {
          width: 90px !important;
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
      height: 300px;
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
