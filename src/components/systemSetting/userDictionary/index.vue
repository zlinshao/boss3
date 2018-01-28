<template>
  <div id="dictionary">
    <div class="dic_content">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="dictionary_left">
            <div class="dictionary_top">
              <span>用户字典</span>
              <el-button size="mini" type="primary" style="text-align: right">使用指南</el-button>
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
          <div class="dictionary_right"></div>
        </el-col>
      </el-row>

        <!--<el-button @click="handleAddTop">添加顶级节点</el-button>-->
    </div>
  </div>
</template>
<!-- VUE饿了么树形控件添加增删改功能按钮 -->
<script>
  import TreeRender from './treeRender.vue'
  import api from './api.js'

  export default{
    name: 'tree',
    data(){
      return{
        maxExpandId: api.maxExpandId,       //新增节点开始id
        non_maxExpandId: api.maxExpandId,   //新增节点开始id(不更改)
        isLoadingTree: false,               //是否加载节点树
        setTree: api.treelist,              //节点树数据
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        defaultExpandKeys: [],              //默认展开节点列表
      }
    },
    mounted(){
      this.initExpand();
    },
    methods: {
      initExpand(){
        this.setTree.map((a) => {
          this.defaultExpandKeys.push(a.id);
        });
        this.isLoadingTree = true;
      },
      handleNodeClick(d,n,s){                 //点击节点
         console.log(d,n,s);
        d.isEdit = false;                     //放弃编辑状态
      },
      renderContent(h,{node,data,store}){     //加载节点
        let that = this;
        return h(TreeRender,{
          props: {
            DATA: data,
            NODE: node,
            STORE: store,
            maxExpandId: that.non_maxExpandId,
          },
          on: {
            nodeAdd: ((s,d,n) => that.handleAdd(s,d,n)),
            nodeEdit: ((s,d,n) => that.handleEdit(s,d,n)),
            nodeDel: ((s,d,n) => that.handleDelete(s,d,n)),
          }
        });
      },
      handleAddTop(){
        this.setTree.push({
          id: ++this.maxExpandId,
          name: '新增节点',
          pid: '',
          isEdit: false,
          children: [],
        })
      },
      handleAdd(s,d,n){       //增加节点
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
          children: [],
        });
        //展开节点
        if(!n.expanded){
          n.expanded = true;
        }
      },
      handleEdit(s,d,n){        //编辑节点
        console.log(s,d,n)
      },
      handleDelete(s,d,n){      //删除节点
        console.log(s,d,n);
        let that = this;
        //有子级不删除
        if(d.children && d.children.length !== 0){
          this.$message.error("此节点有子级，不可删除！");
          return false;
        }else{
          //新增节点直接删除，否则要询问是否删除
          let delNode = () => {
            let list = n.parent.data.children || n.parent.data,   //节点同级数据
              _index = 99999;                                     //要删除的index
            /*if(!n.parent.data.children){                        //删除顶级节点，无children
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
          d.id > this.non_maxExpandId ? delNode() : isDel();

        }
      },
    }

  }
</script>

<style lang="scss">
  #dictionary{
    height: 100%;
    .dic_content{
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
      }
    }
  }
</style>
