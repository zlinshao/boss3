<template>
  <div id="addRentRepair">
    <el-dialog :close-on-click-modal="false" :title="title" :visible.sync="addStaffDialogVisible" width="60%">
      <div>
        {{staffRecords}}
        <el-form size="mini" onsubmit="return false;" :model="params" label-width="120px" style="padding: 0 20px;">
          <div v-for="(item,key) in staffRecords">
            <el-form-item label="员工姓名">
              <el-input readonly v-model="item.name" @focus="openOrganization('search', 'staff')"
                        placeholder="点击选择">
                <template slot="append">
                  <div style="cursor: pointer;" @click="emptyOrganization('search', 'staff')">清空</div>
                </template>
              </el-input>
            </el-form-item>
            <div v-for="(value, index) in item.remark">
              <el-form-item label="类型选择">
                <el-select v-model="value.type" placeholder="请选择" clearable>
                  <el-option v-for="val in typeCategory" :key="val.id" :value="val.id" :label="val.name">{{val.name}}</el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="添加描述">

              </el-form-item>
              <el-form-item label="添加照片">

              </el-form-item>
            </div>

          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="addStaffDialogVisible=false">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmAdd">确 定</el-button>
      </span>
    </el-dialog>

    <Organization :organizationDialog="organizationDialog" :type="organizaType" @close="closeOrganization"
                  @selectMember="selectMember"></Organization>
  </div>
</template>

<script>
  import Organization from '../../../common/organization.vue';

  export default {
    props: ['addStaffDialog'],
    components: {Organization},
    data() {
      return {
        addStaffDialogVisible: false,
        params: {

        },

        title: '新建记录',
        organizationDialog: false,
        organizaType: '',
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
          {
            id: 1,
            name: '表扬'
          }
        ],
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
      getDictionaries() {

      },
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

      //关闭选人框回调
      closeOrganization() {
        this.organizationDialog = false;
        this.organizaType = null;
      },
      selectMember(val) {
        if (this.organizaType === 'depart') {

        } else if (this.organizaType === 'staff') {

        }
        this.organizationDialog = false;
      },
    }
  };
</script>
<style lang="scss" scoped="">
  #addRentRepair {

  }

</style>
