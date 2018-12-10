import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const ComonParams = 'Common-Params'
const Roles = 'Roles'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setCommonParams(params) {
    return Cookies.set(ComonParams, params)
}

export function getCommonParams() {
    return Cookies.get(ComonParams)
}

export function setRoles(roles) {
    console.log(roles)
    return Cookies.set(Roles, roles)
}

export function getRoles() {
    return Cookies.get(Roles)
}
