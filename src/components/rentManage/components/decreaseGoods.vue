<template>
  <div id="decreaseGoods">
    <el-dialog title="物品搬出" :visible.sync="decreaseGoodsDialogVisible" width="40%">
      <div>
        <el-form size="small" :model="form" label-width="84px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="操作时间">
                <el-date-picker type="date" placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="物品去向">
                <el-select v-model="form.gone" placeholder="请选择活动区域">
                  <el-option v-for="item in forms" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

        <el-form size="small" :model="form" label-width="84px">
          <el-form-item label="物品名称">
            <el-input type="textarea" :rows="1" @click.native="openModalDialog('changeGoodsDialog')"></el-input>
          </el-form-item>
        </el-form>

        <el-form size="small" :model="form" label-width="84px" v-if="form.value===''">
          <el-row>
            <el-col :span="12">
              <el-form-item label="选择房屋">
                <el-date-picker  placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="片区经理">
                <el-input disabled ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        
        <span style="float:right;line-height:32px;">操作人：孟子</span>
        <div class="upload_div"><Upload :ID="'upload'" @getImg="getImage" ></Upload></div>
        <el-form size="small" :model="form" label-width="54px">
          <el-form-item label="备注">
            <el-input type="textarea" :rows="1" ></el-input>
          </el-form-item>
        </el-form>        

      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="decreaseGoodsDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="decreaseGoodsDialogVisible = false">确 定</el-button>
      </span>
      
    </el-dialog>
  <ChangeGoodsResources :changeGoodsDialog="changeGoodsDialog" @close="closeChangeGoodsResources"></ChangeGoodsResources>
  </div>
</template>

<script>
 import ChangeGoodsResources from '../components/ChangeGoodsResources.vue' //物品增配页面
  import Upload from '../../common/UPLOAD.vue';
  export default {
    props:['decreaseGoodsDialog'],
    components: {
      ChangeGoodsResources,
      Upload
    },
    data() {
      return {
        decreaseGoodsDialogVisible:false,
        changeGoodsDialog:false,
        form:{
          gone:'',
          value:''
        },
        
        forms: [
          {
            value: '1',
            label: '搬出到其他房屋'
          }, {
            value: '2',
            label: '搬出到库房'
          }, {
            value: '3',
            label: '搬出去卖二手'
          }, {
            value: '4',
            label: '作废'
          }]
      };
    },
    watch:{
      decreaseGoodsDialog(val){
        this.decreaseGoodsDialogVisible = val
      },
      decreaseGoodsDialogVisible(val){
        if(!val){
          this.$emit('close')
        }
      }
    },
    methods:{
      openModalDialog(){
        this.changeGoodsDialog=true;
      },
      closeChangeGoodsResources(){
        this.changeGoodsDialog=false;
      },
      getImage(val) {
        console.log(val);
      }

    }
  };
</script>
<style lang="scss" scoped="">
.container{top:20px;}
.upload_div {
  width:690px; 
  min-height:160px; 
  margin-left:40px; 
  float:left; 
  margin-bottom:20px;
}
</style>
