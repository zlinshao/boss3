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
          <el-select v-model="arrangeParams.arrange_month" placeholder="请选择" size="mini" @change="ChangeMonth">
            <el-option v-for="(item,index) in monthList" :key="index" :label="item.date" :value="item.date">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="14">
          <el-form :inline="true" ref="form" :model="form" label-width="50px">
          <el-form-item>
              <span>姓名：</span>
              <el-input v-model="form.name" placeholder="请输入" size="mini" style="width:180px;dispaly:inline-block;margin-left:20px;"></el-input>
          </el-form-item>
          <el-form-item>
              <span>部门：</span>
              <el-input placeholder="请选择" @focus="openOrgan('org_names', 'depart')" style="width:250px;margin-left:20px;" v-model="params.org_names"
                              size="mini">
                  <el-button slot="append" @click="emptyDepart('org_names')">清空</el-button>
              </el-input>
          </el-form-item>
          <!-- <el-form-item>
              <span>职位：</span>
              <el-input v-model="form.post" placeholder="请输入" size="mini" style="width:180px;dispaly:inline-block;margin-left:20px;"></el-input>
          </el-form-item> -->
          <el-form-item>
              <el-button type="primary" size="mini" @click="handleSubmit">确定</el-button>
          </el-form-item>
        </el-form>
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
      :data="arrangeListData" 
      :header-cell-style="headerCellStyle" 
      @cell-click="clickCell" 
      :cell-class-name="rowClass"
      v-loading="arrangeLoading"
      :empty-text="arrangeInfo"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(255, 255, 255, 0)">  
        <el-table-column label="部门" width="80px">
          <template slot-scope="scope">
            <span v-text="partInfo(scope.row)"></span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="80px"></el-table-column>

         <el-table-column v-for="(colu,index) in columnList" :key="index" :label="colu.label" style="width:35%;">
           <template slot-scope="scope">
            <div v-text="showArrange(scope.row,colu.label)" :class="bg(scope.row,colu.label)" style="cursor:pointer;"></div>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="100px">
          <template slot-scope="scope">
            <div>
              <el-button type="primary" size="mini" @click="saveCurrentArrange">保存</el-button>
            </div>
          </template>
        </el-table-column>
      
      </el-table>
    </div>

    <!-- 分页 -->
    <div style="margin-top:30px;text-align:right;">
      <el-pagination background :page-sizes="[15,20,25,30]" layout="total,sizes,prev, pager, next ,jumper" :total="arrangePageTotal">
      </el-pagination>
    </div>

    <!-- 排班表 仅查看 -->
    <!-- <div style="margin-top:50px">
      <el-table style="width:100%" :data="arrangeListDataLook" :cell-style="cellStyle" :cell-class-name="cell">
        <el-table-column prop='date' label="班次/日期">
        </el-table-column>
        <el-table-column v-for="(colu,idx) in columnListLook" :key="idx" :prop="colu.prop" :label="colu.label" width="50px">
        </el-table-column>
      </el-table>
    </div> -->

    <!-- 修改班次 dialog -->
    <div>
      <el-dialog title="修改班次" :visible.sync="dialogShow" width="25%">
        <div>
          <p>
            <el-radio v-model="currentArrange" label="A">A:早班 09:00-18:00</el-radio>
          </p>
          <p>
            <el-radio v-model="currentArrange" label="B">B:正常班 10:00-19:00</el-radio>
          </p>
          <p>
            <el-radio v-model="currentArrange" label="C">C:晚班 13:00-21:00</el-radio>
          </p>
          <p>
            <el-radio v-model="currentArrange" label="休">休:休息</el-radio>
          </p>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="okShow = true" size="mini">取 消</el-button>
          <el-button type="primary" @click="okEdit" size="mini">确 定</el-button>
        </span>
      </el-dialog>
    </div>

    <!-- 修改班次是否保存 -->
    <div>
      <el-dialog :visible.sync="okShow" width="15%">
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
      <el-dialog title="模板设置排班" :visible.sync="outputShow" width="60%">
        <EditArrange :date="arrangeParams.arrange_month" />
      </el-dialog>
    </div>

    <!--组织架构-->
    <Organization :organizationDialog="organModule" :type="organizeType" :length="lengths" @close="closeOrgan" @selectMember="selectMember"></Organization>
  </div>
