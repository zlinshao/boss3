<template>
  <div id="addFollowUp">
    <el-dialog :close-on-click-modal="false" title="修改工单" :visible.sync="editWorkModule" width="45%">
      <div>
        <el-form size="small" :model="params" label-width="100px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="房屋地址">
                  <el-input v-model="editWord.address" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="工单类型" required="">
                <el-select clearable v-model="params.type" placeholder="缴费方式" value="">
                  <el-option v-for="item in workStatus" :label="item.dictionary_name" :value="item.id"
                             :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="所属城市" required="">
                <el-select clearable v-model="params.city" placeholder="选择城市" value="">
                  <el-option v-for="item in cityCategory" :label="item.dictionary_name" :value="item.id"
                             :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="下次跟进人" placeholder="请选择下次跟进人" required="">
                <el-input v-model="follow_name" @focus="openOrganizeModal"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="跟进状态">
                <el-select clearable v-model="params.follow_status" placeholder="工单进度" value="">
                  <el-option v-for="item in workFollow" :label="item.dictionary_name" :value="item.id"
                             :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="回复电话">
                <el-input v-model="params.mobile" placeholder="请输入联系方式"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="紧急程度">
                <el-select clearable v-model="params.emergency" placeholder="紧急程度" value="">
                  <el-option v-for="item in emergency" :label="item.name" :value="item.id"
                             :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="跟进时间">
                <el-date-picker type="datetime" placeholder="选择日期时间"
                                value-format="yyyy-MM-dd HH:mm:ss" v-model="params.follow_time"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="工单内容" required="">
                <el-input type="textarea" v-model="params.matters"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="上传照片">
                <UPLOAD :ID="'workerOrder'" :isClear="isClear" :editImage="editImage" @getImg="getImgData"></UPLOAD>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="editWorkModule = false">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmAdd">确 定</el-button>
      </span>
    </el-dialog>

    <Organization :organizationDialog="organizationDialog" :length="length" :type="type"
                  @close='closeModal' @selectMember="selectMember"></Organization>
  </div>
</template>

<script>
  import Organization from '../../../../common/organization.vue'
  import UPLOAD from '../../../../common/UPLOAD.vue'

  export default {
    name: 'addFollowUp',
    props: ['editWorkDialog', 'editWord'],
    components: {Organization, UPLOAD},
    data() {
      return {
        params: {
          city: '',
          matters: '',                      //跟进事项
          type: '',                         //事件类型
          follow_id: '',                    //跟进人
          follow_time: '',                  //跟进时间
          follow_status: '',                //跟进状态
          image_pic: [],
          mobile: '',
          emergency: '',
        },
        emergency:[{
          id: 1,
          name: '一般',
        },{
          id: 2,
          name: '紧急',
        }],
        editWorkModule: false,
        organizationDialog: false,
        isClear: false,
        workStatus: [],
        workFollow: [],
        follow_name: '',
        length: 0,
        type: '',
        detailInfo: {},
        editImage: {},
        upStatus: false,
        cityCategory: [],
      };
    },
    watch: {
      editWorkDialog(val) {
        this.editWorkModule = val;
      },
      editWorkModule(val) {
        if (!val) {
          this.$emit('close');
        } else {
          this.isClear = false;
          this.getDictionary();
        }
      },
      editWord(detail) {
        if (detail) {
          this.follow_name = detail.follows && detail.follows.name;
          this.params.city = detail.city;
          this.params.type = detail.type;
          this.params.emergency = detail.emergency;
          this.params.matters = detail.matters;
          this.params.follow_id = detail.follow_id;
          this.params.follow_status = detail.follow_status;
          this.params.follow_time = detail.follow_time;
          this.params.mobile = detail.mobile;
          //照片修改
          let picObject = {};
          this.editImage = {};
          this.params.image_pic = [];
          if (detail.album) {
            for (let key in detail.album.image_pic) {
              picObject[key] = detail.album.image_pic[key][0].uri;
              this.params.image_pic.push(key)
            }
          }
          this.editImage = picObject;
        }
      }
    },
    mounted() {
      this.getDictionary();
    },
    methods: {
      getDictionary() {
        // 工单类型
        this.dictionary(696, 1).then((res) => {
          this.workStatus = res.data;
        });
        // 跟进状态
        this.dictionary(335, 1).then((res) => {
          this.workFollow = res.data;
        });
        // 城市
        this.dictionary(306, 1).then((res) => {
          this.cityCategory = res.data;
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
          this.prompt(1, '图片正在上传');
        } else {
          this.$http.put(globalConfig.server + 'customer/work_order/' + this.editWord.id, this.params).then((res) => {
            if (res.data.code === '10030') {
              this.prompt(1, res.data.msg);
              this.init();
              this.$emit('close', 'success');
              this.editWorkModule = false;
            } else {
              this.prompt(2, res.data.msg);
            }
          })
        }
      },
      prompt(val, msg) {
        if (val === 1) {
          this.$notify.success({
            title: '成功',
            message: msg
          });
        } else {
          this.$notify.warning({
            title: '警告',
            message: msg
          })
        }
      },
      init() {
        this.params = {
          matters: '',                      //跟进事项
          type: '',                         //事件类型
          follow_id: '',                    //跟进人
          expected_finish_time: '',         //预计完成时间
          follow_time: '',                  //跟进时间
          follow_status: '',                //跟进时间
          image_pic: [],
          mobile: '',
        };
        this.follow_name = '';
        this.isClear = true;
        this.detailInfo = {};
        this.editImage = {};
        this.upStatus = false;
      }
    }
  };
</script>

<style lang="scss" scoped="">
  #addFollowUp {

  }
</style>
