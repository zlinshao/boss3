import Vue from 'vue'
import Router from 'vue-router'

//路由
import Login from '../components/Login.vue'
import Index from '../components/index.vue'
import Main from '../components/main.vue'
import Lock from '../components/common/lockScreen/components/lockedScreen.vue'


//租赁管理
import WholeRentManage from '../components/rentManage/wholeRentManage/index.vue'
import JointRentManage from '../components/rentManage/jointRentManage/index.vue'

// import ContractManage from '../comments/rentManage/datumMessage/contractManage/index.vue'
// import ClientManage from '../comments/rentManage/datumMessage/clientManage/index.vue'
// import HousesManage from '../comments/rentManage/datumMessage/housesManage/index.vue'
// import RepairManage from '../comments/rentManage/repairManage/index.vue'
import DatumMessage from '../components/rentManage/datumMessage/index.vue'                    //资料管理


// 财务账本
// import AccountManage from '../comments/finance/accountManage/index'                      //账户管理
// import SubjectManage from '../comments/finance/subjectManage/index'                      //科目管理
import Foundation from '../components/finance/foundation/index'                               //基础管理

// import RoomCharge from '../comments/finance/roomCharge/index'                            //房租总汇
// import OtherSum from '../comments/finance/otherSum/index'                                //剩余款项总汇
import FundMessage from '../components/finance/fundMessage/index.vue'                         //款项管理

// import BudgetManage from '../comments/finance/budgetManage/index'                        //预算管理
// import EndPayment from '../comments/finance/endPayment/index'                            //尾款报备
import StaticDetail from '../components/finance/statistics/components/staticDetail'           //统计详情
import Statistics from '../components/finance/statistics/index.vue'                           //数据统计
import IncomeFlow from '../components/finance/incomeFlow/index'                               //收支流水


// 微信管理
// import Reimbursement from '../comments/wechatMessage/reimbursement/index.vue'            //微信报销
// import Complain from '../comments/wechatMessage/complain/index.vue'                      //微信投诉
// import LookHouse from '../comments/wechatMessage/lookHouse/index.vue'                    //预约看房
// import League from '../comments/wechatMessage/league/index.vue'                          //房东加盟
// import Feedback from '../comments/wechatMessage/feedback/index.vue'                      //意见反馈
import WechatMessage from '../components/wechatMessage/index.vue'                             //微信管理


//人资管理
// import StaffManage from '../comments/humanResource/staffManage/index.vue'
import Organization from '../components/humanResource/organization/index.vue'
// import Achievement from '../comments/humanResource/achievement/index.vue'
import IntegralManage from '../components/humanResource/integralManage/index.vue'


//OA办公
// import Communication from '../comments/OAWork/communication/index.vue'                 //通讯管理
// import Programme from '../comments/OAWork/programme/index.vue'                         //日程管理
// import Institution from '../comments/OAWork/institution/index.vue'                     //制度管理
// import Vote from '../comments/OAWork/vote/index.vue'                                   //投票管理
// import Counter from '../comments/meritPay/counter/index'                               //业绩计算器
import Management from '../components/OAWork/management/index.vue'                          //办公管理

// import SuppliesUse from '../comments/OAWork/property/items/officeSuppliesUse.vue'                       //办公用品申领
// import SuppliesGather from '../comments/OAWork/property/officeSuppliesGather/officeSuppliesGather.vue'  //办公用品汇总
// import CapitalChange from '../comments/OAWork/property/items/capitalAssetsChange.vue'                   //固定资产异动
// import CapitalGather from '../comments/OAWork/property/items/capitalAssetsGather.vue'                   //固定资产总汇
import Property from '../components/OAWork/property/index.vue'                                               //资产管理

// import ArticleMessage from '../comments/OAWork/articleMessage/staffSquare/index.vue'                    //员工广场
import PublicArticle from '../components/OAWork/articleMessage/staffSquare/components/PublicArticle.vue'     //文章发布
import ArticleMessage from '../components/OAWork/articleMessage/index.vue'                                   //文章管理

// import ContractClaim from '../comments/OAWork/pagerData/contractClaim/index.vue'
import PagerData from '../components/OAWork/pagerData/index.vue'                        //纸质资料

// import Knowledge from '../comments/OAWork/knowledge/index.vue'                     //知识管理

import ExamineAndApprove from '../components/OAWork/examineAndApprove/index.vue'


// 乐伽大学
import LineCollege from '../components/lejiaCollege/OnlineExam/index.vue'
import College from '../components/lejiaCollege/college/index.vue'


// 系统设置
import ModuleSetting from '../components/systemSetting/moduleSetting/index.vue'                             //模块设置