</template>

<script>
import EditArrange from "./components/EditArrange.vue";
import GetDateList from "./components/currentData.js";
import Organization from "../../../common/organization";

export default {
  name: "markInfo",
  components: { EditArrange, Organization },
  data() {
    return {
      url: globalConfig.server,
      arrangeLoading: false,
      arrangeInfo: "",
      arrangePageTotal: 0,
      arrangeParams: {
        page: 1,
        limit: 10,
        user_id: "",
        org_id: "",
        search: "",
        arrange_month: ""
      },
      //form 表单
      form: {
        name: "",
        part: "",
        post: ""
      },
      params: {
        limit: 10,
        page: 1
      },
      organModule: false,
      organizeType: "",
      lengths: 0,
      organDivision: "",
      //第一个表格
      columnList: [],
      //第二个表格
      columnListLook: [],
      currentDate: "",
      //数据1
      arrangeListData: [],
      //数据2
      arrangeListDataLook: [],
      dialogShow: false, //修改班次dialog
      currentArrange: "A", //点击后当前班次
      okShow: false,
      outputShow: false, //批量导出模板
      canEdit: false,
      monthList: [], //月份列表
      row: "", //当前row
      column: "", //当前column
      currentSort: {
        user_id: "",
        arrange: {},
        arrange_month: ""
      } //当前排班
    };
  },
  methods: {
    // -------------分割线 高级搜索部分----------------
    // 花名册列表
    staffList(page) {
      this.tableLoading = true;
      this.tableStatus = " ";
      this.params.page = page || 1;
      this.$http
        .get(this.url + "hrm/User/lists", {
          params: this.params
        })
        .then(res => {
          this.tableLoading = false;
          if (res.data.success) {
            let data = res.data.data.data;
            if (data.length < 1) {
              this.emptyList();
            }
            this.tableData = data;
            this.totalNum = res.data.data.count;
          } else {
            this.emptyList();
          }
        });
    },
    // 列表无数据
    emptyList() {
      this.totalNum = 0;
      this.tableData = [];
      this.tableStatus = "暂无数据";
      return false;
    },
    //表单确认
    handleSubmit() {
      console.log(this.form);
    },
    // 打开组织架构
    openOrgan(val, type) {
      this.organDivision = val;
      this.organModule = true;
      this.organizeType = type;
      this.lengths = "";
    },
    // 清空部门
    emptyDepart(val) {
      console.log("clear");
      this.params[val] = "";
    },
    // 关闭组织架构
    closeOrgan() {
      this.organDivision = "";
      this.organModule = false;
      this.organizeType = "";
      this.lengths = 0;
    },
    // 确认部门
    selectMember(val) {
      let organ = this.organDivision;
      let str = [];
      for (let item of val) {
        str.push(item.name);
      }
      this.departName(str, organ);
    },
    // 数组名称去重 拼接
    departName(arr, organ) {
      this.params[organ] = this.montage(arr);
    },
    // -------------分割线 高级搜索部分----------------
    //排班列表
    getArrangeList(arrangeParams) {
      this.arrangeLoading = true;
      this.arrangeInfo = " ";
      this.$http
        .get(this.url + "attendance/sort", {
          params: arrangeParams
        })
        .then(res => {
          if (res.status == 200) {
            if (res.data.code == 20000) {
              this.arrangeLoading = false;
              if (res.data.data.data.length < 1) {
                this.getArrangeEmpty();
              } else {
                this.arrangeListData = res.data.data.data;
                this.arrangePageTotal = res.data.data.count;
              }
            } else {
              this.getArrangeEmpty();
            }
          }
        });
    },
    //排班列表为空
    getArrangeEmpty() {
      this.arrangeInfo = "暂无数据";
      this.arrangePageTotal = 0;
      this.arrangeListData = [];
      return false;
    },
    partInfo(row) {
      var name = "";
      if (row.org.length < 1) {
        return null;
      }
      row.org.map((item, index) => {
        name += item.name + ",";
      });
      return name.substring(0, name.length - 1);
    },
    showArrange(row, label) {
      if (row["oa_sort"] != null && row["oa_sort"]["arrange"][label]) {
        return row["oa_sort"]["arrange"][label];
      } else {
        return "/";
      }
    },
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
    clickCell(row, column, cell, event) {
      this.row = "";
      this.column = "";
      if (column.label == "部门" || column.label == "姓名") {
        this.$message({
          message: "请选择正确的日期进行排班！",
          type: "warning"
        });
        return false;
      } else if (column.label != "操作") {
        this.row = row;
        this.column = column;
        this.dialogShow = true;
      }
    },
    bg(row, label) {
      if (row["oa_sort"] != null && row["oa_sort"]["arrange"][label]) {
        var arrange = row["oa_sort"]["arrange"][label];
        if (arrange == "A") {
          return "colorA";
        } else if (arrange == "B") {
          return "colorB";
        } else if (arrange == "C") {
          return "colorC";
        } else {
          return "colorD";
        }
      }
    },
    okEdit() {
      this.currentSort["user_id"] = this.row.id;
      var label = this.column.label;
      var obj = {};
      obj[this.column.label] = this.currentArrange;
      this.currentSort["arrange"] = Object.assign(
        {},
        this.currentSort["arrange"],
        obj
      );
      this.currentSort["arrange_month"] = this.arrangeParams.arrange_month;
      this.arrangeListData.map((item, index) => {
        if (item.id === this.currentSort["user_id"]) {
          console.log(index);
          this.arrangeListData[index]["oa_sort"] = this.currentSort;
        }
      });
      console.log(this.arrangeListData);
      this.dialogShow = false;
    },
    resetCurrentSort() {
      this.currentSort = {
        user_id: "",
        arrange: {},
        arrange_month: ""
      };
    },
    saveCurrentArrange() {
      console.log("save");
      console.log(this.currentSort);
    },
    rowClass({ row, column, rowIndex, columnIndex }) {
      // if (columnIndex == 2 || columnIndex == 3) {
      //   return "colorGray";
      // }
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
          this.columnList.push({
            prop: "" + i,
            label: `${i}`,
            work: false,
            currentWeek: nowWeek
          });
          this.columnListLook.push({
            prop: "" + i,
            label: `${i}`,
            work: false,
            currentWeek: nowWeek
          });
        } else {
          this.columnList.push({
            prop: "" + i,
            label: `${i}`,
            width: "50px",
            work: true,
            currentWeek: nowWeek
          });
          this.columnListLook.push({
            prop: "" + i,
            label: `${i}`,
            work: true,
            currentWeek: nowWeek
          });
        }
      }
    },
    headerCellStyle({ row, column, rowIndex, columnIndex }) {
      this.columnList.map((item, index) => {
        if (item.currentWeek == 6 || item.currentWeek == 0) {
          if (columnIndex == index) {
            return "color:red";
          }
        }
      });
    },
    //处理路由参数query
    getQuery(query = {}) {
      this.arrangeParams.arrange_month = query.date;
      this.canEdit = query.edit;
    },
    ChangeMonth(val) {
      this.getCurrentMonthDays(val);
      this.arrangeParams.arrange_month = val;
      this.getArrangeList(this.arrangeParams);
    }
  },
  computed: {},
  created() {
    this.getQuery(this.$route.query);
    this.getCurrentMonthDays(this.arrangeParams.arrange_month);
  },
  mounted() {
    var res = GetDateList();
    this.monthList = res;
    this.getArrangeList(this.arrangeParams);
  }
};
</script>

<style lang="scss">
#markInfo {
  .tableInfo {
    width: 100%;
    text-align: center;
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

