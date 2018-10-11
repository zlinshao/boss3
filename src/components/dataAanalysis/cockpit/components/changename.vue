<template>
    <div id="changeName">
      <div class="title"  onselectstart="return false" v-if="!changtitle" @dblclick="showInp">{{meterName}}</div>
      <div class="titleChange" v-show="changtitle">
          <el-form :inline="true" size="mini" style="text-align: center;">
            <el-form-item>
              <el-input placeholder="请输入名称" size="mini" @keyup.enter.native="updataTitle" @blur="updataTitle" v-model="meterName">
                <el-button slot="append" icon="el-icon-check" @click="updataTitle" size="mini" class="checkbtn"></el-button>
              </el-input>
            </el-form-item>
          </el-form>
      </div>
    </div>
</template>
<script>
    export default {
      props:['meterName'],
      data(){
        return{
          changtitle:false,
        }
      },
      methods:{
        showInp(){
          this.changtitle=!this.changtitle
        },
        updataTitle(){
          if(this.meterName){
            this.changtitle=!this.changtitle
          }else{
            this.$message.error('不能为空');
          }
        },
      }
    }
</script>
<style scoped lang="scss">
.title {
  color: #1C73E5;
  text-align: center;
}

.checkbtn {
  background-color: #409EFF!important;
  color: #fff!important
}
</style>
<style lang="scss">
#changeName{
  .el-form{
    .el-form-item{
      margin: 0;
    }
  }
}
</style>
