import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';
import _ from 'lodash';
import {
    GET_WEIMOB_PRODUCT_LIST_SUCCESS,
} from './action';

const initialState = fromJS({
    weimobProductList: {},
    couponList: {}
});

export default createReducer(initialState, {

    [GET_WEIMOB_PRODUCT_LIST_SUCCESS]: (state, {payload}) => state.merge({
        'weimobProductList': payload.data
    }),
});
