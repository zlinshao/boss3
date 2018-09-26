<template>
  <!-- 平均月租房单价 -->
  <div id="chartCard" >
     <basicColumn :chartheight="chartheight" :chartData="chartData" @click.native="detaildialogVisible=true"></basicColumn>
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
            <basicColumn :chartheight="chartheightDia" :chartData="chartData"></basicColumn>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import toprightControl from "../../components/toprightControl.vue"
  import basicColumn from "../../wareHouseData/chart/basicColumn.vue"
    export default {
      components:{basicColumn,toprightControl},
      data(){
				return {
          chartData:'',//图表数据
          chartMsg:{  //图表所需信息
            component:'averageMonthRentPrice',
            id:1,//图表id
            title:'平均月租房单价', //标题
            detailMsg:"这是说明。。。。",//说明
            chartType:"basicColumn",//类型
            tag:['财务','业务'],//标签
          },
          theme:"平均月租房单价",
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
            city: '南京',
            salary: 290 
          }, {
            city: '杭州',
            salary: 260
          }, {
            city: '苏州',
            salary: 320
          }, {
            city: '合肥',
            salary: 200
          }, {
            city: '西安',
            salary: 300
          },{
            city: '成都',
            salary: 150
          },{
            city: '重庆',
            salary: 210
          }]
		    }
      },
			methods:{
       
			},
			mounted(){
        this.bodyStyle.height=this.chartheight+"px"
        
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
      },
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
