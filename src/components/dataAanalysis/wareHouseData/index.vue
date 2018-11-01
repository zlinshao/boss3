<template>
  <div id="wareHouseData">
    <!-- 图表展示 -->
    <!-- {{params}} -->
    <div>
      <el-row :gutter="20" >
        <el-col :span="8" v-for = "(item,index) in cardCharts" :key = "index" v-if="item.data_source">
          <!-- 图表卡片 -->
          <chartCard id="card" :cardData="item" >
            <template slot="right">
              <toprightControl :cardData="item" :btnstatus="btnstatus" ></toprightControl>
            </template>
            <template slot="content">
              <component 
                :is="item.chart_set[0].type"  
                :chartData="item" 
                :chartStyle="chartstyle" 
                @click.native="showDetailChartDialog(item)"
                v-if="item.chart_set"
              ></component>
            </template>
          </chartCard>
        </el-col>
        <el-col 
          v-if="!cardloading"
          :span="24" 
          v-loading="cardloading"
          style="text-align: center;"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(255, 255, 255, 0.5)">
          {{loadingText}}
        </el-col>
      </el-row>
    </div>
    <!-- 筛选框 -->
    <div class="filterBox">
      <el-input
        class="inputFlt"
        placeholder="请输入查询指标"
        suffix-icon="el-icon-search"
        @keyup.enter.native="searchCard(params)"
        v-model="params.keyword">
      </el-input>
      <el-button 
        icon="el-icon-search" 
        circle 
        size="mini" 
        class="searchBtn"
        @click="searchCard"
      ></el-button>
      <!-- <el-select placeholder="全部" class="selectFil" v-model="params.tag_id" @change="searchCard(params)">
        <el-option
          label="全部"
          value=""
        >
        </el-option>
        <el-option
          v-for="item in classSelect"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select> -->
    </div>

    <!-- 详情弹出框 -->
    <detailChartDialog :modules="showDetailChart" @close="closeModule" :detailData="sendDetailData"></detailChartDialog>
  </div>
</template>
<script>
  import chartCard from "./chartCard.vue" //图表卡片
  import basicColumn from "./chart/basicColumn.vue"          //基础柱状图
  import bubblePoint from "./chart/bubblePoint.vue"          //气泡图
  import donut from "./chart/donut.vue"                      //基础环图
  import gauge from "./chart/gauge.vue"                      //仪表图
  import groupedColumn from "./chart/groupedColumn.vue"      //分组柱状图
  import pie from "./chart/pie.vue"                          //饼图
  import seriesLine from "./chart/seriesLine.vue"            //折线图
  import stackedColumn from "./chart/stackedColumn.vue"      //堆叠柱状图
  import stackedPercentageColumn from "./chart/stackedPercentageColumn.vue"       //百分比堆叠柱状图
  import textCard from "./chart/textCard.vue"               //文本卡片
  import tableCard from "./chart/tableCard.vue"            //表格卡片

  import detailChartDialog from "../components/detailChartDialog.vue" //指标详情页
  import toprightControl from "../components/toprightControl.vue"

  export default {
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
      tableCard,
      detailChartDialog,
      toprightControl
    },
    data() {
      return {
        searchQuotaVal: "",//输入框查询指标
        classSelectValue: "",//选择框选择类型
        classSelect: [], //指标类型选择
        cardCharts: [{
          chart_set: [
            {
              name: "对比",
              type: "basicColumn"
            }
          ],
        }],//指标卡片
        params:{
          page: 1, //加载页码
          limit: 30, //加载条数
          keyword:'',
          tag_id:''
        },
        cardloading: false,//正在加载
        loadingText: "", //加载文字
        selectType:"对比",//所选类型
        showDetailChart:false,
        chartstyle:{
          height:300,
          width:530
        },
        sendDetailData:{},
        btnstatus:{
          large:false,//放大和添加按钮SH
          delete:false,//删除按钮
          hidemetter:true,//隐藏新建
          hideAdd:true//隐藏添加
        }
      }
    },
    methods: {
      getCard(params) {
        // if (this.loadingText !== "已经到底了") {
          this.cardloading = true;
          // this.loadingText = "";
          this.$http.get(globalConfig.server + "bisys/card", {
            headers: {"Accept": "application/vnd.boss18+json"},
            params: params
          }).then((res) => {
            if (res.data.code === "20000") {
              res.data.data.data.forEach((item) => {
                this.cardCharts.push(item)
              });
            } else {
              this.cardloading = false;
              this.loadingText = "没有数据"
            }
          });
        // }
      },
      closeModule(val){
        this.showDetailChart = false
      },
      showDetailChartDialog(item){
        if(item.chart_set[0].type == 'tableCard'){
          return
        }
        this.showDetailChart = true
        this.sendDetailData = item
      },
      searchCard(){
        this.loadingText = "";
        this.params.page = 1
        this.cardCharts=[]
        this.getCard(this.params)
      },
      getClassList(){
        this.$http.get(globalConfig.server + "bisys/Tag", {
          headers: {"Accept": "application/vnd.boss18+json"}
        }).then((res) => {
          if (res.data.code === "20000") {
            this.classSelect = res.data.data.data
          } else {
            this.prompt('error',res.data.msg)
          }
        });
      },
      scrollLoad(){
        var self = this
        $(window).scroll(function(){
          let scrollTop = $(this).scrollTop()
          let scrollHeight = $(document).height()
          let windowHeight = $(this).height()

          if(scrollTop + windowHeight === scrollHeight){
            self.params.page++
            self.getCard(self.params)
          }
        })
      }
    },
    mounted() {
      this.getClassList()
      this.getCard(this.params)
      this.scrollLoad()
    }
  }
</script>
<style scoped lang="scss">
  #card {
    margin-bottom: 48px
  }

  // 筛选框
  .filterBox {
    position: absolute;
    top: -42px;
    right: 0;
    transform: translate(-10%, -60%);
    margin: 5px;
    .searchBtn{
      position: absolute;
      right: 6px;
      top: 3px;
      border: none
    }
  }

</style>
<style lang="scss">
  #wareHouseData {
    position: relative;
    // 筛选框
    .filterBox {
      .selectFil {
        float: right;
        width: 120px;
        padding-right: 20px;
        input {
          border-radius: 50px;
          height: 30px;
          line-height: 30px;
        }
        i {
          line-height: 30px;
        }
      }
      .inputFlt {
        float: right;
        width: 200px;
        input {
          border-radius: 50px;
          height: 30px;
          line-height: 30px;
        }
        i {
          line-height: 30px;
        }
      }
    }

  }
</style>
