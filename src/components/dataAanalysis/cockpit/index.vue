<template>
	<div>
    <div v-if="!showDetailMeter" id="meterList">
      <div style="margin-bottom:20px">
        <div class="meterTop publicMeter">
            <div class="fl">预设仪表盘</div>
            <!-- <div class="fr">4/10</div> -->
        </div> 
				<div style="padding:0 66px">
					<el-row> 
						<el-col :span="4" v-for="(item,index) in publicMeter" :key="index" :offset="index%5==0?0:1">
							<el-card class="box-card cockpit">
								<!-- 仪表盘内容 -->
								<div v-show="index!=publicActiveIndex" @click="hideMeterMsg" class="meterCardContant">
									<div class="clearfix">
										<!-- 仪表信息弹出框 -->
										<el-popover
											popper-class="cockpithandle"
											placement="bottom-start"
											trigger="click"
											width="150"
											visible-arrow
											:disabled="meterPopdisabled"
											>
											<ul class="handleMsg">
												<li @click='showPublicMeterMsg(index)' class="message"><i class="el-icon-info"></i>信息</li>
											</ul>
											<el-button slot="reference" icon="el-icon-tickets"  class="ticbut" type="text"></el-button>
										</el-popover>
									</div>
									<div class="cockpitContent" style="padding:30px 0;margin-bottom:10%" @click='showDetailMeterEven(index)'>
										<img src="@/assets/images/meter2.png" alt=""> 
									</div>
								</div>
								
								
								<!-- 仪表盘信息 -->
								<div class="meterMsg meterCardContant" v-show="index==publicActiveIndex">
									<i class="el-icon-arrow-left goback" @click="hideMeterMsg"></i>
									<ul class="meterMsgBody">
										<li><span>创建人：</span><i v-if="item.simple_staff">{{item.simple_staff.real_name}}</i></li>
										<li><span>创建时间：</span><i>{{item.create_time}}</i></li>
										<li><span>修改时间：</span><i>{{item.update_time}}</i></li>
									</ul>
								</div>
								<div class="metertitle">{{item.name}}</div>
							</el-card>
						</el-col>
					</el-row>
				</div>
      </div>
      <div>
        <div class="meterTop private">
            <div class="fl">个人仪表盘</div>  
        </div> 
				<div style="padding:0 66px">
					<el-row>
						<el-col :span="4" v-for="(item,index) in privateMeter" :key="index" :offset="index%5==0?0:1">
							<el-card class="box-card cockpit">
								<!-- 仪表盘内容 -->
								<div v-show="index!=personalActiveIndex" @click="hideMeterMsg" class="meterCardContant">
									<div class="clearfix">
										<!-- 仪表信息弹出框 -->
										<el-popover
											popper-class="cockpithandle"
											placement="bottom-start"
											trigger="click"
											width="150"
											visible-arrow
											:disabled="meterPopdisabled"
											>
											<ul class="handleMsg">
												<li @click='showPersonalMeterMsg(index)' class="message"><i class="el-icon-info"></i>信息</li>
												<li @click="deleteMeterDiaVisible=true" class="delete"><i class="el-icon-close" ></i>删除</li>
											</ul>
											<el-button slot="reference" icon="el-icon-tickets"  class="ticbut" type="text"></el-button>
										</el-popover>
									</div>
									<div class="cockpitContent" style="padding:30px 0;margin-bottom:10%" >
										<img src="@/assets/images/meter2.png" alt=""> 
									</div>
								</div>
								<!-- 仪表盘信息 -->
								<div class="meterMsg meterCardContant" v-show="index==personalActiveIndex">
									<i class="el-icon-arrow-left goback" @click="hideMeterMsg"></i>
									<ul class="meterMsgBody">
										<li><span>创建人：</span><i v-if="item.simple_staff">{{item.simple_staff.real_name}}</i></li>
										<li><span>创建时间：</span><i>{{item.create_time}}</i></li>
										<li><span>修改时间：</span><i>{{item.update_time}}</i></li>
									</ul>
								</div>
								<changename :meterName="item.name"></changename>

							</el-card>
						</el-col>
						<el-col :span="4" :offset="privateMeter.length%5==0?0:1">
							<el-card class="box-card cockpit">
								<!-- 仪表盘内容 -->
								<div class="meterCardContant" v-show="showAddmeter">
									<i class="el-icon-arrow-left goback" @click="showAddmeter=false"></i>
									<div class="cockpitContent" style="padding:30px 0;margin-bottom:10%" @click='showDetailMeter=true'>
										<img src="@/assets/images/meter2.png" alt="">
									</div>
									<el-form :inline="true" size="mini" style="text-align: center;">
										<el-form-item>
											<el-input placeholder="请输入名称" size="mini" v-model.trim="addmeterName">
												<el-button slot="append" icon="el-icon-check"  size="mini" class="checkbtn" @click="addMeter"></el-button>
											</el-input>
										</el-form-item>
									</el-form>
								</div>
								<div @click="showAddmeter=true">
									<div class="addmeterface">
										<i class="el-icon-plus"></i>
									</div>
									<div class="addmeterfaceBottom">
										添加仪表盘
									</div>
								</div>
							</el-card>
						</el-col> 
					</el-row>
				</div>
      </div>
		</div>

    <div>
			<!-- 仪表盘详情页面 -->
      <detailMeter @close="hidedetailMeter" :detailMeterVisible="showDetailMeter" :detailMeterid="detailMeterId"></detailMeter>
    </div>
		<!-- 仪表盘删除弹窗 -->
		<el-dialog
			id="deleteMeterDia"
			custom-class="deleteMeterDia"
			:visible.sync="deleteMeterDiaVisible"
			width="30%"
			>
			<div>
				<span class="deleteMeterDiaTitle"><i class="el-icon-success"></i><span>确认要删除这个仪表盘吗？</span></span>
				<p class="deleteMeterDiaContent">确认删除后将无法找回，所有的指标都会丢失，请谨慎选择。</p>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button type="danger" @click="deleteMeter" size="mini" >删除</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<style lang="scss" scoped>

