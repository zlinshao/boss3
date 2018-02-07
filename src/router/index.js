import Vue from 'vue'
import Router from 'vue-router'

//路由
import Login from '../components/Login.vue'
import Index from '../components/index.vue'
import Main from '../components/main.vue'
import Lock from '../components/common/lockScreen/components/lockedScreen.vue'

import Recycle from '../components/systemSetting/recycleBin/index.vue'                //回收站
import ContractMould from '../components/systemSetting/contractMould/index.vue'       //合同模板

import LoginRecord from '../components/systemSetting/loginRecord/index.vue'           //操作记录
import UserDictionary from '../components/systemSetting/userDictionary/index.vue'

import Message from '../components/systemSetting/message/index.vue'                   //短信
import MessageList from '../components/systemSetting/message/messageList.vue'         //短信
import MessageModule from '../components/systemSetting/message/messageModule.vue'     //短信
import RoleManage from '../components/systemSetting/roleManage/index.vue'
import PowerManage from '../components/systemSetting/powerManage/index.vue'
import VillageManage from '../components/systemSetting/villageManage/index.vue'
import ExportManage from '../components/systemSetting/exportManage/index.vue'

//喜报管理
import CollectBulletin from '../components/bulletin/collectBulletin/index.vue'            //收房喜报
import RentBulletin from '../components/bulletin/rentBulletin/index.vue'                  //租房喜报
import FinalBalance from '../components/bulletin/finalBalance/index.vue'                  //尾款报备
import SpecialBalance from '../components/bulletin/specialBalance/index.vue'              //特殊情况报备
import Auditing from '../components/bulletin/auditing/index.vue'                          //审核

// 财务账本
import AccountManage from '../components/finance/accountManage/index'                 //账户管理
import SubjectManage from '../components/finance/subjectManage/index'                 //科目管理
import RoomCharge from '../components/finance/roomCharge/index'                       //房租总汇
import OtherSum from '../components/finance/otherSum/index'                           //剩余款项总汇
import BudgetManage from '../components/finance/budgetManage/index'                   //预算管理
import Statistics from '../components/finance/statistics/index'                       //统计
import StaticDetail from '../components/finance/statistics/components/staticDetail'   //统计详情
import EndPayment from '../components/finance/endPayment/index'                       //尾款报备
import IncomeFlow from '../components/finance/incomeFlow/index'                       //收支流水

// 业绩工资
import PeriodicTable from '../components/meritPay/periodicTable/index'
import Achievement from '../components/meritPay/achievement/index'
import PersonalSalary from '../components/meritPay/personalSalary/index'


//租赁管理
import WholeRentManage from '../components/rentManage/wholeRentManage/index.vue'
import JointRentManage from '../components/rentManage/jointRentManage/index.vue'
import ContractManage from '../components/rentManage/contractManage/index.vue'
import ClientManage from '../components/rentManage/clientManage/index.vue'
import HousesManage from '../components/rentManage/housesManage/index.vue'
import RepairManage from '../components/rentManage/repairManage/index.vue'

//OA办公
import Communication from '../components/OAWork/communication/index.vue'
import Programme from '../components/OAWork/programme/index.vue'
import Knowledge from '../components/OAWork/knowledge/index.vue'
import Institution from '../components/OAWork/institution/index.vue'
import Portals from '../components/OAWork/portals/index.vue'
import Vote from '../components/OAWork/vote/index.vue'
import ContractClaim from '../components/OAWork/contractClaim/index.vue'
import Property from '../components/OAWork/property/index.vue'
import SuppliesUse from '../components/OAWork/property/items/officeSuppliesUse.vue'
import SuppliesGather from '../components/OAWork/property/officeSuppliesGather/ officeSuppliesGather.vue'
import CapitalChange from '../components/OAWork/property/items/capitalAssetsChange.vue'
import CapitalGather from '../components/OAWork/property/items/capitalAssetsGather.vue'
import SthToDo from '../components/OAWork/sthToDo/index.vue'
import SthToDoDetail from '../components/OAWork/sthToDo/components/detail.vue'


//人资管理
import StaffManage from '../components/humanResource/staffManage/index.vue'
// import Organization from '../components/humanResource/organization/index.vue'
// import Achievement from '../components/humanResource/achievement/index.vue'

import RentingDetail from '../components/rentManage/rentingDetail.vue'

import MessageCenter from '../components/messageCenter/index.vue'

Vue.use(Router);

