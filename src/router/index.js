import Vue from 'vue'
import Router from 'vue-router'

//路由
const Login = () => import  ('../components/Login.vue')
const Download = () => import  ('../components/download.vue')
const Index = () => import  ('../components/index.vue')
const Main = () => import  ('../components/main.vue')
const Lock = () => import  ('../components/common/lockedScreen.vue')


//租赁管理
const WholeRentManage = () => import  ('../components/rentManage/wholeRentManage/index.vue')//整租管理
const JointRentManage = () => import  ('../components/rentManage/jointRentManage/index.vue')


//客服中心
const ExpenseAccount = () => import  ('../components/customService/expenseAccount/index.vue')   //报销管理
const CustomerService = () => import  ('../components/rentManage/customerService/ReturnVisitManage/index.vue') //回访

// const ContractManage =()=> import  ('../components/rentManage/datumMessage/contractManage/index1.vue')
// const ClientManage =()=> import  ('../components/rentManage/datumMessage/clientManage/index1.vue')
const HousesManage = () => import  ('../components/rentManage/housesManage/index.vue')                      //产品管控中心
const RepairManage = () => import  ('../components/rentManage/repairManage/index.vue')        //维修管理
const ClientManage = () => import  ('../components/rentManage/datumMessage/clientManage/index.vue')         //客户管理
const ContractManage = () => import  ('../components/rentManage/datumMessage/contractManage/index.vue')     //合同管理
const WorkOrderManage = () => import  ('../components/rentManage/datumMessage/workOrderManage/index.vue')   //工单管理
const RetreatManage = () => import  ('../components/rentManage/datumMessage/retreatManage/index.vue') //退租管理

// 财务账本
// const Foundation =()=> import  ('../components/finance/foundation/index')                                //基础管理
// const FundMessage =()=> import  ('../components/finance/fundMessage/index.vue')                          //款项管理
const ClientMessage = () => import  ('../components/finance/clientMessage/index.vue')                         //客户管理
const PendingItem = () => import  ('../components/finance/pendingItem/index.vue')                             //待处理项
const PendingSettle = () => import  ('../components/finance/pendingItem/components/pendingSettle.vue')        //结算

const StaticDetail = () => import  ('../components/finance/statistics/components/staticDetail')            //统计详情
// const Statistics =()=> import  ('../components/finance/statistics/index.vue')                            //数据统计
// const IncomeFlow =()=> import  ('../components/finance/incomeFlow/index')                                //收支流水


// 微信管理
// const Reimbursement =()=> import  ('../comments/wechatMessage/reimbursement/index1.vue')            //微信报销
// const Complain =()=> import  ('../comments/wechatMessage/complain/index1.vue')                      //微信投诉
// const LookHouse =()=> import  ('../comments/wechatMessage/lookHouse/index1.vue')                    //预约看房
// const League =()=> import  ('../comments/wechatMessage/league/index1.vue')                          //房东加盟
// const Feedback =()=> import  ('../comments/wechatMessage/feedback/index1.vue')                      //意见反馈
const WechatMessage = () => import  ('../components/wechatMessage/index.vue')                           //微信管理


//人资管理
// const StaffManage =()=> import  ('../comments/humanResource/staffManage/index1.vue')
// const Organization =()=> import  ('../components/humanResource/organization/index1.vue')
// const Achievement =()=> import  ('../comments/humanResource/achievement/index1.vue')
const LeaveOffice = () => import  ('../components/humanResource/leaveOffice/index.vue')
const IntegralManage = () => import  ('../components/humanResource/integralManage/index.vue')
const OrganizationNew = () => import  ('../components/humanResource/organizationNew/index.vue')       // add by cj 组织架构
const PersonalRecords = () => import  ('../components/humanResource/personalRecords/index')
const StaffRecords = () => import  ('../components/humanResource/staffRecords/index')     // add by cj 员工档案
const PersonnelStatement = () => import  ('../components/humanResource/organizationNew/components/personnelStatement')     // add by cj 人事报表

// 人员信息管理
const TeamManage = () => import  ('../components/HRM/teamManage/index.vue');                          // 人员信息管理
const Roster = () => import  ('../components/HRM/teamManage/roster/index.vue');                       // 花名册
const StaffDetail = () => import  ('../components/HRM/teamManage/roster/components/staffDetail.vue'); // 花名册 详情
// const EntryManage = () => import  ('../components/HRM/teamManage/entryManage/index.vue');             // 入职管理
const BecomeFormal = () => import  ('../components/HRM/teamManage/becomeFormal/index.vue');           // 转正管理
const TransferPosition = () => import  ('../components/HRM/teamManage/transferPosition/index.vue');   // 调岗管理
const Dimission = () => import  ('../components/HRM/teamManage/dimission/index.vue');                 // 离职管理

