<template>
  <div id="increaseGoods">
    <el-dialog title="增加物品" :visible.sync="increaseGoodsDialogVisible" width="28%">
      <div>
        <el-form size="mini" :model="form" label-width="80px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="物品位置" >
                <el-select v-model="form.region" placeholder="请选择物品来源">
                  <el-option label="全新购买" value="newbuy"></el-option>
                  <el-option label="购买二手" value="oldbuy"></el-option>
                </el-select>        
              </el-form-item>
            </el-col>
            <el-col :span="12"><span style="color:#f00; display:block; text-indent: 20px;">物品名称只能输入7个汉字</span></el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="名称" >
                <el-input ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="名称" >
                <el-input ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="名称" >
                <el-input ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="名称" >
                <el-input ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="名称" >
                <el-input ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="名称" >
                <el-input ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="名称" >
                <el-input ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="名称" >
                <el-input ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="increaseGoodsDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="increaseGoodsDialogVisible = false">保 存</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>


  export default {
    props:['addGoodsDialog'],

    data() {
      return {
        increaseGoodsDialogVisible:false,
        form:{},
      };
    },
    watch:{
      addGoodsDialog(val){
        this.increaseGoodsDialogVisible = val
      },
      increaseGoodsDialogVisible(val){
        if(!val){
          this.$emit('close')
        }
      }
    },
    methods:{


    }
  };
</script>
<style lang="scss" scoped="">

</style>
