<template>
  <div id="markInfo">
    <div>
      <el-row :gutter="20">
        <el-col :span="10">
          <!-- 班次说明 -->
          <div>
            班次说明
            <el-tag
              style="margin-right:15px;margin-bottom:20px;"
              v-for="tmp in checkList"
              :type="tmp.alias == 'A' ? 'danger': tmp.alias == 'B' ? 'warning' : tmp.alias == 'C' ? 'success' : tmp.alias == 'D' ? '' : 'info'"
              :key="tmp.id"
              size="mini">{{tmp.alias}}: {{tmp.name}}{{tmp.morning_work_time}}-{{tmp.pm_rest_time}}
            </el-tag>
          </div>
        </el-col>
        <el-col :span="14">
          <!-- 搜索 -->
          <div style="text-align:right;padding-right:50px">
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form :inline="true" ref="form" :model="arrangeParams" label-width="50px" style="margin-top:-8px">
                  <el-form-item>
                    <el-input
                      v-model="arrangeParams.search"
                      placeholder="请输入需要搜索的员工姓名"
                      size="mini"
                      style="width:250px;dispaly:inline-block;margin-left:20px;"
                      clearable
                      @keyup.enter.native="goSearch"
                    >
                      <el-button slot="append" icon="el-icon-search" @click="goSearch"></el-button>
                    </el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" size="mini" @click="isHigh = !isHigh">高级</el-button>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" size="mini" @click="outArrange" v-show="!exportBtnShow" :loading="exprotLoading">导出排班表<i
                      class="el-icon-download el-icon--right"></i></el-button>
                    <el-button type="primary" size="mini" @click="outTemplet" v-show="exportBtnShow" :loading="exprotTemp">导出排班模板<i
                      class="el-icon-download el-icon--right"></i></el-button>
                    <el-button type="primary" size="mini" @click="importShow = true" v-show="exportBtnShow">导入排班表<i
                      class="el-icon-upload el-icon--right"></i></el-button>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 排班表 可编辑 -->
    <div class="tableInfo">
      <el-table
        :data="arrangeListData"
        :header-cell-style="headerCellStyle"
        @cell-click="clickCell"
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

        <el-table-column v-for="(colu,index) in columnList" :key="index" :label="colu.label" width="48%">
          <template slot-scope="scope">
            <div v-text="showArrange(scope.row,colu.label)" :class="bg(scope.row,colu.label)"
                 style="cursor:pointer;"></div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100px">
          <template slot-scope="scope">
            <div>
              <el-button type="primary" size="mini" @click="saveCurrentArrange(scope.row)">保存</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页 -->
    <div style="margin-top:20px;text-align:right;padding-right:30px;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[5,10,15]"
        :page-size="arrangeParams.limit"
        :current-page="arrangeParams.page"
        layout="total,sizes,prev, pager, next ,jumper"
        :total="arrangePageTotal">
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
          <p v-for="(tmp,index) in checkList" :key="index">
            <el-radio v-model="currentArrange" :label="tmp.alias">{{tmp.alias}}:{{tmp.name}} &nbsp;&nbsp;{{tmp.morning_work_time}}
              - {{tmp.pm_rest_time}}
            </el-radio>
          </p>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogShow = false" size="mini">取 消</el-button>
          <el-button type="primary" @click="okEdit" size="mini">确 定</el-button>
        </span>
      </el-dialog>
    </div>

    <!-- 修改班次是否保存 -->
    <!-- <div>
      <el-dialog :visible.sync="okShow" width="15%">
        <h4>有修改的数据尚未保存，是否保存？</h4>
        <div style="text-align:right;">
          <span slot="footer" class="dialog-footer">
            <el-button @click="okShow = false" size="mini">取消</el-button>
            <el-button type="primary" @click="okShow = false" size="mini">确定</el-button>
          </span>
        </div>
      </el-dialog>
    </div> -->

    <!-- 批量导出模板 -->
    <!-- <div>
      <el-dialog title="模板设置排班" :visible.sync="outputShow" width="60%">
        <EditArrange :date="arrangeParams.arrange_month" />
      </el-dialog>
    </div> -->

    <!--组织架构-->
    <Organization :organizationDialog="organModule" :type="organizeType" :length="lengths" @close="closeOrgan"
                  @selectMember="selectMember"></Organization>

    <div class="highRanking" style="position:static !important;">
      <div class="filter high_grade" :class="isHigh? 'highHide':''">
        <el-form :inline="true" onsubmit="return false" :model="arrangeParams" size="mini" label-width="100px">
          <div class="filterTitle">
            <i class="el-icons-fa-bars"></i>&nbsp;&nbsp;高级搜索
          </div>
          <el-row class="el_row_border">
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">月份</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-select v-model="arrangeParams.arrange_month" style="width:300px" placeholder="请选择" size="mini"
                             @change="ChangeMonth">
                    <el-option
                      v-for="(item,index) in monthList"
                      :key="index"
                      :label="item.date"
                      :value="item.date">
                    </el-option>
                  </el-select>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">部门</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-input placeholder="请选择" @focus="openOrgan('org_names', 'depart')" style="width:300px;"
                              v-model="arrangeParams.org_name"
                              size="mini">
                      <el-button slot="append" @click="emptyDepart('org_names')">清空</el-button>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row class="el_row_border">
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">职位</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-select @visible-change="visibleChange" @change="changeDuty" @remove-tag="dutyRemove"
                             style="width:300px" size="mini" :disabled="canDuty" v-model="arrangeParams.duty_id"
                             multiple placeholder="请选择">
                    <el-option
                      v-for="(item,index) in duty"
                      :key="index"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">岗位</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-select style="width:300px" size="mini" :disabled="canPosition"
                               v-model="arrangeParams.position_id" multiple placeholder="请选择">
                      <el-option
                        v-for="(item,idx) in position"
                        :key="idx"
                        :label="item.name"
                        :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <div class="btnOperate">
            <el-button size="mini" type="primary" @click="goSearch">搜索</el-button>
            <el-button size="mini" type="primary" @click="resetting">重置</el-button>
            <el-button size="mini" type="primary" @click="highGrade">取消</el-button>
          </div>
        </el-form>
      </div>
    </div>
    <!-- 导入排班表 -->
    <div>
      <el-dialog
        title="导入"
        :visible.sync="importShow"
        width="20%"
      >
        <Upload :ID="'uploadExcel'" :isClear="isClear" @getImg="getImg"></Upload>
        <div style="width:100%;text-align:right;">
          <el-button size="mini" @click="cencelUpload">取消</el-button>
          <el-button size="mini" type="primary" @click="importExl" :loading="importTmp">确定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import EditArrange from "./components/EditArrange.vue";
  import GetDateList from "./components/currentData.js";
  import Organization from "../../../common/organization";
  import Upload from '../../../common/UPLOAD.vue';

  export default {
    name: "markInfo",
    components: {EditArrange, Organization, Upload},
    data() {
      return {
        importShow: false,//
        isClear: false,
        url: globalConfig.server,
        arrangeLoading: false,
        arrangeInfo: "",
        arrangePageTotal: 0,
        arrangeParams: {
          page: 1,
          limit: 5,
          user_id: null,
          org_id: [],
          search: "",
          arrange_month: "",
          org_name: "",
          position_id: [],
          duty_id: [],
        },
        isHigh: false, //高级
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
        monthList: [], //月份列表
        row: "", //当前row
        column: "", //当前column
        currentSort: {
          user_id: "",
          arrange: {},
          arrange_month: ""
        }, //当前排班
        isFirst: true,
        checkList: [],
        file_id: '',
        exportBtnShow: true,
        edited: false,
        duty: [],//职位列表
        position: [],
        canDuty: true,
        canPosition: true,
        currentDay: '',
        exprotLoading: false,
        exprotTemp: false,
        importTmp: false
      };
    },
    methods: {
      getImg(val) {
        console.log(val);
        if (val[1].length > 1) {
          this.$notify.warning({
            title: '警告',
            message: '仅支持单个文件上传'
          });
          return false;
        }
        this.file_id = val[1][0];
      },
      importExl() {
        this.importTmp = true;
        this.$http.post(this.url + "attendance/sort-excel/templet-enter", {
          file_id: this.file_id
        }).then(res => {
          if (res.status == 200) {
            if (res.data.code == 10000) {
              this.isClear = true;
              this.importTmp = false;
              this.$notify.success({
                title: "成功",
                message: res.data.msg
              });
              this.cencelUpload();
              this.getArrangeList();
            } else {
              this.importTmp = false;
              this.$notify.warning({
                title: "警告",
                message: res.data.msg
              });
              this.cencelUpload();
            }
          }
        })
      },
      cencelUpload() {
        this.importShow = false;
        this.isClear = true;
      },
      // -------------分割线 高级搜索部分----------------
      // 打开组织架构
      openOrgan(val, type) {
        this.organDivision = val;
        this.organModule = true;
        this.organizeType = type;
        this.lengths = '';
        this.emptyDutyPosition();
      },
      // 清空部门
      emptyDepart(val) {
        this.emptyDutyPosition();
        this.arrangeParams.org_name = "";
        this.canPosition = true;
        this.canDuty = true;

      },
      emptyDutyPosition() {
        this.arrangeParams.org_id = [];
        this.arrangeParams.position_id = [];
        this.arrangeParams.duty_id = [];
        this.duty = [];
        this.position = [];
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
        var names = "";
        for (var item of val) {
          this.arrangeParams.org_id.push(item.id);
          this.duties(item.id);
          names += item.name + ","
        }
        this.arrangeParams.org_name = names.substring(0, names.length - 1);
      },
      // 职务
      duties(id) {
        this.$http.get(this.url + 'manager/position?department_id=' + id).then(res => {
          if (res.data.code === '20000') {
            res.data.data.data.forEach(item => {
              this.duty.push(item);
            });
            this.canDuty = false;
          } else {
            this.duty = [];
            this.prompt('warning', res.data.msg);
          }
        })
      },
      changeDuty() {
        this.position = [];
        this.arrangeParams.position_id = [];
        var arr = this.arrangeParams.duty_id;
        if (arr.length < 1) {
          this.canPosition = true;
        } else {
          this.canPosition = false;
        }
      },
      visibleChange(status) {
        if (!status) {
          var arr = this.arrangeParams.duty_id;
          for (var id of arr) {
            this.quarters(id);
          }
        } else {
          this.position = [];
          this.arrangeParams.position_id = [];
        }
      },
      dutyRemove() {
        this.changeDuty();
        var arr = this.arrangeParams.duty_id;
        for (var id of arr) {
          this.quarters(id);
        }
      },
      quarters(id) {
        this.$http.get(this.url + 'manager/positions?type=' + id).then(res => {
          if (res.data.code === '20000') {
            for (let item of res.data.data.data) {
              this.position.push(item);
            }
          } else {
            this.prompt('warning', res.data.msg);
          }
        })
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
                this.arrangeLoading = false;
                this.getArrangeEmpty();
              }
            }
            this.isHigh = false;
          });
      },
      //获取班次
      getCheckList() {
        this.$http
          .get(this.url + "attendance/classes", {
            params: {type: "all"}
          })
          .then(res => {
            if (res.status == 200) {
              if (res.data.code == 20000) {
                this.checkList = res.data.data.data;
              } else {
                this.$notify.warning({
                  title: '警告',
                  message: "获取失败"
                })
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
        if (row["org"] != null) {
          var name = "";
          if (row.org.length < 1) {
            return null;
          }
          row.org.map((item, index) => {
            name += item.name + ",";
          });
          return name.substring(0, name.length - 1);
        } else {
          return null;
        }
      },
      showArrange(row, label) {
        if (!row["oa_sort"]) {
          return "/";
        } else {
          if (!row.oa_sort.arrange) {
            return "/"
          } else {
            if (row["oa_sort"]["arrange"][label]) {
              return row["oa_sort"]["arrange"][label];
            } else {
              return "/";
            }
          }
        }
      },
      cell({row, column, rowIndex, columnIndex}) {
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
      //编辑排班
      clickCell(row, column, cell, event) {
        this.currentDay = column.label;
        var res = this.estimateMonth();
        if (!res) {
          this.$notify.warning({
            message: "不能编辑小于或等于当前日期的排班",
            title: "警告"
          });
          return false;
        }
        // if (row["oa_sort"] != null) {
        //   if (row["oa_sort"]["arrange"][column.label]) {
        //     this.currentArrange = row["oa_sort"]["arrange"][column.label];
        //   }
        // }
        this.row = "";
        this.column = "";
        if (column.label == "部门" || column.label == "姓名") {
          return false;
        } else if (column.label != "操作") {
          this.row = row;
          this.column = column;
          this.dialogShow = true;
        }
      },
      //单元格背景颜色
      bg(row, label) {
        var date = new Date().toLocaleDateString();
        var currentDate = this.arrangeParams.arrange_month + "-" + label;

        if (row["oa_sort"] != null) {
          if(row["oa_sort"]["arrange"] != null ){
            if(row["oa_sort"]["arrange"][label]){
              var arrange = row["oa_sort"]["arrange"][label];
              if (arrange == "A") {
                return "colorRed";
              } else if (arrange == "B") {
                return "colorB";
              } else if (arrange == "C") {
                return "colorC";
              } else if (arrange == "D") {
                return "colorA";
              } else {
                return "colorD";
              }
            }
          }
        }
        if (new Date(currentDate).getTime() <= new Date(date)) {
          return "colorGray";
        }
      },
      //编辑确定
      okEdit() {
        if (this.isFirst) {
          this.currentSort["user_id"] = this.row.id;
        }
        if (this.row.id != this.currentSort["user_id"]) {
          this.currentSort = [];
        }
        this.currentSort["user_id"] = this.row.id;
        var label = this.column.label;
        var obj = {};
        obj[this.column.label] = this.currentArrange;
        this.currentSort["arrange"] = Object.assign(
          {},
          this.currentSort["arrange"],
          obj
        );
        this.currentSort[
          "arrange_month"
          ] = this.arrangeParams.arrange_month.split("/").join("-");
        this.arrangeListData.map((item, index) => {
          if (item.id === this.row.id) {
            if (this.arrangeListData[index]["oa_sort"]) {
              this.arrangeListData[index]["oa_sort"]["arrange"] = Object.assign(
                {},
                this.arrangeListData[index]["oa_sort"]["arrange"],
                this.currentSort["arrange"]
              );
              this.currentSort = this.arrangeListData[index]["oa_sort"];
            } else {
              this.arrangeListData[index]["oa_sort"] = this.currentSort;
            }
            this.isFirst = false;
          }
        });
        this.currentArrange = "A";
        this.dialogShow = false;
        this.edited = true;
      },
      resetCurrentSort() {
        this.currentSort = {
          user_id: "",
          arrange: {},
          arrange_month: ""
        };
      },
      saveCurrentArrange(row) {
        if (this.edited) {
          if (row.id != this.currentSort.user_id) {
            this.$notify.warning({
              title: "警告",
              message: "请点击正确的保存按钮"
            });
            return false;
          }
          this.$http
            .post(this.url + "attendance/sort", {
              user_id: this.currentSort.user_id,
              arrange: this.currentSort.arrange,
              arrange_month: this.currentSort.arrange_month
            })
            .then(res => {
              if (res.status == 200) {
                if (res.data.code == 20010 || res.data.code == 20000) {
                  this.$notify.success({message: res.data.msg, title: "成功"});
                  this.getArrangeList(this.arrangeParams);
                  this.isFirst = true;
                  this.edited = false;
                  this.resetCurrentSort();
                } else {
                  this.$notify.warning({message: res.data.msg, title: "警告"});
                  this.edited = false;
                  return false;
                }
              }
            });
        } else {
          this.$notify.warning({
            title: "警告",
            message: "尚未作出修改！"
          });
          return false;
        }
      },
      //分页
      handleSizeChange(val) {
        this.arrangeParams.limit = val;
        this.getArrangeList(this.arrangeParams);
      },
      handleCurrentChange(val) {
        this.arrangeParams.page = val;
        this.getArrangeList(this.arrangeParams);
      },
      //获取月份天数
      getCurrentMonthDays(currentDate) {
        this.columnList = [];
        this.columnListLook = [];
        var days = 0;
        var date = currentDate.split("-");
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
      headerCellStyle({row, column, rowIndex, columnIndex}) {
        var date = this.arrangeParams.arrange_month + "-" + column.label;
        var week = new Date(date).getDay();
        if (columnIndex > 1) {
          if (column.label != "操作") {
            if (week != 6 && week != 0) {
              return "color: #67c23a";
            } else {
              return "color: red";
            }
          }
        }
      },
      //获取当前月份
      getQuery() {
        var date = new Date().toLocaleDateString().split("/");
        this.arrangeParams.arrange_month = date[0] + "-" + date[1];
      },
      ChangeMonth(val) {
        // this.arrangeParams.arrange_month = val;
        // console.log(val);
      },
      //判断是否可编辑
      estimateMonth() {
        var date = new Date().toLocaleDateString();
        var currentMonth = this.arrangeParams.arrange_month + "-" + this.currentDay
        if (new Date(currentMonth).getTime() <= new Date(date).getTime()) {
          return false;
        } else {
          return true;
        }
      },
      //搜索
      goSearch() {
        this.getArrangeList(this.arrangeParams);
        this.getCurrentMonthDays(this.arrangeParams.arrange_month);
        var date = new Date().toLocaleDateString().split("/");
        var cMonth = date[0] + "-" + date[1];
        if (new Date(cMonth).getTime() <= new Date(this.arrangeParams.arrange_month).getTime()) {
          this.exportBtnShow = true;
        } else {
          this.exportBtnShow = false;
        }
      },
      resetting() {
        this.getQuery();
        this.arrangeParams.org_name = "";
        this.arrangeParams.org_id = [];
        this.arrangeParams.position_id = [];
        this.arrangeParams.duty_id = [];
        this.canPosition = true;
        this.canDuty = true;
      },
      highGrade() {
        this.isHigh = !this.isHigh;
      },
      //导出排班表
      outArrange() {
        this.exprotLoading = true;
        this.$http.post(this.url + "attendance/sort-excel/sort-out", this.arrangeParams).then(res => {
          if (res.status == 200) {
            if (res.data.code == 10000) {
              this.exprotLoading = false;
              this.$notify.success({
                title: '成功',
                message: res.data.msg
              });
              window.location.href = res.data.data.uri;
            } else {
              this.exprotLoading = false;
              this.$notify.warning({
                title: '警告',
                message: res.data.msg
              })
            }
          }
        })
      },
      //导出排班模板
      outTemplet() {
        this.exprotTemp = true;
        this.$http.post(this.url + "attendance/sort-excel/templet-out", this.arrangeParams).then(res => {
          if (res.status == 200) {
            if (res.data.code == 10000) {
              this.exprotTemp = false;
              this.$notify.success({
                title: '成功',
                message: res.data.msg
              });
              window.location.href = res.data.data.uri;

            }else {
              this.exprotTemp = false;
              this.$notify.warning({
                title: '警告',
                message:res.data.msg
              })
            }
          }
        })
      }
    },
    created() {
      this.getQuery();
      this.getCurrentMonthDays(this.arrangeParams.arrange_month);
    },
    mounted() {
      this.getArrangeList(this.arrangeParams);
      var res = GetDateList();
      this.monthList = res;
      this.getCheckList();
    }
  };
</script>

<style lang="scss">
  #markInfo {
    width: 100%;
    position: relative;
    .tableInfo {
      text-align: center;
    }
    .colorRed,
    .colorA,
    .colorB,
    .colorGray,
    .colorC,
    .colorD,
    .colorGray {
      color: white;
    }
    .colorRed {
      background-color: #f56c6c;
    }
    .colorGray {
      background-color: #3B3B3B;
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
      background-color: #c4c4c4;
    }
  }
</style>

