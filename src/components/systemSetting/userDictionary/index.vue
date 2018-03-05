<template>
  <div id="dictionary" @click="show=false" @contextmenu="closeMenu">
    <div class="dic_content">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="dictionary_left">
            <div class="dictionary_top">
              <span>用户字典</span>
              <el-button size="mini" type="primary" style="text-align: right">使用指南</el-button>
            </div>
            <el-tree
              ref="expandMenuList" class="expand-tree"
              v-if="isLoadingTree"
              :data="setTree"
              node-key="id"
              highlight-current
              accordion
              check-strictly
              :default-expanded-keys="defaultExpandKeys"
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
            <div class="topAdd" v-if="clickTag === 'click' && !dynamicTagsStatus">
              <el-button type="primary" size="mini" @click="dictAdd(clickTreeData)">
                <i class="el-icon-plus"></i>&nbsp;新增字典
              </el-button>
            </div>
            <p style="text-align: center" v-if="clickTag !== 'click' && !dynamicTagsStatus">请选择模块</p>
            <p style="text-align: center" v-if="dynamicTagsStatus">模块已下架</p>
            <div v-for="tag in dynamicTags">
              <div class="right_top" @contextmenu="houseMenu(tag,$event,'tag')" v-if="!dictStatus">
                <p :class="{'colorAAA':tag.status === 8}">{{tag.dictionary_name}}<span
                  v-if="tag.status === 8">(已下架)</span></p>
              </div>

              <div v-if="!dictStatus && tag.status !== 8">
                <el-tag
                  class="disableTag"
                  :type="item.status === 8 ? 'info': 'primary'"
                  :key="index"
                  v-if="tag.children.length !== 0"
                  v-for="(item,index) in tag.children"
                  :disable-transitions="false"
                  @contextmenu.native="houseMenu(item,$event,'item')">
                  {{item.dictionary_name}}
                </el-tag>
                <!--<el-input-->
                <!--class="inputNewTag"-->
                <!--v-if="inputVisible === tag.id"-->
                <!--v-model="inputValue"-->
                <!--ref="saveTagInput"-->
                <!--size="small"-->
                <!--@keyup.enter.native="handleInputConfirm()"-->
                <!--@blur="handleInputConfirm()">-->
                <!--</el-input>-->
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <!--右键-->
    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperate="clickEvent"></RightMenu>

    <TreeModule :module="treeModule" :msg="treeData" @close="initExpand" @dict="dictTitle"></TreeModule>
  </div>
