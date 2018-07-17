<template>
  <div>
    <el-button @click="addItem" size="mini" type="primary" style="float: right">
      添加组件
    </el-button>

    <el-dialog
      title="选择组件"
      :visible.sync="dialogVisible"
      width="30%">
      <ItemList @add="addItem_"></ItemList>
      <h4>已选中 ： <span style="color: #409EFF">{{selectType.label}}</span></h4>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" :disabled="!selectType.label" @click="confirmAdd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import ItemList from './itemList'
  export default {
    name: "formGroupItem",
    props: {
      formItemArray: {
        type: Array,
        required: true,
      },
    },
    components:{ItemList},
    data(){
      return{
        dialogVisible : false,
        selectType: {},
        selectData: {},
      }
    },
    watch: {
      dialogVisible(val) {
        if (!val) {
          setTimeout(() => {
            this.selectType = {};
          },10)
        }
      }
    },
    methods:{
      addItem(){
        this.dialogVisible = true;
      },
      addItem_(val){
        this.selectType = val;
      },
      confirmAdd() {
        this.formItemArray.push(this.selectType);
        this.dialogVisible = false;
      }
    }
  }
</script>

<style scoped>

</style>
