/**
 * Created by PhpStorm.
 * User: caoqs
 * Date: 2018/11/1
 * Time: 上午11:21
 */

import request from '@/utils/request'

/**
 * 获取商家列表
 * @param search
 * @param type
 * @param status
 * @param page
 * @param per-page
 */

export function getMerchantList(params) {

    return request({
        url: '/admin/tong-merchant/index',
        method: 'get',
        params: {...params}
    })
}


/**
 * 解绑
 * @param search
 * @param type
 * @param status
 * @param page
 * @param per-page
 */

export function agentUnbind(params) {

    return request({
        url: '/admin/tong-unbind/create',
        method: 'post',
        data: {...params}
    })
}


/**
 * 新建
 * @param search
 * @param type
 * @param status
 * @param page
 * @param per-page
 */

export function createAgent(params) {

    return request({
        url: '/admin/tong-merchant/create',
        method: 'post',
        data: {...params}
    })
}

/**
 * 获取俱乐部名称
 * @param target_id 俱乐部ID
 */

export function getClubInfo(params) {

    return request({
        url: '/admin/tong-merchant/get-user',
        method: 'get',
        params: {...params}
    })
}



export function getAgentInfo(params) {
    return request({
        url: '/admin/tong-ad-show-log/ad-sum',
        method: 'get',
        params: {...params}
    })
}


/**
* 商家广告展示数据
* @param search  有搜索条件的时候传1
* @param merchant_id  商户id|代理账号的时候传 商家的时候不用传
* @param ad_id  广告id|汇总的时候不用传
* @param begin_create_time  开始日期
* @param end_create_time  结束日期
*
* */

export function adShow(params) {
    return request({
        url: '/admin/tong-ad-show-log/ad-show',
        method: 'get',
        params: {...params}
    })
}


/**
 * 代理商账号流水
 *
 */
export function agentLog(params) {
    return new request({
        url: '/admin/tong-account/agent-log',
        method: 'post',
        data: {...params}
    })
}

/**
 * 获取代理商账号信息
 *
 */
export function agentAmount(params) {
    return new request({
        url: '/admin/tong-account/agent-amount',
        method: 'post',
        data: {...params}
    })
}


/**
 * 代理商向商户转账接口
 * @param merchant_id  接收转账的商家ID
 * @param amount  充值金额
 *
 */
export function transfer(params) {
    return new request({
        url: '/admin/tong-pay/transfer',
        method: 'post',
        data: {...params}
    })
}


/**
 * 获取代理商下所有商户
 * @param merchant_id  接收转账的商家ID
 * @param amount  充值金额
 *
 */
export function getMerchants() {
    return new request({
        url: '/admin/tong-account/get-merchants',
        method: 'post',
    })
}

/**
 * 获取代理商下所有商户
 * @param merchant_id  接收转账的商家ID
 * @param amount  充值金额
 *
 */
export function getClubByAgent(params) {
    return new request({
        url: '/admin/tong-merchant/get-club-by-agent',
        method: 'get',
        params: {...params}
    })
}





