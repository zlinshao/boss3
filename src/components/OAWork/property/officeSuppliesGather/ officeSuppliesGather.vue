<template>
  <div @click="show=false" @contextmenu="show=false">
    <div class="filter">
      <el-form :inline="true" :model="formInline" size="mini" class="demo-form-inline">
        <el-form-item label="商品颜色">
          <el-select v-model="formInline.region" placeholder="请选择商品颜色">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品品牌">
          <el-select v-model="formInline.region" placeholder="请选择商品品牌">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="formInline.name" placeholder="搜索">
            <el-button slot="append" type="primary" icon="el-icon-search"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">导出</el-button>
        </el-form-item>

        <el-form-item style="float: right">
          <el-button type="primary" @click="openModal('addSuppliesDialog')">物品新增</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="main">
      <div class="blueTable">
        <el-table
          :data="tableData"
          @row-contextmenu='openContextMenu'
          style="width: 100%">
          <el-table-column
            prop="date"
            label="名称">
          </el-table-column>
          <el-table-column
            prop="name"
            label="单位">
          </el-table-column>
          <el-table-column
            prop="name"
            label="数量">
          </el-table-column>
          <el-table-column
            prop="name"
            label="规格">
          </el-table-column>
          <el-table-column
            prop="name"
            label="颜色">
          </el-table-column>
          <el-table-column
            prop="name"
            label="品牌">
          </el-table-column>
          <el-table-column
            prop="name"
            label="单价">
          </el-table-column>
          <el-table-column
            prop="name"
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
            :page-sizes="[10, 20, 30, 40]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400">
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
        tableData: [
          {
            date: '2016-05-03',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          },
          {
            date: '2016-05-02',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          },
          {
            date: '2016-05-04',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          },
          {
            date: '2016-05-01',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          },
          {
            date: '2016-05-01',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          }
        ],
        currentPage: 1,
        addSuppliesDialog:false,
        isReverse: false
      }
    },
    methods:{
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      clickTable(row, event, column){
        console.log(row, event, column)
      },
      openContextMenu(row, event){
        this.lists=[
          {clickIndex: 'reverseSuppliesDialog', headIcon: 'el-icon-circle-close-outline', label: '修改信息',},
          {clickIndex: 'delete', headIcon: 'el-icon-edit', label: '删除',},
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
