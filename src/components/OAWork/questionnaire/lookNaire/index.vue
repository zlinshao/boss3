<template>
  <div>
    <div id="lookNaire" v-if="!message">
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
            <span class="category_score">(
              <span v-if="k==153">单选题</span>
              <span v-if="k==154">多选题</span>
              <span v-if="k==155">不定向选择题</span>
              <span v-if="k==156">判断题</span>
              )</span>
            <el-row>
              <el-col :span="1" style="width: 50px;margin-top: -2px;">
                <p style="margin-left: 10px;width: 30px;display: inline-block;margin-top: 8px;color: #101010;">
                  {{item.number}}.</p>
              </el-col>
              <el-col :span="15">
                <p style="line-height:30px;color: #101010;" class="ql-editor" v-html="item.stem"></p>
              </el-col>
            </el-row>
            <el-row :key="index" v-for="(val,index) in item.choice" style="width:96%;margin-left:50px;">
              <span style="color: #6c6c6c;line-height: 30px;">{{index}}：{{val}}</span><br/>
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
            <span class="category_score">(<span v-if="k==158">简答题</span>)</span>
            <el-row>
              <el-col :span="1" style="width: 50px;margin-top: -2px;">
                <p style="margin-left: 10px;width: 30px;display: inline-block;margin-top: 8px;color: #101010;">
                  {{item.number}}.</p>
              </el-col>
              <el-col :span="15">
                <p style="line-height:30px;color: #101010;" class="ql-editor" v-html="item.stem"></p>
              </el-col>
            </el-row>
            <span @click="openAll(item.id, k)"
                  style="width:96%;margin-left:50px;color:rgb(106, 141, 251);cursor: pointer;">查看全部回答</span>

          </div>
        </div>
      </div>
    </div>
    <div class="container" v-if="message=='no_power'">
      <div class="content">
        <div class="content_img"><img src="../../../../assets/images/examination/no_power.png"></div>
        <div class="content_right" style="padding-left: 260px;">
          <div class="title"><img src="../../../../assets/images/sorry.png"></div>
          <div class="count_down" style="margin-left: 0px;">抱歉，您暂无权限访问该页面~~</div>
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
        message: '',
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
            this.message = '';
          } else if (res.data.code === '30044') {
            this.quesNaireData = {};
            this.message = 'no_power';
          } else {
            this.quesNaireData = {};
            this.message = res.data.msg;
            this.$notify.warning({
              title: '警告',
              message: res.data.msg
            })
          }
        });
      },
      getStatisticData() {
        this.$http.get(globalConfig.server + 'questionnaire/statistic/' + this.quesNaireId).then((res) => {
          if (res.data.code === '30000') {
            this.statisticData = res.data.data;
          } else {
            this.statisticData = [];

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

  .container {
    width: 100%;
    min-height: 800px;
    position: relative;
    box-shadow: 0px 0px 3px 1px #dfe6fb;
    .content {
      display: inline-block;
      position: absolute;
      top: 28%;
      width: 70%;
      left: 30%;
      /*background-color: #dfe6fb;*/
      .content_img {
        float: left;
      }
      .content_right {
        margin-top: 90px;
        padding-left: 300px;
        .title {
          font-size: 35px;
          margin: 0 auto;
          left: 0;
          width: 100%;
          filter: alpha(opacity=30);
          -ms-filter: "alpha(opacity=30)";
          color: rgba(106, 141, 251, 0.75);
        }
        .count_down {
          margin-left: 20px;
          margin-top: 20px;
          font-size: 18px;
          color: #6a8dfb;
        }
      }
    }

  }
</style>
