<template>
  <div id="staffManage" @click="show=false" @contextmenu="closeMenu">
    <el-row :gutter="20">
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
                     @node-expand="nodeExpand"
                     @node-collapse="nodeCollapse"
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
            <div>{{department_name}}</div>
            <!--<div @click="sortDepartment">-->
            <!--<el-button size="mini">部门排序</el-button>-->
            <!--&lt;!&ndash;<el-button v-if="isDepartment" style="color: #ffffff" type="text">取消排序</el-button>&ndash;&gt;-->
            <!--</div>-->
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

          <div v-show="!isDepartment" style="padding: 10px;">
            <div class="highRanking">
              <div class="tabsSearch">
                <el-form onsubmit="return false;" :inline="true" size="mini" class="demo-form-inline">
                  <!--<el-form-item label="选择部门">-->
                  <!--<el-input @focus="organizationDialog = true" readonly=""></el-input>-->
                  <!--</el-form-item>-->
                  <el-form-item style="float: right">
                    <el-button type="primary" @click="addStaff" v-if="activeName==='first'">新建员工</el-button>
                    <el-button type="primary" @click="addPosition('position')" v-if="activeName==='second'">新建职位
                    </el-button>
                  </el-form-item>
                  <el-form-item style="float: right">
                    <el-input v-model="params.keywords" placeholder="请输入搜索内容" @keyup.enter.prevent.native="search">
                      <el-button slot="append" type="primary" icon="el-icon-search" @click="search"></el-button>
                    </el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
            <el-tabs v-model="activeName">
              <el-tab-pane label="用户管理" name="first">
                <el-table
                  :data="staffTableData"
                  @row-contextmenu="openContextMenu"
                  style="width: 100%">

                  <el-table-column width="60px">
                    <template slot-scope="scope">
                      <img data-card="" v-if="scope.row.avatar" :data-src="JSON.stringify(scope.row)"
                           :src="scope.row.avatar" style="width: 30px;height: 30px;border-radius: 50%;">
                      <img v-else="" src="../../../assets/images/defaultHead.png" data-card=""
                           :data-src="JSON.stringify(scope.row)"
                           style="width: 30px;height: 30px;border-radius: 50%;filter: grayscale(100%);">
                    </template>
                  </el-table-column>

                  <el-table-column
                    prop="name"
                    label="员工姓名">
                  </el-table-column>
                  <el-table-column
                    label="部门">
                    <template slot-scope="scope">
                      <span v-for="item in scope.row.org">{{item.name}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="岗位">
                    <template slot-scope="scope">
                      <span v-for="item in scope.row.role">{{item.display_name}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="phone"
                    label="手机号">
                  </el-table-column>
                  <el-table-column
                    prop="created_at"
                    label="入职时间">
                  </el-table-column>
                </el-table>
                <div class="tableBottom">
                  <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="10"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalStaffNum">
                  </el-pagination>
                </div>
              </el-tab-pane>
              <el-tab-pane label="职位管理" name="second">
                <div class="tableBox">
                  <div class="blueTable">
                    <el-table
                      :data="positionList"
                      :row-class-name="tableRowClassName"
                      @row-contextmenu="openOnlyPositionMenu"
                      @row-click="clickOnlyPositionMenu"
                      style="width: 100%">
                      <el-table-column
                        prop="name"
                        label="职位">
                      </el-table-column>
                      <el-table-column
                        prop="orgName"
                        label="部门">
                      </el-table-column>
                    </el-table>
                  </div>
                  <div class="tableBottom">
                    <el-pagination
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page="currentPage"
                      :page-sizes="[5, 10, 15, 20]"
                      :page-size="5"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="totalOnlyPositionNum">
                    </el-pagination>
                  </div>
                </div>
                <!--岗位-->
                <div class="tableBox">
                  <div class="greenTable">
                    <el-table
                      :data="positionTableData"
                      @row-contextmenu="openPositionMenu"
                      style="width: 100%">
                      <el-table-column
                        prop="name"
                        label="岗位">
                      </el-table-column>
                      <el-table-column
                        label="上级岗位">
                        <template slot-scope="scope">
                          <span v-if="scope.row.parent_name">{{scope.row.parent_name}}</span>
                          <span v-else=""> &nbsp;暂无&nbsp; </span>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="pName"
                        label="职位">
                      </el-table-column>
                      <el-table-column
                        prop="orgName"
                        label="部门">
                      </el-table-column>
                    </el-table>
                  </div>
                  <div class="tableBottom">
                    <el-pagination
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page="currentPage"
                      :page-sizes="[5, 10, 15, 20]"
                      :page-size="5"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="totalPositionNum">
                    </el-pagination>
                  </div>
                </div>
              </el-tab-pane>

              <!--<el-tab-pane label="岗位管理" name="third">-->
              <!--<el-table-->
              <!--:data="positionTableData"-->
              <!--@row-contextmenu="openPositionMenu"-->
              <!--style="width: 100%">-->
              <!--<el-table-column-->
              <!--prop="name"-->
              <!--label="岗位">-->
              <!--</el-table-column>-->
              <!--<el-table-column-->
              <!--label="上级岗位">-->
              <!--<template slot-scope="scope">-->
              <!--<span v-if="scope.row.parent_name">{{scope.row.parent_name}}</span>-->
              <!--<span v-else=""> &nbsp;暂无&nbsp; </span>-->
              <!--</template>-->
              <!--</el-table-column>-->
              <!--<el-table-column-->
              <!--prop="pName"-->
              <!--label="职位">-->
              <!--</el-table-column>-->
              <!--<el-table-column-->
              <!--prop="orgName"-->
              <!--label="部门">-->
              <!--</el-table-column>-->
              <!--</el-table>-->
              <!--</el-tab-pane>-->

            </el-tabs>


          </div>

        </div>
      </el-col>
    </el-row>
    <Organization :organizationDialog="organizationDialog" @close="closeOrganization"></Organization>
    <EditDepart :editDepartDialog="editDepartDialog" :departId="departId" @close="closeEditDepart"></EditDepart>
    <AddStaff :addStaffDialog="addStaffDialog" :addStaffParams="addStaffParams" :isEdit="isEdit" :editId="editId"
              @close="closeAddStaff"></AddStaff>
    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperate="clickEvent"></RightMenu>
    <AddDepart :addDepartDialog="addDepartDialog" :parentId="parentId" :parentName="parentName"
               @close="closeAddDepart"></AddDepart>

    <AddPosition :addPositionDialog="addPositionDialog" :addPositionParams="addPositionParams"
                 @close="closeAddPosition"></AddPosition>
    <EditPosition :editPositionDialog="editPositionDialog" :positionId="positionId" :positionName="positionName"
                  @close="closeEditPosition"></EditPosition>
    <EditOnlyPosition :editOnlyPositionDialog="editOnlyPositionDialog" :onlyPositionId="onlyPositionId"
                      :onlyPositionName="onlyPositionName" @close="closeEditOnlyPosition"></EditOnlyPosition>

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

  import AddPosition from './components/addPostion.vue'
  import EditPosition from './components/editPostion.vue'
  import EditOnlyPosition from './components/editOnlyPostion.vue'

  export default {
    name: 'tree',
    components: {Organization, AddStaff, RightMenu, EditDepart, AddDepart, AddPosition, EditPosition, EditOnlyPosition},
    data() {
      return {
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],
        /***********/
        arrList: [],
        setTree: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        defaultExpandKeys: [],//默认展开节点列表

        params: {
          keywords: '',
          pageNum: 10,
          page: 1,
          org_id: '',
        },
        staffTableData: [],    //员工列表
        positionTableData: [], //岗位列表
        positionList: [],      //职位列表
        organizationDialog: false,
        sortable: null,
        currentPage: 1,
        isDepartment: false,
        //......................

        addStaffDialog: false, //新增用户模态框
        editDepartDialog: false, //编辑部门模态框
        addDepartDialog: false, //新建部门模态框
        addPositionDialog: false, //新建岗位
        editPositionDialog: false,    //修改岗位
        editOnlyPositionDialog: false, //修改职位
        isEdit: false,
        editId: null,
        totalStaffNum: 0,
        totalOnlyPositionNum: 0,
        totalPositionNum: 0,
        departId: null,
        parentId: null,
        parentName: null,


        loading: true,
        activeName: '',      //当前tab名
        positionId: '',      //岗位id
        positionName: '',
        onlyPositionId: '',  //职位id
        onlyPositionName: '',
        menuType: '',    //右键类别

        department_id: '',  //y用于监听部门变化
        department_name: "",

        isGetStaff: false,
        isGetOnlyPosition: false,
        isGetPosition: false,
        post_position: '', //  职位或岗位
        addPositionParams: [],
        addStaffParams: [],      //新建员工参数
      }
    },
    mounted() {
      this.initExpand();
      document.getElementById('staffManage').style.minHeight = window.innerHeight - 160 + 'px';
      this.getDepart();
      this.activeName = 'first';
      this.$http.get(globalConfig.server_user + 'organizations/1').then((res) => {
        if (res.data.status === 'success') {
          let data = res.data.data;
          this.params.org_id = data.id;
          this.department_id = data.id;
          this.department_name = data.name;
        }
      });
    },
    watch: {
      department_id(val) {
        this.isGetStaff = false;
        this.isGetOnlyPosition = false;
        this.isGetPosition = false;
        this.onlyPositionId = '';
        this.onlyPositionName = '';
        if (this.activeName === 'first') {
          this.getStaffData();
          this.isGetStaff = true;
        } else if (this.activeName === 'second') {
          this.getOnlyPosition();
          this.isGetOnlyPosition = true;
        }
      },
      activeName(val) {
        if (val === 'first') {
          this.params.pageNum = 10;
        } else if (val === 'second') {
          this.params.pageNum = 5;
        }
        if (val === 'first' && !this.isGetStaff) {
          this.getStaffData();
          this.isGetStaff = true;
        } else if (val === 'second' && !this.isGetOnlyPosition) {
          this.getOnlyPosition();
          this.isGetOnlyPosition = true;
        }
      }
    },
    methods: {

      //**************部门操作函数********************
      //获取部门数据
      getDepart() {
        this.$http.get(globalConfig.server_user + 'organizations?per_page_number=500').then((res) => {
          this.arrList = res.data.data;
          this.setTree = this.recurrence(null);
          this.arrList.forEach((item) => {
            if (item.parent_id < 1 && this.defaultExpandKeys.indexOf(item.id) < 0) {
              this.defaultExpandKeys.push(item.id);
            }
          });
          this.getStaffData();
        })
      },
      //把数据转化为树形数据结构
      recurrence(num) {
        let list = [];
        this.arrList.forEach((item) => {
          if (item.parent_id === num) {
            let tmp = this.recurrence(item.id);
            if (tmp) {
              item['children'] = tmp;
            }
            list.push(item);
          }
        });
        return list
      },
      //点击节点
      nodeClick(data, node, store) {
        this.params.org_id = data.id;
        this.department_id = data.id;
        this.department_name = data.name;
      },
      nodeExpand(data, node, store) {
        if (this.defaultExpandKeys.indexOf(data.id) < 0) {
          this.defaultExpandKeys.push(data.id)
        }
      },
      nodeCollapse(data, node, store) {
        this.defaultExpandKeys.filter((x) => {
          return x !== data.id;
        })
      },
      handleAdd(s, d, n) {//增加节点
        this.addDepart(d);
      },
      handleEdit(s, d, n) {//编辑节点
        this.editDepart(d.id);
      },
      handleDelete(s, d, n) {//删除节点
        this.$confirm('您确定删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteDpr(d.id);
        }).catch(() => {
          this.$notify.info({
            title: '消息',
            message: '已取消删除'
          });
        });
      },
      //新建部门
      addDepart(data) {
        this.parentId = data.id;
        this.parentName = data.name;
        this.addDepartDialog = true
      },
      closeAddDepart(val) {
        this.addDepartDialog = false;
        this.parentId = null;
        this.parentName = null;
        if (val === 'success') {
          this.getDepart();
        }
      },
      //删除部门
      deleteDpr(id) {
        this.$http.delete(globalConfig.server_user + 'organizations/' + id).then((res) => {
          if (res.data.status === 'success') {
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success'
            });
            this.getDepart();
          } else {
            this.$notify({
              title: '警告',
              message: res.data.message,
              type: 'warning'
            });
          }
        })
      },
      //编辑部门
      editDepart(id) {
        this.departId = id;
        this.editDepartDialog = true;
      },
      //编辑部门回调
      closeEditDepart(val) {
        this.editDepartDialog = false;
        this.departId = null;
        if (val === 'success') {
          this.getDepart();
        }
      },


      //********************员工操作函数****************
      //获取员工数据列表
      getStaffData() {
        this.$http.get(globalConfig.server_user + 'users?q=' + this.params.keywords + '&page=' + this.params.page
          + '&per_page_number=' + this.params.pageNum + '&org_id=' + this.params.org_id + '&is_recursion=1').then((res) => {
          if (res.data.status === 'success') {
            this.staffTableData = res.data.data;
            this.totalStaffNum = res.data.meta.total;
          } else {
            this.staffTableData = [];
            this.totalStaffNum = 0;
          }
        })
      },
      //右键菜单
      openContextMenu(row) {
        this.editId = row.id;
        this.menuType = 'staff';
        this.lists = [
          {clickIndex: 'edit', headIcon: 'el-icon-edit', label: '修改',},
          {clickIndex: 'delete', headIcon: 'el-icon-delete', label: '删除',},
        ];
        this.contextParams();
      },
      //员工右键回调
      openModalDialog(type) {
        if (type === 'edit') {
          this.addStaffDialog = true;
          this.isEdit = true;
        } else if (type === 'delete') {
          this.$confirm('此操作将永久删除, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.deleteStaff();
          }).catch(() => {
            this.$notify.info({
              title: '消息',
              message: '已取消删除',
            });

          });
        }
      },
      //删除员工
      deleteStaff() {
        this.$http.delete(globalConfig.server_user + 'users/' + this.editId).then((res) => {
          if (res.data.status === 'success') {
            this.getStaffData();
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success'
            });
          } else {
            this.$notify.info({
              title: '消息',
              message: res.data.message
            });
          }
        })
      },
      //新建员工
      addStaff() {
        this.addStaffDialog = true;
        this.isEdit = false;
        this.addStaffParams = Object.assign({}, this.addStaffParams, {
          depart_id: this.params.org_id,
          depart_name: this.department_name
        })
      },
      closeAddStaff(val) {
        this.addStaffDialog = false;
        this.isEdit = false;
        this.editId = '';
        if (val === 'success') {
          this.getStaffData();
        }
      },


      //********************职位操作函数****************
      //获取单独职位列表
      getOnlyPosition() {
        this.positionTableData = [];
        if (this.params.org_id) {
          this.$http.get(globalConfig.server_user + 'position/type?org_id=' + this.params.org_id + '&page=' + this.params.page
            + '&per_page_number=' + this.params.pageNum).then((res) => {
            if (res.data.status === 'success') {
              let tableData = res.data.data;
              this.positionList = [];
              this.totalOnlyPositionNum = res.data.meta.total;
              if (tableData.length > 0) {
                this.onlyPositionId = tableData[0].id;
                this.getPosition();
                tableData.forEach((data) => {
                  let org_id = data.org_id;
                  let org_name = null;
                  //遍历部门部门数组 根据org_id获取部门名称
                  this.arrList.forEach((x) => {
                    if (x.id === org_id) {
                      org_name = x.name
                    }
                  });
                  this.positionList.push(Object.assign({}, data, {orgName: org_name}));
                });
              }
            } else {
              this.$notify.info({
                title: '消息',
                message: res.data.message,
              });
              this.positionList = [];
              this.totalOnlyPositionNum = 0;
            }
          })
        }
      },
      //职位右键菜单
      openOnlyPositionMenu(row, event) {
        this.onlyPositionId = row.id;
        this.onlyPositionName = row.name;
        this.department_id = row.org_id;
        this.department_name = row.orgName;
        this.getPosition();
        this.menuType = 'onlyPosition';
        this.lists = [
          {clickIndex: 'addPost', headIcon: 'el-icon-plus', label: '增加岗位',},
          {clickIndex: 'edit', headIcon: 'el-icon-edit', label: '修改',},
          {clickIndex: 'delete', headIcon: 'el-icon-delete', label: '删除',},
        ];
        this.contextParams();
      },
      //职位单击
      clickOnlyPositionMenu(row, event) {
        this.onlyPositionId = row.id;
        this.onlyPositionName = row.name;
        this.department_id = row.org_id;
        this.department_name = row.orgName;

        this.getPosition();
      },
      //右键职位回调
      openOnlyPositionDialog(type) {
        if (type === 'edit') {
          this.editOnlyPositionDialog = true;
        } else if (type === 'delete') {
          this.$confirm('此操作将永久删除, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.deleteOnlyPosition();
          }).catch(() => {
            this.$notify.info({
              title: '消息',
              message: '已取消删除'
            });
          });
        } else if (type === 'addPost') {
          this.addPosition('post');
        }
      },

      //修改职位完成回调
      closeEditOnlyPosition(val) {
        this.editOnlyPositionDialog = false;
        if (val === 'success') {
          this.getOnlyPosition();
        }
      },
      //删除职位
      deleteOnlyPosition() {
        this.$http.delete(globalConfig.server_user + 'position/type/' + this.onlyPositionId).then((res) => {
          if (res.data.status === 'success') {
            this.$notify({
              title: '消息',
              message: '删除成功',
              type: 'success'
            });
            this.getOnlyPosition();
          } else {
            this.$notify({
              title: '警告',
              message: res.data.message,
              type: 'warning'
            });
          }
        })
      },

      //********************岗位操作函数****************
      //根据职位获取岗位
      getPosition() {
        this.$http.get(globalConfig.server_user + 'positions?type=' + this.onlyPositionId + '&page=' + this.params.page
          + '&per_page_number=' + this.params.pageNum).then((res) => {
          if (res.data.status === 'success') {
            let arr = res.data.data;

            for (let i = 0; i < arr.length; i++) {
              arr.forEach((item) => {
                if (item.parent_id === arr[i].id) {
                  item.parent_name = arr[i].name;
                }
              })
            }

            arr.forEach((item) => {
              item.pName = this.onlyPositionName;
              item.orgId = this.department_id;
              item.orgName = this.department_name;
            });
            this.totalPositionNum = res.data.meta.total;
            this.positionTableData = arr;
          } else {
            this.totalPositionNum = 0;
            this.positionTableData = [];
          }
        })
      },
      //根据部门获取岗位
