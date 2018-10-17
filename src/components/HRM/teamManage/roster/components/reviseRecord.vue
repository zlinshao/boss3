<template>
  <div id="reviseRecord">
    <el-dialog :close-on-click-modal="false" title="修改记录" :visible.sync="dialogVisible" width="45%">
      <div
        style="width: 90%;"
        v-loading="fullLoading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255, 255, 255, 0)">
      </div>
      <el-form :inline="true" size="mini" label-width="100px" v-if="!fullLoading">
        <div class="addForm">
          <div class='formList'>
            <el-form-item label="姓名">
              <el-input placeholder="姓名" v-model="form.name" disabled></el-input>
            </el-form-item>
          </div>
          <div class='formList'>
            <el-form-item label="部门">
              <el-input placeholder="部门" v-model="form.department" disabled></el-input>
            </el-form-item>
          </div>
          <!--<div class='formList'>-->
            <!--<el-form-item label="直属领导" required>-->
              <!--<el-input placeholder="直属领导" v-model="form.name" disabled></el-input>-->
            <!--</el-form-item>-->
          <!--</div>-->
          <div class='formList'>
            <el-form-item label="总表扬数">
              <el-input placeholder="总表扬数" v-model="form.praises" disabled></el-input>
            </el-form-item>
          </div>
          <div class='formList'>
            <el-form-item label="总批评数">
              <el-input placeholder="总批评数" v-model="form.criticisms" disabled></el-input>
            </el-form-item>
          </div>
        </div>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取&nbsp;消</el-button>
        <el-button size="small" type="primary" @click="reviseRecord">修&nbsp;改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "revise-record",
    props: ['module', 'data'],
    data() {
      return {
        fullLoading: true,
        dialogVisible: false,
        form: {
          name: '',
          department: '',
          criticisms: 0,//总批评数
          praises: 1,//总表扬数
        },
      }
    },
    mounted() {
    },
    activated() {
    },
    watch: {
      data(val) {
        this.form.department = val.department;
        this.form.praises = val.name;
        this.form.others = val.name;
        this.fullLoading = false;
      },
      module(val) {
        this.dialogVisible = val;
      },
      dialogVisible(val) {
        if (!val) {
          this.$emit('close');
          this.fullLoading = true;
        }
      }
    },
    computed: {},
    methods: {
      // 搜索
      search() {
        this.isHigh = false;
        this.staffList(1);
      },
      // 高级
      highGrade() {
        this.isHigh = !this.isHigh;
      },
      // 重置
      resetting() {
        this.params = JSON.parse(JSON.stringify(rosterParams));
      },
      reviseRecord() {

      },
    },
  }
</script>

<style lang="scss">
  #reviseRecord {
    .addForm, .addRecord {
      max-height: 480px;
      .width66 {
        width: 66%;
      }
    }
    .addForm, .supplementary {
      display: flex;
      display: -webkit-flex;
      flex-wrap: wrap;
      align-items: center;
      .formList {
        width: 33%;
      }
      .list2 {
        width: 66%;
      }
      .list3 {
        width: 99%;
      }
    }
    .el-form-item__content {
      label {
        display: flex;
        display: -webkit-flex;
        align-items: center;
      }
    }
    .addForm {
      label {
        min-width: 100px;
      }
    }
    .supplementary {
      label {
        min-width: 140px;
      }
    }
    .el-form-item, .el-form-item__content {
      width: 100%;
      display: flex;
      display: -webkit-flex;
      .el-radio {
        min-width: 40px;
      }
    }
    .addMoreRecord {
      display: flex;
      display: -webkit-flex;
      .addBtnRecord {
        height: 28px;
      }
    }
    .moreRecord + .moreRecord {
      margin-top: 18px;
    }
    .moreRecord {
      border: 1px solid #c5cce1;
      padding: 0 20px 20px;
      -webkit-border-radius: 6px;
      -moz-border-radius: 6px;
      border-radius: 6px;
      .closeIcon {
        text-align: right;
        padding: 10px 0;
        i {
          cursor: pointer;
          font-size: 18px;
        }
      }
    }
    .multiterm {
      border-color: #dfe6fb;
    }
  }
</style>
