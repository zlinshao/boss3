<template>
  <div @click="show=false" @contextmenu="closeMenu">
    <div class="highRanking" style=" position: absolute; top: 122px; right: 20px;">
      <div class="highSearch">
        <el-form :inline="true" size="mini">
          <el-form-item>
            <el-input placeholder="房屋地址" v-model="form.keyword" size="mini" clearable
                      @keyup.enter.native="getCollectTableData">
              <el-button slot="append" icon="el-icon-search" @click="getCollectTableData"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="exportData">导出</el-button>
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
                  <div class="el_col_label">创建时间</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-date-picker
                      v-model="form.time"
                      type="daterange"
                      value-format="yyyy-MM-dd"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">创建人</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-input v-model="operator_name" @focus="chooseStaff" placeholder="请选择创建人"
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
                  <div class="el_col_label">报销类型</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-select clearable v-model="form.type" placeholder="请选择类型" value="">
                      <el-option v-for="item in reimbursementTypeCategory" :label="item.dictionary_name"
                                 :value="item.id"
                                 :key="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">来源</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-select clearable v-model="form.source" placeholder="请选择来源" value="">
                      <el-option v-for="item in reimbursementSourceCategory" :label="item.dictionary_name"
                                 :value="item.id"
                                 :key="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row class="el_row_border">
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">完成状态</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-select clearable v-model="form.status" placeholder="请选择状态" value="">
                      <el-option v-for="item in finishedStatusCategory" :label="item.dictionary_name" :value="item.id"
                                 :key="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <div class="btnOperate">
            <el-button size="mini" type="primary" @click="getCollectTableData">搜索</el-button>
            <el-button size="mini" type="primary" @click="resetting">重置</el-button>
            <el-button size="mini" type="primary" @click="highGrade">取消</el-button>
          </div>
        </el-form>
      </div>
    </div>
    <div class="main">
      <div>
        <el-table
          :data="collectTableData"
          :empty-text='collectStatus'
          v-loading="collectLoading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(255, 255, 255, 0)"
          @row-dblclick="dblClickTable"
          @row-contextmenu='houseMenu'
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
            prop="staffs.real_name"
            label="创建人">
            <template slot-scope="scope">
              <span v-if="scope.row.staffs && scope.row.staffs.real_name">{{scope.row.staffs.real_name}}</span>
              <span v-if="!(scope.row.staffs && scope.row.staffs.real_name)">暂无</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="reimbursement_number"
            label="报销单编号">
            <template slot-scope="scope">
              <span v-if="scope.row.reimbursement_number">{{scope.row.reimbursement_number}}</span>
              <span v-if="!scope.row.reimbursement_number">暂无</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="contracts.house.name"
            label="房屋地址">
            <template slot-scope="scope">
              <span v-if="scope.row.contracts && scope.row.contracts.house && scope.row.contracts.house.name">{{scope.row.contracts.house.name}}</span>
              <span
                v-if="!(scope.row.contracts && scope.row.contracts.house && scope.row.contracts.house.name)">暂无</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="source.dictionary_name"
            label="来源">
            <template slot-scope="scope">
              <span
                v-if="scope.row.source && scope.row.source.dictionary_name">{{scope.row.source.dictionary_name}}</span>
              <span v-if="!(scope.row.source && scope.row.source.dictionary_name)">暂无</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="type.dictionary_name"
            label="报销类型">
            <template slot-scope="scope">
              <span v-if="scope.row.type && scope.row.type.dictionary_name">{{scope.row.type.dictionary_name}}</span>
              <span v-if="!(scope.row.type && scope.row.type.dictionary_name)">暂无</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="amount"
            label="报销金额">
            <template slot-scope="scope">
              <span v-if="scope.row.amount">{{scope.row.amount}}</span>
              <span v-if="!scope.row.amount">暂无</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="account_bank"
            label="开户行">
            <template slot-scope="scope">
              <span v-if="scope.row.account_bank">{{scope.row.account_bank}}</span>
              <span v-if="!scope.row.account_bank">暂无</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="branch_bank"
            label="支行">
            <template slot-scope="scope">
              <span v-if="scope.row.branch_bank">{{scope.row.branch_bank}}</span>
              <span v-if="!scope.row.branch_bank">暂无</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="bank_num"
            label="银行卡号">
            <template slot-scope="scope">
              <span v-if="scope.row.bank_num">{{scope.row.bank_num}}</span>
              <span v-if="!scope.row.bank_num">暂无</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="account_name"
            label="开户人">
            <template slot-scope="scope">
              <span v-if="scope.row.account_name">{{scope.row.account_name}}</span>
              <span v-if="!scope.row.account_name">暂无</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="status.dictionary_name"
            label="报销状态">
            <template slot-scope="scope">
              <el-button class="btnStatus" v-if="scope.row.status.id == 654" type="primary" size="mini">
                {{scope.row.status.dictionary_name}}
              </el-button>
              <el-button class="btnStatus" v-if="scope.row.status.id !== 654 && scope.row.status.id "
                         type="info" size="mini">{{scope.row.status.dictionary_name}}
              </el-button>
              <span v-if="!scope.row.status.dictionary_name">暂无</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="block pages" style="margin: 40px 0;">
        <div class="left">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="form.page"
            :page-size="12"
            layout="total, prev, pager, next, jumper"
            :total="totalNum">
          </el-pagination>
        </div>
      </div>
    </div>
    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperateMore="clickEvent"></RightMenu>
    <!--<AddCollectRepair :addCollectRepairDialog="addCollectRepairDialog" :collectRepairId="collectRepairId"-->
    <!--@close="closeModal"></AddCollectRepair>-->
    <ReimbursementDetail :reimbursementDetailDialog="reimbursementDetailDialog" :id="reimbursementId"
    @close="closeModal"></ReimbursementDetail>
    <organization :organizationDialog="organizeVisible" :type="organizeType" @close="closeModal"
                  @selectMember="selectMember"></organization>
  </div>