//      getPosition(){
//        let tableData = [];
//        let org_id = null;
//        let org_name = null;
//        //通过职位获取相关部门信息
//        this.$http.get(globalConfig.server_user+'position/type?org_id='+this.params.org_id).then((res) => {
//          if(res.data.status === 'success'){
//            tableData = res.data.data;
//            if(tableData.length>0) {
//              tableData.forEach((data) => {
//                org_id = data.org_id;
//                org_name = null;
//                //遍历部门部门数组 根据org_id获取部门名称
//                this.arrList.forEach((x) => {
//                  if (x.id === org_id) {
//                    org_name = x.name
//                  }
//                });
//              });
//            }
//          }
//        }).then((data)=>{
//          //
//          this.$http.get(globalConfig.server_user+'positions?org_id=' + this.params.org_id+'&page='+this.params.page
//            +'&per_page_number='+this.params.pageNum).then((res) => {
//            if(res.data.status === 'success'){
//              let arr = res.data.data;
//
//              for(let i=0;i<arr.length;i++){
//                arr.forEach((item) => {
//                  if(item.parent_id === arr[i].id){
//                    item.parent_name = arr[i].name;
//                  }
//                })
//              }
//
//              for(let i=0;i<tableData.length;i++){
//                arr.forEach((item) => {
//                  if(item.type === tableData[i].id){
//                    item.pName = tableData[i].name;
//                    item.orgId = org_id;
//                    item.orgName = org_name;
//                  }
//                })
//              }
//              this.totalPositionNum = res.data.meta.total;
//              this.positionTableData = arr;
//            }else {
//              this.totalPositionNum = 0;
//              this.positionTableData = [];
//            }
//          })
//        })
//
//      },
      //岗位右键菜单
      openPositionMenu(row, event) {
        this.positionId = row.id;
        this.positionName = row.name;
        this.menuType = 'position';
        this.lists = [
          {clickIndex: 'edit', headIcon: 'el-icon-edit', label: '修改',},
          {clickIndex: 'delete', headIcon: 'el-icon-delete', label: '删除',},
        ];
        this.contextParams();
      },
      openPositionDialog(type) {     //g岗位右键回调函数
        if (type === 'edit') {
          this.editPositionDialog = true;
        } else if (type === 'delete') {
          this.$confirm('此操作将永久删除, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.deletePosition();
          }).catch(() => {
            this.$notify.info({
              title: '消息',
              message: '已取消删除',
            });
          });
        }
      },

      //修改岗位完成回调
      closeEditPosition(val) {
        this.editPositionDialog = false;
        if (val === 'success') {
          this.getPosition();
        }
      },
      //删除岗位
      deletePosition() {
        this.$http.delete(globalConfig.server_user + 'positions/' + this.positionId).then((res) => {
          if (res.data.status === 'success') {
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success'
            });
            this.getPosition();
          } else {
            this.$notify({
              title: '警告',
              message: res.data.message,
              type: 'warning'
            });
          }
        })
      },

      //新建岗位
      addPosition(val) {
        this.addPositionDialog = true;
        if (val === 'position') {
          this.addPositionParams = Object.assign({}, this.addPositionParams,
            {depart_id: this.params.org_id, depart_name: this.department_name, post_position: 'position'})
        } else {
          this.addPositionParams = Object.assign({}, this.addPositionParams,
            {
              depart_id: this.params.org_id, depart_name: this.department_name, post_position: 'post',
              position_id: this.onlyPositionId, position_name: this.onlyPositionName
            })
        }
      },
      closeAddPosition(val) {
        this.addPositionDialog = false;
        if (val === 'success') {
          if (this.addPositionParams.post_position === 'position') {
            this.getOnlyPosition();
          } else if (this.addPositionParams.post_position === 'post') {
            this.getPosition();
          }
        }
      },


      //********************右键配置操作函数****************
      contextParams() {
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
      clickEvent(index) {
        if (this.menuType === 'staff') {
          this.openModalDialog(index);
        } else if (this.menuType === 'position') {
          this.openPositionDialog(index);
        } else if (this.menuType === 'onlyPosition') {
          this.openOnlyPositionDialog(index);
        }
      },
      //关闭右键菜单
      closeMenu() {
        this.show = false;
      },


      //********************树配置操作函数****************
      renderContent(h, {node, data, store}) {//加载节点
        let that = this;
        return h(TreeRender, {
          props: {
            DATA: data,
            NODE: node,
            STORE: store,
          },
          on: {
            nodeAdd: ((s, d, n) => that.handleAdd(s, d, n)),
            nodeEdit: ((s, d, n) => that.handleEdit(s, d, n)),
            nodeDel: ((s, d, n) => that.handleDelete(s, d, n))
          }
        });
      },


      //*************选人框**********************
      //关闭回调
      closeOrganization() {
        this.organizationDialog = false;
      },


      //确定排序
      confirmSave() {
        this.$confirm('您确定保存吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$notify({
            title: '成功',
            message: '保存成功',
            type: 'success'
          });
        }).catch(() => {
          this.$notify.info({
            title: '消息',
            message: '已取消',
          });
        });
      },

      //****************搜索*************
      search() {
        if (this.activeName === 'first') {
          this.getStaffData()
        } else if (this.activeName === 'second') {
          this.getOnlyPosition();
        } else if (this.activeName === 'third') {
          this.getPosition();
        }
      },

      //**********分页************************
      handleSizeChange(val) {
        this.params.pageNum = val;
        this.search();
      },
      handleCurrentChange(val) {
        this.params.page = val;
        this.search();
      },
      //---------------部门排序--------------------
      sortDepartment() {
        this.isDepartment = !this.isDepartment;
      },
      initExpand() {
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

      //************列表变色************
      tableRowClassName({row, rowIndex}) {
        if (row.id === this.onlyPositionId) {
          return 'success-row';
        }
        return '';
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped="" lang="scss">
  #staffManage {
    min-height: 790px;
    .border {
      /*border: 1px solid #6a8dfb;*/
      border-radius: 4px;
      min-height: 790px;
      .top {
        padding: 0 10px;
        height: 40px;
        background: #6a8dfb;
        color: #ffffff;
        font-size: 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      #sortTable {
        user-select: none;
        padding: 10px;
        .ul_header {
          background: #ecf5ff;
          cursor: default;
          padding: 8px;
          border-bottom: 1px solid #ebeef5;
          text-align: center;
          &:hover {
            background: #ecf5ff;
          }
        }
        li {
          padding: 8px;
          background: #ffffff;
          border-bottom: 1px solid #ebeef5;
          cursor: move;
          &:hover {
            background: #f5f7fa;
          }
        }
      }
    }

    .left {

    }
    .right {
      .top {
        display: flex;
        justify-content: space-between;
      }
      .filter {
        padding: 10px 10px 0 10px;
      }
      .staffTable {
        padding: 0 10px;
      }
      .tableBox {
        border: 1px solid #dfe6fb;
        margin-bottom: 20px;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
        .tableBottom {
          padding: 8px;
          display: flex;
          justify-content: flex-end;
        }
      }
      .tableBottom {
        padding: 8px;
        display: flex;
        justify-content: flex-end;
      }
    }
  }
</style>
