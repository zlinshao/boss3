<template>
  <div id="periodicTable" @click="show=false" @contextmenu="closeMenu">
    <div class="highRanking">
      <div class="highSearch">
        <el-form onsubmit="return false" :inline="true" size="mini">
          <!--<el-form-item>-->
          <!--<el-input placeholder="请输入内容" v-model="form.keyWords" size="mini" clearable>-->
          <!--<el-button slot="append" icon="el-icon-search"></el-button>-->
          <!--&lt;!&ndash;<el-button slot="append" icon="el-icons-fa-bars"></el-button>&ndash;&gt;-->
          <!--</el-input>-->
          <!--</el-form-item>-->
          <el-form-item>
            <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
          </el-form-item>
          <el-form-item>
            <el-form-item>
              <el-button type="primary" @click="exportData">导出</el-button>
            </el-form-item>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="highRanking">
      <div class="filter high_grade" :class="isHigh? 'highHide':''" style=" margin-top: -40px;">
        <el-form :inline="true" :model="form" size="mini" label-width="100px">
          <div class="filterTitle">
            <i class="el-icons-fa-bars"></i>&nbsp;&nbsp;高级搜索
          </div>
          <el-row class="el_row_border">
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">部门</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-input v-model="depart_name" @focus="chooseDepart" placeholder="请选择部门"
                              readonly>
                      <template slot="append">
                        <div style="cursor: pointer;" @click="closeDepart">清空</div>
                      </template>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">员工</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-input v-model="staff_name" @focus="chooseStaff" placeholder="请选择员工"
                              readonly>
                      <template slot="append">
                        <div style="cursor: pointer;" @click="closeStaff">清空</div>
                      </template>
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
                  <div class="el_col_label">日期</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <div class="block">
                      <el-date-picker
                        v-model="form.date"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions"
                        value-format="yyyy-MM-dd">
                      </el-date-picker>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <div class="btnOperate">
            <el-button size="mini" type="primary" @click="getTableData">搜索</el-button>
            <el-button size="mini" type="primary" @click="resetting">重置</el-button>
            <el-button size="mini" type="primary" @click="highGrade">取消</el-button>
          </div>
        </el-form>
      </div>
    </div>

    <el-table
      :data="tableData"
      :empty-text='collectStatus'
      v-loading="collectLoading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(255, 255, 255, 0)"
      @row-contextmenu='openContextMenu'
      @cell-dblclick='openDetail'
      @row-click='clickTable'
      width="100%">
      <el-table-column
        label="员工"
        prop="rent_staff"
      ></el-table-column>
      <el-table-column
        label="租房溢出业绩"
        prop="rent_overflow">
      </el-table-column>
      <el-table-column
        label="收房溢出业绩"
        prop="lord_overflow">
      </el-table-column>
      <el-table-column
        label="收房综合金额"
        prop="lord_push_money">
      </el-table-column>
      <el-table-column
        label="租房综合金额"
        prop="rent_push_money">
      </el-table-column>

      <el-table-column
        label="租房中介费"
        prop="rent_agency_count">
      </el-table-column>
      <el-table-column
        label="收房中介费"
        prop="lord_agency_count">
      </el-table-column>

      <el-table-column
        label="收房净得金额"
        prop="lord_real_money">
      </el-table-column>

      <el-table-column
        label="租房净得金额"
        prop="rent_real_money">
      </el-table-column>
      <!-- <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button
            @click="goDetail(scope)"
            type="text"
            size="small">
            详情
          </el-button>
        </template>
      </el-table-column> -->
    </el-table>

    <div class="block pages">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="form.page"
        :page-size="5"
        layout="total, prev, pager, next, jumper"
        :total="totalNum">
      </el-pagination>
    </div>
    <div class="myDetail">
      <achieveDetail :staff_id="staff_id" :start_time="form.start_time" :end_time="form.end_time"></achieveDetail>
    </div>
    <!--组织架构-->
    <organization :organizationDialog="organizeVisible" :type="organizeType" @close="closeOrganize"
                  @selectMember="selectMember"></organization>
    <right-menu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
                @clickOperateMore="clickEvent"></right-menu>
  </div>
  
</template>

