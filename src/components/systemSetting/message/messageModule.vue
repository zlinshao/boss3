<template>
  <div >
    <div>
      <div class="filter-container">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item>
            <el-button type="primary"  @click="openModule">
              <i class="el-icon-plus"></i>新建
            </el-button>
            <el-button type="primary"  @click="openMapModule">
              <i class="el-icon-plus"></i>地图
            </el-button>
            <el-button type="primary"  @click="openContractModule">
              <i class="el-icon-plus"></i>合同
            </el-button>
            <el-button type="primary"  @click="openMessageModule">
              <i class="el-icon-plus"></i>新建短信模板
            </el-button>
          </el-form-item>
        </el-form>
      </div>

      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
      </el-table>

      <div class="block">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
        </el-pagination>
      </div>
    </div>
    <AddModule :FormVisible="dialogFormVisible" @close="closeModule"></AddModule>
    <MapModule :FormVisible="mapFormVisible" @close="closeMapModule"></MapModule>
    <ContractAdd :FormVisible="contractFormVisible" @close="closeContractModule"></ContractAdd>
    <AddMessageModule></AddMessageModule>
  </div>
</template>

<script>
  import AddModule from '../../common/organization.vue'
  import MapModule from '../../common/mapSearch.vue'
  import ContractAdd from './conponents/contractDelay.vue'
  import AddMessageModule from './conponents/addMessageModule.vue'
  export default {
    components:{AddModule,MapModule,ContractAdd,AddMessageModule},
    data() {
      return {
        tableData: [
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }
        ],
        formInline: {
          user: '',
          region: '',
          status:false,
        },
        currentPage: 1,


        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        dateValue: '',
        loading : true,
        dialogFormVisible : false,
        mapFormVisible : false,
        contractFormVisible:false,
      }
    },
    mounted(){
      this.getDate();
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      getDate(){
        new Promise((resolve,reject) => {
          setTimeout(() => {
            this.loading = false;
            console.log('执行完成')
            resolve('随便什么数据');
          },2000)
        }).then(function (data) {
          console.log(data)
        })
      },
      openModule(){
          this.dialogFormVisible = true
      },
      closeModule(){
        this.dialogFormVisible = false
      },
      openMapModule(){
          this.mapFormVisible = true
      },
      closeMapModule(){
        this.mapFormVisible = false
      },
      openContractModule(){
        this.contractFormVisible = true
      },
      closeContractModule(){
        this.contractFormVisible = false
      },
      openMessageModule(){

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .filter-container{
    padding: 20px 0 0 10px;
    background: #ffffff;
    margin-bottom: 10px;
    .el-button{
      padding: 10px 20px;
    }
  }
  .block{
    margin-top: 30px;
  }
</style>
