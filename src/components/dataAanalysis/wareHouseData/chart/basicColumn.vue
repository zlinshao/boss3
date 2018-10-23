<template>
<!-- 基础柱状图 -->
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
      }
      
     
    },
    methods:{
      drawChart(data) {
        var chart = new this.$G2.Chart({
          container: this.$refs.chartId,
          forceFit: true,
          height:300, 
        });
        chart.source(data);
        chart.interval().position('cate*value');
        chart.render();
      },
      getChart(){
        console.log(this.chartData.data_source)
        this.$http.get(this.chartData.data_source,{headers:{"Accept":"application/vnd.boss18+json"},params: this.dataParams}).then((res) => { 
          console.log(res)
          if(res.data.code == "20000"){
            this.chartTextStatus = false
            this.data = res.data.data
            this.chartText = ''
            this.drawChart(this.data)
          }else{
            this.chartTextStatus = true
            this.chartText = res.data.msg
          }
        });
      }

    },
    mounted () {
      setTimeout(()=>{this.getChart()},2000)
    }
  }
</script>
<style scoped>

</style>