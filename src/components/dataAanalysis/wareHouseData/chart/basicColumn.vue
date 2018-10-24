<template>
<!-- 基础柱状图 -->
  <div>
    {{params}}
    {{dataParams}}
    <div ref="chartId" >
      <div v-if="chartTextStatus">{{chartText}}</div>
    </div>
  </div>
</template>
<script>
  export default {
    props:['chartData','chartStyle','params'],
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
    watch: {
      params(val){
        this.dataParams = val
        console.log(val)
        this.getChart()
      }
    },
    methods:{
      drawChart(data) {
        console.log(this.dataParams)
        this.$refs.chartId.innerHTML  = ''
        var chart = new this.$G2.Chart({
          container: this.$refs.chartId,
          forceFit: true,
          height:this.chartStyle.height, 
        });
        chart.source(data);
        chart.interval().position('cate*value');
        chart.render();
      },
      getChart(){
        this.$http.get(this.chartData.data_source,{headers:{"Accept":"application/vnd.boss18+json"},params: this.dataParams}).then((res) => { 
          if(res.data.code == "20000"){
            this.chartTextStatus = false
            this.data = res.data.data
            this.chartText = ''
            setTimeout(()=>{
              this.drawChart(this.data)
            },1500)
          }else{
            this.chartTextStatus = true
            this.chartText = res.data.msg
          }
        });
        // setTimeout(() => {
        //   this.chartTextStatus = false
        //   this.data = zhuzhuangtu
        //   this.drawChart(this.data)
        // }, 1500);
         
      },
      getDate(){
        // var start_date = 
      }


    },
    mounted () {
      console.log(this.params)
      setTimeout(()=>{this.getChart()},2000)
    }
  }
</script>
<style scoped>

</style>