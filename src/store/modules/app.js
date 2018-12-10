import Cookies from 'js-cookie'
import {agentRoute}  from '../../router/agent'

import {merchantRoute} from '../../router/merchant'

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus'),
      withoutAnimation: false
    },
      routers: '',
    device: 'desktop'
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      Cookies.set('sidebarStatus', 1)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    ADD_ROUTER: (state, routers) => {
      state.routers =  routers
    }
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    },
    CloseSideBar({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    ToggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    },
    addRoutes ({ commit }, roles) {

        return new Promise((resolve, reject) => {

            switch (parseInt(roles)) {
                case 1:
                    commit('ADD_ROUTER', agentRoute);
                    break;
                case 2:
                    commit('ADD_ROUTER', merchantRoute);
                    break;
                default:

                    break;
            }
            resolve()
        }).catch(error => {
            reject(error)
        })


    }
  }
}

export default app
