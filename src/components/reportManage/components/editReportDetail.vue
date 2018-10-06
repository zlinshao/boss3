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
                  <p @click="staffDetailDialog=true">
                    <img :src="personal.avatar" v-if="personal.avatar !== '' && personal.avatar !== null">
                    <img src="../../../assets/images/head.png" v-else>
                  </p>
                  <span>{{personal.name}}<span v-for="(value,index) in personal.org"
                                               v-if="index === 0">-{{value.name}}</span></span>
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
                  <el-col :span="12" v-for="(value,index) in show_content" :key="index"
                          v-if="printScreen.indexOf(index) === -1">
                    <el-form-item v-if="!value" :label="index" class="detailTitle">
                      <div class="special">{{value}}</div>
                    </el-form-item>
                    <el-form-item v-if="value && !Array.isArray(value) && value.constructor !== Object" :label="index"
                                  class="detailTitle">
                      <div class="special" v-if="index !== '房屋类型'">{{value}}</div>
                      <div class="special" v-if="index === '房屋类型'">{{value.name}}</div>
                    </el-form-item>
                    <el-form-item v-if="value && Array.isArray(value)" :label="index">
                      <div class="special">
                        <div v-if="index === '定金和收款方式' || index === '补交定金和收款方式'" v-for="item in value">{{item}}</div>
                        <div v-else>
                          <span style="margin-right: 20px;color: #409EFF">{{item.msg}}</span>
                          <span>{{item.period}}</span>
                        </div>
                      </div>
                    </el-form-item>

                    <el-form-item v-if="value && value.constructor === Object" :label="index" class="detailTitle">
                      <div class="special" v-if="value.name">{{value.name}}</div>
                      <div class="special" v-if="value.number">{{value.number}}</div>
                    </el-form-item>
                  </el-col>
                  <!--图片-->
                  <el-col :span="24" v-else>
                    <el-form-item :label="index">
                      <div class="special imgs">
                      <span v-for="(p,index) in value">
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
                    <el-dropdown-item command="评论信息"> 评论信息</el-dropdown-item>
                    <el-dropdown-item command="相关信息"> 相关信息</el-dropdown-item>
                    <el-dropdown-item command="报备修改"> 报备修改</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
              <div class="scroll_bar">
                <!--相关信息-->
                <div v-if="defaultItem === '相关信息'" style="min-height: 300px" v-loading="isLoading"
                     element-loading-text="拼命加载中"
                     element-loading-spinner="el-icon-loading"
                     element-loading-background="rgba(255, 255, 255, 0)">
                  <div v-if="!isLoading && reportAboutData.length === 0"
                       style="text-align: center;font-size: 16px;margin-top: 12px;">暂无相关信息
                  </div>
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
                  <div v-if="commentList.length === 0" style="text-align: center;font-size: 16px;margin-top: 12px;">
                    暂无评论
                  </div>

                  <div v-if="commentList.length !== 0">
                    <div v-for="(value,index) in commentList" class="reportItem" style="margin-bottom: 12px;">
                      <div class="commentContent">
                        <div class="commentA">
                            <span class="headSculpture">
                               <img :src="value.user.avatar"
                                    v-if="value.user.avatar !== '' && value.user.avatar !== null">
                               <img src="../../../assets/images/head.png" v-else>
                            </span>
                          {{value.user.name}}
                          <span v-for="(item,index) in value.user.org" v-if="index === 0">-{{item.name}}</span>
                        </div>
                        <div class="commentB">
                          {{value.created_at}}
                        </div>
                      </div>
                      <div class="commentC">
                          <span>
                            {{value.body}}
                          </span>
                        <div>
                          <p v-for="(p,index) in value.album">
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
                  <div v-if="!changeLoading && editReportData.length < 1"
                       style="text-align: center;font-size: 16px;margin-top: 12px;">暂无报备修改记录
                  </div>
                  <div v-if="editReportData.length > 0">
                    <div v-for="(item,index) in editReportData" :class="{currentChange:changeId == item.id}"
                         class="reportItem" style="margin-bottom: 12px;">
                      <div class="commentContent">
                        <div class="commentA">
                          <span class="headSculpture">
                             <img :src="item.staffs.avatar"
                                  v-if="item.staffs.avatar !== '' && item.staffs.avatar !== null">
                             <img src="../../../assets/images/head.png" v-else>
                          </span>
                          <span style="white-space:pre-wrap">{{item.staffs.name}}</span>
                          <span style="white-space:pre-wrap" v-for="(item,index) in item.staffs.org" v-if="index === 0">-{{item.name}}</span>
                          <span style="white-space:pre-wrap;text-align: right"> {{item.create_time}}</span>
                        </div>
                      </div>
                      <div class="diffContent">
                        <div v-for="(value,key) in item.diff">
                          <div v-if="printScreen.indexOf(key) > -1">
                            <div class="title">{{key}} :</div>
                            <div class="reportChange">
                              由
                              <img v-if="value['由']&&value['由'].length>0" class="changImg" v-for="img in value['由']"
                                   :src="img.uri"
                                   data-magnify="" data-caption="图片查看器" :data-src="img.uri" alt="">
                              <span v-else>无</span>
                              变成
                              <img v-if="value['变成']&&value['变成'].length>0" class="changImg" v-for="pic in value['变成']"
                                   :src="pic.uri"
                                   data-magnify="" data-caption="图片查看器" :data-src="pic.uri" alt="">
                              <span v-else>无</span>
                            </div>
                          </div>

                          <div v-else>
                            <div v-if="typeof value === 'string'">
                              <div v-if="key === '房屋类型'">
                                <div class="title">{{key}} :</div>
                                <div class="reportChange">{{value.name}}</div>
                              </div>
                              <div v-if="key !== '房屋类型'">
                                <div class="title">{{key}} :</div>
                                <div class="reportChange">{{value}}</div>
                              </div>
                            </div>
                            <div v-else>
                              <div v-if="key === '定金和收款方式' || key === '补交定金和收款方式'">
                                <div class="title">{{key}} :</div>
                                <div class="reportChange">
                                  由
                                  <span v-if="value['由']&&value['由'].length>0"
                                        v-for="item in value['由']">{{item}}</span>
                                  <span v-else>无</span>
                                  变成
                                  <span v-if="value['变成']&&value['变成'].length>0"
                                        v-for="item in value['变成']">{{item}}</span>
                                  <span v-else>无</span>
                                </div>
                              </div>
                              <div v-else>
                                <div class="title">{{key}} :</div>
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
      <div slot="footer" class="dialog-footer">
        <el-button size="small" :type="ElectronicReceiptBtnColor" @click="electronicReceiptDia()" v-if="electronicReceiptStatu" :disabled="electronicReceiptDisabled" 
                >
          {{sendElectronicReceiptBtnText}}
        </el-button>
        <el-button v-if="!fullLoading" size="small" type="primary"
                   v-for="(value,key) in operation" :key="key" @click="commentOn(key)">
          {{value}}
        </el-button>
        <el-button size="small" type="primary" @click="openModal"
                   v-if="approvedStatus && routerLinks.indexOf(this.process.processable_type) > -1">
          修 改
        </el-button>
      </div>
    </el-dialog>
    <!-- 生成电子收据 -->
    
    <el-dialog
      @open="removeDiaHead"
      custom-class="electronicReceipt"
      :visible.sync="electronicReceiptVisible"
      width="50%"
      :close-on-click-modal="false"
      center
      >
      <div
        v-loading="pdfloading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >
        <embed width="100%" height="500px" :src="pdfUrl" type="application/pdf" internalinstanceid="25"></embed>
      </div>
      
      <span slot="footer" class="dialog-footer">
        <el-button @click="signaturebtn" type="success" v-if="signature">签&nbsp;章</el-button>
        <el-button @click="sendElectronicReceipt" type="success" v-if="!signature">发送电子数据</el-button>
        <el-button  @click="electronicReceiptVisible = false">取&nbsp;消</el-button>
      </span>
    </el-dialog>
    <!-- 选择城市 -->
    <el-dialog
      title="请选择城市"
      :visible.sync="chooseCityElectronicReceiptVisible"
      width="40%"
      :close-on-click-modal="false"
      center
      >
      <div style="text-align:center"
        v-loading="cityloading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255, 255, 255, 0.8)"
      >
        <el-radio-group v-model="radioCity" size="mini" v-for="item in city" :key="item.id">
          <el-radio-button :label="item.dictionary_name" ></el-radio-button>
        </el-radio-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="createElectronicReceipt" type="success" size="mini" >确&nbsp;定</el-button>
        <el-button  @click="chooseCityElectronicReceiptVisible = false" size="mini">取&nbsp;消</el-button>
      </span>
    </el-dialog>

    <!-- 评论 -->
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

    <!--员工姓名电话及组长姓名电话-->
    <el-dialog :close-on-click-modal="false" title="员工信息" :visible.sync="staffDetailDialog" width="30%">
      <div class="scroll_bar" style="padding: 0;">
        <div class="showContent" v-if="process.user" style="width: 100%;">
          <p class="contentP">
            <img :src="process.user.avatar" v-if="process.user.avatar !== '' && process.user.avatar !== null">
            <img src="../../../assets/images/head.png" v-else>
          </p>
          <div>
            <div class="form_border">
              <p>姓名：{{process.user.name}}</p>
              <p>手机号：<a>{{process.user.phone}}</a></p>
            </div>
            <div class="form_border">
              <p>组长姓名：{{leader_name}}</p>
              <p>组长手机号：<a>{{leader_phone}}</a></p>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="staffDetailDialog = false">关&nbsp;闭</el-button>
      </div>
    </el-dialog>

    <ContrastReport :contrastDialog="contrastDialog" :selfReport="selfReport"
                    :aboutReportId="aboutReportId" @close="closeModal"></ContrastReport>

    <CollectReport :collectReport="collectReport" :reportDetailData="reportDetailData" :reportId="reportId"
                   :processableId="processable_id" @close="closeModal"></CollectReport>
    <RentReport :rentReport="rentReport" :reportDetailData="reportDetailData" :reportId="reportId"
                :processableId="processable_id" @close="closeModal"></RentReport>
    <HouseReport :houseReport="houseReport" :processableId="processable_id"
                 :reportId="reportId" @close="closeModal"></HouseReport>
    <ContinueCollectReport :continueCollectReport="continueCollectReport" :reportDetailData="reportDetailData"
                           :reportId="reportId" :processableId="processable_id"
                           @close="closeModal"></ContinueCollectReport>
    <ContinueRentReport :continueRentReport="continueRentReport" :reportDetailData="reportDetailData"
                        :reportId="reportId" :processableId="processable_id" @close="closeModal"></ContinueRentReport>
    <TransRentReport :transRentReport="transRentReport" :reportDetailData="reportDetailData"
                     :reportId="reportId" :processableId="processable_id" @close="closeModal"></TransRentReport>
    <ChangeRentReport :changeRentReport="changeRentReport" :reportDetailData="reportDetailData"
                      :reportId="reportId" :processableId="processable_id" @close="closeModal"></ChangeRentReport>
    <RwcRentReport :rwcRentReport="rwcRentReport" :reportDetailData="reportDetailData"
                   :reportId="reportId" :processableId="processable_id" @close="closeModal"></RwcRentReport>
    <RwcConfirmRentReport :rwcConfirmRentReport="rwcConfirmRentReport" :reportDetailData="reportDetailData"
                          :reportId="reportId" :processableId="processable_id"
                          @close="closeModal"></RwcConfirmRentReport>
  </div>
