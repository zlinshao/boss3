<template>
  <!-- 收租房数量对比 -->
  <div id="chartCard" >
    <groupedColumn :chartheight="chartheight" :chartData="chartData" @click.native="detaildialogVisible=true"></groupedColumn>
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
            <groupedColumn :chartheight="chartheightDia" :chartData="chartData"></groupedColumn>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import toprightControl from "../../components/toprightControl.vue"
  import groupedColumn from "../../wareHouseData/chart/groupedColumn.vue"
    export default {
      components:{groupedColumn,toprightControl},
      data(){
				return {
          chartData:'',//图表数据
          chartMsg:{  //图表所需信息
            component:'collectionRentHouseCompare',
            id:1,//图表id
            title:'收租房数量对比', //标题
            detailMsg:'这是说明',//说明
            chartType:"groupedColumn",//类型
            tag:['业务'],//标签
          },
          theme:"收租房数量对比",
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
            "name": "本期",
            "城市": "南京",
            "业绩": 18.9
          }, {
            "name": "本期",
            "城市": "杭州",
            "业绩": 28.8
          }, {
            "name": "本期",
            "城市": "苏州",
            "业绩": 39.3
          }, {
            "name": "本期",
            "城市": "合肥",
            "业绩": 81.4
          }, {
            "name": "本期",
            "城市": "西安",
            "业绩": 47
          }, {
            "name": "本期",
            "城市": "成都",
            "业绩": 20.3
          }, {
            "name": "本期",
            "城市": "重庆",
            "业绩": 24
          }, {
            "name": "上期",
            "城市": "南京",
            "业绩": 12.4
          }, {
            "name": "上期",
            "城市": "杭州",
            "业绩": 23.2
          }, {
            "name": "上期",
            "城市": "苏州",
            "业绩": 34.5
          }, {
            "name": "上期",
            "城市": "合肥",
            "业绩": 99.7
          }, {
            "name": "上期",
            "城市": "西安",
            "业绩": 52.6
          }, {
            "name": "上期",
            "城市": "成都",
            "业绩": 35.5
          }, {
            "name": "上期",
            "城市": "重庆",
            "业绩": 37.4
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
  .meterpop.el-popover.el-popper{
    border: none;
    box-shadow:none;
    background:none;
    padding:0px 12px;
  }
  #chartCard .detailDia .el-dialog__header{
    padding:0px;
    border-bottom:none
  }
</style>
