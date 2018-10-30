<template>
<!-- 基础柱状图 -->
    <div ref="chartId" >
      <div v-if="chartTextStatus">{{chartText}}</div>
    </div>
</template>
<script>
  export default {
    name:"basicColumn",
    props:['chartData','chartStyle','params'],
    data(){
      return {
        data:[],
        dataParams:{},
        chartText:"暂无数据",//显示文本
        chartTextStatus:true,//文本状态
      }
      
      
    },
    watch: {},
    methods:{
      drawChart(data) {
        // console.log(this.dataParams)
        this.$refs.chartId.innerHTML  = ''
        var chart = new this.$G2.Chart({
          container: this.$refs.chartId,
          width:this.chartStyle.width,
          height:this.chartStyle.height, 
          // forceFit: true,
        });
        chart.source(data);
        chart.interval().position('cate*value');
        chart.render();
      },
      getChart(params){
        this.$http.get(this.chartData.data_source,{
          headers:{"Accept":"application/vnd.boss18+json"},
          params: params
        }).then((res) => { 
          if(res.data.code == "20000"){
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
      // }
    },
    mounted () {
      // console.log(this.params)
      this.dataParams = JSON.parse(JSON.stringify(chartParams))
      this.getChartDate(this.dataParams)
      this.getChart(this.dataParams)
      
    }
  }
</script>
<style scoped>

</style>