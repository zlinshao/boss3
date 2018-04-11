<template>
  <div id="addFollowUp">
    <el-dialog :close-on-click-modal="false" title="添加跟进记录" :visible.sync="addResultDialogVisible" width="40%">
      <div>
        <el-form size="small" :model="params" label-width="100px">
          <!--<el-row>-->

            <!--&lt;!&ndash;<el-col :span="12">&ndash;&gt;-->
              <!--&lt;!&ndash;<el-form-item label="填写时间">&ndash;&gt;-->
                <!--&lt;!&ndash;<el-date-picker type="datetime" placeholder="选择日期时间"&ndash;&gt;-->
                                <!--&lt;!&ndash;value-format="yyyy-MM-dd HH:mm:ss" v-model="params.expect_time"></el-date-picker>&ndash;&gt;-->
              <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
            <!--&lt;!&ndash;</el-col>&ndash;&gt;-->

            <!--<el-col :span="12">-->
              <!--<el-form-item label="工单进度">-->
                <!--<el-select clearable v-model="params.follow_status" placeholder="工单进度" value="">-->
                  <!--<el-option v-for="item in dictionary" :label="item.dictionary_name" :value="item.id" :key="item.id"></el-option>-->
                <!--</el-select>-->
              <!--</el-form-item>-->
            <!--</el-col>-->

          <!--</el-row>-->


          <el-row>
            <el-col :span="24">
              <el-form-item label="跟进结果" required="">
                <el-input type="textarea" v-model="params.content"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="addResultDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmAdd">确 定</el-button>
      </span>
    </el-dialog>
    <Organization :organizationDialog="organizationDialog" :length="length" :type="type"
                  @close='closeModal' @selectMember="selectMember"></Organization>

  </div>
</template>

<script>
  import Organization from '../../../../common/organization.vue'
  import UPLOAD from '../../../../common/UPLOAD.vue'
  export default {
    name:'addFollowUp',
    props:['addResultDialog','activeId','startAddResult'],
    components:{Organization,UPLOAD},
    data() {
      return {
        addResultDialogVisible:false,
        params:{
          id:'',
          content : '',             //'跟进内容',
        },
        organizationDialog: false,
        isClear:false,
        dictionary:[],
        follow_name:'',
        length:0,
        type:'',
      };
    },
    watch:{
      addResultDialog(val){
        this.addResultDialogVisible = val
      },
      addResultDialogVisible(val){
        if(!val){
          this.$emit('close');
        }else {
          this.isClear = false
        }
      },
      startAddResult(val){
        this.params.id = this.activeId
      },
    },
    mounted(){
//      this.getDictionary();
    },
    methods:{
      getDictionary(){
        this.$http.get(globalConfig.server+'setting/dictionary/335').then((res) => {
          if(res.data.code === "30010"){
            this.dictionary = res.data.data;
          }
        });
      },
      //调出选人组件
      openOrganizeModal(){
        this.organizationDialog = true;
        this.type = 'staff';
        this.length = 1;
      },
      selectMember(val){
        this.organizationDialog = false;
        this.type = '';
        this.length = '';
        this.params.follow_id = val[0].id;
        this.follow_name = val[0].name;

      },
      closeModal(){
        this.organizationDialog = false
      },
      getImgData(val){
        this.params.image_pic = val[1];
      },
      //确认提交
      confirmAdd(){
        this.$http.post(globalConfig.server+'customer/work_order/matters',this.params).then((res) => {
          if(res.data.code === '10050'){
            this.$notify.success({
              title:'成功',
              message:res.data.msg
            });
            this.init();
            this.$emit('close','success');
            this.addResultDialogVisible = false;
          }else {
            this.$notify.warning({
              title:'警告',
              message:res.data.msg
            })
          }
        })
      },
      init(){
        this.params = {
          id:'',
          content : '',             //'跟进内容',
        };
        this.follow_name = '';
        this.isClear = true;
      }
    }
  };
</script>
<style lang="scss" scoped="">
  #addFollowUp{

  }

</style>
