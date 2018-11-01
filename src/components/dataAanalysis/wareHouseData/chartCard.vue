<template>
  <el-card class="box-card"
    style="width:100%"
    :body-style="bodyStyle"
    shadow = "hover"
    >
    <div slot="header" class="clearfix card-header" >
      <div>
        <span>{{cardData.name}}</span>
        <div>
          <!-- 说明弹出框 -->
          <slot name="right"></slot>
        </div>
      </div>
      <div>
        <!-- <el-tag type="success" v-for="(item,index) in cardData.tags" :key="index">{{item.name}}</el-tag> -->
      </div>
    </div>
    <div> 
      <div  class="chartbox">
        <slot name="content"></slot>
      </div>
    </div>
  </el-card>
</template>
<script>
import toprightControl from "../components/toprightControl.vue"
export default {
  components:{toprightControl},
  props:["cardData"],
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
.chartbox{
  width:100%;
  height:300px;
  position:relative
}
</style>
<style lang="scss">
.el-card__header{
  padding:5px 10px;
  height: 55px;
}
// 卡片类型标签
.el-tag{
  height: 20px;
  line-height: 20px;
  border-radius: 10px;
}
</style>
