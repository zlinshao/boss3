<template>
  <div id="increaseGoods">
    <el-dialog title="收房交接单" :visible.sync="increaseGoodsDialogVisible" width="60%"  >
      <div class="goodsall">
       
        <div class="earchroom" v-for="(houses,x) in houselist" :key="x">
            <span class="earchroom_top">{{houses.dictionary_name}}</span>
            <div class="earchroom_mid" >
            <el-form :model="form[x]" style="margin-left:40px;margin-right:20px;">
              <el-row>
              <el-col :span="4" :key="index" v-for="(val,index) in userList[x].goodsx" >
                <el-form-item >                               
                  <span class="goodsname" >{{val.dictionary_name}}</span><el-input v-model="form[x].addnum[index]" size="small" width=40% placeholder=""></el-input>                                                     
                </el-form-item>
              </el-col >
              <el-col :span="4">
                <i @click="openModalDialogx('addGoodsDialogx',x)" class="iconfont icon-zengjia" style="cursor: pointer;color: #6a8dfb;font-size:19px; line-height:45px;"></i> 
              </el-col>
              </el-row>
              <el-row>
                <el-form-item style="font-size:14px; margin-bottom:10px;" size="small" label="备注" >
                  <el-input type="textarea" style="width:94% !important" :rows="1" ></el-input>
                </el-form-item>
              </el-row>
            </el-form>
            </div>
        </div>      
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="increaseGoodsDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="delieverysave">保 存</el-button>
      </span>
    </el-dialog>
    <AddGoodsResourcesx :addGoodsDialogx="addGoodsDialogx" @close="closeAddGoodsResources" @addgoodsx="addgoodsx"></AddGoodsResourcesx>
   
  </div>

</template>

<script>
  import AddGoodsResourcesx from '../components/AddGoodsResourcesx.vue' //增加物品页面

  export default {
    props:['deliveryDialog','value'],
    components: {
    AddGoodsResourcesx
    },
    data() {
      return {
        increaseGoodsDialogVisible:false,
        urls:globalConfig.server,
        deliveryFlag:false,  //物流增加成功标识
        time:'',
        form:[],
        list:[],
        lenxx:20,
        addGoodsDialogx:false,
        userList:[],
        midlist:[],
        houselist:[],
        houselen:[],
        noth:''  //点击的第几行
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
      openModalDialogx(val,x){
        this.noth=x;   
        console.log(val)  
        this.addGoodsDialogx=true;
      },
      closeAddGoodsResources(){
        this.addGoodsDialogx=false;
      },

      //收房交接单保存
      delieverysave(){
      
          this.list=[];
          for(let x=0;x<this.houselist.length;x++){
            if(this.form[x].addnum.length>0 && this.houselist[x].id){ 
            for(let i=0;i<this.form[x].addnum.length;i++){   
              if(parseInt(this.form[x].addnum[i])){
                this.list.push({"room":this.houselist[x].id,"category":this.userList[x].goodsx[i].id,"amount":this.form[x].addnum[i]});          
              }
            }
            } 
          }

           this.$http.post(this.urls+'house/asset_handover', {
           house_id:1,
           operate_time:this.time,
           content:this.list
        }).then((res) => {
  
            if(res.data.code == "20010"){         
            this.$alert('添加成功', '提示', {
            confirmButtonText: '确定',
            type: 'success'
            })
            this.allall='';
              for(let i=0;i<this.houselist.length;i++){
              this.form[i].check=[]; 
              this.form[i].addgoods=[];
              this.form[i].addnum=[];  
            }  
            this.deliveryFlag=true;
            this.$emit('deliveryFlag', this.addGoodsFlag)
            this.increaseGoodsDialogVisible=false;   
            }
            else{
            this.$alert('添加失败', '提示', {
            confirmButtonText: '确定',
            type: 'error'
            })             
            } 
         })
  
      },
      //物品设置成功
      addgoodsx(val){  
        if(this.noth !== ''){
          let len =this.userList[this.noth].goodsx.length;
          if(val){
            for(let k=0;k<val.length;k++){
              for(let i=0;i<this.midlist.length;i++)
              if(val[k]==this.midlist[i].id){
              this.userList[this.noth].goodsx[len]=this.midlist[i]
              len++;
              }
           }
         }
        }
      },
      //物品类型接口
      goodsmore(){
      //物品类型       
      this.$http.get(this.urls+'setting/dictionary/265').then((res) => {  
          if (res.data.code === '30010') {
            this.midlist=res.data.data;
            let lengoods=this.value?this.value:this.lenxx;
            for(let k=0;k<lengoods;k++){
            for(let i =0 ;i<10;i++){
            this.userList[k].goodsx[i]=res.data.data[i]
            }
            }

          }  

      }) 
      }
    },
      created:function(){
      this.goodsmore(); 
    
      let date = new Date();
      let seperator1 = "-";
      let year = date.getFullYear();
      let day = date.getDay()
      let month = date.getMonth() + 1;
      if (month >= 1 && month <= 9) {
          month = "0" + month;
      }
      for(let i=0;i<20;i++){
        this.userList.push({"goodsx":[]});
      }
      this.time = year + seperator1 + month + seperator1 + day;
      this.personal = JSON.parse(localStorage.getItem("personal"));
      //房间编号
      
      this.$http.get(this.urls+'setting/dictionary/298').then((res) => {  
        if (res.data.code === '30010') {
        this.houselist=res.data.data; 
        this.houselen=this.houselist.length;
        for(let i=0;i<this.houselist.length;i++){
        this.form.push({"check":[],"addgoods":[],"addnum":[]})    
        }  
            }  
         })

         
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
    width:1080px;
    height: 140px;
    overflow: auto;
    padding-top:10px; 
  }
  .goodsall .goodsname{
    width:74px;
    height: 40px;
    line-height: 40px;
    text-align: left;
    font-size: 14px;
    float: left;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .earchroom_mid .el-input{
    float: left;
    width: 40% !important;
  }
  .earchroom .el-form-item{
     margin: 5px auto 0;
  }

</style>
