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
              @row-contextmenu='houseMenu'
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
    <el-dialog  v-show="examDialog" title="新建试卷" width="50%">
      <div class="">
        <el-form size="mini" onsubmit="return false;" :model="formExam" label-width="100px">
          <el-row >
            <el-form-item label="相册名称:" required>
              <el-input v-model="formExam.name" placeholder="请输入相册名称" ></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="相册说明:">
              <el-input v-model="formExam.description" type="textarea" placeholder="请输入相册说明"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="主题:" required>
              <el-radio-group v-model="formExam.theme">
                <el-radio label="1" :key="1">个人</el-radio>
                <el-radio label="2" :key="2">房屋</el-radio>
                <el-radio label="3" :key="3">部门</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-row>
        </el-form>
      </div>
    </el-dialog>
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

        },
      }
    },
    mounted() {
    },
    watch: {},
    methods: {
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
      }
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


</style>
