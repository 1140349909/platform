import * as apiPay from '../../../common/api/pay';

// 获取支付业务信息列表
export const GET_PAY_BUSINESS_LIST = 'GET_PAY_BUSINESS_LIST';
export const GET_PAY_BUSINESS_LIST_PENDING = 'GET_PAY_BUSINESS_LIST_PENDING';
export const GET_PAY_BUSINESS_LIST_SUCCESS = 'GET_PAY_BUSINESS_LIST_SUCCESS';
export const GET_PAY_BUSINESS_LIST_FAILURE = 'GET_PAY_BUSINESS_LIST_FAILURE';

// 获取支付业务信息
export const GET_PAY_BUSINESS = 'GET_PAY_BUSINESS';
export const GET_PAY_BUSINESS_PENDING = 'GET_PAY_BUSINESS_PENDING';
export const GET_PAY_BUSINESS_SUCCESS = 'GET_PAY_BUSINESS_SUCCESS';
export const GET_PAY_BUSINESS_FAILURE = 'GET_PAY_BUSINESS_FAILURE';

// 新增支付业务信息
export const UPDATE_PAY_BUSINESS = 'UPDATE_PAY_BUSINESS';
export const UPDATE_PAY_BUSINESS_PENDING = 'UPDATE_PAY_BUSINESS_PENDING';
export const UPDATE_PAY_BUSINESS_SUCCESS = 'UPDATE_PAY_BUSINESS_SUCCESS';
export const UPDATE_PAY_BUSINESS_FAILURE = 'UPDATE_PAY_BUSINESS_FAILURE';

// 客户账户版本升级付费
export const UPDATE_PAY_CUSTOMER_VERSION_PROGRESS = 'UPDATE_PAY_CUSTOMER_VERSION_PROGRESS';
export const UPDATE_PAY_CUSTOMER_VERSION_PROGRESS_PENDING = 'UPDATE_PAY_CUSTOMER_VERSION_PROGRESS_PENDING';
export const UPDATE_PAY_CUSTOMER_VERSION_PROGRESS_SUCCESS = 'UPDATE_PAY_CUSTOMER_VERSION_PROGRESS_SUCCESS';
export const UPDATE_PAY_CUSTOMER_VERSION_PROGRESS_FAILURE = 'UPDATE_PAY_CUSTOMER_VERSION_PROGRESS_FAILURE';

// 检验是否购买成功
export const GET_CUSTOMER_BUY_RESULT = 'GET_CUSTOMER_BUY_RESULT';
export const GET_CUSTOMER_BUY_RESULT_PENDING = 'GET_CUSTOMER_BUY_RESULT_PENDING';
export const GET_CUSTOMER_BUY_RESULT_SUCCESS = 'GET_CUSTOMER_BUY_RESULT_SUCCESS';
export const GET_CUSTOMER_BUY_RESULT_FAILURE = 'GET_CUSTOMER_BUY_RESULT_FAILURE';

// 获取支付业务信息列表
export function getPayBusinessList() {
    return {
        type: GET_PAY_BUSINESS_LIST,
        payload: apiPay.getPayBusinessList()
    };
}

// 获取支付业务信息
export function getPayBusiness(id) {
    return {
        type: GET_PAY_BUSINESS,
        payload: apiPay.getPayBusiness(id)
    };
}


// 新增支付业务信息
export function updatePayBusiness(params) {
    return {
        type: UPDATE_PAY_BUSINESS,
        payload: apiPay.updatePayBusiness(params)
    };
}

// 客户账户版本升级付费
export function updatePayCustomerVersionProgress(params) {
    return {
        type: UPDATE_PAY_CUSTOMER_VERSION_PROGRESS,
        payload: apiPay.updatePayCustomerVersionProgress(params)
    };
}

// 检验是否购买成功
export function getCustomerBuyResult(businessId) {
    return {
        meta: {
            silent: true
        },
        type: GET_CUSTOMER_BUY_RESULT,
        payload: apiPay.getCustomerBuyResult(businessId)
    };
}
