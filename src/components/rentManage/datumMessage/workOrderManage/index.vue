<template>
  <div @click="show=false" @contextmenu="closeMenu">
    <div id="clientContainer">
      <div class="highRanking">
        <div class="tabsSearch">
          <el-form :inline="true" onsubmit="return false" size="mini">
            <el-form-item>
              <el-input v-model="params.keywords" placeholder="跟进事项" @keyup.enter.native="search" clearable>
                <el-button slot="append" type="primary" @click="search" icon="el-icon-search"></el-button>
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
        <div class="filter high_grade" :class="isHigh? 'highHide':''">
          <el-form :inline="true" onsubmit="return false" size="mini" label-width="100px">
            <div class="filterTitle">
              <i class="el-icons-fa-bars"></i>&nbsp;&nbsp;高级搜索
            </div>
            <el-row class="el_row_border">
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">跟进状态</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-select clearable v-model="params.follow_status" placeholder="请选择跟进状态" value="">
                        <el-option v-for="item in dictionary_follow" :label="item.dictionary_name" :value="item.id"
                                   :key="item.id"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">跟进人</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-input v-model="follow_name" readonly="" @focus="openOrganizeModal">
                        <el-button slot="append" type="primary" @click="emptyFollowPeople">清空</el-button>
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
                    <div class="el_col_label">工单创建时间</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-date-picker
                        v-model="params.create_time"
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
                    <div class="el_col_label">跟进时间</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-date-picker
                        v-model="params.follow_time"
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
            </el-row>
            <el-row class="el_row_border">
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">更新时间</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-date-picker
                        v-model="params.update_time"
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
                    <div class="el_col_label">完成时间</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-date-picker
                        v-model="params.finish_time"
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
            </el-row>
            <el-row class="el_row_border">
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">工单类型</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-select clearable v-model="params.type" placeholder="请选择工单类型" value="">
                        <el-option v-for="item in dictionary" :label="item.dictionary_name" :value="item.id"
                                   :key="item.id"></el-option>
                      </el-select>
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
        <div>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="收房工单" name="first">
              <el-table
                :data="collectTableData"
                :empty-text='workOrderStatus'
                v-loading="workOrderLoading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(255, 255, 255, 0)"
                @row-click="clickTable"
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
                  prop="num"
                  label="工单编号">
                  <template slot-scope="scope">
                    <span v-if="scope.row.num">{{scope.row.num}}</span>
                    <span v-if="!scope.row.num">暂无</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="房屋地址">
                  <template slot-scope="scope">
                    <span v-if="scope.row.construct">
                      <span v-if="scope.row.construct.house">
                        {{scope.row.construct.house.name}}
                      </span>
                    </span>
                    <span v-if="!scope.row.construct">暂无</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="events"
                  label="事件数">
                  <template slot-scope="scope">
                    <span v-if="scope.row.events">{{scope.row.events}}</span>
                    <span v-if="!scope.row.events">暂无</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="types"
                  label="工单类型">
                  <template slot-scope="scope">
                    <span v-if="scope.row.types">{{scope.row.types}}</span>
                    <span v-if="!scope.row.types">暂无</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="matters"
                  label="跟进事项">
                  <template slot-scope="scope">
                    <span v-if="scope.row.matters">{{scope.row.matters}}</span>
                    <span v-if="!scope.row.matters">暂无</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="expected_finish_time"
                  label="下次跟进时间">
                  <template slot-scope="scope">
                    <span v-if="scope.row.expected_finish_time">{{scope.row.expected_finish_time}}</span>
                    <span v-if="!scope.row.expected_finish_time">暂无</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="creator"
                  label="创建人">
                  <template slot-scope="scope">
                    <span v-if="scope.row.creator">{{scope.row.creator}}</span>
                    <span v-if="!scope.row.creator">暂无</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="follow"
                  label="跟进人">
                    <template slot-scope="scope">
                      <span v-if="scope.row.follow">{{scope.row.follow}}</span>
                      <span v-if="!scope.row.follow">暂无</span>
                    </template>
                </el-table-column>
                <el-table-column
                  prop="follow_statuss"
                  label="跟进状态">
                  <template slot-scope="scope">
                    <el-button class="btnStatus" v-if="scope.row.follow_statuss === '已完成'" type="primary" size="mini">
                      {{scope.row.follow_statuss}}
                    </el-button>
                    <el-button class="btnStatus" v-if="scope.row.follow_statuss === '处理中'" type="warning" size="mini">
                      {{scope.row.follow_statuss}}
                    </el-button>
                    <el-button class="btnStatus" v-if="scope.row.follow_statuss === '待处理'" type="info" size="mini">
                      {{scope.row.follow_statuss}}
                    </el-button>
                    <span v-if="!scope.row.follow_statuss">暂无</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="租房工单" name="second">
              <el-table
                :data="rentTableData"
                :empty-text='rentStatus'
                v-loading="rentLoading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(255, 255, 255, 0)"
                @row-click="clickTable"
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
                  prop="num"
                  label="工单编号">
                  <template slot-scope="scope">
                    <span v-if="scope.row.num">{{scope.row.num}}</span>
                    <span v-if="!scope.row.num">暂无</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="房屋地址">
                  <template slot-scope="scope">
                    <span v-if="scope.row.construct">
                      <span v-if="scope.row.construct.house">
                        {{scope.row.construct.house.name}}
                      </span>
                    </span>
                    <span v-if="!scope.row.construct">暂无</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="events"
                  label="事件数">
                  <template slot-scope="scope">
                    <span v-if="scope.row.events">{{scope.row.events}}</span>
                    <span v-if="!scope.row.events">暂无</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="types"
                  label="工单类型">
                  <template slot-scope="scope">
                    <span v-if="scope.row.types">{{scope.row.types}}</span>
                    <span v-if="!scope.row.types">暂无</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="matters"
                  label="跟进事项">
                  <template slot-scope="scope">
                    <span v-if="scope.row.matters">{{scope.row.matters}}</span>
                    <span v-if="!scope.row.matters">暂无</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="expected_finish_time"
                  label="预计完成时间">
                  <template slot-scope="scope">
                    <span v-if="scope.row.expected_finish_time">{{scope.row.expected_finish_time}}</span>
                    <span v-if="!scope.row.expected_finish_time">暂无</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="creator"
                  label="创建人">
                  <template slot-scope="scope">
                    <span v-if="scope.row.creator">{{scope.row.creator}}</span>
                    <span v-if="!scope.row.creator">暂无</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="follow"
                  label="跟进人">
                  <template slot-scope="scope">
                    <span v-if="scope.row.follow">{{scope.row.follow}}</span>
                    <span v-if="!scope.row.follow">暂无</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="follow_statuss"
                  label="跟进状态">
                  <template slot-scope="scope">
                    <el-button class="btnStatus" v-if="scope.row.follow_statuss === '已完成'" type="primary" size="mini">
                      {{scope.row.follow_statuss}}
                    </el-button>
                    <el-button class="btnStatus" v-if="scope.row.follow_statuss === '处理中'" type="warning" size="mini">
                      {{scope.row.follow_statuss}}
                    </el-button>
                    <el-button class="btnStatus" v-if="scope.row.follow_statuss === '待处理'" type="info" size="mini">
                      {{scope.row.follow_statuss}}
                    </el-button>
                    <span v-if="!scope.row.follow_statuss">暂无</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
          <div class="tableBottom">
            <div class="left">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="params.pages"
                :page-sizes="[12, 20, 30, 40]"
                :page-size="params.limit"
                layout="total, prev, pager, next, jumper"
                :total="totalNumber">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperate="clickEvent"></RightMenu>

    <Organization :organizationDialog="organizationDialog" :length="length" :type="type"
                  @close='closeOrganize' @selectMember="selectMember"></Organization>
    <AddChildTask :addChildTaskDialog="addChildTaskDialog" :activeId="activeId" :startAddResult="startEdit"
                  @close="closeModal"></AddChildTask>
    <OrderDetail :orderDetailDialog="orderDetailDialog" :activeId="activeId" :startDetail="startDetail"
                 @close="closeModal"></OrderDetail>
  </div>
