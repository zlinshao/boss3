<template>
  <div id="addStaffRecord">
    <el-dialog :close-on-click-modal="false" :title="title" :visible.sync="addStaffDialogVisible" width="50%">
      <div>
        <el-form size="mini" onsubmit="return false;" :model="params" label-width="100px" class="scroll_bar"
                 style="padding: 0 20px;">
          <div v-for="(item,key) in staffRecords" class="describe_border">
            <el-row>
              <el-col :span="8">
                <el-form-item label="员工姓名" required>
                  <el-input readonly v-model="item.name" @focus="openOrganization('staff', key)"
                            placeholder="点击选择">
                    <template slot="append">
                      <div style="cursor: pointer;" @click="emptyOrganization('staff', key)">清空</div>
                    </template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="3" style="margin-left: 20px;">
                <i class="el-icon-circle-plus-outline  add_com" @click="addRecords"></i>
                <i class="el-icon-remove-outline  sub_com" @click="subRecords(key)" v-if="key!=0"></i>
              </el-col>
            </el-row>
            <div v-for="(value, index) in item.remarks">
              <div class="describe_border">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="类型选择" required>
                      <el-select v-model="value.type" placeholder="请选择" clearable>
                        <el-option v-for="val in typeCategory" :key="val.id" :value="val.id" :label="val.name">
                          {{val.name}}
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="16">
                    <el-form-item label="添加描述" required>
                      <el-input v-model="value.remark" type="textarea" rows="2" placeholder="请填写描述"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="添加照片">
                      <UPLOAD :ID="`${key}_${index}_staff_records`" :isClear="isClear" @getImg="getImg"></UPLOAD>
                    </el-form-item>
                  </el-col>
                </el-row>
                <div style="text-align: center">
                  <el-button type="text" @click="subRemarks(key, index)" v-if="index!=0">
                    <i class="el-icon-remove"></i>删除此条描述
                  </el-button>
                </div>
              </div>
            </div>
            <div style="text-align: center">
              <el-button type="text" @click="addRemarks(key)">
                <i class="el-icon-circle-plus"></i>新增描述
              </el-button>
            </div>
          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="addStaffDialogVisible=false">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmAdd" :disabled="disabledBtn">确 定</el-button>
      </span>
    </el-dialog>
    <Organization :organizationDialog="organizationDialog" :type="organizeType" @close="closeOrganization"
                  @selectMember="selectMember"></Organization>
  </div>
</template>

<script>
  import Organization from '../../../common/organization.vue';
  import UPLOAD from '../../../common/UPLOAD.vue';

  export default {
    props: ['addStaffDialog'],
    components: {Organization, UPLOAD},
    data() {
      return {
        addStaffDialogVisible: false,
        params: {},
        title: '新建记录',
        organizationDialog: false,
        organizeType: '',
        currentKey: '',
        staffRecords: [
          {
            uid: '',
            name: '',
            remarks: [
              {
                type: '',
                remark: '',
                images: [],
              }
            ],
          }
        ],
        typeCategory: [
          {id: 1, name: '表扬'},
          {id: 2, name: '批评'},
          {id: 3, name: '疑惑'},
          {id: 4, name: '其他'},
        ],
        isClear: false,
        disabledBtn: false,
      };
    },
    watch: {
      addStaffDialog(val) {
        this.addStaffDialogVisible = val;
      },
      addStaffDialogVisible(val) {
        if (!val) {
          this.initial(); //关闭弹框时清除
          this.$emit('close');
          this.isClear = true;
        } else {
          this.isClear = false;
          this.disabledBtn = false;
        }
      },

    },
    methods: {
      getImg(val) {
        console.log(val)
        let ID = val[0] && val[0].split('_');  // '0_0_staff_records'
        let key = ID[0];
        let index = ID[1];
        this.staffRecords[key].remarks[index].images = val[1];
      },
      addRecords() {
        let data = {
          uid: '',
          name: '',
          remarks: [
            {
              type: '',
              remark: '',
              images: [],
            }
          ],
        };
        this.staffRecords.push(data);
      },
      subRecords(key) {
        this.staffRecords.splice(key, 1);
      },
      addRemarks(key) {
        let data = {
          type: '',
          remark: '',
          images: [],
        };
        this.staffRecords[key].remarks.push(data);
      },
      subRemarks(key, index) {
        this.staffRecords[key].remarks.splice(index, 1);
      },

      emptyOrganization(type, key) {
        if (type === 'staff') {
          this.staffRecords[key].uid = '';
          this.staffRecords[key].name = '';
        }
      },
      openOrganization(type, key) {
        //type: depart/staff ,position: search/dialog
        this.organizationDialog = true;
        this.organizeType = type;
        this.currentKey = key;

      },
      //关闭选人框回调
      closeOrganization() {
        this.organizationDialog = false;
        this.organizeType = null;
        this.currentKey = '';
      },
      selectMember(val) {
        if (this.organizeType === 'staff') {
          this.staffRecords[this.currentKey].uid = val[0].id;
          this.staffRecords[this.currentKey].name = val[0].name;
        }
        this.organizationDialog = false;
      },
      initial() {
        this.staffRecords = [
          {
            uid: '',
            name: '',
            remarks: [
              {
                type: '',
                remark: '',
                images: [],
              }
            ],
          }
        ];
      },
      confirmAdd() {
        this.disabledBtn = true;
        //新增
        this.$http.post(globalConfig.server + 'credit/manage/addemployee', this.staffRecords).then((res) => {
          if (res.data.code === '10000') {
            this.$emit('close', 'success');
            this.addStaffDialogVisible = false;
            this.$notify.success({
              title: '成功',
              message: res.data.msg,
            });
          } else {
            this.disabledBtn = false;
            this.$notify.warning({
              title: '警告',
              message: res.data.msg,
            });
          }
        });
      },

    }
  };
</script>
<style lang="scss" scoped="">
  #addStaffRecord {
    .add_com {
      color: #409eff;
      font-size: 18px;
      vertical-align: middle;
      cursor: pointer;
    }
    .sub_com {
      color: #409eff;
      font-size: 18px;
      vertical-align: middle;
      margin-left: 10px;
      cursor: pointer;
    }
  }

</style>
