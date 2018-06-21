<template>
  <div id="reportDetail">
    <el-dialog :close-on-click-modal="false" title="报备详情" :visible.sync="reportVisible" width="70%"
               class="reportDialog">
      <div style="min-height: 550px" v-loading="fullLoading"
           element-loading-text="拼命加载中"
           element-loading-spinner="el-icon-loading"
           element-loading-background="rgba(255, 255, 255, 0)">
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
                <div class="auditStatus" v-if="placeFalse" @click="approvePersonal"><i
                  class="iconfont icon-shenpi1"></i>&nbsp;{{place.display_name}}
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
              <div class="commentTop">
                <el-dropdown @command="handleCommand">
                  <span class="el-dropdown-link">
                    <div style="font-size: 16px;font-weight: normal;color: #606266;cursor: pointer">
                      {{defaultItem}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </div>
                  </span>
                  <el-dropdown-menu slot="dropdown" trigger="click">
                    <el-dropdown-item command="评论信息"> 评论信息 </el-dropdown-item>
                    <el-dropdown-item command="相关信息"> 相关信息 </el-dropdown-item>
                    <el-dropdown-item command="报备修改"> 报备修改 </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
              <div class="scroll_bar">
                <!--相关信息-->
                <div v-if="defaultItem === '相关信息'" style="min-height: 300px" v-loading="isLoading"
                     element-loading-text="拼命加载中"
                     element-loading-spinner="el-icon-loading"
                     element-loading-background="rgba(255, 255, 255, 0)">
                  <div v-if="!isLoading && reportAboutData.length === 0" style="text-align: center;font-size: 16px;margin-top: 12px;">暂无相关信息</div>
                  <div v-for="item in reportAboutData" @click="contrast(item)" class="reportItem">
                    <div>
                      <span class="itemLabel">报备类型 : </span>
                      <span class="itemContent">{{item.content.bulletin_name}}</span>
                    </div>
                    <div>
                      <span class="itemLabel">审批状态 : </span>
                      <span class="itemContent">{{item.place.display_name}}</span>
                    </div>
                    <div>
                      <span class="itemLabel">报备人 : </span>
                      <span class="itemContent">{{item.content.department_name}}</span>
                    </div>
                    <div>
                      <span class="itemLabel">所属部门 : </span>
                      <span class="itemContent">{{item.user.name}}</span>
                    </div>
                    <div>
                      <span class="itemLabel">报备时间 : </span>
                      <span class="itemContent">{{item.created_at}}</span>
                    </div>
                  </div>
                </div>
                <!--评论信息-->
                <div v-if="defaultItem === '评论信息'" style="min-height: 300px">
                  <div v-if="commentList.length === 0" style="text-align: center;font-size: 16px;margin-top: 12px;">暂无评论</div>

                  <div v-if="commentList.length !== 0">
                    <div v-for="(key,index) in commentList"  class="reportItem" style="margin-bottom: 12px;">
                      <div class="commentContent">
                        <div class="commentA">
                            <span class="headSculpture">
                               <img :src="key.user.avatar" v-if="key.user.avatar !== '' && key.user.avatar !== null">
                               <img src="../../../assets/images/head.png" v-else>
                            </span>
                          {{key.user.name}}
                          <span v-for="(item,index) in key.user.org" v-if="index === 0">-{{item.name}}</span>
                        </div>
                        <div class="commentB">
                          {{key.created_at}}
                        </div>
                      </div>
                      <div class="commentC">
                          <span>
                            {{key.body}}
                          </span>
                        <div>
                          <p v-for="(p,index) in key.album">
                            <img data-magnify="" data-caption="图片查看器" :data-src="p.uri" :src="p.uri"
                                 v-if="!p.is_video">
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!--报备修改记录-->
                <div v-if="defaultItem === '报备修改'" style="min-height: 300px" v-loading="changeLoading"
                     element-loading-text="拼命加载中"
                     element-loading-spinner="el-icon-loading"
                     element-loading-background="rgba(255, 255, 255, 0)">
                  <div v-if="!changeLoading && editReportData.length < 1" style="text-align: center;font-size: 16px;margin-top: 12px;">暂无报备修改记录</div>
                  <div v-if="editReportData.length > 0">
                    <div v-for="(item,index) in editReportData" :class="{currentChange:changeId == item.id}" class="reportItem" style="margin-bottom: 12px;">
                      <div class="commentContent">
                        <div class="commentA">
                          <span class="headSculpture">
                             <img :src="item.staffs.avatar" v-if="item.staffs.avatar !== '' && item.staffs.avatar !== null">
                             <img src="../../../assets/images/head.png" v-else>
                          </span>
                          {{item.staffs.name}}
                          <span v-for="(item,index) in item.staffs.org" v-if="index === 0">-{{item.name}}</span>
                        </div>
                        <div class="commentB">
                          {{item.create_time}}
                        </div>
                      </div>
                      <div class="diffContent">
                        <div v-for="(value,key) in item.diff">
                          <div v-if="printScreen.indexOf(key) > -1">
                            <div class="title">{{key}} : </div>
                            <div  class="reportChange">
                              由
                              <img v-if="value['由']&&value['由'].length>0" class="changImg" v-for="img in value['由']"  :src="img.uri"
                                   data-magnify="" data-caption="图片查看器" :data-src="img.uri" alt="">
                              <span v-else>无</span>
                              变成
                              <img v-if="value['变成']&&value['变成'].length>0" class="changImg" v-for="pic in value['变成']" :src="pic.uri"
                                   data-magnify="" data-caption="图片查看器" :data-src="pic.uri" alt="">
                              <span v-else>无</span>
                            </div>
                          </div>

                          <div v-else>
                            <div v-if="typeof value === 'string'">
                              <div v-if="key === '房屋类型'">
                                <div class="title">{{key}} : </div>
                                <div class="reportChange">{{value.name}}</div>
                              </div>
                              <div v-if="key !== '房屋类型'">
                                <div class="title">{{key}} : </div>
                                <div class="reportChange">{{value}}</div>
                              </div>
                            </div>
                            <div v-else>
                              <div v-if="key === '定金和收款方式' || key === '补交定金和收款方式'" >
                                <div class="title">{{key}} : </div>
                                <div class="reportChange">
                                  由
                                  <span v-if="value['由']&&value['由'].length>0" v-for="item in value['由']">{{item}}</span>
                                  <span v-else>无</span>
                                  变成
                                  <span v-if="value['变成']&&value['变成'].length>0" v-for="item in value['变成']">{{item}}</span>
                                  <span v-else>无</span>
                                </div>
                              </div>
                              <div v-else>
                                <div class="title">{{key}} : </div>
                                <div class="reportChange">
                                  由
                                  <div v-if="value['由']&&value['由'].length>0" v-for="item in value['由']">
                                    <span style="margin-right: 4px;color: #409EFF">{{item.msg}}</span>
                                    <span>{{item.period}}</span>
                                  </div>
                                  <div v-else>无</div>
                                  变成
                                  <div v-if="value['变成']&&value['变成'].length>0" v-for="item in value['变成']">
                                    <span style="margin-right: 4px;color: #409EFF">{{item.msg}}</span>
                                    <span>{{item.period}}</span>
                                  </div>
                                  <div v-else>无</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
          <div v-if="!fullLoading && JSON.stringify(show_content) === '{}'" style="text-align: center">无相关记录</div>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer" >
        <el-button v-if="!fullLoading && defaultItem === '评论信息'" size="small" type="primary"
                   v-for="(value,key) in operation" :key="key" @click="commentOn(key)">
          {{value}}
        </el-button>
        <!--<el-button size="small" type="primary" v-if="bulletin_array.indexOf(reportDetailData.bulletin_name)>-1" @click="openModal">&ndash;&gt;-->
        <!--修 改-->
        <!--</el-button>-->
      </div>
    </el-dialog>


    <!--评论-->
    <el-dialog :close-on-click-modal="false" title="评论" :visible.sync="commentVisible" width="30%">
      <div class="scroll_bar" style="padding: 0;">
        <el-form size="mini">
          <el-form-item>
            <el-input type="textarea" :rows="4" placeholder="说点什么吧！" v-model="form.comment"></el-input>
          </el-form-item>
          <el-form-item>
            <UpLoad :ID="'comment_pic_edit'" :isClear="isClear" @getImg="getImg"></UpLoad>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="commentVisible = false">关&nbsp;闭</el-button>
        <el-button size="small" type="primary" @click="manager">确定</el-button>
      </div>
    </el-dialog>

    <!--审核人-->
    <el-dialog :close-on-click-modal="false" title="审核人" :visible.sync="showContent" width="30%">
      <div class="scroll_bar" style="padding: 0;">
        <div v-for="key in role_name" class="showContent">
          <p class="contentP">
            <img :src="key.avatar" v-if="key.avatar !== '' && key.avatar !== null">
            <img src="../../../assets/images/head.png" v-else>
          </p>
          <div>
            <p>姓名：{{key.name}}</p>
            <p>手机号：<a>{{key.phone}}</a></p>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="showContent = false">关&nbsp;闭</el-button>
      </div>
    </el-dialog>


    <ContrastReport :contrastDialog="contrastDialog" :selfReport="selfReport"
                    :aboutReportId="aboutReportId" @close="closeModal"></ContrastReport>

    <RentReport :rentReport="rentReport" :reportDetailData="reportDetailData" :processableId="processable_id" @close="closeModal"></RentReport>
  </div>
</template>

<script>
  import UpLoad from '../../common/UPLOAD.vue'
  import ContrastReport from './contrastReport'
  //报备修改
  import RentReport from '../reportRevise/rentReport'

  export default {
    name: "report-detail",
    props: ['module', 'reportId','changeId'],
    components: {UpLoad, ContrastReport,RentReport},
    data() {
      return {
        address: globalConfig.server_user,
        fullLoading: false,
        reportVisible: false,
        rentReport : false,
        show_content: {},
        reportDetailData : {},
        processable_id : '',
        operation: {},
        commentList: [],
        paging: 0,
        printScreen: ['款项结清截图', '特殊情况领导截图', '特殊情况截图', '特殊情况同意截图', '领导报备截图',
                      '凭证截图', '合同照片', '截图', '领导同意截图', '房屋影像', '房屋照片', '退租交接单'],
        bulletin_array :['收房报备','租房报备','续收报备','续租报备','公司转租报备','调房报备','房屋质量报备','已知未收先租报备','未收先祖确定'],
        videoSrc: '',

        personal: {},
        place: {},
        placeStatus: ['published', 'rejected', 'cancelled'],
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

        defaultItem: '评论信息',
        houseId: '', //房屋id
        reportAboutData: [],
        contrastDialog: false,
        isLoading: false,
        changeLoading: false,
        selfReport: {},
        aboutReportId: '',
        editReportData : [],
      }
    },

    watch: {
      module(val) {
        this.reportVisible = val;
      },
      reportVisible(val) {
        if (!val) {
          this.$emit('close');
          this.clearData();
        } else {
          this.process();
          this.getReportEditInfo();
        }
      },

      commentVisible(val) {
        if (!val) {
          this.close_();
        }else {
          this.isClear = false;
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
      process() {
        this.fullLoading = true;
        this.$http.get(this.address + 'process/' + this.reportId).then((res) => {
          this.fullLoading = false;
          if (res.data.status === 'success' && res.data.data.length !== 0) {
            this.show_content = JSON.parse(res.data.data.process.content.show_content_compress);
            this.reportDetailData = res.data.data.process.content;
            this.processable_id = res.data.data.process.processable_id;
            this.operation = res.data.data.operation;
            this.deal = res.data.data.deal;
            let pro = res.data.data.process;
            this.houseId = res.data.data.process.house_id;
            this.personal = pro.user;
            this.place = pro.place;
            this.placeFalse = this.placeStatus.indexOf(pro.place.status) === -1;
            this.getReportAboutInfo();
          } else {
            this.show_content = {};
            this.operation = {};
          }
        });
        this.comments(this.reportId, 1);
      },

      myData(val) {
        this.comments(this.reportId, val);
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

      getImg(val) {
        this.form.album = val[1];
        this.picStatus = !val[2];
      },

      // 确认评论
      manager() {
        if (this.form.operation !== 'to_comment') {
          this.sureComment(this.form.operation);
        } else {
          if (this.form.comment !== '' || this.form.album.length !== 0) {
            this.sureComment(this.form.operation);
          } else {
            this.$notify.warning({
              title: '警告',
              message: '请填写评论内容！',
            })
          }
        }
      },
      sureComment(val) {
        if (this.picStatus) {
          this.$http.put(this.address + 'process/' + this.reportId, this.form).then((res) => {
            if (res.data.status === 'success') {
              this.commentVisible = false;
              if (val === 'to_comment') {
                this.comments(this.reportId, 1);
              } else {
                this.process(this.reportId);
              }
              this.$notify.success({
                title: '成功',
                message: res.data.message,
              })
            } else {
              this.$notify.warning({
                title: '警告',
                message: res.data.message,
              })
            }
          })
        } else {
          this.$notify.warning({
            title: '警告',
            message: '图片上传中...',
          })
        }
      },
      close_() {
        this.isClear = true;
        $('.imgItem').remove();
        this.form.operation = '';
        this.form.comment = '';
        this.form.album = [];
      },

      //-------------------------相关报备信息-----------------------------//
      handleCommand(command) {
        this.defaultItem = command;
      },
      //获取报备相关信息
      getReportAboutInfo() {
        this.isLoading = true;
        this.$http.get(globalConfig.server_user + 'process?house_id=' + this.houseId).then((res) => {
          this.isLoading = false;
          if (res.data.status === 'success') {
            this.reportAboutData = res.data.data;
          } else {
            this.reportAboutData = [];
          }
        })
      },
      //查看报备对比
      contrast(item) {
        this.contrastDialog = true;
        this.aboutReportId = item.id;
        this.selfReport = this.show_content;
      },

      clearData() {
        this.reportAboutData = [];
        this.editReportData = [];
        this.show_content = {};
        this.defaultItem = '评论信息';
      },

      // 获取相关修改记录
      getReportEditInfo() {
        this.changeLoading = true;
        this.$http.get(globalConfig.server + 'bulletin/diff?processable_id=' + this.reportId).then((res) => {
          this.changeLoading = false;
          if(res.data.code === '20000'){
            this.editReportData = res.data.data.data;
          }else {
            this.editReportData = [];
          }
        })
      },
      //修改报备
      openModal(){
        switch (this.reportDetailData.bulletin_name){
          case '租房报备':
            this.rentReport = true;
            break;
        }
      },

      //关闭模态框
      closeModal() {
        this.aboutReportId = '';
        this.contrastDialog = false;
        this.rentReport = false;
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
      box-sizing: border-box;
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

    .diffContent{
      .title{
        margin-left: 40px;
      }
      .reportChange{
        padding-left: 60px;
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
      max-height: 464px;
      padding-right: 10px;
      overflow-x: auto;
      .form_border {
        padding: 15px;
        border: 1px solid #dfe6fb;
        @include border_(6px);
        margin-bottom: 12px;
      }
    }

    .reportItem {
      padding: 8px 16px;
      background-color: #eef3fc;
      border-radius: 4px;
      border-left: 5px solid #409EFF;
      margin-bottom: 10px;
      cursor: pointer;
      .itemLabel {
        display: inline-block;
        width: 70px;
        text-align: right;
        color: #6a8dfb;
        margin-right: 10px;
      }
    }
    .currentChange{
      background-color: #fbf0f3;
      border-left: 5px solid #fb4589;
      .itemLabel {
        color: #fb4589;
      }
    }
    .changImg{
      width: 40px;
      height: 40px;
      border-radius: 6px;
      vertical-align : middle;
      margin: 0 5px 5px 0;
    }
  }
</style>
