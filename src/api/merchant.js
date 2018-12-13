/**
 * Created by PhpStorm.
 * User: caoqs
 * Date: 2018/10/30
 * Time: 上午11:49
 */


import request from '@/utils/request'

/**
 * 获取广告列表
 * @param search
 * @param type
 * @param status
 * @param page
 * @param per-page
 */

export function getAdList(params) {

    return request({
        url: '/admin/tong-ad/index',
        method: 'get',
        params: {...params}
    })
}

/**
 *  获取广告详情
 *  @param id 广告id
 */
export function getAdInfo(params) {
    return request({
        url: '/admin/tong-ad/view',
        method: 'get',
        params: { ...params, }
    })
}

/**
 *  广告消费信息
 *  @param search
 *  @param merchant_id
 *  @param ad_id
 *  @param begin_create_time
 *  @param end_create_time
 *  @param page
 *  @param per-page
 */
export function getConsumptionInfo(params) {
    return request({
        url: '/admin/tong-ad-show-log/index',
        method: 'get',
        params: {...params}
    })
}


/**
 *  数据管理 广告消费信息
 *  @param search           有搜索条件的时候传1
 *  @param merchant_id      商户id|代理的时候传 商家的时候不用传
 *  @param ad_id
 *  @param begin_create_time
 *  @param end_create_time
 *  @param page
 *  @param per-page
 */
export function getAdsum(params) {
    return request({
        url: '/admin/tong-ad-show-log/ad-sum',
        method: 'get',
        params: {...params}
    })
}


/**
 *  数据管理 商家广告展示数据  折线图数据
 *  @param search               有搜索条件的时候传1
 *  @param merchant_id          商户id|代理的时候传 商家的时候不用传
 *  @param ad_id
 *  @param begin_create_time
 *  @param end_create_time
 */
export function getLineChartData(params) {
    return request({
        url: '/admin/tong-ad-show-log/ad-show',
        method: 'get',
        params: {...params}
    })
}


/**
 *  获取俱乐部标签信息
 *  @param target_id  俱乐部id
 */
export function getClubTags(params) {
    return request({
        url: '/admin/tong-ad/get-config-tag',
        method: 'get',
        params: {...params}
    })
}


/**
 *  新建广告
 *  @param target_id          俱乐部id
 *  @param ad_name          广告名称
 *  @param type             服务类型|1:俱乐部,2:兴趣班
 *  @param sex              性别|1:男,2:女,3:全部
 *  @param tag_list         推广标签列表
 *  @param area_list        推广地区列表
 *  @param ad_price_list    广告价格列表
 *
 *
 */
export function createAd(params) {
    return request({
        url: '/admin/tong-ad/create',
        method: 'post',
        data: {...params}
    })
}


/**
 *  更新广告
 *  @param id               广告id
 *  @param target_id        俱乐部id
 *  @param ad_name          广告名称
 *  @param type             服务类型|1:俱乐部,2:兴趣班
 *  @param sex              性别|1:男,2:女,3:全部
 *  @param tag_list         推广标签列表
 *  @param area_list        推广地区列表
 *  @param ad_price_list    广告价格列表
 *  @param ad_pic           广告图
 *  @param ad_content       广告文案
 *  @param status           状态   4关闭
 *
 *
 */
export function updateAd(params) {
    return request({
        url: '/admin/tong-ad/update',
        method: 'post',
        data: {...params}
    })
}


// /**
//  *  获取服务类型
//  */
// export function getTargetType(params) {
//     return request({
//         url: '/admin/tong-target/get-target-type',
//         method: 'get',
//         params: {...params}
//     })
// }




/**
 * 获取stt_id
 * @param target_id
 * @param target_type
 *
 */
export function getSttId(params) {
    return new request({
        url: '/admin/tong-ad/get-stt-id',
        method: 'get',
        params: {...params}
    })
}


/**
 * 广告标签统计报表
 * @param ad_id         广告id
 * @param start_date    开始日期
 * @param end_date      结束日期
 *
 */
export function getTagReport(params) {
    return new request({
        url: '/admin/tong-ad-show-log/tag-report',
        method: 'get',
        params: {...params}
    })
}


/**
 * 商户账号流水
 *
 */
export function merchantLog(params) {
    return new request({
        url: '/admin/tong-account/merchant-log',
        method: 'post',
        data: {...params}
    })
}


/**
 * 获取代理商账号信息
 *
 */
export function merchantAmount(params) {
    return new request({
        url: '/admin/tong-account/merchant-amount',
        method: 'post',
        data: {...params}
    })
}


/**
 * 设置投放金额
 * @apiParam {int} amount  投放金额
 * @apiParam {string} sn  订单号
 */
export function adPay(params) {
    return new request({
        url: '/admin/tong-ad/pay',
        method: 'post',
        data: {...params}
    })
}

/**
 * 获取城市标签
 * @apiParam {int} target_id
 * @apiParam {int} target_type
 */
export function getCityBlock(params) {
    return new request({
        url: '/admin/tong-ad/get-city-block',
        method: 'get',
        params: {...params}
    })
}

/**
 * 获取服务类型
 * @apiParam {int} target_id
 * @apiParam {int} target_type
 */

export function getAdType(params) {
    return new request({
        url: '/admin/tong-target/get-target-type',
        method: 'get',
        params: {...params}
    })
}

/**
*获取顶端服务类型
*@apiParam {}
*/

export function getTopAdType(params) {
    return new request({
        url: '/admin/tong-target/get-top-target-type',
        method: 'get',
        params: {...params}
    })
}


