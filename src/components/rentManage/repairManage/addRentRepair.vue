<template>
  <div id="addRentRepair">
    <el-dialog :close-on-click-modal="false" title="修改维修单" :visible.sync="addRentRepairDialogVisible" width="40%">
      <div>
        <el-form size="mini" :model="form" label-width="100px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="客户姓名" required>
                <el-input v-model="form.customer_name" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="客户性别" required>
                <el-radio-group v-model="form.sex">
                  <el-radio v-for="item in sexCategory" :label="item.id" :key="item.id">
                    {{item.dictionary_name}}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="回复电话" required>
                <el-input v-model="form.customer_mobile" ></el-input>
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
            <el-col :span="12">
              <el-form-item label="所属城市" required="">
                <el-select clearable v-model="form.city" placeholder="选择城市" value="">
                  <el-option v-for="item in cityCategory" :label="item.dictionary_name" :value="item.id" :key="item.id"></el-option>
                </el-select>
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
            <el-col :span="16">
              <el-form-item label="备注">
                <el-input type="textarea" v-model="form.remark" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="addRentRepairDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmAdd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props:['addRentRepairDialog', 'editId'],
    data() {
      return {
        addRentRepairDialogVisible:false,
        form:{
          id: '',
          customer_name: '',  //客户姓名
          city: '',
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
          module: 2, //租房
        },
        repairStatusCategory: [],
        responsiblePersonCategory: [],
        sexCategory: [],
        cityCategory: [],
      };
    },
    watch:{
      addRentRepairDialog(val){
        this.addRentRepairDialogVisible = val
      },
      addRentRepairDialogVisible(val){
        if(!val){
          this.$emit('close')
        }else{
          this.getDictionary();
          this.form.id = this.editId;
          this.getDetail();
        }
      },

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
        this.dictionary(306).then((res) => {
          this.cityCategory = res.data;
        });
      },
      getDetail() {
        this.$http.get(globalConfig.server + 'repaire/info/' + this.editId).then((res) => {
          if (res.data.code === "600200") {
            let repairDetail = res.data.data;
            if(repairDetail){
              this.form.customer_name = repairDetail.customer_name;
              this.form.sex = repairDetail.sex;
              this.form.city = repairDetail.city;
              this.form.customer_mobile = repairDetail.customer_mobile;
              this.form.content = repairDetail.content;
              this.form.repair_time = repairDetail.repair_time;
              this.form.repair_master = repairDetail.repair_master;
              this.form.repair_result = repairDetail.repair_result;
              this.form.repair_money = repairDetail.repair_money;
              this.form.status = repairDetail.status;
              this.form.remark = repairDetail.remark;
              this.form.person_liable = repairDetail.person_liable;
            }
          }
        });
      },
      confirmAdd() {
        this.$http.put(globalConfig.server+ 'repaire/update', this.form).then((res)=>{
          if(res.data.code === '600200'){
            this.$notify.success({
              title: '成功',
              message: res.data.msg
            });
            this.initial();
            this.$emit('close','success');
            this.addRentRepairDialogVisible = false;
          }else{
            this.$notify.warning({
              title: '警告',
              message: res.data.msg
            });
          }
        })
      },
      initial(){
        this.form = {
          customer_name: '',  //客户姓名
          city: '',
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
        };
      },
    },
  };
</script>
<style lang="scss" scoped="">
  #addRentRepair{
  }

</style>
