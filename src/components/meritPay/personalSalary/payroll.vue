<template>
    <div id="Payroll">
      <div class="highRanking">
        <div class="tabsSearch">
          <el-form :inline="true" onsubmit="return false" size="mini">
            <el-form-item>
              <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="importData">导入</el-button>
              <input type="file" id="import" style="display:none;">
              <upload :ID="'upload'" @getImg="getImg" style="display:none;" :isClear="isClear"></upload>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="exportData">导出</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="filter high_grade" :class="isHigh? 'highHide':''">
          <el-form :inline="true" onsubmit="return false" :model="form" size="mini" label-width="100px">
            <div class="filterTitle">
              <i class="el-icons-fa-bars"></i>&nbsp;&nbsp;高级搜索
            </div>
            <el-row class="el_row_border">
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">日期</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <div class="block">
                        <el-date-picker
                          v-model="form.month"
                          type="month"
                          placeholder="选择月"
                          value-format="yyyy-MM">
                        </el-date-picker>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <div class="btnOperate">
              <el-button size="mini" type="primary" @click="getTableData">搜索</el-button>
              <el-button size="mini" type="primary" @click="resetting">重置</el-button>
              <el-button size="mini" type="primary" @click="highGrade">取消</el-button>
            </div>
          </el-form>
        </div>
      </div>
      <div class="main">
        <div style="margin: 0 0 10px;">
          <el-button :class="{'primary': active === index}" @click="tagClick(index)" size="mini"
                     v-for="(key,index) in buttonVal" :key="index">{{key}}
          </el-button>
        </div>
        <div>
          <div v-for="value in tableData" >
            <el-table :data="value.data" v-for="val in value.data" :key="val.id" width="100%" stripe>
              <el-table-column
                 v-for="(item, index) in val.header" :key="index" :label="item">
                <template slot-scope="scope">
                  <span>{{scope.row.body[index]}}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div v-if="tableData.length===0" style="text-align: center;background: #fff;margin: 25px 0;height: 40px;">暂无数据</div>
        </div>
      </div>
      <div class="block pages">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="form.page"
          :page-size="6"
          layout="total, prev, pager, next, jumper"
          :total="totalNum">
        </el-pagination>
      </div>
    </div>
</template>

<script>
  import Upload from '../../common/UPLOAD.vue'
  export default {
    name: "payroll",
    components: {Upload},
    data() {
      return {
        isHigh: false,
        tableData:  [],
        totalNum: 0,
        buttonVal: ['业务员','管理层'],
        active: 0,
        form: {
          category: 1,
          month: '',
          page: 1,
        },
        // importFile: {},
        isClear: false,
      }
    },
    mounted() {
      this.getTableData();
    },
    activated() {
      // this.getTableData();
    },
    methods:{
      getImg(val) {
        this.isClear = false;
        console.log(val[1])
        let config = {
          headers:{'Content-Type':'multipart/form-data'}
        };
        this.$http.post(globalConfig.server+ 'salary/dashboard/import/'+ this.form.category, {doc_id: val[1][0]}, config).then((res) => {

        });
      },
      // 按钮切换
      tagClick(val) {
        this.active = val;
        switch(val) {
          case 0:  //业务员
            this.form.category = 1;
            this.getTableData();
            break;
          case 1:  //管理层
            this.form.category = 2;
            this.getTableData();
            break;
        }
      },
      getTableData() {
        if(!this.form.month){
          this.form.month = '';
        }
        this.$http.get(globalConfig.server+ 'salary/dashboard?category='+this.form.category+'&page='+this.form.page+
        '&month='+this.form.month).then((res) => {
          this.isHigh = false;
            if(res.data.code === '88800'){
              this.header = res.data.data.data[0].header;
              this.tableData = res.data.data.data;
              this.totalNum = Number(res.data.data.count);
            }else{
              this.tableData = [];
              this.totalNum = 0;
            }
        });
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.form.page = val;
        this.getTableData();
      },
      // 重置
      resetting() {
        this.form.month = '';
      },
      // 高级筛选
      highGrade() {
        this.isHigh = !this.isHigh;
      },
      importData(){
        this.isClear = true;
        // $('#import').click();
        // var self = this;
        // $('#import').on('change',function(){
        //   self.importFile = this.files;
        //   let data = {};
        //   data = this.files;
        //   let formData = new FormData();
        //   formData.append('file', data);
        //   if(self.importFile){
        //     let config = {
        //       headers:{'Content-Type':'multipart/form-data'}
        //     };
        //     console.log(data)
        //     self.$http.post(globalConfig.server+ 'salary/dashboard/import/'+ self.form.category, formData, config).then((res) => {
        //
        //     });
        //   }
        // });
        $('#upload').click();

      },
      exportData() {
        this.$http.get(globalConfig.server+'salary/achv/export', { responseType: 'arraybuffer'}).then((res) => { // 处理返回的文件流
          if (!res.data) {
            return;
          }
          console.log(res);
          let url = window.URL.createObjectURL(new Blob([res.data]));
          let link = document.createElement('a');
          link.style.display = 'a';
          link.href = url;
          link.setAttribute('download', 'excel.xlsx');
          document.body.appendChild(link);
          link.click();
        });
      },
      // 冻结工资
      openFreeze() {
      },
      closeFreeze() {
      },
      // 标记
      openBadge() {
      },

    },
  }
</script>

<style scoped>
  .primary {
    background: #409EFF;
    border-color: #409EFF;
    color: #ffffff;
  }
</style>
