<template>
  <div id="instruction">
    <el-dialog title="功能说明" :visible.sync="instructionDialogVisible" width="62%">
      <div>
        <el-row :gutter="20" class="instruct_main">
          <el-col :span="6" class="instruct_right scroll_bar">
          <div id="dragTree">
            <el-tree ref="expandMenuList" class="expand-tree"
                     :data="setTree"
                     node-key="id"
                     @node-click="nodeClick"
                     :default-expanded-keys="defaultExpandKeys"
                     :props="defaultProps"
                     :expand-on-click-node="false"
                     :render-content="renderContent">
            </el-tree>
          </div>
          </el-col>
          <el-col :span="18" class="instruct_left">
            <div style="font-size:16px; color: #409EFF;">{{titleName}}</div>
            <div v-if="arr[a] ==index" class="imgdiv" v-for="(key,index) in form.image_pic" :key="key.id">
              <img :src="pic.uri" v-for="pic in key" :key="pic.id" />
            </div>
          </el-col>
        </el-row>
      </div>
      <div style="text-align: center;padding: 40px;">
        <span slot="footer" class="dialog-footer" >
          <div v-if="len">
            <el-button v-show="a <= len-1 && a>0 " class="elbuttom1" size="small" @click="preimg" type="primary">上一张</el-button>
            <el-button v-show="a == 0" class="elbuttom1" size="small" type="info">上一张</el-button>
            <el-button v-show="a < len - 1" class="elbuttom2" size="small" @click="nextimg" type="primary">下一张</el-button>
            <el-button v-show="a == len -1" class="elbuttom2" size="small"  type="info">下一张</el-button>
          </div>
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import TreeRender from "./treeRender.vue";
export default {
  props: ["instructionDialog"],
  data() {
    return {
      instructionDialogVisible: false,
      form: {
        id: "",
        image_pic: []
      },
      defaultExpandKeys: [],
      defaultProps: {
        children: "son",
        label: "title"
      },
      a: 0,
      len: null,
      setTree: [],
      arr: [],
      titleName:""
    };
  },
  watch: {
    instructionDialog(val) {
      this.instructionDialogVisible = val;
    },
    instructionDialogVisible(val) {
      if (!val) {
        this.$emit("close");
      } else {
        this.getDepart();
      }
    }
  },
  mounted() {},
  methods: {
    getDepart() {
      this.setTree = [];
      this.titleName= "";
      this.form.image_pic = [];
      this.$http.get(globalConfig.server + "des/tree").then(res => {
        this.setTree = res.data.data;
        this.form.id = res.data.data[0].id;
        this.nodeClick(res.data.data[0]);
        this.defaultExpandKeys.push(res.data.data[0].id);
      });
    },
    //点击节点
    nodeClick(data) {
      this.a = 0;
      this.len = null;
      this.form.id = data.id;
      this.arr = [];
      this.form.image_pic = [];
      this.$http
        .get(globalConfig.server + "des/info/" + this.form.id)
        .then(res => {
          this.form.image_pic = res.data.data.album;
          for (let key in this.form.image_pic) this.arr.push(key);
          this.len = this.arr.length;
          this.titleName = res.data.data.title;
        });
    },
    preimg() {
      this.a = this.a - 1;
    },
    nextimg() {
      this.a = this.a + 1;
    },
    //********************树配置操作函数****************
    renderContent(h, { node, data, store }) {
      //加载节点
      let that = this;
      return h(TreeRender, {
        props: {
          DATA: data,
          NODE: node,
          STORE: store
        }
      });
    },
  }
};
</script>
<style lang="scss" scoped="">
#instruction {
  .el-dialog__wrapper {
    .el-dialog {
      .el-dialog__body {
        padding: 0 15px;

        .instruct_main {
          .instruct_right {
            height: 550px;
            overflow: auto;
          }
          .instruct_left {
            background: #fafafa;
            height: 550px;

            .imgdiv img {
              max-width: 850px;
              max-height: 550px;
              width: 100%;
              height: 100%;
              margin: 0 auto;
              display: block;
            }
          }
        }
        .expand-tree .is-current > .el-tree-node__content .el-tree-node__label {
          font-weight: 600 !important;
          white-space: normal;
        }
      }
      .elbuttom1 {
        float: left;
        margin-left: 55%;
      }
      .elbuttom2 {
        float: left;
        margin-left:40px;
      }
    }
  }
}
</style>
