import * as apiCoupon from '../../../common/api/coupon';

//删除优惠券
export const DELETE_COUPON = 'DELETE_COUPON';
export const DELETE_COUPON_PENDING = 'DELETE_COUPON_PENDING';
export const DELETE_COUPON_SUCCESS = 'DELETE_COUPON_SUCCESS';
export const DELETE_COUPON_FAILURE = 'DELETE_COUPON_FAILURE';
// 优惠券面值列表
export const GET_COUPON_FACE_VALUE_LIST = 'GET_COUPON_FACE_VALUE_LIST';
export const GET_COUPON_FACE_VALUE_LIST_PENDING = 'GET_COUPON_FACE_VALUE_LIST_PENDING';
export const GET_COUPON_FACE_VALUE_LIST_SUCCESS = 'GET_COUPON_FACE_VALUE_LIST_SUCCESS';
export const GET_COUPON_FACE_VALUE_LIST_FAILURE = 'GET_COUPON_FACE_VALUE_LIST_FAILURE';

// 优惠券列表
export const GET_COUPON_LIST = 'GET_COUPON_LIST';
export const GET_COUPON_LIST_PENDING = 'GET_COUPON_LIST_PENDING';
export const GET_COUPON_LIST_SUCCESS = 'GET_COUPON_LIST_SUCCESS';
export const GET_COUPON_LIST_FAILURE = 'GET_COUPON_LIST_FAILURE';

// 优惠券资源绑定列表
export const GET_COUPON_RES_LIST = 'GET_COUPON_RES_LIST';
export const GET_COUPON_RES_LIST_PENDING = 'GET_COUPON_RES_LIST_PENDING';
export const GET_COUPON_RES_LIST_SUCCESS = 'GET_COUPON_RES_LIST_SUCCESS';
export const GET_COUPON_RES_LIST_FAILURE = 'GET_COUPON_RES_LIST_FAILURE';

// 获取优惠券
export const GET_COUPON = 'GET_COUPON';
export const GET_COUPON_PENDING = 'GET_COUPON_PENDING';
export const GET_COUPON_SUCCESS = 'GET_COUPON_SUCCESS';
export const GET_COUPON_FAILURE = 'GET_COUPON_FAILURE';

// 修改优惠券
export const UPDATE_COUPON = 'UPDATE_COUPON';
export const UPDATE_COUPON_PENDING = 'UPDATE_COUPON_PENDING';
export const UPDATE_COUPON_SUCCESS = 'UPDATE_COUPON_SUCCESS';
export const UPDATE_COUPON_FAILURE = 'UPDATE_COUPON_FAILURE';

// 新增优惠券
export const ADD_COUPON = 'ADD_COUPON';
export const ADD_COUPON_PENDING = 'ADD_COUPON_PENDING';
export const ADD_COUPON_SUCCESS = 'ADD_COUPON_SUCCESS';
export const ADD_COUPON_FAILURE = 'ADD_COUPON_FAILURE';

//优惠券面值列表
export function getCouponFaceValueList() {
    return {
        type: GET_COUPON_FACE_VALUE_LIST,
        payload: apiCoupon.getCouponFaceValueList()
    };
}

//优惠券列表
export function getCouponList(params) {
    return {
        type: GET_COUPON_LIST,
        payload: apiCoupon.getCouponList(params)
    };
}

//优惠券资源绑定列表
export function getCouponResList(params) {
    return {
        type: GET_COUPON_RES_LIST,
        payload: apiCoupon.getCouponResList(params)
    };
}

//修改优惠券
/*var data = {
 id: '',
 para: {
 "perTotal": 0,
 "plusAmount": 0
 }
 };*/

export function updateCoupon(id, data) {
    return {
        type: UPDATE_COUPON,
        payload: apiCoupon.updateCoupon(id, data)
    };
}


export function addCoupon(data) {
    return {
        type: ADD_COUPON,
        payload: apiCoupon.addCoupon(data)
    };
}

// 删除优惠券
export function deleteCoupon(id) {
    return {
        type: DELETE_COUPON,
        payload: apiCoupon.deleteCoupon(id)
    };
}

//获取优惠券详情
export function getCoupon(id) {
    return {
        type: GET_COUPON,
        payload: apiCoupon.getCoupon(id)
    };
}
