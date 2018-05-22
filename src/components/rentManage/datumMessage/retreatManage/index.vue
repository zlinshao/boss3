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
            <!--<el-form-item>-->
              <!--<el-button type="primary" size="mini" @click="highGrade">高级</el-button>-->
            <!--</el-form-item>-->
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

                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">跟进人</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">

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
                  prop="check_time"
                  label="退房时间">
                </el-table-column>
                <el-table-column
                  prop="check_types"
                  label="退房状态">
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
                  label="结算人">
                  <template slot-scope="scope">
                    <span v-if="scope.row.creators&&scope.row.creators.name">{{scope.row.creators.name}}</span>
                    <span v-else="">/</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="操作人">
                  <template slot-scope="scope">
                    <span v-if="scope.row.settlers&&scope.row.settlers.name">{{scope.row.settlers.name}}</span>
                    <span v-else="">/</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="结算状态">
                  <template slot-scope="scope">
                    <span v-if="scope.row.status == 2">已结算</span>
                    <el-button size="mini" type="primary" v-else="" @click="check_out(scope.row.id)">未结算</el-button>
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
                  prop="check_time"
                  label="退房时间">
                </el-table-column>
                <el-table-column
                  prop="check_types"
                  label="退房状态">
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
                  label="结算人">
                  <template slot-scope="scope">
                    <span v-if="scope.row.creators&&scope.row.creators.name">{{scope.row.creators.name}}</span>
                    <span v-else="">/</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="操作人">
                  <template slot-scope="scope">
                    <span v-if="scope.row.settlers&&scope.row.settlers.name">{{scope.row.settlers.name}}</span>
                    <span v-else="">/</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="结算状态">
                  <template slot-scope="scope">
                    <span v-if="scope.row.status == 2">已结算</span>
                    <el-button size="mini" type="primary" v-else="" @click="check_out(scope.row.id)">未结算</el-button>
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

    <EditCollectVacation :editCollectVacation="editCollectVacation" :vacationId="operateId" @close="closeModal"></EditCollectVacation>
    <VacationDetail :vacationDetail="vacationDetail" :vacationId="operateId" @close="closeModal"></VacationDetail>

    <AddressSearch :addressDialog="addressDialog" @close="closeAddressDialog" :isRent="isRent"></AddressSearch>
  </div>
</template>

<script>
  import RightMenu from '../../../common/rightMenu.vue'
  import EditCollectVacation from '../../tabComponents/components/editVacation.vue'
  import VacationDetail from '../../tabComponents/components/vacationDetail.vue'
  import AddressSearch from '../../../common/addressSearch';
  export default {
    name: 'hello',
    components: {RightMenu,EditCollectVacation,VacationDetail,AddressSearch},
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
          pages: 1,
          limit: 12,
          module : 1,
          contract_id: '',
        },

        tableData: [],
        operateId : '',

        isHigh: false,
        emptyStatus: ' ',
        isLoading: false,
        editCollectVacation : false,
        vacationDetail : false,
        addressDialog : false,
        isRent : 0,
        address : '',
      }
    },
    created(){
      this.getData();
    },
    methods: {
      //获取退租列表
      getData(){
        this.emptyStatus = ' ';
        this.isLoading = true;
        this.tableData = [];
        this.$http.get(globalConfig.server+'customer/check_out',{params:this.params}).then((res) => {
          this.isLoading = false;
          if(res.data.code === '20000'){
            this.tableData = res.data.data.data;
            this.totalNumber = res.data.data.count;
          }else {
            this.emptyStatus = '暂无数据';
            this.totalNumber = 0;
          }
        })
      },
      //切换标签页
      handleClick() {
        this.params.module = this.activeName === 'first'?1:2;
        this.isRent = this.activeName === 'first'?0:1;
        this.getData();
      },
      handleSizeChange(val) {
      },
      handleCurrentChange(val) {
        this.params.pages = val;
      },
      clickTable(row, event, column) {
      },

      deleteColumn(){
        this.$http.get(globalConfig.server+'customer/check_out/delete/'+this.operateId).then((res) => {
          if(res.data.code === '20040'){
            this.getData();
            this.$notify.success({
              title:'成功',
              message:res.data.msg
            })
          }else {
            this.$notify.warning({
              title:'警告',
              message:res.data.msg
            })
          }
        })
      },

      closeModal(){
        this.editCollectVacation = false;
        this.vacationDetail = false;
      },

      dblClickTable(row, event) {
        this.vacationDetail = true;
      },
      highGrade() {
        this.isHigh = !this.isHigh;
      },
      search() {
        this.params.pages = 1;
        this.getData();
      },
      resetting() {

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
        this.lists = [
          {clickIndex: 'edit',headIcon: 'el-icon-edit-outline', label: '修改',},
          {clickIndex: 'delete',headIcon: 'el-icon-delete', label: '删除',},
        ];
        this.contextMenuParam(event);
      },
      //右键回调事件
      clickEvent(index) {
        switch (index){
          case 'edit':
            this.editCollectVacation = true;
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
                title:'警告',
                message:'已取消删除',
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
  }
</style>