</style>
<script>
// deleteMeterDiaVisible = false
	import changename from "./components/changename.vue"//改名
  import detailMeter from "./components/detailMeter.vue" //仪表盘详细界面
  export default {
    components: {detailMeter,changename},
    data() {
      return {
				publicMeter:[],//预设仪表盘
				privateMeter:[],//个人仪表盘
				showDetailMeter:false,//仪表盘详情页面显示隐藏
				publicActiveIndex:-1, //预设仪表盘信息的显示隐藏
				personalActiveIndex:-1, //个人仪表盘内容的显示隐藏
				meterPopdisabled:false,//仪表信息框是否禁用
				deleteMeterDiaVisible:false,//删除仪表弹出框
				addmeterName:"",//添加仪表盘名称
				showAddmeter:false,//显示添加仪表盘
				detailMeterId:"",
				// meterDescrip:{ //仪表盘信息 false
				// 	createPerson:"强强",
				// 	createdata:"2018-10-1",
				// 	updataData:"2018-10-1"
				// }
      }
    },
    methods:{
			hidedetailMeter(val){//仪表详细页面隐藏
				this.showDetailMeter=false
			},
			showPublicMeterMsg(index){//公共仪表信息内容显示
				this.publicActiveIndex=index
				this.meterPopdisabled=true
			},
			showPersonalMeterMsg(index){//个人仪表信息内容显示
				this.personalActiveIndex=index
				this.meterPopdisabled=true
			},
			hideMeterMsg(){//仪表信息内容隐藏
				this.publicActiveIndex=-1
				this.personalActiveIndex=-1
				this.meterPopdisabled=false
			},
			showDetailMeterEven(index){//仪表详细页面显示
				this.showDetailMeter=true
				this.detailMeterId = index
			},
			addMeter(){
				console.log(11211)
				// let add = {
				// 	id:1,
				// 	title: this.addmeterName,
				// 	type:"personal",
				// 	createdata:"2019/09/01",
				// 	createPerson:"王晓伟",
				// 	updataData:"2019/09/01",
				// 	meterContentId:20
				// }
				// this.personalTitle.push(add)
			},
			deleteMeter(){
				this.deleteMeterDiaVisible = false
			},
			getPublicMeter(){ //获取预设仪表盘
				this.$http.get(globalConfig.server + "bisys/dashboard",{headers:{"Accept":"application/vnd.boss18+json"}}).then((res) => {
					// console.log(res)
					if(res.data.code === "20000"){
						this.publicMeter = res.data.data.data
					}
					
        });
			},
			getPrivateMeter(){//获取个人仪表盘
				this.$http.get(globalConfig.server + "bisys/dashboard",{headers:{"Accept":"application/vnd.boss18+json"}}).then((res) => {
					console.log(res)
					if(res.data.code === "20000"){
						this.privateMeter = res.data.data.data
					}
        });
			}
			
		},
		mounted () {
			this.getPublicMeter()
			this.getPrivateMeter()

		}

  }
