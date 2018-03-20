<template>
  <div id="increaseGoods">
    <el-dialog title="物品增配" :visible.sync="increaseGoodsDialogVisible" width="40%">
      <div>
        <el-form size="mini" :model="form" label-width="100px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="增配时间" required>
                <el-date-picker type="date" placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="物品来源" required>
                <el-select  v-model="form.come" placeholder="请选择物品来源">
                  <el-option v-for="item in forms" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="操作人:">
                孟子
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="物品名称" required>
            <el-input type="textarea" @click.native="openModalDialog('goodsConfigDialog')"></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="8">
              <el-form-item label="价格" required>
                <el-input></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="原物品去向">
                <el-input></el-input>
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
    <GoodsConfigResources :goodsConfigDialog="goodsConfigDialog" @close="closeGoodsConfigResources"></GoodsConfigResources>
  </div>
</template>

<script>

 import GoodsConfigResources from '../components/GoodsConfigResources.vue' //物品增配页面
  export default {
    props:['increaseGoodsDialog'],
    components: {
      GoodsConfigResources
    },
    data() {
      return {
        increaseGoodsDialogVisible:false,
        goodsConfigDialog:false,     //物品增配
        form:{
          come:''
        },
        forms: [
          {
            value: 'newbuy',
            label: '全新购买'
          }, {
            value: 'oldbuy',
            label: '购买二手'
          }]
      };
    },
    watch:{
      increaseGoodsDialog(val){
        this.increaseGoodsDialogVisible = val
      },
      increaseGoodsDialogVisible(val){
        if(!val){
          this.$emit('close')
        }
      }
    },
    methods:{
      openModalDialog(){      
        this.goodsConfigDialog=true;
      },
      closeGoodsConfigResources(){
        this.goodsConfigDialog=false;
      }
    }

  };
</script>
<style lang="scss" scoped="">

</style>
