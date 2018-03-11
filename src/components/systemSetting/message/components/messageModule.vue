<template>
  <div class="messageModule">
    <el-dialog :title="messageName" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="form" label-width="100px" size="mini">
        <el-row>
          <el-col :span="12">
            <el-form-item label="sign码">
              <el-input placeholder="请输入内容" type="number" v-model="form.sign"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="skin码">
              <el-input placeholder="请输入内容" type="number" v-model="form.skin"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="短信模块名称">
          <el-input v-model="form.template_name"></el-input>
        </el-form-item>
        <el-form-item label="URL">
          <el-input v-model="form.url"></el-input>
        </el-form-item>
        <el-form-item label="模板内容">
          <el-input type="textarea" autosize v-model="form.content"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogFormVisible = false">取&nbsp;消</el-button>
        <el-button size="small" type="primary" @click="confirmAdd">确&nbsp;定</el-button>
      </div>
    </el-dialog>

    <!--<AddModule :organizationDialog="dialogVisible" @close="closeModule"></AddModule>-->
  </div>
</template>

<script>
  import AddModule from '../../../common/organization.vue'

  export default {
    name: 'hello',
    components: {AddModule},
    props: ['module', 'messageName','activeId'],
    data() {
      return {
        dialogVisible: false,
        dialogFormVisible: false,
        form: {
          template_name: '',            //所属模块
          sign: '',          //子模块
          skin:'',
          url: '',           //模板名称
          content: '',        //模板内容
          id:'',
        },
      }
    },
    watch: {
      module(val) {
        this.dialogFormVisible = val
      },
      dialogFormVisible(val) {
        if (!val) {
          this.$emit('close')
        }
      },
      messageName(val){
          if(val ==='修改短信模板'){
              this.getMessageDetail();
          }else {
              this.form.id = '';
          }
      },
      activeId(val){
        this.form.id = val;
      }
    },
    methods: {
//      // 所属模块
//      openAllModule() {
//        this.dialogVisible = true;
//      },
//      // 子模块
//      openChildModule() {
//        this.dialogVisible = true;
//      },
      getMessageDetail(){
        this.$http.get(globalConfig.server+'setting/sms_template/'+this.activeId).then((res)=>{
          if(res.data.code === '20020'){
              this.form.template_name = res.data.data.template_name;
              this.form.sign = res.data.data.sign;
              this.form.skin = res.data.data.skin;
              this.form.url = res.data.data.url;
              this.form.content = res.data.data.content;
          }else {
            this.$notify.warning({
              title: '警告',
              message: res.data.msg
            });
          }
        })
      },
      confirmAdd(){
        if(this.messageName ==='修改短信模板'){
          this.$http.put(globalConfig.server+'setting/sms_template/update',this.form).then((res)=>{
            if(res.data.code === '20030'){
              this.$notify.success({
                title: '成功',
                message: res.data.msg
              });
              this.closeModule();
              this.$emit('close','success')
            }else {
              this.$notify.warning({
                title: '警告',
                message: res.data.msg
              });
            }
          })
        }else {
          this.$http.post(globalConfig.server+'setting/sms_template/save',this.form).then((res)=>{
            if(res.data.code === '20010'){
              this.$notify.success({
                title: '成功',
                message: res.data.msg
              });
              this.$emit('close','success')
              this.closeModule();
            }else {
              this.$notify.warning({
                title: '警告',
                message: res.data.msg
              });
            }
          })
        }
      },
      closeModule() {
        this.dialogVisible = false;
        this.form={
          template_name: '',            //所属模块
          sign: '',          //子模块
          skin:'',
          url: '',           //模板名称
          content: '',        //模板内容
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
