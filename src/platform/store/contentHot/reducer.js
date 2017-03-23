import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';
import {
    GET_CONTENT_HOT_PLATFORM_LIST_SUCCESS,
    GET_CONTENT_HOT_SUCCESS,
} from './action';

const initialState = fromJS({
    // 企业信息
    item: {},
    // 企业列表
    list: {},
});

export default createReducer(initialState, {

    // 获取企业信息
    [GET_CONTENT_HOT_SUCCESS]: (state, {payload}) => state.set('item', fromJS(payload.data)),

    // 获取企业列表
    [GET_CONTENT_HOT_PLATFORM_LIST_SUCCESS]: (state, {payload}) => state.set('list', fromJS(payload.data)),


});
