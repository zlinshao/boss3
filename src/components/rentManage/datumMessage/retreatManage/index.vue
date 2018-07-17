<template>
  <div @click="show=false" @contextmenu="closeMenu">
    <div id="clientContainer">
      <div class="highRanking">
        <div class="tabsSearch">
          <el-form :inline="true" onsubmit="return false" size="mini">
            <el-form-item>
              <el-input placeholder="请选择房屋地址" v-model="address" size="mini" readOnly @focus="openAddressDialog">
                <template slot="append">
                  <div style="cursor: pointer;" @click="emptySearch">清空</div>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
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
                    <div class="el_col_label">退租时间</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-date-picker
                        v-model="params.check_time"
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
                    <div class="el_col_label">退房状态</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-select clearable v-model="params.status" placeholder="请选择退房状态" value="">
                        <el-option label="草稿" value="0"></el-option>
                        <el-option label="待审核" value="1"></el-option>
                        <el-option label="已驳回" value="2"></el-option>
                        <el-option label="待结清" value="3"></el-option>
                        <el-option label="已完成" value="4"></el-option>
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
            <el-tab-pane label="房东退房" name="first">
              <el-table
                :data="tableData"
                :empty-text='emptyStatus'
                v-loading="isLoading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(255, 255, 255, 0)"
                @row-click="clickTable"
                @row-dblclick="dblClickTable"
                @row-contextmenu='houseMenu'
                style="width: 100%">
                <el-table-column
                  label="合同编号">
                  <template slot-scope="scope">
                    <span v-if="scope.row.contract_id && scope.row.contract_id.constructor === Object">
                      {{scope.row.contract_id.contract_number}}
                    </span>
                    <span v-else="">/</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="房屋地址">
                  <template slot-scope="scope">
                    <span v-if="scope.row.contract_id && scope.row.contract_id.constructor === Object
                          &&scope.row.contract_id.house">
                      {{scope.row.contract_id.house.name}}
                    </span>
                    <span v-else="">/</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="check_time"
                  label="退房时间">
                </el-table-column>
                <el-table-column
                  prop="check_types"
                  label="退房性质">
                </el-table-column>
                <el-table-column
                  label="总费用">
                  <template slot-scope="scope">
                    <span v-if="scope.row.details && scope.row.details.total_fees">
                      {{scope.row.details.total_fees}}
                    </span>
                    <span v-else="">/</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="应退费用">
                  <template slot-scope="scope">
                    <span v-if="scope.row.details&&scope.row.details.should_be_returned_fees">
                      {{scope.row.details.should_be_returned_fees}}
                    </span>
                    <span v-else="">/</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="能源费用">
                  <template slot-scope="scope">
                    <span v-if="scope.row.details&&scope.row.details.deduct_energy_fees">
                      {{scope.row.details.deduct_energy_fees}}
                    </span>
                    <span v-else="">/</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="其他费用">
                  <template slot-scope="scope">
                    <span v-if="scope.row.details&&scope.row.details.others_fees">
                      {{scope.row.details.others_fees}}
                    </span>
                    <span v-else="">/</span>
                  </template>
                </el-table-column>

                <el-table-column
                  label="创建人">
                  <template slot-scope="scope">
                    <span v-if="scope.row.creators&&scope.row.creators.name">{{scope.row.creators.name}}</span>
                    <span v-else="">/</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="结算人">
                  <template slot-scope="scope">
                    <span v-if="scope.row.settlers&&scope.row.settlers.name">{{scope.row.settlers.name}}</span>
                    <span v-else="">/</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="审核人">
                  <template slot-scope="scope">
                    <span v-if="scope.row.auditors&&scope.row.auditors.name">{{scope.row.auditors.name}}</span>
                    <span v-else="">/</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="退租状态">
                  <template slot-scope="scope">
                     <span v-if="scope.row.status==0">
                      <span class="info_label">草稿</span>
                    </span>
                    <span v-if="scope.row.status==1">
                      <span class="red_label">待审核</span>
                    </span>
                    <span v-if="scope.row.status==2">
                      <span class="orange_label">已驳回</span>
                    </span>
                    <span v-if="scope.row.status==3">
                      <span class="yellow_label">待付款</span>
                    </span>
                    <span v-if="scope.row.status==4">
                      <span class="success_label">已完成</span>
                    </span>
                    <span v-if="scope.row.status==5">
                      <span class="success_label">待结算</span>
                    </span>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="租客退房" name="second">
              <el-table
                :data="tableData"
                :empty-text='emptyStatus'
                v-loading="isLoading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(255, 255, 255, 0)"
                @row-click="clickTable"
                @row-dblclick="dblClickTable"
                @row-contextmenu='houseMenu'
                style="width: 100%">
                <el-table-column
                  label="合同编号">
                  <template slot-scope="scope">
                    <span v-if="scope.row.contract_id && scope.row.contract_id.constructor === Object">
                      {{scope.row.contract_id.contract_number}}
                    </span>
                    <span v-else="">/</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="房屋地址">
                  <template slot-scope="scope">
                    <span v-if="scope.row.contract_id && scope.row.contract_id.constructor === Object
                          &&scope.row.contract_id.house">
                      {{scope.row.contract_id.house.name}}
                    </span>
                    <span v-else="">/</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="check_time"
                  label="退房时间">
                </el-table-column>
                <el-table-column
                  prop="check_types"
                  label="退房性质">
                </el-table-column>
                <el-table-column
                  label="总费用">
                  <template slot-scope="scope">
                    <span v-if="scope.row.details && scope.row.details.total_fees">
                      {{scope.row.details.total_fees}}
                    </span>
                    <span v-else="">/</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="应退费用">
                  <template slot-scope="scope">
                    <span v-if="scope.row.details&&scope.row.details.should_be_returned_fees">
                      {{scope.row.details.should_be_returned_fees}}
                    </span>
                    <span v-else="">/</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="能源费用">
                  <template slot-scope="scope">
                    <span v-if="scope.row.details&&scope.row.details.deduct_energy_fees">
                      {{scope.row.details.deduct_energy_fees}}
                    </span>
                    <span v-else="">/</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="其他费用">
                  <template slot-scope="scope">
                    <span v-if="scope.row.details&&scope.row.details.others_fees">
                      {{scope.row.details.others_fees}}
                    </span>
                    <span v-else="">/</span>
                  </template>
                </el-table-column>

                <el-table-column
                  label="创建人">
                  <template slot-scope="scope">
                    <span v-if="scope.row.creators&&scope.row.creators.name">{{scope.row.creators.name}}</span>
                    <span v-else="">/</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="结算人">
                  <template slot-scope="scope">
                    <span v-if="scope.row.settlers&&scope.row.settlers.name">{{scope.row.settlers.name}}</span>
                    <span v-else="">/</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="审核人">
                  <template slot-scope="scope">
                    <span v-if="scope.row.auditors&&scope.row.auditors.name">{{scope.row.auditors.name}}</span>
                    <span v-else="">/</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="退租状态">
                  <template slot-scope="scope">
                    <span v-if="scope.row.status==0">
                      <span class="info_label">草稿</span>
                    </span>
                    <span v-if="scope.row.status==1">
                      <span class="red_label">待审核</span>
                    </span>
                    <span v-if="scope.row.status==2">
                      <span class="orange_label">已驳回</span>
                    </span>
                    <span v-if="scope.row.status==3">
                      <span class="yellow_label">待付款</span>
                    </span>
                    <span v-if="scope.row.status==4">
                      <span class="success_label">已完成</span>
                    </span>
                    <span v-if="scope.row.status==5">
                      <span class="success_label">待结算</span>
                    </span>
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
                :current-page="params.page"
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

    <EditCollectVacation :editCollectVacation="editCollectVacation" :vacationId="operateId"
                         @close="closeModal"></EditCollectVacation>
    <VacationDetail :vacationDetail="vacationDetail" :vacationId="operateId" @close="closeModal"></VacationDetail>

    <AddressSearch :addressDialog="addressDialog" @close="closeAddressDialog" :isRent="isRent"></AddressSearch>

    <UploadPic :upLoadDialog="upLoadDialog" :status="status" :vacationId="operateId" @close="closeModal"></UploadPic>
  </div>
