<template>
  <div @click="show=false" @contextmenu="closeMenu">
    <div>
      <div class="highRanking">
        <div class="top_words" style="float: left;line-height: 38px;margin-left: 30px;">
          <span>入职人数： 人</span>&nbsp;&nbsp;&nbsp;
          <span>复职人数： 人</span>&nbsp;&nbsp;&nbsp;
          <span>离职人数： 人</span>&nbsp;&nbsp;&nbsp;
          <span>调岗人数： 人</span>&nbsp;&nbsp;&nbsp;
          <span>转正人数： 人</span>&nbsp;&nbsp;&nbsp;
          <span>共计人数： 人</span>&nbsp;&nbsp;&nbsp;
        </div>
        <div class="highSearch">
          <el-form :inline="true" onsubmit="return false" size="mini">
            <el-form-item>
              <el-button class="iconfont icon-zhengchangliebiao" @click="params.altogether=!params.altogether"
                         :disabled="params.altogether"
                         style="font-size: 12px;"
                         size="mini" type="primary" plain>共计
              </el-button>
              <el-button class="iconfont icon-liebiaozhankai" @click="params.altogether=!params.altogether"
                         :disabled="!params.altogether"
                         style="font-size: 12px;"
                         size="mini" type="primary" plain>部门
              </el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="filter high_grade" :class="isHigh? 'highHide':''">
          <el-form :inline="true" onsubmit="return false" size="mini" label-width="100px">
            <div class="filterTitle">
              <i class="el-icons-fa-bars"></i>&nbsp;&nbsp;高级搜索{{params}}
            </div>
            <el-row class="el_row_border">
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">时间</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-date-picker
                        v-model="params.time"
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
              <el-col :span="12" v-if="params.altogether">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">操作人</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-input v-model="operator_name" @focus="openOrganizeModal('staff')" placeholder="请选择"
                                readonly>
                        <template slot="append">
                          <div style="cursor: pointer;" @click="emptyOrganization('staff')">清空</div>
                        </template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12" v-if="!params.altogether">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">部门</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-input v-model="org_name" @focus="openOrganizeModal('depart')" placeholder="请选择"
                                readonly>
                        <template slot="append">
                          <div style="cursor: pointer;" @click="emptyOrganization('depart')">清空</div>
                        </template>
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
            :empty-text='tableStatus'
            v-loading="tableLoading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(255, 255, 255, 0)"
            :data="tableData"
            @row-dblclick="dblClickTable"
            style="width: 100%">
            <el-table-column
              prop="created_at"
              label="时间">
            </el-table-column>
            <el-table-column
              prop="bulletin"
              label="入职人数">
            </el-table-column>
            <el-table-column
              prop="name"
              label="复职人数">
            </el-table-column>
            <el-table-column
              prop="house_name"
              label="离职人数">
            </el-table-column>
            <el-table-column
              prop="place"
              label="调岗人数">
            </el-table-column>
            <el-table-column
              prop="finish_at"
              label="转正人数">
            </el-table-column>
            <el-table-column
              v-if="params.altogether"
              prop="finish_at"
              label="操作人">
            </el-table-column>
            <el-table-column
              v-if="!params.altogether"
              prop="finish_at"
              label="部门">
            </el-table-column>
          </el-table>
          <div class="block pages">
            <div class="left">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-size="15"
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

    <Organization :organizationDialog="organizationDialog" :type="organizeType"
                  @close='closeOrganize' @selectMember="selectMember"></Organization>

  </div>
</template>

<script>
  import RightMenu from '../../../common/rightMenu.vue'
  import Organization from '../../../common/organization.vue'

  export default {
    name: 'hello',
    components: {RightMenu, Organization},
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
          limit: 12,
          time: [],
          operator_id: '',
          org_id: '',
          altogether: true,  //true为共计，false为部门
        },
        operator_name: '',
        org_name: '',
        tableData: [],
        //模态框
        organizationDialog: false,
        organizeType: '',
        tableStatus: ' ',
        tableLoading: false,

        sign_date: [],
      }
    },
    watch: {
      "params.altogether": {
        deep: true,
        handler(val, oldVal) {
          if(val){
            this.emptyOrganization('depart');
          }else{
            this.emptyOrganization('staff');
          }
          this.params.page = 1;
          this.search();
        }
      },
    },
    created() {
      let Nowdate = new Date();
      let year = new Date(Nowdate).getFullYear();
      let month = new Date(Nowdate).getMonth();
      let month1 = new Date(Nowdate).getMonth() + 1;
      let date = new Date(Nowdate).getDate();
      let date1 = new Date(Nowdate).getDate()+1;
      if (month < 10) month = "0" + month;
      if (month1 < 10) month1 = "0" + month1;
      if (date < 10) date = "0" + date;
      if (date1 < 10) date1 = "0" + date1;
      // this.params.time = [new Date(year, month, date), new Date(year, month, date)];
      this.sign_date[0] = year + "-" + month1 + "-" + date;
      this.sign_date[1] = year + "-" + month1 + "-" + date1;
      this.params.time = this.sign_date;
      this.getTableData();
    },
    methods: {
      //获取列表数据
      getTableData() {
        // this.tableLoading = true;
        // this.tableStatus = ' ';
        // this.isHigh = false;
        // this.$http.get(globalConfig.server_user + 'process', {params: this.params}).then((res) => {
        //   this.tableLoading = false;
        //   if (res.data.code === '10000') {
        //     this.tableData = res.data.data.data;
        //     this.totalNum = res.data.data.count;
        //   } else {
        //     this.tableData = [];
        //     this.totalNum = 0;
        //     this.tableStatus = '暂无数据';
        //     this.$notify.warning({
        //       title: '警告',
        //       message: res.data.msg
        //     });
        //   }
        // });
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.params.page = val;
        this.getTableData();
      },
      dblClickTable(row, event) { },
      //调出选人组件
      openOrganizeModal(val) {
        this.organizationDialog = true;
        this.organizeType = val;
      },
      emptyOrganization(val) {
        if (val === 'staff') {
          this.params.operator_id = '';
          this.operator_name = '';
        } else {
          this.params.org_id = '';
          this.org_name = '';
        }
      },
      selectMember(val) {
        if (this.organizeType === 'staff') {
          this.params.operator_id = val[0].id;
          this.operator_name = val[0].name;
        } else {
          this.params.org_id = val[0].id;
          this.org_name = val[0].name;
        }
        this.organizeType = '';
      },
      highGrade() {
        this.isHigh = !this.isHigh;
      },
      search() {
        this.getTableData();
      },
      resetting() {
        this.params.time = this.sign_date;
        this.params.operator_id = '';
        this.params.org_id = '';
        this.operator_name = '';
        this.org_name = '';
        this.search();
      },
      //右键回调事件
      clickEvent(index) {
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
      },

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="">
  .main {
    min-height: 200px;
  }
</style>
