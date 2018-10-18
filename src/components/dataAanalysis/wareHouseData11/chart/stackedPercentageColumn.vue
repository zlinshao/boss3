<template>
<!-- 百分比堆叠柱状图 -->
  <div ref="chartId">
    <div v-if="chartTextStatus">{{chartText}}</div>
  </div>
</template>
<script>
  export default {
    props:['chartData'],
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
          type: 'percent',
          field:"",   //统计值
          dimension:"", //类别
          groupBy:"",   //以。。分组
          as: 'percent'
        }
      }
    },
    methods:{
      drawChart(data) { //图表绘制
        var ds = new this.$DataSet();
          var dv = ds.createView().source(data).transform(this.chartReset);

          var chart = new G2.Chart({
            container: this.$refs.chartId,
            forceFit: true,
            // width:800,
            height:300,
          });
          chart.source(dv, {
            percent: {
              min: 0,
              formatter: function formatter(val) {
                return (val * 100).toFixed(2) + '%';
              }
            }
          });
          chart.intervalStack().position(this.chartReset.groupBy[0]+'*percent').color(this.chartReset.dimension);
          chart.render();
      },
      getChart(){ //获取图表
        this.$http.get(this.chartData.data_source,{headers:{"Accept":"application/vnd.boss18+json"},params: this.dataParams}).then((res) => { 
          console.log(res)
          if(res.data.code == "20000"){
            this.chartTextStatus = false
            this.resetChart()
            this.data = res.data.data
            this.chartText = ''
            this.drawChart(this.data)
          }else{
            this.chartTextStatus = true
            this.chartText = res.data.msg
          }
        });
      },
      resetChart(){ //配置图表
        switch(this.chartData.name){
          case "房屋周转率":
            this.chartReset.field = "value"
            this.chartReset.dimension = "name";
            this.chartReset.groupBy = ["cate"];
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