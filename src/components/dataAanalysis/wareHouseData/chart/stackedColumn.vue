<template>
<!-- 堆叠柱状图 -->
  <div ref="chartId">
    <div v-if="chartTextStatus">{{chartText}}</div>
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
          date:"2018-10-17",
          status:false
        },
        chartText:"暂无数据",//显示文本
        chartTextStatus:true,//文本状态
        chartReset:{  //图表配置
          fields:[], //字段集
          key:"",   //key字段名
          value:"",  //value字段名
          
        }
        
      }
    },
    watch: {
      params:{
        handler(val){
          console.log(val)
           this.dataParams = val
           this.getChart()
        },
        deep:true
      }
    },
    methods:{
      drawChart(data) { //图表绘画
        var ds = new this.$DataSet();
        var dv = ds.createView().source(data);
        dv.transform({
          type: 'fold',
          fields: this.chartReset.fields, // 展开字段集
          key: this.chartReset.key, // key字段
          value: this.chartReset.value // value字段
        });

        var chart = new this.$G2.Chart({
          container: this.$refs.chartId,
          forceFit: true,
          height:this.chartStyle.height,
        });
        chart.source(dv);
        chart.intervalStack().position(this.chartReset.key+'*'+this.chartReset.value).color('name');
        chart.render();
      },
      getChart(){ //获取图表
        this.$http.get(this.chartData.data_source,{headers:{"Accept":"application/vnd.boss18+json"},params: this.dataParams}).then((res) => { 
        
          if(res.data.code == "20000"){
            for(let key in res.data.data[0]){
              if(key!=="name"){
                this.chartReset.fields.push(key)
              }
            }
            this.resetChart()
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
      resetChart(){ //配置图表
        switch(this.chartData.data_source){
          case "租房炸单数量、炸单率":
            this.chartReset.key = "城市";
            this.chartReset.value = "炸弹率";
          break;
          case "空置期抵消差额":
            this.chartReset.key = "城市";
            this.chartReset.value = "炸弹率";
          break;
          default:
          break;
        }
      },
      getNewDate(){
        var date =  new Date()
        var lastdate = new Date(date.getTime() - 3600 * 1000 * 24)
        var year = lastdate.getFullYear();
        var month = lastdate.getMonth()+1;   
        var day = lastdate.getDate(); 
        this.dataParams.start_date = year + '-' +month + '-' + day
        this.dataParams.end_date = year + '-' +month + '-' + day
      }
    },
    mounted () {
      this.getNewDate()
      this.getChart()
    }
  }
</script>
<style scoped>

</style>