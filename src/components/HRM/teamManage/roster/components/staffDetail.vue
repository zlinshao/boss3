<template>
  <div id="staffDetail"
       v-loading="fullLoading"
       element-loading-text="拼命加载中"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(255, 255, 255, .8)">

    <div style="padding: 60px 0 20px 100px;border-bottom: 1px solid #DBDBDB;color: #7696fb;font-size: 20px;">
      <span style="border-left: 6px solid #7696fb;padding-left: 20px;">方圆</span>
    </div>
    <div style="margin: 60px;">
      <!--<div style="padding-left: 60px">-->
      <!--<el-steps direction="vertical" :active="1">-->
      <!--<el-step title="基本信息"></el-step>-->
      <!--<el-step title="辅助信息"></el-step>-->
      <!--<el-step title="奖惩记录" description="这是一段很长很长很长的描述性文字"></el-step>-->
      <!--</el-steps>-->
      <!--</div>-->
      <el-form :inline="true" size="mini" label-width="100px" v-if="!fullLoading">
        <div
          style="padding:0 0 10px 100px;border-bottom: 1px solid #DBDBDB;margin: 20px 0;color: #409EFF;font-size: 16px;">
          <b style="border: 2px solid #7696fb;border-radius: 6px;"></b><span style="padding-left: 10px;">基本信息</span>
        </div>
        <div class="staffInfo">
          <div class='formList' v-for="(key,index) in basicInfo">
            <el-form-item :label="key" v-if="index !== 'entry_type' && index !== 'entry_mess'">
              <div class="showTitles">{{getStaffDetai l[index]}}</div>
            </el-form-item>
            <el-form-item :label="key" v-else-if="index === 'entry_type'">
              <div class="showTitles">{{allDict.entry_way[getStaffDetail[index]]}}</div>
            </el-form-item>
            <el-form-item :label="key" v-else-if="getStaffDetail.entry_type === 11">
              <div class="showTitles">{{getStaffDetail[index]}}</div>
            </el-form-item>
          </div>
        </div>
        <div
          style="padding:0 0 10px 100px;border-bottom: 1px solid #DBDBDB;margin: 20px 0;color: #409EFF;font-size: 16px;">
          <b style="border: 2px solid #7696fb;border-radius: 6px;"></b><span style="padding-left: 10px;">辅助信息</span>
        </div>
        <div class="staffInfo">
          <div class='formList' v-for="key in 40">
            <el-form-item label="籍贯">
              <div class="showTitles">{{getStaffDetail.real_name}}</div>
            </el-form-item>
          </div>
        </div>
        <div
          style="padding:0 0 10px 100px;border-bottom: 1px solid #DBDBDB;margin: 20px 0;color: #409EFF;font-size: 16px;">
          <b style="border: 2px solid #7696fb;border-radius: 6px;"></b><span style="padding-left: 10px;">奖惩记录</span>
        </div>
        <div class="staffInfo">
          <div class='formList' v-for="key in 40">
            <el-form-item label="籍贯">
              <div class="showTitles">{{getStaffDetail.real_name}}</div>
            </el-form-item>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" type="primary">关&nbsp;闭</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>

  export default {
    name: "add-staff",
    data() {
      return {
        url: globalConfig.server,
        fullLoading: false,
        basicInfo: {},
        getStaffDetail: {}, //员工详情
        user_id: this.$route.query.id, //合同Id
        allDict: {
          gender: {},             //性别
          marital_status: {},     //婚姻状况
          fertility_status: {},   //生育状况
          political_status: {},   //政治面貌
          duty: {},               //职务
          position: {},           //职位
          city: {},               //城市
          education: {},          //学历
          level: {},              //级别

          position_status: {},    //当前在职状态
          formal_status: {},      //转正类型
          job_type: {},           //员工类型
          job_status: {},         //员工状态
          entry_way: {},         //入职途径
          typeCategory: {},       //奖惩记录
        },
      }
    },
    created() {
      this.dict();
    },
    mounted() {
      this.getDetail();
    },
    activated() {
    },
    watch: {},
    computed: {},
    methods: {
      getAllDict(view, key, val = 'local') {
        if (val === 'local') {
          for (let item of view) {
            this.allDict[key][item.id] = item.name;
          }
          return;
        }
        for (let item of view) {
          this.allDict[key][item.id] = item.dictionary_name;
          if (item.variable) {
            this.allDict[key][item.variable.city_id] = item.dictionary_name;
          }
        }
      },
      // 字典
      dict() {
        return new Promise((resolve, reject) => {
          this.basicInfo = rosterBasicInfo;
          this.getAllDict(position_status, 'position_status');
          this.getAllDict(formal_status, 'formal_status');
          this.getAllDict(job_type, 'job_type');
          this.getAllDict(job_status, 'job_status');
          this.getAllDict(entry_ways, 'entry_way');
          this.getAllDict(typeCategory, 'typeCategory');

          this.dictionary(228, 1).then(res => {// 性别
            this.getAllDict(res.data, 'gender', 'dict');
          });
          this.dictionary(231, 1).then(res => {// 生育状况
            this.getAllDict(res.data, 'fertility_status', 'dict');
          });
          this.dictionary(33, 1).then(res => {// 婚姻状况
            this.getAllDict(res.data, 'marital_status', 'dict');
          });
          this.dictionary(38, 1).then(res => {// 政治面貌
            this.getAllDict(res.data, 'political_status', 'dict');
          });
          this.dictionary(306, 1).then(res => {// 城市
            this.getAllDict(res.data, 'city', 'dict');
          });
          this.dictionary(39, 1).then(res => {// 城市
            this.getAllDict(res.data, 'education', 'dict');
          });
          this.dictionary(234, 1).then(res => {// 级别
            this.getAllDict(res.data, 'level', 'dict');
          });
          resolve(true);
        });
      },
      getDetail() {
        this.dict().then((status) => {
          if (status) {
            this.$http.get(this.url + 'hrm/User/userInfo?user_id=' + this.user_id).then(res => {
              if (res.data.success) {
                this.handleData(res.data.data);
              } else {
                this.prompt('warning', res.data.msg);
              }
            });
          }
        });
      },
      handleData(res) {
        for (let item of Object.keys(this.basicInfo)) {
          switch (item) {
            case 'recommender':
              this.$http.get(this.url + 'hrm/User/getName?id=' + res.recommender).then(res => {
                if (res.data.success) {
                  this.getStaffDetail[item] = res.data.name;
                } else {
                  this.getStaffDetail[item] = '';
                }
              });
              break;
            default:
              for (let key of  Object.keys(this.allDict)) {
                switch (key) {
                  case 'entry_way':
                    let data = JSON.parse(res.entry_way);
                    res.entry_type = data.entry_type;
                    res.entry_mess = data.entry_mess;
                    break;
                  default:
                    if (this.basicInfo[key]) {
                      if (this.allDict[key][res[key]]) {
                        res[key] = this.allDict[key][res[key]];
                      }
                    }
                    break;
                }
              }
              break;
          }
        }
        this.getStaffDetail = res;
      },
    },
  }
</script>

<style lang="scss">
  #staffDetail {
    background-color: #fff;
    height: 100%;
    .el-step__title.is-finish {
      min-width: 77px;
    }
    .staffInfo {
      display: flex;
      display: -webkit-flex;
      flex-wrap: wrap;
      align-items: center;
      .formList {
        width: 33%;
      }
      .list2 {
        width: 66%;
      }
      .list3 {
        width: 99%;
      }
      label {
        min-width: 100px;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        justify-content: flex-end;
        color: #bcbcbd;
      }
      .showTitles {
        width: 100%;
        min-height: 32px;
        background: #eef3fc;
        border-radius: 4px;
        font-size: 12px;
        color: #727479;
        padding: 3px 12px;
      }
    }
    .el-form-item, .el-form-item__content {
      width: 100%;
      display: flex;
      display: -webkit-flex;
      .el-radio {
        min-width: 40px;
      }
    }
  }
</style>
