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
                     @check-change='handleNodeClick'
                     @node-click="handleNodeClick">
            </el-tree>
          </div>
        </el-col>
        <el-col :span="18">
          <div class="dictionary_right">
            <div class="right_top" v-if="!dictStatus">
              <p @click="deacidizing"><i class="el-icons-fa-undo"></i>&nbsp;还原字典</p>
              <p @click="dialogTableVisible = true"><i class="el-icons-fa-sort-numeric-desc"></i>&nbsp;一级字典排序</p>
              <p @click="showInput"><i class="el-icon-plus"></i>&nbsp;增加住房性质</p>
            </div>
            <div class="right_top" v-if="dictStatus">
              <p @click="deacidizing">还原字典信息列表</p>
            </div>
            <div v-if="!dictStatus">
              <el-tag
                :key="tag"
                v-for="tag in dynamicTags"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)">
                {{tag}}
              </el-tag>
              <el-input
                class="inputNewTag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm">
              </el-input>
            </div>

            <div v-if="dictStatus">
              <el-row class="listDict" v-for="(item,index) in 10" :key="index">
                <el-col :span="12">
                  <div>
                    <el-input placeholder="请输入内容" v-model="deaContent" size="mini" disabled>
                      <template slot="append">
                        <div style="color: #FFFFFF;cursor: pointer  "><i class="el-icons-fa-undo"></i>&nbsp;还原</div>
                      </template>
                    </el-input>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-col>
      </el-row>
      <!--<el-button @click="handleAddTop">添加顶级节点</el-button>-->
    </div>

    <el-dialog title="字典排序" :visible.sync="dialogTableVisible" width="30%">
      <el-table :data="userData">
        <el-table-column property="date" label="字典名称"></el-table-column>
        <el-table-column label="排序值">
          <template slot-scope="scpoe">
            <el-select v-model="value" placeholder="请选择" size="mini">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
      </el-table>

      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogTableVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="dialogTableVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<!-- VUE饿了么树形控件添加增删改功能按钮 -->
<script>
  import TreeRender from './treeRender.vue'
  import api from './api.js'

  export default {
    name: 'tree',
    data() {
      return {
        maxExpandId: api.maxExpandId,       //新增节点开始id
        non_maxExpandId: api.maxExpandId,   //新增节点开始id(不更改)
        isLoadingTree: false,               //是否加载节点树
        setTree: api.treelist,              //节点树数据
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        defaultExpandKeys: [],              //默认展开节点列表

        dynamicTags: ['标签一', '标签二', '标签三'],
        inputVisible: false,
        inputValue: '',

        dictStatus: false,

        userData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        dialogTableVisible: false,

        options: [{
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
        value: '',
        deaContent: '发货的苦大师傅立刻的撒',
      }
    },
    mounted() {
      this.initExpand();
    },
    methods: {
      // 删除标签
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },
      // 显示标签输入框
      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      // 确认新增标签
      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
      // 还原字典
      deacidizing() {
        this.dictStatus = !this.dictStatus;
      },

      initExpand() {
        this.setTree.map((a) => {
          this.defaultExpandKeys.push(a.id);
        });
        this.isLoadingTree = true;
      },
      handleNodeClick(d, n, s) {                 //点击节点
        console.log(d, n, s);
        d.isEdit = false;                     //放弃编辑状态
      },
      renderContent(h, {node, data, store}) {     //加载节点
        let that = this;
        return h(TreeRender, {
          props: {
            DATA: data,
            NODE: node,
            STORE: store,
            maxExpandId: that.non_maxExpandId,
          },
          on: {
            nodeAdd: ((s, d, n) => that.handleAdd(s, d, n)),
            nodeEdit: ((s, d, n) => that.handleEdit(s, d, n)),
            nodeDel: ((s, d, n) => that.handleDelete(s, d, n)),
          }
        });
      },
      handleAddTop() {
        this.setTree.push({
          id: ++this.maxExpandId,
          name: '新增节点',
          pid: '',
          isEdit: false,
          children: [],
        })
      },
      handleAdd(s, d, n) {       //增加节点
        console.log(s);
        console.log(d);
        console.log(n);
        if (n.level >= 6) {
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
        if (!n.expanded) {
          n.expanded = true;
        }
      },
      handleEdit(s, d, n) {        //编辑节点
        console.log(s, d, n)
      },
      handleDelete(s, d, n) {      //删除节点
        console.log(s, d, n);
        let that = this;
        //有子级不删除
        if (d.children && d.children.length !== 0) {
          this.$message.error("此节点有子级，不可删除！");
          return false;
        } else {
          //新增节点直接删除，否则要询问是否删除
          let delNode = () => {
            let list = n.parent.data.children || n.parent.data,   //节点同级数据
              _index = 99999;                                     //要删除的index
            /*if(!n.parent.data.children){                        //删除顶级节点，无children
             list = n.parent.data
             }*/
            list.map((c, i) => {
              if (d.id === c.id) {
                _index = i;
              }
            });
            let k = list.splice(_index, 1);
            //console.log(_index,k)
            this.$message.success("删除成功！")
          };
          let isDel = () => {
            that.$confirm("是否删除此节点？", "提示", {
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
  #dictionary {
    height: 100%;
    .dic_content {
      .dictionary_left {
        border: 1px solid #dfe6fb;
        border-radius: 5px;
        .dictionary_top {
          padding: 10px;
          background: #dfe6fb;
          display: flex;
          justify-content: space-between;
        }
        .expand-tree {
          .is-current {
            overflow: hidden;
            > .el-tree-node__content {
              .tree-btn {
                display: block;
              }
              .tree-label {
                font-weight: 600;
                white-space: normal;
              }
            }
          }

          .el-tree-node {
            &:hover {
              overflow: hidden;
            }
          }

          .el-tree-node__content {
            height: 30px;
            &:hover .tree-btn {
              display: inline-block;
            }
          }
        }
      }

      .dictionary_right {
        border: 1px solid #dfe6fb;
        border-radius: 5px;
        height: 708px;
        padding: 0 10px 10px;
        .right_top {
          display: flex;
          display: -webkit-flex;
          p {
            padding: 0 10px;
            cursor: pointer;
            i {
              color: #409EFF;
            }
          }
        }
      }
    }

    .el-tag {
      margin: 6px;
    }
    .inputNewTag {
      width: 150px;
      vertical-align: middle;
    }

    .listDict {
      margin-left: 10px;
      margin-bottom: 16px;
      .el-input-group__append, .el-input-group__prepend {
        background: #66b1ff;
      }
    }
  }
</style>
