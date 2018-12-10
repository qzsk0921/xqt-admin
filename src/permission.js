import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权
import { getLocalStorage } from "./utils/commonUtils";

const whiteList = ['/login'] // 不重定向白名单

let addr = false;
router.beforeEach((to, from, next) => {

  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (store.getters.roles === '' || store.getters.roles == 'undefined' || store.getters.roles == undefined) {
          store.commit('SET_ROLES', getLocalStorage('roles'))

      }
        if (!addr) {
            console.log(addr, store.getters.roles)
            store.dispatch('addRoutes', store.getters.roles).then(() => {
                addr = true
                // router.options.routes[1].children = store.getters.addRouters
                router.addRoutes(store.getters.addRouters)
                console.log(router)
                next({ ...to, replace: true})
            }).catch(error => {
                console.log(error)
            })
        }

        next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
