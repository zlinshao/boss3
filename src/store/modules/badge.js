/**
 * Created by Administrator on 2017/12/13 0013.
 */
const datum = {
  state: {
    badge_Flag :'false',
  },
  mutations: {
    BADGE_NAME:(state,view) => {
      state.badge_Flag = view;
    },
  },
  actions: {
    badgeFlag({commit},view){
      commit('BADGE_NAME',view)
    },
  }
};

export default datum
