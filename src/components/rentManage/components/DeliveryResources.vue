<template>
  <div id="increaseGoods">
    <el-dialog title="收房交接单" :visible.sync="increaseGoodsDialogVisible" width="60%"  >
      <div class="goodsall">
       
        <div class="earchroom">
            <span class="earchroom_top">主卧</span>
            <div class="earchroom_mid" >
            <el-form :model="form">
              <el-row>
              <el-col :span="4" :key="index" v-for="(val,index) in userList" >
                <el-form-item >                               
                  <span class="goodsname">{{val.name}}</span><el-input size="small" width=40% placeholder=""></el-input>                                                     
                </el-form-item>
              </el-col>
              <i class="iconfont icon-zengjia" style="color: #6a8dfb;font-size:19px; line-height:45px;"></i> 
              </el-row>
              <el-row>
                <el-form-item style="margin-left:18px; margin-bottom:10px;" size="small" label="备注" >
                  <el-input type="textarea" style="width:93% !important" :rows="1" ></el-input>
                </el-form-item>
              </el-row>
            </el-form>
            </div>
        </div>
        <div class="earchroom">
            <span class="earchroom_top">主卧</span>
            <div class="earchroom_mid" >
            <el-form :model="form">
              <el-row>
              <el-col :span="4" :key="index" v-for="(val,index) in userList" >
                <el-form-item >                               
                  <span class="goodsname">{{val.name}}</span><el-input size="small" width=40% placeholder=""></el-input>                                                     
                </el-form-item>
              </el-col>
              <i class="iconfont icon-zengjia" style="color: #6a8dfb;font-size:19px; line-height:45px;"></i>
              </el-row>
              <el-row>
                <el-form-item style="margin-left:18px; margin-bottom:10px;" size="small" label="备注" >
                  <el-input type="textarea" style="width:93% !important" :rows="1" ></el-input>
                </el-form-item>
              </el-row>
            </el-form>
            </div>
        </div>
        <div class="earchroom">
            <span class="earchroom_top">主卧</span>
            <div class="earchroom_mid" >
            <el-form :model="form">
              <el-row>
              <el-col :span="4" :key="index" v-for="(val,index) in userList" >
                <el-form-item >                               
                  <span class="goodsname">{{val.name}}</span><el-input size="small" width=40% placeholder=""></el-input>                                                     
                </el-form-item>
              </el-col>
              </el-row>
              <el-row>
                <el-form-item style="margin-left:18px; margin-bottom:10px;" size="small" label="备注" >
                  <el-input type="textarea" style="width:93% !important" :rows="1" ></el-input>
                </el-form-item>
              </el-row>
            </el-form>
            </div>
        </div>
        <div class="earchroom">
            <span class="earchroom_top">主卧</span>
            <div class="earchroom_mid" >
            <el-form :model="form">
              <el-row>
              <el-col :span="4" :key="index" v-for="(val,index) in userList" >
                <el-form-item >                               
                  <span class="goodsname">{{val.name}}</span><el-input size="small" width=40% placeholder=""></el-input>                                                     
                </el-form-item>
              </el-col>
              
              </el-row>
              <el-row>
                <el-form-item style="margin-left:18px; margin-bottom:10px;" size="small" label="备注" >
                  <el-input type="textarea" style="width:93% !important" :rows="1" ></el-input>
                </el-form-item>
              </el-row>
            </el-form>
            </div>
        </div>
        
      </div>
      <el-button style="margin-left:45%; margin-top:10px;" type="primary" >增加房间</el-button>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="increaseGoodsDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="increaseGoodsDialogVisible = false">保 存</el-button>
      </span>
    </el-dialog>
  <!-- <DeliveryResources :deliveryDialog="deliveryDialog" @close="closeDeliveryResources"></DeliveryResources>  -->
  </div>

</template>

<script>
  //  import DeliveryResources from '../components/DeliveryResources.vue' //增加物品页面
  export default {
    props:['deliveryDialog'],
    // components: {
    //   DeliveryResources
    // },
    data() {
      return {
        increaseGoodsDialogVisible:false,
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
          },{
          id:"6",
          name:"床6"
          },{
          id:"6",
          name:"床6"
          },{
          id:"6",
          name:"床6"
          },{
          id:"6",
          name:"床6"
          },{
          id:"6",
          name:"床6"
          }
        ]

      };
    },
    watch:{
      deliveryDialog(val){
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
  .goodsall{ width: 1110px; height: 500px; margin:0px auto 0; overflow: auto;}

  .goodsall .el-button--primary{
    margin-bottom:20px;
    
  }
  .goodsall .earchroom{
    width:1080px ;
    height: 150px;
    margin-top:10px;
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
    height: 150px;
    overflow: auto;
    padding-top:10px; 
  }
  .goodsall .goodsname{
    width:60px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
    float: left;
  }
  .earchroom_mid .el-input{
    float: left;
    width: 40% !important;
  }
  .earchroom .el-form-item{
     margin: 5px auto 0;
  }

</style>
