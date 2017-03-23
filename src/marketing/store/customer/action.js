import * as apiCustomer from '../../../common/api/customer';

/*客户信息服务：customer*/

// 新增客户合作伙伴
export const ADD_ADMIN_CUSTOMER_PARTNER = 'ADD_ADMIN_CUSTOMER_PARTNER';
export const ADD_ADMIN_CUSTOMER_PARTNER_PENDING = 'ADD_ADMIN_CUSTOMER_PARTNER_PENDING';
export const ADD_ADMIN_CUSTOMER_PARTNER_SUCCESS = 'ADD_ADMIN_CUSTOMER_PARTNER_SUCCESS';
export const ADD_ADMIN_CUSTOMER_PARTNER_FAILURE = 'ADD_ADMIN_CUSTOMER_PARTNER_FAILURE';

// 修改客户合作伙伴
export const UPDATE_ADMIN_CUSTOMER_PARTNER = 'UPDATE_ADMIN_CUSTOMER_PARTNER';
export const UPDATE_ADMIN_CUSTOMER_PARTNER_PENDING = 'UPDATE_ADMIN_CUSTOMER_PARTNER_PENDING';
export const UPDATE_ADMIN_CUSTOMER_PARTNER_SUCCESS = 'UPDATE_ADMIN_CUSTOMER_PARTNER_SUCCESS';
export const UPDATE_ADMIN_CUSTOMER_PARTNER_FAILURE = 'UPDATE_ADMIN_CUSTOMER_PARTNER_FAILURE';

// 获取客户自有客户列表
export const GET_ADMIN_CUSTOMER_LIST = 'GET_ADMIN_CUSTOMER_LIST';
export const GET_ADMIN_CUSTOMER_LIST_PENDING = 'GET_ADMIN_CUSTOMER_LIST_PENDING';
export const GET_ADMIN_CUSTOMER_LIST_SUCCESS = 'GET_ADMIN_CUSTOMER_LIST_SUCCESS';
export const GET_ADMIN_CUSTOMER_LIST_FAILURE = 'GET_ADMIN_CUSTOMER_LIST_FAILURE';

// 删除客户信息
export const DELETE_PLAT_ADMIN_CUSTOMER = 'DELETE_PLAT_ADMIN_CUSTOMER';
export const DELETE_PLAT_ADMIN_CUSTOMER_PENDING = 'DELETE_PLAT_ADMIN_CUSTOMER_PENDING';
export const DELETE_PLAT_ADMIN_CUSTOMER_SUCCESS = 'DELETE_PLAT_ADMIN_CUSTOMER_SUCCESS';
export const DELETE_PLAT_ADMIN_CUSTOMER_FAILURE = 'DELETE_PLAT_ADMIN_CUSTOMER_FAILURE';

// 获取客户信息
export const GET_ADMIN_CUSTOMER = 'GET_ADMIN_CUSTOMER';
export const GET_ADMIN_CUSTOMER_PENDING = 'GET_ADMIN_CUSTOMER_PENDING';
export const GET_ADMIN_CUSTOMER_SUCCESS = 'GET_ADMIN_CUSTOMER_SUCCESS';
export const GET_ADMIN_CUSTOMER_FAILURE = 'GET_ADMIN_CUSTOMER_FAILURE';

// 修改客户
export const UPDATE_ADMIN_CUSTOMER = 'UPDATE_ADMIN_CUSTOMER';
export const UPDATE_ADMIN_CUSTOMER_PENDING = 'UPDATE_ADMIN_CUSTOMER_PENDING';
export const UPDATE_ADMIN_CUSTOMER_SUCCESS = 'UPDATE_ADMIN_CUSTOMER_SUCCESS';
export const UPDATE_ADMIN_CUSTOMER_FAILURE = 'UPDATE_ADMIN_CUSTOMER_FAILURE';

