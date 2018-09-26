<template>
<!-- 百分比堆叠柱状图 -->
    <div ref="chartId">

    </div>
</template>
<script>
  export default {
    props:['chartheight','chartData'],
    data(){
      return {

      }
    },
    methods:{
      drawChart(data) {
        var ds = new this.$DataSet();
          var dv = ds.createView().source(data).transform({
            type: 'percent',
            field: 'value', // 统计销量
            dimension: 'achievement', // 每年的占比
            groupBy: ['city'], // 以不同产品类别为分组
            as: 'percent'
          });

          var chart = new G2.Chart({
            container: this.$refs.chartId,
            forceFit: true,
            // width:800,
            height:this.chartheight+30,
          });
          chart.source(dv, {
            percent: {
              min: 0,
              formatter: function formatter(val) {
                return (val * 100).toFixed(2) + '%';
              }
            }
          });
          chart.intervalStack().position('city*percent').color('achievement');
          chart.render();
      },
    },
    mounted () {
      if(this.chartData){
        this.drawChart(this.chartData)
      }
    },
    watch:{
      chartData(val){
        this.$refs.chartId.innerHTML = ""
        this.drawChart(val)
      }
    }
  }
</script>
<style scoped>

</style>