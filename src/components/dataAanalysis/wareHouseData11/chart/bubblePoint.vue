<template>
<!-- 气泡图 -->
    <div ref="chartId">

    </div>
</template>
<script>
  export default {
    props:['chartheight','chartData'],
    data(){
      return {
        data:[{
          city: "南京",
          AverageLife: 5,
          AverageVacancy: 5,
          HouseNumber: 500
          },{
          city: "杭州",
          AverageLife: 4,
          AverageVacancy:4,
          HouseNumber: 300
          },
          {
          city: "苏州",
          AverageLife:5,
          AverageVacancy:7,
          HouseNumber: 400
          },{
          city: "合肥",
          AverageLife: 3,
          AverageVacancy: 6,
          HouseNumber: 600
          },{
          city: "西安",
          AverageLife: 6,
          AverageVacancy: 2,
          HouseNumber: 450
          },{
          city: "成都",
          AverageLife: 7,
          AverageVacancy: 4,
          HouseNumber: 360
          },{
          city: "重庆",
          AverageLife: 2,
          AverageVacancy: 9,
          HouseNumber: 380
          }],
        monidata:{
            code:200,
            msg:'请求成功',
            result:{
              title:"收房利益指数",
              chartType:"bubblePoint", 
              tag:['业务'],
              detailMsg:"图表说明信息......",
              data:[{
              city: "南京",
              AverageLife: 5,
              AverageVacancy: 5,
              HouseNumber: 500
              },{
              city: "杭州",
              AverageLife: 4,
              AverageVacancy:4,
              HouseNumber: 300
              },
              {
              city: "苏州",
              AverageLife:5,
              AverageVacancy:7,
              HouseNumber: 400
              },{
              city: "合肥",
              AverageLife: 3,
              AverageVacancy: 6,
              HouseNumber: 600
              },{
              city: "西安",
              AverageLife: 6,
              AverageVacancy: 2,
              HouseNumber: 450
              },{
              city: "成都",
              AverageLife: 7,
              AverageVacancy: 4,
              HouseNumber: 360
              },{
              city: "重庆",
              AverageLife: 2,
              AverageVacancy: 9,
              HouseNumber: 380
              }]
            }
          }
      }
    },
    methods:{
      drawChart(data) {
        var _G = this.$G2,
          Global = _G.Global;

        var colorMap = {
          '苏州': Global.colors[0],
          '南京': Global.colors[1],
          '合肥': Global.colors[2],
          '杭州': Global.colors[3],
          '西安': Global.colors[4],
          '成都': Global.colors[5],
          '重庆': Global.colors[6]
        };
        var chart = new this.$G2.Chart({
          container: this.$refs.chartId,
          forceFit: true,
          // width:800,
          height:this.chartheight,
        });
        chart.source(data);
        // 为各个字段设置别名
        chart.scale({
          AverageLife: {
            alias: '平均年限'
          },
          HouseNumber: {
            type: 'pow',
            alias: '收房数量'
          },
          AverageVacancy: {
            alias: '平均空置期'
          },
          city: {
            alias: '城市'
          }
        });
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