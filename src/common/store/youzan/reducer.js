import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';
import _ from 'lodash';
import {
    GET_YOUZAN_COUNPON_LIST_SUCCESS,
    GET_YOUZAN_PRODUCT_LIST_SUCCESS,
} from './action';

const initialState = fromJS({
    youzanProductList: {},
    couponList: {}
});

export default createReducer(initialState, {
    [GET_YOUZAN_COUNPON_LIST_SUCCESS]: (state, {payload}) => state.merge({
        'couponList': _resolveCouponList(payload.data)
    }),

    [GET_YOUZAN_PRODUCT_LIST_SUCCESS]: (state, {payload}) => state.merge({
        'youzanProductList': payload.data
    }),
});

function _resolveCouponList(data){
    if (_.has(data, 'response.coupons')) {
        _.map(data.response.coupons, (item, index) => {
            data.response.coupons[index].id = item.group_id;
        });
    }
    return data;
}
