<template>
    <div id="staffManage">
      <el-row :gutter="10">
        <el-col :span="6">
          <div class="border left">
            <div class="top">
              <div>
                组织架构
              </div>
              <div>
                <el-button size="mini">使用指南</el-button>
              </div>
            </div>
            <div id="dragTree">
              <el-tree ref="expandMenuList" class="expand-tree"
                       :data="setTree"
                       node-key="id"
                       highlight-current
                       accordion
                       check-strictly
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

              <div>乐伽商业管理有限公司</div>

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
                  <el-form-item>
                    <el-input v-model="formInline.name" placeholder="搜索">
                      <el-button slot="append" type="primary" icon="el-icon-search"></el-button>
                    </el-input>
                  </el-form-item>
                </el-form>
              </div>

              <div class="staffTable">
                <el-table
                  :data="tableData"
                  style="width: 100%">
                  <el-table-column
                    prop="date"
                    label="员工姓名">
                  </el-table-column>
                  <el-table-column
                    prop="date"
                    label="部门">
                  </el-table-column>
                  <el-table-column
                    prop="date"
                    label="职务">
                  </el-table-column>
                  <el-table-column
                    prop="date"
                    label="人员状态">
                  </el-table-column>
                  <el-table-column
                    prop="date"
                    label="等级">
                  </el-table-column>
                  <el-table-column
                    prop="date"
                    label="手机号">
                  </el-table-column>
                  <el-table-column
                    prop="date"
                    label="入职时间">
                  </el-table-column>
                  <el-table-column
                    prop="date"
                    label="第一次合同">
                  </el-table-column>
                  <el-table-column
                    prop="date"
                    label="第二次合同">
                  </el-table-column>
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
                  :total="400">
                </el-pagination>
              </div>
            </div>

          </div>
        </el-col>
      </el-row>
      <Organization :organizationDialog="organizationDialog" @close="closeOrganization"></Organization>
    </div>
</template>

<script>
  import TreeRender from './components/treeRender.vue'
  import api from '../../systemSetting/userDictionary/api.js'
  import Organization from '../../common/organization.vue'
  import Sortable from 'sortablejs'
  export default{
    name: 'tree',
    components:{Organization},
    data(){
      return{
//        maxExpandId: api.maxExpandId,//新增节点开始id
//        non_maxExpandId: api.maxExpandId,//新增节点开始id(不更改)
        setTree: api.treelist,//节点树数据
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        defaultExpandKeys: [],//默认展开节点列表

        formInline:{},
        tableData:[],
        organizationDialog:"",
        sortable: null,
        currentPage:1,
        isDepartment : false,
        //......................
        params:{
            name:'libai',
            phone:15255556666,
            org_id:1
        }
      }
    },
    mounted(){
      this.initExpand();
      document.getElementById('staffManage').style.minHeight = window.innerHeight - 160 + 'px';
      this.getStaffData();
    },
    methods: {
      //获取员工数据列表
      getStaffData(){
          this.$ajax.post('api/v1/users',this.params).then((res) => {
              console.log(res)
          })
      },
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
      handleAdd(s,d,n){//增加节点
        console.log(n)
//        if(n.level >=6){
//          this.$message.error("最多只支持五级！");
//          return false;
//        }
//        //添加数据
//        d.children.push({
//          id: ++this.maxExpandId,
//          name: '新增节点',
//          pid: d.id,
//          isEdit: false,
//          children: []
//        });
//        //展开节点
//        if(!n.expanded){
//          n.expanded = true;
//        }
      },
      handleEdit(s,d,n){//编辑节点
        console.log(d)
      },
      handleDelete(s,d,n){//删除节点
//        console.log(s,d,n);
//        let that = this;
//        //有子级不删除
//        if(d.children && d.children.length !== 0){
//          this.$message.error("此节点有子级，不可删除！");
//          return false;
//        }else{
//          //新增节点直接删除，否则要询问是否删除
//          let delNode = () => {
//            let list = n.parent.data.children || n.parent.data,//节点同级数据
//              _index = 99999;//要删除的index
//            /*if(!n.parent.data.children){//删除顶级节点，无children
//             list = n.parent.data
//             }*/
//            list.map((c,i) => {
//              if(d.id === c.id){
//                _index = i;
//              }
//            });
//            let k = list.splice(_index,1);
//            //console.log(_index,k)
//            this.$message.success("删除成功！")
//          };
//          let isDel = () => {
//            that.$confirm("是否删除此节点？","提示",{
//              confirmButtonText: "确认",
//              cancelButtonText: "取消",
//              type: "warning"
//            }).then(() => {
//              delNode()
//            }).catch(() => {
//              return false;
//            })
//          };
//          //判断是否新增
//          d.id > this.non_maxExpandId ? delNode() : isDel()
//
//        }
      },

      closeOrganization(){
          this.organizationDialog = false;
      },
      //分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
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
      }
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
