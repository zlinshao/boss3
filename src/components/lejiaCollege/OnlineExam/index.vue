<template>
  <div>
    <div id="onlineExam">
      <div class="tool">
        <div class="tool_left">
          <el-button type="success" size="mini" @click="openModalDialog('examDialog')">
            <!--<i class="el-icon-tickets"></i>-->
            <img src="../../../assets/images/examination/新建考试.svg" style="width: 11px;">&nbsp;新建考试
          </el-button>
          <el-button type="danger" size="mini" style="background: #fb4699;" @click="openModalDialog('testPaperDialog')">
            <i class="el-icon-document"></i>&nbsp;新建试卷
          </el-button>
        </div>
        <div class="tool_right">
          <el-form>
            <el-form-item>
              <span>选择类型</span>
              <el-select v-model="formInline.type" size="mini" placeholder="请选择" clearable>
                <el-option v-for="item in 4" :key="item.id" label="C语言" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <el-form>
            <el-form-item style="margin-right: 10px;">
              <el-input placeholder="搜索关键字" v-model="search" size="small"  class="search_input">
                <el-button slot="append" icon="el-icon-search" class="search_button" ></el-button>
              </el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="main">
        <div class="myHouse">
          <div class="blueTable">
            <el-table
              :data="quizData"
              @row-dblclick="dblClickTable"
              @row-contextmenu=''
              style="width: 100%">
              <el-table-column
                prop="contract_num"
                label="总题数">
              </el-table-column>
              <el-table-column
                prop="address"
                label="试卷名称">
              </el-table-column>
              <el-table-column
                prop="house_type"
                label="总分值">
              </el-table-column>
              <el-table-column
                prop="deposit"
                label="总时长">
              </el-table-column>
              <el-table-column
                prop="price"
                label="类型">
              </el-table-column>
            </el-table>
          </div>
            <div style="text-align: center">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="50">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    <div id="examDialog">
      <el-dialog  :visible.sync="examDialog" title="新建考试" width="50%">
        <div>
          <div style="color: #6a8dfb;">新建考试信息</div>
          <div class="exam_content">
            <el-form size="mini" onsubmit="return false;" :model="formExam" label-width="70px" >
              <el-row :gutter="50">
                <el-col :span="12">
                  <el-form-item label="场次名称" required>
                    <el-input v-model="formExam.name" placeholder="请输入场次"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="试卷类型" required>
                    <el-select v-model="formExam.name" size="mini" placeholder="请选择类型" clearable>
                      <el-option v-for="item in 4" :key="item.id" label="C语言" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="50">
                <el-col :span="12">
                  <el-form-item label="使用试卷">
                    <el-select v-model="formExam.name" size="mini" placeholder="请选择试卷" clearable>
                      <el-option v-for="item in 4" :key="item.id" label="C语言" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-checkbox label="试卷随机"></el-checkbox>
              </el-row>
              <el-row :gutter="50">
                <el-col :span="12">
                  <el-form-item label="开考时间">
                    <el-date-picker v-model="formExam.name" type="datetime" placeholder="请选择"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="试卷时长">
                    <el-input placeholder="请输入分钟" v-model="formExam.name"><template slot="append">分钟</template></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="50">
                <el-col :span="12">
                  <el-form-item label="开考后">
                    <el-input placeholder="请输入分钟" v-model="formExam.name"> <template slot="append">分钟</template></el-input>
                  </el-form-item>
                </el-col>
                <span class="vt_align">设定时间后不能在登陆考试系统</span>

              </el-row>
              <el-row :gutter="50">
                <el-col :span="12">
                  <el-form-item label="考生选择">
                    <el-select v-model="formExam.name" size="mini" placeholder="请选择类型" clearable>
                      <el-option v-for="item in 4" :key="item.id" label="C语言" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button size="small" type="primary" @click="saveExam" style="padding: 10px 20px;">保存</el-button>
          </span>
        </div>
      </el-dialog>
    </div>
    <!--<div id="testPaperDialog">-->
      <!--<el-dialog :visible.sync="testPaperDialog" title="新建试卷" width="50%">-->
        <!--<el-row :gutter="30">-->
          <!--<el-col :span="12"></el-col>-->
          <!--<el-col :span="12"></el-col>-->
        <!--</el-row>-->
      <!--</el-dialog>-->
    <!--</div>-->
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        formInline:{
          type: '',
        },
        search:'',
        quizData: [],
        examDialog: false,
        testPaperDialog: false,
        formExam:{
          name: '',
          description: '',
        },
        currentPage: 1,
      }
    },
    mounted() {
    },
    watch: {},
    methods: {
      saveExam() {
        this.examDialog = false;
      },
      dblClickTable(){

      },
      openModalDialog(val) {
        switch(val){
          case 'examDialog':
            this.examDialog = true;
            break;
          case 'testPaperDialog':
            this.testPaperDialog = true;
            break;
        }
      },

      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.form.pages = val;
        this.$store.dispatch('companyPage',val);
        this.getCompanyTableData();

      },
    },
  }
</script>

<style lang="scss" scoped>
  #onlineExam {
    .tool{
      .tool_right {
        .search_input{
          margin-left: 10px;
          /*border: 1px solid #6a8dfb;*/
          color: #6a8dfb;
            .search_button{
              /*background: #6a8dfb;*/
              /*color: #fff;*/
            }
         }
        }
    }
  }
  #examDialog {
   .el-dialog__title{
      color: #6a8dfb !important;
    }
    .exam_content{
      border: 1px solid #dfe6fb;
      padding: 10px;
    }
    .vt_align{
      vertical-align: middle;
      vertical-align: -webkit-baseline-middle;
    }
    .dialog-footer{
      text-align: center;
      display: block;
      margin-top: 20px;
    }
  }


</style>
