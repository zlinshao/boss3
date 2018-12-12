<template>
    <div id="daily">
      <el-dialog title="日报" :visible.sync="dailyDialogVisible" width="30%">
        <div class="top">
          <el-date-picker v-model="year" type="year" placeholder="请选择年份" size="mini"></el-date-picker>
          <el-select v-model="month" placeholder="请选择月份" size="mini">
            <el-option v-for="item in monthOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-button type="primary" size="mini">搜 索</el-button>
        </div>
        <div class="content" style="text-align: center;">
          <div class="dailyList" v-for="(item, index) in dailyList" :key="index">
            <el-button  size="mini" round style="margin-bottom: 10px;">{{item.day}}</el-button>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <!-- <el-button @click="dailyDialogVisible = false" size="mini">取 消</el-button> -->
          <el-button type="primary" @click="dailyDialogVisible = false" size="mini">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
export default {
  props: ["ids", "lookDailyLog"],
  data() {
    return {
      dailyDialogVisible: false,
      monthOptions: [
        {value: "1", label: "1"},
        {value: "2", label: "2"},
        {value: "3", label: "3"},
        {value: "4", label: "4"},
        {value: "5", label: "5"},
        {value: "6", label: "6"},
        {value: "7", label: "7"},
        {value: "8", label: "8"},
        {value: "9", label: "9"},
        {value: "10", label: "10"},
        {value: "11", label: "11"},
        {value: "12", label: "12"},
      ],
      year: "",
      month: "",
      dailyList: [
        {day: "2018-11-1"},
        {day: "2018-11-2"},
        {day: "2018-11-3"},
        {day: "2018-11-4"}
      ]
    }
  },
  watch: {
    ids(val) {
      console.log(val)
    },
    lookDailyLog(val) {
      this.dailyDialogVisible = val;
    },
    dailyDialogVisible(val) {
      if(!val) {
        this.$emit("close")
      }
    }
  }
}
</script>

<style lang="scss">
  #daily {
    .top {
      margin-bottom: 10px;
       .el-date-editor {
        margin-right: 10px;
        width: 20%;
        float: left;
      }
      .el-select {
        margin-right: 10px;
        width: 20%;
        float: left;
      }
    }
  }
</style>
