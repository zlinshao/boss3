<template>
  <div>
    <div>
      <!--<div class="filter">-->
        <!--<el-form :inline="true" :model="formInline" size="mini" class="demo-form-inline">-->
          <!--<el-form-item label="选择部门">-->
            <!--<el-select v-model="formInline.house" clearable placeholder="请选择">-->
              <!--<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">-->
              <!--</el-option>-->
            <!--</el-select>-->
          <!--</el-form-item>-->
          <!--<el-form-item>-->
            <!--<el-input v-model="formInline.name" placeholder="搜索">-->
              <!--<el-button slot="append" type="primary" icon="el-icon-search"></el-button>-->
            <!--</el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item style="float: right">-->
            <!--<el-button type="primary" @click="addInstitution">点击上传</el-button>-->
          <!--</el-form-item>-->
        <!--</el-form>-->
      <!--</div>-->

      <div class="highRanking">
        <div class="highSearch">
          <el-form :inline="true" size="mini">
            <el-form-item>
              <el-input placeholder="请输入内容" v-model="formInline.keyWords" size="mini" clearable>
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="addInstitution">点击上传</el-button>
            </el-form-item>
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
            <div class="btnOperate">
              <el-button size="mini" type="primary">搜索</el-button>
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
              style="width: 100%">
              <el-table-column
                prop="date"
                label="名称">
              </el-table-column>
              <el-table-column
                prop="name"
                label="部门">
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" type="text">
                    <i class="el-icon-delete"></i>
                    <i class="el-icons-fa-cloud-download"></i>
                    <i class="el-icon-edit-outline"></i>
                  </el-button>
                </template>
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

    <AddInstitution :addInstitutionDialog="addInstitutionDialog" @close="closeAddInstitution"></AddInstitution>
    <Organization :organizationDialog="organizationDialog" @close="closeOrganization"></Organization>
  </div>
</template>

<script>
  import AddInstitution from './components/addInstitution.vue'
  import Organization from '../../common/organization.vue'
  export default {
    name: 'hello',
    components: {AddInstitution,Organization},
    data () {
      return {
        /***********/
        addInstitutionDialog:false,
        organizationDialog:false,
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
        isHigh:false,
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
      },
      openOrganizationModal(){
        this.organizationDialog = true
      },
      closeOrganization(){
        this.organizationDialog = false;
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
  .filter {
    /*padding: 10px 0;*/
  }

  .tableBottom {
    padding: 8px;
    display: flex;
    justify-content: flex-end;

  }
</style>
