<template>
  <div>
    <div class="highRanking">
      <div class="highSearch">
        <el-form :model="form" :inline="true" size="mini">
          <el-form-item>
            <el-input placeholder="请输入内容" v-model="form.keyWords" size="mini" clearable>
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </el-form-item>
          <!--<el-form-item>-->
            <!--<el-button type="primary" size="mini" @click="highGrade">高级</el-button>-->
          <!--</el-form-item>-->
        </el-form>
      </div>

      <!--<div class="filter high_grade" :class="isHigh? 'highHide':''">-->
        <!--<el-form :inline="true" :model="form" size="mini" label-width="100px">-->
          <!--<div class="filterTitle">-->
            <!--<i class="el-icons-fa-bars"></i>&nbsp;&nbsp;高级搜索-->
          <!--</div>-->
          <!--<el-row class="el_row_border">-->
            <!--<el-col :span="12">-->
              <!--<el-row>-->
                <!--<el-col :span="8">-->
                  <!--<div class="el_col_label">发送人</div>-->
                <!--</el-col>-->
                <!--<el-col :span="16" class="el_col_option">-->
                  <!--<el-form-item>-->
                    <!--<el-input v-model="form.user" @focus="openDepartment" placeholder="请选择" readonly></el-input>-->
                  <!--</el-form-item>-->
                <!--</el-col>-->
              <!--</el-row>-->
            <!--</el-col>-->
            <!--<el-col :span="12">-->
              <!--<el-row>-->
                <!--<el-col :span="8">-->
                  <!--<div class="el_col_label">发送时间</div>-->
                <!--</el-col>-->
                <!--<el-col :span="16" class="el_col_option">-->
                  <!--<el-form-item>-->
                    <!--<el-form-item>-->
                      <!--<el-date-picker-->
                        <!--v-model="form.dateValue"-->
                        <!--type="daterange"-->
                        <!--unlink-panels-->
                        <!--range-separator="至"-->
                        <!--start-placeholder="开始日期"-->
                        <!--end-placeholder="结束日期"-->
                        <!--:picker-options="pickerOptions">-->
                      <!--</el-date-picker>-->
                    <!--</el-form-item>-->
                  <!--</el-form-item>-->
                <!--</el-col>-->
              <!--</el-row>-->
            <!--</el-col>-->
          <!--</el-row>-->
          <!--<div class="btnOperate">-->
            <!--<el-button size="mini" type="primary">搜索</el-button>-->
            <!--<el-button size="mini" type="primary" @click="resetting">重置</el-button>-->
            <!--<el-button size="mini" type="primary" @click="highGrade">取消</el-button>-->
          <!--</div>-->
        <!--</el-form>-->
      <!--</div>-->
    </div>

    <el-table :data="tableData"
              style="width: 100%">
      <el-table-column
        prop="create_time"
        label="短信生成时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="发送人"
        width="180">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="接收人手机">
      </el-table-column>
      <el-table-column
        prop="template_name"
        label="类型">
      </el-table-column>
      <el-table-column
        prop="content"
        label="结果">
      </el-table-column>
    </el-table>

    <div class="block pages">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="10"
        layout="total, prev, pager, next, jumper"
        :total="totalNumbers">
      </el-pagination>
    </div>

    <!--组织架构-->
    <!--<AddModule :organizationDialog="departmentVisible" @close="closeDepartment"></AddModule>-->
  </div>
</template>

<script>
  import AddModule from '../../common/organization.vue'

  export default {
    name: 'message-list',
    components: {AddModule},
    data() {
      return {
        isHigh: false,
        departmentVisible: false,
        tableData: [],
        form: {
          keywords: '',
          pages: '',
//          dateValue: [],
//          status: false,
        },
        currentPage: 1,
        totalNumbers:0,
        pickerOptions: {},
        loading: true,
      }
    },
    mounted() {
      this.getDate();
    },
    methods: {
      getDate(){
        this.$http.get(globalConfig.server+'setting/sms_template/',{params:this.form}).then((res) => {
          if(res.data.code === '20000'){
            this.tableData = res.data.data.list;
            this.totalNumbers = res.data.data.count;

            this.$notify.success({
              title: '成功',
              message: res.data.msg,
            });
          }else {
            this.$notify.warning({
              title: '警告',
              message: res.data.msg,
            });
          }
        })
      },
//        // 重置
//      resetting() {
//        this.form.keywords = '';
//      },
//      // 高级筛选
//      highGrade() {
//        this.isHigh = !this.isHigh;
//      },
//
//      openDepartment() {
//        this.departmentVisible = true
//      },
//      closeDepartment() {
//        this.departmentVisible = false
//      },

      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>