export default new Router({
  routes: [

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
      ]
    },
    //不正常的二级路由
    {
      path: '/',
      component: Index,
      name: '',
      abnormal:true,
      children: [
        {path: '/messageCenter', component: MessageCenter, name: '消息中心'},
        {path: '/sthToDoDetail', component: SthToDoDetail, name: '喜报详情'},
      ]
    },

    {
      path: '/',
      component: Index,
      name: '租赁管理',
      icon: 'el-icons-fa-home',
      children: [
        {path: '/wholeRentManage', component: WholeRentManage, name: '整租管理',},
        {path: '/jointRentManage', component: JointRentManage, name: '合租管理',},
        {path: '/housesManage', component: HousesManage, name: '房屋管理',},
        {path: '/clientManage', component: ClientManage, name: '客户管理',},
        {path: '/contractManage', component: ContractManage, name: '合同管理',},
        // {path: '/repairManage', component: RepairManage, name: '维修管理',}
      ]
    },

    {
      path: '/',
      component: Index,
      name: '财务账本',
      icon: 'el-icon-tickets',
      children: [
        {path: '/accountManage', component: AccountManage, name: '账户管理',},
        {path: '/subjectManage', component: SubjectManage, name: '科目管理',},
        {path: '/roomCharge', component: RoomCharge, name: '房租款项总汇',},
        {path: '/otherSum', component: OtherSum, name: '其余款项总汇',},
        {path: '/statistics', component: Statistics, name: '报表统计',},
        {path: '/budgetManage', component: BudgetManage, name: '预算管理',},
        {path: '/endPayment', component: EndPayment, name: '尾款房租',},
        {path: '/incomeFlow', component: IncomeFlow, name: '收支流水',},
      ]
    },

    {
      path: '/',
      component: Index,
      name: '喜报管理',
      icon: 'el-icons-fa-money',
      children: [
        {path: '/collectBulletin', component: CollectBulletin, name: '收房喜报',},
        {path: '/rentBulletin', component: RentBulletin, name: '租房喜报',},
        {path: '/finalBalance', component: FinalBalance, name: '尾款报备',},
        {path: '/specialBalance', component: SpecialBalance, name: '特殊情况报备',},
        {path: '/auditing', component: Auditing, name: '审核',},
      ]
    },

    {
      path: '/statistics/staticDetail',
      component: StaticDetail,
      name: '',
      hidden: true
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

    {
      path: '/',
      component: Index,
      name: '人资管理',
      icon: 'el-icons-fa-sitemap',
      children: [
        {path: '/staffManage', component: StaffManage, name: '用户管理',},
        // {path: '/organization', component: Organization, name: '组织架构',},
        // {path: '/achievement', component: Achievement, name: '业绩工资',},
      ]
    },
    {
      path: '/',
      component: Index,
      name: 'OA办公',
      icon: 'el-icons-fa-clipboard',
      children: [
        {
          path: '/property', component: Property, icon: 'el-icons-fa-money', name: '资产管理',
          children: [
            {path: '/property/suppliesUse', component: SuppliesUse, name: '办公用品申领'},
            {path: '/property/suppliesGather', component: SuppliesGather, name: '办公用品汇总'},
            {path: '/property/capitalChange', component: CapitalChange, name: '固定资产异动'},
            {path: '/property/capitalGather', component: CapitalGather, name: '固定资产汇总'},
          ]
        },
        {path: '/property/sthToDo', component: SthToDo, name: '待办事项'},
        {path: '/communication', component: Communication, name: '通讯管理',},
        {path: '/programme', component: Programme, name: '日程管理',},
        {path: '/knowledge', component: Knowledge, name: '知识管理',},
        {path: '/institution', component: Institution, name: '制度管理',},
        {path: '/portals', component: Portals, name: '门户管理',},
        {path: '/vote', component: Vote, name: '投票管理',},
        {path: '/contractClaim', component: ContractClaim, name: '合同认领',},
      ]
    },
    {
      path: '/',
      component: Index,
      name: '系统设置',
      icon: 'el-icon-setting',
      children: [

        {
          path: '/recycle',
          component: Recycle,
          icon: 'el-icon-delete',
          name: '回收站',
        },
        {
          path: '/contractMould',
          component: ContractMould,
          icon: 'el-icon-document',
          name: '合同模板',
        },
        {
          path: '/message',
          component: Message,
          icon: 'el-icon-message',
          name: '短信模块',
          children: [
            {path: '/message/messageList', component: MessageList, name: '短信列表'},
            {path: '/message/messageModule', component: MessageModule, name: '短信模板'},
          ]
        },
        {path: '/loginRecord', component: LoginRecord, name: '登陆日志',},
        {path: '/userDictionary', component: UserDictionary, name: '用户字典',},
        {path: '/roleManage', component: RoleManage, name: '角色管理',},
        {path: '/powerManage', component: PowerManage, name: '权限管理',},
        {path: '/villageManage', component: VillageManage, name: '小区管理',},
        {path: '/exportManage', component: ExportManage, name: '导出管理',},
      ]
    },

  ]
})


