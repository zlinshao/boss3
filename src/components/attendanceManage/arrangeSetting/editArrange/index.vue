<template>
  <div id="markInfo">
    <div>
      <el-row :gutter="20">
        <el-col :span="11">
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
            <div>
              本月未排班人数：<span style="color: red;cursor: pointer;" @click="searchUnSort">{{ unSortCount }}人</span>
              <el-button type="text" style="color: #14e731;margin-left: 15px;" @click="searchAll">全部</el-button>
            </div>
          </div>
        </el-col>
        <el-col :span="13">
          <!-- 搜索 -->
          <div style="text-align:right;">
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form :inline="true" ref="form" :model="arrangeParams" label-width="50px" style="margin-top:-8px" onsubmit="return false">
                  <el-form-item>
                    <span>月份:</span>
                    <el-select v-model="arrangeParams.arrange_month" style="width:180px" placeholder="请选择" size="mini"
                               @change="ChangeMonth">
                      <el-option v-for="item in monthList" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <span>部门:</span>
                    <el-input placeholder="请选择" @focus="openOrgan('org_names', 'depart')" style="width:180px;"
                              v-model="arrangeParams.org_name"
                              size="mini">
                      <el-button slot="append" @click="emptyDepart('org_names')">清空</el-button>
                    </el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-input
                      v-model="arrangeParams.search"
                      placeholder="请输入需要搜索的员工姓名"
                      size="mini"
                      style="width:250px;dispaly:inline-block;margin-left:20px;"
                      clearable
                      @keyup.enter.native.prevent="goSearch"
                    >
                      <el-button slot="append" icon="el-icon-search" @click="goSearch"></el-button>
                    </el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" size="mini" @click="goSearch">搜索</el-button>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" size="mini" @click="isHigh = !isHigh">高级</el-button>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" size="mini" @click="editAttendance" :loading="exprotLoading">编辑班次</el-button>
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
        <el-table-column label="部门" align="center" width="100px">
          <template slot-scope="scope">
            <span v-text="partInfo(scope.row)"></span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" align="center" width="100px"></el-table-column>

        <el-table-column v-for="(colu,index) in columnList" :key="index" :label="colu.label">
          <template slot-scope="scope" align="center">
            <div v-text="showArrange(scope.row,colu.label)" :class="bg(scope.row,colu.label)"
                 style="cursor:pointer;"></div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-check" circle @click="saveCurrentArrange(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页 -->
    <div style="margin-top:20px;text-align:right;padding-right:30px;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[12,24,36]"
        :page-size="arrangeParams.limit"
        :current-page="arrangeParams.page"
        layout="total,sizes,prev, pager, next ,jumper"
        :total="arrangePageTotal">
      </el-pagination>
    </div>

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

    <!--组织架构-->
    <Organization :organizationDialog="organModule" :type="organizeType" :length="lengths" @close="closeOrgan"
                  @selectMember="selectMember"></Organization>

    <!--高级搜索内容-->
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
          limit: 12,
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
        importTmp: false,
      //  没有排班的接口
        unSortCount: '',
        unSortIds: [],
      };
    },
    methods: {
      searchAll() {
        this.arrangeParams.user_id = null;
        this.getArrangeList(this.arrangeParams);
      },
      searchUnSort() {
        this.getArrangeList(this.arrangeParams,this.unSortIds);
      },
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
              // this.resetting();
              this.cencelUpload();
              this.getArrangeList(this.arrangeParams);
            } else {
              this.isClear = true;
              this.importTmp = false;
              this.$notify.warning({
                title: "警告",
                message: res.data.msg
              });
              this.resetting();
              this.cencelUpload();
            }
          }
        })
      },
      cencelUpload() {
        this.importTmp = false;
        this.importShow = false;
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
        this.$http.get(this.url + 'organization/duty?org_id=' + id).then(res => {
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
        this.$http.get(this.url + 'organization/position?duty_id=' + id).then(res => {
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
      getArrangeList(arrangeParams,sort) {
        this.arrangeLoading = true;
        this.arrangeInfo = " ";
        if(sort){
          arrangeParams.user_id = sort;
        }
        this.$http
          .post(this.url + "attendance/sort/list",arrangeParams).then(res => {
            if (res.status == 200) {
              if (res.data.code == 20000) {
                this.arrangeLoading = false;
                if(res.data.data.unSort.count && res.data.data.unSort.user_id){
                  this.unSortCount = res.data.data.unSort.count;
                  this.unSortIds = res.data.data.unSort.user_id;
                }
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
        // var res = this.estimateMonth();
        // if (!res) {
        //   this.$notify.warning({
        //     message: "不能编辑小于或等于当前日期的排班",
        //     title: "警告"
        //   });
        //   return false;
        // }
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
        // console.log(row,label, "11111")
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
        this.arrangeParams.arrange_month = this.getCurrentDate('now');

      },
      ChangeMonth(val) {
        // this.arrangeParams.arrange_month = val;
        // console.log(val);
      },
      // //判断是否可编辑
      // estimateMonth() {
      //   var date = new Date().toLocaleDateString();
      //   var currentMonth = this.arrangeParams.arrange_month + "-" + this.currentDay
      //   if (new Date(currentMonth).getTime() <= new Date(date).getTime()) {
      //     return false;
      //   } else {
      //     return true;
      //   }
      // },
      //搜索
      goSearch() {
        this.arrangeParams.page = 1;
        this.arrangeParams.limit = 12;
        this.getArrangeList(this.arrangeParams);
        this.getCurrentMonthDays(this.arrangeParams.arrange_month);
        var date = new Date().toLocaleDateString().split("/");
        var cMonth = date[0] + "-" + date[1];
        if (new Date(cMonth).getTime() <= new Date(this.arrangeParams.arrange_month).getTime()) {
          this.exportBtnShow = true;
        } else {
          this.exportBtnShow = false;
        }
        return false;
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
          return false;
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
              if(res.data.data.uri){
                this.exprotTemp = false;
                this.$notify.success({
                  title: '成功',
                  message: res.data.msg
                });
                window.location.href = res.data.data.uri;
              }else{
                this.$notify.warning({
                  title: '警告',
                  message:'导出失败'
                })
                return false;
              }
            }else {
              this.exprotTemp = false;
              this.$notify.warning({
                title: '警告',
                message:res.data.msg
              })
            }
          }
        })
      },
      // 编辑班次
      editAttendance() {
        this.$router.push({ path: "/EditAttendanceShift" });
      },
      getCurrentDate(val = '') {
        let currentDate = new Date();
        let M = currentDate.getMonth() + 7;
        let yy = currentDate.getFullYear();
        let mm;
        let month = [];
        if (val === 'now') {
          mm = (M < 10 ? "0" + M : M);
          return  yy + "-" + mm;
        }
        for (let i = 0; i < 24; i++) {
          if (M < 1) {
            yy = yy - 1;
            M = 12;
          }
          mm = (M < 10 ? "0" + M : M);
          month.push({value: yy + "-" + mm, label: yy + "-" + mm});
          M--;
        }
        console.log(month);
        return month;
      },
    },
    created() {
      this.getQuery();
    },
    mounted() {
      this.getArrangeList(this.arrangeParams);
      this.monthList = this.getCurrentDate();
      this.getCheckList();
      var MM= new Date().toLocaleDateString().split("/")[0];
      var dd = new Date().toLocaleDateString().split("/")[1];
      if (dd < 10){
        dd = '0' + dd;
      }
      this.arrangeParams.arrange_month = `${MM}-${dd}`;
      this.getCurrentMonthDays(this.arrangeParams.arrange_month);
    }
  };
</script>

<style lang="scss">
  #markInfo {
    width: 100% !important;
    position: relative;
    .el-table__header-wrapper table.el-table__header,table.el-table__body{
      width: auto !important;
    }
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

