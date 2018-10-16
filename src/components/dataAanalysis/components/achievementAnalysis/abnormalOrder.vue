<template>
  <!-- 异常单列表 -->
  <div id="chartCard">
    <tableCard :theme="theme" :chartData="chartData"></tableCard>
  </div>
</template>
<script>
  import tableCard from "../../wareHouseData/chart/tableCard.vue"

  export default {
    components: {tableCard},
    data() {
      return {
        theme: "异常单列表",
        chartData: '',  //图表数据
        chartMsg: {     //图表所需信息
          component: 'abnormalOrder',
          id: 1,                   //图表id
          title: '异常单列表',     //标题
          detailMsg: '这是说明',   //说明
          chartType: "table",     //类型
          tag: ['业务'],          //标签
        },
        jiadata: [{
          area: '南京油坊桥组',
          manager: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          price: '200'
        }, {
          area: '南京油坊桥组',
          manager: '小红',
          address: '上海市普陀区金沙江路 1518 弄',
          price: '200'
        }, {
          area: '南京油坊桥组',
          manager: '小明',
          address: '上海市普陀区金沙江路 1518 弄',
          price: '200'
        }, {
          area: '南京油坊桥组',
          manager: '小明',
          address: '上海市普陀区金沙江路 1518 弄',
          price: '200'
        }, {
          area: '南京油坊桥组',
          manager: '小明',
          address: '上海市普陀区金沙江路 1518 弄',
          price: '200'
        }, {
          area: '南京油坊桥组',
          manager: '小明',
          address: '上海市普陀区金沙江路 1518 弄',
          price: '200'
        }, {
          area: '南京油坊桥组',
          manager: '小明',
          address: '上海市普陀区金沙江路 1518 弄',
          price: '200'
        }, {
          area: '南京油坊桥组',
          manager: '小明',
          address: '上海市普陀区金沙江路 1518 弄',
          price: '200'
        }]
      }
    },
    methods: {},
    mounted() {
      this.$http.get(globalConfig.server + "bisys/Statistic/achieveTotal", {
        headers: {
          Accept: "application/vnd.boss18+json"
        }
      }).then((res) => {
        if (res.data.code === "20000") {
          // let result = res.data.data
          // this.chartData = result.data
          // this.chartMsg.title = result.title
          // this.chartMsg.chartType = result.chartType
          // this.chartMsg.detailMsg = result.detailMsg
          // this.chartMsg.tag = result.tag
          this.chartData = this.jiadata;
          this.$emit('sendChartMsg', this.chartMsg)
        } else {
          this.chartData = [];
        }
      })
    },
  }
</script>
<style scoped lang="scss">

</style>
