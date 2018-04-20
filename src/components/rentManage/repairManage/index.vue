<template>
  <div @click="show=false" @contextmenu="closeMenu">
    <div id="clientContainer">
      <div class="highRanking">
        <div class="tabsSearch">
          <el-form :inline="true" size="mini">
            <el-form-item>
              <el-input placeholder="请输入标题" v-model="form.keywords" size="mini" clearable @keyup.enter.native="">
                <el-button slot="append" icon="el-icon-search" @click=""></el-button>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="filter high_grade" :class="isHigh? 'highHide':''">
          <el-form :inline="true" :model="form" size="mini" label-width="100px">
            <div class="filterTitle">
              <i class="el-icons-fa-bars"></i>&nbsp;&nbsp;高级搜索
            </div>
            <el-row class="el_row_border">
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">选择类别</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>

                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <div class="btnOperate">
              <el-button size="mini" type="primary" @click="">搜索</el-button>
              <el-button size="mini" type="primary" @click="resetting">重置</el-button>
              <el-button size="mini" type="primary" @click="highGrade">取消</el-button>
            </div>
          </el-form>
        </div>
      </div>
      <div class="main">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="收房维修记录" name="first">
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
                prop="contract_type"
                label="合同类型">
                <template slot-scope="scope">
                  <span v-if="scope.row.contract_type">{{scope.row.contract_type}}</span>
                  <span v-if="!scope.row.contract_type">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="customer_name"
                label="客户姓名">
                <template slot-scope="scope">
                  <span v-if="scope.row.customer_name">{{scope.row.customer_name}}</span>
                  <span v-if="!scope.row.customer_name">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="sex"
                label="性别">
                <template slot-scope="scope">
                  <span v-if="scope.row.sex">{{scope.row.sex}}</span>
                  <span v-if="!scope.row.sex">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="customer_mobile"
                label="客户电话">
                <template slot-scope="scope">
                  <span v-if="scope.row.customer_mobile">{{scope.row.customer_mobile}}</span>
                  <span v-if="!scope.row.customer_mobile">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="content"
                label="维修内容">
                <template slot-scope="scope">
                  <span v-if="scope.row.content">{{scope.row.content}}</span>
                  <span v-if="!scope.row.content">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="repair_time"
                label="维修时间">
                <template slot-scope="scope">
                  <span v-if="scope.row.repair_time">{{scope.row.repair_time}}</span>
                  <span v-if="!scope.row.repair_time">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="repair_master"
                label="维修师傅">
                <template slot-scope="scope">
                  <span v-if="scope.row.repair_master">{{scope.row.repair_master}}</span>
                  <span v-if="!scope.row.repair_master">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="repair_result"
                label="维修结果">
                <template slot-scope="scope">
                  <span v-if="scope.row.repair_result">{{scope.row.repair_result}}</span>
                  <span v-if="!scope.row.repair_result">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="repair_money"
                label="维修金额">
                <template slot-scope="scope">
                  <span v-if="scope.row.repair_money">{{scope.row.repair_money}}</span>
                  <span v-if="!scope.row.repair_money">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="status"
                label="维修状态">
                <template slot-scope="scope">
                  <span v-if="scope.row.status">{{scope.row.status}}</span>
                  <span v-if="!scope.row.status">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="person_liable"
                label="认责人">
                <template slot-scope="scope">
                  <span v-if="scope.row.liable">{{scope.row.liable}}</span>
                  <span v-if="!scope.row.liable">暂无</span>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="租房维修记录" name="second">
            <el-table
              :data="rentTableData"
              :empty-text='rentStatus'
              v-loading="rentLoading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(255, 255, 255, 0)"
              @row-dblclick="dblClickTable"
              @row-contextmenu='houseMenu'
              style="width: 100%">
              <el-table-column
                prop="contract_type"
                label="合同类型">
                <template slot-scope="scope">
                  <span v-if="scope.row.contract_type">{{scope.row.contract_type}}</span>
                  <span v-if="!scope.row.contract_type">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="customer_name"
                label="客户姓名">
                <template slot-scope="scope">
                  <span v-if="scope.row.customer_name">{{scope.row.customer_name}}</span>
                  <span v-if="!scope.row.customer_name">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="sex"
                label="性别">
                <template slot-scope="scope">
                  <span v-if="scope.row.sex">{{scope.row.sex}}</span>
                  <span v-if="!scope.row.sex">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="customer_mobile"
                label="客户电话">
                <template slot-scope="scope">
                  <span v-if="scope.row.customer_mobile">{{scope.row.customer_mobile}}</span>
                  <span v-if="!scope.row.customer_mobile">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="content"
                label="维修内容">
                <template slot-scope="scope">
                  <span v-if="scope.row.content">{{scope.row.content}}</span>
                  <span v-if="!scope.row.content">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="repair_time"
                label="维修时间">
                <template slot-scope="scope">
                  <span v-if="scope.row.repair_time">{{scope.row.repair_time}}</span>
                  <span v-if="!scope.row.repair_time">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="repair_master"
                label="维修师傅">
                <template slot-scope="scope">
                  <span v-if="scope.row.repair_master">{{scope.row.repair_master}}</span>
                  <span v-if="!scope.row.repair_master">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="repair_result"
                label="维修结果">
                <template slot-scope="scope">
                  <span v-if="scope.row.repair_result">{{scope.row.repair_result}}</span>
                  <span v-if="!scope.row.repair_result">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="repair_money"
                label="维修金额">
                <template slot-scope="scope">
                  <span v-if="scope.row.repair_money">{{scope.row.repair_money}}</span>
                  <span v-if="!scope.row.repair_money">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="status"
                label="维修状态">
                <template slot-scope="scope">
                  <span v-if="scope.row.status">{{scope.row.status}}</span>
                  <span v-if="!scope.row.status">暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="person_liable"
                label="认责人">
                <template slot-scope="scope">
                  <span v-if="scope.row.liable">{{scope.row.liable}}</span>
                  <span v-if="!scope.row.liable">暂无</span>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
        <div class="block pages">
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
    </div>
    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperateMore="clickEvent"></RightMenu>
    <AddCollectRepair :addCollectRepairDialog="addCollectRepairDialog" :collectRepairId="collectRepairId" @close="closeModal"></AddCollectRepair>
    <AddRentRepair :addRentRepairDialog="addRentRepairDialog" :rentRepairId="rentRepairId" @close="closeModal"></AddRentRepair>
    <RepairDetail :repairDetailDialog="repairDetailDialog" :repairId="repairId" :activeName="activeName" @close="closeModal"></RepairDetail>
  </div>
