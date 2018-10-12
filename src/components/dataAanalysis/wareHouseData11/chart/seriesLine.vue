<template>
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
        chart.source(data, {
          month: {
            range: [0, 1]
          }
        });
        chart.tooltip({
          crosshairs: {
            type: 'line'
          }
        });
        chart.axis('price', {
          label: {
            formatter: function formatter(val) {
              return val + 'k';
            }
          }
        });
        chart.line().position('month*price').color('type');
        chart.point().position('month*price').color('type').size(4).shape('circle').style({
          stroke: '#fff',
          lineWidth: 1
        });
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