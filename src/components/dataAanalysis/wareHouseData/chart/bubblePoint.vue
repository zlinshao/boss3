<template>
<!-- 气泡图 -->
  <div ref="chartId">
    <div v-if="chartTextStatus">{{chartText}}</div>
  </div>
</template>
<script>
  export default { 
    name:"bubblePoint",
    props:['chartData','chartStyle','params'],
    data(){
      return {
        data:[],
        dataParams:{},
        chartText:"暂无数据",//显示文本
        chartTextStatus:true,//文本状态
        chartReset:{  //图表配置
          colorMap:{}, //各地区气泡颜色
          alias:{},    //设置字段别名
        }
      }
    },
    methods:{
      drawChart(data) { //绘制图表
        this.$refs.chartId.innerHTML  = ''
        var _G = this.$G2,
          Global = _G.Global;

        var colorMap = this.chartReset.colorMap;
        for(let key in colorMap){
          colorMap[key] = Global.colors[colorMap[key]]
        }
        var chart = new this.$G2.Chart({
          container: this.$refs.chartId,
          // forceFit: true,
          width:this.chartStyle.width,
          height:this.chartStyle.height,
        });
        chart.source(data);
        // 为各个字段设置别名
        chart.scale(this.chartReset.alias);
        chart.axis('AverageVacancy', {
          label: {
            formatter: function formatter(value) {
              // return (value / 1000).toFixed(0) + 'k';
              return value
            } // 格式化坐标轴的显示
          }
        });
        chart.tooltip({
          showTitle: false // 不显示默认标题
        });
        chart.legend('HouseNumber', false); // 该图表默认会生成多个图例，设置不展示 HouseNumber 和 city 两个维度的图例
        chart.point().position('AverageVacancy*AverageLife').size('HouseNumber', [1, 65]).color('city', function(val) {
          return colorMap[val];
        }).shape('circle').tooltip('city*HouseNumber*AverageVacancy*AverageLife').style('city', {
          lineWidth: 1,
          strokeOpacity: 1,
          fillOpacity: 0.3,
          opacity: 0.65,
          stroke: function stroke(val) {
            return colorMap[val];
          }
        });
        chart.render();
      },
      getChart(params){ //获取图表
        this.$http.get(this.chartData.data_source,{
          headers:{"Accept":"application/vnd.boss18+json"},
          params: params
        }).then((res) => { 
          if(res.data.code == "20000"){
            res.data.data.forEach((item,index)=>{
              this.chartReset.colorMap[item.city] = index
            })
            this.chartTextStatus = false
            this.data = res.data.data
            this.chartText = ''
            this.drawChart(this.data)
          }else{
            this.chartTextStatus = true
            this.chartText = res.data.msg
            this.prompt('error',res.data.msg)
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
      // },
      resetChart(){  //配置图表
        switch(this.chartData.name){
          case "收房利益指数":
            this.chartReset.alias ={
              AverageLife: {
                alias: '平均年限'
              },
              HouseNumber: {
                alias: '收房数量'
              },
              AverageVacancy: {
                alias: '平均空置期'
              },
              city: {
                alias: '城市'
              }
            }
          break;
         
          default:
          break;
        }
      }
    },
    mounted () {
      this.resetChart()
      this.dataParams = JSON.parse(JSON.stringify(chartParams))
      this.getChartDate(this.dataParams)
      // this.getNewDate()
      this.getChart(this.dataParams)
    }
  }
</script>
<style scoped>

</style>