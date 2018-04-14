<template>
  <div>
    <el-dialog :close-on-click-modal="false" title="作废合同修改" :visible.sync="editCancelDialogVisible">
      <div class="scroll_bar">
        <div class="title">基本信息</div>
        <div class="form_border">
          <el-form size="mini" :model="params" label-width="120px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="任务类型">
                  <el-select clearable v-model="taskType" disabled="" placeholder="请选择任务类型" value="">
                    <el-option label="领取" value="1"></el-option>
                    <el-option label="作废" value="2"></el-option>
                    <el-option label="上缴" value="3"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="城市">
                  <el-select clearable v-model="params.city_code" disabled="" placeholder="请选择城市" value="">
                    <el-option v-for="item in cityDictionary" :label="item.dictionary_name" :value="item.variable.city_code"
                               :key="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="报备日期">
                  <el-date-picker
                    type="datetime"
                    placeholder="选择日期时间"
                    disabled
                    value-format="yyyy-MM-dd HH:mm:ss" v-model="params.report_time">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="报备人">
                  <el-input disabled="" v-model="staff_name" @focus="openOrganizeModal"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="所属部门">
                  <el-input disabled="" v-model="depart_name"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>

        <div class="title">操作信息</div>
        <div class="form_border">
          <el-form size="mini" :model="params" label-width="120px">
            <div class="title">
              收房合同作废（取消勾选则不再选择）
            </div>
            <el-row>
              <el-checkbox-group v-model="params.candidate">
                <el-col :span="6" v-for="(val,key) in isSelectCollect" :key="key">
                  <el-checkbox :label="key" name="type">{{val}}</el-checkbox>
                </el-col>
              </el-checkbox-group>
            </el-row>

            <div class="title">
              租房合同作废（取消勾选则不再选择）
            </div>
            <el-row>
              <el-checkbox-group v-model="params.candidate">
                <el-col :span="6" v-for="(val,key) in isSelectRent" :key="key">
                  <el-checkbox :label="key" name="type">{{val}}</el-checkbox>
                </el-col>
              </el-checkbox-group>
            </el-row>
          </el-form>
        </div>

        <div class="title">剩余合同</div>
        <div class="form_border">
          <el-form size="mini" :model="params" label-width="120px">
            <!--<el-row>-->
              <!--<el-col :span="8">-->
                <!--<el-form-item label="剩余合同数（收）">-->
                  <!--<el-input disabled="" v-model="collect"></el-input>-->
                <!--</el-form-item>-->
              <!--</el-col>-->
              <!--<el-col :span="8">-->
                <!--<el-form-item label="剩余合同数（租）">-->
                  <!--<el-input disabled="" v-model="rent"></el-input>-->
                <!--</el-form-item>-->
              <!--</el-col>-->
            <!--</el-row>-->

            <el-row>
              <el-col>
                <el-form-item label="截图">
                  <Upload :ID="'jieTu_edit_cancel'" @getImg="getImg"></Upload>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="16">
                <el-form-item label="备注">
                  <el-input v-model="params.remark" type="textarea" ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="editCancelDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmAdd">确 定</el-button>
      </span>
    </el-dialog>
    <Organization :organizationDialog="organizationDialog" :length="length" :type="type"
                  @close='closeModal' @selectMember="selectMember"></Organization>
  </div>
</template>

<script>
  import Organization from '../../../../common/organization.vue'
  import Upload from '../../../../common/UPLOAD.vue'
  export default {
    components:{Organization,Upload},
    props:['editCancelDialog','cancelEditId','startOperate'],
    data() {
      return {
        editCancelDialogVisible:false,
        params: {
          city_code:'',
//          category:'',
          report_time:'',
          staff_id:'',
          department_id:'1',
          remark:'',
          screenshot:[],
          //zuofei
          candidate:[],
        },
        taskType:'2',
        cityDictionary:[],
        length:0,
        type:'',
        organizationDialog:false,
        staff_name : '',
        depart_name : '',
        collect : '',
        rent : '',
        upStatus:false,



//        已经选取的合同编号
        isSelectCollect: [],
        isSelectRent: [],

      };
    },
    mounted(){

    },
    watch:{
      editCancelDialog(val){
        this.editCancelDialogVisible = val
      },
      editCancelDialogVisible(val){
        if(!val){
          this.$emit('close')
        }
      },
      startOperate(val){
        if(val){
          this.getDictionary();
        }
      }
    },
    methods:{
      getDictionary(){
        this.dictionary(306, 1).then((res) => {
          this.cityDictionary = res.data;
          this.getApplyDetail();
        });
      },
      //获取详情
      getApplyDetail(){
        this.$http.get(globalConfig.server+'contract/invalidate/'+this.cancelEditId).then((res) => {
          if(res.data.code === '20010'){
            let applyInfo = res.data.data.full;
            this.params.report_time = applyInfo.report_time;
            this.params.staff_id = applyInfo.staff_id;
            this.params.city_code = applyInfo.city_code;
            this.params.department_id = applyInfo.department_id;


            this.depart_name = res.data.data.department.name;
            if(applyInfo.simple_staff){
              this.staff_name = applyInfo.simple_staff.real_name;
            }

            this.params.screenshot = applyInfo.screenshot;

            this.isSelectCollect = applyInfo.collects;
            this.isSelectRent = applyInfo.rents;
            this.params.candidate = [];

            for(let key in this.isSelectCollect){
              this.params.candidate.push(key)
            }
            for(let key in this.isSelectRent){
              this.params.candidate.push(key)
            }
            this.collect = applyInfo.collect_remain;
            this.rent = applyInfo.rent_remain;
            this.params.city_code = applyInfo.city_code;

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
        this.params.staff_id = val[0].id;
        this.params.department_id = val[0].org[0].id;
        this.staff_name = val[0].name;
        this.depart_name =  val[0].org[0].name;

      },

      closeModal(){
        this.organizationDialog = false
      },

      getImg(val){
        this.upStatus = val[2];
        this.params.screenshot = val[1];
      },

      //确认提交
      confirmAdd(){
        if(this.upStatus === true){
          this.$notify.warning({
            title:'警告',
            message:'图片正在上传'
          })
        }else {
          this.$http.put(globalConfig.server+'contract/invalidate/'+this.cancelEditId,this.params).then((res) => {
            if(res.data.code ==='20000'){
              this.$notify.success({
                title:'成功',
                message:res.data.msg
              });
              this.$emit('close','success');
              this.closeAddModal();
            }else {
              this.$notify.warning({
                title:'警告',
                message:res.data.msg
              })
            }
          })
        }
      },
      closeAddModal(){
        $('.imgItem').remove();
        this.editCancelDialogVisible = false;
        this.params = {
          city_code:'',
//          category:'',
          report_time:'',
          staff_id:'',
          department_id:'1',
          remark:'',
          screenshot:[],
          candidate:[],
        };
        this.taskType = '2';
        this.cityDictionary = [];
        this.length = '';
        this.type = '';
        this.organizationDialog = false;
        this.staff_name  =  '';
        this.depart_name  =  '';
        this.collect  =  '';
        this.rent  =  '';
        this.upStatus = false;
        this.isSelectCollect = [];
        this.isSelectRent = [];
      }
    }
  };
</script>
<style lang="scss" scoped="">
  .addMore{
    text-align: right;
    i{
      font-size: 18px;
    }
  }
  .deleteNumber{
    text-align: center;
    cursor: pointer;
    margin-top: 2px;
    color: #409EFF;
    &:hover{
      color: #6a8dfb;

    }
  }
</style>
