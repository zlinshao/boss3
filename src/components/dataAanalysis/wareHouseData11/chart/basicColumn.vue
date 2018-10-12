<template>
<!-- 基础柱状图 -->
    <div ref="chartId">

    </div>
</template>
<script>
  export default {
    props:['chartheight','chartData'],
    data(){
      return {
        data:[{
          city: '南京',
          salary: 38 
        }, {
          city: '杭州',
          salary: 52
        }, {
          city: '苏州',
          salary: 61
        }, {
          city: '合肥',
          salary: 145
        }, {
          city: '西安',
          salary: 200
        },{
          city: '成都',
          salary: 150
        },{
          city: '重庆',
          salary: 210
        }]
      }
    },
    methods:{
      drawChart(data) {
        var chart = new this.$G2.Chart({
          container: this.$refs.chartId,
          forceFit: true,
          // width:300,
          height:this.chartheight+50,
        });
        chart.source(data);
        chart.scale('salary', {
          tickInterval: 20
        });
       
        chart.interval().position('city*salary');
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