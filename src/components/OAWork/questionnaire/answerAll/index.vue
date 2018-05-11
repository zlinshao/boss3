<template>
  <div>
    <div id="answerAll">
      <div class="tool">
        <img width="100%" height="142px" src="../../../../assets/images/preview.png"/>
        <span>{{quesNaireData.name}}</span>
      </div>
      <div class="main">
        <div class="questionDiv" v-for="(v,k) in quesNaireData.question_set" v-if="k==158 && category==158">
          <div v-for="(item,key) in v">
            {{item.number}}.<span style="color:#6a8dfb; margin-left:20px;">
            <span v-if="k==158 && category==158">简答题</span>
          </span>
            <p style="line-height:30px;width:98%;margin-left:2%;" v-html="item.stem"></p>
            <el-row style="width:98%;margin-left:2%;" v-if="k==158 && category==158">
              <el-row v-if="statisticData[item.id] && statisticData[item.id].answer" :key="kk"
                      v-for="(vv,kk) in statisticData[item.id].answer">
                <span>{{kk}}</span><br/>
                <el-progress style="width:30%;display: inline-block;" :text-inside="true" :stroke-width="18"
                             :percentage="Math.round(vv*100/statisticData[item.id].count)"></el-progress>
                {{vv}}
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
          }
        });
      },
      getStatisticData() {
        this.$http.get(globalConfig.server + 'questionnaire/statistic/' + this.quesNaireId).then((res) => {
          if (res.data.code === '30000') {
            this.statisticData = res.data.data;
          } else {
            this.statisticData = [];
            this.$notify.warning({
              title: '警告',
              message: res.data.msg
            })
          }
        });
      },
    }
  };
</script>

<style lang="scss" scoped>
  #answerAll {
    .tool {
      position: relative;
      span {
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
        margin-bottom: 20px;
        min-height: 154px;
        padding-top: 16px;
        border-top: 1px #eee solid;
        .allAnswer {
          width: 97%;
          margin-left: 2%;
        }
      }
    }
  }
</style>
