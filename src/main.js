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

import 'vue-event-calendar/dist/style.css' //1.1.10之后的版本，css被放在了单独的文件中，方便替换

import $ from 'jquery'
import './assets/magnify/jquery.magnify.css'
import './assets/magnify/jquery.magnify'

import './assets/personalCard/personalCard.css'
import './assets/personalCard/personalCard.js'

import vueEventCalendar from 'vue-event-calendar'

// 地图
import AMap from 'vue-amap'
Vue.use(AMap);

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


if (localStorage.myData !== undefined) {
  let head = JSON.parse(localStorage.myData);
  globalConfig.header.Authorization = head.token_type + ' ' + head.access_token;
}

if (localStorage.personal !== undefined) {
  globalConfig.personal = JSON.parse(localStorage.personal);
}

Vue.config.productionTip = false;

// 拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // console.log(response);
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

// const router = new VueRouter({
//   mode: 'history',
//   router
// });

//axios的一些配置，比如发送请求显示loading，请求回来loading消失之类的
// axios.interceptors.request.use((config) => {  //配置发送请求的信息
//   store.dispatch('showLoading');
//   return config;
// }, function (error) {
//   return Promise.reject(error);
// });
//
// axios.interceptors.response.use((response) => { //配置请求回来的信息
//   store.dispatch('hideLoading');
//   return response;
// }, function (error) {
//   return Promise.reject(error);
// });


//重定向
router.beforeEach((to, from, next) => {
  let lockStatus = true;
  if (to.path === '/login') {
    localStorage.removeItem('myData');
    localStorage.removeItem('personal');
  }

  let data = localStorage.getItem("myData");

  axios.get(globalConfig.server+'special/special/unlock_screen?pwd_lock=').then((res)=>{
    lockStatus = res.data.code !== '10013';

    if (!data && to.path !== '/login') {
      next({path: '/login'})
    }else if(data&&to.path === '/'){
      next({path: '/main'})
    }else if(!lockStatus && to.path!=='/lock'){
      next({path:'/lock'});
    }else if(lockStatus && to.path === '/lock'){
      next({path:from.path});
    }else {
      next();
    }
  }).catch((error) => {
    if (!data && to.path !== '/login') {
      next({path: '/login'})
    }else if(data&&to.path === '/'){
      next({path: '/main'})
    }else {
      next();
    }
  })
});

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
}).$mount('#app');