</template>

<script>
  import RightMenu from '../../../common/rightMenu.vue';
  import Organization from '../../../common/organization.vue';
  import ReimbursementDetail from './reimbursementDetail';
  // import AddCollectRepair from '../components/addCollectRepair';
  // import AddRentRepair from '../components/addRentRepair';
  export default {
    name: 'repair-manage',
    components: {RightMenu, Organization, ReimbursementDetail},
    data() {
      return {
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],
        form: {
          module: 1,
          page: 1,
          limit: 12,
          keyword: '',
          time: '',
          status: '',
          source: '',
          type: '',
          staff_id: '',
        },
        collectTableData: [],
        rentTableData: [],
        totalNum: 0,
        isHigh: false,
        collectStatus: ' ',
        collectLoading: false,
        rentStatus: ' ',
        rentLoading: false,
        addCollectRepairDialog: false,
        addRentRepairDialog: false,
        collectRepairId: '',
        rentRepairId: '',
        organizeVisible: false,
        organizeType: '',
        operator_name: '',


        reimbursementDetailDialog: false,
        reimbursementTypeCategory: [],  //报销类型
        reimbursementSourceCategory: [],  //报销来源
        finishedStatusCategory: [], //完成状态
        reimbursementId: '',
      }
    },
    mounted() {
      this.getCollectTableData();
      this.getDictionary();
    },
    activated() {
      this.getCollectTableData();
      this.getDictionary();
    },
    methods: {
      getDictionary() {
        this.$http.get(globalConfig.server + 'setting/dictionary/640').then((res) => {
          if (res.data.code === "30010") {
            this.reimbursementTypeCategory = res.data.data;  //报销类型
          }
        });
        this.$http.get(globalConfig.server + 'setting/dictionary/641').then((res) => {
          if (res.data.code === "30010") {
            this.reimbursementSourceCategory = res.data.data;  //报销来源
          }
        });
        this.$http.get(globalConfig.server + 'setting/dictionary/642').then((res) => {
          if (res.data.code === "30010") {
            this.finishedStatusCategory = res.data.data;   //完成状态
          }
        });
      },
      getCollectTableData() {
        this.collectStatus = ' ';
        this.collectLoading = true;
        if (!this.form.time) {
          this.form.time = [];
        }
        this.$http.get(globalConfig.server + 'customer/reimbursement?limit=12', {params: this.form}).then((res) => {
          this.isHigh = false;
          this.collectLoading = false;
          if (res.data.code === '30000') {
            this.collectTableData = res.data.data.data;
            this.totalNum = res.data.data.count;
          } else {
            this.collectTableData = [];
            this.totalNum = 0;
            this.collectStatus = '暂无数据';
          }
        });
      },
      // 员工筛选
      chooseStaff() {
        this.organizeVisible = true;
        this.organizeType = 'staff';
      },
      // 清空员工
      closeStaff() {
        this.form.operator_id = [];
        this.operator_name = '';
      },
      selectMember(val) {
        if (this.organizeType === 'staff') {
          this.form.operator_id = val[0].id;
          this.operator_name = val[0].name;
        }
      },
      closeModal(val) {
        this.addCollectRepairDialog = false;
        this.reimbursementDetailDialog = false;

        this.organizeVisible = false;
        this.getCollectTableData();
      },
      // 高级
      highGrade() {
        this.isHigh = !this.isHigh;
      },
      // 重置
      resetting() {

        this.closeStaff();
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.form.page = val;
        console.log(`当前页: ${val}`);
        this.getCollectTableData();
      },
      dblClickTable(row, event) {
        this.reimbursementId = row.id;
        this.reimbursementDetailDialog = true;
      },
      //右键
      houseMenu(row, event) {
        this.reimbursementId = row.id;
        this.lists = [
          {clickIndex: 'edit_reimbursement', headIcon: 'el-icon-edit', label: '编辑报销单',},
          {clickIndex: 'delete_reimbursement', headIcon: 'el-icon-delete', label: '删除报销单',},
        ];
        this.contextMenuParam(event);
      },
      //右键回调
      clickEvent(val) {
        switch (val.clickIndex) {
          case 'edit_reimbursement':
            console.log("111---编辑报销单");
            this.$http.get(globalConfig.server + 'customer/reimbursement/'+this.reimbursementId).then((res)=>{

            });
            break;
          case 'delete_reimbursement':
            this.deleteRepair();
            break;
        }
      },
      deleteRepair() {
        this.$confirm('此操作将删除维修单，您确定删除吗？', '删除维修单', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.get(globalConfig.server + 'repaire/del/' + this.reimbursementId).then((res) => {
            if (res.data.code === "600200") {
              this.getCollectTableData();
              this.$notify.success({
                title: "成功",
                message: res.data.msg
              });
            } else {
              this.$notify.warning({
                title: "警告",
                message: res.data.msg
              });
            }
          });
        })
      },
      //关闭右键菜单
      closeMenu() {
        this.show = false;
      },
      //右键参数
      contextMenuParam(event) {
        //param: user right param
        let e = event || window.event;	//support firefox contextmenu
        this.show = false;
        this.rightMenuX = e.clientX + document.documentElement.scrollLeft - document.documentElement.clientLeft;
        this.rightMenuY = e.clientY + document.documentElement.scrollTop - document.documentElement.clientTop;
        event.preventDefault();
        event.stopPropagation();
        this.$nextTick(() => {
          this.show = true
        })
      },
      exportData() {
        let exportForm = {
          module: 1,
          keyword: this.form.keyword,
          time: this.form.time,
          status: this.form.status,
          city: this.form.city,
          operator_id: this.form.operator_id,
          module: this.form.module
        };
        this.$http.get(globalConfig.server + 'repaire/download', {params: exportForm}).then((res) => {
          if (res.data.code == '600201') {
            this.$notify.warning({
              title: '警告',
              message: res.data.msg
            });
            return;
          } else {
            this.$http.get(globalConfig.server + 'repaire/export', {
              responseType: 'arraybuffer',
              params: exportForm
            }).then((res) => { // 处理返回的文件流
              if (!res.data) {
                return;
              }
              let url = window.URL.createObjectURL(new Blob([res.data]));
              let link = document.createElement('a');
              link.style.display = 'a';
              link.href = url;
              link.setAttribute('download', 'excel.xls');
              document.body.appendChild(link);
              link.click();
            });
          }
        });

      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #clientContainer {

  }
</style>
