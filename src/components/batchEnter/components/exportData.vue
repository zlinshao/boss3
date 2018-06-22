<template>
  <div>
    <el-dialog :close-on-click-modal="false" title="导出" :visible.sync="exportDialogVisible" width="30%">
      <div class="scroll_bar">
        <el-form size="small" onsubmit="return false" label-width="80px">
          <el-form-item label="账户类型">
            <el-select v-model="params.cate" @change="getData('')" placeholder="请选择账户类型">
              <el-option label="银行卡" value="1"></el-option>
              <el-option label="支付宝" value="2"></el-option>
              <el-option label="微信" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="导入账户" required>
            <el-select
              v-model="account"
              multiple
              filterable
              remote
              reserve-keyword
              placeholder="请输入关键词进行搜索"
              :remote-method="getData"
              :loading="loading">
              <el-option
                v-for="item in tableData"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日期">
            <el-date-picker
              v-model="params.date"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="科目">
                <el-select v-model="subject_id" placeholder="请选择科目" @change="getSubject">
                  <el-option v-for="item in subjectList" :label="item.title" :key="item.id"
                             :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="subjectList2.length>0">
              <el-form-item>
                <el-select v-model="params.subject_id" placeholder="请选择科目" multiple>
                  <el-option v-for="item in subjectList2" :label="item.title" :key="item.id"
                             :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="exportDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" :disabled="account.length<1" @click="confirmAdd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props: ['exportDialog', 'activeName'],
    data() {
      return {
        exportDialogVisible: false,
        tableData: [],
        account: [],
        params: {
          search: '',
          cate: '',
          date: '',
          subject_id: [],
        },
        subject_id: '',
        loading: false,
        subjectList: [],
        subjectList2: [],
      };
    },
    mounted() {
    },
    watch: {
      exportDialog(val) {
        this.exportDialogVisible = val
      },
      exportDialogVisible(val) {
        if (!val) {
          this.$emit('close');
          this.params = {
            search: '',
            cate: '',
            date: '',
            subject_id: [],
          };
          this.subject_id = '';
          this.account = [];
          this.tableData = [];
        } else {
          this.$http.get(globalConfig.server + 'customer/check_out/subject').then((res) => {
            if (res.data.code === '20080') {
              this.subjectList = res.data.data;
            }
          })
        }
      }
    },
    methods: {
      getSubject() {
        this.subjectList2 = [];
        this.$http.get(globalConfig.server + 'customer/check_out/subject?id=' + this.subject_id).then((res) => {
          if (res.data.code === '20080') {
            this.subjectList2 = res.data.data;
          }
        })
      },
      getData(query) {
        this.params.search = query;
        this.loading = true;
        this.$http.get(globalConfig.server + 'financial/account', {params: this.params}).then((res) => {
          this.loading = false;
          if (res.data.code === '20000') {
            this.tableData = res.data.data.data;
          }
        })
      },

      confirmAdd() {
        let header;
        let subject_id = this.params.subject_id;
        if (subject_id && subject_id.length < 1) {
          subject_id = this.subject_id;
        }
        if (this.activeName === 'first') {
          header = this.$http.get(globalConfig.server + 'financial/receivable/transfer', {
            responseType: 'arraybuffer',
            params: {account: this.account, date: this.params.date, subject_id: subject_id}
          });
        } else {
          header = this.$http.get(globalConfig.server + 'financial/payable/transfer', {
            responseType: 'arraybuffer',
            params: {account: this.account, date: this.params.date, subject_id: subject_id}
          });
        }

        header.then((res) => {
          if (!res.data) {
            return;
          }
          this.$exportData(res.data);
          this.exportDialogVisible = false;
        })
      },
    }
  };
</script>
<style lang="scss" scoped="">
  .el-select .el-input {
    width: 130px;
  }

  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
</style>
