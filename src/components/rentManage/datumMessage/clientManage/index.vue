<template>
  <div>
    <div id="clientContainer" @click="show=false" @contextmenu="closeMenu">

      <div class="highRanking">
        <div class="highSearch">
          <el-form :inline="true" size="mini">
            <el-form-item>
              <el-input v-model="formInline.search" placeholder="搜索" @clear="search" clearable  >
                <!-- <el-select v-model="formInline.select" clearable style="width:100px"  slot="prepend" placeholder="请选择">
                  <el-option label="客户" value="1"></el-option>
                  <el-option label="负责人" value="2"></el-option>
                  <el-option label="用户电话" value="3"></el-option>
                  <el-option label="证件号" value="4"></el-option>
                </el-select> -->
                <el-button slot="append" type="primary" icon="el-icon-search" @click="search"></el-button>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
            </el-form-item>
            <!-- <el-form-item>
              <el-button type="success">导出房源</el-button>
            </el-form-item> -->
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
                    <div class="el_col_label">选择负责人</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-input  v-model="staff_name" @focus="selectDep" placeholder="请选择负责人" readonly>
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
              :empty-text = 'rentStatus'
              v-loading="rentLoading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(255, 255, 255, 0)"              
              @row-dblclick="dblClickTable"
              @row-contextmenu='openContextMenu'
              @row-click="clickTable"
              style="width: 100%">
              <el-table-column
                prop="created_at"
                label="录入时间">
              </el-table-column>
              <el-table-column
                prop="name"
                label="客户名称">
              </el-table-column>
              <el-table-column
                prop="phone"
                label="手机号">
              </el-table-column>
              <el-table-column
                label="客户身份">
                <template slot-scope="scope">
                  <span v-if="scope.row.renters.length>0 && scope.row.lords.length==0">租客</span>
                  <span v-if="scope.row.renters.length==0 && scope.row.lords.length>0">房东</span>
                  <span v-if="scope.row.renters.length>0 && scope.row.lords.length>0">租客/房东</span>
                  <span v-if="scope.row.renters.length==0 && scope.row.lords.length==0">暂无数据</span>
                </template>     
              </el-table-column>
              <el-table-column
                label="证件号">
                <template slot-scope="scope">
                  <span v-if="scope.row.idcard">{{scope.row.idcard}}</span>
                  <span v-else>暂无数据</span>       
                </template>            
              </el-table-column>
              <el-table-column
                label="个人/中介">
                <template slot-scope="scope">
                  <span v-if="scope.row.is_agent == 0">个人</span>
                  <span v-if="scope.row.is_agent == 1">中介</span>
                </template>                 
              </el-table-column>
              <el-table-column
                label="负责人">
                <template slot-scope="scope">
                  <span v-if="scope.row.user">{{scope.row.user.name}}</span>
                  <span v-else>暂无数据</span>
                </template>    
              </el-table-column>
              <el-table-column
                prop="date"
                label="所属部门">
              </el-table-column>
            </el-table>
          </div>
          <div class="tableBottom">
            <div class="left">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="formInline.page"
                :page-size="12"
                layout="total, prev, pager, next, jumper"
                :total="parseInt(totalNumber)">
              </el-pagination>
            </div>
          </div>
        </div>

      </div>
    </div>
    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperate="clickEvent"></RightMenu>    
    <Remind :remindDialog="remindDialog" :sendId="sendId" :totalNumber="num" :sendName="sendName" @close="closeRemind"></Remind>
    <CustomerDetail :customerDetailDialog="customerDetailDialog" :activeId="activeId" @close="closeModal"></CustomerDetail>
    <Organization :organizationDialog="organizeDialog" :length="length" :type="type" 
                  @selectMember="selectMember" @close="closeOrganization"></Organization>
  </div>
</template>

