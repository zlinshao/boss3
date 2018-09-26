<template>
  <div style="position: relative" id="wareHouseData">
    <!-- 分类图表展示 -->
    <div v-for="(itemClass,index) in tagClass" :key="index">
      <div class="classTop"><div class="fl">{{itemClass}}</div></div>
      <div>
        <el-row :gutter="20" >
          <el-col :span="8" v-for="(item,index) in chartItems" :key="index" v-if="item.tag.indexOf(itemClass)!=-1">
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

                  <el-popover
                    @hide="hideMeterpop"
                    visible-arrow
                    popper-class="meterpop"
                    placement="bottom"
                    width="200"
                    trigger="click">
                    <ul class="pluspop popFirst" v-if="!showSecPop">
                      <li v-for="o in 2" :key="o" @click="showSecondpop">
                      <i class="el-icon-arrow-left"></i>仪表盘{{o}}
                      </li>
                      <li><i class="el-icon-plus"></i>新建仪表盘</li>
                    </ul> 
                      <ul class="pluspop popFirst" v-if="showSecPop">
                        <li  @click="showSecondpop"><i class="el-icon-arrow-left"></i>{{secPopTitle}}</li>
                        <li @click="addChartMrterDialog=true"><i class="el-icon-plus" ></i>主题指标</li>
                        <li @click="addChartMrterDialog=true"><i class="el-icon-plus" ></i>分析指标</li>
                      </ul>
                    <el-button slot="reference"  icon="el-icon-plus" circle style="float: right;overflow:hidden;border:1px #409EFF solid;margin-right: 10px;color:#409EFF;" size="mini" type="text"></el-button>
                  </el-popover>
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
    </div>
    <addChartToMeter :addChartMrterDialog="addChartMrterDialog" @close="closeModel"></addChartToMeter>
    <!-- 筛选框 -->
    <div class="filterBox">
      <el-input
        class="inputFlt"
        placeholder="请选择"
        suffix-icon="el-icon-search"
        v-model="value"
        >
      </el-input>
      <el-select placeholder="全部" class="selectFil" v-model="value">
        <el-option
          v-for="item in classSelect"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          >
        </el-option>
      </el-select>
      
    </div>
  </div>
  
</template>
<script>
//
  import addChartToMeter from "../components/addChartToMeterDia.vue"
