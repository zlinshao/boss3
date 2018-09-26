<template>
  <!-- 平均收租价格趋势 -->
  <div id="chartCard" >
    <seriesLine :chartheight="chartheight" :chartData="chartData" @click.native="detaildialogVisible=true"></seriesLine>
    <el-dialog
      custom-class="detailDia"
      :show-close="false"
      :visible.sync="detaildialogVisible"
      :modal="false"
      width="65%">
      <div>
        <div class="detailMsgHead">
          <i class="el-icon-arrow-left" @click="detaildialogVisible=false"></i>
          <span>{{theme}}</span>
          <toprightControl></toprightControl>
        </div>
        <div class="detailcontent">
          <div class="contentTop">
            <!-- 城市 -->
            <div class="detailSelect">
              <el-select v-model="value" placeholder="城市" size="small">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <!-- 区域 -->
            <div class="detailSelect">
              <el-select v-model="value" placeholder="区域" size="small">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <!-- 片区 -->
            <div class="detailSelect">
              <el-select v-model="value" placeholder="片区" size="small">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <!-- 开始日期 -->
            <div class="detailSelect" >
              <el-date-picker
                size="small"
                v-model="value7"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions2">
              </el-date-picker>
            </div>
            <div class="detailSelect">
              <el-button type="primary" size="small">查询</el-button>
            </div>
          </div>
          <div class="content">
            <seriesLine :chartheight="chartheightDia" :chartData="chartData"></seriesLine>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import seriesLine from "../../wareHouseData/chart/seriesLine.vue"
  import toprightControl from "../../components/toprightControl.vue"
    export default {
      components:{seriesLine,toprightControl},
      data(){
				return {
          chartData:"",//图表数据
          chartMsg:{  //图表所需信息
            component:'averageRentCollectionPriceTrend',
            id:1,//图表id
            title:'平均收租价格趋势', //标题
            detailMsg:'这是说明。。。。',//说明
            chartType:"seriesLine",//类型
            tag:['财务','业务'],//标签
          },
          theme:"平均收租价格趋势",
          chartheight:260,
          chartheightDia:500,
          detaildialogVisible : false,
          bodyStyle:{
            padding:'0',
            position:'relative',
            height:'',
            width:'100%',
            backgroundColor: '#fff'
          },
          options: [{
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }, {
            value: '选项4',
            label: '龙须面'
          }, {
            value: '选项5',
            label: '北京烤鸭'
          }],
          value: '',
          pickerOptions2: {
            shortcuts: [{
              text: '最近一周',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '最近一个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '最近三个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
              }
            }]
          },
          value7: '',
          jiadata:[{
            "month": "Jan",
            "type": "收房平均月单价",
            "price": 7
            }, {
            "month": "Jan",
            "type": "租房平均月单价",
            "price": 3.9
            }, {
            "month": "Feb",
            "type": "收房平均月单价",
            "price": 6.9
            }, {
            "month": "Feb",
            "type": "租房平均月单价",
            "price": 4.2
            }, {
            "month": "Mar",
            "type": "收房平均月单价",
            "price": 9.5
            }, {
            "month": "Mar",
            "type": "租房平均月单价",
            "price": 5.7
            }, {
            "month": "Apr",
            "type": "收房平均月单价",
            "price": 14.5
            }, {
            "month": "Apr",
            "type": "租房平均月单价",
            "price": 8.5
            }, {
            "month": "May",
            "type": "收房平均月单价",
            "price": 18.4
            }, {
            "month": "May",
            "type": "租房平均月单价",
            "price": 11.9
            }, {
            "month": "Jun",
            "type": "收房平均月单价",
            "price": 21.5
            }, {
            "month": "Jun",
            "type": "租房平均月单价",
            "price": 15.2
            }, {
            "month": "Jul",
            "type": "收房平均月单价",
            "price": 25.2
            }, {
            "month": "Jul",
            "type": "租房平均月单价",
            "price": 17
            }, {
            "month": "Aug",
            "type": "收房平均月单价",
            "price": 26.5
            }, {
            "month": "Aug",
            "type": "租房平均月单价",
            "price": 16.6
            }, {
            "month": "Sep",
            "type": "收房平均月单价",
            "price": 23.3
            }, {
            "month": "Sep",
            "type": "租房平均月单价",
            "price": 14.2
            }, {
            "month": "Oct",
            "type": "收房平均月单价",
            "price": 18.3
            }, {
            "month": "Oct",
            "type": "租房平均月单价",
            "price": 10.3
            }, {
            "month": "Nov",
            "type": "收房平均月单价",
            "price": 13.9
            }, {
            "month": "Nov",
            "type": "租房平均月单价",
            "price": 6.6
            }, {
            "month": "Dec",
            "type": "收房平均月单价",
            "price": 9.6
            }, {
            "month": "Dec",
            "type": "租房平均月单价",
            "price": 4.8
            }]
		    }
      },
			methods:{
       
			},
			mounted(){
        this.bodyStyle.height=this.chartheight+"px";
        
        this.$http.get("http://test.v3.api.boss.lejias.cn/bisys/Statistic/achieveTotal",
        {headers:{
            Accept:"application/vnd.boss18+json"}
        }).then((res) => {
          if (res.data.code === "20000") {
            // let result = res.data.data
            // this.chartData = result.data

            // this.chartMsg.title = result.title
            // this.chartMsg.chartType = result.chartType
            // this.chartMsg.detailMsg = result.detailMsg
            // this.chartMsg.tag = result.tag

            this.chartData = this.jiadata

            this.$emit('sendChartMsg',this.chartMsg)
          }
        })
      }
    }
</script>
<style scoped lang="scss">
//图表详细弹出框
.detailDia {
  .detailMsgHead{
     font-size: 25px;
    i {
     color:#2496FF;
     padding-right:25px;
    }
  }
  .contentTop{
    margin-top: 20px;
    text-align: center;
    .detailSelect{
      display:inline-block;
      width: 15%;
      margin-left: 20px;
      &:nth-of-type(4){
        width: 20%;
      }
      &:last-of-type{
        margin-left:0;
      }
    }
  }
  .content {
    margin-top:30px;
  }
   
}
</style>
<style lang="scss">
  #chartCard .detailDia .el-dialog__header{
    padding:0px;
    border-bottom:none
  }
</style>