//考勤管理
const ArrangeSetting = () => import ('../components/attendanceManage/arrangeSetting/index.vue'); //设置排班
const EditArrange = () => import ('../components/attendanceManage/arrangeSetting/editArrange/index.vue'); //编辑排班

// 考勤记录
const attendanceRecord = () => import('../components/attendanceManage/attendanceRecord/record/index.vue')

// 月度总汇
const monthlySummary = () => import('../components/attendanceManage/monthlySummary/monthly/index.vue')

//OA办公
// const Communication =()=> import  ('../comments/OAWork/communication/index1.vue')                 //通讯管理
// const Programme =()=> import  ('../components/OAWork/management/programme/index1.vue')               //日程管理
const Institution = () => import  ('../components/OAWork/management/institution/index.vue')           //制度管理
// const Vote =()=> import  ('../comments/OAWork/vote/index1.vue')                                   //投票管理
const Counter = () => import  ('../components/OAWork/management/counter/index.vue')                   //业绩计算器
const Management = () => import  ('../components/OAWork/management/index.vue')                        //办公管理

// const SuppliesUse =()=> import  ('../comments/OAWork/property/items/officeSuppliesUse.vue')                       //办公用品申领
// const SuppliesGather =()=> import  ('../comments/OAWork/property/officeSuppliesGather/officeSuppliesGather.vue')  //办公用品汇总
// const CapitalChange =()=> import  ('../comments/OAWork/property/items/capitalAssetsChange.vue')                   //固定资产异动
// const CapitalGather =()=> import  ('../comments/OAWork/property/items/capitalAssetsGather.vue')                   //固定资产总汇
const Property = () => import  ('../components/OAWork/property/index.vue')                                               //资产管理

// const ArticleMessage =()=> import  ('../comments/OAWork/articleMessage/staffSquare/index1.vue')                    //员工广场
const PublicArticle = () => import  ('../components/OAWork/articleMessage/staffSquare/components/publicArticle.vue')     //文章发布
const ArticleMessage = () => import  ('../components/OAWork/articleMessage/index.vue')                                   //文章管理

// const ContractClaim =()=> import  ('../comments/OAWork/pagerData/contractClaim/index1.vue')
const PagerData = () => import  ('../components/OAWork/pagerData/index.vue')                        //纸质资料

// const Knowledge =()=> import  ('../comments/OAWork/knowledge/index1.vue')                     //知识管理

const ExamineAndApprove = () => import  ('../components/OAWork/examineAndApprove/index.vue')


// 乐伽大学
const LineCollege = () => import  ('../components/lejiaCollege/LineCollege/index.vue')//考试列表
const StaffRegistration = () => import  ('../components/lejiaCollege/StaffRegistration/index.vue')
const College = () => import  ('../components/lejiaCollege/college/index.vue') //乐伽大学
const OnlineExam = () => import  ('../components/lejiaCollege/OnlineExam/index.vue')    //在线考试

const ConfigExam = () => import  ('../components/lejiaCollege/OnlineExam/configExam/index.vue')  //管理试卷
const BatchQuestions = () => import  ('../components/lejiaCollege/OnlineExam/batchQuestions/index.vue')  //批量导入试题
const MyselfQuestions = () => import  ('../components/lejiaCollege/OnlineExam/myselfQuestions/index.vue')  //自己录入
const PreviewExam = () => import  ('../components/lejiaCollege/OnlineExam/previewExam/index.vue')  //预览试卷
const AnswerExam = () => import  ('../components/lejiaCollege/OnlineExam/answerExam/index.vue')  //考生答题
const LookExam = () => import  ('../components/lejiaCollege/OnlineExam/lookExam/index.vue')  //查看答题试卷
const ExaminerRead = () => import  ('../components/lejiaCollege/OnlineExam/examinerRead/index.vue')  //主考官阅卷
const ExaminerReadEach = () => import  ('../components/lejiaCollege/OnlineExam/examinerReadEach/index.vue')  //主考官阅卷试题
const ExaminerShortAn = () => import  ('../components/lejiaCollege/OnlineExam/examinerShortAn/index.vue')  //主考官阅卷－简答题

