<template>
  <div v-if="showDetailMeter" id="detailMeter">
      <el-container>
        <el-aside width="482px">
          <header>
            <i class="el-icon-arrow-left" @click="showDetailMeter=false"></i>
            <span>{{mainchartItem.type}}</span>
            <el-button type="primary" icon="el-icon-setting" size="mini" style="display:none">编辑模式</el-button>
          </header>
          <div class="content">
            <div class="content_top">
              <span>{{mainchartItem.title}}</span>
              <el-button type="primary" size="mini">设置默认显示维度</el-button>
            </div>
            <div style="margin-top: 20px" class="content_form">
              <div class="clearfix">
                <div class="radio_contrast" style="display:none">
                  <el-radio-group v-model="radioContrast" size="mini" class="radioreset">
                    <el-radio-button label="同比" ></el-radio-button>
                    <el-radio-button label="环比"></el-radio-button>
                  </el-radio-group>
                </div>
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
                  <el-radio-button label="全部" ></el-radio-button>
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
              <component :is="mainchartItem.component"></component>
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
                <el-col :span="12" v-for="(item,index) in chartItems" :key="index">
                  <el-card class="box-card"
                    style="width:100%"
                    :body-style="bodyStyle"
                    shadow = "hover"
                    >
                    <div slot="header" class="clearfix card-header" >
                      <span>{{item.title}}</span>
                      <div style="position: absolute;top:15px;right: 15px;">
                        <!-- 说明弹出框 -->
                        <el-popover
                          placement="right-start"
                          width="200"
                          trigger="click"
                          title="说明"
                          >
                          <p>
                            {{item.detailMsg}}
                          </p>
                          <el-button icon="el-icon-question" class="toprightBtn" slot="reference" circle  size="mini" type="text"></el-button>
                        </el-popover>
                        <el-button icon="el-icon-search" class="toprightBtn enlargebtn" circle  size="mini" type="text"></el-button>
                      </div>
                    </div>
                    <div> 
                      <div style="width:100%;height:260px;position:relative" class="chartbox">
                        <component :is="item.component" @sendChartMsg="getChartMsg"></component>
                      </div>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </div>
          </el-scrollbar>
        </el-main>
      </el-container>
  </div>
</template>

