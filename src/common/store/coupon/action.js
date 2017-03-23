import * as apiCoupon from '../../api/coupon';

// 优惠券详情
export const GET_COUPON = 'GET_COUPON';
export const GET_COUPON_PENDING = 'GET_COUPON_PENDING';
export const GET_COUPON_SUCCESS = 'GET_COUPON_SUCCESS';
export const GET_COUPON_FAILURE = 'GET_COUPON_FAILURE';

// 优惠券列表
export const GET_COUPON_LIST = 'GET_COUPON_LIST';
export const GET_COUPON_LIST_PENDING = 'GET_COUPON_LIST_PENDING';
export const GET_COUPON_LIST_SUCCESS = 'GET_COUPON_LIST_SUCCESS';
export const GET_COUPON_LIST_FAILURE = 'GET_COUPON_LIST_FAILURE';


// 优惠券详情
export function getCoupon(id) {
    return {
        type: GET_COUPON,
        payload: apiCoupon.getCoupon(id)
    };
}


// 优惠券列表
export function getCouponList(params) {
    return {
        type: GET_COUPON_LIST,
        payload: apiCoupon.getCouponList(params)
    };
}
