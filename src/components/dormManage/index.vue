<template>
  <div @click="show=false" @contextmenu="closeMenu">
    <div class="highRanking">
      <div class="highSearch">
        <el-form :inline="true" size="mini" onsubmit="return false">
          <el-form-item>
            <el-input placeholder="请输入房屋地址" v-model="params.where" size="mini" clearable @keyup.enter.native="search">
              <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="addDormDialog = true">
              <i class="el-icon-plus"></i>
              新增
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="filter high_grade" :class="isHigh? 'highHide':''">
        <el-form :inline="true" :model="params" size="mini" label-width="100px">
          <div class="filterTitle">
            <i class="el-icons-fa-bars"></i>&nbsp;&nbsp;高级搜索
          </div>
          <el-row class="el_row_border">
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">负责人</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-input readonly="" @focus="openOrganizationModal('staff')" v-model="leaderName"
                              placeholder="点击选择负责人">
                      <el-button slot="append" type="primary" @click="emptyDepart('staff')">清空</el-button>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">日期</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <div class="block">
                      <el-date-picker
                        v-model="params.start_time"
                        type="date"
                        placeholder="选择开始日期"
                        align="right"
                        value-format="yyyy-MM-dd"
                        format="yyyy-MM-dd"
                        :picker-options="pickerOptions">
                      </el-date-picker>
                      <span style="padding: 0 6px;">至</span>
                      <el-date-picker
                        v-model="params.end_time"
                        type="date"
                        value-format="yyyy-MM-dd"
                        format="yyyy-MM-dd"
                        placeholder="选择结束日期"
                        align="right"
                        :picker-options="pickerOptions">
                      </el-date-picker>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row class="el_row_border">
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">部门</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-input readonly="" @focus="openOrganizationModal('depart')" v-model="departName"
                              placeholder="点击选择部门">
                      <el-button slot="append" type="primary" @click="emptyDepart('depart')">清空</el-button>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">住宿人员姓名</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-input placeholder="请输入姓名" v-model="params.guest_name" size="mini" clearable>
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
                  <div class="el_col_label">人均价格</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <div class="flex-items">
                      <el-input placeholder="请输入最低价格" v-model="params.priceMin" size="mini" clearable>
                      </el-input>
                      <span style="padding: 0 12px;">至</span>
                      <el-input placeholder="请输入最高价格" v-model="params.priceMax" size="mini" clearable>
                      </el-input>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">剩余床位数</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-input placeholder="请输入剩余床位数" v-model="params.bed_num" size="mini" clearable>
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
    <div class="main">
      <div class="blueTable">
        <el-table
          :data="tableData"
          :empty-text='tableStatus'
          v-loading="tableLoading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(255, 255, 255, 0)"
          @row-dblclick="dblClick"
          @row-contextmenu='openContextMenu'
          style="width: 100%">
          <el-table-column
            label="房屋地址">
            <template slot-scope="scope">
              <span v-if="scope.row.house_name">{{scope.row.house_name}}</span>
              <span v-else>/</span>
            </template>
          </el-table-column>
          <el-table-column
            label="小区地址">
            <template slot-scope="scope">
              <span v-if="scope.row.village_name">{{scope.row.village_name}}</span>
              <span v-else>/</span>
            </template>
          </el-table-column>
          <el-table-column
            label="房型">
            <template slot-scope="scope">
              <span v-if="scope.row.house_feature">{{scope.row.house_feature}}</span>
              <span v-else>/</span>
            </template>
          </el-table-column>
          <el-table-column
            label="面积">
            <template slot-scope="scope">
              <span v-if="scope.row.area">{{scope.row.area}}m²</span>
              <span v-else>/</span>
            </template>
          </el-table-column>
          <el-table-column
            label="装修">
            <template slot-scope="scope">
              <span v-if="scope.row.decoration">{{scope.row.decoration}}</span>
              <span v-else>/</span>
            </template>
          </el-table-column>
          <el-table-column
            label="房屋类型">
            <template slot-scope="scope">
              <span v-if="scope.row.house_identity">{{scope.row.house_identity}}</span>
              <span v-else>/</span>
            </template>
          </el-table-column>
          <el-table-column
            label="收房价格">
            <template slot-scope="scope">
              <span v-if="scope.row.suggest_price">{{scope.row.suggest_price}}</span>
              <span v-else>/</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="average_price"
            label="人均价格">
          </el-table-column>
          <el-table-column
            prop="start_at"
            label="开始时间">
          </el-table-column>
          <el-table-column
            prop="live_num"
            label="当前入住人数">
            <template slot-scope="scope">
              <span v-if="scope.row.live_num">{{scope.row.live_num}}</span>
              <span v-else>0</span>
            </template>
          </el-table-column>
          <el-table-column
            label="剩余床位">
            <template slot-scope="scope">
              <span v-if="scope.row.last_bed">{{scope.row.last_bed}}</span>
              <span v-else>0</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="end_at"
            label="结束时间">
          </el-table-column>
          <el-table-column
            label="照片">
            <template slot-scope="scope">
              <a href="javascript:;" @click.stop="searchPic(scope.row.house_id)">
                <i style="font-size: 16px" class="el-icon-picture"></i>
              </a>
            </template>
          </el-table-column>
          <el-table-column
            label="片区经理">
            <template slot-scope="scope">
              <span v-if="scope.row.leader">{{scope.row.leader.leader_name}}</span>
              <span v-else>/</span>
            </template>
          </el-table-column>
          <el-table-column
            label="部门">
            <template slot-scope="scope">
              <span v-if="scope.row.leader">{{scope.row.leader.leader_depart_name}}</span>
              <span v-else>/</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="block pages">
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

    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperate="clickEvent"></RightMenu>
    <AddDorm :addDormDialog="addDormDialog" @close="closeModal"></AddDorm>
    <AddEnter :addEnterDialog="addEnterDialog" :currentRow="currentRow" @close="closeModal"></AddEnter>
    <AddLeave :addLeaveDialog="addLeaveDialog" :currentRow="currentRow" @close="closeModal"></AddLeave>
    <CancelDorm :cancelDormDialog="cancelDormDialog" :currentRow="currentRow" @close="closeModal"></CancelDorm>
    <UpdateDorm :updateDormDialog="updateDormDialog" :currentRow="currentRow" @close="closeModal"></UpdateDorm>
    <DormDetail :dormDetailDialog="dormDetailDialog" :house_id="house_id" @close="closeModal"></DormDetail>

    <HouseDetail :houseDetailDialog="houseDetailDialog" :isOnlyPic="isOnlyPic"
                 :houseId="house_id" @close="closeModal"></HouseDetail>

    <Organization :organizationDialog="organizationDialog" :length="length" :type="type"
                  @selectMember="selectMember" @close="closeModal"></Organization>
  </div>
