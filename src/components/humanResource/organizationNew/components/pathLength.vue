<template>
  <div id="pathLength">
    <el-dialog :close-on-click-modal="false" title="查看职级" :visible.sync="dialogVisible" width="36%">
      <div>
        <el-table
          :data="pathTableData"
          :empty-text='pathStatus'
          v-loading="pathLoading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(255, 255, 255, 0)"
          style="width: 100%">
          <el-table-column
            label="职级">
            <template slot-scope="scope">
              <span>{{scope.row.path_length}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="duty.org.name"
            label="部门">
          </el-table-column>
          <el-table-column
            prop="duty.name"
            label="职位">
          </el-table-column>
          <!--<el-table-column-->
          <!--label="下级职位">-->
          <!--<template slot-scope="scope">-->
          <!--<span v-if="scope.row.parent_name">{{scope.row.parent_name}}</span>-->
          <!--<span v-else=""> &nbsp;暂无&nbsp; </span>-->
          <!--</template>-->
          <!--</el-table-column>-->

          <!--<el-table-column-->
          <!--label="职位标识">-->
          <!--<template slot-scope="scope">-->
          <!--<span v-if="scope.row.roles.length" v-for="(item,index) in scope.row.roles">-->
          <!--<span v-if="index === 0">{{item.name}}</span>-->
          <!--</span>-->
          <!--<span v-else>&nbsp;暂无&nbsp;</span>-->
          <!--</template>-->
          <!--</el-table-column>-->
          <el-table-column
            label="人数">
            <template slot-scope="scope">
              <span>{{scope.row.users.length}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="权限">
            <template slot-scope="scope">
              <span style="color: #409EFF;cursor: pointer;" @click.stop="lookPower(scope.row)">查看</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pages block">
        <el-pagination
          @size-change="handlePostSizeChange"
          @current-change="handlePostCurrentChange"
          :current-page="params.page"
          :page-size="params.limit"
          layout="total, prev, pager, next"
          :total="pathNum">
        </el-pagination>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="dialogVisible=false">关 闭</el-button>
      </span>
    </el-dialog>

    <RemovePower :module="removePowerModule" @close="closeRemovePower" :powerData="removePowerData"></RemovePower>
  </div>
</template>

<script>
  import RemovePower from './removePower.vue'   //权限

  export default {
    name: "path-length",
    props: ['module', 'path'],
    components: {RemovePower},
    data() {
      return {
        pathTableData: [],
        removePowerData: [],
        pathNum: 0,
        dialogVisible: false,
        removePowerModule: false,
        pathStatus: ' ',
        pathLoading: false,
        params: {
          limit: 10,
          page: 1,
        }
      }
    },
    mounted() {
    },
    activated() {
    },
    watch: {
      path(val) {
        this.params.page = 1;
        this.getPosition(val);
      },
      module(val) {
        this.dialogVisible = val;
      },
      dialogVisible(val) {
        if (!val) {
          this.$emit('close');
        }
      }
    },
    computed: {},
    methods: {
      getPosition(val) {
        this.pathLoading = true;
        this.pathStatus = ' ';
        this.params.deep = val;
        this.$http.get(globalConfig.server + 'organization/position', {
          params: this.params,
        }).then((res) => {
          this.pathLoading = false;
          if (res.data.code === '20000') {
            this.pathTableData = res.data.data.data;
            this.pathNum = res.data.data.count;
          } else {
            this.notAvailable();
          }
        }).catch(_ => {
          this.notAvailable();
        })
      },
      notAvailable() {
        this.pathNum = 0;
        this.pathTableData = [];
        this.pathStatus = '暂无数据';
      },
      // 查看权限
      lookPower(val) {
        let data = {};
        data.description = val.orgName;
        data.id = val.id;
        data.name = val.name;
        data.parent_id = val.parent_id;
        this.removePowerData = val;
        this.removePowerData.types = 'position';
        this.removePowerData.positions = [];
        this.removePowerData.positions.push(data);
        this.removePowerModule = true;
      },
      closeRemovePower() {
        this.removePowerModule = false;
      },
      //岗位
      handlePostSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handlePostCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.params.page = val;
        this.getPosition(this.params.deep);
      },
    },
  }
</script>

<style lang="scss">
  #pathLength {

  }
</style>
