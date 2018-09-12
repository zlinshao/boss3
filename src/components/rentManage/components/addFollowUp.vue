<template>
  <div id="addFollowUp">
    <el-dialog :close-on-click-modal="false" title="添加工单" :visible.sync="addFollowUpDialogVisible" width="45%">
      <div>
        <el-form size="small" :model="params" label-width="100px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="所属城市" required="">
                <el-input v-model='city_name' disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="房屋地址">
                <el-input v-model="house_name" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="回复电话" required="">
                <el-input v-model="params.mobile"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="下次跟进人" required="">
                <el-input v-model="follow_name" @focus="openOrganizeModal"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <!--<el-col :span="12">-->
              <!--<el-form-item label="跟进状态">-->
                <!--<el-select clearable v-model="params.follow_status" placeholder="工单进度" value="">-->
                  <!--<el-option v-for="item in dictionary_follow" :label="item.dictionary_name" :value="item.id"-->
                             <!--:key="item.id"></el-option>-->
                <!--</el-select>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
            <el-col :span="12">
              <el-form-item label="紧急程度" required="">
                <el-select clearable v-model="params.emergency" placeholder="请选择" value="">
                  <el-option v-for="item in optionsWithDisabled" :label="item.label" :value="item.id"
                             :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="跟进时间">
                <el-date-picker type="date" placeholder="选择日期时间"
                                value-format="yyyy-MM-dd" v-model="params.follow_time"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="工单类型" required="">
                <el-select clearable v-model="params.type" placeholder="请选择" value="">
                  <el-option v-for="item in dictionaries" :label="item.dictionary_name" :value="item.id"
                             :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <!--<el-col :span="12">-->
            <!--<el-form-item label="下次跟进时间">-->
            <!--<el-date-picker type="datetime" placeholder="选择日期时间"-->
            <!--value-format="yyyy-MM-dd HH:mm:ss"-->
            <!--v-model="params.expected_finish_time"></el-date-picker>-->
            <!--</el-form-item>-->
            <!--</el-col>-->
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="工单内容" required="">
                <el-input type="textarea" v-model="params.matters"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="上传照片">
                <UPLOAD :ID="'first'" :isClear="isClear" @getImg="getImgData"></UPLOAD>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="addFollowUpDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmAdd">确 定</el-button>
      </span>
    </el-dialog>
    <Organization :organizationDialog="organizationDialog" :length="length" :type="type"
                  @close='closeModal' @selectMember="selectMember"></Organization>

  </div>
</template>

<script>
  import Organization from '../../common/organization.vue'
  import UPLOAD from '../../common/UPLOAD.vue'

  export default {
    name: 'addFollowUp',
    props: ['addFollowUpDialog', 'houseData', 'contractModule'],
    components: {Organization, UPLOAD},
    data() {
      return {
        addFollowUpDialogVisible: false,
        optionsWithDisabled: [
          {id: 1, label: "一般"},
          {id: 2, label: "紧急"}
        ],
        params: {
          city: '',                        //城市ID
          contract_id: '',                 //'合同id',
          module: '',                      //'关联模型', 1-收房  2-租房
          matters: '',                     // 跟进事项
          type: '',                        //'工单类型',
          follow_id: '',                   //'跟进人',
          // follow_status: '',
          // expected_finish_time: '',        //'下次跟进时间',
          follow_time: '',                 //'跟进时间',
          image_pic: [],
          mobile: '',
          emergency: '',                   //紧急程度
        },
        organizationDialog: false,
        isClear: false,
        dictionaries: [],
        dictionary_follow: [],
        follow_name: '',
        length: 0,
        type: '',
        upStatus: false,
        city_name: '',
        house_name: '',
      };
    },
    watch: {
      addFollowUpDialog(val) {
        this.addFollowUpDialogVisible = val;
      },
      addFollowUpDialogVisible(val) {
        if (!val) {
          this.$emit('close');
          this.init();
        } else {
          this.isClear = false;
        }
      },
      houseData(val) {
        this.params.contract_id = val.contract_id;
        this.params.city = val.city_id;
        this.city_name = val.city_name;
        this.house_name = val.house_name;
      },
      contractModule(val) {
        this.params.module = val;
      }
    },
    mounted() {
      this.getDictionary();
    },
    methods: {
      getDictionary() {
        // 工单类型
        this.dictionary(696, 1).then((res) => {
          this.dictionaries = res.data;
        });
        // 工单状态
        this.dictionary(335, 1).then((res) => {
          this.dictionary_follow = res.data;
        });
      },
      //调出选人组件
      openOrganizeModal() {
        this.organizationDialog = true;
        this.type = 'staff';
        this.length = 1;
      },
      selectMember(val) {
        this.organizationDialog = false;
        this.type = '';
        this.length = '';
        this.params.follow_id = val[0].id;
        this.follow_name = val[0].name;
      },
      closeModal() {
        this.organizationDialog = false
      },
      getImgData(val) {
        this.params.image_pic = val[1];
        this.upStatus = val[2];
      },
      //确认提交
      confirmAdd() {
        if (this.upStatus) {
          this.$notify.warning({
            title: '警告',
            message: '图片正在上传'
          })
        } else {
          this.$http.post(globalConfig.server + 'customer/work_order', this.params).then((res) => {
            if (res.data.code === '10010') {
              this.$notify.success({
                title: '成功',
                message: res.data.msg
              });
              this.$emit('close', 'workOrder');
              this.addFollowUpDialogVisible = false;
            } else {
              this.$notify.warning({
                title: '警告',
                message: res.data.msg
              })
            }
          })
        }
      },
      init() {
        this.params = {
          contract_id: this.houseData.contract_id,
          module: this.contractModule,
          city: '',
          matters: '',                     // 跟进事项,
          type: '',                        //'工单类型',
          follow_id: '',                   //'跟进人',
          // follow_status: '',
          // expected_finish_time: '',        //'下次跟进时间',
          follow_time: '',                 //'跟进时间',
          image_pic: [],
          mobile: '',
          emergency: '',                   //'紧急程度',
        };
        this.follow_name = '';
        this.isClear = true;
        this.upStatus = false;
      }
    }
  };
</script>
<style lang="scss" scoped="">
  #addFollowUp {

  }

</style>