</template>

<script>
  import RightMenu from '../../common/rightMenu.vue';
  import AddCollectRepair from '../components/addCollectRepair';
  import AddRentRepair from '../components/addRentRepair';
  import RepairDetail from './repairDetail';

  export default {
    name: 'repair-manage',
    components: {RightMenu, AddCollectRepair, AddRentRepair, RepairDetail},
    data() {
      return {
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],
        form: {
          page: 1,
          limit: 12,
        },
        collectTableData: [],
        rentTableData: [],
        totalNum: 0,
        currentPage: 1,
        isHigh: false,
        collectStatus: ' ',
        collectLoading: false,
        rentStatus: ' ',
        rentLoading: false,
        activeName: 'first',
        addCollectRepairDialog: false,
        addRentRepairDialog: false,
        collectRepairId: '',
        rentRepairId: '',
        repairDetailDialog: false,
        repairId: '',
      }
    },
    mounted() {
      this.getCollectTableData();
    },
    methods: {
      getCollectTableData() {
        this.collectStatus = ' ';
        this.collectLoading = true;
        this.$http.get(globalConfig.server + 'repaire/list?limit=12&module=1&page=' + this.form.page).then((res) => {
          this.isHigh = false;
          this.collectLoading = false;
          if (res.data.code === '600200') {
            this.collectTableData = res.data.data.data;
            this.totalNum = res.data.data.count;
          } else {
            this.collectTableData = [];
            this.totalNum = 0;
            this.collectStatus = '暂无数据';
          }
        });
      },
      getRentTableData() {
        this.rentStatus = ' ';
        this.rentLoading = true;
        this.$http.get(globalConfig.server + 'repaire/list?limit=12&module=2&page=' + this.form.page).then((res) => {
          this.isHigh = false;
          this.rentLoading = false;
          if (res.data.code === '600200') {
            this.rentTableData = res.data.data.data;
            this.totalNum = res.data.data.count;
          } else {
            this.rentTableData = [];
            this.totalNum = 0;
            this.rentStatus = '暂无数据';
          }
        });
      },

      closeModal() {
        this.addCollectRepairDialog = false;
        this.addRentRepairDialog = false;
        this.repairDetailDialog = false;
        this.collectRepairId = '';
        this.rentRepairId = '';
      },
      // tabs标签页
      handleClick(tab, event) {
        if (this.activeName == "first") {
          this.getCollectTableData();
        } else if (this.activeName == "second") {
          this.getRentTableData();
        }
      },
      // 高级
      highGrade() {
        this.isHigh = !this.isHigh;
      },
      // 重置
      resetting() {
        this.isHigh = false;
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.form.page = val;
        console.log(`当前页: ${val}`);
      },
      dblClickTable(row, event) {
        this.repairId = row.id;
        this.repairDetailDialog = true;
      },
      //右键
      houseMenu(row, event) {
        this.lists = [
          // {clickIndex: 'add_follow', headIcon: 'el-icon-plus', label: '添加跟进',},
          // {clickIndex: 'edit_repair', headIcon: 'el-icon-edit', label: '编辑', id: row.id},
          // {clickIndex: 'delete_repair', headIcon: 'el-icon-delete', label: '删除',},
        ];
        this.contextMenuParam(event);
      },
      //右键回调
      clickEvent(val) {
        switch (val.clickIndex) {
          case 'add_follow':

            break;
          case 'edit_repair':
            if (this.activeName === 'first') {
              this.collectRepairId = val.id;
              this.addCollectRepairDialog = true;
            } else if (this.activeName === 'second') {
              this.collectRepairId = val.id;
              this.addRentInfoDialog = true;
            }
            break;
          case 'delete_repair':

            break;
        }
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
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #clientContainer {

  }
</style>
