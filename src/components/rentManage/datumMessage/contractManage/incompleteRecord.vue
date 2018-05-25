<template>
  <div>
    <div class="main">
      <div class="highRanking" style=" position: absolute; top: 122px; right: 20px;z-index: 99;">
        <div class="highSearch">
          <el-form :inline="true" onsubmit="return false" size="mini">
            <el-form-item>
              <el-input v-model="params.q" placeholder="请选择房屋地址" readOnly @focus="openAddressDialog">
                <!--<el-button @click="search()" slot="append" type="primary" icon="el-icon-search"></el-button>-->
                <template slot="append">
                  <div style="cursor: pointer;" @click="emptySearch">清空</div>
                </template>
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
      </div>
      <div class="highRanking">
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
                      <el-input v-model="params.staff" @focus="selectStaff('staff')" readonly placeholder="请选择开单人">
                        <el-button style="cursor: pointer;" slot="append" @click="emptyStaff('staff')">清空</el-button>
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
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">发送人</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-input v-model="params.sender" @focus="selectStaff('sender')" readonly placeholder="请选择发送人">
                        <el-button style="cursor: pointer;" slot="append" @click="emptyStaff('sender')">清空</el-button>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <div class="btnOperate">
              <el-button size="mini" type="primary" @click="search">搜索</el-button>
              <el-button size="mini" type="primary" @click="resetting">重置</el-button>
              <el-button size="mini" type="primary" @click="highGrade">取消</el-button>
            </div>
          </el-form>
        </div>
      </div>
      <div>
        <div>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="收房合同补齐记录" name="first">
              <div class="myTable">
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
                    <template slot-scope="scope">
                      <span v-if="scope.row.create_time">{{scope.row.create_time}}</span>
                      <span v-if="!scope.row.create_time">暂无</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="contract_number"
                    label="合同编号">
                    <template slot-scope="scope">
                      <span v-if="scope.row.contract_number">{{scope.row.contract_number}}</span>
                      <span v-if="!scope.row.contract_number">暂无</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="house_name"
                    label="房屋地址">
                    <template slot-scope="scope">
                      <span v-if="scope.row.house_name">{{scope.row.house_name}}</span>
                      <span v-if="!scope.row.house_name">暂无</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="update_time"
                    label="资料补齐时间">
                    <template slot-scope="scope">
                      <span v-if="scope.row.update_time">{{scope.row.update_time}}</span>
                      <span v-if="!scope.row.update_time">暂无</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="content"
                    label="备忘内容">
                    <template slot-scope="scope">
                      <span v-if="scope.row.content">{{scope.row.content}}</span>
                      <span v-if="!scope.row.content">暂无</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="receivers"
                    label="接收人">
                    <template slot-scope="scope">
                      <span v-if="scope.row.receivers">{{scope.row.receivers}}</span>
                      <span v-if="!scope.row.receivers">暂无</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="sender"
                    label="发送人">
                    <template slot-scope="scope">
                      <span v-if="scope.row.sender">{{scope.row.sender}}</span>
                      <span v-if="!scope.row.sender">暂无</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="staff"
                    label="开单人">
                    <template slot-scope="scope">
                      <span v-if="scope.row.staff">{{scope.row.staff}}</span>
                      <span v-if="!scope.row.staff">暂无</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="department"
                    label="开单人部门">
                    <template slot-scope="scope">
                      <span v-if="scope.row.department">{{scope.row.department}}</span>
                      <span v-if="!scope.row.department">暂无</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="leader"
                    label="负责人">
                    <template slot-scope="scope">
                      <span v-if="scope.row.leader">{{scope.row.leader}}</span>
                      <span v-if="!scope.row.leader">暂无</span>
                    </template>
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
              </div>
            </el-tab-pane>
            <el-tab-pane label="租房合同补齐记录" name="second">
              <div class="myTable">
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
                    <template slot-scope="scope">
                      <span v-if="scope.row.create_time">{{scope.row.create_time}}</span>
                      <span v-if="!scope.row.create_time">暂无</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="contract_number"
                    label="合同编号">
                    <template slot-scope="scope">
                      <span v-if="scope.row.contract_number">{{scope.row.contract_number}}</span>
                      <span v-if="!scope.row.contract_number">暂无</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="house_name"
                    label="房屋地址">
                    <template slot-scope="scope">
                      <span v-if="scope.row.house_name">{{scope.row.house_name}}</span>
                      <span v-if="!scope.row.house_name">暂无</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="update_time"
                    label="资料补齐时间">
                    <template slot-scope="scope">
                      <span v-if="scope.row.update_time">{{scope.row.update_time}}</span>
                      <span v-if="!scope.row.update_time">暂无</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="content"
                    label="备忘内容">
                    <template slot-scope="scope">
                      <span v-if="scope.row.content">{{scope.row.content}}</span>
                      <span v-if="!scope.row.content">暂无</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="receivers"
                    label="接收人">
                    <template slot-scope="scope">
                      <span v-if="scope.row.receivers">{{scope.row.receivers}}</span>
                      <span v-if="!scope.row.receivers">暂无</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="sender"
                    label="发送人">
                    <template slot-scope="scope">
                      <span v-if="scope.row.sender">{{scope.row.sender}}</span>
                      <span v-if="!scope.row.sender">暂无</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="staff"
                    label="开单人">
                    <template slot-scope="scope">
                      <span v-if="scope.row.staff">{{scope.row.staff}}</span>
                      <span v-if="!scope.row.staff">暂无</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="department"
                    label="开单人部门">
                    <template slot-scope="scope">
                      <span v-if="scope.row.department">{{scope.row.department}}</span>
                      <span v-if="!scope.row.department">暂无</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="leader"
                    label="负责人">
                    <template slot-scope="scope">
                      <span v-if="scope.row.leader">{{scope.row.leader}}</span>
                      <span v-if="!scope.row.leader">暂无</span>
                    </template>
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
              </div>
            </el-tab-pane>
          </el-tabs>
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
    <div id="exportModal">
      <el-dialog :close-on-click-modal="false" :show-close="false" :visible.sync="exportDialog" title="导出数据" width="30%" top="35vh">
          <div style="text-align: center;font-size: 15px!important;">正在导出，请稍后...</div>
      </el-dialog>
    </div>
    <Organization :organizationDialog="organizationDialog" :type="type" @close="closeOrganization"
                  @selectMember="selectMember"></Organization>
    <AddressSearch :addressDialog="addressDialog" @close="closeAddressDialog" :isRent="is_rent"></AddressSearch>
  </div>
