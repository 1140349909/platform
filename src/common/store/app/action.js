import  * as apiApp from  'common/api/app';
import  * as apiCustomer from '../../api/customer';

// 作品列表服务
export const GET_APP_DATA_LIST = 'GET_APP_DATA_LIST';
export const GET_APP_DATA_LIST_PENDING = 'GET_APP_DATA_LIST_PENDING';
export const GET_APP_DATA_LIST_SUCCESS = 'GET_APP_DATA_LIST_SUCCESS';
export const GET_APP_DATA_LIST_FAILURE = 'GET_APP_DATA_LIST_FAILURE';

export const GET_CUSTOMER_UIN = 'GET_CUSTOMER_UIN';
export const GET_CUSTOMER_UIN_PENDING = 'GET_CUSTOMER_UIN_PENDING';
export const GET_CUSTOMER_UIN_SUCCESS = 'GET_CUSTOMER_UIN_SUCCESS';
export const GET_CUSTOMER_UIN_FAILURE = 'GET_CUSTOMER_UIN_FAILURE';


export function getAppDataList(params) {
    return {
        type: GET_APP_DATA_LIST,
        payload:  apiApp.getAppDataList(params)
    };
}

export function getAdminCustomer() {
    return {
        type: GET_CUSTOMER_UIN,
        payload:  apiCustomer.getAdminCustomer()
    };
}
