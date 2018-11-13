<template>
  <div id="toprightContorl">
    <div v-if="!btnstatus.delete">
      <el-popover
        placement="right-start"
        width="200"
        trigger="click"
        title="说明">
        <!-- <p>
          1.分城市/区域/片区展示本期和上期业绩（用同一组的两个柱形图表示），根据组织架构及时间维度变化而变化展示的数值。<br>
          2.组织架构维度标签下有三个下拉菜单选择项：城市（有所有以及各个城市选项，所有显示所有城市的数据，各个城市显示选择城市下辖区域的数据）/区域（显示下辖片区的数据）/片区（显示片区组员的数据）<br>
          3.时间维度标签有下拉菜单选择项：日历组件，以一周、一月为一周期，选择本周期（上一周或上一月）和本周期的上一个周期</p> -->
          <p v-if="cardData.introduction">
            {{cardData.introduction}}
          </p>
        <el-button
          icon="el-icon-question"
          slot="reference"
          circle
          style="float: right;overflow:hidden;border:1px #409EFF solid;color:#409EFF;"
          size="mini"
          type="text"></el-button>
      </el-popover>

      <!-- 仪表弹出框 -->
      <el-popover
        @hide="hideMeterpop"
        visible-arrow
        popper-class="meterpop"
        placement="bottom"
        width="200"
        trigger="click">
        <ul class="pluspop popFirst" v-if="!showSecPop">
          <li v-for="(item,index) in meterList" :key="index" @click="showSecondpop(item)">
            <i class="el-icon-arrow-left"></i>{{item.name}}
          </li>
          <li @click="addMeter" v-if="btnstatus.hidemetter"><i class="el-icon-plus"></i>新建仪表盘</li>
        </ul>
        <ul class="pluspop popFirst" v-if="showSecPop">
          <li @click="showSecPop = false"><i class="el-icon-arrow-left"></i>{{secPopTitle}}</li>
          <li @click="addCard('topic')"><i class="el-icon-plus"></i>主题指标</li>
          <li @click="addCard('card')"><i class="el-icon-plus"></i>分析指标</li>
        </ul>
        <el-button
          slot="reference" icon="el-icon-plus" circle
          style="float: right;overflow:hidden;border:1px #409EFF solid;margin-right: 10px;color:#409EFF;"
          size="mini" type="text"
          @click="getMeterNameList"
          v-if="btnstatus.hideAdd"
          ></el-button>
      </el-popover>
      <el-button
        icon="el-icon-search"
        circle
        size="mini"
        style="float: right;overflow:hidden;border:1px #409EFF solid;margin-right: 10px;color:#409EFF;"
        @click="showDetailChartDialog"
        v-if="btnstatus.large"
        ></el-button>
    </div>
      <el-button
      icon="el-icon-close"
      circle
      size="mini"
      style="float: right;overflow:hidden;border:1px #409EFF solid;margin-right: 10px;color:#409EFF;"
      @click="delConfirm"
      v-if="btnstatus.delete"
      ></el-button>
    <addChartToMeter :addChartMrterDialog="addChartMrterDialog" @close="closeModel"></addChartToMeter>
    <detailChartDialog :modules="showDetailChart" @close="closeModule" :detailData="sendDetailData"></detailChartDialog>
  </div>
