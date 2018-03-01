// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from  'axios'
import Vuex from 'vuex'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import router from './router'
import App from './App.vue'
import store from './store'
import Boss from './boss.config.js'
import Cookies from 'js-cookie';

import 'vue-event-calendar/dist/style.css' //1.1.10之后的版本，css被放在了单独的文件中，方便替换

import $ from 'jquery'
import './assets/magnify/jquery.magnify.css'
import './assets/magnify/jquery.magnify'

import vueEventCalendar from 'vue-event-calendar'


Vue.use(vueEventCalendar, {locale: 'zh',});
Vue.use(Boss);
Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(Cookies);
axios.defaults.baseURL = globalConfig.server;
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Env'] = globalConfig.env;
Vue.prototype.$http = axios;

Vue.config.productionTip = false;

// const router = new VueRouter({
//   mode: 'history',
//   router
// });



//重定向
router.beforeEach((to, from, next) => {

  if (to.path === '/login') {
    sessionStorage.removeItem('user');
  }
  let user = JSON.parse(sessionStorage.getItem('user'));

  if(Cookies.get('locking') === '1' && to.path !=='/lock'){
    next({path:'/lock'});
  }else if(Cookies.get('locking') === '0' && to.path ==='/lock'){
    next(false);
  }else {
    if (!user && to.path !== '/login') {
      next({ path: '/login' })
    } else {
      next()
    }
  }
});

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
}).$mount('#app');