</template>

<script>

  import UpLoad from '../../common/UPLOAD.vue'
  import ContrastReport from './contrastReport'
  //报备修改
  import RentReport from '../reportRevise/rentReport'
  import CollectReport from '../reportRevise/collectReport'
  import HouseReport from '../reportRevise/houseReport'
  import ContinueCollectReport from '../reportRevise/continueCollectReport'
  import ContinueRentReport from '../reportRevise/continueRentReport'
  import TransRentReport from '../reportRevise/transRentReport'
  import ChangeRentReport from '../reportRevise/changeRentReport'
  import RwcRentReport from '../reportRevise/rwcRentReport'
  import RwcConfirmRentReport from '../reportRevise/rwcConfirmRentReport'

  export default {
    name: "report-detail",
    props: ['module', 'reportId', 'changeId'],
    components: {
      UpLoad, ContrastReport, RentReport, CollectReport, HouseReport, ContinueCollectReport,
      ContinueRentReport, TransRentReport, ChangeRentReport, RwcRentReport, RwcConfirmRentReport
    },
    data() {
      return {
        pdfUrl:"",
        electronicReceiptStatu:true,//电子数据按钮显示
        electronicReceiptDisabled:true,//电子数据按钮禁用
        electronicReceiptVisible:false,//电子收据弹窗
        sendElectronicReceiptVisible:false,//发送电子收据弹窗
        sendElectronicReceiptBtnText:"发送电子收据", //发送电子收据按钮文字
        electronicReceiptParam:{},//电子数据参数
        ElectronicReceiptBtnColor:"success",
        bank:{},//银行数据
        chooseCityElectronicReceiptVisible:false,//选择城市
        signature:true,//签章按钮显示隐藏
        pdfloading:true,//pdf加载
        cityloading:true,//城市加载
        bulletinType:"",//报备类型
        bulletinId:"",//报备id
        approvalStatus:"",
        electronicReceiptId:'',//电子收据id 
        phone:'',//手机号
        city:[],//城市
        radioCity:"南京市",
        sendElectronicReceiptNumber:'',
        address: globalConfig.server_user,
        fullLoading: false,
        reportVisible: false,
        rentReport: false,
        collectReport: false,
        houseReport: false,
        continueCollectReport: false,
        continueRentReport: false,
        transRentReport: false,
        changeRentReport: false,
        rwcRentReport: false,
        rwcConfirmRentReport: false,
        show_content: {},
        reportDetailData: {},
        processable_id: '',
        operation: {},
        commentList: [],
        paging: 0,
        printScreen: ['新凭证截图', '证件照片', '房产证照片', '旧凭证截图', '新押金收条', '旧押金收条', '押金收条', '款项结清截图', '特殊情况领导截图', '特殊情况截图', '特殊情况同意截图', '领导报备截图', '凭证截图', '合同照片', '截图', '领导同意截图', '组长同意截图', '房屋影像', '房屋照片', '退租交接单'],

        routerLinks: ['bulletin_quality', 'bulletin_collect_basic', 'bulletin_collect_continued', 'bulletin_rent_basic',
          'bulletin_rent_continued', 'bulletin_rent_trans', 'bulletin_rent_RWC', 'bulletin_RWC_confirm', 'bulletin_change',],
        approvedStatus: false,
        process: {},
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
        editReportData: [],
        isEdit: false,
        staffDetailDialog: false,
        leader_phone: '',
        leader_name: '',
      }
    },

    watch: {
      approvalStatus(newval,oldval){
        if(newval=="published"&&oldval=="review"){
          if(this.bulletinType=="租房报备"||this.bulletinType=="公司转租报备"||this.bulletinType=="调房报备"||this.bulletinType=="未收先租确定报备"||this.bulletinType=="已知未收先租报备"||this.bulletinType=="续租报备"||this.bulletinType=="尾款报备"){
            this.createElectronicReceiptMessagebox()
          }
        }
      },
      module(val) {
        this.reportVisible = val;
        if(!val){
          this.approvalStatus = ""
        }
      },
      reportVisible(val) {
        if (!val) {
          if (this.isEdit) {
            this.$emit('close', 'success');
          } else {
            this.$emit('close');

          }
          setTimeout(() => {
            this.isEdit = false;
          });
          this.clearData();
        } else {
          this.getProcess();
          this.getReportEditInfo();
        }
      },
      commentVisible(val) {
        if (!val) {
          this.close_();
        } else {
          this.isClear = false;
        }
      },
      staffDetailDialog(val) {
        if (val) {
          if (this.process.user && this.process.user.org && this.process.user.org[0] && this.process.user.org[0].leader_id) {
            this.$http.get(globalConfig.server + 'manager/staff/' + this.process.user.org[0].leader_id).then((res) => {
              if (res.data.code === '10020') {
                this.leader_phone = res.data.data.phone;
                this.leader_name = res.data.data.name;
              }
            });
          }
        } else {
          this.leader_phone = '';
          this.leader_name = '';
          "welcome youxi ahhh "
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
      //判断是否有电子收据
      electronicReceiptDia(id){
        this.fullLoading = true
        this.$http.get(globalConfig.server + 'financial/receipt/button?process_id='+this.bulletinId).then((res) => {
          
          this.fullLoading = false
          if(res.data.code == '20001'){
            this.electronicReceiptDisabled = false
            this.chooseCity()         
          }else if(res.data.code == "20000"){
            this.electronicReceiptId = res.data.data.id
            this.electronicReceiptVisible = true
            this.pdfloading = false
            this.pdfUrl = res.data.data.shorten_uri
            if(res.data.data.is_signed=="0"){
              this.signature = true
            }else if(res.data.data.is_signed=="1"){
              this.signature = false
            }
            
          }
        })
        
      },
      //生成电子收据
      createElectronicReceipt(){
        this.chooseCityElectronicReceiptVisible = false
        this.city.forEach((item)=>{
          if(item.dictionary_name == this.radioCity){
            this.electronicReceiptVisible = true
            this.electronicReceiptParam.city =  item.id
            this.$http.post(globalConfig.server + 'financial/receipt/generate',{...this.electronicReceiptParam,...this.bank}).then((res) => {
              // console.log({...this.electronicReceiptParam,...this.bank})
              this.pdfloading = false
              if(res.data.code =="20000"){
                this.electronicReceiptId = res.data.data.id
                this.pdfUrl = res.data.data.shorten_uri
                this.signature = true
              }else{
                this.$notify.error({
                  title: '错误',
                  message: res.data.msg
                });
                this.electronicReceiptVisible = false
              }
          
            })
          }
          
        })
      },
      //电子收据签章
      signaturebtn(){
        this.pdfloading = true
        this.$http.post(globalConfig.server + '/financial/receipt/sign/'+this.electronicReceiptId).then((res) => {
          
          if(res.data.code =="20000"){
            this.pdfloading = false
            this.pdfUrl = res.data.data.shorten_uri
            this.signature = false
          }else{
           
             this.$notify.error({
                title: '错误',
                message: res.data.msg
              });
          }
      
        })

      },
      //发送电子收据
      sendElectronicReceipt(){
        this.signature = true
        this.electronicReceiptVisible = false

        this.$prompt('请输入手机号码', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue:this.phone,
          inputPattern: /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
          inputErrorMessage: '手机号格式不正确'
        }).then(({ value }) => {
          this.$http.post(globalConfig.server + '/financial/receipt/send/'+this.electronicReceiptId,{"phone":value}).then((res) => {
            if(res.data){
              this.$message({
                type: 'success',
                message: '发送成功'
              });
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '发送失败'
          });       
        });
      },
      //生成电子数据提示框
      createElectronicReceiptMessagebox(){
        this.$confirm('是否生成电子数据', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.electronicReceiptDisabled = false
          this.chooseCity()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });
      },
      //城市选择
      chooseCity(){
        this.chooseCityElectronicReceiptVisible=true
        this.$http.get(globalConfig.server + 'setting/dictionary/306').then((res) => {
          this.cityloading = false
          if(res.data.code == "30010"){
            this.city = res.data.data
          }
        })
      },
      getProcess() {
        this.fullLoading = true;
        this.approvedStatus = false;
        this.$http.get(this.address + 'process/' + this.reportId).then((res) => {
          this.fullLoading = false;
          if (res.data.status === 'success' && res.data.data.length !== 0) {
           
            
            this.show_content = JSON.parse(res.data.data.process.content.show_content_compress);
            this.reportDetailData = res.data.data.process.content;
            this.processable_id = res.data.data.process.processable_id;
            this.operation = res.data.data.operation;
            this.deal = res.data.data.deal;
            this.process = res.data.data.process;

            let pro = res.data.data.process;
            this.houseId = res.data.data.process.house_id;
            this.personal = pro.user;
            this.place = pro.place;
            this.placeFalse = this.placeStatus.indexOf(pro.place.status) === -1;
            this.getReportAboutInfo();

            

            this.bulletinType = res.data.data.process.content.bulletin_name

            this.approvalStatus = pro.place.status

            if(this.bulletinType=="租房报备"||this.bulletinType=="公司转租报备"||this.bulletinType=="调房报备"||this.bulletinType=="未收先租确定报备"||this.bulletinType=="已知未收先租报备"||this.bulletinType=="续租报备"||this.bulletinType=="尾款报备"){
              
              this.electronicReceiptStatu = true
              this.bulletinId = res.data.data.process.id 
              this.phone = res.data.data.process.content.phone

              this.electronicReceiptParam.process_id = res.data.data.process.id 

              this.electronicReceiptParam.deposit =  res.data.data.process.content.front_money
              this.electronicReceiptParam.mortgage =  res.data.data.process.content.deposit_payed
              this.electronicReceiptParam.rental =  res.data.data.process.content.rent_money  
              // this.electronicReceiptParam.bank =  res.data.data.process.content.money_way
              this.electronicReceiptParam.address =  res.data.data.process.content.address
              
              if(this.bulletinType=="尾款报备"){
                let startTime = res.data.data.process.content.payWay[0].split(':')[0].split('~')[0] //合同开始时间
                let endTime = res.data.data.process.content.payWay[0].split(':')[0].split('~')[1] //合同结束时间
                this.electronicReceiptParam.duration = Math.floor(new Date(endTime)-new Date(startTime))/86400000 + "天" //签约时长

                this.electronicReceiptParam.payer =  res.data.data.process.content.customer_name 
                this.electronicReceiptParam.sign_at = res.data.data.process.content.retainage_date
                this.electronicReceiptParam.price =  res.data.data.process.content.money_sum
                this.electronicReceiptParam.pay_way =  res.data.data.process.content.payWay.join(',')
              }else {
                this.electronicReceiptParam.duration =  res.data.data.process.content.duration_days+"天"
                this.electronicReceiptParam.payer =  res.data.data.process.content.name
                this.electronicReceiptParam.sign_at =  res.data.data.process.content.sign_date 
                this.electronicReceiptParam.price =  res.data.data.process.content.price_arr.join(',')
                this.electronicReceiptParam.pay_way =  res.data.data.process.content.pay_way_str.map((item)=>{return item.msg + " " + item.period}).join(',')
              }

             
              res.data.data.process.content.money_way.forEach((item,index)=>{this.bank["bank"+(index+1)] = item})

              this.$http.get(globalConfig.server + 'financial/receipt/button?process_id='+this.bulletinId).then((res) => {
                
               if(res.data.code == "20000"){
              
                  if(res.data.data.is_sent){
                    this.sendElectronicReceiptBtnText = "已发送电子收据"
                    this.ElectronicReceiptBtnColor = "info"
                  }else {
                    this.sendElectronicReceiptBtnText = "发送电子收据"
                    this.ElectronicReceiptBtnColor = "success"
                  }
                }
              })

              for(let key in this.operation){
                if(this.operation[key]=="同意"){
                  this.electronicReceiptDisabled = true
                  break
                }else{
                  this.electronicReceiptDisabled = false
                }
              }
            }else{
              this.electronicReceiptStatu = false
              this.electronicReceiptDisabled = false
            }
            

            for (let key in this.operation) {
              if (key.indexOf('approved') > -1) {
                this.approvedStatus = true;
                return;
              }
            }

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
                this.getProcess(this.reportId);

                // 是否生成电子数据消息框
                // if(this.operation[val]=="同意"){
                  
                  
                // }

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
      removeDiaHead(){
         $('.electronicReceipt .el-dialog__header').remove()
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
          if (res.data.code === '20000') {
            this.editReportData = res.data.data.data;
          } else {
            this.editReportData = [];
          }
        })
      },
      //修改报备
      openModal() {
        switch (this.process.processable_type) {
          case 'bulletin_rent_basic':
            this.rentReport = true;
            break;
          case 'bulletin_collect_basic':
            this.collectReport = true;
            break;
          case 'bulletin_quality':
            this.houseReport = true;
            break;
          case 'bulletin_collect_continued':
            this.continueCollectReport = true;
            break;
          case 'bulletin_rent_continued':
            this.continueRentReport = true;
            break;
          case 'bulletin_rent_trans':
            this.transRentReport = true;
            break;
          case 'bulletin_change':
            this.changeRentReport = true;
            break;
          case 'bulletin_rent_RWC':
            this.rwcRentReport = true;
            break;
          case 'bulletin_RWC_confirm':
            this.rwcConfirmRentReport = true;
            break;
        }
      },

      //关闭模态框
      closeModal(val) {
        this.aboutReportId = '';
        this.contrastDialog = false;
        this.rentReport = false;
        this.collectReport = false;
        this.houseReport = false;
        this.continueCollectReport = false;
        this.continueRentReport = false;
        this.transRentReport = false;
        this.changeRentReport = false;
        this.rwcRentReport = false;
        this.rwcConfirmRentReport = false;
        if (val === 'success') {
          this.getProcess();
          this.getReportEditInfo();
          this.isEdit = true;
        }
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

    .diffContent {
      .title {
        margin-left: 40px;
      }
      .reportChange {
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
    .currentChange {
      background-color: #fbf0f3;
      border-left: 5px solid #fb4589;
      .itemLabel {
        color: #fb4589;
      }
    }
    .changImg {
      width: 40px;
      height: 40px;
      border-radius: 6px;
      vertical-align: middle;
      margin: 0 5px 5px 0;
    }
  }
</style>