</template>

<script>
  import RightMenu from '../../../common/rightMenu.vue'
  import Organization from '../../../common/organization.vue'

  import AddChildTask from './components/addChildTask.vue'
  import OrderDetail from './components/workOrderDetail.vue'

  export default {
    name: 'hello',
    components: {RightMenu, Organization, AddChildTask, OrderDetail},
    data() {
      return {
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],
        /***********/
        statisticDate: '',
        activeName: 'first',
        totalNumber: 0,
        params: {
          pages: 1,
          limit: 12,
          keywords: '',
          follow_status: '',
          follow_id: '',
          create_time: [],
          follow_time: '',
          update_time: '',
          finish_time: '',
          type: '',
          module: 1,
        },
        follow_name: '',   //跟进人
        length: 0,
        type: '',
        collectTableData: [],
        rentTableData: [],
        options: [],
        //模态框
        organizationDialog: false,
        editWorkDialog: false,     //编辑
        addChildTaskDialog: false,     //添加子任务框
        orderDetailDialog: false,
        isHigh: false,
        activeId: '',
        startEdit: false,
        startAddResult: false,
        startDetail: false,
        dictionary: [],
        dictionary_follow: [],//  跟进状态字典
        workOrderStatus: ' ',
        workOrderLoading: false,
        isDictionary: false,
        rentStatus: ' ',
        rentLoading: false,
      }
    },
    created() {
      if (!this.isDictionary) {
        this.getDictionary();
      }
      if (this.$store.state.datum.work_order_filter.pages) {
        this.params.pages = this.$store.state.datum.work_order_filter.pages;
        this.params.limit = this.$store.state.datum.work_order_filter.limit;
      }
      this.collectDatafunc();
    },
    watch: {
      activeName(val) {
        if (val === 'first') {
          this.module = 1;
        } else {
          this.module = 2;
        }
      },
    },
    methods: {
      handleClick() {
        if (this.activeName == "first") {
          this.collectDatafunc();
        }
        else if (this.activeName == "second") {
          this.rentDatafunc();
        }
      },
      getDictionary() {
        this.$http.get(globalConfig.server + 'setting/dictionary/255').then((res) => {
          if (res.data.code === "30010") {
            this.dictionary = res.data.data;
            this.isDictionary = true;
          }
        });
        this.$http.get(globalConfig.server + 'setting/dictionary/335').then((res) => {
          if (res.data.code === "30010") {
            this.dictionary_follow = res.data.data;
            this.isDictionary = true;
          }
        });

      },
      //获取列表数据
      collectDatafunc() {
        this.workOrderLoading = true;
        this.workOrderStatus = ' ';
        this.params.module = 1;
        this.$http.get(globalConfig.server + 'customer/work_order', {params: this.params}).then((res) => {
          this.workOrderLoading = false;
          if (res.data.code === '100200') {
            this.collectTableData = res.data.data.data;
            this.totalNumber = res.data.data.count;
          } else {
            this.workOrderStatus = '暂无数据';
            this.collectTableData = [];
            this.totalNumber = 0;
          }
        })
      },
      rentDatafunc() {
        this.rentLoading = true;
        this.rentStatus = ' ';
        this.params.module = 2;
        this.$http.get(globalConfig.server + 'customer/work_order', {params: this.params}).then((res) => {
          this.rentLoading = false;
          if (res.data.code === '100200') {
            this.rentTableData = res.data.data.data;
            this.totalNumber = res.data.data.count;
          } else {
            this.rentStatus = '暂无数据';
            this.rentTableData = [];
            this.totalNumber = 0;
          }
        })
      },

      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.$store.dispatch('workOrderFilter', this.params);
      },
      handleCurrentChange(val) {
        this.params.pages = val;
        if (this.activeName == "first") {
          this.collectDatafunc();
        } else if (this.activeName == "second") {
          this.rentDatafunc();
        }
        this.$store.dispatch('workOrderFilter', this.params);
      },
      clickTable(row, event, column) {
        console.log(row, event, column)
      },
      //房屋右键
      houseMenu(row, event) {
        this.activeId = row.id;
        this.lists = [
//          {clickIndex: 'edit', headIcon: 'el-icon-edit', label: '修改',},
          {clickIndex: 'addChildren', headIcon: 'el-icon-plus', label: '添加子任务',},
        ];
        this.contextMenuParam(event);
      },
      dblClickTable(row, event) {
        this.activeId = row.id;
        this.startDetail = true;
        this.orderDetailDialog = true;
      },
      //右键回调事件
      clickEvent(index) {
        switch (index) {
//          case 'edit' :
//            this.editWorkDialog = true;
//            this.startEdit = true;
//            break;
          case 'addChildren' :
            this.addChildTaskDialog = true;
            this.startEdit = true;
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

      closeModal(val) {
//        this.editWorkDialog = false;
        this.addChildTaskDialog = false;
        this.orderDetailDialog = false;
        //操作状态
//        this.startEdit = false;
        this.startAddResult = false;
        this.startDetail = false;
        this.search();
      },
      closeOrganize() {
        this.organizationDialog = false;
      },
      //调出选人组件
      openOrganizeModal() {
        this.organizationDialog = true;
        this.type = 'staff';
        this.length = 1;
      },
      selectMember(val) {
        this.type = '';
        this.length = '';
        this.params.follow_id = val[0].id;
        this.follow_name = val[0].name;
      },
      emptyFollowPeople() {
        this.params.follow_id = '';
        this.follow_name = '';
      },
      highGrade() {
        this.isHigh = !this.isHigh;
      },
      search() {
        this.isHigh = false;
        if (this.activeName == "first") {
          this.params.pages = 1;
          this.collectDatafunc();
        } else if (this.activeName == "second") {
          this.params.pages = 1;
          this.rentDatafunc();
        }
      },
      resetting() {
        this.params.follow_id = '';
        this.params.follow_status = '';
        this.params.create_time = [];
        this.params.update_time = [];
        this.params.follow_time = [];
        this.params.finish_time = [];
        this.params.type = '';
        this.follow_name = '';
      },
      exportData() {
        this.$http.get(globalConfig.server + 'customer/work_order/export', {
          responseType: 'arraybuffer',
          params: this.params
        }).then((res) => { // 处理返回的文件流
          if (!res.data) {
            return;
          }
          let url = window.URL.createObjectURL(new Blob([res.data]));
          let link = document.createElement('a');
          link.style.display = 'a';
          link.href = url;
          link.setAttribute('download', 'excel.xlsx');
          document.body.appendChild(link);
          link.click();
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="">
  #clientContainer {
    min-height: 800px;
    .selectButton {
      color: #fff;
      background: #66b1ff;
    }
    .main {
      font-size: 12px;
      .tableBottom {
        padding: 8px;
        display: flex;
        justify-content: flex-end;
        .right {
          display: flex;
          align-items: center;
          div {
            width: 100px;
            text-align: center;
            span {
              color: #fb529f;
            }
            &:first-child {
              border-right: 1px solid #ccc;
            }
          }
        }
      }
    }
  }
</style>
