<template>
  <div id="increaseGoods">
    <el-dialog title="物品选择" :visible.sync="increaseGoodsDialogVisible" width="60%" >
      <div class="scroll_bar">
        <div class="addMore">
          <el-button type="text" size="small" class="el-icon-circle-plus" @click="openModalDialog('deliveryDialog')">增加</el-button>
        </div>
        <div class="earchroom" v-for="(houses,x) in houseList" :key="x">
          <span class="title ">{{houses.dictionary_name}}</span>
          <div class="form_border">
            <el-form :model="form">
              <el-form-item>
                <el-checkbox-group v-model="form.check">
                  <el-col :span="6" :key="index" v-for="(val,index) in goods[houses.dictionary_name]">
                    <el-checkbox :label="val.id" name="USER">{{val.code}}&nbsp;&nbsp;{{val.category}}</el-checkbox>
                  </el-col>
                </el-checkbox-group>
              </el-form-item>
            </el-form>
          </div>
        </div>

      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="increaseGoodsDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="changeGoodSave">保 存</el-button>
      </span>
    </el-dialog>
  <DeliveryResources :value="hosueLength" :deliveryDialog="deliveryDialog" @close="closeDeliveryResources" @deliveryFlag="deliveryFlag"></DeliveryResources>
  </div>

</template>

<script>
   import DeliveryResources from '../components/DeliveryResources.vue' //增加物品页面
  export default {
    props:['changeGoodsDialog'],
    components: {
      DeliveryResources
    },
    data() {
      return {
        increaseGoodsDialogVisible:false,
        deliveryDialog:false,
        houseList:[],
        goods:[],
        hosueLength:'',
        urls:globalConfig.server,
        form:{
          check:[]
        },
      };
    },
    watch:{
      changeGoodsDialog(val){
        this.increaseGoodsDialogVisible = val
        this.delivery()
      },
      increaseGoodsDialogVisible(val){
        if(!val){
          this.$emit('close')
        }else{
          this.getRoom()
        }
      }
    },
      methods:{
      getRoom(){
              //房间编号
      this.$http.get(this.urls+'setting/dictionary/298').then((res) => {
        if (res.data.code === '30010') {
        this.houseList=res.data.data;
        this.hosueLength=this.houseList.length;
            }
         })
      this.delivery()
      },

      openModalDialog(){
        this.deliveryDialog=true;
      },
      closeDeliveryResources(){
        this.deliveryDialog=false;
      },
      deliveryFlag(){
        this.delivery()
      },
      changeGoodSave(){
        this.increaseGoodsDialogVisible = false;
        this.$emit('changeGoodSave', this.form)
      },
      delivery(){
      //交接单详情接口
      this.$http.get(this.urls+'house/asset?house_id=1').then((res) => {
          if (res.data.code === '20000') {
            this.goods=res.data.data;
          }
      })
      }

    },
    created:function(){


    }
  };
</script>
<style lang="scss" scoped="">
  .addMore{
    display: flex;
    font-size: 18px;
    justify-content: flex-end;
    .el-icon-circle-plus{
      font-size: 14px;
    }
  }

</style>
