<template>
  <div id="wareHouseData">
    <!-- 图表展示 -->
    <div>
      <el-row :gutter="20">
        <el-col :span="8" v-for="(item,index) in cardCharts" :key="index">
          <!-- 图表卡片 -->
          <chartCard id="card" :cardData="item" v-if="item.name === '业绩环比增长'">
            <!-- <component :is="item.chart_set[0].type" :url="item.data_source"></component> -->
            <!-- <basicColumn :url="item.data_source"></basicColumn> -->
            <seriesLine :url="item.data_source"></seriesLine>
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
        v-model="searchQuotaVal">
      </el-input>
      <el-select placeholder="全部" class="selectFil" v-model="classSelectValue">
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
      tableCard
    },
    data() {
      return {
        searchQuotaVal: "",//输入框查询指标
        classSelectValue: "",//选择框选择类型
        classSelect: [{    //指标类型选择
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
        cardCharts: [],//指标卡片
        page: 1, //加载页码
        limit: 31, //加载条数
        cardloading: false,//正在加载
        loadingText: "", //加载文字
      }
    },
    methods: {
      getCard(page) {
        if (this.loadingText !== "已经到底了") {
          this.cardloading = true;
          this.loadingText = "";
          this.$http.get(globalConfig.server + "bisys/card", {
            headers: {"Accept": "application/vnd.boss18+json"},
            params: {page: page, limit: this.limit}
          }).then((res) => {
            if (res.data.code === "20000") {
              res.data.data.data.forEach((item) => {
                this.cardCharts.push(item)
              });
            } else {
              this.cardloading = false;
              this.loadingText = "已经到底了"
            }
          });
        }
      }
    },
    mounted() {
      this.getCard(this.page)
    },
    created() {
      let self = this;
      $(window).scroll(function () { //滚动到页面底部加载数据
        let scrollTop = $(this).scrollTop();
        let scrollHeight = $(document).height();
        let windowHeight = $(this).height();
        if (scrollTop + windowHeight === scrollHeight) {
          self.page += 1;
          self.getCard(self.page)
        }
      })
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
    top: 0;
    right: 0;
    transform: translate(-10%, -60%);
    height: 100px;
    margin: 5px;
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
