<template>
<!-- 气泡图 -->
  <div ref="chartId">
    <div v-if="chartTextStatus">{{chartText}}</div>
  </div>
</template>
<script>
  export default {
    props:['url','chartName'],
    data(){
      return {
        data:[],
        dataParams:{//传入参数
          city:"",
          area:"",
          group:"",
          start_date:"2018-9-1",
          end_date:"2018-10-17",
        },
        chartText:"暂无数据",//显示文本
        chartTextStatus:true,//文本状态
        chartReset:{  //图表配置
          colorMap:{}, //各地区气泡颜色
          alias:{},    //设置字段别名
        },
        city:""
      }
    },
    methods:{
      drawChart(data) { //绘制图表
        var _G = this.$G2,
          Global = _G.Global;

        var colorMap = this.chartReset.colorMap;
        for(let key in colorMap){
          colorMap[key] = Global.colors[colorMap[key]]
        }
        var chart = new this.$G2.Chart({
          container: this.$refs.chartId,
          forceFit: true,
          height:300,
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
      getChart(){ //获取图表
        console.log(this.url)
        this.$http.get(this.url,{headers:{"Accept":"application/vnd.boss18+json"},params: this.dataParams}).then((res) => { 
          console.log(res)
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
          }
        });
      },
      resetChart(){  //配置图表
        switch(this.chartName){
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
      this.getChart()
    }
  }
</script>
<style scoped>

</style>