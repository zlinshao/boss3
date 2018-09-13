<template>
  <div id="addCollectRepair">
    <el-dialog :close-on-click-modal="false" title="修改维修单" :visible.sync="addCollectModule" width="50%">
      <div>
        <el-form size="mini" :model="form" label-width="100px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="合同编号">
                <el-input v-model="form.repaire_num" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="房屋地址">
                <el-input v-model="house_name" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所属城市" required="">
                <el-select clearable v-model="form.city" placeholder="选择城市" value="" disabled>
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
              <el-form-item label="回复电话" required>
                <el-input v-model="form.customer_mobile"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="房东电话">
                <el-input v-model="form.landlord_mobile"></el-input>
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
            <el-col :span="8">
              <el-form-item label="初步认责人">
                <el-select v-model="form.person_liable" placeholder="请选择认责人" clearable>
                  <el-option v-for="item in personCategory" :label="item.dictionary_name" :key="item.id"
                             :value="item.id">{{item.dictionary_name}}
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="前租客姓名" v-if="form.person_liable === 692">
                <el-input v-model="form.liable_name" placeholder="请输入姓名"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="紧急程度" required>
                <el-select clearable placeholder="请选择紧急程度" value="" v-model="form.emergency">
                  <el-option v-for="item in emergencies" :label="item.value" :value="item.id"
                             :key="item.id"></el-option>
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
        <el-button size="small" @click="addCollectModule = false">取 消</el-button>
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
    props: ['module', 'detail'],
    components: {Organization},
    data() {
      return {
        addCollectModule: false,
        organizationDialog: false,
        organizeType: '',
        form: {
          id: '',                 //维修单id
          repaire_num: '',        //合同编号
          city: '',               //城市
          customer_name: '',      //客户姓名
          landlord_mobile: "",    //房东电话
          customer_mobile: '',    //客户电话
          emergency: '',          //紧急程度
          follow_id: '',          //下次跟进人id
          person_liable: '',      //认责人
          liable_name: '',        //前租客姓名
          content: '',            //维修内容
          remark: '',             //备注
        },
        house_name: '',         //房屋地址
        follow_name: '',
        personCategory: [],
        cityCategory: [],
        emergencies: [
          {id: 1, value: "一般"},
          {id: 2, value: "紧急"}
        ]
      };
    },
    mounted() {
      this.getDictionary();
    },
    watch: {
      module(val) {
        this.addCollectModule = val;
      },
      addCollectModule(val) {
        if (!val) {
          this.$emit('close');
        }
      },
      detail(val) {
        this.form.id = val.id;                              //维修单id
        this.house_name = val.house_name;
        this.form.repaire_num = val.repaire_num;            //合同编号
        this.form.city = val.city;                          //城市
        this.form.customer_name = val.customer_name;        //客户姓名
        this.form.landlord_mobile = val.landlord_mobile;    //房东电话
        this.form.customer_mobile = val.customer_mobile;    //客户电话
        this.form.emergency = val.emergency;                //紧急程度
        this.form.follow_id = val.follow_id;                //下次跟进人id
        this.form.person_liable = val.person_liable;        //认责人
        this.form.liable_name = val.liable_name;            //前租客姓名
        this.form.content = val.content;                    //维修内容
        this.form.remark = val.remark;                      //备注
        this.follow_name = val.follow_name;
      },
    },
    methods: {
      getDictionary() {
        this.dictionary(604).then((res) => {//认责人
          this.personCategory = res.data;
        });
        this.dictionary(306, 1).then((res) => {//城市
          this.cityCategory = res.data;
        });
      },
      confirmAdd() {
        this.$http.put(globalConfig.server + 'repaire/update/' + this.form.id, this.form).then((res) => {
          if (res.data.code === '600200') {
            this.$notify.success({
              title: '成功',
              message: res.data.msg
            });
            this.initial();
            this.$emit('close', 'success');
            this.addCollectModule = false;
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
          id: '',                 //维修单id
          repaire_num: '',        //合同编号
          house_name: '',         //房屋地址
          city: '',               //城市
          customer_name: '',      //客户姓名
          landlord_mobile: "",    //房东电话
          customer_mobile: '',    //客户电话
          emergency: '',          //紧急程度
          follow_id: '',          //下次跟进人id
          person_liable: '',      //认责人
          liable_name: '',        //前租客姓名
          content: '',            //维修内容
          remark: '',             //备注
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
<style lang="scss" scoped>
  #addCollectRepair {
  }
</style>
