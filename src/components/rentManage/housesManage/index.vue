<template>
  <div @click="show=false" @contextmenu="closeMenu">
    <div id="houseContainer">

      <div class="highRanking">
        <div class="highSearch" style="justify-content: space-between">
          <div class="earlyWarning">
            <el-button class="warningItem" type="text">空置房源: {{houseStatus.emptyHouse}}套</el-button>
            <el-button class="warningItem" type="text" style="color: #FFCC00">黄色预警房源:{{houseStatus.yellowHouse}}套
            </el-button>
            <el-button class="warningItem" type="text" style="color: #FF9900">橙色预警房源:{{houseStatus.orangeHouse}}套
            </el-button>
            <el-button class="warningItem" type="text" style="color: #FF3900">红色预警房源:{{houseStatus.redHouse}}套
            </el-button>
            <el-button class="warningItem" type="text" style="color: #409EFF">正在运营中房源: {{houseStatus.lord_end_at}}套
            </el-button>
            <el-button class="warningItem" type="text" style="color: #409EFF">待收房源: {{houseStatus.wait_lord_at}}套
            </el-button>
          </div>

          <el-form :inline="true" size="mini" onsubmit="return false">
            <el-form-item>
              <el-input placeholder="请输入内容" @keyup.enter.native="search" v-model="formInline.q" size="mini" clearable>
                <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="refreshList">
                <i class="el-icons-fa-refresh"></i>
              </el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" :disabled="!operateArray.length" @click="openOrganizationModal('dispatch')">分配
              </el-button>
            </el-form-item>
            <!--<el-form-item>-->
            <!--<el-button type="primary"><i class="el-icon-sort"></i></el-button>-->
            <!--</el-form-item>-->
          </el-form>
        </div>

        <div class="filter high_grade" :class="isHigh? 'highHide':''">
          <el-form :inline="true" :model="formInline" size="mini" label-width="100px">
            <div class="filterTitle">
              <i class="el-icons-fa-bars"></i>&nbsp;&nbsp;高级搜索
            </div>
            <el-row class="el_row_border">
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">房屋状态</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-select v-model="formInline.status" clearable placeholder="请选择房屋状态" value="">
                        <el-option label="未出租" value="0"></el-option>
                        <el-option label="已出租" value="1"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">按部门搜索</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>

                      <el-input readonly="" @focus="openOrganizationModal('filter')" v-model="department_name"
                                placeholder="点击选择部门">

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
        <div class="tableBox">
          <div class="myTable">
            <el-table
              :data="tableData"
              :empty-text='emptyContent'
              v-loading="tableLoading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(255, 255, 255, 0)"
              @row-contextmenu="houseMenu"
              @row-dblclick="dblClickTable"
              @row-click='clickTable'
              :row-class-name="tableRowCollectName"
              @selection-change="handleSelectionChange"
              style="width: 100%">
              <el-table-column
                type="selection"
                width="30">
              </el-table-column>

              <el-table-column
                label="合同上传时间">
                <template slot-scope="scope">
                  <span v-if="scope.row.created_at">{{scope.row.created_at}}</span>
                  <span v-else="">/</span>
                </template>
              </el-table-column>

              <el-table-column
                label="地址">
                <template slot-scope="scope">
                  <span v-if="scope.row.name">{{scope.row.name}}</span>
                  <span v-else="">/</span>
                </template>
              </el-table-column>
              <el-table-column
                label="房型">
                <template slot-scope="scope">
                  <span>{{dicts.room[scope.row.room]}}</span>
                  <span>{{dicts.hall[scope.row.hall]}}</span>
                  <span>{{dicts.toilet[scope.row.toilet]}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="装修">
                <template slot-scope="scope">
                  <span v-if="scope.row.decoration">{{matchDictionary(scope.row.decoration)}}</span>
                  <span v-else="">/</span>
                </template>
              </el-table-column>
              <el-table-column
                label="房屋类型">
                <template slot-scope="scope">
                  <span v-if="scope.row.house_identity">{{matchDictionary(scope.row.house_identity)}}</span>
                  <span v-else="">/</span>
                </template>
              </el-table-column>
              <!--<el-table-column-->
              <!--label="出租性质">-->
              <!--<template slot-scope="scope">-->
              <!--<span v-if="scope.row.rent_type">{{matchDictionary(scope.row.rent_type)}}</span>-->
              <!--<span v-else="">/</span>-->
              <!--</template>-->
              <!--</el-table-column>-->
              <el-table-column
                width="150"
                label="房屋评分">
                <template slot-scope="scope">
                  <span v-if="scope.row.house_grade">
                    <el-rate disabled v-model="scope.row.house_grade" style="line-height: 37px"></el-rate>
                  </span>
                  <span v-else="">/</span>
                </template>
              </el-table-column>
              <el-table-column
                label="房屋特色">
                <template slot-scope="scope">
                  <span v-if="scope.row.house_feature">{{matchDictionary(scope.row.house_feature)}}</span>
                  <span v-else="">/</span>
                </template>
              </el-table-column>
              <el-table-column
                label="建议价格">
                <template slot-scope="scope">
                  <span v-if="scope.row.suggest_price">{{scope.row.suggest_price}}</span>
                  <span v-else="">/</span>
                </template>
              </el-table-column>
              <el-table-column
                label="房屋状态">
                <template slot-scope="scope">
                  <span style="color: #1ecb4e" v-if="scope.row.status==1">已出租</span>
                  <span v-else-if="scope.row.status == 2">待收房</span>
                  <span style="color: #ef4292" v-else="">未出租</span>
                </template>
              </el-table-column>
              <el-table-column
                label="空置期(天)">
                <template slot-scope="scope">
                  <span v-if="scope.row.total_ready_days">{{scope.row.total_ready_days}}</span>
                  <span v-else="">/</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="current_ready_days"
                label="当前空置时长(天)">
                <template slot-scope="scope">
                  <span v-if="scope.row.current_ready_days">{{scope.row.current_ready_days}}</span>
                  <span v-else="">/</span>
                </template>
              </el-table-column>
              <!--<el-table-column-->
                <!--label="是否为二次出租">-->
                <!--<template slot-scope="scope">-->
                  <!--<span v-if="scope.row.is_again_rent>0">是</span>-->
                  <!--<span v-else-if="scope.row.is_again_rent===0">否</span>-->
                  <!--<span v-else="">/</span>-->
                <!--</template>-->
              <!--</el-table-column>-->
              <el-table-column
                label="租房结束是否晚于收房">
                <template slot-scope="scope">
                  <span v-if="scope.row.rent_end_than_days>0">晚于{{scope.row.rent_end_than_days}}天</span>
                  <span v-else-if="scope.row.rent_end_than_days<0">否</span>
                  <span v-else="">/</span>
                </template>
              </el-table-column>

              <el-table-column
                prop="current_ready_days"
                label="剩余合同时长(天)">
                <template slot-scope="scope">
                  <span v-if="scope.row.lord_remainder_days">{{scope.row.lord_remainder_days}}</span>
                  <span v-else="">/</span>
                </template>
              </el-table-column>

              <el-table-column
                label="预警状态">
                <template slot-scope="scope">
                  <div v-if="scope.row.warning_status == 1" class="label success">正常</div>
                  <div v-else-if="scope.row.warning_status == 2" class="label yellow">黄色预警</div>
                  <div v-else-if="scope.row.warning_status == 3" class="label orange">橙色预警</div>
                  <div v-else-if="scope.row.warning_status == 4" class="label red">红色预警</div>
                  <div v-else="">/</div>
                </template>
              </el-table-column>
              <el-table-column
                label="房屋影像">
                <template slot-scope="scope">
                  <a href="javascript:;" @click.stop="searchPic(scope.row.id)">
                    <i style="font-size: 16px" class="el-icon-picture"></i>
                  </a>
                </template>
              </el-table-column>

              <el-table-column
                label="负责人">
                <template slot-scope="scope">
                  <span v-if="scope.row.user&&scope.row.user.name">{{scope.row.user.name}}</span>
                  <span v-else="">/</span>
                </template>
              </el-table-column>
              <el-table-column
                label="所属部门">
                <template slot-scope="scope">
                  <span v-if="scope.row.org&&scope.row.org.name">{{scope.row.org.name}}</span>
                  <span v-else="">/</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="tableBottom">

            <div class="left">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="formInline.page"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="formInline.per_page_number"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalNumber">
              </el-pagination>
            </div>
          </div>
        </div>
        <div class="myDetail">
          <el-tabs type="border-card" v-model="activeName">
            <el-tab-pane name="first" label="跟进记录">
              <FollowRecordTab :changeHouseStatus="changeHouseStatus" :all_dic="all_dic"
                               :houseId="houseId" :activeName="activeName"></FollowRecordTab>
            </el-tab-pane>
            <el-tab-pane name="second" label="装修记录">
              <DecorateRecordTab :changeHouseStatus="changeHouseStatus" :all_dic="all_dic"
                                 :houseId="houseId" :activeName="activeName"></DecorateRecordTab>
            </el-tab-pane>
            <el-tab-pane name="third" label="预警状态调整记录">
              <EarlyWarning :changeHouseStatus="changeHouseStatus" :all_dic="all_dic"
                            :houseId="houseId" :activeName="activeName"></EarlyWarning>
            </el-tab-pane>
            <el-tab-pane name="forth" label="收房合同列表">
              <CollectContractTab :all_dic="all_dic" :collectData="collectData"
                                  :activeName="activeName"></CollectContractTab>
            </el-tab-pane>
            <el-tab-pane name="fifth" label="租房合同列表">
              <RentContractTab :all_dic="all_dic" :collectId="collectId" :rentData="rentData"
                               :activeName="activeName"></RentContractTab>
            </el-tab-pane>
            <el-tab-pane name="sixth" label="报备列表">
              <ReportRecord :all_dic="all_dic" :houseId="houseId" :activeName="activeName"></ReportRecord>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperate="clickEvent"></RightMenu>
    <Organization :organizationDialog="organizationDialog" :length="length" :type="type"
                  @selectMember="selectMember" @close="closeModal"></Organization>

    <EditHouseInfo :editHouseDialog="editHouseDialog" :houseDetail="houseDetail" :houseId="houseId"
                   @close="closeModal"></EditHouseInfo>
    <AddFollow :addFollowDialog="addFollowDialog" :houseId="houseId" @close="closeModal"></AddFollow>
    <UpLoadPic :upLoadDialog="upLoadDialog" :houseId="houseId" @close="closeModal"></UpLoadPic>
    <AddEarlyWarning :addEarlyWarningDialog="addEarlyWarningDialog" :houseId="houseId"
                     @close="closeModal"></AddEarlyWarning>
    <AddDecorate :addDecorateDialog="addDecorateDialog" :houseId="houseId" @close="closeModal"></AddDecorate>

    <HouseDetail :houseDetailDialog="houseDetailDialog" :all_dic="all_dic" :isOnlyPic="isOnlyPic"
                 :houseDetail="houseDetail" :houseId="houseId" @close="closeModal"></HouseDetail>

  </div>
</template>

<script>
  import RightMenu from '../../common/rightMenu.vue'
  import Organization from '../../common/organization.vue'
  import FollowRecordTab from './components/followRecordTab.vue'
  import DecorateRecordTab from './components/decorateRecordTab.vue'
  import EarlyWarning from './components/earlyWarningTab.vue'
  import CollectContractTab from './components/collectContractTab.vue'
  import RentContractTab from './components/rentContractTab.vue'
  import ReportRecord from './components/reportRecord'

  import EditHouseInfo from './components/editHouseInfo.vue'
  import AddFollow from './components/addFollowRecord.vue'
  import UpLoadPic from './components/upLoadPic.vue'
  import AddEarlyWarning from './components/addEarlyWarning.vue'
  import AddDecorate from './components/addDecorateRecord.vue'
  import HouseDetail from './components/houseDetail.vue'
  export default {
    name: 'hello',
    components: {
      RightMenu, Organization, FollowRecordTab, DecorateRecordTab, EarlyWarning, EditHouseInfo, HouseDetail,
      AddFollow, UpLoadPic, AddEarlyWarning, AddDecorate, CollectContractTab, RentContractTab,ReportRecord
    },
    data () {
      return {
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],
        /***********/
        formInline: {
          q: '',
          per_page_number: 5,
          page: 1,
          status: '',
          org_id: '',
          is_nrcy: 0,
          is_lord: 1,
        },
        department_name: '',
        length: '',
        type: '',

        tableData: [],
        totalNumber: 0,
        options: [],

        //模态框
        organizationDialog: false,
        editHouseDialog: false,
        addFollowDialog: false,
        upLoadDialog: false,
        addEarlyWarningDialog: false,
        addDecorateDialog: false,
        houseDetailDialog: false,

        isHigh: false,
        activeName: 'first',

        emptyContent: ' ',
        tableLoading: false,
        dicts: {
          room: ['', '1室', '2室', '3室', '4室', '5室', '6室', '7室', '8室'],
          hall: ['无', '1厅', '2厅', '3厅', '4厅', '5厅'],
          toilet: ['无', '1卫', '2卫', '3卫', '4卫', '5卫'],
        },
        all_dic: [],        //装修

        houseId: '',
        isOnlyPic: false,

        houseDetail: {},
        collectData: [],
        rentData: [],
        collectId: '',
        houseStatus: {},
        operateArray: [],    //选中数组
        organizationType: '',
        changeHouseStatus: false,
      }
    },
    mounted(){
      this.getData();
      this.getDictionary();
      this.getCharts();
//      $('.earlyWarning .warningItem').click(function () {
//        $(this).addClass('selected_tr').siblings().removeClass('selected_tr');
//      });
    },
    methods: {
      getDictionary() {
        this.$http.get(globalConfig.server + 'setting/dictionary/all').then((res) => {
          this.all_dic = res.data.data;
        })
      },

      matchDictionary(id) {
        let dictionary_name = null;
        this.all_dic.map((item) => {
          if (item.id == id) {
            dictionary_name = item.dictionary_name;
          }
        });
        return dictionary_name;
      },
      getData(){
        this.emptyContent = ' ';
        this.tableLoading = true;
        this.$http.get(globalConfig.server_user + 'houses', {params: this.formInline}).then((res) => {
          this.tableLoading = false;
          if (res.data.status === 'success') {
            this.totalNumber = res.data.meta.total;
            if (res.data.data.length > 0) {
              this.tableData = res.data.data;
              if (!this.houseId) {
                this.houseId = res.data.data[0].id;
              }
            } else {
              this.tableData = [];
              this.emptyContent = '暂无数据';
            }
          } else {
            this.tableData = [];
            this.totalNumber = 0;
            this.emptyContent = '暂无数据';
          }
        })
      },
      getCharts(){
        this.$http.get(globalConfig.server_user + 'charts').then((res) => {
          if (res.data.status === 'success') {
            this.houseStatus = res.data.data.house;
          }
        })
      },
      //复选框变化
      handleSelectionChange(val){
        this.operateArray = [];
        if (val.length > 0) {
          val.forEach((item) => {
            this.operateArray.push(item.id);
          })
        }
      },
      //*****************************高级搜索/各种搜索项****************************//
      highGrade(){
        this.isHigh = !this.isHigh;
      },
      resetting(){
        this.formInline.org_id = '';
        this.department_name = '';
        this.formInline.status = '';
      },
      search(){
        this.isHigh = false;
        this.houseId = '';
        this.formInline.page = 1;
        this.getData();
      },

      handleSizeChange(val) {
        this.formInline.per_page_number = val;
        this.getData();
      },
      handleCurrentChange(val) {
        this.formInline.page = val;
        this.houseId = '';
        this.getData();
      },

      //选人模态框
      openOrganizationModal(val){
        this.organizationDialog = true;
        this.organizationType = val;
        this.type = 'depart';
        this.length = 1;
      },

      selectMember(val){
        this.organizationDialog = false;
        if (this.organizationType === 'dispatch') {
          this.$confirm('分配后将不可撤回, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.dispatchHouse(val[0].id)
          }).catch(() => {
            this.$notify.success({
              title: '消息',
              message: '已取消分配',
            })
          });
        } else {
          this.formInline.org_id = val[0].id;
          this.department_name = val[0].name;
        }
      },
      //分配房屋
      dispatchHouse(departId){
        let object = {};
        let update = {};
        let org = {org_id: departId};
        this.operateArray.forEach((item) => {
          object[item] = org;
        });
        update.update = object;
        this.$http.post(globalConfig.server_user + 'houses/batch', {'batch': JSON.stringify(update)}).then((res) => {
          if (res.data.status === 'success') {
            this.$notify.success({
              title: '成功',
              message: '操作成功',
            });
            this.getData();
          }
        })
      },
      //************************************************************************/
      clickTable(row, event){
        this.houseId = row.id;
        this.collectData = row.lords;
        if (this.collectData.length > 0) {
          this.collectId = this.collectData[0].id;
        }
        this.rentData = row.renters;
      },
      tableRowCollectName({row, rowIndex}) {
        if (row.id === this.houseId) {
          return 'selected_tr';
        }
        return '';
      },
      //*****************************右键操作****************************//
      searchPic(id){
        this.isOnlyPic = true;
        this.houseId = id;
        this.houseDetailDialog = true;
      },
      dblClickTable(row, event){
        this.isOnlyPic = false;
        this.houseId = row.id;
        this.houseDetail = row;
        this.houseDetailDialog = true;
      },

      //房屋右键
      houseMenu(row, event){
        this.houseId = row.id;
        this.houseDetail = row;
        this.collectData = row.lords;
        if (this.collectData.length > 0) {
          this.collectId = this.collectData[0].id;
        }
        this.rentData = row.renters;
        this.lists = [
          {clickIndex: 'edit', headIcon: 'el-icon-edit', label: '编辑房屋属性',},
          {clickIndex: 'upLoadDialog', headIcon: 'el-icon-upload2', label: '上传房屋照片',},
          {clickIndex: 'addFollowDialog', headIcon: 'iconfont icon-tianjiagengjinjilu', label: '添加跟进记录',},
          {clickIndex: 'addDecorateDialog', headIcon: 'iconfont icon-tianjiazhuangxiujilu', label: '添加装修记录',},
          {
            clickIndex: 'addEarlyWarningDialog',
            headIcon: 'iconfont icon-tianjiayujingjilu',
            label: '添加预警状态',
            disabled: row.status
          },
        ];
        this.contextMenuParam(event);
      },

      //右键回调时间
      clickEvent (index) {
        this.changeHouseStatus = false;
        switch (index) {
          case 'edit' :
            this.editHouseDialog = true;
            break;
          case 'addFollowDialog' :
            this.addFollowDialog = true;
            break;
          case 'upLoadDialog' :
            this.upLoadDialog = true;
            break;
          case 'addEarlyWarningDialog' :
            this.addEarlyWarningDialog = true;
            break;
          case 'addDecorateDialog' :
            this.addDecorateDialog = true;
            break;
        }
      },
      closeModal(val){
        this.editHouseDialog = false;
        this.addFollowDialog = false;
        this.organizationDialog = false;
        this.upLoadDialog = false;
        this.addEarlyWarningDialog = false;
        this.addDecorateDialog = false;
        this.houseDetailDialog = false;
        if (val === 'success') {
          this.getData();
        } else if (val === 'success_tab_first') {
          this.activeName = 'first';
          this.changeHouseStatus = true;
          this.getData();
        } else if (val === 'success_tab_second') {
          this.activeName = 'second';
          this.changeHouseStatus = true;
          this.getData();
        } else if (val === 'success_tab_third') {
          this.activeName = 'third';
          this.changeHouseStatus = true;
          this.getData();
          this.getCharts();
        }
      },
      //关闭右键菜单
      closeMenu(){
        this.show = false;
      },

      //右键参数
      contextMenuParam(event){
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

      refreshList(){
        this.formInline = {
          q: '',
          per_page_number: 5,
          page: 1,
          status: '',
          org_id: '',
          is_nrcy: 0,
          is_lord: 1,
        };
        this.department_name = '';
        this.getData();
        this.getCharts();
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="">
  #houseContainer {
    .earlyWarning {
      button {
        cursor: default;
        color: #666;
        :hover {
          /*color: #6a8dfb;*/
        }
      }
    }
    .label {
      display: inline-block;
      width: 70px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      border-radius: 4px;
      color: #ffffff;
    }
    .success {
      background: #409EFF;
    }
    .yellow {
      background: #FFCC00
    }
    .orange {
      background: #FF9900
    }
    .red {
      background: #FF3900
    }
    .main {
      font-size: 12px;
      .tableBox {
        border: 1px solid #dfe6fb;
        margin-bottom: 20px;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
        .myTable {
          .el-table {
            th {
              background-color: #dfe6fb;
            }
          }
        }
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
  }
</style>