</script>
<style scoped lang="scss">
#meterList{
	padding: 0 16px;
	//页面仪表标题
	.meterTop {
		&.publicMeter{
			padding:17px 0 32px 0;
		}
		&.private{
			padding: 8px 0 32px 0;
		}
		font-size: 18px;
		color: #409EFF;
		overflow: hidden;
		.fl {
			font-weight: 700;
			float: left;
		}
	}
	.metertitle{
		font-size: 18px;
		text-align: center;
		color:#409EFF
	}
}

//element-ui layout布局
.el-row {
	margin-bottom: 20px;
	&:last-child {
		margin-bottom: 0;
	}
}
.el-col {
	border-radius: 4px;
}
//element-ui card
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
	box-sizing: border-box;
  &:hover {
    border:1px #1C73E5 solid;
    .ticbut {
      color: #1C73E5
    }
  }
}
// 仪表卡片
.cockpit{
	margin-bottom:20px;
	.meterCardContant{
		height: 280px;
		box-sizing: border-box;
		.goback{
			color: #1C73E5;
			font-size: 18px;
			font-weight: bold;
		}
		.meterMsgBody{
			margin-top: 50px;
			li{
				height: 30px;
				line-height: 30px;
				font-size: 18px;
				color:#1C73E5;
				padding: 10px 0;
				i{
					font-style:normal
				}
			}
		}
	}

}
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
    &.message{
      padding-bottom: 5px;
      
    }
    &.delete{
			border-top: 1px solid #ccc;
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
//仪表盘删除弹窗
.deleteMeterDia {
	.deleteMeterDiaTitle{
		font-size: 18px;
	}
}
//仪表盘删除弹窗
.deleteMeterDia {
	.deleteMeterDiaTitle{
		padding:0 10px;
		font-size: 18px;
		i{
			color: #409EFF;
			padding-right: 20px;
		}
		span{
			font-weight: bold;
			
		}
	}
	.deleteMeterDiaContent{
		font-size: 16px;
		padding-left: 48px;
	}
}



//添加仪表盘
.addmeterface{
	height: 280px;
	text-align: center;
	box-sizing: border-box;
	padding-top: 45px;
	img{
		width: 70%;
	}
	i{
		font-size: 200px;
		color: #A0C7FB
	}

}
.addmeterfaceBottom{
	text-align: center;
	font-size: 16px;
	color: #A0C7FB
}
.checkbtn {
	background-color: #409EFF!important;
	color: #fff!important
}
</style>
<style lang="scss">
#deleteMeterDia{
	.deleteMeterDia{
		.el-dialog__header{
			border:none
		}
	}
}

</style>

