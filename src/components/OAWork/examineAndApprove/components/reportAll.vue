<template>
  <div @click="show=false" @contextmenu="closeMenu">
    <div>
      <div class="highRanking" style=" position: absolute;width: 100%; top: 122px; right: 20px;">
        <div class="tabsSearch">
          <el-form :inline="true" onsubmit="return false" size="mini">
            <el-form-item>
              <el-input v-model="params.q" placeholder="房屋地址" @keyup.enter.native="search" clearable>
                <el-button slot="append" type="primary" @click="search" icon="el-icon-search"></el-button>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="highRanking">
        <div class="filter high_grade" :class="isHigh? 'highHide':''" style=" margin-top: -40px;">
          <el-form :inline="true" onsubmit="return false" size="mini" label-width="100px">
            <div class="filterTitle">
              <i class="el-icons-fa-bars"></i>&nbsp;&nbsp;高级搜索
            </div>
            <el-row class="el_row_border">
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">开始时间</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-date-picker
                        v-model="params.start_time"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="开始日期">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">结束时间</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-date-picker
                        v-model="params.end_time"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="结束日期">
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
                    <div class="el_col_label">报备类型</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-select clearable v-model="params.processable_type" placeholder="请选择报备类型" value="">
                        <el-option v-for="item in processableType" :label="item.name" :value="item.key"
                                   :key="item.key"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">所属部门</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-input v-model="department_name" @focus="openOrganizeModal" placeholder="请选择" readonly="">
                        <el-button slot="append" type="primary" @click="emptyDepart">清空</el-button>
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
        <div>
          <el-table
            :cell-style="changeStyle"
            :empty-text='tableStatus'
            v-loading="tableLoading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(255, 255, 255, 0)"
            :data="tableData"
            @row-dblclick="dblClickTable"
            :row-class-name="rowBackground"
            :cell-class-name="colTag"
            style="width: 100%">
            <el-table-column
              label="#"
              width="40">
            </el-table-column>
            <el-table-column
              prop="created_at"
              label="发起时间">
            </el-table-column>
            <el-table-column
              prop="bulletin"
              label="报备类型">
            </el-table-column>
            <el-table-column
              prop="name"
              label="报备人">
            </el-table-column>
            <el-table-column
              prop="house_name"
              label="房屋地址">
            </el-table-column>
            <el-table-column
              label="归属公司"
            >
              <template slot-scope="scope">
                <span style="color: #525252;" v-if="house_name && scope.row.house_id && house_name[scope.row.house_id]">{{ house_name[scope.row.house_id].corp_name }}</span>
                <span style="color: #525252;" v-else>暂无</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="places"
              label="状态">
              <template slot-scope="scope">
                <el-tag :type="statusStyle(scope.row)" size="mini">{{ scope.row.places }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="finish_at"
              label="完成时间">
            </el-table-column>
          </el-table>
          <div class="block pages">
            <div class="left">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-size="12"
                layout="total, prev, pager, next, jumper"
                :total="totalNum">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperate="clickEvent"></RightMenu>

    <Organization :organizationDialog="organizationDialog" :type="organType"
                  @close='closeOrganize' @selectMember="selectMember" :length="length"></Organization>

    <!--报备详情-->
    <ReportDetail :module="reportModule" :reportId="reportID" @close="closeFrame"></ReportDetail>
  </div>
</template>

<script>
  import RightMenu from '../../../common/rightMenu.vue'
  import Organization from '../../../common/organization.vue'

  import ReportDetail from '../../../reportManage/components/editReportDetail'          //报备详情
  export default {
    name: 'hello',
    props: ['active'],
    components: {RightMenu, Organization, ReportDetail},
    data() {
      return {
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],
        isHigh: false,
        /***********/
        totalNum: 0,
        params: {
          page: 1,
          is_page: 1,
          q: '',
          processable_type: '', //报备类型
          start_time: '',
          end_time: '',
          org_id: '',
          all: 1,
        },
        reportAllID: [],
        department_name: '',
        processableType: [
          {name:"房屋质量报备", key: "bulletin_quality"},
          {name:"收房报备", key: "bulletin_collect_basic"},
          {name:"租房报备", key: "bulletin_rent_basic"},
          {name:"转租报备", key: "bulletin_rent_trans"},
          {name:"续租报备", key: "bulletin_rent_continued"},
          {name:"调租报备", key: "bulletin_change"},
          {name:"未收先租报备", key: "bulletin_rent_RWC"},
          {name:"未收先租确认报备", key: "bulletin_RWC_confirm"},
          {name:"续收报备", key: "bulletin_collect_continued"},
          {name:"充公报备", key: "bulletin_confiscate"},
          {name:"中介费报备", key: "bulletin_agency"},
          {name:"炸单报备", key: "bulletin_lose"},
          {name:"尾款房租报备", key: "bulletin_retainage"},
          {name:"退款报备", key: "bulletin_refund"},
          {name:"退租报备", key: "bulletin_checkout"},
          {name:"特殊事项报备", key: "bulletin_special"},
          {name:"清退报备", key: "bulletin_banish"},
          {name:"租房特殊事项报备", key: "bulletin_special_rent"},
          {name:"收房特殊事项报备", key: "bulletin_special_collect"},
          {name:"房屋质量跟进报备", key: "bulletin_quality_follow"},
          {name:"租房退租报备", key: "bulletin_checkout_rent"},
          {name:"收房退租报备", key: "bulletin_checkout_collect"}
        ],
        tableData: [],
        //模态框
        organizationDialog: false,
        organType: '',
        length: '',
        tableStatus: ' ',
        tableLoading: false,
        reportModule: false,
        reportID: '',
        approveStatus:'',
        house_name: {}
      }
    },
    watch: {
      active(val) {
        if (val === 'sixth') {
          this.resetting();
          this.params.all = 1;
          this.getTableData();
        }
      }
    },
    methods: {
      showCorp(scope) {
        console.log(scope);
      },
      rowBackground({row, rowIndex}) {
        if (this.reportAllID.includes(row.id)) return 'rowBackground';
      },
      colTag({row, column, rowIndex, columnIndex}){
        if(row.is_receipt&&row.is_receipt.id==1&&columnIndex==0){
          return 'colTag'
        }
      },
      statusStyle(val){
        if(val.status=="review"){
          if(val.places=="片区经理审批中"){
            return ""
          }
          return "warning"
        }
        if(val.status=="rejected"){
          return "danger"
        }
        if(val.status=="published"){
          return "success"
        }
        if(val.status=="cancelled"){
          return "info"
        }
      },
      //获取列表数据
      getTableData() {
        this.tableLoading = true;
        this.tableStatus = ' ';
        this.$http.get(globalConfig.server + 'workflow/process', {params: this.params}).then((res) => {
          this.tableLoading = false;
          if (res.data.code === '20000' && res.data.data.data.length !== 0) {
            let data = res.data.data.data;
            this.totalNum = res.data.data.count;
            let dataList = [];
            let house_id = [];
            for (let i = 0; i < data.length; i++) {
              house_id.push(data[i].house_id);
              let user = {};
              if (data[i]) {
                user.house_id = data[i].house_id;
                user.is_receipt = data[i].content.is_receipt;
                user.created_at = data[i].created_at;
                user.finish_at = data[i].finish_at !== null ? data[i].finish_at : '/';
                user.id = data[i].id;
                if (data[i].content) {
                  // user.house_name = (data[i].content.house && data[i].content.house.name) || '/';
                  if (data[i].content.house) {
                    user.house_name = data[i].content.house.name;
                  } else if (data[i].content.address) {
                    user.house_name = data[i].content.address;
                  } else {
                    user.house_name = '/';
                  }
                  user.places = data[i].places.display_name;
                  user.status = data[i].places.status;
                } else {
                  // user.bulletin = data[i].flow.content.staff_name + '的' + data[i].flow.content.bulletin_name || '/';
                  // user.name = data[i].flow.content.staff_name || '';
                  if (data[i].flow.content.house) {
                    user.house_name = data[i].flow.content.house.name;
                  } else if (data[i].flow.content.address) {
                    user.house_name = data[i].flow.content.address;
                  } else {
                    user.house_name = '/';
                  }
                  user.places = data[i].flow.places.display_name;
                  user.status = data[i].flow.places.status;
                }
                if (!data[i].user) {
                  user.bulletin = '';
                  user.name = '';
                }else {
                  user.bulletin = data[i].user.name + '的' + data[i].content.bulletin_name || '/';
                  user.name = data[i].user.name || '';
                }
              } else {
                user.places = '/';
                user.status = '/';
              }
              dataList.push(user);
            }
            this.getName(house_id);
            this.tableData = dataList;
          } else {
            this.tableData = [];
            this.totalNum = 0;
            this.tableStatus = '暂无数据';
          }
        })
      },
      getName(houseIds = []) {
        this.$http.get(globalConfig.server + '/organization/other/house-corp',{
          params:{
            houseIds
          }
        }).then(res=>{
          if(res.data.code == '700120'){
            this.house_name = res.data.data;
          }else {
            this.house_name = {};
          }
        }).catch(err=>{
          console.log(err);
        })
      },
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.params.page = val;
        this.getTableData();
      },
      //房屋右键
      houseMenu(row, event) {
        // this.activeId = row.id;
        // this.lists = [
//          {clickIndex: 'edit', headIcon: 'el-icon-edit', label: '修改',},
//           {clickIndex: 'addChildren', headIcon: 'el-icon-plus', label: '添加子任务',},
//         ];
        this.contextMenuParam(event);
      },
      dblClickTable(row, event) {
        this.reportID = row.id;
        this.reportAllID.push(row.id);
        this.reportAllID = Array.from(new Set(this.reportAllID));
        this.reportModule = true;
      },
      //右键回调事件
      clickEvent(index) {
        switch (index) {
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
      closeOrganize() {
        this.organizationDialog = false;
        this.organType = '';
        this.length = '';
      },
      //调出选人组件
      openOrganizeModal() {
        this.organizationDialog = true;
        this.organType = 'depart';
        this.length = 1;
      },
      selectMember(val) {
        this.department_name = val[0].name;
        this.params.org_id = val[0].id;
      },
      emptyDepart() {
        this.department_name = '';
        this.params.org_id = '';
      },
      highGrade() {
        this.isHigh = !this.isHigh;
      },
      search() {
        this.isHigh = false;
        this.params.page = 1;
        if (this.params.q === '' && this.params.processable_type === '' && this.params.start_time === '' && this.params.end_time === '' && this.params.org_id === '') {
          delete this.params.search;
          this.params.all = 1;
        } else {
          delete this.params.all;
          this.params.search = 1;
        }
        this.getTableData();
      },
      resetting() {
        this.department_name = '';
        this.params = {
          page: 1,
          is_page: 1,
          q: '',
          processable_type: '', //报备类型
          start_time: '',
          end_time: '',
          org_id: '',
        };
      },
      closeFrame(val) {
        this.reportModule = false;
      },
      changeStyle({row, column, rowIndex, columnIndex}) {
        // console.log(row) //表头行标号为0
        // console.log(columnIndex)
        // console.log(1111111111111)
        if(columnIndex === 5){
          if(row.status === 'review'){
            if(row.places === '片区经理审批中'){
              return 'color:blue'
            }else{
              return 'color:orange'
            }
          }
          if(row.status === 'published'){
            return 'color:green'
          }
          if(row.status === 'cancelled'){
            return 'color:gray'
          }
          if(row.status === 'rejected'){
            return 'color:red'
          }
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="">
  .colTag{
    padding: 6px;
    background:url("../../../../assets/images/info.jpg") no-repeat 20px 10px;
    background-size: 20px 20px;
  }
  .rowBackground {
    background-color: #cde0ff;
  }
  .main {
    min-height: 200px;
  }
</style>