// 系统设置
const ModuleSetting = () => import  ('../components/systemSetting/moduleSetting/index.vue')                             //模块设置

//问答中心
const AnswerCenter = () => import  ('../components/OAWork/answerCenter/index.vue')                             //问答中心

//问卷调查
const Questionnaire = () => import  ('../components/OAWork/questionnaire/index.vue')               //问卷调查
const ConfigNaire = () => import  ('../components/OAWork/questionnaire/configNaire/index.vue')  //管理问卷
const PreviewNaire = () => import  ('../components/OAWork/questionnaire/previewNaire/index.vue')  //管理问卷
const BatchNaire = () => import  ('../components/OAWork/questionnaire/batchNaire/index.vue')  //批量导入问卷
const MyselfNaire = () => import  ('../components/OAWork/questionnaire/myselfNaire/index.vue')  //自己录入问卷
const LookNaire = () => import  ('../components/OAWork/questionnaire/lookNaire/index.vue')  //问卷调查统计
const AnswerAll = () => import  ('../components/OAWork/questionnaire/answerAll/index.vue')  //问卷调查统计
const AnswerNaire = () => import  ('../components/OAWork/questionnaire/answerNaire/index.vue')  //问卷作答


// const Message =()=> import  ('../comments/systemSetting/message/index1.vue')                                      //短信模板
// const LoginRecord =()=> import  ('../comments/systemSetting/loginRecord/index1.vue')                              //登陆日志
// const UserDictionary =()=> import  ('../comments/systemSetting/userDictionary/index1.vue')                        //用户字典
// const RoleManage =()=> import  ('../comments/systemSetting/roleManage/index1.vue')                                //角色管理
// const PowerManage =()=> import  ('../comments/systemSetting/powerManage/index1.vue')                              //权限管理
const VillageManage = () => import  ('../components/systemSetting/managerSetting/villageManage/index.vue')              //小区管理
const VillageDetail = () => import  ('../components/systemSetting/managerSetting/villageManage/villageDetail.vue')      //小区管理详情
const ManagerSetting = () => import  ('../components/systemSetting/managerSetting/index.vue')                           //管理员设置


// const Recycle =()=> import  ('../comments/systemSetting/recycleBin/index1.vue')                                   //回收站
// const contractModule =()=> import  ('../comments/systemSetting/contractModule/index1.vue')                        //合同模板
// const ExportManage =()=> import  ('../comments/systemSetting/exportManage/index1.vue')                            //导出管理


//喜报管理
// const CollectBulletin =()=> import  ('../components/bulletin/collectBulletin/index.vue')            //收房喜报
// const RentBulletin =()=> import  ('../components/bulletin/rentBulletin/index.vue')                  //租房喜报
// const FinalBalance =()=> import  ('../components/bulletin/finalBalance/index.vue')                  //尾款报备
// const SpecialBalance =()=> import  ('../components/bulletin/specialBalance/index.vue')              //特殊情况报备
// const Auditing =()=> import  ('../components/bulletin/auditing/index.vue')                          //审核


// 业绩工资
const PeriodicTable = () => import  ('../components/meritPay/periodicTable/index')
const Achievement = () => import  ('../components/meritPay/achievement/index')
const PersonalSalary = () => import  ('../components/meritPay/personalSalary/index')

const CollectDetail = () => import  ('../components/rentManage/collectDetail.vue')
const RentingDetail = () => import  ('../components/rentManage/rentingDetail.vue')

//合同修改历史快照
const HistoryCollectDetail = () => import  ('../components/rentManage/datumMessage/contractManage/components/historyCollectDetail.vue')
const HistoryRentingDetail = () => import  ('../components/rentManage/datumMessage/contractManage/components/historyRentingDetail.vue')

const MessageCenter = () => import  ('../components/messageCenter/index.vue')                         //消息中心
const SthToDoDetail = () => import  ('../components/OAWork/sthToDo/components/detail_1.vue')          //喜报详情
const SthToDoDetail_2 = () => import  ('../components/OAWork/sthToDo/components/detail_2.vue')        //喜报
const PersonalSetting = () => import  ('../components/personalSetting/index.vue')                     //个人设置
const CheckWork = () => import  ('../components/checkWork/index.vue')                                 //考勤自助
const Register = () => import  ('../components/register/index.vue')                                   //签到自助
const ContractChange = () => import  ('../components/OAWork/sthToDo/components/contractChange.vue')   //TEST_1
const Deliver = () => import  ('../components/OAWork/sthToDo/components/deliver.vue')                 //TEST_2
const throwALease = () => import  ('../components/OAWork/sthToDo/components/throwALease.vue')         //TEST_3
const Individual = () => import  ('../components/individual/index.vue')                               //个人门户

