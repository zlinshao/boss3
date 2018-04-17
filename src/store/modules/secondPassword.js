/**
 * Created by Administrator on 2017/12/13 0013.
 */
const datum = {
  state: {
    second_Flag :'false',
  },
  mutations: {
    SECOND_NAME:(state,view) => {
      state.second_Flag = view;
    },
  },
  actions: {
    secondFlag({commit},view){
      commit('SECOND_NAME',view)
    },
  }
};

export default datum
