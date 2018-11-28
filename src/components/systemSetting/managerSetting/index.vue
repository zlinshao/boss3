<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick" class="tabContent">
      <el-tab-pane label="短信模板" name="first">
        <Message></Message>
      </el-tab-pane>
      <!--<el-tab-pane label="登陆日志" name="second">-->
        <!--<LoginRecord></LoginRecord>-->
      <!--</el-tab-pane>-->
      <el-tab-pane label="用户字典" name="third">
        <UserDictionary></UserDictionary>
      </el-tab-pane>
      <el-tab-pane label="权限管理" name="fourth">
        <PowerManage></PowerManage>
      </el-tab-pane>
      <el-tab-pane label="角色管理" name="fifth">
        <RoleManage></RoleManage>
      </el-tab-pane>
      <el-tab-pane label="公司部门管理" name="sixth">
        <CompanyManage></CompanyManage>
      </el-tab-pane>
      <el-tab-pane label="显示管理" name="seventh">
        <FeatureList></FeatureList>
      </el-tab-pane>
      <!--<el-tab-pane label="部门管理" name="eighth">-->
        <!--<RenewPart></RenewPart>-->
      <!--</el-tab-pane>-->
      <!-- <el-tab-pane label="小区管理" name="sixth">-->
        <!--<VillageManage></VillageManage>-->
      <!--</el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
  import Message from './message/index.vue'
  import LoginRecord from './loginRecord/index.vue'
  import UserDictionary from './userDictionary/index.vue'
  import RoleManage from './roleManage/index.vue'
  import PowerManage from './powerManage/index.vue'
  import VillageManage from './villageManage/index.vue'
  import CompanyManage from './companyManage/index.vue'
  import FeatureList from './featureList/index';
  import RenewPart from './renewPart/index';
  export default {
    name: "index",
    components: {Message, LoginRecord, UserDictionary, PowerManage, VillageManage, RoleManage,CompanyManage,FeatureList,RenewPart},
    data() {
      return {
        activeName: 'first'
      }
    },
    mounted() {
    },
    watch: {},
    methods: {
      handleClick(val) {

      }
    },
  }
</script>

<style lang="scss">
  .tabContent {
    .el-tabs__content {
      overflow: visible;
    }
  }
</style>
