<template>
  <div id="increaseGoods">
    <el-dialog title="设置" :visible.sync="increaseGoodsDialogVisible" width="20%" style="margin-top:20vh">
      <div>
        <el-form size="mini" :model="form" label-width="120px">
          <el-row>
            <el-col :span="18">
              <el-form-item label="操作对象" >
                <el-input v-model="follow_name" placeholder="选择操作对象" readonly="" @focus="openOrganizeModal"></el-input> 
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="18">
              <el-form-item label="设置上限">
                <el-input v-model="form.max_count" placeholder="请输入上限范围"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="18">
              <span class="addstyle">操作人:{{this.personal.name}}</span>
            </el-col>
            </el-row>
             <el-row>       
            <el-col :span="18">
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
    <Organization :organizationDialog="organizationDialog"  :type="type"
                  @close='closeModal' @selectMember="selectMember"></Organization>
  </div>
</template>

<script>
  import Organization from '../../../common/organization.vue'

  export default {
    props: ['addMaxContracDialog'],
    components:{Organization},
    data() {
      return {
        increaseGoodsDialogVisible: false,
        organizationDialog: false,
        personal:[],
        configflag:true,
        cityid:'',
        date:'',
        type:'',
        urls: globalConfig.server,
        follow_name:'',
        form: {
          staff_ids:[],
          max_count:''
        }
      };
    },
    watch: {
      addMaxContracDialog(val){
        this.increaseGoodsDialogVisible = val
      },
      increaseGoodsDialogVisible(val){
        if (!val) {
          this.$emit('close')
            this.form={
              staff_ids:[],
              max_count:''
            }
            this.follow_name='';
        }
      },

    },
    methods: {
      savex(){
        this.$http.post(this.urls + 'contract/policy', this.form).then((res) => {
          if(res.data.code=="20010"){
             this.$notify.success({
              title: "成功",
              message: res.data.msg
            });
            this.$emit("configflag",this.configflag);
            this.form={
              staff_ids:[],
              max_count:''
            }
            this.follow_name='';
            this.increaseGoodsDialogVisible=false;       
          }else{
                 this.$notify.warning({
                  title: "警告",
                  message: res.data.msg
                });             
            }
        })
      },
      closeModal(val){
        this.organizationDialog = false;
      },
      //调出选人组件
      openOrganizeModal(){
        this.organizationDialog = true;
        this.type = 'staff';
      },
      selectMember(val){
        for(let i =0;i<val.length;i++){
          this.follow_name += val[i].name + ';';
          this.form.staff_ids.push(val[i].id);
        }
        this.type = '';

      },

    },
    mounted(){
      this.personal = JSON.parse(localStorage.personal);

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
  margin-left:60px;
  line-height: 28px;
}

</style>
