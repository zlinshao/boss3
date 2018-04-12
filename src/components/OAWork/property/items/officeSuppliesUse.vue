<template>
  <div @click="show=false" @contextmenu="show=false">
    <!--<div class="filter">-->
    <!--<el-form :inline="true" onsubmit="return false" :model="formInline" size="mini" class="demo-form-inline">-->
    <!--<el-form-item label="选择领取人">-->
    <!--<el-input readonly="" @focus="openOrganizationModal('staff')" placeholder="点击选择"></el-input>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="选择领取部门">-->
    <!--<el-input readonly="" @focus="openOrganizationModal('department')" placeholder="点击选择"></el-input>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="选择状态">-->
    <!--<el-select v-model="formInline.region" placeholder="请选择状态">-->
    <!--<el-option label="区域一" value="shanghai"></el-option>-->
    <!--<el-option label="区域二" value="beijing"></el-option>-->
    <!--</el-select>-->
    <!--</el-form-item>-->
    <!--<el-form-item>-->
    <!--<el-input v-model="formInline.name" placeholder="搜索">-->
    <!--<el-button slot="append" type="primary" icon="el-icon-search"></el-button>-->
    <!--</el-input>-->
    <!--</el-form-item>-->
    <!--<el-form-item>-->
    <!--<el-button type="primary">导出</el-button>-->
    <!--</el-form-item>-->
    <!--</el-form>-->
    <!--</div>-->

    <div class="highRanking">
      <div class="highSearch">
        <el-form :inline="true" onsubmit="return false" size="mini">
          <el-form-item>
            <el-input placeholder="请输入内容" v-model="params.keyWords" size="mini" clearable>
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="success">导出</el-button>
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
                  <div class="el_col_label">选择领取人</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-input readonly="" @focus="openOrganizationModal('staff')" placeholder="点击选择"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">选择领取部门</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-input readonly="" @focus="openOrganizationModal('staff')" placeholder="点击选择"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row class="el_row_border">
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">选择状态</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-select v-model="params.status" placeholder="请选择状态">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
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
      <div class="blueTable">
        <el-table
          :data="tableData"
          @row-contextmenu='openContextMenu'
          style="width: 100%">
          <el-table-column
            prop="name"
            label="名称">
          </el-table-column>
          <el-table-column
            prop="unit"
            label="单位">
          </el-table-column>
          <el-table-column
            prop="number"
            label="数量">
          </el-table-column>
          <el-table-column
            prop="standard"
            label="规格">
          </el-table-column>
          <el-table-column
            prop="colour"
            label="颜色">
          </el-table-column>
          <el-table-column
            prop="brand"
            label="品牌">
          </el-table-column>
          <el-table-column
            prop="unit_price"
            label="单价">
          </el-table-column>
          <el-table-column
            prop="create_time"
            label="入库时间">
          </el-table-column>
          <el-table-column
            prop="name"
            label="库存数量">
          </el-table-column>
          <el-table-column
            prop="name"
            label="库存金额">
          </el-table-column>
          <el-table-column
            prop="remarks"
            label="备注">
          </el-table-column>
        </el-table>
      </div>
      <div class="tableBottom">
        <div class="left">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="params.page"
            :page-size="10"
            layout="total, prev, pager, next, jumper"
            :total="totalNumber">
          </el-pagination>
        </div>
      </div>
    </div>
    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperate="clickEvent"></RightMenu>

    <AddSupplies :isReverse="isReverse" :addSuppliesDialog="addSuppliesDialog" @close="closeAddSupplies"></AddSupplies>

    <Organization :organizationDialog="organizationDialog" @close="closeOrganization"></Organization>
  </div>
</template>

<script>
  import RightMenu from '../../../common/rightMenu.vue'    //右键
  import AddSupplies from '../components/addSupplies.vue'
  import Organization from '../../../common/organization.vue'

  export default {
    components: {RightMenu, AddSupplies, Organization},
    data() {
      return {
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        isHigh: false,
        lists: [],
        /***********/
        formInline: {},
        tableData: [],
        currentPage: 1,
        addSuppliesDialog: false,
        isReverse: false,
        organizationDialog: false,
        totalNumber: 0,
        params: {
          status: '',
          department_id: '',
          staff_id: '',
          keywords: '',
          page: 1,
        }
      }
    },

    mounted() {
      this.getTableData();
    },
    methods: {
      getTableData() {
        this.$http.get('/oa/getoffice/', {params: this.params}).then((res) => {
          if (res.data.code === '60000') {
            console.log(res.data.data.list)
            this.tableData = res.data.data.list;
            this.totalNumber = res.data.data.pages;
          }
        })
      },

      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      clickTable(row, event, column) {
        console.log(row, event, column)
      },
      openContextMenu(row, event) {
        this.lists = [
          {clickIndex: 'reverseSuppliesDialog', headIcon: 'el-icon-edit', label: '修改信息',},
          {clickIndex: 'reverseSuppliesDialog', headIcon: 'el-icons-fa-hdd-o', label: '物品领取',},
          {clickIndex: 'reverseSuppliesDialog', headIcon: 'el-icons-fa-mail-reply', label: '物品借用',},
          {clickIndex: 'reverseSuppliesDialog', headIcon: 'el-icons-fa-mail-forward', label: '物品归还',},
//          {clickIndex: 'reverseSuppliesDialog', headIcon: 'el-icon-circle-close-outline', label: '添加备注',},
          {clickIndex: 'delete', headIcon: 'el-icon-circle-close-outline', label: '删除',},
        ];
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
      //右键回调时间
      clickEvent(index) {
        this.openModal(index);
      },
      openOrganizationModal() {
        this.organizationDialog = true
      },
      deleteInfo() {
        this.$confirm('删除后不可恢复, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      closeAddSupplies() {
        this.addSuppliesDialog = false;
      },
      closeOrganization() {
        this.organizationDialog = false;
      },
      highGrade() {
        this.isHigh = !this.isHigh;
      },
      resetting() {

      }
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .tableBottom {
    padding: 8px;
    display: flex;
    justify-content: flex-end;

  }
</style>
