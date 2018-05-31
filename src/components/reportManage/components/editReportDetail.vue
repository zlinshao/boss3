<template>
  <div id="reportDetail">
    <el-dialog :close-on-click-modal="false" title="报备详情" :visible.sync="reportVisible" width="70%"
               class="reportDialog">
      <div
        style="width: 90%;"
        v-loading="fullLoading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255, 255, 255, 0)">
      </div>

      <el-form size="mini" label-width="110px">
        <el-row v-if="JSON.stringify(show_content) !== '{}'">
          <el-col :span="18">
            <div class="personalInfo">
              <div class="personalA">
                <p>
                  <img :src="personal.avatar" v-if="personal.avatar !== '' && personal.avatar !== null">
                  <img src="../../../assets/images/head.png" v-else>
                </p>
                <span>{{personal.name}}<span v-for="(key,index) in personal.org"
                                             v-if="index === 0">-{{key.name}}</span></span>
              </div>
              <div class="auditStatus" v-if="placeFalse" @click="approvePersonal"><i class="iconfont icon-shenpi1"></i>&nbsp;{{place.display_name}}
              </div>
              <div class="auditStatus deal" v-if="placeFalse"><i class="iconfont icon-yanqi--"></i>&nbsp;{{deal}}
              </div>
              <div class="statuss"
                   :class="{'statusSuccess':place.status === 'published', 'statusFail':place.status === 'rejected', 'cancelled':place.status === 'cancelled'}"></div>
            </div>
            <div class="scroll_bar">
              <el-row>
                <el-col :span="12" v-for="(key,index) in show_content" :key="index"
                        v-if="printScreen.indexOf(index) === -1">
                  <el-form-item v-if="!Array.isArray(key)" :label="index" class="detailTitle">
                    <div class="special" v-if="index !== '房屋类型'">{{key}}</div>
                    <div class="special" v-if="index === '房屋类型'">{{key.name}}</div>
                  </el-form-item>
                  <el-form-item v-if="Array.isArray(key)" :label="index">
                    <div class="special">
                      <span v-if="index === '定金和收款方式' || index === '补交定金和收款方式'" v-for="item in key">{{item}}</span>
                      <span v-else>
                        <span style="margin-right: 20px;color: #409EFF">{{item.msg}}</span>
                        <span>{{item.period}}</span>
                      </span>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="24" v-else>
                  <el-form-item :label="index">
                    <div class="special imgs">
                <span v-for="(p,index) in key">
                  <img data-magnify="" data-caption="图片查看器" :data-src="p.uri" :src="p.uri" v-if="!p.is_video">
                  <video :src="p.uri" controls v-if="p.is_video" width="120px" height="80px"></video>
                </span>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="6" style="padding-left: 6px;">
            <div>
              <div class="commentTop">
                <el-dropdown  @command="handleCommand">
                  <span class="el-dropdown-link">
                    <div style="font-size: 16px;font-weight: normal;color: #606266;cursor: pointer">
                      {{defaultItem}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </div>
                  </span>
                  <el-dropdown-menu slot="dropdown" trigger="click">
                    <el-dropdown-item command="修改报备"> 修改报备 </el-dropdown-item>
                    <el-dropdown-item command="相关信息"> 相关信息 </el-dropdown-item>
                    <el-dropdown-item command="评论信息"> 评论信息 </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
              <div class="scroll_bar">

              </div>
            </div>
          </el-col>
        </el-row>
        <div v-if="!fullLoading && JSON.stringify(show_content) === '{}'" style="text-align: center">无相关记录</div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import UpLoad from '../../common/UPLOAD.vue'

  export default {
    name: "report-detail",
    props: ['module', 'ids'],
    components: {UpLoad},
    data() {
      return {
        address: globalConfig.server_user,
        fullLoading: false,
        reportVisible: false,
        show_content: {},
        operation: {},
        commentList: [],
        paging: 0,
        printScreen: ['款项结清截图', '特殊情况领导截图', '特殊情况截图', '特殊情况同意截图', '领导报备截图', '凭证截图', '合同照片', '截图', '领导同意截图', '房屋影像', '房屋照片', '退租交接单'],
        videoSrc: '',

        personal: {},
        place: {},
        placeStatus: ['published', 'rejected', 'cancelled'],
        processId: '',
        currentPage: 1,
        placeFalse: false,
        commentVisible: false,
        isClear: false,
        picStatus: true,
        form: {
          operation: '',
          comment: '',
          album: [],
        },
        deal: '',
        role_name: [],
        showContent: false,

        defaultItem: '修改报备',
      }
    },

    watch: {
      checkTv(val) {
        this.videoSrc = val;
      },
      module(val) {
        this.reportVisible = val;
      },
      ids(val) {
        if (this.processId !== val) {
          this.show_content = {};
          this.processId = val;
          this.process(val);
        }
      },
      reportVisible(val) {
        if (!val) {
          this.$emit('close');
        }
      },
      commentVisible(val) {
        if (!val) {
          this.close_();
        }
      }
    },
    methods: {
      // 审批人信息
      approvePersonal() {
        if (this.place.auditors) {
          this.role_name = this.place.auditors;
          this.showContent = true;
        }
      },
      process(val) {
        this.fullLoading = true;
        this.$http.get(this.address + 'process/' + val).then((res) => {
          this.fullLoading = false;
          if (res.data.status === 'success' && res.data.data.length !== 0) {
            this.show_content = JSON.parse(res.data.data.process.content.show_content_compress);
            this.operation = res.data.data.operation;
            this.deal = res.data.data.deal;

            let pro = res.data.data.process;
            this.personal = pro.user;
            this.place = pro.place;
            this.placeFalse = this.placeStatus.indexOf(pro.place.status) === -1 ? true : false;
          } else {
            this.show_content = {};
            this.operation = {};
          }
        });
        this.comments(val, 1);
      },

      myData(val) {
        this.comments(this.processId, val);
      },
      comments(val, page) {
        this.$http.get(this.address + 'comments', {
          params: {
            id: val,
            page: page,
          }
        }).then((res) => {
          if (res.data.status === 'success' && res.data.data.length !== 0) {
            this.commentList = res.data.data;
            this.paging = res.data.meta.total;
          } else {
            this.commentList = [];
            this.paging = 0;
          }
        })
      },

      commentOn(val) {
        this.form.operation = val;
        this.commentVisible = true;
      },


      close_() {
        this.isClear = true;
        setTimeout(() => {
          this.isClear = false;
        });
        $('.imgItem').remove();
        this.commentVisible = false;
        this.form.operation = '';
        this.form.comment = '';
        this.form.album = [];
      },

      //-------------------------相关报备信息-----------------------------//
      handleCommand(command){
        this.defaultItem = command;
      },
    },
  }
</script>

<style lang="scss" scoped>
  #reportDetail {
    @mixin border_($n) {
      -webkit-border-radius: $n;
      -moz-border-radius: $n;
      border-radius: $n;
    }
    @mixin flex {
      display: flex;
      display: -webkit-flex;
    }

    @mixin overflow {
      overflow: hidden;
      -ms-text-overflow: ellipsis;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    @mixin scale($p) {
      -moz-transform: scale($p, $p);
      -webkit-transform: scale($p, $p);
      -o-transform: scale($p, $p);
      transform: scale($p, $p);
    }
    @keyframes manger {
      from {
        @include scale(8);
      }
      to {
        @include scale(1);
      }
    }

    @-moz-keyframes manger {
      from {
        @include scale(8);
      }
      to {
        @include scale(1);
      }
    }

    @-webkit-keyframes manger {
      from {
        @include scale(8);
      }
      to {
        @include scale(1);
      }
    }

    @-o-keyframes manger {
      from {
        @include scale(8);
      }
      to {
        @include scale(1);
      }
    }

    .reportDialog {
      .el-dialog {
        margin-top: 8vh !important;
      }
    }
    /*报备状态*/
    .personalInfo {
      @include flex;
      align-items: center;
      border-bottom: 1px solid #eee;
      margin-bottom: 6px;
      height: 80px;
      .personalA {
        @include flex;
        align-items: center;
        font-size: 16px;
        p {
          width: 40px;
          height: 40px;
          margin-right: 12px;
          img {
            width: 100%;
            height: 100%;
            @include border_(50%);
          }
        }
      }
      .auditStatus {
        color: #409EFF;
        margin-left: 30px;
        font-size: 16px;
        cursor: pointer;
      }
      .deal {
        color: #949494;
      }
      .statuss {
        margin-left: 30px;
        width: 80px;
        height: 80px;
      }
      .statusSuccess {
        background: url('../../../assets/images/tongguo.png') no-repeat;
      }
      .statusFail {
        background: url('../../../assets/images/shibai.png') no-repeat;
      }
      .cancelled {
        background: url('../../../assets/images/chexiao.png') no-repeat;
      }
      .statusSuccess, .statusFail, .cancelled {
        margin-top: -12px;
        background-size: 100% 100%;
        @include scale(1);
        -webkit-animation: manger .6s ease-in-out;
        -o-animation: manger .6s ease-in-out;
        animation: manger .6s ease-in-out;
      }
    }

    /*审批人*/
    .showContent {
      @include flex;
      align-items: center;
      width: 50%;
      float: left;
      .contentP {
        min-width: 40px;
        max-width: 40px;
        height: 40px;
        margin-right: 12px;
        img {
          width: 100%;
          height: 100%;
          @include border_(50%);
        }
      }
      div {
        P {
          margin: 0;
        }
      }
    }

    /*评论*/
    .commentTop {
      font-weight: bold;
      color: #101010;
      font-size: 16px;
      height: 80px;
      box-sizing: border-box;
      padding-top: 30px;
      border-bottom: 1px solid #eeeeee;
    }
    .commentContent {
      @include flex;
      justify-content: space-between;
      .commentA, .commentB {
        line-height: 36px;
        height: 36px;
      }
      .commentA {
        @include overflow;
        span {
          display: inline-block;
          vertical-align: middle;
        }
        .headSculpture {
          min-width: 36px;
          max-width: 36px;
          min-height: 36px;
          max-height: 36px;
          img {
            width: 35px;
            height: 35px;
            @include border_(50%);
          }
        }
      }
      .commentB {
        min-width: 80px;
        text-align: right;
      }
    }
    .commentC {
      color: #000;
      margin-left: 40px;
      div {
        @include flex;
        flex-wrap: wrap;
        p {
          width: 40px;
          height: 40px;
          margin: 12px 12px 0 0;
          overflow: hidden;
          img {
            max-width: 40px;
          }
        }
      }
    }

    .block.pages {
      .el-input {
        width: 50px;
      }
    }

    .detailTitle {
      label {
        line-height: 15px;
        height: 30px;
        @include flex;
        align-items: center;
        justify-content: flex-end;
      }
    }

    .special {
      min-height: 32px;
      padding: 0 20px;
      background-color: #eef3fc;
      @include border_(6px);
      img {
        width: 120px;
        height: 80px;
        margin: 10px 0 0 10px;
        @include border_(6px);
      }
    }
    .special.imgs {
      padding: 0;
    }
    .scroll_bar {
      padding-right: 10px;
      overflow-x: auto;
      .form_border {
        padding: 15px;
        border: 1px solid #dfe6fb;
        @include border_(6px);
        margin-bottom: 12px;
      }
    }
  }
</style>