// 获取客户商城权限配置
export const GET_PLATFORM_CUSTOMER_MALL_AUTH = 'GET_PLATFORM_CUSTOMER_MALL_AUTH';
export const GET_PLATFORM_CUSTOMER_MALL_AUTH_PENDING = 'GET_PLATFORM_CUSTOMER_MALL_AUTH_PENDING';
export const GET_PLATFORM_CUSTOMER_MALL_AUTH_SUCCESS = 'GET_PLATFORM_CUSTOMER_MALL_AUTH_SUCCESS';
export const GET_PLATFORM_CUSTOMER_MALL_AUTH_FAILURE = 'GET_PLATFORM_CUSTOMER_MALL_AUTH_FAILURE';

// 修改客户商城权限配置
export const UPDATE_PLATFORM_CUSTOMER_MALL_AUTH = 'UPDATE_PLATFORM_CUSTOMER_MALL_AUTH';
export const UPDATE_PLATFORM_CUSTOMER_MALL_AUTH_PENDING = 'UPDATE_PLATFORM_CUSTOMER_MALL_AUTH_PENDING';
export const UPDATE_PLATFORM_CUSTOMER_MALL_AUTH_SUCCESS = 'UPDATE_PLATFORM_CUSTOMER_MALL_AUTH_SUCCESS';
export const UPDATE_PLATFORM_CUSTOMER_MALL_AUTH_FAILURE = 'UPDATE_PLATFORM_CUSTOMER_MALL_AUTH_FAILURE';

// 修改客户微信设置
export const UPDATE_CUSTOMER_WECHAT = 'UPDATE_CUSTOMER_WECHAT';
export const UPDATE_CUSTOMER_WECHAT_PENDING = 'UPDATE_CUSTOMER_WECHAT_PENDING';
export const UPDATE_CUSTOMER_WECHAT_SUCCESS = 'UPDATE_CUSTOMER_WECHAT_SUCCESS';
export const UPDATE_CUSTOMER_WECHAT_FAILURE = 'UPDATE_CUSTOMER_WECHAT_FAILURE';

// 修改客户支付宝设置
export const UPDATE_CUSTOMER_ALIPAY = 'UPDATE_CUSTOMER_ALIPAY';
export const UPDATE_CUSTOMER_ALIPAY_PENDING = 'UPDATE_CUSTOMER_ALIPAY_PENDING';
export const UPDATE_CUSTOMER_ALIPAY_SUCCESS = 'UPDATE_CUSTOMER_ALIPAY_SUCCESS';
export const UPDATE_CUSTOMER_ALIPAY_FAILURE = 'UPDATE_CUSTOMER_ALIPAY_FAILURE';

// 修改客户银联设置
export const UPDATE_CUSTOMER_UNIONPAY = 'UPDATE_CUSTOMER_UNIONPAY';
export const UPDATE_CUSTOMER_UNIONPAY_PENDING = 'UPDATE_CUSTOMER_UNIONPAY_PENDING';
export const UPDATE_CUSTOMER_UNIONPAY_SUCCESS = 'UPDATE_CUSTOMER_UNIONPAY_SUCCESS';
export const UPDATE_CUSTOMER_UNIONPAY_FAILURE = 'UPDATE_CUSTOMER_UNIONPAY_FAILURE';

// 获取会员卡风格设置
export const GET_CARD_STYLE = 'GET_CARD_STYLE';
export const GET_CARD_STYLE_PENDING = 'GET_CARD_STYLE_PENDING';
export const GET_CARD_STYLE_SUCCESS = 'GET_CARD_STYLE_SUCCESS';
export const GET_CARD_STYLE_FAILURE = 'GET_CARD_STYLE_FAILURE';

// 修改会员卡风格设置
export const UPDATE_CARD_STYLE = 'UPDATE_CARD_STYLE';
export const UPDATE_CARD_STYLE_PENDING = 'UPDATE_CARD_STYLE_PENDING';
export const UPDATE_CARD_STYLE_SUCCESS = 'UPDATE_CARD_STYLE_SUCCESS';
export const UPDATE_CARD_STYLE_FAILURE = 'UPDATE_CARD_STYLE_FAILURE';

