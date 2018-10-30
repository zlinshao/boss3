<template>
  <div>
    <el-dialog
      :visible.sync="addChartToMeterdialogVisible"
      width="30%"
      custom-class="addMeterDia"
      
      @open="showaddMeterDia"
      ref="addMeterDia"
      >
      <div>
        <el-button icon="el-icon-close" circle size="mini" style="float:right" @click="addChartToMeterdialogVisible = false"></el-button>

        <div class="addMeterCont">
          <i class="el-icon-bell successicon" ></i>
          <span> 添加成功</span><br>
          <span>该指标已添加到所选择的仪表盘中</span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
    export default {
      name:"addChartToMeter",
      props:['addChartMrterDialog'],
      data(){
        return {
          addChartToMeterdialogVisible:false
        }
      },
      methods:{
        showaddMeterDia(){
          $('.el-dialog__header').remove()
          $('.addMeterDia').css({'top':"50%","margin":'0 auto'})
        },
      },
      watch: {
        addChartMrterDialog(val) {
          this.addChartToMeterdialogVisible = val
        },
        addChartToMeterdialogVisible(val){
          if(!val){
            this.$emit('close')
          }else{

          }
        }
      }
    }
</script>
<style scoped lang="scss">
  .addMeterDia {
  box-shadow:none;
  border:4px solid #409EFF;
}

.addMeterCont{
  padding: 10px 0;
  font-size: 18px;
  span {
    &:first-of-type{
      color: #474747;
    }
    &:last-of-type{
      padding-left: 32px;
      line-height: 50px;
      font-size: 16px;
      color: #949494
    }
  }
  i {
    color: #2496FF;
    padding-right: 10px;
  }
}
</style>