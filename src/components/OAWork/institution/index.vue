<template>
  <div>
    <div>
      <div class="filter">
        <el-form :inline="true" :model="formInline" size="mini" class="demo-form-inline">
          <el-form-item label="选择部门">
            <el-select v-model="formInline.house" clearable placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input v-model="formInline.name" placeholder="搜索">
              <el-button slot="append" type="primary" icon="el-icon-search"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item style="float: right">
            <el-button type="success" @click="addInstitution">点击上传</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="main">
        <div class="myHouse">
          <div class="blueTable">
            <el-table
              :data="tableData"
              @row-click="clickTable"
              style="width: 100%">
              <el-table-column
                prop="date"
                label="名称">
              </el-table-column>
              <el-table-column
                prop="name"
                label="部门">
              </el-table-column>
              <el-table-column
                prop="province"
                label="省份">
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
      </div>
    </div>
    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperate="clickEvent"></RightMenu>
    <AddInstitution :addInstitutionDialog="addInstitutionDialog" @close="closeAddInstitution"></AddInstitution>
  </div>
</template>

<script>
  import RightMenu from '../../common/contextMenu/rightMenu.vue'
  import AddInstitution from './components/addInstitution.vue'
  export default {
    name: 'hello',
    components: {RightMenu,AddInstitution},
    data () {
      return {
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],
        /***********/
        addInstitutionDialog:false,
        formInline: {
          name: '',
          house: ''
        },
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
        options: [
          {
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }, {
            value: '选项4',
            label: '龙须面'
          }, {
            value: '选项5',
            label: '北京烤鸭'
          }],

        //模态框
        instructionDialog: false,
      }
    },

    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      clickTable(row, event, column){
        console.log(row, event, column)
      },
      addInstitution(){
          this.addInstitutionDialog = true;
      },
      closeAddInstitution(){
          this.addInstitutionDialog = false;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="">
  .filter {
    /*padding: 10px 0;*/
  }

  .tableBottom {
    padding: 8px;
    display: flex;
    justify-content: flex-end;

  }
</style>