const Converge = () => import  ('../components/converge/index.vue')                                   //员工广场
const Infodetails = () => import  ('../components/converge/details/infodetails.vue')                  //员工广场详情
const DailyRecord = () => import  ('../components/dailyRecord/index.vue')                             //日志管理
const SthToDo = () => import  ('../components/OAWork/sthToDo/index.vue')                              //待办事项


const Integraldetail = () => import  ('../components/integraldetail/integraldetail.vue')         // 积分明细

const PictureManage = () => import  ('../components/pictureManage/pictureManage.vue');                //相册管理
const CreateAlbum = () => import  ('../components/pictureManage/createAlbum.vue');                //创建相册
const ChoosePictures = () => import  ('../components/pictureManage/selectPictures.vue');                //选择照片
const ImproveImgInfo = () => import  ('../components/pictureManage/improveImage.vue');                //完善照片信息
const PictureDetail = () => import  ('../components/pictureManage/pictureDetail.vue');               //相册详情
const VisitRecord = () => import  ('../components/rentManage/components/visitRecord.vue');               //回访记录
const IncompleteRecord = () => import  ('../components/rentManage/datumMessage/contractManage/components/incompleteRecord.vue'); //合同不齐记录
const ExamineRecord = () => import  ('../components/rentManage/datumMessage/contractManage/components/examineRecord');        //合同审批报表

const ReportManage = () => import  ('../components/reportManage/index.vue');
const BeforeExam = () => import  ('../components/lejiaCollege/OnlineExam/beforeExam.vue');  //开考之前
const BeforeNaire = () => import  ('../components/lejiaCollege/OnlineExam/beforeNaire.vue');  //开考之前
const MyNaire = () => import  ('../components/OAWork/questionnaire/myNaire/myNaire.vue');  //我的调查列表

const DataMove = () => import  ('../components/dataMove.vue');//数据迁移

const BatchEnter = () => import  ('../components/batchEnter/index'); //批量入账

const AchievementData = () => import ('../components/dataCenter/index'); //业绩数据
const dataAanalysis = () => import ('../components/dataAanalysis/index'); //数据分析
const ReportingData = () => import ('../components/reportManage/reportingData/index'); //报备数据

const Application = () => import ('../components/C-manage/applicationManage/index');
const Houses = () => import ('../components/C-manage/houseManage/index');
const DormManage = () => import ('../components/dormManage/index');
const OfficeManage = () => import ('../components/officeManage/index');

// B端管理
const UntiePhone = () => import ('../components/B-manage/untiePhone/index');

