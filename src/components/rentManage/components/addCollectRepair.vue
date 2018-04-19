<template>
  <div id="addCollectRepair">
    <el-dialog :close-on-click-modal="false" title="添加维修" :visible.sync="addCollectRepairDialogVisible" width="50%">
      <div>
        <el-form size="mini" :model="form" label-width="100px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="合同编号">
                <el-input v-model="form.contract_number" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="合同类型">
                <el-input v-model="form.contract_type" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="客户姓名">
                <el-input v-model="form.customer_name" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="客户性别">
                <el-radio-group v-model="form.sex">
                  <el-radio v-for="item in sexCategory" :label="item.id" :key="item.id">
                    {{item.dictionary_name}}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="客户电话">
                <el-input v-model="form.customer_mobile" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <el-form-item label="维修内容">
                <el-input type="textarea" v-model="form.content" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="维修时间">
                <el-date-picker type="date" v-model="form.repair_time" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="维修师傅">
                <el-input  v-model="form.repair_master" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="维修结果">
                <el-input  v-model="form.repair_result" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="维修金额">
                <el-input  v-model="form.repair_money" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="维修状态">
                <el-select v-model="form.status" placeholder="请选择维修状态">
                  <el-option v-for="item in repairStatusCategory" :label="item.dictionary_name" :key="item.id" :value="item.id">{{item.dictionary_name}}</el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="认责人">
                <el-select v-model="form.person_liable" placeholder="请选择认责归属" clearable>
                  <el-option v-for="item in responsiblePersonCategory" :label="item.dictionary_name" :key="item.id" :value="item.id">{{item.dictionary_name}}</el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
          </el-row>
          <el-row>
            <el-col :span="16">
              <el-form-item label="备注">
                <el-input type="textarea" v-model="form.remark" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="describe_border">
          功能说明：再次发布维修信息，您指定维修人员会收到短信，即使维修人员在外作业也能知道接下来的工作内容。
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="addCollectRepairDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmAdd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props:['addCollectRepairDialog'],
    data() {
      return {
        addCollectRepairDialogVisible:false,
        form:{
          contract_number: '', //合同编号
          contract_type: '', //合同类型
          customer_name: '',  //客户姓名
          sex: null,     //性别
          customer_mobile: '',  //客户电话
          content: '',  //维修内容
          repair_time: '',  //维修时间
          repair_master: '',  //维修师傅
          repair_result: '',  //维修结果
          repair_money: '',   //维修金额
          remark: '',  //备注
          status: '',  //维修状态
          person_liable: '', //认责人
          module: 1, //收房
        },
        repairStatusCategory: [],
        responsiblePersonCategory: [],
        sexCategory: [],
      };
    },
    watch:{
      addCollectRepairDialog(val){
        this.addCollectRepairDialogVisible = val
      },
      addCollectRepairDialogVisible(val){
        if(!val){
          this.$emit('close')
        }else{
          this.form = {};  //新增时候清空数据
          this.getDictionary();
        }
      }
    },
    mounted() {

    },
    methods: {
      getDictionary() {
        this.dictionary(595).then((res) => {  //维修状态
          this.repairStatusCategory = res.data;
        });
        this.dictionary(604).then((res) => {  //认责人
          this.responsiblePersonCategory = res.data;
        });
        this.dictionary(228).then((res) => {
          this.sexCategory = res.data;
        });
      },
      confirmAdd() {
        this.addCollectRepairDialogVisible = false;
        this.form.module = 1;
        this.$http.post(globalConfig.server+ 'repaire/insert', this.form).then((res)=>{
          if(res.data.code === '600200'){
            this.$notify.success({
              title: '成功',
              message: res.data.msg
            });
          }else{
            this.$notify.warning({
              title: '警告',
              message: res.data.msg
            });
          }
        })
      },
    },
  };
</script>
<style lang="scss" scoped="">
  #addCollectRepair{
  }

</style>
