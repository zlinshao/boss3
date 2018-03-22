<template>
  <div id="decreaseGoods">
    <el-dialog title="物品搬出" :visible.sync="decreaseGoodsDialogVisible" width="40%">
      <div>
        <el-form size="small" :model="form" label-width="84px">
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

        <el-form size="small" :model="form" label-width="84px">
          <el-form-item label="物品名称" required>
            <el-input type="textarea" v-model="goodscode" :rows="1" @click.native="openModalDialog('changeGoodsDialog')"></el-input>
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
        
        <span style="float:right;line-height:32px;">操作人：{{this.personal.name}}</span>
        <div class="upload_div"><Upload :ID="'upload'" @getImg="getImage" ></Upload></div>
        <el-form size="small" :model="form" label-width="54px">
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
  <ChangeGoodsResources :changeGoodsDialog="changeGoodsDialog" @close="closeChangeGoodsResources" @changeGoodssave="changeGoodssave"></ChangeGoodsResources>
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
        goodscode:'', //物品名称
        goodscodesave:'', //物品名称保存使用
        urls:globalConfig.server,
        showflag:'0',
         pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
       
        value2: '',       
        goodsgoing: []
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
      },
      dechange(val){
        this.showflag=val;
      },
      changeGoodssave(val){
        this.goodscode='';    
        this.goodscodesave=val.check;
        for(let i=0;i<val.check.length;i++){
          this.goodscode+= val.check[i]+";";
        }    
      },
      decreaseGoodsSave(){
        if(this.form.gone =='' || this.goodscodesave=='' ){
        this.$alert('物品名称、原物品去向不能为空', 'ERROR', {confirmButtonText: '确定',type: 'error'
        }).catch(()=>{});    
        }else{
           this.$http.post(this.urls+'house/asset_out', {
           house_id:1,
           operate_time:this.value2,
           dest:this.form.gone,
           content:this.goodscodesave,
           screenshot:[]
            }).then((res) => {      
            if(res.data.code == "20010"){
            this.$alert('添加成功', 'SUCCESS', {
            confirmButtonText: '确定',
            type: 'success'
            })
            this.allall='';
            this.goodscode='';
            this.deliveryFlag=true;
            this.$emit('deliveryFlag', this.addGoodsFlag)
            this.decreaseGoodsDialogVisible=false;   
            }
            else{
            this.$alert('添加失败', 'SUCCESS', {
            confirmButtonText: '确定',
            type: 'error'
            })  
            this.goodscode='';  
            this.decreaseGoodsDialogVisible=false;    
                  
            } 
         })       
        }
      }
    },
    created:function(){
      this.personal = JSON.parse(localStorage.getItem("personal"));
      //物品去向       
      this.$http.get(this.urls+'setting/dictionary/323').then((res) => {  
       
          if (res.data.code === '30010') {
              this.goodsgoing=res.data.data;
          }  
      })
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
