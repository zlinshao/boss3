<template>
  <div id="staffManage"  @click="show=false" @contextmenu="closeMenu">
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
                     :render-content="renderContent"
                      draggable>
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

          <div  v-show="!isDepartment" style="padding: 10px;">
            <div class="highRanking">
              <div class="tabsSearch">
                <el-form onsubmit="return false;" :inline="true" size="mini" class="demo-form-inline">
                  <!--<el-form-item label="选择部门">-->
                  <!--<el-input @focus="organizationDialog = true" readonly=""></el-input>-->
                  <!--</el-form-item>-->
                  <el-form-item style="float: right">
                    <el-button type="primary" @click="addStaff" v-if="activeName==='first'">新建员工</el-button>
                    <el-button type="primary" @click="addPosition('position')" v-if="activeName==='second'">新建职位</el-button>
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
                  @cell-dblclick="openDetail"
                  style="width: 100%">
                  <el-table-column width="60px">
                    <template slot-scope="scope">
                      <img data-card="" v-if="scope.row.avatar" :data-src="JSON.stringify(scope.row)"
                           :src="scope.row.avatar" style="width: 30px;height: 30px;border-radius: 50%;">
                      <img v-else="" src="../../../assets/images/defaultHead.png" data-card="" :data-src="JSON.stringify(scope.row)"
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
                        prop="org.name"
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
                        prop="postion_type.name"
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
            </el-tabs>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-dialog :close-on-click-modal="false" title="员工详情" :visible.sync="staffDetail" width="50%" >
      <div style="font-size: 16px;">基础信息</div>
      <div style="border: 1px solid #dfe6fb;padding: 0 10px;">
        <el-row :gutter="20">
          <el-col :span="8">
              <p>真实姓名：<span>{{staffDetailData&& staffDetailData.detail && staffDetailData.detail.real_name}}</span></p>
          </el-col>
          <el-col :span="8">
            <p>性别：<span>{{staffDetailData && staffDetailData.detail && staffDetailData.detail.genders}}</span></p>
          </el-col>
          <el-col :span="8">
            <p>手机号码：<span>{{staffDetailData && staffDetailData.phone}}</span></p>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <p>身份证号：<span>{{staffDetailData && staffDetailData.detail && staffDetailData.detail.id_num}}</span></p>
          </el-col>
          <el-col :span="8">
            <p>生日：<span>{{staffDetailData && staffDetailData.detail && staffDetailData.detail.birthday}}</span></p>
          </el-col>
          <el-col :span="8">
            <p>推荐人：<span>{{staffDetailData && staffDetailData.detail && staffDetailData.detail.recommender_name}}</span></p>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="16">
            <p>家庭住址：<span>{{staffDetailData && staffDetailData.detail && staffDetailData.detail.home_addr}}</span></p>
          </el-col>
          <el-col :span="8">
            <p>生育状况： <span>{{staffDetailData && staffDetailData.detail && staffDetailData.detail.fertility_statuss}}</span></p>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <p>银行卡号：<span>{{staffDetailData && staffDetailData.detail && staffDetailData.detail.bank_num}}</span></p>
          </el-col>
          <el-col :span="8">
            <p>开户行：<span>{{staffDetailData && staffDetailData.detail && staffDetailData.detail.account_bank}}</span></p>
          </el-col>
          <el-col :span="8">
            <p>紧急电话：<span>{{staffDetailData && staffDetailData.detail && staffDetailData.detail.emergency_call}}</span></p>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <p>支行：<span>{{staffDetailData && staffDetailData.detail && staffDetailData.detail.branch_bank}}</span></p>
          </el-col>
          <el-col :span="8">
            <p>开户名：<span>{{staffDetailData && staffDetailData.detail && staffDetailData.detail.account_name}}</span></p>
          </el-col>
          <el-col :span="8">
            <p>等级：<span>{{staffDetailData && staffDetailData.detail && staffDetailData.detail.levels}}</span></p>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <p>部门：<span>{{department}}</span></p>
          </el-col>
          <el-col :span="8">
            <!--<p>职位：<span></span></p>-->
          </el-col>
          <el-col :span="8"> <p>岗位：<span>{{currentPost}}</span></p></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <p>账号状态：
              <span v-if="staffDetailData && staffDetailData.is_enable">禁用</span>
              <span v-if="staffDetailData && !staffDetailData.is_enable">启用</span>
            </p>
          </el-col>
          <el-col :span="8">
            <p>在职状态：
              <span v-if="staffDetailData && staffDetailData.is_on_job">离职</span>
              <span v-if="staffDetailData && !staffDetailData.is_on_job">在职</span>
            </p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <p>入职时间：<span>{{staffDetailData && staffDetailData.detail && staffDetailData.detail.enroll}}</span></p>
          </el-col>
          <el-col :span="8">
            <p>薪资：<span>{{staffDetailData && staffDetailData.detail && staffDetailData.detail.salary}}</span></p>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="20">
            <p>入职材料：<span>
                <el-checkbox-group v-model="entry_materials" style="display: inline;">
                  <el-checkbox  v-for="item in entryMaterialsCategory" :label="item.id" :key="item.id" :value="item.id" disabled>{{item.dictionary_name}}</el-checkbox>
                </el-checkbox-group>
              </span>
            </p>
          </el-col>
        </el-row>
      </div>
      <div style="font-size: 16px;">辅助信息</div>
      <div style="border: 1px solid #dfe6fb;padding: 0 10px;">
        <el-row :gutter="20">
          <el-col :span="8">
            <p>籍贯：<span>{{staffDetailData && staffDetailData.detail && staffDetailData.detail.origin_addr}}</span></p>
          </el-col>
          <el-col :span="8">
            <p>婚姻状况：<span>{{staffDetailData && staffDetailData.detail && staffDetailData.detail.marital_statuss}}</span></p>
          </el-col>
          <el-col :span="8">
            <p>政治面貌：<span>{{staffDetailData && staffDetailData.detail && staffDetailData.detail.political_statuss}}</span></p>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <p>转正时间：<span>{{staffDetailData && staffDetailData.detail && staffDetailData.detail.forward_time}}</span></p>
          </el-col>
          <el-col :span="8">
            <p>企业邮箱：<span>{{staffDetailData && staffDetailData.detail && staffDetailData.detail.mail}}</span></p>
          </el-col>
          <el-col :span="8">
            <p>学历：<span>{{staffDetailData && staffDetailData.detail && staffDetailData.detail.educations}}</span></p>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <p>毕业院校：<span>{{staffDetailData && staffDetailData.detail && staffDetailData.detail.school}}</span></p>
          </el-col>
          <el-col :span="8">
            <p>专业：<span>{{staffDetailData && staffDetailData.detail && staffDetailData.detail.major}}</span></p>
          </el-col>
          <el-col :span="8">
            <p>毕业时间：<span>{{staffDetailData && staffDetailData.detail && staffDetailData.detail.graduation_time}}</span></p>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <p>第一次签合同时间：<span>{{staffDetailData && staffDetailData.detail && staffDetailData.detail.agreement_first_time}}</span></p>
          </el-col>
          <el-col :span="8">
            <p>第一次合同到期时间：<span>{{staffDetailData && staffDetailData.detail && staffDetailData.detail.agreement_first_end_time}}</span></p>
          </el-col>
          <el-col :span="8">
            <p>第二次签合同时间：<span>{{staffDetailData && staffDetailData.detail && staffDetailData.detail.agreement_second_time}}</span></p>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <p>备注：<span>{{staffDetailData && staffDetailData.detail && staffDetailData.detail.remark}}</span></p>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="staffDetail = false">确 定</el-button>
      </span>
    </el-dialog>
    <Organization :organizationDialog="organizationDialog" @close="closeOrganization"></Organization>
    <EditDepart :editDepartDialog="editDepartDialog" :departId="departId" @close="closeEditDepart"></EditDepart>
    <AddStaff :addStaffDialog="addStaffDialog" :isEdit="isEdit" :editId="editId" @close="closeAddStaff" :departmentId="department_id"></AddStaff>
    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperateMore="clickEvent"></RightMenu>
    <AddDepart :addDepartDialog="addDepartDialog" :parentId="parentId" :parentName="parentName" @close="closeAddDepart"></AddDepart>

    <AddPosition :addPositionDialog="addPositionDialog" :addPositionParams="addPositionParams" @close="closeAddPosition"></AddPosition>
    <EditPosition :editPositionDialog="editPositionDialog" :positionId="positionId" :positionName="positionName" @close="closeEditPosition"></EditPosition>
    <EditOnlyPosition :editOnlyPositionDialog="editOnlyPositionDialog" :onlyPositionId="onlyPositionId"
                      :onlyPositionName="onlyPositionName" @close="closeEditOnlyPosition"></EditOnlyPosition>
    <AddPower :module="powerModule" @close="closePower" :powerData="powerData"></AddPower>
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

  import AddPower from './components/addPower.vue'   //权限
  export default {
    name: 'tree',
    components: {
      Organization,
      AddStaff,
      RightMenu,
      EditDepart,
      AddDepart,
      AddPosition,
      EditPosition,
      EditOnlyPosition,
      AddPower
    },
    data() {
      return {
        powerData: [],
        staffDetail: false,
        staffDetailData: {},
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
        params:{
          keywords: '',
          limit: 10,
          page: 1,
          org_id: '',
        },
        staffTableData:[],    //员工列表
        positionTableData:[], //岗位列表
        positionList:[],      //职位列表
        organizationDialog:false,
        sortable: null,
        isDepartment : false,
        //......................
        addStaffDialog:false, //新增用户模态框
        editDepartDialog:false, //编辑部门模态框
        addDepartDialog:false, //新建部门模态框
        addPositionDialog : false, //新建岗位
        editPositionDialog:false,    //修改岗位
        editOnlyPositionDialog:false, //修改职位
        powerModule: false,        //权限
        isEdit:false,
        editId : null,
        totalStaffNum : 0,
        totalOnlyPositionNum : 0,
        totalPositionNum : 0,
        departId:null,
        parentId:null,
        parentName:null,

        loading:true,
        activeName:'',      //当前tab名
        positionId:'',      //岗位id
        positionName:'',
        onlyPositionId:'',  //职位id
        onlyPositionName:'',
        menuType:'',    //右键类别

        department_id:'',  //y用于监听部门变化
        department_name:"",

        isGetStaff:false,
        isGetOnlyPosition:false,
        isGetPosition:false,
        post_position:'', //  职位或岗位
        addPositionParams:[],
        entryMaterialsCategory: [],
        entry_materials: [],
        currentPage: 1,
        department: '',
        currentPost: '',
      }
    },
    mounted(){
      this.initExpand();
      document.getElementById('staffManage').style.minHeight = window.innerHeight - 160 + 'px';
      this.getDepart();
      this.activeName = 'first';
      this.getDefaultData();
      this.getEntryMaterials();
    },
    activated() {
      // this.initExpand();
      // document.getElementById('staffManage').style.minHeight = window.innerHeight - 160 + 'px';
      // this.getDepart();
      // this.activeName = 'first';
      // this.getDefaultData();
      // this.getEntryMaterials();
    },
    watch:{
      department_id(val){
        this.isGetStaff=false;
        this.isGetOnlyPosition=false;
        this.isGetPosition=false;
        this.onlyPositionId = '';
        this.onlyPositionName = '';
        if(this.activeName === 'first'){
          this.getStaffData();
          this.isGetStaff=true;
        }else if(this.activeName === 'second'){
          this.getOnlyPosition();
          this.isGetOnlyPosition=true;
        }
      },
      activeName(val){
        if(val==='first'){
          this.params.limit = 10;
        }else if(val==='second'){
          this.params.limit = 5;
        }
        if(val==='first'&& !this.isGetStaff){
          this.getStaffData();
          this.isGetStaff=true;
        }else if(val==='second'&& !this.isGetOnlyPosition){
          this.getOnlyPosition();
          this.isGetOnlyPosition=true;
        }
      }
    },
    methods: {
      //入职材料
      getEntryMaterials() {
        this.$http.get(globalConfig.server+ 'setting/dictionary/515').then((res) => {
          if(res.data.code === '30010') {
            this.entryMaterialsCategory = res.data.data;
          }else{
            this.entryMaterialsCategory = [];
          }
        });
      },
      openDetail(row) {
        this.staffDetail = true;
        this.$http.get(globalConfig.server + 'manager/staff/' + row.id).then((res) => {
          this.staffDetailData = {};
          if (res.data.code === '10020') {
            let detail = res.data.data.detail;
            if (!detail) {
              return;
            }
            this.staffDetailData = res.data.data;
            this.entry_materials = [];
            if(res.data.data.detail && res.data.data.detail.entry_materials && res.data.data.detail.entry_materials.length>0) {
              for(var i=0;i<res.data.data.detail.entry_materials.length;i++){
                this.entry_materials.push(Number(res.data.data.detail.entry_materials[i]));
              }
              let departNameArray = [];
              if (res.data.data && res.data.data && res.data.data.org.length > 0) {
                res.data.data.org.forEach((item) => {
                  departNameArray.push(item.name);
                });
              }
              this.department = departNameArray.join(',');
              let roleArray = res.data.data.role;
              let roleNames = [];
              if (roleArray && roleArray.length > 0) {
                roleArray.forEach((item) => {
                  roleNames.push(item.display_name);
                });
              }
              this.currentPost = roleNames.join(',');
            }
          }
        });
      },
      getDefaultData() {
        this.$http.get(globalConfig.server+'manager/department/1').then((res) => {
          if(res.data.code === '20020') {
            let data = res.data.data;
            this.params.org_id = data.id;
            this.department_id = data.id;
            this.department_name = data.name;
          }
        });
      },
      //**************部门操作函数********************
      //获取部门数据
      getDepart(){
        this.$http.get(globalConfig.server+'manager/department?search&page&limit=500&list_type=tree').then((res) => {
          if(res.data.code === '20000'){
            this.setTree = res.data.data;
            this.setTree.forEach((item) => {
              if(item.parent_id < 1 && this.defaultExpandKeys.indexOf(item.id)<0){
                this.defaultExpandKeys.push(item.id);
              }
            });
            this.getStaffData();
          }
        });
      },
      //点击节点
      nodeClick(data,node,store) {
        this.params.org_id = data.id;
        this.department_id = data.id;
        this.department_name = data.name;
      },
      nodeExpand(data,node,store) {
        console.log(data)
        if(this.defaultExpandKeys.indexOf(data.id)<0){
          this.defaultExpandKeys.push(data.id)
        }
      },
      nodeCollapse(data,node,store){
        this.defaultExpandKeys.filter((x)=>{
          return x!==data.id;
        })
      },
      handleAdd(s,d,n){//增加节点
        this.addDepart(d);
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
          this.$notify.info({
            title: '消息',
            message: '已取消删除'
          });
        });
      },
      //新建部门
      addDepart(data){
        this.parentId = data.id;
        this.parentName = data.name;
        this.addDepartDialog = true
      },
      closeAddDepart(val){
        this.addDepartDialog = false;
        this.parentId = null;
        this.parentName = null;
        if(val === 'success'){
          this.getDepart();
        }
      },
      //删除部门
      deleteDpr(id){
        this.$http.get(globalConfig.server+'manager/department/delete/'+id).then((res) =>{
          if(res.data.code === '20050'){
            this.$notify.success({
              title: '成功',
              message: res.data.msg,
            });
            this.getDepart();
          }else {
            this.$notify.warning({
              title: '警告',
              message: res.data.msg,
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

      //================权限====================
      closePower() {
        this.powerModule = false;
        this.powerData = [];
      },

      //********************员工操作函数****************
      //获取员工数据列表
      getStaffData(){
        this.$http.get(globalConfig.server+'manager/staff?keywords='+this.params.keywords+'&pages='+this.params.page
          +'&limit='+this.params.limit+'&org_id='+this.params.org_id+'&is_recursion=1').then((res) => {
          if(res.data.code === '10000'){
            this.staffTableData = res.data.data.data;
            this.totalStaffNum = res.data.data.count;
          } else {
            this.staffTableData = [];
            this.totalStaffNum = 0;
          }
        })
      },
      //右键菜单
      openContextMenu(row, event) {
        this.editId = row.id;
        this.menuType = 'staff';
        this.lists = [
          {clickIndex: 'power', headIcon: 'el-icon-edit', label: '权限',data: row},
          {clickIndex: 'edit', headIcon: 'el-icon-edit', label: '修改',},
          // {clickIndex: 'delete', headIcon: 'el-icon-delete', label: '删除',},
        ];
        this.contextParams(event);
      },
      //员工右键回调
      openModalDialog(val){
        if(val.clickIndex === 'edit'){
          this.addStaffDialog = true;
          this.isEdit = true;
        }else if(val.clickIndex === 'delete') {
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
        if (val.clickIndex === 'power') {
          this.powerModule = true;
          this.powerData = val.data;
        }
      },
      //删除员工
      deleteStaff(){
        this.$http.get(globalConfig.server+'manager/staff/delete/'+this.editId).then((res) => {
          if(res.data.code === '10060'){
            this.getStaffData();
            this.$notify.success({
              title: '成功',
              message: '删除成功',
            });
          }else{
            this.$notify.info({
              title: '消息',
              message: res.data.msg
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
        this.getDepart();
      },

      //********************职位操作函数****************
      //获取单独职位列表
      getOnlyPosition(){
        this.positionTableData = [];
        if(this.params.org_id){
          this.$http.get(globalConfig.server+'manager/position?department_id='+this.params.org_id+'&page='+this.params.page
            +'&limit='+this.params.limit).then((res) => {
            if(res.data.code === '20000'){
              this.positionList = res.data.data.data;
              this.totalOnlyPositionNum = res.data.data.count;
              if(res.data.data.data.length > 0){
                this.onlyPositionId = res.data.data.data[0].id;
                this.getPosition();
              }
            }else {
              this.$notify.info({
                title: '消息',
                message: res.data.msg,
              });
              this.positionList = [];
              this.totalOnlyPositionNum = 0;
            }
          })
        }
      },
      //职位右键菜单
      openOnlyPositionMenu(row, event){
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
        this.contextParams(event);
      },
      //职位单击
      clickOnlyPositionMenu(row,event){
        this.onlyPositionId = row.id;
        this.onlyPositionName = row.name;
        this.department_id = row.org.id;
        this.department_name = row.org.name;

        this.getPosition();
      },
      //右键职位回调
      openOnlyPositionDialog(val){
        if(val.clickIndex === 'edit'){
          this.editOnlyPositionDialog = true;
        }else if(val.clickIndex === 'delete'){
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
        }else if(val.clickIndex === 'addPost'){
            this.addPosition('post');
        }
      },

      //修改职位完成回调
      closeEditOnlyPosition(val){
        this.editOnlyPositionDialog = false;
        if(val === 'success'){
          this.getOnlyPosition();
        }
      },
      //删除职位
      deleteOnlyPosition(){
        this.$http.get(globalConfig.server+'manager/position/delete/'+this.onlyPositionId).then((res) =>{
          if(res.data.code === '20050'){
            this.$notify.success({
              title: '消息',
              message: '删除成功',
            });
            this.getOnlyPosition();
          }else {
            this.$notify.warning({
              title: '警告',
              message: res.data.msg,
            });
          }
        })
      },

      //********************岗位操作函数****************
      //根据职位获取岗位
      getPosition(){
        this.$http.get(globalConfig.server+'manager/positions?type=' +this.onlyPositionId+'&page='+this.params.page
          +'&limit='+this.params.limit).then((res) => {
          if(res.data.code === '20000'){
            let arr = res.data.data.data;
            for(let i=0;i<arr.length;i++){
              arr.forEach((item) => {
                if(item.parent_id === arr[i].id){
                  item.parent_name = arr[i].name;
                }
              });
            }
            arr.forEach((item) => {
              item.pName = this.onlyPositionName;
              item.orgId = this.department_id;
              item.orgName = this.department_name;
            });
            this.totalPositionNum = res.data.data.count;
            this.positionTableData = res.data.data.data;
          }else {
            this.totalPositionNum = 0;
            this.positionTableData = [];
          }
        })
      },
      //岗位右键菜单
      openPositionMenu(row, event){
        this.positionId = row.id;
        this.positionName = row.name;
        this.menuType = 'position';
        this.lists = [
          {clickIndex: 'edit', headIcon: 'el-icon-edit', label: '修改',},
          {clickIndex: 'delete', headIcon: 'el-icon-delete', label: '删除',},
        ];
        this.contextParams(event);
      },
      openPositionDialog(val){     //g岗位右键回调函数
        if(val.clickIndex === 'edit'){
          this.editPositionDialog = true;
        }else if(val.clickIndex === 'delete'){
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
      closeEditPosition(val){
        this.editPositionDialog = false;
        if(val === 'success'){
          this.getPosition();
        }
      },
      //删除岗位
      deletePosition(){
        this.$http.get(globalConfig.server+'manager/positions/delete/'+this.positionId).then((res) =>{
          if(res.data.code === '20050'){
            this.$notify.success({
              title: '成功',
              message: '删除成功',
            });
            this.getPosition();
          }else {
            this.$notify.warning({
              title: '警告',
              message: res.data.message,
            });
          }
        })
      },

      //新建岗位  position职位  post岗位
      addPosition(val){
        this.addPositionDialog = true;
        if(val ==='position'){
          this.addPositionParams = Object.assign({},this.addPositionParams,
            {depart_id:this.params.org_id,depart_name:this.department_name,post_position:'position'})
        }else {
          this.addPositionParams = Object.assign({},this.addPositionParams,
            {depart_id:this.params.org_id,depart_name:this.department_name,post_position:'post',
              position_id:this.onlyPositionId,position_name:this.onlyPositionName})
        }
      },
      closeAddPosition(val){
        this.addPositionDialog = false;
        if(val === 'success'){
          if(this.addPositionParams.post_position=== 'position'){
            this.getOnlyPosition();
          }else if(this.addPositionParams.post_position=== 'post'){
            this.getPosition();
          }
        }
      },



      //********************右键配置操作函数****************
      contextParams(event){
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
        if(this.menuType === 'staff'){
          this.openModalDialog(index);
        }else if(this.menuType === 'position'){
          this.openPositionDialog(index);
        }else if(this.menuType==='onlyPosition'){
          this.openOnlyPositionDialog(index);
        }
      },
      //关闭右键菜单
      closeMenu(){
        this.show = false;
      },


      //********************树配置操作函数****************
      renderContent(h,{node,data,store}){//加载节点
        let that = this;
        return h(TreeRender,{
          props: {
            DATA: data,
            NODE: node,
            STORE: store,
          },
          on: {
            nodeAdd: ((s,d,n) => that.handleAdd(s,d,n)),
            nodeEdit: ((s,d,n) => that.handleEdit(s,d,n)),
            nodeDel: ((s,d,n) => that.handleDelete(s,d,n))
          }
        });
      },

      //*************选人框**********************
      //关闭回调
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
          this.$notify.success({
            title: '成功',
            message: '保存成功',
          });
        }).catch(() => {
          this.$notify.info({
            title: '消息',
            message: '已取消',
          });
        });
      },

      //****************搜索*************
      search(){
        if(this.activeName=== 'first'){
          this.getStaffData();
        }else if(this.activeName=== 'second'){
          this.getOnlyPosition();
        }else if(this.activeName=== 'third'){
          this.getPosition();
        }
      },

      //**********分页************************
      handleSizeChange(val) {
        this.params.limit = val;
        console.log(`每页 ${val} 条`);
        this.search();
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.params.page = val;
        this.search();
      },
      //---------------部门排序--------------------
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
  #staffManage{
    min-height: 790px;
    .border{
      border: 1px solid #f0f7ff;
      border-radius: 4px;
      min-height: 790px;
      .top{
        padding:0 10px;
        height: 40px;
        background: #dfe6fb;
        color: #787a7e;
        font-size: 14px;
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
      .tableBottom{
        padding: 8px;
        display: flex;
        justify-content: flex-end;
      }
    }
  }
</style>
