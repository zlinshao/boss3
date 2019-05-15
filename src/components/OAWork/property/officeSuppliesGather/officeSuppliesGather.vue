<template>
  <div @click="show=false" @contextmenu="show=false">
    <!--<div class="filter">-->
      <!--<el-form :inline="true" onsubmit="return false" onsubmit="return false" :model="formInline" size="mini" class="demo-form-inline">-->
        <!--<el-form-item label="商品颜色">-->
          <!--<el-select v-model="formInline.region" placeholder="请选择商品颜色">-->
            <!--<el-option label="区域一" value="shanghai"></el-option>-->
            <!--<el-option label="区域二" value="beijing"></el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="商品品牌">-->
          <!--<el-select v-model="formInline.region" placeholder="请选择商品品牌">-->
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

        <!--<el-form-item style="float: right">-->
          <!--<el-button type="primary" @click="openModal('addSuppliesDialog')">物品新增</el-button>-->
        <!--</el-form-item>-->
      <!--</el-form>-->
    <!--</div>-->


    <div class="highRanking">
      <div class="highSearch">
        <el-form :inline="true" onsubmit="return false" size="mini">
          <el-form-item>
            <el-input placeholder="请输入内容" v-model="formInline.keyWords" size="mini" clearable>
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="success">导出</el-button>
          </el-form-item>
          <el-form-item style="float: right">
            <el-button type="primary" @click="openModal('addSuppliesDialog')">物品新增</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="filter high_grade" :class="isHigh? 'highHide':''">
        <el-form :inline="true" onsubmit="return false" :model="formInline" size="mini" label-width="100px">
          <div class="filterTitle">
            <i class="el-icons-fa-bars"></i>&nbsp;&nbsp;高级搜索
          </div>
          <el-row class="el_row_border">
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">商品颜色</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-select v-model="formInline.region" placeholder="请选择商品颜色">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">商品品牌</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-select v-model="formInline.region" placeholder="请选择商品品牌">
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
            prop="create_times"
            label="入库时间">
          </el-table-column>
          <el-table-column
            prop="number"
            label="库存数量">
          </el-table-column>
          <el-table-column
            prop="total_price"
            label="库存金额">
          </el-table-column>
          <el-table-column
            prop="name"
            label="备注">
          </el-table-column>
        </el-table>
      </div>
      <div class="tableBottom">
        <div class="left">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
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
  </div>
</template>

<script>
  import RightMenu from '../../../common/rightMenu.vue'    //右键
  import AddSupplies from '../components/addSupplies.vue'

  export default {
    components:{RightMenu,AddSupplies},
    data () {
      return {
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],
        /***********/
        formInline:{},
        tableData: [],
        currentPage: 1,
        addSuppliesDialog:false,
        isReverse: false,
        isHigh:false,
        totalNumber:0,
      }
    },

    mounted(){
        this.getTableData();
    },
    methods:{
      getTableData(){
          this.$http.get('/oa/office/').then((res) => {
              if(res.data.code === '40000'){
                  this.tableData = res.data.data.list;
                  this.totalNumber = res.data.data.count;
              }

          })
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      clickTable(row, event, column){
        console.log(row, event, column)
      },
      openContextMenu(row){
        this.lists=[
          {clickIndex: 'reverseSuppliesDialog', headIcon: 'el-icon-circle-close-outline', label: '修改信息',},
          {clickIndex: 'delete', headIcon: 'el-icon-edit', label: '删除',},
        ];
        let e = event || window.event;let event = window.event;	//support firefox contextmenu
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
      clickEvent (index) {
        this.openModal(index);
      },
      openModal(index){
        switch (index) {
          case 'addSuppliesDialog':
            this.addSuppliesDialog = true;
            this.isReverse = false;
            break;
          case 'delete':
            this.deleteInfo();
            break;
          case 'reverseSuppliesDialog':
            this.addSuppliesDialog = true;
            this.isReverse = true;
            break;
        }
      },
      deleteInfo(){
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
      closeAddSupplies(){
        this.addSuppliesDialog = false;
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
<style scoped>
  .tableBottom {
    padding: 8px;
    display: flex;
    justify-content: flex-end;

  }
</style>
