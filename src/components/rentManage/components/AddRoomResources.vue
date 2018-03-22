<template>
  <div id="increaseGoods">
    <el-dialog title="增加物品" :visible.sync="increaseGoodsDialogVisible" width="28%">
      <div>
        <el-form size="mini" :model="form" label-width="80px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="物品位置" >
                <el-select v-model="hourse" placeholder="请选择物品来源">
                  <el-option v-for="item in houselist" :label="item.dictionary_name" :key="item.id" :value="item.id"></el-option>
                </el-select>        
              </el-form-item>
            </el-col>
            <el-col :span="12"><span style="color:#f00; display:block; text-indent: 20px;">物品名称只能输入7个汉字</span></el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="名称" >
                <el-input v-model="form.name[0]" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="名称" >
                <el-input v-model="form.name[1]" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="名称" >
                <el-input v-model="form.name[2]"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="名称" >
                <el-input v-model="form.name[3]"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="名称" >
                <el-input v-model="form.name[4]"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="名称" >
                <el-input v-model="form.name[5]"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="名称" >
                <el-input v-model="form.name[6]"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="名称" >
                <el-input v-model="form.name[7]"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
     
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="increaseGoodsDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="savex">保 存</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>


  export default {
    props:['addRoom'],

    data() {
      return {
        increaseGoodsDialogVisible:false,
        urls:globalConfig.server,
        hourse:'',
        addGoodsFlag:false,  //物品是否增加成功标识
        form:{
          name:[]
        },
        houselist:[]
      };
    },
    watch:{
      addRoom(val){
        this.increaseGoodsDialogVisible = val
      },
      increaseGoodsDialogVisible(val){
        if(!val){
          this.$emit('close')
        }
      }
    },
    methods:{
      savex(){ 
         this.$http.post(this.urls+'house/asset/add', {
           name:this.form.name,
        }).then((res) => {
          
            if(res.data.code == "20010"){
            this.addGoodsFlag = true;
            this.$emit('addGoodsOk', this.addGoodsFlag)
            this.$alert('添加成功', '提示', {
            confirmButtonText: '确定',
            type: 'success'
            })
            this.increaseGoodsDialogVisible=false;   
            }
            else{
             this.$alert('添加失败', '提示', {
            confirmButtonText: '确定',
            type: 'error'
            })             
            } 
         })       
      }

    },
    created:function(){
      //物品来源       
      this.$http.get(this.urls+'setting/dictionary/298').then((res) => {  
          if (res.data.code === '30010') {
              this.houselist=res.data.data;
          }  
      })
    }
  };
</script>
<style lang="scss" scoped="">

</style>
