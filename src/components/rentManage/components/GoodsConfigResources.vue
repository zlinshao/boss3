<template>
  <div id="increaseGoods">
    <el-dialog title="物品增配" :visible.sync="increaseGoodsDialogVisible" width="80%" >
      <div class="goodsall">
            <span class="topmassage">物品增配（点击下方按钮切换添加模式）</span>
            <el-button type="primary" @click="openModalDialogx('addGoodsDialog')">物品设置</el-button>
        <div class="goodtable">
          <el-form :model="form" style="width: 100%" >
          <el-row>
            <el-col :span="4">
              增加日期
            </el-col>
            <el-col :span="8">
              {{this.data}}
            </el-col>            
            <el-col :span="4">
              增加人
            </el-col>
            <el-col :span="8">
              {{this.personal.name}}
            </el-col>
          </el-row>

        </el-form>
  <el-table
    :data="tableData"
    border
    height="304"
    style="width: 100%">
    <el-table-column  label="物品来源">
        <template slot-scope="scope">    
                <el-select  v-model="form.comeform[scope.$index]" placeholder="请选择物品来源">
                  <el-option v-for="item in forms" :label="item.dictionary_name" :key="item.id" :value="item.id"></el-option>
                </el-select>         
        </template>
    </el-table-column>
    <el-table-column label="物品位置">
        <template slot-scope="scope">
                <el-select  v-model="form.house[scope.$index]" placeholder="请选择物品位置">
                  <el-option v-for="item in houselist" :label="item.dictionary_name" :key="item.id" :value="item.id"></el-option>
                </el-select>        
        </template>
    </el-table-column>
    <el-table-column label="物品名称">
        <template slot-scope="scope">
                 <el-select  v-model="form.good[scope.$index]" placeholder="请选择物品位置">
                  <el-option v-for="item in goods" :label="item.dictionary_name" :key="item.id" :value="item.id"></el-option>
                </el-select>     
        </template>
    </el-table-column>
    <el-table-column label="单价（元）">
        <template slot-scope="scope">
          <el-input v-model="form.price[scope.$index]" placeholder=""></el-input>
        </template>
    </el-table-column>
    <el-table-column label="数量">
        <template slot-scope="scope">
          <el-input v-model="form.num[scope.$index]" placeholder=""></el-input>
        </template>
    </el-table-column>
    <el-table-column label="总价（元）">
        <template slot-scope="scope">
          <el-input v-model="form.sum[scope.$index]">{{sum}}</el-input>
        </template>
    </el-table-column>
    <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" ><i class="iconfont icon-shibai" style="color: #6a8dfb;font-size:19px"></i></el-button>
        </template>
    </el-table-column>

  </el-table>  
  <span class="goodsCount">合计总价：</span> {{this.form.price}}
</div>                   
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="increaseGoodsDialogVisible = false">保 存</el-button>
      </span>
    </el-dialog>
  <AddGoodsResources :addGoodsDialog="addGoodsDialog" @close="closeAddGoodsResources"></AddGoodsResources>
  </div>

</template>

<script>
  import AddGoodsResources from '../components/AddGoodsResources.vue' //增加物品页面
  export default {
    props:['goodsConfigDialog'],
    components: {
      AddGoodsResources
    },
    data() {
      return {
        increaseGoodsDialogVisible:false,
        form:{
          comeform:[],
          house:[],
          good:[],
          price:[],
          num:[],
          sum:[]
        },
        urls:globalConfig.server,
        addGoodsDialog:false,
        data:'',
        houselist:[], //物品位置
        forms: [],  //物品来源
        goods:[],   //物品名称    
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      };
    },
    watch:{
      goodsConfigDialog(val){
        this.increaseGoodsDialogVisible = val
      },
      increaseGoodsDialogVisible(val){
        if(!val){
          this.$emit('close')
        }
      }
    },
      methods:{
      openModalDialogx(){       
        this.addGoodsDialog=true;
      },
      closeAddGoodsResources(){
        this.addGoodsDialog=false;
      }
    },

        created:function(){
        let date = new Date();
        let seperator1 = "-";
        let year = date.getFullYear();
        let day = date.getDay()
        let month = date.getMonth() + 1;
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        this.data = year + seperator1 + month + seperator1 + day;
        
        this.personal = JSON.parse(localStorage.getItem("personal"));
        //房间编号
        this.$http.get(this.urls+'setting/dictionary/298').then((res) => {  
            console.log(res);
            if (res.data.code === '30010') {
                this.houselist=res.data.data;
                
            }  
         })
        //物品来源       
        this.$http.get(this.urls+'setting/dictionary/319').then((res) => {  
            console.log(res);
            if (res.data.code === '30010') {
                this.forms=res.data.data;
            }  
         })
        //物品类型       
        this.$http.get(this.urls+'setting/dictionary/265').then((res) => {  
            console.log(res);
            if (res.data.code === '30010') {
                this.goods=res.data.data;
            }  
         })

    }
  };
</script>
<style lang="scss" scoped="">
  .goodsall{ width: 1450px; height: 480px; margin:20px auto 0; border:1px #ccc solid; position: relative;}
  .goodsall .topmassage{
    width: 304px;
    height: 32px; 
    line-height: 32px;
    color: #409EFF;
    font-size: 16px;
    display: block;
    position: absolute;
    top:-16px;
    left:50px;
    text-indent: 10px;
    background: #fff;
  }
  .goodsall .el-button--primary{
    position: absolute;
    right:20px;
    top:20px;
  }
  .goodsall .el-col-8,.goodsall .el-col-4{
    margin:0;
    border:1px #ebeef5 solid;
    text-align: center;
    line-height: 40px;   
  }
  .goodsall .goodtable{
    width:1392px;
    height: 320px;
    position: absolute;
    left:25px;
    top: 70px;
  }
  .goodsall .is-leaf{
    background: #fff !important;
  }
  .goodsall .goodsCount{
    width: 1392px;
    height: 32px;
    font-size: 16px;
    line-height: 32px;
    text-align: center;
    display: block;
  }


</style>
