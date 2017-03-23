import  * as apiYouZan from  '../../../common/api/youzan';

export const GET_YOUZAN_COUNPON_LIST = 'GET_YOUZAN_COUNPON_LIST';
export const GET_YOUZAN_COUNPON_LIST_PENDING = 'GET_YOUZAN_COUNPON_LIST_PENDING';
export const GET_YOUZAN_COUNPON_LIST_SUCCESS = 'GET_YOUZAN_COUNPON_LIST_SUCCESS';
export const GET_YOUZAN_COUNPON_LIST_FAILURE = 'GET_YOUZAN_COUNPON_LIST_FAILURE';

export const GET_YOUZAN_PRODUCT_LIST = 'GET_YOUZAN_PRODUCT_LIST';
export const GET_YOUZAN_PRODUCT_LIST_PENDING = 'GET_YOUZAN_PRODUCT_LIST_PENDING';
export const GET_YOUZAN_PRODUCT_LIST_SUCCESS = 'GET_YOUZAN_PRODUCT_LIST_SUCCESS';
export const GET_YOUZAN_PRODUCT_LIST_FAILURE = 'GET_YOUZAN_PRODUCT_LIST_FAILURE';

export function getYouZanCounponList(params) {
    return {
        type: GET_YOUZAN_COUNPON_LIST,
        payload: apiYouZan.getYouZanCounponList(params)
    };
}

export function getYouZanProductList(params) {
    return {
        type: GET_YOUZAN_PRODUCT_LIST,
        payload: apiYouZan.getYouZanProductList(params)
    };
}