</template>

<script>
  import RightMenu from '../common/rightMenu.vue';    //右键
  import AddDorm from './components/addDorm'
  import AddEnter from './components/addEnter'
  import AddLeave from './components/addLeave'
  import CancelDorm from './components/cancelDorm'
  import UpdateDorm from './components/updateDorm'
  import DormDetail from './components/dormDetail'
  import HouseDetail from '../rentManage/housesManage/components/houseDetail'
  import Organization from '../common/organization.vue'

  export default {
    name: 'staff-records',
    components: {RightMenu, AddDorm, AddEnter, AddLeave, CancelDorm, UpdateDorm, DormDetail, HouseDetail, Organization},
    data() {
      return {
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],
        /***********/
        params: {
          page: 1,
          limit: 10,
          house_type: 2,
          where: '',
          leader_id: '',//负责人姓名
          depart_id: '',//部门名称
          guest_name: '',//住宿人员姓名
          priceMin: '',//最低人均价格
          priceMax: '',//最高人均价格
          bed_num: '',//剩余床位数
          start_time: '',//开始时间
          end_time: '',//结束时间
        },
        pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        isHigh: false,
        totalNum: 0,
        tableData: [],
        tableStatus: ' ',
        tableLoading: false,

        addDormDialog: false,
        addEnterDialog: false,
        addLeaveDialog: false,
        cancelDormDialog: false,
        updateDormDialog: false,
        dormDetailDialog: false,
        houseDetailDialog: false,
        organizationDialog: false,
        isOnlyPic: false,
        currentId: '',
        currentRow: {},
        house_id: '',
        leaderName: '',
        departName: '',
        length: '',
        type: '',
      }
    },
    mounted() {
      this.getData();
    },
    watch: {},
    methods: {
      // 组织架构
      openOrganizationModal(val) {
        this.organizationDialog = true;
        this.length = 1;
        this.type = val;
      },
      selectMember(val) {
        if (this.type === 'staff') {
          this.params.leader_id = val[0].id;
          this.leaderName = val[0].name;
        } else {
          this.params.depart_id = val[0].id;
          this.departName = val[0].name;
        }
      },
      emptyDepart(val) {
        if (val === 'staff') {
          this.params.leader_id = '';
          this.leaderName = '';
        } else {
          this.params.depart_id = '';
          this.departName = '';
        }
      },
      //双击表格
      dblClick(row) {
        this.house_id = row.house_id;
        this.dormDetailDialog = true;
      },

      search() {
        this.params.page = 1;
        this.getData();
        this.isHigh = false;
      },
      getData() {
        this.tableLoading = true;
        this.tableStatus = ' ';
        this.$http.get(globalConfig.server + 'api/v1/house-list', {params: this.params}).then(res => {
          this.tableLoading = false;
          if (res.data.code === '60012') {
            this.tableData = res.data.info.data;
            this.totalNum = res.data.info.total;
          } else {
            this.tableStatus = '暂无数据';
            this.tableData = [];
            this.totalNum = 0;
          }
        })
      },
      // 高级
      highGrade() {
        this.isHigh = !this.isHigh;
      },
      // 重置
      resetting() {
        this.params = {
          page: 1,
          limit: 10,
          house_type: 2,
          where: '',
          leader_id: '',//负责人姓名
          depart_id: '',//部门名称
          guest_name: '',//住宿人员姓名
          priceMin: '',//最低人均价格
          priceMax: '',//最高人均价格
          bed_num: '',//剩余床位数
          start_time: '',//开始时间
          end_time: '',//结束时间
        };
        this.leaderName = '';
        this.departName = '';
        this.getData();
      },
      searchPic(id) {
        this.isOnlyPic = true;
        this.house_id = id;
        this.houseDetailDialog = true;
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.params.page = val;
        this.getData();
      },

      /***************************************************************************/
      // 右键
      openContextMenu(row) {
        this.currentId = row.id;
        this.currentRow = row;
        this.contextParams();
        this.lists = [
          {clickIndex: 'addEnterDialog', headIcon: 'el-icons-fa-plus', label: '添加入住人员',},
          {clickIndex: 'addLeaveDialog', headIcon: 'el-icon-minus', label: '添加离宿人员',},
          {clickIndex: 'cancelDormDialog', headIcon: 'el-icon-delete', label: '取消宿舍',},
          {clickIndex: 'updateDormDialog', headIcon: 'el-icon-refresh', label: '变更信息',},
        ];
        this.contextParams()
      },
      // 右键回调
      clickEvent(val) {
        this.openModalDialog(val);
      },
      //关闭右键菜单
      closeMenu() {
        this.show = false;
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
      /****************************************************************/
      openModalDialog(val) {
        switch (val) {
          case 'addEnterDialog':
            this.addEnterDialog = true;
            break;
          case 'addLeaveDialog':
            this.addLeaveDialog = true;
            break;
          case 'cancelDormDialog':
            this.cancelDormDialog = true;
            break;
          case 'updateDormDialog':
            this.updateDormDialog = true;
            break;
        }
      },
      closeModal(val) {
        this.addDormDialog = false;
        this.addEnterDialog = false;
        this.addLeaveDialog = false;
        this.cancelDormDialog = false;
        this.updateDormDialog = false;
        this.dormDetailDialog = false;
        this.houseDetailDialog = false;
        this.organizationDialog = false;
        if (val === 'success') {
          this.getData();
        }
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .flex-items {
    display: flex;
    display: -webkit-flex;
    align-items: center;
  }

  .block {
    display: flex;
    display: -webkit-flex;
    .el-date-editor.el-input {
      width: 180px;
    }
  }
</style>
