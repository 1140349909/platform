import * as apiIntegral from '../../../common/api/integral';

/*平台积分管理服务：integral*/

// 删除积分
export const DELETE_INTEGRAL = 'DELETE_INTEGRAL';
export const DELETE_INTEGRAL_PENDING = 'DELETE_INTEGRAL_PENDING';
export const DELETE_INTEGRAL_SUCCESS = 'DELETE_INTEGRAL_SUCCESS';
export const DELETE_INTEGRAL_FAILURE = 'DELETE_INTEGRAL_FAILURE';
// 积分列表
export const GET_INTEGRAL_LIST = 'GET_INTEGRAL_LIST';
export const GET_INTEGRAL_LIST_PENDING = 'GET_INTEGRAL_LIST_PENDING';
export const GET_INTEGRAL_LIST_SUCCESS = 'GET_INTEGRAL_LIST_SUCCESS';
export const GET_INTEGRAL_LIST_FAILURE = 'GET_INTEGRAL_LIST_FAILURE';
// 积分资源绑定列表
export const GET_INTEGRAL_RES_LIST = 'GET_INTEGRAL_RES_LIST';
export const GET_INTEGRAL_RES_LIST_PENDING = 'GET_INTEGRAL_RES_LIST_PENDING';
export const GET_INTEGRAL_RES_LIST_SUCCESS = 'GET_INTEGRAL_RES_LIST_SUCCESS';
export const GET_INTEGRAL_RES_LIST_FAILURE = 'GET_INTEGRAL_RES_LIST_FAILURE';
// 获取积分详情
export const GET_INTEGRAL = 'GET_INTEGRAL';
export const GET_INTEGRAL_PENDING = 'GET_INTEGRAL_PENDING';
export const GET_INTEGRAL_SUCCESS = 'GET_INTEGRAL_SUCCESS';
export const GET_INTEGRAL_FAILURE = 'GET_INTEGRAL_FAILURE';
// 修改积分
export const UPDATE_INTEGRAL = 'UPDATE_INTEGRAL';
export const UPDATE_INTEGRAL_PENDING = 'UPDATE_INTEGRAL_PENDING';
export const UPDATE_INTEGRAL_SUCCESS = 'UPDATE_INTEGRAL_SUCCESS';
export const UPDATE_INTEGRAL_FAILURE = 'UPDATE_INTEGRAL_FAILURE';
// 新增积分
export const ADD_INTEGRAL = 'ADD_INTEGRAL';
export const ADD_INTEGRAL_PENDING = 'ADD_INTEGRAL_PENDING';
export const ADD_INTEGRAL_SUCCESS = 'ADD_INTEGRAL_SUCCESS';
export const ADD_INTEGRAL_FAILURE = 'ADD_INTEGRAL_FAILURE';

/*平台积分管理服务：完*/

//积分列表
export function getIntegralList(params) {
    return {
        type: GET_INTEGRAL_LIST,
        payload: apiIntegral.getIntegralList(params)
    };
}

//积分资源绑定列表
export function getIntegralResList(params) {
    return {
        type: GET_INTEGRAL_RES_LIST,
        payload: apiIntegral.getIntegralResList(params)
    };
}

//修改积分
/*var data = {
 id: '',
 para: {
 "perTotal": 0,
 "plusAmount": 0
 }
 };*/

export function updateIntegral(id, data) {
    return {
        type: UPDATE_INTEGRAL,
        payload: apiIntegral.updateIntegral(id, data)
    };
}

//新增积分
/*var data = {
 para: {
 "integral": 0,
 "perTotal": 0,
 "total": 0
 }
 };*/
export function addIntegral(data) {
    return {
        type: ADD_INTEGRAL,
        payload: apiIntegral.addIntegral(data)
    };
}

// 删除积分
export function deleteIntegral(id) {
    return {
        type: DELETE_INTEGRAL,
        payload: apiIntegral.deleteIntegral(id)
    };
}

//获取积分详情
export function getIntegral(id) {
    return {
        type: GET_INTEGRAL,
        payload: apiIntegral.getIntegral(id)
    };
}

