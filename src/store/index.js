/**
 * Created by Administrator on 2017/12/13 0013.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import getters from './getters'

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
  },
  getters
});

export default store
