/**
 * Created by Asoiso on 16/8/20.
 */
import * as apiCustomer from '../../../common/api/customer';

// 企业管理
export const GET_PLATFORM_CUSTOMER = 'GET_PLATFORM_CUSTOMER';
export const GET_PLATFORM_CUSTOMER_PENDING = 'GET_PLATFORM_CUSTOMER_PENDING';
export const GET_PLATFORM_CUSTOMER_SUCCESS = 'GET_PLATFORM_CUSTOMER_SUCCESS';
export const GET_PLATFORM_CUSTOMER_FAILURE = 'GET_PLATFORM_CUSTOMER_FAILURE';

export const GET_PLATFORM_CUSTOMERS = 'GET_PLATFORM_CUSTOMERS';
export const GET_PLATFORM_CUSTOMERS_PENDING = 'GET_PLATFORM_CUSTOMERS_PENDING';
export const GET_PLATFORM_CUSTOMERS_SUCCESS = 'GET_PLATFORM_CUSTOMERS_SUCCESS';
export const GET_PLATFORM_CUSTOMERS_FAILURE = 'GET_PLATFORM_CUSTOMERS_FAILURE';

export const GET_PLATFORM_CUSTOMER_MALL_AUTH = 'GET_PLATFORM_CUSTOMER_MALL_AUTH';
export const GET_PLATFORM_CUSTOMER_MALL_AUTH_PENDING = 'GET_PLATFORM_CUSTOMER_MALL_AUTH_PENDING';
export const GET_PLATFORM_CUSTOMER_MALL_AUTH_SUCCESS = 'GET_PLATFORM_CUSTOMER_MALL_AUTH_SUCCESS';
export const GET_PLATFORM_CUSTOMER_MALL_AUTH_FAILURE = 'GET_PLATFORM_CUSTOMER_MALL_AUTH_FAILURE';

export const UPDATE_PLATFORM_CUSTOMER_STATUS = 'UPDATE_PLATFORM_CUSTOMER_STATUS';
export const UPDATE_PLATFORM_CUSTOMER_STATUS_PENDING = 'UPDATE_PLATFORM_CUSTOMER_STATUS_PENDING';
export const UPDATE_PLATFORM_CUSTOMER_STATUS_SUCCESS = 'UPDATE_PLATFORM_CUSTOMER_STATUS_SUCCESS';
export const UPDATE_PLATFORM_CUSTOMER_STATUS_FAILURE = 'UPDATE_PLATFORM_CUSTOMER_STATUS_FAILURE';

export const UPDATE_PLATFORM_CUSTOMER_MALL_AUTH = 'UPDATE_PLATFORM_CUSTOMER_MALL_AUTH';
export const UPDATE_PLATFORM_CUSTOMER_MALL_AUTH_PENDING = 'UPDATE_PLATFORM_CUSTOMER_MALL_AUTH_PENDING';
export const UPDATE_PLATFORM_CUSTOMER_MALL_AUTH_SUCCESS = 'UPDATE_PLATFORM_CUSTOMER_MALL_AUTH_SUCCESS';
export const UPDATE_PLATFORM_CUSTOMER_MALL_AUTH_FAILURE = 'UPDATE_PLATFORM_CUSTOMER_MALL_AUTH_FAILURE';

//获取客户列表
export function getPlatformCustomers(params) {
    return {
        type: GET_PLATFORM_CUSTOMERS,
        payload: apiCustomer.getPlatformCustomers(params)
    };
}

//获取客户信息
export function getPlatformCustomer(id) {
    return {
        type: GET_PLATFORM_CUSTOMER,
        payload: apiCustomer.getPlatformCustomer(id)
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
export function updatePlatformCustomerMallAuth(id, data) {
    return {
        type: UPDATE_PLATFORM_CUSTOMER_MALL_AUTH,
        payload: apiCustomer.updatePlatformCustomerMallAuth(id, data)
    };
}


//更新客户状态
export function updatePlatformCustomerStatus(id, data) {
    return {
        type: UPDATE_PLATFORM_CUSTOMER_STATUS,
        payload: apiCustomer.updatePlatformCustomerStatus(id, data)
    };
}

// platform / admin
// platadmin / mall
// admin / mall

/*

 export function delCustomer(id) {
 return {
 type: DEL_CUSTOMER,
 payload: {
 promise: http.delete('admin/customer/{id}', {
 id
 })
 }
 }
 }


 });*/
