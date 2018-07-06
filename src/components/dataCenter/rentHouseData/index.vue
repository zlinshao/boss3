<template>
  <div @click="show=false" @contextmenu="closeMenu">
    <div>
      <div class="highRanking" style=" position: absolute; top: 120px; right: 20px;">
        <div class="highSearch">
          <el-form :inline="true" onsubmit="return false" size="medium">
            <el-form-item>
              <el-input placeholder="请输入内容" v-model="form.search"
                        @keyup.enter.native="search" size="mini" clearable>
                <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
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
      </div>
      <div class="highRanking">
        <div class="filter high_grade" :class="isHigh? 'highHide':''" style=" margin-top: -40px;">
          <el-form :inline="true" onsubmit="return false" :model="form" size="mini" label-width="100px">
            <div class="filterTitle">
              <i class="el-icons-fa-bars"></i>&nbsp;&nbsp;高级搜索
            </div>
            <el-row class="el_row_border">
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">房屋地址</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-input readonly="" v-model="form.department_name" @focus="chooseDepart('search')"
                                placeholder="点击选择">
                        <template slot="append">
                          <div style="cursor: pointer;" @click="emptyDepart('search')">清空</div>
                        </template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">租房签约人</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-input readonly="" v-model="form.department_name" @focus="chooseDepart('search')"
                                placeholder="点击选择">
                        <template slot="append">
                          <div style="cursor: pointer;" @click="emptyDepart('search')">清空</div>
                        </template>
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
                    <div class="el_col_label">报备日期起止范围</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-date-picker
                        v-model="form.month"
                        type="daterange"
                        value-format="yyyy-MM-dd"
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
                    <div class="el_col_label">收房片区</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-input readonly="" v-model="form.department_name" @focus="chooseDepart('search')"
                                placeholder="点击选择">
                        <template slot="append">
                          <div style="cursor: pointer;" @click="emptyDepart('search')">清空</div>
                        </template>
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
                    <div class="el_col_label">签约日期起止范围</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-date-picker
                        v-model="form.month"
                        type="daterange"
                        value-format="yyyy-MM-dd"
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
                    <div class="el_col_label">是否中介单</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-select v-model="form.agency" placeholder="请选择">
                        <el-option key="1" label="是" value="1">是</el-option>
                        <el-option key="0" label="否" value="0">否</el-option>
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
        <div class="myHouse">
          <div class="blueTable">
            <el-table
              :data="tableData"
              :empty-text='tableStatus'
              v-loading="tableLoading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(255, 255, 255, 0)"
              style="width: 100%"><!--@row-contextmenu='openContextMenu'-->
              <el-table-column
                label="报备日期"
                prop="department_name">
              </el-table-column>
              <el-table-column
                label="补充信息"
                prop="leader_name">
              </el-table-column>
              <el-table-column
                label="炸单情况"
                prop="month">
              </el-table-column>
              <el-table-column
                label="是否中介单"
                prop="month">
              </el-table-column>
              <el-table-column
                label="签约日期"
                prop="month">
              </el-table-column>
              <el-table-column
                label="尾款时间"
                prop="month">
              </el-table-column>
              <el-table-column
                label="房屋地址"
                prop="month">
              </el-table-column>
              <el-table-column
                label="房屋类型"
                prop="month">
              </el-table-column>
              <el-table-column
                label="月单价"
                prop="month">
              </el-table-column>
              <el-table-column
                label="付款方式"
                prop="month">
              </el-table-column>
              <el-table-column
                label="签约时长"
                prop="month">
              </el-table-column>
              <el-table-column
                label="总金额"
                prop="month">
              </el-table-column>
              <el-table-column
                label="租房签约人"
                prop="month">
              </el-table-column>
              <el-table-column
                label="租房片区"
                prop="month">
              </el-table-column>
              <el-table-column
                label="已收定金">
                <template slot-scope="scope">
                  {{scope.row.memo}}
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="tableBottom">
            <div class="left">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="form.page"
                :page-size="form.limit"
                layout="total, prev, pager, next, jumper"
                :total="totalNum">
              </el-pagination>
            </div>
          </div>
        </div>

        <div style="margin-top: 10px;">
          <el-tabs type="border-card">
            <el-tab-pane label="公司总计">
              <div class="myHouse">
                <div class="blueTable">
                  <el-table
                    :data="tableData"
                    :empty-text='tableStatus'
                    v-loading="tableLoading"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(255, 255, 255, 0)"
                    @row-contextmenu='openContextMenu'
                    style="width: 100%">
                    <el-table-column
                      label="租房套数"
                      prop="department_name">
                    </el-table-column>
                    <el-table-column
                      label="租房业绩"
                      prop="leader_name">
                    </el-table-column>
                  </el-table>
                </div>
                <!--<div class="tableBottom">-->
                <!--<div class="left">-->
                <!--<el-pagination-->
                <!--@size-change="handleSizeChange"-->
                <!--@current-change="handleCurrentChange"-->
                <!--:current-page="form.page"-->
                <!--:page-size="form.limit"-->
                <!--layout="total, prev, pager, next, jumper"-->
                <!--:total="totalNum">-->
                <!--</el-pagination>-->
                <!--</div>-->
                <!--</div>-->
              </div>
            </el-tab-pane>
            <el-tab-pane v-for="item in cityCategory" :label="item.dictionary_name" :key="item.id">
              <div class="myHouse">
                <div class="blueTable">
                  <el-table
                    :data="tableData"
                    :empty-text='tableStatus'
                    v-loading="tableLoading"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(255, 255, 255, 0)"
                    @row-contextmenu='openContextMenu'
                    style="width: 100%">
                    <el-table-column
                      label="片区"
                      prop="department_name">
                    </el-table-column>
                    <!--<el-table-column-->
                      <!--label="负责人"-->
                      <!--prop="leader_name">-->
                    <!--</el-table-column>-->
                    <el-table-column
                      label="租房套数"
                      prop="leader_name">
                    </el-table-column>
                    <el-table-column
                      label="租房业绩"
                      prop="leader_name">
                    </el-table-column>
                  </el-table>
                </div>
                <!--<div class="tableBottom">-->
                <!--<div class="left">-->
                <!--<el-pagination-->
                <!--@size-change="handleSizeChange"-->
                <!--@current-change="handleCurrentChange"-->
                <!--:current-page="form.page"-->
                <!--:page-size="form.limit"-->
                <!--layout="total, prev, pager, next, jumper"-->
                <!--:total="totalNum">-->
                <!--</el-pagination>-->
                <!--</div>-->
                <!--</div>-->
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>

    </div>
    <Organization :organizationDialog="organizationDialog" :type="organizeType" @close="closeOrganization"
                  @selectMember="selectMember"></Organization>
    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperate="clickEvent"></RightMenu>
  </div>
