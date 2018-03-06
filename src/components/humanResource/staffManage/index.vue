<template>
    <div id="staffManage"  @click="show=false" @contextmenu="closeMenu">
      <el-row :gutter="10">
        <el-col :span="6">
          <div class="border left">
            <div class="top">
              <div>
                组织架构
              </div>
              <!--<div>-->
                <!--<el-button size="mini">使用指南</el-button>-->
              <!--</div>-->
            </div>
            <div id="dragTree">
              <el-tree ref="expandMenuList" class="expand-tree"
                       :data="setTree"
                       node-key="id"
                       highlight-current
                       accordion
                       check-strictly
                       @node-click="nodeClick"
                       :default-expanded-keys="defaultExpandKeys"
                       :props="defaultProps"
                       :expand-on-click-node="false"
                       :render-content="renderContent">
              </el-tree>
            </div>
          </div>
        </el-col>
        <el-col :span="18">
          <div class="border right">
            <div class="top">

              <div>{{selectDepart}}</div>

              <div @click="sortDepartment">
                <el-button size="mini">部门排序</el-button>
                <!--<el-button v-if="isDepartment" style="color: #ffffff" type="text">取消排序</el-button>-->
              </div>
            </div>

            <div id="sortTable" v-show="isDepartment">
              <div class="ul_header">
                <span style="margin-right: 15px">上下移动部门调整位置</span>
                <el-button type="text" size="mini" @click="isDepartment = !isDepartment">取消</el-button>
                <el-button type="text" size="mini" @click="confirmSave">保存</el-button>
              </div>
              <ul>
                <li><span class="el-icons-fa-bars" style="margin-right: 10px"></span>研发部（18人）</li>
                <li><span class="el-icons-fa-bars" style="margin-right: 10px"></span>客服部（10人）</li>
                <li><span class="el-icons-fa-bars" style="margin-right: 10px"></span>市场部（230人）</li>
                <li><span class="el-icons-fa-bars" style="margin-right: 10px"></span>财务部（9人）</li>
                <li><span class="el-icons-fa-bars" style="margin-right: 10px"></span>人力资源部（12人）</li>
                <li><span class="el-icons-fa-bars" style="margin-right: 10px"></span>人事部（5人）</li>
                <li><span class="el-icons-fa-bars" style="margin-right: 10px"></span>行政部（8人）</li>
              </ul>
              <div style="margin: 10px;display: flex;justify-content: flex-end">

              </div>
            </div>
            <div  v-show="!isDepartment">
              <div class="filter">
                <el-form :inline="true" :model="formInline" size="mini" class="demo-form-inline">
                  <el-form-item label="选择部门">
                    <el-input @focus="organizationDialog = true" readonly=""></el-input>
                  </el-form-item>
                  <el-form-item style="float: right">
                    <el-button type="primary" @click="addStaff">新建员工</el-button>
                  </el-form-item>

                  <el-form-item style="float: right">
                    <el-input v-model="formInline.keywords" placeholder="请输入搜索内容" @keyup.enter.native="search">
                      <el-button slot="append" type="primary" icon="el-icon-search" @click="search"></el-button>
                    </el-input>
                  </el-form-item>
                </el-form>
              </div>

              <div class="staffTable">
                <el-table
                  :data="tableData"
                  @row-contextmenu="openContextMenu"
                  style="width: 100%">
                  <el-table-column
                    prop="name"
                    label="员工姓名">
                  </el-table-column>
                  <!--<el-table-column-->
                    <!--prop="org_id"-->
                    <!--label="部门">-->
                  <!--</el-table-column>-->
                  <!--<el-table-column-->
                    <!--prop="date"-->
                    <!--label="职务">-->
                  <!--</el-table-column>-->
                  <!--<el-table-column-->
                    <!--prop="date"-->
                    <!--label="人员状态">-->
                  <!--</el-table-column>-->
                  <!--<el-table-column-->
                    <!--prop="date"-->
                    <!--label="等级">-->
                  <!--</el-table-column>-->
                  <el-table-column
                    prop="phone"
                    label="手机号">
                  </el-table-column>
                  <el-table-column
                    prop="created_at"
                    label="入职时间">
                  </el-table-column>
                  <!--<el-table-column-->
                    <!--prop="date"-->
                    <!--label="第一次合同">-->
                  <!--</el-table-column>-->
                  <!--<el-table-column-->
                    <!--prop="date"-->
                    <!--label="第二次合同">-->
                  <!--</el-table-column>-->
                </el-table>
              </div>

              <div class="tableBottom">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-sizes="[10, 20, 30, 40]"
                  :page-size="10"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="totalNum">
                </el-pagination>
              </div>
            </div>

          </div>
        </el-col>
      </el-row>
      <Organization :organizationDialog="organizationDialog" @close="closeOrganization"></Organization>
      <AddStaff :addStaffDialog="addStaffDialog" :isEdit="isEdit" :editId="editId" @close="closeAddStaff"></AddStaff>
      <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
                 @clickOperate="clickEvent"></RightMenu>
      <EditDepart :editDepartDialog="editDepartDialog" :departId="departId" @close="closeEditDepart"></EditDepart>
      <AddDepart :addDepartDialog="addDepartDialog" :parentId="parentId" @close="closeAddDepart"></AddDepart>
    </div>
