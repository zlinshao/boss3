<template>
  <div id="personal">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="个人工资" name="first">
       <trader-salary></trader-salary>
      </el-tab-pane>
      <el-tab-pane label="管理人员工资" name="second">
        <manager-salary></manager-salary>
      </el-tab-pane>
      <el-tab-pane label="历史工资" name="third">
        <history-salary></history-salary>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
    import TraderSalary from './components/tradersalary';
    import ManagerSalary from './components/managersalary';
    import historySalary from './components/historySalary.vue';
  export default {
    name: "index",
    components: {TraderSalary,ManagerSalary,historySalary},
    data() {
      return {
        activeName: 'first',
      }
    },
    mounted() {
    },
    watch: {},
    methods: {
      // tabs标签页
      handleClick(tab, event) {
        // console.log(tab, event);
      },

    },
  }
</script>

<style lang="scss">
  #personal {
    .bgColor {
      background: #DDDDDD;
    }
    .el-select .el-input {
      width: 88px;
    }
  }
</style>