// 获取客户积分兑换设置
export const GET_INTEGRAL_EXCHANGE = 'GET_INTEGRAL_EXCHANGE';
export const GET_INTEGRAL_EXCHANGE_PENDING = 'GET_INTEGRAL_EXCHANGE_PENDING';
export const GET_INTEGRAL_EXCHANGE_SUCCESS = 'GET_INTEGRAL_EXCHANGE_SUCCESS';
export const GET_INTEGRAL_EXCHANGE_FAILURE = 'GET_INTEGRAL_EXCHANGE_FAILURE';

// 修改客户积分兑换设置
export const UPDATE_INTEGRAL_EXCHANGE = 'UPDATE_INTEGRAL_EXCHANGE';
export const UPDATE_INTEGRAL_EXCHANGE_PENDING = 'UPDATE_INTEGRAL_EXCHANGE_PENDING';
export const UPDATE_INTEGRAL_EXCHANGE_SUCCESS = 'UPDATE_INTEGRAL_EXCHANGE_SUCCESS';
export const UPDATE_INTEGRAL_EXCHANGE_FAILURE = 'UPDATE_INTEGRAL_EXCHANGE_FAILURE';

// 客户员工列表
export const GET_ADMIN_EMPLOYEE_LIST = 'GET_ADMIN_EMPLOYEE_LIST';
export const GET_ADMIN_EMPLOYEE_LIST_PENDING = 'GET_ADMIN_EMPLOYEE_LIST_PENDING';
export const GET_ADMIN_EMPLOYEE_LIST_SUCCESS = 'GET_ADMIN_EMPLOYEE_LIST_SUCCESS';
export const GET_ADMIN_EMPLOYEE_LIST_FAILURE = 'GET_ADMIN_EMPLOYEE_LIST_FAILURE';

// 新增客户员工
export const ADD_ADMIN_EMPLOYEE = 'ADD_ADMIN_EMPLOYEE';
export const ADD_ADMIN_EMPLOYEE_PENDING = 'ADD_ADMIN_EMPLOYEE_PENDING';
export const ADD_ADMIN_EMPLOYEE_SUCCESS = 'ADD_ADMIN_EMPLOYEE_SUCCESS';
export const ADD_ADMIN_EMPLOYEE_FAILURE = 'ADD_ADMIN_EMPLOYEE_FAILURE';

// 修改客户员工
export const UPDATE_ADMIN_EMPLOYEE = 'UPDATE_ADMIN_EMPLOYEE';
export const UPDATE_ADMIN_EMPLOYEE_PENDING = 'UPDATE_ADMIN_EMPLOYEE_PENDING';
export const UPDATE_ADMIN_EMPLOYEE_SUCCESS = 'UPDATE_ADMIN_EMPLOYEE_SUCCESS';
export const UPDATE_ADMIN_EMPLOYEE_FAILURE = 'UPDATE_ADMIN_EMPLOYEE_FAILURE';

// 修改客户员工状态
export const UPDATE_ADMIN_EMPLOYEE_STATUS = 'UPDATE_ADMIN_EMPLOYEE_STATUS';
export const UPDATE_ADMIN_EMPLOYEE_STATUS_PENDING = 'UPDATE_ADMIN_EMPLOYEE_STATUS_PENDING';
export const UPDATE_ADMIN_EMPLOYEE_STATUS_SUCCESS = 'UPDATE_ADMIN_EMPLOYEE_STATUS_SUCCESS';
export const UPDATE_ADMIN_EMPLOYEE_STATUS_FAILURE = 'UPDATE_ADMIN_EMPLOYEE_STATUS_FAILURE';