</template>

<script>
  import TreeRender from './components/treeRender.vue'
  import Organization from '../../common/organization.vue'
  import Sortable from 'sortablejs'
  import AddStaff from './components/addStaff.vue'
  import RightMenu from '../../common/rightMenu.vue'    //右键
  import EditDepart from './components/editdepar.vue'
  import AddDepart from './components/addDepart.vue'
  export default{
    name: 'tree',
    components:{Organization,AddStaff,RightMenu,EditDepart,AddDepart},
    data(){
      return{
//        maxExpandId: api.maxExpandId,//新增节点开始id
//        non_maxExpandId: api.maxExpandId,//新增节点开始id(不更改)

        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],
        /***********/
        arrList:[],
        setTree:  [],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        defaultExpandKeys: [],//默认展开节点列表

        formInline:{
          keywords:'',
          pageNum:10,
          page:1,
          org_id:'',
        },
        tableData:[],
        organizationDialog:false,
        sortable: null,
        currentPage:1,
        isDepartment : false,
        //......................

        addStaffDialog:false, //新增用户模态框
        editDepartDialog:false, //编辑部门模态框
        addDepartDialog:false, //新建部门模态框
        isEdit:false,
        editId : null,
        totalNum : 0,
        departId:null,
        parentId:null,
        selectDepart:"南京乐品网络科技有限公司"
      }
    },
    mounted(){
      this.initExpand();
      document.getElementById('staffManage').style.minHeight = window.innerHeight - 160 + 'px';
      this.getStaffData();
      this.getDepart();
    },
    methods: {
      //获取员工数据列表
      getStaffData(){
          this.$http.get(globalConfig.server_user+'api/v1/users?q='+this.formInline.keywords+'&page='+this.formInline.page
            +'&per_page_number='+this.formInline.pageNum+'&org_id='+this.formInline.org_id).then((res) => {
              if(res.data.status === 'success'){
                this.tableData = res.data.data;
                this.totalNum = res.data.meta.total;
              }
          })
      },
//      搜索
      search(){
          this.getStaffData();
      },
      //右键菜单
      openContextMenu(row, event){
        this.editId = row.id;
        this.lists = [
          {clickIndex: 'edit', headIcon: 'el-icon-edit', label: '编辑',},
          {clickIndex: 'delete', headIcon: 'el-icon-delete', label: '删除',},
        ];
        let e = event || window.event;	//support firefox contextmenu
        this.show = false;
        this.rightMenuX = e.clientX + document.documentElement.scrollLeft - document.documentElement.clientLeft;
        this.rightMenuY = e.clientY + document.documentElement.scrollTop - document.documentElement.clientTop;

//        console.log(this.rightMenuX,this.rightMenuY)
        event.preventDefault();
        event.stopPropagation();
        this.$nextTick(() => {
          this.show = true
        })
      },
      //右键回调时间
      clickEvent (index) {
        this.openModalDialog(index);
      },
      openModalDialog(type){
        if(type === 'edit'){
          this.addStaffDialog = true;
          this.isEdit = true;
        }else if(type === 'delete'){
          this.$confirm('此操作将永久删除, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.deleteStaff();
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }
      },
      //关闭右键菜单
      closeMenu(){
        this.show = false;
      },
      deleteStaff(){
        this.$http.delete(globalConfig.server_user+'api/v1/users/'+this.editId).then((res) => {
          if(res.data.status === 'success'){
            this.getStaffData();
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }else {
            this.$message({
              message: res.data.message,
              type: 'warning'
            });
          }
        })
      },
      //新建员工
      addStaff(){
        this.addStaffDialog = true;
        this.isEdit = false;
      },
      closeAddStaff(val){
        this.addStaffDialog = false;
        this.isEdit = false;
        this.editId = '';
        if(val === 'success'){
          this.getStaffData();
        }
      },
      //分页
      handleSizeChange(val) {
        this.formInline.pageNum = val;
        this.search();
      },
      handleCurrentChange(val) {
        this.formInline.page = val;
        this.search();
      },
      //-------------部门排序--------------------
      sortDepartment(){
          this.isDepartment = !this.isDepartment;
      },
      initExpand(){
        this.setTree.map((a) => {
//          this.defaultExpandKeys.push(a.id)
        });
        this.isLoadingTree = true;
        this.$nextTick(() => {
          this.setSort()
        })
      },
      setSort() {
        const el = document.querySelectorAll('#sortTable ul')[0];
        this.sortable = Sortable.create(el, {
          onEnd: evt => {
//            const tempIndex = this.newList.splice(evt.oldIndex, 1)[0]
//            this.newList.splice(evt.newIndex, 0, tempIndex)
          }
        })
      },


      //----------------部门增删改查------------------------
      //获取部门数据
      getDepart(){
        this.$http.get(globalConfig.server_user+'api/v1/organizations').then((res) => {
          this.arrList = res.data.data;
          this.setTree = this.recurrence(null);
          this.defaultExpandKeys=[];
          this.arrList.forEach((item) => {
            this.defaultExpandKeys.push(item.id);
          });
        })
      },
      //把数据转化为树形数据结构
      recurrence(num){
        let list = [];
        this.arrList.forEach((item) => {
          if(item.parent_id === num){
            let tmp = this.recurrence(item.id);
            if(tmp){
              item['children'] = tmp;
            }
            list.push(item);
          }
        });
        return list
      },

      renderContent(h,{node,data,store}){//加载节点
        let that = this;
        return h(TreeRender,{
          props: {
            DATA: data,
            NODE: node,
            STORE: store,
//            maxExpandId: that.non_maxExpandId
          },
          on: {
            nodeAdd: ((s,d,n) => that.handleAdd(s,d,n)),
            nodeEdit: ((s,d,n) => that.handleEdit(s,d,n)),
            nodeDel: ((s,d,n) => that.handleDelete(s,d,n))
          }
        });
      },
      //点击节点
      nodeClick(data,node,store){
        this.formInline.org_id = data.id;
        this.selectDepart = data.name;
        this.getStaffData();
      },
      handleAdd(s,d,n){//增加节点
        this.addDepart(d.id);
      },
      handleEdit(s,d,n){//编辑节点
        this.editDepart(d.id);
      },
      handleDelete(s,d,n){//删除节点
        this.$confirm('您确定删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.deleteDpr(d.id);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //新建部门
      addDepart(id){
          this.parentId = id;
          this.addDepartDialog = true
      },
      closeAddDepart(val){
        this.addDepartDialog = false;
        this.parentId = null;
        if(val === 'success'){
          this.getDepart();
        }
      },
      //删除部门
      deleteDpr(id){
          this.$http.delete(globalConfig.server_user+'api/v1/organizations/'+id).then((res) =>{
              if(res.data.status === 'success'){
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                this.getDepart();
              }else {
                this.$message({
                  message: res.data.message,
                  type: 'warning'
                });
              }
          })
      },
      //编辑部门
      editDepart(id){
        this.departId = id;
        this.editDepartDialog = true;
      },
      //编辑部门回调
      closeEditDepart(val){
        this.editDepartDialog = false;
        this.departId = null;
        if(val === 'success'){
          this.getDepart();
        }
      },

      //***********************************
      //关闭选人框回调
      closeOrganization(){
          this.organizationDialog = false;
      },


      //确定排序
      confirmSave(){
        this.$confirm('您确定保存吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '保存成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消保存'
          });
        });
      },

    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped="" lang="scss">
  #staffManage{
    min-height: 790px;
    .border{
      border: 1px solid #6a8dfb;
      border-radius: 4px;
      min-height: 790px;
      .top{
        padding:0 10px;
        height: 40px;
        background: #6a8dfb;
        color: #ffffff;
        font-size: 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      #sortTable{
        user-select: none;
        padding: 10px;
        .ul_header{
          background: #ecf5ff;
          cursor: default;
          padding: 8px;
          border-bottom: 1px solid #ebeef5;
          text-align: center;
          &:hover{
            background: #ecf5ff;
          }
        }
        li{
          padding: 8px;
          background: #ffffff;
          border-bottom: 1px solid #ebeef5;
          cursor: move;
          &:hover{
            background: #f5f7fa;
          }
        }
      }
    }

    .left{

    }
    .right{
      .top{
        display: flex;
        justify-content: space-between;
      }
      .filter{
        padding: 10px 10px 0 10px;
      }
      .staffTable{
        padding: 0 10px;
      }
      .tableBottom{
        padding: 8px;
        display: flex;
        justify-content: flex-end;
      }
    }
  }
</style>
