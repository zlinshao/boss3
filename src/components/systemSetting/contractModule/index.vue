<template>
  <div>
    <div class="highRanking">
      <div class="highSearch">
        <el-form :model="form" :inline="true" size="mini">
          <el-form-item>
            <el-input placeholder="请输入内容" v-model="form.keyWords" size="mini" clearable>
              <el-button slot="append" icon="el-icon-search"></el-button>
              <!--<el-button slot="append" icon="el-icons-fa-bars"></el-button>-->
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="highGrade">高级</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit"><i class="el-icon-plus"></i>&nbsp;新&nbsp;增</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="filter high_grade" :class="isHigh? 'highHide':''">
        <el-form :inline="true" onsubmit="return" :model="form" size="mini" label-width="100px">
          <div class="filterTitle">
            <i class="el-icons-fa-bars"></i>&nbsp;&nbsp;高级搜索
          </div>
          <el-row class="el_row_border">
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">业务类型</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-input v-model="form.service" placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">业务类型</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item>
                    <el-form-item>
                      <el-select v-model="form.service" placeholder="请选择" clearable>
                        <el-option v-for="key in serviceOptions" :label="key.label" :value="key.value" :key="key.value"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row class="el_row_border">
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <div class="el_col_label">合同类型</div>
                </el-col>
                <el-col :span="16" class="el_col_option">
                  <el-form-item palceholder="请选择">
                    <el-select v-model="form.contract" clearable>
                      <el-option v-for="key in contractOptions" :label="key.label" :value="key.value"
                                 :key="key.value"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <div class="btnOperate">
            <el-button size="mini" type="primary">搜索</el-button>
            <el-button size="mini" type="primary" @click="resetting">重置</el-button>
            <el-button size="mini" type="primary" @click="highGrade">取消</el-button>
          </div>
        </el-form>
      </div>
    </div>

    <el-table :data="tableData">
      <el-table-column
        prop="name"
        label="合同名称">
      </el-table-column>
      <el-table-column
        prop="address"
        label="合同路径">
      </el-table-column>
      <el-table-column
        prop="serviceType"
        label="业务类型">
      </el-table-column>
      <el-table-column
        prop="contractType"
        label="合同类型">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            @click="openContract(scope.$index, scope.row)">
            修改模板
          </el-button>
          <el-button
            size="mini"
            type="text"
            @click="openName(scope.$index, scope.row)">
            修改合同名称
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="auditing"
        label="审核状态">
      </el-table-column>
    </el-table>

    <div class="block pages">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[20, 100, 200, 300, 400]"
        :page-size="20"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </div>

    <ReviseModule :module="contractVisible" @close="closeContract"></ReviseModule>

    <ReviseName :module="nameVisible" @close="closeName"></ReviseName>
  </div>
</template>

<script>
  import ReviseModule from './components/reviseModule'
  import ReviseName from './components/reviseName'

  export default {
    name: "index",
    components: {ReviseModule, ReviseName},
    data() {
      return {
        isHigh: false,
        currentPage: 1,
        form: {
          service: '',
          contract: '',
        },
        serviceOptions: [
          {
            value: '1',
            label: '整租'
          }, {
            value: '2',
            label: '合组'
          }
        ],
        contractOptions: [
          {
            value: '1',
            label: '房东'
          }, {
            value: '2',
            label: '租客'
          }
        ],
        tableData: [
          {
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
            serviceType: '整租',
            contractType: '房东',
            auditing: '审核通过',
          }, {
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
            serviceType: '整租',
            contractType: '房东',
            auditing: '审核通过',
          }, {
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
            serviceType: '整租',
            contractType: '房东',
            auditing: '审核通过',
          }, {
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
            serviceType: '整租',
            contractType: '房东',
            auditing: '审核失败',
          }, {
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
            serviceType: '整租',
            contractType: '房东',
            auditing: '审核失败',
          },
        ],
        contractVisible: false,
        nameVisible: false,
      }
    },
    mounted() {
    },
    watch: {},
    methods: {
      // 重置
      resetting() {
        this.form.keywords = '';
      },
      // 高级筛选
      highGrade() {
        this.isHigh = !this.isHigh;
      },
      openContract(val, row) {
        console.log(val, row);
        this.contractVisible = true;
      },
      closeContract() {
        this.contractVisible = false;
      },

      openName(val, row) {
        console.log(val, row);
        this.nameVisible = true;
      },
      closeName() {
        this.nameVisible = false;
      },
      onSubmit() {
        this.contractVisible = true;
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
    },
  }
</script>

<style lang="scss">

</style>
