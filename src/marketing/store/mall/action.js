import  * as apiMall from '../../../common/api/mall';
/*商城管理后台服务：mall*/

// 获取商城信息
export const GET_MALL_BASIC = 'GET_MALL_BASIC';
export const GET_MALL_BASIC_PENDING = 'GET_MALL_BASIC_PENDING';
export const GET_MALL_BASIC_SUCCESS = 'GET_MALL_BASIC_SUCCESS';
export const GET_MALL_BASIC_FAILURE = 'GET_MALL_BASIC_FAILURE';
// 修改商城基本信息
export const UPDATE_MALL_BASIC = 'UPDATE_MALL_BASIC';
export const UPDATE_MALL_BASIC_PENDING = 'UPDATE_MALL_BASIC_PENDING';
export const UPDATE_MALL_BASIC_SUCCESS = 'UPDATE_MALL_BASIC_SUCCESS';
export const UPDATE_MALL_BASIC_FAILURE = 'UPDATE_MALL_BASIC_FAILURE';
// 修改商城权限配置
export const UPDATE_MALL_AUTH = 'UPDATE_MALL_AUTH';
export const UPDATE_MALL_AUTH_PENDING = 'UPDATE_MALL_AUTH_PENDING';
export const UPDATE_MALL_AUTH_SUCCESS = 'UPDATE_MALL_AUTH_SUCCESS';
export const UPDATE_MALL_AUTH_FAILURE = 'UPDATE_MALL_AUTH_FAILURE';
// 修改商城客服人员
export const UPDATE_MALL_CUSTOMER = 'UPDATE_MALL_CUSTOMER';
export const UPDATE_MALL_CUSTOMER_PENDING = 'UPDATE_MALL_CUSTOMER_PENDING';
export const UPDATE_MALL_CUSTOMER_SUCCESS = 'UPDATE_MALL_CUSTOMER_SUCCESS';
export const UPDATE_MALL_CUSTOMER_FAILURE = 'UPDATE_MALL_CUSTOMER_FAILURE';

/*商城管理后台服务：完*/

// 获取商城信息
export function getMallBasic() {
    return {
        type: GET_MALL_BASIC,
        payload:  apiMall.getMallBasic()
    };
}

// 修改商城基本信息
export function updateMallBasic(data) {
    return {
        type: UPDATE_MALL_BASIC,
        payload: apiMall.updateMallBasic(data)
    };
}

// 修改商城权限配置
export function updateMallAuth(data) {
    return {
        type: UPDATE_MALL_AUTH,
        payload: apiMall.updateMallAuth(data)
    };
}

// 修改商城客服人员
export function updateMallCustomer(data) {
    return {
        type: UPDATE_MALL_CUSTOMER,
        payload: apiMall.updateMallCustomer(data)
    };
}


