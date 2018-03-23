<template>
  <div id="increaseGoods">
    <el-dialog title="公告发布" :visible.sync="increaseGoodsDialogVisible" width="42%">
      <div>
        <el-form size="mini" :model="form" label-width="100px" >
          <el-row>
            <el-col :span="12">
              <el-form-item label="公告类型" required>
               <el-select  v-model="form.type" placeholder="请选择">
                  <el-option v-for="item in forms" :key="item.id" :label="item.name" :value="item.id">
                  </el-option> 
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="公告主题" required>
                <el-input v-model="form.title" placeholder=""></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="对象" required >
                 <el-input v-model="form.obj" @click.native="openOrganizationModal()" placeholder="点击选择" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="正文" required>
                <vue-editor id="editor" useCustomImageHandler @imageAdded="handleImageAdded"
                v-model="form.context" :disabled="editorDisabled"></vue-editor>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="附件" required >
                <div class="upload_div"><Upload :ID="'upload'" @getImg="getImage" ></Upload></div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="increaseGoodsDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="savex">保存</el-button>
        <el-button size="small" type="primary" @click="sendx">发布</el-button>
      </span>
    </el-dialog>
    <Organization :organizationDialog="organizationDialog"  @close="closeOrganization"  @selectMember="coloseaa"></Organization>
  </div>
</template>

<script>
  import Organization from '../../../../common/organization.vue'
  import Upload from '../../../../common/UPLOAD.vue';
  import {VueEditor} from 'vue2-editor'
  export default {
    props:['noticeDialog','rowneedx'],
    components:{
      Organization,
      Upload,
      VueEditor
    },    
    data() {
      return {
        increaseGoodsDialogVisible:false,
        urls:globalConfig.server,
        organizationDialog: false,
        saveorsendflag:false,
        lenx:7,
        linelist:[{}],
        form:{
          title:'',
          type:'',  
          // obj:'',
          // objid:[],
          context:'',
          // fujian:'',
          preview:0
        },
        forms:[
          {id:"1",name:"表彰"},
          {id:"2",name:"批评"},
          {id:"3",name:"通知"}
        ],
        houselist:[],
        editorDisabled: false,
      };
    },
    watch:{
      noticeDialog(val){
        this.increaseGoodsDialogVisible = val
      },
      increaseGoodsDialogVisible(val){
        if(!val){
          this.$emit('close')
        }
      },
      rowneedx(val){
        this.form.type=val.type;
        this.form.title=val.title;
        if(val.content){
         this.form.context=val.content;
        }
        else{
          this.form.context='';
        }
      },
    },
    methods:{
       getImage(val) {
        console.log(val);
      },     
      //保存
      savex(){ 
        this.saveorsend();
        if(this.saveorsendflag){
        this.increaseGoodsDialogVisible=false;   
        }
      },
      //发布
      sendx(){
        this.saveorsend();
        if(this.saveorsendflag){
          debugger;
        if(this.form.type=="表彰"){this.form.type=1}
        if(this.form.type=="批评"){this.form.type=2}
        if(this.form.type=="通知"){this.form.type=3}
        if(this.form.type=="研发"){this.form.type=4}
        this.$http.post(this.urls + 'announcement', {
          title:this.form.title,
          type:this.form.type,
          content:this.form.context,
          previev:this.form.preview}).then((res) => {
          console.log(res.data.data);
          if(res.data.code == '99910'){
             this.$notify({
              title: '成功',
              message: '操作成功',
              type: 'success'
            });           
          }else{
            this.$notify.error({
              title: '错误',
              message: '操作失败'
            });              
          }
        })
        this.increaseGoodsDialogVisible=false;   
        }      
      },
      openOrganizationModal() {
        this.organizationDialog = true;
      },
      closeOrganization() {
        this.organizationDialog = false;
      },
      coloseaa(val){
        console.log(val)
        this.form.obj='';
        for(let i =0;i<val.length;i++){
          this.form.obj += val[i].name+ ";"
        }
      },

      //保存或发布校验
      saveorsend(){
        this.saveorsendflag = true;
        if(this.form.type == '' && this.saveorsendflag ==true){
          this.saveorsendflag=false;
          this.$notify({
            title: '警告',
            message: '公告类型不能为空',
            type: 'warning'
          }); 
        }
        if(this.form.title == '' && this.saveorsendflag ==true){
          this.saveorsendflag=false;
          this.$notify({
            title: '警告',
            message: '公告类型不能为空',
            type: 'warning'
          }); 
        }
        // if(this.form.obj == '' && this.saveorsendflag ==true){
        //   this.saveorsendflag=false;
        //   this.$notify({
        //     title: '警告',
        //     message: '对象不能为空',
        //     type: 'warning'
        //   }); 
        // }
        if(this.form.context == '' && this.saveorsendflag ==true){
          this.saveorsendflag=false;
          this.$notify({
            title: '警告',
            message: '正文内容不能为空',
            type: 'warning'
          }); 
        }
      },
      handleImageAdded(file, Editor, cursorLocation, resetUploader) {
        // An example of using FormData
        // NOTE: Your key could be different such as:
        // formData.append('file', file)
        let formData = new FormData();
        formData.append('image', file);
        this.$http.post(this.address + 'api/v1/files', formData).then((res) => {
          console.log(res.data.data);
          let picId = res.data.data;
          this.$http.post('picture/' + picId).then((res) => {
            // Get url from response
            let url = res.data.data;
            Editor.insertEmbed(cursorLocation, 'image', url);
          })
        })
      },
    },

    created:function(){
     
    }
  };
</script>
<style lang="scss" scoped="">

</style>
