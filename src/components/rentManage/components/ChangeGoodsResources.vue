<template>
  <div id="increaseGoods">
    <el-dialog title="物品选择" :visible.sync="increaseGoodsDialogVisible" width="60%" >
      <div class="goodsall">
        <el-button type="primary" @click="openModalDialog('deliveryDialog')">增加</el-button>
        <div class="earchroom">
            <span class="earchroom_top">主卧</span>
            <div class="earchroom_mid" >
            <el-form :model="form">
                        <el-form-item >
                            <el-checkbox-group v-model="form.check">
                                <el-col :span="6" :key="index" v-for="(val,index) in userList" >
                                    <el-checkbox :label="val.id" name="USER">{{val.id}}&nbsp;&nbsp;{{val.name}}</el-checkbox>                            
                                </el-col>
                            </el-checkbox-group>
                        </el-form-item>
            </el-form>
            </div>
        </div>
        <div class="earchroom">
            <span class="earchroom_top">主卧</span>
            <div class="earchroom_mid" >
            <el-form :model="form">
                        <el-form-item >
                            <el-checkbox-group v-model="form.check">
                                <el-col :span="6" :key="index" v-for="(val,index) in userList" >
                                    <el-checkbox :label="val.id" name="USER">{{val.id}}&nbsp;&nbsp;{{val.name}}</el-checkbox>                            
                                </el-col>
                            </el-checkbox-group>
                        </el-form-item>
            </el-form>
            </div>
        </div>

        <div class="earchroom">
            <span class="earchroom_top">主卧</span>
            <div class="earchroom_mid" >
            <el-form :model="form">
                        <el-form-item >
                            <el-checkbox-group v-model="form.check">
                                <el-col :span="6" :key="index" v-for="(val,index) in userList" >
                                    <el-checkbox :label="val.id" name="USER">{{val.id}}&nbsp;&nbsp;{{val.name}}</el-checkbox>                            
                                </el-col>
                            </el-checkbox-group>
                        </el-form-item>
            </el-form>
            </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="increaseGoodsDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="increaseGoodsDialogVisible = false">保 存</el-button>
      </span>
    </el-dialog>
  <DeliveryResources :deliveryDialog="deliveryDialog" @close="closeDeliveryResources"></DeliveryResources> 
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
        form:{
          check:[]
        },
        userList:[{
          id:"1",
          name:"床"
          },{
          id:"2",
          name:"床2"
          },{
          id:"3",
          name:"床3"
          },{
          id:"4",
          name:"床4"
          },{
          id:"5",
          name:"床5"
          },{
          id:"6",
          name:"床6"
          }
        ]

      };
    },
    watch:{
      changeGoodsDialog(val){
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
        this.deliveryDialog=true;
      },
      closeDeliveryResources(){
        this.deliveryDialog=false;
      }

    }
  };
</script>
<style lang="scss" scoped="">
  .goodsall{ width: 1110px; height: 480px; margin:0px auto 0; overflow: auto;}

  .goodsall .el-button--primary{
    margin-bottom:20px;
    
  }
  .goodsall .earchroom{
    width:1080px ;
    height: 190px;
    padding-top:8px;
    border:1px #ccc solid;
    position: relative;
    margin-bottom:16px;
   
  }
  .goodsall .earchroom .earchroom_top{
    width:40px;
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
    width:1080px;
    height: 210px;
    overflow: auto; 
  }

  .earchroom .el-checkbox{
      text-indent: 20px;
  }


</style>
