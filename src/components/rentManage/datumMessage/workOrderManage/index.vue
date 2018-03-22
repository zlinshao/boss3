<template>
  <div @click="show=false" @contextmenu="closeMenu">
    <div id="clientContainer">
      <div class="highRanking">
        <div class="highSearch">
          <el-form :inline="true" size="mini">
            <el-form-item>
              <el-input v-model="params.name" placeholder="搜索">
                <el-button slot="append" type="primary" icon="el-icon-search"></el-button>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="success">导出房源</el-button>
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
                    <div class="el_col_label">客户状态</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-select v-model="params.house" clearable placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">客户意向</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-select v-model="params.a" clearable placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row class="el_row_border">
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">客户身份</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-select v-model="params.house" clearable placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">客户来源</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-select v-model="params.a" clearable placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row class="el_row_border">
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">个人/中介</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-select v-model="params.house" clearable placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <div class="btnOperate">
              <el-button size="mini" type="primary">搜索</el-button>
              <el-button size="mini" type="primary" @click="resetting">重置</el-button>
              <el-button size="mini" type="primary" @click="highGrade">取消</el-button>
            </div>
          </el-form>
        </div>
      </div>

      <div class="main">
        <div class="myTable" >
          <el-table
            :data="tableData"
            @row-click="clickTable"
            @row-dblclick="dblClickTable"
            @row-contextmenu='houseMenu'
            style="width: 100%">
            <el-table-column
              prop="create_time"
              label="创建时间">
            </el-table-column>
            <el-table-column
              prop="name"
              label="房屋地址">
            </el-table-column>
            <el-table-column
              prop="child_count"
              label="事件数">
            </el-table-column>
            <el-table-column
              prop="child.length"
              label="包含跟进项">
            </el-table-column>
            <el-table-column
              prop="expected_finish_time"
              label="预计完成时间">
            </el-table-column>
            <el-table-column
              prop="creator_id"
              label="创建人">
            </el-table-column>
            <el-table-column
              prop="follow_id"
              label="跟进人">
            </el-table-column>
            <el-table-column
              prop="follow_statuss"
              label="跟进状态">
            </el-table-column>

          </el-table>
        </div>
        <div class="tableBottom">
          <div class="left">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="params.pages"
              :page-sizes="[12, 20, 30, 40]"
              :page-size="params.limit"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalNumber">
            </el-pagination>
          </div>
        </div>
      </div>

    </div>
    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperate="clickEvent"></RightMenu>

    <Organization :organizationDialog="organizationDialog" @close="closeModal"></Organization>
    <AddChildTask :addChildTaskDialog="addChildTaskDialog" :activeId="activeId" :startAddResult="startEdit" @close="closeModal"></AddChildTask>
    <OrderDetail :orderDetailDialog="orderDetailDialog" :activeId="activeId" :startDetail="startDetail" @close="closeModal"></OrderDetail>
  </div>
</template>

<script>
  import RightMenu from '../../../common/rightMenu.vue'
  import Organization from '../../../common/organization.vue'

  import AddChildTask from './components/addChildTask.vue'
  import OrderDetail from './components/workOrderDetail.vue'
  export default {
    name: 'hello',
    components: {RightMenu,Organization,AddChildTask,OrderDetail},
    data () {
      return {
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],
        /***********/
        statisticDate: '',

        totalNumber : 0,
        params: {
          pages: 1,
          limit: 12
        },
        tableData: [],
        options: [],

        //模态框
        organizationDialog: false,
        editWorkDialog: false,     //编辑
        addChildTaskDialog: false,     //添加子任务框
        orderDetailDialog : false,
        activeName: 'first',
        isHigh:false,
        activeId:'',
        startEdit:false,
        startAddResult:false,
        startDetail:false,
      }
    },

    created(){
      if(this.$store.state.datum.work_order_filter.pages){
        this.params.pages=this.$store.state.datum.work_order_filter.pages;
        this.params.limit=this.$store.state.datum.work_order_filter.limit;
      }
      this.getTableData();
    },
    methods: {
      //获取列表数据
      getTableData(){
        this.$http.get(globalConfig.server+'customer/work_order',{params:this.params}).then((res) => {
          if(res.data.code === '10000'){
            this.tableData = res.data.data.data;
            this.totalNumber = res.data.data.count;
          }else {
            this.tableData = [];
            this.totalNumber = 0;
          }
        })
      },

      handleSizeChange(val) {
        this.params.limit = val;
        this.getTableData();
        this.$store.dispatch('workOrderFilter',this.params);
      },
      handleCurrentChange(val) {
        this.params.pages = val;
        this.getTableData();
        this.$store.dispatch('workOrderFilter',this.params);
      },
      clickTable(row, event, column){
        console.log(row, event, column)
      },
      //房屋右键
      houseMenu(row, event){
        this.activeId = row.id;
        this.lists = [
//          {clickIndex: 'edit', headIcon: 'el-icon-edit', label: '修改',},
          {clickIndex: 'addChildren', headIcon: 'el-icon-plus', label: '添加子任务',},
        ];
        this.contextMenuParam(event);
      },
      dblClickTable(row, event){
        this.activeId = row.id;
        this.startDetail = true;
        this.orderDetailDialog = true;
      },
      //右键回调事件
      clickEvent (index) {
        switch (index){
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

      closeModal(val){
        this.organizationDialog = false;
//        this.editWorkDialog = false;
        this.addChildTaskDialog = false;
        this.orderDetailDialog = false;

        //操作状态
//        this.startEdit = false;
        this.startAddResult = false;
        this.startDetail = false;

        if(val){

        }
      },

      highGrade(){
        this.isHigh = !this.isHigh;
      },
      resetting(){

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="">
  #clientContainer {
    min-height: 800px;
    .selectButton{
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
