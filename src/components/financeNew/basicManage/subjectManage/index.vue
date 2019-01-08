<template>
  <div @click="show=false" @contextmenu="closeMenu">
    <div class="highRanking">
      <div class="highSearch">
        <el-form :model="form" :inline="true" size="mini">
          <el-form-item>
            <el-input
              placeholder="请输入内容"
              v-model="form.search"
              size="mini" clearable
              @keyup.enter.native="getTableData"
            >
              <el-button slot="append" icon="el-icon-search" @click="getTableData"></el-button>

            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="openSubject"><i class="el-icon-plus"></i>&nbsp;新增科目</el-button>
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
                  <div class="el_col_label">所有归属</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-select v-model="form.belong">
                      <el-option v-for="(belong,key) in subjects" :key="key" :value="key" :label="belong"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">所有类型</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-select v-model="form.er_type" size="mini" clearable>
                      <el-option v-for="item in typeValue" :label="item.label" :value="item.value"
                                 :key="item.value"></el-option>
                    </el-select>
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

    <el-table
      :empty-text='collectStatus'
      v-loading="collectLoading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(255, 255, 255, 0)"
      :data="tableData"
      width="100%"
      @row-contextmenu="houseMenu">
      <el-table-column
        label="创建时间"
        prop="create_time"
      >
      </el-table-column>
      <el-table-column
        label="归属"
        prop="superior_title">
      </el-table-column>
      <el-table-column
        label="科目"
        prop="title">
      </el-table-column>
      <el-table-column
        label="类型"
        prop="type">
      </el-table-column>
      <el-table-column
        label="更新时间"
        prop="update_time"
      >
      </el-table-column>
      <el-table-column
        label="备注"
        prop="remark">
      </el-table-column>
    </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[12,20, 50, 100]"
        :page-size="12"
        layout="total, prev, pager, next"
        style="text-align: right"
        :total="totalNum">
      </el-pagination>
    <!--右键-->
    <RightMenu :startX="rightMenuX+'px'" :startY="rightMenuY+'px'" :list="lists" :show="show"
               @clickOperateMore="clickEvent"></RightMenu>

    <SubjectModule :FormVisible="addSubjectModule" @close="closeSubject" :data="detailData"
                   :cate="cate"></SubjectModule>
    <subjectTree :subjectDialog="subjectVisible" :types="subjectType" @close="closeSubjectTree"
                 @selectSubject="selectSubject"></subjectTree>
  </div>
</template>

<script>

  import RightMenu from '../../../common/rightMenu.vue'    //右键
  import SubjectModule from './subjectModule.vue'
  import subjectTree from '../../components/subjectTree.vue'

  export default {
    name: "index",
    components: {RightMenu, SubjectModule, subjectTree},
    data() {
      return {
        collectStatus: ' ',
        collectLoading: false,
        rightMenuX: 0,
        rightMenuY: 0,
        show: false,
        lists: [],
        totalNum: 0,
        isHigh: false,
        currentPage: 1,
        addSubjectModule: false,
        form: {
          belong: '',
          er_type: '',
          search: '',
          page: 1,
          limit: 12,
          belongName: ''
        },
        subjectVisible: false,
        belongValue: [],
        typeValue: [{
          value: 1,
          label: '收入',
        }, {
          value: 2,
          label: '支出',
        }, {
          value: 3,
          label: '混合',
        }],
        tableData: [],
        subjectType: 'top',
        detailData: {},
        cate: 'add',
        subjects: []
      }
    },
    mounted() {
      this.getTableData();
      this.getSubjects();
    },
    watch: {},
    methods: {
      getSubjects() {
        this.$http.get(globalConfig.finance_server + 'account/subject/next/0').then(res => {
          if (res.data.success) {
            this.subjects = res.data.data;
          }
        }).catch(err => {
          console.log(err);
        })
      },
      getTableData() {
        this.collectLoading = true;
        this.collectStatus = ' ';
        let params = this.form;
        this.$http.get(globalConfig.finance_server + 'account/subject/index', {params: params}).then((res) => {
          console.log(res);
          this.isHigh = false;
          this.collectLoading = false;
          if (res.data.success) {
            this.tableData = res.data.data.data;
            this.totalNum = res.data.data.count;
          } else {
            this.collectStatus = '暂无数据';
            this.tableData = [];
            this.totalNum = 0;
          }
        });
      },
      // 重置
      resetting() {
        this.form.search = '';
        this.form.belong = '';
        this.form.belongName = '';
        this.form.er_type = '';
      },
      // 高级筛选
      highGrade() {
        this.isHigh = !this.isHigh;
      },

      openSubject() {
        this.addSubjectModule = true;
      },
      closeSubject(val) {
        if (val == 'success') {
          this.getTableData();
        }
        this.addSubjectModule = false;
        this.detailData = {};
      },
      closeSubjectTree() {
        this.subjectVisible = false;
      },
      clearSubjectTree() {
        this.form.belong = '';
        this.form.belongName = '';
      },
      openSubjectTree() {
        this.subjectType = 'top';
        this.subjectVisible = true;
      },
      selectSubject(val) {
        this.form.belong = val.id;
        this.form.belongName = val.name;
      },
      handleSizeChange(val) {
        this.form.limit = val;
        this.form.page = 1;
        this.getTableData();
      },
      handleCurrentChange(val) {
        this.form.page = val;
        this.getTableData();
      },
      // 右键
      houseMenu(row, event) {
        this.lists = [
          {clickIndex: 'revise', headIcon: 'el-icon-edit-outline', label: '修改', data: row},
          {clickIndex: 'delete', headIcon: 'el-icon-circle-close-outline', label: '删除', data: row},
        ];
        this.contextMenuParam(event);
      },
      // 右键回调
      clickEvent(index) {
        if (index.clickIndex === 'delete') {
          this.openDelete(index.data.id);
        } else {
          this.detailData = index.data;
          this.cate = 'edit';
          this.openSubject();
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
          this.show = true
        })
      },
      // 删除
      openDelete(id) {
        this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.get(globalConfig.finance_server + 'account/subject/delete/' + id).then((res) => {
            if (res.data.success) {
              this.$notify.success({
                type: '成功',
                message: res.data.message
              });
              this.getTableData();
            } else {
              this.$notify.warning({
                title: '失败',
                message: res.data.message
              })
            }
          });
        }).catch(() => { });
      }
    },
  }
</script>

<style lang="scss">

</style>
