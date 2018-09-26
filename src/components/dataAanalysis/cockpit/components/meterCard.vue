<template>
    <div>
      <el-card class="box-card cockpit">
        <div  class="clearfix">
          <!-- 仪表信息弹出框 -->
          <el-popover
            popper-class="cockpithandle"
            placement="bottom-start"
            trigger="click"
            width="150"
            visible-arrow>
            <ul class="handleMsg">
              <li><i class="el-icon-info"></i>信息</li>
              <li><i class="el-icon-close"></i>删除</li>
            </ul>
            <el-button slot="reference" icon="el-icon-tickets"  class="ticbut" type="text"></el-button>
          </el-popover>
          
        </div>
        <div class="cockpitContent" style="padding:30px 0">
          <img src="@/assets/images/meter2.png" alt="">
        </div>
        <div style="margin-top:10%">
          <div class="title"  onselectstart="return false" v-if="!flag" @dblclick="showInp">{{title}}</div>
          <div class="titleChange" v-show="flag">
              <el-form :inline="true" size="mini" style="text-align: center;">
              <el-form-item>
                <el-input placeholder="请输入名称" v-model.trim="title" size="mini" 
                          @keyup.enter.native="change" @blur="updataTitle">
                  <el-button slot="append" icon="el-icon-check" @click="updataTitle" size="mini" class="checkbtn"></el-button>
                </el-input>
              </el-form-item>
              </el-form>
          </div>
        </div>
      </el-card>
    </div>
</template>
<script>
    export default {
      props:['meterName'],
      data() {
				return {
          title:'',
					flag:false,
					
				}
			},
			methods:{
				showInp(){
					this.flag=!this.flag
        },
				updataTitle(){
					if(this.title){
            this.flag=!this.flag
            // this.flag=false
					}else{
						this.$message.error('不能为空哦');
					}
				}
      },
      mounted(){
      this.title=this.meterName
        $('.cockpithandle').css({'margin': '0px',})
      }
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
.box-card {
  width: 100%;
  height: 350px;
  &:hover {
    border:1px #1C73E5 solid;
    .ticbut {
      color: #1C73E5
    }
  }
}

// 仪表卡片
//右上角图标按钮
.ticbut {
  float: right; 
  padding: 3px 0;
  color:#ccc;
  font-size: 20px;
}
//弹出信息框
.handleMsg{
  li{
    line-height: 30px;
    height: 30px;
    cursor: pointer;
    &:first-of-type{
      padding-bottom: 5px;
      border-bottom: 1px solid #ccc;
    }
    &:last-of-type{
      color: red;
      padding-top: 5px;
    }
    i{
      padding-right: 20px;
    }
  }
}
//卡片主体
.cockpitContent {
  text-align: center;
  img {
    width: 70%;
  }
}
//卡片名称
.title{
  color: #1C73E5
}




.ejectbtn{
	display: block;
	margin: 0;
	width: 100%;
	text-align: left;
	border-bottom: 1px solid #ccc
}

.item-contain {
	font-size: 80px;
	color: #409EFF;
	display: block;
	margin: 0 auto;
	text-align: center


}

.cockpit {
  border-radius: 10px;
  color:#eee
}
.title {
  text-align: center;
}

.checkbtn {
      background-color: #409EFF!important;
      color: #fff!important
}
</style>