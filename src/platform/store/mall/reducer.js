import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';
import {GET_MALL_SUCCESS, GET_MALLS_SUCCESS} from './action';

const initialState = fromJS({
    // 商城信息
    item: {},
    // 商城列表
    list: {}
});


export default createReducer(initialState, {
    [GET_MALL_SUCCESS]: (state, {payload}) => state.set('item', fromJS(payload.data)),

    [GET_MALLS_SUCCESS]: (state, {payload}) => state.set('list', fromJS(payload.data))
});
