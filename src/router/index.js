import Vue from 'vue'
import Router from 'vue-router'

//路由
import Login from '../components/Login.vue'
import Index from '../components/index.vue'
import Main from '../components/main.vue'
import Lock from '../components/common/lockScreen/components/lockedScreen.vue'

import Recycle from '../components/systemSetting/recycleBin/index.vue'  //回收站
import ContractRecycle from '../components/systemSetting/recycleBin/contratRecycle.vue'

import LoginRecord from '../components/systemSetting/loginRecord/index.vue'       // 操作记录
import UserDictionary from '../components/systemSetting/userDictionary/index.vue'

import Message from '../components/systemSetting/message/index.vue'                 //短信
import MessageList from '../components/systemSetting/message/messageList.vue'                 //短信
import MessageModule from '../components/systemSetting/message/messageModule.vue'                 //短信

//租赁管理
import WholeRentManage from '../components/rentManage/wholeRentManage/index.vue'
import ContractManage from '../components/rentManage/contractManage/index.vue'
import ClientManage from '../components/rentManage/clientManage/index.vue'
import HousesManage from '../components/rentManage/housesManage/index.vue'
import RepairManage from '../components/rentManage/repairManage/index.vue'

//右键
import ContextMenu from '../components/contextMenu/index.vue'

import CommonComponent from '../components/commonComponent/index.vue'                     //通用组件
//OA办公
import Communication from '../components/OAWork/communication/index.vue'
import Programme from '../components/OAWork/programme/index.vue'
import Knowledge from '../components/OAWork/knowledge/index.vue'
import Institution from '../components/OAWork/institution/index.vue'
import Portals from '../components/OAWork/portals/index.vue'
import Property from '../components/OAWork/property/index.vue'
import Vote from '../components/OAWork/vote/index.vue'
import ContractClaim from '../components/OAWork/contractClaim/index.vue'

//人资管理
import StaffManage from '../components/humanResource/staffManage/index.vue'
import Organization from '../components/humanResource/organization/index.vue'
import Achievement from '../components/humanResource/achievement/index.vue'

Vue.use(Router)

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
      path: '/',
      component: Index,
      hidden:true,
      name: 'Index',
      children: [
        { path: '/main', component: Main, name: '主页',icon:'el-icon-menu'},
        { path: '/contextMenu', component: ContextMenu, name: '右键测试',icon:'el-icon-view'},
        { path: '/commonComponent', component: CommonComponent, name: '通用组件',icon:'el-icon-goods'},
      ]
    },
    {
      path: '/',
      component: Index,
      name: '租赁管理',
      icon:'el-icons-fa-home',
      children: [
        { path: '/wholeRentManage', component: WholeRentManage, name: '整租管理',},
        { path: '/housesManage', component: HousesManage, name: '房屋管理',},
        { path: '/clientManage', component: ClientManage, name: '客户管理',},
        { path: '/contractManage', component: ContractManage, name: '合同管理',},
        { path: '/repairManage', component: RepairManage, name: '维修管理',}
      ]
    },
    {
      path: '/',
      component: Index,
      name: '人资管理',
      icon:'el-icons-fa-sitemap',
      children: [
        { path: '/staffManage', component: StaffManage, name: '员工管理',},
        { path: '/organization', component: Organization, name: '组织架构',},
        { path: '/achievement', component: Achievement, name: '业绩工资',},
      ]
    },
    {
      path: '/',
      component: Index,
      name: 'OA办公',
      icon:'el-icons-fa-clipboard',
      children: [
        { path: '/communication', component: Communication, name: '通讯管理',},
        { path: '/programme', component: Programme, name: '日程管理',},
        { path: '/knowledge', component: Knowledge, name: '知识管理',},
        { path: '/institution', component: Institution, name: '制度管理',},
        { path: '/property', component: Property, name: '资产管理',},
        { path: '/portals', component: Portals, name: '门户管理',},
        { path: '/vote', component: Vote, name: '投票管理',},
        { path: '/contractClaim', component: ContractClaim, name: '合同认领',},
      ]
    },
    {
      path: '/',
      component: Index,
      name: '系统设置',
      icon:'el-icon-setting',
      children: [
        { path: '/loginRecord', component: LoginRecord,name: '登陆日志',},
        { path: '/userDictionary', component: UserDictionary, name: '用户字典',},

        { path: '/recycle',
          component: Recycle,
          icon:'el-icon-delete',
          name: '回收站',
          children:[
            { path: '/recycle/contractRecycle',component: ContractRecycle, name: '回收合同'},
          ]
        },
        { path: '/message',
          component: Message,
          icon:'el-icon-message',
          name: '短信模块',
          children:[
            { path: '/message/messageList',component: MessageList, name: '短信列表'},
            { path: '/message/messageModule',component: MessageModule, name: '短信模板'},
          ]
        },
      ]
    },

  ]
})


