<template>
  <div>
    <div id="lookNaire">
      <div class="tool">
        <img width="100%" height="142px" src="../../../../assets/images/preview.png"/>
        <div>
          <span>{{quesNaireData.name}}</span>
          <span style="margin-left: 30px;">{{quesNaireData.question_count}}<span
            style="font-size: 14px;"> 题</span></span>
        </div>
      </div>
      <div class="main">
        <div v-for="(v,k) in quesNaireData.question_set" v-if="k==158 ">
          <div class="questionDiv" v-for="(item,key) in v" v-if="quesId && (item.id == quesId)">
            <span class="category_score">(<span v-if="k==158">简答题</span>)</span>
            <el-row>
              <el-col :span="1" style="width: 50px;margin-top: -2px;">
                <p style="margin-left: 10px;width: 30px;display: inline-block;margin-top: 8px;color: #101010;">{{item.number}}.</p>
              </el-col>
              <el-col :span="15">
                <p style="line-height:30px;color: #101010;" class="ql-editor" v-html="item.stem"></p>
              </el-col>
            </el-row>
            <el-row style="width:96%;margin-left:50px;" v-if="k==158">
              <el-row :key="kk" v-for="(vv,kk) in statisticData[item.id]">
                <div style="line-height: 25px;margin-top: 10px;">{{kk+1}}. {{vv}}</div>
              </el-row>
              <el-row style="color: #fb4699;padding: 8px 0;font-size: 14px;"
                      v-if="!(statisticData[item.id] && statisticData[item.id].length>0)">暂无统计数据......
              </el-row>
            </el-row>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: "index",
    components: {},
    props: ['previewNaireDialog'],
    data() {
      return {
        quesNaireId: '',  //问卷调查的id
        statisticData: [],
        quesNaireData: {},
        quesId: '',  //这道题目的id
        category: '',   //这道题目的题型
      };

    },

    watch: {},
    activated() {
      this.getQueryData();
      this.getStatisticData();
      this.getQuestionNaireData();
    },
    methods: {
      getQueryData() {
        if (!this.$route.query.id) {
          let data = {};
          this.quesNaireId = data.id = this.$store.state.quesNaire.naire_answer_all.id;
          this.quesId = data.ques_id = this.$store.state.quesNaire.naire_answer_all.ques_id;
          this.category = data.category = this.$store.state.quesNaire.naire_answer_all.category;
          this.$router.push({path: '/answerAll', query: data});
        } else {
          this.$store.dispatch('naireAnswerAll', this.$route.query);
          this.quesNaireId = this.$route.query.id;
          this.quesId = this.$route.query.ques_id;
          this.category = this.$route.query.category;
        }
      },
      getQuestionNaireData() {
        this.$http.get(globalConfig.server + 'questionnaire/' + this.quesNaireId).then((res) => {
          if (res.data.code === '30000') {
            this.quesNaireData = res.data.data;
          } else {
            this.quesNaireData = {};
          }
        });
      },
      getStatisticData() {
        this.$http.get(globalConfig.server + 'questionnaire/statistic/' + this.quesNaireId).then((res) => {
          if (res.data.code === '30000') {
            this.statisticData = res.data.data;
          } else {
            this.statisticData = [];
            // this.$notify.warning({
            //   title: '警告',
            //   message: res.data.msg
            // })
          }
        });
      },
    }
  };
</script>

<style lang="scss" scoped>
  .ql-editor {
    min-height: initial !important;
    padding: 0px;
    margin: 0px;
  }

  #lookNaire {
    .tool {
      position: relative;
      div {
        position: absolute;
        left: 0px;
        top: 0px;
        height: 142px;
        line-height: 142px;
        font-size: 24px;
        text-indent: 2%;
        color: #fff;
      }
    }
    .main {
      border: 1px #eee solid;
      margin-bottom: 30px;
      border-top: none;
      min-height: 500px;
      font-size: 16px;
      .questionDiv {
        width: 98%;
        margin-left: 2%;
        margin-bottom: 12px;
        min-height: 90px;
        padding-top: 16px;
        border-top: 1px #eee solid;
        .category_score {
          color: #c0c4cc;
          font-size: 14px;
          float: right;
          margin-right: 10px;
          padding: 3px 8px;
        }
      }
    }
  }
</style>