// 设置客户员工激励
export const UPDATE_ADMIN_EMPLOYEE_EXCITATION = 'UPDATE_ADMIN_EMPLOYEE_EXCITATION';
export const UPDATE_ADMIN_EMPLOYEE_EXCITATION_PENDING = 'UPDATE_ADMIN_EMPLOYEE_EXCITATION_PENDING';
export const UPDATE_ADMIN_EMPLOYEE_EXCITATION_SUCCESS = 'UPDATE_ADMIN_EMPLOYEE_EXCITATION_SUCCESS';
export const UPDATE_ADMIN_EMPLOYEE_EXCITATION_FAILURE = 'UPDATE_ADMIN_EMPLOYEE_EXCITATION_FAILURE';
// 获取客户员工激励
export const GET_ADMIN_EMPLOYEE_EXCITATION = 'GET_ADMIN_EMPLOYEE_EXCITATION';
export const GET_ADMIN_EMPLOYEE_EXCITATION_PENDING = 'GET_ADMIN_EMPLOYEE_EXCITATION_PENDING';
export const GET_ADMIN_EMPLOYEE_EXCITATION_SUCCESS = 'GET_ADMIN_EMPLOYEE_EXCITATION_SUCCESS';
export const GET_ADMIN_EMPLOYEE_EXCITATION_FAILURE = 'GET_ADMIN_EMPLOYEE_EXCITATION_FAILURE';

// 获取客户用户配置
export const GET_CUSTOMER_CONFIG_INFO = 'GET_CUSTOMER_CONFIG_INFO';
export const GET_CUSTOMER_CONFIG_INFO_PENDING = 'GET_CUSTOMER_CONFIG_INFO_PENDING';
export const GET_CUSTOMER_CONFIG_INFO_SUCCESS = 'GET_CUSTOMER_CONFIG_INFO_SUCCESS';
export const GET_CUSTOMER_CONFIG_INFO_FAILURE = 'GET_CUSTOMER_CONFIG_INFO_FAILURE';

// 新增用户快捷操作
export const UPDATE_CUSTOMER_CONFIG_SHORTCUT = 'UPDATE_CUSTOMER_CONFIG_SHORTCUT';
export const UPDATE_CUSTOMER_CONFIG_SHORTCUT_PENDING = 'UPDATE_CUSTOMER_CONFIG_SHORTCUT_PENDING';
export const UPDATE_CUSTOMER_CONFIG_SHORTCUT_SUCCESS = 'UPDATE_CUSTOMER_CONFIG_SHORTCUT_SUCCESS';
export const UPDATE_CUSTOMER_CONFIG_SHORTCUT_FAILURE = 'UPDATE_CUSTOMER_CONFIG_SHORTCUT_FAILURE';

// 删除用户快捷操作
export const DELETE_CUSTOMER_CONFIG_SHORTCUT = 'DELETE_CUSTOMER_CONFIG_SHORTCUT';
export const DELETE_CUSTOMER_CONFIG_SHORTCUT_PENDING = 'DELETE_CUSTOMER_CONFIG_SHORTCUT_PENDING';
export const DELETE_CUSTOMER_CONFIG_SHORTCUT_SUCCESS = 'DELETE_CUSTOMER_CONFIG_SHORTCUT_SUCCESS';
export const DELETE_CUSTOMER_CONFIG_SHORTCUT_FAILURE = 'DELETE_CUSTOMER_CONFIG_SHORTCUT_FAILURE';

// 删除客户信息
export function deletePlatAdminCustomer(id) {
    return {
        type: DELETE_PLAT_ADMIN_CUSTOMER,
        payload: apiCustomer.deletePlatAdminCustomer(id)
    };
}

// 获取客户信息
export function getAdminCustomer() {
    return {
        type: GET_ADMIN_CUSTOMER,
        payload: apiCustomer.getAdminCustomer()
    };
}

// 修改客户信息
export function updateAdminCustomer(params) {
    return {
        type: UPDATE_ADMIN_CUSTOMER,
        payload: apiCustomer.updateAdminCustomer(params)
    };
}

