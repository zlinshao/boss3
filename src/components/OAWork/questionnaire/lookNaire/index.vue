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
        <div v-for="(v,k) in quesNaireData.question_set" v-if="k!=157 && k!=158">
          <div class="questionDiv" v-for="(item,key) in v">
            <span style="margin-left: 10px;width: 30px;display: inline-block;">{{item.number}}.</span>
            <span style="color:#6a8dfb;">
              <span v-if="k==153">单选题</span>
              <span v-if="k==154">多选题</span>
              <span v-if="k==155">不定向选择题</span>
              <span v-if="k==156">判断题</span>
            </span>
            <p style="width:96%;margin-left:44px;line-height:30px;padding-left:0;" class="ql-editor"
               v-html="item.stem"></p>
            <el-row :key="index" v-for="(val,index) in item.choice" style="width:96%;margin-left:44px;">
              <span>{{index}}：{{val}}</span><br/>
              <el-row :key="kk" v-for="(vv,kk) in statisticData[item.id] && statisticData[item.id].answer"
                      v-if="kk==index">
                <el-progress style="width:30%;display: inline-block;" :text-inside="true" :stroke-width="18"
                             :percentage="Math.round(vv*100/statisticData[item.id].count)"></el-progress>
                {{vv}}
              </el-row>
              <el-row style="color: #fb4699;padding: 8px 0;font-size: 14px;"
                      v-if="!(statisticData[item.id] && statisticData[item.id].answer)">
                暂无统计数据...
              </el-row>
            </el-row>
          </div>
        </div>
        <div v-for="(v,k) in quesNaireData.question_set" v-if="k==158">
          <div class="questionDiv" v-for="(item,key) in v">
            <span style="margin-left: 10px;width: 30px;display: inline-block;">{{item.number}}.</span>
            <span style="color:#6a8dfb;"><span v-if="k==158">简答题</span></span>
            <p style="width:96%;margin-left:44px;line-height:30px;padding-left:0;" class="ql-editor"
               v-html="item.stem"></p>
            <span @click="openAll(item.id, k)"
                  style="color:rgb(106, 141, 251);cursor: pointer;width:97%;margin-left:2.5%;">查看全部回答</span>


          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

  export default {
    name: "look-naire",
    data() {
      return {
        quesNaireId: '',
        statisticData: [],
        quesNaireData: {},
      };
    },
    activated() {
      this.getQueryData();
      this.getStatisticData();
      this.getQuestionNaireData();
    },
    watch: {},
    methods: {
      openAll(id, k) {
        this.$router.push({
          path: "/answerAll", query: {id: this.quesNaireId, ques_id: id, category: k}
        });
      },
      getQueryData() {
        if (!this.$route.query.id) {
          this.quesNaireId = this.$store.state.quesNaire.naire_stastic_id;
          this.$router.push({path: '/lookNaire', query: {id: this.$store.state.quesNaire.naire_stastic_id}});
        } else {
          this.$store.dispatch('naireStasticId', this.$route.query.id);
          this.quesNaireId = this.$route.query.id;
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
        min-height: 100px;
        padding-top: 16px;
        border-top: 1px #eee solid;
      }
    }
  }
</style>
