import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';
import {
    GET_INTEGRAL_SUCCESS,
    GET_INTEGRAL_LIST_SUCCESS,
} from './action';

const initialState = fromJS({
    item: null,
    // 积分列表
    integralList: null,
});

export default createReducer(initialState, {

    // 积分详情
    [GET_INTEGRAL_SUCCESS]: (state, {payload})=> state.set('item', fromJS(payload.data)),

    // 积分列表
    [GET_INTEGRAL_LIST_SUCCESS]: (state, {payload})=> state.set('integralList', fromJS(payload.data))
});