</template>

<script>
  import RightMenu from '../../../common/rightMenu.vue'
  import EditCollectVacation from '../../tabComponents/components/editVacation.vue'
  import VacationDetail from '../../tabComponents/components/vacationDetail.vue'
  import AddressSearch from '../../../common/addressSearch';
  import UploadPic from './components/upScreenshot'

  export default {
    name: 'hello',
    components: {RightMenu, EditCollectVacation, VacationDetail, AddressSearch,UploadPic},
    data() {
      return {
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],
        /***********/
        activeName: 'first',
        totalNumber: 0,
        params: {
          page: 1,
          limit: 12,
          module: 1,
          contract_id: '',
          check_time: [],
          status: '',
        },

        tableData: [],
        operateId: '',

        isHigh: false,
        emptyStatus: ' ',
        isLoading: false,
        editCollectVacation: false,
        vacationDetail: false,
        addressDialog: false,
        upLoadDialog: false,
        isRent: 0,
        address: '',
        status: '',
      }
    },
    created() {
      this.getData();
    },
    methods: {
      //获取退租列表
      getData() {
        this.emptyStatus = ' ';
        this.isLoading = true;
        this.tableData = [];
        this.$http.get(globalConfig.server + 'customer/check_out', {params: this.params}).then((res) => {
          this.isLoading = false;
          if (res.data.code === '20000') {
            this.tableData = res.data.data.data;
            this.totalNumber = res.data.data.count;
          } else {
            this.emptyStatus = '暂无数据';
            this.totalNumber = 0;
          }
        })
      },
      //切换标签页
      handleClick() {
        this.params.module = this.activeName === 'first' ? 1 : 2;
        this.isRent = this.activeName === 'first' ? 0 : 1;
        this.getData();
      },
      handleSizeChange(val) {
      },
      handleCurrentChange(val) {
        this.params.page = val;
        this.getData();
      },
      clickTable(row, event, column) {
      },

      deleteColumn() {
        this.$http.get(globalConfig.server + 'customer/check_out/delete/' + this.operateId).then((res) => {
          if (res.data.code === '20040') {
            this.getData();
            this.$notify.success({
              title: '成功',
              message: res.data.msg
            })
          } else {
            this.$notify.warning({
              title: '警告',
              message: res.data.msg
            })
          }
        })
      },

      closeModal(val) {
        this.editCollectVacation = false;
        this.upLoadDialog = false;
        this.vacationDetail = false;
        if(val === 'success'){
          this.isRent = this.activeName === 'first' ? 0 : 1;
          this.getData();
        }
      },

      dblClickTable(row, event) {
        this.operateId = row.id;
        this.vacationDetail = true;
      },
      highGrade() {
        this.isHigh = !this.isHigh;
      },
      search() {
        this.isHigh = false;
        this.params.page = 1;
        this.getData();
      },
      resetting() {
        this.params.check_time = [];
        this.params.status = '';
      },
      openAddressDialog() {
        this.addressDialog = true;
      },
      emptySearch() {
        this.params.contract_id = '';
        this.address = '';
        this.search();
      },
      closeAddressDialog(val) {
        this.addressDialog = false;
        if (val) {
          this.address = val.address;
          this.params.contract_id = val.contract_id;
          this.search();
        }
      },
      //-------------------房屋右键------------------------------------//
      houseMenu(row, event) {
        this.operateId = row.id;
        this.status = row.status;
        this.lists = [
          {
            clickIndex: 'edit',
            headIcon: 'el-icon-edit-outline',
            label: '修改',
            'disabled': row.status != 0 && row.status != 2
          },
          {clickIndex: 'upload', headIcon: 'el-icon-upload', label: '上传截图凭证','disabled':row.status<3},
          {clickIndex: 'delete', headIcon: 'el-icon-delete', label: '删除',},
        ];
        this.contextMenuParam(event);
      },
      //右键回调事件
      clickEvent(index) {
        switch (index) {
          case 'edit':
            this.editCollectVacation = true;
            break;
          case 'upload':
            this.upLoadDialog = true;
            break;
          case 'delete':
            this.$confirm('此操作将永久删除该条目, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.deleteColumn();
            }).catch(() => {
              this.$notify.warning({
                title: '警告',
                message: '已取消删除',
              })
            });
            break;
        }
      },
      //关闭右键菜单
      closeMenu() {
        this.show = false;
      },
      //右键参数
      contextMenuParam(event) {
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
    .info_label, .orange_label,.red_label, .success_label,.yellow_label{
      min-width: 70px;
    }

  }
</style>
