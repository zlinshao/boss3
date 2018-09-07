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
              <el-form-item label="房屋地址">
                <el-input v-model="form.address" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所属城市" required="">
                <el-input v-model='cities[form.city]' disabled></el-input>
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
              <el-form-item label="回复电话" required>
                <el-input v-model="form.customer_mobile"></el-input>
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
            <el-col :span="8">
              <el-form-item label="下次跟进人" required>
                <el-input v-model="follow_name" readonly @focus="chooseStaff" placeholder="请选择下次跟进人">
                  <template slot="append">
                    <div style="cursor: pointer;" @click="emptyStaff">清空</div>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="8">
              <el-form-item label="下次跟进时间">
                <el-date-picker type="datetime" v-model="form.estimated_time" placeholder="请选择日期"
                                value-format="yyyy-MM-dd hh:mm:ss" default-time="12:00:00"></el-date-picker>
              </el-form-item>
            </el-col> -->
             <el-col :span="8">
              <el-form-item label="房东电话">
                <el-input v-model="form.landlord_mobile"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">    
              <el-form-item label="初步认责人">
                <el-select v-model="form.person_liable" placeholder="请选择认责归属" clearable @change="setchange">
                  <el-option v-for="item in responsiblePersonCategory" :label="item.dictionary_name" :key="item.id"
                             :value="item.id">{{item.dictionary_name}}
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>   
            <el-col :span="8" v-if="isflag">
              <el-form-item label="前租客姓名" required>
                <el-input v-model="form.liable_name"></el-input>
              </el-form-item>
            </el-col>         
            <el-col :span="8" v-if="form.status===600">
              <el-form-item label="实际维修金额">
                <el-input v-model="form.real_money"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" v-if="form.status===600">
              <el-form-item label="最终认责人">
                <el-select v-model="form.final_liable" clearable>
                  <el-option v-for="item in responsiblePersonCategory" :label="item.dictionary_name" :key="item.id"
                             :value="item.id">{{item.dictionary_name}}
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- <el-row>
               <el-col :span="8">
              <el-form-item label="下次跟进人" required>
                <el-input v-model="form.next_follow_id" readonly disabled>
                </el-input>
              </el-form-item>
            </el-col>          
          </el-row> -->
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
import Organization from "../../common/organization";

export default {
  props: ["addCollectRepairDialog", "contract"],
  components: { Organization },

  data() {
    return {
      addCollectRepairDialogVisible: false,
      organizationDialog: false,
      organizeType: "",
      isflag: false,
      form: {
        city: "", //所属城市ID
        contract_id: "", //合同Id
        contract_number: "", //合同编号
        // contract_type: '', //合同类型
        address: "", //房屋地址
        customer_name: "", //客户姓名
        sex: null, //性别
        customer_mobile: "", //客户电话
        content: "", //维修内容
        repair_time: "", //维修时间
        liable_name : "",// 前租客姓名
        repair_master: "", //维修师傅
        repair_money: "", //维修金额
        remark: "", //备注
        status: "", //维修状态
        person_liable: "", //初步认责人
        contract_type: 1, //收房
        follow_id: "", //跟进人id
        final_liable: "", //最终认责人
        real_money: "", //实际维修金额
        estimated_time: "", //下次跟进时间
        landlord_mobile: "", //房东电话
        next_follow_id: "", //下次跟进人
        emergency: "", // 紧急程度
        _emergency: "", // 紧急程度编号
        city_name: "",//所属城市
      },
      cities:{},
      follow_name: "", //跟进人
      repairStatusCategory: [],
      responsiblePersonCategory: [],
      // sexCategory: [],
      renter: "",
      emergencys: [
        // 紧急程度
        { id: 1, value: "一般" },
        { id: 2, value: "紧急" }
      ]
    };
  },
  created() {},
  mounted() {
     this.getDictionary();
  },
  watch: {
    addCollectRepairDialog(val) {
      this.addCollectRepairDialogVisible = val;
    },
    addCollectRepairDialogVisible(val) {
      if (!val) {
        // 关闭模态框时
        this.$emit("close");
        this.initial(); // 清空文本框
      } else {
        // 打开模态框时
        this.setchange();
      }
    },
    contract(val) {
      this.form.contract_id = val.contract_id;
      this.form.contract_number = val.contract_number;
      this.form.contract_type = val.type;
      this.form.address = val.address;
      this.form.city = val.city;
      this.form.landlord_mobile = val.phone;
      this.form.liable_name = this.form.person_liable;
    },
    _emergency(val) {
      this.slist = this.emergencys[val];
    }
  },
  methods: {
    setchange() {
      //  判断  如果初步责任人  选择的是 前租客  显示 前租客姓名的文本框 否则隐藏
      if (this.form.person_liable === 692) {
        this.isflag = true;
      } else {
        this.isflag = false;
      }
    },
    getDictionary() {
      this.dictionary(595).then(res => {
        //维修状态
        this.repairStatusCategory = res.data;
      });
      this.dictionary(604).then(res => {
        //认责人
        this.responsiblePersonCategory = res.data;
      });
      this.dictionary(306, 1).then(res => {
        //  遍历城市  匹配与合同ID相同的城市名
        for (let i = 0; i < res.data.length; i++) {
          this.cities[res.data[i].variable.city_id] = res.data[i].dictionary_name;
        }
      });
    },
    confirmAdd() {
       this.form.city_name = this.cities[this.form.city];
      if (this.form._emergency === "一般") {
        this.form.emergency = 1;
      }
      if (this.form._emergency === "紧急") {
        this.form.emergency = 2;
      }
      this.$http
        .post(globalConfig.server + "repaire/insert", this.form)
        .then(res => {
          if (res.data.code === "600200") {
            this.$notify.success({
              title: "成功",
              message: res.data.msg
            });
            this.$emit("close", "repair");
            this.addCollectRepairDialogVisible = false;
          } else {
            this.$notify.warning({
              title: "警告",
              message: res.data.msg
            });
          }
        });
    },
    initial() {
      this.isflag = false;
      this.form = {
        contract_type: 1, //收房
        contract_id: this.contract.contract_id, //合同Id
        contract_number: this.contract.contract_number, //合同编号
        contract_type: this.contract.type, //合同类型
        address: this.form.address, //房屋地址
        city: "",
        landlord_mobile: "", //房东电话
        customer_name: "", //客户姓名
        sex: null, //性别
        customer_mobile: "", //客户电话
        content: "", //维修内容
        repair_time: "", //维修时间
        repair_master: "", //维修师傅
        repair_money: "", //维修金额
        remark: "", //备注
        status: "", //维修状态
        person_liable: "", //认责人
        follow_id: "", //跟进人id
        final_liable: "", //最终认责人
        real_money: "", //实际维修金额
        estimated_time: "",
        landlord_mobile: "", //房东电话
        _emergency: "" // 紧急程度
      };
      this.follow_name = "";
    },
    closeOrganization() {
      this.organizeType = "";
      this.organizationDialog = false;
    },
    selectMember(val) {
      this.follow_name = val[0].name;
      this.form.follow_id = val[0].id;
      this.form.next_follow_id = val[0].name;
    },
    chooseStaff() {
      this.organizationDialog = true;
      this.organizeType = "staff";
    },
    emptyStaff() {
      this.follow_name = "";
      this.form.follow_id = "";
    }
  }
};
</script>
<style lang="scss" scoped="">
#addCollectRepair {
}
</style>
