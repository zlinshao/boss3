<template>
  <div id="increaseGoods">
    <el-dialog :title="newOrChange" :visible.sync="increaseGoodsDialogVisible" width="28%" style="margin-top:18vh">
      <div>
        <el-form size="mini" :model="form" label-width="80px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="城市:" >
              <el-select size="mini" v-model="form.city_code" @change="integral" clearable="" @clear="clearable" placeholder="请选择">
               <el-option v-for="val in cityListnext" :label="val.dictionary_name" :value="val.variable.city_code" :key="val.id"></el-option>
              </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="数量(收):">
                <el-input v-model="form.collect_amount" @change="checkNo(form.collect_amount)"></el-input>
              </el-form-item>
            </el-col>
            <span class="addstyle">现剩余:{{form.collect_remain}}</span>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="数量(租):" >
                <el-input v-model="form.rent_amount" @change="checkNo2(form.rent_amount)"></el-input>
              </el-form-item>
            </el-col>
            <span class="addstyle">现剩余:{{form.rent_remain}}</span>
          </el-row>
          <el-row>
            <el-col :span="12">
              <span class="addstyle">操作人:{{operate_name}}</span>
            </el-col>
            <el-col :span="12">
              <span class="addstyle">操作时间:{{date}}</span>
            </el-col>
          </el-row>
        </el-form>

      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="increaseGoodsDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="savex">保 存</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>


  export default {
    props: ['addContracDialog','cityList','newOrChange','formDetail'],

    data() {
      return {
        increaseGoodsDialogVisible: false,
        cityListnext:[],
        personal:[],
        date:'',
        newOrChangein:'',
        urls: globalConfig.server,
        operate_name:'',
        contarctid:'',
        form: {
          city_code:'',
          collect_amount:'',
          rent_amount:'',
          collect_remain: 0,
          rent_remain: 0,
        }
      };
    },
    watch: {
      addContracDialog(val){
        this.increaseGoodsDialogVisible = val
      },
      increaseGoodsDialogVisible(val){
        if (!val) {
          this.$emit('close')
          
        }
      },
      cityList(val){
        this.cityListnext=val;
      },
       formDetail(val){
        this.form.city_code=val.city_code;
        this.form.collect_amount = val.collect_amount;
        this.form.rent_amount = val.rent_amount;
        this.form.collect_remain = val.collect_remain;
        this.form.rent_remain = val.rent_remain;
        this.operate_name = val.operator.real_name;  
        this.contarctid = val.id;
      },
      newOrChange(val){
        this.newOrChangein=val;
        if(val == "新增"){
          this.close();
        }
      },     
    },
    methods: {
      savex(){
      let typeGet = [];
      if (this.newOrChangein == "新增") {
        this.$http.post(this.urls + 'contract/reserve',  this.form ).then((res) => {
          if(res.data.code=="20010"){
             this.$notify.success({
              title: "成功",
              message: res.data.msg
            });
            this.$emit("cityCodeflag",this.form.city_code);
            this.increaseGoodsDialogVisible=false;
            this.close();
          }else{
                 this.$notify.warning({
                  title: "警告",
                  message: res.data.msg
                });             
            }
        })
      } else if(this.newOrChangein=="修改") {
        typeGet = 'contract/reserve/'+this.contarctid;
        this.$http.put(this.urls + 'contract/reserve/' + this.contarctid,  {
          collect_amount:this.form.collect_amount,
          rent_amount:this.form.rent_amount
        } ).then((res) => {
          if(res.data.code=="20030"){
             this.$notify.success({
              title: "成功",
              message: res.data.msg
            });
            this.$emit("cityCodeflag",this.form.city_code);
            this.increaseGoodsDialogVisible=false;
         
          }else{
                 this.$notify.warning({
                  title: "警告",
                  message: res.data.msg
                });             
            }
        })
      }        

      },
      integral(val){
        this.$http
        .get(globalConfig.server + "contract/reserve/remain/"+val)
        .then(res => {
          if (res.data.code === "20000") {
              this.form.collect_remain = res.data.data.collect_remain;
              this.form.rent_remain = res.data.data.rent_remain;
            
          }
        });         
      },
      clearable(){
        this.form.collect_remain = 0;
        this.form.rent_remain = 0;
      },
      close(){
            this.form={
                city_code:'',
                collect_amount:'',
                rent_amount:'',
                collect_remain: 0,
                rent_remain: 0,             
            }
          this.operate_name=this.personal.name;         
      },
checkNo(value){
let reg = /^[1-9]\d*$/;
if (value) {
if (value > 999999 || new RegExp(reg).test(value) == false) {
this.form.collect_amount =''
}
}
} ,
checkNo2(value){
let reg = /^[1-9]\d*$/;
if (value) {
if (value > 999999 || new RegExp(reg).test(value) == false) {
this.form.rent_amount =''
}
}
} 
    },
    mounted(){
      this.personal = JSON.parse(localStorage.personal);
      this.operate_name=this.personal.name;
      let Nowdate=new Date();
      let year=new Date(Nowdate).getFullYear();
      let month=new Date(Nowdate).getMonth()+1;
      let date=new Date(Nowdate).getDate();
      if (month < 10) month = "0" + month;
      if (date < 10) date = "0" + date;
      this.date=year+"-"+month+"-"+date
    }
  };
</script>
<style lang="scss" scoped="">
.addstyle{
  margin-left:20px;
  line-height: 28px;
}



</style>
