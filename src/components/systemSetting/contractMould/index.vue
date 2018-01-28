<template>
  <div>
    <div class="filter">
      <el-form :inline="true" :model="form" class="demo-Form" size="mini">
        <el-form-item label="业务类型">
          <el-input v-model="form.service"></el-input>
        </el-form-item>
        <el-form-item label="业务类型">
          <el-select v-model="form.service" placeholder="请选择业务类型" clearable>
            <el-option v-for="key in serviceOptions" :label="key.label" :value="key.value" :key="key.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="合同类型" palceholder="请选择合同类型">
          <el-select v-model="form.contract" clearable>
            <el-option v-for="key in contractOptions" :label="key.label" :value="key.value"
                       :key="key.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="float: right;">
          <el-button type="primary" @click="onSubmit"><i class="el-icon-plus"></i>&nbsp;新&nbsp;增</el-button>
        </el-form-item>
      </el-form>
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
  import ReviseModule from './reviseModule'
  import ReviseName from './reviseName'

  export default {
    name: "index",
    components: {ReviseModule, ReviseName},
    data() {
      return {
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
