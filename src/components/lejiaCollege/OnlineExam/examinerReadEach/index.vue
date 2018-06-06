<template>
  <div @click="show=false" @contextmenu="closeMenu">
    <div id="onlineExam">
      <div class="highRanking">
        <div class="highSearch">
          <el-form :inline="true" onsubmit="return false" size="mini">
            <!--<el-form-item>-->
            <!--<el-input placeholder="请输入" v-model="form.search" @keyup.enter.native="search" size="mini"-->
            <!--clearable>-->
            <!--<el-button slot="append" icon="el-icon-search" @click="search"></el-button>-->
            <!--&lt;!&ndash;<el-button slot="append" icon="el-icons-fa-bars"></el-button>&ndash;&gt;-->
            <!--</el-input>-->
            <!--</el-form-item>-->
            <el-form-item>
              <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="sendPerformance">发送成绩</el-button>
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
                    <div class="el_col_label">部门搜索</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-input readonly="" v-model="departname" @focus="openOrganizationModal"
                                placeholder="点击选择">
                        <template slot="append">
                          <div style="cursor: pointer;" @click="emptyDepart">清空</div>
                        </template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">考生成绩</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-input v-model="form.score[0]" placeholder="起" style="width: 100px;"></el-input>
                      —
                      <el-input v-model="form.score[1]" placeholder="止" style="width: 100px;"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row class="el_row_border">

              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">考生状态</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-select v-model="form.status" size="mini" placeholder="请选择" clearable>
                        <el-option v-for="item in examineeStatusCategory" :key="item.id" :label="item.name"
                                   :value="item.id">
                          {{item.name}}
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="el_col_label">阅卷状态</div>
                  </el-col>
                  <el-col :span="16" class="el_col_option">
                    <el-form-item>
                      <el-select v-model="form.read_status" size="mini" placeholder="请选择" clearable>
                        <el-option v-for="item in readStatusCategory" :key="item.id" :label="item.name"
                                   :value="item.id">
                          {{item.name}}
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <div class="btnOperate">
              <el-button size="mini" type="primary" @click="search">搜索</el-button>
              <el-button size="mini" type="primary" @click="resetting">重置</el-button>
              <el-button size="mini" type="primary" @click="highGrade">取消</el-button>
            </div>
          </el-form>
        </div>
      </div>
      <div class="main">
        <div class="myHouse">
          <div class="blueTable">
            <el-table
              ref="multipleTable"
              :data="tableData"
              :empty-text='rentStatus'
              v-loading="rentLoading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(255, 255, 255, 0)"
              @row-contextmenu='openContextMenu'
              @selection-change="handleSelectionChange"
              style="width: 100%">
              <el-table-column
                type="selection"
                width="65">
              </el-table-column>
              <el-table-column
                prop="start_time"
                label="考试时间">
              </el-table-column>
              <el-table-column
                prop="name"
                label="试卷名称">
              </el-table-column>
              <el-table-column
                prop="category"
                label="试卷类型">
              </el-table-column>
              <el-table-column
                prop="examinee.real_name"
                label="考生姓名">
              </el-table-column>
              <!--<el-table-column-->
              <!--prop="depart"-->
              <!--label="考生部门">-->
              <!--</el-table-column>-->
              <el-table-column
                prop="statue"
                label="考生状态">
                <template slot-scope="scope">
                  <span v-if="scope.row.result_id == 0">缺考</span>
                  <span v-if="scope.row.result_id !== 0">完成考试</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="result_info.score"
                label="考生成绩">
                <template slot-scope="scope">
                  <span v-if="scope.row.result_id==0">0</span>
                  <span v-if="scope.row.result_id!==0">{{scope.row.result_info && scope.row.result_info.score}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="操作">
                <template slot-scope="scope">
                  <span
                    v-if="scope.row.result_id == 0 || (scope.row.result_info && scope.row.result_info.waiting && scope.row.result_info.waiting.length == 0)"
                    style="cursor: pointer;color: #6a8dfb;" @click="correctExam(scope.row)">已完成,点击查看</span>
                  <span v-else @click="correctExam(scope.row)" style="cursor: pointer;color: #6a8dfb;">点击阅卷</span>
                </template>
              </el-table-column>
              <el-table-column
                label="附件">
                <template slot-scope="scope">
                  <span v-if="scope.row.result_info && scope.row.result_info.attachment"
                        @click="downLoad(scope.row)">
                    <img src="../../../../assets/images/file.svg"
                         style="width: 20px;cursor: pointer;"></span>
                  <span v-else>—</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="block pages">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="form.page"
              :page-size="12"
              layout="total, prev, pager, next, jumper"
              :total="tableNumber">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <div>
      <el-dialog :close-on-click-modal="false" :visible.sync="editExamineeScoreDialog" title="修改考生成绩"
                 width="45%">
        <div style="margin-top: 20px;">
          <el-form size="mini" onsubmit="return false;" :model="examineeScoreForm" label-width="100px">
            <el-row>
              <el-col :span="22">
                <el-form-item label="主观题总分">
                  <el-input v-model="examineeScoreForm.subjective" placeholder="请输入主观题总分" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-form-item label="客观题总分">
                  <el-input v-model="examineeScoreForm.objective" placeholder="请输入客观题总分" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-form-item label="上传附件">
                  <Upload :ID="'attachment'" @getImg="photo_success" :editImage="attachment"
                          :isClear="isClear"></Upload>
                </el-form-item>
                <div style="color: #ff4545;color: #ef5252;margin-left: 100px;margin-bottom: 10px;margin-top: -10px;">温馨提示：附件和图片只支持一个</div>
              </el-col>
              <el-col :span="22">
                <el-form-item label="备注">
                  <el-input type="textarea" v-model="examineeScoreForm.remark" placeholder="请输入备注" clearable></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="editExamineeScoreDialog = false">取消</el-button>
          <el-button type="primary" size="mini" @click="confirmAddScore">确定</el-button>
        </span>
      </el-dialog>
    </div>
    <Organization :organizationDialog="organizationDialog" :type="organizeType" @close="closeOrganization"
                  @selectMember="selectMember"></Organization>
    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperate="clickEvent"></RightMenu>
  </div>
</template>

<script>
  import Organization from "../../../common/organization.vue";
  import RightMenu from '../../../common/rightMenu.vue'    //右键
  import Upload from '../../../common/UPLOAD.vue';

  export default {
    name: "examiner-read-each",
    components: {Organization, RightMenu, Upload},
    data() {
      return {
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],
        tableData: [],
        tableNumber: 0,
        examId: '',
        form: {
          page: 1,
          limit: 12,
          department_id: '',
          score: [],
          status: '',  //考生状态
          read_status: '', //阅卷状态
        },
        examineeStatusCategory: [
          {
            id: 0,
            name: '缺考'
          },
          {
            id: 1,
            name: '完成考试'
          },
        ],
        readStatusCategory: [
          {
            id: 0,
            name: '未完成'
          },
          {
            id: 1,
            name: '已完成'
          },
        ],
        departname: '',
        isHigh: false, //高级搜索
        organizeType: '',
        organizationDialog: false,
        rentStatus: ' ',
        rentLoading: false,
        resultIds: [],
        editExamineeScoreDialog: false,
        //修改考生成绩
        examineeScoreForm: {
          subjective: '', //主观题分数
          objective: '',  //客观题分数
          attachment: '',
          remark: '',
        },
        attachment: {},
        isClear: false,
        resultId: '',
      };
    },
    activated() {
      this.getQueryData();
      this.myData();
    },
    watch: {
      editExamineeScoreDialog(val) {
        if (!val) {
          this.examineeScoreForm = {
            subjective: '', //主观题分数
            objective: '',  //客观题分数
            attachment: '',
            remark: '',
          };
          this.isClear = true;
        } else {
          this.isClear = false;
          this.$http.get(globalConfig.server + 'exam/result/' + this.resultId).then((res) => {
            if (res.data.code === '36000') {
              this.examineeScoreForm.subjective = res.data.data.subjective_score;
              this.examineeScoreForm.objective = res.data.data.objective_score;
              this.examineeScoreForm.remark = res.data.data.remark;
              this.examineeScoreForm.attachment = res.data.data.attachment;
              this.attachment = res.data.data.link;
            }
          });
        }
      },
    },
    methods: {
      downLoad(val) {
        this.$http.get(globalConfig.server + 'exam/result/' + val.result_id).then((res) => {
          if (res.data.code === '36000') {
            window.open(res.data.data.link[val.result_info.attachment]);
          }
        });

      },
      confirmAddScore() {
        this.$http.put(globalConfig.server + 'exam/result/' + this.resultId, this.examineeScoreForm).then((res) => {
          if (res.data.code === '36010') {
            this.$notify.success({
              title: '成功',
              message: res.data.msg
            });
            this.editExamineeScoreDialog = false;
            this.myData();
          } else {
            this.$notify.warning({
              title: '警告',
              message: res.data.msg
            });
          }
        });
      },
      // 上传成功
      photo_success(val) {
        this.examineeScoreForm.attachment = val[1][0];
      },
      sendPerformance() {
        this.$confirm("您确认发送成绩吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.$http.post(globalConfig.server + 'exam/result/submit', {
            ids: this.resultIds,
            exam_id: this.examId
          }).then((res) => {
            if (res.data.code === '36010') {
              this.$notify.success({
                title: '成功',
                message: res.data.msg
              });
              this.$refs.multipleTable.clearSelection();
              this.resultIds = [];
            } else {
              this.$notify.warning({
                title: '警告',
                message: res.data.msg
              });
            }
          });
        }).catch(() => {
          this.$notify.info({
            title: "提示",
            message: "已取消发送"
          });
        });

      },

      handleSelectionChange(val) {
        this.resultIds = [];
        val.forEach((item) => {
          this.resultIds.push(item.result_id);
        });
      },
      search() {
        this.form.page = 1;
        this.myData();
      },
      correctExam(val) {
        this.$router.push({path: "/examinerShortAn", query: {result_id: val.result_id, exam_id: val.exam_id}});
      },
      // lookExam(val) {
      //   this.$router.push({path: '/lookExam', query: {result_id: val.result_id, exam_id: val.exam_id, from: 'manage'}});
      // },
      getQueryData() {
        if (!this.$route.query.id) {
          this.examId = this.$store.state.onlineExam.examiner_read_id;
          this.$router.push({path: '/examinerReadEach', query: {id: this.$store.state.onlineExam.examiner_read_id}});
        } else {
          this.$store.dispatch('examinerReadId', this.$route.query.id);
          this.examId = this.$route.query.id;
        }
      },
      myData() {
        this.rentStatus = " ";
        this.rentLoading = true;
        this.$http.get(globalConfig.server + "exam/finished/" + this.examId, {params: this.form}).then(res => {
          this.rentLoading = false;
          this.isHigh = false;
          if (res.data.code == "30000") {
            this.tableData = res.data.data.data;
            this.tableNumber = res.data.data.count;
          } else {
            this.tableData = [];
            this.tableNumber = 0;
            this.rentStatus = "暂无数据";
          }
        });
      },
      openOrganizationModal() {
        this.organizationDialog = true;
        this.organizeType = 'depart';
      },
      closeOrganization() {
        this.organizationDialog = false;
        this.organizeType = '';
      },
      selectMember(val) {
        this.departname = val[0].name;
        this.form.department_id = val[0].id;
        this.organizeType = '';
      },
      emptyDepart() {
        this.departname = '';
        this.form.department_id = '';
      },
      // 高级
      highGrade() {
        this.isHigh = !this.isHigh;
      },
      // 重置
      resetting() {
        this.form = {
          page: 1,
          limit: 12,
          department_id: '',
          score: [],
          status: '',  //考生状态
          read_status: '', //阅卷状态
        };
        this.departname = '';
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.form.page = val;
        this.myData();
      },
      //右键菜单
      openContextMenu(row, event) {
        this.resultId = row.result_id;
        this.lists = [
          {
            clickIndex: "editExamineeScore",
            headIcon: "el-icon-edit",
            label: "修改考生成绩"
          },

        ];
        let e = event || window.event; //support firefox contextmenu
        this.show = false;
        this.rightMenuX =
          e.clientX +
          document.documentElement.scrollLeft -
          document.documentElement.clientLeft;
        this.rightMenuY =
          e.clientY +
          document.documentElement.scrollTop -
          document.documentElement.clientTop;
        event.preventDefault();
        event.stopPropagation();
        this.$nextTick(() => {
          this.show = true;
        });
      },
      //右键回调事件
      clickEvent(index) {
        switch (index) {
          case 'editExamineeScore':
            this.editExamineeScoreDialog = true;
            break;
        }
      },
      //关闭右键菜单
      closeMenu() {
        this.show = false;
      },
      //右键参数
      contextMenuParam(event) {
        let e = event || window.event;
        this.show = false;
        this.rightMenuX = e.clientX + document.documentElement.scrollLeft - document.documentElement.clientLeft;
        this.rightMenuY = e.clientY + document.documentElement.scrollTop - document.documentElement.clientTop;
        event.preventDefault();
        event.stopPropagation();
        this.$nextTick(() => {
          this.show = true;
        })
      },
    }
  };
</script>

<style lang="scss" scoped>

</style>
