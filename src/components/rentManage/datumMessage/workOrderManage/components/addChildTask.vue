<template>
  <div id="addFollowUp">
    <el-dialog :close-on-click-modal="false" title="添加跟进项" :visible.sync="addChildTaskDialogVisible" width="45%">
      <div>
        <el-form size="small" :model="params" label-width="100px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="所属城市" required="">
                <el-select clearable v-model="params.city" placeholder="选择城市" value="">
                  <el-option v-for="item in cityCategory" :label="item.dictionary_name" :value="item.id" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="工单类型" required="">
                <el-select clearable v-model="params.type" placeholder="缴费方式" value="">
                  <el-option v-for="item in dictionary" :label="item.dictionary_name" :value="item.id" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="回复电话">
                <el-input v-model="params.mobile" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="跟进人" required="">
                <el-input  v-model="follow_name" @focus="openOrganizeModal"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="跟进状态">
                <el-select clearable v-model="params.follow_status" placeholder="选择跟进状态" value="">
                  <el-option v-for="item in dictionary_follow" :label="item.dictionary_name" :value="item.id" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="跟进时间">
                <el-date-picker type="datetime" placeholder="选择日期时间"
                                value-format="yyyy-MM-dd HH:mm:ss" v-model="params.follow_time"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="下次跟进时间">
                <el-date-picker type="datetime" placeholder="选择日期时间"
                                value-format="yyyy-MM-dd HH:mm:ss" v-model="params.expected_finish_time"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="跟进事项" required="">
                <el-input type="textarea" v-model="params.matters"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="上传照片">
                <UPLOAD :ID="'addResultPic'" :isClear="isClear" @getImg="getImgData"></UPLOAD>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="addChildTaskDialogVisible = false">取 消</el-button>
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
    props:['addChildTaskDialog','activeId','startEdit'],
    components:{Organization,UPLOAD},
    data() {
      return {
        addChildTaskDialogVisible:false,
        params:{
          city: '',
          parent_id:'',                       //父级id
          matters:'',                        //跟进事项
          type : '',                         //'事件类型',
          follow_id : '',                    // '跟进人',
          expect_time  : '',                 //'期待维修时间',
          expected_finish_time : '',         //'预计完成时间',
          follow_time : '',                  //'跟进时间',
          follow_status : '',                  //'跟进状态',
          image_pic: [],
          mobile: '',
        },
        organizationDialog: false,
        isClear: false,
        dictionary: [],
        dictionary_follow: [],
        follow_name: '',
        length:0,
        type:'',
        isDictionary :false,
        cityCategory: [],
      };
    },
    watch:{
      addChildTaskDialog(val){
        this.addChildTaskDialogVisible = val
      },
      addChildTaskDialogVisible(val){
        if(!val){
          this.$emit('close');
        }else {
          this.isClear = false;
          if(!this.isDictionary){
            this.getDictionary();
          }
        }
      },
      startEdit(val){
        if(val){
          this.getDetail();
        }
      },
      activeId(val){
        this.params.parent_id = val;
      }
    },
    mounted(){
    },
    methods:{
      getDictionary(){
        this.$http.get(globalConfig.server+'setting/dictionary/255').then((res) => {
          if(res.data.code === "30010"){
            this.dictionary = res.data.data;
            this.isDictionary = true
          }
        });
        this.$http.get(globalConfig.server+'setting/dictionary/335').then((res) => {
          if(res.data.code === "30010"){
            this.dictionary_follow = res.data.data;
            this.isDictionary = true;
          }
        });
        this.$http.get(globalConfig.server+'setting/dictionary/306').then((res) => {
          if(res.data.code === "30010"){
            this.cityCategory = res.data.data;
            this.isDictionary = true;
          }
        });
      },
      getDetail(){
        this.$http.get(globalConfig.server+'customer/work_order/'+this.activeId).then((res) => {
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
        this.$http.post(globalConfig.server+'customer/work_order',this.params).then((res) => {
          if(res.data.code === '10010'){
            this.$notify.success({
              title:'成功',
              message:res.data.msg
            });
            this.init();
            this.addChildTaskDialogVisible = false;
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
          city: '',
          matters:'',                     //跟进事项
          type : '',                      //'事件类型',
          follow_id : '',                 // '跟进人',
          expect_time  : '',              //'预计完成时间',
          expected_finish_time : '',      //'预计完成时间',
          follow_time : '',               //'跟进时间',
          follow_status : '',               //'跟进状态',
          image_pic:[],
          parent_id:this.activeId,
          mobile: '',
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
