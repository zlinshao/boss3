<template>
<!-- 堆叠柱状图 -->
    <div ref="chartId">

    </div>
</template>
<script>
  export default {
    props:['chartheight','chartData'],
    data(){
      return {
        monidata:{
            code:200,
            msg:'请求成功',
            result:{
              title:"租房炸弹数量、炸单率",
              chartType:"groupedColumn", 
              tag:['业务'],
              detailMsg:"图表说明信息......",
              data:[{
                name: '租房位炸单数量',
                '南京': 18.9,
                '杭州': 28.8,
                '苏州': 39.3,
                '合肥': 81.4,
                '西安': 47,
                '成都': 20.3,
                '重庆': 24,
              }, {
                name: '租房炸单数量',
                '南京': 12.4,
                '杭州': 23.2,
                '苏州': 34.5,
                '合肥': 99.7,
                '西安': 52.6,
                '成都': 35.5,
                '重庆': 37.4,
              }]
            }
          }
      }
    },
    methods:{
      drawChart(data) {
        var ds = new this.$DataSet();
        var dv = ds.createView().source(data);
        dv.transform({
          type: 'fold',
          fields: ['南京', '杭州', '苏州', '合肥', '西安', '成都', '重庆'], // 展开字段集
          key: '城市', // key字段
          value: '炸单率' // value字段
        });

        var chart = new this.$G2.Chart({
          container: this.$refs.chartId,
          forceFit: true,
          // width:800,
          height:this.chartheight,
        });
        chart.source(dv);
        chart.intervalStack().position('城市*炸单率').color('name');
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