// import Message from '../comments/systemSetting/message/index.vue'                                      //短信模板
// import LoginRecord from '../comments/systemSetting/loginRecord/index.vue'                              //登陆日志
// import UserDictionary from '../comments/systemSetting/userDictionary/index.vue'                        //用户字典
// import RoleManage from '../comments/systemSetting/roleManage/index.vue'                                //角色管理
// import PowerManage from '../comments/systemSetting/powerManage/index.vue'                              //权限管理
// import VillageManage from '../comments/systemSetting/villageManage/index.vue'                          //小区管理
import VillageDetail from '../components/systemSetting/managerSetting/villageManage/villageDetail.vue'      //小区管理详情
import ManagerSetting from '../components/systemSetting/managerSetting/index.vue'                           //管理员设置


// import Recycle from '../comments/systemSetting/recycleBin/index.vue'                                   //回收站
// import contractModule from '../comments/systemSetting/contractModule/index.vue'                        //合同模板
// import ExportManage from '../comments/systemSetting/exportManage/index.vue'                            //导出管理


//喜报管理
import CollectBulletin from '../components/bulletin/collectBulletin/index.vue'            //收房喜报
import RentBulletin from '../components/bulletin/rentBulletin/index.vue'                  //租房喜报
import FinalBalance from '../components/bulletin/finalBalance/index.vue'                  //尾款报备
import SpecialBalance from '../components/bulletin/specialBalance/index.vue'              //特殊情况报备
import Auditing from '../components/bulletin/auditing/index.vue'                          //审核


// 业绩工资
import PeriodicTable from '../components/meritPay/periodicTable/index'
import Achievement from '../components/meritPay/achievement/index'
import PersonalSalary from '../components/meritPay/personalSalary/index'


import RentingDetail from '../components/rentManage/rentingDetail.vue'

import MessageCenter from '../components/messageCenter/index.vue'                         //消息中心
import SthToDoDetail from '../components/OAWork/sthToDo/components/detail_1.vue'          //喜报详情
import SthToDoDetail_2 from '../components/OAWork/sthToDo/components/detail_2.vue'        //喜报
import PersonalSetting from '../components/personalSetting/index.vue'                     //个人设置
import CheckWork from '../components/checkWork/index.vue'                                 //考勤自助
import Register from '../components/register/index.vue'                                   //签到自助
import ContractChange from '../components/OAWork/sthToDo/components/contractChange.vue'   //TEST_1
import Deliver from '../components/OAWork/sthToDo/components/deliver.vue'                 //TEST_2
import throwALease from '../components/OAWork/sthToDo/components/throwALease.vue'         //TEST_3
import Individual from '../components/individual/index.vue'                               //个人门户

import Converge from '../components/converge/index.vue'                                   //员工广场
import Infodetails from '../components/converge/details/infodetails.vue'                  //员工广场详情
import DailyRecord from '../components/dailyRecord/index.vue'                             //日志管理
import SthToDo from '../components/OAWork/sthToDo/index.vue'                              //待办事项


import Integraldetail from '../components/integraldetail/integraldetail.vue'         // 积分明细

