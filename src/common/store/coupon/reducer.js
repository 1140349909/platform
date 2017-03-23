import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';
import {
    GET_COUPON_SUCCESS,
    GET_COUPON_LIST_SUCCESS,
} from './action';

const initialState = fromJS({
    // 优惠券详情
    item: null,
    // 优惠券列表
    couponList: null,
});


export default createReducer(initialState, {

    // 优惠券详情
    [GET_COUPON_SUCCESS]: (state, {payload})=> state.set('item', fromJS(payload.data)),

    // 优惠券列表
    [GET_COUPON_LIST_SUCCESS]: (state, {payload})=> state.set('couponList', fromJS(payload.data))
});