Vue.use(Router);

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   // component: Index,
    //   hidden:true,
    //   name: 'Index',
    //   redirect: '/main',
    // },

    {
      path: '/login',
      component: Login,
      name: '',
      hidden: true,
      meta: {
        keepAlive: true // 不需要缓存
      }
    },
    {
      path: '/download',
      component: Download,
      name: '',
      hidden: true,
      meta: {
        keepAlive: true, // 不需要缓存
        title: '乐伽公寓'
      }
    },

    {
      path: '/lock',
      component: Lock,
      name: '',
      hidden: true,
      meta: {
        keepAlive: true // 不需要缓存
      }
    },
    {
      path: '/rentingDetail',
      component: RentingDetail,
      name: '',
      hidden: true
    },
    {
      path: '/collectDetail',
      component: CollectDetail,
      name: '',
      hidden: true
    },
    {
      path: '/historyCollectDetail',
      component: HistoryCollectDetail,
      name: '',
      hidden: true
    },
    {
      path: '/historyRentingDetail',
      component: HistoryRentingDetail,
      name: '',
      hidden: true
    },
    {
      path: '/',
      component: Index,
      hidden: true,
      name: '',
      children: [
        {path: '/dataMove', component: DataMove, name: '数据迁移', icon: 'iconfont icon-daoru'},
      ]
    },
    {
      path: '/',
      component: Index,
      hidden: true,
      name: '',
      children: [
        // {path: '/main', component: Main, name: '公司门户', icon: 'iconfont icon-shouyemenhu'},
        {path: '/main', component: Converge, name: '员工广场', icon: "iconfont icon-shouyemenhu"},
      ]
    },

    //不正常的二级路由
    {
      path: '/',
      component: Index,
      name: '',
      abnormal: true,
      children: [
        {path: '/compony', component: Main, name: '公司门户', icon: 'iconfont icon-shouyemenhu'},
        {path: '/personnelStatement', component: PersonnelStatement, name: '人事报表'},
        {path: '/messageCenter', component: MessageCenter, name: '消息中心'},
        {path: '/sthToDoDetail', component: SthToDoDetail, name: '喜报详情'},
        {path: '/sthToDoDetail_2', component: SthToDoDetail_2, name: '喜报'},
        {path: '/personalSetting', component: PersonalSetting, name: '个人设置'},
        {path: '/checkWork', component: CheckWork, name: '考勤自助'},
        {path: '/register', component: Register, name: '签到自助'},
        {path: '/contractChange', component: ContractChange, name: 'TEST_1'},
        {path: '/deliver', component: Deliver, name: 'TEST_2'},
        {path: '/throwALease', component: throwALease, name: 'TEST_3'},
        {path: '/publicArticle', component: PublicArticle, name: '文章发布'},
        {path: '/individual', component: Individual, name: '个人门户'},
        {path: '/infodetails', component: Infodetails, name: '详情', selfLoading: true},
        {path: '/dailyRecord', component: DailyRecord, name: '日志管理'},
        // {path: '/sthToDo', component: SthToDo, name: '报备管理'},
        {path: '/integraldetail', component: Integraldetail, name: '积分明细'},
        {path: '/pictureManage', component: PictureManage, name: '相册管理'},
        {path: '/createAlbum', component: CreateAlbum, name: "创建相册",},
        {path: '/choosePictures', component: ChoosePictures, name: "选择照片",},
        {path: '/improveImgInfo', component: ImproveImgInfo, name: "完善照片信息",},
        {path: '/pictureDetail', component: PictureDetail, name: "相册详情",},
        {path: '/visitRecord', component: VisitRecord, name: "回访记录"},
        {path: '/incompleteRecord', component: IncompleteRecord, name: "合同补齐记录"},
        {path: '/examineRecord', component: ExamineRecord, name: "合同审批报表"},
        {path: '/configExam', component: ConfigExam, name: "管理试卷"},
        {path: '/batchQuestions', component: BatchQuestions, name: "批量导入试题"},
        {path: '/myselfQuestions', component: MyselfQuestions, name: "自己录入"},
        {path: '/previewExam', component: PreviewExam, name: "预览试卷"},
        {path: '/answerExam', component: AnswerExam, name: "考生答题"},
        {path: '/LineCollege', component: LineCollege, name: '考试列表', icon: "iconfont icon-zaixiankaoshi"},
        {path: '/lookExam', component: LookExam, name: "查看试卷"},
        {path: '/examinerRead', component: ExaminerRead, name: "阅卷管理"},
        {path: '/examinerReadEach', component: ExaminerReadEach, name: "试卷批阅"},
        {path: '/examinerShortAn', component: ExaminerShortAn, name: "简答批阅"},
        {path: '/answerCenter', component: AnswerCenter, name: "问答中心"},


        {path: '/configNaire', component: ConfigNaire, name: "管理问卷"},
        {path: '/previewNaire', component: PreviewNaire, name: "预览问卷"},
        {path: '/batchNaire', component: BatchNaire, name: "批量导入问卷"},
        {path: '/myselfNaire', component: MyselfNaire, name: "自己录入问卷"},
        {path: '/lookNaire', component: LookNaire, name: "调查统计"},
        {path: '/answerAll', component: AnswerAll, name: "所有回答"},
        {path: '/answerNaire', component: AnswerNaire, name: "问卷作答"},
        {path: '/beforeExam', component: BeforeExam, name: "我的考试"},
        {path: '/beforeNaire', component: BeforeNaire, name: "我的问卷"},
        {path: '/myNaire', component: MyNaire, name: "问卷列表"},
        {path: '/batchEnter', component: BatchEnter, name: "批量入账"},

        {path: '/reportingData', component: ReportingData, name: "报备数据汇总"},

        {path: '/pendingSettle', component: PendingSettle, name: "结算"},
        {path: '/leaveOffice', component: LeaveOffice, name: '离职短信',},
      ]
    },
    //快捷入口
    {
      path: '/',
      component: Index,
      name: '',
      abnormal: true,
      isShortcut: true,
      children: [
        {
          path: '/editArrange',
          component: EditArrange,
          name: '编辑排班',
          props:true
        }, 
        {path: '/clientManage', component: ClientManage, name: ' 客户管理 ', icon: "iconfont icon-kehu"},
        // {path: '/programme', component: Programme, name: ' 日程管理 ', icon:"iconfont icon-wodericheng"},
        {path: '/institution', component: Institution, name: ' 制度管理 ', icon: "iconfont icon-guizhangzhidu"},
        {path: '/counter', component: Counter, name: '业绩计算器', icon: "iconfont icon-jisuanqi"},
        {path: '/college', component: College, name: ' 乐伽大学 ', icon: "iconfont icon-leqiedaxue"},
        //{path: '/LineCollege', component: LineCollege, name: ' 成绩查询 ', icon:"iconfont icon-zaixiankaoshi"},
        {path: '/converge', component: Converge, name: ' 员工广场 ', icon: "iconfont icon-yuangongguangchang"},
        {path: '/individual', component: Individual, name: ' 个人门户 ', icon: "el-icons-fa-user"},
        {path: '/wholeRentManage', component: WholeRentManage, name: ' 整租管理 ', icon: "iconfont icon-pinzhizhengzu"},
        // {path: '/jointRentManage', component: JointRentManage, name: ' 合租管理 ', icon:"iconfont icon-hezu"},
        {path: '/housesManage', component: HousesManage, name: ' 产品管控中心 ', icon: "iconfont icon-fangzu"},
        {
          path: '/datumMessage/contractManage',
          component: ContractManage,
          name: ' 合同管理 ',
          icon: "iconfont icon-hetong1"
        },
        {path: '/examineAndApprove', component: ExamineAndApprove, name: ' 报备管理 ', icon: "iconfont icon-daiban"},
        // {path: '/examineAndApprove', component: ExamineAndApprove, name:  ' 审批 ', icon:"el-icon-edit-outline"},
        {path: '/reportManage', component: ReportManage, name: ' 喜报 ', icon: "iconfont icon-xibaoguanli"},
        {path: '/integralManage', component: IntegralManage, name: ' 积分管理 ', icon: "iconfont icon-jifen"},

      ]
    },
    // 详情路由
    {
      path: '/',
      component: Index,
      name: '',
      abnormal: true,
      children: [
        {path: '/villageManage/villageDetail', type: false, component: VillageDetail, name: '小区管理详情'},
      ]
    },


    {
      path: '/',
      component: Index,
      name: '房管中心',
      icon: 'iconfont icon-chanpinguankong',
      children: [
        {path: '/housesManage', component: HousesManage, name: '产品管控中心',},
        {path: '/villageManage', component: VillageManage, name: '小区管理',},
        {path: '/dormManage', component: DormManage, name: '宿舍管理',},
        {path: '/officeManage', component: OfficeManage, name: '办公室管理',},
      ]
    },

    {
      path: '/',
      component: Index,
      name: '租赁管理',
      icon: 'iconfont icon-zulin',
      children: [
        {path: '/wholeRentManage', component: WholeRentManage, name: '整租管理',},
        // {path: '/jointRentManage', component: JointRentManage, name: '合租管理',},
        // {path: '/datumMessage', component: DatumMessage, name: '资料管理',},
        // {path: '/clientManage', component: ClientManage, name: '客户管理',},
        {path: '/contractManage', component: ContractManage, name: '合同管理',},
        // {path: '/workOrderManage', component: WorkOrderManage, name: '工单管理',},
        // {
        //   path: '/datumMessage', component: DatumMessage, icon: 'el-icons-fa-money', name: '资料管理',
        //   children: [
        //     {path: '/datumMessage/housesManage', component: HousesManage, name: '产品管控中心',},
        //     {path: '/datumMessage/clientManage', component: ClientManage, name: '客户管理',},
        //     {path: '/datumMessage/contractManage', component: ContractManage, name: '合同管理',},
        //   ]
        // },
        // {path: '/repairManage', component: RepairManage, name: '维修管理',}
      ]
    },
    {
      path: '/',
      component: Index,
      name: '客服中心',
      icon: 'iconfont icon--1',
      children: [
        {path: '/workOrderManage', component: WorkOrderManage, name: '工单管理',},
        {path: '/repairManage', component: RepairManage, name: '维修管理',},
        {path: '/customerService', component: CustomerService, name: '回访管理',},
        {path: '/ExpenseAccount', component: ExpenseAccount, name: '报销管理',},
        {path: '/retreatManage', component: RetreatManage, name: '退租管理',},
      ]
    },

    // {
    //   path: '/',
    //   component: Index,
    //   name: '财务账本',
    //   icon: 'iconfont icon-caiwu1',
    //   children: [
    //     // {path: '/accountManage', component: AccountManage, name: '账户管理',},
    //     // {path: '/subjectManage', component: SubjectManage, name: '科目管理',},
    //     // {path: '/foundation', component: Foundation, name: '基础管理'},
    //     // {path: '/fundMessage', component: FundMessage, name: '款项管理'},
    //
    //     // {path: '/statistics', component: Statistics, name: '数据统计'},
    //     // {path: '/incomeFlow', component: IncomeFlow, name: '收支流水'},
    //     {path: '/clientMessage', component: ClientMessage, name: '客户管理'},
    //     {path: '/pendingItem', component: PendingItem, name: '待处理项'},
    //   ]
    // },

    {
      path: '/statistics/staticDetail',
      component: StaticDetail,                  //数据统计详情
      name: '',
      hidden: true
    },

    {
      path: '/',
      component: Index,
      hidden: true,
      name: '',
      children: [
        // {path: '/wechatMessage', component: WechatMessage, name: '微信管理', icon: 'iconfont icon-weixin'},
      ]
    },

    // {
    //   path: '/',
    //   component: Index,
    //   name: '微信管理',
    //   icon: 'el-icons-fa-sitemap',
    //   children: [
    //     {path: '/reimbursement', component: Reimbursement, name: '微信报销'},
    //     {path: '/complain', component: Complain, name: '微信投诉',},
    //     {path: '/lookHouse', component: LookHouse, name: '预约看房',},
    //     {path: '/league', component: League, name: '房东加盟',},
    //     {path: '/feedback', component: Feedback, name: '意见 反馈',},
    //   ]
    // },

    {
      path: '/',
      component: Index,
      name: '人资管理',
      icon: 'iconfont icon-renzi',
      children: [
        // {path: '/staffManage', component: StaffManage, name: '用户管理',},
        // {path: '/organization', component: Organization, name: '组织架构',},
        {path: '/OrganizationNew', component: OrganizationNew, name: '组织架构',},
        {path: '/integralManage', component: IntegralManage, name: '积分管理',},
        {path: '/staffRecords', component: StaffRecords, name: '员工档案',},
        // {path: '/personalRecords', component: PersonalRecords, name: '人事报表',},
        // {path: '/achievement', component: Achievement, name: '业绩工资',},
      ]
    },
    //write by shuisheng 2018-10-24
    {
      path: '/',
      component: Index,
      name: '考勤管理',
      icon: 'el-icon-document',
      children: [
        {
          path: '/arrangeSetting',component: ArrangeSetting, name: '排班设置',
          // children: [
          //   {
          //     // path: '/watchArrange',component: WatchArrange, name: '查看排班',
          //     children: [
          //       {
          //         // path: '/',component: MarkInfo, name: '标记信息'
          //       }
          //     ]
          //   }
          // ]
        },
        {
          path: '/attendanceRecord',component: attendanceRecord,name: '考勤记录',
        },
        {
          path: '/monthlySummary', component: monthlySummary, name: '月度总汇'
        }
      ]
    },
    {
      path: '/',
      component: Index,
      name: 'HRM',
      icon: 'iconfont icon-renzi',
      children: [
        {
          path: '/teamManage', component: TeamManage, name: '人员信息管理',
          children: [
            {path: '/teamManage/roster', component: Roster, name: '花名册'},
            // {path: '/teamManage/entryManage', component: EntryManage, name: '入职管理'},
            {path: '/becomeFormal', component: BecomeFormal, name: '转正管理'},
            {path: '/transferPosition', component: TransferPosition, name: '调岗管理'},
            {path: '/dimission', component: Dimission, name: '离职管理'},
          ],
        },
      ]
    },
    {
      path: '/staffDetail',
      component: StaffDetail,
      name: '',
      hidden: true
    },
    // {
    //   path: '/',
    //   component: Index,
    //   name: '喜报管理',
    //   icon: 'el-icons-fa-money',
    //   children: [
    //     {path: '/collectBulletin', component: CollectBulletin, name: '收房喜报',},
    //     {path: '/rentBulletin', component: RentBulletin, name: '租房喜报',},
    //     {path: '/finalBalance', component: FinalBalance, name: '尾款报备',},
    //     {path: '/specialBalance', component: SpecialBalance, name: '特殊情况报备',},
    //     {path: '/auditing', component: Auditing, name: '审核',},
    //   ]
    // },

    {
      path: '/',
      component: Index,
      name: 'OA办公',
      icon: 'iconfont icon-oa',
      children: [
        // {
        //   path: '/property', component: Property, icon: 'el-icons-fa-money', name: '资产管理',
        //   children: [
        //     {path: '/property/suppliesUse', component: SuppliesUse, name: '办公用品申领'},
        //     {path: '/property/suppliesGather', component: SuppliesGather, name: '办公用品汇总'},
        //     {path: '/property/capitalChange', component: CapitalChange, name: '固定资产异动'},
        //     {path: '/property/capitalGather', component: CapitalGather, name: '固定资产汇总'},
        //   ]
        // },
        // {path: '/property', component: Property, name: '资产管理'},

        {path: '/articleMessage', component: ArticleMessage, name: '文章管理'},

        {path: '/examineAndApprove', component: ExamineAndApprove, name: '报备管理 '},

        // {path: '/communication', component: Communication, name: '通讯管理',},
        // {path: '/programme', component: Programme, name: '日程管理',},
        // {path: '/institution', component: Institution, name: '制度管理',},
        // {path: '/vote', component: Vote, name: '投票管理',},
        // {path: '/counter', component: Counter, name: '业绩计算器',},
        {path: '/management', component: Management, name: '办公管理'},

        // {path: '/contractClaim', component: ContractClaim, name: '合同认领',},
        {path: '/pagerData', component: PagerData, name: '纸质资料'},
        // {path: '/knowledge', component: Knowledge, name: '知识管理',},
        {path: '/questionnaire', component: Questionnaire, name: "问卷调查"},

      ]
    },

    {
      path: '/',
      component: Index,
      name: '乐伽大学',
      icon: 'iconfont icon-daxue',
      children: [
        {path: '/college', component: College, name: '乐伽大学 '},
        {path: '/OnlineExam', component: OnlineExam, name: '在线考试'},
        {path: '/examinerRead', component: ExaminerRead, name: '考官判卷'},

      ]
    },
    {
      path: '/',
      component: Index,
      name: '业绩工资',
      icon: 'iconfont icon--',
      children: [
        {path: '/periodicTable', component: PeriodicTable, name: '周期表',},
        {path: '/achievement', component: Achievement, name: '业绩',},
        {path: '/personalSalary', component: PersonalSalary, name: '工资',},

      ]
    },
    {
      path: '/',
      component: Index,
      name: '数据中心',
      icon: 'iconfont icon-shuju',
      children: [
        {path: '/achievementData', component: AchievementData, name: '业绩数据',},
        // {path: '/dataAanalysis', component: dataAanalysis, name: '分析平台',},
      ]
    },
    {
      path: '/',
      component: Index,
      name: '系统设置',
      icon: 'iconfont icon-shezhi1',
      children: [
        {path: '/moduleSetting', component: ModuleSetting, name: '模块设置'},

        // {path: '/message/message', component: Message, name: '短信模板'},
        // {path: '/loginRecord', component: LoginRecord, name: '登陆日志',},
        // {path: '/userDictionary', component: UserDictionary, name: '用户字典',},
        // {path: '/roleManage', component: RoleManage, name: '角色管理',},
        // {path: '/powerManage', component: PowerManage, name: '权限管理',},
        {path: '/managerSetting', component: ManagerSetting, name: '管理员设置'},

        // {path: '/recycle', component: Recycle, name: '回收站',},
        // {path: '/contractModule', component: ContractModule, name: '合同模板',},
        // {path: '/exportManage', component: ExportManage, name: '导出管理',},
      ]
    },
    {
      path: '/',
      component: Index,
      name: 'C端管理',
      icon: 'iconfont icon-c-',
      children: [
        {path: '/application', component: Application, name: '申请管理'},
        {path: '/houses', component: Houses, name: '房源管理'},
      ]
    },
    {
      path: '/',
      component: Index,
      name: 'B端管理',
      icon: 'iconfont icon-b',
      children: [
        {path: '/untiePhone', component: UntiePhone, name: '手机解绑'},
      ]
    },
  ]
})


