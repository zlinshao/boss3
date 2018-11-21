<template>
  <div id="addCollectRepair">
    <el-dialog :close-on-click-modal="false" title="添加维修" :visible.sync="addCollectRepairDialog" width="50%">
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
                <el-input v-model="address" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所属城市" required="">
                <el-input v-if="city_name" v-model='city_name' disabled></el-input>
                <el-select v-else clearable v-model="form.city" placeholder="请选择" value="">
                  <el-option v-for="item in cities" :label="item.dictionary_name" :value="item.id"
                             :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="房东电话">
                <el-input v-model="form.landlord_mobile"></el-input>
              </el-form-item>
            </el-col>
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
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="紧急程度" required="">
                <el-select clearable placeholder="请选择紧急程度" value="" v-model="form.emergency">
                  <el-option v-for="item in emergencies" :value="item.id" :label="item.value" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="初步认责人">
                <el-select v-model="form.person_liable" placeholder="请选择认责归属" clearable>
                  <el-option v-for="item in personCategory" :label="item.dictionary_name" :key="item.id"
                             :value="item.id"></el-option>
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
            <el-col :span="8" v-if="form.person_liable === 692">
              <el-form-item label="前租客姓名">
                <el-input v-model="form.liable_name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" v-if="form.status === 600">
              <el-form-item label="实际维修金额">
                <el-input v-model="form.real_money"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" v-if="form.status === 600">
              <el-form-item label="最终认责人">
                <el-select v-model="form.final_liable" placeholder="请选择认责归属" clearable>
                  <el-option v-for="item in personCategory" :label="item.dictionary_name" :key="item.id"
                             :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="维修内容">
                <el-input type="textarea" v-model="form.content"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="上传照片">
                <UpLoad :ID="'add_collect'" @getImg="myGetImg" :isClear="isClear" :editImage="photos"></UpLoad>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="备注">
                <el-input type="textarea" v-model="form.remark"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="addCollectRepairDialog = false">取 消</el-button>
        <el-button size="small" :disabled="forbidden" type="primary" @click="confirmAdd">确 定</el-button>
      </span>
    </el-dialog>

    <Organization :organizationDialog="organizationDialog" :type="organizeType" @close="closeOrganization"
                  @selectMember="selectMember"></Organization>
  </div>
</template>

<script>
  import Organization from "../../common/organization";
  import UpLoad from '../../common/UPLOAD.vue';

  export default {
    props: ["module", "contract"],
    components: {Organization, UpLoad},
    data() {
      return {
        addCollectRepairDialog: false,
        organizationDialog: false,
        forbidden: false,
        organizeType: "",
        length: "",
        address: '',
        city_name: '',
        form: {
          city: "",
          contract_id: "",          //合同Id
          contract_type: "1",       //合同类型
          contract_number: "",      //合同编号
          customer_name: "",        //客户姓名
          customer_mobile: "",      //客户电话
          landlord_mobile: "",      //房东电话
          content: "",              //维修内容
          remark: "",               //备注
          person_liable: "",        //初步认责人
          follow_id: "",            //下次跟进人id
          final_liable: "",         //最终认责人
          emergency: "",            //紧急程度
          liable_name: "",          //前租客姓名
          module: 1,                //租房
          photo: [],                //房屋影像
        },
        follow_name: "",                //跟进人名字
        personCategory: [],
        emergencies: [                  // 紧急程度
          {id: 1, value: "一般"},
          {id: 2, value: "紧急"}
        ],
        cities: [],
        isClear :false,                 //删除照片
        photos: [],                     //房屋影像
      };
    },
    mounted() {
      this.getDictionary();
    },
    watch: {
      module(val) {
        this.addCollectRepairDialog = val;
      },
      addCollectRepairDialog(val) {
        if (!val) {
          //模态框关闭时
          this.$emit("close");
          this.initial();
        }
      },
      contract(val) {
        this.form.city = val.city_id;
        this.city_name = val.city_name;
        this.address = val.address;
        this.form.contract_id = val.contract_id;
        this.form.contract_number = val.contract_number;
        this.form.landlord_mobile = val.phone;
        this.cities = val.cities;
      },
    },
    methods: {
      getDictionary() {
        //认责人
        this.dictionary(604).then(res => {
          this.personCategory = res.data;
        });
      },
      confirmAdd() {
        this.forbidden = true;
        console.log(this.form)
        this.$http.post(globalConfig.server + "repaire/insert", this.form).then(res => {
          this.forbidden = false;
          if (res.data.code === "600200") {
            this.$notify.success({
              title: "成功",
              message: res.data.msg
            });
            this.$emit("close", "repair");
            this.addRentRepairDialogVisible = false;
          } else {
            this.$notify.warning({
              title: "警告",
              message: res.data.msg
            });
          }
        });
      },
      initial() {
        this.form = {
          city: "",
          contract_id: "",          //合同Id
          contract_type: "1",       //合同类型
          contract_number: "",      //合同编号
          customer_name: "",        //客户姓名
          customer_mobile: "",      //客户电话
          content: "",              //维修内容
          remark: "",               //备注
          person_liable: "",        //初步认责人
          follow_id: "",            //下次跟进人id
          final_liable: "",         //最终认责人
          emergency: "",            //紧急程度
          liable_name: "",          //前租客姓名
          module: 1,                //收房
          photo:[],
        };
        this.address = "";
        this.follow_name = "";
        this.photos = [];
        this.isClear = true
      },
      closeOrganization() {
        this.organizationDialog = false;
        this.organizeType = "";
        this.length = "";
      },
      selectMember(val) {
        this.follow_name = val[0].name;
        this.form.follow_id = val[0].id;
      },
      chooseStaff() {
        this.length = 1;
        this.organizeType = "staff";
        this.organizationDialog = true;
      },
      emptyStaff() {
        this.follow_name = "";
        this.form.follow_id = "";
      },
      // 截图
      myGetImg(val) {
        this.picStatus = val[2];
        this.form.album = val[1];
      },
    }
  };
</script>
<style lang="scss" scoped>
  #addRentRepair {
  }
</style>
