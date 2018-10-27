<template>
  <!-- 折线图 -->
  <div ref="chartId">
    <div v-if="chartTextStatus">{{chartText}}</div>
  </div>
</template>
<script>
  export default {
    props: ['chartData','chartStyle','params'],
    data() {
      return {
        data: [],
        dataParams: {},
        chartText:"暂无数据",//显示文本
        chartTextStatus:true,//文本状态
      }
    },
    methods: {
      drawChart(data) {
        this.$refs.chartId.innerHTML  = ''
        let chart = new this.$G2.Chart({
          container: this.$refs.chartId,
          forceFit: true,
          // width:800,
          height: this.chartStyle.height,
        });
        chart.source(data, {
          date: {
            range: [0, 1]
          }
        });
        chart.tooltip({
          crosshairs: {
            name: 'line'
          }
        });
        chart.axis('value', {
          label: {
            formatter: function formatter(val) {
              return val ;
            }
          }
        });
        chart.line().position('date*value').color('name');
        chart.point().position('date*value').color('name').size(4).shape('circle').style({
          stroke: '#fff',
          lineWidth: 1
        });
        chart.render();
      },
      getChart(params) {
        this.$http.get(this.chartData.data_source, {
          headers: {"Accept": "application/vnd.boss18+json"},
          params: params
        }).then((res) => {
          if (res.data.code === "20000") {
            this.chartTextStatus = false
            this.data = res.data.data;
            this.chartText = ''
            this.drawChart(this.data)
          } else {
            this.chartTextStatus = true
            this.chartText = res.data.msg
          }
        });
      },
      // getNewDate(){
      //   var date =  new Date()
      //   var lastdate = new Date(date.getTime() - 3600 * 1000 * 24)
      //   var year = lastdate.getFullYear();
      //   var month = lastdate.getMonth()+1;   
      //   var day = lastdate.getDate(); 
      //   this.dataParams.start_date = year + '-' +month + '-' + day
      //   this.dataParams.end_date = year + '-' +month + '-' + day
      // }
    },
    mounted() {
      this.dataParams = JSON.parse(JSON.stringify(chartParams))
      this.getChartDate(this.dataParams)
      // this.getNewDate()
      this.getChart(this.dataParams)
    }
  }
</script>
<style scoped>

</style>
