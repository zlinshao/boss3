<template>
  <div>
    <div class="main">
      <div class="highRanking">
        <div class="tabsSearch">
          <el-form :inline="true" onsubmit="return false" size="mini">
            <el-form-item>
              <el-input v-model="params.address" placeholder="请输入搜索">
                <el-button @click="search()" slot="append" type="primary" icon="el-icon-search"></el-button>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
            </el-form-item>
            <el-form-item style="float: right">
              <el-button type="success" @click="exportData">导出</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="filter high_grade" :class="isHigh? 'highHide':''">
          <el-form :inline="true" onsubmit="return false" :model="params" size="mini" label-width="100px">
            <div class="filterTitle">
              <i class="el-icons-fa-bars"></i>&nbsp;&nbsp;高级搜索
            </div>
            <el-row class="el_row_border">
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">开单人部门</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-input readonly v-model="params.department" @focus="selectDepart" placeholder="请选择部门">
                        <el-button slot="append" style="cursor: pointer;" @click="emptyDepart">清空</el-button>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">开单人</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-input v-model="params.staff" @focus="selectStaff" readonly placeholder="请选择开单人">
                        <el-button style="cursor: pointer;" slot="append" @click="emptyStaff">清空</el-button>
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
                    <div class="el_col_label">创建时间</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-date-picker
                        v-model="params.date_range"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="yyyy-MM-dd"
                        :picker-options="pickerOptions">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <div class="btnOperate">
              <el-button size="mini" type="primary" @click="getIncompleteRecordData()">搜索</el-button>
              <el-button size="mini" type="primary" @click="resetting">重置</el-button>
              <el-button size="mini" type="primary" @click="highGrade">取消</el-button>
            </div>
          </el-form>
        </div>
      </div>
      <div>
        <div style="padding: 38px 0;">
          <el-table
            :data="tableData"
            :empty-text='incompleteStatus'
            v-loading="incompleteLoading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(255, 255, 255, 0)"
            style="width: 100%">
            <el-table-column
              prop="create_time"
              label="创建时间">
            </el-table-column>
            <el-table-column
              prop="contract_number"
              label="合同编号">
            </el-table-column>
            <el-table-column
              prop="house_name"
              label="房屋地址">
            </el-table-column>
            <el-table-column
              prop="update_time"
              label="资料补齐时间">
            </el-table-column>
            <el-table-column
              prop="content"
              label="备忘内容">
            </el-table-column>
            <el-table-column
              prop="receivers"
              label="接收人">
            </el-table-column>
            <el-table-column
              prop="sender"
              label="发送人">
            </el-table-column>
            <el-table-column
              prop="is_send"
              label="操作类型">
              <template slot-scope="scope">
                <span v-if="scope.row.is_send===0">保存</span>
                <span v-if="scope.row.is_send===1">发送</span>
                <span v-if="scope.row.is_send===null">暂无</span>
              </template>
            </el-table-column>
          </el-table>
          <div class="block pages">
            <div>
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="params.page"
                :page-size="params.limit"
                layout="total, prev, pager, next, jumper"
                :total="totalNum">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Organization :organizationDialog="organizationDialog" :type="type" @close="closeOrganization"
                  @selectMember="selectMember"></Organization>
  </div>
</template>

<script>
  import Organization from '../../../common/organization.vue';
  export default {
    name: "incomplete-record",
    components: {Organization},
    data() {
      return {
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
        totalNum: 0,   //总数
        is_rent: null,
        params: {
          page: 1,
          address: '',      //模糊搜索
          department_id: [],   //开单人部门id
          staff_id: [],    //开单人id
          date_range: [], //创建时间范围 数组
          contract_id: '',
          output: 0, //0读取 1导出excel
          limit: 12,
          department: '',
          staff: '',
        },
        organizationDialog: false,
        activeName: 'first',
        isHigh: false,
        incompleteStatus: ' ',
        incompleteLoading: false,
        tableData: [],
        type: '',
      }
    },
    mounted() {

    },
    activated() {
      if(this.$route.query.active === 'first') {
        this.is_rent = 0;
      }else{
        this.is_rent = 1;
      }
      this.getIncompleteRecordData();
    },
    watch: {

    },
    methods: {
      search() {
//        this.getIncompleteRecordData();
      },
      exportData() {
        this.$http.get(globalConfig.server +  'lease/note/index?limit=12&is_rent='+this.is_rent+'&output=1', {responseType: 'arraybuffer'}).then((res) => { // 处理返回的文件流
          if (!res.data) {
            return;
          }
          console.log(res);
          let url = window.URL.createObjectURL(new Blob([res.data]));
          let link = document.createElement('a');
          link.style.display = 'a';
          link.href = url;
          link.setAttribute('download', 'excel.xlsx');
          document.body.appendChild(link);
          link.click();
        });
      },
      getIncompleteRecordData() {
        this.incompleteStatus = " ";
        this.incompleteLoading = true;
        if(!this.params.date_range){
          this.params.date_range = [];
        }
        this.$http.get(globalConfig.server + 'lease/note/index?is_rent='+this.is_rent, {params:this.params}).then((res) => {
          this.incompleteLoading = false;
          this.isHigh = false;
          if(res.data.code === '60510'){
            this.tableData = res.data.data;
            this.totalNum = res.data.num;
            if(res.data.data.length<1){
              this.incompleteStatus = "暂无数据";
              this.tableData = [];
              this.totalNum = 0;
            }
          }else{
            this.incompleteStatus = "暂无数据";
            this.tableData = [];
            this.totalNum = 0;
          }
        });
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.params.page = val;
        this.getIncompleteRecordData();
      },
      highGrade() {
        this.isHigh = !this.isHigh;
      },
      resetting() {
        this.params = {
          page: 1,
          address: '',      //模糊搜索
          department_id: [],   //开单人部门id
          staff_id: [],    //开单人id
          date_range: [], //创建时间范围 数组
          contract_id: '',
          output: 0, //0读取 1导出excel
          limit: 12,
          department: '',
          staff: '',
        }
      },
      selectDepart() {
        this.type = 'depart';
        this.organizationDialog = true
      },
      emptyDepart() {
        this.params.department_id = [];
        this.params.department = '';
      },
      emptyStaff() {
        this.params.staff_id = [];
        this.params.staff = '';
      },
      selectStaff() {
        this.type = 'staff';
        this.organizationDialog = true
      },
      closeOrganization() {
        this.type = '';
        this.organizationDialog = false
      },
      selectMember(val){
        if(this.type === 'depart'){
          this.params.department = '';
          this.params.department_id = [];
          let names = [];
          val.forEach((item)=>{
            this.params.department_id.push(item.id);
            names.push(item.name);
          });
          this.params.department = names.join(',');
        }else if(this.type === 'staff'){
          this.params.staff = '';
          this.params.staff_id = [];
          let names = [];
          val.forEach((item)=>{
            this.params.staff_id.push(item.id);
            names.push(item.name);
          });
          this.params.staff = names.join(',');
        }
      },
    }
  }
</script>

<style scoped>

</style>
