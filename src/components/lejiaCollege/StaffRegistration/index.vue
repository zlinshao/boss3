<template>
  <div>
    <div id="onlineExam">
    <div class="highRanking">
      <div class="highSearch" >
        <el-form :inline="true" onsubmit="return false" size="mini" >
          <el-form-item>
            <el-input placeholder="标题/内容关键字" v-model="form.search" @keyup.enter.native="myData(1)" size="mini"
                      clearable>
              <el-button slot="append" icon="el-icon-search" @click="myData(1)"></el-button>
              <!--<el-button slot="append" icon="el-icons-fa-bars"></el-button>-->
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="filter high_grade" :class="isHigh? 'highHide':''">
        <el-form :inline="true" onsubmit="return false" :model="form" size="mini" label-width="100px">
          <div class="filterTitle">
            <i class="el-icons-fa-bars"></i>&nbsp;&nbsp;高级搜索
          </div>
          <el-row class="el_row_border">
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">选择类型</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-select v-model="form.type" clearable placeholder="请选择类型">
                      <el-option v-for="(key,index) in forms" :label="key.name" :value="key.id"
                                 :key="index"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-row >
                <el-col :span="8">
                  <div class="el_col_label">时间</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-date-picker
                    size="mini"
                    v-model="value4"
                    type="datetimerange"
                    :picker-options="pickerOptions2"
                    value-format="yyyy-MM-dd"
                    format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    align="right">
                  </el-date-picker>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row class="el_row_border">
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">选择试卷</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-select v-model="form.type" clearable placeholder="请选择试卷">
                      <el-option v-for="(key,index) in forms" :label="key.name" :value="key.id"
                                 :key="index"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">部门搜索</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                <el-form-item >
                   <el-input readonly="" v-model="this.departname" @click.native="openOrganizationModal()" placeholder="点击选择"></el-input>
                </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <div class="btnOperate">
            <el-button size="mini" type="primary" @click="myData(1)">搜索</el-button>
            <el-button size="mini" type="primary" @click="resetting">重置</el-button>
            <el-button size="mini" type="primary" @click="highGrade">取消</el-button>
          </div>
        </el-form>
      </div>
    </div>
      <div class="main">
        <div class="myHouse">
          <div class="blueTable">
            <el-table
              :data="tableData"
              @row-dblclick="dblClickTable"
              style="width: 100%">
              <el-table-column
                prop="real_name"
                label="姓名">
              </el-table-column>
              <el-table-column
                prop="exam_name"
                label="试卷名称">
              </el-table-column>
              <el-table-column
                prop="enroll_time"
                label="报名时间">
              </el-table-column>
            </el-table>
          </div>
            <div style="text-align: center">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="myData"
                :current-page="form.page"
                :page-size="2"
                layout="total, prev, pager, next, jumper"
                :total="tableNumber">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
<Organization :organizationDialog="organizationDialog" :length="len" :type="depart"  @close="closeOrganization"  @selectMember="coloseaa"></Organization>
  </div>
</template>

<script>
import Organization from "../../common/organization.vue";
export default {
  name: "index",
  components: { Organization },
  data() {
    return {
      tableData: [],
      tableNumber: 0,
      form: {
        page: 1,
        limit: 2,
        type: "",
        search: "",
        department_id: ""
      },
      departname: "",
      forms: [
        { id: "1", name: "表彰" },
        { id: "2", name: "批评" },
        { id: "3", name: "通知" }
        // { id: "4", name: "研发" }
      ],
      isHigh: false, //高级搜索
      rentStatus: " ",
      rentLoading: false,
      organizationDialog: false,

      pickerOptions2: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      value4: "",
      len: 0,
      depart: ""
    };
  },
  mounted() {
    this.myData(1);
  },
  watch: {},
  methods: {
    myData(val) {
      this.form.page = val;
      this.$http
        .get(globalConfig.server + "exam/enroll", { params: this.form })
        .then(res => {
          this.tableData = res.data.data.data;
          this.tableNumber = res.data.data.count;
        });
    },
    openOrganizationModal() {
      this.organizationDialog = true;
      this.len = 1;
      this.depart = "depart";
    },
    closeOrganization() {
      this.organizationDialog = false;
      this.len = 0;
      this.depart = "";
    },
    coloseaa(val) {
      this.departname = val[0].name;
      this.form.department_id = val[0].id;
      this.len = 0;
      this.depart = "";
    },
    // 高级
    highGrade() {
      this.isHigh = !this.isHigh;
    },
    // 重置
    resetting() {
      this.isHigh = false;
      (this.form = {
        page: 1,
        limit: 12,
        type: "",
        search: ""
      }),
        this.init(1);
    },

    dblClickTable() {},

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
