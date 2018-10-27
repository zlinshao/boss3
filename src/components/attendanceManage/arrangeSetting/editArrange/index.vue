<template>
    <div id="markInfo">
      <!-- 班次说明 -->
       <div>
            班次说明
            <el-tag size="mini">A: 早班09:00-18:00</el-tag>
            <el-tag type="warning" size="mini">B: 正常班10:00-19:00</el-tag>
            <el-tag type="success" size="mini">C: 晚班13:00-19:00</el-tag>
            <el-tag type="info" size="mini">休:休息</el-tag>
       </div>

       <!-- 搜索 -->
       <div style="margin-top:20px">
           <el-row :gutter="20">
               <el-col :span="4">
                    排班月份
                    <el-select v-model="currentMonth" placeholder="请选择" size="mini" @change="ChangeMonth">
                      <el-option
                        v-for="(item,index) in monthList"
                        :key="index"
                        :label="item.date"
                        :value="item.date">
                      </el-option>
                    </el-select>
                </el-col>
                <el-col :span="4">
                    <span>姓名：</span><el-input placeholder="请输入" size="mini" style="width:180px;dispaly:inline-block;margin-left:20px;"></el-input>
                </el-col>
                <el-col :span="4">
                    <span>部门：</span><el-input placeholder="请输入" size="mini" style="width:180px;dispaly:inline-block;margin-left:20px;"></el-input>
                </el-col>
                <el-col :span="4">
                    <span>职位：</span><el-input placeholder="请输入" size="mini" style="width:180px;dispaly:inline-block;margin-left:20px;"></el-input>
                </el-col>
                <el-col :span="2">
                    <el-button type="primary" size="mini">确定</el-button>
                </el-col>
                <el-col :span="5">
                    <span>批量排班：</span>
                    <el-button type="primary" size="mini">导出排班表</el-button>
                    <i class="el-icon-arrow-right"></i>
                    <el-button type="primary" size="mini">导入排班表</el-button>
                </el-col>
           </el-row>
       </div>

       <!-- 排班表 可编辑 -->
       <div class="tableInfo">
           <el-table
                :data = "arrangeListData"
                :header-cell-style="headerCellStyle"
                @cell-dblclick="dbclickCell"
                :cell-class-name="rowClass"
           >
           <el-table-column prop="part" label="部门" width="80px"></el-table-column>
           <el-table-column prop="name" label="姓名" width="80px"></el-table-column>
            <el-table-column 
                v-for="(colu,index) in columnList" 
                :key="index" 
                :prop="colu.prop" 
                :label="colu.label" 
                >
            </el-table-column>
            <el-table-column
                label="操作"
                width="100px"
            >
                <template slot-scope="scope">
                    <div>
                        <el-button type="primary" size="mini" @click="outputShow = true ">以此为模板</el-button>
                    </div>
                </template>
            </el-table-column>
           </el-table>
       </div>

       <!-- 分页 -->
       <div style="margin-top:30px;text-align:right;">
           <el-pagination
            background
            :page-sizes="[15,20,25,30]"
            layout="total,sizes,prev, pager, next ,jumper"
            :total="1000">
            </el-pagination>
       </div>

       <!-- 排班表 仅查看 -->
       <div style="margin-top:50px">
           <el-table
            style="width:100%"
            :data="arrangeListDataLook"
            :cell-style="cellStyle"
            :cell-class-name="cell"
           >    
                <el-table-column prop='date' label="班次/日期">
                    <!-- <template scope="scope">
                        <div>
                            <span style="color:red;">{{scope.row.date}}</span>
                        </div>
                    </template>     -->
                </el-table-column>
                <el-table-column v-for="(colu,idx) in columnListLook" :key="idx" :prop="colu.prop" :label="colu.label" :width="colu.width">
                </el-table-column>
           </el-table>
       </div>

       <!-- 修改班次 dialog -->
       <div>
           <el-dialog
            title="修改班次"
            :visible.sync="dialogShow"
            width="25%"
           >
                <div>
                    <p><el-radio v-model="currentArrange" label="A">A:早班 09:00-18:00</el-radio></p>
                    <p><el-radio v-model="currentArrange" label="B">B:正常班 10:00-19:00</el-radio></p>
                    <p><el-radio v-model="currentArrange" label="C">C:晚班 13:00-21:00</el-radio></p>
                    <p><el-radio v-model="currentArrange" label="D">休:休息</el-radio></p>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="okShow = true" size="mini">取 消</el-button>
                    <el-button type="primary" @click="okEdit" size="mini">确 定</el-button>
                </span>
           </el-dialog>
       </div>

       <!-- 修改班次是否保存 -->
       <div>
           <el-dialog
            :visible.sync="okShow"
            width="15%"
           >
                <h4>有修改的数据尚未保存，是否保存？</h4>
                <div style="text-align:right;">
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="okShow = false" size="mini">取消</el-button>
                        <el-button type="primary" @click="okShow = false" size="mini">确定</el-button>
                    </span>
                </div>
           </el-dialog>
       </div>

       <!-- 批量导出模板 -->
       <div>
           <el-dialog
            title="模板设置排班"
            :visible.sync="outputShow"
            width="60%"
           >
                <EditArrange :date="this.currentMonth"/> 
           </el-dialog>
       </div>

    </div>
</template>

<script>
import EditArrange from './components/EditArrange.vue';
import GetDateList from './components/currentData.js';

