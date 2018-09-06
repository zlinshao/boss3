<template>
  <div id="addCollectRepair">
    <el-dialog :close-on-click-modal="false" title="修改维修单" :visible.sync="addCollectRepairDialogVisible" width="50%">
      <div>
        <el-form size="mini" :model="form" label-width="100px">
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
                <el-date-picker
                  v-model="form.estimated_time"
                  type="datetime"
                  placeholder="选择日期时间"
                  value-format="yyyy-MM-dd hh:mm:ss">
                </el-date-picker>
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
              <el-form-item label="维修时间">
                <el-date-picker
                  v-model="form.repair_time"
                  type="datetime"
                  placeholder="选择日期时间"
                  value-format="yyyy-MM-dd hh:mm:ss">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="维修金额">
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
            <el-col :span="8">
              <el-form-item label="所属城市" required="">
                <el-select clearable v-model="form.city" placeholder="选择城市" value="">
                  <el-option v-for="item in cityCategory" :label="item.dictionary_name" :value="item.id"
                             :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="紧急程度" required>
                  <el-select clearable placeholder="请选择紧急程度" value="" v-model="form._emergency">
                    <el-option v-for="item in emergencys" :value="item.value" :key="item.id"></el-option>
                  </el-select>
                </el-form-item>
            </el-col>
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
    props: ['addCollectRepairDialog', 'editId'],
    components: {Organization},
    data() {
      return {
        addCollectRepairDialogVisible: false,
        organizationDialog: false,
        organizeType: '',
        form: {
          id: '',  //维修单id
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
          module: 1, //收房
          follow_id: '',  //跟进人id
          final_liable: '', //最终认责人
          real_money: '',  //实际维修金额
          estimated_time: '', //下次跟进时间
          emergency: "", // 紧急程度
         _emergency: "" // 紧急程度编号
        },
        follow_name: '',
        repairStatusCategory: [],
        responsiblePersonCategory: [],
        sexCategory: [],
        cityCategory: [],
        emergencys: [
        // 紧急程度
        { id: 1, value: "一般" },
        { id: 2, value: "紧急" }
      ]
      };
    },
    watch: {
      addCollectRepairDialog(val) {
        this.addCollectRepairDialogVisible = val
      },
      addCollectRepairDialogVisible(val) {
        if (!val) {
          this.$emit('close')
        } else {
          this.getDictionary();
          this.form.id = this.editId;
          this.getDetail();
        }
      },
      editId(val) {
        if (val) {
          // this.form.id = this.editId;
          // this.getDetail();
        }
      },
      _emergency(val) {
      this.slist = this.emergencys[val];
    }
    },
    methods: {
      getDictionary() {
        this.dictionary(595).then((res) => {  //维修状态
          this.repairStatusCategory = res.data;
        });
        this.dictionary(604).then((res) => {  //认责人
          this.responsiblePersonCategory = res.data;
        });
        this.dictionary(228).then((res) => { //性别
          this.sexCategory = res.data;
        });
        this.dictionary(306, 1).then((res) => { //城市
          this.cityCategory = res.data;
        });
      },
      getDetail() {
        this.$http.get(globalConfig.server + 'repaire/info/' + this.editId).then((res) => {
          if (res.data.code === "600200") {
            let repairDetail = res.data.data;
            if (repairDetail) {
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
              this.follow_name = repairDetail.followor;
              this.form.follow_id = repairDetail.follow_id;
              this.form.final_liable = Number(repairDetail.final_liable);
              this.form.real_money = repairDetail.real_money;
              this.form.estimated_time = repairDetail.estimated_time;
            }
          }
        });
      },
      confirmAdd() {
        this.$http.put(globalConfig.server + 'repaire/update', this.form).then((res) => {
          if (res.data.code === '600200') {
            this.$notify.success({
              title: '成功',
              message: res.data.msg
            });
            this.initial();
            this.$emit('close', 'success');
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
          customer_name: '',  //客户姓名
          city: '',
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
          _emergency: "" // 紧急程度
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
        this.organizeType = 'staff';
        this.organizationDialog = true;
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