import PictureManage from '../components/pictureManage/pictureManage.vue'                //相册管理
import CreateAlbum from '../components/pictureManage/createAlbum.vue'                //创建相册
import ChoosePictures from '../components/pictureManage/selectPictures.vue'                //选择照片
import ImproveImgInfo from '../components/pictureManage/improveImage.vue'                //完善照片信息
import PictureDetail from '../components/pictureManage/pictureDetail.vue';               //相册详情
import VisitRecord from '../components/rentManage/components/visitRecord.vue';               //回访记录

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
      hidden: true
    },

    {
      path: '/lock',
      component: Lock,
      name: '',
      hidden: true
    },

    {
      path: '/rentingDetail',
      component: RentingDetail,
      name: '',
      hidden: true
    },

    {
      path: '/',
      component: Index,
      hidden: true,
      name: '',
      children: [
        {path: '/main', component: Main, name: '主页', icon: 'el-icon-menu'},
        {path: '/converge', component: Converge, name: '员工广场', icon: 'el-icon-menu',},
      ]
    },

    //不正常的二级路由
    {
      path: '/',
      component: Index,
      name: '',
      abnormal: true,
      children: [
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
        {path: '/infodetails', component: Infodetails, name: '详情', selfLoading:true},
        {path: '/dailyRecord', component: DailyRecord, name: '日志管理'},
        {path: '/sthToDo', component: SthToDo, name: '待办事项'},
        {path: '/integraldetail', component: Integraldetail, name: '积分明细'},
        {path: '/pictureManage', component: PictureManage, name: '相册管理'},
        {path: '/createAlbum', component: CreateAlbum, name: "创建相册",},
        {path: '/choosePictures', component: ChoosePictures, name: "选择照片",},
        {path: '/improveImgInfo', component: ImproveImgInfo, name: "完善照片信息",},
        {path: '/pictureDetail', component: PictureDetail, name: "相册详情",},
        {path: '/visitRecord', component: VisitRecord, name: "回访记录"},

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
      name: '租赁管理',
      icon: 'iconfont icon-zulinguanli',
      children: [
        {path: '/wholeRentManage', component: WholeRentManage, name: '整租管理',},
        {path: '/jointRentManage', component: JointRentManage, name: '合租管理',},
        {path: '/datumMessage', component: DatumMessage, name: '资料管理',},
        // {
        //   path: '/datumMessage', component: DatumMessage, icon: 'el-icons-fa-money', name: '资料管理',
        //   children: [
        //     {path: '/datumMessage/housesManage', component: HousesManage, name: '房屋管理',},
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
      name: '财务账本',
      icon: 'iconfont icon-caiwuzhangben',
      children: [
        // {path: '/accountManage', component: AccountManage, name: '账户管理',},
        // {path: '/subjectManage', component: SubjectManage, name: '科目管理',},
        {path: '/foundation', component: Foundation, name: '基础管理'},

        // {path: '/roomCharge', component: RoomCharge, name: '房租款项总汇'},
        // {path: '/otherSum', component: OtherSum, name: '其余款项总汇'},
        {path: '/fundMessage', component: FundMessage, name: '款项管理'},

        // {path: '/budgetManage', component: BudgetManage, name: '预算管理'},
        // {path: '/endPayment', component: EndPayment, name: '尾款房租'},
        {path: '/statistics', component: Statistics, name: '数据统计'},
        {path: '/incomeFlow', component: IncomeFlow, name: '收支流水'},
      ]
    },

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
        {path: '/wechatMessage', component: WechatMessage, name: '微信管理', icon: 'iconfont icon-weixinguanli1'},
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
    //     {path: '/feedback', component: Feedback, name: '意见反馈',},
    //   ]
    // },

    {
      path: '/',
      component: Index,
      name: '人资管理',
      icon: 'iconfont icon-renziguanli',
      children: [
        // {path: '/staffManage', component: StaffManage, name: '用户管理',},
        {path: '/organization', component: Organization, name: '组织架构',},
        {path: '/integralManage', component: IntegralManage, name: '积分管理',},
        // {path: '/achievement', component: Achievement, name: '业绩工资',},
      ]
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
      icon: 'iconfont icon-oabangong',
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
        {path: '/property', component: Property, name: '资产管理'},

        {path: '/articleMessage', component: ArticleMessage, name: '文章管理'},

        {path: '/examineAndApprove', component: ExamineAndApprove, name: '审批管理'},

        // {path: '/communication', component: Communication, name: '通讯管理',},
        // {path: '/programme', component: Programme, name: '日程管理',},
        // {path: '/institution', component: Institution, name: '制度管理',},
        // {path: '/vote', component: Vote, name: '投票管理',},
        // {path: '/counter', component: Counter, name: '业绩计算器',},
        {path: '/management', component: Management, name: '办公管理'},

        // {path: '/contractClaim', component: ContractClaim, name: '合同认领',},
        {path: '/pagerData', component: PagerData, name: '纸质资料'},
        // {path: '/knowledge', component: Knowledge, name: '知识管理',},

      ]
    },

    {
      path: '/',
      component: Index,
      name: '乐伽大学',
      icon: 'iconfont icon-leqiedaxue1',
      children: [
        {path: '/college', component: College, name: '乐伽大学 '},
        {path: '/LineCollege', component: LineCollege, name: '在线考试'},
      ]
    },
    {
      path: '/',
      component: Index,
      name: '系统设置',
      icon: 'iconfont icon-xitongshezhi1',
      children: [
        {path: 'moduleSetting', component: ModuleSetting, name: '模块设置'},

        // {path: '/message/message', component: Message, name: '短信模板'},
        // {path: '/loginRecord', component: LoginRecord, name: '登陆日志',},
        // {path: '/userDictionary', component: UserDictionary, name: '用户字典',},
        // {path: '/roleManage', component: RoleManage, name: '角色管理',},
        // {path: '/powerManage', component: PowerManage, name: '权限管理',},
        // {path: '/villageManage', component: VillageManage, name: '小区管理',},
        {path: 'managerSetting', component: ManagerSetting, name: '管理员设置'},

        // {path: '/recycle', component: Recycle, name: '回收站',},
        // {path: '/contractModule', component: ContractModule, name: '合同模板',},
        // {path: '/exportManage', component: ExportManage, name: '导出管理',},
      ]
    },

    {
      path: '/',
      component: Index,
      name: '业绩工资',
      icon: 'el-icons-fa-money',
      children: [
        {path: '/periodicTable', component: PeriodicTable, name: '周期表',},
        {path: '/achievement', component: Achievement, name: '业绩',},
        {path: '/personalSalary', component: PersonalSalary, name: '工资',},
      ]
    },

  ]
})


