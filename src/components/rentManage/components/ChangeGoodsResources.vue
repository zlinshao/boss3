<template>
  <div id="increaseGoods">
    <el-dialog title="物品选择" :visible.sync="increaseGoodsDialogVisible" width="65%" >
      <div class="goodsall">
        <el-button type="primary" @click="openModalDialog('deliveryDialog')">增加</el-button>
        <div class="earchroom" v-for="(houses,x) in houselist" :key="x">
            <span class="earchroom_top">{{houses.dictionary_name}}</span>
            <div class="earchroom_mid" >
            <el-form :model="form">
                        <el-form-item >
                            <el-checkbox-group v-model="form.check">
                                <el-col :span="6" :key="index" v-for="(val,index) in goods[houses.dictionary_name]" >                             
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
        <el-button size="small" type="primary" @click="changeGoodssave">保 存</el-button>
      </span>
    </el-dialog>
  <DeliveryResources :value="houselen" :deliveryDialog="deliveryDialog" @close="closeDeliveryResources" @deliveryFlag="deliveryFlag"></DeliveryResources> 
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
        houselist:[],
        goods:[],
        houselen:'',
        urls:globalConfig.server,
        form:{
          check:[]
        },
        goods:[]

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
        }
      }
    },
      methods:{
      openModalDialog(){       
        this.deliveryDialog=true;
      },
      closeDeliveryResources(){
        this.deliveryDialog=false;
      },
      deliveryFlag(){
        this.delivery()
      },
      changeGoodssave(){
        this.increaseGoodsDialogVisible = false;
        this.$emit('changeGoodssave', this.form)        
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
      //房间编号
      this.$http.get(this.urls+'setting/dictionary/298').then((res) => {  
        if (res.data.code === '30010') {
        this.houselist=res.data.data;  
        this.houselen=this.houselist.length;           
            }  
         })
      this.delivery()

    }
  };
</script>
<style lang="scss" scoped="">
  .goodsall{width: 100%;  height: 480px; margin:0px auto 0; overflow: auto;}

  .goodsall .el-button--primary{
    margin-bottom:20px;
    
  }
  .goodsall .earchroom{
    min-width: 750px;
    height: 190px;
    padding-top:8px;
    border:1px #ccc solid;
    position: relative;
    margin-bottom:16px;
   
  }
  .goodsall .earchroom .earchroom_top{
    width:74px;
    text-align: center;
    height:28px;
    line-height: 28px;
    position: absolute;
    background: #fff;
    left:20px;
    top:-14px;
    font-size: 14px;
  }
  .goodsall .earchroom .earchroom_mid{
  
    height: 190px;
    overflow: auto; 
  }

  .earchroom .el-checkbox{
      text-indent: 20px;
  }


</style>
