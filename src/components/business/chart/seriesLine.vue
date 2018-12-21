<template>
  <!-- 折线图 -->
    <div ref="chartLine">
      <div v-if="chartTextStatus">{{chartText}}</div>
    </div>
</template>
<script>
  export default {
    name:"seriesLine",
    props: ['chartData'],
    data() {
      return {
        chartText:"暂无数据",//显示文本
        chartTextStatus:false,//文本状态
      }
    },
    watch: {
      chartData: function (val) {
        this.chartData  = val;
        this.drawChart(this.chartData);
      }
    },
    mounted() {
      this.drawChart(this.chartData);
    },
    methods: {
      drawChart(data) {
        this.$refs.chartLine.innerHTML  = '';
        let chart = new this.$G2.Chart({
          container: this.$refs.chartLine,
          forceFit: true,
          height: 400,
        });
        chart.source(data);
        chart.scale('value', {
          min: 0
        });
        chart.tooltip({
          crosshairs: {
            name: 'line'
          }
        });
        // chart.axis('value', {
        //   label: {
        //     formatter: function formatter(val) {
        //       return val ;
        //     }
        //   },
        // });
        chart.line().position('date*value').color('name');
        chart.point().position('date*value').color('name').size(4).shape('circle').style({
          stroke: '#fff',
          lineWidth: 1
        });
        chart.render();
      },
    }
  }
</script>
<style scoped>

</style>