</template>
<script>
  import RightMenu from '../../common/rightMenu.vue';    //右键
  import Organization from '../../common/organization.vue';  //组织架构

  export default {
    components: {Organization, RightMenu},
    data() {
      return {
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],
        isHigh: false,
        tableData: [],
        totalNum: 0,
        tableStatus: ' ',
        tableLoading: false,
        form: {
          page: 1,
          limit: 12,
          org_id: '',  //部门搜索
          department_name: '',
          month: [],  //时间范围
          target_sort: '',  //排序  0 升序 1降序
          search: '',
          agency: '',
        },
        organizationDialog: false,
        organizeType: '',
        currentStatus: '',
        cityCategory: [],
      };
    },
    mounted(){
      this.getCityCategory();
    },
    activated() {
      this.getTableData();
    },
    watch: {

    },
    methods: {
      getCityCategory(){
        this.dictionary(306, 1).then((res)=>{
          this.cityCategory = res.data;
        });
      },
      // 导出
      exportData() {
        // this.$http.get(globalConfig.server + 'salary/achv/export', {responseType: 'arraybuffer'}).then((res) => { // 处理返回的文件流
        //   if (!res.data) {
        //     return;
        //   }
        //   console.log(res);
        //   let url = window.URL.createObjectURL(new Blob([res.data]));
        //   let link = document.createElement('a');
        //   link.style.display = 'a';
        //   link.href = url;
        //   link.setAttribute('download', 'excel.xlsx');
        //   document.body.appendChild(link);
        //   link.click();
        // });
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
          this.show = true
        })
      },
      //右键菜单
      openContextMenu(row, event) {
        this.achievementId = row.id;
        this.lists = [
          // {
          //   clickIndex: "edit",
          //   headIcon: "el-icon-edit",
          //   label: "编辑"
          // },
          // {
          //   clickIndex: "delete",
          //   headIcon: "el-icon-delete",
          //   label: "删除"
          // },
        ];
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
      //右键回调事件
      clickEvent(index) {
        switch (index) {
          case 'edit':
            break;
          case 'delete':
            break;
        }
      },
      chooseDepart(val) {
        this.organizationDialog = true;
        this.organizeType = 'depart';
        this.currentStatus = val;
      },
      closeOrganization() {
        this.organizationDialog = false;
        this.organizeType = '';
        this.currentStatus = '';
      },
      selectMember(val) {
        if (this.currentStatus === 'search') {
          this.form.org_id = val[0].id;
          this.form.department_name = val[0].name;
        } else {
          this.achievementForm.org_id = val[0].id;
          this.achievementForm.department_name = val[0].name;
        }
        this.organizeType = '';
      },
      emptyDepart(val) {
        if (val === 'search') {
          this.form.department_name = '';
          this.form.org_id = '';
        } else {
          this.achievementForm.department_name = '';
          this.achievementForm.org_id = '';
        }
      },
      search() {
        this.form.page = 1;
        this.getTableData();
      },
      getTableData() {
        // this.tableStatus = ' ';
        // this.tableLoading = true;
        // this.$http.get(globalConfig.server + 'performance/index', {params: this.form}).then((res) => {
        //   this.tableLoading = false;
        //   this.isHigh = false;
        //   if (res.data.code === '20000') {
        //     this.tableData = res.data.data.data;
        //     this.totalNum = res.data.data.count;  //记录总条数
        //     if (res.data.data.length < 1) {
        //       this.tableStatus = '暂无数据';
        //       this.totalNum = 0;
        //       this.tableData = [];
        //     }
        //   } else {
        //     this.tableStatus = '暂无数据';
        //     this.totalNum = 0;
        //     this.tableData = [];
        //   }
        // });
      },
      handleSizeChange(val) {
      },
      handleCurrentChange(val) {
        this.form.page = val;
        this.getTableData();
      },
      // 高级
      highGrade() {
        this.isHigh = !this.isHigh;
      },
      // 重置
      resetting() {
        this.form.org_id = '';
        this.form.department_name = '';
        this.form.month = [];
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="">
  .tableBottom {
    padding: 8px;
    display: flex;
    justify-content: flex-end;
  }
</style>
