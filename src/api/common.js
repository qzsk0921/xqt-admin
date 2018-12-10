import request from '@/utils/request'

export function uploadImage(params) {

    return new Promise ((resolve, reject) => {
        var oData = new FormData();

        Object.keys(params).forEach((key) => {
            oData.append(key ,params[key]);
        })
        var oReq = new XMLHttpRequest();
        oReq.open("POST", "http://agentapi.quhepai.com/api/upload/index", true);
        oReq.onload = (oEvent) =>  {
            resolve(JSON.parse(oReq.response))
        };
        oReq.send(oData);
    }).catch(errors => {
        console.log(errors)
        reject(errors)
    })
}




/**
* 获取充值数据信息
 *
* */
export function getPayInfo() {
    return new request({
        url: '/admin/tong-pay/goods',
        method: 'get',
    })
}


/**
*  代理商，商户充值接口
 *
* */
export function recharge(params) {
    return request({
        url: '/admin/tong-pay/recharge',
        method: 'post',
        data: {...params}
    })
}


