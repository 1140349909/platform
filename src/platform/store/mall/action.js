import * as apiMall from '../../../common/api/mall';

// 商城管理:增删查改
export const ADD_MALL = 'ADD_MALL';
export const ADD_MALL_PENDING = 'ADD_MALL_PENDING';
export const ADD_MALL_SUCCESS = 'ADD_MALL_SUCCESS';
export const ADD_MALL_FAILURE = 'ADD_MALL_FAILURE';

export const UPDATE_MALL = 'UPDATE_MALL';
export const UPDATE_MALL_PENDING = 'UPDATE_MALL_PENDING';
export const UPDATE_MALL_SUCCESS = 'UPDATE_MALL_SUCCESS';
export const UPDATE_MAL_FAILURE = 'UPDATE_MAL_FAILURE';

export const GET_MALL = 'GET_MALL';
export const GET_MALL_PENDING = 'GET_MALL_PENDING';
export const GET_MALL_SUCCESS = 'GET_MALL_SUCCESS';
export const GET_MALL_FAILURE = 'GET_MALL_FAILURE';

export const GET_MALLS = 'GET_MALLS';
export const GET_MALLS_PENDING = 'GET_MALLS_PENDING';
export const GET_MALLS_SUCCESS = 'GET_MALLS_SUCCESS';
export const GET_MALLS_FAILURE = 'GET_MALLS_FAILURE';

export function addMall(mall) {
    return {
        type: ADD_MALL,
        payload: apiMall.addMall(mall)
    };
}

export function updateMall(mall) {
    return {
        type: UPDATE_MALL,
        payload: apiMall.updateMall(mall)
    };
}

export function saveMall(mall) {
    return mall.id ? updateMall(mall) : addMall(mall);
}

export function getMall(id) {
    return {
        type: GET_MALL,
        payload: apiMall.getMall(id),
        // 静默
        // meta: {
        //     silent: true
        // }
    };
}

export function getMalls(params) {

    // 另外一种写法, 先保留作为示例
    //return function (dispatch, getState) {
    //    return http.get('platadmin/mall', {
    //            page,
    //            size,
    //            sort,
    //            order
    //        })
    //        .then((result) => {
    //            return dispatch({
    //                type: 'GET_MALLS_SUCCESS',
    //                payload: {
    //                    data: result.data
    //                }
    //            })
    //        })
    //}


    return {
        type: GET_MALLS,
        payload: apiMall.getMalls(params)
    };
}
