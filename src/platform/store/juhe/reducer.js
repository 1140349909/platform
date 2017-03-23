import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';
import {
    GET_JUHE_LIST_SUCCESS,
    GET_JUHE_HISTORY_TODAY_LIST_SUCCESS,
    GET_JUHE_HISTORY_TODAY_SUCCESS
} from './action';

const initialState = fromJS({
    // 企业信息
    item: {},
    // 企业列表
    list: null,
    // 历史列表
    history: null,
    //
    info:null,
    // 企业权限
    mallAuth: {}
});

export default createReducer(initialState, {

    // 获取企业列表
    [GET_JUHE_LIST_SUCCESS]: (state, {payload}) => state.set('list', fromJS(payload.data)),

    // 获取历史上的今天列表
    [GET_JUHE_HISTORY_TODAY_LIST_SUCCESS]: (state, {payload}) => state.set('history', fromJS(payload.data)),

    // 获取历史上的今天
    [GET_JUHE_HISTORY_TODAY_SUCCESS]: (state, {payload}) => state.set('info', fromJS(payload.data)),

});
