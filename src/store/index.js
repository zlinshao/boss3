/**
 * Created by Administrator on 2017/12/13 0013.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import getters from './getters'
import picture from './modules/picture'   //相册管理状态
import article from './modules/article'

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    article,
    picture
  },
  getters
});

export default store