<script>
import RightMenu from "../../../common/rightMenu.vue";
import Remind from "./components/remind.vue";
import CustomerDetail from "./components/customerDetail.vue";
import Organization from "../../../common/organization.vue";
export default {
  name: "hello",
  components: { RightMenu,Organization, Remind, CustomerDetail },
  data() {
    return {
      rightMenuX: 0,
      rightMenuY: 0,
      show: false,
      lists: [],
      /***********/
      //模态框
      organizeDialog: false,
      type:'',
      formInline: {
        search: "",
        limit: 12,
        page: 1 ,
        user_id:''
      },
      staff_name:'',
      sendId: "",
      num:0,
      sendName:"",
      totalNumber: 0,
      tableData: [],
      length:"",

      //模态框
      isHigh: false,
      remindDialog: false,
      customerDetailDialog: false,
      activeId: "",
      rentStatus:' ',
      rentLoading:false,
    };
  },
  mounted() {
    this.getCustomer();
  },
  methods: {
    handleSizeChange(val) {
      //console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      //console.log(`当前页: ${val}`);
      this.formInline.page = val;
      this.getCustomer();
    },
    clickTable(row, event, column) {
      //console.log(row, event, column)
    },
    closeRemind() {
      this.remindDialog = false;
    },
    highGrade() {
      this.isHigh = !this.isHigh;
    },
    resetting() {
      this.formInline= {
        search: "",
        limit: 12,
        page: 1 ,
        user_id:''
      }
      this.staff_name= '';
         this.sendId = "";
        this.sendName = "";     
    },
    // 人资搜索
    selectDep() {
      this.organizeDialog = true;
      this.type = 'staff';
      this.length = 1;
    },
      closeOrganization(){
        this.organizeDialog = false
      },
    // 确认部门
    selectMember(val) {
      this.organizeDialog = false;
      if (val[0].hasOwnProperty("avatar")) {
        this.staff_name = val[0].name;
        this.formInline.user_id = val[0].id;
        this.sendId = val[0].id;
        this.sendName = val[0].name;
      }
    },
    //右键
    openContextMenu(row, event) {
      console.log(row)
      this.lists = [
        { clickIndex: "remindDialog", headIcon: "el-icon-bell", label: "短信发送" }
      ];
      this.contextMenuParam(event);
    },

    //右键回调时间
    clickEvent(index) {
      this.show = false;
      this.remindDialog = true;
      this.num=this.totalNumber;
    },
    closeRemind() {
      this.remindDialog = false;
    },
    //关闭右键菜单
    closeMenu() {
      this.show = false;
    },

    //右键参数
    contextMenuParam(event) {
      //param: user right param
      let e = event || window.event; //support firefox contextmenu
      this.show = false;
      this.rightMenuX =
        e.clientX +
        document.documentElement.scrollLeft -
        document.documentElement.clientLeft;
      this.rightMenuY =
        e.clientY +
        document.documentElement.scrollTop -
        document.documentElement.clientTop;
      event.preventDefault();
      event.stopPropagation();
      this.$nextTick(() => {
        this.show = true;
      });
    },
    //客户信息
    getCustomer() {
      this.rentStatus = " ";
      this.rentLoading = true;      
      this.$http
        .get(globalConfig.server + "core/customer", { params: this.formInline })
        .then(res => {
          this.rentLoading = false;
          if (res.data.code === "10000") {
            this.tableData = res.data.data.data;
            this.totalNumber = res.data.data.total;
          }else{
            this.rentStatus = '暂无数据';
            this.totalNumber = 0;
          }
        });
    },
    search() {
      this.formInline.page = 1;
      this.isHigh = false;
      this.getCustomer();
    },
    dblClickTable(row, event) {
      this.activeId = row.id;
      this.customerDetailDialog = true;
    },
    closeModal(val) {
      this.customerDetailDialog = false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="">
#clientContainer {
  .main {
    font-size: 12px;
    .tableBox {
      border: 1px solid #dfe6fb;
      margin-bottom: 20px;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
      .tableBottom {
        padding: 8px;
        display: flex;
        justify-content: flex-end;
      }
    }
  }
}
</style>
