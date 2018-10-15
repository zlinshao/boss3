<template>
<!-- 折线图 -->
    <div ref="chartId">

    </div>
</template>
<script>
  export default {
    props:['chartheight','url'],
    data(){
      return {
        data:[],
        dataParams:{
          // city:"",
          // area:"",
          // group:"",
          start_date:"2018-01-15",
          end_date:"2018-10-30",
        },
        interval:"",
        chartText:"",//显示文本
      }
    },
    methods:{
      drawChart(data) {
        var chart = new this.$G2.Chart({
          container: this.$refs.chartId,
          forceFit: true,
          // width:800,
          height:300,
        });
        chart.source(data, {
          month: {
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
              return val + 'k';
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
      getChart(){
        console.log(this.url)
        this.$http.get(this.url,{headers:{"Accept":"application/vnd.boss18+json"},params: this.dataParams}).then((res) => { 
          console.log(res)
          if(res.data.code == "20000"){
            this.data = res.data.data
            this.chartText = ''
            let arr = res.data.data
            arr.sort()
            this.interval = Math.ceil((arr[arr.length-1]-arr[0])/arr.length)
            this.drawChart(this.data)
          }else{
            this.chartText = res.data.msg
          }
        });
      }
    },
    mounted () {
      this.getChart()
      // if(this.chartData){
      //   this.drawChart(this.chartData)
      // }
    }
  }
</script>
<style scoped>

</style>