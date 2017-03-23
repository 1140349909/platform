import * as apiIntegral from '../../api/integral';

// 积分详情
export const GET_INTEGRAL = 'GET_INTEGRAL';
export const GET_INTEGRAL_PENDING = 'GET_INTEGRAL_PENDING';
export const GET_INTEGRAL_SUCCESS = 'GET_INTEGRAL_SUCCESS';
export const GET_INTEGRAL_FAILURE = 'GET_INTEGRAL_FAILURE';

// 积分列表
export const GET_INTEGRAL_LIST = 'GET_INTEGRAL_LIST';
export const GET_INTEGRAL_LIST_PENDING = 'GET_INTEGRAL_LIST_PENDING';
export const GET_INTEGRAL_LIST_SUCCESS = 'GET_INTEGRAL_LIST_SUCCESS';
export const GET_INTEGRAL_LIST_FAILURE = 'GET_INTEGRAL_LIST_FAILURE';

// 积分列表
export function getIntegralList(params) {
    return {
        type: GET_INTEGRAL_LIST,
        payload: apiIntegral.getIntegralList(params)
    };
}

export function getIntegral(id) {
    return {
        type: GET_INTEGRAL,
        payload: apiIntegral.getIntegral(id)
    };
}
