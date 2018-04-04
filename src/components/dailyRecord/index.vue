<template>
  <div id="dailyRecord">
    <div class="topTabs">
      <el-tabs v-model="activeName" @tab-click="handleClick(activeName)">
        <el-tab-pane label="看日志" name="first" >
          <LookLog @editLog="editLog" :getData="getNewData" ></LookLog>
        </el-tab-pane>
        <el-tab-pane label="发日志" name="second">
          <SendLog @appointLookLog="appointLookLog" :edit="edit" :getData="getNewData"></SendLog>
        </el-tab-pane>
        <el-tab-pane label="日志报表" name="third">
          <LogTable></LogTable>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import LookLog from './lookLog/index.vue';
  import SendLog from './sendLog/index.vue';
  import LogTable from './logTable/index.vue';
  export default {
    name: "index",
    components:{LookLog,SendLog,LogTable},
    data() {
      return {
        form: {},
        active: 0,
        activeName: 'first',
        comments: '',
        edit: '',
        getNewData: '',
      }
    },
    mounted() {
      this.getCurrentTab();
    },
    activated() {
      this.getCurrentTab();
    },
    methods: {
      // tag切换
      handleClick(val) {
        // console.log("index-activeName==="+val);
      },
      getCurrentTab() {
        if (this.$route.query.tabs !== undefined) {
          this.activeName = this.$route.query.tabs;
        }
      },
      appointLookLog() {
        this.activeName = 'first';
        this.getNewData = new Date();
      },
      editLog(val){
        this.activeName = 'second';
        this.edit = val;
      }
    },
    watch: {
      activeName(val) {
        if(val === 'first' || val === 'third'){
          this.edit = '';
        }
        if(val === 'second'){
          this.getNewData = new Date();
        }
      }
    },
  }
</script>

<style scoped lang="scss">
  @mixin flex {
    display: flex;
    display: -webkit-flex;
  }

  @mixin border_radius($n) {
    -webkit-border-radius: $n;
    -moz-border-radius: $n;
    border-radius: $n;
  }

  @mixin minMax {
    min-width: 40px;
    max-width: 40px;
    min-height: 40px;
    max-height: 40px;
  }

  img {
    width: 100%;
    height: 100%;
    @include border_radius(50%);
  }


</style>
