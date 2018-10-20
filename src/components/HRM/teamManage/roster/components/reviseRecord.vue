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
              <div class="showTitles">{{form.name}}</div>
            </el-form-item>
          </div>
          <div class='formList'>
            <el-form-item label="部门">
              <div class="showTitles">{{form.department}}</div>
            </el-form-item>
          </div>
          <div class='formList'>
            <el-form-item label="总表扬数">
              <div class="showTitles">{{form.praises}}</div>
            </el-form-item>
          </div>
          <div class='formList'>
            <el-form-item label="总批评数">
              <div class="showTitles">{{form.criticisms}}</div>
            </el-form-item>
          </div>
        </div>
      </el-form>
      <div>
        <div v-for="item in form.data">
          <el-row>
            <el-col :span="3">
              <div style="text-align: center;">
                <span style="display: inline-block;width: 80%;margin-top: 8px;">{{item.add_time}}</span>
                <br/>
                <span>{{item.add_user}}</span>
              </div>
            </el-col>
            <el-col :span="18">
              <div class="circle"
                   :class="{'praises': item.type === 1, 'criticisms':item.type === 2, 'doubts':item.type === 3, 'others':item.type === 4}"></div>
              <div class="conImages">
                <div>{{item.remark}}</div>
                <div style="margin-top: 10px;" v-if="item.images && item.images.length > 0">
                  <img v-for="img in item.images" :src="img.url" :key="img.id" data-magnify="" :data-src="img.url">
                </div>
              </div>
            </el-col>
            <el-col class="operate" :span="3">
              <!--<span class="operate1" @click="editRecord(item)">-->
              <!--<i class="el-icon-edit"></i>编辑-->
              <!--</span>-->
              <span class="operate2" @click="removeRecord(item.detail_id)">
                <i class="el-icon-close"></i>删除
              </span>
            </el-col>
          </el-row>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <!--<el-button size="small" @click="dialogVisible = false">取&nbsp;消</el-button>-->
        <!--<el-button size="small" type="primary" @click="reviseRecord">修&nbsp;改</el-button>-->
        <el-button size="small" type="primary" @click="dialogVisible = false">关&nbsp;闭</el-button>
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
        url: globalConfig.server,
        fullLoading: true,
        dialogVisible: false,
        form: {},
      }
    },
    mounted() {
    },
    activated() {
    },
    watch: {
      data(val) {
        this.fullLoading = true;
        this.recordDetail(val);
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
      recordDetail(val) {
        this.$http.get(this.url + 'hrm/staffRecords/employeedetail?user_id=' + val).then(res => {
          if (res.data.success) {
            this.form = res.data.data;
            this.fullLoading = false;
          } else {
            this.$http.get(this.url + 'hrm/User/userInfo?user_id=' + val).then(res => {
              if (res.data.success) {
                let data = res.data.data;
                this.form.name = data.real_name;
                this.form.praises = 0;
                this.form.criticisms = 0;
                this.form.data = [];
                let organ = JSON.parse(data.organizationInfo);
                let org_name = [];
                organ.forEach(item => {
                  org_name.push(item.name);
                });
                this.departName(org_name, 'department');
                this.fullLoading = false;
              } else {
                this.prompt('warning', res.data.msg);
              }
            });
          }
        });
      },
      // 拼接
      departName(arr, organ) {
        this.form[organ] = this.montage(arr);
      },
      editRecord(row) {

      },
      removeRecord(row) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.get(globalConfig.server + 'hrm/staffRecords/delete', {
            params: {detail_id: row}
          }).then((res) => {
            if (res.data.success) {
              this.prompt('success', res.data.msg);
              this.recordDetail(this.data);
            } else {
              this.prompt('warning', res.data.msg);
            }
          });
        }).catch(() => {
        });
      },
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
    .circle {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      display: inline-block;
      float: left;
      margin-left: -9px;
      margin-top: 10px;
    }
    .praises {
      background: #58d788;
    }
    .criticisms {
      background: #ff4545;
    }
    .doubts {
      background: #FF9900;
    }
    .others {
      background: #409EFF;
    }
    .conImages {
      border-left: 1px solid #c0c4cc;
      padding-left: 20px;
      padding-top: 8px;
      min-height: 50px;
    }
    .operate {
      text-align: right;
      cursor: pointer;
      padding-top: 8px;
      .operate1 {
        color: #409eff;
      }
      .operate2 {
        color: #409eff;
        margin-left: 6px;
      }
    }
    img {
      width: 80px;
      height: 80px;
      border-radius: 6px;
      margin: 0 10px 10px 0;
    }
    .addForm {
      display: flex;
      display: -webkit-flex;
      flex-wrap: wrap;
      align-items: center;
      max-height: 480px;
      .width66 {
        width: 66%;
      }
      .formList {
        width: 33%;
      }
      .list2 {
        width: 66%;
      }
      .list3 {
        width: 99%;
      }
      label {
        min-width: 100px;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        justify-content: flex-end;
      }
      .showTitles {
        width: 100%;
        background-color: #F5F7FA;
        padding: 3px 12px;
        border-radius: 6px;
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
  }
</style>
