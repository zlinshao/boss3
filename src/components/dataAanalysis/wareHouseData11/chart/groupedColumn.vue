<template>
<!-- 分组柱状图 -->
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
        dataParams:{
          city:"",
          area:"",
          group:"",
          start_date:"2018-01-15",
          end_date:"2018-10-30",
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
          // width:800,
          height:300,
        });
				chart.source(data);
        chart.interval().position('cate*value').color('name').adjust([{
          type: 'dodge',
          marginRatio: 1 / 32
        }]);
        chart.render();
      },
      getChart(){
        this.$http.get(this.url,{headers:{"Accept":"application/vnd.boss18+json"},params: this.dataParams}).then((res) => { 
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
      this.getChart()
    }
  }
</script>
<style scoped>

</style>