export default {
  name: "markInfo",
  components: {EditArrange},
  data() {
    return {
      //第一个表格
      columnList: [],
      //第二个表格
      columnListLook: [],
      currentDate: "",
      //数据1
      arrangeListData: [
        {
          part: "研发部",
          name: "小米",
          day1: "休",
          day2: "休",
          day3: "A",
          day4: "A",
          day5: "A",
          day6: "A",
          day7: "A",
          day8: "A",
          day9: "A"
        },
        {
          part: "人事部",
          name: "小米",
          day1: "休",
          day2: "休",
          day3: "A",
          day4: "A",
          day5: "A",
          day6: "A",
          day7: "A",
          day8: "A",
          day9: "A"
        },
        {
          part: "研发部",
          name: "小米",
          day1: "休",
          day2: "休",
          day3: "A",
          day4: "A",
          day5: "A",
          day6: "A",
          day7: "A",
          day8: "A",
          day9: "A"
        },
        {
          part: "研发部",
          name: "小米",
          day1: "休",
          day2: "休",
          day3: "A",
          day4: "A",
          day5: "A",
          day6: "A",
          day7: "A",
          day8: "A",
          day9: "A"
        },
        {
          part: "研发部",
          name: "小米",
          day1: "休",
          day2: "休",
          day3: "A",
          day4: "A",
          day5: "A",
          day6: "A",
          day7: "A",
          day8: "A",
          day9: "A"
        },
        {
          part: "研发部",
          name: "小米",
          day1: "休",
          day2: "休",
          day3: "A",
          day4: "A",
          day5: "A",
          day6: "A",
          day7: "A",
          day8: "A",
          day9: "A"
        },
        {
          part: "研发部",
          name: "小米",
          day1: "休",
          day2: "休",
          day3: "A",
          day4: "A",
          day5: "A",
          day6: "A",
          day7: "A",
          day8: "A",
          day9: "A"
        }
      ],
      //数据2
      arrangeListDataLook: [
        { date: "A:早班", day1: "0" },
        { date: "B:正常班", day1: "0" },
        { date: "C:晚班", day1: "0" },
        { date: "休:休息", day1: "0" }
      ],
      dialogShow: false, //修改班次dialog
      currentArrange: "A", //点击后当前班次
      okShow: false,
      outputShow:false, //批量导出模板
      currentMonth: '2018/10', //当前月份
      canEdit:false,
      monthList:[],//月份列表
    };
  },
  methods: {
    getColumnList() {},
    handleClick(scope) {
      console.log(scope);
    },
    cell({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0 && columnIndex == 0) {
        return "colorA";
      } else if (rowIndex == 1 && columnIndex == 0) {
        return "colorB";
      } else if (rowIndex == 2 && columnIndex == 0) {
        return "colorC";
      } else if (rowIndex == 3 && columnIndex == 0) {
        return "colorD";
      }
    },
    dbclickCell(row, column, cell, event) {
      this.dialogShow = true;
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {},
    okEdit() {
      this.dialogShow = false;
    },
    rowClass({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 2 || columnIndex == 3) {
        return "colorGray";
      }
    },
    getCurrentMonthDays(currentDate) {
      this.columnList = [];
      this.columnListLook = [];
      var days = 0;
      var date = currentDate.split("/");
      var month = parseInt(date[1]);
      var year = parseInt(date[0]);
      if (
        month == 1 ||
        month == 3 ||
        month == 5 ||
        month == 7 ||
        month == 8 ||
        month == 10 ||
        month == 12
      ) {
        days = 31;
      } else if (month == 4 || month == 6 || month == 9 || month == 11) {
        days = 30;
      } else if (
        year % 4 == 0 &&
        (year % 100 != 0 || year % 400 == 0) &&
        month == 2
      ) {
        days = 29;
      } else {
        days = 28;
      }
      for (let i = 1; i <= days; i++) {
        var nowDate = `${year}-${month}-${i}`;
        var nowWeek = new Date(nowDate).getDay();
        if (nowWeek == 6 || nowWeek == 0) {
          this.columnList.push({ prop: "day" + i, label: `${i}`, work: false ,currentWeek:nowWeek});
          this.columnListLook.push({
            prop: "day" + i,
            label: `${i}`,
            work: false,
            currentWeek:nowWeek
          });
        } else {
          this.columnList.push({
            prop: "day" + i,
            label: `${i}`,
            width: "50px",
            work: true,
            currentWeek:nowWeek
          });
          this.columnListLook.push({
            prop: "day" + i,
            label: `${i}`,
            work: true,
            currentWeek:nowWeek
          });
        }
      };
    },
    headerCellStyle({row, column, rowIndex, columnIndex}) {
      this.columnList.map((item,index)=>{
        if(item.currentWeek == 6 || item.currentWeek == 0){
          if(columnIndex == index){
            return 'color:red';
          }
        }
      });
    },
    //处理路由参数query
    getQuery (query = {}){
      this.currentMonth = query.date;
      this.canEdit =  query.edit;
    },
    ChangeMonth (val){
      console.log(val);
      this.getCurrentMonthDays(val);
    }
  },
  computed: {
  },
  created() {
    this.getCurrentMonthDays(this.currentMonth);
  },
  mounted() {
    this.getQuery(this.$route.query);
    var res = GetDateList();
    console.log(res);
    this.monthList = res;
  }
};
</script>

<style lang="scss">
#markInfo {
  .tableInfo {
    margin-top: 30px;
  }
  .colorRed {
    background-color: red;
  }
  .colorGray {
    background-color: #c4c4c4;
  }
  .colorA {
    background-color: #409eff;
  }
  .colorB {
    background-color: #e6a23c;
  }
  .colorC {
    background-color: #67c23a;
  }
  .colorD {
    background-color: #909399;
  }
}
</style>

