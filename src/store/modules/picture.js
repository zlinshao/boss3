/**
 * Created by Administrator on 2017/12/13 0013.
 */
const app = {
  state: {
    albumId : ''
  },
  mutations: {
    // ADD_VISITED_VIEWS: (state, view) => {
    //   if (state.visitedViews.some(v => v.path === view.path)) return;
    //   state.visitedViews.push({
    //     name: view.name,
    //     path: view.path,
    //   })
    // },
    SAVE_ALBUM_ID:(state,view) => {
      if(view){
        state.albumId = view;
      }
    }

  },
  actions: {
    // addVisitedViews({ commit }, view) {
    //   commit('ADD_VISITED_VIEWS', view)
    // },
    // delVisitedViews({ commit, state }, view) {
    //   return new Promise((resolve) => {
    //     commit('DEL_VISITED_VIEWS', view)
    //     resolve([...state.visitedViews])
    //   })
    // },
    saveAlbumId({commit},view){
      commit('SAVE_ALBUM_ID',view)
    }

  }
};

export default app
