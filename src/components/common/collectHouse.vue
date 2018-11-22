<template>
  <div id="mapSearchId">
    <el-dialog :close-on-click-modal="false" title="房屋选择" :visible.sync="houseDialogVisible" width="50%" :before-close="closeDialog">
      <div class="content">
        <div class="filter-container">
          <el-form :inline="true" onsubmit="return false" size="mini" class="demo-form-inline">

            <el-form-item>
              <el-input v-model="params.q" placeholder="请输入内容" class="input-with-select"  @keyup.enter.native="search('renter')" clearable>
                <el-button slot="append" icon="el-icon-search" @click="search('renter')"></el-button>
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="tableList scroll_bar">
          <el-table :data="houseList" @row-click="rowClick" style="width: 100%"
                    :empty-text='tableStatus'
                    v-loading="tableLoading"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(255, 255, 255, 0)">
            <el-table-column width="65">
              <template slot-scope="scope">
                <el-radio v-model="radio" :label="scope.row.id">
                  <span style="display: none">1</span>
                </el-radio>
              </template>
            </el-table-column>

            <el-table-column
              label="房屋地址">
              <template slot-scope="scope">
                <span v-if="scope.row.house_name">{{scope.row.house_name}}</span>
                <span v-else="">/</span>
              </template>
            </el-table-column>
            <el-table-column
              label="合同状态">
              <template slot-scope="scope">
                <span v-if="scope.row.status">{{contractStatus[scope.row.status]}}</span>
                <span v-else="">/</span>
              </template>
            </el-table-column>
            <el-table-column
              label="报备时间">
              <template slot-scope="scope">
                <span v-if="scope.row.created_at">{{scope.row.created_at}}</span>
                <span v-else="">/</span>
              </template>
            </el-table-column>
            <el-table-column
              label="签约时长">
              <template slot-scope="scope">
                <span v-if="scope.row.duration_days">{{scope.row.duration_days}}</span>
                <span v-else="">/</span>
              </template>
            </el-table-column>
            <el-table-column
              label="客户姓名">
              <template slot-scope="scope">
                <span v-if="scope.row.customers">{{scope.row.customers}}</span>
                <span v-else="">/</span>
              </template>
            </el-table-column>
            <el-table-column
              label="开单人">
              <template slot-scope="scope">
                <span v-if="scope.row.staff_name">{{scope.row.staff_name}}</span>
                <span v-else="">/</span>
              </template>
            </el-table-column>
            <el-table-column
              label="所属部门">
              <template slot-scope="scope">
                <span v-if="scope.row.department_name">{{scope.row.department_name}}</span>
                <span v-else="">/</span>
              </template>
            </el-table-column>
          </el-table>
        </div>

      </div>

      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeDialog">取 消</el-button>
        <el-button size="small" type="primary" @click="closeDialog('yes')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

  export default {
    props:['houseDialog'],
    data () {
      return {
        houseDialogVisible: false,
        tableData :[],
        radio:'',
        selectedItem : [],
        params: {
          q: '',
          // per_page_number: 50,
          page: 1,
          status : '',
          is_nrcy : 0,
          is_lord : 1,
        },
        tableStatus: '暂无数据',
        tableLoading: false,
        urls: globalConfig.server,
        types: '',
        path: '',
        state: 0,
        isGetMore: true,          //滑动触发加载
        isLastPage: false,        //是否最后一页
        scrollHeight: 0,          //滚动到最底部
        last_page: 1,
        params: {},
        searchValue: '',
        end_type: '',

        showInfo: [],
        houseList: [],

        contractStatus: {0: '未确定', 1: '未签约', 2: '已签约', 3: '快到期(60天内)', 4: '已结束', 5: '已过期'},
        contractColor: {0: '#87AA97', 1: '#F067E0', 2: '#30CF5C', 3: '#FF6700', 4: '#409EFF', 5: '#F00000'},
      }
    },

    mounted(){

    },
    watch:{
      houseDialog(val){
        this.houseDialogVisible = val
      },
      houseDialogVisible(val) {
        if (!val) {
          this.$emit('close');
        }
      }
    },
    methods:{
      search(type){ //关键词 搜索
        this.tableStatus = " ";
        this.tableLoading = true;
        this.$http.get(globalConfig.server_user1 + 'houses', {params: this.params}).then((res) => {
          this.tableLoading = false;
          this.houseList = [];
          if (res.data.status === 'success') {
            if (res.data.data.length > 0) {
              let data = res.data.data;
              for (let i = 0; i < data.length; i++) {
                if (type === 'allHouse') {
                  if (data[i].lords.length === 0 && data[i].renters.length === 0) {
                    let list = {};
                    this.showInfo.push(data[i].id);
                    list.house_id = data[i].id;
                    list.house_name = data[i].name;
                    if (data[i].house_res) {
                      sessionStorage.setItem('house_res', JSON.stringify(data[i].house_res));
                    } else {
                      list.house_res = {};
                    }
                    this.houseList.push(list);
                    this.finish(4);
                  }
                  if (data[i].lords.length !== 0) {
                    this.lord(data[i], type);
                  } else {
                    this.finish(2);
                  }
                  if (data[i].renters.length !== 0) {
                    this.renter(data[i], type);
                  } else {
                    this.finish(2);
                  }
                }
                if (type === 'quality' && data[i].house_res) {
                  let list = {};
                  this.showInfo.push(data[i].id);
                  list.house_id = data[i].id;
                  list.house_name = data[i].name;
                  sessionStorage.setItem('house_res', JSON.stringify(data[i].house_res));
                  this.houseList.push(list);
                  this.finish(4);
                }
                if ((type === 'lord' || type === '') && data[i].lords.length !== 0) {
                  this.lord(data[i], type);
                } else {
                  this.finish(2);
                }
                if ((type === 'renter' || type === 'is_nrcy' || type === 'report') && data[i].renters.length !== 0) {
                  this.renter(data[i], type);
                } else {
                  this.finish(2);
                }
                if (type === 'lord1' && data[i].lords.length !== 0) {
                  this.agencyLord(data[i], type);
                } else {
                  this.finish(2);
                }
                if (type === 'renter1' && data[i].renters.length !== 0) {
                  this.agencyRent(data[i], type);
                } else {
                  this.finish(2);
                }
                if (type === '' && data[i].lords.length === 0 && data[i].renters.length === 0) {
                  let list = {};
                  this.showInfo.push(data[i].id);
                  list.house_id = data[i].id;
                  list.house_name = data[i].name;
                  if (data[i].house_res) {
                    list.is_agency = data[i].house_res.is_agency;
                  } else {
                    list.is_agency = 0;
                  }
                  this.houseList.push(list);
                  this.finish(4);
                }
                if (type !== 'quality' && data[i].lords.length === 0 && data[i].renters.length === 0) {
                  this.finish(2);
                }
                console.log(this.houseList)
              }
              // this.tableData = res.data.data;
            } else {
              this.tableData = [];
              this.tableStatus = "暂无数据";
            }
          } else {
            this.tableData = [];
            this.tableStatus = "暂无数据";
          }
        })
      },
      closeDialog(done){    //关闭模态框回调
      console.log(1441)
        if(done === 'yes'){
           if(this.selectedItem.id){
             this.$emit('close',this.selectedItem);
             console.log(this.selectedItem)
             this.houseDialogVisible = false;
             this.selectedItem = [];
             this.radio = '';
           } else {
             this.$notify.warning({
               title:'警告',
               message : '您尚未选择房屋地址'
             })
           }
        }else {
          this.houseDialogVisible = false;
        }
      },
      // 中介费收
      agencyLord(val, type) {
        for (let j = 0; j < val.lords.length; j++) {
          if (!val.lords[j].end_type || this.end_type === 'none') {
            if (val.lords[j].is_agency === 1) {
              this.contracts(val, type, val.lords[j]);
            } else {
              this.finish(2);
            }
          }
        }
      },
      // 中介费租
      agencyRent(val, type) {
        for (let j = 0; j < val.renters.length; j++) {
          if (!val.renters[j].end_type || this.end_type === 'none') {
            if (val.renters[j].is_agency === 1) {
              this.contracts(val, type, val.renters[j]);
            } else {
              this.finish(2);
            }
          }
        }
      },
       // 收房合同
      lord(val, type) {
        for (let j = 0; j < val.lords.length; j++) {
          if (!val.lords[j].end_type || this.end_type === 'none') {
            this.contracts(val, type, val.lords[j]);
          }
        }
      },
      // 租房合同
      renter(val, type) {
        for (let j = 0; j < val.renters.length; j++) {
          if (!val.renters[j].end_type || this.end_type === 'none') {
            this.contracts(val, type, val.renters[j]);
          }
        }
      },
      contracts(val, type, value) {
        console.log(val)
        let list = {};
        if (type === 'is_nrcy') {
          list.renters = value;
        } else {
          list.renters = {};
        }
        list.house_id = val.id;
        list.house_name = val.name;
        list.house_type = val.room + '室' + val.hall + '厅' + val.toilet + '卫';
        list.created_at = val.created_at.substring(0, 10);
        if (type === 'lord' || type === 'lord1') {
          list.end_at = value.end_at;
        } else {
          list.end_at = '';
        }
        list.id = value.id;
        list.agency_info = value.agency_info;
        list.is_agency = value.is_agency;
        if (value.sign_month !== null && value.sign_month !== undefined) {
          list.month = value.sign_month;
        } else {
          list.month = '';
        }
        if (type === 'report') {
          list.mortgage_price = value.mortgage_price;
        }
        if (value.property_price) {
          list.property_price = value.property_price;
        } else {
          list.property_price = '';
        }
        list.start_at = value.start_at;
        list.album = value.album;
        list.status = value.status !== null ? value.status : 0;
        list.front_money = value.front_money ? value.front_money : '';
        list.duration_days = value.duration_days;
        if (value.customers.length !== 0) {
          list.customers = value.customers[0].name;
          list.cusPhone = value.customers[0].phone;
        } else {
          if (value.customer_info !== null && value.customer_info.length !== 0) {
            list.customers = value.customer_info[0].name;
            list.cusPhone = value.customer_info[0].phone;
          } else {
            list.customers = '---';
            list.cusPhone = '';
          }
        }
        if (value.sign_user !== null) {
          list.staff_id = value.sign_user.id;
          list.staff_name = value.sign_user.name;
        } else {
          list.staff_id = '';
          list.staff_name = '---';
        }
        if (value.sign_org !== null) {
          list.department_id = value.sign_org.id;
          list.department_name = value.sign_org.name;
        } else {
          list.department_id = '';
          list.department_name = '---';
        }
        if (val.house_res && type === 'allHouse') {
          sessionStorage.setItem('house_res', JSON.stringify(val.house_res));
        } else {
          list.house_res = {};
        }
        this.houseList.push(list);
        this.finish(4);
      },
      // 取消
      onCancel() {
        this.routLink('back');
      },
      finish(val) {
        this.state = val;
      },
      resetting() {
        let mainContent = $('.mainContent');
        mainContent.scrollTop(0);
        this.scrollHeight = 0;
        this.params.page = 1;
        this.params.per_page_number = 20;
        this.showInfo = [];
        this.houseList = [];
        this.isGetMore = true;
        this.isLastPage = false;
      },
      distinct(arr) {
        let result = [], i, j, len = arr.length;
        for (i = 0; i < len; i++) {
          for (j = i + 1; j < len; j++) {
            if (arr[i] === arr[j]) {
              j = ++i;
            }
          }
          result.push(arr[i]);
        }
        return result;
      },
      rowClick(row, event, column){
        console.log(row)
        this.radio = row.id;
        this.selectedItem = row;
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="">
  #mapSearchId{
    .el-dialog__wrapper{
      .el-dialog{
        .el-dialog__body{
          .content{
            .filter-container{
              padding: 16px 0 0 16px;
            }
            .tableList{
              height: 400px;
              overflow: auto;
            }
          }
        }
      }
    }
  }

</style>
