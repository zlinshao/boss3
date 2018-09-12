<template>
  <div @click="show=false" @contextmenu="closeMenu">
    <div id="clientContainer">
      <div class="highRanking">
        <div class="tabsSearch">
          <el-form :inline="true" onsubmit="return false" size="mini">
            <el-form-item>
              <el-input v-model="params.keywords" placeholder="请输入地址/下次跟进人" @keyup.enter.native="search" clearable>
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
                      <el-select clearable v-model="params.follow_status" placeholder="请选择跟进状态">
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
                        <el-option v-for="item in dictionaries" :label="item.dictionary_name" :value="item.id"
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
                @row-dblclick="dblClickTable"
                style="width: 100%">
                <el-table-column
                  prop="emergency"
                  label="紧急程度">
                  <template slot-scope="scope">
                    <span v-if="scope.row.emergency === 1 && scope.row.follow_status !== 338"
                          :class="scope.row.overdueTime > currentTime ? 'orange' : 'blue'">一般</span>
                    <span v-if="scope.row.emergency === 2 && scope.row.follow_status !== 338"
                          style="color:red">紧急</span>
                    <span v-if="!scope.row.emergency"></span>
                  </template>
                </el-table-column>
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
                    <span v-if="scope.row.address">{{scope.row.address}}</span>
                    <span v-if="!scope.row.address">暂无</span>
                  </template>
                </el-table-column>
                <!--<el-table-column-->
                  <!--prop="events"-->
                  <!--label="事件数">-->
                  <!--<template slot-scope="scope">-->
                    <!--<span v-if="scope.row.events">{{scope.row.events}}</span>-->
                    <!--<span v-if="!scope.row.events">暂无</span>-->
                  <!--</template>-->
                <!--</el-table-column>-->
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
                  label="工单内容">
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
                  label="下次跟进人">
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
                @row-dblclick="dblClickTable"
                style="width: 100%">
                <el-table-column
                  prop="emergency"
                  label="紧急程度">
                  <template slot-scope="scope">
                  <span v-if="scope.row.emergency === 1"
                        :class="scope.row.overdueTime > currentTime ? 'orange' : 'blue'">一般</span>
                    <span v-if="scope.row.emergency === 2" style="color:red">紧急</span>
                    <span v-if="!scope.row.emergency">暂无</span>
                  </template>
                </el-table-column>
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
                    <span v-if="scope.row.address">{{scope.row.address}}</span>
                    <span v-if="!scope.row.address">暂无</span>
                  </template>
                </el-table-column>
                <!--<el-table-column-->
                  <!--prop="events"-->
                  <!--label="事件数">-->
                  <!--<template slot-scope="scope">-->
                    <!--<span v-if="scope.row.events">{{scope.row.events}}</span>-->
                    <!--<span v-if="!scope.row.events">暂无</span>-->
                  <!--</template>-->
                <!--</el-table-column>-->
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
                  label="工单内容">
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
                  label="下次跟进人">
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
                  @close='closeModal' @selectMember="selectMember"></Organization>

    <!--<AddChildTask :addChildTaskDialog="addChildTaskDialog" :activeId="activeId" :module="params.module" :startAddResult="startEdit"-->
    <!--@close="closeModal"></AddChildTask>-->

    <OrderDetail :orderDetailDialog="orderDetailDialog" :wordData="wordData" @close="closeOrder"></OrderDetail>
  </div>
</template>

<script>
  import RightMenu from '../../../common/rightMenu.vue'
  import Organization from '../../../common/organization.vue'

  import OrderDetail from './components/workOrderDetail.vue'

  export default {
    name: 'hello',
    components: {RightMenu, Organization, OrderDetail},
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
        currentTime: 48,
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
        orderDetailDialog: false,
        isHigh: false,
        wordData: {},

        dictionaries: [],
        dictionary_follow: [],//  跟进状态字典
        workOrderStatus: ' ',
        workOrderLoading: false,
        rentStatus: ' ',
        rentLoading: false,
      }
    },
    created() {
      this.getDictionary();
      if (this.$store.state.datum.work_order_filter.pages) {
        this.params.pages = this.$store.state.datum.work_order_filter.pages;
        this.params.limit = this.$store.state.datum.work_order_filter.limit;
      }
      this.collectDatafunc();
    },
    watch: {},
    methods: {
      getTime(val) {
        let data = [];
        val === 1 ? (data = this.collectTableData) : (data = this.rentTableData);
        for (let i = 0; i < data.length; i++) {
          let foundTime = parseInt(Date.parse(data[i].create_time) / 1000 / 3600); //创建时间 的小时
          let currentTime = parseInt(Date.parse(new Date()) / 1000 / 3600); //现在的时间 的小时
          //  判断 创建时间  到当前的时间 有没有 超过 48小时
          data[i].overdueTime = currentTime - foundTime; //得到  创建的时间  距离现在 有多少小时
        }
      },
      handleClick() {
        if (this.activeName === "first") {
          this.collectDatafunc();
        } else {
          this.rentDatafunc();
        }
      },
      getDictionary() {
        this.dictionary(696, 1).then((res) => {
          this.dictionaries = res.data;
        });
        this.dictionary(335, 1).then((res) => {
          this.dictionary_follow = res.data;
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
            this.getTime(1);
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
            this.getTime(2);
          } else {
            this.rentStatus = '暂无数据';
            this.rentTableData = [];
            this.totalNumber = 0;
          }
        })
      },

      handleSizeChange(val) {
        this.$store.dispatch('workOrderFilter', this.params);
      },
      handleCurrentChange(val) {
        this.params.pages = val;
        this.handleClick();
        this.$store.dispatch('workOrderFilter', this.params);
      },
      //房屋右键
      houseMenu(row, event) {
        // this.wordData.id = row.id;
        // this.lists = [
        //  {clickIndex: 'edit', headIcon: 'el-icon-edit', label: '修改',},
        //   {clickIndex: 'addChildren', headIcon: 'el-icon-plus', label: '添加子任务',},
        // ];
        this.contextMenuParam(event);
      },
      dblClickTable(row) {
        this.wordData.name = row.address ? row.address : '暂无';
        this.wordData.id = row.id;
        this.wordData.module = this.params.module;
        this.orderDetailDialog = true;
      },
      //右键回调事件
      clickEvent(index) {
        switch (index) {
          case 'edit' :
//            this.editWorkDialog = true;
//            this.startEdit = true;
            break;
          case 'addChildren' :
            // this.addChildTaskDialog = true;
            // this.startEdit = true;
            break;
        }
      },
      //关闭右键菜单
      closeMenu() {
        this.show = false;
      },
      //右键参数
      contextMenuParam(event) {
        let e = event || window.event;
        this.show = false;
        this.rightMenuX = e.clientX + document.documentElement.scrollLeft - document.documentElement.clientLeft;
        this.rightMenuY = e.clientY + document.documentElement.scrollTop - document.documentElement.clientTop;
        event.preventDefault();
        event.stopPropagation();
        this.$nextTick(() => {
          this.show = true;
        })
      },
      // 关闭模态框
      closeModal() {
        this.organizationDialog = false;
      },
      closeOrder() {
        this.orderDetailDialog = false;
        this.handleClick();
      },
      //选人组件
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
        this.params.pages = 1;
        this.handleClick();
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
          params: this.params,
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
    .blue {
      color: blue;
    }
    .orange {
      color: orange;
    }
    .width {
      width: 90px;
    }
  }
</style>