// 业绩分析
  import achievementTotal from "../components/achievementAnalysis/achievementTotal.vue" //业绩总额
  import averageMonthRentPrice from "../components/achievementAnalysis/averageMonthRentPrice.vue"  //平均每月租房单价
  import achievementSameCompare from "../components/achievementAnalysis/achievementSameCompare.vue"  //业绩同比增长
  import achievementRingCompare from "../components/achievementAnalysis/achievementRingCompare.vue"  //业绩环比增长
  import achievementTargetRate from "../components/achievementAnalysis/achievementTargetRate.vue"  //业绩环比增长
  import rentOrderNumber from "../components/achievementAnalysis/rentOrderNumber.vue"  //租房单数
  import abnormalOrder from "../components/achievementAnalysis/abnormalOrder.vue"  //租房单数

  //盈亏分析
  import ProfitLossTotal from "../components/ProfitLossAnalysis/ProfitLossTotal.vue"  //盈亏总额  
  import ProfitLossRingCompare from "../components/ProfitLossAnalysis/ProfitLossRingCompare.vue"  //盈亏金额环比
  import ProfitLossSameCompare from "../components/ProfitLossAnalysis/ProfitLossSameCompare.vue"  //盈亏金额同比 
  import averageMonthPrice from "../components/ProfitLossAnalysis/averageMonthPrice.vue"  //平均租房月单价
  import averageCollectHousePrice from "../components/ProfitLossAnalysis/averageCollectHousePrice.vue"  //平均收房价格
  import actualReceivablesRate from "../components/ProfitLossAnalysis/actualReceivablesRate.vue"  //实际收入占应收款比例
  import actualCashFlow from "../components/ProfitLossAnalysis/actualCashFlow.vue"  //实际收入现金流
  import averageRentCollectionPriceTrend from "../components/ProfitLossAnalysis/averageRentCollectionPriceTrend.vue"  //平均收租价格趋势
  import collectionRentHouseCompare from "../components/ProfitLossAnalysis/collectionRentHouseCompare.vue"  //收租房数量对比

  //违约收入分析
  import breakPromiseProportion from "../components/breakPromiseAnalysis/breakPromiseProportion.vue"  //违约金、滞纳金、炸单已收定金收入
  import defaultRate from "../components/breakPromiseAnalysis/defaultRate.vue"  //违约率占比
  import scrapOrder from "../components/breakPromiseAnalysis/scrapOrder.vue"  //违约率占比

  //房屋运营分析
  import houseTurnoverRate from "../components/houseOperationAnalysis/houseTurnoverRate.vue" // 房屋周转率
  import vacancyOffsetBalance from "../components/houseOperationAnalysis/vacancyOffsetBalance.vue" // 空置期抵消差额
  import collectHouseInterestIndex from "../components/houseOperationAnalysis/collectHouseInterestIndex.vue" // 收房利益指数

  //中介分析
  import intermediaryFeeRingCompare from "../components/intermediaryAnalysis/intermediaryFeeRingCompare.vue" // 中介费环比
  import agencyFeeAverageDiscount from "../components/intermediaryAnalysis/agencyFeeAverageDiscount.vue" // 中介费平均折扣
  import agencyOrderNumberRate from "../components/intermediaryAnalysis/agencyOrderNumberRate.vue" // 中介单数量占比
  import agencyCompanyCostCompare from "../components/intermediaryAnalysis/agencyCompanyCostCompare.vue" // 中介费金额与公司业绩比
  import excellentEmployee from "../components/intermediaryAnalysis/excellentEmployee.vue" // 中介费占业绩比最高前100名员工

  export default {
    components:{addChartToMeter,
    achievementTotal,averageMonthRentPrice,achievementSameCompare,achievementRingCompare,achievementTargetRate,rentOrderNumber,abnormalOrder,
    ProfitLossTotal,ProfitLossRingCompare,ProfitLossSameCompare,averageMonthPrice,averageCollectHousePrice,actualReceivablesRate,actualCashFlow,averageRentCollectionPriceTrend,collectionRentHouseCompare,
    breakPromiseProportion,defaultRate,scrapOrder,
    houseTurnoverRate,vacancyOffsetBalance,collectHouseInterestIndex,
    intermediaryFeeRingCompare,agencyFeeAverageDiscount,agencyOrderNumberRate,agencyCompanyCostCompare,excellentEmployee},
    data(){
      return {
        ChartClass:[],
        chartItems:[
          {component:'achievementTotal',tag:['财务','业务']},
          {component:'averageMonthRentPrice',tag:['财务','业务']},
          {component:'achievementSameCompare',tag:['业务']},
          {component:'achievementRingCompare',tag:['业务']},
          {component:'achievementTargetRate',tag:['业务']},
          {component:'rentOrderNumber',tag:['业务']},
          {component:'abnormalOrder',tag:['业务']},

          {component:'ProfitLossTotal',tag:['财务','业务']},
          {component:'ProfitLossRingCompare',tag:['财务','业务']},
          {component:'ProfitLossSameCompare',tag:['财务','业务']},
          {component:'averageMonthPrice',tag:['财务','业务']},
          {component:'averageCollectHousePrice',tag:['财务','业务']},
          {component:'actualReceivablesRate',tag:['财务','业务']},
          {component:'actualCashFlow',tag:['财务','业务']},
          {component:'averageRentCollectionPriceTrend',tag:['财务','业务']},
          {component:'collectionRentHouseCompare',tag:['业务']},

          {component:'breakPromiseProportion',tag:['财务','业务']},
          {component:'defaultRate',tag:['业务']},
          {component:'scrapOrder',tag:['业务']},

          {component:'houseTurnoverRate',tag:['业务']},
          {component:'vacancyOffsetBalance',tag:['业务']},
          {component:'collectHouseInterestIndex',tag:['财务','业务']},

          {component:'intermediaryFeeRingCompare',tag:['财务','业务']},
          {component:'agencyFeeAverageDiscount',tag:['财务','业务']},
          {component:'agencyOrderNumberRate',tag:['业务']},
          {component:'agencyCompanyCostCompare',tag:['财务','业务']},
          {component:'excellentEmployee',tag:['财务','业务']},
        ],
        bodyStyle:{//卡片主体样式
          padding:'0',
          position:'relative',
          height:'300px',
          width:'100%',
          backgroundColor: '#fff'
        },
        dialogVisible: false,
        tagClass:["业务","财务","客服","行政","人力"],
        classSelect: [{
          value: '选项0',
          label: '全部'
        }, {
          value: '选项1',
          label: '业务'
        }, {
          value: '选项2',
          label: '财务'
        }, {
          value: '选项3',
          label: '人力'
        }, {
          value: '选项4',
          label: '客服'
        }, {
          value: '选项5',
          label: '行政'
        }],
        value: '全部',
        selectbool:true,
        showSecPop:false,
        addChartMrterDialog:false,
        secPopTitle:'',
      }
    },
    methods:{
      getChartMsg(data){
        for(let i=0;i<this.chartItems.length;i++){
          if(this.chartItems[i].component==data.component){
              this.chartItems.splice(i, 1, {...this.chartItems[i],...data})
              // console.log(this.chartItems)
          }
        }
      },
      hideMeterpop(){
        this.showSecPop=false
      },
      showSecondpop(event){
        this.showSecPop=!this.showSecPop
        var el = event.currentTarget
        this.secPopTitle = el.innerText
      },
      closeModel(val){
        this.addChartMrterDialog=false;
        this.showSecPop=!this.showSecPop
      },
    },
    mounted(){
      
      
    }
  }
    
