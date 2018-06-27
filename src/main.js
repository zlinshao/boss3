// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import Vuex from 'vuex'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import router from './router'
import App from './App.vue'
import store from './store'
import Boss from './boss.config.js'
import Fun from './fun.config.js'
import Cookies from 'js-cookie';

import vueEventCalendar from 'vue-event-calendar'
import 'vue-event-calendar/dist/style.css' //1.1.10之后的版本，css被放在了单独的文件中，方便替换

import $ from 'jquery'
import './assets/magnify/jquery.magnify.css'
import './assets/magnify/jquery.magnify'

import './assets/personalCard/personalCard.css'
import './assets/personalCard/personalCard.js'


import VueLoading from './plugin/loading/loading.js'

import 'vue2-editor/node_modules/quill/dist/quill.bubble.css'

// import './directives.js';  //弹框拖拽

// 地图
import AMap from 'vue-amap'

Vue.use(Fun);
Vue.use(AMap);
Vue.use(VueLoading);

Vue.use(vueEventCalendar, {locale: 'zh',});
Vue.use(Boss);
Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(Cookies);
Vue.prototype.$http = axios;

axios.defaults.withCredentials = true;
axios.defaults.headers.common['Env'] = globalConfig.env;
axios.defaults.headers = globalConfig.header;

Vue.config.productionTip = false;
// const router = new VueRouter({
//   mode: 'history',
//   router
// });

//axios全局配置
// let i = 0;
// axios.interceptors.request.use((config) => {  //配置发送请求的信息
//   if(config.url !== 'http://test.boss-support.lejias.cn/api/s1/messages?unread=1'){
//     i++;
//     store.dispatch('showLoading');
//   }
//   return config;
// }, function (error) {
//   return Promise.reject(error);
// });
//



//重定向router
router.beforeEach((to, from, next) => {

  if (to.path === '/login') {
    localStorage.removeItem('myData');
    localStorage.removeItem('personal');
    globalConfig.header.Authorization = '';
  }
  let data = localStorage.getItem("myData");

  if (!data && to.path !== '/login') {
    next({path: '/login'})
  } else if (data && to.path === '/') {
    next({path: '/main'})
  } else if (Number(sessionStorage.getItem('lockStatus')) === 1 && to.path !== '/lock') {
    next({path: '/lock'});
  } else if (Number(sessionStorage.getItem('lockStatus')) === 0 && to.path === '/lock') {
    next({path: from.path});
    console.log(from.path)
  } else {
    next();
  }
});

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
}).$mount('#app');
