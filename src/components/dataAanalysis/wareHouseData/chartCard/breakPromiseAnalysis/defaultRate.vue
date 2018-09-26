<template>
  <!-- 违约率占比 -->
  <div id="chartCard" >
    <el-card class="box-card"
      style="width:100%"
      :body-style="bodyStyle"
      shadow = "hover"
      >
      <!-- 说明弹出框 -->
      <div slot="header" class="clearfix card-header" >
        <span>{{theme}}</span>
        <toprightControl></toprightControl>
      </div>
      <div> 
        <div style="width:100%;height:260px;position:relative" @dblclick="detaildialogVisible=true">
          <stackedPercentageColumn :chartheight="chartheight"></stackedPercentageColumn>
        </div>
      </div>
    </el-card>
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
            <stackedPercentageColumn :chartheight="chartheightDia"></stackedPercentageColumn>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import toprightControl from "../../../components/toprightControl.vue"
  import stackedPercentageColumn from "../../chart/stackedPercentageColumn.vue"
    export default {
      components:{stackedPercentageColumn,toprightControl},
      data(){
				return {
          theme:"违约率占比",
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

		    }
      },
			methods:{
       
			},
			mounted(){
        this.bodyStyle.height=this.chartheight+"px"
      },
    }
</script>
<style scoped lang="scss">
	.clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .card-header{
    border: none
  }
  .box-card {
    width: 100%;
    border-radius: 4px;
    position: relative;
    overflow: hidden;
    box-shadow: 0px 4px 12px 0px rgba(0,0,0,0.2);
    &:hover{
      border:1px solid #409EFF
    }
  }

  // 仪表弹出框
  
  .pluspop{
  position: absolute;
  background-color: #fff;
  border: 1px solid #D2D2D2;
  border-radius: 4px;
   z-index:999;
  &.popFirst{
    top:-8px;
    right: 10px;	
  }
  &.popSecond{
    top:-35px;
    right: -155px;	
    li {
      &:first-of-type{
        border-bottom : 1px #D2D2D2 solid;
        i {
          color: #409EFF
        }
      }
    }
  }
  li {
    i{
      padding-right: 20px
    }
    button{
      margin: 0;
      width: 100%;
      text-align:left;
    }
    .el-button--text{
      display: block;
      color: #D2D2D2
    }
    width: 150px;
    padding: 3px 0;
    margin: 6px 10px;
    cursor: pointer;
    color: #D2D2D2;
    
  }
}
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