<script>
  // 业绩分析
  import achievementTotal from "../../components/achievementAnalysis/achievementTotal.vue" //业绩总额
  import averageMonthRentPrice from "../../components/achievementAnalysis/averageMonthRentPrice.vue"  //平均每月租房单价
  import achievementSameCompare from "../../components/achievementAnalysis/achievementSameCompare.vue"  //业绩同比增长
  import achievementRingCompare from "../../components/achievementAnalysis/achievementRingCompare.vue"  //业绩环比增长
  import achievementTargetRate from "../../components/achievementAnalysis/achievementTargetRate.vue"  //业绩环比增长
  import rentOrderNumber from "../../components/achievementAnalysis/rentOrderNumber.vue"  //租房单数
  import abnormalOrder from "../../components/achievementAnalysis/abnormalOrder.vue"  //租房单数

  //盈亏分析
  import profitLossTotal from "../../components/ProfitLossAnalysis/profitLossTotal.vue"  //盈亏总额  
  import profitLossRingCompare from "../../components/ProfitLossAnalysis/profitLossRingCompare.vue"  //盈亏金额环比
  import profitLossSameCompare from "../../components/ProfitLossAnalysis/profitLossSameCompare.vue"  //盈亏金额同比 
  import averageMonthPrice from "../../components/ProfitLossAnalysis/averageMonthPrice.vue"  //平均租房月单价
  import averageCollectHousePrice from "../../components/ProfitLossAnalysis/averageCollectHousePrice.vue"  //平均收房价格
  import actualReceivablesRate from "../../components/ProfitLossAnalysis/actualReceivablesRate.vue"  //实际收入占应收款比例
  import actualCashFlow from "../../components/ProfitLossAnalysis/actualCashFlow.vue"  //实际收入现金流
  import averageRentCollectionPriceTrend from "../../components/ProfitLossAnalysis/averageRentCollectionPriceTrend.vue"  //平均收租价格趋势
  import collectionRentHouseCompare from "../../components/ProfitLossAnalysis/collectionRentHouseCompare.vue"  //收租房数量对比

  //违约收入分析
  import breakPromiseProportion from "../../components/breakPromiseAnalysis/breakPromiseProportion.vue"  //违约金、滞纳金、炸单已收定金收入
  import defaultRate from "../../components/breakPromiseAnalysis/defaultRate.vue"  //违约率占比
  import scrapOrder from "../../components/breakPromiseAnalysis/scrapOrder.vue"  //租房炸弹数量、炸单率

  //房屋运营分析
  import houseTurnoverRate from "../../components/houseOperationAnalysis/houseTurnoverRate.vue" // 房屋周转率
  import vacancyOffsetBalance from "../../components/houseOperationAnalysis/vacancyOffsetBalance.vue" // 空置期抵消差额
  import collectHouseInterestIndex from "../../components/houseOperationAnalysis/collectHouseInterestIndex.vue" // 收房利益指数

  //中介分析
  import intermediaryFeeRingCompare from "../../components/intermediaryAnalysis/intermediaryFeeRingCompare.vue" // 中介费环比
  import agencyFeeAverageDiscount from "../../components/intermediaryAnalysis/agencyFeeAverageDiscount.vue" // 中介费平均折扣
  import agencyOrderNumberRate from "../../components/intermediaryAnalysis/agencyOrderNumberRate.vue" // 中介单数量占比
  import agencyCompanyCostCompare from "../../components/intermediaryAnalysis/agencyCompanyCostCompare.vue" // 中介费金额与公司业绩比
  import excellentEmployee from "../../components/intermediaryAnalysis/excellentEmployee.vue" // 中介费占业绩比最高前100名员工



  export default {
    props:['detailMeterVisible','detailMeterid'],
    components:{achievementTotal,averageMonthRentPrice,achievementSameCompare,achievementRingCompare,achievementTargetRate,rentOrderNumber,abnormalOrder,
    profitLossTotal,profitLossRingCompare,profitLossSameCompare,averageMonthPrice,averageCollectHousePrice,actualReceivablesRate,actualCashFlow,averageRentCollectionPriceTrend,collectionRentHouseCompare,
    breakPromiseProportion,defaultRate,scrapOrder,
    houseTurnoverRate,vacancyOffsetBalance,collectHouseInterestIndex,
    intermediaryFeeRingCompare,agencyFeeAverageDiscount,agencyOrderNumberRate,agencyCompanyCostCompare,excellentEmployee},
    data() {
      return {
        mainchartItem:{},//主指标
        chartItems:[],//侧边指标
        bodyStyle:{//卡片主体样式
          padding:'0',
          position:'relative',
          height:'300px',
          width:'100%',
          backgroundColor: '#fff'
        },
        showDetailMeter:false,//隐藏仪表编辑页
        chartheight:300,
        radioContrast: "同比", //同比环比按钮
        radioCity:"全部",//选择城市按钮
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
    methods:{
      getChartMsg(data){
        for(let i=0;i<this.chartItems.length;i++){
          if(this.chartItems[i].component==data.component){
              this.chartItems.splice(i, 1, {...data,...this.chartItems[i]})
          }
        }
      }
    },
    watch:{
      detailMeterVisible(val){
        this.showDetailMeter = val
      },
      showDetailMeter(val){
        if(!val){
          this.$emit('close')
        }
      },
      detailMeterid(val){
        if(val==0){
          this.mainchartItem={component:'achievementTotal',title:"业绩总额",type:"业绩分析"}
          this.chartItems = [
          {component:'averageMonthRentPrice'},
          {component:"achievementSameCompare"},
          {component:"achievementRingCompare"},
          {component:"achievementTargetRate"},
          {component:"rentOrderNumber"},
          {component:'abnormalOrder'}
          ]
        }else if(val==1){
          this.mainchartItem={component:'profitLossTotal',title:"盈亏总额",type:"盈亏分析"}
          this.chartItems = [
            {component:'profitLossRingCompare'},
            {component:"profitLossSameCompare"},
            {component:"averageMonthPrice"},
            {component:"averageCollectHousePrice"},
            {component:'actualReceivablesRate'},
            {component:'actualCashFlow'},
            {component:'averageRentCollectionPriceTrend'},
            {component:'collectionRentHouseCompare'}
          ]
        }else if(val==2){
          this.mainchartItem={component:'breakPromiseProportion',title:"违约金、滞纳金、炸单已收定金收入",type:"违约收入分析"}
          this.chartItems = [
            {component:'defaultRate'},
            {component:"scrapOrder"},
          ]
        }else if(val==3){
          this.mainchartItem={component:'houseTurnoverRate',title:"房屋周转率",type:"房屋运营分析"}
          this.chartItems = [
            {component:'vacancyOffsetBalance'},
            {component:"collectHouseInterestIndex"},
          ]
        }else if(val==4){
          this.mainchartItem={component:'intermediaryFeeRingCompare',title:"中介费环比",type:"中介分析"}
          this.chartItems = [
            {component:"agencyFeeAverageDiscount"},
            {component:"agencyOrderNumberRate"},
            {component:"agencyCompanyCostCompare"},
            {component:"excellentEmployee"},
          ]
        }
      }
    }
  }
</script>
<style scoped lang="scss">
//element-ui Container布局样式
.el-aside {
  box-sizing: border-box;
  border-right:1px #DBDBDB solid;
  box-shadow: 0px 4px 12px 0px rgba(0,0,0,0.2);
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
.content_scroll{
  height:100%;
  width:98%;
  
}
// 侧边样式
// 侧边头部
header {
  padding: 10px;
  color: #1890FF;
  margin-right:20px;
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
  button{
    float: right;
  }
}
//侧边主题表单控件部分
.content{
  padding: 10px;
  .content_top{
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
  .content_form{
    .radio_contrast{
      float: left;
    }
    .data_picker{
      float: right;
      width: 220px;
      >>>.dataPicker{
        width: 200px!important;
      }
    } 
    .radio_city{
      margin-top:15px;
    }
    .form_bottom{
      margin-top:20px;
      .form_select{
        width: 90px!important;
      }
      .form_searchbtn{
        float: right;
        margin-right: 20px;
      }
    }
  }
  //侧边图表
  .chartCanva{
    box-sizing: border-box;
    margin-top:20px;
    margin-right:20px;
    height: 300px;
  }
  //侧边底部说明
  .instructions{
    margin-top:20px;
    margin-right:20px;
    p{
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
.card-header{
  border: none
}
.box-card {
  width: 100%;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  box-shadow: 0px 4px 12px 0px rgba(0,0,0,0.2);
  &:hover{
    border:1px solid #409EFF
  }
}
//卡片右上角按钮
.toprightBtn{
  float: right;
  overflow:hidden;
  border:1px #409EFF solid;
  color:#409EFF;
  &.enlargebtn{
    margin-right: 10px;
  }
}
</style>
<style lang="scss">
//不显示x轴横向滚动条
.content_scroll .el-scrollbar__wrap{
  overflow-x: hidden;
}
#detailMeter .el-card__header{
  height: 50px;
}
</style>