</template>
<script>
  import addChartToMeter from "../components/addChartToMeterDia.vue"
  import detailChartDialog from "../components/detailChartDialog.vue"
  export default {
    name:"toprightcontrol",
    components: {
      addChartToMeter,
      detailChartDialog
    },
    props: ['cardData','btnstatus','meterData'],
    data() {
      return {
        showSecPop: false,
        addChartMrterDialog: false,
        secPopTitle: '',
        meterList:[],
        currentList:{},
        params:{},
        showDetailChart:false,
        sendDetailData:{}
      }
    },
    methods: {
      addMeter(){ //新建仪表盘
        this.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$parent.changeActive()
        this.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$children[1].$children[0].showadd()
        window.scrollTo(0, document.documentElement.clientHeight);
      },
      hideMeterpop() {
        this.showSecPop = false
      },
      showSecondpop(val) {
        this.showSecPop = true
        this.secPopTitle = val.name
        this.currentList = val
      },
      closeModel(val) {
        this.addChartMrterDialog = false;
        this.showSecPop = !this.showSecPop
      },
      getMeterNameList(){ //仪表盘名称列表
        this.$http.get(globalConfig.server + "/bisys/dashboard", {
          headers: {"Accept": "application/vnd.boss18+json"}
        }).then((res) => {
          if (res.data.code === "20000") {
            this.meterList = res.data.data.data.private
            // this.meterList = res.data.data.data.public
          } else {

          }
        });
      },
      closeModule(val){
        this.showDetailChart = false
      },
      showDetailChartDialog(){
        this.showDetailChart = true
        this.sendDetailData = this.cardData
      },
      addCard(val){
        this.params.name = this.currentList.name
        this.params.introduction = this.currentList.introduction
        this.params.is_public  = this.currentList.is_public
        this.params.card_ids = []
        if(this.currentList.cards.length!==0){
          this.currentList.cards.forEach(item => {
            this.params.card_ids.push(item.id)
          })
        }
        this.params.user_id = this.currentList.user_id||JSON.parse(localStorage.getItem("personal")).id
        this.params.topic_card_id = this.currentList.topic_card_id

        if(val === "topic"){
          if(this.params.topic_card_id){
            this.$confirm('该指标已有主题指标, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.params.topic_card_id = this.cardData.id
              this.$http.put(globalConfig.server + "/bisys/dashboard/"+this.currentList.id,this.params, {
                headers: {"Accept": "application/vnd.boss18+json"}
              }).then((res) => {
                if (res.data.code === "20030") {
                  this.addChartMrterDialog=true
                } else {
                  this.promot('error',res.data.msg)
                }
              });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消添加'
              });
            });

          }else{
            this.params.topic_card_id = this.cardData.id
            this.$http.put(globalConfig.server + "/bisys/dashboard/"+this.currentList.id,this.params, {
              headers: {"Accept": "application/vnd.boss18+json"}
            }).then((res) => {
              if (res.data.code === "20030") {
                this.addChartMrterDialog=true
              } else {
                this.promot('error',res.data.msg)
              }
            });
          }

        }
        if(val === "card"){
          this.params.card_ids.push(this.cardData.id)
          this.$http.put(globalConfig.server + "/bisys/dashboard/"+this.currentList.id,this.params, {
            headers: {"Accept": "application/vnd.boss18+json"}
          }).then((res) => {
            if (res.data.code === "20030") {
              this.addChartMrterDialog=true
            } else {
              this.promot('error',res.data.msg)
            }
          });
        }
      },
      delConfirm(){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.delCard()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      delCard(){
        this.params.name = this.meterData.name
        this.params.introduction = this.meterData.introduction
        this.params.is_public  = this.meterData.is_public
        this.params.card_ids = []
        if(this.meterData.cards.length!==0){
          this.meterData.cards.forEach(item => {
            this.params.card_ids.push(item.id)
          })
        }
        this.params.card_ids.forEach((item,index)=>{
          if(item == this.cardData.id){
            this.params.card_ids.splice(index,1)
          }
        })
        this.params.user_id = this.meterData.user_id||JSON.parse(localStorage.getItem("personal")).id
        this.params.topic_card_id = this.meterData.topic_card_id

        this.$http.put(globalConfig.server + "/bisys/dashboard/"+this.meterData.id,this.params, {
          headers: {"Accept": "application/vnd.boss18+json"}
        }).then((res) => {
          if (res.data.code === "20030") {
            this.prompt('success',res.data.msg)
            this.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$children[1].$children[0].showDetailMeterEven(this.meterData.id,'private')
          } else {
            this.prompt('error',res.data.msg)
          }
        });
      }
    },
    mounted() {
    },
  }
</script>
<style scoped lang="scss">
#toprightContorl{
  position: absolute;
  top:15px;
  right: 15px;
}
  // 仪表弹出框
  .pluspop {
    position: absolute;
    background-color: #fff;
    border: 1px solid #D2D2D2;
    border-radius: 4px;
    z-index: 999;
    &.popFirst {
      top: -8px;
      right: 10px;
    }
    &.popSecond {
      top: -35px;
      right: -155px;
      li {
        &:first-of-type {
          border-bottom: 1px #D2D2D2 solid;
          i {
            color: #409EFF
          }
        }
      }
    }
    li {
      i {
        padding-right: 20px
      }
      button {
        margin: 0;
        width: 100%;
        text-align: left;
      }
      .el-button--text {
        display: block;
        color: rgb(19, 18, 18)
      }
      width: 150px;
      padding: 3px 0;
      margin: 6px 10px;
      cursor: pointer;
      color: rgb(19, 18, 18);

    }
  }
</style>
<style lang="scss">
  .meterpop.el-popover.el-popper {
    border: none;
    box-shadow: none;
    background: none;
    padding: 0px 12px;
  }
</style>
