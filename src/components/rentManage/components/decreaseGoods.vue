<template>
  <div id="decreaseGoods">
    <el-dialog title="物品搬出" :visible.sync="decreaseGoodsDialogVisible" width="40%">
      <div>
        <el-form size="small" :model="form" label-width="80px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="操作时间">
                <el-date-picker v-model="value2" align="right" value-format="yyyy-MM-dd" format="yyyy-MM-dd" type="date" placeholder="选择日期" >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="物品去向" required>
                <el-select v-model="form.gone" placeholder="请选择活动区域" @change="dechange">
                  <el-option v-for="item in goodsgoing" :key="item.id" :label="item.dictionary_name" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

        <el-form size="small" :model="form" label-width="80px">
          <el-form-item label="物品名称" required>
            <el-input type="textarea" v-model="goodScode" :rows="1" @click.native="openModalDialog('changeGoodsDialog')"></el-input>
          </el-form-item>
        </el-form>

        <el-form size="small" :model="form" label-width="84px" v-if="showflag=='327'">
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


        <el-form size="small" label-width="80px">
          <el-form-item label="上传照片">
            <Upload :ID="'upload'" @getImg="getImage" ></Upload>
          </el-form-item>
        </el-form>
        <el-form size="small" :model="form" label-width="80px">
          <el-form-item label="备注">
            <el-input type="textarea" :rows="1" ></el-input>
          </el-form-item>
        </el-form>

      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="decreaseGoodsDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="decreaseGoodsSave">确 定</el-button>
      </span>

    </el-dialog>
  <ChangeGoodsResources :changeGoodsDialog="changeGoodsDialog" :collectHouseId="collectHouseId" @close="closeChangeGoodsResources" @changeGoodSave="changeGoodSave"></ChangeGoodsResources>
  </div>
</template>

<script>
  import ChangeGoodsResources from '../components/ChangeGoodsResources.vue' //物品增配页面
  import Upload from '../../common/UPLOAD.vue';
  export default {
    props:['decreaseGoodsDialog','collectHouseId'],
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
        goodScode:'', //物品名称
        goodscodesave:'', //物品名称保存使用
        saveflag:'',  //保存校验标识
        goods:[],
        houselist:[],
        urls:globalConfig.server,
        showflag:'0',

        value2: '',
        goodsgoing: [],
        success:true,
      };
    },
    watch:{
      decreaseGoodsDialog(val){
        this.decreaseGoodsDialogVisible = val

      },
      decreaseGoodsDialogVisible(val){
        if(!val){
          this.$emit('close')
        }else{
          this.getGoods();
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
      },
      dechange(val){
        this.showflag=val;
      },
      changeGoodSave(val){
        
        this.goodScode='';
        this.goodscodesave=val.check;
        for(let k=0;k<val.check.length;k++){

        for(let i=0;i<this.houselist.length;i++)
          for(let key in this.goods){
        {   if(key == this.houselist[i].dictionary_name){
          for(let j=0;j<this.goods[this.houselist[i].dictionary_name].length;j++)
          {
            if(val.check[k]==this.goods[this.houselist[i].dictionary_name][j].id){
              this.goodScode +=this.goods[this.houselist[i].dictionary_name][j].code +";"
            }
          }
        }}}
        }
      },
      decreaseGoodsSave(){
        this.saveflag=true;
        if(this.value2 =='' && this.saveflag==true){
          this.saveflag=false;
          this.$notify({
            title: '警告',
            message: '增配时间不能为空',
            type: 'warning'
          });
        }
        if(this.goodscodesave =='' && this.saveflag==true){
          this.saveflag=false;
          this.$notify({
            title: '警告',
            message: '物品名称不能为空',
            type: 'warning'
          });
        }
        if(this.form.gone =='' && this.saveflag==true){
          this.saveflag=false;
          this.$notify({
            title: '警告',
            message: '原物品去向不能为空',
            type: 'warning'
          });
        }

        if(this.saveflag){
           this.$http.post(this.urls+'house/asset_out', {
           house_id:this.collectHouseId,
           operate_time:this.value2,
           dest:this.form.gone,
           content:this.goodscodesave,
           screenshot:[]
            }).then((res) => {
            if(res.data.code == "20010"){
            this.$notify({
              title: '成功',
              message: '操作成功',
              type: 'success'
            });
            //this.$emit("success", this.success);
            this.allall='';
            this.goodScode='';
            this.value2='';
            this.form.gone='';
            this.goodscodesave='';
            this.deliveryFlag=true;
            this.$emit('deliveryFlag', this.addGoodsFlag)
            this.decreaseGoodsDialogVisible=false;
            }
            else{
             this.$notify.error({
              title: '错误',
              message: '操作失败'
              });
            this.goodScode='';
            this.decreaseGoodsDialogVisible=false;

            }
         })
        }
      },
      getGoods(){
              //物品去向
      this.$http.get(this.urls+'setting/dictionary/323').then((res) => {

          if (res.data.code === '30010') {
              this.goodsgoing=res.data.data;
          }
      })
      //交接单详情接口
      this.$http.get(this.urls+'house/asset?house_id=' +this.collectHouseId).then((res) => {
          if (res.data.code === '20000') {
            this.goods=res.data.data;
          }
      })
      //房间编号
      this.$http.get(this.urls+'setting/dictionary/298').then((res) => {
        if (res.data.code === '30010') {
        this.houselist=res.data.data;
            }
         })
      }
    },
    mounted(){

    },
    created:function(){
      this.personal = JSON.parse(localStorage.getItem("personal"));

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
