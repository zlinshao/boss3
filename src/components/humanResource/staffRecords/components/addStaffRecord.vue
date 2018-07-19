<template>
  <div id="addStaffRecord">
    <el-dialog :close-on-click-modal="false" :title="title" :visible.sync="addStaffDialogVisible" width="50%">
      <div>
        {{staffRecords}}
        <el-form size="mini" onsubmit="return false;" :model="params" label-width="100px" style="padding: 0 20px;">
          <div v-for="(item,key) in staffRecords">
            <el-row>
              <el-col :span="8">
                <el-form-item label="员工姓名">
                  <el-input readonly v-model="item.name" @focus="openOrganization('staff', key)"
                            placeholder="点击选择">
                    <template slot="append">
                      <div style="cursor: pointer;" @click="emptyOrganization('staff', key)">清空</div>
                    </template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="3" style="margin-left: 20px;">
                <i class="el-icon-circle-plus-outline  add_com" @click=""></i>
                <i class="el-icon-remove-outline  sub_com" @click="" v-if="key!=0"></i>
              </el-col>
            </el-row>
            <div class="scroll_bar">
              <div v-for="(value, index) in item.remarks">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="类型选择">
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
                    <el-form-item label="添加描述">
                      <el-input v-model="value.remark" type="textarea" rows="2"></el-input>
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
              </div>
            </div>
            <div style="text-align: center">
              <el-button type="text" @click="addRemarks(key, index)">
                <i class="el-icon-circle-plus"></i>新增描述
              </el-button>
            </div>
          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="addStaffDialogVisible=false">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmAdd">确 定</el-button>
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
        }
      },

    },
    mounted() {
      this.getDictionaries();
    },
    methods: {
      getImg(val) {
        console.log(val)
      },
      addRemarks(key, index){
        let data={
          type: '',
          remark: '',
          images: [],
        };
        this.staffRecords[key].remarks.push(data);
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
      getDictionaries() {},
      initial() {

      },
      confirmAdd() {
        //新增
        // this.$http.post(globalConfig.server + 'manager/staff', this.params).then((res) => {
        //   if (res.data.code === '10010') {
        //     this.$emit('close', 'success');
        //     this.addStaffDialogVisible = false;
        //     this.$notify.success({
        //       title: '成功',
        //       message: res.data.msg,
        //     });
        //   } else {
        //     this.$notify.warning({
        //       title: '警告',
        //       message: res.data.msg,
        //     });
        //   }
        // });
      },

    }
  };
</script>
<style lang="scss" scoped="">
  #addStaffRecord {
    .scroll_bar {
      padding-right: 10px;
      overflow-x: auto;
      padding: 15px 0;
      border-radius: 6px;
      border: 1px solid #dfe6fb;
      margin-bottom: 12px;
    }
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
