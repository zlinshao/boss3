<template>
  <div>
    <el-dialog title="新建职位/岗位" :visible.sync="addPositionDialogVisible" width="30%">
      <div>
        <el-form size="mini" :model="params" label-width="100px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="类目" required="">
                <el-select v-model="type" clearable="" placeholder="请选择类目">
                  <el-option label="职位" value="position"></el-option>
                  <el-option label="岗位" value="post"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24" v-if="type==='post'">
              <el-form-item label="岗位名称" required="">
                <el-input placeholder="请输入内容" v-model="params.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24" v-if="type==='post'">
              <el-form-item label="岗位标识" required="">
                <el-input placeholder="请输入内容" v-model="params.display_name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24" v-if="type==='post'">
              <el-form-item label="岗位描述" required="">
                <el-input placeholder="请输入内容" v-model="params.description"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="24" v-if="type==='position'">
              <el-form-item label='职位名称' required="">
                <el-input placeholder="请输入内容" v-model="params.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="所属部门" required="">
                <el-input placeholder="请输入内容" readonly="" @focus="selectDepart" v-model="department"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24" v-if="type==='post'">
              <el-form-item label="所属职位" required="">
                <el-select v-model="positionId" clearable="" placeholder="请选择职位">
                  <el-option v-for="item in positionData" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24" v-if="type==='post'">
              <el-form-item label="上级岗位">
                <el-select v-model="params.parent_id" clearable="" placeholder="请选择上级岗位">
                  <el-option v-for="item in postData" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="addPositionDialogVisible=false">取 消</el-button>
        <el-button size="small" type="primary" @click.native="confirmAdd">确 定</el-button>
      </span>
    </el-dialog>

    <Organization :organizationDialog="organizationDialog" @close="closeOrganization" @selectMember="selectMember"></Organization>
  </div>
</template>


<script>
  import Organization from '../../../common/organization.vue'
  export default {
    props:['addPositionDialog'],
    components:{Organization},
    data() {
      return {
        addPositionDialogVisible:false,
        params:{
          org_id:'',
          name:'',
          type:'',
          parent_id:'',
          display_name:'',
          description:''
        },
        type:"",    //类别
        organizationDialog:false,
        department:'',
        positionData:[],
        positionId:'',
        postData:[],
      };
    },
    watch:{
      addPositionDialog(val){
        this.addPositionDialogVisible = val
      },
      addPositionDialogVisible(val){
        if(!val){
          this.$emit('close')
        }
      },
      positionId(val){
        if(val){
          this.params.type = val;
          this.getPost(val);
        }
      },
    },
    methods:{
      //编辑时获取员工信息

      confirmAdd(){
        if(this.type==='position'){
          this.$http.post(globalConfig.server_user+'api/v1/position/type',this.params).then((res) => {
            if(res.data.status === 'success'){
              this.$emit('close','success');
              this.closeModal();
            }else {
              this.$notify({
                title: '警告',
                message: res.data.message,
                type: 'warning'
              });
            }
          });
        }else if(this.type==='post') {
          this.$http.post(globalConfig.server_user+'api/v1/positions',this.params).then((res) => {
            if(res.data.status === 'success'){
              this.$emit('close','success');
              this.closeModal();
            }else {
              let msgData=res.data.message;
              if(typeof (msgData) !=='string'){
                let dataList = [];
                let index = 0;
                let interval=null;
                for (let key in msgData){
                  dataList.push(msgData[key][0])
                }
                new Promise((resolve,reject)=>{
                  interval=setInterval( () => {
                    this.$notify({
                      title: '警告',
                      message: dataList[index],
                      type: 'warning'
                    });
                    index++;
                    if(index===dataList.length){
                      resolve()
                    }
                  },100)
                }).then((data)=>{
                  clearInterval(interval);
                  interval=null;
                })
              }else {
                this.$notify({
                  title: '警告',
                  message: res.data.message,
                  type: 'warning'
                });
              }
            }
          });
        }else {
          this.$notify({
            title: '警告',
            message: '请选择类目',
            type: 'warning'
          });
        }

      },
      selectDepart(){
        this.organizationDialog = true
      },
      //关闭选人框回调
      closeOrganization(){
        this.organizationDialog = false;
      },
      selectMember(val){
        this.params.org_id = val[0].id;
        this.getPosition();
        this.department = val[0].name;
        this.organizationDialog = false;
      },

      //获取职位
      getPosition(){
        this.$http.get(globalConfig.server_user+'api/v1/position/type?org_id='+this.params.org_id).then((res) => {
          if(res.data.status === 'success'){
            this.positionData = res.data.data;
          }else {
            this.$notify.info({
              title: '消息',
              message: res.data.message,
            });
            this.positionTableData = [];
          }
        })
      },
      //获取岗位
      getPost(val){
        this.$http.get(globalConfig.server_user+'api/v1/positions?type='+val).then((res) => {
          if(res.data.status === 'success'){
            this.postData = res.data.data;
          }else {
            this.$notify.info({
              title: '消息',
              message: res.data.message,
            });
            this.postData = [];
          }
        })
      },
      closeModal(){
        this.addPositionDialogVisible = false;
        this.params = {
          org_id:'',
          name:'',
          type:'',
          display_name:'',
          description:''
        };
        this.type = "";    //类别
        this.department = '';
        this.positionId = '';
        this.positionData = [];
      }
    }
  };
</script>
<style lang="scss" scoped="">
  #addRentRepair{
  }

</style>
