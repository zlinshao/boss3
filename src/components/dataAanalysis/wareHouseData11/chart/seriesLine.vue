<template>
  <!-- 折线图 -->
  <div ref="chartId">
    <div v-if="chartTextStatus">{{chartText}}</div>
  </div>
</template>
<script>
  export default {
    props: ['chartData'],
    data() {
      return {
        data: [],
        dataParams: {
          city:"",
          area:"",
          group:"",
          start_date: "2018-01-15",
          end_date: "2018-10-30",
        },
        chartText:"暂无数据",//显示文本
        chartTextStatus:true,//文本状态
      }
    },
    methods: {
      drawChart(data) {
        let chart = new this.$G2.Chart({
          container: this.$refs.chartId,
          forceFit: true,
          // width:800,
          height: 300,
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
      getChart() {
        this.$http.get(this.chartData.data_source, {
          headers: {"Accept": "application/vnd.boss18+json"},
          params: this.dataParams
        }).then((res) => {
          console.log(res);
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
      }
    },
    mounted() {
      this.getChart()
    }
  }
</script>
<style scoped>

</style>
