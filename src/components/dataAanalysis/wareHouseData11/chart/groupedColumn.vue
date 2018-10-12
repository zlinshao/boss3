<template>
<!-- 堆叠柱状图 -->
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
        var chart = new this.$G2.Chart({
          container: this.$refs.chartId,
          forceFit: true,
          // width:800,
          height:this.chartheight+30,
        });
				chart.source(data);
        chart.interval().position('城市*业绩').color('name').adjust([{
          type: 'dodge',
          marginRatio: 1 / 32
        }]);
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