</script>
<style scoped lang="scss">
// 筛选框
  .filterBox{
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-10%,-60%);
    height: 100px;
    margin: 5px;
  }
	.classTop {
		padding: 30px 0;
		font-size: 18px;
		color: #409EFF;
		.fl {
			font-weight: 700;
		}
	}

.el-row {
	margin-bottom: 20px;
	&:last-child {
		margin-bottom: 0;
	}
}
.el-col {
	border-radius: 4px;
  margin-bottom: 20px;
}
// 遮罩层
.modal {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 999
}
// 弹出框
.dialog {
  position: fixed;
  width: 300px;
  height: 200px;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  border: 4px #409EFF solid;
  border-radius: 30px;
  background-color: #fff;
  z-index: 9999;
  color: #409EFF;
  .close-dia {
    border: 3px #409EFF solid;
    color: #409EFF;
    font-size: 18px;
    position: absolute;
    top: 10px;
    right: 10px;
  }
  div {
    font-size: 30px;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%,-50%);
    cursor: default;
  }
  .success-dia{
    position: absolute;
    width: 100px;
    font-size: 20px;
    bottom: 0;
    left: 50%;
    transform: translate(-50%,-50%);

  }
}

//详情模态框
.detMsgHead {
  padding: 15px;
  background-color: #7223C3;
  .detHeadTop{
    font-size: 20px;
    
    i {
      float: left;
      margin-top: 4px;
      color: #fff
    }
    span {
      float: left;
      padding-left: 10px;
      color: #fff
    }
    button {
      float: right;
      color: #fff;
      background-color: #7223C3;
    }
  }
  p{
      color: #fff;
      margin-bottom: 0;
    }
}
.item-contain {
	font-size: 80px;
	color: #409EFF;
	display: block;
	margin: 0 auto;
	text-align: center


}
.el-dialog {
  border-radius: 10px;
  background-color: #7223C3;
  border: 2px #7223C3 solid;
}
  
.clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

</style>
<style lang="scss">
#wareHouseData {
  .el-card__header {
    border:none
  }
  .filterBox{
    .selectFil{
      float:right;
      width: 120px;
      padding-right: 20px;
      input{
        border-radius:50px;
        height: 30px;
        line-height: 30px;
      }
      i{
        line-height: 30px;
      }
    }
    .inputFlt{
      float:right;
      width: 200px;
      input{
        border-radius:50px;
        height: 30px;
        line-height: 30px;
      }
      i{
        line-height: 30px;
      }
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
// 仪表弹出框
  .pluspop{
  position: absolute;
  background-color: #fff;
  border: 1px solid #D2D2D2;
  border-radius: 4px;
   z-index:999;
  &.popFirst{
    top:-8px;
    right: 10px;	
  }
  &.popSecond{
    top:-35px;
    right: -155px;	
    li {
      &:first-of-type{
        border-bottom : 1px #D2D2D2 solid;
        i {
          color: #409EFF
        }
      }
    }
  }
  li {
    i{
      padding-right: 20px
    }
    button{
      margin: 0;
      width: 100%;
      text-align:left;
    }
    .el-button--text{
      display: block;
      color: #D2D2D2
    }
    width: 150px;
    padding: 3px 0;
    margin: 6px 10px;
    cursor: pointer;
    color: #D2D2D2;
    
  }
}
//卡片右上角按钮
.toprightBtn{
  float: right;
  overflow:hidden;
  border:1px #409EFF solid;
  color:#409EFF;
  &:hover{
    border:1px #409EFF solid!important;
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
</style>

