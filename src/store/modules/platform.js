const platform = {
    state:{
        id: '',
        platform_obj: '',
    },
    mutations: {
        EDIT_PLATFORM: (state, view) => {
            state.id = view.id;
            state.platform_obj = view.platform
        }
    },
    actions: {
        toEdit({commit}, view){
            commit('EDIT_PLATFORM', view)
        }
    }
}
export default platform