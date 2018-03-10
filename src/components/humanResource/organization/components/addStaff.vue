<template>
  <div id="addRentRepair">
    <el-dialog :title="title" :visible.sync="addStaffDialogVisible" width="30%" :before-close="beforeCloseModal">
      <div>
        <el-form size="mini" :model="params" label-width="100px">
          <el-row v-if="!isEdit">
            <el-col :span="24">
              <el-form-item label="所属部门">
                <el-input placeholder="请输入内容" disabled="" v-model="department"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="isEdit">
            <el-col :span="24">
              <el-form-item label="所属部门">
                <el-input placeholder="请输入内容" readonly="" @focus="selectDepart" v-model="department"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="所属岗位">
                <el-select
                  v-model="params.position_id"
                  multiple
                  filterable
                  allow-create
                  default-first-option
                  placeholder="请选择所属岗位">
                  <el-option
                    v-for="item in positionArray"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="姓名">
                <el-input placeholder="请输入内容" v-model="params.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label='手机号'>
                <el-input placeholder="请输入内容" v-model="params.phone"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="beforeCloseModal">取 消</el-button>
        <el-button size="small" type="primary" @click.native="confirmAdd">确 定</el-button>
      </span>
    </el-dialog>

    <Organization :organizationDialog="organizationDialog" :type="type" :length="length" @close="closeOrganization" @selectMember="selectMember"></Organization>
  </div>
</template>

<script>
  import Organization from '../../../common/organization.vue'
  export default {
    props:['addStaffDialog','isEdit','editId','addStaffParams'],
    components:{Organization},
    data() {
      return {
        addStaffDialogVisible:false,
        params:{
          position_id:[],
          org_id:'',
          name:'',
          phone:''
        },
        title : '新建用户',
        organizationDialog:false,
        department:'',
        type:null,
        length:null,
        positionArray:[],
        roleArray:[]
      };
    },
    watch:{
      addStaffDialog(val){
        this.addStaffDialogVisible = val
      },
      addStaffDialogVisible(val){
        if(!val){
          this.$emit('close')
        }
      },
      isEdit(val){
        if(!val){
          this.title = '新建用户'
        }else {
          this.title = '修改用户'
          this.getStaffInfo();
        }
      },
      'addStaffParams':{
        deep:true,
        handler(val,oldVal){
          if(!this.isEdit){
            this.params.org_id = val.depart_id;
            this.department = val.depart_name;
            this.getPosition(this.params.org_id);
          }
        }
      }
    },
    methods:{
      //编辑时获取员工信息
      getStaffInfo(){
        this.$http.get(globalConfig.server_user+'api/v1/users/'+this.editId).then((res) => {
          if(res.data.status === 'success'){
            this.params.name = res.data.data.name;
            this.params.phone = res.data.data.phone;
            this.params.org_id = res.data.data.org[0].id;
            this.department = res.data.data.org[0].name;
            this.roleArray = res.data.data.role;
            this.getPosition(this.params.org_id);
          }else {
            this.$notify({
              title: '警告',
              message: res.data.message,
              type:'warning'
            });
          }
        });
      },
      //获取岗位
      getPosition(id){
        this.$http.get(globalConfig.server_user+'api/v1/positions?org_id=' + id+ '&per_page_number=50').then((res) => {
          if(res.data.status === 'success'){
            this.positionArray = res.data.data;
            if(this.roleArray.length>0){
              this.roleArray.forEach((item) => {
                this.params.position_id.push(item.position_id)
              })
            }
          }else {
            this.positionArray =[];
          }
        })
      },
      confirmAdd(){
        if(!this.isEdit){
          this.$http.post(globalConfig.server_user+'api/v1/users',this.params).then((res) => {
            if(res.data.status === 'success'){
              this.$emit('close','success');
              this.closeModal();
            }else {
              this.$notify({
                title: '警告',
                message: res.data.message,
                type:'warning'
              });
            }
          });
        }else {
          this.$http.put(globalConfig.server_user+'api/v1/users/'+this.editId,this.params).then((res) => {
            if(res.data.status === 'success'){
              this.$emit('close','success');
              this.closeModal();
            }else {
              this.$notify({
                title: '警告',
                message: res.data.message,
                type:'warning'
              });
            }
          });
        }

      },
      selectDepart(){
        this.organizationDialog = true;
        this.type = 'depart';
        this.length = 1;
      },
      //关闭选人框回调
      closeOrganization(){
        this.organizationDialog = false;
        this.type = null;
        this.length = null;
      },
      selectMember(val){
        this.params.org_id = val[0].id;
        this.department = val[0].name;
        this.type = null;
        this.length = null;
        this.organizationDialog = false;
      },
      beforeCloseModal(){
        if(this.isEdit){
          this.params = {
            position_id:[],
            org_id:'',
            name:'',
            phone:''
          };
          this.department = '';
          this.positionArray =[];
          this.roleArray =[];
        }
        this.addStaffDialogVisible = false;
      },
      closeModal(){
        this.addStaffDialogVisible = false;
        this.params = {
          position_id:[],
          org_id:'',
          name:'',
          phone:''

        };
        this.department = '';
        this.positionArray =[];
        this.roleArray =[];
      }
    }
  };
</script>
<style lang="scss" scoped="">
  #addRentRepair{
  }

</style>
