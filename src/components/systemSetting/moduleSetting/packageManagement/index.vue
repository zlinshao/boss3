<template>
  <div class="main">
    <el-form size="small"  label-width="200px">
      <el-row>
        <el-form-item v-for="item in 5" :key="item.id">
          <el-col :span="2" style="color:#409EFF;">业绩包</el-col>
          <el-col :span="10">
            <el-input placeholder="请选择部门" v-model="department"  @focus="selectDepart">
            <template slot="append">
              <div style="cursor: pointer;" @click="emptyDepart">清空</div>
              </template>
            </el-input>
          </el-col>
        </el-form-item>
      </el-row>
    </el-form>

    <span style="color:#fdaece;margin-left:400px;">
      <span>备注：当前剩余 xxx 部门未设置业绩包</span>
      <el-button size="mini" @click="viewDetail" round> 查看详情 </el-button>
    </span>
    <div style="margin-top: 120px;margin-left: 400px;">
      <el-button @click=""  type="primary" size="small" style="padding: 10px 140px;">保存</el-button>
    </div>
    <el-dialog title="未设置套餐部门" :visible.sync="noSetMealDepartVisible" width="30%">

      <el-button size="small" type="primary" @click="noSetMealDepartVisible=false">确 定</el-button>
    </el-dialog>
    <Organization :organizationDialog="organizationDialog" :type="type" @close="closeOrganization" @selectMember="selectMember"></Organization>
  </div>
</template>

<script>
  import Organization from '../../../common/organization.vue';
  export default {
    name: "index",
    components: {Organization},
    data() {
      return {
        organizationDialog: false,
        type: '',
        noSetMealDepartVisible: false,
        department: '',
      }
    },
    mounted() {

    },
    watch: {

    },
    methods: {
      closeOrganization(){
        this.organizationDialog = false;
      },
      selectMember(){

      },
      selectDepart() {
        this.organizationDialog = true;
        this.type = 'depart';
      },
      emptyDepart(){
        this.department = '';
      },
      viewDetail(){
        this.noSetMealDepartVisible = true;
      },
    },
  }
</script>

<style scoped>
  .main {
    padding: 40px 120px;
  }
</style>
