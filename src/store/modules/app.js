/**
 * Created by Administrator on 2017/12/13 0013.
 */
const app = {
  state: {
    visitedViews: [],
    menuStatus: false,
    isLoading: false,
    isBasicChange: false,
    isEditReportManage: false,
  },
  mutations: {
    ADD_VISITED_VIEWS: (state, view) => {
      if (state.visitedViews.some(v => v.path === view.path)) return;
      state.visitedViews.push({
        name: view.name,
        path: view.path,
      })
    },
    DEL_VISITED_VIEWS: (state, view) => {
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          state.visitedViews.splice(i, 1);
          break
        }
      }
    },
    CLOSE_ALL_VISITED: (state, view) => {
      state.visitedViews.splice(view + 1, state.visitedViews.length);
      state.visitedViews.splice(0, view);
    },
    CLOSE_LEFT_VISITED: (state, view) => {
      state.visitedViews.splice(0, view);
    },
    CLOSE_RIGHT_VISITED: (state, view) => {
      state.visitedViews.splice(view + 1, state.visitedViews.length);
    },
    CLOSE_MENU: (state, view) => {
      state.menuStatus = false;
    },
    OPEN_MENU: (state, view) => {
      state.menuStatus = true;
    },
    SHOW_LOADING: (state, view) => {
      state.isLoading = true;
    },
    HIDE_LOADING: (state, view) => {
      state.isLoading = false;
    },
    CHANGE_BASIC_SETTING: (state) => {
      state.isBasicChange = !state.isBasicChange;
    },
    TO_EDIT_LIST: (state) => {
      state.isEditReportManage = !state.isEditReportManage;
    }
  },
  actions: {
    addVisitedViews({commit}, view) {
      commit('ADD_VISITED_VIEWS', view)
    },
    delVisitedViews({commit, state}, view) {
      return new Promise((resolve) => {
        commit('DEL_VISITED_VIEWS', view);
        resolve([...state.visitedViews])
      })
    },
    closeALLVisited({commit}, view) {
      commit('CLOSE_ALL_VISITED', view)
    },
    closeLeftVisited({commit}, view) {
      commit('CLOSE_LEFT_VISITED', view)
    },
    closeRightVisited({commit}, view) {
      commit('CLOSE_RIGHT_VISITED', view)
    },
    closeMenu({commit}, view) {
      commit('CLOSE_MENU', view)
    },
    openMenu({commit}, view) {
      commit('OPEN_MENU', view)
    },
    showLoading({commit}, view) {
      commit('SHOW_LOADING', view)
    },
    hideLoading({commit}, view) {
      commit('HIDE_LOADING', view)
    },
    //改变基本设置
    changeBasicSetting({commit}) {
      commit('CHANGE_BASIC_SETTING')
    },

    //喜报界面切换状态
    toEditList({commit}) {
      commit('TO_EDIT_LIST')
    }
  }
};

export default app
