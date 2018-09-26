<template>
  <!-- 异常单列表 -->
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
        <div style="width:100%;height:260px;position:relative">
          <tableCard :theme="theme"></tableCard>
        </div>
      </div>
    </el-card>
    
  </div>
</template>
<script>
  import toprightControl from "../../../components/toprightControl.vue"
  import tableCard from "../../chart/tableCard.vue"
    export default {
      components:{tableCard,toprightControl},
      data(){
				return {
          theme:"异常单列表",
          chartheight:260,
          bodyStyle:{
            padding:'0',
            position:'relative',
            height:'',
            width:'100%',
            backgroundColor: '#fff'
          },
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
