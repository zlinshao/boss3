<template>
  <div @click="show=false" @contextmenu="closeMenu">
    <div class="highRanking">
      <div class="highSearch">
        <el-form :model="form" :inline="true" size="mini">
          <el-form-item>
            <el-input placeholder="请输入内容" v-model="form.keyWords" size="mini"  @nter.keyup.enter.native="search">
              <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
              <!--<el-button slot="append" icon="el-icons-fa-bars"></el-button>-->
            </el-input>
          </el-form-item>
          <!--<el-form-item>-->
            <!--<el-button type="primary" size="mini" @click="highGrade">高级</el-button>-->
          <!--</el-form-item>-->
          <el-form-item>
            <el-button type="primary" @click="openMessageModule">
              <i class="el-icon-plus"></i>&nbsp;新建短信模板
            </el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="filter high_grade" :class="isHigh? 'highHide':''">
        <el-form :inline="true" :model="form" size="mini" label-width="100px">
          <div class="filterTitle">
            <i class="el-icons-fa-bars"></i>&nbsp;&nbsp;高级搜索
          </div>
          <el-row class="el_row_border">
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">业务类型</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-input v-model="form.department_name" @focus="openDepartment" placeholder="请选择类型"
                              readonly></el-input>
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

    <el-table
      :data="tableData"
      style="width: 100%"
      @row-contextmenu='houseMenu'>
      <el-table-column type="index">
      </el-table-column>

      <el-table-column
        prop="template_name"
        label="短信名称">
      </el-table-column>
      <el-table-column
        prop="sign"
        label="sign码">
      </el-table-column>
      <el-table-column
        prop="skin"
        label="skin码">
      </el-table-column>
      <el-table-column
        prop="url"
        label="URL">
      </el-table-column>
      <el-table-column
        width="600"
        prop="content"
        label="短信内容">
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="创建时间">
      </el-table-column>

    </el-table>

    <div class="block pages">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="Number(form.pages)"
        :page-size="12"
        layout="total, prev, pager, next, jumper"
        :total="totalNumbers">
      </el-pagination>
    </div>

    <!--右键-->
    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperate="clickEvent"></RightMenu>

    <!--组织架构-->
    <AddModule :organizationDialog="departmentVisible" @close="closeDepartment"></AddModule>

    <!--新增/修改短信模板-->
    <MessageModule :module="messageModule" :messageName="messageName" :activeId="activeId"
                   @close="closeMessageModule"></MessageModule>

    <!--修改短信名称-->
    <ReviseName :module="reviseMessage" @close="closeReName"></ReviseName>
  </div>
</template>

<script>
  import RightMenu from '../../../common/rightMenu.vue'    //右键
  import AddModule from '../../../common/organization.vue'
  import MessageModule from './components/messageModule.vue'
  import ReviseName from './components/reviseName.vue'

  export default {
    components: {AddModule, MessageModule, RightMenu, ReviseName},
    data() {
      return {
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],
        isHigh: false,
        tableData: [],
        form: {
          keywords: '',
          pages: 1,
        },
        totalNumbers:0,
        activeId:'',

        pickerOptions: {},
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
      //获取列表数据
      getDate() {
        this.$http.get(globalConfig.server+'setting/sms_template/',{params:this.form}).then((res) => {
          if(res.data.code === '20000'){
            this.tableData = res.data.data.list;
            this.totalNumbers = res.data.data.count;
//
//            this.$notify.success({
//              title: '成功',
//              message: res.data.msg,
//            });
          }else {
            this.$notify.warning({
              title: '警告',
              message: res.data.msg,
            });
          }
        })
      },
      // 重置
      resetting() {
        this.form.keywords = '';
      },
      // 高级筛选
      highGrade() {
        this.isHigh = !this.isHigh;
      },

      //分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.form.pages = val;
        this.getDate();
      },
      search(){
        this.form.pages = 1;
        this.getDate();
      },
      // 业务类型
      openDepartment() {
        this.departmentVisible = true
      },
      // 关闭业务类型
      closeDepartment() {
        this.departmentVisible = false
      },


      // 右键
      houseMenu(row, event) {
        this.activeId = row.id;
        this.lists = [
//          {clickIndex: 'starUsing', headIcon: 'el-icon-circle-check-outline', label: '启用',},
//          {clickIndex: 'forbidden ', headIcon: 'el-icon-circle-close-outline', label: '禁用',},
          {clickIndex: 'reTemplet', headIcon: 'el-icon-message', label: '修改短信模板',},
//          {clickIndex: 'reName', headIcon: 'el-icon-edit', label: '修改短信名称',},
          {clickIndex: 'delete', headIcon: 'el-icon-circle-close-outline', label: '删除',}
        ];
        this.contextMenuParam(event);
      },
      // 右键回调
      clickEvent(val) {
        this.openMenu(val);
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
      openMenu(val) {
        if (val === 'delete') {
          this.$confirm('该操作将删除模板, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.deleteMessage();
          }).catch(() => {
            this.$notify.info({
              title: '消息',
              message: '已取消删除!'
            });
          });
        }else if(val==='reTemplet'){
          this.reTemplet();
        }else if(val==='reName'){
          this.reName();
        }
      },
      // 新增短信模板
      openMessageModule() {
        this.messageName = '新增短信模板';
        this.messageModule = true;
      },
      // 修改模板
      reTemplet(val) {
        this.messageName = '修改短信模板';
        this.messageModule = true;
      },
      // 关闭短信模板
      closeMessageModule(val) {
        this.messageModule = false;
        this.messageName = '';
        if(val === 'success'){
            this.getDate();
        }
      },

      // 修改短信名称
      reName() {
        this.reviseMessage = true;
      },
      closeReName() {
        this.reviseMessage = false;
      },
      //删除短信
      deleteMessage(){
        this.$http.get(globalConfig.server+'setting/sms_template/delete/'+this.activeId).then((res)=>{
          if(res.data.code === '20040'){
              this.search();
          }else {
            this.$notify.warning({
              title: '警告',
              message: res.data.msg
            });
          }
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>
