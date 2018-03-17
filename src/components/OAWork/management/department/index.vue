<template>
  <div>
    <div>
      <div class="filter">
        <el-form :inline="true" :model="formInline" size="mini" class="demo-form-inline">
          <el-form-item label="选择部门">
            <el-select v-model="formInline.house" clearable placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input v-model="formInline.name" placeholder="签到人或日期搜索">
              <el-button slot="append" type="primary" icon="el-icon-search"></el-button>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="main">
        <div class="myHouse">
          <div class="blueTable">
            <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column
                prop="name"
                label="签到人">
              </el-table-column>
              <el-table-column
                prop="department"
                label="部门">
              </el-table-column>
              <el-table-column
                prop="date"
                label="签到日期">
              </el-table-column>
              <el-table-column
                prop="last_on"
                label="上班时间">
              </el-table-column>
              <el-table-column
                prop="last_off"
                label="下班时间">
              </el-table-column>
              <el-table-column
                prop="time_result"
                label="签到类型">
              </el-table-column>
              <el-table-column
                prop="attend"
                label="出勤天数">
              </el-table-column>
              <el-table-column
                prop="late"
                label="迟到">
              </el-table-column>
              <el-table-column
                prop="early"
                label="早退">
              </el-table-column>
              <el-table-column
                prop="not_signed"
                label="缺卡">
              </el-table-column>
              <el-table-column
                prop="absent"
                label="旷工">
              </el-table-column>
            </el-table>
          </div>
          <div class="tableBottom">
            <div class="left">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="nowPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        /***********/
        urls:globalConfig.server,
        formInline: {
          name: '',
          house: ''
        },
        
        tableData: [],
        nowPage: 1,   //当前页
        total:0,      //总条数
        options: [
          {
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }, {
            value: '选项4',
            label: '龙须面'
          }, {
            value: '选项5',
            label: '北京烤鸭'
          }],

        //模态框
        instructionDialog: false,
      }
    },

    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      clickTable(row, event, column){
        console.log(row, event, column)
      },
    },
        created:function(){
        let date = new Date();
        let seperator1 = "-";
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        let data = year + seperator1 + month;
        this.$http.get(this.urls+'attendance/summary?year_month='+data).then((res) => {
            console.log(res);
            debugger;
            if (res.data.code === '20010') {
                this.tableData=res.data.data 
 
            }
      
         })
       }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="">
  .filter {
    /*padding: 10px 0;*/
  }

  .tableBottom {
    padding: 8px;
    display: flex;
    justify-content: flex-end;

  }
</style>
