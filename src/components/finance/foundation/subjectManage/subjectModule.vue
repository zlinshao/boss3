<template>
  <div>
    <el-dialog :close-on-click-modal="false" title="新增科目" :visible.sync="dialogVisible" width="40%">
      <el-form :model="form" size="mini" label-width="80px" ref="form">
        <el-form-item label="上级科目">
          <el-input v-model="form.preSubject" @focus="openSubjectTree" placeholder="请选择"
                                readonly>
            <template slot="append">
              <div style="cursor: pointer;" @click="clearSubjectTree">清空</div>
            </template>
          </el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="科目名称">
              <el-input v-model="form.title" placeholder="请输入科目名称" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
                    <el-select v-model="form.er_type" size="mini" clearable :disabled="typeDisabled">
                      <el-option v-for="item in typeValue" :label="item.label" :value="item.value" :key="item.value" ></el-option>
                    </el-select>
                  </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="备注">
          <el-input type="textarea" :autosize="{minRows: 2, maxRows: 4}" placeholder="请填写备注" v-model="form.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取&nbsp;消</el-button>
        <el-button size="small" type="primary" @click="confirmSubject">确&nbsp;定</el-button>
      </div>
    </el-dialog>
    <subjectTree :subjectDialog="subjectVisible"  :types="subjectType" @close="closeSubjectTree"
                    @selectSubject="selectSubject"></subjectTree>
  </div>
</template>

<script>
  import subjectTree from  '../subjectTree.vue'
  export default {
    name: "add-subject",
    components:{subjectTree},
    props: ['FormVisible','data','cate'],
    data() {
      return {
        dialogVisible: false,
        form: {
          preSubject: '',
          title: '',
          er_type: 3,
          remark: '',
          superior_id:''
        },
        id:'',
        subjectVisible:false,
        subjectType:'next',
        typeDisabled:true,
        typeValue: [{
          value:1,
          label:'收入',
        },{
          value:2,
          label:'支出',
        },{
          value:3,
          label:'混合',
        }],
      }
    },
    mounted() {
     
    },
    watch: {
      data(val){
        if(this.cate==='edit'){
          this.form.preSubject=val.superior_title;
          this.form.superior_id=val.superior_id;
          this.form.title=val.title;
          this.form.er_type=val.er_type;
          this.form.remark=val.remark;
          this.id=val.id;
        }
      },
      FormVisible(val) {
        this.dialogVisible = val;
      },
      dialogVisible(val) {
        if (!val) {
          this.$emit('close')
        }else{

        }
      },
      'form.preSubject'(val){
          console.log(val);
          if(!val){
            this.typeDisabled=true;
          }else{
            this.typeDisabled=false;
          }
      }
    },
    methods: {
      closeSubjectTree(){
        this.subjectVisible=false;
      },
      openSubjectTree(){
        this.subjectType='next';
        this.subjectVisible=true;
      },
      selectSubject(val){
        this.form.superior_id=val.id;
        this.form.preSubject=val.name;
      },
      clearSubjectTree(){
        this.form.preSubject='';
        this.form.superior_id='';
      },
      confirmSubject(){
        let url,method;
        if(this.cate==='edit'){
          method='PUT',
          url=globalConfig.finance_server+'account/subject/update/'+this.id;
        }else{
          method='POST',
          url=globalConfig.finance_server+'account/subject/add';
        }
        this.$http({method,url,data:this.form}).then((res)=>{
            if(res.data.success){
              this.prompt('success', res.data.msg);
              this.dialogVisible=false;
              this.resetForm();
              this.$emit('close','success');
            }else{
              this.prompt('warning', res.data.message);
            }
        });
      },
      close_() {
        console.log(1);
      },
      resetForm(){
          this.form.superior_id='';
          this.form.title='';
          this.form.preSubject='';
          this.form.er_type=3;
          this.form.remark='';
      }
    },
  }
</script>

<style scoped>

</style>
