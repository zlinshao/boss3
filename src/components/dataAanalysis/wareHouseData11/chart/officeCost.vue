<template>
    <div ref="chartId">

    </div>
</template>
<script>
  export default {
    data(){
      return {
        class:['人力','财务'],
        chartData:[{
          "State": "AL",
          "Under 5 Years": 310504,
          "5 to 13 Years": 552339,
          "14 to 17 Years": 259034,
          "18 to 24 Years": 450818,
          "25 to 44 Years": 1231572,
          "45 to 64 Years": 1215966,
          "65 Years and Over": 641667
        }, {
          "State": "AK",
          "Under 5 Years": 52083,
          "5 to 13 Years": 85640,
          "14 to 17 Years": 42153,
          "18 to 24 Years": 74257,
          "25 to 44 Years": 198724,
          "45 to 64 Years": 183159,
          "65 Years and Over": 50277
        }, {
          "State": "AZ",
          "Under 5 Years": 515910,
          "5 to 13 Years": 828669,
          "14 to 17 Years": 362642,
          "18 to 24 Years": 601943,
          "25 to 44 Years": 1804762,
          "45 to 64 Years": 1523681,
          "65 Years and Over": 862573
        }, {
          "State": "AR",
          "Under 5 Years": 202070,
          "5 to 13 Years": 343207,
          "14 to 17 Years": 157204,
          "18 to 24 Years": 264160,
          "25 to 44 Years": 754420,
          "45 to 64 Years": 727124,
          "65 Years and Over": 407205
        }, {
          "State": "CA",
          "Under 5 Years": 2704659,
          "5 to 13 Years": 4499890,
          "14 to 17 Years": 2159981,
          "18 to 24 Years": 3853788,
          "25 to 44 Years": 10604510,
          "45 to 64 Years": 8819342,
          "65 Years and Over": 4114496
        }, {
          "State": "CO",
          "Under 5 Years": 358280,
          "5 to 13 Years": 587154,
          "14 to 17 Years": 261701,
          "18 to 24 Years": 466194,
          "25 to 44 Years": 1464939,
          "45 to 64 Years": 1290094,
          "65 Years and Over": 511094
        }, {
          "State": "CT",
          "Under 5 Years": 211637,
          "5 to 13 Years": 403658,
          "14 to 17 Years": 196918,
          "18 to 24 Years": 325110,
          "25 to 44 Years": 916955,
          "45 to 64 Years": 968967,
          "65 Years and Over": 478007
        }],
        data:[{
          "city": "南京",
          "id":10,
          "办公室房租": 310504,
          "宽带费用": 552339,
          "电脑等办公用品": 259034,
          "搬家费": 450818,
          "家具办公桌椅": 1231572,
        }, {
          "city": "上海",
          "id":12,
          "办公室房租": 52083,
          "宽带费用": 85640,
          "电脑等办公用品": 42153,
          "搬家费": 74257,
          "家具办公桌椅": 198724,
        }]
      }
    },
    methods:{
      drawChart() {
        var _DataSet = this.$DataSet,
          DataView = _DataSet.DataView;
        var _G = this.$G2,
          Chart = _G.Chart;

        
        var typeclass = ['Under 5 Years', '5 to 13 Years', '14 to 17 Years', '18 to 24 Years', '25 to 44 Years', '45 to 64 Years', '65 Years and Over'];
        var dv = new this.$DataSet.DataView();
        dv.source(this.chartData).transform({
          type: 'fold',
          fields: typeclass,
          key: 'typeclass',
          value: 'population',
          retains: ['State']
        }).transform({
          type: 'map',
          callback: function callback(obj) {
            var key = obj.typeclass;
            var type = void 0;
            if (key === 'Under 5 Years' || key === '5 to 13 Years' || key === '14 to 17 Years') {
              type = 'a';
            } else if (key === '18 to 24 Years') {
              type = 'b';
            } else if (key === '25 to 44 Years') {
              type = 'c';
            } else {
              type = 'd';
            }
            obj.type = type;
            return obj;
          }
        });
        var colorMap = {
          'Under 5 Years': '#E3F4BF',
          '5 to 13 Years': '#BEF7C8',
          '14 to 17 Years': '#86E6C8',
          '18 to 24 Years': '#36CFC9',
          '25 to 44 Years': '#209BDD',
          '45 to 64 Years': '#1581E6',
          '65 Years and Over': '#0860BF'
        };
        var chart = new this.$G2.Chart({
          container: this.$refs.chartId,
          forceFit: true,
          // height: window.innerHeight,
          height:260,
          padding: [20, 160, 80, 60]
        });
        chart.source(dv, {
          population: {
            tickInterval: 1000000
          }
        });
        chart.axis('population', {
          label: {
            formatter: function formatter(val) {
              return val / 1000000 + 'M';
            }
          }
        });
        chart.legend({
          position: 'right'
        });
        chart.interval().position('State*population').color('typeclass', function(age) {
          return colorMap[typeclass];
        }).tooltip('typeclass*population', function(typeclass, population) {
          return {
            name: typeclass,
            value: population
          };
        }).adjust([{
          type: 'dodge',
          dodgeBy: 'type', // 按照 type 字段进行分组
          marginRatio: 0 // 分组中各个柱子之间不留空隙
        }, {
          type: 'stack'
        }]);
        chart.render();
      },

    },
    mounted () {
      this.drawChart()
    },
    watch:{
      class(val){
        if(!val){
          this.$emit('upClass')
        }
      }
    }
  }
</script>
<style scoped>

</style>