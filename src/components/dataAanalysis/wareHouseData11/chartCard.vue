<template>
  <el-card class="box-card"
    style="width:100%"
    :body-style="bodyStyle"
    shadow = "hover"
    >
    <div slot="header" class="clearfix card-header" >
      <div>
        <span>城市盈亏总额</span>
        <div style="position: absolute;top:15px;right: 15px;">
          <!-- 说明弹出框 -->
          
        </div>
      </div>
      <div>
        <el-tag type="success">业务</el-tag>
      </div>
    </div>
    <div> 
      <div style="width:100%;height:260px;position:relative" class="chartbox">
        
      </div>
    </div>
  </el-card>
</template>
<script>
  export default {
    data(){
      return {
        bodyStyle:{//卡片主体样式
          padding:'0',
          position:'relative',
          height:'300px',
          width:'100%',
          backgroundColor: '#fff'
        },
      }
    }
  }
</script>
<style scoped lang="scss">
//仪表卡片
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
.card-header{
  font-size: 18px;
  
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
</style>
<style lang="scss">
.el-card__header{
  padding:5px 10px;
}
// 卡片类型标签
.el-tag{
  height: 20px;
  line-height: 20px;
  border-radius: 10px;
}
</style>
