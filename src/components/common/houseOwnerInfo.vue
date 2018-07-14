<template>
  <div id="mapSearchId">
    <!--<el-dialog :close-on-click-modal="false" title="房东信息" :visible.sync="houseOwnerDialogVisible" width="40%"-->
    <!--:before-close="closeDialog">-->
    <!--<div class="content">-->
    <!--<div class="filter-container">-->
    <!--<el-form :inline="true" onsubmit="return false" size="mini" class="demo-form-inline">-->
    <!--<el-form-item>-->
    <!--<el-input v-model="params.search" placeholder="请输入内容" class="input-with-select"-->
    <!--@keyup.enter.native="search"-->
    <!--clearable>-->
    <!--<el-button slot="append" icon="el-icon-search" @click="search"></el-button>-->
    <!--</el-input>-->
    <!--</el-form-item>-->
    <!--<el-form-item>-->
    <!--<el-button type="primary" size="mini" @click="addHouseOwnerDialog=true">增加房东信息</el-button>-->
    <!--</el-form-item>-->
    <!--</el-form>-->
    <!--</div>-->
    <!--<div class="tableList scroll_bar">-->
    <!--<el-table-->
    <!--:data="tableData"-->
    <!--:empty-text='addressStatus'-->
    <!--v-loading="addressLoading"-->
    <!--element-loading-text="拼命加载中"-->
    <!--element-loading-spinner="el-icon-loading"-->
    <!--element-loading-background="rgba(255, 255, 255, 0)"-->
    <!--@row-click="rowClick"-->
    <!--style="width: 100%">-->
    <!--<el-table-column width="65">-->
    <!--<template slot-scope="scope">-->
    <!--<el-radio v-model="radio" :label="scope.row.contract_id">-->
    <!--<span style="display: none">1</span>-->
    <!--</el-radio>-->
    <!--</template>-->
    <!--</el-table-column>-->
    <!--<el-table-column-->
    <!--prop="address"-->
    <!--label="房屋地址">-->
    <!--</el-table-column>-->
    <!--<el-table-column-->
    <!--prop="type"-->
    <!--label="房屋性质">-->
    <!--</el-table-column>-->
    <!--</el-table>-->
    <!--</div>-->
    <!--</div>-->
    <!--<div slot="footer" class="dialog-footer">-->
    <!--<el-button size="small" @click="closeDialog">取 消</el-button>-->
    <!--<el-button size="small" type="primary" @click="closeDialog('yes')">确 定</el-button>-->
    <!--</div>-->
    <!--</el-dialog>-->
    <el-dialog :close-on-click-modal="false" title="更换房东信息" :visible.sync="houseOwnerDialogVisible" width="40%">
      <div>
        <div>
          <el-form onsubmit="return false" size="mini" label-width="70px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="姓名" required>
                  <el-input v-model="params.name" placeholder="请输入内容" clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="电话" required>
                  <el-input v-model="params.phone" placeholder="请输入内容" clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="性别" required>
                  <el-radio-group v-model="params.sex">
                    <el-radio label="1">先生</el-radio>
                    <el-radio label="2">女士</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="证件类型" required>
                  <el-select v-model="params.idtype" placeholder="请选择证件类型">
                    <el-option v-for="item in id_type_dic" :label="item.dictionary_name" :value="item.id"
                               :key="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="证件号码" required>
                  <el-input v-model="params.idcard" placeholder="请输入内容" clearable></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="houseOwnerDialogVisible=false">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmPress('')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :close-on-click-modal="false" title="客户信息" :visible.sync="customerInfoDialog" width="50%">
      <div v-for="(item, index) in customerInfo">
        <div class="title">旧客户({{index+1}})</div>
        <div class="form_border">
          <el-form onsubmit="return false" size="mini" label-width="70px">
            <el-row>
              <el-col :span="5">
                <el-form-item label="姓名">
                  <div class="content">{{item.old && item.old.name}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="3.5">
                <el-form-item label="姓别">
                  <div class="content" v-if="item.old && item.old.sex==1">男</div>
                  <div class="content" v-else-if="item.old && item.old.sex==0">女</div>
                  <div class="content" v-else>暂无</div>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="手机号">
                  <div class="content">{{item.old && item.old.phone}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="证件类型">
                  <div class="content">{{item.old && item.old.idtype && item.old.idtype.dictionary_name}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="5.5">
                <el-form-item label="证件号码">
                  <div class="content">{{item.old && item.old.idcard}}</div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="title">新客户({{index+1}})</div>
        <div class="form_border">
          <el-form onsubmit="return false" size="mini" label-width="70px">
            <el-row>
              <el-col :span="5">
                <el-form-item label="姓名">
                  <div class="content">{{item.new && item.new.name}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="3.5">
                <el-form-item label="姓别">
                  <div class="content" v-if="item.new && item.new.sex==1">男</div>
                  <div class="content" v-else-if="item.new && item.new.sex==0">女</div>
                  <div class="content" v-else>暂无</div>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="手机号">
                  <div class="content">{{item.new && item.new.phone}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="证件类型">
                  <div class="content">{{item.new && item.new.idtype && item.new.idtype.dictionary_name}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="5.5">
                <el-form-item label="证件号码">
                  <div class="content">{{item.new && item.new.idcard}}</div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="customerInfoDialog=false">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmPress('add')">新 增</el-button>
        <el-button size="small" type="primary" @click="confirmPress('update')">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

  export default {
    props: ['houseOwnerDialog', 'contractId', 'module'],
    data() {
      return {
        houseOwnerDialogVisible: false,
        tableData: [],
        radio: '',
        selectedItem: [],
        params: {
          name: '',
          phone: '',
          sex: '',
          idtype: '',
          idcard: '',
          module: '',
          contract_id: '',
          type: '',
        },
        addressStatus: ' ',
        addressLoading: false,
        id_type_dic: [],         //证件类型
        addHouseOwnerDialog: false,
        customerInfoDialog: false,
        customerInfo: [],
      }
    },
    mounted() {
      this.dictionary(409, 1).then((res) => {
        this.id_type_dic = res.data;
      });

    },
    watch: {
      houseOwnerDialog(val) {
        this.houseOwnerDialogVisible = val
      },
      houseOwnerDialogVisible(val) {
        if (!val) {
          this.$emit('close');
          this.params.name='';
          this.params.phone='';
          this.params.sex='';
          this.params.idtype='';
          this.params.idcard='';
          this.params.type='';
        }
      }
    },
    methods: {
      search() { //关键词 搜索线上高德数据
        this.addressStatus = ' ';
        this.addressLoading = true;
        if (this.isRent === 0) {
          this.$http.get(globalConfig.server + 'lease/collect', {params: this.params}).then((res) => {
            this.addressLoading = false;
            if (res.data.code === '61010') {
              this.tableData = res.data.data;
            } else {
              this.addressStatus = '暂无数据';
              this.tableData = [];
            }
          });
        } else {
          this.$http.get(globalConfig.server + 'lease/rent', {params: this.params}).then((res) => {
            this.addressLoading = false;
            if (res.data.code === '61110') {
              this.tableData = res.data.data;
            } else {
              this.addressStatus = '暂无数据';
              this.tableData = [];
            }
          });
        }

      },
      closeDialog(done) {    //关闭模态框回调
        if (done === 'yes') {
          if (this.selectedItem.contract_id) {
            this.$emit('close', this.selectedItem);
            this.houseOwnerDialogVisible = false;
            this.selectedItem = [];
            this.radio = '';
          } else {
            this.$notify.warning({
              title: '警告',
              message: '您尚未选择房屋地址'
            })
          }
        } else {
          this.houseOwnerDialogVisible = false;
        }
      },

      rowClick(row, event, column) {
        this.radio = row.contract_id;
        this.selectedItem = row;
      },
      confirmPress(val) {
        this.params.type = val;
        this.params.module = this.module;
        this.params.contract_id = this.contractId;
        this.$http.post(globalConfig.server + 'coreproject/customer', this.params).then((res) => {
          if (res.data.code === '20000') {
            this.$notify.success({
              title: '成功',
              duration: 1000,
              message: res.data.msg,
            });
            this.customerInfoDialog = false;
            this.houseOwnerDialogVisible = false;
          } else if (res.data.code === '20010') {
            this.$notify.warning({
              title: '警告',
              message: res.data.msg,
            });
            this.customerInfoDialog = true;
            this.customerInfo = res.data.data;
          } else {
            this.$notify.warning({
              title: '警告',
              duration: 1000,
              message: res.data.msg,
            });
          }
        });
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="">
  #mapSearchId {
    .content {
      padding: 0 10px;
      min-height: 32px;
      background: #eef3fc;
      border-radius: 4px;
      font-size: 12px;
      color: #727479;
    }
    .el-dialog__wrapper {
      .el-dialog {
        .el-dialog__body {
          .content {
            .filter-container {
              padding: 16px 0 0 16px;
            }
            .tableList {
              height: 400px;
              overflow: auto;
            }
          }
        }
      }
    }
  }

</style>
