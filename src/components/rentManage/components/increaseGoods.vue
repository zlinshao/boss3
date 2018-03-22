<template>
  <div id="increaseGoods">
    <el-dialog title="物品增配" :visible.sync="increaseGoodsDialogVisible" width="40%">
      <div>
        <el-form size="mini" :model="form" label-width="100px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="增配时间" required>
                <el-date-picker v-model="value2" align="right" value-format="yyyy-MM-dd" format="yyyy-MM-dd" type="date" placeholder="选择日期" >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="物品来源" required>
                <el-select  v-model="form.come" placeholder="请选择物品来源">
                  <el-option v-for="item in forms" :key="item.id" :label="item.dictionary_name" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="操作人:">
                {{this.personal.name}}
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="物品名称" required>
            <el-input type="textarea" v-model="allall" @click.native="openModalDialog('goodsConfigDialog')"></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="8">
              <el-form-item label="价格" >
                <el-input></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="原物品去向" required>
                <el-select v-model="form.gone" placeholder="请选择活动区域" >
                  <el-option v-for="item in goodsgoing" :key="item.id" :label="item.dictionary_name" :value="item.dictionary_name">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="increaseGoodsDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="savelast">保 存</el-button>
      </span>
    </el-dialog>
    <GoodsConfigResources :value="value2" :goodsConfigDialog="goodsConfigDialog" @close="closeGoodsConfigResources" :events="demoEvents" @goodsconfig-changed="goodsconfigformchange"></GoodsConfigResources>
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
        demoEvents:[],
        allall:'',
        data:{},
        list:[],
        urls:globalConfig.server,
        houselist:[],
        goods:[],
        goodsgoing:[],  //物品去向字典
        goddsname:[],
        form:{
          come:'',
          time:'',
          gone:''
        },
        forms: [],
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
      },
      goodsconfigformchange(data){
        this.data=data;
        
        let len =this.goods.length;
        this.allall='';
        for(let i=0 ; i<data.good.length;i++)
        {
           for(let j=0;j<len;j++)
           {
              if(data.good[i]==this.goods[j].id){
                  this.allall+= "物品名称：" + this.goods[j].dictionary_name;
                  this.allall+="，"
              }
           }
          this.allall+= "物品数量：" + data.num[i]+"，" + "物品单价：" +data.price[i]+"；";

        }
      },
      //保存
      savelast(){
        if(this.data.good){
        for(let i=0;i<this.data.good.length;i++)
        {
          this.list.push({"room":this.data.house[i],"category":this.data.good[i],"amount":this.data.num[i]})
          
        }}
        if(this.value2 =='' || this.form.come =='' || this.list =='' || this.form.gone ==''){
        this.$alert('增配时间、物品来源、物品名称、原物品去向不能为空', 'ERROR', {confirmButtonText: '确定',type: 'error'
        }).catch(()=>{});    
        }else{
         this.$http.post(this.urls+'house/asset_in', {
           house_id:1,
           operate_time:this.value2,
           source:this.form.come,
           ownership:318,
           content:this.list,
           "dest": this.form.gone
        }).then((res) => {
          
            if(res.data.code == "20010"){
            this.$alert('添加成功', '提示', {
            confirmButtonText: '确定',
            type: 'success'
            })
            this.allall='';
            this.increaseGoodsDialogVisible=false;   
            }
            else{
            this.$alert('添加失败', '提示', {
            confirmButtonText: '确定',
            type: 'error'
            })        
            this.decreaseGoodsDialogVisible=false;  
            this.allall='';    
            } 
         }) 
        }
      
      }
    },
    created:function(){
      this.personal = JSON.parse(localStorage.getItem("personal"));
            //物品来源       
      this.$http.get(this.urls+'setting/dictionary/319').then((res) => {  
          if (res.data.code === '30010') {
              this.forms=res.data.data;
          }  
      })
      //房间编号
      this.$http.get(this.urls+'setting/dictionary/298').then((res) => {  
        if (res.data.code === '30010') {
        this.houselist=res.data.data;                
            }  
         })

      //物品类型       
      this.$http.get(this.urls+'setting/dictionary/265').then((res) => {  
          if (res.data.code === '30010') {
            this.goods=res.data.data;
          }  
      })
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

</style>
