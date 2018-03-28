<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick(activeName)">
      <el-tab-pane label="乐伽大学" name="first">
        <lejiaCollege></lejiaCollege>
      </el-tab-pane>
      <el-tab-pane label="公司门户" name="second">
        <companyPortal></companyPortal>
      </el-tab-pane>
      <el-tab-pane label="员工广场" name="third">
        <staffSquare></staffSquare>
      </el-tab-pane>
      <el-tab-pane label="制度管理" name="fourth">
        <systemManageMent></systemManageMent>
      </el-tab-pane>

    </el-tabs>
    <el-button type="success" size="mini" @click="openModalDialog('instructionDialog')" class="user_introction">
      <i class="el-icon-tickets"></i>&nbsp;功能说明
    </el-button>
    <Instruction :instructionDialog="instructionDialog" @close="closeModal"></Instruction>
  </div>
</template>

<script>
  import LejiaCollege from './lejiaCollege/index.vue';
  import CompanyPortal from './companyPortal/index.vue';
  import StaffSquare from './staffSquare/index.vue';
  import SystemManageMent from './systemManageMent/index.vue';
  import Instruction from '../../rentManage/wholeRentManage/components/instruction.vue'            //使用说明

  export default {
    name: "index",
    components: {
      StaffSquare,
      LejiaCollege,
      CompanyPortal,
      SystemManageMent,
      Instruction,
    },
    data() {
      return {
        activeName: 'first',
        moduleType: 'lejiaCollege',
        instructionDialog: false,
      }
    },
    mounted() {
      if (this.$route.query.tabs !== undefined) {
        this.activeName = this.$route.query.tabs;
      }
      switch (this.activeType) {
        case 'lejiaCollege':
          this.activeName = 'first';
          break;
        case 'companyPortal':
          this.activeName = 'second';
          break;
        case 'staffSquare':
          this.activeName = 'third';
          break;
        case 'systemManageMent':
          this.activeName = 'fourth';
          break;
      }
    },
    watch: {
      moduleType(val){
        this.$store.dispatch('moduleType',this.moduleType);
      }
    },
    computed: {
      activeType() {
        return this.$store.state.article.module_type;
      }
    },
    methods: {
      openModalDialog(type) {
        switch (type) {
          case 'instructionDialog':   //说明书
            this.instructionDialog = true;
            break;
        }
      },
      closeModal() {
        this.instructionDialog = false;
      },
      handleClick(val) {
        switch (val) {
          case 'first':
            this.moduleType = 'lejiaCollege';
            break;
          case 'second':
            this.moduleType = 'companyPortal';
            break;
          case 'third':
            this.moduleType = 'staffSquare';
            break;
          case 'fourth':
            this.moduleType = 'systemManageMent';
            break;
        }
      }
    },
  }
</script>

<style scoped>
  .user_introction{
    position: absolute;
    top: 122px;
    right: 42px;
  }

</style>
