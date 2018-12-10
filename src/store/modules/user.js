import { login, logout, getInfo, switchLogin } from '@/api/login'
import { getToken, setToken, removeToken , getCommonParams, setCommonParams ,setRoles, getRoles} from '@/utils/auth'
import { getLocalStorage, setLocalStorage } from "../../utils/commonUtils";

const user = {
    state: {
        token: getToken(),
        roles: getLocalStorage('roles'),            // 登录角色  1 代理登陆,2 商户登陆
        clubs: getLocalStorage('clubs'),
        userInfo: getLocalStorage('userInfo'),
        commonParams: getLocalStorage('commonParams'),
        currentClub: getLocalStorage('currentClub')
    },
    mutations: {
        SET_TOKEN: (state, token) => {
          state.token = token
        },
        SET_NAME: (state, name) => {
          state.name = name
        },
        SET_AVATAR: (state, avatar) => {
          state.avatar = avatar
        },
        SET_ROLES: (state, roles) => {
          state.roles = roles
        },
        SET_COMMONPARAMS: (state, commonParams) => {
              state.commonParams = commonParams
        },
        SET_USERINFO: (state, userInfo) => {
            state.userInfo = userInfo
        },
        SET_CLUBS: (state, clubs) => {
            state.clubs = clubs
        },
        SET_CURRENTCLUB: ( state, currentClub) => {
            state.currentClub = currentClub
        }
    },
    actions: {
        // 登录
        Login({ commit }, userInfo) {
            const username = userInfo.username.trim()
            return new Promise((resolve, reject) => {
                login(username, userInfo.password, userInfo.adminType).then(response => {
                    const data = response.data
                    userInfo['adminUsername'] = data.admin_username

                    setToken(data.admin_token)
                    commit('SET_TOKEN', data.admin_token)  // 保存token

                    commit('SET_ROLES', userInfo.adminType)
                    setLocalStorage('roles', userInfo.adminType)

                    let params = {
                        admin_user_id: data.admin_user_id,
                        admin_agent_id: data.admin_agent_id,
                        admin_merchant_id: data.admin_merchant_id,
                        admin_token: data.admin_token
                    }
                    commit('SET_COMMONPARAMS', params)
                    setLocalStorage('commonParams', params)

                    commit('SET_USERINFO', userInfo)
                    setLocalStorage('userInfo', userInfo)

                    // commit('SET_CLUBS', data.clubs)
                    // setLocalStorage('clubs',  data.clubs)

                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

      SwitchLogin ({ commit }, userInfo) {
          const username = userInfo.username.trim()
          return new Promise((resolve, reject) => {
              switchLogin({
                  username: username,
                  password: userInfo.password,
                  admin_type: userInfo.adminType,
                  target_id: userInfo.currentClub.target_id
              }).then(response => {
                  const data = response.data
                  setToken(data.admin_token)
                  commit('SET_TOKEN', data.admin_token)  // 保存token

                  commit('SET_ROLES', userInfo.adminType)
                  setLocalStorage('roles', userInfo.adminType)

                  let params = {
                      admin_user_id: data.admin_user_id,
                      admin_agent_id: data.admin_agent_id,
                      admin_merchant_id: data.admin_merchant_id,
                      admin_token: data.admin_token
                  }
                  commit('SET_COMMONPARAMS', params)
                  setLocalStorage('commonParams', params)

                  commit('SET_USERINFO', userInfo)
                  setLocalStorage('userInfo', userInfo)

                  commit('SET_CLUBS', data.clubs)
                  setLocalStorage('clubs', data.clubs)

                    commit('SET_CURRENTCLUB', userInfo.currentClub)
                  setLocalStorage('currentClub', userInfo.currentClub)
                  resolve()
              }).catch(error => {
                  reject(error)
              })
          })

      },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout({
            admin_user_id: state.commonParams.admin_user_id,
            admin_token: state.commonParams.admin_token
        }).then((response) => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', '')

          removeToken()
            localStorage.clear()
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
          commit('SET_ROLES', '')
        removeToken()
          localStorage.clear()
        resolve()
      })
    }
  }
}

export default user