// 修改客户合作伙伴
export function updateAdminCustomerPartner(params) {
    return {
        type: UPDATE_ADMIN_CUSTOMER_PARTNER,
        payload: apiCustomer.updateAdminCustomerPartner(params)
    };
}

// 新增客户合作伙伴
export function addAdminCustomerPartner(customerId, params) {
    return {
        type: ADD_ADMIN_CUSTOMER_PARTNER,
        payload: apiCustomer.addAdminCustomerPartner(customerId, params)
    };
}

//获取客户商城权限配置
export function getPlatformCustomerMallAuth(id) {
    return {
        type: GET_PLATFORM_CUSTOMER_MALL_AUTH,
        payload: apiCustomer.getPlatformCustomerMallAuth(id)
    };
}

//更新客户商城权限配置
/*{
 "brandAuth": "FALSE",
 "contentAuth": "FALSE",
 "mallAuth": "FALSE",
 "mallOpMode": "S",
 "partnerAuth": "FALSE",
 "yygAuth": "FALSE"
 }*/
export function updatePlatformCustomerMallAuth(id, data) {
    return {
        type: UPDATE_PLATFORM_CUSTOMER_MALL_AUTH,
        payload: apiCustomer.updatePlatformCustomerMallAuth(id, data)
    };
}

// 修改客户微信设置
/*{
 "appid": "string",
 "enable": true,
 "muchId": "string",
 "muchKey": "string",
 "secret": "string"
 "useSys": true
 }*/
export function updateCustomerWechat(id, data) {
    return {
        type: UPDATE_CUSTOMER_WECHAT,
        payload: apiCustomer.updateCustomerWechat(id, data)
    };
}

// 修改客户支付宝设置
/*
 {
 "account": "string",
 "enable": true,
 "key": "string",
 "pid": "string",
 "useSys": true
 }
 */
export function updateCustomerAlipay(id, data) {
    return {
        type: UPDATE_CUSTOMER_ALIPAY,
        payload: apiCustomer.updateCustomerAlipay(id, data)
    };
}

// 修改银联设置
export function updateCustomerUnionpay(params) {
    return {
        type: UPDATE_CUSTOMER_UNIONPAY,
        payload: apiCustomer.updateCustomerUnionpay(params)
    };
}

// 获取客户列表
export function getAdminCustomerList(params) {
    return {
        type: GET_ADMIN_CUSTOMER_LIST,
        payload: apiCustomer.getAdminCustomerList(params)
    };
}

//获取客户积分兑换设置
export function getIntegralExchange() {
    return {
        type: GET_INTEGRAL_EXCHANGE,
        payload: apiCustomer.getIntegralExchange()
    };
}

//修改客户积分兑换设置
export function updateIntegralExchange(data) {
    return {
        type: UPDATE_INTEGRAL_EXCHANGE,
        payload: apiCustomer.updateIntegralExchange(data)
    };
}

// 获取会员卡风格
export function getCardStyle() {
    return {
        type: GET_CARD_STYLE,
        payload: apiCustomer.getCardStyle()
    };
}


// 设置会员卡风格
export function updateCardStyle(id, params) {
    return {
        type: UPDATE_CARD_STYLE,
        payload: apiCustomer.updateCardStyle(id, params)
    };
}

// 获取客户信息
export function getCustomerConfigInfo() {
    return {
        type: GET_CUSTOMER_CONFIG_INFO,
        payload: apiCustomer.getCustomerConfigInfo()
    };
}

// 获取客户信息
export function updateCustomerConfigShortcut(shortcut) {
    return {
        type: UPDATE_CUSTOMER_CONFIG_SHORTCUT,
        payload: apiCustomer.updateCustomerConfigShortcut(shortcut)
    };
}

// 获取客户信息
export function deleteCustomerConfigShortcut(shortcut) {
    return {
        type: DELETE_CUSTOMER_CONFIG_SHORTCUT,
        payload: apiCustomer.deleteCustomerConfigShortcut(shortcut)
    };
}
