
/**
 * Created by PhpStorm.
 * User: caoqs
 * Date: 2018/11/6
 * Time: 下午2:12
 */


const merchant = {
    state: {},
    mutations: {
        ADD_ROUTER: (state, routers) => {
            state.routers =  routers
        }
    },
    actions: {
        ToggleSideBar: ({ commit }) => {
            commit('TOGGLE_SIDEBAR')
        }
    }
}

export default merchant