</template>

<script>
  import Organization from '../../../common/organization.vue';
  import AddressSearch from '../../../common/addressSearch';

  export default {
    name: "incomplete-record",
    components: {Organization, AddressSearch},
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
        is_rent: 0,
        params: {
          page: 1,
          q: '',      //模糊搜索
          department_id: [],   //开单人部门id
          staff_id: [],    //开单人id
          date_range: [], //创建时间范围 数组
          contract_id: '',
          output: 0, //0读取 1导出excel
          limit: 12,
          department: '',
          staff: '',
          sender_id: '',  //发送人id
          sender: '', //发送人名字
        },
        staffType: '',
        organizationDialog: false,
        activeName: 'first',
        isHigh: false,
        incompleteStatus: ' ',
        incompleteLoading: false,
        tableData: [],
        type: '',
        addressDialog: false,
        exportDialog: false,
      }
    },
    mounted() {
      this.getDefaultData();
      this.search();
    },
    activated() {
      this.getDefaultData();
      this.search();
    },
    watch: {
      'params.q': {
        deep: true,
        handler(val, oldVal) {
          if (!val) {
            this.params.contract_id = '';
          }
          this.search();
        }
      },
    },
    methods: {
      // tabs标签页
      handleClick(tab, event) {
        if (this.activeName == "first") {
          this.is_rent = 0;
          this.getIncompleteRecordData();
        } else if (this.activeName == "second") {
          this.is_rent = 1;
          this.getIncompleteRecordData();
        }
        this.$store.dispatch("incompleteRecordActive", this.activeName);
      },
      emptySearch() {
        this.params.contract_id = '';
        this.params.q = '';
      },
      openAddressDialog() {
        this.addressDialog = true;
      },
      closeAddressDialog(val) {
        this.addressDialog = false;
        if (val) {
          this.params.q = val.address;
          this.params.contract_id = val.contract_id;
        }
      },
      getDefaultData() {
        if (!this.$route.query.active) {
          this.$router.push({
            path: "/incompleteRecord",
            query: {
              active: this.$store.state.datum.incomplete_record_active,
            }
          });
        }
        let query = this.$route.query;
        if (query.active) {
          this.$store.dispatch("incompleteRecordActive", query.active);
        }
        if (query.active === 'first') {
          this.is_rent = 0;
          this.activeName = 'first';
        } else {
          this.is_rent = 1;
          this.activeName = 'second';
        }
      },
      exportData() {
        this.exportDialog = true;
        this.params.output = 1;
        this.$http.get(globalConfig.server + 'lease/note/index?is_rent=' + this.is_rent,
          {
            params: this.params,
            responseType: 'arraybuffer',
          }).then((res) => { // 处理返回的文件流
          if (!res.data) {
            return;
          }
          this.exportDialog = false;
          let url = window.URL.createObjectURL(new Blob([res.data]));
          let link = document.createElement('a');
          link.style.display = 'a';
          link.href = url;
          link.setAttribute('download', 'excel.xls');
          document.body.appendChild(link);
          link.click();
        });
      },
      getIncompleteRecordData() {
        this.incompleteStatus = " ";
        this.incompleteLoading = true;
        if (!this.params.date_range) {
          this.params.date_range = [];
        }
        this.$http.get(globalConfig.server + 'lease/note/index?is_rent=' + this.is_rent, {params: this.params}).then((res) => {
          this.incompleteLoading = false;
          this.isHigh = false;
          if (res.data.code === '60510') {
            this.tableData = res.data.data;
            this.totalNum = res.data.num;
            if (res.data.data.length < 1) {
              this.incompleteStatus = "暂无数据";
              this.tableData = [];
              this.totalNum = 0;
            }
          } else {
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
      search() {
        this.params.page = 1;
        this.getIncompleteRecordData();
      },
      highGrade() {
        this.isHigh = !this.isHigh;
      },
      resetting() {
        this.params = {
          page: 1,
          q: '',      //模糊搜索
          department_id: [],   //开单人部门id
          staff_id: [],    //开单人id
          date_range: [], //创建时间范围 数组
          contract_id: '',
          output: 0, //0读取 1导出excel
          limit: 12,
          department: '',
          staff: '',
          sender: '',
          sender_id: '',
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
      emptyStaff(val) {
        if (this.staffType == 'staff') {
          this.params.staff_id = [];
          this.params.staff = '';
        } else if (this.staffType == 'sender') {
          this.params.sender_id = [];
          this.params.sender = '';
        }
      },
      selectStaff(val) {
        this.staffType = val;
        this.type = 'staff';
        this.organizationDialog = true
      },
      closeOrganization() {
        this.type = '';
        this.organizationDialog = false
      },
      selectMember(val) {
        if (this.type === 'depart') {
          this.params.department = '';
          this.params.department_id = [];
          let names = [];
          val.forEach((item) => {
            this.params.department_id.push(item.id);
            names.push(item.name);
          });
          this.params.department = names.join(',');
        } else if (this.type === 'staff') {
          if (this.staffType == 'staff') {
            this.params.staff = '';
            this.params.staff_id = [];
            let names = [];
            val.forEach((item) => {
              this.params.staff_id.push(item.id);
              names.push(item.name);
            });
            this.params.staff = names.join(',');
          } else if (this.staffType == 'sender') {
            this.params.sender = '';
            this.params.sender_id = [];
            let senders = [];
            val.forEach((item) => {
              this.params.sender_id.push(item.id);
              senders.push(item.name);
            });
            this.params.sender = senders.join(',');
          }

        }
      },
    }
  }
</script>

<style scoped>

</style>
