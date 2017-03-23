import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';
import {
    GET_PLATFORM_CUSTOMER_SUCCESS,
    GET_PLATFORM_CUSTOMERS_SUCCESS,
    GET_PLATFORM_CUSTOMER_MALL_AUTH_SUCCESS
} from './action';

const initialState = fromJS({
    // 企业信息
    item: {},
    // 企业列表
    list: {},
    // 企业权限
    mallAuth: {}
});

export default createReducer(initialState, {

    // 获取企业信息
    [GET_PLATFORM_CUSTOMER_SUCCESS]: (state, {payload}) => state.set('item', fromJS(payload.data)),

    // 获取企业列表
    [GET_PLATFORM_CUSTOMERS_SUCCESS]: (state, {payload}) => state.set('list', fromJS(payload.data)),

    // 获取企业权限
    [GET_PLATFORM_CUSTOMER_MALL_AUTH_SUCCESS]: (state, {payload}) => {

        payload.data.id = payload.params.id;
        return state.set('mallAuth', fromJS(payload.data));
    }
});
