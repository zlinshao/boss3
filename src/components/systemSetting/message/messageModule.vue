<template>
  <div @click="show=false" @contextmenu="closeMenu">
    <div class="filter">
      <el-form :inline="true" ref="formInline" :model="formInline" class="demo-form-inline" size="mini">

        <el-form-item label="业务类型">
          <el-input v-model="formInline.department_name" @focus="openDepartment" placeholder="请选择类型"
                    readonly></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="openMessageModule">
            <i class="el-icon-plus"></i>&nbsp;新建短信模板
          </el-button>
        </el-form-item>

      </el-form>
    </div>

    <el-table
      :data="tableData"
      style="width: 100%"
      @row-contextmenu='houseMenu'>

      <el-table-column type="index">
      </el-table-column>

      <el-table-column
        prop="name"
        label="短信名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="短信路径">
      </el-table-column>
      <el-table-column
        prop="type"
        label="业务类型">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            @click="reTemplet(scope.$index)">修改模板
          </el-button>
          <el-button
            size="mini"
            type="text"
            @click="reName(scope.$index)">修改短信名称
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="auditing"
        label="审核状态">
      </el-table-column>
    </el-table>

    <div class="block pages">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[20, 100, 200, 300, 400]"
        :page-size="20"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </div>

    <!--右键-->
    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperate="clickEvent"></RightMenu>

    <!--组织架构-->
    <AddModule :organizationDialog="departmentVisible" @close="closeDepartment"></AddModule>

    <!--新增/修改短信模板-->
    <MessageModule :module="messageModule" :messageName="messageName"
                      @close="closeMessageModule"></MessageModule>

    <!--修改短信名称-->
    <ReviseName :module="reviseMessage" @close="closeReName"></ReviseName>
  </div>
</template>

<script>
  import RightMenu from '../../common/contextMenu/rightMenu.vue'    //右键
  import AddModule from '../../common/organization.vue'
  import MessageModule from './conponents/messageModule.vue'
  import ReviseName from './conponents/reviseName.vue'

  export default {
    components: {AddModule, MessageModule, RightMenu, ReviseName},
    data() {
      return {
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],

        radio: '',      //启用/禁用
        tableData: [
          {
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
            type: '财务部',
            status: '启用/禁用',
            auditing: '审核通过',
          },
          {
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
            type: '综合事务部',
            status: '启用/禁用',
            auditing: '审核失败',
          },
        ],
        formInline: {
          department_name: '',
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
        loading: true,
        departmentVisible: false,           //业务类型
        messageModule: false,
        messageName: '',
        reviseMessage: false,
      }
    },
    mounted() {
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
      getDate() {
        new Promise((resolve, reject) => {
          setTimeout(() => {
            this.loading = false;
            console.log('执行完成');
            resolve('随便什么数据');
          }, 2000)
        }).then(function (data) {
          console.log(data)
        })
      },

      // 业务类型
      openDepartment() {
        this.departmentVisible = true
      },
      // 关闭业务类型
      closeDepartment() {
        this.departmentVisible = false
      },
      // 新增短信模板
      openMessageModule() {
        this.messageName = '新增短信模板';
        this.messageModule = true;
      },
      // 关闭短信模板
      closeMessageModule() {
        this.messageModule = false;
      },
      // 修改模板
      reTemplet(val) {
        console.log(val);
        this.messageName = '修改短信模板';
        this.messageModule = true;
      },
      // 修改短信名称
      reName(val) {
        console.log(val);
        this.reviseMessage = true;
      },
      closeReName() {
        this.reviseMessage = false;
      },
      // 右键
      houseMenu(row, event) {
        // console.log(row);
        this.lists = [
          {clickIndex: 'starUsing', headIcon: 'el-icon-circle-check-outline', label: '启用',},
          {clickIndex: 'forbidden ', headIcon: 'el-icon-circle-close-outline', label: '禁用',},
        ];
        this.contextMenuParam(event);
      },
      // 右键回调
      clickEvent(val) {
        console.log(val);
        this.openDelete(val);
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
      // 启用/禁用
      openDelete(val) {
        if (val === 'starUsing') {
          this.$confirm('该操作将启用模板, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'success',
              message: '启用成功!'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消启用'
            });
          });
        } else {
          this.$confirm('该操作将禁用模板, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'success',
              message: '禁用成功!'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消禁用'
            });
          });
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>
