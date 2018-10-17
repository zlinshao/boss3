<template>
  <div style="position: absolute;top:15px;right: 15px;">
    <el-popover
      placement="right-start"
      width="200"
      trigger="click"
      title="说明"
    >
      <p>
        1.分城市/区域/片区展示本期和上期业绩（用同一组的两个柱形图表示），根据组织架构及时间维度变化而变化展示的数值。<br>
        2.组织架构维度标签下有三个下拉菜单选择项：城市（有所有以及各个城市选项，所有显示所有城市的数据，各个城市显示选择城市下辖区域的数据）/区域（显示下辖片区的数据）/片区（显示片区组员的数据）<br>
        3.时间维度标签有下拉菜单选择项：日历组件，以一周、一月为一周期，选择本周期（上一周或上一月）和本周期的上一个周期</p>
      <el-button icon="el-icon-question" slot="reference" circle
                 style="float: right;overflow:hidden;border:1px #409EFF solid;color:#409EFF;" size="mini"
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
        <li v-for="o in 2" :key="o" @click="showSecondpop">
          <i class="el-icon-arrow-left"></i>仪表盘{{o}}
        </li>
        <li><i class="el-icon-plus"></i>新建仪表盘</li>
      </ul>
      <ul class="pluspop popFirst" v-if="showSecPop">
        <li @click="showSecondpop"><i class="el-icon-arrow-left"></i>{{secPopTitle}}</li>
        <li @click="addChartMrterDialog=true"><i class="el-icon-plus"></i>主题指标</li>
        <li @click="addChartMrterDialog=true"><i class="el-icon-plus"></i>分析指标</li>
      </ul>
      <el-button slot="reference" icon="el-icon-plus" circle
                 style="float: right;overflow:hidden;border:1px #409EFF solid;margin-right: 10px;color:#409EFF;"
                 size="mini" type="text"></el-button>
    </el-popover>
    <addChartToMeter :addChartMrterDialog="addChartMrterDialog" @close="closeModel"></addChartToMeter>
  </div>
</template>
<script>
  import addChartToMeter from "../components/addChartToMeterDia.vue"

  export default {
    components: {addChartToMeter},
    data() {
      return {
        showSecPop: false,
        addChartMrterDialog: false,
        secPopTitle: '',
      }
    },
    methods: {
      hideMeterpop() {
        this.showSecPop = false
      },
      showSecondpop(event) {
        this.showSecPop = !this.showSecPop
        var el = event.currentTarget
        this.secPopTitle = el.innerText
      },
      closeModel(val) {
        this.addChartMrterDialog = false;
        this.showSecPop = !this.showSecPop
      },
    }
  }
</script>
<style scoped lang="scss">
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
        color: #D2D2D2
      }
      width: 150px;
      padding: 3px 0;
      margin: 6px 10px;
      cursor: pointer;
      color: #D2D2D2;

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
