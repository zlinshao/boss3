<template>
  <div>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <el-checkbox-group v-model="checkList" >
        <el-checkbox v-for="item in data" :label="item.id" :key="item.id">{{item.dictionary_name}}</el-checkbox>
      </el-checkbox-group>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="saveBadge">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "badge",
    props: ['module','incompleteList','salaryId'],
    data() {
      return {
        dialogVisible: false,
        checkList: [],
        data: [],
        id: this.salaryId,
      }
    },
    mounted() {
      this.getData();
    },
    activated(){
      this.getData();
    },
    watch: {
      module(val) {
        this.dialogVisible = val;
      },
      dialogVisible(val) {
        if (!val) {
          this.$emit('close');
        }
      },
      salaryId(val){
        this.id = val;
      },
      incompleteList(val){
        this.checkList = val;
      },
      checkList(val) {
        console.log(val)
      }
    },
    methods: {
      //保存未发标记
      saveBadge() {
        this.$http.post(globalConfig.server+ 'salary/achv/mark/'+this.salaryId,{incomplete: this.checkList}).then((res)=>{
          this.dialogVisible = false;
          if(res.data.code === '88810') {
            this.$notify.success({
              title: '成功',
              message: res.data.msg
            });
          }
        });
      },
      getData(){
        this.$http.get(globalConfig.server+ 'setting/dictionary/502').then((res) => {
          if(res.data.code === '30010'){
            this.data = res.data.data;
          }
        });
      }
    },
  }
</script>

<style lang="scss">

</style>