<script>
  import Organization from '../../common/organization.vue'
  import RightMenu from '../../common/rightMenu.vue'    //右键
  import achieveDetail from './components/detail.vue'
  export default {
    name: 'index',
    components: {Organization, RightMenu,achieveDetail},
    data() {
      return {
        show: false,
        isHigh: false,
        totalNum: 0,
        values: ['出租', '提前一个月出租', '提前二个月以上续租'],
        depart_name: '',
        staff_name: '',
        form: {
          page: 1,
          limit: 5,
          depart_ids: [],
          staff_ids: [],
          start_time: '',
          end_time: '',
          date:'',
          export:0
        },
        options: [
          {label: '双方业绩为零'},
          {label: '已充公'},
          {label: '二次出租'},
          {label: '鸡腿包'}
        ],
        organizeType: '',
        organizeVisible: false,
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        tableData: [],
        state: '',
        rightMenuX: 0,
        rightMenuY: 0,
        lists: [],
        pitch: '',
        dialogVisible: false,
        dblRowData: [],
        editAble: false,
        achvOverflow: '',
        collectStatus: ' ',
        collectLoading: false,
        staff_id:''
      }
    },
    mounted() {
      this.getTableData();
    },
    methods: {
      //编辑溢出业绩
      onsubmit(val) {
        this.editAble = false;
        this.$http.put(globalConfig.server + '/salary/achv/' + val.id, {achv_overflow: val.achv_overflow}).then((res) => {
          if (res.data.code === '88830') {
            this.$notify.success({
              title: '成功',
              message: res.data.msg
            });
          } else {
            this.$notify.warning({
              title: '警告',
              message: res.data.msg
            });
          }
        });
      },
      getTableData() {
        if (this.form.date) {
          this.form.start_time = this.form.date[0];
          this.form.end_time = this.form.date[1];
        } else {
          this.form.start_time = '';
          this.form.end_time = '';
        }
        this.collectLoading = true;
        this.collectStatus = ' ';
        this.$http.get(globalConfig.server + 'salary/achv',{params:this.form}).then((res) => {
          this.isHigh = false;
          this.collectLoading = false;
          if (res.data.code === '88800') {
            this.tableData = res.data.data.data;
            this.totalNum = Number(res.data.data.count);
          } else {
            this.collectStatus = '暂无数据';
            this.tableData = [];
            this.totalNum = 0;
          }
        });
      },
      // 右键
      openContextMenu(row) {
        this.pitch = row.id;
        this.lists = [
          {clickIndex: 'confiscation', headIcon: 'el-icon-edit-outline', label: '是否充公'},
          {clickIndex: 'editOverAchv', headIcon: 'el-icon-edit-outline', label: '编辑溢出业绩'},
        ];
        this.contextParams();
      },
      openDetail(row) {
        console.log(row);
        this.dblRowData = row;
        this.dialogVisible = true;
      },
      // 右键回调
      clickEvent(val) {
        switch (val.clickIndex) {
          case 'confiscation':

            break;
          case 'editOverAchv':
            this.editAble = true;
            break;

        }
      },
      //右键参数
      contextParams() {
        let e = event || window.event;let event = window.event;
        this.show = false;
        this.rightMenuX = e.clientX + document.documentElement.scrollLeft - document.documentElement.clientLeft;
        this.rightMenuY = e.clientY + document.documentElement.scrollTop - document.documentElement.clientTop;
        event.preventDefault();
        event.stopPropagation();
        this.$nextTick(() => {
          this.show = true
        })
      },
      //关闭右键菜单
      closeMenu() {
        this.show = false;
      },
      // 重置
      resetting() {
        this.form.dates = '';
        this.form.start_time = '';
        this.form.end_time = '';
        this.closeDepart();
        this.closeStaff();
        this.form.keywords = '';
      },
      // 高级筛选
      highGrade() {
        this.isHigh = !this.isHigh;
      },
      // 部门筛选
      chooseDepart() {
        this.organizeVisible = true;
        this.organizeType = 'depart';
      },
      // 员工筛选
      chooseStaff() {
        this.organizeVisible = true;
        this.organizeType = 'staff';
      },
      closeOrganize() {
        this.organizeVisible = false;
      },
      // 清空部门
      closeDepart() {
        this.form.depart_ids = [];
        this.depart_name = '';
      },
      // 清空员工
      closeStaff() {
        this.form.staff_ids = [];
        this.staff_name = '';
      },
      selectMember(val) {
        if (this.organizeType === 'depart') {
          for (var i = 0; i < val.length; i++) {
            this.depart_name = this.depart_name === "" ? val[i].name : this.depart_name + "," + val[i].name;
            this.form.depart_ids.push(val[i].id);
          }
        } else if (this.organizeType === 'staff') {
          for (var i = 0; i < val.length; i++) {
            this.staff_name = this.staff_name === "" ? val[i].name : this.staff_name + "," + val[i].name;
            this.form.staff_ids.push(val[i].id);
          }
        }
      },
      // 导出
      exportData() {
        let staffId,deparId,all;
        if(this.form.staff_ids.length>0){
           staffId='&staff_ids[]='+this.form.staff_ids.join("&staff_ids[]=");
        }else{
          staffId='';
        }
       if(this.form.depart_ids.length>0){
          deparId='&depart_ids[]='+this.form.depart_ids.join("&depart_ids[]=");
        }else{
          deparId='';
        }
         all=staffId+deparId;
        // console.log(staffId);
        let url=globalConfig.server +'salary/achv?page='+this.form.page+'&limit='+this.form.limit+all+'&start_time='+this.form.start_time+'&end_time='+this.form.end_time+'&export=1';
        window.location.href=url;
      },
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.form.page = val;
        console.log(11111)
        this.getTableData();
      },
      goDetail(scope) {
        this.$router.push({path: '/achieveDetail',query:{user_id:scope.row.sign_user_id}});
      },
       clickTable(row, event) {
        this.staff_id=row.sign_user_id;
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #periodicTable {
    .filter {
      padding-top: 10px;
      .el-select .el-input {
        width: 240px;
      }
      .el-input-group__prepend {
        background-color: #fff !important;
      }
    }
  }
</style>
