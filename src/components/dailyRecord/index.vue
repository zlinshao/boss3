<template>
  <div id="dailyRecord">
    <!--<div class="highRanking">-->
      <!--<div class="tabsSearch">-->
        <!--<el-form :model="form" :inline="true" size="mini">-->
          <!--<el-form-item>-->
            <!--<el-input placeholder="请输入内容" v-model="form.keyWords" size="mini" clearable>-->
              <!--<el-button slot="append" icon="el-icon-search"></el-button>-->
            <!--</el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item>-->
            <!--<el-button type="primary" size="mini" @click="highGrade">高级</el-button>-->
          <!--</el-form-item>-->
        <!--</el-form>-->
      <!--</div>-->
      <!--<div class="filter high_grade" :class="isHigh? 'highHide':''">-->
        <!--<el-form :inline="true" :model="form" size="mini" label-width="100px">-->
          <!--<div class="filterTitle">-->
            <!--<i class="el-icons-fa-bars"></i>&nbsp;&nbsp;高级搜索-->
          <!--</div>-->
          <!--<el-row class="el_row_border">-->
            <!--<el-col :span="12">-->
              <!--<el-row>-->
                <!--<el-col :span="8">-->
                  <!--<div class="el_col_label">物业地址</div>-->
                <!--</el-col>-->
                <!--<el-col :span="16" class="el_col_option">-->
                  <!--<el-form-item>-->
                    <!--<el-form-item>-->
                      <!--<el-input v-model="form.address" placeholder="请输入内容"></el-input>-->
                    <!--</el-form-item>-->
                  <!--</el-form-item>-->
                <!--</el-col>-->
              <!--</el-row>-->
            <!--</el-col>-->
            <!--<el-col :span="12">-->
              <!--<el-row>-->
                <!--<el-col :span="8">-->
                  <!--<div class="el_col_label">物业地址</div>-->
                <!--</el-col>-->
                <!--<el-col :span="16" class="el_col_option">-->
                  <!--<el-form-item>-->
                    <!--<el-form-item label="请选择">-->

                    <!--</el-form-item>-->
                  <!--</el-form-item>-->
                <!--</el-col>-->
              <!--</el-row>-->
            <!--</el-col>-->
          <!--</el-row>-->
          <!--<div class="btnOperate">-->
            <!--<el-button size="mini" type="primary">搜索</el-button>-->
            <!--<el-button size="mini" type="primary" @click="resetting">重置</el-button>-->
            <!--<el-button size="mini" type="primary" @click="highGrade">取消</el-button>-->
          <!--</div>-->
        <!--</el-form>-->
      <!--</div>-->
    <!--</div>-->
    <div class="topTabs">
      <el-tabs v-model="activeName" @tab-click="handleClick(activeName)">
        <el-tab-pane label="看日志" name="first">
          <LookLog></LookLog>
        </el-tab-pane>
        <el-tab-pane label="发日志" name="second">
          <SendLog @appointLookLog="appointLookLog"></SendLog>
        </el-tab-pane>
        <!--<el-tab-pane label="我发出的" name="third">-->
          <!--<MySend></MySend>-->
        <!--</el-tab-pane>-->
        <el-tab-pane label="日志报表" name="third">
          <LogTable></LogTable>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>

  import LookLog from './lookLog/index.vue'
  import SendLog from './sendLog/index.vue'
  import MySend from './mySend/index.vue'
  import LogTable from './logTable/index.vue'
  export default {
    name: "index",
    components:{LookLog,SendLog,MySend,LogTable},
    data() {
      return {
        form: {},
        active: 0,
        activeName: 'first',
        comments: '',
        isHigh: false,
      }
    },
    mounted() {
      this.getCurrentTab();
    },
    activated() {
      this.getCurrentTab();
    },
    methods: {
      // 重置
      resetting() {
        this.form.keywords = '';
      },
      // 高级筛选
      highGrade() {
        this.isHigh = !this.isHigh;
      },
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
