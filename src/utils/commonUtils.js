/**
 * Created by PhpStorm.
 * User: caoqs
 * Date: 2018/11/6
 * Time: 下午2:22
 */


export function setLocalStorage(itemName, value) {
    localStorage.setItem(itemName, JSON.stringify(value))
}


export function getLocalStorage(itemName) {
    return JSON.parse(''+ localStorage.getItem(itemName) +'')
}
