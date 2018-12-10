import request from '@/utils/request'

export function login(username, password, adminType) {

  return request({
    url: '/admin/site/login',
    method: 'post',
      data: {
        'username': username,
        'password': password,
        'admin_type': adminType
    }
  })
}


export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}


/**
 *  登出
 *  @param admin_user_id  账号
 *  @param admin_token  token

 */
export function logout(params) {
  return request({
    url: '/admin/site/logout',
    method: 'post',
    data: {...params}
  })
}


/**
 *  俱乐部账号登陆切换账号
 *  @param username  账号
 *  @param password  密码
 *  @param admin_type
 *  @param club_id
 */
export function switchLogin(params) {
    return request({
        url: '/admin/site/login-switch',
        method: 'post',
        data: {...params}
    })
}

