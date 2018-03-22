/**
 * Created by Administrator on 2017/12/13 0013.
 */
const datum = {
  state: {
    active_name :'',
    work_order_filter:{},
  },
  mutations: {
    ACTIVE_NAME:(state,view) => {
      state.active_name = view;
    },
    WORK_ORDER_FILTER:(state,view)=>{
      state.work_order_filter = view;
    }
  },
  actions: {
    activeName({commit},view){
      commit('ACTIVE_NAME',view)
    },
    workOrderFilter({commit},view){
      commit('WORK_ORDER_FILTER',view)
    },
  }
};

export default datum
