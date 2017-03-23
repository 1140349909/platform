import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';
import {
    GET_COUPON_FACE_VALUE_LIST_SUCCESS,
    GET_COUPON_SUCCESS,
    GET_COUPON_LIST_SUCCESS,
    GET_COUPON_RES_LIST_SUCCESS
} from './action';

const initialState = fromJS({
    item: {},

    list: {},

    resList: {},

    faceValueList: {}

});

export default createReducer(initialState, {

    // 获取优惠券面值列表成功返回
    [GET_COUPON_FACE_VALUE_LIST_SUCCESS]: (state, {payload}) => state.set('faceValueList', fromJS(payload.data)),

    // 获取优惠券成功返回
    [GET_COUPON_SUCCESS]: (state, {payload}) => state.set('item', fromJS(payload.data)),

    // 获取优惠券列表成功返回
    [GET_COUPON_LIST_SUCCESS]: (state, {payload}) => state.set('list', fromJS(payload.data)),

    // 获取优惠券资源绑定列表成功返回
    [GET_COUPON_RES_LIST_SUCCESS]: (state, {payload}) => {

        let resContent = [];

        payload.data.content.forEach((item) => {
            resContent.push(item.resId);
        });

        return state.merge({
            'resContent': resContent,
            'resList': payload.data
        });
    }

});