</template>
<!-- VUE饿了么树形控件添加增删改功能按钮 -->
<script>
  import TreeRender from './treeRender.vue'
  import TreeModule from './components/treeModule.vue'
  import RightMenu from '../../common/rightMenu.vue'    //右键

  export default {
    name: 'tree',
    components: {TreeModule, RightMenu},
    data() {
      return {
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],

        treeModule: false,
        treeData: {},
        clickTreeData: {},
        maxExpandId: 0,                     //新增节点开始id
        non_maxExpandId: 0,                 //新增节点开始id(不更改)
        isLoadingTree: false,               //是否加载节点树
        setTree: [],                        //节点树数据

        tags: {},
        dictListId: '',                     //刷新字典id

        defaultProps: {
          children: 'children',
          label: 'name'
        },
        defaultExpandKeys: [],              //默认展开节点列表

        dynamicTags: [],
        dynamicTagsStatus: false,
        clickTag: '',
        inputVisible: '',
        inputValue: '',

        dictStatus: false,
      }
    },
    mounted() {
      this.initExpand(2);
    },
    methods: {
      // 显示新标签输入框
      showInput(tag) {
        this.inputVisible = tag.id;
        this.tags = tag;
      },

      // 确认新增标签
      handleInputConfirm() {
        this.$http.post('setting/dictionary/save', {
          dictionary_name: this.inputValue,
          type: 5,
          status: this.tags.status,
          variable: '',
          parent_id: this.tags.id,
        }).then((res) => {
          if (res.data.code === '30020') {
            this.dynamicTags[0].children.push(res.data.data);
            this.inputVisible = '';
            this.inputValue = '';
          }
        });
      },

      // 增加模板
      handleAdd(s, d, n) {
        if (n.level >= 6) {
          this.$message.error("最多只支持五级！");
          return false;
        } else {
          this.treeModule = true;
          this.treeData = d;
          this.treeData.revise = '';
          this.treeData.rev = ''
        }
      },
      // 编辑模板
      handleEdit(s, d, n) {
        this.treeModule = true;
        this.$http.get('setting/dictionary/read/' + d.id).then((res) => {
          this.treeData = res.data.data;
          this.treeData.revise = 'revise';
          if (s === 'dict') {
            this.treeData.rev = 'dict'
          } else {
            this.treeData.rev = ''
          }
        })
      },

      // 模块上下架
      handSelf(s, d, n) {
        this.highLow(d, '');
      },

      // 字典上架下架
      highLow(val, s) {
        let content;
        console.log(val);
        if (val.status === 7) {
          content = '此操作将下架, 是否继续?'
        } else {
          content = '此操作将上架, 是否继续?'
        }
        this.$confirm(content, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.get('setting/dictionary/show/' + val.id).then((res) => {
            if (res.data.code === '30050') {
              if (s === 'dict') {
                this.dictList(this.dictListId);
              } else {
                this.initExpand(2);
              }
              this.$message({
                type: 'success',
                message: res.data.msg,
              });
            } else {
              this.$message({
                type: 'default',
                message: res.data.msg,
              });
            }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      },

      // 模块列表
      initExpand(val) {
        this.treeModule = false;
        if (val === 2) {
          this.$http.get('setting/dictionary/').then((res) => {
            this.setTree = res.data.data;
            res.data.data.map((a) => {
              this.defaultExpandKeys.push(a.id);
            });
          });
          this.isLoadingTree = true;
        }
      },

      // 点击节点
      handleNodeClick(d, n, s) {
        this.clickTag = 'click';
        if (d.status === 7) {
          this.dictList(d.id);
          this.clickTreeData = d;
          this.dictListId = d.id;
          this.dynamicTagsStatus = false;
        } else {
          this.dynamicTags = [];
          this.dynamicTagsStatus = true;
        }
      },

      // 新增最上级字典
      dictAdd(val) {
        this.treeData = val;
        this.treeModule = true;
        this.treeData.rev = 'dict'
      },

      // 修改字典标题回调
      dictTitle() {
        this.dictList(this.dictListId);
      },

      // 字典列表
      dictList(val) {
        this.treeModule = false;
        this.$http.get('setting/dictionary/' + val).then((res) => {
          this.dynamicTags = res.data.data;
        })
      },

      // 加载节点
      renderContent(h, {node, data, store}) {
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
            nodeSelf: ((s, d, n) => that.handSelf(s, d, n)),
          }
        });
      },

      // 右键
      houseMenu(row, event, tag) {
        this.treeData = row;
        this.lists = [

          {clickIndex: 'revise', headIcon: 'el-icon-edit-outline', label: '编辑',},
        ];
        if (row.status === 7) {
          this.lists.push({clickIndex: 'down', headIcon: 'el-icon-sort', label: '下架',});
        } else {
          this.lists.push({clickIndex: 'up', headIcon: 'el-icon-sort', label: '上架',});
        }
        if (tag === 'tag') {
          this.lists.unshift({clickIndex: 'add', headIcon: 'el-icon-plus', label: '新增子字典',});
        }
        this.contextMenuParam(event);
      },

      // 右键回调
      clickEvent(val) {
        if (val === 'add') {
          this.treeModule = true;
          this.treeData.revise = '';
          this.treeData.rev = 'dict'

        } else if (val === 'revise') {
          this.treeData.revise = 'revise';
          this.handleEdit('dict', this.treeData);
        } else if (val === 'up' || val === 'down') {
          this.highLow(this.treeData, 'dict')
        }
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

      // 删除节点
      handleDelete(s, d, n) {      //删除节点
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
        .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
          span {
            font-weight: bold;
          }
        }
        .expand-tree {
          .is-current {
            overflow: hidden;
            > .el-tree-node__content {
              .tree-btn {
                display: block;
              }
              .tree-label {
                /*font-weight: 600;*/
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
        padding: 10px;
        .topAdd {
          text-align: right;
          padding-bottom: 10px;
          border-bottom: 1px solid #dfe6fb;
        }
        .right_top {
          display: flex;
          display: -webkit-flex;
          align-items: center;
          background: #d2e8ff;
          margin-bottom: 3px;
          p {
            padding: 0 10px;
            cursor: pointer;
            color: #37a1ff;
            &:hover {
              color: #66b1ff;
            }
          }
          .colorAAA {
            color: #aaaaaa;
          }
        }
        .disableTag {
          cursor: pointer;
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
