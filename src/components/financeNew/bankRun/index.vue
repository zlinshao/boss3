<template>
    <div id="bankRun">
      <div class="header">
        <el-button type="primary" size="mini" @click="handleImportRun">导入</el-button>
      </div>
      <div class="main">
        <el-table
          :data="bank_batch"
        >
          <el-table-column label="导入时间" prop="create_time"></el-table-column>
          <el-table-column label="流水导入批次" prop="id"></el-table-column>
          <el-table-column label="包含账户数量" prop="account_num"></el-table-column>
          <el-table-column label="流水数量" prop="bank_flow_num"></el-table-column>
          <el-table-column label="操作人" prop="operator"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="handleGetDetail(scope.row)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :total="bank_batch_count"
          layout="total,prev,pager,next"
          :current-page="bank_batch_page"
          :page-size="bank_batch_size"
          @current-change="handleChangeBank_batch"
          style="text-align: right"
        ></el-pagination>
      </div>

      <el-dialog
        :visible="fund_flow_visible"
        @close="fund_flow_visible = false"
      >
        <p>批次号为{{ doc_id }}的流水</p>
        <p>银行流水 <span>Total:{{ fund_flow.length }}</span></p>
        <el-table
          :data="fund_flow"
        >
          <el-table-column label="打款时间" prop="create_time"></el-table-column>
          <el-table-column label="金额" prop="income_amount"></el-table-column>
          <el-table-column label="备注" prop="remark">
            <template slot-scope="scope">
              <span>{{ scope.row.remark ? scope.row.remark: '/'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="所属银行" prop="bank.name"></el-table-column>
        </el-table>
        <el-pagination
          :total="fund_flow_count"
          layout="total,prev,pager,next"
          :current-page="fun_flow_page"
          :page-size="fun_flow_size"
          @current-change="handleChangeFund_flow"
          style="text-align: right"
        ></el-pagination>
      </el-dialog>

      <!--导入-->
      <el-dialog
        :visible="import_visible"
        title="导入"
        @close="handleCancelImport"
        width="30%"
      >
        <el-form size="mini" label-width="100px" style="width: 80%;margin: 0 auto">
          <el-form-item label="流水模板">
            <el-select v-model="params.bank_template">
              <el-option v-for="item in bank_template" :key="item.id" :value="item.id" :label="item.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="模板文件">
            <Upload :ID="'bank_template'" :editImage="bankInfoImg" @getImg="handleGetBank" :isClear="bankIsClear"></Upload>
          </el-form-item>
          <el-form-item>
            <el-button size="mini" type="primary" @click="handleOkImport">导入</el-button>
            <el-button size="mini" @click="handleCancelImport">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
</template>

<script>
  import Upload from '../../common/UPLOAD.vue'
    export default {
        name: "index",
      components: { Upload },
        data() {
            return {
              bankInfoImg: {},
              bankIsClear: false,
              import_visible: false,
              bank_batch: [],
              bank_batch_page: 1,
              bank_batch_size: 12,
              bank_batch_count: 0,
              doc_id: '',
              fund_flow: [],
              fund_flow_count: 0,
              fund_flow_visible: false,
              fun_flow_page: 1,
              fun_flow_size: 12,

              bank_template: [],
              params: {
                bank_template: '',
                doc_id: []
              },
              row: ''
            }
        },
        mounted() {
          this.get_bank_batch_count();
        },
        activated() {
        },
        watch: {},
        computed: {},
        methods: {
          handleOkImport() {
            this.$http.post(globalConfig.temporary_server + 'bank_fund_flow',this.params).then(res => {
              if (res.data.code === 200){
                this.$notify.success({
                  title:'成功',
                  message: res.data.msg
                })
              } else {
                this.$notify.warning({
                  title: '失败',
                  message: res.data.msg
                })
              }
              this.handleCancelImport();
            }).catch(err => {
              console.log(err);
            })
          },
          handleCancelImport() {
            this.bankIsClear = true;
            this.bank_template = [];
            this.params = {
              bank_template: '',
              doc_id: []
            };
            this.import_visible = false;
          },
          handleGetBank(val) {
            console.log(val);
            this.params.doc_id = val[1];
          },
          handleImportRun() {
            this.$http.get(globalConfig.temporary_server + '/bank_template').then(res => {
              if (res.data.code === 200) {
                this.bank_template = res.data.data.data;
                this.import_visible = true;
                this.bankIsClear = false;
              } else {
                this.bank_template = [];
              }
              this.get_bank_batch_count();
            }).catch(err => {
              console.log(err);
            })
          },
          handleChangeBank_batch(page) {
            this.bank_batch_page = page;
            this.get_bank_batch_count();
          },
          handleChangeFund_flow(page) {
            this.fun_flow_page = page;
            this.handleGetList();
          },
          get_bank_batch_count() {
            this.$http.get(globalConfig.temporary_server + 'bank_batch_count',{
              params: {
                page: this.bank_batch_page,
                limit: this.bank_batch_size
              }
            }).then(res => {
              if (res.data.code === 200) {
                this.bank_batch = res.data.data.data;
                this.bank_batch_count = res.data.data.count;
              } else {
                this.bank_batch = [];
                this.bank_batch_count = 0;
              }
            }).catch(err => {
              console.log(err);
            })
          },
          handleGetDetail(row) {
            this.doc_id = row.id;
            this.row = row;
            this.handleGetList();
          },
          handleGetList() {
            this.$http.get(globalConfig.temporary_server + 'bank_fund_flow',{
              params: {
                batch_flow_code: this.row.id,
                page: this.fun_flow_page,
                limit: this.fun_flow_size
              }
            }).then(res => {
              if (res.data.code === 200) {
                this.fund_flow = res.data.data.data;
                this.fund_flow_count = res.data.data.count;
                this.fund_flow_visible = true;
              } else {
                this.fund_flow = [];
                this.fund_flow_count = 0;
              }
            }).catch(err => {
              console.log(err);
            })
          }
        },
    }
</script>

<style lang="scss" scoped>
  #bankRun {
    .header {
      width: 100%;
      text-align: right;
      margin-bottom: 10px;
    }
  }
</style>
