import Vue from 'vue'
import Router from 'vue-router'

//路由
import Login from '../components/Login.vue'
import Index from '../components/index.vue'
import Main from '../components/main.vue'
import Lock from '../components/common/lockScreen/components/lockedScreen.vue'

import Recycle from '../components/systemSetting/recycleBin/index.vue'  //回收站
import ContractRecycle from '../components/systemSetting/recycleBin/contratRecycle.vue'

import LoginRecord from '../components/systemSetting/loginRecord/logRocord.vue'       // 操作记录
import UserDictionary from '../components/systemSetting/userDictionary/dictionary.vue'

import Message from '../components/systemSetting/message/index.vue'                 //短信
import MessageList from '../components/systemSetting/message/messageList.vue'                 //短信
import MessageModule from '../components/systemSetting/message/messageModule.vue'                 //短信

//租赁管理
import WholeRentManage from '../components/rentManage/wholeRentManage/wholeRentManage.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Index,
      hidden:true,
      name: 'Index',
      redirect: '/main',
    },

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
      ]
    },
    {
      path: '/',
      component: Index,
      name: '系统设置',
      icon:'el-icon-setting',
      children: [
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
        { path: '/loginRecord', component: LoginRecord,name: '登陆日志',},
        { path: '/userDictionary', component: UserDictionary, name: '用户字典',},
      ]
    },

    {
      path: '/',
      component: Index,
      name: '租赁管理',
      icon:'el-icon-document',
      children: [
        { path: '/wholeRentManage', component: WholeRentManage, name: '整租管理',},
      ]
    },
  ]
})


