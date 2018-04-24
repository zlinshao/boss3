<template>
  <div id="addCollectRepair">
    <el-dialog :close-on-click-modal="false" title="添加维修" :visible.sync="addCollectRepairDialogVisible" width="50%">
      <div>
        <el-form size="mini" :model="form" label-width="100px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="合同编号">
                <el-input v-model="form.contract_number" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="合同类型">
                <el-input v-model="form.contract_type" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所属城市" required="">
                <el-select clearable v-model="form.city" placeholder="选择城市" value="">
                  <el-option v-for="item in cityCategory" :label="item.dictionary_name" :value="item.id"
                             :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="客户姓名" required>
                <el-input v-model="form.customer_name"></el-input>
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
                <el-input v-model="form.customer_mobile"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="跟进人" required>
                <el-input v-model="follow_name" readonly @focus="chooseStaff" placeholder="请选择跟进人">
                  <template slot="append">
                    <div style="cursor: pointer;" @click="emptyStaff">清空</div>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="下次跟进时间">
                <el-date-picker type="datetime" v-model="form.estimated_time" placeholder="请选择日期"
                                value-format="yyyy-MM-dd hh:mm:ss" default-time="12:00:00"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="初步认责人">
                <el-select v-model="form.person_liable" placeholder="请选择认责归属" clearable>
                  <el-option v-for="item in responsiblePersonCategory" :label="item.dictionary_name" :key="item.id"
                             :value="item.id">{{item.dictionary_name}}
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="预计维修时间">
                <el-date-picker type="datetime" v-model="form.repair_time" placeholder="选择日期"
                                value-format="yyyy-MM-dd hh:mm:ss" default-time="12:00:00"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="预计维修金额">
                <el-input v-model="form.repair_money"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="维修师傅">
                <el-input v-model="form.repair_master"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="维修状态">
                <el-select v-model="form.status" placeholder="请选择维修状态">
                  <el-option v-for="item in repairStatusCategory" :label="item.dictionary_name" :key="item.id"
                             :value="item.id">{{item.dictionary_name}}
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8" v-if="form.status===600">
              <el-form-item label="实际维修金额">
                <el-input v-model="form.real_money"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" v-if="form.status===600">
              <el-form-item label="最终认责人">
                <el-select v-model="form.final_liable" placeholder="请选择认责归属" clearable>
                  <el-option v-for="item in responsiblePersonCategory" :label="item.dictionary_name" :key="item.id"
                             :value="item.id">{{item.dictionary_name}}
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
          </el-row>
          <el-row>
            <el-col :span="16">
              <el-form-item label="维修内容">
                <el-input type="textarea" v-model="form.content"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <el-form-item label="备注">
                <el-input type="textarea" v-model="form.remark"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="addCollectRepairDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmAdd">确 定</el-button>
      </span>
    </el-dialog>
    <Organization :organizationDialog="organizationDialog" :type="organizeType" @close="closeOrganization"
                  @selectMember="selectMember"></Organization>
  </div>
</template>

<script>
  import Organization from '../../common/organization';

  export default {
    props: ['addCollectRepairDialog', 'contract'],
    components: {Organization},
    data() {
      return {
        addCollectRepairDialogVisible: false,
        organizationDialog: false,
        organizeType: '',
        form: {
          city: '',
          contract_id: '', //合同Id
          contract_number: '', //合同编号
          contract_type: '', //合同类型
          customer_name: '',  //客户姓名
          sex: null,     //性别
          customer_mobile: '',  //客户电话
          content: '',  //维修内容
          repair_time: '',  //维修时间
          repair_master: '',  //维修师傅
          repair_money: '',   //维修金额
          remark: '',  //备注
          status: '',  //维修状态
          person_liable: '', //认责人
          module: 1, //收房
          follow_id: '',  //跟进人id
          final_liable: '', //最终认责人
          real_money: '',  //实际维修金额
          estimated_time: '',  //下次跟进时间
        },
        follow_name: '', //跟进人名字
        repairStatusCategory: [],
        responsiblePersonCategory: [],
        sexCategory: [],
        cityCategory: [],
      };
    },
    watch: {
      addCollectRepairDialog(val) {
        this.addCollectRepairDialogVisible = val
      },
      addCollectRepairDialogVisible(val) {
        if (!val) {
          this.$emit('close');
        } else {
          this.initial();
          this.getDictionary();
        }
      },
      contract(val) {
        this.form.contract_id = val.contract_id;
        this.form.contract_number = val.contract_number;
        this.form.contract_type = val.type;
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
        this.dictionary(228).then((res) => {  //性别
          this.sexCategory = res.data;
        });
        this.dictionary(306, 1).then((res) => {  //城市
          this.cityCategory = res.data;
        });
      },
      confirmAdd() {
        this.$http.post(globalConfig.server + 'repaire/insert', this.form).then((res) => {
          if (res.data.code === '600200') {
            this.$notify.success({
              title: '成功',
              message: res.data.msg
            });
            this.addCollectRepairDialogVisible = false;
          } else {
            this.$notify.warning({
              title: '警告',
              message: res.data.msg
            });
          }
        })
      },
      initial() {
        this.form = {
          contract_id: this.contract.contract_id, //合同Id
          contract_number: this.contract.contract_number, //合同编号
          contract_type: this.contract.type, //合同类型
          city: '',
          customer_name: '',  //客户姓名
          sex: null,     //性别
          customer_mobile: '',  //客户电话
          content: '',  //维修内容
          repair_time: '',  //维修时间
          repair_master: '',  //维修师傅
          repair_money: '',   //维修金额
          remark: '',  //备注
          status: '',  //维修状态
          person_liable: '', //认责人
          follow_id: '',  //跟进人id
          final_liable: '', //最终认责人
          real_money: '',  //实际维修金额
          estimated_time: '',
        };
        this.follow_name = '';
      },
      closeOrganization() {
        this.organizeType = '';
        this.organizationDialog = false;
      },
      selectMember(val) {
        this.follow_name = val[0].name;
        this.form.follow_id = val[0].id;
      },
      chooseStaff() {
        this.organizationDialog = true;
        this.organizeType = 'staff';
      },
      emptyStaff() {
        this.follow_name = '';
        this.form.follow_id = '';
      }
    },
  };
</script>
<style lang="scss" scoped="">
  #addCollectRepair {
  }

</style>
