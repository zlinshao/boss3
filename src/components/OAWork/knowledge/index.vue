<template>
    <div>
      <div class="filter">
        <el-form :inline="true" :model="formInline" size="mini" class="demo-form-inline">
          <el-form-item>
            <el-input v-model="formInline.name" placeholder="搜索">
              <el-button slot="append" type="primary" icon="el-icon-search"></el-button>
            </el-input>
          </el-form-item>

          <el-form-item style="float: right">
            <el-button type="primary" @click="openModal">点击上传</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="main">
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="dictionary_left">
              <div class="dictionary_top">
                <span>乐伽大学知识体系</span>
              </div>
              <el-tree ref="expandMenuList" class="expand-tree"
                       v-if="isLoadingTree"
                       :data="setTree"
                       node-key="id"
                       highlight-current
                       show-checkbox
                       accordion
                       check-strictly
                       :props="defaultProps"
                       :expand-on-click-node="false"
                       :render-content="renderContent"
                       @check-change = 'handleNodeClick'
                       @node-click="handleNodeClick">
              </el-tree>
            </div>
          </el-col>
          <el-col :span="18">
            <div class="dictionary_right">
              <div>
                <el-table
                  :data="tableData"
                  style="width: 100%">
                  <el-table-column
                    prop="date"
                    label="标题">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="作者">
                  </el-table-column>
                  <el-table-column
                    prop="date"
                    label="发布人">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="发布时间">
                  </el-table-column>
                  <el-table-column
                    prop="date"
                    label="发布类型">
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
          </el-col>
        </el-row>
      </div>
      <AddKnowledge :addKnowledgeDialog="addKnowledgeDialog" @close="closeAddKnowledge"></AddKnowledge>
    </div>
</template>

<script>
  import TreeRender from '../../systemSetting/userDictionary/treeRender.vue'
  import api from '../../systemSetting/userDictionary/api.js'
  import AddKnowledge from './components/addKnowledge.vue'

  export default{
    name: 'tree',
    components:{AddKnowledge},
    data(){
      return{
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
        addKnowledgeDialog:false,

        maxExpandId: api.maxExpandId,//新增节点开始id
        non_maxExpandId: api.maxExpandId,//新增节点开始id(不更改)
        isLoadingTree: false,//是否加载节点树
        setTree: api.treelist,//节点树数据
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        defaultExpandKeys: [],//默认展开节点列表
      }
    },
    mounted(){
      this.initExpand()
    },
    methods: {
      initExpand(){
        this.setTree.map((a) => {
          this.defaultExpandKeys.push(a.id)
        });
        this.isLoadingTree = true;
      },
      handleNodeClick(d,n,s){//点击节点
        console.log(d,n,s)
        d.isEdit = false;//放弃编辑状态
      },
      renderContent(h,{node,data,store}){//加载节点
        let that = this;
        return h(TreeRender,{
          props: {
            DATA: data,
            NODE: node,
            STORE: store,
            maxExpandId: that.non_maxExpandId
          },
          on: {
            nodeAdd: ((s,d,n) => that.handleAdd(s,d,n)),
            nodeEdit: ((s,d,n) => that.handleEdit(s,d,n)),
            nodeDel: ((s,d,n) => that.handleDelete(s,d,n))
          }
        });
      },
      handleAddTop(){
        this.setTree.push({
          id: ++this.maxExpandId,
          name: '新增节点',
          pid: '',
          isEdit: false,
          children: []
        })
      },
      handleAdd(s,d,n){//增加节点
        console.log(s);
        console.log(d);
        console.log(n);
        if(n.level >=6){
          this.$message.error("最多只支持五级！");
          return false;
        }
        //添加数据
        d.children.push({
          id: ++this.maxExpandId,
          name: '新增节点',
          pid: d.id,
          isEdit: false,
          children: []
        });
        //展开节点
        if(!n.expanded){
          n.expanded = true;
        }
      },
      handleEdit(s,d,n){//编辑节点
        console.log(s,d,n)
      },
      handleDelete(s,d,n){//删除节点
        console.log(s,d,n);
        let that = this;
        //有子级不删除
        if(d.children && d.children.length !== 0){
          this.$message.error("此节点有子级，不可删除！");
          return false;
        }else{
          //新增节点直接删除，否则要询问是否删除
          let delNode = () => {
            let list = n.parent.data.children || n.parent.data,//节点同级数据
              _index = 99999;//要删除的index
            /*if(!n.parent.data.children){//删除顶级节点，无children
             list = n.parent.data
             }*/
            list.map((c,i) => {
              if(d.id === c.id){
                _index = i;
              }
            });
            let k = list.splice(_index,1);
            //console.log(_index,k)
            this.$message.success("删除成功！")
          };
          let isDel = () => {
            that.$confirm("是否删除此节点？","提示",{
              confirmButtonText: "确认",
              cancelButtonText: "取消",
              type: "warning"
            }).then(() => {
              delNode()
            }).catch(() => {
              return false;
            })
          };
          //判断是否新增
          d.id > this.non_maxExpandId ? delNode() : isDel()

        }
      },
      handleCurrentChange(){},

      handleSizeChange(){},
      openModal(){
        this.addKnowledgeDialog = true;
      },
      closeAddKnowledge(){
          this.addKnowledgeDialog = false;
      }
    }

  }
</script>

<style lang="scss">
    .main{
      .dictionary_left{
        border: 1px solid #dfe6fb;
        border-radius: 5px;
        .dictionary_top{
          padding: 10px;
          background: #dfe6fb;
          display: flex;
          justify-content: space-between;
        }
        .expand-tree{
          .is-current{
            overflow:hidden;
            >.el-tree-node__content{
              .tree-btn{
                display: block;
              }
              .tree-label{
                font-weight:600;
                white-space:normal;
              }
            }
          }

          .el-tree-node{
            &:hover{
              overflow:hidden;
            }
          }

          .el-tree-node__content{
            height: 30px;
            &:hover .tree-btn{
              display:inline-block;
            }
          }
        }
      }

      .dictionary_right{
        border: 1px solid #dfe6fb;
        border-radius: 5px;
        height: 708px;
        .tableBottom {
          padding: 8px;
          display: flex;
          justify-content: flex-end;

        }
      }
    }
</style>
